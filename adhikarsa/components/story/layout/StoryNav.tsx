"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { MagneticButton } from "@/components/story/primitives/MagneticButton";
import { EASE } from "@/components/story/primitives/motion";
import { company } from "@/data/company";
import { story } from "@/data/story";
import { cn } from "@/lib/utils";

/**
 * Navigation, kept out of the way.
 *
 * Transparent over the opening, then a hairline and a blur once the reader has
 * left it — the page should feel like it starts with the headline, not with a
 * bar. The threshold flip is driven by `useMotionValueEvent` and only writes
 * state when the boolean actually changes, so scrolling does not re-render the
 * header sixty times a second.
 */
export function StoryNav() {
  const t = story.nav;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 24;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  const close = useCallback(() => setOpen(false), []);

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

  const mail = company.contactEmail ? `mailto:${company.contactEmail}` : "#contact";

  return (
    <>
      <a
        href="#story"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:rounded-full focus:bg-paper focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-void"
      >
        {t.skip}
      </a>

      <header className="fixed inset-x-0 top-0 z-[60]">
        <div
          className={cn(
            "transition-[background-color,backdrop-filter,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled
              ? "border-b border-hairline bg-void/70 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent",
          )}
        >
          <nav
            aria-label="Primary"
            className="field flex h-[4.5rem] items-center justify-between gap-6 sm:h-20"
          >
            <Link
              href="/"
              aria-label={company.legalName}
              className="shrink-0 text-paper transition-opacity duration-500 hover:opacity-75"
            >
              <Logo tone="dark" showDescriptor={false} />
            </Link>

            <ul className="hidden items-center gap-9 md:flex">
              {t.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group/nav relative text-[0.9375rem] text-paper-dim transition-colors duration-400 hover:text-paper"
                  >
                    {l.label}
                    <span
                      aria-hidden
                      className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-cobalt transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/nav:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <MagneticButton
                href={mail}
                arrow={false}
                className="hidden px-5 py-2.5 text-sm sm:inline-flex"
              >
                {t.cta}
              </MagneticButton>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="story-menu"
                aria-label={open ? t.close : t.open}
                className="flex size-10 items-center justify-center rounded-full border border-hairline-strong text-paper transition-colors duration-400 hover:border-paper md:hidden"
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
            id="story-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-50 bg-void md:hidden"
          >
            <div aria-hidden className="lattice falloff absolute inset-0 opacity-50" />
            <div className="field relative flex h-full flex-col pt-28 pb-12">
              <ul className="flex flex-col">
                {t.links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.06, duration: 0.6, ease: EASE }}
                    className="border-b border-hairline"
                  >
                    <a
                      href={l.href}
                      onClick={close}
                      className="block py-6 text-statement font-medium text-paper"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.6, ease: EASE }}
                className="mt-auto"
              >
                <MagneticButton href={mail} onClick={close} className="w-full justify-center">
                  {t.cta}
                </MagneticButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
