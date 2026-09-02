"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";
import {
  EcosystemStages,
  HospitalEcosystem,
} from "@/components/visualizations/HospitalEcosystem";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SECTIONS } from "@/lib/constants";

/**
 * Healthcare as the company's core domain, told by scrolling one diagram from
 * nine independent systems to a single connected ecosystem.
 *
 * The header scrolls normally and only the diagram is pinned, so the pinned
 * region always fits a laptop viewport without shrinking the drawing.
 */
export function HealthcareTechnology() {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id={SECTIONS.healthcare}
      className="relative scroll-mt-24 bg-[var(--color-mist)]"
    >
      <div className="shell pt-24 sm:pt-28 lg:pt-36">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <SectionHeader
            eyebrow="Healthcare Technology"
            headline={["Connecting the hospital", "into one intelligent", "ecosystem."]}
            className="lg:col-span-7"
          />
          <div className="lg:col-span-5 lg:pt-4">
            <p className="text-lead text-[var(--color-slate)]">
              Modern hospitals depend on numerous clinical, operational,
              administrative, and financial systems. Adhikarsa develops
              technology that helps these systems communicate and operate as a
              more connected digital environment.
            </p>
          </div>
        </div>
      </div>

      <div ref={track} className="relative h-[260vh] lg:h-[300vh]">
        <div className="sticky top-0 flex min-h-[100svh] flex-col justify-center py-20">
          <div className="shell w-full">
            <HospitalEcosystem
              progress={scrollYProgress}
              className="mx-auto max-w-4xl"
            />
            <div className="mx-auto mt-10 max-w-4xl border-t border-[var(--color-rule)] pt-8">
              <EcosystemStages progress={scrollYProgress} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
