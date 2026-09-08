"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The narrative's one interactive control.
 *
 * The pull is written to motion values, not React state, so tracking the
 * pointer across the button costs zero renders. It is disabled outright under
 * reduced motion and on coarse pointers, where there is no hover to respond to
 * and the offset would only make the tap target move away from the thumb.
 */
export function MagneticButton({
  href,
  children,
  variant = "solid",
  arrow = true,
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 });

  const track = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 10);
  };

  const release = () => {
    x.set(0);
    y.set(0);
  };

  const internal = href.startsWith("#") || href.startsWith("/");
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/mag:translate-x-1"
        />
      )}
    </>
  );

  const classes = cn(
    "group/mag relative inline-flex items-center gap-2.5 rounded-full px-7 py-4",
    "text-[0.9375rem] font-medium tracking-[-0.01em]",
    "transition-[background-color,border-color,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt-lift",
    variant === "solid"
      ? "bg-paper text-void hover:bg-cobalt hover:text-paper"
      : "border border-hairline-strong text-paper hover:border-paper hover:bg-paper/5",
    className,
  );

  return (
    <motion.span style={{ x: sx, y: sy }} className="inline-flex">
      {internal ? (
        <Link
          href={href}
          onClick={onClick}
          onPointerMove={track}
          onPointerLeave={release}
          className={classes}
        >
          {inner}
        </Link>
      ) : (
        <a
          href={href}
          onClick={onClick}
          onPointerMove={track}
          onPointerLeave={release}
          className={classes}
        >
          {inner}
        </a>
      )}
    </motion.span>
  );
}
