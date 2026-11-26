---
ready: true
title: Open-ended generation
sidebar_position: 2
last_update:
  date: 2026-11-26
  author: Shamsuddeen Hassan Muhammad
---

# Open-ended generation

Open-ended generation is the task of producing fluent, coherent, useful text from a prompt: anything from completing a sentence to writing a paragraph or holding a conversation. It is the foundation of the large language models now reshaping how people write and search.

It is also the hardest generation task to do well in a low-resource language. The model has to learn the grammar, vocabulary and idiom of the language from data that barely exists.

:::tip[Key points]

- Generation learns from clean monolingual text, and copies whatever errors that text contains.
- Instruction data (prompts paired with good responses) should be written by native speakers rather than translated or scraped.
- Have a second native speaker review every written example before it enters the dataset.
- Test safety in the language itself: red-team with native speakers.
- Judge outputs with native-speaker ratings; treat perplexity and other automatic scores as rough internal signals.

:::

## What the data looks like

Open-ended generation learns mostly from **monolingual text**, and the more clean text the better. For African languages the supply is thin and noisy, which is why community corpora built for the purpose matter:

- The **WURA** corpus was assembled and cleaned specifically to pretrain models on 16 African languages ([Oladipo et al., 2023](../references.md#oladipo-2023)).
- The **SERENGETI** models were pretrained on data covering 517 African languages and language varieties ([Adebara et al., 2023](../references.md#serengeti-2023)).

Both were built because the web did not provide such data. The quality bar is high, because a generation model faithfully reproduces the errors in its training data. An audit of web-crawled corpora found large fractions of low-resource text to be mislabelled or machine-translated, a direct warning for anyone assembling generation data ([Kreutzer et al., 2022](../references.md#kreutzer-2022)).

Beyond raw text, steering a model toward useful behaviour needs **instruction data**: prompts paired with good responses. For African languages this almost always has to be written by people rather than scraped. The Aya Dataset shows what this looks like at scale: a human-curated instruction dataset across 65 languages, including several African languages, written by fluent speakers rather than translated from English ([Singh et al., 2024](../references.md#aya-2024)).

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

Three problems recur:

- **Fluency** is hard to reach when training data is small. An undertrained model slips into the dominant colonial language or produces grammatical-looking nonsense.
- **Factuality** is fragile. A model with thin knowledge of a language will invent confidently.
- **Cultural grounding** is easily missed. A model trained mostly on translated or foreign text generates content that is linguistically African but culturally displaced.

Native-speaker review is the only reliable check on all three.

## Adversarial testing (red-teaming)

A model that behaves safely in English may not behave safely in an African language. In a 2023 study, unsafe English prompts translated into low-resource languages, including Zulu, got past GPT-4's safeguards far more often than the English originals: combining four low-resource languages produced a harmful response for about 79% of the prompts in the AdvBench benchmark ([Yong et al., 2023](../references.md#yong-2023)). Models have changed since then, but the lesson holds: safety has to be tested in the language itself.

Red-teaming is a data-collection task like any other. Native speakers write adversarial prompts in the target language, and the model's responses are rated:

- **Adapt the harm taxonomy to local context.** Start from a general list of harms, then add what matters where the model will be used, such as ethnic or religious slurs, local political violence, and health misinformation. [Hate Speech Analysis](../11_text-classification/hate-speech-analysis.md) shows how local hate categories are defined.
- **Recruit native-speaker red-teamers.** Ask them to attack the way real users write, including code-switching, transliteration, and non-standard spelling, not only clean standard text.
- **Record every attempt in a fixed structure.** For each attempt, keep the attack category, the prompt, the model's response, and a severity rating, plus the usual language and provenance fields, so results can be counted and the prompts reused as a regression test.
- **Protect the red-teamers.** Writing and reading harmful content takes a toll, so apply the same safeguards as any harmful-content annotation (see [Protect annotators from harmful content](../3_annotation-design/annotation-task-design.md#protect-annotators-from-harmful-content)).

Keep the adversarial prompts out of public training releases unless you have decided otherwise on purpose, because a published attack set is also a ready-made tool for misuse.

## Evaluation

Automatic metrics for open-ended generation are weak, and doubly so for African languages. [Perplexity](https://en.wikipedia.org/wiki/Perplexity) measures how well a model predicts held-out text, but it says nothing about whether the output is useful, true, or natural, and it is not comparable across languages or tokenizers. There is no substitute for human evaluation by native speakers, judging fluency, adequacy, factuality, and cultural appropriateness on real prompts. Treat any automatic number as a rough internal signal, not a result to report on its own.

Because human judgement is the real measure here, the evaluation is itself an annotation task. Show each model response next to its prompt and collect a rating on each quality dimension, so that several native speakers can score the same outputs. Their agreement can then be checked with the script in [Data Quality](../4_data-quality/index.md#measure-inter-annotator-agreement).

**Task specification: rating generated responses**

| Setting | Value |
|---|---|
| Annotator sees | The prompt, then the model response |
| Annotator gives | Fluency rating (1 to 5); adequacy rating (1 to 5); factuality: "Factually correct" or "Contains an invented claim"; cultural fit: "Culturally appropriate" or "Linguistically off or displaced" |
| Choice | Each rating: exactly one value, required. Factuality: exactly one, required. Cultural fit: exactly one, optional |
| Shortcuts | One key each for the fluency and adequacy ratings |

Scoring fluency and adequacy on a five-point scale makes them ordinal. Krippendorff's alpha (ordinal) handles ordinal ratings directly and unweighted Cohen's kappa does not, so use alpha when checking agreement on these ratings. The factuality and cultural-fit choices stay categorical. They catch the confident inventions and cultural displacement that automatic metrics never see.

Two practical points make these ratings trustworthy. Show raters the responses in random order and without the name of the system that produced them, so that expectations about a particular model do not colour the scores. And when comparing systems, have every system answer the same held-out prompts, so differences in the scores reflect the models rather than the prompts. [Human Evaluation Designs](../3_annotation-design/human-evaluation-designs.md) compares absolute ratings with pairwise comparison and ranking, and lists the [controls every design needs](../3_annotation-design/human-evaluation-designs.md#controls-for-every-design).
