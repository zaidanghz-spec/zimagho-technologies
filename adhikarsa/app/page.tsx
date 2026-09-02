import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { Architecture } from "@/components/sections/Architecture";
import { Automation } from "@/components/sections/Automation";
import { Capabilities } from "@/components/sections/Capabilities";
import { CompanyInformation } from "@/components/sections/CompanyInformation";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { CorporateStatement } from "@/components/sections/CorporateStatement";
import { Engineering } from "@/components/sections/Engineering";
import { HealthcareTechnology } from "@/components/sections/HealthcareTechnology";
import { Hero } from "@/components/sections/Hero";
import { Innovation } from "@/components/sections/Innovation";
import { WhyAdhikarsa } from "@/components/sections/WhyAdhikarsa";
import { company } from "@/data/company";

/**
 * Homepage composition.
 *
 * A server component: every section is imported statically and only the pieces
 * that genuinely need the browser (`"use client"`) ship JavaScript.
 *
 * The order is the argument a company profile has to make — who we are, what
 * we believe, what we do, where we specialise, how the work runs, how we
 * build, how it all connects, why trust the engineering, where we are going,
 * what we stand for, the formal record, and how to begin.
 */
export default function Home() {
  return (
    <>
      <StructuredData />
      <main id="main">
        <Hero />
        <About />
        <Capabilities />
        <HealthcareTechnology />
        <Automation />
        <Engineering />
        <Architecture />
        <WhyAdhikarsa />
        <Innovation />
        <CorporateStatement />
        <CompanyInformation />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

/**
 * Organization schema. Asserts only what the company has actually stated — no
 * ratings, headcount, awards, certifications, or client claims.
 */
function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    alternateName: company.wordmark,
    url: company.site.url,
    description:
      "PT Adhikarsa Mahatama Teknologi develops healthcare technology, hospital automation, artificial intelligence, system integration, and custom digital solutions for modern institutions.",
    address: { "@type": "PostalAddress", addressCountry: "ID" },
    knowsAbout: [
      "Healthcare technology",
      "Hospital automation",
      "Artificial intelligence",
      "Enterprise software development",
      "Systems integration",
      "Workflow automation",
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
