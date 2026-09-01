"use client";

import { motion } from "framer-motion";
import { Boxes, Cpu, Layers } from "lucide-react";
import { useState } from "react";
import { FlowPath } from "@/components/visualizations/FlowPath";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/animations";
import { cn } from "@/lib/utils";

const LAYERS = [
  {
    id: "experience",
    name: "Experience Layer",
    desc: "What people in the hospital actually touch.",
    icon: Layers,
    items: ["Hospital Dashboard", "Clinical Apps", "Operational Apps", "Management Systems"],
  },
  {
    id: "intelligence",
    name: "Intelligence Layer",
    desc: "Where process logic and reasoning live.",
    icon: Cpu,
    items: ["Automation Engine", "AI Models", "Rules Engine", "Analytics"],
  },
  {
    id: "infrastructure",
    name: "Infrastructure Layer",
    desc: "The systems and data already in place.",
    icon: Boxes,
    items: ["APIs", "Hospital Systems", "Databases", "IoT", "Cloud / On-Premise"],
  },
] as const;

/**
 * Interactive stack. Pointing at a layer illuminates it and the conduits that
 * touch it; clicking pins that state.
 *
 * Each band is a real `<button>` rather than a hover-only div, so the same
 * exploration is available from the keyboard — and nothing the hover reveals
 * is information that is otherwise hidden.
 */
export function ArchitectureDiagram({ className }: { className?: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const active = hovered ?? pinned;

  return (
    <div className={cn("relative", className)}>
      {LAYERS.map((layer, i) => (
        <div key={layer.id}>
          <LayerBand
            layer={layer}
            index={i}
            active={active === i}
            dimmed={active !== null && active !== i}
            pinned={pinned === i}
            onEnter={() => setHovered(i)}
            onLeave={() => setHovered(null)}
            onToggle={() => setPinned((p) => (p === i ? null : i))}
          />
          {i < LAYERS.length - 1 && (
            <Conduits lit={active === i || active === i + 1} index={i} />
          )}
        </div>
      ))}
    </div>
  );
}

function LayerBand({
  layer,
  index,
  active,
  dimmed,
  pinned,
  onEnter,
  onLeave,
  onToggle,
}: {
  layer: (typeof LAYERS)[number];
  index: number;
  active: boolean;
  dimmed: boolean;
  pinned: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
}) {
  const Icon = layer.icon;

  return (
    <motion.button
      type="button"
      aria-pressed={pinned}
      aria-label={`${layer.name} — highlight connections`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onToggle}
      data-reveal
      initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={VIEWPORT}
      transition={{ delay: index * 0.1, duration: 0.7, ease: EASE_OUT_EXPO }}
      className={cn(
        "panel relative w-full overflow-hidden rounded-2xl p-6 text-left transition-[opacity,border-color,box-shadow] duration-500 sm:p-7 lg:p-8",
        active &&
          "border-[rgba(56,189,248,0.35)] shadow-[0_0_0_1px_rgba(56,189,248,0.12),0_24px_60px_-30px_rgba(56,189,248,0.55)]",
        dimmed && "opacity-45",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_20%_0%,rgba(56,189,248,0.12),transparent_68%)] transition-opacity duration-500",
          active ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
        <div className="lg:w-64 lg:shrink-0">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "hairline flex size-8 items-center justify-center rounded-lg bg-white/[0.03] transition-colors duration-500",
                active ? "text-[var(--color-signal)]" : "text-[var(--color-faint)]",
              )}
            >
              <Icon className="size-3.5" />
            </span>
            <span className="mono-label">{`L${index + 1}`}</span>
          </div>
          <h3 className="mt-4 text-lg font-medium tracking-[-0.02em] text-[var(--color-paper)] sm:text-xl">
            {layer.name}
          </h3>
          <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-[var(--color-faint)]">
            {layer.desc}
          </p>
        </div>

        <ul className="flex flex-1 flex-wrap gap-2">
          {layer.items.map((item) => (
            <li
              key={item}
              className={cn(
                /* Grow to fill the band: a layer should read as spanning the
                   hospital, not as a few chips parked on the left. */
                "flex flex-1 basis-40 items-center gap-2 rounded-lg border px-3 py-2.5 text-[0.75rem] leading-tight transition-colors duration-500",
                active
                  ? "border-[rgba(56,189,248,0.28)] bg-[rgba(56,189,248,0.07)] text-[var(--color-paper)]"
                  : "border-white/[0.06] bg-white/[0.015] text-[var(--color-dim)]",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "size-1 shrink-0 rounded-full transition-colors duration-500",
                  active ? "bg-[var(--color-signal)]" : "bg-[var(--color-faint)]",
                )}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.button>
  );
}

const CONDUIT_X = [12, 30, 50, 70, 88];

function Conduits({ lit, index }: { lit: boolean; index: number }) {
  return (
    <div className="relative h-12 sm:h-14" aria-hidden>
      <svg
        viewBox="0 0 100 56"
        preserveAspectRatio="none"
        className="h-full w-full"
        focusable="false"
      >
        {CONDUIT_X.map((x, i) => (
          <g key={x}>
            <line
              x1={x}
              y1="0"
              x2={x}
              y2="56"
              stroke={lit ? "rgba(56,189,248,0.5)" : "rgba(255,255,255,0.15)"}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              className="transition-[stroke] duration-500"
            />
            {lit && (
              <FlowPath
                d={`M ${x} 0 V 56`}
                width={2}
                duration={1.6}
                delay={i * 0.14 + index * 0.1}
                dashRatio={0.4}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
