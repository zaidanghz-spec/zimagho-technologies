"use client";

import { motion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

/**
 * Reports when this element crosses the middle of the screen.
 *
 * The sticky sections used to derive their active index from scroll progress
 * over the whole track, which is only ever an approximation: the sticky pane,
 * its offset from the top, and the items all have different heights, so the
 * diagram ran ahead of the text it was supposed to be illustrating — the
 * screen said "organisations" while the picture showed the AI bottleneck.
 *
 * Asking the browser instead removes the arithmetic. The viewport margin
 * collapses the observation area to a thin band across the middle of the
 * screen, so exactly one item is ever inside it, and whichever item is there
 * is by definition the one being read — scrolling up included.
 */
export function StageWatcher({
  index,
  onEnter,
  as: Comp = "div",
  className,
  children,
}: {
  index: number;
  onEnter: (index: number) => void;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const M = motion[Comp as "div"] ?? motion.div;
  return (
    <M
      className={className}
      viewport={{ margin: "-50% 0px -50% 0px", amount: 0 }}
      onViewportEnter={() => onEnter(index)}
    >
      {children}
    </M>
  );
}
