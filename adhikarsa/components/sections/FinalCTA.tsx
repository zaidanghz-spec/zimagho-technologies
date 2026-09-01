import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TrustShelf } from "@/components/ui/TrustShelf";
import { company } from "@/data/company";
import { SECTIONS } from "@/lib/constants";

export function FinalCTA() {
  const email = company.contact.email;

  return (
    <section
      id={SECTIONS.contact}
      className="relative scroll-mt-24 overflow-hidden py-32 sm:py-40 lg:py-52"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
      />
      {/* Horizon glow — the page resolves upward into light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(80%_100%_at_50%_120%,rgba(56,189,248,0.2),transparent_70%)]"
      />
      <div
        aria-hidden
        className="tech-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_100%,#000,transparent)]"
      />

      <div className="shell relative">
        <div className="flex flex-col items-center text-center">
          <Reveal preset="fadeUp">
            <Eyebrow tone="online">Start Here</Eyebrow>
          </Reveal>

          <RevealText
            as="h2"
            gap={0.1}
            delay={0.08}
            lines={["Let's build", "the hospital", "of the future."]}
            className="mt-10 text-display font-medium gradient-paper"
          />

          <Reveal preset="blurUp" delay={0.28}>
            <p className="mt-10 max-w-2xl text-[1.0625rem] leading-[1.62] text-[var(--color-dim)] sm:text-lg">
              For hospitals, healthcare organizations, and institutions
              exploring automation, AI, system integration, or custom technology
              development.
            </p>
          </Reveal>

          <Reveal preset="fadeUp" delay={0.4}>
            <div className="mt-12 flex flex-col items-center gap-6">
              <Button href={`mailto:${email.value}`} icon>
                Start a Conversation
              </Button>

              <div className="flex flex-col items-center gap-2">
                <a
                  href={`mailto:${email.value}`}
                  className="rounded-sm font-mono text-sm tracking-[0.02em] text-[var(--color-dim)] underline decoration-white/20 underline-offset-[6px] transition-colors hover:text-[var(--color-signal)] hover:decoration-[var(--color-signal)]/50"
                >
                  {email.value}
                </a>

                {/* Visible until the address is confirmed — see data/company.ts */}
                {email.placeholder && (
                  <span className="mono-label flex items-center gap-2 text-[0.5625rem] text-[var(--color-amber)]/80">
                    <span
                      aria-hidden
                      className="size-1 rounded-full bg-[var(--color-amber)]"
                    />
                    Placeholder address — confirm before launch
                  </span>
                )}
              </div>
            </div>
          </Reveal>

          <TrustShelf />
        </div>
      </div>
    </section>
  );
}
