"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { Activity, Bed, ShieldCheck, Timer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { StatusDot } from "@/components/ui/StatusDot";
import { EASE_OUT_EXPO, VIEWPORT_EARLY } from "@/lib/animations";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────────────
   IMPORTANT — every value below is illustrative.
   This console is a design concept. It is not connected to any hospital,
   and no figure here represents a real institution, deployment, or dataset.
   ───────────────────────────────────────────────────────────────────────── */

const SEED_FLOW = [
  38, 41, 39, 46, 52, 49, 58, 63, 61, 70, 74, 69,
  77, 82, 79, 86, 91, 88, 84, 90, 95, 92, 97, 94,
];

type Telemetry = {
  occupancy: number;
  queue: number;
  theatres: number;
  turnaround: number;
  orders: number;
  flow: number[];
};

const INITIAL: Telemetry = {
  occupancy: 78,
  queue: 12,
  theatres: 6,
  turnaround: 42,
  orders: 184,
  flow: SEED_FLOW,
};

/** Deterministic PRNG — keeps the drift reproducible and dependency-free. */
function lcg(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 0xffffffff);
}

/**
 * Slow illustrative drift.
 *
 * Runs only while the console is on screen and never for reduced-motion
 * users. A four-second cadence is deliberate: a fast ticker would read as a
 * stock terminal, and this is meant to read as considered operational state.
 */
function useTelemetry(active: boolean) {
  const [data, setData] = useState<Telemetry>(INITIAL);

  useEffect(() => {
    if (!active) return;
    const rand = lcg(0x9e3779b9);

    const id = window.setInterval(() => {
      setData((d) => {
        const step = (v: number, delta: number, min: number, max: number) =>
          Math.min(max, Math.max(min, Math.round(v + (rand() - 0.5) * delta)));

        const next = Math.min(100, Math.max(28, d.flow[d.flow.length - 1] + (rand() - 0.5) * 18));
        return {
          occupancy: step(d.occupancy, 4, 68, 89),
          queue: step(d.queue, 5, 4, 21),
          theatres: step(d.theatres, 2, 4, 8),
          turnaround: step(d.turnaround, 8, 31, 58),
          orders: step(d.orders, 22, 120, 260),
          flow: [...d.flow.slice(1), Math.round(next)],
        };
      });
    }, 4000);

    return () => window.clearInterval(id);
  }, [active]);

  return data;
}

export function HospitalCommandCenter({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15 });
  const reduced = useReducedMotion();
  const t = useTelemetry(inView && !reduced);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Console bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-8 -top-16 -bottom-8 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(56,189,248,0.13),transparent_72%)] blur-2xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 34, filter: "blur(14px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={VIEWPORT_EARLY}
        transition={{ duration: 1, ease: EASE_OUT_EXPO }}
        className="panel relative overflow-hidden rounded-2xl lg:rounded-[20px]"
      >
        {/* One slow pass of light across the whole console */}
        <span
          aria-hidden
          className="anim-scan-x pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-white/[0.035] to-transparent"
        />

        <ConsoleChrome />

        <div className="relative grid gap-px bg-white/[0.05] sm:grid-cols-2 lg:grid-cols-4">
          <Tile
            icon={Bed}
            label="Bed Occupancy"
            delay={0}
            value={<AnimatedCounter to={t.occupancy} suffix="%" />}
            foot={<Meter value={t.occupancy} />}
          />
          <Tile
            icon={Activity}
            label="Emergency Queue"
            delay={0.07}
            value={<AnimatedCounter to={t.queue} />}
            foot={<span className="mono-label text-[0.5625rem]">Waiting · triaged</span>}
            tone={t.queue > 16 ? "amber" : "signal"}
          />
          <Tile
            icon={ShieldCheck}
            label="Operating Rooms"
            delay={0.14}
            value={
              <span className="tabular-nums">
                <AnimatedCounter to={t.theatres} />
                <span className="text-[var(--color-faint)]"> / 8</span>
              </span>
            }
            foot={<RoomStrip active={t.theatres} />}
          />
          <Tile
            icon={Timer}
            label="Lab Turnaround"
            delay={0.21}
            value={
              <span className="tabular-nums">
                <AnimatedCounter to={t.turnaround} />
                <span className="ml-1 text-base text-[var(--color-faint)] sm:text-lg">min</span>
              </span>
            }
            foot={<Meter value={100 - t.turnaround} tone="online" />}
          />
        </div>

        <div className="relative grid gap-px border-t border-white/[0.05] bg-white/[0.05] lg:grid-cols-12">
          <Panel title="Patient Flow" meta="Rolling 24 intervals" className="lg:col-span-7" delay={0.28}>
            <FlowChart series={t.flow} />
          </Panel>

          <Panel title="Resource Utilization" meta="By department" className="lg:col-span-5" delay={0.35}>
            <Utilization occupancy={t.occupancy} orders={t.orders} />
          </Panel>
        </div>

        <div className="relative grid gap-px border-t border-white/[0.05] bg-white/[0.05] lg:grid-cols-12">
          <Panel title="System Status" meta="Integration layer" className="lg:col-span-7" delay={0.42}>
            <SystemStatus />
          </Panel>
          <Panel title="Pharmacy Orders" meta="Queued today" className="lg:col-span-5" delay={0.49}>
            <div className="flex h-full items-end justify-between gap-4">
              <span className="text-4xl font-medium tracking-[-0.03em] text-[var(--color-paper)] tabular-nums">
                <AnimatedCounter to={t.orders} />
              </span>
              <Sparkline values={t.flow.slice(-14)} />
            </div>
          </Panel>
        </div>
      </motion.div>

      <p className="mono-label mt-4 flex items-center gap-2">
        <span aria-hidden className="h-px w-5 bg-white/20" />
        Conceptual operations interface — illustrative values, not hospital data
      </p>
    </div>
  );
}

/* ── chrome ─────────────────────────────────────────────────────────────── */

function ConsoleChrome() {
  return (
    <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-3.5 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-2 rounded-full bg-white/12" />
          <span aria-hidden className="size-2 rounded-full bg-white/12" />
          <span aria-hidden className="size-2 rounded-full bg-white/12" />
        </span>
        <span className="mono-label text-[var(--color-dim)]">
          Adhikarsa Operations Console
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="mono-label hidden items-center gap-2 sm:flex">
          <StatusDot tone="online" />
          All systems operational
        </span>
        <span className="hairline rounded-full px-2.5 py-1 text-[0.5625rem] font-medium tracking-[0.14em] text-[var(--color-faint)] uppercase">
          Concept
        </span>
      </div>
    </div>
  );
}

/* ── tiles ──────────────────────────────────────────────────────────────── */

function Tile({
  icon: Icon,
  label,
  value,
  foot,
  delay,
  tone = "signal",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
  foot?: React.ReactNode;
  delay: number;
  tone?: "signal" | "amber";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_EARLY}
      transition={{ delay: 0.25 + delay, duration: 0.7, ease: EASE_OUT_EXPO }}
      className="relative bg-[var(--color-surface)] p-5 sm:p-6"
    >
      <div className="flex items-center gap-2.5">
        <Icon
          className={cn(
            "size-3.5",
            tone === "amber" ? "text-[var(--color-amber)]" : "text-[var(--color-signal)]",
          )}
        />
        <span className="mono-label">{label}</span>
      </div>
      <p className="mt-4 text-3xl font-medium tracking-[-0.035em] text-[var(--color-paper)] tabular-nums sm:text-[2.125rem]">
        {value}
      </p>
      {foot && <div className="mt-4">{foot}</div>}
    </motion.div>
  );
}

function Meter({ value, tone = "signal" }: { value: number; tone?: "signal" | "online" }) {
  return (
    <span className="block h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
      <motion.span
        className={cn(
          "block h-full rounded-full",
          tone === "online"
            ? "bg-[var(--color-online)] shadow-[0_0_10px_rgba(16,185,129,0.7)]"
            : "bg-[var(--color-signal)] shadow-[0_0_10px_rgba(56,189,248,0.7)]",
        )}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
      />
    </span>
  );
}

function RoomStrip({ active }: { active: number }) {
  return (
    <span className="flex gap-1">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          animate={{
            backgroundColor:
              i < active ? "rgba(56,189,248,0.85)" : "rgba(255,255,255,0.08)",
          }}
          transition={{ duration: 0.6, delay: i * 0.04 }}
          className="h-1 flex-1 rounded-full"
        />
      ))}
    </span>
  );
}

/* ── panels ─────────────────────────────────────────────────────────────── */

function Panel({
  title,
  meta,
  children,
  className,
  delay,
}: {
  title: string;
  meta: string;
  children: React.ReactNode;
  className?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_EARLY}
      transition={{ delay: 0.25 + delay, duration: 0.7, ease: EASE_OUT_EXPO }}
      className={cn("bg-[var(--color-surface)] p-5 sm:p-6", className)}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="text-sm font-medium tracking-[-0.01em] text-[var(--color-mute)]">
          {title}
        </h4>
        <span className="mono-label text-[0.5625rem]">{meta}</span>
      </div>
      <div className="mt-5 h-28 sm:h-32">{children}</div>
    </motion.div>
  );
}

function FlowChart({ series }: { series: number[] }) {
  const w = 560;
  const h = 130;
  const max = 108;
  const pts = series.map((v, i) => [
    (i / (series.length - 1)) * w,
    h - (v / max) * h,
  ]);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-full w-full" aria-hidden focusable="false">
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" y1={h * f} x2={w} y2={h * f} stroke="rgba(255,255,255,0.05)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
      <motion.path
        d={`${line} L ${w} ${h} L 0 ${h} Z`}
        fill="url(#adk-area)"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="#7dd3fc"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={VIEWPORT_EARLY}
        transition={{ duration: 1.6, delay: 0.4, ease: EASE_OUT_EXPO }}
      />
      <circle
        cx={pts[pts.length - 1][0] - 2}
        cy={pts[pts.length - 1][1]}
        r="3"
        fill="#22d3ee"
        className="anim-blink"
      />
    </svg>
  );
}

function Utilization({ occupancy, orders }: { occupancy: number; orders: number }) {
  const rows = [
    { label: "Inpatient Wards", v: occupancy },
    { label: "Diagnostics", v: Math.round(52 + (orders % 40)) },
    { label: "Surgical", v: Math.round(occupancy * 0.82) },
    { label: "Outpatient", v: Math.round(44 + (orders % 26)) },
  ];
  return (
    <ul className="flex h-full flex-col justify-between gap-3">
      {rows.map((r) => (
        <li key={r.label} className="flex items-center gap-3">
          <span className="w-28 shrink-0 truncate text-[0.6875rem] text-[var(--color-dim)]">
            {r.label}
          </span>
          <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.span
              className="block h-full rounded-full bg-gradient-to-r from-[var(--color-signal)] to-[var(--color-indigo)]"
              animate={{ width: `${Math.min(100, r.v)}%` }}
              transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
            />
          </span>
          <span className="w-8 shrink-0 text-right font-mono text-[0.625rem] text-[var(--color-faint)] tabular-nums">
            {Math.min(100, r.v)}%
          </span>
        </li>
      ))}
    </ul>
  );
}

const SERVICES = [
  { name: "HIS Interface", tone: "online" as const, note: "Synced" },
  { name: "EMR Gateway", tone: "online" as const, note: "Synced" },
  { name: "Laboratory Bridge", tone: "online" as const, note: "Synced" },
  { name: "Pharmacy Adapter", tone: "signal" as const, note: "Processing" },
  { name: "Imaging / PACS", tone: "online" as const, note: "Synced" },
  { name: "Automation Engine", tone: "online" as const, note: "Active" },
];

function SystemStatus() {
  return (
    <ul className="grid h-full grid-cols-1 content-between gap-2 sm:grid-cols-2">
      {SERVICES.map((s, i) => (
        <li
          key={s.name}
          className="flex items-center justify-between gap-3 rounded-md border border-white/[0.05] bg-white/[0.015] px-2.5 py-1.5"
        >
          <span
            className="flex min-w-0 items-center gap-2"
            style={{ "--d": `${i * 0.3}s` } as React.CSSProperties}
          >
            <StatusDot tone={s.tone} className="[animation-delay:var(--d)]" />
            <span className="truncate text-[0.6875rem] text-[var(--color-mute)]">
              {s.name}
            </span>
          </span>
          <span className="mono-label shrink-0 text-[0.5rem]">{s.note}</span>
        </li>
      ))}
    </ul>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const w = 120;
  const h = 44;
  const min = Math.min(...values);
  const max = Math.max(...values) || 1;
  const d = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h;
      return `${i ? "L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-11 w-28 shrink-0" aria-hidden focusable="false">
      <path d={d} fill="none" stroke="rgba(139,92,246,0.85)" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
