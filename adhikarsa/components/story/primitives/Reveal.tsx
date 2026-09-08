"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import {
  IN_VIEW,
  IN_VIEW_EARLY,
  drawX,
  fade,
  focusIn,
  rise,
  stagger,
} from "@/components/story/primitives/motion";
import { cn } from "@/lib/utils";

const PRESETS: Record<string, Variants> = { rise, fade, focusIn, drawX };

export type Preset = keyof typeof PRESETS;

/** One element entering. Everything that is not display type uses this. */
export function Reveal({
  children,
  preset = "rise",
  delay = 0,
  early = false,
  as: Comp = "div",
  className,
}: {
  children: ReactNode;
  preset?: Preset;
  delay?: number;
  early?: boolean;
  as?: ElementType;
  className?: string;
}) {
  const M = motion[Comp as "div"] ?? motion.div;
  return (
    <M
      data-reveal
      variants={PRESETS[preset]}
      initial="hidden"
      whileInView="visible"
      viewport={early ? IN_VIEW_EARLY : IN_VIEW}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </M>
  );
}

/**
 * A group whose children arrive in sequence.
 *
 * The stagger lives on the parent rather than on per-child delays, so a list
 * that grows does not need every delay recalculated, and the whole group is
 * still one `whileInView` observer instead of twelve.
 */
export function RevealGroup({
  children,
  gap = 0.08,
  delay = 0,
  early = false,
  as: Comp = "div",
  className,
}: {
  children: ReactNode;
  gap?: number;
  delay?: number;
  early?: boolean;
  as?: ElementType;
  className?: string;
}) {
  const M = motion[Comp as "div"] ?? motion.div;
  return (
    <M
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={early ? IN_VIEW_EARLY : IN_VIEW}
      className={cn(className)}
    >
      {children}
    </M>
  );
}

export function RevealItem({
  children,
  preset = "rise",
  as: Comp = "div",
  className,
}: {
  children: ReactNode;
  preset?: Preset;
  as?: ElementType;
  className?: string;
}) {
  const M = motion[Comp as "div"] ?? motion.div;
  return (
    <M data-reveal variants={PRESETS[preset]} className={cn(className)}>
      {children}
    </M>
  );
}
