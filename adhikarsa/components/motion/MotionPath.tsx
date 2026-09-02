"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Props = {
  d: string;
  stroke?: string;
  width?: number;
  /** Pulse length as a fraction of the path. */
  dashRatio?: number;
  duration?: number;
  delay?: number;
  className?: string;
  opacity?: number;
};

/**
 * A data packet travelling along an arbitrary SVG path.
 *
 * The path measures itself once with `getTotalLength()` and publishes the dash
 * endpoints as custom properties. A single shared `@keyframes adk-flow` reads
 * those properties, so every diagram on the site animates from one keyframe
 * rule regardless of path length — and the global reduced-motion block
 * disables all of them at once.
 */
export function MotionPath({
  d,
  stroke = "url(#adk-pulse)",
  width = 1.5,
  dashRatio = 0.16,
  duration = 5,
  delay = 0,
  className,
  opacity = 1,
}: Props) {
  const ref = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    /* Measured post-layout, in SVG user units — resolution independent. */
    setLen(el.getTotalLength());
  }, [d]);

  const dash = Math.max(16, len * dashRatio);

  const style: CSSProperties | undefined = len
    ? ({
        "--flow-start": `${dash}px`,
        "--flow-end": `${-len}px`,
        animation: `adk-flow ${duration}s linear ${delay}s infinite`,
        willChange: "stroke-dashoffset",
      } as CSSProperties)
    : undefined;

  return (
    <path
      ref={ref}
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      opacity={len ? opacity : 0}
      strokeDasharray={len ? `${dash} ${len}` : undefined}
      style={style}
      className={className}
    />
  );
}
