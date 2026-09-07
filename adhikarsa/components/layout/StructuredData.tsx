import { company } from "@/data/company";
import type { Dictionary } from "@/data/dictionaries";
import { LOCALES, type Locale } from "@/lib/i18n";

/**
 * Organization schema. Asserts only what the company has actually stated — no
 * ratings, headcount, awards, certifications, or client claims.
 */
export function StructuredData({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    alternateName: company.wordmark,
    url: `${company.site.url}/${locale}`,
    description: dict.meta.home.description,
    inLanguage: LOCALES,
    address: { "@type": "PostalAddress", addressCountry: "ID" },
    knowsAbout: dict.company.profile.values.coreFocus,
  };

  return (
    <script
      type="application/ld+json"
      // Serialized from local literals — no user input reaches this string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
