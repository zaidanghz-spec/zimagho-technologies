import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * The masthead that opens an inner page.
 *
 * On a multi-page site each route needs its own establishing shot — a reader
 * who lands on `/company` from a search result gets no context from the
 * homepage. The faint grid is the only ornament, and it fades before it
 * reaches the copy.
 */
export function PageHeader({
  eyebrow,
  lines,
  body,
}: {
  eyebrow: string;
  lines: string[];
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-canvas pt-32 pb-16 sm:pt-36 lg:pt-44 lg:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="blueprint fade-edges absolute inset-0 opacity-50" />
        <div className="absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(110%_70%_at_50%_0%,var(--color-sky-tint)_0%,transparent_62%)] opacity-60" />
      </div>

      <div className="shell relative">
        <div className="measure max-w-4xl">
          <Reveal preset="rise">
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <AnimatedText
            as="h1"
            immediate
            delay={0.1}
            lines={lines}
            className="mt-7 text-display font-medium text-ink"
          />
          {body && (
            <Reveal preset="riseSoft" delay={0.25}>
              <p className="mt-8 max-w-2xl text-lead text-slate">{body}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
