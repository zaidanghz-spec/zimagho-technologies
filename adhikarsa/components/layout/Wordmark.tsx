import { company } from "@/data/company";
import { cn } from "@/lib/utils";

/**
 * Typographic wordmark. No graphical logo is invented — none exists as an
 * asset, so the mark is the letterforms themselves: tight tracking, a single
 * signal-coloured terminal dot, and the legal descriptor beneath.
 */
export function Wordmark({
  className,
  showDescriptor = true,
}: {
  className?: string;
  showDescriptor?: boolean;
}) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span className="flex items-baseline gap-[0.14em]">
        <span className="text-[0.9375rem] font-semibold tracking-[0.2em] text-[var(--color-paper)] sm:text-base">
          {company.wordmark}
        </span>
        <span
          aria-hidden
          className="size-1 shrink-0 self-center rounded-full bg-[var(--color-signal)] shadow-[0_0_8px_rgba(56,189,248,0.9)]"
        />
      </span>
      {showDescriptor && (
        <span className="mt-[0.42em] hidden text-[0.5625rem] leading-none font-medium tracking-[0.26em] text-[var(--color-faint)] sm:block">
          {company.descriptor}
        </span>
      )}
    </span>
  );
}
