import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { company, currentYear } from "@/data/company";
import type { Dictionary } from "@/data/dictionaries";
import type { Locale } from "@/lib/i18n";
import { routeFor } from "@/lib/constants";

type LegalCopy = Dictionary["legal"]["privacy"];

/**
 * Shared shell for the legal pages.
 *
 * The copy is a working draft written to be accurate about how this site
 * actually behaves — it is not a substitute for review by counsel, which the
 * banner states plainly rather than burying.
 */
export function LegalPage({
  locale,
  dict,
  copy,
}: {
  locale: Locale;
  dict: Dictionary;
  copy: LegalCopy;
}) {
  return (
    <main id="main" className="shell pt-36 pb-24 sm:pt-44 lg:pt-48">
      <div className="mx-auto max-w-3xl">
        <Reveal preset="rise">
          <Eyebrow tone="neutral">{company.legalName}</Eyebrow>
        </Reveal>

        <Reveal preset="riseSoft" delay={0.06}>
          <h1 className="mt-6 text-headline font-medium text-ink">{copy.title}</h1>
        </Reveal>

        <Reveal preset="riseSoft" delay={0.12}>
          <p className="mt-6 text-lg leading-[1.62] text-slate">{copy.intro}</p>
        </Reveal>

        <Reveal preset="rise" delay={0.18}>
          <p className="eyebrow mt-8 flex items-center gap-2 rounded-lg border border-dashed border-rule-strong px-4 py-3 text-brand">
            <span aria-hidden className="size-1 rounded-full bg-brand" />
            {dict.legal.draftNotice}
          </p>
        </Reveal>

        <RevealGroup as="div" gap={0.08} className="mt-16 flex flex-col">
          {copy.sections.map((s) => (
            <RevealItem key={s.heading} as="section" className="border-t border-rule py-8">
              <h2 className="text-lg font-medium text-ink">{s.heading}</h2>
              <p className="mt-3 leading-[1.68] text-slate">{s.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-12 text-xs text-muted">
          {dict.legal.lastReviewed} {currentYear}.
        </p>

        <Link
          href={routeFor(locale, "home")}
          className="mt-12 inline-flex items-center gap-2 rounded-full text-sm text-slate transition-colors hover:text-ink"
        >
          <ArrowRight aria-hidden className="size-4 rotate-180" />
          {dict.actions.backHome}
        </Link>
      </div>
    </main>
  );
}
