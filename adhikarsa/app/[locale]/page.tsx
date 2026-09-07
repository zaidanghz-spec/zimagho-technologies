import { ContactCTA } from "@/components/sections/ContactCTA";
import { Directory } from "@/components/sections/Directory";
import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { getDictionary } from "@/data/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/layout/StructuredData";

/**
 * Home — orientation, not the whole company.
 *
 * Its job is to say who Adhikarsa is and then hand the reader to the page that
 * answers their actual question. Everything deeper lives on its own route.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <>
      <StructuredData locale={locale} dict={dict} />
      <main id="main">
        <Hero locale={locale} dict={dict} />
        <About intro={dict.home.intro} pillars={dict.home.pillars} />
        <Directory locale={locale} dict={dict} />
        <ContactCTA locale={locale} dict={dict} />
      </main>
    </>
  );
}
