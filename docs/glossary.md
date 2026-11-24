---
sidebar_position: 99
title: Glossary
description: Definitions of key terms used throughout the AfriPlaybook.
ready: true
last_update:
  date: 2026-11-24
  author: Shamsuddeen Hassan Muhammad
---

A reference of terms used throughout the Playbook. Cross-references point back to the chapters where each concept is introduced in depth.

This is a starting point. Additions and corrections are welcome via the "Edit this page" link at the bottom.

## A

**Adjudication.** The process of resolving disagreements between annotators, typically by a senior annotator or a designated adjudicator. Common when multiple annotators label the same item and a final "gold" label is needed. See the *Annotation Design and Workforce Management* chapter.

**Annotation.** Attaching structured information (labels, spans, categories, ratings) to raw data so it can be used to train or evaluate language models.

**Annotation guidelines.** The written specification that tells annotators exactly how to label each kind of input. Includes definitions, decision rules, worked examples, and edge cases. The single most important artifact for high inter-annotator agreement.

**Annotation schema.** The structural definition of what can be labeled: e.g., the set of allowed entity types in NER, or the rating scale in sentiment analysis. The schema constrains what guidelines can describe.

**Annotation time.** How long an annotator spends on an item, recorded by the annotation tool for each submission. Useful for budgeting and for spotting items or batches that are unusually hard, but a noisy signal: people pause, switch tasks and work offline. A sudden change is a prompt to investigate, not proof of poor work. Keep it in the full export so it can be analysed later; see [Coordinate and track](./project-management/index.md#6-coordinate-and-track) and [Keep a copy of record](./6_documentation/data-storage.md#keep-a-copy-of-record).

## B

**Backtranslation.** Translating from the target language back to the source language to generate additional training pairs. Often used to augment low-resource translation datasets. Quality varies, so verify with native speakers before training on backtranslated data.

**BCP 47 language tag.** The standard form for naming a language on the web, built from subtags for language, script and region, such as `ha-Latn` and `ha-Arab` for Hausa in Latin and Ajami script ([Phillips and Davis, 2009](./references.md#rfc-5646)). Some datasets instead join an ISO 639-3 language code and a script code with an underscore, such as `hau_Latn`; it carries the same information. Pick one form per dataset and use it in every record; see [Tag the language and the script](./sequence-labelling/index.md#tag-the-language-and-the-script).

**Benchmark.** A standardised dataset and evaluation protocol used to compare models. Examples relevant to African NLP: AfriSenti, NaijaSenti, AfriHate, BRIGHTER, AmhEn.

## C

**Cohen's kappa (κ).** An inter-annotator-agreement metric for two annotators on categorical labels, corrected for chance agreement. Range: −1 to 1; conventionally κ > 0.6 is "substantial," κ > 0.8 is "almost perfect."

**Consent.** Documented permission from the people contributing speech, text, or images, usually including provisions on use, retention, and the right to revoke. Required for ethical and legal data work; see the *Data Collection, Curation, and Governance* chapter.

**Corpus** *(pl. corpora)*. A structured collection of texts, speech, or other linguistic data used for analysis or model training.

**Crowdsourcing.** Recruiting many distributed annotators, often online, to label data. Trade-off: scale vs. quality. Quality control techniques (gold-standard items, agreement metrics, qualification tests) become more important as crowd size grows.

## D

**Dataset.** A curated collection of items with labels and documentation, ready to be used for training or evaluation. A dataset is a *corpus + schema + labels + documentation + license*.

**Data controller and data processor.** Data-protection terms for the two parties responsible for personal data. The controller decides why and how the data is processed; the processor processes it on the controller's behalf ([European Union, 2016](./references.md#gdpr-2016)). In a dataset project, the lead organisation or community is usually the controller, and a hosting provider or contracted annotation vendor is usually a processor. Several African laws require controllers, and sometimes processors, to register with the data-protection authority; see the [country reference](./legal-consent/index.md#data-protection-laws-in-africa-quick-country-reference) and name the controller in the [privacy notice](./templates/privacy-notice.md#who-is-responsible).

**Data sovereignty.** The principle that data about a community belongs to that community, with associated control over storage, access, and use. Especially important for language data from indigenous and minoritised speakers.

## F

**Fleiss' kappa.** Inter-annotator-agreement metric for more than two annotators on categorical labels; a generalisation of Cohen's kappa.

## G

**Gold standard.** A reference labeling considered correct after adjudication or expert review. Used to evaluate annotators, evaluate models, and as the ground truth in test sets.

## I

**Inter-annotator agreement (IAA).** A quantitative measure of how consistently different annotators produce the same labels. Low IAA suggests guidelines are unclear, the task is ambiguous, or annotators need more training.

## K

**Krippendorff's alpha (α).** A flexible inter-annotator-agreement metric that handles missing data, multiple annotators, and different label scales (nominal, ordinal, interval, ratio).

## L

**License.** The legal terms under which a dataset or piece of code can be used, modified, and redistributed. Common open licenses: Apache 2.0, MIT, CC-BY-SA, CC-BY-NC. Consent and license are different things, covered in the *Documentation, Data Release, and Governance* chapter.

**Low-resource language.** A language for which little digital data and few NLP resources exist. Most African languages fall in this category. Building useful systems requires deliberate data collection and often careful transfer from related higher-resource languages.

## M

**Modality.** The type of input data: text, speech, image, video, or some combination. Modality-specific annotation is covered in the *Modality-Specific Task Design* chapter.

**Multilingual.** Covering or working across multiple languages, often with shared model parameters.

## N

**Named Entity Recognition (NER).** Identifying spans of text that refer to named things (people, places, organisations, etc.) and labeling them with their type.

## O

**Outbox (sync queue).** The store on a phone or laptop where work done offline waits until a connection returns. Each queued item carries an ID made on the device, so a repeated send does not create duplicates, and work the server refuses stays in the queue to be fixed or discarded on purpose. See [Sync without losing work](./2_data-collection/10_offline-field-operations.md#sync-without-losing-work).

## P

**Parallel corpus.** A corpus with the same content in two or more languages, sentence-aligned. The basis for machine-translation training.

**Part-of-speech (POS) tagging.** Labeling each token with its grammatical role (noun, verb, adjective, etc.).

**Pre-annotation.** A draft label produced by a model, a rule or an earlier dataset and loaded into the annotation tool before a person opens the item. The annotator accepts, edits or deletes it. It saves time but can anchor annotators to the draft, so record which labels started as pre-annotations and check a sample labelled without them. See [Model-Assisted Annotation](./3_annotation-design/model-assisted-annotation.md#treat-drafts-as-drafts).

## R

**Reproducibility.** The property that another researcher, given the dataset, code, and reported configuration, can re-run the experiment and obtain the same results. The Playbook treats reproducibility as a first-class design goal.

**Retention period.** How long a copy of the data is kept before it is deleted or anonymised. Set one for every copy (working exports, backups, raw media, consent records), state it in the consent form and privacy notice, and keep personal data no longer than its purpose needs ([European Union, 2016](./references.md#gdpr-2016)). See [Know where every copy lives, and for how long](./6_documentation/data-storage.md#know-where-every-copy-lives-and-for-how-long) and the [privacy notice template](./templates/privacy-notice.md#retention).

**Reviewer.** The person who checks a submitted piece of work and accepts it, corrects it or rejects it with a reason. A reviewer judges one submission against the guidelines; an adjudicator resolves a disagreement between several annotators' labels on the same item (see *Adjudication*). One person may do both, but record which role they played on each item. See [Review submitted work](./3_annotation-design/workflow-adjudication.md#review-submitted-work) and [Resolve disagreement, but read it first](./3_annotation-design/workflow-adjudication.md#resolve-disagreement-but-read-it-first).

## S

**Span and region.** The part of an item that a label is attached to. In text, a span is a stretch of characters given by start and end offsets; in audio and video, a stretch of time; in images, a region such as a box, polygon or mask. Spans and regions are only meaningful against the exact file the annotator saw, so freeze the source before annotation. See [Scripts, spans and offsets](./sequence-labelling/index.md#scripts-spans-and-offsets) and [Box and region rules](./image-data/region-guidelines.md).

**Synthetic data.** Data generated by a model rather than collected from human sources. Useful for augmentation; risky without verification because errors compound. Covered in the *LLM-Assisted and Synthetic Data Generation* chapter.

## T

**Task (item).** One unit of work served to an annotator: a sentence, a recording, an image or a document, together with its metadata and the labels attached to it. Agreement, review and progress are counted per item, so give each one a stable ID that survives export and re-import. See [Serve items so the counts stay honest](./3_annotation-design/workflow-adjudication.md#serve-items-so-the-counts-stay-honest).

**TMX (Translation Memory eXchange).** An open XML format for exchanging translation memories between tools with little or no loss of data. Each translation unit holds the same segment in two or more languages. See [Glossaries and translation memory](./machine-translation/index.md#glossaries-and-translation-memory) in the *Machine Translation* chapter.

**Tokenisation.** Splitting text into the basic units a model operates on. Choices around tokenisation (subword, BPE, SentencePiece, character) materially affect downstream performance, especially in morphologically rich languages.

**Translation memory (TM).** A store of approved source and target segment pairs, usually sentences, that translators reuse when the same or a similar segment appears again, so repeated text is translated consistently. See [Glossaries and translation memory](./machine-translation/index.md#glossaries-and-translation-memory).

## V

**View-only observer.** A person, such as a partner, funder or community representative, who can see a project's progress and work but cannot label, review or export. Give them the narrowest access that serves the purpose, and limit it to one project where possible; see [Who has access](./data-governance/index.md#who-has-access).

## X

**XLIFF (XML Localization Interchange File Format).** An open XML format, standardised by OASIS, for carrying bilingual material between the steps of a localisation workflow. Each segment holds a source and an optional target, so a file with existing targets can be loaded for post-editing. See [Glossaries and translation memory](./machine-translation/index.md#glossaries-and-translation-memory).

## See also

- [How to cite the Playbook](/cite)
- [How to contribute a chapter](https://github.com/warakacommunity/playbook/blob/main/README.md#how-to-contribute-a-chapter)
- [Discord community](https://discord.gg/ChNPHV2PPS)
