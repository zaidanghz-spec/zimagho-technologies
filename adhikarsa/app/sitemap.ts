import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { LOCALES } from "@/lib/i18n";
import { NAV_PAGES, legalRoute, routeFor } from "@/lib/constants";

/**
 * Every page in every language, with `alternates.languages` so search engines
 * treat the two locales as the same page rather than as competing duplicates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = company.site.url;

  const alternatesFor = (path: (locale: (typeof LOCALES)[number]) => string) => ({
    languages: Object.fromEntries(LOCALES.map((l) => [l, `${base}${path(l)}`])),
  });

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({
      url: `${base}${routeFor(locale, "home")}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: alternatesFor((l) => routeFor(l, "home")),
    });

    for (const page of NAV_PAGES) {
      entries.push({
        url: `${base}${routeFor(locale, page)}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: alternatesFor((l) => routeFor(l, page)),
      });
    }

    for (const legal of ["privacy", "terms"] as const) {
      entries.push({
        url: `${base}${legalRoute(locale, legal)}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.2,
        alternates: alternatesFor((l) => legalRoute(l, legal)),
      });
    }
  }

  return entries;
}
