"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";
import { maskLine, stagger, VIEWPORT } from "@/lib/animations";
import { cn } from "@/lib/utils";

type RevealTextProps = {
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
 * Descenders are preserved by padding the mask and pulling the box back in,
 * so "g" and "y" are never sheared.
 */
export function RevealText({
  lines,
  as: Comp = "h2",
  className,
  lineClassName,
  gap = 0.1,
  delay = 0.05,
  immediate = false,
}: RevealTextProps) {
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
          <span
            key={i}
            className="block overflow-hidden pb-[0.16em] -mb-[0.16em]"
          >
            {/* No `will-change` here on purpose: promoting the line to its
                own compositing layer stops an ancestor's
                `background-clip: text` gradient from painting these glyphs,
                which renders the whole headline invisible. Framer already
                sets `will-change` for the duration of the animation. */}
            <motion.span data-reveal variants={maskLine} className={cn("block", lineClassName)}>
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Comp>
  );
}
