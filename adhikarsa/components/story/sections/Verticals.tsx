import { LargeHeading } from "@/components/story/primitives/LargeHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/story/primitives/Reveal";
import { SectionLabel } from "@/components/story/primitives/SectionLabel";
import { PillarGlyph, type PillarKind } from "@/components/story/visuals/PillarGlyph";
import { story } from "@/data/story";
import { cn } from "@/lib/utils";

/**
 * 06 — The three directions.
 *
 * Not service cards. Each direction gets a full band of the page, alternating
 * side, with its own diagram — and each diagram is the resolution of one of
 * the problem shapes from chapter 02. Scattered records converge; one path
 * branches; a loop is opened into a line.
 *
 * The areas underneath are listed as plain text on a hairline grid rather than
 * as chips, because six rounded pills would turn a statement of scope into a
 * feature list.
 */
export function Verticals() {
  const t = story.verticals;

  return (
    <section id="build" className="scroll-mt-24 relative border-t border-hairline py-28 sm:py-36">
      <div className="field">
        <SectionLabel>{t.marker}</SectionLabel>
        <div className="measure mt-10">
          <LargeHeading
            lines={t.heading}
            accentLines={[1]}
            className="text-chapter font-medium text-paper"
          />
        </div>
      </div>

      <div className="mt-20 sm:mt-28">
        {t.items.map((v, i) => (
          <article
            key={v.key}
            id={v.key}
            className="scroll-mt-24 border-t border-hairline py-20 sm:py-28"
          >
            <div className="field">
              <div
                className={cn(
                  "grid items-center gap-12 lg:grid-cols-12 lg:gap-16",
                  i % 2 === 1 && "lg:[direction:rtl] lg:*:[direction:ltr]",
                )}
              >
                <Reveal preset="focusIn" className="lg:col-span-5">
                  <div className="relative mx-auto aspect-square w-full max-w-[24rem] rounded-2xl border border-hairline bg-void-lift p-9">
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-2xl bg-[radial-gradient(60%_60%_at_50%_40%,rgba(76,111,255,0.1),transparent_70%)]"
                    />
                    <PillarGlyph kind={v.key as PillarKind} className="relative" />
                  </div>
                </Reveal>

                <div className="lg:col-span-6 lg:col-start-7">
                  <Reveal preset="rise">
                    <span className="marker text-cobalt-lift">{v.index}</span>
                  </Reveal>

                  <div className="measure mt-6">
                    <LargeHeading
                      as="h3"
                      lines={[v.name]}
                      className="text-statement font-medium text-paper"
                    />
                  </div>

                  <Reveal preset="rise" delay={0.1} className="mt-5 max-w-md">
                    <p className="text-say text-paper-dim">{v.positioning}</p>
                  </Reveal>

                  <RevealGroup
                    as="ul"
                    gap={0.06}
                    delay={0.14}
                    className="mt-11 grid max-w-lg grid-cols-1 sm:grid-cols-2"
                  >
                    {v.areas.map((a) => (
                      <RevealItem
                        as="li"
                        key={a}
                        className="border-t border-hairline py-3 text-[0.9375rem] text-paper"
                      >
                        {a}
                      </RevealItem>
                    ))}
                  </RevealGroup>

                  <Reveal preset="fade" delay={0.2} className="mt-8 max-w-md">
                    <p className="text-sm leading-relaxed text-paper-faint">{v.note}</p>
                  </Reveal>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
