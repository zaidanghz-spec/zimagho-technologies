"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "white" | "quiet";

const BASE =
  "group relative inline-flex items-center justify-center gap-2 rounded-full " +
  "text-[0.9375rem] font-medium tracking-[-0.005em] whitespace-nowrap " +
  "transition-[color,background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-3";

const VARIANTS: Record<Variant, string> = {
  /* The single strongest action on any given screen. */
  primary:
    "bg-[var(--color-brand)] px-6 py-3.5 text-white shadow-[var(--shadow-float)] " +
    "hover:bg-[var(--color-brand-alt)] focus-visible:outline-[var(--color-brand)]",
  /* Secondary: hairline on white, blue on approach. */
  outline:
    "hairline bg-white px-6 py-3.5 text-[var(--color-ink)] shadow-[var(--shadow-hair)] " +
    "hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] " +
    "focus-visible:outline-[var(--color-brand)]",
  /* For the deep-blue band, where white is the contrast. */
  white:
    "bg-white px-6 py-3.5 text-[var(--color-navy)] shadow-[0_12px_30px_-14px_rgba(2,20,50,0.7)] " +
    "hover:bg-[var(--color-sky-tint)] focus-visible:outline-white",
  quiet:
    "px-1 py-1 text-[var(--color-slate)] hover:text-[var(--color-brand)] " +
    "focus-visible:outline-[var(--color-brand)]",
};

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  /** Trailing arrow that steps forward on hover. */
  arrow?: boolean;
  magnetic?: boolean;
  /** Applied to the magnetic wrapper — use it to let a CTA stretch. */
  wrapperClassName?: string;
} & Omit<ComponentProps<"button">, "ref">;

export function Button({
  children,
  href,
  variant = "primary",
  className,
  arrow = false,
  magnetic = true,
  wrapperClassName,
  ...rest
}: Props) {
  const content = (
    <>
      <span className="relative">{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          className="relative size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
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

  return magnetic ? (
    <Magnetic strength={4} className={wrapperClassName}>
      {el}
    </Magnetic>
  ) : (
    el
  );
}
