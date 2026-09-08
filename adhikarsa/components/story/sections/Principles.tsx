import { LargeHeading } from "@/components/story/primitives/LargeHeading";
import { RevealGroup, RevealItem } from "@/components/story/primitives/Reveal";
import { SectionLabel } from "@/components/story/primitives/SectionLabel";
import { story } from "@/data/story";

/**
 * 10 — The principles, as a numbered wall.
 *
 * The numbers are set at display size and the principle at body size, which
 * inverts the usual hierarchy on purpose: from across the room this reads as a
 * count of six commitments, and only up close as their content. Borders are
 * per-cell rather than a grid gap over a lighter panel — a gap-based grid
 * paints a solid slab before its children have revealed, and on a dark ground
 * that flash is the most visible thing on the page.
 */
export function Principles() {
  const t = story.principles;

  return (
    <section id="principles" className="scroll-mt-24 relative border-t border-hairline py-28 sm:py-36">
      <div className="field">
        <SectionLabel>{t.marker}</SectionLabel>
        <div className="measure mt-10">
          <LargeHeading lines={t.heading} className="text-chapter font-medium text-paper" />
        </div>

        <RevealGroup
          as="ol"
          gap={0.08}
          className="mt-20 grid sm:mt-24 sm:grid-cols-2 lg:grid-cols-3"
        >
          {t.items.map((p) => (
            <RevealItem
              as="li"
              key={p.n}
              className="group/pr relative border-t border-hairline px-0 py-10 sm:px-8 sm:first:pl-0 lg:py-12 [&:nth-child(3n+1)]:lg:pl-0 [&:nth-child(2n+1)]:sm:pl-0 sm:[&:nth-child(n)]:border-l sm:[&:nth-child(2n+1)]:border-l-0 lg:[&:nth-child(2n+1)]:border-l lg:[&:nth-child(3n+1)]:border-l-0"
            >
              <span className="block text-[3.25rem] leading-none font-medium tracking-[-0.04em] text-void-raise transition-colors duration-700 group-hover/pr:text-cobalt-deep sm:text-[4rem]">
                {p.n}
              </span>
              <h3 className="mt-7 text-[1.0625rem] font-medium tracking-[-0.01em] text-paper">
                {p.name}
              </h3>
              <p className="mt-3 max-w-xs leading-[1.7] text-paper-dim">{p.line}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
