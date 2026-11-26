---
title: Quality, Consent and Release
sidebar_position: 6
ready: true
last_update:
  date: 2026-11-26
  author: Shamsuddeen Hassan Muhammad
---

# Quality, Consent and Release

This page describes the loop that every record passes through whatever its type: consent before contribution, anonymisation at ingest, three review stages before acceptance, a weekly quality report, and a release that waits for the last opt-out window to close. The worked example runs ten languages with three-stage QA, Cohen's kappa at or above 0.75, a 60-day opt-out, and a CC-BY-4.0 release 60 days after delivery to the partner (the funder or organisation that commissioned the dataset).

:::tip[Key points]

- Every pair passes three separate review stages: agronomist, native speaker, then the language lead's adjudication.
- Two different numbers gate progress: kappa of at least 0.75 on labels, and 90% advisory review acceptance by round two.
- Consent is versioned, given in the contributor's language, and treats voice as biometric data.
- Faces, GPS and device metadata are removed before any annotator sees a file; spoken names and numbers are redacted from transcripts.
- The public CC-BY-4.0 release waits 60 days after partner delivery, until the last opt-out window closes.

:::

![Consent gates each contribution; anonymisation runs at ingest; three review stages lead to acceptance, with rework loops back; a Monday report reads the quality metrics; the release timeline runs from batch exports to embargoed partner delivery to public CC-BY-4.0 release after the last opt-out window closes.](images/qa-consent-loop.svg)

## Three-stage QA

Every pair passes three stages before it counts toward a milestone. The stages are separate project roles, so the same person cannot hold two of them for one item and nobody reviews their own work. Each language has a language lead; the quality lead is the one person across all languages who owns the QA standard and takes escalations.

| Stage | Who | What they check | Outcome |
| --- | --- | --- | --- |
| 1. Diagnosis review | An agronomist other than the labeller | Label is correct against the national extension standard; image supports the label; advisory is agronomically faithful and safe | accept, relabel, rewrite request, or reject image |
| 2. Linguistic review | A native speaker other than the author | Advisory is natural in the local register, uses the right vernacular terms, and reads as authored | accept or rewrite request |
| 3. Adjudication | The language lead, with the quality lead on escalation | Any conflict between stages 1 and 2, any low-agreement label, any flagged safety concern | final label and advisory, decision logged |

A rejected image returns to the capture workflow with a reason, and a rewrite request returns the advisory to the author for revision and re-review. Each language lead owns one rubric document (vernacular ontology terms, advisory style guide, review checklist, worked examples), and every review decision records the rubric version it applied. The general pattern is in [Workflow and Adjudication](../3_annotation-design/workflow-adjudication.md).

## Thresholds

Two numbers gate progress, but they measure different things.

- **Cohen's kappa at or above 0.75 on ontology labels.** This is an agreement measure, computed per language, per crop and per annotator on the double-labelled sample. The sampling and escalation rules, and the kappa method (exact-path matching, per-level diagnostics), are in [Diagnosis Labelling](./diagnosis-labelling.md#quality-control).
- **Advisory review acceptance at or above 90% by round two.** This is a project-specific first-pass yield measure: the share of advisories the linguistic reviewer accepts without a rewrite request, after at most one revision. It is not inter-annotator agreement.

Speech has its own bar (95% of clips validated on the first pass; see [Speech Layer](./speech-layer.md)). Annotators whose accuracy on hidden gold items falls below the floor the language lead sets in the rubric are paused automatically and retrained before they resume. For the general practice, including warnings, grace periods and human review before anyone is removed, see [Act on annotator signals fairly](../4_data-quality/index.md#act-on-annotator-signals-fairly).

:::tip[Read every crop cell]
A language can sit above 0.75 overall while one crop sits at 0.55 because the ontology has two nodes that look the same on a phone screen. The weekly report shows every crop cell, and the fix is usually a rubric edit and a retraining session.
:::

## The Monday report

Every Monday, one report per language and an aggregate, generated from the project's progress and quality exports, with a short narrative from each language lead. It goes to the partner and into the project repository. The report has these parts:

- **Headline**: pairs captured and through QA, speech items validated; this week, cumulative, target, on track or not.
- **Per language**: captured, labelled, authored, reviewed, adjudicated, accepted; kappa; advisory review acceptance in round one and round two; speech items; speakers by gender; preference pairs rated and rater agreement; open review queue. Cells below threshold are marked and get a line under actions.
- **Coverage gaps**: crop by issue family by growth stage cells below half of target, with the plan to fill each (season, region or seed).
- **Speaker balance**: age band by gender against the recruitment target, and the steering for next week.
- **Annotator evaluation**: who was paused, why, and retraining status.
- **Consent and withdrawals**: acceptances this week (written and oral) and opt-out requests received and applied.
- **Actions, risks and language-lead notes.**

Build the report in week one, before there is much to report, because the columns force you to decide what the project must export.

## Rolling exports and partner sampling

From month 3, a batch export every two weeks gives the partner a sample to check. Partner reviewers hold read-only access to every project and the live dashboard from day one. Items the partner rejects go back through the stage that failed and are accepted only after re-review. Batch exports are also the unit for opt-out removal: a withdrawal is applied before the next export, so no export contains a withdrawn item.

## Consent

The project takes a versioned consent record from every contributor before their first contribution, and stops accepting their annotations or drafts once consent is withdrawn. Specify and test each consent gate the project needs (capture, labelling, authoring, review, recording); do not assume a tool enforces it. Log every acceptance with the contributor ID, template version, purposes ticked and timestamp. A change to the text creates a new version, and existing contributors are asked again.

| Contributor | Form | Covers |
| --- | --- | --- |
| Collector, and the farmer whose plant is photographed | Written, or recorded oral in the language | Image use for training, evaluation and publication; CC-BY-4.0 release; 60-day opt-out |
| Author, reviewer, transcriber | Written annotator agreement | Licensing of authored text under CC-BY-4.0; credit choice |
| Speaker | Written or recorded oral, plus a separate speaker-profile consent | Voice use for training, evaluation and publication; named as biometric data; explicit opt-in to public release; whether age band, gender and region may attach; 60-day opt-out |

**Consent in the field.** Consent is given in the contributor's language. Before the first photo on each farm, the collector plays the recorded oral consent script or hands over the written form. Consent is per farmer and logged per farm, never once for a whole village. Images from a farm stay outside the accepted dataset until its consent record is verified.

**Oral consent.** For contributors who cannot read the form comfortably, the language lead has the script translated and recorded once by a native speaker. The collector plays it, asks five yes-or-no questions, and records the answers against the contributor's reference number, with no names spoken. Consent status is set only after the language lead has listened to the recording.

**Speaker consent.** Speakers consent at the session, before the first recording, on a separate speaker template. A voice recording can identify a person on its own, so the template names voice as biometric data in plain words. It asks separately about use for training, evaluation and publication, about public release under CC-BY-4.0, and about attaching age band, gender and region. A speaker may agree to the first while refusing public release, the profile, or both, and still contribute. A refused profile leaves `metadata_shared` false and the profile fields absent.

**Opt-out and registration.** Every contributor receives a reference number and a contact. An opt-out within 60 days removes their items before the next export, with the removal logged and counted in the datasheet. After 60 days, published items cannot be recalled, and the form says so. Where national law requires it, the contracting host registers as data controller (Nigeria NDPC, Kenya ODPC, Rwanda NCSA); plan the registration with the ethics review. The forms are in the [consent form template](../templates/consent-form.md), and the legal background is in [Legal and Consent](../legal-consent/index.md).

## Anonymisation at ingest

Anonymisation runs before an image or clip enters any annotation project, so no annotator ever sees the raw file.

| Step | Method |
| --- | --- |
| Faces | Automatic detection and blur on every image; images flagged as containing people get a human check. Images where a person cannot be blurred well are dropped. |
| GPS | Device coordinates are read once to derive the district name, then discarded. |
| EXIF | EXIF orientation is applied to the pixels first; only then are all EXIF and device metadata stripped, so annotation coordinates refer to the image as displayed (see [Coordinates and image orientation](../image-data/object-detection.md#coordinates-and-image-orientation)). |
| Identifiers | Collector and speaker IDs are opaque. Names, phone numbers and addresses stay in access-controlled administrative records and never enter the dataset. Transcripts are checked for spoken names and numbers, which are replaced with a tag. |
| Speaker profile | Age band, gender and region attach to a clip only when that speaker granted profile consent. Otherwise `metadata_shared` is false and the fields are absent. |

## Licence and release

Everything releases under CC-BY-4.0: images, advisories, audio, transcripts, the ontology and the rubrics. Contributor agreements assign the right to release under that licence.

The seed licence rule is strict. Open images are kept only where the source licence is CC-BY-compatible, and each is attributed. Sources under ShareAlike, NonCommercial or competition-only terms are excluded, because any one of them would pull the whole release away from CC-BY-4.0. As of September 2026, PlantDoc, CCMT and the Makerere cassava set clear the rule; PlantVillage, iCassava and PlantWild do not (see [Field Image Capture](./field-image-capture.md#planning-coverage)).

The timeline has two release events. The final delivery (month 7 in the worked example) goes to the partner under embargo. The public release on the Hugging Face Hub follows 60 days later, after the last contributor's opt-out window has closed. Errata and later withdrawals ship as new versions with a changelog. Storage and access control between the two events follow [Data Governance](../data-governance/index.md).

## The per-language datasheet

One datasheet per language, following the Datasheets for Datasets structure ([Gebru et al., 2021](../references.md#gebru-2021)). Counts are generated from the project's provenance and consent exports; the language lead writes the narrative and the quality lead reviews it. It contains:

- **Composition**: pairs (field versus seed), speech items and distinct speakers, items withdrawn; the coverage matrix, districts, speaker balance from consented profiles only; the train, dev and test splits; known gaps and why.
- **Collection process**: who collected, where, when, on what devices; seed sources, licences and counts kept and dropped; author cohort and rubric version; speech recruitment, set-up and QC profile.
- **Labelling and quality**: ontology version, share of items through each QA outcome, kappa per crop, advisory review acceptance by round, speech first-pass rate, annotators paused.
- **Consent, anonymisation and rights**: template versions, written versus oral counts, purposes granted, opt-out dates and withdrawals honoured; anonymisation counts; licence and attributions; attribution per contributor choice.
- **Uses, limitations and maintenance**: intended and unsuitable uses (diagnosis without expert oversight, identification of individuals), observed biases, contact and versioning.

The playbook's [dataset card template](../templates/dataset-card.md) covers the general case; the list above is what an advisory dataset adds.

## Known limitations

- **Kappa depends on the ontology.** A fine-grained ontology lowers agreement without lowering quality. Report kappa alongside the node count.
- **Oral consent is slower to verify.** Each recording must be heard by the language lead before the contributor's items count. Plan the lead's time for it, or a backlog forms in the first month.
- **Sixty days is a compromise.** A longer window is kinder to contributors and delays release. Whatever you choose, the consent form, the export schedule and the release date must carry the same number.
- **Registration takes calendar time.** Data-controller registration can run for weeks. Start it at kick-off.

## Further reading

- [Workflow and Adjudication](../3_annotation-design/workflow-adjudication.md): multiple annotators, redundancy and adjudication in general.
- [Legal and Consent](../legal-consent/index.md) and the [consent form template](../templates/consent-form.md).
- [Data Governance](../data-governance/index.md): storage, access and retention between delivery and public release.
- [Documentation](../6_documentation/documentation.md) and the [dataset card template](../templates/dataset-card.md).
- [Datasheets for Datasets](../references.md#gebru-2021).
- [A checklist for choosing a tool](../6_documentation/tooling.md#a-checklist-for-choosing-a-tool): assess versioned consent records, consent-status exports, agreement inputs and review outcomes. Test the specific consent gates your project requires rather than assuming the tool provides them.
