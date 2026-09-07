/**
 * Builds a fully static, file://-openable copy of the site into `out/`.
 *
 * Why a script rather than a flag: a few metadata routes are generated at
 * request time and cannot be collected by the static exporter —
 * `opengraph-image` renders through `next/og`, and `robots` / `sitemap` are
 * emitted by the server. None of them matter to a local preview (they exist
 * for crawlers), so the export parks them for the duration of the build and
 * puts them straight back, including when the build fails.
 */
import { execFileSync } from "node:child_process";
import {
  existsSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const PARKED = ["opengraph-image.tsx", "robots.ts", "sitemap.ts"].map((f) => ({
  live: join(root, "app", f),
  aside: join(root, "app", `${f}.parked`),
}));

const restore = () => {
  for (const { live, aside } of PARKED) {
    if (existsSync(aside)) renameSync(aside, live);
  }
};

process.on("exit", restore);
process.on("SIGINT", () => process.exit(130));

try {
  rmSync(join(root, "out"), { recursive: true, force: true });
  for (const { live, aside } of PARKED) {
    if (existsSync(live)) renameSync(live, aside);
  }

  execFileSync("npx", ["next", "build"], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, STATIC_EXPORT: "1" },
  });

  const out = join(root, "out");
  inlineFonts(out);
  relativiseLinks(out);
  retargetRuntime(out);
  settleAnimations(out);
  writeReadme(out);

  console.log("\n\u2713 Static site written to out/ \u2014 open out/index.html in a browser.");
} finally {
  restore();
}

/** Every file under `dir` whose name ends with one of `exts`. */
function walk(dir, exts, found = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, exts, found);
    else if (exts.some((e) => entry.endsWith(e))) found.push(full);
  }
  return found;
}

/**
 * Chrome refuses `@font-face` requests from a `file://` origin — they are
 * cross-origin from `null`, and the page silently falls back to a system
 * sans-serif, which quietly destroys the typography this design is built on.
 * `data:` URIs are exempt, so the woff2 files are folded into the stylesheet.
 *
 * Note: opening from disk still logs two font-preload warnings. Next re-adds
 * `<link rel="preload" as="font">` from its inline flight payload at runtime
 * and those requests are genuinely blocked — but the faces themselves come
 * from the inlined data: URIs, so the type renders correctly. The warnings are
 * cosmetic and only visible in devtools.
 */
function inlineFonts(out) {
  let inlined = 0;
  for (const css of walk(out, [".css"])) {
    const dir = dirname(css);
    const next = readFileSync(css, "utf8").replace(
      /url\((?<q>['"]?)(?<path>[^'")]+\.woff2)\k<q>\)/g,
      (whole, _q, path) => {
        const file = join(dir, path);
        if (!existsSync(file)) return whole;
        inlined += 1;
        return `url(data:font/woff2;base64,${readFileSync(file).toString("base64")})`;
      },
    );
    writeFileSync(css, next);
  }
  console.log(`  inlined ${inlined} font file(s) into CSS`);
}

/**
 * Rewrites root-absolute `/…` references to paths relative to each document,
 * so navigation and assets resolve when the folder is opened from disk rather
 * than served from a domain root.
 */
function relativiseLinks(out) {
  for (const html of walk(out, [".html"])) {
    const depth = relative(out, dirname(html)).split(sep).filter(Boolean).length;
    const up = depth === 0 ? "./" : "../".repeat(depth);

    const onDisk = (path) =>
      /* Directory-style routes need an explicit document on disk, and
         cache-busting queries have no meaning on a file system. */
      (path === "" || path.endsWith("/") ? `${path}index.html` : path).split("?")[0];

    const next = readFileSync(html, "utf8")
      .replace(
        /(href|src)="\/(?!\/)([^"]*)"/g,
        (_whole, attr, path) => `${attr}="${up}${onDisk(path)}"`,
      )
      /* The locale gateway's no-script fallback. Its script counterpart
         resolves `file:` on its own; this attribute cannot. */
      .replace(
        /content="(\d+;\s*url=)\/(?!\/)([^"]*)"/gi,
        (_whole, prefix, path) => `content="${prefix}${up}${onDisk(path)}"`,
      )
      /* Runtime chunk URLs also live inside Next's inline flight payload, as
         escaped JSON strings the rule above cannot see. Left absolute they
         resolve against the filesystem root from a `file://` origin, which is
         how a nested page ends up with no stylesheet and system serif type. */
      .replace(/\\?"\/_next\//g, (m) => m.replace("/_next/", `${up}_next/`));
    writeFileSync(html, next);
  }
  console.log("  rewrote absolute links to relative");
}

/**
 * Points Next's client runtime at the folder rather than the filesystem root.
 *
 * `relativiseLinks` fixes the URLs written into the markup, but the chunks the
 * runtime fetches *after* hydration are built from a base path compiled into
 * the runtime itself — one shared file, so it cannot carry a different number
 * of `../` for every page. Left as `/_next/` it resolves to the filesystem
 * root under `file://`, hydration never completes, and the page looks right
 * while nothing on it responds: no theme toggle, no menu, no animation.
 *
 * So the base becomes a global each document sets for itself, before any
 * chunk loads. It is resolved to an absolute URL rather than left as `../`:
 * the runtime does not only build URLs from this value, it also matches it
 * against `document.currentScript.src` to locate itself, and that src is
 * always absolute. The `|| "/_next/"` keeps the file valid if it is ever
 * served over HTTP after all.
 */
function retargetRuntime(out) {
  const GLOBAL = "__ADK_ASSET_BASE__";
  let patched = 0;

  for (const js of walk(join(out, "_next"), [".js"])) {
    const src = readFileSync(js, "utf8");
    if (!src.includes('"/_next/"')) continue;
    writeFileSync(js, src.replaceAll('"/_next/"', `(globalThis.${GLOBAL} || "/_next/")`));
    patched += 1;
  }

  for (const html of walk(out, [".html"])) {
    const depth = relative(out, dirname(html)).split(sep).filter(Boolean).length;
    const up = depth === 0 ? "./" : "../".repeat(depth);
    const src = readFileSync(html, "utf8");
    if (src.includes(GLOBAL)) continue;
    /* First thing in <head>, so it is set before any chunk is requested. */
    writeFileSync(
      html,
      src.replace(
        "<head>",
        `<head><script>globalThis.${GLOBAL}=new URL(${JSON.stringify(
          `${up}_next/`,
        )},document.baseURI).href</script>`,
      ),
    );
  }

  console.log(`  retargeted the client runtime in ${patched} chunk(s)`);
}

/**
 * Renders the entrance animations in their finished state.
 *
 * React does not hydrate from a `file://` origin, and every reveal is
 * server-rendered at its `initial` value — opacity 0. Without this the folder
 * opens to a page that is present in the markup and invisible on screen: the
 * headline missing, the diagrams empty, only the few paragraphs that are not
 * animated showing through.
 *
 * The site already has exactly this rule for visitors with JavaScript off
 * (`.no-js [data-reveal]` in `globals.css`); the inline theme script strips
 * `no-js` before paint, so it cannot apply here. Restating it unconditionally
 * in the exported stylesheet is the same decision — the copy is legible,
 * complete, and simply does not animate.
 */
function settleAnimations(out) {
  const RULE = [
    "",
    "/* Static export: no hydration from file://, so every reveal is settled. */",
    "[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}",
    "",
  ].join("\n");

  const sheets = walk(join(out, "_next"), [".css"]);
  for (const css of sheets) writeFileSync(css, readFileSync(css, "utf8") + RULE);
  console.log(`  settled entrance animations in ${sheets.length} stylesheet(s)`);
}

/** Hand-off note, written into the export so the folder explains itself. */
function writeReadme(out) {
  writeFileSync(
    join(out, "BUKA-SAYA.txt"),
    [
      "ADHIKARSA \u2014 SITUS OFFLINE",
      "PT Adhikarsa Mahatama Teknologi",
      "",
      "CARA MEMBUKA",
      '  Klik dua kali "index.html".',
      "  Tidak perlu install apa pun \u2014 tanpa Node, tanpa npm, tanpa terminal.",
      "",
      "ISI FOLDER",
      "  index.html        \u2014 pengalih bahasa (otomatis ke EN atau ID)",
      "  en/               \u2014 situs versi English",
      "  id/               \u2014 situs versi Bahasa Indonesia",
      "",
      "  Tiap bahasa berisi halaman: Beranda, Perusahaan, Solusi,",
      "  Teknologi, Inovasi, Kontak, Privasi, dan Ketentuan.",
      "",
      "APA YANG BERFUNGSI",
      "  \u00b7 Navigasi antar halaman \u2014 semua link sudah relatif, jadi berpindah",
      "    halaman berfungsi langsung dari folder ini tanpa server.",
      "  \u00b7 Tombol bahasa (EN / ID) dan tombol mode gelap di kanan atas.",
      "    Pilihan Anda tersimpan di browser dan dipakai lagi saat dibuka ulang.",
      "  \u00b7 Seluruh isi halaman, tata letak, warna, dan tipografi. Font Geist",
      "    ditanam di dalam CSS, jadi hurufnya persis sama seperti versi live.",
      "",
      "YANG TIDAK BERFUNGSI DARI FOLDER INI",
      "  Browser tidak menjalankan React dari file:// \u2014 itu batasan browser,",
      "  bukan kesalahan pada situsnya. Jadi di folder ini:",
      "  \u00b7 Animasi tidak berjalan. Semua elemen langsung tampil selesai,",
      "    jadi tidak ada yang hilang \u2014 hanya tidak bergerak.",
      "  \u00b7 Diagram yang mengikuti scroll (ekosistem rumah sakit) dan menu",
      "    versi ponsel tidak interaktif.",
      "  Untuk versi bergerak sepenuhnya, jalankan sebagai server (lihat bawah).",
      "",
      "CATATAN",
      "  \u00b7 Devtools menampilkan dua peringatan font-preload. Itu kosmetik:",
      "    font aslinya dimuat dari data URI di dalam CSS, bukan dari file itu.",
      "",
      "VERSI LENGKAP (dijalankan sebagai server)",
      "  cd adhikarsa && npm install && npm run dev   \u2192  http://localhost:3000",
      "",
      "Dibuat ulang dengan: npm run export",
      "",
    ].join("\n"),
  );
}
