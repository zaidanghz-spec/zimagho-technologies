"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
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
type Status = "idle" | "sending" | "sent" | "failed";

const REQUIRED: FieldName[] = ["name", "email", "organisation", "topic", "message"];
const EMAIL = /^[^\s@]+@[^\s@.]+\.[^\s@]{2,}$/;

export function ContactForm({ dict }: { dict: Dictionary }) {
  const t = dict.contact.form;
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [failure, setFailure] = useState<string | null>(null);

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
    setFailure(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: String(data.get("website") ?? "") }),
      });

      if (response.ok) {
        setStatus("sent");
        return;
      }

      const payload = (await response.json().catch(() => ({}))) as { code?: string };
      setFailure(payload.code === "unconfigured" ? t.errors.unconfigured : t.errors.generic);
      setStatus("failed");
    } catch {
      /* Offline, blocked, or the endpoint is not there — which is exactly what
         the static export looks like. Same honest message either way. */
      setFailure(t.errors.generic);
      setStatus("failed");
    }
  }

  const field = (name: FieldName) => ({
    id: `${uid}-${name}`,
    name,
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
                  {status === "sent" ? (
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
                          defaultValue=""
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
                        {status === "sending" ? t.submitting : (failure ?? "")}
                      </p>

                      {failure && (
                        <p className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-[0.8125rem] leading-relaxed text-red-600 dark:text-red-400">
                          <span aria-hidden className="mt-1.5 size-1 shrink-0 rounded-full bg-red-500" />
                          {failure}
                        </p>
                      )}

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
