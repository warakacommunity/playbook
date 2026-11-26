---
sidebar_position: 1
ready: true
last_update:
  date: 2026-11-26
  author: Shamsuddeen Hassan Muhammad
---

# Templates you can fork

This chapter holds the reusable templates the rest of the playbook points at (dataset cards, evaluation scripts, consent forms, project charters) as concrete starting points you can copy, rename, and adapt.

The rule for what belongs here: **every template is one file, forkable, with an editorial opinion attached, and cross-linked to the chapter that motivates it.** If a template does not have a chapter behind it explaining the rationale, it does not belong here yet.

## Save a template as PDF

Each template page has a **Download PDF** button next to the page contents menu. It opens your browser's print dialog with a print layout that hides the site menus. Choose **Save as PDF** as the destination. This works in current desktop browsers; on a phone, use the browser's share or print option instead.

## Available now

The templates are grouped by the stage of a project where you first need them.

### Plan and agree

- **[Dataset search log](./search-log.md)**: a fill-in log of where you searched for existing datasets, what you found, what you decided, and whom you contacted. Use it before you plan a new dataset.
- **[Project charter](./project-charter.md)**: the Step 0 community agreement. It covers purpose, parties, language and orthography, data scope, community IP and licence, team, timeline and budget, governance, deliverables and ethics. It comes out of the community consultation and is signed by the project lead, institutional sponsor, community stewards and ombudsperson. Motivated by [long-tail language onboarding Step 0](../long-tail-language/index.md#step-0-before-any-data-collection).
- **[Sustainability plan](./sustainability-plan.md)**: who looks after the dataset once the grant ends, where it is hosted, how errors and updates are handled, what it costs each year, and who pays. Any paid services must keep the data under its chosen licence. Motivated by the [Governance Toolkit](../governance-toolkit/index.md) and the [Dataset Lifecycle](../9_dataset-lifecycle/index.md) chapter.

### Consent, privacy and people

- **[Consent form](./consent-form.md)**: a written form, an oral consent protocol, a community consent addendum and an ombudsperson role. Together they give a workable consent process for contributors who may not read or write, and for community-derived corpora. Motivated by the [legal, consent, and community IP](../legal-consent/index.md) chapter and Step 0 of the [long-tail language onboarding](../long-tail-language/index.md) chapter.
- **[Privacy notice](./privacy-notice.md)**: a fill-in notice covering the controller and processors, data categories and legal bases, who can see what, storage and transfers, retention, contributor rights, children, and dated changes. Use it alongside the consent form, not instead of it.
- **[Contributor agreement](./contributor-agreement.md)**: the terms for volunteers and collaborators whose work becomes part of a dataset: scope, rights granted, pay and how the contributor is credited (name, pseudonym or anonymous), data handling, and how either side can end the arrangement. Motivated by the [Governance Toolkit](../governance-toolkit/index.md) and the [data governance](../data-governance/index.md) chapter.
- **[Annotator contract](./annotator-contract.md)**: for paid annotation, transcription or translation work. The full contract is still in draft; the review, rejection and appeal clause is ready to use now. Motivated by the [Governance Toolkit](../governance-toolkit/index.md) and [Project Management](../project-management/index.md).

### Build and evaluate

- **[Annotation guidelines](./annotation-guidelines.md)**: a task-agnostic starting point that draws on practice in MasakhaNER 2 and AfriSenti. It covers definitions, a decision procedure with corner cases, the label set, orthography and diacritics, agreement targets, adjudication, and a change log that makes guideline drift visible. Motivated by the [Annotation Design](../3_annotation-design/annotation-task-design.md) chapter.
- **[Evaluation script](./evaluation-script.md)**: Python starter code that builds in the playbook's evaluation positions: per-language and per-class reporting, chrF first for translation, CER first for speech, and a sampling hook for human evaluation. Plug in your own metric and keep the reporting shape. Motivated by the positions in [What this playbook is not](../1_introduction/scope-and-strategy.md#what-this-playbook-is-not).

### Release and reflect

- **[Dataset card](./dataset-card.md)**: a card derived from Datasheets for Datasets, with the African-context questions the playbook treats as essential: individual and community consent, script and orthography, dialect coverage, code-switching, and uses the dataset should not be put to. Ship it with every corpus release. Motivated by the [documentation](../6_documentation/documentation.md) and [legal, consent, and community IP](../legal-consent/index.md) chapters.
- **[Model card](./model-card.md)**: a card derived from Model Cards, with the deployment sections the playbook argues for: latency on the target device tier (p50 and p95), quality lost to quantisation, code-switched and script-variant evaluation, offline model download, and task-specific risks such as voice cloning for TTS. Motivated by the [deployment chapter](../deployment/index.md).
- **[Case-study retrospective](../case-studies/retrospective-template.md)**: the seventeen-question structure used across the [Case Studies](../case-studies/index.md) chapter. Listed here so it is easy to find.

:::note[Related records in the Documentation chapter]

Two more fill-in records live with the chapter that explains them: the [data ownership record](../6_documentation/data-ownership.md) and the [licensing agreement template](../6_documentation/licensing.md#licensing-agreement-template). For a data collection plan, see [Cost and Resource Planning](../2_data-collection/6_cost-resource-planning.md).

:::

## The templates in one line each

If you are building a new African-language NLP project from Step 0 to deployment, you will fork these templates in roughly this order:

1. **Project charter**: sign it with the community before data collection.
2. **Consent form** and **privacy notice**: individual, community and oral consent, and how personal data is handled.
3. **Contributor agreement** and **annotator contract**: before anyone contributes or is paid.
4. **Sustainability plan**: draft it at design time, so the grant budget covers the years after release.
5. **Annotation guidelines**: version-controlled, with a change log.
6. **Evaluation script**: per-language and per-class reporting, with chrF or CER first.
7. **Dataset card**: ships with the corpus release.
8. **Model card**: ships with the model release, with the deployment additions.
9. **Case-study retrospective**: after the project ships, contribute your seventeen answers to the [Case Studies](../case-studies/index.md) chapter.

## Editorial rules for templates

- **One file per template.** No embedded sub-templates. If a starting point has more than one, split it.
- **A short header explaining what to change and why.** Every template starts with usage notes. A raw file with no context is a link farm, not a template.
- **Opinionated defaults.** A template that leaves every field blank is just a form. Fill the defaults with the playbook's editorial preferences (chrF, per-language reporting, CC BY 4.0 for open release with CC BY-NC by documented exception, participatory workflow), and let the forking project override them where its context differs.
- **Cross-linked back to the chapter that motivates it.** A reader who finds a template first should be one click away from the reasoning behind its fields.
- **Reviewed every six months.** Templates go out of date faster than prose: libraries change, licences are updated, sample data ages. Each template should show a "last reviewed" date.

## The one anti-pattern

Do not treat a template as authoritative just because it lives in the playbook. Every project has context the template does not know. The template is a starting point that saves you writing the boilerplate; the fields are yours to interrogate. A field you cannot answer honestly is a field the template got wrong for your case.
