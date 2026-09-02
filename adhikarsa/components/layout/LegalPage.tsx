import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { company, currentYear } from "@/data/company";

type Section = { heading: string; body: string };

/**
 * Shared shell for the legal pages.
 *
 * The copy is a working draft written to be accurate about how this site
 * actually behaves — it is not a substitute for review by counsel, which the
 * banner states plainly rather than burying.
 */
export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: Section[];
}) {
  return (
    <>
      <main id="main" className="shell pt-36 pb-24 sm:pt-44 lg:pt-48">
        <div className="mx-auto max-w-3xl">
          <Reveal preset="rise">
            <Eyebrow tone="neutral">{company.legalName}</Eyebrow>
          </Reveal>

          <Reveal preset="riseSoft" delay={0.06}>
            <h1 className="mt-6 text-headline font-medium text-[var(--color-ink)]">{title}</h1>
          </Reveal>

          <Reveal preset="riseSoft" delay={0.12}>
            <p className="mt-6 text-lg leading-[1.62] text-[var(--color-slate)]">
              {intro}
            </p>
          </Reveal>

          <Reveal preset="rise" delay={0.18}>
            <p className="eyebrow mt-8 flex items-center gap-2 rounded-lg border border-dashed border-[var(--color-rule-strong)] px-4 py-3 text-[0.5625rem] text-[var(--color-brand)]">
              <span aria-hidden className="size-1 rounded-full bg-[var(--color-brand)]" />
              Working draft — pending review by counsel
            </p>
          </Reveal>

          <RevealGroup as="div" gap={0.08} className="mt-16 flex flex-col">
            {sections.map((s) => (
              <RevealItem
                key={s.heading}
                as="section"
                className="border-t border-[var(--color-rule)] py-8"
              >
                <h2 className="text-lg font-medium text-[var(--color-ink)]">
                  {s.heading}
                </h2>
                <p className="mt-3 leading-[1.68] text-[var(--color-slate)]">
                  {s.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <p className="mt-12 text-xs text-[var(--color-muted)]">
            Last reviewed {currentYear}.
          </p>

          <Link
            href="/"
            className="mt-12 inline-flex items-center gap-2 rounded-full text-sm text-[var(--color-slate)] transition-colors hover:text-[var(--color-ink)]"
          >
            <ArrowRight aria-hidden className="size-4 rotate-180" />
            Back to homepage
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
