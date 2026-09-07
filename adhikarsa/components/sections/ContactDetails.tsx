import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { company } from "@/data/company";
import type { Dictionary } from "@/data/dictionaries";

/**
 * Contact particulars, on the contact page only.
 *
 * Everything the company has not supplied renders as a marked slot, exactly as
 * on the profile — the same rule applies here, and this is the page where the
 * temptation to invent an address would be strongest.
 */
export function ContactDetails({ dict }: { dict: Dictionary }) {
  const t = dict.contact;
  const profile = dict.company.profile;

  const rows: { label: string; value: string | null }[] = [
    { label: profile.fields.company, value: company.legalName },
    { label: profile.fields.headquarters, value: null },
    { label: profile.fields.email, value: company.contactEmail },
    { label: profile.fields.website, value: null },
  ];

  return (
    <Section tone="white">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeader
            eyebrow={t.eyebrow}
            headline={[t.detailsHeading]}
            copy={t.detailsBody}
            className="lg:col-span-5"
            as="h2"
          />

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal preset="riseSoft">
              <dl className="border-t border-rule">
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className="grid gap-2 border-b border-rule py-6 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-8"
                  >
                    <dt className="text-[0.8125rem] font-medium text-muted">
                      {row.label}
                    </dt>
                    <dd className="min-w-0">
                      {row.value ? (
                        <span className="text-[0.9375rem] font-medium text-ink">
                          {row.value}
                        </span>
                      ) : (
                        <span className="inline-flex w-fit items-center gap-2 rounded-md border border-dashed border-rule-strong bg-surface px-3 py-1.5">
                          <span aria-hidden className="size-1.5 rounded-[2px] bg-brand" />
                          <span className="text-[0.75rem] font-medium text-muted">
                            {profile.toBeProvided}
                          </span>
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
