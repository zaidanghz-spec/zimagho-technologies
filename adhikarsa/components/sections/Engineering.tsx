"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/animations";
import type { Dictionary } from "@/data/dictionaries";
import { ANCHORS } from "@/lib/constants";
import { cn } from "@/lib/utils";


/**
 * The delivery process as a timeline whose connecting line is drawn by the
 * reader's own scrolling — horizontal on wide screens, vertical on narrow
 * ones, with the fill bound to the same scroll progress in both directions.
 */
export function Engineering({ dict }: { dict: Dictionary }) {
  const t = dict.solutions.engineering;
  const PHASES = t.phases;
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start 78%", "end 62%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id={ANCHORS.engineering} tone="mist" rule>
      <div className="shell">
        <SectionHeader
          eyebrow={t.eyebrow}
          headline={t.lines}
          className="max-w-2xl"
        />

        <div ref={track} className="mt-16 lg:mt-24">
          {/* Horizontal timeline (lg+) */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-x-0 top-[15px] h-px bg-rule" />
            <motion.div
              aria-hidden
              style={{ scaleX: fill }}
              className="absolute inset-x-0 top-[15px] h-px origin-left bg-brand"
            />
            <ol className="relative grid grid-cols-5 gap-6">
              {PHASES.map((p, i) => (
                <PhaseItem key={p.n} phase={p} index={i} />
              ))}
            </ol>
          </div>

          {/* Vertical timeline (below lg) */}
          <div className="relative lg:hidden">
            <div className="absolute top-0 left-[15px] h-full w-px bg-rule" />
            <motion.div
              aria-hidden
              style={{ scaleY: fill }}
              className="absolute top-0 left-[15px] h-full w-px origin-top bg-brand"
            />
            <ol className="relative flex flex-col gap-10">
              {PHASES.map((p, i) => (
                <PhaseItem key={p.n} phase={p} index={i} vertical />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}

function PhaseItem({
  phase,
  index,
  vertical = false,
}: {
  phase: { n: string; title: string; copy: string };
  index: number;
  vertical?: boolean;
}) {
  return (
    <motion.li
      data-reveal
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ delay: index * 0.08, duration: 0.7, ease: EASE_OUT_EXPO }}
      /* `measure`: the five phases share a narrow grid column, and an
         Indonesian phase name is a single long word that cannot break —
         sized against the viewport it overruns the column into its
         neighbour, so it is sized against the column instead. */
      className={cn("measure", vertical && "flex items-start gap-5")}
    >
      <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-rule bg-surface shadow-[var(--shadow-hair)]">
        <span aria-hidden className="size-2 rounded-full bg-brand" />
      </span>

      <div className={vertical ? "pt-1" : "mt-6"}>
        <span className="annotation text-brand">{phase.n}</span>
        <h3 className="mt-2.5 text-title font-medium text-ink">
          {phase.title}
        </h3>
        <p className="mt-2.5 max-w-xs text-[0.9375rem] leading-relaxed text-slate">
          {phase.copy}
        </p>
      </div>
    </motion.li>
  );
}
