---
sidebar_position: 2
title: At a glance
description: Feature matrix across 26 annotation tools on 12 platform-level capabilities, and a "when to use which tool" guide. AfriAnnotate is the only tool that fills all 12 columns.
mdx:
  format: md
---

# At a glance

Two tables plus a guide. The first two tables show who ships what
across the 12 platform-level capabilities that actually matter once
you have more than one annotator. The third is honest guidance on
when to pick something else.

## Feature matrix — team platform capabilities

The first eight columns cover the platform-level capabilities you
need for real annotation work — team roles, in-editor translation
tooling, automatic quality control, contributor consent, licensing
metadata, safety middleware, offline mode, and crowdsource flow.

✓ = ships it. ✗ = does not. — = not documented. "Partial" = only under
a paid tier or with named caveats.

:::info Table is wide — scroll horizontally on smaller screens →
On narrow viewports (phones, tablets) the last few columns are
scrolled off-screen. Drag the table horizontally to see all eight
columns.
:::

<div className="wide-matrix">

| Tool | RBAC | CAT | Auto-suspend | Consent | License | Cache-safe | Offline | Crowd |
|---|---|---|---|---|---|---|---|---|
| **AfriAnnotate** | ✓ 6 roles | ✓ TM + glossary + TMX + fuzzy | ✓ 3 evaluators | ✓ per invite | ✓ SPDX + URL | ✓ middleware | ✓ per-project + hardened shells (Phase 4) | ✓ push + pull |
| Vanilla Label Studio | Partial (Enterprise) | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| INCEpTION | — | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| ELAN | ✗ (single-user) | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ (desktop) | ✗ |
| Audino | — | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| MateCat | — | ✓ specialist | ✗ | — | — | — | — | ✗ |
| OmegaT | ✗ (single-user) | ✓ specialist | ✗ | ✗ | ✗ | ✗ | ✓ (desktop) | ✗ |
| Doccano | — | ✗ | ✗ | ✗ | ✗ | ✗ | — | ✗ |
| Argilla 2.x | — | ✗ | ✗ | — | — | — | — | ✓ (min\_submitted) |
| Prodigy | ✗ (per-user licensed) | ✗ | ✗ | ✗ | ✗ | — | ✓ (self-hosted) | ✗ |
| Datasaur | ✓ (paid) | Partial (translation projects) | ✗ | — | — | — | ✗ | ✗ |
| tagtog | ✓ (org roles) | ✗ | ✗ | ✗ | ✗ | — | ✗ | ✗ |
| CVAT Community | — | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| CVAT Online / Enterprise | ✓ (paid) | ✗ | ✗ | — | — | — | ✗ | — |
| Roboflow | ✓ (paid) | ✗ | ✗ | — | ✓ dataset licence | — | ✗ | ✓ marketplace |
| Kili | ✓ 2-tier | ✗ | — | — | — | — | ✗ | — |
| Labelbox | ✓ 7 rigid | ✗ | ✗ | — | — | — | ✗ | — |
| SuperAnnotate | Partial | ✗ | — | — | — | — | ✗ | — |
| Encord | ✓ 5 roles + tabs | ✗ | Manual only | — | — | — | ✗ | — |
| Dataloop | Partial | ✗ | ✗ | — | — | — | ✗ | — |
| V7 Labs | ✓ 3 roles | ✗ | Manual only | — | — | — | ✗ | — |
| Prolific | ✗ 2-party | ✗ | — | — | — | — | ✗ | ✓ marketplace |
| Toloka / Mindrift AI | Requester + performer | ✗ | ✓ (SDK archived) | ✓ contract-layer | — | — | ✗ | ✓ marketplace |
| Amazon MTurk | ✗ 2-party | ✗ | Manual only | ✗ | ✗ | ✗ | ✗ | ✓ marketplace |
| Scale Rapid | — | ✗ | — | — | — | — | ✗ | ✓ workforce |
| Snorkel Flow | *(different category — programmatic labeling, not per-item annotation)* | | | | | | | |

</div>

## Feature matrix — semantic + integration capabilities

The next four columns cover capabilities added or matured in the
2026 release cycle: semantic annotation on top of NER (Phase 3.1),
shared multi-modal canvas for one-recording-many-views tasks (Phase
3.3), bidirectional Hugging Face Hub integration, and a first-class
Python SDK for scripting the platform. Reading side-by-side with the
first matrix answers the "who ships all 12?" question.

:::info Table is wide — scroll horizontally on smaller screens →
Cells in this table carry more detail than the first matrix.
On phone-width viewports, drag horizontally to see the trailing
columns.
:::

<div className="wide-matrix">

| Tool | KB + typed features | Multi-modal shared canvas | HF Hub bidirectional | Python SDK |
|---|---|---|---|---|
| **AfriAnnotate** | ✓ `<KBRef>` + `<TypedFeature>` + NEL template (Phase 3.1) | ✓ `<MultiModalCanvas>` + sync groups (Phase 3.3) | ✓ 3-tab wizard + multi-dataset binding + 3 push modes + 4 aggregation strategies | ✓ `pip install afriannotate` |
| Vanilla Label Studio | ✗ | ✗ | ✗ (community integrations only) | ✓ `label-studio-sdk` |
| INCEpTION | ✓ deeper on formal typed-layer constraints | ✗ (text-only) | ✗ | — (community pycaprio, not official) |
| ELAN | Partial (typed tiers) | ✓ audio + video + tiers under one player (single-user) | ✗ | — (community pympi, not official) |
| Audino | ✗ | ✗ | ✗ | — |
| MateCat | ✗ | ✗ | ✗ | ✗ |
| OmegaT | ✗ | ✗ | ✗ | ✗ (Java tool) |
| Doccano | ✗ | ✗ | ✗ | ✓ `doccano-client` |
| Argilla 2.x | ✗ (metadata, not KB backend) | ✗ (text-only) | ✓ (text-only import + push) | ✓ `argilla` |
| Prodigy | ✗ | ✗ | ✗ | ✓ (native Python tool) |
| Datasaur | Partial (entity dictionaries) | ✗ (text-only) | — | ✓ (Datasaur Python SDK) |
| tagtog | ✓ hierarchical entity types + typed features | ✗ (text-only) | — | — |
| CVAT Community | ✗ | ✗ | — | ✓ `cvat-sdk` |
| CVAT Online / Enterprise | ✗ | ✗ | — | ✓ `cvat-sdk` |
| Roboflow | ✗ | ✗ | ✓ (export to HF) | ✓ `roboflow` |
| Kili | — | — | — | ✓ `kili-python-sdk` |
| Labelbox | Partial (entity ontologies) | — | — | ✓ `labelbox` |
| SuperAnnotate | — | — | — | ✓ `superannotate` |
| Encord | Partial (entity ontologies) | — | — | ✓ `encord` |
| Dataloop | — | — | — | ✓ `dtlpy` |
| V7 Labs | — | — | — | ✓ `darwin-py` |
| Prolific | ✗ | ✗ | ✗ | ✗ |
| Toloka / Mindrift AI | ✗ | ✗ | — | ✓ (SDK archived July 2024) |
| Amazon MTurk | ✗ | ✗ | ✗ | ✓ (via `boto3`) |
| Scale Rapid | — | — | — | — (REST only) |

</div>

### What the matrix says

- **AfriAnnotate is the only tool that fills all 12 columns.** Every
  competitor has at least three ✗ or — across the two tables.
- **Per-project license tree is unique** — no other tool documents it.
- **Automatic annotator suspension is a market outlier.** Every
  enterprise CV / multimodal platform routes disagreement to manual
  review. AfriAnnotate ships three evaluators that suspend
  automatically — the only actively-maintained implementation in the
  space (Toloka's Python SDK was archived in July 2024).
- **CAT-in-annotation is unique for a general tool.** MateCat and
  OmegaT are the CAT specialists; AfriAnnotate is the only general
  annotation platform that ships TM + glossary + TMX + fuzzy in the
  editor.
- **Semantic + KB annotation is now shipped, not deferred.** Phase 3.1
  closed the everyday-NEL gap — `KnowledgeBase` at org level,
  `TypedFeatureLayer` at project level, `<KBRef>` and `<TypedFeature>`
  control tags. INCEpTION still goes deeper on formal typed-layer
  constraints; tagtog covers the hierarchical-entity case. Everyone
  else in the matrix shows ✗ or —.
- **Shared multi-modal canvas is unique among team platforms.** ELAN
  has it as a single-user desktop tool; AfriAnnotate is the only
  team-platform tool with `<MultiModalCanvas>` binding Audio, Video,
  AudioTextAlign, and TimeSeries under one playhead with shared
  regions.
- **HF Hub bidirectional depth is unmatched outside Argilla.** Argilla
  2.x is the closest peer but is text-only. AfriAnnotate's bidirectional
  flow (3-tab wizard, multi-dataset binding, three push modes, four
  aggregation strategies, typed-column output, dataset card with SPDX
  licence + consent + language metadata) is unique across multi-modal
  tools.

## When to use which tool

AfriAnnotate is not always the right answer. Here's when to reach for
something else.

| Task profile | Best tool | Why |
|---|---|---|
| Deep semantic / knowledge-base-linked text annotation with typed features (String, Integer, Float, Boolean, Link, Concept-KB reference) | **AfriAnnotate covers the core (Phase 3.1); INCEpTION goes deeper on formal constraints** | AfriAnnotate ships a `KnowledgeBase` model with local / remote / Wikidata backends, per-project `TypedFeatureLayer`s, and `<KBRef>` + `<TypedFeature>` control tags — plus a Named Entity Linking template out of the box. Reach for INCEpTION when the formal typed-layer constraint system (alignable-vs-referring tiers, cascading layer constraints) is the point of the project. AfriAnnotate matches the everyday NEL + typed-attribute pattern *inside* a multi-modal team platform. |
| Field-linguistic tier annotation on aligned audio/video (alignable-vs-referring tiers, cascading constraints) | **AfriAnnotate covers the core (Phase 3.2); ELAN goes deeper on formal constraints** | AfriAnnotate's `<AudioTextAlign>` now takes an ELAN-style `tiers="utterance,word:utterance:subdivision"` hierarchy and imports `.eaf` files directly, so an ELAN corpus can move into a multi-user platform with cloud sync, RBAC, and review flow. Reach for **ELAN** when the full formal tier-type model (cascading Time Subdivision / Symbolic Subdivision / Symbolic Association constraints, hierarchical parent-child semantics) is load-bearing — advanced computational phonetics, strict field-linguistic tier inheritance. ELAN is single-user desktop only. |
| Multi-modal team work — one recording, many views (audio + video + tier-aligned transcript, or interview + speaker-diarised audio, all in the same task) | **AfriAnnotate** | The only tool with a shared multi-modal canvas (`<MultiModalCanvas>`, Phase 3.3) that binds Audio / Video / AudioTextAlign / TimeSeries under ONE playhead with shared regions across every modality. All six modalities (text + audio + image + video + time-series + PDF) covered with declarative config, templates, and platform (RBAC / QC / CAT / consent / license / offline). |
| Translation-only with 80+ file formats, XLIFF/DOCX/TMX depth, industry-grade TM | **MateCat or OmegaT** | Specialist CAT tools with file-format breadth AfriAnnotate doesn't try to replicate. AfriAnnotate matches the core TM + glossary + fuzzy workflow inside a multi-modal tool. |
| Computer-vision-only (bbox / polygon / segmentation / 3D point cloud with AI-assisted pose and tracking) | **CVAT** | Best-in-class CV coverage; 3D point cloud is in the free Community edition. The polished QC UI is paywalled. |
| Crowdsourced label collection with a fixed-template UI and paid worker pool | **Prolific** (academic + demographic targeting) or **Toloka/Mindrift** (strong contract-layer consent regime) | Both bring paid worker pools that AfriAnnotate doesn't. AfriAnnotate ships a pull-flow crowdsource (approved annotators apply into open projects) but not a paid pool. |
| African-language corpus work with RTL / non-Latin scripts (Arabic, Hausa Ajami, Kanuri, Fulfulde Ajami, Amharic Ge'ez, Tifinagh) | **AfriAnnotate** | Vanilla Label Studio's RTL support has been broken in the open for 3+ years (issues #1888, #2653, #6642 still open). Doccano's fix is scoped to sequence-labeling only. AfriAnnotate ships the fix as three targeted patches — RichText schema whitelist accepts `dir` / `direction` / `lang` / `unicodeBidi`, ICU-backed word / sentence segmentation via `Intl.Segmenter` keyed off the tag's `lang`, and six African-language NER template presets covering Arabic, Hausa Ajami, Kanuri Ajami, Fulfulde Ajami, Amharic Ge'ez, and Tamazight Tifinagh. See [RTL / non-Latin script guide](/annotate/getting-started/rtl-non-latin). |
| Strict data-governance work (SPDX per-project license, per-contributor consent snapshot, audit-safe caching) | **AfriAnnotate** | The only tool that ships all three in one place. |
| LLM / feedback / preference data collection with Hugging Face Hub integration | **AfriAnnotate or Argilla 2.x** | Both do this well now. **AfriAnnotate** ships bidirectional HF Hub — import via a 3-tab wizard with column mapping and provenance-stamped tasks, multi-dataset binding per project, push back three ways (`fresh` / `enrich-source` / `fork`) with four aggregation strategies (`majority` / `first` / `adjudicator` / `raw`), typed-column output per label control-tag, dataset card with SPDX license + consent + language metadata baked in. See [Hugging Face Hub walkthrough](/annotate/getting-started/hf-hub). **Argilla 2.x** is text-only but is the incumbent for LLM feedback / preference specifically — reach for it when the corpus is purely text feedback and you want Argilla's specific FeedbackDataset flow. AfriAnnotate covers the same round-trip inside a multi-modal team platform. |
| Programmatic labeling / weak supervision at scale (labeling functions, not per-item manual labeling) | **Snorkel Flow** | Different category — a data development platform, not a per-item annotation tool. |
