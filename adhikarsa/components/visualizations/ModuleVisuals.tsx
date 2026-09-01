"use client";

import { motion } from "framer-motion";
import { FlowPath } from "@/components/visualizations/FlowPath";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Six purpose-built mini-visuals, one per platform module.
 *
 * Each is a small piece of instrumentation rather than an icon: the point is
 * that the card *shows* the capability. Looping motion is CSS (cheap, runs
 * without React); one-shot entrances use Framer.
 */

const svgProps = {
  "aria-hidden": true as const,
  focusable: "false" as const,
  className: "h-full w-full",
};

/* ── 1. Workflow automation — a task chain with traffic running through it ── */
export function WorkflowVisual() {
  const stops = [12, 86, 160, 234, 308];
  return (
    <svg viewBox="0 0 320 120" {...svgProps}>
      <path d="M 20 44 H 316" stroke="rgba(255,255,255,0.09)" strokeWidth="1" fill="none" />
      <path
        d="M 86 44 C 120 44, 122 96, 160 96 C 198 96, 200 44, 234 44"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="1"
        fill="none"
      />

      <FlowPath d="M 20 44 H 316" stroke="url(#adk-pulse)" width={1.6} duration={4.4} dashRatio={0.18} />
      <FlowPath
        d="M 86 44 C 120 44, 122 96, 160 96 C 198 96, 200 44, 234 44"
        stroke="url(#adk-pulse)"
        width={1.4}
        duration={5.2}
        delay={1.4}
        dashRatio={0.22}
        opacity={0.75}
      />

      {stops.map((x, i) => (
        <g key={x}>
          <rect
            x={x}
            y={36}
            width={16}
            height={16}
            rx={4}
            fill="#0c1119"
            stroke={i === 2 ? "rgba(56,189,248,0.7)" : "rgba(255,255,255,0.16)"}
          />
          <circle cx={x + 8} cy={44} r={2} fill={i === 2 ? "#38bdf8" : "#475569"} />
        </g>
      ))}
      <rect x={152} y={88} width={16} height={16} rx={4} fill="#0c1119" stroke="rgba(139,92,246,0.55)" />
      <circle cx={160} cy={96} r={2} fill="#8b5cf6" />
    </svg>
  );
}

/* ── 2. AI decision support — a ranked, re-weighting priority list ───────── */
export function DecisionVisual() {
  const rows = [
    { w: "88%", d: "0s", tone: "bg-[var(--color-signal)]" },
    { w: "64%", d: "-0.9s", tone: "bg-[var(--color-signal)]/55" },
    { w: "46%", d: "-1.8s", tone: "bg-white/20" },
    { w: "31%", d: "-2.7s", tone: "bg-white/12" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3 px-1">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="mono-label w-5 shrink-0 text-[0.5625rem]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
            <span
              className={cn("absolute inset-y-0 left-0 origin-left rounded-full", r.tone)}
              style={{
                width: r.w,
                animation: `adk-bar 5.6s cubic-bezier(0.16,1,0.3,1) ${r.d} infinite`,
              }}
            />
          </span>
          {i === 0 && (
            <span className="mono-label shrink-0 text-[0.5625rem] text-[var(--color-signal)]/80">
              Priority
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── 3. System integration — many endpoints, one interface ──────────────── */
export function IntegrationVisual() {
  const ys = [16, 44, 72, 100];
  return (
    <svg viewBox="0 0 320 120" {...svgProps}>
      {ys.map((y, i) => {
        const d = `M 18 ${y} C 96 ${y}, 128 60, 206 60`;
        return (
          <g key={y}>
            <path d={d} stroke="rgba(255,255,255,0.09)" strokeWidth="1" fill="none" />
            <FlowPath
              d={d}
              stroke="url(#adk-pulse)"
              width={1.4}
              duration={4.6 + i * 0.5}
              delay={i * 0.8}
              dashRatio={0.2}
            />
            <rect x={4} y={y - 5} width={14} height={10} rx={2.5} fill="#0c1119" stroke="rgba(255,255,255,0.16)" />
          </g>
        );
      })}
      <rect x={206} y={40} width={40} height={40} rx={10} fill="#0c1119" stroke="rgba(56,189,248,0.55)" />
      <circle cx={226} cy={60} r={4} fill="#38bdf8" opacity="0.9" />
      <circle cx={226} cy={60} r={13} fill="none" stroke="rgba(56,189,248,0.28)" />
      <path d="M 246 60 H 300" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
      <FlowPath d="M 246 60 H 300" stroke="url(#adk-pulse)" width={1.5} duration={3.4} delay={0.4} dashRatio={0.3} />
      <circle cx={306} cy={60} r={4} fill="#10b981" />
    </svg>
  );
}

/* ── 4. Operational intelligence — a live-reading trend surface ─────────── */
export function IntelligenceVisual() {
  const line =
    "M 8 88 L 44 74 L 80 80 L 116 52 L 152 62 L 188 34 L 224 44 L 260 22 L 300 30";
  return (
    <svg viewBox="0 0 320 120" {...svgProps}>
      {[28, 56, 84].map((y) => (
        <line key={y} x1="8" y1={y} x2="312" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}

      <motion.path
        d={`${line} L 300 108 L 8 108 Z`}
        fill="url(#adk-area)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="#7dd3fc"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.5, ease: EASE_OUT_EXPO }}
      />
      <circle cx={300} cy={30} r={3.2} fill="#22d3ee" />
      <circle cx={300} cy={30} r={8} fill="none" stroke="rgba(34,211,238,0.35)" className="anim-blink" />
    </svg>
  );
}

/* ── 5. Smart infrastructure — devices announcing themselves ────────────── */
export function IoTVisual() {
  return (
    <div className="relative flex h-full items-center justify-center">
      <span className="relative flex size-3 items-center justify-center">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            aria-hidden
            className="anim-emit absolute size-16 rounded-full border border-[rgba(16,185,129,0.45)]"
            style={{ animationDelay: `${i * 1}s` }}
          />
        ))}
        <span className="size-2 rounded-full bg-[var(--color-online)] shadow-[0_0_14px_rgba(16,185,129,0.9)]" />
      </span>

      {[
        { c: "left-[10%] top-[22%]", d: "0s" },
        { c: "right-[12%] top-[30%]", d: "-0.8s" },
        { c: "left-[18%] bottom-[20%]", d: "-1.6s" },
        { c: "right-[16%] bottom-[24%]", d: "-2.4s" },
      ].map((s) => (
        <span
          key={s.c}
          aria-hidden
          className={cn(
            "anim-blink absolute size-1.5 rounded-full bg-[var(--color-mute)]/60",
            s.c,
          )}
          style={{ animationDelay: s.d }}
        />
      ))}
    </div>
  );
}

/* ── 6. Custom development — a build log, scrolling forever ─────────────── */
const LOG = [
  "› resolving institutional workflow map",
  "› binding adapter: HIS / HL7 interface",
  "› compiling rules: department routing",
  "› validating schema — 214 entities",
  "› deploy target: on-premise cluster",
  "› integration test suite … passed",
];

export function DevStreamVisual() {
  return (
    <div className="relative h-full overflow-hidden">
      <div className="anim-stream flex flex-col gap-2">
        {[...LOG, ...LOG].map((line, i) => (
          <p
            key={i}
            className="font-mono text-[0.625rem] leading-none whitespace-nowrap text-[var(--color-faint)]"
          >
            <span className="text-[var(--color-signal)]/70">{line.slice(0, 2)}</span>
            {line.slice(2)}
          </p>
        ))}
      </div>
      <span
        aria-hidden
        className="anim-caret absolute bottom-0 left-0 inline-block h-2.5 w-1.5 bg-[var(--color-signal)]/80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-surface)] via-transparent to-[var(--color-surface)]"
      />
    </div>
  );
}
