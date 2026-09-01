"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { company } from "@/data/company";
import { SECTIONS } from "@/lib/constants";

/**
 * The quiet band.
 *
 * Everything here is subtraction: one eyebrow, two statements, and an enormous
 * wordmark drifting behind them at a slower rate than the page. After six
 * dense technical sections, the negative space is the point — it is what makes
 * the sections around it read as deliberate rather than relentless.
 */
export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const markY = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);
  const markOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0, 1, 1, 0]);
  const markScale = useTransform(scrollYProgress, [0, 1], [0.94, 1.08]);

  return (
    <section
      ref={ref}
      id={SECTIONS.philosophy}
      className="relative scroll-mt-24 overflow-hidden py-32 sm:py-44 lg:py-56"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
      />

      {/* Watermark */}
      <motion.span
        aria-hidden
        style={{ y: markY, opacity: markOpacity, scale: markScale }}
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[clamp(4rem,17vw,15rem)] leading-none font-semibold tracking-[-0.05em] text-white/[0.028] select-none"
      >
        {company.wordmark}
      </motion.span>

      <div className="shell relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal preset="fadeUp">
            <Eyebrow tone="neutral">Company Philosophy</Eyebrow>
          </Reveal>

          <RevealText
            gap={0.14}
            delay={0.1}
            lines={[
              "Technology should not",
              "merely digitize",
              "institutions.",
            ]}
            className="mt-12 text-headline font-medium gradient-paper sm:mt-16"
          />

          <RevealText
            gap={0.14}
            delay={0.24}
            lines={[
              "It should give them",
              "the intelligence",
              "to operate better.",
            ]}
            className="mt-6 text-headline font-medium gradient-signal"
          />

          <Reveal preset="blurUp" delay={0.35}>
            <p className="mt-16 max-w-2xl text-lg leading-[1.68] text-[var(--color-dim)] sm:mt-24 sm:text-xl">
              We build systems where technology disappears into the workflow —
              quietly connecting people, data, and decisions.
            </p>
          </Reveal>

          <Reveal preset="fadeUp" delay={0.45}>
            <span
              aria-hidden
              className="mt-16 block h-16 w-px bg-gradient-to-b from-[rgba(56,189,248,0.5)] to-transparent sm:mt-20"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
