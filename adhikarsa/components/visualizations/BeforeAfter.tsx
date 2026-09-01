"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FlowPath } from "@/components/visualizations/FlowPath";
import { StatusDot } from "@/components/ui/StatusDot";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/animations";

const BEFORE = [
  { word: "Manual", rot: -2.4, x: -14, y: 0 },
  { word: "Fragmented", rot: 1.8, x: 26, y: 6 },
  { word: "Reactive", rot: -1.2, x: -6, y: 2 },
];

const AFTER = ["Connected", "Automated", "Intelligent"];

/**
 * The before/after argument, told as two different physical states rather than
 * two columns of a table.
 *
 * Left: three loose fragments — dashed, off-axis, unlinked, each drifting on
 * its own timing so nothing lines up. Right: the same three ideas snapped onto
 * a single lit rail with traffic running through it. The contrast is
 * structural, so it lands before the words are read.
 */
export function BeforeAfter() {
  return (
    <div className="grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
      {/* ── Before ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl border border-dashed border-white/[0.09] bg-[rgba(12,17,25,0.4)] p-7 sm:p-9">
        <p className="mono-label">Before Automation</p>

        <div className="relative mt-9 flex flex-col gap-4 pb-2">
          {/* Broken conduits: fragments that never join up */}
          <svg
            aria-hidden
            focusable="false"
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 300 200"
            preserveAspectRatio="none"
          >
            <path d="M 30 46 H 92" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 7" vectorEffect="non-scaling-stroke" />
            <path d="M 150 108 H 196" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 7" vectorEffect="non-scaling-stroke" />
            <path d="M 62 160 H 104" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 7" vectorEffect="non-scaling-stroke" />
          </svg>

          {BEFORE.map((b, i) => (
            <motion.span
              key={b.word}
              data-reveal
              initial={{ opacity: 0, y: 16, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: b.rot }}
              viewport={VIEWPORT}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.8, ease: EASE_OUT_EXPO }}
              style={{ marginLeft: b.x > 0 ? b.x : 0, marginRight: b.x < 0 ? -b.x : 0 }}
              className="relative w-fit rounded-lg border border-dashed border-white/[0.13] bg-white/[0.015] px-4 py-2.5 text-lg font-medium text-[var(--color-faint)] sm:text-xl"
            >
              <span
                aria-hidden
                className="absolute -top-1 -left-1 size-1.5 rounded-full bg-white/15"
              />
              {b.word}
            </motion.span>
          ))}
        </div>

        <p className="mt-8 max-w-xs text-sm leading-relaxed text-[var(--color-faint)]">
          Work is re-entered, re-checked, and re-explained between systems that
          never agreed on a shared state.
        </p>
      </div>

      {/* ── Transition ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-center lg:flex-col lg:px-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ delay: 0.35, duration: 0.7, ease: EASE_OUT_EXPO }}
          className="flex items-center gap-3 lg:flex-col"
        >
          <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-[rgba(56,189,248,0.5)] lg:h-14 lg:w-px lg:bg-gradient-to-b" />
          <span className="hairline flex size-10 items-center justify-center rounded-full bg-[rgba(56,189,248,0.08)] text-[var(--color-signal)]">
            <ArrowRight className="size-4 lg:rotate-90" />
          </span>
          <span className="mono-label hidden text-[0.5rem] whitespace-nowrap lg:block lg:[writing-mode:vertical-rl]">
            Adhikarsa
          </span>
          <span aria-hidden className="h-px w-10 bg-gradient-to-l from-transparent to-[rgba(56,189,248,0.5)] lg:h-14 lg:w-px lg:bg-gradient-to-t" />
        </motion.div>
      </div>

      {/* ── After ──────────────────────────────────────────────────────── */}
      <div className="panel relative overflow-hidden rounded-2xl p-7 sm:p-9">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_100%_0%,rgba(56,189,248,0.09),transparent_70%)]"
        />
        <p className="mono-label relative flex items-center gap-2 text-[var(--color-dim)]">
          <StatusDot tone="online" />
          After Adhikarsa
        </p>

        <div className="relative mt-9 pb-2">
          {/* One lit rail carrying all three states */}
          <svg
            aria-hidden
            focusable="false"
            viewBox="0 0 8 200"
            preserveAspectRatio="none"
            className="absolute top-2 left-[5px] h-[calc(100%-1rem)] w-2"
          >
            <line x1="4" y1="0" x2="4" y2="200" stroke="rgba(56,189,248,0.22)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <FlowPath d="M 4 0 V 200" width={2} duration={4.6} dashRatio={0.14} />
          </svg>

          <div className="flex flex-col gap-4 pl-8">
            {AFTER.map((word, i) => (
              <motion.span
                key={word}
                data-reveal
                initial={{ opacity: 0, x: 22, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={VIEWPORT}
                transition={{
                  delay: 0.45 + i * 0.11,
                  type: "spring",
                  stiffness: 220,
                  damping: 26,
                }}
                className="relative w-fit rounded-lg border border-[rgba(56,189,248,0.28)] bg-[rgba(56,189,248,0.06)] px-4 py-2.5 text-lg font-medium text-[var(--color-paper)] sm:text-xl"
              >
                <span
                  aria-hidden
                  className="absolute top-1/2 -left-[1.9rem] size-1.5 -translate-y-1/2 rounded-full bg-[var(--color-signal)] shadow-[0_0_10px_rgba(56,189,248,0.9)]"
                />
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        <p className="relative mt-8 max-w-xs text-sm leading-relaxed text-[var(--color-dim)]">
          One state, one sequence, one record — with people moved to the
          decisions that actually need judgement.
        </p>
      </div>
    </div>
  );
}
