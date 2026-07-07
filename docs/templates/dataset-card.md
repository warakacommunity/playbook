---
sidebar_position: 2
title: Dataset card template
last_update:
  date: 2026-07-07
---

# Dataset card template

*Last reviewed: 2026-07-07.*

*A Datasheets-for-Datasets-derived template extended with the African-context questions the playbook considers non-negotiable. Fork this file, rename it to your dataset's slug (`docs/case-studies/afrisenti-datacard.md` or `datacard.md` in your project repo), fill in every section honestly, and ship it alongside the corpus. A dataset without a card is not open science; it is a dump.*

## How to use this template

1. Copy the whole thing below the `---` divider into a new file.
2. Replace every `[SQUARE BRACKET]` placeholder with a real answer.
3. Delete any question that genuinely does not apply and add a `Not applicable — [why]` line in its place. Do not silently skip.
4. Keep the section structure and the header text unchanged, so downstream readers can search across dataset cards for the same field.
5. Add a `last-reviewed` date at the top so future readers know when the card was current.

Motivated by [Datasheets for Datasets (Gebru et al., 2018)](https://arxiv.org/abs/1803.09010), [Data Statements for NLP (Bender & Friedman, 2018)](https://aclanthology.org/Q18-1041/), and the [legal, consent, and community IP](../legal-consent/index.md) chapter of this playbook.

---

## Dataset name

**[NAME]**

Short one-line description: **[ONE LINE]**

- **Version:** [X.Y]
- **Release date:** [YYYY-MM-DD]
- **Last reviewed:** [YYYY-MM-DD]
- **Canonical URL:** [DATASET PAGE]
- **Licence:** [SPDX identifier — e.g., CC BY-NC 4.0]
- **DOI / preferred citation:** [BibTeX or plain-text]

## 1. Motivation

- **For what purpose was the dataset created?** [Not a generic "for NLP research" — the specific task and use case.]
- **Who created the dataset?** [Named individuals + affiliations + the community whose language it is derived from.]
- **Who funded its creation?** [Names + grant IDs.]
- **What was left out and why?** [The languages, dialects, domains, or content categories that were intentionally excluded.]

## 2. Composition

- **What do the instances represent?** [Sentences? Utterances? Documents? Voice recordings? Image-transcript pairs?]
- **How many instances are there?** [Total + per-language + per-split.]
- **Does the dataset contain all possible instances, or a sample?** [If a sample, how was it sampled? What is it a sample of?]
- **What data does each instance consist of?** [Fields, types, encoding.]
- **Are there labels?** [Task, label set, annotation guidelines URL.]
- **Is any information missing from individual instances?** [If yes, why.]
- **Are relationships between individual instances made explicit?** [Same speaker? Same document? Sequence?]
- **Are there recommended data splits?** [Train / dev / test proportions and how they were derived.]
- **Are there errors, sources of noise, or redundancies in the dataset?** [Known label noise, near-duplicates, alignment issues.]
- **Is the dataset self-contained, or does it link to external resources?** [If external, how stable are those links?]
- **Does the dataset contain data that might be considered confidential or sensitive?** [Personal identifiers, health information, protected categories under the [legal-consent chapter](../legal-consent/index.md).]

## 3. Collection process — the African-context extension

Beyond the standard datasheet questions, this section is where the playbook's African-context requirements land. Do not skip.

- **What data acquisition mechanism was used?** [Community recording? Elicited translation? Web scrape? Combination?]
- **Who was involved in the data collection?** [Named annotators, translators, or contributors — with consent for named attribution. Volunteer or paid; if paid, at what rate against what benchmark.]
- **Over what timeframe was the data collected?** [Start and end dates.]
- **Was the collection process reviewed by any board or committee?** [IRB, ethics review, community steering committee — name the body and the review date.]
- **What was the informed consent process?** [Individual + community consent. If contributors are non-literate, what specific pattern was used (see [legal-consent chapter](../legal-consent/index.md#consent-from-non-literate-speakers)).]
- **Does the dataset relate to people?** [If yes, the sub-questions below all apply.]
- **How is consent withdrawn?** [The stable ID, the contact channel, the practical mechanics.]
- **What script and orthographic convention is used?** [If the language uses more than one script or orthographic convention, which one, and what was the community consultation that led to that choice.]
- **What dialect(s), variety(ies), and register(s) are represented?** [Do NOT write "[LANGUAGE]" and stop; every African language of any size has internal variation that matters.]
- **What is the code-switching profile of the data?** [Monolingual? Percentage code-switched with English/French/Arabic/Kiswahili? What was mixed with what?]
- **What steps were taken to ensure the data reflects the community's own voice?** [Native-speaker involvement in guidelines, annotation, and adjudication; participatory workflow (see [Nekoto et al., 2020](https://aclanthology.org/2020.findings-emnlp.195/)).]

## 4. Preprocessing, cleaning, labeling

- **Was any preprocessing / cleaning / labeling of the data done?** [Tokenisation, normalisation, diacritic handling, script conversion, deduplication, filtering.]
- **Was the raw data saved in addition to the preprocessed data?** [If not, why not.]
- **What software was used to preprocess?** [Specific libraries and versions, or a link to the preprocessing code.]
- **Was there inter-annotator agreement measurement?** [What score, on what proportion of the corpus.]
- **What was the adjudication process for annotator disagreements?** [Second-pass by senior annotator? Consensus vote? Discard?]

## 5. Uses

- **Has the dataset been used for any tasks already?** [Papers, deployments, downstream benchmarks.]
- **Is there a repository that links to any or all papers or systems that use the dataset?** [If yes, URL.]
- **What tasks could the dataset be used for?** [Author's recommendation — grounded in what the corpus was actually collected for.]
- **Are there tasks for which the dataset should NOT be used?** [The playbook's strong editorial position is that dataset cards should name explicit AVOID uses — surveillance applications, commercial re-use without community consultation, downstream retraining that produces derivative models under weakened licences. State them.]

## 6. Distribution

- **Under what licence is the dataset distributed?** [SPDX identifier + one-sentence rationale for the choice. See the [legal-consent chapter's licence-selection guidance](../legal-consent/index.md#licence-selection).]
- **Is the dataset restricted to non-commercial use?** [Yes or no, with the rationale.]
- **How can the dataset be accessed?** [Direct download, request-and-review, Zenodo, Hugging Face Hub, etc.]
- **Are there any fees or access restrictions?**
- **Who is the named steward for re-use requests?** [Named person or body, with contact — see the [anti-extraction release patterns](../legal-consent/index.md#anti-extraction-release-patterns) in the legal-consent chapter.]
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

```
[BibTeX or plain-text]
```

Recommended companion citations (for the underlying methodology, models, or evaluation frameworks):

- [PAPER 1]
- [PAPER 2]

---

**Contributor's note.** If you extend or fork this template for a task or language with additional required fields (e.g., speech-specific recording metadata for TTS corpora, image-alignment fields for OCR corpora), add the fields *below* the standard sections, not in place of them. The shared field structure is what makes cross-corpus comparison possible.
