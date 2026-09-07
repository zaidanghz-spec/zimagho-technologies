import { company } from "@/data/company";

/**
 * ============================================================================
 * INSERTION POINT — verified institutional proof
 * ----------------------------------------------------------------------------
 * Clients, partners and certifications render here and NOWHERE else.
 *
 * The arrays in `data/company.ts` are empty on purpose. Nothing on this site
 * claims a hospital client, partnership, certification, compliance status or
 * regulatory approval, because none has been supplied. Populate the arrays
 * with verified material and this shelf appears; leave them empty and the site
 * simply never makes the claim.
 *
 * In development the empty slot is drawn so the hand-off is obvious. In
 * production an empty shelf renders nothing at all.
 * ============================================================================
 */
export function TrustShelf({ className }: { className?: string }) {
  const { clients, partners, certifications } = company.trust;
  const entries = [...clients, ...partners, ...certifications];

  if (!entries.length) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <div className={className}>
        <div className="rounded-xl border border-dashed border-rule-strong bg-mist p-5">
          <p className="eyebrow text-brand">
            Reserved — verified clients / partners / certifications
          </p>
          <p className="mt-2 text-xs text-muted">
            Empty by design. Populate <code className="font-mono">company.trust</code> in{" "}
            <code className="font-mono">data/company.ts</code> to render this shelf.
            This notice is development-only.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="eyebrow">Institutional partners</p>
      <ul className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-4">
        {entries.map((e) => (
          <li key={e} className="text-sm font-medium text-slate">
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
}
