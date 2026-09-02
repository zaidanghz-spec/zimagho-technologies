"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";
import { maskLine, stagger, VIEWPORT } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Props = {
  /** One entry per visual line. Line breaks are authored, not measured. */
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  gap?: number;
  delay?: number;
  /** Play immediately instead of waiting for the viewport (hero use). */
  immediate?: boolean;
};

/**
 * Masked line reveal: each line rides up from behind its own clipping box.
 *
 * The mask is padded and the box pulled back in so descenders are never
 * sheared. No `will-change` on the moving span — promoting it to its own
 * compositing layer would stop an ancestor's `background-clip: text` from
 * painting the glyphs at all.
 */
export function AnimatedText({
  lines,
  as: Comp = "h2",
  className,
  lineClassName,
  gap = 0.11,
  delay = 0.05,
  immediate = false,
}: Props) {
  const play = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: VIEWPORT };

  return (
    <Comp className={className}>
      <motion.span
        className="block"
        variants={stagger(gap, delay)}
        initial="hidden"
        {...play}
      >
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
            <motion.span
              data-reveal
              variants={maskLine}
              className={cn("block", lineClassName)}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Comp>
  );
}
