---
title: Data Quality Management
sidebar_position: 2
---

# Data Quality Management

Assurance keeps individual labels honest. Management looks after the dataset as a whole: its balance, its noise, the patterns in its errors, and the way it changes over time. These are the dataset-level properties that decide whether a corpus is trustworthy and reusable.

## Handle class imbalance

Low-resource datasets are rarely balanced. Hate speech is a small fraction of normal posts, a minority dialect is a small fraction of a national language, and rare entity types barely appear. Left alone, imbalance lets a model score well by ignoring the classes you care about most. There are three honest responses, and most projects combine them. Enrich rare classes at collection time through targeted or keyword-based sampling, as hate-speech and emotion projects do to find enough positive cases. Use stratified sampling so minority classes and subgroups are always present in the annotation set. And when imbalance is unavoidable, account for it in evaluation by reporting per-class results rather than a single accuracy that the majority class can dominate. Decide which of these you are relying on, and write it down, because an unstated sampling choice is itself a quality problem.

## Detect noise and outliers

Noise is the default state of collected African-language text, especially anything scraped, where wrong-language passages, machine-translated filler, and duplicates are common ([Kreutzer et al., 2022](../references.md#kreutzer-2022)). Clean in layers. Run language identification to remove off-target text, using tools built for African languages such as AfroLID or GlotLID rather than general-purpose detectors that misread them. Remove exact and near-duplicates before splitting the data, so the same text cannot leak across train and test. Then look for the subtler outliers: items whose length, formatting, or content sits far outside the rest, or which a simple model confidently disagrees with, since both are useful flags for a human to inspect. The goal is not to delete everything unusual, because genuine dialectal variation can look like an outlier, but to surface it for a decision.

## Build an error-analysis pipeline

When a model trained on the data makes mistakes, treat those mistakes as data about the dataset. A repeatable error-analysis pipeline groups errors into categories, looks for patterns by class, dialect, source, or annotator, and traces each pattern back to a root cause, whether that is an ambiguous guideline, a label that overlaps another, a noisy source, or a tooling quirk. The payoff is that most findings convert directly into fixes: a sharpened guideline, a merged or split label, a re-cleaned source. Error analysis is also where the line between a genuine model error and a genuine label error gets drawn, which feeds straight back into the assurance loop.

## Version the dataset

A dataset is not finished at first release; it is corrected, extended, and re-split over time. Treat it like code. Give every release a version number, record what changed and why in a short changelog, and keep the raw collection and the processed versions separate so the original is never overwritten. Versioning is what makes results reproducible, lets a downstream user cite the exact data they trained on, and allows you to roll back when a well-meant "fix" turns out to introduce a regression. Pair the version history with the dataset's documentation and provenance (see [Documentation](../6_documentation/documentation.md) and [Data Governance](../data-governance/index.md)), so that what changed, who changed it, and under what terms are all answerable years later.
