import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { About } from "@/components/sections/About";
import { CompanyInformation } from "@/components/sections/CompanyInformation";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { CorporateStatement } from "@/components/sections/CorporateStatement";
import { WhyAdhikarsa } from "@/components/sections/WhyAdhikarsa";
import { PageHeader } from "@/components/layout/PageHeader";
import { getDictionary } from "@/data/dictionaries";
import { LOCALES, isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "company");
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <main id="main">
      <PageHeader
        eyebrow={dict.company.hero.eyebrow}
        lines={dict.company.hero.lines}
        body={dict.company.hero.body}
      />
      <About intro={dict.home.intro} pillars={dict.home.pillars} rule={false} />
      <WhyAdhikarsa dict={dict} />
      <CorporateStatement dict={dict} />
      <CompanyInformation dict={dict} />
      <ContactCTA locale={locale} dict={dict} />
    </main>
  );
}
