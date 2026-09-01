"use client";

import {
  Boxes,
  Brain,
  Cpu,
  LineChart,
  Radio,
  Workflow,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  DecisionVisual,
  DevStreamVisual,
  IntegrationVisual,
  IntelligenceVisual,
  IoTVisual,
  WorkflowVisual,
} from "@/components/visualizations/ModuleVisuals";
import { SECTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Module = {
  title: string;
  copy: string;
  icon: ComponentType<{ className?: string }>;
  visual: ReactNode;
  /** Explicit grid placement — the asymmetry is the layout, not a side effect. */
  span: string;
  /** Visual treatment: `hero` gives the module a full-width stage. */
  scale?: "hero" | "wide" | "compact";
  accent?: string;
};

const MODULES: Module[] = [
  {
    title: "Hospital Workflow Automation",
    copy: "Automate repetitive operational processes and improve coordination across departments.",
    icon: Workflow,
    visual: <WorkflowVisual />,
    span: "lg:col-span-7 lg:row-span-2",
    scale: "hero",
  },
  {
    title: "AI Decision Support",
    copy: "Deploy intelligent systems that assist teams with analysis, prioritization, and operational decision-making.",
    icon: Brain,
    visual: <DecisionVisual />,
    span: "lg:col-span-5",
    scale: "wide",
    accent: "139,92,246",
  },
  {
    title: "System Integration",
    copy: "Connect HIS, EMR, laboratory, pharmacy, radiology, finance, and other existing platforms.",
    icon: Boxes,
    visual: <IntegrationVisual />,
    span: "lg:col-span-5",
    scale: "wide",
  },
  {
    title: "Real-Time Operational Intelligence",
    copy: "Transform hospital operational data into actionable information.",
    icon: LineChart,
    visual: <IntelligenceVisual />,
    span: "lg:col-span-4",
    scale: "compact",
  },
  {
    title: "Smart Infrastructure & IoT",
    copy: "Connect physical hospital infrastructure with intelligent monitoring and automation.",
    icon: Radio,
    visual: <IoTVisual />,
    span: "lg:col-span-4",
    scale: "compact",
    accent: "16,185,129",
  },
  {
    title: "Custom Technology Development",
    copy: "Design and build technology tailored to specific institutional workflows.",
    icon: Cpu,
    visual: <DevStreamVisual />,
    span: "lg:col-span-4",
    scale: "compact",
  },
];

export function Platform() {
  return (
    <Section id={SECTIONS.platform}>
      <div className="shell">
        <SectionHeader
          eyebrow="One Connected Ecosystem"
          index="02"
          headline={["One intelligence layer.", "Across the hospital."]}
          copy="Six capabilities engineered as one platform. Each is deployable on its own and stronger in combination — the connective layer is the product."
        />

        <RevealGroup
          as="ul"
          gap={0.07}
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-5"
        >
          {MODULES.map((m) => (
            <RevealItem as="li" key={m.title} className={cn("sm:col-span-1", m.span)}>
              <ModuleCard module={m} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}

function ModuleCard({ module: m }: { module: Module }) {
  const Icon = m.icon;
  const isHero = m.scale === "hero";

  return (
    <GlowCard className="h-full" glowColor={m.accent} tilt={isHero ? 2 : 3}>
      <div
        className={cn(
          "flex h-full flex-col",
          isHero ? "p-7 lg:p-9" : "p-6 lg:p-7",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <span className="hairline flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.03] text-[var(--color-signal)]">
            <Icon className="size-4" />
          </span>
          <span className="mono-label pt-1 text-[0.5625rem] opacity-60">Module</span>
        </div>

        <h3
          className={cn(
            "mt-6 font-medium tracking-[-0.02em] text-[var(--color-paper)]",
            isHero ? "text-2xl lg:text-[1.75rem]" : "text-lg lg:text-xl",
          )}
        >
          {m.title}
        </h3>

        <p
          className={cn(
            "mt-3 leading-[1.6] text-[var(--color-dim)]",
            isHero ? "max-w-md text-[0.9375rem] lg:text-base" : "text-sm",
          )}
        >
          {m.copy}
        </p>

        {/* Stage: the visual gets real room instead of sitting as a decoration */}
        <div
          className={cn(
            "relative mt-auto w-full overflow-hidden rounded-xl border border-white/[0.055] bg-[rgba(5,7,10,0.55)]",
            isHero ? "mt-10 h-44 p-5 lg:h-56 lg:p-7" : "mt-8 h-24 p-4",
          )}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_120%_at_50%_0%,rgba(56,189,248,0.07),transparent_70%)]"
          />
          <div className="relative h-full">{m.visual}</div>
        </div>
      </div>
    </GlowCard>
  );
}
