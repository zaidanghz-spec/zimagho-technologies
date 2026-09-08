import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { currentYear } from "@/data/company";
import { story } from "@/data/story";

/**
 * The footer, kept as quiet as the navigation.
 *
 * The social row is a stated absence rather than a row of dead icons: linking
 * placeholder profiles would be the smallest possible lie, and it is still a
 * lie. It becomes links the day accounts exist.
 */
export function StoryFooter() {
  const t = story.footer;

  return (
    <footer className="relative border-t border-hairline pt-20 pb-10 sm:pt-24">
      <div className="field">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="max-w-[16rem] text-paper">
              <Logo tone="dark" />
            </div>
            <p className="mt-6 max-w-xs leading-relaxed text-paper-dim">{t.tagline}</p>
            <p className="marker mt-8 text-paper-faint">{t.location}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
            {t.columns.map((col) => (
              <div key={col.heading}>
                <h2 className="marker text-paper-faint">{col.heading}</h2>
                <ul className="mt-6 space-y-3.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      {l.href.startsWith("#") ? (
                        <a
                          href={l.href}
                          className="text-[0.9375rem] text-paper-dim transition-colors duration-400 hover:text-paper"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link
                          href={l.href}
                          className="text-[0.9375rem] text-paper-dim transition-colors duration-400 hover:text-paper"
                        >
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="seam mt-16 sm:mt-20" />

        <div className="mt-8 flex flex-col gap-4 text-sm text-paper-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {t.legalName}
          </p>
          <p className="sm:order-last">{t.socialNote}</p>
          <ul className="flex gap-6">
            {t.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors duration-400 hover:text-paper">
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
