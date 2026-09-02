"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GLYPHS, type GlyphKey } from "@/components/visualizations/CapabilityGlyph";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/animations";
import { SECTIONS } from "@/lib/constants";

const CAPABILITIES: {
  n: string;
  title: string;
  copy: string;
  glyph: GlyphKey;
}[] = [
  {
    n: "01",
    title: "Hospital Automation",
    copy: "Design intelligent workflows that reduce repetitive processes and improve operational coordination.",
    glyph: "automation",
  },
  {
    n: "02",
    title: "System Integration",
    copy: "Connect hospital systems, applications, databases, devices, and digital infrastructure.",
    glyph: "integration",
  },
  {
    n: "03",
    title: "Artificial Intelligence",
    copy: "Develop AI-powered tools designed to support analysis, automation, prioritization, and institutional decision-making.",
    glyph: "intelligence",
  },
  {
    n: "04",
    title: "Custom Software Development",
    copy: "Develop enterprise software around the specific requirements and workflows of an organization.",
    glyph: "development",
  },
  {
    n: "05",
    title: "Data & Operational Intelligence",
    copy: "Transform operational information into meaningful insights through integrated analytics and visualization.",
    glyph: "data",
  },
  {
    n: "06",
    title: "Research & Development",
    copy: "Explore emerging technologies and develop new solutions for future institutional challenges.",
    glyph: "research",
  },
];

/**
 * Capabilities as a full-width editorial register rather than a card grid.
 *
 * Six identical cards would say "these are interchangeable features". Six ruled
 * rows, each with its own technical drawing, say "these are disciplines".
 */
export function Capabilities() {
  return (
    <Section id={SECTIONS.capabilities} tone="white" rule>
      <div className="shell">
        <SectionHeader
          eyebrow="Our Capabilities"
          headline={["Technology built around", "real operational needs."]}
          className="max-w-3xl"
        />

        <ul className="mt-16 lg:mt-24">
          {CAPABILITIES.map((c, i) => (
            <CapabilityRow key={c.n} {...c} index={i} />
          ))}
        </ul>
      </div>
    </Section>
  );
}

function CapabilityRow({
  n,
  title,
  copy,
  glyph,
  index,
}: (typeof CAPABILITIES)[number] & { index: number }) {
  const Glyph = GLYPHS[glyph];

  return (
    <motion.li
      data-reveal
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ delay: index * 0.06, duration: 0.75, ease: EASE_OUT_EXPO }}
      className="group/row relative border-t border-[var(--color-rule)] last:border-b"
    >
      {/* Blue rule that draws itself across the row on approach. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[var(--color-brand)] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:scale-x-100"
      />

      <div className="grid items-center gap-y-5 py-8 sm:py-10 lg:grid-cols-12 lg:gap-8 lg:py-11">
        <span className="annotation block text-[var(--color-brand)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-1 lg:col-span-1">
          {n}
        </span>

        <h3 className="text-title font-medium text-[var(--color-ink)] lg:col-span-4">
          {title}
        </h3>

        <p className="max-w-xl text-[0.9375rem] leading-relaxed text-[var(--color-slate)] lg:col-span-4 lg:text-base">
          {copy}
        </p>

        <div className="flex items-center justify-between gap-6 lg:col-span-3 lg:justify-end">
          <Glyph />
          <ArrowUpRight
            aria-hidden
            className="size-5 shrink-0 text-[var(--color-faint)] transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 group-hover/row:text-[var(--color-brand)]"
          />
        </div>
      </div>
    </motion.li>
  );
}
