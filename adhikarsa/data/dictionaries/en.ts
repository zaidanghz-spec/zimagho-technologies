/**
 * ============================================================================
 * ENGLISH DICTIONARY — the source of truth for every string on the site
 * ----------------------------------------------------------------------------
 * `Dictionary` is typed *from* this object, so `id.ts` cannot drift: a missing
 * or misspelled key is a compile error, not a blank space discovered in
 * production.
 *
 * Headline `lines` arrays are authored line breaks, not accidents. They differ
 * per language because Indonesian words are longer, and the masked line reveal
 * only works when each entry is genuinely one line at every breakpoint.
 * ==========================================================================
 */

export const en = {
  meta: {
    siteName: "Adhikarsa Mahatama Teknologi",
    home: {
      title: "Adhikarsa Mahatama Teknologi | Healthcare Technology & Automation",
      description:
        "PT Adhikarsa Mahatama Teknologi develops healthcare technology, hospital automation, artificial intelligence, system integration, and custom digital solutions for modern institutions.",
    },
    company: {
      title: "Company",
      description:
        "PT Adhikarsa Mahatama Teknologi — who we are, how we approach engineering, and the formal company profile.",
    },
    solutions: {
      title: "Solutions",
      description:
        "Hospital automation, system integration, artificial intelligence, custom software development, operational intelligence, and research and development.",
    },
    technology: {
      title: "Technology",
      description:
        "How Adhikarsa connects hospital systems into one intelligent ecosystem, and the three-layer architecture behind it.",
    },
    innovation: {
      title: "Innovation",
      description:
        "Research and development at Adhikarsa: artificial intelligence, computer vision, automation, healthcare data, intelligent infrastructure, and human–computer interaction.",
    },
    contact: {
      title: "Contact",
      description:
        "Partner with Adhikarsa to explore automation, AI, systems integration, and custom technology development for your organization.",
    },
  },

  nav: {
    home: "Home",
    company: "Company",
    solutions: "Solutions",
    technology: "Technology",
    innovation: "Innovation",
    contact: "Contact",
    primaryCta: "Talk to Us",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to content",
    homeAria: "Adhikarsa — home",
  },

  theme: {
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
  },

  language: {
    label: "Language",
    switchTo: "Switch language",
  },

  actions: {
    exploreSolutions: "Explore Our Solutions",
    companyProfile: "Company Profile",
    startConversation: "Start a Conversation",
    readMore: "Read more",
    backHome: "Return to homepage",
    viewSolutions: "View all solutions",
    viewTechnology: "See the technology",
    viewCompany: "About the company",
  },

  home: {
    hero: {
      eyebrow: "Healthcare Technology • Automation • AI",
      lines: ["Engineering intelligent", "systems for modern", "healthcare."],
      capabilities: [
        "Technology Development",
        "Hospital Automation",
        "Artificial Intelligence",
        "System Integration",
      ],
    },
    /** Short orientation band: who we are, in one screen. */
    intro: {
      eyebrow: "About Adhikarsa",
      lines: ["Technology should make", "complex institutions", "work intelligently."],
      body: [
        "PT Adhikarsa Mahatama Teknologi is a technology company focused on developing integrated digital systems, automation, and intelligent solutions for modern institutions.",
        "Our approach combines software engineering, systems integration, automation, and artificial intelligence to solve complex operational challenges.",
      ],
    },
    pillars: {
      items: [
        {
          n: "01",
          title: "Intelligence",
          copy: "Technology that turns information into better decisions.",
        },
        {
          n: "02",
          title: "Integration",
          copy: "Connecting fragmented systems into a unified ecosystem.",
        },
        {
          n: "03",
          title: "Automation",
          copy: "Transforming repetitive processes into efficient digital workflows.",
        },
      ],
    },
    /** Teaser that sends the reader into the dedicated pages. */
    directory: {
      eyebrow: "Explore",
      lines: ["Four ways into", "the company."],
      items: [
        {
          key: "company",
          label: "Company",
          copy: "Who we are, how we build, and the formal company profile.",
        },
        {
          key: "solutions",
          label: "Solutions",
          copy: "Six disciplines, from hospital automation to research and development.",
        },
        {
          key: "technology",
          label: "Technology",
          copy: "How a hospital becomes one connected ecosystem, layer by layer.",
        },
        {
          key: "innovation",
          label: "Innovation",
          copy: "The research tracks shaping what we build next.",
        },
      ],
    },
  },

  company: {
    /**
     * The masthead deliberately does not repeat `home.intro`, which the About
     * band directly below it already carries word for word. Its job is to say
     * what this particular page contains.
     */
    hero: {
      eyebrow: "Company",
      lines: ["A technology company", "built around", "complex institutions."],
      body: "Who we are, how we approach engineering, and the formal company profile.",
    },
    approach: {
      eyebrow: "Our Approach",
      lines: ["Built for environments", "where technology matters."],
      blocks: [
        {
          n: "01",
          title: "Reliability",
          copy: "Technology designed around operational continuity and dependable system behavior.",
        },
        {
          n: "02",
          title: "Interoperability",
          copy: "Systems designed to work with existing infrastructure and institutional technology.",
        },
        {
          n: "03",
          title: "Adaptability",
          copy: "Solutions built around real workflows and evolving organizational requirements.",
        },
        {
          n: "04",
          title: "Long-Term Engineering",
          copy: "We approach technology as infrastructure that must continue to deliver value as organizations grow.",
        },
      ],
    },
    statement: {
      first: ["We don't build technology", "for technology's sake."],
      second: ["We build it to make", "complex systems", "work better."],
    },
    profile: {
      eyebrow: "Company Profile",
      lines: ["Company", "information."],
      toBeProvided: "To be provided",
      fields: {
        company: "Company",
        industry: "Industry",
        coreFocus: "Core Focus",
        headquarters: "Headquarters",
        email: "Email",
        website: "Website",
      },
      values: {
        industry: "Technology & Digital Solutions",
        coreFocus: [
          "Healthcare Technology",
          "Automation",
          "Artificial Intelligence",
          "Software Development",
          "Systems Integration",
        ],
        headquartersNote: "Indonesia",
      },
    },
  },

  solutions: {
    hero: {
      eyebrow: "Our Capabilities",
      lines: ["Technology built around", "real operational needs."],
      body: "Six disciplines, each deployable on its own and stronger in combination. The connective layer between them is the product.",
    },
    capabilities: [
      {
        n: "01",
        title: "Hospital Automation",
        copy: "Design intelligent workflows that reduce repetitive processes and improve operational coordination.",
      },
      {
        n: "02",
        title: "System Integration",
        copy: "Connect hospital systems, applications, databases, devices, and digital infrastructure.",
      },
      {
        n: "03",
        title: "Artificial Intelligence",
        copy: "Develop AI-powered tools designed to support analysis, automation, prioritization, and institutional decision-making.",
      },
      {
        n: "04",
        title: "Custom Software Development",
        copy: "Develop enterprise software around the specific requirements and workflows of an organization.",
      },
      {
        n: "05",
        title: "Data & Operational Intelligence",
        copy: "Transform operational information into meaningful insights through integrated analytics and visualization.",
      },
      {
        n: "06",
        title: "Research & Development",
        copy: "Explore emerging technologies and develop new solutions for future institutional challenges.",
      },
    ],
    automation: {
      eyebrow: "Process Automation",
      lines: ["Complex workflows.", "Simplified by technology."],
      body: "We design automation around existing operational processes, helping institutions reduce manual work while maintaining visibility and control.",
      exampleLabel: "Example — patient journey",
      phases: ["Input", "System", "Automation", "Intelligence", "Action"],
      steps: [
        { label: "Patient Registration", phase: "Input" },
        { label: "Verification", phase: "System" },
        { label: "Department Routing", phase: "Automation" },
        { label: "Clinical Process", phase: "Automation" },
        { label: "Supporting Services", phase: "Automation" },
        { label: "Administration", phase: "System" },
        { label: "Analytics", phase: "Intelligence" },
      ],
    },
    engineering: {
      eyebrow: "Engineering",
      lines: ["From idea", "to infrastructure."],
      phases: [
        {
          n: "01",
          title: "Discover",
          copy: "Understand operational requirements and institutional challenges.",
        },
        {
          n: "02",
          title: "Design",
          copy: "Translate workflows into scalable system architecture.",
        },
        {
          n: "03",
          title: "Develop",
          copy: "Build reliable software, integrations, automation, and intelligent systems.",
        },
        {
          n: "04",
          title: "Integrate",
          copy: "Connect technology with existing infrastructure.",
        },
        {
          n: "05",
          title: "Evolve",
          copy: "Continuously improve systems as institutional needs develop.",
        },
      ],
    },
  },

  technology: {
    hero: {
      eyebrow: "Healthcare Technology",
      lines: ["Connecting the hospital", "into one intelligent", "ecosystem."],
      body: "Modern hospitals depend on numerous clinical, operational, administrative, and financial systems. Adhikarsa develops technology that helps these systems communicate and operate as a more connected digital environment.",
    },
    ecosystem: {
      coreTitle: "INTELLIGENT HOSPITAL",
      coreSubtitle: "Adhikarsa intelligence layer",
      nodes: [
        "Clinical Systems",
        "Patient Services",
        "Laboratory",
        "Radiology",
        "Pharmacy",
        "Operations",
        "Finance",
        "Management",
        "Infrastructure",
      ],
      stages: [
        "Independent systems",
        "Connections established",
        "Data in motion",
        "Intelligence layer active",
        "One connected ecosystem",
      ],
    },
    architecture: {
      eyebrow: "Technology Architecture",
      lines: ["Designed to connect.", "Built to evolve."],
      body: "Three layers, deliberately separable. Point at one to trace what it connects to.",
      layers: [
        {
          name: "Experience",
          desc: "What people in the institution actually use.",
          items: ["Management Dashboard", "Clinical Applications", "Operational Systems"],
        },
        {
          name: "Intelligence",
          desc: "Where process logic and reasoning live.",
          items: ["Automation Engine", "AI Systems", "Analytics", "Rules Engine"],
        },
        {
          name: "Infrastructure",
          desc: "The systems and data already in place.",
          items: ["APIs", "Databases", "Hospital Systems", "IoT", "Cloud", "On-Premise"],
        },
      ],
      highlightAria: "layer — highlight connections",
    },
    board: {
      coreLabel: "Core",
      coreSubtitle: "Intelligence Layer",
      systems: [
        "Hospital Information System",
        "Electronic Medical Record",
        "Laboratory",
        "Radiology",
        "Pharmacy",
        "Operations",
        "Finance",
        "IoT Infrastructure",
      ],
    },
  },

  innovation: {
    hero: {
      eyebrow: "Innovation",
      lines: ["Exploring what", "comes next."],
      body: "Our research and development initiatives explore technologies that can improve automation, intelligence, and human–technology collaboration across healthcare and enterprise environments.",
    },
    trackLabel: "Research track",
    themes: [
      {
        label: "Artificial Intelligence",
        detail:
          "Models scoped to institutional decisions — ranking, forecasting, and surfacing what a team should look at next.",
      },
      {
        label: "Computer Vision",
        detail:
          "Applied perception for operational contexts: asset tracking, occupancy, and environment monitoring.",
      },
      {
        label: "Automation",
        detail:
          "Process engines that carry state across departments, so a step never restarts from a blank form.",
      },
      {
        label: "Healthcare Data",
        detail:
          "Interoperability, schema reconciliation, and governance for data that was never designed to be joined.",
      },
      {
        label: "Intelligent Infrastructure",
        detail:
          "Buildings and devices treated as addressable systems, monitored and coordinated alongside software.",
      },
      {
        label: "Human–Computer Interaction",
        detail:
          "Interfaces for high-pressure environments, where clarity under load matters more than density.",
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    lines: ["Let's build intelligent", "systems together."],
    body: "Partner with Adhikarsa to explore automation, AI, systems integration, and custom technology development for your organization.",
    noAddressNote: "Contact details are listed in the company profile.",
    detailsHeading: "How to reach us",
    detailsBody:
      "We work with hospitals, healthcare organizations, and institutions exploring automation, AI, system integration, or custom technology development.",
  },

  footer: {
    tagline: "Technology for intelligent institutions.",
    navHeading: "Navigation",
    capabilitiesHeading: "Capabilities",
    capabilities: [
      "Healthcare Technology",
      "Automation",
      "Artificial Intelligence",
      "Software Development",
    ],
    rights: "All rights reserved.",
    privacy: "Privacy",
    terms: "Terms",
  },

  legal: {
    draftNotice: "Working draft — pending review by counsel",
    lastReviewed: "Last reviewed",
    privacy: {
      title: "Privacy",
      intro:
        "How PT Adhikarsa Mahatama Teknologi handles information collected through this website and through institutional engagements.",
      sections: [
        {
          heading: "Scope",
          body: "This statement covers the public website only. Data handling inside a deployed system is governed by the agreement with the institution operating it, and by that institution's own policies.",
        },
        {
          heading: "Information we collect",
          body: "This site does not run analytics, advertising, or third-party tracking, and it does not set cookies. Your language and theme preferences are stored in your own browser and never leave your device. If you contact us by email, we hold that correspondence for the purpose of responding to it.",
        },
        {
          heading: "Institutional engagements",
          body: "Where Adhikarsa processes data on behalf of an institution, the institution remains the controller of that data. Access, retention, and governance terms are defined per engagement.",
        },
        {
          heading: "Contact",
          body: "Questions about this statement can be directed to the address listed in the company profile.",
        },
      ],
    },
    terms: {
      title: "Terms",
      intro: "Terms governing use of this website.",
      sections: [
        {
          heading: "Purpose of this site",
          body: "This website describes the capabilities and engineering approach of PT Adhikarsa Mahatama Teknologi. It is informational and does not constitute an offer, a warranty, or a commitment to deliver any specific system.",
        },
        {
          heading: "Illustrative interfaces",
          body: "Interfaces, dashboards, metrics, and diagrams shown on this site are conceptual designs. They are not screenshots of a deployed system and do not represent any hospital, institution, or dataset.",
        },
        {
          heading: "Intellectual property",
          body: "The content, design, and code of this site are the property of PT Adhikarsa Mahatama Teknologi unless stated otherwise.",
        },
        {
          heading: "Changes",
          body: "These terms may be updated. Continued use of the site follows the version published here.",
        },
      ],
    },
  },

  notFound: {
    eyebrow: "Error 404",
    heading: "No route to that resource.",
    body: "The page you requested is not part of this system.",
  },
};

/**
 * Deliberately no `as const`: literal string types would make every other
 * language fail to satisfy `Dictionary`. Widening to `string` is exactly what
 * turns this into a contract other translations must fulfil.
 */
export type Dictionary = typeof en;
