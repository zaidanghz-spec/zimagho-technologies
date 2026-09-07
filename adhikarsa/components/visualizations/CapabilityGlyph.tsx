"use client";

import { MotionPath } from "@/components/motion/MotionPath";

/**
 * A small technical signature for each capability row.
 *
 * These are diagrams, not icons: each one draws the shape of the work it
 * names. They live at 132×52 and respond to `group-hover/row` on the row that
 * contains them, so hovering the row animates the drawing rather than a
 * decorative badge.
 */

const S = {
  line: "stroke-rule-strong",
  node: "fill-surface stroke-rule-strong",
  live: "fill-brand",
} as const;

const wrap = "h-[52px] w-[132px] overflow-visible";

/** 01 — Hospital Automation: a task chain carrying work forward. */
function Automation() {
  const d = "M 6 26 H 126";
  return (
    <svg viewBox="0 0 132 52" className={wrap} aria-hidden focusable="false">
      <path d={d} className={S.line} strokeWidth="1" fill="none" />
      <MotionPath d={d} width={2} duration={3.2} dashRatio={0.22} />
      {[6, 36, 66, 96, 126].map((x, i) => (
        <rect
          key={x}
          x={x - 5}
          y={21}
          width={10}
          height={10}
          rx={3}
          className={`${S.node} transition-[fill,stroke] duration-500 ${
            i === 2 ? "group-hover/row:fill-brand group-hover/row:stroke-brand" : ""
          }`}
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

/** 02 — System Integration: many endpoints resolving to one interface. */
function Integration() {
  const paths = [8, 20, 32, 44].map(
    (y) => `M 10 ${y} C 46 ${y}, 62 26, 98 26`,
  );
  return (
    <svg viewBox="0 0 132 52" className={wrap} aria-hidden focusable="false">
      {paths.map((d, i) => (
        <g key={d}>
          <path d={d} className={S.line} strokeWidth="1" fill="none" />
          <MotionPath d={d} width={1.6} duration={3.4 + i * 0.4} delay={i * 0.5} dashRatio={0.26} />
        </g>
      ))}
      {[8, 20, 32, 44].map((y) => (
        <circle key={y} cx={6} cy={y} r={2.5} className={S.node} strokeWidth="1" />
      ))}
      <rect
        x={98}
        y={17}
        width={18}
        height={18}
        rx={5}
        className="fill-surface stroke-brand transition-[fill] duration-500 group-hover/row:fill-[var(--color-sky-tint)]"
        strokeWidth="1.2"
      />
      <circle cx={107} cy={26} r={2.5} className={S.live} />
    </svg>
  );
}

/** 03 — Artificial Intelligence: a ranked, re-weighting priority list. */
function Intelligence() {
  const rows = [
    { w: 110, y: 10, on: true },
    { w: 78, y: 22, on: false },
    { w: 54, y: 34, on: false },
    { w: 34, y: 46, on: false },
  ];
  return (
    <svg viewBox="0 0 132 52" className={wrap} aria-hidden focusable="false">
      {rows.map((r, i) => (
        <g key={r.y}>
          <rect x={6} y={r.y - 3} width={120} height={3} rx={1.5} className="fill-stone" />
          <rect
            x={6}
            y={r.y - 3}
            width={r.w}
            height={3}
            rx={1.5}
            className={
              r.on
                ? "fill-brand"
                : "fill-[var(--color-rule-strong)] transition-[fill] duration-500 group-hover/row:fill-brand/45"
            }
            style={{ transitionDelay: `${i * 60}ms` }}
          />
        </g>
      ))}
    </svg>
  );
}

/** 04 — Custom Software Development: a stack assembled to fit. */
function Development() {
  return (
    <svg viewBox="0 0 132 52" className={wrap} aria-hidden focusable="false">
      {[
        { y: 6, w: 92 },
        { y: 21, w: 118 },
        { y: 36, w: 72 },
      ].map((r, i) => (
        <rect
          key={r.y}
          x={7}
          y={r.y}
          width={r.w}
          height={10}
          rx={3}
          className={`fill-surface stroke-rule-strong transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            i === 1 ? "group-hover/row:translate-x-1.5" : "group-hover/row:-translate-x-1"
          }`}
          strokeWidth="1"
        />
      ))}
      <rect
        x={7}
        y={21}
        width={3}
        height={10}
        rx={1.5}
        className="fill-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-1.5"
      />
    </svg>
  );
}

/** 05 — Data & Operational Intelligence: a trend read off live operations. */
function DataIntelligence() {
  const d = "M 6 42 L 27 34 L 48 38 L 69 22 L 90 27 L 111 12 L 126 16";
  return (
    <svg viewBox="0 0 132 52" className={wrap} aria-hidden focusable="false">
      {[16, 30, 44].map((y) => (
        <line key={y} x1="6" y1={y} x2="126" y2={y} className="stroke-rule-soft" strokeWidth="1" />
      ))}
      <path
        d={`${d} L 126 48 L 6 48 Z`}
        className="fill-brand opacity-0 transition-opacity duration-500 group-hover/row:opacity-[0.08]"
      />
      <path d={d} className="stroke-brand" strokeWidth="1.6" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={126} cy={16} r={2.5} className={S.live} />
    </svg>
  );
}

/** 06 — Research & Development: exploration around a known centre. */
function Research() {
  return (
    <svg viewBox="0 0 132 52" className={wrap} aria-hidden focusable="false">
      <ellipse cx={66} cy={26} rx={54} ry={20} className="stroke-rule-strong" strokeWidth="1" fill="none" strokeDasharray="3 5" />
      <ellipse cx={66} cy={26} rx={30} ry={11} className="stroke-rule" strokeWidth="1" fill="none" strokeDasharray="3 5" />
      <circle cx={66} cy={26} r={4} className="fill-surface stroke-brand" strokeWidth="1.2" />
      <circle cx={66} cy={26} r={1.6} className={S.live} />
      <circle cx={120} cy={26} r={2.5} className="fill-brand transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:-translate-x-3 group-hover/row:-translate-y-1" />
      <circle cx={36} cy={15} r={2} className="fill-cyan transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-2 group-hover/row:translate-y-1" />
    </svg>
  );
}

export const GLYPHS = {
  automation: Automation,
  integration: Integration,
  intelligence: Intelligence,
  development: Development,
  data: DataIntelligence,
  research: Research,
} as const;

export type GlyphKey = keyof typeof GLYPHS;
