"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/story/primitives/Reveal";
import { SectionLabel } from "@/components/story/primitives/SectionLabel";
import { EASE } from "@/components/story/primitives/motion";
import { useStage } from "@/components/story/primitives/useStage";
import { story } from "@/data/story";
import { cn } from "@/lib/utils";

/**
 * 02 — The world is changing.
 *
 * A tall section holding a fixed screen: three statements replace one another
 * as the reader scrolls, so the argument is paced by their own hand rather
 * than by a timer. The third turns cobalt, which is the first time the accent
 * carries meaning rather than decoration — it marks the turn from "things are
 * improving" to "not for everyone".
 */
export function WorldChanging() {
  const t = story.world;
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });
  const stage = useStage(scrollYProgress, t.beats.length, 0.1);

  return (
    <section id="world" className="scroll-mt-24 relative">
      <div ref={track} className="relative h-[280svh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div aria-hidden className="lattice falloff absolute inset-0 opacity-40" />

          <div className="field relative w-full">
            <SectionLabel className="mb-12 sm:mb-16">{t.marker}</SectionLabel>

            <div className="relative min-h-[8em] sm:min-h-[6.5em]">
              {t.beats.map((beat, i) => (
                <motion.p
                  key={beat.line}
                  aria-hidden={stage !== i}
                  initial={false}
                  animate={{
                    opacity: stage === i ? 1 : 0,
                    y: stage === i ? 0 : stage > i ? -28 : 28,
                    filter: stage === i ? "blur(0px)" : "blur(8px)",
                  }}
                  transition={{ duration: 0.75, ease: EASE }}
                  className={cn(
                    "absolute inset-x-0 top-0 max-w-5xl text-chapter font-medium",
                    beat.tone === "cobalt" ? "text-cobalt-lift" : "text-paper",
                  )}
                >
                  {beat.line}
                </motion.p>
              ))}
            </div>

            {/* Three ticks, so the reader can feel the section has a length. */}
            <div className="mt-16 flex items-center gap-2 sm:mt-20">
              {t.beats.map((b, i) => (
                <span
                  key={b.line}
                  aria-hidden
                  className={cn(
                    "h-px transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    stage === i ? "w-16 bg-cobalt" : "w-8 bg-hairline-strong",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The five facts, delivered plainly after the crescendo. */}
      <div className="field relative pb-32 sm:pb-40">
        <div className="seam mb-16 sm:mb-24" />
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal preset="rise" className="measure lg:col-span-4">
            <h2 className="text-statement font-medium text-paper">{t.ledger.lead}</h2>
          </Reveal>

          <RevealGroup as="ol" gap={0.1} className="lg:col-span-7 lg:col-start-6">
            {t.ledger.items.map((item) => (
              <RevealItem
                as="li"
                key={item.n}
                className="grid grid-cols-[2.25rem_1fr] items-baseline gap-x-5 border-t border-hairline py-6 sm:grid-cols-[2.75rem_1fr] sm:py-7"
              >
                <span className="marker text-cobalt-lift">{item.n}</span>
                <span className="text-statement font-medium text-paper">{item.text}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
