"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { company } from "@/data/company";

const LETTERS = company.wordmark.split("");

/**
 * Entry sequence: wordmark resolves, a scan line passes once, curtain lifts.
 *
 * Hard budget of ~1.15s. Anything longer is a tax on the visitor, so the
 * timeline is fixed rather than tied to asset loading, and reduced-motion
 * users skip it entirely. Page content is already in the DOM underneath —
 * this never gates rendering or indexing.
 */
export function Preloader() {
  /**
   * `useMediaQuery` rather than framer's `useReducedMotion`: its server
   * snapshot is `false`, so the server and the first client render agree and
   * hydration is clean. Framer's hook reports the real preference on the
   * client's first pass, which made this component render on the server and
   * vanish on the client — a hydration mismatch.
   */
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) return;
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(() => setDone(true), 1150);
    return () => {
      window.clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, [reduced]);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          data-preloader
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-void)]"
        >
          <div className="relative">
            <div className="flex items-center gap-[0.16em] overflow-hidden">
              {LETTERS.map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    delay: 0.05 + i * 0.028,
                    duration: 0.6,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="block text-[clamp(1.5rem,5vw,2.6rem)] font-medium tracking-[0.24em] text-[var(--color-paper)]"
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            {/* Scan line — one pass across the wordmark */}
            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 1, 1, 0] }}
              transition={{ delay: 0.28, duration: 0.8, ease: EASE_OUT_EXPO }}
              className="absolute -inset-x-6 top-1/2 h-px origin-left bg-gradient-to-r from-transparent via-[var(--color-signal)] to-transparent"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mono-label mt-5 text-center"
            >
              {company.descriptor}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
