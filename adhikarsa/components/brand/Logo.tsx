import { company } from "@/data/company";
import { cn } from "@/lib/utils";

/**
 * ============================================================================
 * ADHIKARSA — BRAND MARK
 * ----------------------------------------------------------------------------
 * Redrawn as vector geometry from the supplied brand sheet rather than
 * embedded as an image, so it stays razor-sharp at 16px and at billboard size,
 * costs a few hundred bytes, and inherits `currentColor` — which is what lets
 * one component serve the light lockup, the dark lockup and the app icon
 * without shipping three assets.
 *
 * The construction is a square rotated 45°, cut by a horizontal gap set above
 * the centre. That single cut produces both halves:
 *
 *   · the upper triangle — direction, progress, intent
 *   · the lower mass     — the wider, heavier foundation beneath it
 *
 * Geometry is derived from the sheet's proportions: the cut sits at 24.5% of
 * the half-height above centre, and the gap is 6.8% of the mark's height. At
 * any horizontal cut the half-width equals the distance from the apex, which
 * is what makes both edge angles a true 45°.
 * ============================================================================
 */

const MARK = {
  /** Apex → cut. Half-width at y equals (y − apex), hence 45° flanks. */
  top: "M48 0 L81 33 L15 33 Z",
  /** Cut → shoulders → point. Widens before it tapers, as drawn. */
  bottom: "M8.5 39.5 L87.5 39.5 L96 48 L48 96 L0 48 Z",
} as const;

export function LogoMark({
  className,
  title,
}: {
  className?: string;
  /** Provide only where the mark stands alone as the accessible name. */
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 96 96"
      className={cn("block", className)}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path d={MARK.top} />
      <path d={MARK.bottom} />
    </svg>
  );
}

type Tone = "light" | "dark";

/**
 * Horizontal lockup — mark, hairline rule, wordmark — as specified on the
 * brand sheet. The descriptor is tracked out to sit flush with the wordmark
 * above it, which is the detail that makes the lockup read as designed rather
 * than as two stacked strings.
 */
export function Logo({
  className,
  tone = "light",
  showPt = false,
  showDescriptor = true,
  markClassName,
}: {
  className?: string;
  tone?: Tone;
  /** The sheet provides lockups with and without the legal prefix. */
  showPt?: boolean;
  showDescriptor?: boolean;
  markClassName?: string;
}) {
  const dark = tone === "dark";

  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark
        className={cn(
          "h-7 w-7 shrink-0 sm:h-8 sm:w-8",
          dark ? "text-white" : "text-[var(--color-ink)]",
          markClassName,
        )}
      />

      <span
        aria-hidden
        className={cn("h-8 w-px shrink-0", dark ? "bg-white/30" : "bg-[#94a3b8]")}
      />

      <span className="flex flex-col justify-center leading-none">
        {showPt && (
          <span
            className={cn(
              "mb-[0.35em] text-[0.5rem] leading-none font-medium tracking-[0.22em]",
              dark ? "text-white/50" : "text-[var(--color-muted)]",
            )}
          >
            PT
          </span>
        )}
        <span
          className={cn(
            "text-[0.9375rem] leading-none font-semibold tracking-[0.2em] sm:text-base",
            dark ? "text-white" : "text-[var(--color-ink)]",
          )}
        >
          {company.wordmark}
        </span>
        {showDescriptor && (
          <span
            className={cn(
              "mt-[0.52em] hidden text-[0.5rem] leading-none font-medium tracking-[0.325em] sm:block",
              dark ? "text-white/55" : "text-[var(--color-muted)]",
            )}
          >
            {company.descriptor}
          </span>
        )}
      </span>
    </span>
  );
}

/**
 * Stacked lockup — mark above the wordmark, centred. Used where the identity
 * is the content rather than a navigational anchor.
 */
export function LogoStacked({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: Tone;
}) {
  const dark = tone === "dark";

  return (
    <span className={cn("flex flex-col items-center", className)}>
      <LogoMark
        className={cn("h-12 w-12", dark ? "text-white" : "text-[var(--color-ink)]")}
      />
      <span
        className={cn(
          "mt-6 text-sm leading-none font-semibold tracking-[0.24em]",
          dark ? "text-white" : "text-[var(--color-ink)]",
        )}
      >
        {company.wordmark}
      </span>
      <span
        className={cn(
          "mt-[0.7em] text-[0.5625rem] leading-none font-medium tracking-[0.3em]",
          dark ? "text-white/55" : "text-[var(--color-muted)]",
        )}
      >
        {company.descriptor}
      </span>
    </span>
  );
}
