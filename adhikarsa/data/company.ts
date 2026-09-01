/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH — PT ADHIKARSA MAHATAMA TEKNOLOGI
 * ----------------------------------------------------------------------------
 * Every editable company fact lives here. Change it once, it changes sitewide.
 *
 * ⚠ PLACEHOLDER POLICY
 * Fields flagged `placeholder: true` have NOT been verified. They render with
 * a visible "to be confirmed" affordance so nothing unverified is ever
 * presented to a visitor as fact. Replace the value and flip the flag.
 * ============================================================================
 */

export type PlaceholderValue = {
  value: string;
  /** true = not yet verified by the company; UI must not present it as fact. */
  placeholder: boolean;
};

export const company = {
  legalName: "PT Adhikarsa Mahatama Teknologi",
  wordmark: "ADHIKARSA",
  descriptor: "MAHATAMA TEKNOLOGI",
  shortName: "Adhikarsa",

  tagline: "Engineering intelligent systems for modern healthcare.",
  positioning:
    "Adhikarsa builds intelligent infrastructure that makes hospitals operate smarter.",

  disciplines: [
    "Hospital Automation",
    "Artificial Intelligence",
    "Technology Development",
  ],

  /**
   * ⚠ UNVERIFIED. `technology@adhikarsa.id` was not confirmed as a live
   * mailbox, so it is treated as a placeholder until the company confirms it.
   */
  contact: {
    email: {
      value: "technology@adhikarsa.id",
      placeholder: true,
    } satisfies PlaceholderValue,
    /** Set once a public inbound line is confirmed. */
    phone: null as PlaceholderValue | null,
    /** Set once a public office address is confirmed. */
    address: null as PlaceholderValue | null,
    locale: "Indonesia",
  },

  /**
   * ⚠ Intentionally empty. Per the project's trust rules, no client,
   * partnership, certification, award, deployment count, or regulatory claim
   * is asserted anywhere on this site until the company supplies verified
   * material. Populating these arrays is the only way they appear in the UI.
   */
  trust: {
    clients: [] as string[],
    partners: [] as string[],
    certifications: [] as string[],
    awards: [] as string[],
  },

  site: {
    /** Update to the production origin before launch. */
    url: "https://adhikarsa.example",
    locale: "en_ID",
  },
} as const;

/** Formats a placeholder-aware value for display. */
export function displayValue(v: PlaceholderValue): string {
  return v.value;
}

export const currentYear = new Date().getFullYear();
