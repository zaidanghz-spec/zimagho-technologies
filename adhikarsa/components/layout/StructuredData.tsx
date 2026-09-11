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
    /* Now that the particulars exist, they belong here too — this is the block
       a search engine reads to show an address and a number beside the name. */
    email: company.contactEmail ?? undefined,
    telephone: company.contactPhone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Menara Cakrawala Lt. 12, Unit 05A, Jl. M.H. Thamrin No. 9",
      addressLocality: "Menteng, Jakarta Pusat",
      addressRegion: "DKI Jakarta",
      postalCode: "10340",
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: company.contactPhone,
      email: company.contactEmail ?? undefined,
      areaServed: "ID",
      availableLanguage: ["id", "en"],
    },
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
