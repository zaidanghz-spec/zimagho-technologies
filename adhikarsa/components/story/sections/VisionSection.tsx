"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionLabel } from "@/components/story/primitives/SectionLabel";
import { EASE } from "@/components/story/primitives/motion";
import { useStage } from "@/components/story/primitives/useStage";
import { story } from "@/data/story";

/**
 * 12 — The vision.
 *
 * The one screen the page is built to arrive at. Five statements replace one
 * another on an otherwise empty field, the lattice fades up behind them as the
 * section takes hold, and the company signs its name at the end.
 *
 * The type is centred here and nowhere else on the site. Centred display type
 * is a strong device and a tiring one; spending it in a single place is what
 * makes it register as a change of register rather than as a layout.
 */
export function VisionSection() {
  const t = story.vision;
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });
  const stage = useStage(scrollYProgress, t.beats.length + 1, 0.05);
  const lattice = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [0, 0.6, 0.6, 0]);
  const bloom = useTransform(scrollYProgress, [0.55, 0.85, 1], [0, 0.85, 0.5]);

  const done = stage >= t.beats.length;

  return (
    <section id="vision" className="scroll-mt-24 relative border-t border-hairline">
      <div ref={track} className="relative h-[420svh]">
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
          <motion.div aria-hidden style={{ opacity: lattice }} className="lattice falloff absolute inset-0" />
          <motion.div
            aria-hidden
            style={{ opacity: bloom }}
            className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_52%,rgba(76,111,255,0.22)_0%,transparent_70%)]"
          />

          <div className="field relative w-full text-center">
            <SectionLabel className="mb-16 justify-center sm:mb-20">{t.marker}</SectionLabel>

            {/* Tall enough for the longest beat at two lines, so the ticks below can
                never be overrun by the type. */}
            <div className="relative mx-auto min-h-[5.6em] max-w-5xl sm:min-h-[2.6em]">
              {t.beats.map((beat, i) => (
                <motion.p
                  key={beat}
                  aria-hidden={stage !== i}
                  initial={false}
                  animate={{
                    opacity: stage === i ? 1 : 0,
                    y: stage === i ? 0 : stage > i ? -24 : 24,
                    filter: stage === i ? "blur(0px)" : "blur(12px)",
                  }}
                  transition={{ duration: 0.85, ease: EASE }}
                  className="absolute inset-x-0 top-0 text-chapter font-medium text-paper"
                >
                  {beat}
                </motion.p>
              ))}

              {/* The resolution, on its own beat. */}
              <motion.div
                aria-hidden={!done}
                initial={false}
                animate={{ opacity: done ? 1 : 0, y: done ? 0 : 28, filter: done ? "blur(0px)" : "blur(14px)" }}
                transition={{ duration: 1, ease: EASE }}
                className="absolute inset-x-0 top-0"
              >
                <p className="charged text-chapter font-medium">{t.resolve}</p>
                <p className="marker mt-10 text-paper-dim sm:mt-12">{t.signature}</p>
              </motion.div>
            </div>

            <div className="mt-20 flex items-center justify-center gap-2 sm:mt-24">
              {[...t.beats, "resolve"].map((b, i) => (
                <span
                  key={b}
                  aria-hidden
                  className={
                    stage === i
                      ? "h-px w-12 bg-cobalt transition-all duration-700"
                      : "h-px w-5 bg-hairline-strong transition-all duration-700"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
