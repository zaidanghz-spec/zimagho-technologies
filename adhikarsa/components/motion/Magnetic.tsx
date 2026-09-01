"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { SPRING } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** The wrapper is inline-block by default; override to let it stretch. */
  /** Peak pull in px. Kept small on purpose — the effect should be felt, not seen. */
  strength?: number;
};

/**
 * Magnetic pointer attraction. Pointer-only (`@media (pointer: fine)` is
 * enforced by the `onPointerMove` guard) and disabled under reduced motion.
 */
export function Magnetic({ children, className, strength = 6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING.pointer);
  const sy = useSpring(y, SPRING.pointer);

  const handleMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * strength);
    y.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.span>
  );
}
