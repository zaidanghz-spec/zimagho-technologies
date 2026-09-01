"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FlowPath } from "@/components/visualizations/FlowPath";
import { StatusDot } from "@/components/ui/StatusDot";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/animations";
import { cn } from "@/lib/utils";

const VIEW = { w: 900, h: 640 };
const C = { x: 450, y: 320 };
const ORBIT = {
  inner: { rx: 180, ry: 130 },
  outer: { rx: 320, ry: 232 },
};

type Theme = {
  id: string;
  label: string;
  short: string;
  detail: string;
  ring: "inner" | "outer";
  angle: number;
};

const THEMES: Theme[] = [
  {
    id: "ai",
    label: "Artificial Intelligence",
    short: "AI",
    detail: "Models scoped to institutional decisions — ranking, forecasting, and surfacing what a team should look at next.",
    ring: "outer",
    angle: -90,
  },
  {
    id: "automation",
    label: "Automation",
    short: "AUT",
    detail: "Process engines that carry state across departments so a step never restarts from a blank form.",
    ring: "inner",
    angle: -30,
  },
  {
    id: "data",
    label: "Healthcare Data",
    short: "DAT",
    detail: "Interoperability, schema reconciliation, and governance for data that was never designed to be joined.",
    ring: "outer",
    angle: 30,
  },
  {
    id: "vision",
    label: "Computer Vision",
    short: "CV",
    detail: "Applied perception for operational contexts — asset tracking, occupancy, and environment monitoring.",
    ring: "inner",
    angle: 90,
  },
  {
    id: "infra",
    label: "Intelligent Infrastructure",
    short: "INF",
    detail: "Buildings and devices as addressable systems, monitored and coordinated alongside software.",
    ring: "outer",
    angle: 150,
  },
  {
    id: "hci",
    label: "Human–Computer Interaction",
    short: "HCI",
    detail: "Interfaces for high-pressure environments, where clarity under load matters more than density.",
    ring: "inner",
    angle: 210,
  },
];

/** Places a theme on its orbit. Pure geometry — resolved once at module load. */
const placed = THEMES.map((t) => {
  const r = ORBIT[t.ring];
  const a = (t.angle * Math.PI) / 180;
  return {
    ...t,
    x: C.x + Math.cos(a) * r.rx,
    y: C.y + Math.sin(a) * r.ry,
  };
});

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

/**
 * Research orbits.
 *
 * Chips are stationary while the field around them moves. A rotating carousel
 * looks livelier in a screenshot and is hostile to actually use — you cannot
 * point at a moving target — so the motion goes to the sweep and the conduits.
 */
export function ResearchNetwork({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  const current = placed[active];

  return (
    <div className={cn("relative", className)}>
      {/* ── Orbital stage ──────────────────────────────────────────────── */}
      <div className="relative mx-auto hidden aspect-[900/640] w-full max-w-4xl md:block">
        <svg
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden
          focusable="false"
        >
          <ellipse
            cx={C.x} cy={C.y} rx={ORBIT.inner.rx} ry={ORBIT.inner.ry}
            fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1" strokeDasharray="3 6"
          />
          <ellipse
            cx={C.x} cy={C.y} rx={ORBIT.outer.rx} ry={ORBIT.outer.ry}
            fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 6"
          />

          {placed.map((t, i) => {
            const d = `M ${C.x} ${C.y} L ${t.x.toFixed(1)} ${t.y.toFixed(1)}`;
            const on = i === active;
            return (
              <g key={t.id}>
                <path
                  d={d}
                  stroke={on ? "rgba(56,189,248,0.55)" : "rgba(255,255,255,0.13)"}
                  strokeWidth="1"
                  className="transition-[stroke] duration-500"
                />
                <FlowPath
                  d={d}
                  width={on ? 2 : 1.3}
                  duration={on ? 2.4 : 6}
                  delay={i * 0.4}
                  dashRatio={0.24}
                  opacity={on ? 1 : 0.4}
                />
              </g>
            );
          })}
        </svg>

        {/* Radar sweep */}
        <span
          aria-hidden
          className="anim-spin-slow absolute top-1/2 left-1/2 aspect-square w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
          style={{
            /* Feathered at both ends — a wedge with a hard leading edge reads
               as a CSS artefact rather than a sweep. */
            background:
              "conic-gradient(from 0deg, rgba(56,189,248,0) 0deg, rgba(56,189,248,0.09) 16deg, rgba(56,189,248,0.05) 34deg, rgba(56,189,248,0) 62deg, rgba(56,189,248,0) 360deg)",
            maskImage: "radial-gradient(circle, #000 34%, transparent 74%)",
          }}
        />

        {/* Core */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
          className="absolute size-24 -translate-x-1/2 -translate-y-1/2 lg:size-28"
          style={{ left: pct(C.x, VIEW.w), top: pct(C.y, VIEW.h) }}
        >
          <span className="anim-pulse-ring absolute inset-0 rounded-full border border-[rgba(56,189,248,0.3)]" />
          <span className="absolute inset-0 rounded-full border border-white/[0.14] bg-[radial-gradient(circle_at_50%_34%,rgba(56,189,248,0.24),rgba(9,13,20,0.96)_64%)] shadow-[0_0_54px_-12px_rgba(56,189,248,0.7)]" />
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <StatusDot tone="signal" />
            <span className="text-[0.5625rem] font-semibold tracking-[0.2em] text-[var(--color-paper)]">
              R&amp;D
            </span>
          </span>
        </motion.div>

        {placed.map((t, i) => (
          <motion.button
            key={t.id}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease: EASE_OUT_EXPO }}
            className={cn(
              "absolute flex max-w-[10.5rem] -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-3 py-2 text-left transition-colors duration-400",
              i === active
                ? "border-[rgba(56,189,248,0.45)] bg-[rgba(56,189,248,0.09)] text-[var(--color-paper)] shadow-[0_0_30px_-10px_rgba(56,189,248,0.8)]"
                : "border-white/[0.09] bg-[rgba(12,17,25,0.82)] text-[var(--color-dim)] hover:border-white/20",
            )}
            style={{ left: pct(t.x, VIEW.w), top: pct(t.y, VIEW.h) }}
          >
            <span
              aria-hidden
              className={cn(
                "size-1.5 shrink-0 rounded-full transition-colors duration-400",
                i === active
                  ? "bg-[var(--color-signal)] shadow-[0_0_10px_rgba(56,189,248,0.9)]"
                  : "bg-[var(--color-faint)]",
              )}
            />
            <span className="text-[0.6875rem] leading-tight font-medium">
              {t.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Readout — the description surfaces here rather than inside a chip,
          so nothing overlaps and the change is legible. */}
      <div className="mx-auto mt-6 hidden max-w-2xl md:block">
        <div className="panel min-h-[7.5rem] rounded-2xl p-6">
          <div className="flex items-center justify-between gap-4">
            <span className="mono-label flex items-center gap-2">
              <StatusDot tone="signal" />
              Research Track / {current.short}
            </span>
            <span className="mono-label text-[0.5625rem]">
              {String(active + 1).padStart(2, "0")} — 06
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(5px)" }}
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            >
              <h3 className="mt-4 text-lg font-medium text-[var(--color-paper)]">
                {current.label}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--color-dim)]">
                {current.detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Portrait: the same tracks as a readable list ───────────────── */}
      <ul className="grid gap-3 md:hidden">
        {placed.map((t, i) => (
          <motion.li
            key={t.id}
            data-reveal
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ delay: i * 0.06, duration: 0.55, ease: EASE_OUT_EXPO }}
            className="panel rounded-xl p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="mono-label flex items-center gap-2">
                <StatusDot tone="signal" />
                {t.short}
              </span>
              <span className="mono-label text-[0.5625rem]">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-3 text-base font-medium text-[var(--color-paper)]">
              {t.label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-dim)]">
              {t.detail}
            </p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
