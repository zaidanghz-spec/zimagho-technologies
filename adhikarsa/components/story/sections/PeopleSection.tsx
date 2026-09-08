import { LargeHeading } from "@/components/story/primitives/LargeHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/story/primitives/Reveal";
import { SectionLabel } from "@/components/story/primitives/SectionLabel";
import { story } from "@/data/story";

/**
 * 11 — The disciplines, not the people.
 *
 * No portraits, no names, no titles. Nobody has been supplied, and a grid of
 * stock headshots or invented advisors would undo the credibility everything
 * above it is trying to build. Naming the disciplines says the true thing —
 * this is work that takes more than engineers — and the section is ready for
 * real names the day there are some to add.
 */
export function PeopleSection() {
  const t = story.people;

  return (
    <section id="people" className="scroll-mt-24 relative border-t border-hairline py-28 sm:py-36">
      <div className="field">
        <SectionLabel>{t.marker}</SectionLabel>

        <div className="measure mt-10">
          <LargeHeading
            lines={t.heading}
            accentLines={[1]}
            className="text-chapter font-medium text-paper"
          />
        </div>

        <RevealGroup as="ul" gap={0.08} className="mt-20 sm:mt-24">
          {t.disciplines.map((d) => (
            <RevealItem
              as="li"
              key={d}
              className="border-t border-hairline py-6 text-mega font-medium tracking-[-0.045em] text-paper-faint transition-colors duration-700 hover:text-paper sm:py-7"
            >
              {d}
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-20 grid gap-8 border-t border-hairline pt-12 sm:mt-24 lg:grid-cols-12">
          <div className="measure lg:col-span-6">
            <LargeHeading
              as="p"
              lines={t.close}
              accentLines={[1]}
              className="text-statement font-medium text-paper"
            />
          </div>
          <Reveal preset="rise" delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="max-w-sm leading-relaxed text-paper-dim">{t.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
