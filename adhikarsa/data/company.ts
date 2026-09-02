/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH — PT ADHIKARSA MAHATAMA TEKNOLOGI
 * ----------------------------------------------------------------------------
 * Every editable company fact lives here. Change it once, it changes sitewide.
 *
 * ⚠ PLACEHOLDER POLICY
 * A field whose `value` is `null` has NOT been supplied by the company. The UI
 * renders it as a clearly-marked "to be provided" slot rather than inventing
 * something. Fill in the value and the marking disappears automatically.
 *
 * Nothing on this site claims a client, hospital partner, government
 * relationship, testimonial, award, certification, compliance status,
 * regulatory approval, customer count, revenue, headcount, or company history,
 * because none has been supplied.
 * ============================================================================
 */

export type CompanyField = {
  label: string;
  /** `null` = not supplied. Rendered as a marked placeholder, never invented. */
  value: string | string[] | null;
  /** Optional note shown beneath the field. */
  note?: string;
};

export const company = {
  legalName: "PT Adhikarsa Mahatama Teknologi",
  wordmark: "ADHIKARSA",
  descriptor: "MAHATAMA TEKNOLOGI",
  shortName: "Adhikarsa",

  tagline: "Technology for intelligent institutions.",
  positioning:
    "PT Adhikarsa Mahatama Teknologi develops intelligent technology, automation, and integrated digital systems designed to improve how modern healthcare institutions operate.",

  capabilities: [
    "Healthcare Technology",
    "Automation",
    "Artificial Intelligence",
    "Software Development",
  ],

  heroCapabilities: [
    "Technology Development",
    "Hospital Automation",
    "Artificial Intelligence",
    "System Integration",
  ],

  /**
   * Rendered by the Company Information section, in this order. Anything with
   * `value: null` shows as an explicit "to be provided" row.
   */
  profile: [
    { label: "Company", value: "PT Adhikarsa Mahatama Teknologi" },
    { label: "Industry", value: "Technology & Digital Solutions" },
    {
      label: "Core Focus",
      value: [
        "Healthcare Technology",
        "Automation",
        "Artificial Intelligence",
        "Software Development",
        "Systems Integration",
      ],
    },
    { label: "Headquarters", value: null, note: "Indonesia" },
    { label: "Email", value: null },
    { label: "Website", value: null },
  ] satisfies CompanyField[],

  /** Used for mailto links and the contact CTA. `null` renders a marked slot. */
  contactEmail: null as string | null,

  site: {
    /** Update to the production origin before launch. */
    url: "https://adhikarsa.example",
    locale: "en_ID",
  },

  /**
   * ⚠ Intentionally empty. See TrustShelf — this is the only place verified
   * clients, partners, certifications or awards can enter the site.
   */
  trust: {
    clients: [] as string[],
    partners: [] as string[],
    certifications: [] as string[],
  },
} as const;

export const currentYear = new Date().getFullYear();
