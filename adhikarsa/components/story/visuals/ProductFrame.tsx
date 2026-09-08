import { cn } from "@/lib/utils";

/**
 * An interface, abstracted.
 *
 * These are not screenshots and are not meant to be mistaken for them. Nothing
 * in development has a released UI, and drawing a plausible one with invented
 * readings — a patient name, a score, a chart that resolves — would be a claim
 * about a product that does not exist yet. So the frames carry structure and
 * no content: the shape of the thing, honestly empty.
 */

export type FrameKind = "clinical" | "learning" | "os";

export function ProductFrame({ kind, className }: { kind: FrameKind; className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-hairline bg-void-lift",
        className,
      )}
    >
      {/* Chrome. Three dots and a rule — enough to read as software, not enough
          to imply a shipped product. */}
      <div className="flex items-center gap-1.5 border-b border-hairline px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-1.5 rounded-full bg-paper/20" />
        ))}
        <span className="ml-3 h-1.5 w-24 rounded-full bg-paper/10" />
      </div>

      <div className="absolute inset-0 top-[41px]">
        {kind === "clinical" && <Clinical />}
        {kind === "learning" && <Learning />}
        {kind === "os" && <Os />}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_38%,rgba(5,7,10,0.72)_100%)]"
      />
    </div>
  );
}

const bar = "rounded-full bg-paper/12";

function Clinical() {
  return (
    <div className="grid h-full grid-cols-[1fr_1.6fr] gap-px bg-hairline">
      <div className="space-y-3 bg-void-lift p-4 sm:p-5">
        <span className={cn(bar, "block h-1.5 w-16")} />
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="size-1.5 shrink-0 rounded-[2px] bg-cobalt/60" />
            <span className={cn(bar, "block h-1.5")} style={{ width: `${72 - i * 9}%` }} />
          </div>
        ))}
      </div>
      <div className="space-y-3 bg-void-lift p-4 sm:p-5">
        <div className="flex gap-2">
          <span className="h-5 w-16 rounded-md border border-cobalt/40 bg-cobalt/10" />
          <span className="h-5 w-14 rounded-md border border-hairline" />
          <span className="h-5 w-12 rounded-md border border-hairline" />
        </div>
        <div className="h-16 rounded-lg border border-hairline bg-[linear-gradient(180deg,rgba(76,111,255,0.14),transparent)]" />
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-12 rounded-lg border border-hairline" />
          ))}
        </div>
      </div>
    </div>
  );
}

function Learning() {
  return (
    <div className="flex h-full flex-col gap-3 p-4 sm:p-5">
      <span className={cn(bar, "block h-1.5 w-28")} />
      <div className="relative flex-1 rounded-lg border border-hairline p-4">
        <svg viewBox="0 0 200 90" className="h-full w-full" fill="none">
          <path d="M4 70 H 60" stroke="rgba(242,241,238,0.35)" strokeWidth={1.4} />
          <circle cx={66} cy={70} r={4} stroke="rgba(242,241,238,0.6)" strokeWidth={1.4} />
          {[16, 38, 62, 84].map((y, i) => (
            <path
              key={i}
              d={`M72 70 C 110 70, 116 ${y}, 190 ${y}`}
              stroke="rgb(76 111 255)"
              strokeOpacity={0.28 + i * 0.14}
              strokeWidth={1.4}
            />
          ))}
        </svg>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-8 rounded-md border border-hairline" />
        ))}
      </div>
    </div>
  );
}

function Os() {
  return (
    <div className="grid h-full grid-cols-[auto_1fr] gap-px bg-hairline">
      <div className="w-12 space-y-2.5 bg-void-lift p-3 sm:w-14">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={cn(
              "block size-5 rounded-md border",
              i === 1 ? "border-cobalt/50 bg-cobalt/15" : "border-hairline",
            )}
          />
        ))}
      </div>
      <div className="space-y-2.5 bg-void-lift p-4 sm:p-5">
        {[0, 1, 2, 3].map((row) => (
          <div key={row} className="flex items-center gap-2.5 rounded-lg border border-hairline px-3 py-2.5">
            <span className="size-1.5 rounded-full bg-cobalt/70" />
            <span className={cn(bar, "block h-1.5")} style={{ width: `${46 - row * 7}%` }} />
            <span className="ml-auto h-3.5 w-10 rounded-full border border-hairline" />
          </div>
        ))}
      </div>
    </div>
  );
}
