"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { company } from "@/data/company";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { NAV_ITEMS, SECTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const WATCHED = NAV_ITEMS.map((n) => n.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { scrollY } = useScroll();

  /* Flips React state only at the threshold crossing, not on every frame. */
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 20;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  /* Active-section tracking via IntersectionObserver — no scroll maths. */
  useEffect(() => {
    const targets = WATCHED.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  /* Lock the page behind the mobile sheet; close on Escape. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:rounded-full focus:bg-[var(--color-brand)] focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            "transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled
              ? "border-b border-[var(--color-rule)] bg-white/85 shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-xl"
              : "border-b border-transparent bg-transparent",
          )}
        >
          <nav
            aria-label="Primary"
            className="shell flex h-16 items-center justify-between gap-6 sm:h-20"
          >
            <Link
              href={`#${SECTIONS.hero}`}
              className="shrink-0 rounded-sm"
              aria-label={`${company.shortName} — home`}
            >
              <Logo />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {NAV_ITEMS.map((item) => {
                const id = item.href.slice(1);
                const isActive = active === id;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative block px-4 py-2 text-sm tracking-[-0.005em] transition-colors duration-300",
                        isActive
                          ? "text-[var(--color-ink)]"
                          : "text-[var(--color-slate)] hover:text-[var(--color-ink)]",
                      )}
                    >
                      {item.label}
                      {/* Shared-layout underline: it slides between items
                          rather than fading in and out. */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          transition={{ type: "spring", stiffness: 360, damping: 36 }}
                          className="absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-[var(--color-brand)]"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <Button
                href={`#${SECTIONS.contact}`}
                className="hidden px-5 py-2.5 text-sm sm:inline-flex"
                arrow
              >
                Talk to Us
              </Button>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                className="hairline flex size-10 items-center justify-center rounded-full bg-white text-[var(--color-ink)] transition-colors hover:border-[var(--color-rule-strong)] lg:hidden"
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
            className="fixed inset-0 z-40 bg-white lg:hidden"
          >
            <div className="shell flex h-full flex-col pt-28 pb-12">
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.5, ease: EASE_OUT_EXPO }}
                    className="border-b border-[var(--color-rule-soft)]"
                  >
                    <Link
                      href={item.href}
                      onClick={close}
                      className="flex items-center justify-between py-5 text-2xl font-medium tracking-[-0.02em] text-[var(--color-ink)]"
                    >
                      {item.label}
                      <ArrowRight aria-hidden className="size-4 text-[var(--color-faint)]" />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.5, ease: EASE_OUT_EXPO }}
                className="mt-auto"
              >
                <Button
                  href={`#${SECTIONS.contact}`}
                  onClick={close}
                  wrapperClassName="w-full"
                  className="w-full"
                  arrow
                >
                  Talk to Us
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
