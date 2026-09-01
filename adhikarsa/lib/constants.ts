/** Sitewide navigation + section anchors. Section ids are the scroll targets. */

export const SECTIONS = {
  hero: "top",
  problem: "problem",
  platform: "solutions",
  commandCenter: "platform",
  automation: "automation",
  intelligence: "technology",
  architecture: "architecture",
  why: "why",
  philosophy: "about",
  research: "research",
  contact: "contact",
} as const;

export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Technology", href: `#${SECTIONS.intelligence}` },
  { label: "Solutions", href: `#${SECTIONS.platform}` },
  { label: "Platform", href: `#${SECTIONS.commandCenter}` },
  { label: "About", href: `#${SECTIONS.philosophy}` },
  { label: "Contact", href: `#${SECTIONS.contact}` },
];

export const FOOTER_NAV: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Technology",
    items: [
      { label: "Intelligence Layer", href: `#${SECTIONS.intelligence}` },
      { label: "Automation Engine", href: `#${SECTIONS.automation}` },
      { label: "Architecture", href: `#${SECTIONS.architecture}` },
    ],
  },
  {
    heading: "Solutions",
    items: [
      { label: "Hospital Platform", href: `#${SECTIONS.platform}` },
      { label: "Command Center", href: `#${SECTIONS.commandCenter}` },
      { label: "System Integration", href: `#${SECTIONS.platform}` },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "Philosophy", href: `#${SECTIONS.philosophy}` },
      { label: "Engineering Principles", href: `#${SECTIONS.why}` },
      { label: "Research & Development", href: `#${SECTIONS.research}` },
    ],
  },
];

export const LEGAL_NAV: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
