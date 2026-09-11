/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH — PT ADHIKARSA MAHATAMA TEKNOLOGI
 * ----------------------------------------------------------------------------
 * Every editable company fact lives here. Change it once, it changes sitewide.
 *
 * ⚠ PLACEHOLDER POLICY
 * A field whose `value` is `null` has NOT been supplied by the company. The UI
 * renders it as a clearly-marked "to be provided" slot rather than inventing
 * something. Fill in the value and the marking disappears automatically — the
 * address, mailbox and number below went in exactly that way.
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

/**
 * Supplied by the company. These are the only contact particulars on the site,
 * and every place that shows an address, a mailbox or a number reads them from
 * here — the profile table, the contact page, and the structured data a search
 * engine picks up.
 */
const HEADQUARTERS =
  "Menara Cakrawala Lt. 12, Unit 05A, Jl. M.H. Thamrin No. 9, RT 002 / RW 001, Kelurahan Kebon Sirih, Kecamatan Menteng, Jakarta Pusat 10340, Indonesia";

const CONTACT_EMAIL = "zaidan@adhikarsa.co.id";

/* E.164 for the link, spaced for the eye. */
const CONTACT_PHONE = "+6281717422524";
const CONTACT_PHONE_DISPLAY = "+62 817 1742 2524";

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
    { label: "Headquarters", value: HEADQUARTERS },
    { label: "Email", value: CONTACT_EMAIL },
    { label: "Contact Person", value: CONTACT_PHONE_DISPLAY },
  ] satisfies CompanyField[],

  headquarters: HEADQUARTERS,

  /** Used for mailto links and the contact CTA. `null` renders a marked slot. */
  contactEmail: CONTACT_EMAIL as string | null,

  /** `tel:` needs the unpunctuated form; people need the readable one. */
  contactPhone: CONTACT_PHONE,
  contactPhoneDisplay: CONTACT_PHONE_DISPLAY,

  site: {
    /**
     * Canonical origin. Read from the environment so a deploy is correct
     * without a code change: an explicit `NEXT_PUBLIC_SITE_URL` wins, Vercel's
     * own production hostname is used when the build is running there, and the
     * registered domain is the fallback for a local build.
     */
    url:
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "https://adhikarsa.co.id"),
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
