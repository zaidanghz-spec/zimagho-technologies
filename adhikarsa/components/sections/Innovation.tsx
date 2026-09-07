import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ResearchNetwork } from "@/components/visualizations/ResearchNetwork";
import type { Dictionary } from "@/data/dictionaries";

export function Innovation({ dict }: { dict: Dictionary }) {
  const t = dict.innovation;
  return (
    <Section tone="white">
      <div className="shell">
        <SectionHeader
          eyebrow={t.hero.eyebrow}
          align="center"
          headline={t.hero.lines}
          copy={t.hero.body}
          className="mx-auto max-w-3xl"
        />

        <ResearchNetwork copy={t} className="mt-16 lg:mt-20" />
      </div>
    </Section>
  );
}
