"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { LargeHeading } from "@/components/story/primitives/LargeHeading";
import { Reveal } from "@/components/story/primitives/Reveal";
import { SectionLabel } from "@/components/story/primitives/SectionLabel";
import { StageWatcher } from "@/components/story/primitives/StageWatcher";
import { EASE } from "@/components/story/primitives/motion";
import { FieldGlyph, type FieldKind } from "@/components/story/visuals/FieldGlyph";
import { story } from "@/data/story";
import { cn } from "@/lib/utils";

/**
 * 03 — The problem, in four fields.
 *
 * A sticky diagram on the left, the four fields scrolling past it on the
 * right. The diagram is the argument: each problem has a different *shape*,
 * and seeing fragmentation give way to repetition give way to a bottleneck
 * lands faster than four paragraphs saying so.
 *
 * Below `lg` the sticky pane is dropped rather than shrunk. A 340px-wide
 * diagram pinned above scrolling text is unreadable in both directions; the
 * mobile composition puts each glyph with its own field instead.
 */
export function ProblemSection() {
  const t = story.problem;
  const [stage, setStage] = useState(0);
  const onEnter = useCallback((i: number) => setStage(i), []);

  return (
    <section id="problem" className="scroll-mt-24 relative border-t border-hairline py-28 sm:py-36">
      <div className="field">
        <SectionLabel>{t.marker}</SectionLabel>
        {/* `measure` on the full-width field, not on a narrow wrapper: the
            chapter openers are one system, and they can only be one system if
            they are all measured against the same box. */}
        <div className="measure mt-10">
          <LargeHeading
            lines={t.heading}
            accentLines={[1]}
            className="text-chapter font-medium text-paper"
          />
        </div>
        <Reveal preset="rise" delay={0.1} className="mt-8 max-w-xl">
          <p className="text-say text-paper-dim">{t.body}</p>
        </Reveal>
      </div>

      <div className="field relative mt-20 sm:mt-28 lg:mt-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Sticky instrument (lg+) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[22svh]">
              <div className="relative aspect-square w-full max-w-[26rem] rounded-2xl border border-hairline bg-void-lift p-8">
                {t.fields.map((f, i) => (
                  <motion.div
                    key={f.key}
                    aria-hidden
                    initial={false}
                    animate={{ opacity: stage === i ? 1 : 0, scale: stage === i ? 1 : 0.94 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="absolute inset-8"
                  >
                    <FieldGlyph kind={f.key as FieldKind} />
                  </motion.div>
                ))}
              </div>

              <ol className="mt-10 space-y-3.5">
                {t.fields.map((f, i) => (
                  <li key={f.key} className="flex items-center gap-4">
                    <span
                      aria-hidden
                      className={cn(
                        "h-px transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        stage === i ? "w-10 bg-cobalt" : "w-4 bg-hairline-strong",
                      )}
                    />
                    <span
                      className={cn(
                        "marker transition-colors duration-500",
                        stage === i ? "text-paper" : "text-paper-faint",
                      )}
                    >
                      {f.label}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* The fields themselves */}
          <ol className="lg:col-span-6 lg:col-start-7">
            {t.fields.map((f, i) => (
              <StageWatcher
                as="li"
                key={f.key}
                index={i}
                onEnter={onEnter}
                className="flex min-h-[62svh] flex-col justify-center border-t border-hairline py-14 first:border-t-0 lg:min-h-[78svh] lg:py-0"
              >
                <Reveal preset="rise">
                  <span className="marker text-cobalt-lift">
                    {String(i + 1).padStart(2, "0")} — {f.label}
                  </span>
                </Reveal>

                {/* Mobile gets the glyph inline with its field. */}
                <Reveal preset="fade" delay={0.06} className="mt-8 lg:hidden">
                  <div className="aspect-[16/10] w-full rounded-2xl border border-hairline bg-void-lift p-6">
                    <FieldGlyph kind={f.key as FieldKind} />
                  </div>
                </Reveal>

                {/* Deliberately not a masked reveal: these are sentences, and
                    the mask only works on a line that was authored to be one.
                    A rise carries them just as well and lets them wrap. */}
                <Reveal preset="rise" delay={0.06} className="measure mt-8">
                  <h3 className="max-w-xl text-statement font-medium text-paper">{f.line}</h3>
                </Reveal>

                <Reveal preset="rise" delay={0.12} className="mt-6 max-w-lg">
                  <p className="leading-[1.72] text-paper-dim">{f.detail}</p>
                </Reveal>
              </StageWatcher>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
