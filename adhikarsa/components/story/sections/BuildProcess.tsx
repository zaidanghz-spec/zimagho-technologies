"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { LargeHeading } from "@/components/story/primitives/LargeHeading";
import { Reveal } from "@/components/story/primitives/Reveal";
import { SectionLabel } from "@/components/story/primitives/SectionLabel";
import { StageWatcher } from "@/components/story/primitives/StageWatcher";
import { EASE } from "@/components/story/primitives/motion";
import { story } from "@/data/story";
import { cn } from "@/lib/utils";

/**
 * 07 — How the work happens.
 *
 * A sticky dial that advances through six stages while the descriptions scroll
 * past it. The dial is drawn as an arc rather than a list because the stages
 * are a cycle, not a queue: "improve" feeds back into "understand", and a
 * numbered column would have quietly claimed otherwise.
 */
export function BuildProcess() {
  const t = story.process;
  const [stage, setStage] = useState(0);
  const onEnter = useCallback((i: number) => setStage(i), []);

  const R = 42;
  const C = 2 * Math.PI * R;

  return (
    <section id="process" className="scroll-mt-24 relative border-t border-hairline py-28 sm:py-36">
      <div className="field">
        <SectionLabel>{t.marker}</SectionLabel>
        <div className="measure mt-10">
          <LargeHeading
            lines={t.heading}
            accentLines={[1]}
            className="text-chapter font-medium text-paper"
          />
        </div>
      </div>

      <div className="field mt-16 sm:mt-24 lg:mt-28">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[24svh]">
              <div className="relative mx-auto aspect-square w-full max-w-[24rem]">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <circle
                    cx={60}
                    cy={60}
                    r={R}
                    fill="none"
                    stroke="rgba(242,241,238,0.1)"
                    strokeWidth={0.8}
                  />
                  <motion.circle
                    cx={60}
                    cy={60}
                    r={R}
                    fill="none"
                    stroke="rgb(76 111 255)"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeDasharray={C}
                    initial={false}
                    animate={{ strokeDashoffset: C * (1 - (stage + 1) / t.stages.length) }}
                    transition={{ duration: 0.8, ease: EASE }}
                  />
                  {t.stages.map((s, i) => {
                    const a = (i / t.stages.length) * Math.PI * 2;
                    const cx = 60 + Math.cos(a) * R;
                    const cy = 60 + Math.sin(a) * R;
                    return (
                      <circle
                        key={s.n}
                        cx={cx}
                        cy={cy}
                        r={i === stage ? 3.2 : 1.8}
                        fill={i <= stage ? "rgb(128 152 255)" : "rgba(242,241,238,0.25)"}
                        className="transition-all duration-500"
                      />
                    );
                  })}
                </svg>

                {/* The stage name, dead centre. */}
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <span className="marker block text-cobalt-lift">{t.stages[stage].n}</span>
                    <motion.span
                      key={t.stages[stage].name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="mt-3 block text-statement font-medium text-paper"
                    >
                      {t.stages[stage].name}
                    </motion.span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ol className="lg:col-span-6 lg:col-start-7">
            {t.stages.map((s, i) => (
              <StageWatcher
                as="li"
                key={s.n}
                index={i}
                onEnter={onEnter}
                className={cn(
                  "border-t border-hairline py-10 transition-opacity duration-700 sm:py-12",
                  "lg:flex lg:min-h-[46svh] lg:flex-col lg:justify-center lg:py-0",
                  "lg:opacity-40",
                  i === stage && "lg:opacity-100",
                )}
              >
                <Reveal preset="rise">
                  <div className="flex items-baseline gap-5">
                    <span className="marker text-cobalt-lift">{s.n}</span>
                    <h3 className="text-statement font-medium text-paper">{s.name}</h3>
                  </div>
                  <p className="mt-4 max-w-md leading-[1.72] text-paper-dim">{s.line}</p>
                </Reveal>
              </StageWatcher>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
