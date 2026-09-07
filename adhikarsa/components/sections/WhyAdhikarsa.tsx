"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/animations";
import type { Dictionary } from "@/data/dictionaries";
import { ANCHORS } from "@/lib/constants";


/**
 * Engineering positions as four editorial blocks on a hairline grid.
 *
 * Deliberately not feature cards: these are commitments the company makes
 * about how it builds, and the ruled grid gives them the weight of a
 * statement rather than a checklist.
 */
export function WhyAdhikarsa({ dict }: { dict: Dictionary }) {
  const t = dict.company.approach;
  const BLOCKS = t.blocks;
  return (
    <Section id={ANCHORS.approach} tone="white" rule>
      <div className="shell">
        <SectionHeader
          eyebrow={t.eyebrow}
          headline={t.lines}
          className="max-w-3xl"
        />

        <ol className="mt-16 grid border-t border-l border-rule bg-canvas sm:grid-cols-2 lg:mt-24">
          {BLOCKS.map((b, i) => (
            <motion.li
              data-reveal
              key={b.n}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ delay: i * 0.09, duration: 0.75, ease: EASE_OUT_EXPO }}
              className="group/block relative border-r border-b border-rule bg-canvas p-8 sm:p-10 lg:p-12"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/block:scale-x-100"
              />
              <span className="annotation text-brand">{b.n}</span>
              <h3 className="mt-6 text-title font-medium text-ink">
                {b.title}
              </h3>
              <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-slate lg:text-base">
                {b.copy}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
