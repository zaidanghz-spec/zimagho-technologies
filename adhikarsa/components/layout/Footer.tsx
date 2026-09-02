import Link from "next/link";
import { Wordmark } from "@/components/layout/Wordmark";
import { company, currentYear } from "@/data/company";
import { FOOTER_NAV, LEGAL_NAV } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-rule)] bg-[var(--color-mist)]">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Wordmark />
            <p className="mt-6 text-sm text-[var(--color-slate)]">{company.legalName}</p>
            <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-[var(--color-muted)]">
              {company.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-2 gap-8 sm:gap-12">
              {FOOTER_NAV.map((group) => (
                <div key={group.heading}>
                  <h2 className="eyebrow">{group.heading}</h2>
                  <ul className="mt-5 flex flex-col gap-3">
                    {group.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="rounded-sm text-[0.9375rem] text-[var(--color-slate)] transition-colors hover:text-[var(--color-brand)]"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[var(--color-rule)] pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-20">
          <p className="text-xs text-[var(--color-muted)]">
            © {currentYear} {company.legalName}. All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            {LEGAL_NAV.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-sm text-xs text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
