import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/layout/LegalPage";
import { getDictionary } from "@/data/dictionaries";
import { LOCALES, isLocale, type Locale } from "@/lib/i18n";
import { legalMetadata } from "@/lib/metadata";

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
  /* Working drafts, deliberately kept out of the index until counsel
     has reviewed them; still crawlable so the links are not dead ends. */
  return { ...legalMetadata(locale, "terms"), robots: { index: false, follow: true } };
}

export default async function TermsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);
  return <LegalPage locale={locale} dict={dict} copy={dict.legal.terms} />;
}
