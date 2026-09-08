import { LargeHeading } from "@/components/story/primitives/LargeHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/story/primitives/Reveal";
import { SectionLabel } from "@/components/story/primitives/SectionLabel";
import { LogoMark } from "@/components/brand/Logo";
import { story } from "@/data/story";

/**
 * 05 — The company, finally named.
 *
 * Held back until here on purpose. A visitor who has just agreed that the
 * problem is real reads "Adhikarsa" as an answer; the same paragraph at the
 * top of the page would have read as a company description. The name gets the
 * full width of the field for that reason — it is the pivot of the page, not a
 * subhead over a column of body copy.
 *
 * The three facts are the only figures on the site, and each states a position
 * rather than a size. There is no headcount, no funding and no client count,
 * because none was supplied and none would be true.
 */
export function MeetAdhikarsa() {
  const t = story.company;

  return (
    <section id="company" className="scroll-mt-24 relative border-t border-hairline py-28 sm:py-36 lg:py-44">
      <div className="field measure">
        <SectionLabel>{t.marker}</SectionLabel>

        <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-6">
          <LargeHeading lines={t.heading} className="text-chapter font-medium text-paper" />
          <Reveal preset="focusIn" delay={0.3} className="pb-2">
            <LogoMark className="h-10 w-10 text-cobalt-lift sm:h-12 sm:w-12" />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 sm:mt-20 lg:grid-cols-12 lg:gap-16">
          <Reveal preset="rise" className="lg:col-span-6">
            <p className="text-say text-paper">{t.body}</p>
          </Reveal>
          <Reveal preset="rise" delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <p className="leading-[1.72] text-paper-dim">{t.philosophy}</p>
          </Reveal>
        </div>

        {/* Across the whole field, so the section closes on a full-width rule
            rather than trailing off under an empty half. */}
        <RevealGroup as="dl" gap={0.09} delay={0.12} className="mt-20 grid sm:mt-24 sm:grid-cols-3">
          {t.facts.map((f) => (
            <RevealItem
              key={f.k}
              className="border-t border-hairline pt-6 pb-2 sm:pr-10"
            >
              <dt className="marker text-paper-faint">{f.k}</dt>
              <dd className="mt-4 text-[1.125rem] text-paper sm:text-[1.25rem]">{f.v}</dd>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
