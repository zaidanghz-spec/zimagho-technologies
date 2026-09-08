import type { Metadata } from "next";
import { StoryFooter } from "@/components/story/layout/StoryFooter";
import { StoryNav } from "@/components/story/layout/StoryNav";
import { ChapterRail } from "@/components/story/primitives/ChapterRail";
import { BeliefSection } from "@/components/story/sections/BeliefSection";
import { BuildProcess } from "@/components/story/sections/BuildProcess";
import { FinalCTA } from "@/components/story/sections/FinalCTA";
import { Hero } from "@/components/story/sections/Hero";
import { MeetAdhikarsa } from "@/components/story/sections/MeetAdhikarsa";
import { PeopleSection } from "@/components/story/sections/PeopleSection";
import { Principles } from "@/components/story/sections/Principles";
import { ProblemSection } from "@/components/story/sections/ProblemSection";
import { ResearchSection } from "@/components/story/sections/ResearchSection";
import { TechnologySection } from "@/components/story/sections/TechnologySection";
import { Verticals } from "@/components/story/sections/Verticals";
import { VisionSection } from "@/components/story/sections/VisionSection";
import { WorldChanging } from "@/components/story/sections/WorldChanging";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { company } from "@/data/company";
import { story } from "@/data/story";

/**
 * ============================================================================
 * ADHIKARSA — THE NARRATIVE
 * ----------------------------------------------------------------------------
 * One page, twelve chapters, read in order.
 *
 * The order is the argument, and it is deliberately the reverse of a company
 * profile. A profile opens with who we are and hopes the reader stays; this
 * opens with something the reader already believes — that progress is uneven —
 * establishes what that costs in four fields, states a position, and only then
 * names the company. By the time "Adhikarsa" appears on screen the reader has
 * spent five screens agreeing with the premise it exists to answer.
 *
 * Everything is composed here so the whole story is legible in one file. The
 * sections own their own motion; this owns the sequence.
 * ==========================================================================
 */

export const metadata: Metadata = {
  title: "Adhikarsa — Technology built for meaningful progress",
  description:
    "Adhikarsa is an Indonesian technology company building intelligent products and digital systems across healthcare, education, artificial intelligence, and enterprise technology.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: company.legalName,
    title: "Adhikarsa — Technology built for meaningful progress",
    description: story.hero.body,
  },
  robots: { index: true, follow: true },
};

export default function NarrativePage() {
  return (
    <MotionProvider>
      {/* `narrative` is what tells the document to paint the deep ground —
          see the `html:has()` rule in globals.css. Without it, overscroll and
          the mobile browser chrome flash the corporate white. */}
      <div className="narrative bg-void text-paper antialiased">
        <ChapterRail />
        <StoryNav />

        <main id="story">
          <Hero />
          <WorldChanging />
          <ProblemSection />
          <BeliefSection />
          <MeetAdhikarsa />
          <Verticals />
          <BuildProcess />
          <TechnologySection />
          <ResearchSection />
          <Principles />
          <PeopleSection />
          <VisionSection />
          <FinalCTA />
        </main>

        <StoryFooter />
      </div>
    </MotionProvider>
  );
}
