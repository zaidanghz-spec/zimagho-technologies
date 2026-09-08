"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { LargeHeading } from "@/components/story/primitives/LargeHeading";
import { Reveal } from "@/components/story/primitives/Reveal";
import { LatticeField } from "@/components/story/visuals/LatticeField";
import { SystemDrift } from "@/components/story/visuals/SystemDrift";
import { story } from "@/data/story";

/**
 * 01 — The opening.
 *
 * One sentence, one line of support, one way forward. Everything a visitor
 * could want to know is further down, and the only job of this screen is to
 * make the next one worth reaching.
 *
 * The headline runs the full width of the field rather than sharing a grid
 * with the diagram. At this size a seven-column well cannot hold sixteen
 * characters, and the choice is between type that fills the screen and a
 * diagram that sits beside it — the type wins, and the diagram moves behind it
 * as atmosphere.
 *
 * The whole ground parallaxes at about a quarter of scroll speed, so the type
 * leaves before the field does and the page opens rather than slides.
 */
export function Hero() {
  const t = story.hero;
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "24%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0]);

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden">
      <motion.div style={{ y, opacity: fade }} className="absolute inset-0">
        <LatticeField />
        {/* Behind the type, off to the right, and never the subject. */}
        <div className="pointer-events-none absolute top-1/2 right-[-8%] hidden aspect-square w-[46vw] max-w-[40rem] -translate-y-1/2 opacity-55 lg:block xl:right-[-4%]">
          <SystemDrift />
        </div>
      </motion.div>

      <div className="field relative flex min-h-[100svh] flex-col justify-between pt-28 pb-9 sm:pt-32 lg:pt-36">
        <div className="flex flex-1 flex-col justify-center py-10">
          <Reveal preset="fade" className="flex items-center gap-4">
            <span aria-hidden className="h-px w-8 bg-cobalt" />
            <span className="marker text-paper-dim">{t.marker}</span>
          </Reveal>

          <LargeHeading
            as="h1"
            immediate
            lines={t.lines}
            accentLines={[2]}
            delay={0.18}
            className="mt-7 text-mega font-medium text-paper sm:mt-9"
          />

          <div className="mt-9 grid gap-8 sm:mt-12 lg:grid-cols-12">
            <Reveal preset="rise" delay={0.7} className="lg:col-span-5">
              <p className="max-w-xl text-say text-paper-dim">{t.body}</p>
            </Reveal>

            <Reveal preset="rise" delay={0.85} className="lg:col-span-4 lg:col-start-7 lg:self-center">
              <a
                href="#world"
                className="group/hero inline-flex items-center gap-3 rounded-full border border-hairline-strong px-6 py-3.5 text-sm text-paper transition-colors duration-500 hover:border-paper hover:bg-paper/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt-lift"
              >
                {t.cta}
                <ArrowDown
                  aria-hidden
                  className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/hero:translate-y-0.5"
                />
              </a>
            </Reveal>
          </div>
        </div>

        <Reveal preset="fade" delay={1.1} className="flex items-center justify-between">
          <span className="marker text-paper-faint">{t.scroll}</span>
          <span aria-hidden className="mx-6 h-px flex-1 bg-hairline" />
          <span className="marker text-paper-faint">Indonesia</span>
        </Reveal>
      </div>
    </section>
  );
}
