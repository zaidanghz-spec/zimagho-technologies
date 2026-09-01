import Link from "next/link";
import { Wordmark } from "@/components/layout/Wordmark";
import { StatusDot } from "@/components/ui/StatusDot";
import { company, currentYear } from "@/data/company";
import { FOOTER_NAV, LEGAL_NAV } from "@/lib/constants";

export function Footer() {
  const email = company.contact.email;

  return (
    <footer className="relative border-t border-white/[0.07]">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Identity */}
          <div className="lg:col-span-4">
            <Wordmark />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-[var(--color-dim)]">
              {company.legalName}
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              {company.disciplines.map((d) => (
                <li key={d} className="mono-label text-[0.5625rem]">
                  {d}
                </li>
              ))}
            </ul>
            <p className="mono-label mt-8 flex items-center gap-2">
              <StatusDot tone="online" />
              {company.contact.locale}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="lg:col-span-6 lg:col-start-6">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {FOOTER_NAV.map((group) => (
                <div key={group.heading}>
                  <h2 className="mono-label">{group.heading}</h2>
                  <ul className="mt-4 flex flex-col gap-3">
                    {group.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="rounded-sm text-[0.8125rem] text-[var(--color-dim)] transition-colors hover:text-[var(--color-paper)]"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <h2 className="mono-label">Contact</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  <li>
                    <a
                      href={`mailto:${email.value}`}
                      className="rounded-sm font-mono text-[0.6875rem] [overflow-wrap:anywhere] text-[var(--color-dim)] transition-colors hover:text-[var(--color-signal)]"
                    >
                      {email.value}
                    </a>
                  </li>
                  {email.placeholder && (
                    <li className="mono-label text-[0.5rem] text-[var(--color-amber)]/70">
                      Placeholder
                    </li>
                  )}
                  <li>
                    <Link
                      href="#contact"
                      className="rounded-sm text-[0.8125rem] text-[var(--color-dim)] transition-colors hover:text-[var(--color-paper)]"
                    >
                      Discuss a Project
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <p className="mt-16 max-w-xl text-[1.0625rem] leading-snug font-medium tracking-[-0.02em] text-[var(--color-mute)] lg:mt-20">
          {company.tagline}
        </p>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/[0.07] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--color-faint)]">
            © {currentYear} {company.legalName}. All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            {LEGAL_NAV.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-sm text-xs text-[var(--color-faint)] transition-colors hover:text-[var(--color-mute)]"
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
