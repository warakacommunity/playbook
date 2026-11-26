---
sidebar_position: 5
title: Annotation guidelines template
ready: true
last_update:
  date: 2026-07-07
  author: Shamsuddeen Hassan Muhammad
---

# Annotation guidelines template

*Last reviewed: 2026-07-07.*

*A starting point for the annotation guidelines of a new corpus, for any labelling task. It draws on practice in community-built African-language datasets such as MasakhaNER 2 ([Adelani et al., 2022a](../references.md#adelani-2022)) and AfriSenti ([Muhammad et al., 2023a](../references.md#muhammad-2023)). Copy this file, rename it, put in your task and adapt the sections. The [case-study retrospective template](../case-studies/retrospective-template.md) asks each project to link its guidelines and their revisions, so a document in this shape is easy to cite there.*

## How to use this template

1. Copy everything below the divider into a new file (`docs/annotation-guidelines.md` in your project repo).
2. Replace every `[BRACKETED FIELD]` with a real answer.
3. Delete task-inappropriate sections and add a one-line `Not applicable: [why]` note in place of what you removed.
4. Version this document. Annotation guidelines drift; a guidelines document without a version and a change log is untrustworthy.
5. Store the guidelines alongside the corpus so future readers can verify what an annotator was actually told.

For the reasoning behind each section, see [Annotation Task Design](../3_annotation-design/annotation-task-design.md). To compare your project with others, see the [Case Studies](../case-studies/index.md).

---

## [PROJECT NAME] annotation guidelines

**Version:** [X.Y] · **Date:** [YYYY-MM-DD] · **Language(s):** [LANGUAGES] · **Task:** [TASK]

## 1. What we are annotating and why

- **The task in one sentence:** [E.g., "Classify each Twitter post in Hausa, Igbo, or Yorùbá as positive, negative, or neutral sentiment."]
- **What the annotated corpus will be used for:** [Training a specific model, benchmark release, downstream deployment. Be specific; annotators annotate differently when they know the use case.]
- **What the corpus is NOT for:** [Avoid uses the community has agreed on. Explicit here helps the annotator make judgement calls at the margin.]
- **Reference project(s) this is modelled on:** [E.g., "MasakhaNER 2 guidelines, adapted for [DOMAIN]."]

## 2. The team

- **Lead annotator:** [NAME + short bio]
- **Native-speaker annotators:** [NAMES, or "N annotators, native speakers of [LANGUAGE], recruited via [CHANNEL]."]
- **Adjudicator:** [The person who resolves disagreements. Usually the lead annotator; can be someone else.]
- **Linguistic consultant, if any:** [NAME + role]
- **Reviewer / auditor:** [The person who periodically checks annotation quality without doing annotation themselves.]
- **How annotators were compensated:** [Rate + benchmark. State what you paid and how you set the rate. The [core principles](../1_introduction/core-principles.md#build-with-speakers-not-just-for-them) treat speakers as co-creators, not cheap labellers, and [Data Governance](../data-governance/index.md#informed-consent) agrees fair compensation together with consent, at the point of collection.]

## 3. Definitions

Every term the annotator uses is defined here, in one place, in plain language. **This is the most-important section.** Guideline drift usually starts with two annotators reading the same term and understanding it differently.

- **[TERM ONE]:** [Definition + one positive example + one negative example ("this is NOT [TERM]") for contrast.]
- **[TERM TWO]:** [Same shape.]
- **[TERM THREE]:** [Same shape.]

Add every term the annotator will encounter. Cross-reference to definitions used in the reference project (MasakhaNER 2, AfriSenti, LAFAND-MT) explicitly, noting any differences.

## 4. The annotation itself: decision procedure

Written as a step-by-step procedure the annotator can follow for a single example, from opening the labelling tool to submitting the annotation.

1. **Read the example fully before assigning any label.** [Especially important for classification tasks, since snap judgements based on the first few words are the main source of low-quality labels.]
2. **Check the context.** [If the example is a tweet, what is the thread? If the example is a sentence in a document, what is the surrounding paragraph? Instructions on how much context to consider.]
3. **Assign the label using the decision tree below.**
4. **If uncertain, mark the example as UNCERTAIN with a short note.** [Uncertain examples go to the adjudicator; do not force a label when unsure.]
5. **Submit and move on. Do not revise earlier annotations after the fact** unless a guideline change requires re-annotation.

### 4.a Decision tree

```
Is [DIAGNOSTIC QUESTION 1]?
├── Yes → label = [LABEL 1]
└── No: is [DIAGNOSTIC QUESTION 2]?
    ├── Yes → label = [LABEL 2]
    └── No: mark UNCERTAIN with a note explaining the ambiguity.
```

Replace with your task's diagnostic questions. The tree should be depth ≤ 4; deeper trees indicate the label set is not well-defined.

### 4.b Corner cases

The specific patterns that break the decision tree. Every case listed here is a case at least one annotator got wrong in the pilot round; write them down after the pilot, not before.

- **[CORNER CASE 1]:** [Example + correct label + reasoning.]
- **[CORNER CASE 2]:** [Same shape.]

For image boxes and regions, [Box and region rules](../image-data/region-guidelines.md#worked-examples) gives worked corner cases you can adapt.

## 5. Label set

Name every label here, with examples. Give every label a **stored code** and a **display name**. The stored code is what the annotation tool saves and what every export contains: keep it short, stable and in one fixed form (for example `POS`, `NEG`, `NEU`). The display name and the definition are what annotators see, and they can be written in the annotators' working language and improved at any time without touching the data.

| Stored code | Display name (annotators' language) | Definition | One positive example | One negative example |
| --- | --- | --- | --- | --- |
| [CODE 1] | [NAME SHOWN TO ANNOTATORS] | [DEFINITION] | [EXAMPLE] | [WHAT LOOKS LIKE BUT ISN'T] |
| [CODE 2] | [NAME SHOWN TO ANNOTATORS] | [DEFINITION] | [EXAMPLE] | [WHAT LOOKS LIKE BUT ISN'T] |
| UNCERTAIN | [NAME SHOWN TO ANNOTATORS] | Ambiguous; adjudicator will resolve. | n/a | n/a |

- **Shared label list:** [If several projects use this label set, for example one project per language, name the one canonical list they all draw from and where it lives. Reuse it rather than copying it, and map every translated display name back to its stored code.]
- **Interface language:** [The language the annotation interface and in-task instructions are shown in. If different annotator groups work in different languages, say which group sees which.]
- **Language-identification tasks:** [Name the controlled language-code list, its version, and the conventions for named entities, mixed forms, other and unknown. See [Language identification of code-switched text](../sequence-labelling/index.md#language-identification-of-code-switched-text).]

Adding a label is usually easy, but items labelled before it existed may need a check for the new category. Changing a stored code, removing a label or merging two labels changes data that already exists: record it in the [change log](#9-change-log) with an old-to-new code mapping, and decide whether affected items are re-mapped or re-annotated.

For sequence-labelling tasks (NER, POS), replace the table with the tag inventory and the span-boundary rules. The MasakhaNER annotation guideline, published in the [project repository](https://github.com/masakhane-io/masakhane-ner), is a worked reference ([MasakhaNER case study](../case-studies/masakhaner.md)).

For rating tasks, add an anchor table and show it in the annotation interface:

| Score | One-line anchor | Worked example |
| --- | --- | --- |
| [MINIMUM] | [WHAT THIS SCORE MEANS] | [EXAMPLE] |
| [EACH REMAINING POINT] | [WHAT THIS SCORE MEANS] | [EXAMPLE] |
| [MAXIMUM] | [WHAT THIS SCORE MEANS] | [EXAMPLE] |

State the numeric minimum, maximum and step, whether a neutral midpoint is intended, and the separate `cannot_judge` or `not_applicable` route. Treat the resulting scores as ordinal. See [Designing rating scales](../3_annotation-design/annotation-task-design.md#designing-rating-scales) for how to choose these.

## 6. Orthography, script, and diacritics

Load-bearing for African languages. Guidelines that skip this section produce corpora that cannot be evaluated consistently.

- **Script(s) used:** [E.g., "Latin only. Ajami content is out of scope for this corpus."]
- **Orthographic convention:** [Which spelling standard applies. If the language has more than one, name the one the corpus follows and cite the reference.]
- **Diacritic handling:** [Preserve fully, normalise to NFC, strip, with the reasoning.]
- **Handling of code-switched or mixed-script examples:** [Include, exclude, mark separately.]

## 7. Inter-annotator agreement

- **Metric used:** [For example Cohen's kappa for two annotators, Fleiss' kappa for three or more, Krippendorff's alpha when labels are missing or the scale is ordinal, span-level F1 for sequence tagging. For how to choose and compute one, see [Measure inter-annotator agreement](../4_data-quality/index.md#measure-inter-annotator-agreement); worked formulas are in [Inter-annotator agreement](../11_text-classification/annotation.md#inter-annotator-agreement).]
- **Target level:** [State what "acceptable" means for this project and by when, for example after the second round. See [Data Quality](../4_data-quality/index.md#measure-inter-annotator-agreement) for how to choose a target and what to report with it.]
- **Cadence:** [How often IAA is measured: after every N examples per annotator, every round, etc.]
- **What happens when IAA is below target:** [Additional training, guideline revision, annotator recalibration. The response is a design choice; state it.]

## 8. Adjudication

- **Who adjudicates:** [Named person / role.]
- **When adjudication runs:** [Every UNCERTAIN mark? Every annotator disagreement? Sampled review?]
- **Decision authority:** [Final say on labels; state whether adjudicator decisions can be over-ruled by the lead annotator or the community reviewer.]
- **Guideline updates from adjudication:** [If adjudication reveals a systematic issue, when and how the guidelines are revised.]
- **What gets reviewed:** [Review sampling rate, the per-item rule and seed used to draw the sample, and which flags always send an item to review. See [Decide what gets reviewed](../3_annotation-design/workflow-adjudication.md#decide-what-gets-reviewed-a-sample-plus-escalations).]
- **Review verdicts:** [Accept / correct and accept / reject with a written reason. State who reviews (never the annotator of the same item), that a corrected item keeps the annotator's original, and that accepted items are locked.]
- **Reviewer rubric:** [Version number, and for each verdict a rule and a worked example; what a rejection comment must contain; how to treat defensible readings on subjective items. The rubric is versioned with this document.]
- **Contesting a rejection:** [How an annotator requests one re-review per verdict, who handles it, and how the outcome is communicated. See [Let annotators contest a rejection](../3_annotation-design/workflow-adjudication.md#let-annotators-contest-a-rejection).]
- **Feedback cadence:** [How often annotators receive their verdicts, for example at the end of every review session, and how often correction and rejection rates per annotator and per label are checked.]

## 9. Change log

Every version of these guidelines is recorded, dated, and briefly annotated. Guideline changes downstream of pilot annotation are normal; unrecorded changes are the problem.

| Version | Date | Change | Stored-code mapping | Impact on prior annotations |
| --- | --- | --- | --- | --- |
| 1.0 | [YYYY-MM-DD] | Initial. | None | None |
| [NEXT] | [YYYY-MM-DD] | [CHANGE] | [Old code → new code, or "None" if only display names or definitions changed] | [Re-annotate? Re-map? Discard? Keep as-is?] |

## 10. Contact and community

- **Guidelines maintainer:** [NAME + contact]
- **How annotators raise concerns:** [Channel + response time commitment. See the [ombudsperson role](./consent-form.md#section-d-ombudsperson-role) in the consent template; the same principle applies for guideline issues.]
- **Community reviewer, if any:** [NAME + role]

---

**Contributor's note.** If you have run an African-language NLP annotation project and have a version of this document that survived contact with real annotators, the highest-value contribution is a redlined comparison against this template with your project-specific additions clearly marked. Real annotation-guideline documents from real projects are more useful than generic prose.
