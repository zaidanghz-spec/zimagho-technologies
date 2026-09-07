import type { Metadata } from "next";
import { getDictionary } from "@/data/dictionaries";
import { LOCALES, OG_LOCALE, type Locale } from "@/lib/i18n";
import { routeFor, legalRoute, type PageKey } from "@/lib/constants";
import { company } from "@/data/company";

/**
 * ============================================================================
 * PER-PAGE METADATA
 * ----------------------------------------------------------------------------
 * Next merges metadata field by field, not deeply: a page that sets
 * `alternates: { canonical }` replaces the layout's `alternates` outright and
 * silently drops the `languages` map with it. That is the whole reason this
 * helper exists — hreflang is the one signal that tells a search engine the
 * English and Indonesian pages are the same document rather than two pages
 * competing for the same queries, and losing it would be invisible in the UI.
 *
 * Every page therefore builds its head through here, and the alternates are
 * assembled from the same route helpers the navigation uses, so a new page or
 * a new language cannot go out of sync with them.
 * ==========================================================================
 */

type Copy = { title: string; description: string };

function head(locale: Locale, copy: Copy, path: (l: Locale) => string): Metadata {
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: path(locale),
      languages: Object.fromEntries(LOCALES.map((l) => [l, path(l)])),
    },
    openGraph: {
      type: "website",
      siteName: company.legalName,
      locale: OG_LOCALE[locale],
      url: path(locale),
      title: copy.title,
      description: copy.description,
    },
  };
}

/** Metadata for one of the six main pages. */
export function pageMetadata(locale: Locale, page: PageKey): Metadata {
  const dict = getDictionary(locale);
  return head(locale, dict.meta[page], (l) => routeFor(l, page));
}

/** Metadata for the two legal pages, whose copy lives under `legal`. */
export function legalMetadata(locale: Locale, page: "privacy" | "terms"): Metadata {
  const dict = getDictionary(locale);
  return head(
    locale,
    { title: dict.legal[page].title, description: dict.legal[page].intro },
    (l) => legalRoute(l, page),
  );
}
