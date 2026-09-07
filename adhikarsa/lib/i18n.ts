/**
 * ============================================================================
 * LOCALES
 * ----------------------------------------------------------------------------
 * Both languages are first-class: `/en/...` and `/id/...`, with no implicit
 * default hiding at the root. That symmetry is deliberate — an Indonesian
 * company profile shown to Indonesian institutions should not treat Indonesian
 * as the translation of the "real" site, and every page stays shareable as a
 * URL in the language it was read in.
 * ==========================================================================
 */

export const LOCALES = ["en", "id"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABEL: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
};

/** Short form for the toggle, where space is tight. */
export const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  id: "ID",
};

/** BCP 47 tags for <html lang> and OpenGraph. */
export const LOCALE_TAG: Record<Locale, string> = {
  en: "en",
  id: "id-ID",
};

export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  id: "id_ID",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Rewrites a path into another locale, preserving the page.
 * `/en/solutions` + `id` → `/id/solutions`.
 */
export function switchLocalePath(pathname: string, next: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && isLocale(segments[0])) {
    segments[0] = next;
    return `/${segments.join("/")}`;
  }
  return `/${next}${pathname === "/" ? "" : pathname}`;
}
