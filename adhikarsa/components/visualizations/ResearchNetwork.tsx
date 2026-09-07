"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MotionPath } from "@/components/motion/MotionPath";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/animations";
import { cn } from "@/lib/utils";

const VIEW = { w: 900, h: 560 };
const C = { x: 450, y: 280 };

export type ResearchCopy = {
  trackLabel: string;
  themes: { label: string; detail: string }[];
};

/**
 * Hand-placed rather than distributed on a perfect circle. An evenly spaced
 * ring reads as a diagram template; a slightly irregular constellation reads
 * as an actual research map. Only the wording is localised.
 */
const POSITIONS = [
  { x: 448, y: 58 },
  { x: 782, y: 168 },
  { x: 758, y: 428 },
  { x: 420, y: 500 },
  { x: 128, y: 402 },
  { x: 142, y: 148 },
];

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

/**
 * Research constellation.
 *
 * Nodes are stationary while the field around them moves. A rotating carousel
 * looks livelier in a screenshot and is hostile to actually use — you cannot
 * point at a moving target — so the motion goes to the connections and the
 * gentle breathing of the markers.
 */
export function ResearchNetwork({
  copy,
  className,
}: {
  copy: ResearchCopy;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const THEMES = POSITIONS.map((pos, i) => ({
    id: `track-${i}`,
    ...pos,
    ...copy.themes[i],
  }));
  const current = THEMES[active];

  return (
    <div className={cn("relative", className)}>
      {/* ── Constellation ─────────────────────────────────────────────── */}
      <div className="relative mx-auto hidden aspect-[900/560] w-full max-w-4xl md:block">
        <svg
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden
          focusable="false"
        >
          {/* Perimeter — the themes are related to each other, not only to the centre */}
          {THEMES.map((t, i) => {
            const next = THEMES[(i + 1) % THEMES.length];
            return (
              <motion.line
                key={`edge-${t.id}`}
                x1={t.x}
                y1={t.y}
                x2={next.x}
                y2={next.y}
                stroke="var(--color-rule)"
                strokeWidth={1}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={VIEWPORT}
                transition={{ delay: 0.3 + i * 0.08, duration: 1, ease: EASE_OUT_EXPO }}
              />
            );
          })}

          {THEMES.map((t, i) => {
            const d = `M ${C.x} ${C.y} L ${t.x} ${t.y}`;
            const on = i === active;
            return (
              <g key={t.id}>
                <motion.path
                  d={d}
                  fill="none"
                  stroke={on ? "var(--color-brand)" : "var(--color-rule)"}
                  strokeWidth={1}
                  className="transition-[stroke] duration-500"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={VIEWPORT}
                  transition={{ delay: 0.15 + i * 0.07, duration: 1, ease: EASE_OUT_EXPO }}
                />
                <MotionPath
                  d={d}
                  width={on ? 2.2 : 1.5}
                  duration={on ? 2.2 : 5.5}
                  delay={i * 0.4}
                  dashRatio={0.24}
                  opacity={on ? 1 : 0.45}
                />
              </g>
            );
          })}
        </svg>

        {/* Centre */}
        <motion.div
          data-reveal
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: pct(C.x, VIEW.w), top: pct(C.y, VIEW.h) }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(16,70,214,0.1),transparent_70%)] blur-xl"
          />
          <div className="relative rounded-2xl border border-[var(--color-brand)]/25 bg-surface px-5 py-4 text-center shadow-[var(--shadow-float)]">
            <span aria-hidden className="mx-auto flex size-2 items-center justify-center">
              <span className="anim-ripple absolute size-2 rounded-full bg-brand/40" />
              <span className="size-1.5 rounded-full bg-brand" />
            </span>
            <p className="mt-2.5 text-xs leading-none font-semibold tracking-[0.1em] text-ink">
              R &amp; D
            </p>
          </div>
        </motion.div>

        {THEMES.map((t, i) => (
          <motion.button
            data-reveal
            key={t.id}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.65, ease: EASE_OUT_EXPO }}
            className={cn(
              "absolute flex max-w-[11rem] -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left transition-[border-color,box-shadow,transform] duration-400",
              i === active
                ? "z-10 scale-[1.04] border-[var(--color-brand)]/45 bg-surface shadow-[var(--shadow-lift)]"
                : "border-rule bg-surface shadow-[var(--shadow-hair)] hover:border-rule-strong",
            )}
            style={{ left: pct(t.x, VIEW.w), top: pct(t.y, VIEW.h) }}
          >
            <span
              aria-hidden
              className={cn(
                "size-1.5 shrink-0 rounded-full transition-colors duration-400",
                i === active
                  ? "bg-brand"
                  : "anim-breathe bg-rule-strong",
              )}
              style={{ animationDelay: `${i * 0.5}s` }}
            />
            <span className="text-[0.75rem] leading-tight font-medium text-ink">
              {t.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Readout. The explanation surfaces here rather than inside a node, so
          nothing overlaps and the change stays legible. */}
      <div className="mx-auto mt-8 hidden max-w-2xl md:block">
        <div className="card min-h-[8rem] p-6">
          <div className="flex items-center justify-between gap-4">
            <span className="annotation text-brand">{copy.trackLabel}</span>
            <span className="annotation">
              {String(active + 1).padStart(2, "0")} / {String(THEMES.length).padStart(2, "0")}
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            >
              <h3 className="mt-4 text-lg font-medium text-ink">
                {current.label}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">
                {current.detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Portrait: the same tracks as a readable list ───────────────── */}
      <ul className="grid gap-3 md:hidden">
        {THEMES.map((t, i) => (
          <motion.li
            data-reveal
            key={t.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ delay: i * 0.06, duration: 0.6, ease: EASE_OUT_EXPO }}
            className="card p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <span aria-hidden className="size-1.5 rounded-full bg-brand" />
              <span className="annotation">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-3 text-base font-medium text-ink">
              {t.label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">
              {t.detail}
            </p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
