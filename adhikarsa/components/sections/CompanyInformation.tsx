import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TrustShelf } from "@/components/ui/TrustShelf";
import { company } from "@/data/company";
import type { Dictionary } from "@/data/dictionaries";
import { ANCHORS } from "@/lib/constants";

/**
 * The company profile proper — the page a director prints.
 *
 * Fields the company has not supplied render as an explicit "to be provided"
 * slot. Inventing an address, an email or a registration number here would be
 * the single most damaging thing this site could do, so the layout is designed
 * to look deliberate while a field is still empty.
 */
export function CompanyInformation({ dict }: { dict: Dictionary }) {
  const t = dict.company.profile;

  /* Field order is fixed; labels and the one free-text value are localised,
     while the legal name is a proper noun and never translated. */
  const rows: { label: string; value: string | string[] | null; note?: string }[] = [
    { label: t.fields.company, value: company.legalName },
    { label: t.fields.industry, value: t.values.industry },
    { label: t.fields.coreFocus, value: t.values.coreFocus },
    { label: t.fields.headquarters, value: null, note: t.values.headquartersNote },
    { label: t.fields.email, value: null },
    { label: t.fields.website, value: null },
  ];

  return (
    <Section id={ANCHORS.profile} tone="mist" rule>
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeader
            eyebrow={t.eyebrow}
            headline={t.lines}
            className="lg:col-span-4"
          />

          <div className="lg:col-span-8">
            <RevealGroup as="dl" gap={0.07} className="border-t border-rule">
              {rows.map((field) => (
                <RevealItem
                  key={field.label}
                  className="grid gap-2 border-b border-rule py-6 sm:grid-cols-[minmax(0,12rem)_1fr] sm:gap-8 sm:py-7"
                >
                  <dt className="text-[0.8125rem] font-medium tracking-[0.01em] text-muted">
                    {field.label}
                  </dt>
                  <dd className="min-w-0">
                    <FieldValue field={field} pending={t.toBeProvided} />
                  </dd>
                </RevealItem>
              ))}
            </RevealGroup>

            <TrustShelf className="mt-10" />
          </div>
        </div>
      </div>
    </Section>
  );
}

function FieldValue({
  field,
  pending,
}: {
  field: { value: string | string[] | null; note?: string };
  pending: string;
}) {
  if (field.value === null) {
    return (
      <div className="flex flex-col gap-1.5">
        <span className="inline-flex w-fit items-center gap-2 rounded-md border border-dashed border-rule-strong bg-surface px-3 py-1.5">
          <span aria-hidden className="size-1.5 rounded-[2px] bg-brand" />
          <span className="text-[0.75rem] font-medium text-muted">{pending}</span>
        </span>
        {field.note && <span className="text-[0.75rem] text-faint">{field.note}</span>}
      </div>
    );
  }

  if (Array.isArray(field.value)) {
    return (
      <ul className="flex flex-wrap gap-x-2 gap-y-2">
        {field.value.map((v) => (
          <li
            key={v}
            className="rounded-md border border-rule bg-surface px-2.5 py-1.5 text-[0.8125rem] text-ink"
          >
            {v}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <span className="text-[0.9375rem] font-medium text-ink sm:text-base">
      {field.value}
    </span>
  );
}
