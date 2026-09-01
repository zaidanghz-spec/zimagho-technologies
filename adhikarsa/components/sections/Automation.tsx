import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BeforeAfter } from "@/components/visualizations/BeforeAfter";
import { WorkflowEngine } from "@/components/visualizations/WorkflowEngine";
import { SECTIONS } from "@/lib/constants";

export function Automation() {
  return (
    <Section id={SECTIONS.automation}>
      <div className="shell">
        <SectionHeader
          eyebrow="Automation Engine"
          index="04"
          headline={["From repetitive workflows", "to autonomous operations."]}
          copy="A patient journey touches a dozen systems. The engine carries state across all of them, so each step begins with what the previous one already established."
        />

        <Reveal preset="fadeUp" className="mt-16 lg:mt-24">
          <WorkflowEngine />
        </Reveal>

        <div className="mt-20 lg:mt-28">
          <BeforeAfter />
        </div>
      </div>
    </Section>
  );
}
