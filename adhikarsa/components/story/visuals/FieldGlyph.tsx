import { cn } from "@/lib/utils";

/**
 * One diagram per problem, each drawing the *shape* of that problem rather
 * than illustrating its subject.
 *
 * The point of a diagram here is to say something the sentence next to it
 * cannot: fragmentation looks different from repetition, which looks different
 * from a capability that has nowhere to go. Stock imagery of a doctor or a
 * classroom would say nothing at all.
 *
 * All four share one viewBox, one stroke weight and one palette, so switching
 * between them reads as the same instrument pointed at a different subject.
 */

const PAPER = "rgba(242,241,238,0.5)";
const FAINT = "rgba(242,241,238,0.2)";
const COBALT = "rgb(76 111 255)";

export type FieldKind = "health" | "education" | "organisations" | "ai";

export function FieldGlyph({ kind, className }: { kind: FieldKind; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 120"
      className={cn("h-full w-full", className)}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {kind === "health" && <Health />}
      {kind === "education" && <Education />}
      {kind === "organisations" && <Organisations />}
      {kind === "ai" && <Ai />}
    </svg>
  );
}

/* Records that exist, but never in one place: six fragments, each holding a
   piece, none of them touching. */
function Health() {
  const frags = [
    { x: 14, y: 20, w: 30, h: 18 },
    { x: 62, y: 12, w: 26, h: 14 },
    { x: 82, y: 40, w: 24, h: 20 },
    { x: 10, y: 58, w: 26, h: 16 },
    { x: 46, y: 84, w: 32, h: 16 },
    { x: 88, y: 82, w: 20, h: 14 },
  ];
  return (
    <>
      {frags.map((f, i) => (
        <g key={i} className="anim-breathe" style={{ animationDelay: `${i * 0.5}s`, animationDuration: "6s" }}>
          <rect x={f.x} y={f.y} width={f.w} height={f.h} rx={2} stroke={FAINT} strokeWidth={0.9} />
          <line x1={f.x + 4} y1={f.y + 6} x2={f.x + f.w - 8} y2={f.y + 6} stroke={PAPER} strokeWidth={0.9} />
          <line x1={f.x + 4} y1={f.y + 11} x2={f.x + f.w - 14} y2={f.y + 11} stroke={FAINT} strokeWidth={0.9} />
        </g>
      ))}
      {/* The join that is missing, drawn as absence. */}
      <circle cx={60} cy={56} r={11} stroke={COBALT} strokeWidth={0.9} strokeDasharray="2 4" />
    </>
  );
}

/* One path in, one path out — for everyone. The branches that should exist are
   drawn as dashes that never arrive. */
function Education() {
  return (
    <>
      <path d="M8 60 H 52" stroke={PAPER} strokeWidth={1.1} />
      <circle cx={56} cy={60} r={4} stroke={PAPER} strokeWidth={1.1} />
      <path d="M60 60 H 112" stroke={PAPER} strokeWidth={1.1} />
      {[16, 32, 88, 104].map((y, i) => (
        <path
          key={i}
          d={`M60 60 C 78 60, 84 ${y}, 106 ${y}`}
          stroke={COBALT}
          strokeOpacity={0.55}
          strokeWidth={0.9}
          strokeDasharray="2 5"
          className="anim-breathe"
          style={{ animationDelay: `${i * 0.6}s`, animationDuration: "6.5s" }}
        />
      ))}
      {[16, 32, 88, 104].map((y, i) => (
        <circle key={`d${i}`} cx={108} cy={y} r={1.8} fill={COBALT} fillOpacity={0.5} />
      ))}
      <circle cx={110} cy={60} r={2.4} fill="rgb(242 241 238)" />
    </>
  );
}

/* Work that goes round rather than through: a closed loop of handoffs, with a
   person re-entering the same thing at every corner. */
function Organisations() {
  const pts = [
    [30, 26],
    [90, 26],
    [90, 94],
    [30, 94],
  ];
  return (
    <>
      <rect x={30} y={26} width={60} height={68} rx={3} stroke={FAINT} strokeWidth={0.9} />
      {pts.map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 9} y={y - 7} width={18} height={14} rx={2} fill="rgb(5 7 10)" stroke={PAPER} strokeWidth={0.9} />
          <line x1={x - 5} y1={y - 2} x2={x + 4} y2={y - 2} stroke={FAINT} strokeWidth={0.9} />
          <line x1={x - 5} y1={y + 2} x2={x + 1} y2={y + 2} stroke={FAINT} strokeWidth={0.9} />
        </g>
      ))}
      {/* The packet that never leaves the loop. */}
      <circle r={2.2} fill={COBALT}>
        <animateMotion
          dur="9s"
          repeatCount="indefinite"
          path="M30 26 H90 V94 H30 Z"
          keyPoints="0;1"
          keyTimes="0;1"
          calcMode="linear"
        />
      </circle>
    </>
  );
}

/* Enormous capability upstream, one narrow channel into anything real. */
function Ai() {
  return (
    <>
      {Array.from({ length: 7 }, (_, r) =>
        Array.from({ length: 7 }, (_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={16 + c * 6}
            cy={22 + r * 6}
            r={1.5}
            fill={COBALT}
            fillOpacity={0.25 + ((r * 7 + c) % 5) * 0.13}
            className="anim-breathe"
            style={{ animationDelay: `${((r * 7 + c) % 9) * 0.35}s`, animationDuration: "5s" }}
          />
        )),
      )}
      <path d="M62 46 C 82 46, 78 66, 96 66" stroke={PAPER} strokeWidth={1} />
      <path d="M62 46 C 82 46, 78 66, 96 66" stroke={COBALT} strokeWidth={1} strokeDasharray="4 44" className="anim-flow" />
      <rect x={96} y={56} width={16} height={20} rx={2} stroke={PAPER} strokeWidth={1} />
      <line x1={100} y1={63} x2={108} y2={63} stroke={FAINT} strokeWidth={0.9} />
      <line x1={100} y1={68} x2={105} y2={68} stroke={FAINT} strokeWidth={0.9} />
      {/* What does not make it through. */}
      <path d="M62 46 C 78 46, 76 96, 52 100" stroke={FAINT} strokeWidth={0.8} strokeDasharray="1 4" />
      <path d="M62 46 C 84 46, 92 22, 108 18" stroke={FAINT} strokeWidth={0.8} strokeDasharray="1 4" />
    </>
  );
}
