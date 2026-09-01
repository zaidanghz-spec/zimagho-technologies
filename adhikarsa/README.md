# Adhikarsa — Corporate Site

Marketing site for **PT Adhikarsa Mahatama Teknologi**: hospital automation, AI
systems, enterprise integration, and technology R&D.

Built with Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.
Statically prerendered — no server runtime required.

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Where to edit things

| I want to change…                              | Edit                                              |
| ---------------------------------------------- | ------------------------------------------------- |
| Company name, contact email, disciplines, URL  | `data/company.ts`                                 |
| Nav labels and section anchors                  | `lib/constants.ts`                                |
| Colours, type scale, surfaces, keyframes        | `app/globals.css` (`@theme` block)                |
| Animation timings and entrance variants         | `lib/animations.ts`                               |
| Hero topology nodes and their positions         | `data/network.ts`                                 |
| Section copy                                    | the matching file in `components/sections/`       |

## ⚠ Before launch

Two things are deliberately marked as unverified and render a visible amber
notice until you fix them:

1. **Contact email.** `technology@adhikarsa.id` was never confirmed as a live
   mailbox. Set the real address in `data/company.ts` and flip
   `contact.email.placeholder` to `false`; the notice disappears.
2. **`site.url`.** Set it to the production origin so canonical URLs, the
   sitemap, `robots.txt`, and OpenGraph tags point somewhere real.

Nothing on this site claims a hospital client, partnership, certification,
award, deployment count, or regulatory approval, because none was supplied.
`components/ui/TrustShelf.tsx` is the single insertion point for that material —
populate `company.trust` in `data/company.ts` and it renders. Left empty, the
site simply never makes the claim.

The operations console in the Command Center section is a **conceptual design**.
Its figures are illustrative and drift on a timer; it is not connected to any
hospital or dataset, and the interface says so on screen.

## Structure

```
app/           routes, metadata, sitemap, robots, OG image, global CSS
components/
  layout/      navbar, footer, background, cursor, preloader, scroll progress
  motion/      Reveal, RevealText, AnimatedCounter, Magnetic
  sections/    one file per band of the homepage, in page order
  ui/          Button, Section, SectionHeader, GlowCard, Eyebrow, StatusDot
  visualizations/  the diagrams: topology, command center, workflow,
                   intelligence core, architecture, research orbits
data/          company facts, hero topology geometry
lib/           animation system, class utils, media-query hook, constants
```

## Conventions worth knowing

- **`page.tsx` is a server component.** Only pieces that genuinely need the
  browser carry `"use client"`.
- **Pointer interactions never touch React state.** Cursor, magnetic buttons,
  card tilt and parallax all write to Framer motion values, so moving the mouse
  costs zero renders.
- **Looping animation is CSS; one-shot entrances are Framer.** Every travelling
  data pulse on the site runs off one shared `@keyframes adk-flow`, fed
  per-element dash endpoints by `components/visualizations/FlowPath.tsx`.
- **Reduced motion is handled in two places**: `MotionConfig reducedMotion="user"`
  for Framer, and a global media query that neutralises CSS animation.
- **`.no-js`** is stripped by an inline script before first paint. If it never
  runs, the stylesheet reveals everything marked `data-reveal` and drops the
  entry curtain, so the copy is readable without JavaScript.
- **Custom utilities avoid Tailwind's namespaces** (`gradient-paper`, not
  `text-gradient`) so `tailwind-merge` cannot mistake them for `text-*`
  utilities and silently drop a font size.
