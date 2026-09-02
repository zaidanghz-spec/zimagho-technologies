import { company } from "@/data/company";
import { cn } from "@/lib/utils";

/**
 * Typographic wordmark. No graphical logo is invented — none exists as an
 * asset — so the mark is the letterforms themselves: wide tracking, a single
 * brand-blue terminal square, and the legal descriptor beneath.
 */
export function Wordmark({
  className,
  showDescriptor = true,
  tone = "light",
}: {
  className?: string;
  showDescriptor?: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span className="flex items-center gap-[0.4em]">
        <span
          className={cn(
            "text-[0.9375rem] font-semibold tracking-[0.18em] sm:text-base",
            tone === "dark" ? "text-white" : "text-[var(--color-ink)]",
          )}
        >
          {company.wordmark}
        </span>
        <span
          aria-hidden
          className="size-[5px] shrink-0 rounded-[1px] bg-[var(--color-brand)]"
        />
      </span>
      {showDescriptor && (
        <span
          className={cn(
            "mt-[0.5em] hidden text-[0.5625rem] leading-none font-medium tracking-[0.24em] sm:block",
            tone === "dark" ? "text-white/50" : "text-[var(--color-faint)]",
          )}
        >
          {company.descriptor}
        </span>
      )}
    </span>
  );
}
