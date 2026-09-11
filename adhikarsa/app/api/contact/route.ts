import { NextResponse } from "next/server";
import { company } from "@/data/company";

/**
 * ============================================================================
 * ENQUIRY ENDPOINT
 * ----------------------------------------------------------------------------
 * Receives the contact form and forwards it to the company mailbox.
 *
 * A route handler rather than a Server Action, for one practical reason: this
 * site also ships as a static export, and a Server Action makes that build fail
 * outright. A handler can simply be parked by the export script the same way
 * `robots` and `sitemap` already are, and the form falls back to the direct
 * channels when the endpoint is not there.
 *
 * Validation is repeated here even though the form checks the same rules in the
 * browser. The browser copy exists to give fast feedback; this copy is the one
 * that decides, because anything can POST to a public URL.
 * ==========================================================================
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOPICS = [
  "healthcare",
  "automation",
  "ai",
  "integration",
  "custom",
  "research",
  "other",
] as const;

const LIMITS = {
  name: [2, 120],
  email: [5, 200],
  organisation: [2, 160],
  message: [20, 4000],
} as const;

/* Deliberately permissive. The only address worth rejecting is one that cannot
   be a reply-to at all; anything stricter starts refusing real mailboxes. */
const EMAIL = /^[^\s@]+@[^\s@.]+\.[^\s@]{2,}$/;

type Field = keyof typeof LIMITS;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validate(body: Record<string, unknown>) {
  const errors: string[] = [];
  const out: Record<string, string> = {};

  for (const field of Object.keys(LIMITS) as Field[]) {
    const value = clean(body[field]);
    const [min, max] = LIMITS[field];
    if (value.length < min || value.length > max) errors.push(field);
    out[field] = value;
  }

  if (out.email && !EMAIL.test(out.email)) {
    if (!errors.includes("email")) errors.push("email");
  }

  const topic = clean(body.topic);
  if (!(TOPICS as readonly string[]).includes(topic)) errors.push("topic");
  out.topic = topic;

  return { errors, values: out };
}

/**
 * Per-instance flood guard.
 *
 * Serverless means this map is per-instance and resets on a cold start, so it
 * is a speed bump rather than a rate limiter — enough to stop a script hammering
 * one warm instance, not enough to stop a determined sender. The real control
 * belongs at the edge (Vercel WAF / Firewall), which is where it should be
 * configured before this is advertised anywhere.
 */
const SEEN = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function floodCheck(ip: string): boolean {
  const now = Date.now();
  const hits = (SEEN.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  SEEN.set(ip, hits);
  if (SEEN.size > 5000) SEEN.clear();
  return hits.length <= MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
  }

  /* The honeypot is a field no human sees and no human fills. A submission
     that carries one is dropped with a 200, so the bot learns nothing. */
  if (clean(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!floodCheck(ip)) {
    return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429 });
  }

  const { errors, values } = validate(body);
  if (errors.length) {
    return NextResponse.json({ ok: false, code: "invalid", errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || company.contactEmail;
  const from = process.env.CONTACT_FROM_EMAIL || "Adhikarsa <onboarding@resend.dev>";

  /* Nothing is silently swallowed: if the mailbox is not wired up the form says
     so and shows the direct channels, rather than pretending to have sent. */
  if (!apiKey || !to) {
    return NextResponse.json(
      { ok: false, code: "unconfigured" },
      { status: 503 },
    );
  }

  const lines = [
    `Name:         ${values.name}`,
    `Email:        ${values.email}`,
    `Organisation: ${values.organisation}`,
    `Topic:        ${values.topic}`,
    "",
    values.message,
    "",
    "—",
    `Sent from the contact form at ${company.site.url}`,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        /* So a reply in the mail client goes to the enquirer, not to Resend. */
        reply_to: values.email,
        subject: `${values.organisation} — ${values.topic} enquiry`,
        text: lines,
      }),
    });

    if (!response.ok) {
      console.error("contact: provider rejected", response.status, await response.text());
      return NextResponse.json({ ok: false, code: "send_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("contact: provider unreachable", error);
    return NextResponse.json({ ok: false, code: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
