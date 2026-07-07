---
sidebar_position: 1
ready: true
last_update:
  date: 2026-07-07
  author: Idris Abdulmumin
---

# Templates you can fork

*Every chapter ends with "template", "starting point", or "example". This is where they live.*

Reading the playbook is one thing; sitting in front of an empty document at the start of a project is another. This chapter holds the actual reusable templates the rest of the playbook points at — dataset cards, evaluation scripts, consent forms, project charters — as concrete starting points you can copy, rename, and adapt.

The rule for what belongs here: **every template is one file, forkable, with an editorial opinion attached, and cross-linked to the chapter that motivates it.** If a template does not have a chapter behind it explaining the rationale, it does not belong here yet.

## Download as PDF

Every template on this page has a **"Download as PDF"** button in the top-right corner (or bottom-right on narrow viewports). It opens your browser's print dialog with the AfriPlaybook print stylesheet applied — terracotta accent bar, forest-green headings, page counter, warm-sand code blocks — so the printed template is branded and readable, not a plain Docusaurus dump. Choose "Save as PDF" as the destination in the print dialog. Works on Chrome, Firefox, Safari, and Edge on desktop; mobile browsers offer the same option via the browser share sheet.

## Available now

- **[Dataset card template](./dataset-card.md)** — a Datasheets-for-Datasets-derived card extended with the African-context questions the playbook considers non-negotiable (community consent, script conventions, dialect coverage, code-switching, downstream re-use restrictions). The fork-and-fill template that should ship with every corpus release. Motivated by the [documentation](../6_documentation/documentation.md) chapter and the [legal, consent, and community IP](../legal-consent/index.md) chapter.
- **[Evaluation script skeleton](./evaluation-script.md)** — Python starting code that enforces the playbook's editorial policies: per-language reporting, per-class reporting, chrF-primary for translation, CER-primary for morphology-rich speech, mandatory human-eval sampling hook. Fork it, plug in your metric of choice, ship the compliance for free. Motivated by [core principles](../1_introduction/core-principles.md) and the [Before You Start](../before-you-start/index.md) chapter's editorial rules.
- **[Consent form template](./consent-form.md)** — the written form + oral protocol + community-consent addendum + ombudsperson-role sketch that together form a workable consent architecture for African-language NLP data collection with non-literate contributors and community-derived corpora. Motivated by the [legal, consent, and community IP](../legal-consent/index.md) chapter and by Step 0 of the [long-tail language onboarding](../long-tail-language/index.md) chapter.
- **[Annotation guidelines template](./annotation-guidelines.md)** — a task-agnostic starting point modelled on MasakhaNER 2's and AfriSenti's guideline structures. Covers definitions, decision procedure with corner cases, label set, orthography and diacritic handling, IAA target and cadence, adjudication, and the change log that makes guideline drift visible. Motivated by [Chapter 3 — Annotation Design](../3_annotation-design/annotation-task-design.md) and by every Case Study where guideline drift caused quality problems.
- **[Project charter template](./project-charter.md)** — the Step-0 community agreement covering purpose, parties, language and orthography, data scope, community IP and licence, team + timeline + budget, governance, deliverables, and ethics. The document that comes out of the community-consent consultation and is signed by the project lead, institutional sponsor, community stewards, and ombudsperson. Motivated by [long-tail language onboarding Step 0](../long-tail-language/index.md#step-0--before-any-data-collection).
- **[Model card template](./model-card.md)** — a Model-Cards-derived card extended with the deployment-realism sections the playbook argues are non-optional: target-tier latency (p50 + p95 on the deployment phone tier), quantised quality drop, code-switched evaluation, script-variant coverage, offline model-download UX, and voice-cloning risk for TTS. Motivated by the [deployment chapter](../deployment/index.md).
- **[Case-study retrospective template](../case-studies/retrospective-template.md)** — the seventeen-question retrospective structure used across the [Case Studies](../case-studies/index.md) chapter. Listed here for discoverability.

## The seven templates in one line each

If you are building a new African-language NLP project from Step 0 to deployment, you will fork these templates in roughly this order:

1. **Project charter** — sign it with the community BEFORE data collection.
2. **Consent form** — the workflow for individual + community + non-literate consent.
3. **Annotation guidelines** — version-controlled, with a change log.
4. **Evaluation script** — enforces per-language + per-class + chrF/CER-primary automatically.
5. **Dataset card** — ships alongside the corpus release.
6. **Model card** — ships alongside the model release, with the deployment-realism additions.
7. **Case-study retrospective** — after the project ships, contribute the seventeen answers back to the [Case Studies](../case-studies/index.md) chapter.

## Editorial rules for templates

- **One file per template.** No embedded sub-templates. If a starting point has more than one, split it.
- **A short header explaining what to change and why.** Every template ships with usage notes at the top; a raw file with no context is a link-farm, not a template.
- **Opinionated defaults.** A template that leaves every field blank is not a template, it is a form. Fill the defaults with the playbook's editorial preferences (chrF, per-language reporting, CC BY-NC 4.0, participatory workflow) and let the forking project override where its context differs.
- **Cross-linked back to the chapter that motivates it.** Any reader who finds a template first and does not know why the fields are what they are should be one click away from the reasoning.
- **Reviewed on the same six-month cadence as [Before You Start](../before-you-start/index.md).** Templates rot faster than prose; libraries change, licences update, sample data ages out. Every template ships with a "last reviewed" date.

## The one anti-pattern

Do not treat a template as authoritative just because it lives in the playbook. Every project has context the template does not know. The template is a starting point that saves you writing the boilerplate; the fields are yours to interrogate. A field you cannot answer honestly is a field the template got wrong for your case.
