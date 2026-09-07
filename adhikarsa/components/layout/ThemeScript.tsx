import { LOCALES, LOCALE_TAG } from "@/lib/i18n";

/**
 * Everything about the theme that must not wait for React.
 *
 * This has to be a blocking inline script in <head>. Anything that runs after
 * hydration — an effect, a provider, a layout — is already too late: the page
 * paints light, then snaps to dark, and that white flash is the single most
 * noticeable defect a dark mode can ship with.
 *
 * It also owns the *switching*, not just the initial state, through one
 * delegated listener. `ThemeToggle` renders the control and never handles the
 * click. That split is deliberate:
 *
 *   - the toggle works from the first paint, before any JavaScript bundle has
 *     downloaded, rather than being dead for the first second on a slow link;
 *   - the behaviour lives in exactly one place, so nothing can disagree about
 *     what a click means;
 *   - the static export keeps working. React does not hydrate from a `file://`
 *     origin, so a React `onClick` there would be inert, while this script runs
 *     regardless.
 *
 * `lang` is set here for a related reason. The root layout owns <html> and, at
 * the top of the tree, has no dynamic segment to read the locale from, so the
 * markup ships with the default tag. Correcting it in an effect would leave the
 * accessibility tree wrong for the whole first frame, and a screen reader that
 * has already begun speaking Indonesian with an English voice does not go back.
 * Reading it off the path before paint closes that window entirely.
 *
 * It also strips `no-js`, so everything that must precede paint happens in one
 * script rather than four.
 */
const SCRIPT = `
(function () {
  var d = document.documentElement;
  var KEY = 'adk-theme';
  d.classList.remove('no-js');

  var tags = ${JSON.stringify(
    Object.fromEntries(LOCALES.map((l) => [l, LOCALE_TAG[l]])),
  )};
  var seg = location.pathname.split('/')[1];
  if (tags[seg]) d.lang = tags[seg];

  function store(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
  }

  try {
    var saved = localStorage.getItem(KEY);
    var system = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (saved !== 'light' && system)) d.classList.add('dark');
  } catch (e) {
    /* Private mode or blocked storage: fall back to the light default. */
  }

  /* Delegated, so it survives React replacing the button on hydration and
     works on pages React never reaches. */
  function label(button) {
    var next = d.classList.contains('dark') ? button.dataset.toLight : button.dataset.toDark;
    if (!next) return;
    button.setAttribute('aria-label', next);
    button.setAttribute('title', next);
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest && event.target.closest('[data-theme-toggle]');
    if (!button) return;
    store(d.classList.toggle('dark') ? 'dark' : 'light');
    label(button);
  });
})();
`;

export function ThemeScript() {
  return (
    <script
      // Static string built from compile-time constants; no user input reaches it.
      dangerouslySetInnerHTML={{ __html: SCRIPT }}
    />
  );
}
