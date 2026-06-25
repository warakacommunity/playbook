---
title: "Case Study: Multimodal Data Collection"
description: How ArtELingo-28, a 28-language cross-cultural image-emotion benchmark, was actually collected — and the decisions that don't show up in the Modalities, Sources, or API sections until you try to combine them.
---

# Case Study: Multimodal Data Collection

A worked example of what happens when a collection plan has to satisfy two modalities — and dozens of languages — at the same time, using ArtELingo-28 ([Mohamed et al., EMNLP 2024](https://aclanthology.org/2024.emnlp-main.1165/)) as a concrete reference point.

## The task

ArtELingo-28 is a benchmark built to study how people from different cultures respond emotionally to the same piece of visual art, across 28 languages. For every image, annotators in many languages independently chose the emotion the artwork evoked and wrote a short caption explaining why. The result is roughly 200,000 annotations over 2,000 WikiArt images — around 140 annotations per image, distributed across the 28 languages — making it possible to compare, image by image, whether annotators in two different languages read the same painting the same way.

This is a genuinely multimodal collection problem: the image layer and the text layer come from completely different places, are governed by different rules, and have to be collected in a way that keeps them aligned.

## Decision 1: the image layer was reused, not collected fresh

The images themselves weren't newly photographed or scraped for this project — they're drawn from WikiArt, an existing public art archive, the same source used by predecessor projects in this line of work. This illustrates a point from [Data Modalities](./data-modalities): not every modality in a multimodal project needs to be collected the same way, or even collected at all. Here, the image modality was sourced from an existing, curated archive; the text/annotation modality was the part that genuinely needed new collection. Recognizing which layer is "already solved" and which layer is the actual collection problem saves significant time and budget.

Reusing existing images instead of collecting new ones doesn't remove the licensing question — it relocates it. Any project building on a third-party image archive has to work out, separately from its annotation collection plan, what redistribution rights it has for the images once they're bundled into a newly released dataset alongside new captions and labels. That question sits squarely in the territory covered later in [Documentation, Data Release, and Governance](https://warakacommunity.github.io/AfriPlaybook/category/6-documentation-data-release-and-governance) — but it has to be answered during the collection-planning stage, not discovered after annotation is finished.

## Decision 2: cross-cultural comparison sets a constraint before annotation starts

The entire scientific premise — that you can compare how different language communities respond to "the same" artwork — depends on every language annotating the same underlying image set. That sounds obvious, but it has to be designed into the collection plan from day one. If a future, larger version of this kind of project draws its images from sources with looser licensing rather than a fixed, pre-cleared set, it has to confirm that image availability is consistent across every language's split *before* annotation begins, not after. A test set that's accidentally missing a handful of images in one language's annotation batch quietly breaks the comparison the whole project is built to support. This is a collection-stage decision masquerading as an annotation-stage problem — by the time annotators are working, it's too late to fix cheaply.

## Decision 3: cost and labor planning had to scale by language, not just by image

For a single-language captioning dataset, the unit of collection cost is roughly "per image." Here, the unit is "per image, per language" — 2,000 images annotated independently in each of 28 languages is a fundamentally different scale of labor than 2,000 images annotated once. Annotators were recruited through Amazon Mechanical Turk and compensated $0.10 per annotation — roughly $8/hour, given an average of about 45 seconds per task — and the project secured institutional review board approval and informed consent ahead of annotation, given its use of paid crowdworkers. None of those numbers would have been knowable without first deciding the multiplier — 28 languages — at the collection-planning stage, which is exactly the work described in [Cost and Resource Planning](./cost-resource-planning).

## Takeaways for your own multimodal project

- **Inventory each modality separately before planning collection.** Decide, layer by layer, which modality already exists in usable form somewhere (reuse it) and which has to be newly created (budget for it properly).
- **If cross-X comparison is the scientific point of the project** — cross-cultural, cross-language, cross-time — **the comparability constraint is a collection-stage design decision**, not something to verify after the fact. Lock down what stays constant across every split before recruiting a single annotator.
- **Reusing existing assets, like an image archive, doesn't remove licensing work — it moves the question** from "can I collect this" to "can I redistribute this bundled with what I add on top."
- **When a project multiplies across many languages, the cost driver isn't the dataset size — it's the multiplier.** Plan budget and timeline around that multiplier explicitly, rather than as a vague "and then do it for the other languages too" afterthought.

:::tip Contribute your own case study
This page covers one published example. If you've run a multimodal or cross-lingual collection effort — successful or not — [write it up](https://github.com/warakacommunity/AfriPlaybook/blob/main/README.md#ways-to-contribute) as an additional case study. What went wrong is often more useful to the next person than what went right.
:::
