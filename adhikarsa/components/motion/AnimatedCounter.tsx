"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { EASE_OUT_EXPO } from "@/lib/animations";

type Props = {
  to: number;
  from?: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/**
 * Counts up on first view by writing directly to the DOM node.
 *
 * Deliberately does NOT hold the value in React state: a 1.6s count at 60fps
 * would otherwise push ~96 renders through the tree. This mutates one text
 * node instead, so the cost is constant regardless of how many counters the
 * page shows.
 */
export function AnimatedCounter({
  to,
  from = 0,
  decimals = 0,
  duration = 1.6,
  prefix = "",
  suffix = "",
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;

    const write = (v: number) =>
      (node.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`);

    if (reduced) {
      write(to);
      return;
    }

    const controls = animate(from, to, {
      duration,
      ease: EASE_OUT_EXPO,
      onUpdate: write,
    });
    return () => controls.stop();
  }, [inView, from, to, decimals, duration, prefix, suffix, reduced]);

  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {/* Server-rendered final value keeps the number readable without JS. */}
      {`${prefix}${to.toFixed(decimals)}${suffix}`}
    </span>
  );
}
