---
sidebar_position: 1
---

# Templates you can fork

*Every chapter ends with "template", "starting point", or "example". This is where they live.*

Reading the playbook is one thing; sitting in front of an empty document at the start of a project is another. This chapter holds the actual reusable templates the rest of the playbook points at — dataset cards, evaluation scripts, consent forms, project charters — as concrete starting points you can copy, rename, and adapt.

The rule for what belongs here: **every template is one file, forkable, with an editorial opinion attached, and cross-linked to the chapter that motivates it.** If a template does not have a chapter behind it explaining the rationale, it does not belong here yet.

## Available now

- **[Dataset card template](./dataset-card.md)** — a Datasheets-for-Datasets-derived card extended with the African-context questions the playbook considers non-negotiable (community consent, script conventions, dialect coverage, code-switching, downstream re-use restrictions). The fork-and-fill template that should ship with every corpus release. Motivated by the [documentation](../6_documentation/) chapter and the [legal, consent, and community IP](../legal-consent/index.md) chapter.
- **[Evaluation script skeleton](./evaluation-script.md)** — Python starting code that enforces the playbook's editorial policies: per-language reporting, per-class reporting, chrF-primary for translation, CER-primary for morphology-rich speech, mandatory human-eval sampling hook. Fork it, plug in your metric of choice, ship the compliance for free. Motivated by [core principles](../1_introduction/core-principles.md) and the [Before You Start](../before-you-start/index.md) chapter's editorial rules.

## Coming next

The templates below are named in the [scope-and-strategy chapter](../1_introduction/scope-and-strategy.md) but not yet published. Contribute one you have used in production — see the [contribution guide](https://github.com/warakacommunity/AfriPlaybook/blob/main/README.md#ways-to-contribute).

- **Annotation guidelines template** — task-agnostic starting point for a new corpus's guidelines document. Modelled on MasakhaNER 2's and AfriSenti's guideline structures.
- **Consent form template** — non-literate-friendly consent workflow with the audio-recorded-consent pattern, external witness, and stored-with-the-data record. Motivated by the [legal, consent, and community IP](../legal-consent/index.md) chapter.
- **Project charter template** — Step-0 community agreement covering orthography, use case, and community-IP framework before data collection begins. Motivated by the [long-tail language onboarding](../long-tail-language/index.md) chapter.
- **Model card template** — Model Cards-derived, extended with the deployment-realism sections the [deployment](../deployment/index.md) chapter argues are non-optional (target-tier latency, quantised quality drop, code-switching evaluation, script variant coverage).
- **Case-study retrospective template** — already available under [Case Studies](../case-studies/_retrospective-template.md); listed here for discoverability.

## Editorial rules for templates

- **One file per template.** No embedded sub-templates. If a starting point has more than one, split it.
- **A short header explaining what to change and why.** Every template ships with usage notes at the top; a raw file with no context is a link-farm, not a template.
- **Opinionated defaults.** A template that leaves every field blank is not a template, it is a form. Fill the defaults with the playbook's editorial preferences (chrF, per-language reporting, CC BY-NC 4.0, participatory workflow) and let the forking project override where its context differs.
- **Cross-linked back to the chapter that motivates it.** Any reader who finds a template first and does not know why the fields are what they are should be one click away from the reasoning.
- **Reviewed on the same six-month cadence as [Before You Start](../before-you-start/index.md).** Templates rot faster than prose; libraries change, licences update, sample data ages out. Every template ships with a "last reviewed" date.

## The one anti-pattern

Do not treat a template as authoritative just because it lives in the playbook. Every project has context the template does not know. The template is a starting point that saves you writing the boilerplate; the fields are yours to interrogate. A field you cannot answer honestly is a field the template got wrong for your case.
