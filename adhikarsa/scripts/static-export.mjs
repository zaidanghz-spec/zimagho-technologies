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

    const next = readFileSync(html, "utf8").replace(
      /(href|src)="\/(?!\/)([^"]*)"/g,
      (_whole, attr, path) => {
        /* Directory-style routes need an explicit document on disk. */
        const target = path === "" || path.endsWith("/") ? `${path}index.html` : path;
        /* Cache-busting queries have no meaning on a file system. */
        return `${attr}="${up}${target.split("?")[0]}"`;
      },
    );
    writeFileSync(html, next);
  }
  console.log("  rewrote absolute links to relative");
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
      "APA YANG BERFUNGSI",
      "  Seluruh halaman: animasi scroll, diagram ekosistem rumah sakit lima",
      "  tahap, arsitektur interaktif, konstelasi R&D, dan semua",
      "  microinteraction. Font Geist ditanam di dalam CSS, jadi tipografinya",
      "  persis sama seperti versi live.",
      "",
      "CATATAN",
      '  \u00b7 Link "Privacy" dan "Terms" perlu server untuk berpindah halaman.',
      "    Semua navigasi utama (anchor) berfungsi normal.",
      "  \u00b7 Devtools menampilkan dua peringatan font-preload. Itu kosmetik:",
      "    font aslinya dimuat dari data URI di dalam CSS, bukan dari file itu.",
      "",
      "VERSI LENGKAP (dengan routing antar halaman)",
      "  cd adhikarsa && npm install && npm run dev   \u2192  http://localhost:3000",
      "",
      "Dibuat ulang dengan: npm run export",
      "",
    ].join("\n"),
  );
}
