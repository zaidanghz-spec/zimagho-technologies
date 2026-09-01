import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ResearchNetwork } from "@/components/visualizations/ResearchNetwork";
import { SECTIONS } from "@/lib/constants";

export function Research() {
  return (
    <Section id={SECTIONS.research} className="overflow-hidden">
      <div className="shell">
        <SectionHeader
          eyebrow="Research & Development"
          index="08"
          align="center"
          headline={["Building what healthcare", "needs next."]}
          copy="Beyond implementation, Adhikarsa explores emerging technologies that can redefine healthcare operations, intelligent infrastructure, automation, and human–machine collaboration."
          className="mx-auto max-w-3xl"
        />

        <ResearchNetwork className="mt-16 lg:mt-24" />
      </div>
    </Section>
  );
}
