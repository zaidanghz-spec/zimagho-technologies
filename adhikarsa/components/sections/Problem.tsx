"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RevealText } from "@/components/motion/RevealText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  DisconnectedSystems,
  UnifyState,
} from "@/components/visualizations/DisconnectedSystems";
import { SECTIONS } from "@/lib/constants";

/**
 * Sticky storytelling band.
 *
 * The scroll distance is intentionally generous: the convergence needs room to
 * feel deliberate. On short viewports the track shortens so the sequence still
 * completes without an exhausting scroll.
 */
export function Problem() {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  const copyOpacity = useTransform(scrollYProgress, [0, 0.12, 0.9, 1], [0, 1, 1, 0.6]);

  return (
    <section id={SECTIONS.problem} className="relative scroll-mt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
      />
      <div ref={track} className="relative h-[260vh] lg:h-[300vh]">
        <div className="sticky top-0 flex min-h-[100svh] items-center overflow-hidden py-24">
          <div className="shell w-full">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
              <motion.div style={{ opacity: copyOpacity }} className="lg:col-span-5">
                <Eyebrow>The Structural Problem</Eyebrow>

                <RevealText
                  lines={[
                    "Hospitals shouldn't",
                    "operate as",
                    "disconnected systems.",
                  ]}
                  className="mt-6 text-headline font-medium text-gradient"
                />

                <p className="mt-7 max-w-lg text-[1.0625rem] leading-[1.62] text-[var(--color-dim)]">
                  Clinical, administrative, operational, and financial systems
                  often operate independently. Adhikarsa connects these layers
                  into intelligent workflows designed around real hospital
                  operations.
                </p>

                <div className="mt-9 border-t border-white/[0.07] pt-5">
                  <UnifyState progress={scrollYProgress} />
                </div>
              </motion.div>

              <div className="lg:col-span-7">
                <DisconnectedSystems
                  progress={scrollYProgress}
                  className="mx-auto max-w-[46rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
