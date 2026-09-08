"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";
import { EASE, IN_VIEW, maskedLine, stagger } from "@/components/story/primitives/motion";
import { cn } from "@/lib/utils";

type Props = {
  /** One entry per visual line. Breaks are authored, never measured. */
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  /** Zero-based indexes rendered in the accent instead of paper. */
  accentLines?: readonly number[];
  gap?: number;
  delay?: number;
  /** Play on mount rather than on entering the viewport (hero only). */
  immediate?: boolean;
};

/**
 * The narrative's display type.
 *
 * Each line is clipped by its own box and rides up from underneath, so a
 * three-line headline arrives as three deliberate events rather than one fade.
 * The clipping box is padded and pulled back by the same amount, because at
 * this size a descender sheared off by the mask is instantly visible.
 *
 * No `will-change` on the moving span: promoting it to its own compositing
 * layer stops an ancestor's `background-clip: text` from painting the glyphs
 * at all, which is how the gradient headlines once went invisible.
 */
export function LargeHeading({
  lines,
  as: Comp = "h2",
  className,
  lineClassName,
  accentLines,
  gap = 0.09,
  delay = 0.04,
  immediate = false,
}: Props) {
  const play = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: IN_VIEW };

  return (
    /* No `measure` here: `cqi` inside a container element resolves against its
       *ancestor* container, not itself, so the class has to sit on the box that
       holds the heading. Call sites in a narrow column add it; full-bleed ones
       let the `cqi` term fall back to the viewport, where it is inert. */
    <Comp className={cn(className)}>
      <motion.span
        className="block"
        variants={stagger(gap, delay)}
        initial="hidden"
        {...play}
      >
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.16em] -mb-[0.16em]">
            <motion.span
              data-reveal
              variants={maskedLine}
              transition={{ duration: 1.2, ease: EASE }}
              className={cn(
                "block",
                accentLines?.includes(i) && "text-cobalt-lift",
                lineClassName,
              )}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Comp>
  );
}
