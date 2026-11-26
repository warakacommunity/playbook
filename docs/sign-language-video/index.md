---
ready: true
title: Video
last_update:
  date: 2026-11-26
  author: Tadesse Destaw
---

# Video

Video adds time to vision: the data is moving images, and the tasks read meaning from motion. This chapter groups four of them (sign language, gesture, general video and long video) under one roof because they share the demanding mechanics of working with video, even though they serve very different ends. The headline task for African languages is sign language, the visual languages of Deaf communities. Most language technology needs speech or text as input, which shuts out signed languages and the Deaf people who use them ([Yin et al., 2021](../references.md#yin-2021)), and African sign languages are only now getting their first datasets.

This chapter covers:

- **[Sign language](./sign-language.md)**: building corpora of the visual languages of Deaf communities, from recording and tier-based annotation to release and modelling.
- **[Gesture](./gesture.md)**: recognising hand and body gestures, which vary by culture.
- **[Video](./video.md)**: general video understanding, such as classification and captioning.
- **[Long video](./long-video.md)**: chunking long recordings with provenance, frame sampling, shot boundaries and audio-video sync.

:::tip[Key points]

- Sign language, gesture, general video and long video share the heavy mechanics of video data.
- Video labels mark time as well as space, so annotation is far slower than for still images.
- People on film are fully identifiable; a signer's face and body cannot simply be blurred.
- African sign languages have very few datasets, so most work is new collection with Deaf communities.

:::

## What these tasks share

Video data is heavy and slow to work with:

- **Sourcing.** Clips must be captured or sourced with clear rights and consent.
- **Storage.** Files must be stored and standardised at a manageable resolution and frame rate.
- **Annotation.** Labels mark time as well as space, so labelling is far slower than for still images.

The [Vision overview](../sections/vision.md) and [Data Governance](../data-governance/index.md) chapters cover the shared groundwork.

:::warning[Consent matters more for video]

A person on film is fully identifiable. For sign language, the signer's face and body are the language itself, so they cannot simply be blurred away.

:::

The defining African fact across these tasks is novelty. High-income sign languages now have substantial datasets, but African sign languages had almost none until very recently. The [Sign language](./sign-language.md#existing-african-datasets) page lists the few that exist, published from 2022 onwards. Much of the work here is therefore first-of-its-kind collection, done with the communities concerned.
