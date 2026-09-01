import { Footer } from "@/components/layout/Footer";
import { Architecture } from "@/components/sections/Architecture";
import { Automation } from "@/components/sections/Automation";
import { CommandCenter } from "@/components/sections/CommandCenter";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Intelligence } from "@/components/sections/Intelligence";
import { Philosophy } from "@/components/sections/Philosophy";
import { Platform } from "@/components/sections/Platform";
import { Problem } from "@/components/sections/Problem";
import { Research } from "@/components/sections/Research";
import { WhyAdhikarsa } from "@/components/sections/WhyAdhikarsa";
import { company } from "@/data/company";

/**
 * Homepage composition.
 *
 * A server component: every section is imported statically and only the pieces
 * that genuinely need the browser (`"use client"`) ship JavaScript. The order
 * is an argument — what we are, why it matters, what we build, what it looks
 * like, how it works, where the intelligence lives, how it connects, why trust
 * the engineering, where we are going, and how to start.
 */
export default function Home() {
  return (
    <>
      <StructuredData />
      <main id="main">
        <Hero />
        <Problem />
        <Platform />
        <CommandCenter />
        <Automation />
        <Intelligence />
        <Architecture />
        <WhyAdhikarsa />
        <Philosophy />
        <Research />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

/**
 * Organization schema. Asserts only what the company has actually stated —
 * no ratings, no employee counts, no awards, no client claims.
 */
function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    alternateName: company.wordmark,
    url: company.site.url,
    description:
      "PT Adhikarsa Mahatama Teknologi develops hospital automation, AI systems, enterprise integrations, and intelligent technology infrastructure for modern healthcare institutions.",
    address: { "@type": "PostalAddress", addressCountry: "ID" },
    knowsAbout: [
      "Hospital automation",
      "Healthcare technology",
      "Enterprise software",
      "Workflow automation",
      "Systems integration",
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Serialized from a local literal — no user input reaches this string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
