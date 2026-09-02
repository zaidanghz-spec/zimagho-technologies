import type { Transition, Variants } from "framer-motion";

/**
 * ============================================================================
 * MOTION SYSTEM
 * ----------------------------------------------------------------------------
 * One vocabulary for the whole site, tuned for a corporate register: motion is
 * smooth, deliberate and slightly slow. Nothing overshoots — bounce reads as
 * consumer-app playfulness, which is exactly wrong in a boardroom.
 *
 * Rules that hold everywhere:
 *  - animate transform / opacity / SVG path only (compositor-friendly)
 *  - reveals run 0.5–1.2s; springs are near-critically damped
 *  - every entrance fires once, so scrolling back never replays the page
 * ============================================================================
 */

/** Expo-out. The house curve — quick commitment, long settle, no rebound. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.83, 0, 0.17, 1] as const;

export const SPRING = {
  /** Pointer tracking: magnetic buttons, hover offsets. */
  pointer: { type: "spring", stiffness: 300, damping: 34, mass: 0.6 },
  /** Layout-scale movement. Damped hard enough that it never rebounds. */
  surface: { type: "spring", stiffness: 190, damping: 30, mass: 0.9 },
  precise: { type: "spring", stiffness: 260, damping: 42, mass: 0.8 },
} satisfies Record<string, Transition>;

export const DURATION = {
  fast: 0.32,
  base: 0.72,
  slow: 0.95,
  cinematic: 1.2,
} as const;

/** Shared viewport triggers — fire once, slightly before the element lands. */
export const VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -10% 0px" } as const;
export const VIEWPORT_EARLY = { once: true, amount: 0.1, margin: "0px 0px -4% 0px" } as const;

/** The site's default entrance: a short, soft rise. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
};

/** Rise with a brief defocus. Used where an element should feel like it settles. */
export const riseSoft: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO } },
};

/** Diagram nodes and cards settling into place. */
export const settle: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
};

/** Masked line reveal — the clip lives in the wrapper, this moves inside it. */
export const maskLine: Variants = {
  hidden: { y: "112%" },
  visible: {
    y: "0%",
    transition: { duration: DURATION.cinematic, ease: EASE_OUT_EXPO },
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
