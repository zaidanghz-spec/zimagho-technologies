import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArchitectureDiagram } from "@/components/visualizations/ArchitectureDiagram";
import type { Dictionary } from "@/data/dictionaries";
import { ANCHORS } from "@/lib/constants";

export function Architecture({ dict }: { dict: Dictionary }) {
  const t = dict.technology.architecture;
  return (
    <Section id={ANCHORS.architecture} tone="tint">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionHeader
            eyebrow={t.eyebrow}
            headline={t.lines}
            className="lg:max-w-2xl"
          />
          <Reveal preset="rise" delay={0.1} className="lg:max-w-xs lg:pb-2">
            <p className="text-[0.9375rem] leading-relaxed text-slate">{t.body}</p>
          </Reveal>
        </div>

        <ArchitectureDiagram copy={t} className="mt-14 lg:mt-20" />
      </div>
    </Section>
  );
}
