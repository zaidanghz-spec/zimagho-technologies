import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Light / dark switch — presentation only.
 *
 * There is no `onClick` and no state here, and that is the point. The class on
 * `<html>` is the whole mechanism, `ThemeScript` owns setting it (see the note
 * there), and both faces of this control are drawn from that class in CSS. So
 * the button can never disagree with the page, it works before hydration, and
 * it stays a server component.
 *
 * Deliberately no `next-themes`: the whole mechanism is one class, one
 * localStorage key, and the pre-paint script. A dependency would add weight
 * without adding behaviour.
 */
export function ThemeToggle({
  className,
  labels,
}: {
  className?: string;
  labels: { light: string; dark: string };
}) {
  return (
    <button
      type="button"
      data-theme-toggle
      /* Read back by the script when it relabels the button after a click. */
      data-to-light={labels.light}
      data-to-dark={labels.dark}
      aria-label={labels.dark}
      title={labels.dark}
      className={cn(
        "hairline relative flex size-10 shrink-0 items-center justify-center rounded-full",
        "bg-surface text-ink transition-colors duration-300 hover:border-rule-strong",
        className,
      )}
    >
      {/* Both icons stay mounted and cross-fade, so the swap has no layout step
          and nothing pops when the theme changes. */}
      <Sun
        aria-hidden
        className={cn(
          "absolute size-[18px] transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "scale-75 opacity-0 dark:scale-100 dark:opacity-100",
        )}
      />
      <Moon
        aria-hidden
        className={cn(
          "absolute size-[18px] transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "scale-100 opacity-100 dark:scale-75 dark:opacity-0",
        )}
      />
    </button>
  );
}
