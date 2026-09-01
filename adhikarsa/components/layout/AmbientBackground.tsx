/**
 * Global atmosphere. Server-rendered and entirely CSS — it ships zero
 * JavaScript and never re-renders, which is why it can sit behind every
 * section without costing anything at runtime.
 *
 * Layers, back to front:
 *   1. cool radial wash (depth)
 *   2. technical grid, masked away from the edges
 *   3. two slow drifting light sources
 *   4. sparse vertical scan rails
 *   5. film noise
 *   6. vignette
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* 1 — base wash */}
      <div className="absolute inset-0 bg-[var(--color-void)]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(30,64,120,0.28)_0%,rgba(5,7,10,0)_58%)]" />

      {/* 2 — technical grid */}
      <div className="tech-grid fade-edges absolute inset-0 opacity-[0.55]" />

      {/* 3 — drifting light sources */}
      <div
        className="anim-drift absolute -top-[18vh] left-1/2 h-[62vh] w-[78vw] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.14) 0%, rgba(56,189,248,0) 68%)",
        }}
      />
      <div
        className="anim-drift absolute top-[52vh] -right-[14vw] h-[54vh] w-[54vw] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.11) 0%, rgba(99,102,241,0) 70%)",
          animationDelay: "-13s",
          animationDuration: "34s",
        }}
      />

      {/* 4 — scan rails: three faint verticals that imply a technical canvas */}
      <div className="absolute inset-0 hidden md:block">
        {[18, 50, 82].map((left) => (
          <div
            key={left}
            className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-white/[0.045] to-transparent"
            style={{ left: `${left}%` }}
          />
        ))}
      </div>

      {/* 5 — noise */}
      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* 6 — vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_105%_at_50%_50%,rgba(5,7,10,0)_42%,rgba(5,7,10,0.72)_100%)]" />
    </div>
  );
}
