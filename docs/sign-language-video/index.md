---
ready: true
title: Video
last_update:
  date: 2026-11-24
  author: Tadesse Destaw
---

# Video

Video adds time to vision: the data is moving images, and the tasks read meaning from motion. This chapter groups four of them (sign language, gesture, general video and long video) under one roof because they share the demanding mechanics of working with video, even though they serve very different ends. The headline task for African languages is sign language, the visual languages of Deaf communities. Most language technology needs speech or text as input, which shuts out signed languages and the Deaf people who use them ([Yin et al., 2021](../references.md#yin-2021)), and African sign languages are only now getting their first datasets.

This chapter covers:

- **[Sign language](./sign-language.md)**: building corpora of the visual languages of Deaf communities, from recording and tier-based annotation to release and modelling.
- **[Gesture](./gesture.md)**: recognising hand and body gestures, which vary by culture.
- **[Video](./video.md)**: general video understanding, such as classification and captioning.
- **[Long video](./long-video.md)**: chunking long recordings with provenance, frame sampling, shot boundaries and audio-video sync.

## What these tasks share

Video data is heavy and laborious. Clips must be captured or sourced with rights and consent, stored and standardised at a manageable resolution and frame rate, and annotated over time as well as space, which makes labelling far slower than for still images. The [Vision overview](../sections/vision.md) and [Data Governance](../data-governance/index.md) chapters cover the shared groundwork, and the consent point is sharper for video than almost anywhere else, because a person on film is fully identifiable, and for sign language the signer's face and body are the language itself. The defining African fact across these tasks is novelty: where high-income sign languages now have substantial datasets, African sign languages had almost none until very recently (the [Sign language](./sign-language.md#existing-african-datasets) page lists the few that exist, published from 2022 onwards), so much of the work here is first-of-its-kind collection done with the communities concerned.
