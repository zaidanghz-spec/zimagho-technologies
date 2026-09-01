import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IntelligenceCore } from "@/components/visualizations/IntelligenceCore";
import { SECTIONS } from "@/lib/constants";

export function Intelligence() {
  return (
    <Section
      id={SECTIONS.intelligence}
      size="tall"
      className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(5,7,10,0)_0%,rgba(5,7,10,0.75)_28%,rgba(5,7,10,0.75)_72%,rgba(5,7,10,0)_100%)]"
    >
      <div className="shell relative">
        <SectionHeader
          eyebrow="Healthcare Intelligence"
          index="05"
          align="center"
          headline={["AI designed around", "real-world healthcare."]}
          copy="We develop intelligent systems that transform complex healthcare data and workflows into tools that support faster, more informed institutional decisions."
          className="mx-auto max-w-3xl"
        />

        <Reveal preset="fadeUp" className="mt-16 lg:mt-24">
          <IntelligenceCore />
        </Reveal>

        {/* Scope statement. Non-negotiable framing for anything clinical. */}
        <Reveal
          preset="blurUp"
          delay={0.1}
          className="mx-auto mt-16 max-w-3xl lg:mt-24"
        >
          <div className="panel flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-start sm:gap-5 sm:p-8">
            <span className="hairline flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.03] text-[var(--color-signal)]">
              <ShieldCheck className="size-4" />
            </span>
            <div>
              <h3 className="mono-label text-[var(--color-dim)]">
                How we scope clinical AI
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.65] text-[var(--color-dim)]">
                Adhikarsa builds systems that support institutional decisions —
                surfacing information, ranking operational priorities, and
                automating process steps. They are designed to assist qualified
                healthcare professionals, who remain accountable for clinical
                judgement. We do not build systems that diagnose independently
                or act in place of a clinician, and any deployment is scoped
                with the institution&rsquo;s own governance, review, and
                oversight in place.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
