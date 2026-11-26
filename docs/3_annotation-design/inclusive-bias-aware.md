---
title: Inclusive and Bias-Aware Annotation
sidebar_position: 4
ready: true
last_update:
  date: 2026-11-26
  author: Idris Abdulmumin
---

# Inclusive and Bias-Aware Annotation

Annotation is a human judgment, and human judgments carry the background of the person making them. Who annotates a dataset shapes what the dataset says, so inclusion and bias-awareness are not optional extras. They are part of getting the data right.

:::tip[Key points]

- Annotators read every item through their own variety, region, gender, age and experience, and this matters most for subjective tasks.
- Recruit native speakers from across the language community, not one convenient group, and cap each annotator's share.
- With consent, record pseudonymised annotator background so you can detect bias rather than guess at it.
- Train for bias-awareness through calibration, and involve the language community throughout.

:::

## Why annotator background shapes the data

An annotator reads every item through their own language variety, region, gender, age, and lived experience. For a factual task that influence is small. For the subjective tasks that dominate African-language work, such as sentiment, offensiveness, emotion, and sarcasm, it is decisive:

- A phrase that is ordinary in one community can read as an insult in another.
- A tone that one generation hears as respectful another hears as cold.

If a single demographic labels the whole dataset, its particular reading becomes the official "truth", and every model trained on the data inherits that narrowness. Diversity among annotators is therefore not only a matter of fairness. It is what makes the labels representative of the speakers the data is meant to serve.

## Recruit for diversity, deliberately

Build the annotator pool to reflect the community whose language it is, across gender, age, and especially dialect and region. Avoid leaning on whichever group is easiest to reach, such as university students in the capital, when the language is spoken far more widely than that.

Native-speaker involvement is the baseline, because native speakers catch the dialectal and idiomatic detail that outsiders miss. Leading African datasets, such as MasakhaNER 2.0 and AfriSenti, were annotated by native speakers of each language ([Adelani et al., 2022a](../references.md#adelani-2022); [Muhammad et al., 2023a](../references.md#muhammad-2023)).

A diverse pool helps only if its members' labels actually reach the dataset, so also cap how much of the data any one annotator may contribute; see [Cap each annotator's share](./workflow-adjudication.md#cap-each-annotators-share).

## Record annotator context, with consent

Where it is ethical and consented, record basic, pseudonymised information about each annotator, such as language background, region, and relevant expertise. This metadata serves two purposes:

- **Detecting bias.** It lets you check after the fact whether labels split along demographic lines, so you detect bias rather than guess at it.
- **Keeping different readings.** It makes a perspectivist approach possible, that is, keeping and studying the different readings of an item instead of forcing one answer. You can do this only if you know whose reading each label is.

Collect only what you need, and treat it under the same consent and privacy terms as the rest of the data.

Ask background questions once, after consent and before the first item, and link the answers to labels through a pseudonymous ID rather than a name or email address. Allow optional answers to be withdrawn. [Data about your annotators](../data-governance/index.md#data-about-your-annotators) covers the rest: which answers are required, who may see them, and how to keep individual quality records private.

## Build awareness, and involve the community

Train annotators to notice their own cultural and personal biases, using paired examples of biased and even-handed labelling. Reinforce that the goal is to apply the guideline consistently, not to impose a personal verdict. Bias-awareness is not a one-off slide. It is a habit kept alive through calibration and feedback.

Underneath all of this sits community participation: engaging the communities whose language is being annotated, drawing on native-speaker knowledge, and respecting community norms. This is both a quality practice and an ethical one, and it follows directly from the principle that a community should hold authority over data about it ([Carroll et al., 2020](../references.md#carroll-2020)). Inclusive annotation and good governance are the same commitment seen from two angles.
