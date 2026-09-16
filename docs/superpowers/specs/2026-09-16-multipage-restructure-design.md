# Multi-page restructure

## Goal

Split the current flat single-page portfolio into a title page plus detail pages.
The home page carries only the introduction and the bitter-lesson chart.
Everything else becomes a clickable row that opens a page with a short, numbers-forward write-up.

The reference for layout and information density is nihalgunu.com: minimal, text-first, generous whitespace, no decorative imagery.
The opening animation on that site is explicitly out of scope.

## Routes

| Route | Contents |
|---|---|
| `/` | Site header, intro paragraph, bitter-lesson chart, Sutton paragraph, "Selected work" list of three clickable rows, link to projects |
| `/about/` | Longer personal bio, education, skills |
| `/kleiner-perkins/` | 2026 Kleiner Perkins Engineering Fellow, including the Inkitt placement |
| `/mercor/` | EPM |
| `/toyota/` | Software Engineer Intern |
| `/projects/` | Invariance, BriefCase, GARCH BTC on one shared page |

Static export stays on, so every route is emitted as a directory with `trailingSlash: true` as configured today.

## Content changes

Removed entirely: Ingenii, Shanti, Deal Fairness, Legacy AI.

Inkitt stops being a top-level work entry.
It is discussed inside the Kleiner Perkins page, since the fellowship is what placed him there.

BriefCase is added as a project.
Its source is `/Users/ak/Downloads/cs490_CoT`, principally the eight-page report and the five evaluation JSON files.

## Navigation

`SiteHeader` gains a row of plain text links under the tagline: `about` and `projects`.
This mirrors the reference site, where navigation is text rather than chrome.
The existing social icon row stays unchanged below it.

The name in the header becomes a link to `/` on every page, including the home page itself.

Detail pages carry a single "back" link to the page that referenced them.
Work pages link back to `/`; there is no breadcrumb trail beyond one level.

## Data model

`Entry` in `lib/content.ts` gains an optional `detail` field:

```ts
type Detail = {
  /** Page heading, e.g. "2026 Kleiner Perkins Engineering Fellow". */
  title: string
  /** Single meta line under the heading, e.g. "Inkitt, San Francisco, May to Aug 2026". */
  meta: string
  /** Body paragraphs, rendered in the prose serif. */
  body: string[]
  links?: Link[]
}
```

`Entry.href` already exists and is currently unused.
Populating it is what makes a row clickable.

A new `components/detail-page.tsx` renders a `Detail` plus the shared header and back link.
Each of the four detail routes is then a three-line file that imports its entry and passes `entry.detail` to that component.
This keeps every detail page visually identical by construction rather than by discipline.

`EntryList`'s `Row` renders as a `Link` when `entry.href` is set and a `div` otherwise.
The `a.row:hover` rule already present in `globals.css` supplies the hover treatment, so no new styles are needed for the clickable state.

## Copy

Short and numbers-forward.
No filler, no adjectives doing work that a figure could do.
All figures are sourced from the resume PDF already in `public/`, the BriefCase report, or the BriefCase evaluation JSONs.

### Kleiner Perkins

The fellowship, and the Inkitt placement as Machine Learning Engineer Intern, May to Aug 2026.
A reusable pLTV revenue-prediction system, a two-stage hurdle model with a calibrated CatBoost head, reaching 7.2x top-decile lift on a 2.2M-user cohort and served daily through an Airflow pipeline into CRM and marketing.
A rebuild of the recommendation engine behind Galatea and CandyJar, replacing standard collaborative filtering with a hybrid model, lifting click-through 18% and engagement 24% across millions of daily recommendations.
Production AI assistants for story and TV discovery shipped across both apps.

### Mercor

EPM, remote, Feb to Apr 2026.
Quality optimization on frontier LLM-generated coding trajectories, evaluating agent reasoning and decision-making across 1,000+ open-source GitHub repositories to improve downstream fine-tuning.
An end-to-end evaluation pipeline spanning LLM code generation, expert human annotation, multi-tier review, and final delivery to leading research labs, holding quality benchmarks consistent across task cycles.
A distributed team of 50 to 100 domain experts directed through Airtable workflow orchestration, driving 95%+ on-time sprint delivery and cutting review turnaround 35%.

### Toyota

Software Engineer Intern, Plano, May to Aug 2025.
A distributed GenAI RAG system on LangChain, AWS Lambda, and ChromaDB, engineering 10+ specialized agents to autonomously process financial workflows for 500+ engineers.
A React front end over asynchronous backend services for natural-language queries across financial and technical documentation, reaching 100% team adoption.
A centralized Power BI financial tracking system replacing legacy Excel workflows, consolidating data from 20+ departments.

### Invariance

May 2026.
Governed AI that turns a natural-language prompt into a live multi-tenant re-theme, confining the model to a proposal stage bounded by brand and accessibility invariants and catching 100% of violations before publish.
A control plane on Neon Postgres with Drizzle, keeping schema as the source of truth for manifests, versioned per-tenant themes, rollback, audit trails, and prompts.
Each theme ships as an immutable, content-addressed Cloudflare R2 artifact behind the CDN with a short-TTL KV pointer on the hot path, so no source is ever rewritten at runtime.

### BriefCase

2026.
Chain-of-thought distillation for legal contract risk classification on CUAD, mapping 41 clause types onto a 10-class risk taxonomy over roughly 13k annotated clauses.
A 2x2 ablation crossing encoder type, DistilBERT against Legal-BERT, with training variant, vanilla against rationales generated by a locally hosted Llama-3.1-8B teacher, with rationales stripped at inference so every model classifies from the clause alone.
Best student reached 0.896 macro-F1.

The headline finding is that every fine-tuned student beat its own teacher's direct zero-shot inference by roughly 47 macro-F1 points, 0.40 against 0.87 and above, which identifies teacher competence on the task rather than the distillation framework as the bottleneck.
CoT's own effect, +0.26 and +0.33 macro-F1 on the two students, fell inside the single-seed noise band, while in-domain pretraining held a robust 2-point gap that CoT did not close.
This is reported as an honest negative result on the substitutability claim.

The pipeline is fully on-premise and reproducible end to end in 2.5 GPU-hours on a single A100 at $0 in external API fees.

The report PDF is copied to `public/BriefCase_CoT_Distillation_Report.pdf` and linked as `report`.
The GitHub repository stays private and is not linked.

### GARCH BTC

2025.
Hybrid GARCH with LSTM and Transformer volatility forecasting and Bayesian tuning.
GJR-GARCH implemented from scratch with Numba, with GARCH(1,1), EGARCH, and GJR-GARCH baselines benchmarked on MSE, AIC, and log-likelihood over Bitcoin log returns, and Optuna driving hyperparameter search.

This entry is deliberately qualitative.
The only source on disk is a midterm report whose results are preliminary, and the repository lives under a collaborator's account.
No performance figure is asserted.
If final results surface later, they can be added without restructuring the entry.

### About

The longer personal bio, plus the education and skills content moved off the home page unchanged.

## Out of scope

The opening animation on the reference site.
Any change to the bitter-lesson chart, the colour tokens, the typography, or the dotted-leader section headings.
Any new runtime dependency.

## Verification

`npm run lint` and `npm run build` both pass, and the export emits all six routes under `out/`.
The site is checked in a browser at desktop and mobile widths, since `EntryList` has a distinct sub-`sm` layout that the clickable change touches.
