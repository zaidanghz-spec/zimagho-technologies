/**
 * Paint servers shared by every diagram on the page.
 *
 * SVG `url(#id)` references resolve document-wide, so defining the gradients
 * once here keeps each visualization free of boilerplate and guarantees the
 * whole site draws its conduits and pulses from one palette. Rendered from the
 * root layout as a zero-size, inert SVG.
 */
export function GradientDefs() {
  return (
    <svg
      aria-hidden
      focusable="false"
      width="0"
      height="0"
      className="absolute"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {/* Static conduit */}
        <linearGradient id="adk-link" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.12" />
        </linearGradient>

        {/* Travelling data pulse */}
        <linearGradient id="adk-pulse" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="50%" stopColor="#a5f3fc" stopOpacity="1" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>

        {/* Inference-side pulse */}
        <linearGradient id="adk-pulse-violet" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
          <stop offset="50%" stopColor="#c4b5fd" stopOpacity="1" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>

        {/* Convergence edges */}
        <linearGradient id="adk-unify" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.25" />
        </linearGradient>

        {/* Chart fill */}
        <linearGradient id="adk-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
