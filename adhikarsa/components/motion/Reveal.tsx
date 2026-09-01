"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { blurUp, fadeUp, scaleIn, stagger, VIEWPORT } from "@/lib/animations";
import { cn } from "@/lib/utils";

const PRESETS = { blurUp, fadeUp, scaleIn } satisfies Record<string, Variants>;

/**
 * Motion components are created once at module scope. Building them inside
 * render would hand React a new component type every pass and remount the
 * subtree on every state change.
 */
const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  span: motion.span,
  p: motion.p,
  ul: motion.ul,
  li: motion.li,
  h2: motion.h2,
  h3: motion.h3,
  header: motion.header,
  figure: motion.figure,
} as const;

export type RevealTag = keyof typeof TAGS;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Entrance character. `blurUp` is the site default. */
  preset?: keyof typeof PRESETS;
  delay?: number;
  as?: RevealTag;
};

/**
 * Single-element viewport entrance. Fires once, so scrolling back up never
 * replays the page — repeated reveals are the fastest way to make a site feel
 * cheap.
 */
export function Reveal({
  children,
  className,
  preset = "blurUp",
  delay = 0,
  as = "div",
}: RevealProps) {
  const Comp = TAGS[as];
  return (
    <Comp
      className={className}
      variants={PRESETS[preset]}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  as?: RevealTag;
};

/**
 * Orchestrates staggered children. Children must be `RevealItem` (or any
 * motion element declaring the same variant names) to inherit the timing.
 */
export function RevealGroup({
  children,
  className,
  gap = 0.09,
  delay = 0,
  as = "div",
}: RevealGroupProps) {
  const Comp = TAGS[as];
  return (
    <Comp
      className={className}
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  preset = "blurUp",
  as = "div",
}: Omit<RevealProps, "delay">) {
  const Comp = TAGS[as];
  return (
    <Comp className={cn(className)} variants={PRESETS[preset]}>
      {children}
    </Comp>
  );
}
