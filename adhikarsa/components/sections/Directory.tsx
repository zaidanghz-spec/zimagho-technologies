import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Dictionary } from "@/data/dictionaries";
import type { Locale } from "@/lib/i18n";
import { routeFor, type PageKey } from "@/lib/constants";

/**
 * The homepage's hand-off to the rest of the site.
 *
 * Once the site is more than one page, the home page's real job is orientation:
 * say what the company is, then send the reader to the page that answers their
 * actual question. These four cards are that fork, and each is a whole-card
 * link rather than a card with a link inside it — the entire surface is the
 * target, which is what makes it comfortable on a phone.
 */
export function Directory({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.home.directory;

  return (
    <Section tone="mist" rule>
      <div className="shell">
        <SectionHeader
          eyebrow={t.eyebrow}
          headline={t.lines}
          className="max-w-2xl"
        />

        <RevealGroup
          as="ul"
          gap={0.09}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:gap-5"
        >
          {t.items.map((item, i) => (
            <RevealItem as="li" key={item.key}>
              <Link
                href={routeFor(locale, item.key as PageKey)}
                className="card group/dir flex h-full flex-col justify-between gap-10 p-7 transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-rule-strong hover:shadow-[var(--shadow-lift)] sm:p-8"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="annotation text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 shrink-0 text-faint transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/dir:translate-x-0.5 group-hover/dir:-translate-y-0.5 group-hover/dir:text-brand"
                  />
                </div>

                <div>
                  <h3 className="text-title font-medium text-ink">{item.label}</h3>
                  <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-slate">
                    {item.copy}
                  </p>
                  {/* Blue rule that draws itself as the card is approached. */}
                  <span
                    aria-hidden
                    className="mt-6 block h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/dir:scale-x-100"
                  />
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
