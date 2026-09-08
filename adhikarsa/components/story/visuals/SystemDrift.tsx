import { cn } from "@/lib/utils";

/* Geometry only — the labels live in the copy, never in the diagram, so the
   picture stays the same in any language. */
const NODES = [
  { x: 50, y: 50, r: 5.5 },
  { x: 18, y: 24, r: 2.6 },
  { x: 82, y: 26, r: 2.6 },
  { x: 12, y: 62, r: 2.2 },
  { x: 88, y: 60, r: 2.2 },
  { x: 33, y: 82, r: 2.4 },
  { x: 67, y: 84, r: 2.4 },
  { x: 50, y: 12, r: 2 },
];

/**
 * A system quietly assembling itself.
 *
 * Every animation here is CSS keyframes with a per-element delay, not a
 * timeline in JavaScript: the hero must not hold the main thread while the
 * page is still settling, and a drifting network is exactly the kind of
 * decoration that has no business costing a frame budget.
 */
export function SystemDrift({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      className={cn("h-full w-full overflow-visible", className)}
    >
      <defs>
        <radialGradient id="drift-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(128 152 255)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="rgb(76 111 255)" stopOpacity="0.15" />
        </radialGradient>
      </defs>

      {NODES.slice(1).map((n, i) => (
        <line
          key={`l${i}`}
          x1={NODES[0].x}
          y1={NODES[0].y}
          x2={n.x}
          y2={n.y}
          stroke="rgba(76,111,255,0.42)"
          strokeWidth={0.22}
          className="anim-breathe"
          style={{ animationDelay: `${i * 0.55}s`, animationDuration: "7s" }}
        />
      ))}

      {NODES.slice(1).map((n, i) => (
        <g key={`n${i}`}>
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="none"
            stroke="rgba(242,241,238,0.34)"
            strokeWidth={0.22}
          />
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r * 0.34}
            fill="rgb(128 152 255)"
            className="anim-breathe"
            style={{ animationDelay: `${i * 0.4}s`, animationDuration: "5.5s" }}
          />
        </g>
      ))}

      <circle cx={50} cy={50} r={9} fill="url(#drift-core)" className="anim-breathe" />
      <circle
        cx={50}
        cy={50}
        r={NODES[0].r}
        fill="none"
        stroke="rgba(242,241,238,0.6)"
        strokeWidth={0.3}
      />
      <circle cx={50} cy={50} r={1.4} fill="rgb(242 241 238)" />
    </svg>
  );
}
