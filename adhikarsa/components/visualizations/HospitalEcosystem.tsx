"use client";

import { motion, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useState } from "react";
import { MotionPath } from "@/components/motion/MotionPath";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * The hospital ecosystem, assembled by scrolling.
 *
 *   1  systems appear, separately
 *   2  connections draw themselves
 *   3  data begins moving
 *   4  the intelligence layer activates
 *   5  the ecosystem closes into one system
 *
 * The scroll position is reduced to a single integer `stage` in the parent and
 * everything animates declaratively from it. An earlier version derived each
 * element's opacity from its own `useTransform` on the scroll value; with this
 * many subscribers the per-child transforms went stale and left nodes stuck at
 * `opacity: 0`. One stage, computed once, re-renders at most four times across
 * the entire track and is trivial to reason about.
 */

const VIEW = { w: 900, h: 640 };
const C = { x: 450, y: 320 };
const RING = { rx: 322, ry: 226 };
const CORE = { w: 248, h: 96 };

const NAMES = [
  "Clinical Systems",
  "Patient Services",
  "Laboratory",
  "Radiology",
  "Pharmacy",
  "Operations",
  "Finance",
  "Management",
  "Infrastructure",
] as const;

export const STAGES = [
  { n: "01", label: "Independent systems" },
  { n: "02", label: "Connections established" },
  { n: "03", label: "Data in motion" },
  { n: "04", label: "Intelligence layer active" },
  { n: "05", label: "One connected ecosystem" },
] as const;

/** Stage thresholds along the track. Shared by the diagram and the rail. */
const THRESHOLDS = [0.18, 0.4, 0.56, 0.74] as const;

export function stageFor(p: number) {
  return THRESHOLDS.reduce((acc, t) => (p >= t ? acc + 1 : acc), 0);
}

/** Positions resolved once at module load — pure geometry, never re-derived. */
const NODES = NAMES.map((label, i) => {
  const a = (Math.PI * 2 * i) / NAMES.length - Math.PI / 2;
  const x = C.x + Math.cos(a) * RING.rx;
  const y = C.y + Math.sin(a) * RING.ry;
  /* Trim the spoke so it meets the core's edge, not its centre. */
  const dx = C.x - x;
  const dy = C.y - y;
  const len = Math.hypot(dx, dy) || 1;
  const stop = Math.min(len - 12, CORE.w / 2 + 30);
  return {
    id: label.toLowerCase().replace(/\s+/g, "-"),
    label,
    x,
    y,
    spoke: `M ${x.toFixed(1)} ${y.toFixed(1)} L ${(x + (dx / len) * (len - stop)).toFixed(1)} ${(y + (dy / len) * (len - stop)).toFixed(1)}`,
  };
});

const pct = (v: number, total: number) => `${(v / total) * 100}%`;
const EASE = EASE_OUT_EXPO;

/** Reduces the scroll value to a stage integer. Fires at most four times. */
function useStage(progress: MotionValue<number>) {
  const [stage, setStage] = useState(0);
  useMotionValueEvent(progress, "change", (p) => {
    const next = stageFor(p);
    setStage((prev) => (prev === next ? prev : next));
  });
  return stage;
}

export function HospitalEcosystem({
  progress,
  className,
}: {
  progress: MotionValue<number>;
  className?: string;
}) {
  const stage = useStage(progress);

  return (
    <div className={cn("relative w-full", className)}>
      {/* Portrait recomposition — a 900-unit ring squeezed into 350px puts nine
          labels on top of each other. The same five stages are restated
          vertically instead. */}
      <EcosystemCompact stage={stage} className="md:hidden" />

      <div className="relative hidden aspect-[900/640] w-full md:block">
        <motion.div
          aria-hidden
          animate={{ opacity: stage >= 3 ? 1 : 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="pointer-events-none absolute top-1/2 left-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(11,92,255,0.13),transparent_70%)] blur-2xl"
        />

        <svg
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden
          focusable="false"
        >
          {/* Stage 5 — the perimeter, closing the ecosystem */}
          {NODES.map((n, i) => {
            const next = NODES[(i + 1) % NODES.length];
            return (
              <motion.line
                key={`edge-${n.id}`}
                x1={n.x}
                y1={n.y}
                x2={next.x}
                y2={next.y}
                stroke="rgba(11,92,255,0.3)"
                strokeWidth={1}
                initial={false}
                animate={{ pathLength: stage >= 4 ? 1 : 0, opacity: stage >= 4 ? 1 : 0 }}
                transition={{ duration: 0.9, delay: stage >= 4 ? i * 0.05 : 0, ease: EASE }}
              />
            );
          })}

          {/* Stage 2 — spokes into the centre */}
          {NODES.map((n, i) => (
            <motion.path
              key={`spoke-${n.id}`}
              d={n.spoke}
              fill="none"
              stroke="rgba(11,92,255,0.42)"
              strokeWidth={1.3}
              initial={false}
              animate={{ pathLength: stage >= 1 ? 1 : 0, opacity: stage >= 1 ? 1 : 0 }}
              transition={{ duration: 1, delay: stage >= 1 ? i * 0.05 : 0, ease: EASE }}
            />
          ))}

          {/* Stage 3 — traffic */}
          <motion.g
            initial={false}
            animate={{ opacity: stage >= 2 ? 1 : 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {NODES.map((n, i) => (
              <MotionPath
                key={`flow-${n.id}`}
                d={n.spoke}
                width={2.2}
                duration={3.4 + (i % 4) * 0.6}
                delay={i * 0.3}
                dashRatio={0.24}
              />
            ))}
          </motion.g>
        </svg>

        {/* Stage 4 — the intelligence layer */}
        <motion.div
          initial={false}
          animate={{
            opacity: stage >= 3 ? 1 : 0,
            scale: stage >= 3 ? 1 : 0.9,
          }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            left: pct(C.x, VIEW.w),
            top: pct(C.y, VIEW.h),
            width: pct(CORE.w, VIEW.w),
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
          <div className="rounded-2xl border border-[var(--color-brand)]/25 bg-white px-4 py-4 text-center shadow-[var(--shadow-float)]">
            <span aria-hidden className="mx-auto flex size-2 items-center justify-center">
              <span className="anim-ripple absolute size-2 rounded-full bg-[var(--color-brand)]/40" />
              <span className="size-1.5 rounded-full bg-[var(--color-brand)]" />
            </span>
            <p className="mt-3 text-[0.6875rem] leading-none font-semibold tracking-[0.09em] text-[var(--color-ink)] sm:text-xs lg:text-[0.8125rem]">
              INTELLIGENT HOSPITAL
            </p>
            <p className="annotation mt-2 whitespace-nowrap">Adhikarsa intelligence layer</p>
          </div>
        </motion.div>

        {/* Stage 1 — the systems themselves */}
        {NODES.map((n, i) => (
          <motion.div
            data-reveal
            key={n.id}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ delay: i * 0.05, duration: 0.7, ease: EASE }}
            style={{ left: pct(n.x, VIEW.w), top: pct(n.y, VIEW.h) }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div className="card flex items-center gap-2 rounded-xl px-2.5 py-2 whitespace-nowrap sm:px-3 sm:py-2.5">
              <motion.span
                aria-hidden
                initial={false}
                animate={{
                  backgroundColor:
                    stage >= 2 ? "var(--color-brand)" : "var(--color-rule-strong)",
                }}
                transition={{ duration: 0.6, delay: stage >= 2 ? i * 0.04 : 0 }}
                className="size-1.5 shrink-0 rounded-full"
              />
              <span className="text-[0.625rem] leading-none font-medium text-[var(--color-ink)] sm:text-[0.6875rem] lg:text-xs">
                {n.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function EcosystemCompact({ stage, className }: { stage: number; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <ul className="grid w-full grid-cols-2 gap-2">
        {NODES.map((n, i) => (
          <motion.li
            data-reveal
            key={n.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ delay: i * 0.05, duration: 0.6, ease: EASE }}
            className={cn(
              "card flex items-center gap-2 rounded-xl px-3 py-3",
              i === NODES.length - 1 && "col-span-2",
            )}
          >
            <motion.span
              aria-hidden
              initial={false}
              animate={{
                backgroundColor:
                  stage >= 2 ? "var(--color-brand)" : "var(--color-rule-strong)",
              }}
              transition={{ duration: 0.6, delay: stage >= 2 ? i * 0.04 : 0 }}
              className="size-1.5 shrink-0 rounded-full"
            />
            <span className="text-[0.6875rem] leading-tight font-medium text-[var(--color-ink)]">
              {n.label}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* The conduit: drawn at stage 2, carrying traffic from stage 3. */}
      <motion.span
        aria-hidden
        initial={false}
        animate={{ scaleY: stage >= 1 ? 1 : 0, opacity: stage >= 1 ? 1 : 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative my-5 h-14 w-px origin-top overflow-hidden bg-[rgba(11,92,255,0.35)]"
      >
        <motion.span
          initial={false}
          animate={{ opacity: stage >= 2 ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-x-0 top-0 h-4 bg-[var(--color-brand)]"
          style={{ animation: "adk-travel-y 2.2s linear infinite" }}
        />
      </motion.span>

      <motion.div
        initial={false}
        animate={{ opacity: stage >= 3 ? 1 : 0.25, scale: stage >= 3 ? 1 : 0.96 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative w-full max-w-xs"
      >
        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: stage >= 4 ? 1 : 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(11,92,255,0.16),transparent_70%)] blur-xl"
        />
        <div className="relative rounded-2xl border border-[var(--color-brand)]/25 bg-white px-5 py-5 text-center shadow-[var(--shadow-float)]">
          <span aria-hidden className="mx-auto flex size-2 items-center justify-center">
            <span className="anim-ripple absolute size-2 rounded-full bg-[var(--color-brand)]/40" />
            <span className="size-1.5 rounded-full bg-[var(--color-brand)]" />
          </span>
          <p className="mt-3 text-xs leading-none font-semibold tracking-[0.09em] text-[var(--color-ink)]">
            INTELLIGENT HOSPITAL
          </p>
          <p className="annotation mt-2">Adhikarsa intelligence layer</p>
        </div>
      </motion.div>
    </div>
  );
}

/** Horizontal stage rail, driven by the same threshold table as the diagram. */
export function EcosystemStages({ progress }: { progress: MotionValue<number> }) {
  const stage = useStage(progress);

  return (
    <ol className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
      {STAGES.map((s, i) => {
        const done = i <= stage;
        return (
          <li key={s.n} className="flex flex-col gap-2.5">
            <span className="relative block h-[2px] w-full overflow-hidden rounded-full bg-[var(--color-rule)]">
              <motion.span
                className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-brand)]"
                initial={false}
                animate={{ width: done ? "100%" : "0%" }}
                transition={{ duration: 0.7, ease: EASE }}
              />
            </span>
            <span
              className={cn(
                "annotation transition-colors duration-500",
                done ? "text-[var(--color-brand)]" : "text-[var(--color-faint)]",
              )}
            >
              {s.n}
            </span>
            <span
              className={cn(
                "text-[0.8125rem] leading-snug font-medium transition-colors duration-500",
                done ? "text-[var(--color-ink)]" : "text-[var(--color-muted)]",
              )}
            >
              {s.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
