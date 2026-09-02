# Adhikarsa — Corporate Website

Digital company profile for **PT Adhikarsa Mahatama Teknologi**: healthcare
technology, hospital automation, artificial intelligence, enterprise software,
systems integration, and R&D.

Light-first, corporate, editorial. Built with Next.js (App Router) +
TypeScript + Tailwind CSS v4 + Framer Motion. Statically prerendered — no
server runtime required.

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Where to edit things

| I want to change…                             | Edit                                        |
| --------------------------------------------- | ------------------------------------------- |
| Company name, profile fields, contact email   | `data/company.ts`                           |
| Nav labels and section anchors                 | `lib/constants.ts`                          |
| Colours, type scale, surfaces, shadows         | `app/globals.css` (`@theme` block)          |
| Animation timings and entrance variants        | `lib/animations.ts`                         |
| Section copy                                   | the matching file in `components/sections/` |

## ⚠ Before launch

Fields the company has not supplied render as an explicit **"To be provided"**
slot in the Company Information section — never as invented data. Fill them in
`data/company.ts` and the marking disappears:

- `profile[].value` for **Headquarters**, **Email** and **Website**
- `contactEmail` — while `null`, the final CTA points at the company profile
  and says so instead of linking a fabricated mailbox
- `site.url` — set to the production origin so canonical URLs, the sitemap,
  `robots.txt` and OpenGraph tags point somewhere real

Nothing on this site claims a client, hospital partner, government
relationship, testimonial, award, certification, compliance status, regulatory
approval, customer count, revenue, headcount, or company history, because none
was supplied. `components/ui/TrustShelf.tsx` is the single insertion point for
verified material — populate `company.trust` and it renders; leave it empty and
the site simply never makes the claim.

## Structure

```
app/           routes, metadata, sitemap, robots, OG image, global CSS
components/
  layout/      navbar, footer, wordmark, scroll progress
  motion/      Reveal, AnimatedText, MotionPath, Magnetic, AnimatedCounter
  sections/    one file per band of the homepage, in page order
  ui/          Button, Section, SectionHeader, Card, Eyebrow, TrustShelf
  visualizations/
               IntelligenceBoard      hero ecosystem board
               HospitalEcosystem      five-stage scroll-driven diagram
               WorkflowVisualization  automation pipeline
               ArchitectureDiagram    three interactive layers
               ResearchNetwork        R&D constellation
               CapabilityGlyph        six capability micro-diagrams
data/          company facts and profile fields
lib/           animation system, class utils, media-query hook, constants
```

## Conventions worth knowing

- **`page.tsx` is a server component.** Only pieces that genuinely need the
  browser carry `"use client"`.
- **Pointer interactions never touch React state.** Card lift, magnetic
  buttons and hero parallax write to Framer motion values, so moving the mouse
  costs zero renders.
- **Scroll-driven sequences reduce to one integer.** `HospitalEcosystem`
  converts scroll progress to a `stage` (0–4) in the parent and animates
  declaratively from it. An earlier version gave every child its own
  `useTransform` on the scroll value; with that many subscribers the per-child
  transforms went stale and left nodes stuck at `opacity: 0`.
- **Looping animation is CSS; one-shot entrances are Framer.** Every travelling
  data packet on the site runs off one shared `@keyframes adk-flow`, fed
  per-element dash endpoints by `components/motion/MotionPath.tsx`.
- **Diagrams recompose for portrait, they do not shrink.** Each visualization
  ships a separate mobile composition; a nine-node ring squeezed into 350px is
  unreadable, so the same information is restated vertically.
- **`cn()` teaches tailwind-merge the custom font sizes** (`text-display`,
  `text-headline`, `text-title`, `text-lead`). Without that registration
  tailwind-merge guesses they are text *colours* and silently drops the size
  wherever a size and a colour meet in one call — which renders a 52px headline
  at 16px.
- **Reduced motion is handled in two places**: `MotionConfig reducedMotion="user"`
  for Framer, and a global media query that neutralises CSS animation.
- **`.no-js`** is stripped by an inline script before first paint. If it never
  runs, the stylesheet reveals everything marked `data-reveal`, so the whole
  page is readable without JavaScript.
