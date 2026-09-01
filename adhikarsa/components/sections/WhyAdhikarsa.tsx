"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/animations";
import { SECTIONS } from "@/lib/constants";

const PRINCIPLES = [
  {
    n: "01",
    title: "Reliability by Design",
    copy: "Systems engineered for environments where operational continuity matters.",
  },
  {
    n: "02",
    title: "Interoperability First",
    copy: "Designed to connect with existing institutional technology rather than forcing unnecessary replacement.",
  },
  {
    n: "03",
    title: "Security Mindset",
    copy: "Infrastructure designed with privacy, controlled access, auditability, and data governance in mind.",
  },
  {
    n: "04",
    title: "Built Around Workflow",
    copy: "Technology adapts to real operational processes — not the other way around.",
  },
];

/**
 * Engineering principles as four editorial statements.
 *
 * Deliberately not a card grid: these are positions the company takes, and
 * full-width rules with oversized numerals give them the weight of a
 * masthead rather than a feature list.
 */
export function WhyAdhikarsa() {
  return (
    <Section id={SECTIONS.why}>
      <div className="shell">
        <SectionHeader
          eyebrow="Engineering Principles"
          index="07"
          headline={["Technology built for", "mission-critical", "environments."]}
          className="max-w-3xl"
        />

        <ul className="mt-16 lg:mt-24">
          {PRINCIPLES.map((p, i) => (
            <PrincipleRow key={p.n} {...p} index={i} />
          ))}
        </ul>
      </div>
    </Section>
  );
}

function PrincipleRow({
  n,
  title,
  copy,
  index,
}: {
  n: string;
  title: string;
  copy: string;
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const mx = useMotionValue(50);
  const beam = useMotionTemplate`radial-gradient(240px 100% at ${mx}% 50%, rgba(56,189,248,0.5), transparent 70%)`;

  const onMove = (e: React.PointerEvent<HTMLLIElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 100);
  };

  return (
    <motion.li
      ref={ref}
      onPointerMove={onMove}
      data-reveal
      initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={VIEWPORT}
      transition={{ delay: index * 0.08, duration: 0.75, ease: EASE_OUT_EXPO }}
      className="group relative border-t border-white/[0.07] py-9 last:border-b sm:py-11 lg:py-14"
    >
      {/* Cursor-tracked beam riding the top rule */}
      <motion.span
        aria-hidden
        style={{ background: beam }}
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="grid gap-5 lg:grid-cols-12 lg:items-baseline lg:gap-10">
        <span className="font-mono text-[0.8125rem] text-[var(--color-signal)]/60 tabular-nums transition-colors duration-500 group-hover:text-[var(--color-signal)] lg:col-span-1">
          {n}
        </span>

        <h3 className="text-title font-medium text-[var(--color-paper)] lg:col-span-6">
          {title}
        </h3>

        <p className="max-w-md text-[0.9375rem] leading-[1.65] text-[var(--color-dim)] lg:col-span-5 lg:text-base">
          {copy}
        </p>
      </div>
    </motion.li>
  );
}
