import { company } from "@/data/company";

/**
 * ============================================================================
 * INSERTION POINT — verified institutional proof
 * ----------------------------------------------------------------------------
 * Clients, partners, certifications and awards render here and NOWHERE else.
 *
 * The arrays in `data/company.ts` are empty on purpose. Nothing on this site
 * claims a hospital client, a partnership, a certification, a deployment
 * count, or a regulatory approval, because none has been supplied. Populate
 * the arrays with verified material and this shelf appears; leave them empty
 * and the site simply never makes the claim.
 *
 * In development the empty slot is drawn so the hand-off is obvious. In
 * production an empty shelf renders nothing at all.
 * ============================================================================
 */
export function TrustShelf() {
  const { clients, partners, certifications } = company.trust;
  const entries = [...clients, ...partners, ...certifications];

  if (!entries.length) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <div className="mt-16 rounded-xl border border-dashed border-white/12 p-5">
        <p className="mono-label text-[var(--color-amber)]">
          Reserved — verified clients / partners / certifications
        </p>
        <p className="mt-2 text-xs text-[var(--color-faint)]">
          Empty by design. Populate <code className="font-mono">company.trust</code> in{" "}
          <code className="font-mono">data/company.ts</code> to render this shelf.
          This notice is development-only.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <p className="mono-label">Institutional partners</p>
      <ul className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-4">
        {entries.map((e) => (
          <li key={e} className="text-sm font-medium text-[var(--color-dim)]">
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
}
