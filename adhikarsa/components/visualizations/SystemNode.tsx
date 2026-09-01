"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animations";
import type { NetNode } from "@/data/network";
import { cn } from "@/lib/utils";

const ACCENT = {
  signal: { dot: "bg-[var(--color-signal)]", ring: "border-[rgba(56,189,248,0.5)]", glow: "56,189,248" },
  violet: { dot: "bg-[var(--color-violet)]", ring: "border-[rgba(139,92,246,0.55)]", glow: "139,92,246" },
  online: { dot: "bg-[var(--color-online)]", ring: "border-[rgba(16,185,129,0.5)]", glow: "16,185,129" },
} as const;

/**
 * One endpoint on the hero topology. Absolutely positioned in percentage
 * space so it tracks its SVG anchor exactly as the diagram scales.
 */
export function SystemNode({
  node,
  index,
  viewW,
  viewH,
}: {
  node: NetNode;
  index: number;
  viewW: number;
  viewH: number;
}) {
  const a = ACCENT[node.accent ?? "signal"];

  /* Each side gets a complete, non-overlapping positioning recipe — mixing a
     shared base with per-side overrides would leave conflicting insets. */
  const placement = {
    left: "right-full top-1/2 mr-3 -translate-y-1/2 flex-row-reverse",
    right: "left-full top-1/2 ml-3 -translate-y-1/2",
    top: "bottom-full left-1/2 mb-3 -translate-x-1/2 justify-center",
    bottom: "top-full left-1/2 mt-3 -translate-x-1/2 justify-center",
  }[node.side];

  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 1.5 + index * 0.075,
        duration: 0.7,
        ease: EASE_OUT_EXPO,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${(node.x / viewW) * 100}%`, top: `${(node.y / viewH) * 100}%` }}
    >
      <div className="relative">
        {/* Expanding pulse ring, offset per node so they never fire in unison */}
        <span
          aria-hidden
          className={cn(
            "anim-pulse-ring absolute inset-0 rounded-full border",
            a.ring,
          )}
          style={{ animationDelay: `${index * 0.42}s` }}
        />
        <span
          aria-hidden
          className="relative flex size-3.5 items-center justify-center rounded-full border border-white/15 bg-[var(--color-ink)]"
          style={{ boxShadow: `0 0 14px rgba(${a.glow},0.45)` }}
        >
          <span className={cn("size-1.5 rounded-full", a.dot)} />
        </span>

        <div className={cn("absolute flex items-baseline gap-2 whitespace-nowrap", placement)}>
          <span className="text-[0.6875rem] leading-none font-semibold tracking-[0.14em] text-[var(--color-mute)]">
            {node.label}
          </span>
          <span className="hidden text-[0.5625rem] leading-none tracking-[0.1em] text-[var(--color-faint)] xl:inline">
            {node.meta}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
