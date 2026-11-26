---
ready: true
title: Image-Text
last_update:
  date: 2026-11-26
  author: Tadesse Destaw
---

# Image-Text

Image-text tasks join a picture to language: answering a question about an image, or describing one in words. They sit at the meeting point of the vision and text chapters, and they are among the newest tasks to reach African languages, because they need an image, a language, and the alignment between them, each scarce on its own and scarcer together.

This chapter covers two image-text tasks:

- **[Visual question answering](./vqa.md)**: answering a natural-language question about an image.
- **[Image captioning](./captioning.md)**: describing an image in fluent text.

:::tip[Key points]

- Image-text tasks need images, African-language text and a close match between the two.
- Most images come from Western datasets, and translated text is often culturally foreign.
- Natively written questions and captions about local images are the main gap.
- Prompt open multimodal models on your own test set first; fine-tune only if that falls short.

:::

## What the two tasks share, and what makes them African

Both tasks pair images with text, and both depend on a tight match between the two: the answer or caption has to be true to what the image actually shows. The shared groundwork is aligning the modalities, annotating them jointly, and checking the quality of both at once (see the [Multimodal overview](../sections/multimodal.md)).

The African difficulty is twofold:

- **The images.** They are usually drawn from Western datasets and show Western scenes, so a model learns to describe a world that is not the user's.
- **The text.** The cheapest way to get African-language data is to translate English questions and captions. This produces text that is grammatically African but culturally foreign.

Current African resources show both routes and their limits:

- **HaVQA** built Hausa visual question answering by careful human translation of question-answer pairs, checked against the images ([HaVQA, 2023](../references.md#havqa-2023)).
- **AfriCaption** built captions in 20 African languages by machine-translating Flickr8k captions, with semantic selection, quality filtering and native-speaker ratings for a few languages ([AfriCaption, 2025](../references.md#africaption-2025)). It gives scale, but its images and framing are still those of an English dataset.

Natively written questions and captions about local images remain the gap to fill.

## Models for image-text tasks in 2026

General-purpose multimodal large language models (MLLMs) now handle both VQA and captioning through prompting. They have replaced the fine-tuned encoder-decoder models of 2020-2023. These are the workable open baselines:

| Model | Sizes | Licence | Good for |
|---|---|---|---|
| **PaliGemma 2** ([Steiner et al., 2024](../references.md#steiner-2024-paligemma2)) | 3B, 10B, 28B; 224, 448 or 896 px input | Gemma terms of use, not an OSI open-source licence | A strong small open baseline. Built on Gemma 2 and the SigLIP image encoder, with captioning among its core pretraining tasks. Suits prompting or light fine-tuning. |
| **Qwen2-VL / [Qwen2.5-VL](https://qwenlm.github.io/blog/qwen2.5-vl/)** ([Wang et al., 2024](../references.md#wang-2024-qwen2vl)) | 2B to 72B | Differs by model: several are Apache-2.0, the 72B models use the Qwen licence, and Qwen2.5-VL 3B is research-only. Check each model card. | Multilingual benchmarks, multi-image and video reasoning, text in images. |
| **[InternVL 2.5 / 3](https://github.com/OpenGVLab/InternVL)** ([Chen et al., 2024](../references.md#chen-2024-internvl25)) | 1B to 78B (2024-2025) | Code is MIT; the weights inherit their components' licences. Check each model card. | A second strong open family. Compare it with Qwen2.5-VL on your own images. |
| **[LLaVA-NeXT](https://llava-vl.github.io/blog/2024-01-30-llava-next/) / LLaVA-1.5** ([Liu et al., 2024](../references.md#liu-2024-llava15)) | 7B and up | See each model card | A reproducibility baseline; weaker than the 2025-2026 releases. |
| **[Molmo](https://molmo.allenai.org/)** ([Deitke et al., 2024](../references.md#deitke-2024-molmo)) | 1B to 72B | Apache-2.0 weights (the 72B is built on Qwen2-72B, which has its own licence; check each model card); open training data (PixMo) and open code | Fully open research; 2D pointing for answers tied to a place in the image. |

**Closed-API baselines.** Current commercial multimodal models, available only through paid APIs, handle African-language VQA and captioning to varying degrees. Named versions change every few months, so test whichever ones you can access on your own test set. Keep in mind:

- Coverage is uneven across languages and orthographies.
- Their terms prevent redistribution, and evaluation is not reproducible without live API access.
- Their output can be more fluent than open-model output without being more accurate. They can name objects that are not in the image, or frame a scene in an English-inflected or culturally displaced way.

Use them as a ceiling reference for open models, not as the main deployment route, unless your budget and their terms allow it. See the [compute-poor chapter's API caveats](../compute-poor/index.md#api-based-approaches-legitimate-but-not-free).

:::tip[Shortest defensible path]

1. Prompt Qwen2.5-VL-7B and PaliGemma 2 on your own test set and compare them.
2. If prompting falls short, LoRA fine-tune the stronger model on your task data.
3. Before deployment, have native speakers check at least 200 outputs against the images.

Each task page names its dataset for step 2: [VQA](./vqa.md#the-2026-modelling-landscape) and [captioning](./captioning.md#the-2026-modelling-landscape).

:::
