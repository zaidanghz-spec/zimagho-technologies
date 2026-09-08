import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * `cn` — conditional class names with conflict-aware Tailwind merging.
 *
 * The design system adds its own font sizes in `@theme` (`text-display`,
 * `text-headline`, `text-title`, `text-lead`). Out of the box tailwind-merge
 * has never heard of them, guesses they are text *colours*, and therefore
 * drops the size whenever a size and a colour meet in one `cn()` call — which
 * silently renders a 52px headline at 16px.
 *
 * Registering them in the `font-size` group is the fix: the merge logic now
 * knows a size and a colour are different properties and keeps both.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display", "headline", "title", "lead"] },
        /* The narrative site's scale. Same trap, same fix. */
        { text: ["mega", "chapter", "statement", "say"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Clamp a number into [min, max]. */
export const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

/** Linear interpolation. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
