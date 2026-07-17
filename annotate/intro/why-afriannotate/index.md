---
sidebar_position: 1
title: Overview
description: Why AfriAnnotate is the better annotation platform for African NLP work — multi-modal coverage, full team governance, in-editor CAT, per-project license + consent, offline + mobile, shipped RTL and non-Latin script support. Open source.
mdx:
  format: md
---

# Why AfriAnnotate

AfriAnnotate is a self-hostable, open-source annotation platform for
African-language NLP teams. It covers text, audio, image, video,
time-series, HTML and PDF in one tool, ships with full team governance
(five roles, review queue, agreement metrics, automatic annotator
suspension), an in-editor CAT stack (translation memory, glossary,
TMX), per-project SPDX licensing and per-contributor consent capture,
and native desktop + mobile shells with offline annotation. And it's
built to close the RTL and non-Latin script gaps other tools leave
open.

**Nothing else on the market ships all of that in one place. Most
don't ship half.**

## What you get

### One tool for every modality

Text, audio (ASR / diarization / speaker ID / sound events), image
(bbox, polygon, keypoints, segmentation), video, HTML/PDF, time-series,
and conversational data — all with declarative XML config, no plugin
development, no redeploys. Compose them freely: transcribe → translate
→ classify sentiment in a single task. Around 119 built-in templates
across 14 categories are ready out of the box.

### Team governance built in

Five roles (Owner / Admin / Manager / Annotator / Reviewer), workspaces
inside an org, review queues with per-project routing and sampling,
agreement metrics (Cohen's Kappa, Krippendorff's alpha, Fleiss' kappa,
custom), and full audit logs.

### Automatic annotator quality control

Three built-in evaluators — inactivity, low-agreement (with
small-sample guards), and rejection-rate — that suspend annotators
whose work drops below a threshold. No competing enterprise platform
ships this: everyone else routes disagreements to *manual* review.

### Translation work as a first-class citizen

A real CAT stack inside the annotation UI: Translation Memory (project
/ org / global scope), fuzzy TM lookup, glossary + auto term
extraction, in-line suggestions next to the editable target segment,
and industry-format ingest — **XLIFF 1.2 + 2.x**, **TMX** with round-
trip depth (notes / context / prop / alt-trans), and **DOCX flatten**
that turns any Word document into per-paragraph tasks with heading /
style / section provenance. Post-edit workflows are first-class:
XLIFF units with an existing `<target>` seed the initial annotation
so translators refine instead of translate-from-scratch. No general
annotation platform ships this. Specialist CAT tools like MateCat and
OmegaT go deeper on very-large XLIFF corpora and DOCX round-trip
formatting; AfriAnnotate covers the core annotation-time workflow
*inside* a multi-modal tool, without leaving for a separate CAT app.

### Semantic + knowledge-base annotation

Named Entity Linking + typed-attribute annotation are first-class.
A `KnowledgeBase` model (local / remote / Wikidata backends) plus
per-project `TypedFeatureLayer`s power two new control tags —
**`<KBRef>`** for concept linking and **`<TypedFeature>`** for
dtype'd attribute forms (`string`, `boolean`, `integer`, `float`,
`link`, `concept_kb_ref`). The Named Entity Linking (KB-backed)
template ships out of the box; INCEpTION still goes deeper on formal
typed-layer constraints, but the everyday NEL + typed-attribute
pattern now lives inside AfriAnnotate.

### One shared canvas for multi-modal recordings

**`<MultiModalCanvas>`** binds Audio + Video + AudioTextAlign +
TimeSeries + AudioRecord into one labelling surface with one playhead
and a shared-region timeline. Play/pause on any child drives all;
regions drawn on the shared strip apply across every modality. The
"one recording, many views" pattern common in speech, gesture, and
audio-video corpus annotation, without switching context. AudioTextAlign
now also supports **ELAN tier hierarchy** and **`.eaf` import**, so
field-linguistics workflows that used to require ELAN desktop can
happen in a multi-user platform.

### Hugging Face Hub — bidirectional, first-class

Not just an export button. **Import** any HF dataset (public or
private/gated with your token) into a project with a column-mapping
picker so the HF columns match your label config's field names,
select the split + row limit, keep provenance stamped on every task.
Annotate normally. Then **push back three ways**: fresh (a brand-new
dataset), enrich-source (add annotation columns onto the source
dataset — you need write access), or fork (source + annotations to
your own repo). Multi-annotator projects pick an aggregation
strategy — majority vote, first, adjudicator, or raw — and the
output is a real `datasets.Dataset` with typed columns per label
control-tag, not a raw JSON blob. Multi-dataset binding per project
is supported; a single project can pull from several HF datasets
and push each one back independently. Dataset cards ship with SPDX
license + consent template + language metadata baked in.

### Python SDK — `pip install afriannotate`

Scripting layer for the whole platform. `Client(base_url, token)`
gets you `projects.list() / get() / create() / delete()`,
`upload_tasks()`, `tasks(only_labelled=True)` for streaming,
`export()`, and the full HF Hub round-trip
(`hub.import_() / hub.push() / hub.source()`). Optional `[hub]`
extra pulls in `huggingface_hub` + `datasets` for Jupyter workflows.
Env vars `AFRIANNOTATE_BASE_URL` + `AFRIANNOTATE_TOKEN` skip the
per-call plumbing.

### Consent, licensing, and provenance you can defend

Per-project SPDX license (picked via a Licensing wizard, attached as
machine-readable metadata), per-contributor consent snapshots frozen
at accept/apply time, code-of-conduct + region attestation captured
upfront. Datasets ship with their license and their consent trail
attached — not as a README afterthought.

### Cross-org contributor pull-flow

Annotators outside your org can apply into open projects. Same table,
same consent plumbing, same review flow. Grow the pool without
opening a new org.

### Offline + native mobile + desktop (production-hardened)

Distinct per-project toggles for annotator offline vs reviewer offline
(different risk profiles), Capacitor mobile shells and Electron/Tauri
desktop shells with a sync middleware built for spotty connectivity.
Phase 4 hardened the mobile / browser side: **write-through IndexedDB
cache** for tasks / projects / annotations / drafts; **resumable
offline download** with per-project checkpoints that survive cancel
or crash; **outbox backoff + idempotency** (client `unique_id`,
`Retry-After` respected) so flaky links never double-write;
**pointer-events touch parity** on Audio, Video, Image, TimeSeries
canvases for tablet-first annotators; mobile side-panels collapse by
default on narrow viewports.

### Safety + security by default

Multiple layers, no ad-hoc plumbing:

- **`Cache-Control: no-store` on `/api/*`** — annotation data doesn't
  sit in the browser cache after tab close.
- **Rate limiting** on read paths.
- **`robots.txt` disallow** for `/api/`, `/projects/`, `/users/`,
  `/organization/` so annotation URLs stay out of search indexes.
- **Annotator-language routing** per project so incompatible-language
  annotators can't mix on the same task — a real quality risk for
  multi-lingual corpora.
- **Third-party token encryption at rest.** Hugging Face Hub PATs
  (and any future W&B / Comet / SageMaker token you paste in) are
  stored via a Fernet-encrypted field keyed off a dedicated
  `HF_TOKEN_ENCRYPTION_KEY` env var (with a `SECRET_KEY`-derived
  fallback for dev). API responses never return the raw value — only
  a boolean `has_hf_token` flag. DB-only compromise (leaked backup,
  read-only replica) can't turn ciphertext into a usable token.
- **Audit log** for token mutations. Every set / clear of a
  third-party token emits an `AuditEvent` with actor, IP, timestamp,
  and a 3-char token prefix as flavour metadata — **never** the raw
  value.
- **Hash-chained consent audit log** with signed PDF/CSV receipts +
  per-purpose granular consent (GDPR Art. 7(2)) + withdrawal ledger
  + auto-reprompt on next labelling visit.
- **Full RBAC** across five org roles with a role permission matrix
  enforced at the queryset level, not just the URL router.
- **Session timeout policy** + JWT signing key rotation on demand.

Full write-up: [Security model](/annotate/platform-admin/security).

### African-language readiness — shipped

Vanilla Label Studio's RTL and non-Latin script support has been
broken in the open for three years — three GitHub issues still open,
no upstream fix merged, no directional attributes on the RichText
schema, word boundaries delegated to the browser. AfriAnnotate closed
this gap in three targeted commits:

- **`<Text dir="rtl" lang="ar" unicodeBidi="isolate">` reaches the
  DOM** — the RichText schema now accepts four new optional string
  attributes (`dir`, `direction`, `lang`, `unicodebidi`), passed
  through to the rendered container in both inline and iframe render
  paths. `<Text dir="rtl">` renders right-to-left instead of being
  silently stripped by the MobX-State-Tree type checker.
- **`Intl.Segmenter` powers word / sentence boundaries** — the LSF
  `applyTextGranularity` utility routes word and sentence granularity
  through ICU-backed segmentation whenever the tag carries a `lang`
  attribute. Amharic Ge'ez word boundaries, Arabic ligature handling,
  and Tifinagh segmentation get the same fidelity as Latin scripts.
  Falls back gracefully to the browser path on missing `lang`,
  unsupported browsers, `paragraph` granularity, multi-container
  selections, or Segmenter errors.
- **Six African-language NER template presets** ship in the labelling
  picker — Arabic, Hausa Ajami, Kanuri Ajami, Fulfulde Ajami,
  Amharic Ge'ez, and Tamazight Tifinagh — each pre-configured with
  the correct `dir` + `lang` + `granularity="word"` attributes.

See the [RTL / non-Latin script guide](/annotate/getting-started/rtl-non-latin)
for the shipped author interface and the three commit references.

## Read next

- **[At a glance](/annotate/intro/why-afriannotate/at-a-glance)** — feature matrix and a "when to
  use which tool" table.
- **[The three-layer stack](/annotate/intro/why-afriannotate/layers)** — the foundation, the
  platform delta, the Africa-language wedge, in one page.
- **[Platform-specific features](/annotate/intro/why-afriannotate/platform-features)** — the full
  enumeration of everything AfriAnnotate adds on top of Label Studio.
- **[Honest comparisons](/annotate/intro/why-afriannotate/honest-comparisons)** — tool by tool: vs
  vanilla Label Studio, vs Doccano, vs enterprise CV suites, vs the
  crowdsource marketplaces, vs the single-modality specialists.
- **[For African NLP teams](/annotate/intro/why-afriannotate/african-context)** — what
  AfriAnnotate does specifically for African-language annotation work.
