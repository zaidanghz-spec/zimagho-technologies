"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { StatusDot } from "@/components/ui/StatusDot";
import { cn } from "@/lib/utils";

const VIEW = { w: 860, h: 560 };
const C = { x: 430, y: 280 };

type Sys = {
  id: string;
  label: string;
  /** Scattered origin — where the system sits when nothing is connected. */
  from: [number, number];
  /** Converged position on the unified ring. */
  to: [number, number];
};

/* Ring positions on an ellipse; scattered positions are the same bearings
   pushed out and jittered, so convergence reads as systems being drawn in
   rather than teleporting to new places. */
const RING = { rx: 262, ry: 178 };
const NAMES = ["Clinical", "Operations", "Finance", "Pharmacy", "Laboratory", "Radiology"];
const JITTER: [number, number][] = [
  [-40, -30], [32, -46], [50, 26], [24, 48], [-44, 36], [-54, 12],
];

/* Scattered origins are clamped inside a safe inset. A chip is ~120px wide and
   positioned from its centre, so an unclamped origin would hang off the stage
   and widen the document on narrow viewports. */
const SAFE = { x: [104, 756] as const, y: [56, 504] as const };
const bound = (v: number, [lo, hi]: readonly [number, number]) =>
  Math.min(hi, Math.max(lo, v));

export const SYSTEMS: Sys[] = NAMES.map((label, i) => {
  const a = (Math.PI * 2 * i) / NAMES.length - Math.PI / 2 + 0.35;
  const rx = Math.cos(a) * RING.rx;
  const ry = Math.sin(a) * RING.ry;
  return {
    id: label.toLowerCase(),
    label,
    from: [
      bound(C.x + rx * 1.24 + JITTER[i][0], SAFE.x),
      bound(C.y + ry * 1.26 + JITTER[i][1], SAFE.y),
    ],
    to: [C.x + rx, C.y + ry],
  };
});

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

/**
 * Scroll-told story: six independent systems drift alone, are drawn into one
 * ring, and are then bound by a connective layer that lights up last.
 *
 * All of it is driven off a single scroll `MotionValue` — no state, no
 * per-frame React work.
 */
export function DisconnectedSystems({
  progress,
  className,
}: {
  progress: MotionValue<number>;
  className?: string;
}) {
  /* The connective layer only exists once the systems have arrived. */
  const linkDraw = useTransform(progress, [0.56, 0.9], [0, 1]);
  const linkOpacity = useTransform(progress, [0.54, 0.68], [0, 1]);
  const coreScale = useTransform(progress, [0.66, 0.95], [0.4, 1]);
  const coreOpacity = useTransform(progress, [0.66, 0.86], [0, 1]);
  const haloOpacity = useTransform(progress, [0.7, 1], [0, 0.85]);

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative aspect-[860/560] w-full">
        <motion.div
          aria-hidden
          style={{ opacity: haloOpacity }}
          className="absolute top-1/2 left-1/2 h-[54%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.16),transparent_68%)] blur-2xl"
        />

        <svg
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden
          focusable="false"
        >
          {/* Perimeter: system to neighbouring system */}
          {SYSTEMS.map((s, i) => {
            const n = SYSTEMS[(i + 1) % SYSTEMS.length];
            return (
              <motion.line
                key={`edge-${s.id}`}
                x1={s.to[0]}
                y1={s.to[1]}
                x2={n.to[0]}
                y2={n.to[1]}
                stroke="url(#adk-unify)"
                strokeWidth={1}
                style={{ pathLength: linkDraw, opacity: linkOpacity }}
              />
            );
          })}

          {/* Spokes: system to the unified core */}
          {SYSTEMS.map((s) => (
            <motion.line
              key={`spoke-${s.id}`}
              x1={C.x}
              y1={C.y}
              x2={s.to[0]}
              y2={s.to[1]}
              stroke="url(#adk-unify)"
              strokeWidth={1}
              strokeDasharray="3 5"
              style={{ pathLength: linkDraw, opacity: linkOpacity }}
            />
          ))}
        </svg>

        {/* Unified core, arriving last */}
        <motion.div
          style={{
            scale: coreScale,
            opacity: coreOpacity,
            left: pct(C.x, VIEW.w),
            top: pct(C.y, VIEW.h),
          }}
          className="absolute size-16 -translate-x-1/2 -translate-y-1/2 sm:size-20"
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border border-white/[0.16] bg-[radial-gradient(circle_at_50%_35%,rgba(56,189,248,0.3),rgba(9,13,20,0.95)_64%)] shadow-[0_0_46px_-10px_rgba(56,189,248,0.7)]"
          />
          <span className="absolute inset-0 flex items-center justify-center text-[0.5rem] font-semibold tracking-[0.18em] text-[var(--color-paper)] sm:text-[0.5625rem]">
            CORE
          </span>
        </motion.div>

        {SYSTEMS.map((s, i) => (
          <SystemChip key={s.id} sys={s} index={i} progress={progress} />
        ))}
      </div>
    </div>
  );
}

function SystemChip({
  sys,
  index,
  progress,
}: {
  sys: Sys;
  index: number;
  progress: MotionValue<number>;
}) {
  /* Staggered convergence — systems arrive in sequence, not as a block. */
  const start = 0.16 + index * 0.045;
  const end = start + 0.32;

  const left = useTransform(progress, [start, end], [sys.from[0], sys.to[0]]);
  const top = useTransform(progress, [start, end], [sys.from[1], sys.to[1]]);
  const leftPct = useTransform(left, (v) => pct(v, VIEW.w));
  const topPct = useTransform(top, (v) => pct(v, VIEW.h));
  const connected = useTransform(progress, [0.62, 0.8], [0, 1]);
  const isolated = useTransform(progress, [0.5, 0.66], [1, 0]);

  return (
    <motion.div
      style={{ left: leftPct, top: topPct }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <div className="panel relative flex items-center gap-2.5 rounded-full px-3 py-2 sm:px-4 sm:py-2.5">
        <span className="relative flex size-1.5 shrink-0">
          <motion.span
            style={{ opacity: isolated }}
            className="absolute inset-0 rounded-full bg-[var(--color-faint)]"
          />
          <motion.span
            style={{ opacity: connected }}
            className="absolute inset-0 rounded-full bg-[var(--color-signal)] shadow-[0_0_10px_rgba(56,189,248,0.9)]"
          />
        </span>
        <span className="text-[0.625rem] leading-none font-medium tracking-[0.08em] whitespace-nowrap text-[var(--color-mute)] sm:text-xs">
          {sys.label}
        </span>
      </div>
    </motion.div>
  );
}

/** Status readout that flips as the story resolves. */
export function UnifyState({ progress }: { progress: MotionValue<number> }) {
  const fragmented = useTransform(progress, [0.5, 0.66], [1, 0]);
  const unified = useTransform(progress, [0.62, 0.82], [0, 1]);

  return (
    <div className="relative h-4">
      <motion.span
        style={{ opacity: fragmented }}
        className="mono-label absolute inset-0 flex items-center gap-2"
      >
        <StatusDot tone="amber" />
        System State — Fragmented
      </motion.span>
      <motion.span
        style={{ opacity: unified }}
        className="mono-label absolute inset-0 flex items-center gap-2 text-[var(--color-dim)]"
      >
        <StatusDot tone="online" />
        System State — Unified
      </motion.span>
    </div>
  );
}
