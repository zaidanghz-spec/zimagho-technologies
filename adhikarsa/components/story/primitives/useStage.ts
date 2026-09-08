"use client";

import { useState } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

/**
 * Reduces a continuous scroll value to a single integer stage.
 *
 * The reason this exists rather than a `useTransform` per child: with many
 * subscribers on one scroll value the per-child transforms go stale and leave
 * elements stranded at `opacity: 0`. Computing one index in the parent and
 * animating declaratively from it re-renders at most `count` times across the
 * whole section, and cannot desynchronise.
 */
export function useStage(progress: MotionValue<number>, count: number, lead = 0.06) {
  const [stage, setStage] = useState(0);

  useMotionValueEvent(progress, "change", (p) => {
    const span = 1 / count;
    const next = Math.min(count - 1, Math.max(0, Math.floor((p + lead) / span)));
    setStage((prev) => (prev === next ? prev : next));
  });

  return stage;
}
