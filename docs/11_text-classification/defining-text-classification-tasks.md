---
sidebar_position: 1
sidebar_label: "Overview"
ready: true
last_update:
  date: 2026-07-07
  author: Idris Abdulmumin
---

# Defining text classification tasks:

Text classification is a supervised NLP task in which a text is assigned one or more labels from a predefined label set. In this playbook, we focus on four common text classification tasks: sentiment analysis, emotion analysis, hate speech analysis, and topic classification. Although these tasks can overlap in practice, they differ in what they aim to capture: sentiment focuses on polarity, emotion focuses on affective state, hate speech focuses on harmful or discriminatory language

:::info[Scope note]
This chapter is designed for dataset creation and annotation. It does not cover downstream model training in detail, but the annotated outputs can later be used for classification, retrieval, moderation, or analytics pipelines.
:::

### Task distinction
Below is a short definition of the common NLP tasks (the question asks and answers). The details of each task are discussed later.
- Sentiment analysis: Is the text positive, negative, neutral, or mixed?
- Emotion analysis: What emotion or emotions are expressed?
- Hate speech analysis: Does the text contain hateful, offensive, or discriminatory language, and who is targeted?
- Topic classification: What is the main theme or domain of the text?


![Text classication NLP tasks taxonomy](images/text-classification.svg)

:::warning[Define tasks]
Define the annotation objective before collecting data. A dataset built for sentiment analysis should not be reused for hate speech or emotion analysis without revisiting the label schema and annotation guidelines.
:::
