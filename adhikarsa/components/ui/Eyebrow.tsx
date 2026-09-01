import { cn } from "@/lib/utils";

/**
 * Section eyebrow. The leading rule + dot reads as a technical marker rather
 * than a marketing kicker — it is the site's smallest recurring signature.
 */
export function Eyebrow({
  children,
  className,
  tone = "signal",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "signal" | "neutral" | "online";
}) {
  const dot =
    tone === "online"
      ? "bg-[var(--color-online)] shadow-[0_0_10px_rgba(16,185,129,0.8)]"
      : tone === "neutral"
        ? "bg-[var(--color-faint)]"
        : "bg-[var(--color-signal)] shadow-[0_0_10px_rgba(56,189,248,0.85)]";

  return (
    <p className={cn("mono-label flex items-center gap-2.5", className)}>
      <span aria-hidden className="h-px w-6 bg-gradient-to-r from-transparent to-white/25" />
      <span aria-hidden className={cn("size-1 rounded-full", dot)} />
      <span className="text-[var(--color-dim)]">{children}</span>
    </p>
  );
}
