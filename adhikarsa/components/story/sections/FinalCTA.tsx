import { LargeHeading } from "@/components/story/primitives/LargeHeading";
import { MagneticButton } from "@/components/story/primitives/MagneticButton";
import { Reveal } from "@/components/story/primitives/Reveal";
import { SectionLabel } from "@/components/story/primitives/SectionLabel";
import { company } from "@/data/company";
import { story } from "@/data/story";

/**
 * 13 — The invitation.
 *
 * Minimal by design: after the vision screen, anything elaborate would read as
 * a sales page bolted to the end of an essay. Two actions, one line about who
 * this is for, and the address — which is the company's real contact route
 * only when one has been supplied. While `contactEmail` is null the primary
 * action points at the corporate profile and says so, rather than linking a
 * mailbox that does not exist.
 */
export function FinalCTA() {
  const t = story.contact;
  const mail = company.contactEmail ? `mailto:${company.contactEmail}` : "/en/contact";

  return (
    <section id="contact" className="scroll-mt-24 relative overflow-hidden border-t border-hairline py-32 sm:py-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-30%] h-[70%] bg-[radial-gradient(55%_60%_at_50%_100%,rgba(76,111,255,0.16)_0%,transparent_72%)]"
      />

      <div className="field relative">
        <SectionLabel>{t.marker}</SectionLabel>

        <div className="measure mt-10">
          <LargeHeading
            lines={t.heading}
            accentLines={[1]}
            className="text-chapter font-medium text-paper"
          />
        </div>

        <Reveal preset="rise" delay={0.1} className="mt-8 max-w-xl">
          <p className="text-say text-paper-dim">{t.body}</p>
        </Reveal>

        <Reveal preset="rise" delay={0.18} className="mt-12 flex flex-wrap items-center gap-4">
          <MagneticButton href={mail}>{t.primary}</MagneticButton>
          <MagneticButton href="#technology" variant="ghost">
            {t.secondary}
          </MagneticButton>
        </Reveal>

        <Reveal preset="fade" delay={0.26} className="mt-14 flex items-center gap-4">
          <span aria-hidden className="size-1.5 rounded-full bg-cobalt" />
          <p className="text-sm text-paper-faint">{t.availability}</p>
        </Reveal>
      </div>
    </section>
  );
}
