---
title: Image-Text
---

# Image-Text

Image-text tasks join a picture to language: answering a question about an image, or describing one in words. They sit at the meeting point of the vision and text chapters, and they are among the newest tasks to reach African languages, because they need an image, a language, and the alignment between them, each scarce on its own and scarcer together.

This chapter covers two image-text tasks:

- **[Visual question answering](./vqa.md)**: answering a natural-language question about an image.
- **[Image captioning](./captioning.md)**: describing an image in fluent text.

## What the two tasks share, and what makes them African

Both pair images with text, and both depend on a tight match between the two: the answer or caption has to be true to what the image actually shows. The shared groundwork is aligning the modalities, annotating them jointly, and quality-controlling both at once (see the [Multimodal overview](../sections/multimodal.md)). The African difficulty is twofold. The images themselves are usually drawn from Western datasets and show Western scenes, so a model learns to describe a world that is not the user's, and the cheapest way to get African-language data, translating English questions and captions, produces text that is grammatically African but culturally foreign. The strongest recent work pushes back on both: HaVQA built Hausa visual question answering with careful human translation tied to the images ([HaVQA, 2023](../references.md#havqa-2023)), and AfriCaption set out a new paradigm for image captioning across several African languages rather than translating from English ([AfriCaption, 2025](../references.md#africaption-2025)).
