"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GLYPHS, type GlyphKey } from "@/components/visualizations/CapabilityGlyph";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/animations";
import type { Dictionary } from "@/data/dictionaries";

/** Glyphs are structural and stay bound to their slot across languages. */
const GLYPH_ORDER: GlyphKey[] = [
  "automation",
  "integration",
  "intelligence",
  "development",
  "data",
  "research",
];

/**
 * Capabilities as a full-width editorial register rather than a card grid.
 *
 * Six identical cards would say "these are interchangeable features". Six ruled
 * rows, each with its own technical drawing, say "these are disciplines".
 */
export function Capabilities({ dict }: { dict: Dictionary }) {
  const t = dict.solutions;
  return (
    <Section tone="white">
      <div className="shell">
        <SectionHeader
          eyebrow={t.hero.eyebrow}
          headline={t.hero.lines}
          copy={t.hero.body}
          className="max-w-3xl"
        />

        <ul className="mt-16 lg:mt-24">
          {t.capabilities.map((c, i) => (
            <CapabilityRow key={c.n} {...c} glyph={GLYPH_ORDER[i]} index={i} />
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
}: {
  n: string;
  title: string;
  copy: string;
  glyph: GlyphKey;
  index: number;
}) {
  const Glyph = GLYPHS[glyph];

  return (
    <motion.li
      data-reveal
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ delay: index * 0.06, duration: 0.75, ease: EASE_OUT_EXPO }}
      className="group/row relative border-t border-rule last:border-b"
    >
      {/* Blue rule that draws itself across the row on approach. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:scale-x-100"
      />

      <div className="grid items-center gap-y-5 py-8 sm:py-10 lg:grid-cols-12 lg:gap-8 lg:py-11">
        <span className="annotation block text-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-1 lg:col-span-1">
          {n}
        </span>

        <h3 className="text-title font-medium text-ink lg:col-span-4">
          {title}
        </h3>

        <p className="max-w-xl text-[0.9375rem] leading-relaxed text-slate lg:col-span-4 lg:text-base">
          {copy}
        </p>

        <div className="flex items-center justify-between gap-6 lg:col-span-3 lg:justify-end">
          <Glyph />
          <ArrowUpRight
            aria-hidden
            className="size-5 shrink-0 text-faint transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 group-hover/row:text-brand"
          />
        </div>
      </div>
    </motion.li>
  );
}
