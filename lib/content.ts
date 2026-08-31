export type Link = {
  label: string
  href: string
}

/**
 * A row in the work or projects list: a name on the left, one or more detail
 * lines in the middle, and a right-aligned date column.
 */
export type Entry = {
  name: string
  lines: string[]
  dates: string[]
  href?: string
  links?: Link[]
  /** Keep the lead line on one line at sm and up. */
  nowrap?: boolean
}

export const profile = {
  name: "Anuraag Kolli",
  tagline: "Building software that survives contact with production.",
}

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
    name: "Inkitt",
    lines: ["Machine Learning Engineer Intern"],
    dates: ["Summer 2026"],
  },
  {
    name: "Mercor",
    lines: ["EPM"],
    dates: ["2026"],
  },
  {
    name: "Toyota",
    lines: ["Software Engineer Intern"],
    dates: ["Summer 2025"],
  },
  {
    name: "Ingenii",
    lines: ["Quantum AI Researcher"],
    dates: ["2023-2024"],
  },
]

export const projects: Entry[] = [
  {
    name: "Invariance",
    lines: [
      "Governed AI that turns a prompt into a live multi-tenant re-theme, fenced in by brand and accessibility invariants",
    ],
    dates: ["2026"],
  },
  {
    name: "Legacy AI",
    lines: [
      "Fine-tuned Qwen2.5-Coder with LoRA to translate COBOL into Python, deployed on Hugging Face Spaces",
    ],
    dates: ["2026"],
    links: [{ label: "code", href: "https://github.com/anuraagkolli/legacy_llm" }],
  },
  {
    name: "GARCH BTC",
    lines: ["Hybrid GARCH plus LSTM/Transformer volatility forecasting with Bayesian tuning"],
    dates: ["2025"],
    links: [{ label: "code", href: "https://github.com/nihalgunu/GARCH-BTC" }],
  },
  {
    name: "Shanti",
    lines: ["A React Native app doing sentiment analysis for emotion tracking"],
    dates: ["2025"],
    links: [{ label: "code", href: "https://github.com/anuraagkolli/Shanti-Mental-Health-AI" }],
  },
  {
    name: "Deal Fairness",
    lines: ["A Chrome extension scoring eBay listings in real time with an LLM backend"],
    dates: ["2025"],
    links: [{ label: "code", href: "https://github.com/anuraagkolli/deal-fairness-assistant" }],
  },
]

export const education: Entry[] = [
  {
    name: "Purdue University",
    lines: ["B.S. Artificial Intelligence & Computer Science"],
    dates: ["Dec 2026"],
    nowrap: true,
  },
]

export const skills: { label: string; value: string }[] = [
  { label: "Languages", value: "Python, TypeScript, Java, C++" },
  { label: "ML", value: "PyTorch, scikit-learn, CatBoost, Hugging Face, PEFT" },
  { label: "LLM systems", value: "LangChain, LangGraph, RAG, agent pipelines" },
  { label: "Infra", value: "AWS, Docker, Airflow, Postgres, Next.js" },
]
