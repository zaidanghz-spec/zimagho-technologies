"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { SPRING } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. 0 disables perspective entirely. */
  tilt?: number;
  glowColor?: string;
};

/**
 * Surface that responds to the pointer with a following glow and a very small
 * perspective tilt.
 *
 * Everything is driven by motion values written straight to style — no React
 * state, so pointer movement never triggers a render. Touch and reduced-motion
 * users get the static surface, which is designed to stand on its own.
 */
export function GlowCard({
  children,
  className,
  tilt = 3,
  glowColor = "56,189,248",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const rx = useSpring(useMotionValue(0), SPRING.pointer);
  const ry = useSpring(useMotionValue(0), SPRING.pointer);
  const lift = useSpring(useMotionValue(0), SPRING.pointer);

  const glow = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(${glowColor},0.16), transparent 62%)`;
  const edge = useMotionTemplate`radial-gradient(320px circle at ${mx}% ${my}%, rgba(${glowColor},0.5), transparent 60%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    if (tilt > 0) {
      ry.set((px - 0.5) * 2 * tilt);
      rx.set((0.5 - py) * 2 * tilt);
    }
    lift.set(-3);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    lift.set(0);
    mx.set(50);
    my.set(50);
  };

  return (
    <div style={{ perspective: 1400 }} className={cn("group/card relative", className)}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, y: lift, transformStyle: "preserve-3d" }}
        className="panel relative h-full overflow-hidden rounded-2xl transition-colors duration-500 group-hover/card:border-white/[0.14]"
      >
        {/* Following glow */}
        <motion.span
          aria-hidden
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        />
        {/* Illuminated edge — a 1px inner ring lit only where the cursor is */}
        <motion.span
          aria-hidden
          style={{ background: edge }}
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 [mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] [mask-composite:exclude] p-px group-hover/card:opacity-100"
        />
        <div className="relative h-full">{children}</div>
      </motion.div>
    </div>
  );
}
