import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArchitectureDiagram } from "@/components/visualizations/ArchitectureDiagram";
import { SECTIONS } from "@/lib/constants";

export function Architecture() {
  return (
    <Section id={SECTIONS.architecture}>
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionHeader
            eyebrow="Technology Architecture"
            index="06"
            headline={["Built to integrate.", "Designed to evolve."]}
            className="lg:max-w-2xl"
          />
          <Reveal preset="fadeUp" delay={0.1} className="lg:max-w-xs lg:pb-2">
            <p className="text-[0.9375rem] leading-[1.65] text-[var(--color-dim)]">
              Three layers, deliberately separable. Point at one to trace what
              it connects to.
            </p>
          </Reveal>
        </div>

        <ArchitectureDiagram className="mt-14 lg:mt-20" />
      </div>
    </Section>
  );
}
