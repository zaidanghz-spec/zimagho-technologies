import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy statement for PT Adhikarsa Mahatama Teknologi. Placeholder pending legal review.",
  robots: { index: false, follow: true },
};

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy"
      intro="How PT Adhikarsa Mahatama Teknologi handles information collected through this website and through institutional engagements."
      sections={[
        {
          heading: "Scope",
          body: "This statement covers the public website only. Data handling inside a deployed system is governed by the agreement with the institution operating it, and by that institution's own policies.",
        },
        {
          heading: "Information we collect",
          body: "This site does not run analytics, advertising, or third-party tracking, and it does not set cookies. If you contact us by email, we hold that correspondence for the purpose of responding to it.",
        },
        {
          heading: "Institutional engagements",
          body: "Where Adhikarsa processes data on behalf of an institution, the institution remains the controller of that data. Access, retention, and governance terms are defined per engagement.",
        },
        {
          heading: "Contact",
          body: "Questions about this statement can be directed to the address on the contact section of the homepage.",
        },
      ]}
    />
  );
}
