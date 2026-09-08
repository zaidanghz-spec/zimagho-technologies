"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Reading progress, as a single hairline at the top of the page.
 *
 * Deliberately not a chapter list down the side: the narrative's whole premise
 * is that the reader discovers where they are by reading, and a permanent
 * index would tell them the ending on arrival. This says only how far they
 * have come.
 */
export function ChapterRail() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-cobalt"
    />
  );
}
