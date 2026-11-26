---
sidebar_position: 10
sidebar_label: "Emotion Analysis"
ready: true
last_update:
  date: 2026-11-26
  author: Idris Abdulmumin
---

# Emotion Analysis

Emotion analysis (also called emotion detection or emotion classification) identifies the emotions expressed in a piece of text. Sentiment analysis usually sorts text into positive, negative or neutral. Emotion analysis goes further and names specific emotional states, such as anger, disgust, fear, joy, sadness and surprise, with neutral for text that shows none of them.

Label sets like this follow discrete models of emotion such as Ekman's basic emotions ([Ekman, 1992](../references.md#ekman-1992)). The BRIGHTER datasets, which cover 28 languages including many African languages, use these six emotions and treat a text with none of them as neutral. Their annotators label the emotions they *perceive* in the text, rather than guessing what the writer felt ([Muhammad et al., 2025b](../references.md#brighter-2025)). State in your guideline which of the two you want.

Specific emotions are more informative than polarity alone. For example, a service team that can spot frustration in a complaint can respond before the problem escalates. Emotion can be annotated in one of the approaches below.

:::tip[Key points]

- Decide whether annotators label the emotion they *perceive* in the text or the emotion they think the writer felt, and say so in the guideline.
- Choose single-label (one dominant emotion) or multi-label (all emotions present) before you write the guideline.
- For multi-label data, consider rating each emotion's intensity (0 to 3); the aggregation rule uses it to settle ties between annotators.
- Aggregate with a rule that uses both agreement and intensity, not a bare majority vote.
- Release intensity labels only when enough people annotated each item, ideally five or more.

:::

## Single-label Emotion Analysis

In single-label annotation, each text gets exactly one label: either the one dominant emotion from the list, or neutral if it expresses none.

| Id | Text | Emotion |
|----|------|---------|
| sample_01 | Never saw him again. | Sadness |
| sample_02 | I love telling this story. | Joy |
| sample_03 | How stupid of him. | Anger |
| sample_04 | None of us did. | Neutral |
| sample_05 | I can't believe it! I won the scholarship! This is amazing! | Joy |

## Multi-label Emotion Analysis

In multi-label annotation, a text may express no emotion, one emotion, or several emotions at once. Annotators select every emotion that applies.

It is common to also record an intensity for each selected emotion, because emotions in the same text can differ in strength. Intensity adds information beyond the presence or absence of an emotion. Shared tasks such as SemEval-2018 Task 1 ([Mohammad et al., 2018](../references.md#mohammad-2018)) and SemEval-2025 Task 11 ([Muhammad et al., 2025c](../references.md#semeval-2025-task11)) included both emotion labels and intensity. BRIGHTER asks annotators to select all emotions that apply and rate each on a 0 to 3 scale ([Muhammad et al., 2025b](../references.md#brighter-2025)).

**Task specification: multi-label emotion with intensity**

| Setting | Value |
|---|---|
| Annotator sees | One text (a post, sentence or short paragraph) |
| Annotator gives | An intensity for each emotion: anger, disgust, fear, joy, sadness, surprise |
| Choice | One rating per emotion on a 0 to 3 scale: 0 = not present, 1 = low, 2 = medium, 3 = high; an item with all six at 0 is neutral |
| Notes | Rating every emotion, including 0, makes "not present" an explicit decision rather than a missed field |

Each emotion's final label is binary: 1 if the emotion is present, 0 if it is not. With presence-only labels, a majority vote per emotion works. With intensities, or with an even number of annotators where a vote can tie (for example, scores 0, 0, 3, 3), use the rule in [Conditions for Determining the Final Emotion Label](#conditions-for-determining-the-final-emotion-label).

## Conditions for Determining the Final Emotion Label

An emotion is present (final label = 1) only if both conditions hold:

1. **Agreement:** at least two annotators give it a non-zero intensity (1 low, 2 medium or 3 high). This ensures a basic level of agreement that the emotion is there.
2. **Strength:** the average score across all annotators is above a set threshold. This ensures the emotion is strong enough to count as present.

This is the rule used to build the BRIGHTER emotion datasets, with the threshold set to 0.5 ([Muhammad et al., 2025b](../references.md#brighter-2025)). The examples below apply it.

| Example | Annotator scores | Non-zero scores | Average | Final label |
|---|---|:---:|---|:---:|
| 1 | 0, 0, 3, 3 | 2 | (0 + 0 + 3 + 3) / 4 = 1.5 | 1 (present) |
| 2 | 1, 2, 1 | 3 | (1 + 2 + 1) / 3 = 1.33 | 1 (present) |
| 3 | 1, 1, 0 | 2 | (1 + 1 + 0) / 3 = 0.67 | 1 (present) |
| 4 | 1, 1, 0, 0, 0 | 2 | (1 + 1 + 0 + 0 + 0) / 5 = 0.4 | 0 (not present) |
| 5 | 1, 2, 3, 2 | 4 | (1 + 2 + 3 + 2) / 4 = 2.0 | 1 (present) |

Majority vote ignores intensity and can miss subtle emotion. A sample of a multi-label emotion dataset with the final binary labels is shown below.

| Id | Text | Anger | Fear | Joy | Sadness | Surprise |
|----|------|:-----:|:----:|:---:|:-------:|:--------:|
| sample_01 | Never saw him again. | 0 | 0 | 0 | 1 | 0 |
| sample_02 | I love telling this story. | 0 | 0 | 1 | 0 | 0 |
| sample_03 | How stupid of him. | 1 | 0 | 0 | 0 | 0 |
| sample_04 | None of us did. | 0 | 0 | 0 | 0 | 0 |
| sample_05 | I can't believe it! I won the scholarship! This is amazing! | 0 | 0 | 1 | 0 | 1 |

## Emotion Intensity

Annotators mark the emotions they think the text conveys and rate each one: 0 (no emotion), 1 (low), 2 (medium) or 3 (high). To get one intensity class per emotion:

1. Average the annotators' scores for that emotion.
2. Round the average to the nearest level (0, 1, 2 or 3). A value exactly halfway between two levels is rounded up.

BRIGHTER also averages the annotators' intensity scores to get one level per emotion, but its rounding step differs from the one above. The paper's main text says the average is rounded up to a whole level, while its appendix formula maps the average down to the level below it (for example, 1.5 becomes 1). Check which rule a released dataset used before you compare your labels with it, and state your own rule in your dataset documentation. BRIGHTER assigns intensity only to datasets where most items were annotated by at least five people, so that the average is robust ([Muhammad et al., 2025b](../references.md#brighter-2025)).

:::warning

With only two or three annotators per item, the average is unstable. Consider releasing presence labels only.

:::

| Example | Annotator scores | Average | Intensity class |
|---|---|---|---|
| 1 | 1, 2, 2, 3 | (1 + 2 + 2 + 3) / 4 = 2.0 | 2 (medium) |
| 2 | 0, 0, 1, 1 | (0 + 0 + 1 + 1) / 4 = 0.5 | 1 (low) |
| 3 | 3, 3, 3, 2 | (3 + 3 + 3 + 2) / 4 = 2.75 | 3 (high) |
| 4 | 0, 0, 0, 1 | (0 + 0 + 0 + 1) / 4 = 0.25 | 0 (no emotion) |

A sample of a multi-label emotion intensity dataset is shown below. Each emotion has an intensity from 0 (not present) to 3 (high).

| Id | Text | Anger | Fear | Joy | Sadness | Surprise |
|----|------|:-----:|:----:|:---:|:-------:|:--------:|
| sample_01 | Never saw him again. | 0 | 0 | 0 | 2 | 0 |
| sample_02 | I love telling this story. | 0 | 0 | 2 | 0 | 0 |
| sample_03 | How stupid of him. | 2 | 0 | 0 | 0 | 0 |
| sample_04 | None of us did. | 0 | 0 | 0 | 0 | 0 |
| sample_05 | I can't believe it! I won the scholarship! This is amazing! | 0 | 0 | 3 | 0 | 3 |

## Further reading

- [Muhammad et al. (2025b)](../references.md#brighter-2025): BRIGHTER, how multi-label emotion and intensity data was collected, annotated and aggregated for 28 languages, many of them African.
- [Muhammad et al. (2025c)](../references.md#semeval-2025-task11): SemEval-2025 Task 11, the shared task built on these datasets, with tracks for emotion labels, intensity and cross-lingual detection.
- [Mohammad et al. (2018)](../references.md#mohammad-2018): SemEval-2018 Affect in Tweets, an earlier benchmark with emotion classes, intensity and valence in English, Arabic and Spanish.
- [Mohammad (2022)](../references.md#mohammad-2022): an ethics sheet for emotion recognition and sentiment analysis, useful when planning data, consent and release.
