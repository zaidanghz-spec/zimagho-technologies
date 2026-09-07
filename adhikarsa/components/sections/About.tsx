import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import type { Dictionary } from "@/data/dictionaries";

type Intro = Dictionary["home"]["intro"];
type Pillars = Dictionary["home"]["pillars"];

/**
 * Company introduction: an editorial statement on the left, the company's own
 * account of itself on the right, then three pillars on a ruled grid.
 *
 * Shared by the homepage and the company page — the same argument opens both,
 * so it lives in one component rather than two that drift apart.
 */
export function About({
  intro,
  pillars,
  rule = true,
}: {
  intro: Intro;
  pillars: Pillars;
  rule?: boolean;
}) {
  return (
    <Section tone="white" rule={rule}>
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="measure lg:col-span-7">
            <Reveal preset="rise">
              <Eyebrow>{intro.eyebrow}</Eyebrow>
            </Reveal>
            <AnimatedText
              lines={intro.lines}
              className="mt-7 text-headline font-medium text-ink"
            />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5 lg:pt-3">
            {intro.body.map((paragraph, i) => (
              <Reveal key={i} preset="riseSoft" delay={0.08 + i * 0.08}>
                <p className="text-lead text-slate">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <RevealGroup
          as="ol"
          gap={0.12}
          className="mt-20 grid border-t border-rule bg-canvas sm:grid-cols-3 lg:mt-28"
        >
          {pillars.items.map((p) => (
            <RevealItem
              as="li"
              key={p.n}
              className="bg-canvas pt-8 pr-6 pb-2 sm:border-r sm:border-rule sm:pt-10 sm:pr-8 sm:pl-8 sm:first:border-l-0 sm:first:pl-0 sm:last:border-r-0"
            >
              <span className="annotation text-brand">{p.n}</span>
              <h3 className="mt-5 text-title font-medium text-ink">{p.title}</h3>
              <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-slate">
                {p.copy}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
