"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * One motion policy for the whole tree.
 *
 * `reducedMotion="user"` makes every transform/layout animation opt out
 * automatically when the OS asks for reduced motion, leaving opacity changes
 * intact — components never have to branch on it themselves.
 *
 * No `LazyMotion` here: it only defers the feature bundle for components
 * written as `m.*`, and this codebase uses `motion.*` throughout (the navbar's
 * shared-layout indicator needs the layout features regardless). Wrapping in
 * it would imply a saving that does not exist.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
