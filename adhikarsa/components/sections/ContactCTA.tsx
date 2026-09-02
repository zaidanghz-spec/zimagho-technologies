import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { company } from "@/data/company";
import { SECTIONS } from "@/lib/constants";

/**
 * The one saturated band on the site.
 *
 * Deep navy earns its place by being singular — every other section is white
 * or near-white, so this reads as an arrival rather than as decoration. The
 * grid behind it drifts by exactly one cell and loops, which is enough motion
 * to feel alive and little enough to never pull focus from the headline.
 */
export function ContactCTA() {
  const mailto = company.contactEmail ? `mailto:${company.contactEmail}` : null;

  return (
    <section
      id={SECTIONS.contact}
      className="relative scroll-mt-24 overflow-hidden bg-[var(--color-navy)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="anim-grid-drift absolute -inset-24 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,rgba(11,92,255,0.32)_0%,rgba(10,37,64,0)_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[rgba(6,24,42,0.6)]" />
      </div>

      <div className="shell relative py-28 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <Reveal preset="rise">
            <Eyebrow tone="onDark">Contact</Eyebrow>
          </Reveal>

          <AnimatedText
            lines={["Let's build intelligent", "systems together."]}
            className="mt-7 text-headline font-medium text-white"
          />

          <Reveal preset="riseSoft" delay={0.12}>
            <p className="mt-7 max-w-xl text-lead text-white/70">
              Partner with Adhikarsa to explore automation, AI, systems
              integration, and custom technology development for your
              organization.
            </p>
          </Reveal>

          <Reveal preset="rise" delay={0.22}>
            <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <Button
                href={mailto ?? `#${SECTIONS.profile}`}
                variant="white"
                arrow
                wrapperClassName="w-full sm:w-auto"
                className="w-full sm:w-auto"
              >
                Start a Conversation
              </Button>

              {/* No address is invented. Until one is supplied the CTA points at
                  the company profile and says so plainly. */}
              {!mailto && (
                <p className="text-[0.8125rem] text-white/55">
                  Contact details are listed in the company profile above.
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
