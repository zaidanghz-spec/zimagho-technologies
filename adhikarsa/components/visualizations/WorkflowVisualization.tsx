"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MotionPath } from "@/components/motion/MotionPath";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/animations";
import { cn } from "@/lib/utils";

export type WorkflowCopy = {
  exampleLabel: string;
  /** The conceptual model, stated once. */
  phases: string[];
  /** A worked example of that model, using a patient journey. */
  steps: { label: string; phase: string }[];
};

/**
 * The automation pipeline, self-playing.
 *
 * Advancing on a timer rather than on scroll keeps a second pinned track off
 * the page — the visitor watches a process run instead of scrubbing it. The
 * timer exists only while the rail is on screen and never under reduced
 * motion.
 */
export function WorkflowVisualization({
  copy,
  className,
}: {
  copy: WorkflowCopy;
  className?: string;
}) {
  const STEPS = copy.steps;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % STEPS.length), 1800);
    return () => window.clearInterval(id);
  }, [inView, reduced, STEPS.length]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* ── The model ─────────────────────────────────────────────────── */}
      <motion.ol
        data-reveal
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className="flex flex-wrap items-center gap-x-2 gap-y-3"
      >
        {copy.phases.map((p, i) => {
          const on = STEPS[active].phase === p;
          return (
            <li key={p} className="flex items-center gap-2">
              {i > 0 && (
                <ChevronRight aria-hidden className="size-3.5 text-[var(--color-rule-strong)]" />
              )}
              <span
                className={cn(
                  "rounded-full border px-3 py-1.5 text-[0.6875rem] font-medium tracking-[0.04em] transition-colors duration-500",
                  on
                    ? "border-[var(--color-brand)] bg-sky-tint text-brand"
                    : "border-rule bg-surface text-muted",
                )}
              >
                {p}
              </span>
            </li>
          );
        })}
      </motion.ol>

      {/* ── The worked example ────────────────────────────────────────── */}
      <p className="annotation mt-10">{copy.exampleLabel}</p>

      {/* Horizontal rail (lg+) */}
      <div className="relative mt-6 hidden lg:block">
        <svg
          viewBox="0 0 1200 8"
          preserveAspectRatio="none"
          className="absolute top-[19px] left-0 h-2 w-full"
          aria-hidden
          focusable="false"
        >
          <line x1="0" y1="4" x2="1200" y2="4" stroke="var(--color-rule)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <MotionPath d="M 0 4 H 1200" width={2.5} duration={6} dashRatio={0.08} />
          <MotionPath d="M 0 4 H 1200" width={2.5} delay={2.4} duration={6} dashRatio={0.08} opacity={0.55} />
        </svg>

        <ol className="relative grid grid-cols-7 gap-3">
          {STEPS.map((s, i) => (
            <motion.li
              data-reveal
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ delay: i * 0.06, duration: 0.6, ease: EASE_OUT_EXPO }}
              className="flex flex-col items-center text-center"
            >
              <StepNode index={i} active={active === i} />
              <p
                className={cn(
                  "mt-5 text-[0.8125rem] leading-snug font-medium transition-colors duration-500",
                  active === i ? "text-ink" : "text-slate",
                )}
              >
                {s.label}
              </p>
              <motion.p
                animate={{ opacity: active === i ? 1 : 0.4 }}
                transition={{ duration: 0.4 }}
                className="annotation mt-2"
              >
                {s.phase}
              </motion.p>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Vertical rail (below lg) */}
      <div className="relative mt-6 lg:hidden">
        <svg
          viewBox="0 0 8 800"
          preserveAspectRatio="none"
          className="absolute top-0 left-[15px] h-full w-2"
          aria-hidden
          focusable="false"
        >
          <line x1="4" y1="0" x2="4" y2="800" stroke="var(--color-rule)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <MotionPath d="M 4 0 V 800" width={2.5} duration={7} dashRatio={0.07} />
        </svg>

        <ol className="relative flex flex-col gap-6">
          {STEPS.map((s, i) => (
            <motion.li
              data-reveal
              key={s.label}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ delay: i * 0.05, duration: 0.55, ease: EASE_OUT_EXPO }}
              className="flex items-start gap-4"
            >
              <StepNode index={i} active={active === i} />
              <div className="pt-1">
                <p
                  className={cn(
                    "text-[0.9375rem] leading-snug font-medium transition-colors duration-500",
                    active === i ? "text-ink" : "text-slate",
                  )}
                >
                  {s.label}
                </p>
                <p className="annotation mt-1.5">{s.phase}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function StepNode({ index, active }: { index: number; active: boolean }) {
  return (
    <span className="relative flex size-[38px] shrink-0 items-center justify-center">
      <motion.span
        animate={{ scale: active ? 1.35 : 1, opacity: active ? 0.16 : 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className="absolute inset-0 rounded-xl bg-brand"
      />
      <motion.span
        animate={{
          borderColor: active ? "var(--color-brand)" : "var(--color-rule)",
          backgroundColor: active ? "var(--color-sky-tint)" : "var(--color-surface)",
        }}
        transition={{ duration: 0.5 }}
        className="relative flex size-[38px] items-center justify-center rounded-xl border shadow-[var(--shadow-hair)]"
      >
        <motion.span
          animate={{ color: active ? "var(--color-brand)" : "var(--color-faint)" }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[0.625rem] tabular-nums"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      </motion.span>
    </span>
  );
}
