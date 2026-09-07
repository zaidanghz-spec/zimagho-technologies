"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/data/dictionaries";
import { EASE_OUT_EXPO } from "@/lib/animations";
import type { Locale } from "@/lib/i18n";
import { NAV_PAGES, routeFor } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);
  /* The sheet is keyed to the path it was opened on. When the route changes,
     the stored path no longer matches and the sheet is closed by derivation —
     no effect, no cascading render. */
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const pathname = usePathname();
  const open = openedAt !== null && openedAt === pathname;
  const setOpen = useCallback(
    (next: boolean | ((v: boolean) => boolean)) => {
      setOpenedAt((prev) => {
        const isOpen = prev !== null && prev === pathname;
        const want = typeof next === "function" ? next(isOpen) : next;
        return want ? pathname : null;
      });
    },
    [pathname],
  );
  const { scrollY } = useScroll();

  /* Flips React state only at the threshold crossing, not on every frame. */
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 20;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  const close = useCallback(() => setOpen(false), [setOpen]);
  const homeHref = routeFor(locale, "home");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-on-brand"
      >
        {dict.nav.skipToContent}
      </a>

      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            "transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled
              ? "border-b border-rule bg-canvas/85 shadow-[var(--shadow-hair)] backdrop-blur-xl"
              : "border-b border-transparent bg-transparent",
          )}
        >
          <nav
            aria-label="Primary"
            className="shell flex h-16 items-center justify-between gap-4 sm:h-20"
          >
            <Link href={homeHref} className="shrink-0 rounded-sm" aria-label={dict.nav.homeAria}>
              <Logo />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {NAV_PAGES.map((page) => {
                const href = routeFor(locale, page);
                const isActive = pathname === href;
                return (
                  <li key={page}>
                    <Link
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "relative block px-4 py-2 text-sm tracking-[-0.005em] transition-colors duration-300",
                        isActive ? "text-ink" : "text-slate hover:text-ink",
                      )}
                    >
                      {dict.nav[page]}
                      {/* Shared-layout underline: it slides between items
                          rather than fading in and out. */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          transition={{ type: "spring", stiffness: 360, damping: 36 }}
                          className="absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-brand"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <LanguageToggle
                locale={locale}
                label={dict.language.label}
                className="hidden sm:flex"
              />
              <ThemeToggle
                labels={{ light: dict.theme.toLight, dark: dict.theme.toDark }}
                className="hidden sm:flex"
              />

              <Button
                href={routeFor(locale, "contact")}
                className="hidden px-5 py-2.5 text-sm xl:inline-flex"
                arrow
              >
                {dict.nav.primaryCta}
              </Button>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
                className="hairline flex size-10 items-center justify-center rounded-full bg-surface text-ink transition-colors hover:border-rule-strong lg:hidden"
              >
                {open ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-canvas lg:hidden"
          >
            <div className="shell flex h-full flex-col pt-28 pb-12">
              <ul className="flex flex-col">
                {NAV_PAGES.map((page, i) => (
                  <motion.li
                    key={page}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.5, ease: EASE_OUT_EXPO }}
                    className="border-b border-rule-soft"
                  >
                    <Link
                      href={routeFor(locale, page)}
                      onClick={close}
                      className="flex items-center justify-between py-5 text-2xl font-medium tracking-[-0.02em] text-ink"
                    >
                      {dict.nav[page]}
                      <ArrowRight aria-hidden className="size-4 text-faint" />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.5, ease: EASE_OUT_EXPO }}
                className="mt-auto flex flex-col gap-5"
              >
                <div className="flex items-center gap-2 sm:hidden">
                  <LanguageToggle locale={locale} label={dict.language.label} />
                  <ThemeToggle
                    labels={{ light: dict.theme.toLight, dark: dict.theme.toDark }}
                  />
                </div>
                <Button
                  href={routeFor(locale, "contact")}
                  onClick={close}
                  wrapperClassName="w-full"
                  className="w-full"
                  arrow
                >
                  {dict.nav.primaryCta}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
