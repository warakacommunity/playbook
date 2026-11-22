---
ready: true
title: Open-ended generation
sidebar_position: 2
last_update:
  date: 2026-11-22
  author: Shamsuddeen Hassan Muhammad
---

# Open-ended generation

Open-ended generation is the task of producing fluent, coherent, useful text from a prompt, anything from completing a sentence to writing a paragraph or holding a conversation. It is the foundation of the large language models now reshaping how people write and search, and it is the hardest generation task to do well in a low-resource language, because the model has to learn the grammar, vocabulary, and idiom of the language from data that barely exists.

## What the data looks like

Open-ended generation learns mostly from monolingual text, and the more clean text the better. For African languages the supply is thin and noisy, which is why community corpora built for the purpose matter: the WURA corpus was assembled and cleaned specifically to pretrain models on 16 African languages ([Oladipo et al., 2023](../references.md#oladipo-2023)), and the SERENGETI models were pretrained on data covering 517 African languages and language varieties ([Adebara et al., 2023](../references.md#serengeti-2023)), precisely because the web did not provide such data. The quality bar is high, because a generation model faithfully reproduces the errors in its training data, and the web-crawl audit that found large fractions of low-resource text to be mislabelled or machine-translated is a direct warning for anyone assembling generation data ([Kreutzer et al., 2022](../references.md#kreutzer-2022)). Beyond raw text, steering a model toward useful behaviour needs instruction data, which is prompts paired with good responses, and for African languages that almost always has to be written by people rather than scraped. The Aya Dataset shows what this looks like at scale: a human-curated instruction dataset across 65 languages, including several African languages, written by fluent speakers rather than translated from English ([Singh et al., 2024](../references.md#aya-2024)).

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

## Writing instruction data

Because instruction data is written rather than collected, the annotation task here is authoring, and the guidelines have to say what a good prompt and a good response look like. A few rules carry most of the weight:

- **Write in the language, not into it.** Ask native speakers to write prompts about things people in their community actually ask about, rather than translating English prompts. Translated prompts carry foreign topics, names, and phrasing into the data.
- **Cover a spread of task types and domains.** Mix open questions, explanations, rewriting, advice, and creative writing, and spread them across domains such as health, farming, education, and everyday life, so the model does not learn one register.
- **Specify the response standard.** State the expected length, register, and orthography (including diacritics and tone marks where the language uses them), and require that factual claims be ones the writer can stand behind.
- **Keep personal data out.** Writers should not include real names, phone numbers, or details about identifiable people in prompts or responses.

## Quality assurance

Every written example should be read by a second native speaker before it enters the dataset. The reviewer checks that the response actually answers the prompt, is factually correct, reads naturally, and follows the orthography rules, and either accepts, edits, or rejects it. Track rejection and edit rates per writer, as you would agreement in a labelling task, and feed recurring problems back into the guidelines (see [Data Quality](../4_data-quality/index.md)). Before release, remove near-duplicates and screen for text that was pasted from a machine translation system or a chatbot, since that is exactly the contamination human-written data is meant to avoid. Finally, hold back a set of prompts that never enters training, so the evaluation below measures the model on prompts it has not seen.

## Distinctive challenges

Three problems recur. Fluency is hard to reach when training data is small, and an undertrained model slips into the dominant colonial language or produces grammatical-looking nonsense. Factuality is fragile, because a model with thin knowledge of a language will invent confidently. And cultural grounding is easily missed, since a model trained mostly on translated or foreign text generates content that is linguistically African but culturally displaced. Native-speaker review is the only reliable check on all three.

## Evaluation

Automatic metrics for open-ended generation are weak, and doubly so for African languages. [Perplexity](https://en.wikipedia.org/wiki/Perplexity) measures how well a model predicts held-out text, but it says nothing about whether the output is useful, true, or natural, and it is not comparable across languages or tokenizers. There is no substitute for human evaluation by native speakers, judging fluency, adequacy, factuality, and cultural appropriateness on real prompts. Treat any automatic number as a rough internal signal, not a result to report on its own.

Because human judgement is the real measure here, the evaluation is itself an annotation task, and any labelling tool can host it. The config below shows a model response next to its prompt and collects a rating on each dimension, so several native speakers can score the same outputs and their agreement can be checked with the script in [Data Quality](../4_data-quality/index.md#measure-inter-annotator-agreement):

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

Scoring fluency and adequacy on a five-point scale makes them ordinal, which Krippendorff's alpha (ordinal) handles directly and unweighted Cohen's kappa does not, so reach for alpha when checking agreement on these ratings. The two factuality and cultural choices stay categorical and catch the confident inventions and cultural displacement that automatic metrics never see.


Two practical points make these ratings trustworthy. Show raters the responses in random order and without the name of the system that produced them, so that expectations about a particular model do not colour the scores. And when comparing systems, have every system answer the same held-out prompts, so differences in the scores reflect the models rather than the prompts.
