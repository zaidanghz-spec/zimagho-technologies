"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IntelligenceBoard } from "@/components/visualizations/IntelligenceBoard";
import { company } from "@/data/company";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { SECTIONS } from "@/lib/constants";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  /* The board recedes very slightly as the page moves on — enough to feel
     three-dimensional, far too little to read as a parallax effect. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const boardY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const boardOpacity = useTransform(scrollYProgress, [0.4, 1], [1, 0.25]);

  return (
    <section ref={ref} id={SECTIONS.hero} className="relative overflow-hidden bg-white">
      {/* Atmosphere: a faint engineering grid and one cool wash, both faded
          well before they reach the copy. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="blueprint fade-edges absolute inset-0 opacity-60" />
        <div className="absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(110%_70%_at_50%_0%,rgba(234,244,255,0.9)_0%,rgba(255,255,255,0)_62%)]" />
      </div>

      <div className="shell relative pt-32 pb-20 sm:pt-36 lg:pt-44 lg:pb-28">
        <div className="max-w-4xl">
          <motion.div
            data-reveal
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE_OUT_EXPO }}
          >
            <Eyebrow>Healthcare Technology • Automation • AI</Eyebrow>
          </motion.div>

          <AnimatedText
            as="h1"
            immediate
            delay={0.18}
            gap={0.1}
            lines={["Engineering intelligent", "systems for modern", "healthcare."]}
            className="mt-8 text-display font-medium text-[var(--color-ink)]"
          />

          <motion.p
            data-reveal
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.85, ease: EASE_OUT_EXPO }}
            className="mt-8 max-w-2xl text-lead text-[var(--color-slate)]"
          >
            {company.positioning}
          </motion.p>

          <motion.div
            data-reveal
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 0.8, ease: EASE_OUT_EXPO }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              href={`#${SECTIONS.capabilities}`}
              arrow
              wrapperClassName="w-full sm:w-auto"
              className="w-full sm:w-auto"
            >
              Explore Our Solutions
            </Button>
            <Button
              href={`#${SECTIONS.profile}`}
              variant="outline"
              wrapperClassName="w-full sm:w-auto"
              className="w-full sm:w-auto"
            >
              Company Profile
            </Button>
          </motion.div>

          <motion.ul
            data-reveal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.9 }}
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-[var(--color-rule)] pt-6 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8"
          >
            {company.heroCapabilities.map((c) => (
              <li
                key={c}
                className="flex items-center gap-2.5 text-[0.8125rem] font-medium text-[var(--color-slate)]"
              >
                <span
                  aria-hidden
                  className="size-1 shrink-0 rounded-full bg-[var(--color-brand)]"
                />
                {c}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div style={{ y: boardY, opacity: boardOpacity }}>
          <IntelligenceBoard className="mt-16 lg:mt-24" />
        </motion.div>
      </div>
    </section>
  );
}
