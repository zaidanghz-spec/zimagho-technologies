"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "quiet";

const BASE =
  "group relative inline-flex items-center justify-center gap-2 rounded-full " +
  "text-[0.9375rem] font-medium tracking-[-0.01em] whitespace-nowrap " +
  "transition-[color,background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-signal)]";

const VARIANTS: Record<Variant, string> = {
  /* Highest contrast on the page. Reserved for the single primary action. */
  primary:
    "bg-[var(--color-paper)] text-[var(--color-void)] px-6 py-3.5 " +
    "shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset,0_12px_30px_-12px_rgba(56,189,248,0.45)] " +
    "hover:shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset,0_16px_44px_-10px_rgba(56,189,248,0.7)]",
  /* Instrument-panel secondary: hairline, glass, cyan on approach. */
  ghost:
    "px-6 py-3.5 text-[var(--color-mute)] hairline bg-white/[0.02] " +
    "hover:text-[var(--color-paper)] hover:border-[rgba(56,189,248,0.42)] hover:bg-[rgba(56,189,248,0.06)]",
  quiet:
    "px-1 py-1 text-[var(--color-dim)] hover:text-[var(--color-paper)]",
};

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  icon?: boolean;
  magnetic?: boolean;
} & Omit<ComponentProps<"button">, "ref">;

export function Button({
  children,
  href,
  variant = "primary",
  className,
  icon = false,
  magnetic = true,
  ...rest
}: Props) {
  const content = (
    <>
      {/* Light sweep — masked to the pill, only rendered on hover paths. */}
      {variant !== "quiet" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        >
          <span
            className={cn(
              "absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              "group-hover:translate-x-[400%]",
              variant === "primary"
                ? "bg-gradient-to-r from-transparent via-black/[0.07] to-transparent"
                : "bg-gradient-to-r from-transparent via-white/[0.08] to-transparent",
            )}
          />
        </span>
      )}
      <span className="relative">{children}</span>
      {icon && (
        <ArrowUpRight
          aria-hidden
          className="relative size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  const classes = cn(BASE, VARIANTS[variant], className);

  const el = href ? (
    <Link
      {...(rest as Omit<ComponentProps<typeof Link>, "href" | "className">)}
      href={href}
      className={classes}
    >
      {content}
    </Link>
  ) : (
    <button className={classes} {...rest}>
      {content}
    </button>
  );

  return magnetic ? <Magnetic strength={5}>{el}</Magnetic> : el;
}
