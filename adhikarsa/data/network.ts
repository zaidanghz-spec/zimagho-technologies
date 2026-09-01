/**
 * Topology for the hero visualization.
 *
 * Coordinates live in a fixed 1000×640 space. The rendering container locks
 * that aspect ratio, so an absolutely-positioned HTML label at `x/1000%` sits
 * exactly on its SVG anchor at any viewport width — HTML text stays crisp
 * while the geometry stays vector.
 */

export const VIEW = { w: 1000, h: 640 } as const;
export const CORE = { x: 500, y: 312, r: 66 } as const;

export type NetNode = {
  id: string;
  label: string;
  meta: string;
  x: number;
  y: number;
  /** Label anchoring relative to the node dot. */
  side: "left" | "right" | "top" | "bottom";
  accent?: "signal" | "violet" | "online";
};

/**
 * Positions are hand-placed rather than distributed on a perfect circle.
 * A mathematically even ring reads as a diagram template; slight asymmetry
 * reads as an actual system map.
 */
export const NODES: readonly NetNode[] = [
  { id: "emr", label: "EMR", meta: "Records", x: 128, y: 118, side: "right" },
  { id: "his", label: "HIS", meta: "Core Hospital", x: 68, y: 318, side: "right" },
  { id: "lab", label: "LAB", meta: "Diagnostics", x: 152, y: 516, side: "right" },
  { id: "pharmacy", label: "PHARMACY", meta: "Dispensing", x: 348, y: 58, side: "bottom" },
  { id: "radiology", label: "RADIOLOGY", meta: "Imaging", x: 664, y: 72, side: "bottom" },
  { id: "finance", label: "FINANCE", meta: "Billing", x: 888, y: 126, side: "left" },
  { id: "operations", label: "OPERATIONS", meta: "Resourcing", x: 932, y: 322, side: "left" },
  { id: "iot", label: "IOT", meta: "Devices", x: 850, y: 518, side: "left", accent: "online" },
  { id: "ai", label: "AI ENGINE", meta: "Inference", x: 498, y: 580, side: "top", accent: "violet" },
] as const;

export type NetLink = {
  id: string;
  d: string;
  /** Sequence position — drives staggered activation. */
  order: number;
};

/** Trims a segment at both ends so links never collide with node geometry. */
function trim(
  from: [number, number],
  to: [number, number],
  startGap: number,
  endGap: number,
): [[number, number], [number, number]] {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  return [
    [from[0] + ux * startGap, from[1] + uy * startGap],
    [to[0] - ux * endGap, to[1] - uy * endGap],
  ];
}

/**
 * Cubic paths bowed perpendicular to the core→node axis. Alternating the bow
 * direction keeps adjacent links from stacking into a starburst.
 */
export const LINKS: readonly NetLink[] = NODES.map((n, i) => {
  const [start, end] = trim([CORE.x, CORE.y], [n.x, n.y], CORE.r + 6, 22);
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const len = Math.hypot(dx, dy) || 1;
  const bow = (i % 2 === 0 ? 1 : -1) * Math.min(78, len * 0.2);
  const px = -dy / len;
  const py = dx / len;

  const c1 = [start[0] + dx * 0.3 + px * bow, start[1] + dy * 0.3 + py * bow];
  const c2 = [start[0] + dx * 0.72 + px * bow, start[1] + dy * 0.72 + py * bow];

  const f = (v: number) => Math.round(v * 10) / 10;
  return {
    id: n.id,
    order: i,
    d: `M ${f(start[0])} ${f(start[1])} C ${f(c1[0])} ${f(c1[1])}, ${f(c2[0])} ${f(c2[1])}, ${f(end[0])} ${f(end[1])}`,
  };
});

/** Ambient telemetry captions. Presentation copy — never implied as live data. */
export const SYSTEM_LABELS = [
  "SYSTEM ONLINE",
  "REAL-TIME SYNC",
  "AI ACTIVE",
  "SECURE CONNECTION",
  "99.9% UPTIME",
] as const;
