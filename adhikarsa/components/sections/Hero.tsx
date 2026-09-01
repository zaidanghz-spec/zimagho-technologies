"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RevealText } from "@/components/motion/RevealText";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HospitalNetwork } from "@/components/visualizations/HospitalNetwork";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { SECTIONS } from "@/lib/constants";

const TRUST = ["Hospital Automation", "AI Systems", "Enterprise Integration"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  /**
   * Hero exit. The topology recedes and dissolves as the next band arrives —
   * the visual is handed off rather than scrolled past. Copy fades only
   * partially so it never disappears while still on screen.
   */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.78]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const visualBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(14px)"]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  return (
    <section
      ref={ref}
      id={SECTIONS.hero}
      className="relative flex min-h-[100svh] flex-col justify-center pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28"
    >
      <div className="shell w-full">
        <div className="grid items-center gap-14 xl:grid-cols-12 xl:gap-8">
          {/* Copy */}
          <motion.div
            style={{ y: copyY, opacity: copyOpacity }}
            className="xl:col-span-5 2xl:col-span-5"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.7, ease: EASE_OUT_EXPO }}
            >
              <Eyebrow>Hospital Intelligence Infrastructure</Eyebrow>
            </motion.div>

            <RevealText
              as="h1"
              immediate
              delay={1.3}
              gap={0.09}
              lines={["Engineering", "the intelligent", "hospital."]}
              className="mt-7 text-display font-medium text-gradient"
              lineClassName="pr-[0.06em]"
            />

            <motion.p
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.72, duration: 0.85, ease: EASE_OUT_EXPO }}
              className="mt-8 max-w-[34rem] text-[1.0625rem] leading-[1.62] text-[var(--color-dim)] sm:text-lg"
            >
              Adhikarsa builds AI-powered automation and technology
              infrastructure that connects systems, workflows, and people across
              modern healthcare institutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.8, ease: EASE_OUT_EXPO }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href={`#${SECTIONS.intelligence}`} icon>
                Explore Our Technology
              </Button>
              <Button href={`#${SECTIONS.contact}`} variant="ghost">
                Discuss a Project
              </Button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.15, duration: 0.9 }}
              className="mono-label mt-9 flex flex-wrap items-center gap-x-3 gap-y-2"
            >
              {TRUST.map((t, i) => (
                <li key={t} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden className="size-0.5 rounded-full bg-[var(--color-faint)]" />}
                  <span>{t}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Topology */}
          <motion.div
            style={{
              scale: visualScale,
              opacity: visualOpacity,
              filter: visualBlur,
            }}
            className="xl:col-span-7 2xl:col-span-7"
          >
            <HospitalNetwork className="xl:-mr-[6%] 2xl:-mr-[10%]" />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        style={{ opacity: copyOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center lg:flex"
      >
        <span className="flex flex-col items-center gap-2">
          <span className="mono-label text-[0.5625rem]">Scroll</span>
          <span className="relative h-10 w-px overflow-hidden bg-white/10">
            <span
              className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-transparent via-[var(--color-signal)] to-transparent"
              style={{ animation: "adk-sweep 2.4s ease-in-out infinite" }}
            />
          </span>
        </span>
      </motion.div>
    </section>
  );
}
