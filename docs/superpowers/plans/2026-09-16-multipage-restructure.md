# Multi-page Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the flat single-page portfolio into a title page plus five detail pages, each reached by clicking a row.

**Architecture:** All page content lives as typed data in `lib/content.ts`.
A single `DetailPage` component renders any entry's `detail` field, so the four detail routes are thin files and stay visually identical by construction.
`EntryList` rows become links when their entry has an `href`.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind 3, static export (`output: 'export'`, `trailingSlash: true`), deployed to GitHub Pages by `.github/workflows/deploy.yml`.

**Spec:** `docs/superpowers/specs/2026-09-16-multipage-restructure-design.md`

## Global Constraints

- No new runtime dependencies. `package.json` dependencies stay exactly `next`, `react`, `react-dom`.
- Never use the em dash character. Use a plain dash `-` instead. This applies to all page copy and all comments.
- Do not change `app/globals.css` colour tokens, the font stacks, `components/bitter-lesson.tsx`, or `components/section-heading.tsx`.
- Static export only. No `"use client"`, no hooks, no runtime data fetching. Every component in this plan is a server component.
- All internal navigation uses `next/link`. Internal hrefs end in a trailing slash (`/mercor/`) to match `trailingSlash: true`.
- Every figure in the copy must come from `public/Anuraag_2026_Resume.pdf`, the BriefCase report, or the BriefCase eval JSONs. Invent no numbers.
- Copy is short and numbers-forward. No filler adjectives.
- Verification for every task is `npm run lint && npm run build`, plus the stated assertions against `out/`.
- Paragraph arrays (`detail.body`, `aboutBio`) are static module constants that are never reordered, filtered, or mutated. Render them with the array index as the React key. This is deliberate, not an oversight.

---

### Task 1: Content model and data

Replaces the site's content with the final set and adds the `Detail` type that every later task consumes.
The home page still builds and renders after this task, just with new text.

**Files:**
- Modify: `lib/content.ts` (whole file)
- Create: `public/BriefCase_CoT_Distillation_Report.pdf` (copied binary)

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `type Link = { label: string; href: string }` (unchanged)
  - `type Detail = { title: string; meta: string; body: string[]; links?: Link[] }`
  - `type Entry = { name: string; lines: string[]; dates: string[]; href?: string; links?: Link[]; nowrap?: boolean; detail?: Detail }`
  - `profile`, `social` (unchanged shape)
  - `work: Entry[]` with exactly three entries named `Kleiner Perkins`, `Mercor`, `Toyota`
  - `projects: Entry[]` with exactly three entries named `Invariance`, `BriefCase`, `GARCH BTC`
  - `education: Entry[]` (unchanged)
  - `skills: { label: string; value: string }[]` (unchanged)
  - `aboutBio: string[]`
  - `byName(entries: Entry[], name: string): Entry` - throws if absent, so a typo in a route file fails the build instead of rendering a blank page.

- [ ] **Step 1: Copy the BriefCase report into public/**

```bash
cp "/Users/ak/Downloads/cs490_CoT/BriefCase__Chain_of_Thought_Distillation_Report.pdf" \
   public/BriefCase_CoT_Distillation_Report.pdf
ls -la public/BriefCase_CoT_Distillation_Report.pdf
```

Expected: file exists, roughly 208 KB.

- [ ] **Step 2: Write the whole of `lib/content.ts`**

Replace the entire file with this. The `work` and `projects` arrays are the source of truth for both the home page rows and the detail pages.

```ts
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
  name: string
  lines: string[]
  dates: string[]
  href?: string
  links?: Link[]
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
    name: "Kleiner Perkins",
    lines: ["2026 Engineering Fellow, placed at Inkitt"],
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
    name: "Mercor",
    lines: ["EPM, frontier model evaluation"],
    dates: ["2026"],
    href: "/mercor/",
    detail: {
      title: "Mercor",
      meta: "EPM, remote - Feb to Apr 2026",
      body: [
        "Mercor supplies frontier labs with the expert-generated data their models post-train on. I ran quality on the coding side, where the product is LLM-generated agent trajectories and the question is whether the reasoning inside them is any good.",
        "I spearheaded quality optimization across those trajectories, evaluating agent reasoning and decision-making patterns over 1,000+ open-source GitHub repositories to improve what the models learn downstream.",
        "I architected and managed the end-to-end evaluation pipeline behind that work: LLM code generation, expert human annotation, multi-tier review, and final delivery to leading research labs, with quality benchmarks held consistent across task cycles.",
        "Running it meant directing a distributed team of 50 to 100 domain experts through Airtable workflow orchestration. On-time sprint delivery stayed above 95%, review turnaround fell 35%, and I identified top performers for promotion into senior reviewer roles.",
      ],
    },
  },
  {
    name: "Toyota",
    lines: ["Software Engineer Intern"],
    dates: ["2025"],
    href: "/toyota/",
    detail: {
      title: "Toyota Motor North America",
      meta: "Software Engineer Intern, Plano - May to Aug 2025",
      body: [
        "Toyota's finance organization ran on documents and spreadsheets. I spent the summer building the internal AI infrastructure that let people ask it questions instead.",
        "I architected and deployed a distributed GenAI RAG system on LangChain, AWS Lambda, and ChromaDB, engineering 10+ specialized agents to autonomously process financial workflows for 500+ engineers.",
        "On top of it I built a React front end integrated with asynchronous backend services, so financial and technical documentation could be queried in natural language. Optimizing query response times took the system to 100% adoption on the team.",
        "I also led a centralized Power BI financial tracking system that replaced the legacy Excel workflow, consolidating data from 20+ departments and improving cross-team visibility across the enterprise.",
      ],
    },
  },
]

export const projects: Entry[] = [
  {
    name: "Invariance",
    lines: ["Governed AI turning a prompt into a live multi-tenant re-theme"],
    dates: ["2026"],
    href: "/projects/",
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
    lines: ["Chain-of-thought distillation for legal contract risk classification"],
    dates: ["2026"],
    href: "/projects/",
    detail: {
      title: "BriefCase",
      meta: "Chain-of-thought distillation for legal contract risk classification - 2026",
      body: [
        "LLMs can read a contract clause and reason about its risk, but running one over every clause in a deal is expensive, and legal text is exactly the kind of data that cannot leave a client's infrastructure. The question we asked: can training-time reasoning from a locally hosted open-weight teacher substitute for in-domain pretraining in a small encoder?",
        "We built the experiment on CUAD, mapping its 41 clause types onto a 10-class risk taxonomy over roughly 13k annotated clauses. The design is a 2x2 crossing encoder type, DistilBERT against Legal-BERT, with training variant, vanilla against rationales generated by a locally hosted Llama-3.1-8B-Instruct teacher. Rationales are concatenated at fine-tuning time and stripped at inference, so every model classifies from the clause alone and the CoT variants cost nothing extra to serve.",
        "The best student reached 0.896 macro-F1. But the result that matters is the gap underneath it: every fine-tuned student beat its own teacher's direct zero-shot inference by roughly 47 macro-F1 points, 0.87 and above against the teacher's 0.40. A 110M-parameter encoder outclassed the 8B model it learned from, which says the bottleneck is teacher competence on the task, not the distillation framework.",
        "CoT's own effect was small and honest: +0.26 macro-F1 on DistilBERT and +0.33 on Legal-BERT, both inside the single-seed noise band, while in-domain pretraining held a robust 2-point gap that CoT never closed. So the answer to the original question, at 8B teacher scale, is no. We report it as a negative result rather than rounding it up.",
        "The whole pipeline is on-premise and reproducible end to end in 2.5 GPU-hours on a single A100, at $0 in external API fees.",
      ],
      links: [{ label: "report", href: "/BriefCase_CoT_Distillation_Report.pdf" }],
    },
  },
  {
    name: "GARCH BTC",
    lines: ["Hybrid GARCH plus LSTM/Transformer volatility forecasting"],
    dates: ["2025"],
    href: "/projects/",
    detail: {
      title: "GARCH BTC",
      meta: "Bitcoin volatility forecasting - 2025",
      body: [
        "GARCH models are the standard tool for volatility in traditional finance and underused in crypto, where the volatility clustering they were designed for is at its most extreme. This project applies them to Bitcoin and asks how far hybrid and Bayesian-tuned variants can push the forecast.",
        "I implemented GJR-GARCH from scratch with Numba for performance, then benchmarked it against GARCH(1,1) and EGARCH baselines on MSE, AIC, and log-likelihood over Bitcoin log returns, with Optuna driving hyperparameter search and LSTM and Transformer hybrids layered on top.",
      ],
      links: [{ label: "code", href: "https://github.com/nihalgunu/GARCH-BTC" }],
    },
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

export const aboutBio: string[] = [
  "Outside the terminal I shoot photography, play basketball, and ski. They are the three things that reliably get me away from a screen, and the first one has quietly made me better at the rest of this: framing a shot and framing a problem turn out to be the same skill.",
  "I graduate from Purdue in December 2026 and am looking for machine learning and infrastructure work where models have to survive real traffic - eval harnesses, retraining schedules, and the guardrails that catch a model before a user does.",
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
```

- [ ] **Step 3: Verify the build passes and the old content is gone**

```bash
npm run lint && npm run build
```

Expected: both succeed.

```bash
for gone in Ingenii Shanti "Deal Fairness" "Legacy AI"; do
  if grep -rq "$gone" out/; then echo "FAIL: $gone still present"; else echo "ok: $gone removed"; fi
done
grep -c "Kleiner Perkins" out/index.html
```

Expected: four `ok:` lines, and a count of at least 1 for Kleiner Perkins.

- [ ] **Step 4: Commit**

```bash
git add lib/content.ts public/BriefCase_CoT_Distillation_Report.pdf
git commit -m "Replace site content with final entry set and add detail model"
```

---

### Task 2: Clickable rows in EntryList

**Files:**
- Modify: `components/entry-list.tsx`

**Interfaces:**
- Consumes: `Entry` and its optional `href` from Task 1.
- Produces: no new exports. `EntryList`'s signature is unchanged: `EntryList({ entries, cols }: { entries: Entry[]; cols?: string })`.

The existing `Row` renders a `div`. It needs to render a `Link` when `entry.href` is set, keeping both the `sm`-and-up grid layout and the stacked sub-`sm` layout intact.
The `a.row:hover` rule already in `globals.css` supplies the hover background, so no CSS changes.

- [ ] **Step 1: Change `Row` to render a link when the entry has an href**

In `components/entry-list.tsx`, replace the `Row` function's outer element. The inner content is unchanged; only the wrapper changes.

Extract the current body into a `RowBody` component, then wrap it:

```tsx
function Row({ entry }: { entry: Entry }) {
  const className =
    "ui row col-span-3 block sm:grid sm:grid-cols-subgrid sm:items-baseline sm:gap-x-6"

  if (entry.href) {
    return (
      <Link href={entry.href} className={className}>
        <RowBody entry={entry} />
      </Link>
    )
  }

  return (
    <div className={className}>
      <RowBody entry={entry} />
    </div>
  )
}
```

`RowBody` holds exactly what the old `Row` returned inside its outer `div`, unchanged:

```tsx
function RowBody({ entry }: { entry: Entry }) {
  const [lead, ...rest] = entry.lines

  return (
    <>
      <span className="hidden font-medium sm:block sm:col-start-1">{entry.name}</span>

      <span className="hidden flex-col sm:flex sm:col-start-2" style={{ lineHeight: "26px" }}>
        <span className={entry.nowrap ? "sm:whitespace-nowrap" : undefined}>{lead}</span>
        {rest.map((line) => (
          <span key={line} className="text-gray-500">
            {line}
          </span>
        ))}
        {entry.links && <Links entry={entry} />}
      </span>

      <span
        className="hidden flex-col items-end whitespace-nowrap text-right tabular-nums text-gray-500 sm:flex sm:col-start-3"
        style={{ lineHeight: "26px" }}
      >
        {entry.dates.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </span>

      <div className="sm:hidden" style={{ lineHeight: 1.85 }}>
        <div className="flex items-baseline gap-3">
          <span className="font-medium">{entry.name}</span>
          <span className="leader" aria-hidden="true" />
          <span className="whitespace-nowrap tabular-nums text-gray-500">{entry.dates[0]}</span>
        </div>
        <div className="mt-1 flex flex-col">
          <span>{lead}</span>
          {rest.map((line) => (
            <span key={line} className="text-gray-500">
              {line}
            </span>
          ))}
          {entry.links && <Links entry={entry} />}
        </div>
      </div>
    </>
  )
}
```

Add the import at the top of the file:

```tsx
import Link from "next/link"
```

- [ ] **Step 2: Remove the nested-anchor hazard**

`Links` renders `<a>` elements. Inside a linked row that would nest anchors, which is invalid HTML and hydrates badly.
Entries that have both `href` and `links` do not exist in the current data, but the component must not allow it silently.

Change `Links` to render nothing when the row itself is a link, by passing a flag:

```tsx
function Links({ entry, suppressed }: { entry: Entry; suppressed?: boolean }) {
  if (suppressed) return null
  return (
    <span className="flex gap-x-4 pt-1">
      {entry.links?.map((link) => (
        <a
          key={link.label}
          className="prose-link text-gray-500"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      ))}
    </span>
  )
}
```

In `RowBody`, both call sites become:

```tsx
{entry.links && <Links entry={entry} suppressed={Boolean(entry.href)} />}
```

- [ ] **Step 3: Verify the build and that rows became links**

```bash
npm run lint && npm run build
grep -o 'href="/kleiner-perkins/"' out/index.html | head -1
grep -o 'href="/mercor/"' out/index.html | head -1
grep -o 'href="/toyota/"' out/index.html | head -1
```

Expected: lint and build pass; each grep prints one match.

```bash
grep -q '<a[^>]*>[^<]*<a' out/index.html && echo "FAIL: nested anchors" || echo "ok: no nested anchors"
```

Expected: `ok: no nested anchors`.

- [ ] **Step 4: Commit**

```bash
git add components/entry-list.tsx
git commit -m "Render entry rows as links when they have an href"
```

---

### Task 3: Header navigation

**Files:**
- Modify: `components/site-header.tsx`

**Interfaces:**
- Consumes: `profile`, `social`, and the new `nav` from Task 1.
- Produces: `SiteHeader` gains no props. Its signature stays `SiteHeader()`.

The name becomes a link to `/` on every page.
A row of plain text nav links sits between the tagline and the social icons.

- [ ] **Step 1: Add the nav row and link the name**

In `components/site-header.tsx`, add to the imports:

```tsx
import Link from "next/link"
import { nav, profile, social } from "@/lib/content"
```

Wrap the `h1` contents in a link, and insert the nav row after the tagline:

```tsx
<h1
  className="font-ui"
  style={{ fontWeight: 700, fontSize: 20, lineHeight: 1.05, letterSpacing: "-0.01em" }}
>
  <Link href="/" className="hover:opacity-70">
    {profile.name}
  </Link>
</h1>
<div className="pt-2 text-gray-500">{profile.tagline}</div>
<nav className="ui flex gap-4 pt-3 text-gray-500">
  {nav.map(({ label, href }) => (
    <Link key={label} href={href} className="prose-link">
      {label}
    </Link>
  ))}
</nav>
```

The social icon block below is unchanged.

- [ ] **Step 2: Verify**

```bash
npm run lint && npm run build
grep -q '<nav[^>]*>.*href="/about/".*href="/projects/".*</nav>' out/index.html \
  && echo "ok: nav row rendered" || echo "FAIL: nav row missing"
for route in kleiner-perkins mercor toyota; do :; done
grep -q '<nav' out/index.html && echo "ok: nav present" || echo "FAIL: no nav element"
```

Expected: lint and build pass, then two `ok:` lines.

Note: do not verify the nav by grepping for a bare `href="/projects/"`.
Task 1 already emits that href on the three project rows, so such a check passes whether or not the nav row exists.

- [ ] **Step 3: Commit**

```bash
git add components/site-header.tsx
git commit -m "Add about and projects nav links to the site header"
```

---

### Task 4: DetailPage component and the three work pages

**Files:**
- Create: `components/detail-page.tsx`
- Create: `app/kleiner-perkins/page.tsx`
- Create: `app/mercor/page.tsx`
- Create: `app/toyota/page.tsx`
- Modify: `components/bio.tsx` (first paragraph only)

**Interfaces:**
- Consumes: `Detail`, `work`, `byName` from Task 1; `SiteHeader` from Task 3.
- Produces: `DetailPage({ detail, backHref, backLabel }: { detail: Detail; backHref?: string; backLabel?: string })`, default export of `components/detail-page.tsx`. `backHref` defaults to `"/"` and `backLabel` to `"back"`.

- [ ] **Step 1: Create `components/detail-page.tsx`**

```tsx
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import type { Detail } from "@/lib/content"

/**
 * The shared shell for every detail route: site header, a back link, the
 * entry's title and meta line, then its body paragraphs. Routes pass data
 * only, so all detail pages stay identical by construction.
 */
export default function DetailPage({
  detail,
  backHref = "/",
  backLabel = "back",
}: {
  detail: Detail
  backHref?: string
  backLabel?: string
}) {
  return (
    <>
      <SiteHeader />
      <div className="pb-48">
        <main className="m-auto w-full max-w-[640px] px-5">
          <Link href={backHref} className="ui prose-link text-gray-500">
            {backLabel}
          </Link>

          <h2
            className="font-ui pt-8"
            style={{ fontWeight: 600, fontSize: 18, letterSpacing: "-0.01em" }}
          >
            {detail.title}
          </h2>
          <div className="ui pt-1 text-gray-500">{detail.meta}</div>

          {detail.body.map((paragraph, i) => (
            <p key={i} className="pt-5" style={{ lineHeight: 1.6 }}>
              {paragraph}
            </p>
          ))}

          {detail.links && (
            <div className="ui flex gap-x-4 pt-6 text-gray-500">
              {detail.links.map((link) => (
                <a
                  key={link.label}
                  className="prose-link"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Create the three work routes**

`app/kleiner-perkins/page.tsx`:

```tsx
import DetailPage from "@/components/detail-page"
import { byName, work } from "@/lib/content"

const entry = byName(work, "Kleiner Perkins")

export const metadata = { title: "Kleiner Perkins - Anuraag Kolli" }

export default function Page() {
  return <DetailPage detail={entry.detail!} />
}
```

`app/mercor/page.tsx`:

```tsx
import DetailPage from "@/components/detail-page"
import { byName, work } from "@/lib/content"

const entry = byName(work, "Mercor")

export const metadata = { title: "Mercor - Anuraag Kolli" }

export default function Page() {
  return <DetailPage detail={entry.detail!} />
}
```

`app/toyota/page.tsx`:

```tsx
import DetailPage from "@/components/detail-page"
import { byName, work } from "@/lib/content"

const entry = byName(work, "Toyota")

export const metadata = { title: "Toyota - Anuraag Kolli" }

export default function Page() {
  return <DetailPage detail={entry.detail!} />
}
```

- [ ] **Step 3: Hand the Inkitt narrative to the Kleiner Perkins page**

`components/bio.tsx` currently ends its first paragraph with "I spent this past summer at Inkitt training revenue prediction models and rebuilding a recommendation engine, and before that built internal AI infrastructure at Toyota."
That detail now lives on the page this task just created, so the home page should stop duplicating it.

Replace the first paragraph so it reads:

```tsx
<p style={{ lineHeight: 1.6 }}>
  I&apos;m a 2026 Kleiner Perkins Fellow studying artificial intelligence and computer science
  at Purdue. I like the parts nobody demos: the eval harness, the retraining schedule, the
  guardrail that catches the model before a user does. The work below is where that has led
  so far.
</p>
```

Leave the second paragraph, the `figure`, and the `BitterLesson` import untouched.

- [ ] **Step 4: Verify all three routes export and carry their copy**

```bash
npm run lint && npm run build
for route in kleiner-perkins mercor toyota; do
  test -f "out/$route/index.html" && echo "ok: $route exported" || echo "FAIL: $route missing"
done
grep -q "7.2x top-decile lift" out/kleiner-perkins/index.html && echo "ok: KP numbers"
grep -q "1,000+ open-source GitHub repositories" out/mercor/index.html && echo "ok: Mercor numbers"
grep -q "500+ engineers" out/toyota/index.html && echo "ok: Toyota numbers"
grep -q "Inkitt" out/kleiner-perkins/index.html && echo "ok: Inkitt on the KP page"
```

Expected: build passes, then six `ok:` lines.

```bash
grep -qE "revenue prediction|recommendation engine|pLTV|Galatea|CandyJar" out/index.html \
  && echo "FAIL: Inkitt narrative leaked onto home" || echo "ok: Inkitt narrative only on KP page"
grep -q "placed at Inkitt" out/index.html \
  && echo "ok: home row still points at Inkitt as context" || echo "FAIL: row subtitle lost"
```

Expected: two `ok:` lines.

Do not assert that the bare string "Inkitt" is absent from the home page.
The Kleiner Perkins row carries the subtitle "2026 Engineering Fellow, placed at Inkitt", which is a pointer, not a narrative.
The spec requires that Inkitt stop being a top-level work entry and that it be discussed on the Kleiner Perkins page.
Naming it as context on the row it belongs to satisfies both, and tells the reader what the row is before they click.

- [ ] **Step 5: Commit**

```bash
git add components/detail-page.tsx components/bio.tsx app/kleiner-perkins app/mercor app/toyota
git commit -m "Add shared detail page component and the three work routes"
```

---

### Task 5: Projects page

**Files:**
- Create: `app/projects/page.tsx`

**Interfaces:**
- Consumes: `projects` from Task 1, `SiteHeader` from Task 3, `SectionHeading` (unchanged).
- Produces: the `/projects/` route. No new exports.

One page listing all three projects with their full write-ups, rather than three separate routes.
It reuses `SectionHeading` for each project name so the dotted-leader treatment matches the rest of the site.

- [ ] **Step 1: Create `app/projects/page.tsx`**

```tsx
import Link from "next/link"
import SectionHeading from "@/components/section-heading"
import SiteHeader from "@/components/site-header"
import { projects } from "@/lib/content"

export const metadata = { title: "Projects - Anuraag Kolli" }

export default function Page() {
  return (
    <>
      <SiteHeader />
      <div className="pb-48">
        <main className="m-auto w-full max-w-[640px] px-5">
          <Link href="/" className="ui prose-link text-gray-500">
            back
          </Link>

          {projects.map((entry) => {
            const detail = entry.detail!
            return (
              <section key={entry.name}>
                <SectionHeading id={entry.name.toLowerCase().replace(/\s+/g, "-")}>
                  {detail.title}
                </SectionHeading>
                <div className="ui pt-2 text-gray-500">{detail.meta}</div>

                {detail.body.map((paragraph, i) => (
                  <p key={i} className="pt-5" style={{ lineHeight: 1.6 }}>
                    {paragraph}
                  </p>
                ))}

                {detail.links && (
                  <div className="ui flex gap-x-4 pt-5 text-gray-500">
                    {detail.links.map((link) => (
                      <a
                        key={link.label}
                        className="prose-link"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </section>
            )
          })}
        </main>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Verify the route and its figures**

```bash
npm run lint && npm run build
test -f out/projects/index.html && echo "ok: projects exported"
grep -q "0.896 macro-F1" out/projects/index.html && echo "ok: BriefCase headline figure"
grep -q "47 macro-F1 points" out/projects/index.html && echo "ok: BriefCase teacher gap"
grep -q "2.5 GPU-hours" out/projects/index.html && echo "ok: BriefCase cost"
grep -q "100% of violations" out/projects/index.html && echo "ok: Invariance figure"
grep -q "GJR-GARCH" out/projects/index.html && echo "ok: GARCH BTC"
grep -q 'href="/BriefCase_CoT_Distillation_Report.pdf"' out/projects/index.html && echo "ok: report link"
test -f out/BriefCase_CoT_Distillation_Report.pdf && echo "ok: report asset copied"
```

Expected: build passes, then eight `ok:` lines.

- [ ] **Step 3: Confirm no invented number slipped into GARCH BTC**

```bash
python3 - <<'EOF'
import re, pathlib
src = pathlib.Path("lib/content.ts").read_text()
i = src.index('name: "GARCH BTC"')
block = src[i:src.index("export const education", i)]
body = block[block.index("body: ["):block.index("links:")]
# Strip model names that legitimately contain digits, then look for figures.
prose = body.replace("GARCH(1,1)", "GARCH").replace("LSTM", "").replace("1,1", "")
hits = re.findall(r"\d+(?:\.\d+)?\s*(?:%|x\b|GPU-hours|macro-F1|points)", prose)
print("CHECK: figures found near GARCH BTC:", hits) if hits else print("ok: GARCH BTC stays qualitative")
EOF
```

Expected: `ok: GARCH BTC stays qualitative`.

Check the TypeScript source, not the built HTML.
Next minifies the exported page onto very few lines, so `grep -A2` over `out/projects/index.html` spans unrelated sections and reports figures belonging to Invariance and BriefCase as though they sat beside GARCH BTC.

- [ ] **Step 4: Commit**

```bash
git add app/projects
git commit -m "Add projects page with Invariance, BriefCase, and GARCH BTC"
```

---

### Task 6: About page

**Files:**
- Create: `app/about/page.tsx`

**Interfaces:**
- Consumes: `aboutBio`, `education` from Task 1; `SiteHeader` from Task 3; `EntryList`, `SectionHeading`, `Skills` (unchanged).
- Produces: the `/about/` route. No new exports.

- [ ] **Step 1: Create `app/about/page.tsx`**

```tsx
import Link from "next/link"
import EntryList from "@/components/entry-list"
import SectionHeading from "@/components/section-heading"
import SiteHeader from "@/components/site-header"
import Skills from "@/components/skills"
import { aboutBio, education } from "@/lib/content"

export const metadata = { title: "About - Anuraag Kolli" }

export default function Page() {
  return (
    <>
      <SiteHeader />
      <div className="pb-48">
        <main className="m-auto w-full max-w-[640px] px-5">
          <Link href="/" className="ui prose-link text-gray-500">
            back
          </Link>

          {aboutBio.map((paragraph, i) => (
            <p key={i} className="pt-6" style={{ lineHeight: 1.6 }}>
              {paragraph}
            </p>
          ))}

          <SectionHeading id="education">Education</SectionHeading>
          <EntryList entries={education} cols="sm:grid-cols-[150px_1fr_auto]" />

          <SectionHeading id="skills">Skills</SectionHeading>
          <Skills />
        </main>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Verify**

```bash
npm run lint && npm run build
test -f out/about/index.html && echo "ok: about exported"
grep -q "Purdue University" out/about/index.html && echo "ok: education present"
grep -q "PyTorch" out/about/index.html && echo "ok: skills present"
grep -q "photography" out/about/index.html && echo "ok: bio present"
```

Expected: build passes, then four `ok:` lines.

- [ ] **Step 3: Commit**

```bash
git add app/about
git commit -m "Add about page with bio, education, and skills"
```

---

### Task 7: Trim the home page and verify the whole site

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `projects`, `work` from Task 1. It no longer imports `education` or `Skills`.
- Produces: the final `/` route.

The home page keeps the bio and chart, keeps the two clickable lists, and loses Education and Skills, which now live on `/about/`.

- [ ] **Step 1: Rewrite `app/page.tsx`**

```tsx
import Bio from "@/components/bio"
import EntryList from "@/components/entry-list"
import SectionHeading from "@/components/section-heading"
import SiteHeader from "@/components/site-header"
import { projects, work } from "@/lib/content"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <div className="pb-48">
        <main className="m-auto w-full max-w-[640px] px-5">
          <Bio />

          <SectionHeading id="work">Selected work</SectionHeading>
          <EntryList entries={work} />

          <SectionHeading id="projects">Projects</SectionHeading>
          <EntryList entries={projects} />
        </main>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Verify the home page**

```bash
npm run lint && npm run build
grep -q "bitter lesson" out/index.html && echo "ok: chart prose intact"
grep -q "Selected work" out/index.html && echo "ok: work section"
grep -q "Projects" out/index.html && echo "ok: projects section"
grep -q "Skills" out/index.html && echo "FAIL: skills still on home" || echo "ok: skills moved off home"
grep -q "Purdue University" out/index.html && echo "FAIL: education still on home" || echo "ok: education moved off home"
grep -q "Inkitt" out/index.html && echo "FAIL: Inkitt still on home" || echo "ok: Inkitt off home"
```

Expected: build passes, then six `ok:` lines and no `FAIL:`.

- [ ] **Step 3: Verify all six routes exist and nothing is orphaned**

Run this from the repo root after the build. It replaces the earlier shell version, which had two defects: the `${path//\/\//\/}` normalization does not collapse the empty route under zsh, and the `href` regex silently skipped bare `href="/"` and every asset link.

```bash
python3 - <<'EOF'
import pathlib, re, sys

OUT = pathlib.Path("out")
EXPECTED = ["", "about", "projects", "kleiner-perkins", "mercor", "toyota"]
fails = []

def page(route):
    return OUT / "index.html" if route == "" else OUT / route / "index.html"

print("=== six routes exported ===")
for route in EXPECTED:
    p = page(route)
    if p.is_file():
        print(f"ok: /{route}/" if route else "ok: /")
    else:
        fails.append(f"route /{route}/ missing ({p})")
        print(f"FAIL: /{route}/ missing")

print("=== internal links resolve ===")
targets = set()
for html in OUT.rglob("*.html"):
    text = html.read_text(encoding="utf-8", errors="replace")
    for href in re.findall(r'href="(/[^"#?]*)"', text):
        targets.add(href)

for href in sorted(targets):
    if re.search(r"\.[a-z0-9]+$", href):        # an asset, e.g. /resume.pdf
        p = OUT / href.lstrip("/")
    else:                                        # a route
        p = OUT / href.strip("/") / "index.html" if href != "/" else OUT / "index.html"
    if p.is_file():
        print(f"ok: {href}")
    else:
        fails.append(f"dead link {href} (expected {p})")
        print(f"FAIL: dead link {href}")

print()
if fails:
    print(f"{len(fails)} FAILURE(S):")
    for f in fails:
        print("  -", f)
    sys.exit(1)
print("all site checks passed")
EOF
```

Expected: six `ok:` route lines, an `ok:` line for every internal link including both PDFs, and `all site checks passed`.
This check covers the home route and asset links, so there is no longer an accepted gap for bare `href="/"`.

- [ ] **Step 4: Check for em dashes across the site**

```bash
grep -rlP '\x{2014}' app components lib && echo "FAIL: em dash found" || echo "ok: no em dashes"
```

Expected: `ok: no em dashes`.

- [ ] **Step 5: Visual check at both breakpoints**

```bash
npm run dev
```

Open `http://localhost:3000` and confirm by eye:
- Rows in both lists show a subtle background on hover and the cursor is a pointer.
- Clicking each of the six rows lands on the right page, and `back` returns home.
- The `about` and `projects` nav links work from every page.
- The bitter-lesson chart still renders, and hovering "teach the machine what we already know" still dims the other curve.
- At a narrow width, under 640px, rows use the stacked layout with the dotted leader and the date on the name line, and nothing overflows horizontally.

Stop the dev server when done.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx
git commit -m "Trim home page to intro, chart, and the clickable lists"
```

---

### Task 8: Deploy

**Files:** none modified.

- [ ] **Step 1: Push and watch the Pages deploy**

```bash
git push origin main
npx -y gh-axi run list --repo anuraagkolli/anuraagkolli.github.io --limit 1
```

Expected: a `Deploy to GitHub Pages` run appears and completes successfully.
The workflow runs `npm ci`, `npm run lint`, and `npm run build`, so a failure here means one of the checks above was skipped locally.

- [ ] **Step 2: Confirm the live site**

Open `https://anuraagkolli.github.io` and click through all six routes.
Confirm `https://anuraagkolli.github.io/BriefCase_CoT_Distillation_Report.pdf` loads.
