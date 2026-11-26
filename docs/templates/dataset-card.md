---
sidebar_position: 2
title: Dataset card template
ready: true
last_update:
  date: 2026-07-07
  author: Shamsuddeen Hassan Muhammad
---

# Dataset card template

*Last reviewed: 2026-07-07.*

*A template based on Datasheets for Datasets, extended with the African-context questions the playbook considers non-negotiable. Copy this file, name it after your dataset (for example `my-dataset-datacard.md`, or `datacard.md` in your project repository), fill in every section honestly, and ship it with the corpus. A dataset without a card is not open science; it is a dump.*

## How to use this template

1. Copy the whole thing below the `---` divider into a new file.
2. Replace every `[SQUARE BRACKET]` placeholder with a real answer.
3. Delete any question that genuinely does not apply and add a `Not applicable: [why]` line in its place. Do not silently skip.
4. Keep the section structure and the header text unchanged, so downstream readers can search across dataset cards for the same field.
5. Add a `last-reviewed` date at the top so future readers know when the card was current.

Based on Datasheets for Datasets ([Gebru et al., 2021](../references.md#gebru-2021)), Data Statements for NLP ([Bender and Friedman, 2018](../references.md#bender-friedman-2018)), and the [legal, consent, and community IP](../legal-consent/index.md) chapter of this playbook.

---

## Dataset name

**[NAME]**

Short one-line description: **[ONE LINE]**

- **Version:** [X.Y]
- **Release date:** [YYYY-MM-DD]
- **Last reviewed:** [YYYY-MM-DD]
- **Canonical URL:** [DATASET PAGE]
- **Licence:** [SPDX identifier, e.g., `CC-BY-4.0`]
- **DOI / preferred citation:** [BibTeX or plain-text]

## 1. Motivation

- **For what purpose was the dataset created?** [Not a generic "for NLP research", but the specific task and use case.]
- **Who created the dataset?** [Named individuals + affiliations + the community whose language it is derived from.]
- **Who funded its creation?** [Names + grant IDs.]
- **What was left out and why?** [The languages, dialects, domains, or content categories that were intentionally excluded.]

## 2. Composition

- **What do the instances represent?** [Sentences? Utterances? Documents? Voice recordings? Image-transcript pairs?]
- **How many instances are there?** [Total + per-language + per-split.]
- **Does the dataset contain all possible instances, or a sample?** [If a sample, how was it sampled? What is it a sample of?]
- **What data does each instance consist of?** [Fields, types, encoding.]
- **Are there labels?** [Task, label set, annotation guidelines URL.]
- **How representative is the dataset of its target population?** [Coverage counts by the dimensions that matter, how each attribute was obtained, and any thin or empty cells. For image data, see [Representativeness audits](../image-data/representativeness.md).]
- **Is any information missing from individual instances?** [If yes, why.]
- **Are relationships between individual instances made explicit?** [Same speaker? Same document? Sequence?]
- **Are there recommended data splits?** [Train / dev / test proportions and how they were derived.]
- **Are there errors, sources of noise, or redundancies in the dataset?** [Known label noise, near-duplicates, alignment issues.]
- **Is the dataset self-contained, or does it link to external resources?** [If external, how stable are those links?]
- **Does the dataset contain data that might be considered confidential or sensitive?** [Personal identifiers, health information, protected categories under the [legal-consent chapter](../legal-consent/index.md).]

## 3. Collection process: the African-context extension

Beyond the standard datasheet questions, this section is where the playbook's African-context requirements land. Do not skip.

- **What data acquisition mechanism was used?** [Community recording? Elicited translation? Web scrape? Combination?]
- **Who was involved in the data collection?** [Named annotators, translators, or contributors, with consent for named attribution. Describe contributor roles and recruitment.]
- **Over what timeframe was the data collected?** [Start and end dates.]
- **Was the collection process reviewed by any board or committee?** [IRB, ethics review, community steering committee. Name the body and the review date.]
- **What was the informed consent process?** [Individual + community consent. If contributors are non-literate, what specific pattern was used (see [legal-consent chapter](../legal-consent/index.md#consent-from-non-literate-speakers)).]
- **Does the dataset relate to people?** [If yes, say how, and make sure the consent and withdrawal questions in this section are fully answered.]
- **How is consent withdrawn?** [The stable ID, the contact channel, the practical mechanics.]
- **What script and orthographic convention is used?** [If the language uses more than one script or orthographic convention, which one, and what was the community consultation that led to that choice.]
- **What dialect(s), variety(ies), and register(s) are represented?** [Do NOT write "[LANGUAGE]" and stop; every African language of any size has internal variation that matters.]
- **What is the code-switching profile of the data?** [Monolingual? Percentage code-switched with English/French/Arabic/Kiswahili? What was mixed with what?]
- **What steps were taken to ensure the data reflects the community's own voice?** [Native-speaker involvement in guidelines, annotation, and adjudication; participatory workflow (see [Nekoto et al., 2020](../references.md#nekoto-2020)).]

## 4. Preprocessing, cleaning, labelling {#4-preprocessing-cleaning-labeling}

### Preprocessing

- **Was any preprocessing, cleaning or labelling of the data done?** [Tokenisation, normalisation, diacritic handling, script conversion, deduplication, filtering.]
- **Was the raw data saved in addition to the preprocessed data?** [If not, why not.]
- **What software was used to preprocess?** [Specific libraries and versions, or a link to the preprocessing code.]

### Labelling tool and agreement

- **What was used to label the data, and which version?** [The annotation tool, spreadsheet or custom script, with its version or commit. If the version changed during the project, say which batches were labelled with which version. Link the labelling configuration (label set, task layout, any pre-filled model suggestions) and add a screenshot of the labelling screen, so readers can see what annotators saw.]
- **Was there inter-annotator agreement measurement?** [What score, on what proportion of the corpus.]
- **What was the adjudication process for annotator disagreements?** [Second-pass by senior annotator? Consensus vote? Discard?]

### Review

- **What share of the work was reviewed?** [The review sampling rate, for example "20% of ordinary items, 100% of a new annotator's first batch". Say whether "reviewed" means every item or a sample.]
- **How was each item chosen for review?** [The per-item rule and its seed, for example a hash of the item ID with a fixed seed, so that others can rerun it. See [Decide what gets reviewed](../3_annotation-design/workflow-adjudication.md#decide-what-gets-reviewed-a-sample-plus-escalations).]
- **Which flags sent an item to review regardless of the sample?** [Low agreement, a lone dissenting annotator, a failed gold item, an automated check, a manual flag. List the rules in force.]

### Annotators and released labels

- **How many items did each annotator label?** [The distribution of items per annotator, and any cap on one annotator's share (see [Cap each annotator's share](../3_annotation-design/workflow-adjudication.md#cap-each-annotators-share)).]
- **How were skips and unfinished items handled?** [The reason codes, reassignment or retirement policy, and the share of items skipped or excluded. Keep "nothing to label" separate from "skipped". See [Track skips and unfinished items](../3_annotation-design/workflow-adjudication.md#track-skips-and-unfinished-items).]
- **How are annotator identities handled in the release?** [Pseudonymised or removed? Method (for example a keyed hash per project), whether the key stays the same across versions, whether a mapping to real people is kept and who can access it, and which annotator attributes (region, dialect, gender) are released. See [Personally identifiable information](../data-governance/index.md#personally-identifiable-information).]
- **How were released labels produced?** [Single annotation, majority vote, adjudication, model-assisted draft with human correction, or another rule. State whether per-annotator labels are also released, under what access conditions, and how disagreement is preserved.]
- **What source provenance supports re-annotation?** [For every row or a resolvable mapping: source dataset ID, version or revision, configuration, split and row ID; source URL and licence; any transformations. A row number alone is not stable across versions.]

## 5. Uses

- **Has the dataset been used for any tasks already?** [Papers, deployments, downstream benchmarks.]
- **Is there a repository that links to any or all papers or systems that use the dataset?** [If yes, URL.]
- **What tasks could the dataset be used for?** [Author's recommendation, grounded in what the corpus was actually collected for.]
- **Are there tasks for which the dataset should NOT be used?** [The playbook's strong editorial position is that dataset cards should name explicit AVOID uses: surveillance applications, commercial re-use without community consultation, downstream retraining that produces derivative models under weakened licences. State them.]

## 6. Distribution

- **Under what licence is the dataset distributed?** [SPDX identifier + one-sentence rationale for the choice. See the [legal-consent chapter's licence-selection guidance](../legal-consent/index.md#licence-selection).]
- **Is the dataset restricted to non-commercial use?** [Yes or no. CC BY 4.0 is the playbook's default for open release. If yes, state the exception that justifies it: the community requires it, consent covers non-commercial use only, or the material is sacred or sensitive.]
- **How can the dataset be accessed?** [Direct download, request-and-review, Zenodo, Hugging Face Hub, etc.]
- **Are there any fees or access restrictions?**
- **Who is the named steward for re-use requests?** [Named person or body, with contact. See the [anti-extraction release patterns](../legal-consent/index.md#anti-extraction-release-patterns) in the legal-consent chapter.]
- **How will the dataset be updated?** [Cadence, versioning scheme.]
- **How long will the dataset be available?** [Institutional commitment, if any.]

## 7. Maintenance

- **Who is supporting / hosting / maintaining the dataset?**
- **Is there an errata process?** [How are corrections proposed and applied.]
- **Will the dataset be updated?** [Corrections only? Additions? Both?]
- **Are older versions of the dataset available?** [Where.]
- **How can users contribute or extend the dataset?** [PRs, contact channels, community-review mechanism.]

## 8. Ethical review

- **Has the dataset been reviewed by an ethics board?** [Name of the board, date of review, outcome.]
- **Have concerns been raised by the community whose data is represented?** [If yes, what and how were they addressed.]
- **Are there known biases in the dataset?** [Under-represented demographics, over-represented sources, register or domain narrowness.]
- **What is the recommendation for downstream users who identify additional concerns?** [Named contact + process.]

## 9. Citation

Preferred citation:

```text
[BibTeX or plain-text]
```

Recommended companion citations (for the underlying methodology, models, or evaluation frameworks):

- [PAPER 1]
- [PAPER 2]

---

**Contributor's note.** If you extend or fork this template for a task or language with additional required fields (e.g., speech-specific recording metadata for TTS corpora, image-alignment fields for OCR corpora), add the fields *below* the standard sections, not in place of them. The shared field structure is what makes cross-corpus comparison possible.
