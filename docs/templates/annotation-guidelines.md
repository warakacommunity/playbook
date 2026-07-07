---
sidebar_position: 5
title: Annotation guidelines template
last_update:
  date: 2026-07-07
  author: Idris Abdulmumin
---

# Annotation guidelines template

*Last reviewed: 2026-07-07.*

*A task-agnostic starting point for a new corpus's annotation guidelines document, modelled on the structure MasakhaNER 2 ([Adelani et al., 2022](https://arxiv.org/abs/2210.12391)) and AfriSenti ([Muhammad et al., 2023](https://arxiv.org/abs/2302.08956)) use. Fork this file, rename it, drop your task in, and adapt the sections. The section structure is what matters — it is the same structure the playbook's Case Studies chapter compares projects against.*

## How to use this template

1. Copy everything below the divider into a new file (`docs/annotation-guidelines.md` in your project repo).
2. Replace every `[BRACKETED FIELD]` with a real answer.
3. Delete task-inappropriate sections and add a one-line `Not applicable — [why]` note in place of what you removed.
4. Version this document. Annotation guidelines drift; a guidelines document without a version and a change log is untrustworthy.
5. Store the guidelines alongside the corpus so future readers can verify what an annotator was actually told.

Motivated by [Chapter 3 — Annotation Design](../3_annotation-design/annotation-task-design.md) and by every corpus retrospective in the [Case Studies](../case-studies/index.md) chapter that names annotation-guideline drift as a source of quality problems.

---

## [PROJECT NAME] annotation guidelines

**Version:** [X.Y] · **Date:** [YYYY-MM-DD] · **Language(s):** [LANGUAGES] · **Task:** [TASK]

## 1. What we are annotating and why

- **The task in one sentence:** [E.g., "Classify each Twitter post in Hausa, Igbo, or Yoruba as positive, negative, or neutral sentiment."]
- **What the annotated corpus will be used for:** [Training a specific model, benchmark release, downstream deployment. Be specific — annotators annotate differently when they know the use case.]
- **What the corpus is NOT for:** [Avoid uses the community has agreed on. Explicit here helps the annotator make judgement calls at the margin.]
- **Reference project(s) this is modelled on:** [E.g., "MasakhaNER 2 guidelines, adapted for [DOMAIN]."]

## 2. The team

- **Lead annotator:** [NAME + short bio]
- **Native-speaker annotators:** [NAMES, or "N annotators, native speakers of [LANGUAGE], recruited via [CHANNEL]."]
- **Adjudicator:** [The person who resolves disagreements. Usually the lead annotator; can be someone else.]
- **Linguistic consultant, if any:** [NAME + role]
- **Reviewer / auditor:** [The person who periodically checks annotation quality without doing annotation themselves.]
- **How annotators were compensated:** [Rate + benchmark. Fair-rate community-anchored rates are part of the [core principles](../1_introduction/core-principles.md); state what you paid.]

## 3. Definitions

Every term the annotator uses is defined here, in one place, in plain language. **This is the most-important section.** Guideline drift usually starts with two annotators reading the same term and understanding it differently.

- **[TERM ONE]:** [Definition + one positive example + one negative example ("this is NOT [TERM]") for contrast.]
- **[TERM TWO]:** [Same shape.]
- **[TERM THREE]:** [Same shape.]

Add every term the annotator will encounter. Cross-reference to definitions used in the reference project (MasakhaNER 2, AfriSenti, LAFAND-MT) explicitly, noting any differences.

## 4. The annotation itself — decision procedure

Written as a step-by-step procedure the annotator can follow for a single example, from opening the labelling tool to submitting the annotation.

1. **Read the example fully before assigning any label.** [Especially important for classification tasks — snap judgements based on the first few words are the main source of low-quality labels.]
2. **Check the context.** [If the example is a tweet, what is the thread? If the example is a sentence in a document, what is the surrounding paragraph? Instructions on how much context to consider.]
3. **Assign the label using the decision tree below.**
4. **If uncertain, mark the example as UNCERTAIN with a short note.** [Uncertain examples go to the adjudicator; do not force a label when unsure.]
5. **Submit and move on. Do not revise earlier annotations after the fact** unless a guideline change requires re-annotation.

### 4.a Decision tree

```
Is [DIAGNOSTIC QUESTION 1]?
├── Yes → label = [LABEL 1]
└── No — is [DIAGNOSTIC QUESTION 2]?
    ├── Yes → label = [LABEL 2]
    └── No — mark UNCERTAIN with a note explaining the ambiguity.
```

Replace with your task's diagnostic questions. The tree should be depth ≤ 4; deeper trees indicate the label set is not well-defined.

### 4.b Corner cases

The specific patterns that break the decision tree. Every case listed here is a case at least one annotator got wrong in the pilot round; write them down after the pilot, not before.

- **[CORNER CASE 1]:** [Example + correct label + reasoning.]
- **[CORNER CASE 2]:** [Same shape.]

## 5. Label set

If the task has more than three labels, name them here explicitly with examples.

| Label | Definition | One positive example | One negative example |
| --- | --- | --- | --- |
| [LABEL 1] | [DEFINITION] | [EXAMPLE] | [WHAT LOOKS LIKE BUT ISN'T] |
| [LABEL 2] | [DEFINITION] | [EXAMPLE] | [WHAT LOOKS LIKE BUT ISN'T] |
| UNCERTAIN | Ambiguous; adjudicator will resolve. | — | — |

For sequence-labelling tasks (NER, POS), replace with the tag inventory and the span-boundary rules — see the specific per-tag guidance in [MasakhaNER 2](https://arxiv.org/abs/2210.12391) as the reference.

## 6. Orthography, script, and diacritics

Load-bearing for African languages. Guidelines that skip this section produce corpora that cannot be evaluated consistently.

- **Script(s) used:** [E.g., "Latin only. Ajami content is out of scope for this corpus."]
- **Orthographic convention:** [Which spelling standard applies. If the language has more than one, name the one the corpus follows and cite the reference.]
- **Diacritic handling:** [Preserve fully, normalise to NFC, strip — with the reasoning.]
- **Handling of code-switched or mixed-script examples:** [Include, exclude, mark separately.]

## 7. Inter-annotator agreement

- **Metric used:** [Cohen's kappa for two annotators, Krippendorff's alpha for more, span-level F1 for sequence tagging. See the [evaluation-script template](./evaluation-script.md) for the metric implementations.]
- **Target level:** [E.g., "κ ≥ 0.7 by the end of the second round"; state what "acceptable" means for this project.]
- **Cadence:** [How often IAA is measured — after every N examples per annotator, every round, etc.]
- **What happens when IAA is below target:** [Additional training, guideline revision, annotator recalibration. The response is a design choice; state it.]

## 8. Adjudication

- **Who adjudicates:** [Named person / role.]
- **When adjudication runs:** [Every UNCERTAIN mark? Every annotator disagreement? Sampled review?]
- **Decision authority:** [Final say on labels; state whether adjudicator decisions can be over-ruled by the lead annotator or the community reviewer.]
- **Guideline updates from adjudication:** [If adjudication reveals a systematic issue, when and how the guidelines are revised.]

## 9. Change log

Every version of these guidelines is recorded, dated, and briefly annotated. Guideline changes downstream of pilot annotation are normal; unrecorded changes are the problem.

| Version | Date | Change | Impact on prior annotations |
| --- | --- | --- | --- |
| 1.0 | [YYYY-MM-DD] | Initial. | — |
| [NEXT] | [YYYY-MM-DD] | [CHANGE] | [Re-annotate? Discard? Keep as-is?] |

## 10. Contact and community

- **Guidelines maintainer:** [NAME + contact]
- **How annotators raise concerns:** [Channel + response time commitment. See the [ombudsperson role](./consent-form.md#section-d--ombudsperson-role) in the consent template — the same principle applies for guideline issues.]
- **Community reviewer, if any:** [NAME + role]

---

**Contributor's note.** If you have run an African-language NLP annotation project and have a version of this document that survived contact with real annotators, the highest-value contribution is a redlined comparison against this template with your project-specific additions clearly marked. Real annotation-guideline documents from real projects are more useful than generic prose.
