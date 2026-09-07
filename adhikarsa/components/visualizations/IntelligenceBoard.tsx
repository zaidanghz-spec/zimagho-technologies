"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef } from "react";
import { MotionPath } from "@/components/motion/MotionPath";
import { EASE_OUT_EXPO, SPRING } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Hero visualization — the intelligent hospital ecosystem, drawn the way an
 * enterprise architecture board would draw it.
 *
 * Geometry lives in a fixed 1200×440 space and the container locks that aspect
 * ratio, so an absolutely-positioned HTML panel at `x/1200%` sits exactly on
 * its SVG anchor at any viewport width. HTML text stays crisp; the connections
 * stay vector.
 */

const VIEW = { w: 1200, h: 440 };
const CORE = { x: 600, y: 220, w: 244, h: 116 };
const PANEL_W = 268;
const ROWS = [56, 165, 275, 384];

type SystemPanel = { label: string; short: string; side: "left" | "right"; row: number };

/**
 * Placement is fixed; only the wording changes with the locale. The short
 * codes stay untranslated — they are the abbreviations an IT department
 * actually uses, in either language.
 */
const SLOTS: Omit<SystemPanel, "label">[] = [
  { short: "HIS", side: "left", row: 0 },
  { short: "EMR", side: "left", row: 1 },
  { short: "LAB", side: "left", row: 2 },
  { short: "RAD", side: "left", row: 3 },
  { short: "PHR", side: "right", row: 0 },
  { short: "OPS", side: "right", row: 1 },
  { short: "FIN", side: "right", row: 2 },
  { short: "IOT", side: "right", row: 3 },
];

const LEFT_X = 162;
const RIGHT_X = 1038;
const GAP = 12;

/**
 * Panel edge → core edge, bowed through the vertical mid-line.
 *
 * Each link lands on its own port, spread vertically across the core's edge,
 * rather than all four converging on one point — a bundle reads as a drawing
 * mistake, four ports read as an interface.
 */
function linkFor(s: SystemPanel) {
  const y = ROWS[s.row];
  const port = CORE.y + (s.row - 1.5) * 15;
  if (s.side === "left") {
    const from = LEFT_X + PANEL_W / 2 + GAP;
    const to = CORE.x - CORE.w / 2 - GAP;
    return `M ${from} ${y} C ${from + 92} ${y}, ${to - 92} ${port}, ${to} ${port}`;
  }
  const from = CORE.x + CORE.w / 2 + GAP;
  const to = RIGHT_X - PANEL_W / 2 - GAP;
  return `M ${from} ${port} C ${from + 92} ${port}, ${to - 92} ${y}, ${to} ${y}`;
}

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

export type BoardCopy = {
  coreLabel: string;
  coreSubtitle: string;
  systems: string[];
};

export function IntelligenceBoard({
  copy,
  className,
}: {
  copy: BoardCopy;
  className?: string;
}) {
  const systems: SystemPanel[] = SLOTS.map((slot, i) => ({
    ...slot,
    label: copy.systems[i],
  }));

  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, SPRING.surface);
  const y = useSpring(py, SPRING.surface);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    /* Whole-diagram parallax only. Moving layers independently would let the
       connections drift out of register with their panels. */
    px.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 7);
    py.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn("relative w-full", className)}
    >
      {/* ── Wide board ──────────────────────────────────────────────────── */}
      <motion.div
        style={{ x, y }}
        className="relative hidden aspect-[1200/440] w-full md:block"
      >
        <svg
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden
          focusable="false"
        >
          {systems.map((s, i) => {
            const d = linkFor(s);
            return (
              <g key={s.short}>
                <motion.path
                  d={d}
                  fill="none"
                  stroke="url(#adk-link)"
                  strokeWidth={1.25}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    delay: 0.55 + i * 0.07,
                    duration: 1.1,
                    ease: EASE_OUT_EXPO,
                  }}
                />
                <MotionPath
                  d={d}
                  stroke={s.side === "left" ? "url(#adk-pulse)" : "url(#adk-pulse-cyan)"}
                  width={2}
                  duration={4.6 + (i % 4) * 0.7}
                  delay={1.4 + i * 0.45}
                  dashRatio={0.14}
                />
              </g>
            );
          })}
        </svg>

        {systems.map((s, i) => (
          <SystemCard key={s.short} system={s} index={i} />
        ))}

        <CoreCard copy={copy} />
      </motion.div>

      {/* ── Portrait recomposition ──────────────────────────────────────── */}
      <BoardCompact copy={copy} systems={systems} className="md:hidden" />
    </div>
  );
}

function SystemCard({ system, index }: { system: SystemPanel; index: number }) {
  const cx = system.side === "left" ? LEFT_X : RIGHT_X;
  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, x: system.side === "left" ? -16 : 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.35 + index * 0.06, duration: 0.8, ease: EASE_OUT_EXPO }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: pct(cx, VIEW.w),
        top: pct(ROWS[system.row], VIEW.h),
        width: pct(PANEL_W, VIEW.w),
      }}
    >
      <div className="card flex items-center gap-3 rounded-xl px-3.5 py-3 lg:px-4">
        <span
          aria-hidden
          className="anim-breathe size-1.5 shrink-0 rounded-[2px] bg-brand"
          style={{ animationDelay: `${index * 0.4}s` }}
        />
        <span className="text-[0.75rem] leading-tight font-medium text-ink lg:text-[0.8125rem]">
          {system.label}
        </span>
        <span className="annotation ml-auto hidden shrink-0 xl:block">{system.short}</span>
      </div>
    </motion.div>
  );
}

function CoreCard({ copy }: { copy: BoardCopy }) {
  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.15, duration: 0.9, ease: EASE_OUT_EXPO }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: pct(CORE.x, VIEW.w),
        top: pct(CORE.y, VIEW.h),
        width: pct(CORE.w, VIEW.w),
      }}
    >
      {/* A single soft blue bloom marks the centre of gravity. Nothing else on
          the page glows. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(16,70,214,0.12),transparent_70%)] blur-xl"
      />
      <div className="relative rounded-2xl border border-[var(--color-brand)]/25 bg-surface px-4 py-4 shadow-[var(--shadow-float)] lg:px-5 lg:py-5">
        <div className="flex items-center gap-2">
          <span aria-hidden className="relative flex size-2 items-center justify-center">
            <span className="anim-ripple absolute inset-0 rounded-full bg-brand/40" />
            <span className="size-1.5 rounded-full bg-brand" />
          </span>
          <span className="annotation text-brand">{copy.coreLabel}</span>
        </div>
        <p className="mt-2 text-[0.9375rem] leading-none font-semibold tracking-[0.1em] text-ink lg:text-base">
          ADHIKARSA
        </p>
        <p className="mt-1.5 text-[0.6875rem] leading-none font-medium tracking-[0.06em] text-slate lg:text-xs">
          {copy.coreSubtitle}
        </p>
      </div>
    </motion.div>
  );
}

/**
 * Portrait layout. A 1200-unit board squeezed into 350px would be unreadable,
 * so the same information is restated as a core plus a two-column system grid
 * fed by one visible conduit.
 */
function BoardCompact({
  copy,
  systems,
  className,
}: {
  copy: BoardCopy;
  systems: SystemPanel[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <motion.div
        data-reveal
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: EASE_OUT_EXPO }}
        className="relative w-full max-w-xs"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(16,70,214,0.12),transparent_70%)] blur-xl"
        />
        <div className="relative rounded-2xl border border-[var(--color-brand)]/25 bg-surface px-5 py-5 text-center shadow-[var(--shadow-float)]">
          <span aria-hidden className="mx-auto flex size-2 items-center justify-center">
            <span className="anim-ripple absolute size-2 rounded-full bg-brand/40" />
            <span className="size-1.5 rounded-full bg-brand" />
          </span>
          <p className="mt-3 text-base leading-none font-semibold tracking-[0.1em] text-ink">
            ADHIKARSA
          </p>
          <p className="mt-2 text-xs leading-none font-medium text-slate">
            {copy.coreSubtitle}
          </p>
        </div>
      </motion.div>

      <span aria-hidden className="relative my-4 h-10 w-px overflow-hidden bg-rule">
        <span
          className="absolute inset-x-0 top-0 h-3 bg-brand"
          style={{ animation: "adk-travel-y 2.4s linear infinite" }}
        />
      </span>

      <ul className="grid w-full grid-cols-2 gap-2">
        {systems.map((s, i) => (
          <motion.li
            data-reveal
            key={s.short}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 + i * 0.05, duration: 0.6, ease: EASE_OUT_EXPO }}
            className="hairline flex items-center gap-2 rounded-xl bg-surface px-3 py-3 shadow-[var(--shadow-hair)]"
          >
            <span
              aria-hidden
              className="anim-breathe size-1.5 shrink-0 rounded-[2px] bg-brand"
              style={{ animationDelay: `${i * 0.35}s` }}
            />
            <span className="text-[0.6875rem] leading-tight font-medium text-ink">
              {s.label}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
