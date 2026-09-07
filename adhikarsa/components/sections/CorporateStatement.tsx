"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { LogoStacked } from "@/components/brand/Logo";
import type { Dictionary } from "@/data/dictionaries";
import { ANCHORS } from "@/lib/constants";

/**
 * The quiet band.
 *
 * Everything here is subtraction: two statements, the mark, and a great deal of
 * space. After the dense technical sections, the negative space is the point —
 * it is what makes the pages around it read as deliberate rather than
 * relentless. The rule between the statements is drawn by scrolling, so the
 * second thought arrives only once the first has been read.
 */
export function CorporateStatement({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  const t = dict.company.statement;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ruleScale = useTransform(scrollYProgress, [0.32, 0.55], [0, 1]);

  return (
    <section
      ref={ref}
      id={ANCHORS.statement}
      className="relative scroll-mt-24 overflow-hidden bg-canvas py-36 sm:py-44 lg:py-56"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_50%,var(--color-sky-tint)_0%,transparent_70%)] opacity-70"
      />

      <div className="shell relative">
        <div className="measure mx-auto flex max-w-4xl flex-col items-center text-center">
          <AnimatedText
            gap={0.14}
            lines={t.first}
            className="text-headline font-medium text-ink"
          />

          <motion.span
            aria-hidden
            style={{ scaleX: ruleScale }}
            className="my-12 block h-px w-24 origin-center bg-brand sm:my-16"
          />

          <AnimatedText
            gap={0.14}
            delay={0.1}
            lines={t.second}
            className="text-headline font-medium text-brand"
          />

          <Reveal preset="riseSoft" delay={0.2}>
            <LogoStacked className="mt-20 sm:mt-24" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
