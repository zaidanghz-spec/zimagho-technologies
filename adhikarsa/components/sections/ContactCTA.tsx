import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { company } from "@/data/company";
import type { Dictionary } from "@/data/dictionaries";
import type { Locale } from "@/lib/i18n";
import { routeFor } from "@/lib/constants";

/**
 * The one saturated band on the site, closing every page.
 *
 * Deep navy earns its place by being singular — every other section is light or
 * near-light in either theme, so this reads as an arrival rather than as
 * decoration. It stays dark in both themes on purpose: it is the constant the
 * rest of the palette moves around.
 */
export function ContactCTA({
  locale,
  dict,
  standalone = false,
}: {
  locale: Locale;
  dict: Dictionary;
  /** On the contact page itself the band is the content, not a footer CTA. */
  standalone?: boolean;
}) {
  const t = dict.contact;
  const mailto = company.contactEmail ? `mailto:${company.contactEmail}` : null;

  return (
    <section className="relative scroll-mt-24 overflow-hidden bg-navy">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="anim-grid-drift absolute -inset-24 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,rgba(16,70,214,0.32)_0%,rgba(10,37,64,0)_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[rgba(6,24,42,0.6)]" />
      </div>

      <div
        className={
          standalone
            ? "shell relative py-36 sm:py-44 lg:py-52"
            : "shell relative py-28 sm:py-32 lg:py-40"
        }
      >
        <div className="measure max-w-3xl">
          <Reveal preset="rise">
            <Logo tone="dark" showPt className="mb-14" />
          </Reveal>

          <Reveal preset="rise">
            <Eyebrow tone="onDark">{t.eyebrow}</Eyebrow>
          </Reveal>

          <AnimatedText
            as={standalone ? "h1" : "h2"}
            lines={t.lines}
            className="mt-7 text-headline font-medium text-white"
          />

          <Reveal preset="riseSoft" delay={0.12}>
            <p className="mt-7 max-w-xl text-lead text-white/70">{t.body}</p>
          </Reveal>

          <Reveal preset="rise" delay={0.22}>
            <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <Button
                href={mailto ?? routeFor(locale, "company")}
                variant="white"
                arrow
                wrapperClassName="w-full sm:w-auto"
                className="w-full sm:w-auto"
              >
                {dict.actions.startConversation}
              </Button>

              {/* No address is invented. Until one is supplied the CTA points at
                  the company profile and says so plainly. */}
              {!mailto && (
                <p className="text-[0.8125rem] text-white/55">{t.noAddressNote}</p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
