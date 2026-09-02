import { cn } from "@/lib/utils";

/**
 * Section eyebrow. A short blue rule ahead of the label — the site's smallest
 * recurring signature, and the only place uppercase is used.
 */
export function Eyebrow({
  children,
  className,
  tone = "brand",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "brand" | "neutral" | "onDark";
}) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3",
        tone === "onDark" && "text-white/60",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-px w-7",
          tone === "brand" && "bg-[var(--color-brand)]",
          tone === "neutral" && "bg-[var(--color-rule-strong)]",
          tone === "onDark" && "bg-white/40",
        )}
      />
      {children}
    </p>
  );
}
