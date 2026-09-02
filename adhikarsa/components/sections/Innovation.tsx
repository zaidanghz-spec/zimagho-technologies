import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ResearchNetwork } from "@/components/visualizations/ResearchNetwork";
import { SECTIONS } from "@/lib/constants";

export function Innovation() {
  return (
    <Section id={SECTIONS.innovation} tone="white" rule>
      <div className="shell">
        <SectionHeader
          eyebrow="Innovation"
          align="center"
          headline={["Exploring what", "comes next."]}
          copy="Our research and development initiatives explore technologies that can improve automation, intelligence, and human–technology collaboration across healthcare and enterprise environments."
          className="mx-auto max-w-3xl"
        />

        <ResearchNetwork className="mt-16 lg:mt-20" />
      </div>
    </Section>
  );
}
