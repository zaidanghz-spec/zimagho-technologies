"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Send } from "lucide-react";
import { useId, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { company } from "@/data/company";
import type { Dictionary } from "@/data/dictionaries";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * The enquiry form.
 *
 * Three decisions worth knowing about.
 *
 * **The direct channels never go away.** They sit beside the form at every
 * state, including success. A form is a promise to reply later; the mailbox and
 * the phone number work now, and a director who would rather just ring should
 * not have to hunt for the number.
 *
 * **Errors are per field and announced.** Each message is tied to its input
 * through `aria-describedby`, the input carries `aria-invalid`, and the first
 * failing field takes focus on submit — so the form is usable without seeing
 * the red text at all.
 *
 * **A failure is never dressed up as a success.** If the mailbox is not
 * configured, or the provider refuses, the form says exactly that and points at
 * the channels that do work, rather than showing a thank-you for a message
 * nobody received.
 */

type FieldName = "name" | "email" | "organisation" | "topic" | "message";
type Status = "idle" | "sending" | "sent" | "handoff";

const REQUIRED: FieldName[] = ["name", "email", "organisation", "topic", "message"];
const EMAIL = /^[^\s@]+@[^\s@.]+\.[^\s@]{2,}$/;

export function ContactForm({ dict }: { dict: Dictionary }) {
  const t = dict.contact.form;
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  /* Kept so the hand-off can compose links from what was actually typed. */
  const [draft, setDraft] = useState<Record<FieldName, string> | null>(null);

  const check = (values: Record<FieldName, string>) => {
    const found: Partial<Record<FieldName, string>> = {};
    for (const field of REQUIRED) {
      if (!values[field]) found[field] = t.errors[field];
    }
    if (values.email && !EMAIL.test(values.email)) found.email = t.errors.email;
    if (values.message && values.message.length < 20) found.message = t.errors.message;
    return found;
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(
      REQUIRED.map((f) => [f, String(data.get(f) ?? "").trim()]),
    ) as Record<FieldName, string>;

    const found = check(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = REQUIRED.find((f) => found[f]);
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setDraft(values);

    /* Try to deliver it automatically. If that is not possible — no mail
       provider configured, the provider refused, the visitor is offline, or
       this is the static export where the endpoint does not exist — the message
       is not lost and the visitor is not told to start again somewhere else.
       It is handed to them, already written, on a channel that works. */
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: String(data.get("website") ?? "") }),
      });
      setStatus(response.ok ? "sent" : "handoff");
    } catch {
      setStatus("handoff");
    }
  }

  /* `AnimatePresence` unmounts the form to show the hand-off, and an
     uncontrolled input loses its value when it remounts. Seeding from the draft
     means "back to the form" returns the visitor to their own words rather than
     to an empty box — which, after being told we could not send it, would be
     the second small betrayal in a row. */
  const field = (name: FieldName) => ({
    id: `${uid}-${name}`,
    name,
    defaultValue: draft?.[name] ?? "",
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${uid}-${name}-error` : undefined,
    onChange: () => errors[name] && setErrors((e) => ({ ...e, [name]: undefined })),
  });

  const control = (invalid?: string) =>
    cn(
      "w-full rounded-lg border bg-surface px-4 py-3 text-[0.9375rem] text-ink",
      "placeholder:text-faint transition-colors duration-300",
      "focus:outline-none focus:ring-2 focus:ring-brand/30",
      invalid
        ? "border-red-500/70 focus:border-red-500"
        : "border-rule hover:border-rule-strong focus:border-brand",
    );

  return (
    <Section id="enquiry" tone="mist" rule>
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow={t.eyebrow} headline={t.heading} copy={t.intro} as="h2" />
            <Reveal preset="riseSoft" delay={0.12}>
              <DirectChannels dict={dict} className="mt-12" />
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal preset="riseSoft">
              <div className="card p-6 sm:p-8">
                <AnimatePresence mode="wait" initial={false}>
                  {status === "handoff" && draft ? (
                    <Handoff key="handoff" dict={dict} draft={draft} onBack={() => setStatus("idle")} />
                  ) : status === "sent" ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                      className="flex flex-col items-start py-10 text-left"
                    >
                      <span className="flex size-11 items-center justify-center rounded-full bg-brand text-on-brand">
                        <Check aria-hidden className="size-5" />
                      </span>
                      <h3 className="mt-6 text-title font-medium text-ink">
                        {t.success.heading}
                      </h3>
                      <p className="mt-3 max-w-sm leading-relaxed text-slate">
                        {t.success.body}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          formRef.current?.reset();
                          setStatus("idle");
                        }}
                        className="mt-8 rounded-full text-sm text-brand underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand"
                      >
                        {t.success.again}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      ref={formRef}
                      onSubmit={onSubmit}
                      noValidate
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col gap-5"
                    >
                      {/* Not display:none — some bots skip hidden inputs but
                          fill anything they can reach off-screen. */}
                      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
                        <label htmlFor={`${uid}-website`}>Website</label>
                        <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" />
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Labelled
                          label={t.fields.name.label}
                          htmlFor={`${uid}-name`}
                          error={errors.name}
                          errorId={`${uid}-name-error`}
                        >
                          <input
                            {...field("name")}
                            type="text"
                            autoComplete="name"
                            placeholder={t.fields.name.placeholder}
                            className={control(errors.name)}
                          />
                        </Labelled>

                        <Labelled
                          label={t.fields.email.label}
                          htmlFor={`${uid}-email`}
                          error={errors.email}
                          errorId={`${uid}-email-error`}
                        >
                          <input
                            {...field("email")}
                            type="email"
                            autoComplete="email"
                            placeholder={t.fields.email.placeholder}
                            className={control(errors.email)}
                          />
                        </Labelled>
                      </div>

                      <Labelled
                        label={t.fields.organisation.label}
                        htmlFor={`${uid}-organisation`}
                        error={errors.organisation}
                        errorId={`${uid}-organisation-error`}
                      >
                        <input
                          {...field("organisation")}
                          type="text"
                          autoComplete="organization"
                          placeholder={t.fields.organisation.placeholder}
                          className={control(errors.organisation)}
                        />
                      </Labelled>

                      <Labelled
                        label={t.fields.topic.label}
                        htmlFor={`${uid}-topic`}
                        error={errors.topic}
                        errorId={`${uid}-topic-error`}
                      >
                        <select
                          {...field("topic")}
                          className={cn(control(errors.topic), "appearance-none bg-[right_1rem_center] bg-no-repeat pr-10")}
                          style={{
                            backgroundImage:
                              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%2394a3b8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                          }}
                        >
                          <option value="" disabled>
                            {t.fields.topic.placeholder}
                          </option>
                          {t.topics.map((topic) => (
                            <option key={topic.value} value={topic.value}>
                              {topic.label}
                            </option>
                          ))}
                        </select>
                      </Labelled>

                      <Labelled
                        label={t.fields.message.label}
                        htmlFor={`${uid}-message`}
                        error={errors.message}
                        errorId={`${uid}-message-error`}
                      >
                        <textarea
                          {...field("message")}
                          rows={5}
                          placeholder={t.fields.message.placeholder}
                          className={cn(control(errors.message), "resize-y leading-relaxed")}
                        />
                      </Labelled>

                      {/* One live region for the whole form, so a screen reader
                          hears the outcome without hunting for it. */}
                      <p aria-live="polite" className="sr-only">
                        {status === "sending" ? t.submitting : ""}
                      </p>

                      <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <button
                          type="submit"
                          disabled={status === "sending"}
                          className={cn(
                            "group/send inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full px-7 py-3.5 whitespace-nowrap",
                            "bg-brand text-[0.9375rem] font-medium text-on-brand",
                            "transition-[background-color,opacity] duration-300 hover:bg-brand-alt",
                            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand",
                            "disabled:cursor-not-allowed disabled:opacity-60",
                          )}
                        >
                          {status === "sending" ? (
                            <>
                              <Loader2 aria-hidden className="size-4 animate-spin" />
                              {t.submitting}
                            </>
                          ) : (
                            <>
                              {t.submit}
                              <ArrowRight
                                aria-hidden
                                className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/send:translate-x-0.5"
                              />
                            </>
                          )}
                        </button>

                        <p className="max-w-xs text-[0.75rem] leading-relaxed text-muted">
                          {t.privacy}
                        </p>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}

/**
 * The message, composed and handed over.
 *
 * Reached whenever automatic delivery is not available. Deliberately not styled
 * as an error: from where the visitor is standing nothing has gone wrong — they
 * wrote a message and here are two buttons that send it, with every field
 * already filled in. An enquiry is never lost to a configuration gap.
 */
function Handoff({
  dict,
  draft,
  onBack,
}: {
  dict: Dictionary;
  draft: Record<FieldName, string>;
  onBack: () => void;
}) {
  const t = dict.contact.form;
  const topic =
    t.topics.find((x) => x.value === draft.topic)?.label ?? draft.topic;

  const composed = [
    `${t.fields.name.label}: ${draft.name}`,
    `${t.fields.organisation.label}: ${draft.organisation}`,
    `${t.fields.email.label}: ${draft.email}`,
    `${t.handoff.topicLabel}: ${topic}`,
    "",
    draft.message,
  ].join("\n");

  const subject = `${draft.organisation} — ${topic}`;
  const mail = company.contactEmail
    ? `mailto:${company.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composed)}`
    : null;
  const wa = company.contactWhatsApp
    ? `https://wa.me/${company.contactPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(composed)}`
    : null;

  const button =
    "inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[0.9375rem] font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
      className="flex flex-col items-start py-6"
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-sky-tint text-brand">
        <Send aria-hidden className="size-5" />
      </span>

      <h3 className="mt-6 text-title font-medium text-ink">{t.handoff.heading}</h3>
      <p className="mt-3 max-w-sm leading-relaxed text-slate">{t.handoff.body}</p>

      {/* What they wrote, so it is plainly still there. */}
      <pre className="mt-6 max-h-44 w-full overflow-auto rounded-lg border border-rule bg-mist p-4 text-[0.8125rem] leading-relaxed whitespace-pre-wrap text-slate">
        {composed}
      </pre>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className={cn(button, "bg-brand text-on-brand hover:bg-brand-alt focus-visible:outline-brand")}
          >
            {t.handoff.whatsapp}
            <ArrowRight aria-hidden className="size-4" />
          </a>
        )}
        {mail && (
          <a
            href={mail}
            className={cn(
              button,
              "border border-rule-strong text-ink hover:border-ink hover:bg-stone focus-visible:outline-brand",
            )}
          >
            {t.handoff.email}
          </a>
        )}
      </div>

      <button
        type="button"
        onClick={onBack}
        className="mt-7 rounded-full text-sm text-muted underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink"
      >
        {t.handoff.back}
      </button>
    </motion.div>
  );
}

function Labelled({
  label,
  htmlFor,
  error,
  errorId,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[0.8125rem] font-medium text-slate">
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} className="text-[0.75rem] text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

/** The routes that work without waiting for a reply. */
function DirectChannels({ dict, className }: { dict: Dictionary; className?: string }) {
  const t = dict.contact.form.direct;
  const rows = [
    company.contactEmail && {
      label: t.emailLabel,
      value: company.contactEmail,
      href: `mailto:${company.contactEmail}`,
    },
    {
      label: t.phoneLabel,
      value: company.contactPhoneDisplay,
      href: `tel:${company.contactPhone}`,
    },
    { label: t.addressLabel, value: company.headquarters, href: undefined },
  ].filter(Boolean) as { label: string; value: string; href?: string }[];

  return (
    <div className={className}>
      <h3 className="eyebrow text-muted">{t.heading}</h3>
      <dl className="mt-5 border-t border-rule">
        {rows.map((row) => (
          <div key={row.label} className="border-b border-rule py-4">
            <dt className="text-[0.75rem] font-medium text-muted">{row.label}</dt>
            <dd className="mt-1.5">
              {row.href ? (
                <a
                  href={row.href}
                  className="text-[0.9375rem] font-medium text-ink underline decoration-rule-strong decoration-1 underline-offset-4 transition-colors duration-300 hover:text-brand hover:decoration-brand"
                >
                  {row.value}
                </a>
              ) : (
                <span className="text-[0.875rem] leading-relaxed break-words text-slate">
                  {row.value}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
