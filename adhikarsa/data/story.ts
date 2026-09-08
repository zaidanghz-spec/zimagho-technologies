/**
 * ============================================================================
 * THE NARRATIVE
 * ----------------------------------------------------------------------------
 * Every word on the storytelling site, in reading order, so the argument can be
 * checked end to end without opening a single component.
 *
 * Two rules held throughout:
 *
 *   1. Nothing is claimed that has not been supplied. No clients, hospitals,
 *      universities, partners, advisors, funding, publications, user counts or
 *      named people appear anywhere below. The initiatives are framed as what
 *      they are — work in development — and the disciplines section names
 *      disciplines, not individuals.
 *   2. Sentences are short because the type is large. At 9vw a subordinate
 *      clause becomes a paragraph, so the writing is paced for the scale it is
 *      set at, not trimmed afterwards.
 * ==========================================================================
 */

export const story = {
  nav: {
    links: [
      { label: "Company", href: "#company" },
      { label: "Technology", href: "#technology" },
      { label: "Research", href: "#research" },
      { label: "Contact", href: "#contact" },
    ],
    cta: "Work with us",
    open: "Open menu",
    close: "Close menu",
    skip: "Skip to content",
  },

  /* 01 — HERO ------------------------------------------------------------- */
  hero: {
    marker: "Adhikarsa",
    /* Three short lines, not one sentence broken in two: at this size the
       longest entry has to survive a 335px phone and a full-bleed desktop
       field without wrapping, and 16 characters is what fits both. */
    lines: ["Technology built", "for meaningful", "progress."],
    body: "We build intelligent technology for healthcare, education, and the systems shaping tomorrow.",
    cta: "Explore Adhikarsa",
    scroll: "Scroll",
  },

  /* 02 — THE WORLD IS CHANGING -------------------------------------------- */
  world: {
    marker: "Chapter 01 — The world",
    beats: [
      { line: "Technology is advancing.", tone: "paper" },
      { line: "Faster than ever.", tone: "paper" },
      { line: "But progress isn't distributed evenly.", tone: "cobalt" },
    ],
    ledger: {
      lead: "Five things are true at once.",
      items: [
        { n: "01", text: "Healthcare remains fragmented." },
        { n: "02", text: "Education remains unequal." },
        { n: "03", text: "Organisations remain inefficient." },
        { n: "04", text: "Data remains underused." },
        { n: "05", text: "Technology often adds complexity instead of removing it." },
      ],
    },
  },

  /* 03 — THE PROBLEM ------------------------------------------------------ */
  problem: {
    marker: "Chapter 02 — The problem",
    heading: ["The gap isn't capability.", "It's application."],
    body: "The tools exist. What is missing is the work of fitting them to how people actually operate.",
    fields: [
      {
        key: "health",
        label: "Healthcare",
        line: "Critical information exists, but often across disconnected systems.",
        detail:
          "A clinician's picture of a patient is assembled by hand from records that were never designed to be read together.",
      },
      {
        key: "education",
        label: "Education",
        line: "Knowledge is everywhere, but personalised access is still limited.",
        detail:
          "The same material reaches every learner at the same pace, and the ones it does not fit are the ones who need it most.",
      },
      {
        key: "organisations",
        label: "Organisations",
        line: "Teams have powerful tools, yet many workflows remain repetitive.",
        detail:
          "Work moves between systems through people — copied, re-keyed, chased — and the cost is invisible until it is counted.",
      },
      {
        key: "ai",
        label: "Artificial intelligence",
        line: "Capability is growing quickly. Useful implementation is not.",
        detail:
          "A model that performs well in evaluation still has to earn a place inside a workflow someone is responsible for.",
      },
    ],
  },

  /* 04 — THE BELIEF ------------------------------------------------------- */
  belief: {
    marker: "Chapter 03 — The belief",
    beats: [
      "We believe technology should solve meaningful problems.",
      "Not create more complexity.",
    ],
    resolve: "That belief is Adhikarsa.",
  },

  /* 05 — MEET ADHIKARSA --------------------------------------------------- */
  company: {
    marker: "Chapter 04 — The company",
    heading: ["Meet Adhikarsa."],
    body: "Adhikarsa is an Indonesian technology company building intelligent products and digital systems across healthcare, education, artificial intelligence, and enterprise technology.",
    philosophy:
      "We bring together technology, domain knowledge, and considered design to turn complex problems into systems people can actually use.",
    facts: [
      { k: "Based in", v: "Indonesia" },
      { k: "Working across", v: "Health · Education · AI · Systems" },
      { k: "Stage", v: "Building" },
    ],
  },

  /* 06 — WHAT WE BUILD ---------------------------------------------------- */
  verticals: {
    marker: "Chapter 05 — What we build",
    heading: ["Three directions.", "One way of working."],
    items: [
      {
        key: "health",
        index: "01",
        name: "Adhikarsa Health",
        positioning: "Turning complex medical information into usable intelligence.",
        areas: [
          "Clinical AI",
          "Decision support",
          "Healthcare workflow",
          "Medical data infrastructure",
          "Research technology",
          "Digital health platforms",
        ],
        note: "Built to support clinicians, never to replace clinical judgement.",
      },
      {
        key: "education",
        index: "02",
        name: "Adhikarsa Education",
        positioning: "Making learning more adaptive, accessible, and measurable.",
        areas: [
          "Intelligent tutoring",
          "Personalised learning",
          "Assessment technology",
          "Learning analytics",
          "Academic platforms",
          "Education management",
        ],
        note: "Adaptive where it helps the learner, not where it flatters the system.",
      },
      {
        key: "systems",
        index: "03",
        name: "Adhikarsa Systems",
        positioning: "Turning fragmented workflows into intelligent systems.",
        areas: [
          "AI automation",
          "Internal operating systems",
          "Workflow platforms",
          "Enterprise software",
          "Data systems",
          "Operational dashboards",
        ],
        note: "Automation that removes steps, rather than adding a screen.",
      },
    ],
  },

  /* 07 — HOW WE BUILD ----------------------------------------------------- */
  process: {
    marker: "Chapter 06 — How we build",
    heading: ["From problem", "to working technology."],
    stages: [
      { n: "01", name: "Understand", line: "We begin with the problem, not the technology." },
      { n: "02", name: "Design", line: "We turn complexity into simple, usable experiences." },
      { n: "03", name: "Build", line: "We engineer reliable and scalable systems." },
      { n: "04", name: "Validate", line: "We test with real users, experts, and real workflows." },
      { n: "05", name: "Deploy", line: "We move technology beyond prototypes and into real environments." },
      { n: "06", name: "Improve", line: "We learn from usage and keep refining the system." },
    ],
  },

  /* 08 — TECHNOLOGY ------------------------------------------------------- */
  technology: {
    marker: "Chapter 07 — Technology",
    heading: ["Built with intelligence."],
    body: "Technology is only valuable when it works inside the reality of the people using it.",
    capabilities: [
      { name: "Artificial intelligence", line: "Models chosen for the decision they support, not for novelty." },
      { name: "Data", line: "Structure first. Insight is what structure makes possible." },
      { name: "Software engineering", line: "Systems built to be maintained, not only to be shipped." },
      { name: "Human-centred design", line: "The interface is where the technology either works or does not." },
      { name: "Domain expertise", line: "Built alongside the people who know the work." },
      { name: "Security", line: "Sensitive domains set the standard, from the first line." },
      { name: "Scalable infrastructure", line: "Built to hold up when it matters most." },
    ],
  },

  /* 09 — INITIATIVES ------------------------------------------------------ */
  research: {
    marker: "Chapter 08 — In development",
    heading: ["What we're building now."],
    disclaimer:
      "These are active development and research directions, not released products. Nothing here is deployed, and no results are claimed.",
    items: [
      {
        key: "clinical",
        index: "01",
        name: "Clinical intelligence",
        tagline: "Turning medical data into actionable insight.",
        body: "A working direction: bring scattered clinical information into one structured view, and support the decision rather than making it.",
        capabilities: [
          "AI-assisted analysis",
          "Clinical decision support",
          "Structured medical information",
          "Human-centred workflow",
        ],
        status: "In development",
      },
      {
        key: "learning",
        index: "02",
        name: "Adaptive learning",
        tagline: "Learning that adapts to the learner.",
        body: "A working direction: read where a learner actually is, and change what comes next — pace, difficulty, and explanation.",
        capabilities: [
          "Learner modelling",
          "Adaptive sequencing",
          "Assessment analytics",
          "Educator visibility",
        ],
        status: "In development",
      },
      {
        key: "os",
        index: "03",
        name: "Operating layer",
        tagline: "An intelligent operating layer for modern organisations.",
        body: "A working direction: sit above the tools an organisation already runs, and let the repetitive parts of the work run themselves.",
        capabilities: [
          "Workflow automation",
          "Systems integration",
          "Operational visibility",
          "Role-aware interfaces",
        ],
        status: "In development",
      },
    ],
  },

  /* 10 — PRINCIPLES ------------------------------------------------------- */
  principles: {
    marker: "Chapter 09 — Principles",
    heading: ["How we decide."],
    items: [
      {
        n: "01",
        name: "Purpose before technology",
        line: "We don't build technology because we can. We build it because it should exist.",
      },
      {
        n: "02",
        name: "Human-centred",
        line: "Complex technology should feel simple to use.",
      },
      {
        n: "03",
        name: "Evidence-driven",
        line: "Important systems require rigour, not assumptions.",
      },
      {
        n: "04",
        name: "Interdisciplinary",
        line: "The best technology emerges when engineers and domain experts build together.",
      },
      {
        n: "05",
        name: "Built for reality",
        line: "Technology must work beyond the prototype.",
      },
      {
        n: "06",
        name: "Built from Indonesia",
        line: "Designed around the realities and the opportunities here.",
      },
    ],
  },

  /* 11 — DISCIPLINES ------------------------------------------------------ */
  people: {
    marker: "Chapter 10 — The work",
    heading: ["Technology alone", "is not enough."],
    disciplines: [
      "Doctors",
      "Researchers",
      "Educators",
      "Engineers",
      "Designers",
      "Operators",
    ],
    close: ["Different disciplines.", "One shared problem."],
    note: "Adhikarsa builds with practitioners from each of these fields.",
  },

  /* 12 — VISION ----------------------------------------------------------- */
  vision: {
    marker: "Chapter 11 — The future",
    beats: [
      "Indonesia doesn't need more technology.",
      "It needs better technology.",
      "Technology that understands people.",
      "Technology that solves real problems.",
      "Technology built with purpose.",
    ],
    resolve: "That's what we're building.",
    signature: "Adhikarsa",
  },

  /* 13 — FINAL CTA -------------------------------------------------------- */
  contact: {
    marker: "Chapter 12 — Begin",
    heading: ["Let's build", "what should exist."],
    body: "We collaborate with institutions, organisations, researchers, and people working on meaningful problems.",
    primary: "Work with Adhikarsa",
    secondary: "Explore our technology",
    availability: "Open to collaboration, research partnerships, and engineering roles.",
  },

  /* 14 — FOOTER ----------------------------------------------------------- */
  footer: {
    tagline: "Technology built for meaningful progress.",
    columns: [
      {
        heading: "Company",
        links: [
          { label: "The company", href: "#company" },
          { label: "Principles", href: "#principles" },
          { label: "How we build", href: "#process" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        heading: "Work",
        links: [
          { label: "Health", href: "#health" },
          { label: "Education", href: "#education" },
          { label: "Systems", href: "#systems" },
          { label: "Research", href: "#research" },
        ],
      },
      {
        heading: "More",
        links: [
          { label: "Technology", href: "#technology" },
          { label: "Corporate profile", href: "/en" },
          { label: "Profil perusahaan", href: "/id" },
        ],
      },
    ],
    location: "Indonesia",
    legalName: "PT Adhikarsa Mahatama Teknologi",
    legal: [
      { label: "Privacy", href: "/en/privacy" },
      { label: "Terms", href: "/en/terms" },
    ],
    /* Placeholders on purpose — no account is claimed until one exists. */
    socialNote: "Social channels to be announced.",
  },
} as const;

export type Story = typeof story;
