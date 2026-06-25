---
title: Data Modalities
description: What data modality means, why it's the first fork in the road for any collection plan, and how it shapes cost, sourcing, and tooling long before anyone writes an annotation guideline.
---

# Data Modalities

Learn what data modality means, why it's the first decision in any collection plan, and how it shapes cost, sourcing, and tooling long before anyone writes an annotation guideline.

## What a modality is

A **data modality** is the format a piece of data takes — text, image, audio, video, or some structured combination of these. Each modality encodes information differently and needs different tools to capture, store, and process it. A sentence and a photograph might describe the same painting, but one is a sequence of discrete symbols and the other is a dense grid of pixel values; nothing about how you collect, store, or validate one transfers directly to the other.

This matters more than it sounds. Most of the hard choices in dataset creation — where the data comes from, what it costs, who can label it, what can go wrong — are downstream of the modality decision, not the modeling decision. A multilingual sentiment project that decides to add a speech component is not "adding a feature." It is starting an entirely separate collection effort, often with its own budget line, its own legal questions, and its own pool of qualified contributors.

:::note Scope of this section
This page covers modality at the **collection** stage: what each modality is and why it changes where you go to find data, who can supply it, and how much it costs. Designing annotation tasks and label schemas for a given modality — bounding boxes, transcription guidelines, emotion taxonomies — is covered later, in [Chapter 5: Modality-Specific Task Design](https://warakacommunity.github.io/AfriPlaybook/category/5-modality-specific-task-design).
:::

## The modalities you'll most often collect

### Text
The most common starting point, and the one with the most existing tooling — web crawls, government archives, books, social media. For most African languages, though, text is also the modality where apparent abundance is most deceptive. [Joshi et al. (2020)](https://aclanthology.org/2020.acl-main.560/) and [Kreutzer et al. (2022)](https://aclanthology.org/2022.tacl-1.4/) — discussed in [Chapter 1](https://warakacommunity.github.io/AfriPlaybook) — found that a large share of what looks like African-language text online is mislabelled, machine-translated, or not the target language at all. Text "exists," in the sense that you can find files containing it; whether it exists in a form worth training on is a separate, harder question.

### Speech and audio
Audio is often the *more* natural modality for many African languages, which carry centuries of oral tradition and, in some cases, no widely used standard orthography. Collecting it well usually means recording, not scraping: radio archives, community recording campaigns, phone-based data collection, or partnerships with broadcasters. It is more expensive per hour than text per word, both because recording requires equipment and consent, and because transcription afterward is itself a specialist annotation task.

### Images
Image data splits into two different collection problems depending on whether you're sourcing existing images (museum archives, public photo collections, satellite imagery) or capturing new ones (camera rigs, mobile photo campaigns). The first raises licensing and redistribution questions; the second raises consent and privacy questions, especially where faces or identifiable locations are involved.

### Video
Combines the cost structure of audio (recording, consent) with the storage and bandwidth cost of images, multiplied by time. Video is rarely collected for its own sake in low-resource-language work; it usually appears bundled with another goal — sign language corpora, instructional content, or as source material from which audio and frames are later extracted.

### Multimodal data
Strictly speaking this isn't a separate modality but a *combination* — paired text-image, audio-video, or image-caption data, collected so the modalities can be analyzed together or against each other. The collection problem here compounds: you need both modalities to exist for the same underlying item, often from different sources, and you need to track which pairs go together. The [case study](./case-study-multimodal-data-collection) later in this chapter walks through exactly this problem for a 28-language image-caption-emotion dataset.

## Why this decision comes first

Before settling on sources or methods (the next two sections), it's worth answering, in writing, for your own project:

- **Which modality (or modalities) does the task actually require?** Don't default to text because it's familiar — a sentiment task on an oral-tradition language may be better served starting from audio.
- **Does the modality exist in usable form for your target language(s) at all**, or does "collection" really mean "creation" — recording or writing things that don't yet exist anywhere?
- **Who can supply this modality?** Text can sometimes be sourced by people who don't speak the language well (a scraper doesn't need to read Hausa to download a Hausa web page); audio and video collection almost always requires native speakers in the room or on the call.
- **What does failure look like for this modality?** For text, it's silent — a mislabelled or machine-translated file looks identical to genuine data until someone checks. For audio, failure is often loud and visible (bad recording quality, wrong dialect) but harder to fix after the fact.

Get the modality decision right and the rest of this chapter — sources, scraping, APIs — becomes a menu of options. Get it wrong, and no amount of good tooling downstream will fix a collection plan built around the wrong kind of data.
