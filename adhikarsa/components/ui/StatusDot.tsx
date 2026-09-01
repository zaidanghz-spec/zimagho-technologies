import { cn } from "@/lib/utils";

const TONES = {
  online: "bg-[var(--color-online)] shadow-[0_0_8px_rgba(16,185,129,0.9)]",
  signal: "bg-[var(--color-signal)] shadow-[0_0_8px_rgba(56,189,248,0.9)]",
  amber: "bg-[var(--color-amber)] shadow-[0_0_8px_rgba(245,158,11,0.9)]",
  idle: "bg-[var(--color-faint)]",
} as const;

/** Blinking system indicator. Decorative — always paired with a text label. */
export function StatusDot({
  tone = "online",
  blink = true,
  className,
}: {
  tone?: keyof typeof TONES;
  blink?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-1.5 shrink-0 rounded-full",
        TONES[tone],
        blink && "anim-blink",
        className,
      )}
    />
  );
}
