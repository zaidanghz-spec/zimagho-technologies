import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Consistent section rhythm + optional top hairline. Every major band on the
 * page uses this so vertical spacing is decided once, not per-section.
 */
export function Section({
  id,
  children,
  className,
  rule = true,
  size = "base",
  label,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  rule?: boolean;
  size?: "base" | "tight" | "tall";
  /** Accessible name for the landmark, when the visible heading is graphical. */
  label?: string;
}) {
  const pad =
    size === "tight"
      ? "py-20 sm:py-24 lg:py-28"
      : size === "tall"
        ? "py-28 sm:py-36 lg:py-48"
        : "py-24 sm:py-32 lg:py-40";

  return (
    <section
      id={id}
      aria-label={label}
      className={cn("relative scroll-mt-24", pad, className)}
    >
      {rule && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
        />
      )}
      {children}
    </section>
  );
}
