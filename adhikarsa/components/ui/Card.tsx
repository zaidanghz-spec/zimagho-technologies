"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { SPRING } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Surface with a gentle elevation response.
 *
 * On a light corporate page the hover cue is *lift and shadow*, not glow — a
 * cursor-following glare belongs to dark consumer UI and reads as a gimmick
 * here. The lift is driven by a motion value, so hovering never triggers a
 * React render.
 */
export function Card({
  children,
  className,
  interactive = true,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  as?: "div" | "article" | "li";
}) {
  const reduced = useReducedMotion();
  const y = useSpring(useMotionValue(0), SPRING.pointer);

  const Comp = as === "article" ? motion.article : as === "li" ? motion.li : motion.div;

  return (
    <Comp
      onPointerEnter={() => interactive && !reduced && y.set(-4)}
      onPointerLeave={() => y.set(0)}
      style={{ y }}
      className={cn(
        "card group/card relative h-full overflow-hidden",
        interactive &&
          "transition-[box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-rule-strong hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
