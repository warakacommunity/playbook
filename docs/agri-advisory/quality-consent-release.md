---
title: Quality, Consent and Release
sidebar_position: 6
ready: true
last_update:
  date: 2026-09-30
  author: Shamsuddeen Hassan Muhammad
---

# Quality, Consent and Release

This page describes the loop that every record passes through whatever its type: consent before contribution, anonymisation at ingest, three review stages before credit, a weekly agreement report, and a release that waits for the last opt-out window to close. AgroLingua Africa is the running example: ten languages, three-stage QA on AfriAnnotate, Cohen's kappa at or above 0.75, a 60-day opt-out, and a CC-BY-4.0 release 60 days after the partner delivery.

![Consent gates each contribution; anonymisation runs at ingest; three review stages lead to acceptance and credit, with rework loops back; a Monday report reads the agreement metrics; the release timeline runs from batch exports to embargoed partner delivery to public CC-BY-4.0 release after the last opt-out window closes.](images/qa-consent-loop.svg)

## Three-stage QA

Every pair passes three stages before it counts toward a milestone. The stages are separate project roles on the platform, so the same person cannot hold two of them for one item and nobody reviews their own work. Each language has a language lead; the quality lead is the one person across all languages who owns the QA standard and takes escalations.

| Stage | Who | What they check | Outcome |
| --- | --- | --- | --- |
| 1. Diagnosis review | An agronomist other than the labeller | Label is correct against the national extension standard; image supports the label; advisory is agronomically faithful and safe | accept, relabel, rewrite request, or reject image |
| 2. Linguistic review | A native speaker other than the author | Advisory is natural in the local register, uses the right vernacular terms, and reads as authored | accept or rewrite request |
| 3. Adjudication | The language lead, with the quality lead on escalation | Any conflict between stages 1 and 2, any low-agreement label, any flagged safety concern | final label and advisory, decision logged |

Credit lands on acceptance only. A rejected image earns the collector nothing, and a rewrite request sends the advisory back to the author with no credit until the rewrite is accepted. This keeps the incentive on quality, and it is why the rate card can be per accepted item. Each language lead owns one rubric document (vernacular ontology terms, advisory style guide, review checklist, worked examples), and every review decision records the rubric version it applied. The general pattern is in [Workflow and Adjudication](../3_annotation-design/workflow-adjudication.md).

## Thresholds

Two numbers gate progress, and both come from the platform's built-in agreement metrics.

- **Cohen's kappa at or above 0.75 on ontology labels.** Computed per language, per crop and per annotator on the double-labelled sample: a rolling 30% of images, rising to 100% for any crop or annotator whose cell falls below the threshold.
- **Advisory agreement at or above 90% by round two.** The share of advisories the linguistic reviewer accepts without a rewrite request, after at most one revision.

Speech has its own bar (95% of clips validated on the first pass; see [Speech Layer](./speech-layer.md)), and benchmark cases must be 100% dual-verified (see [Benchmark and Preference Data](./benchmark-and-preference.md)). Annotators whose accuracy on hidden gold items falls below the floor the language lead sets in the rubric are paused automatically and retrained before they resume.

:::tip[Watch the cell, not the average]
A language can sit above 0.75 overall while one crop sits at 0.55 because the ontology has two nodes that look the same on a phone screen. The weekly report shows every crop cell, and the fix is usually a rubric edit and a retraining session.
:::

## The Monday report

Every Monday, one report per language and an aggregate, generated from the platform's dashboard, agreement exports and ledger, with a short narrative from each language lead. It goes to the partner and into the project repository. The AgroLingua template has these parts:

- **Headline**: pairs captured and through QA, speech items validated, benchmark cases dual-verified, preference pairs double-rated; this week, cumulative, target, on track or not.
- **Per language**: captured, labelled, authored, reviewed, adjudicated, accepted; kappa; advisory agreement in round one and round two; speech items; speakers by gender; open review queue. Cells below threshold are marked and get a line under actions.
- **Coverage gaps**: crop by issue family by growth stage cells below half of target, with the plan to fill each (season, region or seed).
- **Speaker balance**: age band by gender against the recruitment target, and the steering for next week.
- **Annotator evaluation**: who was paused, why, and retraining status.
- **Consent and withdrawals**: acceptances this week (written and oral) and opt-out requests received and applied.
- **Payment**: ledger credits and payout totals per language in local currency.
- **Actions, risks and language-lead notes.**

Build the report in week one, before there is much to report, because the columns force you to decide what the platform must export.

## Rolling exports and partner sampling

From month 3, a batch export every two weeks gives the partner a sample to check. Partner reviewers hold read-only access to every project and the live dashboard from day one. Items the partner rejects go back through the stage that failed, and the rework is credited only on re-acceptance. Batch exports are also the unit for opt-out removal: a withdrawal is applied before the next export, so no export contains a withdrawn item.

## Consent

The platform enforces consent. Nobody can capture, author, review or record until they have accepted the consent template for their role, and every acceptance is logged with the user, template version, purposes ticked and timestamp. Templates are versioned; a change to the text is a new version and existing contributors are asked again.

| Contributor | Form | Covers |
| --- | --- | --- |
| Collector, and the farmer whose plant is photographed | Written, or recorded oral in the language | Image use for training, benchmark and publication; CC-BY-4.0 release; 60-day opt-out |
| Author, reviewer, transcriber, rater | Written annotator agreement | Licensing of authored text under CC-BY-4.0; credit choice |
| Speaker | Written or recorded oral, plus a separate speaker-profile consent | Voice use for training, benchmark and publication; named as biometric data; explicit opt-in to public release; whether age band, gender and region may attach; 60-day opt-out |

Consent is given in the contributor's language. For contributors who cannot read the form comfortably, the language lead has the script translated and recorded once by a native speaker; in the field the collector plays it, asks five yes-or-no questions, and records the answers against the contributor's reference number with no names spoken. Consent status is set only after the language lead has listened to the recording.

Voice is biometric data, and the speaker template says so in plain words. It asks separately for the opt-in to public release under CC-BY-4.0 and for permission to attach age band, gender and region; a speaker may say no to the profile and still contribute. Every contributor receives a reference number and a contact, and an opt-out within 60 days removes their items before the next export, with the removal logged and counted in the datasheet. After 60 days, published items cannot be recalled, and the form says so. Where national law requires it, the contracting host registers as data controller (Nigeria NDPC, Kenya ODPC, Rwanda NCSA); AgroLingua budgets this with the ethics review. The forms are in the [consent form template](../templates/consent-form.md), and the legal background is in [Legal and Consent](../legal-consent/index.md).

## Anonymisation at ingest

Anonymisation runs before an image or clip enters any annotation project, so no annotator ever sees the raw file.

| Step | Method |
| --- | --- |
| Faces | Automatic detection and blur on every image, then a human check on the flagged sample. Images where a person cannot be blurred well are dropped. |
| GPS | Device coordinates are read once to derive the district name, then discarded. |
| EXIF | All EXIF and device metadata stripped from released images. |
| Identifiers | Collector and speaker IDs are opaque. Names, phone numbers and addresses stay in the payment system and never enter the dataset. Transcripts are checked for spoken names and numbers, which are replaced with a tag. |
| Speaker profile | Age band, gender and region attach to a clip only when that speaker granted profile consent. Otherwise the fields are absent. |

## Licence and release

Everything releases under CC-BY-4.0: images, advisories, audio, transcripts, benchmark cases, preference pairs, the ontology and the rubrics. Contributor agreements assign the right to release under that licence. Partner model outputs used as preference candidates are released under the same licence by agreement with the partner.

The seed licence rule is strict. Open images are kept only where the source licence is CC-BY-compatible, and each is attributed. Sources under ShareAlike, NonCommercial or competition-only terms are excluded, because any one of them would pull the whole release away from CC-BY-4.0. In AgroLingua, PlantDoc and CCMT clear the rule; PlantVillage, iCassava and PlantWild are verified source by source before any image is kept.

The timeline has two release events. The final delivery (month 7 in AgroLingua) goes to the partner under embargo. The public release on the Hugging Face Hub follows 60 days later, after the last contributor's opt-out window has closed. Errata and later withdrawals ship as new versions with a changelog. Storage and access control between the two events follow [Data Governance](../data-governance/index.md).

## The per-language datasheet

One datasheet per language, following the Datasheets for Datasets structure ([Gebru et al., 2021](../references.md#gebru-2021)). Counts are generated from the platform's provenance and consent exports; the language lead writes the narrative and the quality lead reviews it. It contains:

- **Composition**: pairs (field versus seed), speech items and distinct speakers, benchmark cases by task type, preference pairs, items withdrawn; the coverage matrix, districts, speaker balance from consented profiles only; splits with source and speaker disjointness confirmed and the count of rows dropped; known gaps and why.
- **Collection process**: who collected, where, when, on what devices; seed sources, licences and counts kept and dropped; author cohort and rubric version; speech recruitment, set-up and QC profile; how the held-out stream was isolated.
- **Labelling and quality**: ontology version, share of items through each QA outcome, kappa per crop, advisory agreement by round, speech first-pass rate, annotators paused.
- **Consent, anonymisation and rights**: template versions, written versus oral counts, purposes granted, opt-out dates and withdrawals honoured; anonymisation counts; licence and attributions; credits per contributor choice.
- **Payment**: rate card and total paid per role, from the ledger.
- **Uses, limitations and maintenance**: intended and unsuitable uses (diagnosis without expert oversight, identification of individuals), observed biases, contact and versioning.

The playbook's [dataset card template](../templates/dataset-card.md) covers the general case; the list above is what an advisory dataset adds.

## Payment and credit

Rates are set per country at local market rates for each role and shown to contributors in the platform before they join. Work is credited on acceptance into an append-only ledger, each contributor can see their own statement, and payout runs are exported monthly by facilitator cohort, so a facilitator is paid what their cohort earned. Contributors are paid monthly regardless of when the partner pays the project. Credit is by choice, taken at consent time: by name, by pseudonym, or not at all.

## Known limitations

- **Kappa depends on the ontology.** A fine-grained ontology lowers agreement without lowering quality. Report kappa alongside the node count.
- **Oral consent is slower to verify.** Each recording must be heard by the language lead before the contributor's items count. Budget the lead's time for it, or a backlog forms in the first month.
- **Sixty days is a compromise.** A longer window is kinder to contributors and delays release. Whatever you choose, the consent form, the export schedule and the release date must carry the same number.
- **Registration takes calendar time.** Data-controller registration can run for weeks. Start it at kick-off.

## Further reading

- [Workflow and Adjudication](../3_annotation-design/workflow-adjudication.md): multiple annotators, redundancy and adjudication in general.
- [Legal and Consent](../legal-consent/index.md) and the [consent form template](../templates/consent-form.md).
- [Data Governance](../data-governance/index.md): storage, access and retention between delivery and public release.
- [Documentation](../6_documentation/documentation.md) and the [dataset card template](../templates/dataset-card.md).
- [Datasheets for Datasets](../references.md#gebru-2021).
- [AfriAnnotate](https://afriannotate.waraka.org): consent library, agreement metrics and ledger described on this page.
