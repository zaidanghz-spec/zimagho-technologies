import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { HtmlLang } from "@/components/layout/HtmlLang";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { GradientDefs } from "@/components/visualizations/GradientDefs";
import { company } from "@/data/company";
import { getDictionary } from "@/data/dictionaries";
import { LOCALES, isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Params = { locale: string };

/** Both locales are prerendered; nothing is resolved at request time. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const meta = getDictionary(locale).meta.home;

  return {
    /* Canonical, hreflang and OpenGraph for the locale root; every page below
       replaces them with its own through the same helper. */
    ...pageMetadata(locale, "home"),
    /* These two are inherited rather than replaced, so a page only has to
       supply its own name. */
    title: { default: meta.title, template: `%s | ${company.shortName}` },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <MotionProvider>
      <HtmlLang locale={locale} />
      <GradientDefs />
      <ScrollProgress />
      <Navbar locale={locale} dict={dict} />
      {children}
      <Footer locale={locale} dict={dict} />
    </MotionProvider>
  );
}
