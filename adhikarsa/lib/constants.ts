/** Sitewide navigation and section anchors. Ids are the scroll targets. */

export const SECTIONS = {
  hero: "top",
  company: "company",
  capabilities: "solutions",
  healthcare: "healthcare",
  automation: "automation",
  engineering: "engineering",
  architecture: "technology",
  approach: "approach",
  innovation: "innovation",
  statement: "statement",
  profile: "profile",
  contact: "contact",
} as const;

export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Company", href: `#${SECTIONS.company}` },
  { label: "Solutions", href: `#${SECTIONS.capabilities}` },
  { label: "Technology", href: `#${SECTIONS.architecture}` },
  { label: "Innovation", href: `#${SECTIONS.innovation}` },
  { label: "Contact", href: `#${SECTIONS.contact}` },
];

export const FOOTER_NAV: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Navigation",
    items: [
      { label: "Company", href: `#${SECTIONS.company}` },
      { label: "Solutions", href: `#${SECTIONS.capabilities}` },
      { label: "Technology", href: `#${SECTIONS.architecture}` },
      { label: "Innovation", href: `#${SECTIONS.innovation}` },
      { label: "Contact", href: `#${SECTIONS.contact}` },
    ],
  },
  {
    heading: "Capabilities",
    items: [
      { label: "Healthcare Technology", href: `#${SECTIONS.healthcare}` },
      { label: "Automation", href: `#${SECTIONS.automation}` },
      { label: "Artificial Intelligence", href: `#${SECTIONS.capabilities}` },
      { label: "Software Development", href: `#${SECTIONS.engineering}` },
    ],
  },
];

export const LEGAL_NAV: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
