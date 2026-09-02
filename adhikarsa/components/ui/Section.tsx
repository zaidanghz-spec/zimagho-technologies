import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const TONES = {
  white: "bg-white",
  mist: "bg-[var(--color-mist)]",
  fog: "bg-[var(--color-fog)]",
  tint: "bg-[linear-gradient(180deg,var(--color-canvas)_0%,var(--color-sky-tint)_55%,var(--color-canvas)_100%)]",
  navy: "bg-[var(--color-navy)]",
} as const;

/**
 * Consistent vertical rhythm and background tone. Every band on the page uses
 * this, so spacing is decided once rather than per-section.
 */
export function Section({
  id,
  children,
  className,
  tone = "white",
  size = "base",
  rule = false,
  label,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: keyof typeof TONES;
  size?: "tight" | "base" | "tall";
  /** Hairline across the top. Use between two bands of the same tone. */
  rule?: boolean;
  label?: string;
}) {
  const pad =
    size === "tight"
      ? "py-20 sm:py-24 lg:py-28"
      : size === "tall"
        ? "py-28 sm:py-36 lg:py-44"
        : "py-24 sm:py-28 lg:py-36";

  return (
    <section
      id={id}
      aria-label={label}
      className={cn("relative scroll-mt-24", TONES[tone], pad, className)}
    >
      {rule && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--color-rule)]"
        />
      )}
      {children}
    </section>
  );
}
