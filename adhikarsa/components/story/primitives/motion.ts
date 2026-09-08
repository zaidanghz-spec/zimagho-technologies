import type { Variants } from "framer-motion";

/**
 * The narrative's motion vocabulary.
 *
 * Two easings and three durations, used everywhere. A storytelling page reads
 * as one piece only if every element decelerates the same way; the moment two
 * curves disagree, the page stops feeling authored and starts feeling
 * assembled.
 */
export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_SOFT = [0.33, 1, 0.68, 1] as const;

export const DUR = { quick: 0.5, base: 0.85, slow: 1.2 } as const;

/** Entrances fire once, late — content should already be on screen. */
export const IN_VIEW = { once: true, amount: 0.35, margin: "0px 0px -12% 0px" } as const;
export const IN_VIEW_EARLY = { once: true, amount: 0.08, margin: "0px 0px -4% 0px" } as const;

/** A line rising out of its own clipping box. The narrative's default reveal. */
export const maskedLine: Variants = {
  hidden: { y: "112%" },
  visible: {
    y: "0%",
    transition: { duration: DUR.slow, ease: EASE },
  },
};

/** Everything that is not a headline. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR.base, ease: EASE_SOFT } },
};

/** Blur-to-focus, used only where an element should feel like it resolves. */
export const focusIn: Variants = {
  hidden: { opacity: 0, filter: "blur(14px)", scale: 1.04 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: DUR.slow, ease: EASE },
  },
};

/** A rule that draws itself. */
export const drawX: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: DUR.slow, ease: EASE } },
};

export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
});
