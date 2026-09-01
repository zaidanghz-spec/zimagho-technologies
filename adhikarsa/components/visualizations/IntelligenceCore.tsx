"use client";

import { motion } from "framer-motion";
import { FlowPath } from "@/components/visualizations/FlowPath";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/animations";
import { cn } from "@/lib/utils";

export const INPUTS = [
  "Clinical Records",
  "Operational Data",
  "Laboratory Results",
  "Imaging Metadata",
  "Device Telemetry",
] as const;

export const OUTPUTS = [
  "Prediction",
  "Prioritization",
  "Automation",
  "Decision Support",
  "Analytics",
] as const;

/* Five evenly distributed rows: centres land on 10/30/50/70/90% of the stage,
   which is exactly where `justify-between` puts them. That agreement is what
   lets the SVG connect to HTML labels without measuring anything. */
const ROW_Y = [52, 156, 260, 364, 468];
const STAGE = { w: 1200, h: 520 };

/**
 * Conduit endpoints are tuned to where the HTML markers actually land.
 *
 * The stage is a fluid-column / fixed-core grid, so the marker's position as a
 * fraction of the stage drifts slightly with width. Capping the stage at
 * 1100px bounds that drift to about 15px — close enough that a line always
 * meets its dot — while the inner ends run under the opaque core.
 */
const inPath = (y: number) => `M 360 ${y} C 452 ${y}, 430 260, 512 260`;
const outPath = (y: number) => `M 688 260 C 770 260, 748 ${y}, 840 ${y}`;

/**
 * The intelligence layer: institutional signals converge, are reasoned over,
 * and leave as operational outputs.
 *
 * The core is built from three CSS-3D rings spinning in their own tilted
 * planes — real depth from three elements, rather than a canvas loop or a
 * bundled 3D runtime.
 */
export function IntelligenceCore({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {/* ── Wide stage ─────────────────────────────────────────────────── */}
      <div className="relative mx-auto hidden h-[520px] w-full max-w-[1100px] lg:block">
        <svg
          viewBox={`0 0 ${STAGE.w} ${STAGE.h}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden
          focusable="false"
        >
          {ROW_Y.map((y, i) => (
            <g key={`in-${y}`}>
              <path d={inPath(y)} fill="none" stroke="url(#adk-link)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <FlowPath
                d={inPath(y)}
                width={1.8}
                duration={4.8 + i * 0.4}
                delay={i * 0.5}
                dashRatio={0.18}
              />
            </g>
          ))}
          {ROW_Y.map((y, i) => (
            <g key={`out-${y}`}>
              <path d={outPath(y)} fill="none" stroke="url(#adk-link)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <FlowPath
                d={outPath(y)}
                stroke="url(#adk-pulse-violet)"
                width={1.8}
                duration={5 + i * 0.35}
                delay={1.6 + i * 0.5}
                dashRatio={0.18}
              />
            </g>
          ))}
        </svg>

        <div className="relative grid h-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-8">
          <ul className="flex h-full flex-col justify-between py-[26px] pr-8 text-right">
            {INPUTS.map((label, i) => (
              <Endpoint key={label} label={label} index={i} side="in" />
            ))}
          </ul>

          <Core />

          <ul className="flex h-full flex-col justify-between py-[26px] pl-8">
            {OUTPUTS.map((label, i) => (
              <Endpoint key={label} label={label} index={i} side="out" />
            ))}
          </ul>
        </div>
      </div>

      {/* ── Portrait stage ─────────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-8 lg:hidden">
        <ul className="grid w-full grid-cols-2 gap-2">
          {INPUTS.map((label, i) => (
            <Endpoint key={label} label={label} index={i} side="in" compact />
          ))}
        </ul>

        <Conduit />
        <Core compact />
        <Conduit reverse />

        <ul className="grid w-full grid-cols-2 gap-2">
          {OUTPUTS.map((label, i) => (
            <Endpoint key={label} label={label} index={i} side="out" compact />
          ))}
        </ul>
      </div>
    </div>
  );
}

function Conduit({ reverse = false }: { reverse?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative h-12 w-px overflow-hidden",
        reverse
          ? "bg-gradient-to-b from-[rgba(139,92,246,0.5)] to-transparent"
          : "bg-gradient-to-b from-transparent to-[rgba(56,189,248,0.5)]",
      )}
    >
      <span
        className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-transparent via-[var(--color-signal-bright)] to-transparent"
        style={{ animation: "adk-sweep 2.8s linear infinite" }}
      />
    </span>
  );
}

function Endpoint({
  label,
  index,
  side,
  compact = false,
}: {
  label: string;
  index: number;
  side: "in" | "out";
  compact?: boolean;
}) {
  return (
    <motion.li
      data-reveal
      initial={{ opacity: 0, x: side === "in" ? -18 : 18, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={VIEWPORT}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.7, ease: EASE_OUT_EXPO }}
      className={cn(
        "flex items-center gap-2.5",
        compact
          ? "hairline rounded-lg bg-white/[0.02] px-2.5 py-2"
          : side === "in"
            ? "justify-end"
            : "justify-start",
      )}
    >
      {side === "out" && !compact && <Marker side={side} />}
      {side === "in" && compact && <Marker side={side} />}
      <span
        className={cn(
          "leading-tight font-medium text-[var(--color-mute)]",
          compact ? "text-[0.6875rem]" : "text-sm",
        )}
      >
        {label}
      </span>
      {side === "in" && !compact && <Marker side={side} />}
      {side === "out" && compact && <Marker side={side} />}
    </motion.li>
  );
}

function Marker({ side }: { side: "in" | "out" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "size-1.5 shrink-0 rounded-full",
        side === "in"
          ? "bg-[var(--color-signal)] shadow-[0_0_10px_rgba(56,189,248,0.8)]"
          : "bg-[var(--color-violet)] shadow-[0_0_10px_rgba(139,92,246,0.8)]",
      )}
    />
  );
}

function Core({ compact = false }: { compact?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
      className={cn(
        "relative shrink-0",
        compact ? "size-40" : "size-[280px]",
      )}
      style={{ perspective: 900 }}
    >
      <div
        aria-hidden
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.2),transparent_66%)] blur-2xl"
      />

      <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        <Ring className="anim-orbit-a" inset="inset-[6%]" color="rgba(56,189,248,0.42)" dot="bg-[var(--color-signal)]" />
        <Ring className="anim-orbit-b" inset="inset-[16%]" color="rgba(139,92,246,0.4)" dot="bg-[var(--color-violet)]" />
        <Ring className="anim-orbit-c" inset="inset-[26%]" color="rgba(255,255,255,0.16)" dot="bg-white/70" />
      </div>

      {/* Inner mass */}
      <div className="absolute inset-[36%] rounded-full border border-white/[0.14] bg-[radial-gradient(circle_at_50%_32%,rgba(125,211,252,0.5),rgba(9,13,20,0.96)_66%)] shadow-[0_0_60px_-8px_rgba(56,189,248,0.75),inset_0_1px_0_rgba(255,255,255,0.2)]" />
      <span className="anim-pulse-ring absolute inset-[36%] rounded-full border border-[rgba(56,189,248,0.4)]" />

      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={cn(
            "font-semibold tracking-[0.2em] text-[var(--color-paper)]",
            compact ? "text-[0.5rem]" : "text-[0.625rem]",
          )}
        >
          AI LAYER
        </span>
      </div>
    </motion.div>
  );
}

function Ring({
  className,
  inset,
  color,
  dot,
}: {
  className: string;
  inset: string;
  color: string;
  dot: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("absolute rounded-full border", inset, className)}
      style={{ borderColor: color, transformStyle: "preserve-3d" }}
    >
      <span
        className={cn(
          "absolute top-0 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full",
          dot,
        )}
      />
    </div>
  );
}
