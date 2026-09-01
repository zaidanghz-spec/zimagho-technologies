"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Hairline read progress pinned under the navbar. Driven by a spring so it
 * trails the scroll slightly instead of snapping — the difference is what
 * makes it read as instrumentation rather than a loading bar.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.0008,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-[var(--color-signal-bright)] via-[var(--color-signal)] to-[var(--color-indigo)] shadow-[0_0_12px_rgba(56,189,248,0.7)]"
    />
  );
}
