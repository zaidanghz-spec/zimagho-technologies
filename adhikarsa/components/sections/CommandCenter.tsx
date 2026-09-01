import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HospitalCommandCenter } from "@/components/visualizations/HospitalCommandCenter";
import { SECTIONS } from "@/lib/constants";

export function CommandCenter() {
  return (
    <Section id={SECTIONS.commandCenter} size="tall" className="overflow-hidden">
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionHeader
            eyebrow="Operational Visibility"
            index="03"
            headline={["See the hospital", "as one living system."]}
            className="lg:max-w-2xl"
          />
          <Reveal preset="fadeUp" delay={0.1} className="lg:max-w-sm lg:pb-2">
            <p className="text-[1.0625rem] leading-[1.62] text-[var(--color-dim)]">
              When clinical, operational and financial signals share one
              surface, coordination stops depending on who happens to ask.
              Below is a conceptual rendering of that surface.
            </p>
          </Reveal>
        </div>

        <HospitalCommandCenter className="mt-14 lg:mt-20" />
      </div>
    </Section>
  );
}
