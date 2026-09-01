import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms of use for the PT Adhikarsa Mahatama Teknologi website. Placeholder pending legal review.",
  robots: { index: false, follow: true },
};

export default function Terms() {
  return (
    <LegalPage
      title="Terms"
      intro="Terms governing use of this website."
      sections={[
        {
          heading: "Purpose of this site",
          body: "This website describes the capabilities and engineering approach of PT Adhikarsa Mahatama Teknologi. It is informational and does not constitute an offer, a warranty, or a commitment to deliver any specific system.",
        },
        {
          heading: "Illustrative interfaces",
          body: "Interfaces, dashboards, metrics, and diagrams shown on this site are conceptual designs. They are not screenshots of a deployed system and do not represent any hospital, institution, or dataset.",
        },
        {
          heading: "Intellectual property",
          body: "The content, design, and code of this site are the property of PT Adhikarsa Mahatama Teknologi unless stated otherwise.",
        },
        {
          heading: "Changes",
          body: "These terms may be updated. Continued use of the site follows the version published here.",
        },
      ]}
    />
  );
}
