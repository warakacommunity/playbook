---
sidebar_position: 9
sidebar_label: "Sentiment Analysis"
ready: true
last_update:
  date: 2026-11-26
  author: Idris Abdulmumin
---
# Sentiment Analysis

Sentiment analysis in this playbook means labelling text by the polarity of the attitude it expresses towards a subject, product, event or experience. The most common labels are positive, negative, neutral and mixed. Depending on the project, sentiment may be annotated at the document, sentence or aspect level.

A sentiment annotation guideline gives annotators clear instructions and worked examples, so that they label the same kinds of text in the same way. This matters even for a task that looks as simple as choosing positive, negative or neutral. Without precise instructions, annotators are unsure how to label sarcasm, rhetorical questions, quoted text or neutral reports of bad news, and their labels become inconsistent ([Mohammad, 2016](../references.md#mohammad-2016)). In a customer feedback project, for instance, the guideline helps the team agree on how to read ambiguous phrases. Because models learn from these labels, the quality of the guideline shows up directly in the quality of the models trained on the data.

:::tip[Key points]

- Choose the level (document, sentence or aspect) and the label set before writing the guideline.
- Three labels (positive, negative, neutral) are the most common; add mixed when texts often carry both.
- Give each label a decision rule and an example.
- Write rules for the hard cases: sarcasm, code-switching, negation and mixed sentiment.
- Test those hard cases in a pilot before scaling up.

:::

## Types of sentiment analysis

Sentiment can be annotated in one or more of the following ways.

![Types of sentiment analysis](images/sentiment-analysis.svg)

### Fine-grained (scaled) analysis

Graded sentiment analysis assigns scores on a scale, which shows how strong the sentiment is. For example, a review might be labelled "very positive", "slightly positive", "neutral", "slightly negative" or "very negative". SemEval-2016 Task 4 added exactly this kind of five-point scale to tweet sentiment classification ([Nakov et al., 2016](../references.md#nakov-2016)).

If you need reliable intensity scores rather than classes, consider comparative methods. Best-worst scaling has given more reliable sentiment-intensity scores than rating scales for the same number of annotations ([Kiritchenko and Mohammad, 2017](../references.md#kiritchenko-2017)).

### Aspect-based analysis

Aspect-based analysis identifies sentiment towards specific aspects or features of a product, service or topic. In a hotel review, it might find positive sentiment towards the location but negative sentiment towards cleanliness. In a smartphone review, it rates the battery, screen, camera and performance separately.

A widely used reference scheme is SemEval-2014 Task 4. Restaurant and laptop reviews were annotated with aspect terms, and restaurant reviews also with aspect categories, each with a polarity of positive, negative, neutral or conflict (both positive and negative) ([Pontiki et al., 2014](../references.md#pontiki-2014)).

### Intent-based analysis

Some guides also describe an intent-based type, which looks at the motive behind a text: whether the author wants to give an opinion, make a recommendation, ask a question or express a need. For example, a customer tweets, "I wish Company X's product had a longer battery life." This shows dissatisfaction and a wish for a feature change, which Company X can use to improve its product. In practice, intent is usually annotated as a separate task with its own label set; see [Intent Classification](./intent-classification).

## Sentiment analysis labels definition

The label set can have two labels (positive and negative), three (positive, negative and neutral), or all four below.

- **Three labels are the most common choice in benchmarks.** The earlier SemEval Twitter sentiment tasks used positive, negative and neutral ([Nakov et al., 2016](../references.md#nakov-2016)), as did the AfriSenti datasets for 14 African languages, annotated by native speakers ([Muhammad et al., 2023a](../references.md#muhammad-2023)).
- **A mixed label** (called "conflict" in some schemes) is useful when a text, or one aspect of it, carries both positive and negative sentiment ([Pontiki et al., 2014](../references.md#pontiki-2014); [Mohammad, 2016](../references.md#mohammad-2016)).

The four labels are defined as follows:

- **Positive:** a message that conveys a clearly favourable attitude, such as satisfaction, approval, praise or happiness, towards a subject, product or experience.
- **Negative:** a message that conveys a clearly unfavourable attitude, such as dissatisfaction, disapproval, criticism or frustration, towards a subject, product or experience.
- **Mixed:** a message that includes both positive and negative sentiment, either about different aspects of the same subject or within the same statement.
- **Neutral:** a message that expresses no clear positive or negative sentiment, typically factual, descriptive or objective information without emotional judgement.

Examples of sentiment decisions:

| Label | Decision rule | Example |
|-------|---------------|---------|
| Positive | Overall attitude is favourable, even with minor complaints. | "I love this phone, best I've owned." |
| Negative | Overall attitude is unfavourable. | "This app keeps crashing, useless." |
| Mixed | Use only when both are clearly present and roughly balanced. | "Great camera but the battery dies fast." |
| Neutral | Default when no evaluative stance is expressed. | "The package arrived on Tuesday." |

## Setting up the task

**Task specification: sentence-level sentiment**

| Setting | Value |
|---|---|
| Annotator sees | The full text, with any context needed to read it (for example the post it replies to) |
| Annotator gives | One sentiment label |
| Choice | Exactly one of positive, negative, mixed, neutral (or the project's own label set); required |
| Notes | Provide a skip or "unsure" option, so annotators do not guess on texts they cannot judge |

Before scaling up, test examples that contain sarcasm, code-switching, negation and mixed sentiment. These are where annotators disagree most: in AfriSenti, sarcasm and code-mixing were reported as major sources of disagreement in several languages ([Muhammad et al., 2023a](../references.md#muhammad-2023)).

Write a rule for each hard case in the guideline. One option is to give sarcasm and ridicule their own label, so annotators do not have to force them into positive or negative ([Mohammad, 2016](../references.md#mohammad-2016)).

## Further reading

- [Mohammad (2016)](../references.md#mohammad-2016): a short practical guide to the sentence types that are hard to label for sentiment, with two example questionnaires.
- [Pontiki et al. (2014)](../references.md#pontiki-2014): the SemEval-2014 aspect-based sentiment scheme, a starting point for aspect-level guidelines.
- [Kiritchenko and Mohammad (2017)](../references.md#kiritchenko-2017): why best-worst scaling can beat rating scales for sentiment intensity.
