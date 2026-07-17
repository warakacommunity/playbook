---
sidebar_position: 3
title: The three-layer stack
description: Layer 1 (Label Studio foundation) + Layer 2 (AfriAnnotate platform delta) + Layer 3 (Africa-language wedge). What each layer is and how they compose.
mdx:
  format: md
---

# The three-layer stack

AfriAnnotate has three layers. Each is independent; each does a job
the others don't.

## Layer 1 — the Label Studio foundation

Vanilla Label Studio gives us:

- **Declarative XML labeling config** — three tag families (Object,
  Control, Visual) composed without plugin code.
- **Modality selection via config, not code** — swap the Object tag
  and bind dataset fields with `value="$field"`. No plugin dev, no
  redeploy.
- **~119 built-in templates across 14 categories** — Computer Vision
  (15), NLP (8), Audio/Speech (10), Ranking and Scoring (9),
  Structured Data (5), Time Series (8), Videos (4), Conversational AI
  (5), Chat (5), LLM Fine-tuning (3), LLM Evaluations (5), ReactCode
  (3), Interfaces (6), Community Contributions (5).
- **First-class ASR + Speaker Diarization + Sound Event Detection
  templates** — pure XML, no plugin dev.
- **NLP templates** — NER, Sentiment / Text Classification, Taxonomy,
  Relation Extraction, Text Summarization, Machine Translation,
  Question Answering, Content Moderation.
- **Apache 2.0**, mature codebase, active community.

Layer 1 is why AfriAnnotate can ship a multi-modal declarative UI
without inventing our own editor. It's the load-bearing dependency.

## Layer 2 — the AfriAnnotate platform delta

Everything Label Studio doesn't ship in the open, or gates behind its
Enterprise tier. The full enumeration lives on
[Platform-specific features](/annotate/intro/why-afriannotate/platform-features); the summary here
is the positioning view.

### Team governance + RBAC

- **5 org roles** — Owner, Admin, Manager, Annotator, Reviewer.
- **Workspaces** inside an org so one org can partition projects
  across teams without spinning up new orgs.
- **Annotation audit log** + platform-wide `AuditEvent` for
  membership + role changes.

### Quality control + auto-suspension

- **Three auto-suspension evaluators:**
  - `inactivity` — max idle days threshold.
  - `low_agreement` — mean agreement below floor over rolling
    window, with `min_tasks` small-sample guard so a single bad task
    doesn't trigger suspension.
  - `rejection_rate` — reviewer rejection rate above ceiling over
    rolling window, with `min_reviews` sample-size guard.

  No enterprise CV / multimodal platform ships this. Everyone else
  routes disagreements to *manual* review — a manager clicks through
  and picks a winner. Toloka had an auto-QC feature but its Python
  SDK was archived in July 2024.

- **Agreement metrics library** — Cohen's Kappa, Krippendorff's
  alpha, Fleiss' kappa, custom metrics per project.
- **Review queue** with per-project settings for routing, sampling,
  and escalation.
- **Annotator evaluation** — tracks each annotator's quality
  trajectory, feeding both the auto-suspend evaluators and the manager
  dashboard.
- **Audio QC pipeline** with per-project config, dispatch mode, and
  auto-reject / auto-suspend actions on failure.
- **Label-drift detection** — flags when a label taxonomy has drifted
  across an annotator's submissions.
- **Dataset readiness scoring** — computes when a labelled dataset is
  ready for ML training.

### CAT in-editor

Not just an editable textarea — a real Translation Memory + Glossary
stack, integrated into the annotation UI, with industry-format
ingest.

- Segment-level TM with source/target/language pair.
- Glossary CRUD + auto term-extraction.
- Fuzzy TM lookup, backfill from existing TextArea translations, MT
  integration hooks.
- **XLIFF 1.2 + 2.x import** — one task per `<trans-unit>`. When the
  unit already carries a `<target>`, we seed the initial annotation
  with it so translators post-edit rather than translate-from-
  scratch. Notes + context-group carried through to `Task.meta` for
  provenance.
- **TMX round-trip depth** — notes, context, prop, alt-trans all
  survive both parse + emit, so translation memories built in Trados
  / Smartcat / memoQ come in and go out lossless.
- **DOCX flatten** — python-docx pass turns each non-blank paragraph
  (including cells nested in tables) into a task, with paragraph
  style (`Heading 1`, `Normal`, `List Bullet`, …) + running section
  counter stamped into `Task.meta`.
- Project-level knobs: suggestions on/off, TM scope (project / org /
  global), allowlisted TM sources.
- In-editor fuzzy suggestions rendered beside the editable target
  segment.

MateCat has 80+ file-format converters (InDesign / SDLXLIFF /
project-file variants) that we don't chase. AfriAnnotate covers the
three the translation industry actually ships day-to-day — XLIFF,
TMX, DOCX — *inside* a multi-modal platform, so voice + text +
translation work can all live in one project.

### Semantic + knowledge-base annotation (Phase 3.1)

Named Entity Linking + typed-attribute annotation without leaving the
labelling canvas.

- **`KnowledgeBase` model** at the org level — local, remote
  (external autocomplete endpoint), or Wikidata backends. Entries
  carry `external_id`, `label`, `aliases`, `description`.
- **`TypedFeatureLayer`** at the project level — feature definitions
  with dtypes (`string`, `boolean`, `integer`, `float`, `link`,
  `concept_kb_ref`), grouped by kind (span / relation / chain /
  document).
- **`<KBRef>`** control tag attaches a concept from a KB to a region.
  **`<TypedFeature>`** attaches a dtype'd attribute form to a region.
  Both compose on the same canvas as `<Labels>` + `<Text>`.
- **Named Entity Linking (KB-backed) template** ships out of the box
  under Natural Language Processing.

INCEpTION still goes deeper on formal typed-layer constraints
(alignable-vs-referring tiers, cascading cross-layer references) —
reach for it when the constraint system is the point of the project.
AfriAnnotate covers the everyday NEL + typed-attribute pattern inside
a multi-modal team platform.

### Multi-modal shared canvas (Phase 3.3)

`<MultiModalCanvas>` binds several time-based object tags (Audio,
Video, AudioTextAlign, TimeSeries, AudioRecord) into ONE labelling
surface with ONE playhead and ONE shared-region timeline. The `sync=`
attribute names a **sync group**; every child tag with the same
`sync=` value participates. Regions drawn on the shared strip apply
across every modality; per-tag regions (bounding boxes on Video,
waveform selections on Audio) still work orthogonally.

Payoff for the "one recording, many views" pattern common in speech,
gesture, and audio-video corpus annotation.

### Hugging Face Hub — bidirectional

The one thing no other general annotation platform ships:

- **Import** from the Hub with a column-mapping table (rename HF
  columns to your label config's expected fields inline), split
  picker, row limit, and provenance stamped on every task
  (`Task.meta.hf_dataset_id`, `hf_config`, `hf_split`,
  `hf_row_index`).
- **Push back** three ways: `fresh` (new dataset), `enrich-source`
  (add annotation columns onto the source repo — needs write access),
  or `fork` (source + annotations pushed to a new repo of your own).
- **Multi-annotator aggregation** — pick `majority` / `first` /
  `adjudicator` / `raw` on push; the output is a real
  `datasets.Dataset` with typed columns per label control-tag, not a
  raw JSON blob. Optional `_annotations` sidecar column when you want
  the full per-annotator provenance too.
- **Multi-dataset binding per project** — one AfriAnnotate project
  can be bound to several HF datasets simultaneously. Each binding
  gets its own Unbind + Push controls.
- **Dataset card** (README.md) shipped with each push carries SPDX
  license, consent template summary, annotator language, aggregation
  strategy used.

### Python SDK

`pip install afriannotate` gets you the whole platform in Python.
`Client(base_url, token)` with sub-clients for projects / tasks /
hub. Env vars `AFRIANNOTATE_BASE_URL` + `AFRIANNOTATE_TOKEN` skip
the per-call plumbing. Optional `[hub]` extra pulls in
`huggingface_hub` + `datasets` for Jupyter workflows.

### Consent + licensing + provenance

- **Consent snapshots** — frozen at accept-time (push flow) or
  apply-time (pull flow). Records exactly what the annotator agreed to.
  Auditable artefact.
- **Per-project SPDX license tree** — chosen via a Licensing wizard,
  attached as machine-readable metadata at design time. Not a README
  afterthought.
- **Code of conduct + region attestation** captured on application.

### Cross-org contributor flow

Push (owner invites) and pull (annotator applies to an open project) in
the *same table*, with a `direction` field. On approval, the same
membership plumbing fires for both flows.

### Offline + mobile (production-hardened, Phase 4)

- **Distinct per-project toggles** for annotator offline vs reviewer
  offline. Two booleans because letting an annotator work offline is a
  different risk profile from letting a reviewer approve offline.
- **Native shells** — Electron/Tauri desktop and Capacitor mobile,
  with a cloud-proxy middleware, on-device data model, and sync
  workers.
- **Write-through IndexedDB cache** for tasks, projects, annotations,
  and drafts. Reads local-first; writes hit the local cache and the
  outbox in one atomic step.
- **Resumable offline download** — per-project checkpoint survives
  cancel or crash. Cancel button runs a partial-cache-preserving
  abort path.
- **Outbox backoff + idempotency** — client-side `unique_id` on every
  pending mutation, `Retry-After` respected, capped max delay. No
  double-writes on flaky links.
- **Pointer-events touch parity** on Audio waveforms, Video canvases,
  Image / Video / TimeSeries drag runners — tablet / touch-first
  annotators draw regions and drag playheads with mouse-user fidelity.

### Safety + hygiene

- **`Cache-Control: no-store` on `/api/*`** — annotation data doesn't
  sit in the browser's HTTP cache after tab close.
- **Rate-limiting middleware** on read paths.
- **`robots.txt` disallow** for annotation URLs so they stay out of
  search indexes.

### Annotator experience

- **Annotator-language routing per project** — prevents mixing
  incompatible-language annotators on the same task.
- **Sampling strategies** — sequence / random / uncertain-first.
- **Label stream history** per task per annotator.
- **Project onboarding** checklists.
- **Project templates + reimport** — clone a working project into a
  new one; reimport updated source data without losing labels.

### Data science

- **Embedding client** for semantic search + similarity clustering
  across tasks. Owners can find near-duplicates or cluster-sample the
  queue.
- **Project summary + metrics API.**

## Layer 3 — the Africa-language wedge

Vanilla Label Studio's RTL and non-Latin support has been broken in
the open for three years — three GitHub issues still open, no
upstream fix merged, the RichText schema at source level whitelists
no directional attributes, and word boundaries are delegated to the
browser. Full detail on
[Honest comparisons § the Layer 3 wedge](/annotate/intro/why-afriannotate/honest-comparisons#the-layer-3-rtl--non-latin-wedge).

**AfriAnnotate has shipped this** — three commits close the gap, each
a targeted, upstreamable patch rather than a fork or rewrite:

1. **RichText schema whitelist extension.** The `TagAttrs` model on
   [`web/libs/editor/src/tags/object/RichText/model.js`](https://github.com/MasakhaneHubToolingProject/afriannotate/blob/production/web/libs/editor/src/tags/object/RichText/model.js)
   accepts four new optional string attributes — `dir`, `direction`,
   `lang`, and `unicodebidi`. The view layer passes them through to
   the rendered container in both inline and iframe render paths.
   `<Text dir="rtl" lang="ar" unicodeBidi="isolate">` renders bidi-
   correctly out of the box.
2. **ICU-backed word / sentence segmentation.** The LSF
   [`applyTextGranularity` utility](https://github.com/MasakhaneHubToolingProject/afriannotate/blob/production/web/libs/editor/src/utils/selection-tools.js)
   routes word and sentence granularity through
   `Intl.Segmenter(lang, {granularity})` when the tag carries a
   `lang`. Falls back to the browser `Selection.modify` path on
   missing `lang`, unsupported browsers, `paragraph` granularity,
   multi-container selections, or Segmenter errors.
3. **Six African-language NER template presets** ship under
   [`label_studio/annotation_templates/natural-language-processing/`](https://github.com/MasakhaneHubToolingProject/afriannotate/tree/production/label_studio/annotation_templates/natural-language-processing) —
   Arabic, Hausa Ajami, Kanuri Ajami, Fulfulde Ajami, Amharic Ge'ez,
   and Tamazight Tifinagh — each pre-configured with the correct
   `dir`, `lang`, and `granularity="word"` attributes.

See the [RTL / non-Latin script guide](/annotate/getting-started/rtl-non-latin)
for the author-facing interface, the three commit references, and the
sample data used to hand-test the stack end to end.

## How the layers stack

- **Layer 1 is the foundation.** It's what makes AfriAnnotate
  multi-modal and declaratively configurable without our reinventing
  an editor.
- **Layer 2 is the platform.** It's what turns Label Studio into
  AfriAnnotate the working annotation programme — team governance, QC,
  CAT, consent, licensing, offline, mobile, cross-org contributor
  flow, safety middleware.
- **Layer 3 is the wedge.** It's the Africa-language fix nobody else
  has shipped in the open, and it's what makes AfriAnnotate more than
  a re-brand of Label Studio + a wiki. Shipped.
