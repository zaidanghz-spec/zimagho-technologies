"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Wordmark } from "@/components/layout/Wordmark";
import { company } from "@/data/company";
import { Button } from "@/components/ui/Button";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { NAV_ITEMS, SECTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const WATCHED = NAV_ITEMS.map((n) => n.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { scrollY } = useScroll();

  /* Only flips React state at the threshold crossing, not on every frame. */
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 24;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  /* Active-section tracking via IntersectionObserver — no scroll math. */
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

  /* Lock the page behind the mobile sheet, and close it on Escape. */
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:rounded-full focus:bg-[var(--color-paper)] focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-[var(--color-void)]"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.7, ease: EASE_OUT_EXPO }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "transition-[background-color,backdrop-filter,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled
              ? "glass border-b border-white/[0.07]"
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
              <Wordmark />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {NAV_ITEMS.map((item) => {
                const id = item.href.slice(1);
                const isActive = active === id;
                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative block rounded-full px-4 py-2 text-sm tracking-[-0.005em] transition-colors duration-300",
                        isActive
                          ? "text-[var(--color-paper)]"
                          : "text-[var(--color-dim)] hover:text-[var(--color-paper)]",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                          className="absolute inset-0 -z-10 rounded-full bg-white/[0.055] ring-1 ring-white/[0.07] ring-inset"
                        />
                      )}
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-4 -bottom-px h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-[var(--color-signal)] to-transparent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          isActive && "scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <Button
                href={`#${SECTIONS.contact}`}
                variant="ghost"
                className="hidden px-5 py-2.5 text-sm sm:inline-flex"
                icon
              >
                Discuss a Project
              </Button>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                className="hairline flex size-10 items-center justify-center rounded-full bg-white/[0.02] text-[var(--color-mute)] transition-colors hover:text-[var(--color-paper)] lg:hidden"
              >
                {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[rgba(5,7,10,0.965)] backdrop-blur-xl lg:hidden"
          >
            <div className="shell flex h-full flex-col pt-28 pb-12">
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.06 + i * 0.055, duration: 0.5, ease: EASE_OUT_EXPO }}
                    className="border-b border-white/[0.06]"
                  >
                    <Link
                      href={item.href}
                      onClick={close}
                      className="flex items-baseline justify-between py-5 text-2xl font-medium tracking-[-0.02em] text-[var(--color-paper)]"
                    >
                      {item.label}
                      <span className="mono-label">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.5, ease: EASE_OUT_EXPO }}
                className="mt-auto"
              >
                <Button
                  href={`#${SECTIONS.contact}`}
                  onClick={close}
                  className="w-full"
                  icon
                >
                  Discuss a Project
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
