/**
 * Paint servers shared by every diagram on the page.
 *
 * SVG `url(#id)` references resolve document-wide, so defining these once
 * keeps each visualization free of boilerplate and guarantees the whole site
 * draws its connections and packets from one palette. Rendered from the root
 * layout as a zero-size, inert SVG.
 */
export function GradientDefs() {
  return (
    <svg
      aria-hidden
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {/* Static connection line */}
        <linearGradient id="adk-link" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1046d6" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#00aeef" stopOpacity="0.2" />
        </linearGradient>

        {/* Travelling data packet */}
        <linearGradient id="adk-pulse" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1046d6" stopOpacity="0" />
          <stop offset="50%" stopColor="#1046d6" stopOpacity="1" />
          <stop offset="100%" stopColor="#1046d6" stopOpacity="0" />
        </linearGradient>

        {/* Secondary packet, for return paths and outputs */}
        <linearGradient id="adk-pulse-cyan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00aeef" stopOpacity="0" />
          <stop offset="50%" stopColor="#00aeef" stopOpacity="1" />
          <stop offset="100%" stopColor="#00aeef" stopOpacity="0" />
        </linearGradient>

        {/* Packet on the deep-blue band */}
        <linearGradient id="adk-pulse-light" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
