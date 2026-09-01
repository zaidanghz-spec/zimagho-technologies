"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FlowPath } from "@/components/visualizations/FlowPath";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/animations";
import { cn } from "@/lib/utils";

export const STAGES = [
  { id: "registration", label: "Patient Registration", note: "Intake captured once" },
  { id: "eligibility", label: "Eligibility Verification", note: "Coverage resolved" },
  { id: "routing", label: "Department Routing", note: "Assigned by rules" },
  { id: "clinical", label: "Clinical Workflow", note: "Care team notified" },
  { id: "ancillary", label: "Pharmacy / Lab", note: "Orders dispatched" },
  { id: "billing", label: "Billing", note: "Charges reconciled" },
  { id: "analytics", label: "Analytics", note: "Outcome recorded" },
] as const;

/**
 * The automation pipeline, self-playing.
 *
 * Advancing on a timer rather than on scroll keeps the second sticky track off
 * the page — the visitor watches a process run instead of scrubbing it. The
 * timer only exists while the rail is on screen.
 */
export function WorkflowEngine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % STAGES.length),
      1700,
    );
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* ── Horizontal rail (lg+) ─────────────────────────────────────── */}
      <div className="relative hidden lg:block">
        <svg
          viewBox="0 0 1200 8"
          preserveAspectRatio="none"
          className="absolute top-[26px] left-0 h-2 w-full"
          aria-hidden
          focusable="false"
        >
          <line x1="0" y1="4" x2="1200" y2="4" stroke="rgba(255,255,255,0.09)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <FlowPath d="M 0 4 H 1200" width={2} duration={6.5} dashRatio={0.09} />
          <FlowPath d="M 0 4 H 1200" width={2} duration={6.5} delay={2.2} dashRatio={0.09} opacity={0.6} />
        </svg>

        <ol className="relative grid grid-cols-7 gap-3">
          {STAGES.map((s, i) => (
            <motion.li
              key={s.id}
              data-reveal
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ delay: i * 0.07, duration: 0.6, ease: EASE_OUT_EXPO }}
              className="flex flex-col items-center text-center"
            >
              <StageNode index={i} active={active === i} />
              <p
                className={cn(
                  "mt-5 text-[0.8125rem] leading-snug font-medium transition-colors duration-500",
                  active === i ? "text-[var(--color-paper)]" : "text-[var(--color-dim)]",
                )}
              >
                {s.label}
              </p>
              <motion.p
                animate={{ opacity: active === i ? 1 : 0.35 }}
                transition={{ duration: 0.45 }}
                className="mono-label mt-2 text-[0.5625rem]"
              >
                {s.note}
              </motion.p>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* ── Vertical rail (below lg) ──────────────────────────────────── */}
      <div className="relative lg:hidden">
        <svg
          viewBox="0 0 8 800"
          preserveAspectRatio="none"
          className="absolute top-0 left-[13px] h-full w-2"
          aria-hidden
          focusable="false"
        >
          <line x1="4" y1="0" x2="4" y2="800" stroke="rgba(255,255,255,0.09)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <FlowPath d="M 4 0 V 800" width={2} duration={7} dashRatio={0.08} />
        </svg>

        <ol className="relative flex flex-col gap-6">
          {STAGES.map((s, i) => (
            <motion.li
              key={s.id}
              data-reveal
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ delay: i * 0.06, duration: 0.55, ease: EASE_OUT_EXPO }}
              className="flex items-start gap-4"
            >
              <StageNode index={i} active={active === i} />
              <div className="pt-0.5">
                <p
                  className={cn(
                    "text-[0.9375rem] leading-snug font-medium transition-colors duration-500",
                    active === i ? "text-[var(--color-paper)]" : "text-[var(--color-dim)]",
                  )}
                >
                  {s.label}
                </p>
                <p className="mono-label mt-1.5 text-[0.5625rem]">{s.note}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function StageNode({ index, active }: { index: number; active: boolean }) {
  return (
    <span className="relative flex size-8 shrink-0 items-center justify-center">
      <motion.span
        animate={{
          scale: active ? 1.55 : 1,
          opacity: active ? 0.4 : 0,
        }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className="absolute inset-0 rounded-lg bg-[var(--color-signal)] blur-md"
      />
      <motion.span
        animate={{
          borderColor: active ? "rgba(56,189,248,0.85)" : "rgba(255,255,255,0.14)",
          backgroundColor: active ? "rgba(56,189,248,0.12)" : "rgba(12,17,25,1)",
        }}
        transition={{ duration: 0.5 }}
        className="relative flex size-8 items-center justify-center rounded-lg border"
      >
        <motion.span
          animate={{ color: active ? "#e0f2fe" : "#64748b" }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[0.625rem] tabular-nums"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      </motion.span>
    </span>
  );
}
