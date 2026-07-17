---
sidebar_position: 5
title: For African NLP teams
description: What AfriAnnotate does specifically for African-language annotation work — the tooling layer no one else has built for this community.
mdx:
  format: md
---

# For African NLP teams

No African-founded organisation has shipped an open-source annotation
*platform* of its own. Masakhane, Ghana NLP, Lelapa AI and others
produce excellent work — but annotation itself is coordinated off-repo
through volunteer networks or delegated to labelling vendors. There
is no in-continent tooling layer purpose-built for African-language
annotation work.

**AfriAnnotate is that layer.**

## What ships today

### Annotator-language routing per project

Assign an annotator language at the project level. The router prevents
incompatible-language annotators from being dispatched to the same
task. A real quality risk for African-language corpora that other
tools don't address.

### Per-project SPDX license tree

Pick your license at design time (CC-BY-4.0, CC0, CC-BY-SA, custom)
via a Licensing wizard. The choice attaches as machine-readable
metadata to the project and its exports. No README afterthought.

### Per-contributor consent snapshot

Frozen at accept-time (for owner-invited annotators) or apply-time
(for annotators applying via the pull-flow). Records exactly what the
annotator agreed to. An auditable artefact — the same class of thing
Toloka's contract-layer consent regime gives, but self-hosted and
inside your open-source stack.

### CAT stack in the editor

Translation Memory + Glossary + TMX import/export + in-editor fuzzy
suggestions. Segment-level TM with source/target/language pair,
project/org/global scope, allowlisted TM sources, auto term-extraction.
For translation and MT post-editing work — the workhorse of a lot of
African-language corpus building — the tool matches the specialist
CAT tools on the core workflow while keeping everything in one
platform.

### Cross-org contributor pull-flow

Approved annotators from outside your org can apply into open
projects. Consent is captured on apply. Same review flow as owner-
invited annotators. Grow the pool without spinning up new orgs or
paying a marketplace fee.

### Native mobile + desktop with offline

Capacitor mobile shells and Electron/Tauri desktop shells with a
cloud-proxy middleware and on-device sync workers. Distinct
per-project toggles for annotator-offline vs reviewer-offline (they
carry different risk profiles). Built for spotty connectivity.

### Safety by default

`Cache-Control: no-store` on `/api/*` — annotation data doesn't sit in
the browser cache. Rate limiting on read paths. `robots.txt` disallow
for annotation URLs.

## The RTL and non-Latin script gap — being closed

Vanilla Label Studio's RTL and non-Latin support has been broken in
the open for three years. Doccano's RTL fix is scoped to
sequence-labeling only. Neither is a viable foundation for Arabic-
script or non-whitespace-tokenised African-language work.

AfriAnnotate's answer is a targeted, upstreamable set of patches on
top of Label Studio — not a fork:

- Patch the RichText schema whitelist to accept `dir`, `direction`,
  `lang`, and `unicode-bidi` attributes.
- Ship African-language template presets with the RTL Style block
  pre-configured — Arabic, Hausa Ajami, Kanuri, Fulfulde Ajami,
  Amharic Ge'ez, Tifinagh.
- Add ICU-based word-boundary segmentation for scripts without
  whitespace guarantees, replacing the current browser-delegated
  behaviour.

Detail on this and the source-level evidence for the gap:
[Honest comparisons § the Layer 3 wedge](/annotate/intro/why-afriannotate/honest-comparisons#the-layer-3-rtl--non-latin-wedge).

## Where AfriAnnotate fits alongside the existing ecosystem

- **Masakhane and Ghana NLP** produce datasets, models and community.
  AfriAnnotate is the annotation tool their next dataset can be built
  in.
- **Lelapa AI's** InkubaLM disclosures document dataset provenance
  transparently but publish nothing about annotation tooling,
  governance, QC, or consent. AfriAnnotate is the toolset that closes
  that documentation gap for downstream teams.
- **Ghana NLP's Khaya Android** shows African annotation UIs work when
  they meet users where they are — a translation app with an in-app
  correction flywheel folded back into fine-tuning. AfriAnnotate ships
  the mobile shells, the sync middleware, and the consent capture to
  build the next one of those.
- **Common Voice** ships a speech-donation surface — narrow scope, and
  not the same category. AfriAnnotate is the platform for the broader
  labelling work that follows.
- **Lanfrica** catalogs the field. AfriAnnotate is where new work
  gets built.
