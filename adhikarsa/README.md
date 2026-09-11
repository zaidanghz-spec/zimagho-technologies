# Adhikarsa — Corporate Website

Digital company profile for **PT Adhikarsa Mahatama Teknologi**: healthcare
technology, hospital automation, artificial intelligence, enterprise software,
systems integration, and R&D.

Light-first, corporate, editorial. Built with Next.js (App Router) +
TypeScript + Tailwind CSS v4 + Framer Motion. Statically prerendered — no
server runtime required.

Eight pages, in **English and Bahasa Indonesia**, each with a **light and a
dark** presentation. `/` forwards to whichever language the visitor's browser
asks for.

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
npm run export     # static, file://-openable copy in out/
```

`npm run export` produces a folder you can open by double-clicking
`out/index.html` — no Node, no server. It parks the three metadata routes that
need a runtime (`opengraph-image`, `robots`, `sitemap`), inlines the Geist
fonts as data URIs (Chrome blocks `@font-face` over `file://`, which would
silently swap in a system font), and rewrites root-absolute links to relative
ones — including the locale gateway's `<meta http-equiv="refresh">`, so
`out/index.html` still forwards to `en/` or `id/` when opened from a folder.
Page-to-page routing, the language switch and the theme switch all work from
disk. Two things are done for that folder specifically: the client runtime's
base path is retargeted per document, because a single compiled `/_next/`
cannot be right for pages at three different depths; and the entrance
animations are settled to their finished state, because React does not hydrate
from a `file://` origin and every reveal is server-rendered at `opacity: 0` —
without it the folder opens to a page that is complete in the markup and blank
on screen. So the export is the whole site, legible and navigable, minus the
motion.

## Where to edit things

| I want to change…                             | Edit                                        |
| --------------------------------------------- | ------------------------------------------- |
| Company name, profile fields, contact email   | `data/company.ts`                           |
| Any visible wording, in either language        | `data/dictionaries/en.ts` and `id.ts`       |
| Which pages exist and their URLs               | `lib/constants.ts`                          |
| Which languages exist                          | `lib/i18n.ts`                               |
| Light colours, type scale, surfaces, shadows   | `app/globals.css` (`@theme` block)          |
| Dark colours                                   | `app/globals.css` (`.dark` block)           |
| The logo mark, lockups, favicon                | `components/brand/Logo.tsx`, `app/icon.svg` |
| Animation timings and entrance variants        | `lib/animations.ts`                         |
| Section layout (not its words)                 | the matching file in `components/sections/` |

## Company facts

Every editable fact lives in `data/company.ts`, and the address, mailbox and
number are supplied — they render in the Company Information table and again on
the contact page, read from that one place so the two can never drift. The two
actionable rows carry a `mailto:` and a `tel:`.

The placeholder mechanism is still in force for anything added later: a field
whose `value` is `null` renders as an explicit **"To be provided"** slot rather
than as invented data, and needs no layout change on the day it is filled —
which is exactly how these three went in.

`site.url` resolves in three steps, so a deploy is correct without a code
change: an explicit `NEXT_PUBLIC_SITE_URL` wins, Vercel's own production
hostname is used when the build runs there, and `https://adhikarsa.co.id` is the
fallback for a local build. It drives canonical URLs, the sitemap, `robots.txt`
and the OpenGraph tags.

Nothing on this site claims a client, hospital partner, government
relationship, testimonial, award, certification, compliance status, regulatory
approval, customer count, revenue, headcount, or company history, because none
was supplied. `components/ui/TrustShelf.tsx` is the single insertion point for
verified material — populate `company.trust` and it renders; leave it empty and
the site simply never makes the claim.

## Deploying to Vercel

The Next.js app is **not** at the repository root — it lives in `adhikarsa/`,
alongside an older static site. Vercel must be told that, or it will try to
build the wrong thing:

> Project → Settings → Build and Deployment → **Root Directory** → `adhikarsa`

Everything else is detected automatically. No build command, output directory or
install command needs overriding, and `STATIC_EXPORT` must stay unset — it
switches the build to the `file://` export and would break routing on a server.

### Environment variables

| Name | Required | What it does |
| ---- | -------- | ------------ |
| `RESEND_API_KEY` | for the contact form | API key from [resend.com](https://resend.com). Without it the form refuses honestly and shows the direct channels instead of pretending to send. |
| `CONTACT_TO_EMAIL` | no | Where enquiries land. Defaults to `company.contactEmail`. |
| `CONTACT_FROM_EMAIL` | no | The `From:` header, e.g. `Adhikarsa <hello@adhikarsa.co.id>`. Defaults to Resend's shared testing sender, which works immediately but is not a good look in production — set this once the domain is verified with Resend. |
| `NEXT_PUBLIC_SITE_URL` | no | Once a custom domain is attached, e.g. `https://adhikarsa.co.id`. Until then Vercel's own hostname is used and canonical URLs stay correct. |

## The contact form

`POST /api/contact` → validates → forwards to the company mailbox via Resend's
HTTP API. No SDK: one `fetch`, no dependency to keep current.

It is a route handler rather than a Server Action for one practical reason — a
Server Action makes `npm run export` fail outright, while a handler can simply
be parked by the export script alongside `robots` and `sitemap`.

Four things worth knowing:

- **Validation is repeated, not shared.** The browser copy exists to give fast
  feedback; the copy in the route handler is the one that decides, because
  anything can POST to a public URL.
- **A failure is never dressed up as a success.** If `RESEND_API_KEY` is
  missing, or the provider refuses, the form says exactly that and points at the
  mailbox and the phone number. It never shows a thank-you for a message nobody
  received.
- **The direct channels never go away.** They sit beside the form at every
  state, success included. A form is a promise to reply later; the mailbox and
  the number work now.
- **The flood guard is a speed bump.** The in-memory map is per-instance and
  resets on a cold start, so it stops a script hammering one warm instance and
  nothing more. Configure Vercel's Firewall before advertising the form
  anywhere. A honeypot field catches the naive bots and is dropped with a `200`,
  so they learn nothing.

Parked during `npm run export`, because a folder you open from disk has no
server. The form still renders there and falls back to the direct channels.

## Structure

```
app/
  layout.tsx        root shell: <html>, fonts, the pre-paint theme script
  page.tsx          the locale gateway at `/`
  [locale]/         every page, once per language
    layout.tsx      navbar, footer, per-locale metadata and hreflang
    page.tsx        home
    company/ solutions/ technology/ innovation/ contact/
    privacy/ terms/
  globals.css       the whole design system: light @theme, dark override
  sitemap.ts robots.ts opengraph-image.tsx icon.svg
components/
  brand/       LogoMark + horizontal and stacked lockups
  layout/      navbar, footer, scroll progress, page header, theme + language
               toggles, ThemeScript, structured data
  motion/      Reveal, AnimatedText, MotionPath, Magnetic, AnimatedCounter
  sections/    one file per band; pages compose them
  ui/          Button, Section, SectionHeader, Card, Eyebrow, TrustShelf
  visualizations/
               IntelligenceBoard      hero ecosystem board
               HospitalEcosystem      nine-node, five-stage scroll diagram
               WorkflowVisualization  automation pipeline
               ArchitectureDiagram    three interactive layers
               ResearchNetwork        R&D constellation
               CapabilityGlyph        six capability micro-diagrams
data/
  company.ts        company facts and profile fields
  dictionaries/     en.ts, id.ts — every visible string
lib/           animations, i18n, routes, class utils, media-query hook
```

## Pages, in two languages

Every route exists once per locale: `/en/solutions` and `/id/solutions`, with
no implicit default hiding at the root. The symmetry is the point — an
Indonesian company profile shown to Indonesian institutions should not treat
Indonesian as a translation of the "real" site, and every page stays shareable
as a URL in the language it was read in. `/` itself renders nothing but a
gateway: a script picks up a stored choice, then `navigator.languages`, then
the default, with a `<meta refresh>` and a plain link behind it so the page is
never a dead end without JavaScript.

`data/dictionaries/en.ts` is the source of truth and `Dictionary` is inferred
from it — deliberately without `as const`, because literal string types would
make every other language fail to satisfy the type. Widening to `string` is
exactly what turns the English file into a contract `id.ts` must fulfil: add a
key in English and TypeScript fails the build until Indonesian has it too.

`<html lang>` is set by the same blocking script that applies the theme, read
off the first path segment. The root layout owns `<html>` and sits above every
dynamic segment, so it has nothing to read the locale from and ships the default
tag; correcting that in an effect would leave the accessibility tree wrong for
the whole first frame, and a screen reader that has already started speaking
Indonesian in an English voice does not go back. Doing it before paint closes
that window. The served HTML therefore still carries `lang="en"` on Indonesian
pages — visible to a crawler that executes no JavaScript, though `hreflang`,
`og:locale` and the Indonesian content itself all state the language plainly.
Making the markup itself correct means two root layouts in route groups, with
`global-not-found` to match; that is the upgrade path if it is ever needed.

Headline `lines` arrays are **re-authored per language, not translated line by
line**. Each entry is one visual line behind its own reveal mask, and
Indonesian runs longer than English word for word, so a faithful line-for-line
translation would wrap and break the composition.

## Light and dark

One class on `<html>`, nothing more. `@theme` declares the light values and
`.dark` redefines *the same* custom properties, so almost nothing branches on
the theme — `bg-surface` and `text-ink` simply mean something different once the
class is present. Adding a colour means adding it in both blocks; nothing else
has to know. The `dark:` variant is reserved for the one case where a token
cannot help, which is the toggle itself: its two icons have to react to the
class rather than be recoloured by it.

`components/layout/ThemeScript.tsx` runs blocking in `<head>` and applies the
stored choice before first paint, which is what prevents the white flash a
dark-mode visitor would otherwise get on every navigation. It also owns the
*switching*, through one delegated click listener — `ThemeToggle` renders the
control and has no `onClick`, no state, and no `"use client"`. Both faces of the
button are drawn from the same `.dark` class in CSS, so it cannot disagree with
the page, it works from the first paint rather than being dead until the bundle
arrives, and it still works in the static export, where React never hydrates at
all.

Contrast was recomputed for the dark palette rather than assumed. The brand
blue lightens to `#5B93FF` so it reads on a dark ground, and white text on that
blue measures 2.97:1 — a failure. Hence `--color-on-brand`, which flips to near
black in dark mode and takes the pairing to 6.37:1.

## Brand

The mark is **redrawn as vector geometry** in `components/brand/Logo.tsx`, not
embedded as an image: it stays sharp at 16px and at billboard size, costs a few
hundred bytes, and inherits `currentColor` — which is what lets one component
serve the light lockup, the dark lockup and the app icon from a single source.

Construction: a square rotated 45°, cut by a horizontal gap set 24.5% of the
half-height above centre, with the gap at 6.8% of the mark's height. At any
horizontal cut the half-width equals the distance from the apex, which is what
keeps every flank at a true 45°. Change those two ratios in `MARK` and the
whole system — navbar, footer, signature, favicon, social card — follows.

The mark is monochrome by design, exactly as supplied: ink on light surfaces,
white on the navy band. It is never tinted blue.

The accent moved from the originally specified `#0B5CFF` to **`#1046D6`** so a
fully saturated blue would not be the only maximally saturated element sitting
beside an achromatic mark. It also lifts white-on-blue contrast from 5.26:1 to
7.32:1. Revert by restoring `#0B5CFF` in the `@theme` block.

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
- **A page is one composition, not a stack of sections.** `PageHeader` on an
  inner route and the first section below it must not repeat each other — the
  company masthead deliberately says what the page contains rather than
  restating the About headline verbatim, which is what it did when the page
  was first split out of the single-scroll site.
- **Headlines are measured against their column, not the viewport.**
  `text-display` and `text-headline` are `min(clamp(…vw…), …cqi)`, and the box
  that holds them carries `.measure` (`container-type: inline-size`). A viewport
  clamp alone cannot keep an authored line on one line: the same headline set in
  a five-column well is a third of the width it has full-bleed and would render
  at the same size. The second term steps the type down to fit the well it is
  actually in — which is also what absorbs Indonesian running longer than
  English. Without a `.measure` ancestor the `cqi` term resolves against the
  viewport, where it sits far above the clamp and is therefore inert.
- **Reduced motion turns entrances off, not down.** Framer's
  `reducedMotion="user"` drops the transform and keeps the opacity, so a reader
  who asked for less motion still watched forty elements fade in — and anything
  that never quite met the viewport threshold stayed at zero. A
  `prefers-reduced-motion` rule now forces every `[data-reveal]` to its finished
  state, which is also exactly what the static export does for a different
  reason.
- **Reduced motion is handled in two places**: `MotionConfig reducedMotion="user"`
  for Framer, and a global media query that neutralises CSS animation.
- **`.no-js`** is stripped by an inline script before first paint. If it never
  runs, the stylesheet reveals everything marked `data-reveal`, so the whole
  page is readable without JavaScript.
