import { cn } from "@/lib/utils";

/**
 * One mark per direction of work — the answer to each problem diagram.
 *
 * Deliberately the same instrument as `FieldGlyph`, resolved: what was
 * scattered is joined, what was one path branches, what went round now goes
 * through. Read in sequence down the page, the two sets are a before and an
 * after, which is more argument than any amount of copy would carry.
 */

const PAPER = "rgba(242,241,238,0.55)";
const FAINT = "rgba(242,241,238,0.22)";
const COBALT = "rgb(76 111 255)";

export type PillarKind = "health" | "education" | "systems";

export function PillarGlyph({ kind, className }: { kind: PillarKind; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 120"
      className={cn("h-full w-full", className)}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {kind === "health" && <Joined />}
      {kind === "education" && <Branched />}
      {kind === "systems" && <Through />}
    </svg>
  );
}

/* The fragments, now converging on one structured record. */
function Joined() {
  const frags = [
    [18, 22],
    [96, 20],
    [102, 62],
    [16, 66],
    [40, 100],
    [88, 98],
  ] as const;
  return (
    <>
      {frags.map(([x, y], i) => (
        <g key={i}>
          <path
            d={`M${x} ${y} Q ${(x + 60) / 2} ${(y + 60) / 2}, 60 60`}
            stroke={COBALT}
            strokeOpacity={0.45}
            strokeWidth={0.9}
          />
          <path
            d={`M${x} ${y} Q ${(x + 60) / 2} ${(y + 60) / 2}, 60 60`}
            stroke={COBALT}
            strokeWidth={1.4}
            strokeDasharray="3 60"
            className="anim-flow"
            style={{ animationDelay: `${i * 0.6}s` }}
          />
          <circle cx={x} cy={y} r={3} fill="rgb(5 7 10)" stroke={PAPER} strokeWidth={0.9} />
        </g>
      ))}
      <rect x={44} y={48} width={32} height={24} rx={3} fill="rgb(5 7 10)" stroke="rgba(242,241,238,0.7)" strokeWidth={1} />
      <line x1={50} y1={56} x2={70} y2={56} stroke={PAPER} strokeWidth={1} />
      <line x1={50} y1={61} x2={65} y2={61} stroke={FAINT} strokeWidth={1} />
      <line x1={50} y1={66} x2={68} y2={66} stroke={FAINT} strokeWidth={1} />
    </>
  );
}

/* One entry, many routes — each one actually arriving. */
function Branched() {
  const ys = [18, 40, 62, 84, 104];
  return (
    <>
      <circle cx={16} cy={60} r={4} stroke="rgba(242,241,238,0.7)" strokeWidth={1} />
      <path d="M20 60 H 44" stroke={PAPER} strokeWidth={1.1} />
      {ys.map((y, i) => (
        <g key={i}>
          <path d={`M44 60 C 66 60, 70 ${y}, 92 ${y}`} stroke={COBALT} strokeOpacity={0.5} strokeWidth={1} />
          <path
            d={`M44 60 C 66 60, 70 ${y}, 92 ${y}`}
            stroke={COBALT}
            strokeWidth={1.5}
            strokeDasharray="3 70"
            className="anim-flow"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
          <rect x={94} y={y - 5} width={14} height={10} rx={2} fill="rgb(5 7 10)" stroke={PAPER} strokeWidth={0.9} />
          <line x1={97} y1={y} x2={97 + 4 + i} y2={y} stroke={COBALT} strokeWidth={1.1} />
        </g>
      ))}
    </>
  );
}

/* The loop, opened: work enters once and leaves once, and the layer in the
   middle is what removed the corners. */
function Through() {
  return (
    <>
      <rect x={40} y={38} width={40} height={44} rx={4} stroke="rgba(242,241,238,0.7)" strokeWidth={1} />
      <line x1={48} y1={50} x2={72} y2={50} stroke={PAPER} strokeWidth={1} />
      <line x1={48} y1={58} x2={66} y2={58} stroke={FAINT} strokeWidth={1} />
      <line x1={48} y1={66} x2={70} y2={66} stroke={FAINT} strokeWidth={1} />
      <line x1={48} y1={74} x2={60} y2={74} stroke={COBALT} strokeWidth={1.4} />

      {[46, 60, 74].map((y, i) => (
        <g key={i}>
          <path d={`M6 ${y} H 38`} stroke={COBALT} strokeOpacity={0.45} strokeWidth={1} />
          <path
            d={`M6 ${y} H 38`}
            stroke={COBALT}
            strokeWidth={1.5}
            strokeDasharray="3 32"
            className="anim-flow"
            style={{ animationDelay: `${i * 0.7}s` }}
          />
          <path d={`M82 ${y} H 114`} stroke={PAPER} strokeWidth={1} />
          <circle cx={114} cy={y} r={2.2} fill="rgb(242 241 238)" />
          <rect x={2} y={y - 4} width={4} height={8} rx={1} fill={COBALT} fillOpacity={0.5} />
        </g>
      ))}
      <path d="M60 30 V 36" stroke={FAINT} strokeWidth={1} />
      <path d="M60 84 V 90" stroke={FAINT} strokeWidth={1} />
    </>
  );
}
