"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Desktop pointer follower.
 *
 * Deliberately *additive*: the native cursor stays visible. Replacing it looks
 * impressive for one second and then costs you text-selection affordances,
 * resize handles, and every OS-level cursor hint — a bad trade on a site meant
 * to read as trustworthy infrastructure.
 *
 * Mounts only for fine pointers, and never for reduced-motion users.
 */
export function CustomCursor() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const wantsCalm = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !wantsCalm;

  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 34, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 380, damping: 34, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      setActive(
        !!t?.closest?.('a, button, [role="button"], input, summary, [data-cursor="hover"]'),
      );
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[70] hidden md:block"
    >
      <motion.span
        animate={{
          width: active ? 42 : 26,
          height: active ? 42 : 26,
          opacity: active ? 1 : 0.5,
          borderColor: active ? "rgba(56,189,248,0.85)" : "rgba(203,213,225,0.4)",
          backgroundColor: active ? "rgba(56,189,248,0.08)" : "rgba(56,189,248,0)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="block -translate-x-1/2 -translate-y-1/2 rounded-full border will-change-transform"
      />
    </motion.div>
  );
}
