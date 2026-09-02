"use client";

import { motion } from "framer-motion";
import { Layers, Cpu, Server } from "lucide-react";
import { useState } from "react";
import { MotionPath } from "@/components/motion/MotionPath";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/animations";
import { cn } from "@/lib/utils";

const LAYERS = [
  {
    id: "experience",
    name: "Experience",
    desc: "What people in the institution actually use.",
    icon: Layers,
    items: ["Management Dashboard", "Clinical Applications", "Operational Systems"],
  },
  {
    id: "intelligence",
    name: "Intelligence",
    desc: "Where process logic and reasoning live.",
    icon: Cpu,
    items: ["Automation Engine", "AI Systems", "Analytics", "Rules Engine"],
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    desc: "The systems and data already in place.",
    icon: Server,
    items: ["APIs", "Databases", "Hospital Systems", "IoT", "Cloud", "On-Premise"],
  },
] as const;

/**
 * Enterprise architecture, drawn as three separable layers.
 *
 * Pointing at a layer illuminates it and the conduits that touch it; clicking
 * pins that state. Each band is a real `<button>` rather than a hover-only
 * div, so the same exploration is available from the keyboard — and nothing
 * the hover reveals is information that is otherwise hidden.
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
          {i < LAYERS.length - 1 && <Conduits lit={active === i || active === i + 1} />}
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
      data-reveal
      type="button"
      aria-pressed={pinned}
      aria-label={`${layer.name} layer — highlight connections`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onToggle}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ delay: index * 0.1, duration: 0.7, ease: EASE_OUT_EXPO }}
      className={cn(
        "card w-full p-6 text-left transition-[opacity,border-color,box-shadow] duration-500 sm:p-7 lg:p-8",
        active && "border-[var(--color-brand)]/40 shadow-[var(--shadow-lift)]",
        dimmed && "opacity-55",
      )}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
        <div className="lg:w-60 lg:shrink-0">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "flex size-8 items-center justify-center rounded-lg border transition-colors duration-500",
                active
                  ? "border-[var(--color-brand)]/30 bg-[var(--color-sky-tint)] text-[var(--color-brand)]"
                  : "border-[var(--color-rule)] bg-[var(--color-mist)] text-[var(--color-muted)]",
              )}
            >
              <Icon className="size-3.5" />
            </span>
            <span className="annotation">{`L${index + 1}`}</span>
          </div>
          <h3 className="mt-4 text-title font-medium text-[var(--color-ink)]">
            {layer.name}
          </h3>
          <p className="mt-2 text-[0.8125rem] leading-relaxed text-[var(--color-muted)]">
            {layer.desc}
          </p>
        </div>

        <ul className="flex flex-1 flex-wrap gap-2">
          {layer.items.map((item) => (
            <li
              key={item}
              className={cn(
                /* Grow to fill the band: a layer should read as spanning the
                   institution, not as a few chips parked on the left. */
                "flex flex-1 basis-32 items-center gap-2 rounded-lg border px-3 py-2.5 text-[0.75rem] leading-tight transition-colors duration-500",
                active
                  ? "border-[var(--color-brand)]/25 bg-[var(--color-sky-tint)] text-[var(--color-ink)]"
                  : "border-[var(--color-rule)] bg-[var(--color-mist)] text-[var(--color-slate)]",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "size-1 shrink-0 rounded-full transition-colors duration-500",
                  active ? "bg-[var(--color-brand)]" : "bg-[var(--color-rule-strong)]",
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

const CONDUIT_X = [14, 32, 50, 68, 86];

function Conduits({ lit }: { lit: boolean }) {
  return (
    <div className="relative h-10 sm:h-12" aria-hidden>
      <svg viewBox="0 0 100 48" preserveAspectRatio="none" className="h-full w-full" focusable="false">
        {CONDUIT_X.map((x, i) => (
          <g key={x}>
            <line
              x1={x}
              y1="0"
              x2={x}
              y2="48"
              stroke={lit ? "var(--color-brand)" : "var(--color-rule)"}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              className="transition-[stroke] duration-500"
              opacity={lit ? 0.5 : 1}
            />
            {lit && (
              <MotionPath
                d={`M ${x} 0 V 48`}
                width={2}
                duration={1.5}
                delay={i * 0.12}
                dashRatio={0.42}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
