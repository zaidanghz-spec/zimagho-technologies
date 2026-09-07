"use client";

import { useEffect } from "react";
import { LOCALE_TAG, type Locale } from "@/lib/i18n";

/**
 * Backstop for `<html lang>`.
 *
 * `ThemeScript` already sets it from the path before the first paint, which is
 * what actually matters — screen readers pick their pronunciation from `lang`,
 * and Indonesian read aloud with an English voice is close to unusable. This
 * covers the case where that inline script never runs (a strict CSP, an
 * extension) but React still hydrates, and it keeps the attribute correct
 * across client-side navigations between the two languages.
 */
export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    const tag = LOCALE_TAG[locale];
    if (document.documentElement.lang !== tag) document.documentElement.lang = tag;
  }, [locale]);

  return null;
}
