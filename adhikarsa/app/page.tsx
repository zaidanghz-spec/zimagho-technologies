import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n";

/**
 * Locale gateway at `/`.
 *
 * Written as a real page rather than a `redirect()` because the site also ships
 * as a static export, where server redirects do not exist. Three fallbacks, in
 * order of speed:
 *
 *   1. an inline script that honours a stored choice, then the browser's own
 *      language, then the default
 *   2. a `<meta http-equiv="refresh">` for when scripting is off
 *   3. a plain link, so the page is never a dead end
 *
 * Nothing is indexed here — the locale pages carry the canonical URLs.
 */

const SCRIPT = `
(function () {
  /* Opened from disk there is no server to resolve "/en/", so the export
     variant addresses the document itself, relative to this file. */
  var file = location.protocol === 'file:';
  var head = file ? './' : '/';
  var tail = file ? '/index.html' : '/';
  try {
    var supported = ${JSON.stringify(LOCALES)};
    var stored = localStorage.getItem('adk-locale');
    var picked = supported.indexOf(stored) > -1 ? stored : null;
    if (!picked) {
      var langs = navigator.languages || [navigator.language || ''];
      for (var i = 0; i < langs.length && !picked; i++) {
        var base = String(langs[i]).toLowerCase().split('-')[0];
        if (supported.indexOf(base) > -1) picked = base;
      }
    }
    location.replace(head + (picked || '${DEFAULT_LOCALE}') + tail);
  } catch (e) {
    location.replace(head + '${DEFAULT_LOCALE}' + tail);
  }
})();
`;

export const metadata = {
  robots: { index: false, follow: true },
};

export default function LocaleGateway() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=/${DEFAULT_LOCALE}/`} />
      {/* Static string built from a compile-time constant; no input reaches it. */}
      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
      <main
        style={{
          minHeight: "100svh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <a href={`/${DEFAULT_LOCALE}/`}>Adhikarsa Mahatama Teknologi</a>
      </main>
    </>
  );
}
