---
title: Open-ended generation
sidebar_position: 2
---

# Open-ended generation

Open-ended generation is the task of producing fluent, coherent, useful text from a prompt, anything from completing a sentence to writing a paragraph or holding a conversation. It is the foundation of the large language models now reshaping how people write and search, and it is the hardest generation task to do well in a low-resource language, because the model has to learn the grammar, vocabulary, and idiom of the language from data that barely exists.

## What the data looks like

Open-ended generation learns mostly from monolingual text, and the more clean text the better. For African languages the supply is thin and noisy, which is why community corpora built for the purpose matter: large pretraining datasets such as WURA and the SERENGETI collection assembled hundreds of millions of tokens across many African languages precisely because the web did not provide them. The quality bar is high, because a generation model faithfully reproduces the errors in its training data, and the web-crawl audit that found large fractions of low-resource text to be mislabelled or machine-translated is a direct warning for anyone assembling generation data ([Kreutzer et al., 2022](../references.md#kreutzer-2022)). Beyond raw text, steering a model toward useful behaviour needs instruction data, which is prompts paired with good responses, and for African languages that almost always has to be written by people rather than scraped.

Instruction data is usually stored as one JSON object per example, with the prompt and its written response, plus the provenance fields the rest of this playbook keeps. A small Hausa example:

```json
{
  "instruction": "Rubuta gajeren bayani kan amfanin shan ruwa mai tsafta.",
  "input": "",
  "output": "Shan ruwa mai tsafta yana kare jiki daga cututtuka kamar gudawa da taifod, yana kuma taimakawa wajen narkar da abinci.",
  "language": "hau_Latn",
  "author": "native-speaker",
  "license": "CC BY 4.0"
}
```

The `input` field is left empty for an open instruction and filled when the task acts on supplied text, for example summarizing or rewriting a passage. Writing these by hand is slow but unavoidable: scraped instruction data for African languages is rare, and what does exist is often machine-translated and carries the very errors a generation model will reproduce.

## Distinctive challenges

Three problems recur. Fluency is hard to reach when training data is small, and an undertrained model slips into the dominant colonial language or produces grammatical-looking nonsense. Factuality is fragile, because a model with thin knowledge of a language will invent confidently. And cultural grounding is easily missed, since a model trained mostly on translated or foreign text generates content that is linguistically African but culturally displaced. Native-speaker review is the only reliable check on all three.

## Evaluation

Automatic metrics for open-ended generation are weak, and doubly so for African languages. [Perplexity](https://en.wikipedia.org/wiki/Perplexity) measures how well a model predicts held-out text, but it says nothing about whether the output is useful, true, or natural, and it is not comparable across languages or tokenizers. There is no substitute for human evaluation by native speakers, judging fluency, adequacy, factuality, and cultural appropriateness on real prompts. Treat any automatic number as a rough internal signal, not a result to report on its own.

Because human judgement is the real measure here, the evaluation is itself an annotation task, and any labeling tool can host it. The config below shows a model response next to its prompt and collects a rating on each dimension, so several native speakers can score the same outputs and their agreement can be checked with the [Data Quality](../data-quality) script:

```xml
<View>
  <Header value="Prompt"/>
  <Text name="prompt" value="$prompt"/>
  <Header value="Model response"/>
  <Text name="response" value="$response"/>

  <Rating name="fluency"  toName="response" maxRating="5"
          hotkey="f" required="true"/>
  <Rating name="adequacy" toName="response" maxRating="5"
          hotkey="a" required="true"/>
  <Choices name="factual" toName="response" choice="single" required="true">
    <Choice value="Factually correct"/>
    <Choice value="Contains an invented claim"/>
  </Choices>
  <Choices name="cultural" toName="response" choice="single">
    <Choice value="Culturally appropriate"/>
    <Choice value="Linguistically off or displaced"/>
  </Choices>
</View>
```

Scoring fluency and adequacy on a five-point scale makes them ordinal, which is the case Krippendorff's alpha handles and Cohen's kappa does not, so reach for alpha when checking agreement on these ratings. The two factuality and cultural choices stay categorical and catch the confident inventions and cultural displacement that automatic metrics never see.
