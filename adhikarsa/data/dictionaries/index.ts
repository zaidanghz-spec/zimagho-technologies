import type { Locale } from "@/lib/i18n";
import { en, type Dictionary } from "./en";
import { id } from "./id";

const DICTIONARIES: Record<Locale, Dictionary> = { en, id };

/**
 * Both dictionaries are plain modules, imported statically.
 *
 * The usual `await import()` pattern exists to keep unused translations out of
 * the bundle, but these are two small objects and every page is prerendered
 * per locale — so a static import costs nothing at runtime and keeps every
 * page a synchronous server component.
 */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export type { Dictionary };
