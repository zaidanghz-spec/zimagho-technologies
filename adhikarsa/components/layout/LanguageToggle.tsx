"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_LABEL, LOCALE_SHORT, switchLocalePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Language switch, as a two-state segmented control.
 *
 * Real `<Link>`s, not a `<select>` or a router push: each language is a
 * genuine URL, so the control is crawlable, middle-clickable and works without
 * JavaScript. The click handler only records the preference so `/` can honour
 * it next time — navigation happens through the href either way.
 */
export function LanguageToggle({
  locale,
  className,
  label,
}: {
  locale: Locale;
  className?: string;
  label: string;
}) {
  const pathname = usePathname() || `/${locale}`;

  const remember = (next: Locale) => {
    try {
      window.localStorage.setItem("adk-locale", next);
    } catch {
      /* Storage blocked — the URL still carries the language. */
    }
  };

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "hairline flex h-10 items-center gap-0.5 rounded-full bg-surface p-1",
        className,
      )}
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={switchLocalePath(pathname, code)}
            hrefLang={code}
            aria-current={active ? "true" : undefined}
            aria-label={LOCALE_LABEL[code]}
            title={LOCALE_LABEL[code]}
            onClick={() => remember(code)}
            className={cn(
              "flex h-8 min-w-9 items-center justify-center rounded-full px-2.5",
              "font-mono text-[0.6875rem] tracking-[0.08em] transition-colors duration-300",
              active
                ? "bg-brand text-on-brand"
                : "text-muted hover:text-ink",
            )}
          >
            {LOCALE_SHORT[code]}
          </Link>
        );
      })}
    </div>
  );
}
