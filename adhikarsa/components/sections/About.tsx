import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SECTIONS } from "@/lib/constants";

const PILLARS = [
  {
    n: "01",
    title: "Intelligence",
    copy: "Technology that turns information into better decisions.",
  },
  {
    n: "02",
    title: "Integration",
    copy: "Connecting fragmented systems into a unified ecosystem.",
  },
  {
    n: "03",
    title: "Automation",
    copy: "Transforming repetitive processes into efficient digital workflows.",
  },
];

export function About() {
  return (
    <Section id={SECTIONS.company} tone="white" rule>
      <div className="shell">
        {/* Editorial statement on the left, the company's own account of
            itself on the right. Two voices, one row. */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal preset="rise">
              <Eyebrow>About Adhikarsa</Eyebrow>
            </Reveal>
            <AnimatedText
              lines={["Technology should make", "complex institutions", "work intelligently."]}
              className="mt-7 text-headline font-medium text-[var(--color-ink)]"
            />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5 lg:pt-3">
            <Reveal preset="riseSoft" delay={0.08}>
              <p className="text-lead text-[var(--color-slate)]">
                PT Adhikarsa Mahatama Teknologi is a technology company focused
                on developing integrated digital systems, automation, and
                intelligent solutions for modern institutions.
              </p>
            </Reveal>
            <Reveal preset="riseSoft" delay={0.16}>
              <p className="text-lead text-[var(--color-slate)]">
                Our approach combines software engineering, systems integration,
                automation, and artificial intelligence to solve complex
                operational challenges.
              </p>
            </Reveal>
          </div>
        </div>

        <RevealGroup
          as="ol"
          gap={0.12}
          className="mt-20 grid border-t border-[var(--color-rule)] bg-white sm:grid-cols-3 lg:mt-28"
        >
          {PILLARS.map((p) => (
            <RevealItem as="li" key={p.n} className="bg-white pt-8 pr-6 pb-2 sm:border-r sm:border-[var(--color-rule)] sm:pr-8 sm:pl-8 sm:first:border-l-0 sm:first:pl-0 sm:last:border-r-0 sm:pt-10">
              <span className="annotation text-[var(--color-brand)]">{p.n}</span>
              <h3 className="mt-5 text-title font-medium text-[var(--color-ink)]">
                {p.title}
              </h3>
              <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                {p.copy}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
