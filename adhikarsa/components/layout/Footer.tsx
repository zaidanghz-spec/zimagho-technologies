import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { company, currentYear } from "@/data/company";
import type { Dictionary } from "@/data/dictionaries";
import type { Locale } from "@/lib/i18n";
import { NAV_PAGES, legalRoute, routeFor } from "@/lib/constants";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="border-t border-rule bg-mist">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo showPt />
            <p className="mt-6 text-sm text-slate">{company.legalName}</p>
            <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-muted">
              {dict.footer.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-2 gap-8 sm:gap-12">
              <div>
                <h2 className="eyebrow">{dict.footer.navHeading}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {NAV_PAGES.map((page) => (
                    <li key={page}>
                      <Link
                        href={routeFor(locale, page)}
                        className="rounded-sm text-[0.9375rem] text-slate transition-colors hover:text-brand"
                      >
                        {dict.nav[page]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="eyebrow">{dict.footer.capabilitiesHeading}</h2>
                {/* Descriptive, not navigational: these are what the company
                    does, and inventing links for them would be noise. */}
                <ul className="mt-5 flex flex-col gap-3">
                  {dict.footer.capabilities.map((item) => (
                    <li key={item} className="text-[0.9375rem] text-slate">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-rule pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-20">
          <p className="text-xs text-muted">
            © {currentYear} {company.legalName}. {dict.footer.rights}
          </p>
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href={legalRoute(locale, "privacy")}
                className="rounded-sm text-xs text-muted transition-colors hover:text-ink"
              >
                {dict.footer.privacy}
              </Link>
            </li>
            <li>
              <Link
                href={legalRoute(locale, "terms")}
                className="rounded-sm text-xs text-muted transition-colors hover:text-ink"
              >
                {dict.footer.terms}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
