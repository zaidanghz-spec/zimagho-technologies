import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/data/dictionaries";

/**
 * ============================================================================
 * ROUTES
 * ----------------------------------------------------------------------------
 * Every path is built from a locale, so no component ever hand-writes a URL
 * and no link can silently drop the language. `PAGES` is the single list the
 * navbar, the footer, the sitemap and `generateStaticParams` all read from.
 * ==========================================================================
 */

export const PAGE_KEYS = [
  "home",
  "company",
  "solutions",
  "technology",
  "innovation",
  "contact",
] as const;

export type PageKey = (typeof PAGE_KEYS)[number];

/** Path segment for each page. `home` is the locale root. */
const SEGMENT: Record<PageKey, string> = {
  home: "",
  company: "company",
  solutions: "solutions",
  technology: "technology",
  innovation: "innovation",
  contact: "contact",
};

export function routeFor(locale: Locale, page: PageKey): string {
  const segment = SEGMENT[page];
  return segment ? `/${locale}/${segment}` : `/${locale}`;
}

export function legalRoute(locale: Locale, page: "privacy" | "terms"): string {
  return `/${locale}/${page}`;
}

/** Pages that appear in the primary navigation, in order. */
export const NAV_PAGES: PageKey[] = [
  "company",
  "solutions",
  "technology",
  "innovation",
  "contact",
];

export function navLabel(dict: Dictionary, page: PageKey): string {
  return dict.nav[page];
}

/** In-page anchors, used only where a page still tells a scrolling story. */
export const ANCHORS = {
  ecosystem: "ecosystem",
  architecture: "architecture",
  automation: "automation",
  engineering: "engineering",
  profile: "profile",
  approach: "approach",
  statement: "statement",
} as const;
