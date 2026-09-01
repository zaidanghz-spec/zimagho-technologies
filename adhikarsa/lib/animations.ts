import type { Transition, Variants } from "framer-motion";

/**
 * ============================================================================
 * MOTION SYSTEM
 * ----------------------------------------------------------------------------
 * One vocabulary for the whole site. Sections compose these instead of
 * inventing local timings, which is what keeps the pacing feeling deliberate
 * rather than assembled.
 *
 * Rules that hold everywhere:
 *  - animate transform / opacity / filter only (compositor-friendly)
 *  - springs for anything a pointer drives, tuned durations for reveals
 *  - nothing bounces; overshoot reads as toy-like at this scale
 * ============================================================================
 */

/** Expo-out. The house curve — fast commitment, long soft settle. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
/** Quint-in-out, for movements that leave and arrive (sticky/parallax). */
export const EASE_IN_OUT = [0.83, 0, 0.17, 1] as const;

export const SPRING = {
  /** Pointer-tracking: cursor, magnetic buttons, card tilt. */
  pointer: { type: "spring", stiffness: 320, damping: 32, mass: 0.55 },
  /** Layout-scale movement: panels, diagram nodes. */
  surface: { type: "spring", stiffness: 180, damping: 26, mass: 0.9 },
  /** Near-critically damped; used where overshoot would look cheap. */
  precise: { type: "spring", stiffness: 260, damping: 40, mass: 0.8 },
} satisfies Record<string, Transition>;

export const DURATION = {
  fast: 0.28,
  base: 0.62,
  slow: 0.95,
  cinematic: 1.35,
} as const;

/** Shared viewport trigger — fires once, slightly before the element lands. */
export const VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -12% 0px" } as const;
export const VIEWPORT_EARLY = { once: true, amount: 0.1, margin: "0px 0px -5% 0px" } as const;

/** Blur-to-sharp rise. The site's default entrance. */
export const blurUp: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO } },
};

/** For diagram nodes and dashboard tiles settling into place. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
};

/** Masked line reveal — the mask lives in the wrapper, this moves inside it. */
export const maskLine: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
};

/** Parent orchestrator. Children opt in with any variant above. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** SVG connection draw-in. */
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: DURATION.cinematic, ease: EASE_OUT_EXPO },
      opacity: { duration: 0.3 },
    },
  },
};
