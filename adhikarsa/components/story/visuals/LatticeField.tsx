"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * The opening atmosphere: a computational lattice that lights where you look.
 *
 * Two copies of the same grid are stacked — a faint one that is always there,
 * and a cobalt one masked by a radial gradient that follows the pointer. The
 * mask is driven by motion values through `useMotionTemplate`, so moving the
 * mouse across the hero never renders React once; it writes a string into one
 * style property and the compositor does the rest.
 *
 * On a touch device the lit layer is dropped entirely rather than parked. A
 * radial of bright grid lines frozen in one corner does not read as light; it
 * reads as a rectangle someone forgot to remove. The faint base lattice is the
 * whole atmosphere there, and it is enough. Reduced motion keeps the light but
 * stops it following.
 */
export function LatticeField({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(52);
  const y = useMotionValue(38);
  const sx = useSpring(x, { stiffness: 55, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 55, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const onMove = (e: PointerEvent) => {
      x.set((e.clientX / window.innerWidth) * 100);
      y.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, x, y]);

  const mask = useMotionTemplate`radial-gradient(28rem 28rem at ${sx}% ${sy}%, #000 0%, rgba(0,0,0,0.35) 42%, transparent 72%)`;

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      {/* The lattice that is always present. */}
      <div className="lattice falloff absolute inset-0 opacity-70" />

      {/* The same lattice in the accent, revealed only where the light is. */}
      <motion.div
        style={{ maskImage: mask, WebkitMaskImage: mask }}
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(76,111,255,0.42)_1px,transparent_1px),linear-gradient(to_bottom,rgba(76,111,255,0.42)_1px,transparent_1px)] bg-[size:5.5rem_5.5rem] [@media(pointer:coarse)]:hidden"
      />

      {/* A single deep glow, so the ground is never flat black. */}
      <div className="absolute inset-x-0 top-[-18%] h-[70%] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(76,111,255,0.16)_0%,transparent_70%)]" />
    </div>
  );
}
