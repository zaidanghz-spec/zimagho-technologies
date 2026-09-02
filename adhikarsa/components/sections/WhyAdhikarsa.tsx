"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/animations";
import { SECTIONS } from "@/lib/constants";

const BLOCKS = [
  {
    n: "01",
    title: "Reliability",
    copy: "Technology designed around operational continuity and dependable system behavior.",
  },
  {
    n: "02",
    title: "Interoperability",
    copy: "Systems designed to work with existing infrastructure and institutional technology.",
  },
  {
    n: "03",
    title: "Adaptability",
    copy: "Solutions built around real workflows and evolving organizational requirements.",
  },
  {
    n: "04",
    title: "Long-Term Engineering",
    copy: "We approach technology as infrastructure that must continue to deliver value as organizations grow.",
  },
];

/**
 * Engineering positions as four editorial blocks on a hairline grid.
 *
 * Deliberately not feature cards: these are commitments the company makes
 * about how it builds, and the ruled grid gives them the weight of a
 * statement rather than a checklist.
 */
export function WhyAdhikarsa() {
  return (
    <Section id={SECTIONS.approach} tone="white">
      <div className="shell">
        <SectionHeader
          eyebrow="Our Approach"
          headline={["Built for environments", "where technology matters."]}
          className="max-w-3xl"
        />

        <ol className="mt-16 grid border-t border-l border-[var(--color-rule)] bg-white sm:grid-cols-2 lg:mt-24">
          {BLOCKS.map((b, i) => (
            <motion.li
              data-reveal
              key={b.n}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ delay: i * 0.09, duration: 0.75, ease: EASE_OUT_EXPO }}
              className="group/block relative border-r border-b border-[var(--color-rule)] bg-white p-8 sm:p-10 lg:p-12"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[var(--color-brand)] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/block:scale-x-100"
              />
              <span className="annotation text-[var(--color-brand)]">{b.n}</span>
              <h3 className="mt-6 text-title font-medium text-[var(--color-ink)]">
                {b.title}
              </h3>
              <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-[var(--color-slate)] lg:text-base">
                {b.copy}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
