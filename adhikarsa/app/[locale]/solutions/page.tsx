import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Automation } from "@/components/sections/Automation";
import { Capabilities } from "@/components/sections/Capabilities";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Engineering } from "@/components/sections/Engineering";
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
  return pageMetadata(locale, "solutions");
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <main id="main" className="pt-16 sm:pt-20">
      <Capabilities dict={dict} />
      <Automation dict={dict} />
      <Engineering dict={dict} />
      <ContactCTA locale={locale} dict={dict} />
    </main>
  );
}
