"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef } from "react";
import { FlowPath } from "@/components/visualizations/FlowPath";
import { SystemNode } from "@/components/visualizations/SystemNode";
import { StatusDot } from "@/components/ui/StatusDot";
import { CORE, LINKS, NODES, SYSTEM_LABELS, VIEW } from "@/data/network";
import { EASE_OUT_EXPO, SPRING } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Hero topology — the hospital's systems bound to a single core.
 *
 * Parallax moves whole layers, never individual elements: links and nodes ride
 * the same transform, so the geometry can never drift out of register. Only
 * the ambient glow and the floating captions move at different depths.
 */
export function HospitalNetwork({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const near = { x: useSpring(px, SPRING.surface), y: useSpring(py, SPRING.surface) };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 10);
    py.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 8);
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
      {/* Full topology — pointer-capable widths only. */}
      <div className="relative hidden aspect-[1000/640] w-full md:block">
        {/* Depth layer: ambient core bloom, drifts further than the diagram.
            Sized rather than scaled — a scaled wrapper would push its box past
            the stage and widen the document. */}
        <motion.div
          aria-hidden
          style={{ x: near.x, y: near.y }}
          className="absolute inset-0 overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.16),transparent_68%)] blur-2xl" />
        </motion.div>

        {/* Diagram layer: links, nodes and core share one transform */}
        <motion.div style={{ x: near.x, y: near.y }} className="absolute inset-0">
          <svg
            viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden
            focusable="false"
          >
            {/* Static conduits, drawn in sequence on first paint */}
            {LINKS.map((l) => (
              <motion.path
                key={`base-${l.id}`}
                d={l.d}
                fill="none"
                stroke="url(#adk-link)"
                strokeWidth={1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  delay: 1.35 + l.order * 0.07,
                  duration: 1.1,
                  ease: EASE_OUT_EXPO,
                }}
              />
            ))}

            {/* Live traffic */}
            {LINKS.map((l) => (
              <FlowPath
                key={`flow-${l.id}`}
                d={l.d}
                duration={5.4 + (l.order % 4) * 0.85}
                delay={2.1 + l.order * 0.55}
                width={1.6}
                dashRatio={0.16}
              />
            ))}
          </svg>

          {/* Core */}
          <motion.div
            data-reveal
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.9, ease: EASE_OUT_EXPO }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(CORE.x / VIEW.w) * 100}%`,
              top: `${(CORE.y / VIEW.h) * 100}%`,
              width: `${((CORE.r * 2) / VIEW.w) * 100}%`,
            }}
          >
            <div className="relative aspect-square">
              <span
                aria-hidden
                className="anim-spin-slow absolute -inset-[34%] rounded-full border border-dashed border-white/[0.09]"
              />
              <span
                aria-hidden
                className="anim-pulse-ring absolute inset-0 rounded-full border border-[rgba(56,189,248,0.35)]"
              />
              <div className="absolute inset-0 rounded-full border border-white/[0.14] bg-[radial-gradient(circle_at_50%_35%,rgba(56,189,248,0.28),rgba(9,13,20,0.94)_62%)] shadow-[0_0_60px_-12px_rgba(56,189,248,0.6),inset_0_1px_0_rgba(255,255,255,0.14)]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <StatusDot tone="signal" />
                <span className="text-[0.5rem] leading-none font-semibold tracking-[0.2em] text-[var(--color-paper)] lg:text-[0.625rem]">
                  CORE
                </span>
              </div>
            </div>
            <p className="mono-label mt-3 text-center text-[0.5625rem] whitespace-nowrap text-[var(--color-dim)]">
              Adhikarsa Core
            </p>
          </motion.div>

          {NODES.map((n, i) => (
            <SystemNode key={n.id} node={n} index={i} viewW={VIEW.w} viewH={VIEW.h} />
          ))}
        </motion.div>

        {/* Caption layer — subtle telemetry, deliberately illustrative */}
        <div className="pointer-events-none absolute inset-0">
          <TelemetryCaption text={SYSTEM_LABELS[0]} className="top-[1%] left-0" delay={2.3} tone="online" />
          <TelemetryCaption text={SYSTEM_LABELS[1]} className="top-[40%] right-0" delay={2.5} />
          <TelemetryCaption text={SYSTEM_LABELS[2]} className="bottom-[5%] left-0" delay={2.7} tone="signal" />
          <TelemetryCaption text={SYSTEM_LABELS[3]} className="right-[3%] bottom-[1%]" delay={2.9} />
          <TelemetryCaption
            text={SYSTEM_LABELS[4]}
            className="top-0 left-1/2 hidden -translate-x-1/2 lg:flex"
            delay={3.1}
          />
        </div>
      </div>

      {/* Portrait recomposition — a legible system rail, not a shrunken diagram */}
      <NetworkCompact className="md:hidden" />
    </div>
  );
}

function TelemetryCaption({
  text,
  className,
  delay,
  tone = "idle",
}: {
  text: string;
  className?: string;
  delay: number;
  tone?: "online" | "signal" | "idle";
}) {
  return (
    <motion.span
      data-reveal
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: EASE_OUT_EXPO }}
      className={cn(
        "mono-label absolute flex items-center gap-1.5 text-[0.5625rem] text-[var(--color-faint)]",
        className,
      )}
    >
      <StatusDot tone={tone} blink={tone !== "idle"} />
      {text}
    </motion.span>
  );
}

/**
 * Mobile composition. A 320px-wide rendering of the full topology would be
 * illegible, so the same information is restated as a core plus a module
 * grid — still one system, still animated, but readable at arm's length.
 */
function NetworkCompact({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.2),transparent_70%)] blur-2xl" />

      <div className="relative flex flex-col items-center">
        <motion.div
          data-reveal
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.8, ease: EASE_OUT_EXPO }}
          className="relative size-24"
        >
          <span
            aria-hidden
            className="anim-spin-slow absolute -inset-3 rounded-full border border-dashed border-white/10"
          />
          <span
            aria-hidden
            className="anim-pulse-ring absolute inset-0 rounded-full border border-[rgba(56,189,248,0.35)]"
          />
          <div className="absolute inset-0 rounded-full border border-white/[0.14] bg-[radial-gradient(circle_at_50%_35%,rgba(56,189,248,0.3),rgba(9,13,20,0.95)_62%)] shadow-[0_0_50px_-14px_rgba(56,189,248,0.7)]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <StatusDot tone="signal" />
            <span className="text-[0.5625rem] leading-none font-semibold tracking-[0.18em] text-[var(--color-paper)]">
              CORE
            </span>
          </div>
        </motion.div>

        <p className="mono-label mt-3">Adhikarsa Core</p>

        {/* Conduit into the module grid */}
        <div className="relative mt-4 h-10 w-px overflow-hidden bg-gradient-to-b from-[rgba(56,189,248,0.5)] to-transparent">
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-transparent via-[var(--color-signal-bright)] to-transparent"
            style={{ animation: "adk-sweep 2.6s linear infinite" }}
          />
        </div>

        <ul className="mt-4 grid w-full grid-cols-3 gap-2">
          {NODES.map((n, i) => (
            <motion.li
              key={n.id}
              data-reveal
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + i * 0.06, duration: 0.6, ease: EASE_OUT_EXPO }}
              className="hairline flex flex-col items-center gap-1.5 rounded-xl bg-white/[0.02] px-1.5 py-3"
            >
              <StatusDot
                tone={n.accent === "violet" ? "signal" : n.accent === "online" ? "online" : "signal"}
                className="opacity-80"
              />
              <span className="text-[0.5625rem] leading-tight font-semibold tracking-[0.1em] text-[var(--color-mute)]">
                {n.label}
              </span>
            </motion.li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {SYSTEM_LABELS.slice(0, 3).map((s) => (
            <span key={s} className="mono-label flex items-center gap-1.5 text-[0.5625rem]">
              <StatusDot tone="online" />
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
