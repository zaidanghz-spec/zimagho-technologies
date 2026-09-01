"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * One motion policy for the whole tree.
 *
 * `reducedMotion="user"` makes every transform/layout animation opt out
 * automatically when the OS asks for reduced motion, leaving opacity changes
 * intact — components never have to branch on it themselves.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict={false}>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
