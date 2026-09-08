import { LargeHeading } from "@/components/story/primitives/LargeHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/story/primitives/Reveal";
import { SectionLabel } from "@/components/story/primitives/SectionLabel";
import { ProductFrame, type FrameKind } from "@/components/story/visuals/ProductFrame";
import { story } from "@/data/story";

/**
 * 09 — What is being built, stated as what it is.
 *
 * The brief for this section is a product showcase, and the honest version of
 * a product showcase for work that has not shipped is a development showcase.
 * So the disclaimer sits at the top rather than in small print at the bottom,
 * every item carries a status, and the interfaces are drawn empty. A visitor
 * should leave knowing exactly how far along this is.
 */
export function ResearchSection() {
  const t = story.research;

  return (
    <section id="research" className="scroll-mt-24 relative border-t border-hairline py-28 sm:py-36">
      <div className="field">
        <SectionLabel>{t.marker}</SectionLabel>

        <div className="measure mt-10">
          <LargeHeading lines={t.heading} className="text-chapter font-medium text-paper" />
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal preset="rise" delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <p className="flex max-w-md items-start gap-3 rounded-lg border border-dashed border-hairline-strong p-4 text-sm leading-relaxed text-paper-dim">
              <span aria-hidden className="mt-1.5 size-1 shrink-0 rounded-full bg-cobalt" />
              {t.disclaimer}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-20 sm:mt-28">
        {t.items.map((item) => (
          <article key={item.key} className="border-t border-hairline py-20 sm:py-24">
            <div className="field">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <Reveal preset="rise" className="flex items-center gap-4">
                    <span className="marker text-cobalt-lift">{item.index}</span>
                    <span className="marker rounded-full border border-hairline-strong px-2.5 py-1 text-paper-faint">
                      {item.status}
                    </span>
                  </Reveal>

                  <div className="measure mt-7">
                    <LargeHeading
                      as="h3"
                      lines={[item.name]}
                      className="text-statement font-medium text-paper"
                    />
                  </div>

                  <Reveal preset="rise" delay={0.08} className="mt-5">
                    <p className="text-say text-cobalt-lift">{item.tagline}</p>
                  </Reveal>

                  <Reveal preset="rise" delay={0.14} className="mt-6 max-w-md">
                    <p className="leading-[1.72] text-paper-dim">{item.body}</p>
                  </Reveal>

                  <RevealGroup as="ul" gap={0.06} delay={0.2} className="mt-10 max-w-md">
                    {item.capabilities.map((c) => (
                      <RevealItem
                        as="li"
                        key={c}
                        className="border-t border-hairline py-3 text-[0.9375rem] text-paper"
                      >
                        {c}
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </div>

                <Reveal preset="focusIn" className="lg:col-span-7 lg:col-start-6">
                  <ProductFrame kind={item.key as FrameKind} />
                </Reveal>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
