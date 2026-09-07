"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { LogoStacked } from "@/components/brand/Logo";
import { SECTIONS } from "@/lib/constants";

/**
 * The quiet band.
 *
 * Everything here is subtraction: two statements, a mark, and a great deal of
 * white. After eight dense technical sections, the negative space is the
 * point — it is what makes the sections around it read as deliberate rather
 * than relentless. The second statement is deliberately held back until the
 * reader has scrolled past the first.
 */
export function CorporateStatement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const ruleScale = useTransform(scrollYProgress, [0.32, 0.55], [0, 1]);

  return (
    <section
      ref={ref}
      id={SECTIONS.statement}
      className="relative scroll-mt-24 overflow-hidden bg-white py-36 sm:py-44 lg:py-56"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_50%,rgba(234,244,255,0.75)_0%,rgba(255,255,255,0)_70%)]"
      />

      <div className="shell relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <AnimatedText
            gap={0.14}
            lines={["We don't build technology", "for technology's sake."]}
            className="text-headline font-medium text-[var(--color-ink)]"
          />

          <motion.span
            aria-hidden
            style={{ scaleX: ruleScale }}
            className="my-12 block h-px w-24 origin-center bg-[var(--color-brand)] sm:my-16"
          />

          <AnimatedText
            gap={0.14}
            delay={0.1}
            lines={["We build it to make", "complex systems", "work better."]}
            className="text-headline font-medium text-[var(--color-brand)]"
          />

          <Reveal preset="riseSoft" delay={0.2}>
            <LogoStacked className="mt-20 sm:mt-24" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
