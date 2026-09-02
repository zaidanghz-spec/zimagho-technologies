import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkflowVisualization } from "@/components/visualizations/WorkflowVisualization";
import { SECTIONS } from "@/lib/constants";

export function Automation() {
  return (
    <Section id={SECTIONS.automation} tone="white">
      <div className="shell">
        {/* Stacks until xl: at 1024 a side-by-side row squeezes the header
            below the width its own headline needs. */}
        <div className="flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between xl:gap-16">
          <SectionHeader
            eyebrow="Process Automation"
            headline={["Complex workflows.", "Simplified by technology."]}
            className="xl:max-w-2xl"
          />
          <div className="xl:max-w-sm xl:pb-2">
            <Reveal preset="riseSoft" delay={0.08}>
              <p className="text-lead text-[var(--color-slate)]">
                We design automation around existing operational processes,
                helping institutions reduce manual work while maintaining
                visibility and control.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal preset="rise" className="mt-16 lg:mt-24">
          <WorkflowVisualization />
        </Reveal>
      </div>
    </Section>
  );
}
