import { LargeHeading } from "@/components/story/primitives/LargeHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/story/primitives/Reveal";
import { SectionLabel } from "@/components/story/primitives/SectionLabel";
import { story } from "@/data/story";

/**
 * 08 — Capability, not a toolchain.
 *
 * No language logos. A wall of framework marks tells a reader what was
 * installed, never what the company can do with it, and on a page arguing that
 * implementation is the hard part it would contradict the argument outright.
 *
 * Seven rows on a hairline grid, each a capability and the position taken on
 * it. The position is the content; the capability alone would be a list.
 */
export function TechnologySection() {
  const t = story.technology;

  return (
    <section id="technology" className="scroll-mt-24 relative border-t border-hairline py-28 sm:py-36">
      <div className="field">
        <SectionLabel>{t.marker}</SectionLabel>

        <div className="measure mt-10">
          <LargeHeading lines={t.heading} className="text-chapter font-medium text-paper" />
        </div>
        <Reveal preset="rise" delay={0.1} className="mt-9">
          <p className="max-w-xl text-say text-paper-dim">{t.body}</p>
        </Reveal>

        <RevealGroup as="ul" gap={0.07} className="mt-20 sm:mt-24">
          {t.capabilities.map((c, i) => (
            <RevealItem
              as="li"
              key={c.name}
              className="group/cap grid grid-cols-[3rem_1fr] items-baseline gap-x-4 gap-y-3 border-t border-hairline py-7 sm:grid-cols-[4rem_minmax(0,22rem)_1fr] sm:gap-x-8 sm:py-8"
            >
              <span className="marker text-paper-faint transition-colors duration-500 group-hover/cap:text-cobalt-lift">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[1.375rem] leading-tight font-medium tracking-[-0.02em] text-paper sm:text-[1.625rem]">
                {c.name}
              </h3>
              <p className="col-start-2 max-w-xl leading-relaxed text-paper-dim sm:col-start-3">
                {c.line}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
