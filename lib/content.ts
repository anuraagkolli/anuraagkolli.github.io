export type Link = {
  label: string
  href: string
}

/**
 * The long-form content behind an entry, rendered on its own page by
 * components/detail-page.tsx.
 */
export type Detail = {
  /** Page heading, e.g. "2026 Kleiner Perkins Engineering Fellow". */
  title: string
  /** Single meta line under the heading: org, place, dates. */
  meta: string
  /** Body paragraphs, rendered in the prose serif. */
  body: string[]
  links?: Link[]
}

/**
 * A row in the work or projects list: a name on the left, one or more detail
 * lines in the middle, and a right-aligned date column. An entry with an
 * `href` renders as a link to the page carrying its `detail`.
 */
export type Entry = {
  /** Middle column, the line that carries the weight. */
  name: string
  /** Right column, small and gray: the context the name does not say. */
  tag?: string
  /** Extra middle lines. Only the education row still uses these. */
  lines: string[]
  /** Left column. */
  dates: string[]
  href?: string
  /** Keep the lead line on one line at sm and up. */
  nowrap?: boolean
  detail?: Detail
}

export const profile = {
  name: "Anuraag Kolli",
  tagline: "Building software that survives contact with production.",
}

export const nav: Link[] = [
  { label: "about", href: "/about/" },
  { label: "projects", href: "/projects/" },
]

export const social: (Link & { tip: string })[] = [
  { label: "github", href: "https://github.com/anuraagkolli", tip: "GitHub, where the projects live" },
  {
    label: "linkedin",
    href: "https://linkedin.com/in/anuraag-kolli",
    tip: "LinkedIn, for the formal version",
  },
  { label: "resume", href: "/Anuraag_2026_Resume.pdf", tip: "Resume, one page, PDF" },
  { label: "email", href: "mailto:anukolli05@gmail.com", tip: "anukolli05@gmail.com" },
]

export const work: Entry[] = [
  {
    name: "kp fellow",
    tag: "@ inkitt",
    lines: [],
    dates: ["2026"],
    href: "/kleiner-perkins/",
    detail: {
      title: "2026 Kleiner Perkins Engineering Fellow",
      meta: "Inkitt, San Francisco - May to Aug 2026",
      body: [
        "Kleiner Perkins runs a fellowship that places engineers inside its portfolio companies for a summer. Mine was Inkitt, a Series C storytelling startup whose apps, Galatea and CandyJar, serve millions of recommendations a day. I worked on the machine learning that decides what gets shown and what a reader is worth.",
        "I architected a reusable pLTV revenue-prediction system: a two-stage hurdle model with a calibrated CatBoost head, separating whether a user will ever pay from how much they will pay. It reached 7.2x top-decile lift on a 2.2M-user cohort and now runs daily through an Airflow pipeline that feeds CRM and marketing.",
        "I then rebuilt the core recommendation engine behind both apps, replacing standard collaborative filtering with a custom hybrid model. Click-through rose 18% and engagement 24% across millions of daily recommendations.",
        "I also built and deployed the production AI assistants that help readers discover stories and TV shows in each app.",
      ],
    },
  },
  {
    name: "mercor",
    tag: "epm",
    lines: [],
    dates: ["2026"],
    href: "/mercor/",
    detail: {
      title: "Mercor",
      meta: "EPM, remote - Feb to Apr 2026",
      body: [
        "Mercor supplies frontier labs with the expert-generated data their models post-train on. I ran quality on the coding side, where the product is LLM-generated agent trajectories and the question is whether the reasoning inside them is any good.",
        "I spearheaded quality optimization across those trajectories, evaluating agent reasoning and decision-making patterns over 1,000+ open-source GitHub repositories to improve what the models learn downstream.",
        "I built and ran the end-to-end evaluation pipeline behind that work: LLM code generation, expert human annotation, multi-tier review, and final delivery to leading research labs, with quality benchmarks held consistent across task cycles.",
        "Running it meant directing a distributed team of 50 to 100 domain experts through Airtable workflow orchestration. On-time sprint delivery stayed above 95%, review turnaround fell 35%, and I identified top performers for promotion into senior reviewer roles.",
      ],
    },
  },
  {
    name: "toyota",
    tag: "swe intern",
    lines: [],
    dates: ["2025"],
    href: "/toyota/",
    detail: {
      title: "Toyota Motor North America",
      meta: "Software Engineer Intern, Plano - May to Aug 2025",
      body: [
        "Toyota's finance organization ran on documents and spreadsheets. I spent the summer building the internal AI infrastructure that let people ask it questions instead.",
        "I built and deployed a distributed GenAI RAG system on LangChain, AWS Lambda, and ChromaDB, engineering 10+ specialized agents to autonomously process financial workflows for 500+ engineers.",
        "On top of it I built a React front end integrated with asynchronous backend services, so financial and technical documentation could be queried in natural language. I optimized query response times, and the system reached 100% adoption on the team.",
        "I also led a centralized Power BI financial tracking system that replaced the legacy Excel workflow, consolidating data from 20+ departments.",
      ],
    },
  },
]

export const projects: Entry[] = [
  {
    name: "Invariance",
    lines: [],
    dates: ["2026"],
    detail: {
      title: "Invariance",
      meta: "AI-governed UI customization - May 2026",
      body: [
        "Letting a language model restyle a live product is easy to demo and hard to ship, because the failure mode is an unreadable page in front of a paying tenant. Invariance is the version that can actually go to production: the model proposes, and a set of invariants decides.",
        "The LLM is confined to a proposal stage bounded by brand and accessibility invariants, which caught 100% of violations before publish. Nothing reaches a user without clearing contrast and brand constraints first.",
        "The control plane runs on Neon Postgres with Drizzle, keeping schema as the source of truth for manifests, versioned per-tenant themes, rollback, audit trails, and prompts.",
        "Each theme ships as an immutable, content-addressed Cloudflare R2 artifact behind the CDN, with a short-TTL KV pointer on the hot path. Source is never rewritten at runtime, so a bad theme is a pointer flip away from being undone.",
      ],
    },
  },
  {
    name: "BriefCase",
    lines: [],
    dates: ["2026"],
    detail: {
      title: "BriefCase",
      meta: "Chain-of-thought distillation for legal contract risk classification - Purdue CS490, 2026",
      body: [
        "LLMs can read a contract clause and reason about its risk, but running one over every clause in a deal is expensive, and legal text is exactly the kind of data that cannot leave a client's infrastructure. The question our four-person team asked: can training-time reasoning from a locally hosted open-weight teacher substitute for in-domain pretraining in a small encoder?",
        "We built the experiment on CUAD, mapping its 41 clause types onto a 10-class risk taxonomy and generating teacher rationales for all 10.5k training clauses. The design is a 2x2 crossing encoder type, DistilBERT against Legal-BERT, with training variant, vanilla against rationales generated by a locally hosted Llama-3.1-8B-Instruct teacher. Rationales are concatenated at fine-tuning time and stripped at inference, so every model classifies from the clause alone and the CoT variants cost nothing extra to serve.",
        "The best student reached 0.896 macro-F1. But the result that matters is the gap underneath it: every fine-tuned student beat its own teacher's direct zero-shot inference by roughly 47 macro-F1 points, 0.87 and above against the teacher's 0.40. A 110M-parameter encoder outclassed the 8B model it learned from, which says the bottleneck is teacher competence on the task, not the distillation framework.",
        "CoT's own effect was small and honest: +0.26 macro-F1 points on DistilBERT and +0.33 on Legal-BERT, both inside the single-seed noise band, while in-domain pretraining held a robust 2-point gap that CoT never closed. So the answer to the original question, at 8B teacher scale, is no. We report it as a negative result rather than rounding it up.",
        "The whole pipeline is on-premise and reproducible end to end in 2.5 GPU-hours on a single A100, at $0 in external API fees.",
      ],
      links: [{ label: "report", href: "/BriefCase_CoT_Distillation_Report.pdf" }],
    },
  },
  {
    name: "GARCH BTC",
    lines: [],
    dates: ["2025"],
    detail: {
      title: "GARCH BTC",
      meta: "Bitcoin volatility forecasting - 2025",
      body: [
        "GARCH models are the standard tool for volatility in traditional finance and underused in crypto, where the volatility clustering they were designed for is at its most extreme. This project applies them to Bitcoin, pairing the classical models with hybrid and Bayesian-tuned variants.",
        "I implemented GJR-GARCH from scratch with Numba for performance, then benchmarked it against GARCH(1,1) and EGARCH baselines on MSE, AIC, and log-likelihood over Bitcoin log returns, with Optuna driving hyperparameter search and LSTM and Transformer hybrids layered on top.",
      ],
      links: [{ label: "code", href: "https://github.com/nihalgunu/GARCH-BTC" }],
    },
  },
]

/** The one home row that stands in for the whole projects page. */
export const builds: Entry = {
  name: "things i've built",
  tag: "projects",
  lines: [],
  dates: ["2025-26"],
  href: "/projects/",
}

export const education: Entry[] = [
  {
    name: "Purdue University",
    tag: "b.s. ai & cs",
    lines: [],
    dates: ["Dec 2026"],
    nowrap: true,
  },
]

export const aboutBio: string[] = [
  "Outside the terminal I shoot photography, play basketball, and ski. They are the three things that reliably get me away from a screen, which is most of why they matter.",
  "I graduate from Purdue in December 2026 and am looking for machine learning and infrastructure work: the systems side of getting a model into production and keeping it honest once real traffic finds it.",
]

export const skills: { label: string; value: string }[] = [
  { label: "Languages", value: "Python, TypeScript, Java, C++" },
  { label: "ML", value: "PyTorch, scikit-learn, CatBoost, Hugging Face, PEFT" },
  { label: "LLM systems", value: "LangChain, LangGraph, RAG, agent pipelines" },
  { label: "Infra", value: "AWS, Docker, Airflow, Postgres, Next.js" },
]

/**
 * Look up an entry by name so route files can name what they render. Throws
 * rather than returning undefined: a typo should fail the build, not render
 * an empty page.
 */
export function byName(entries: Entry[], name: string): Entry {
  const entry = entries.find((e) => e.name === name)
  if (!entry) throw new Error(`No entry named "${name}"`)
  return entry
}
