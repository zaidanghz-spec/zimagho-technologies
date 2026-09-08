"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/story/primitives/Reveal";
import { SectionLabel } from "@/components/story/primitives/SectionLabel";
import { EASE } from "@/components/story/primitives/motion";
import { story } from "@/data/story";

/**
 * 04 — The belief.
 *
 * The quietest screen on the page, and the one everything before it has been
 * arranging. Two beats and a resolution, centred, with nothing else on screen
 * — no diagram, no rule, no navigation cue. After ten screens of argument the
 * absence of anything to look at is what makes it land.
 */
export function BeliefSection() {
  const t = story.belief;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.55, 0]);

  return (
    <section
      id="belief"
      ref={ref}
      className="scroll-mt-24 relative overflow-hidden border-t border-hairline py-36 sm:py-48 lg:py-60"
    >
      <motion.div
        aria-hidden
        style={{ opacity: glow }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(46%_46%_at_50%_50%,rgba(76,111,255,0.2)_0%,transparent_72%)]"
      />

      <div className="field relative text-center">
        <SectionLabel className="justify-center">{t.marker}</SectionLabel>

        <div className="mx-auto mt-14 max-w-4xl space-y-8 sm:space-y-10">
          {t.beats.map((beat, i) => (
            <motion.p
              key={beat}
              data-reveal
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 1.1, ease: EASE, delay: i * 0.12 }}
              className="text-statement font-medium text-paper"
            >
              {beat}
            </motion.p>
          ))}
        </div>

        <Reveal preset="fade" delay={0.25} className="mt-16 flex justify-center sm:mt-20">
          <span aria-hidden className="block h-16 w-px bg-hairline-strong" />
        </Reveal>

        <motion.p
          data-reveal
          initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.3, ease: EASE }}
          className="charged mt-14 text-chapter font-medium sm:mt-16"
        >
          {t.resolve}
        </motion.p>
      </div>
    </section>
  );
}
