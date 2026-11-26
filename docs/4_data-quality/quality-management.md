---
title: Data Quality Management
sidebar_position: 2
ready: true
last_update:
  date: 2026-11-26
  author: Idris Abdulmumin
---

# Data Quality Management

Assurance keeps individual labels honest. Management looks after the dataset as a whole: its balance, its noise, the patterns in its errors, and the way it changes over time. These are the dataset-level properties that decide whether a corpus is trustworthy and reusable.

:::tip[Key points]

- Decide how you handle class imbalance, write it down, and report per-class results.
- Run the basic cleaning pass first, then surface outliers for a human decision rather than deleting them.
- Treat model errors as evidence about the dataset, and trace each pattern to a root cause.
- Version every release, keep a changelog, and never overwrite the raw collection.

:::

## Handle class imbalance

Low-resource datasets are rarely balanced. Hate speech is a small fraction of normal posts, a minority dialect is a small fraction of a national language, and rare entity types barely appear. Left alone, imbalance lets a model score well by ignoring the classes you care about most.

There are three honest responses, and most projects combine them:

1. **Enrich rare classes at collection time** through targeted or keyword-based sampling, as hate-speech and emotion projects do to find enough positive cases.
2. **Use stratified sampling** so minority classes and subgroups are always present in the annotation set.
3. **Account for imbalance in evaluation** by reporting per-class results, rather than a single accuracy that the majority class can dominate.

Decide which of these you rely on, and write it down, because an unstated sampling choice is itself a quality problem.

To compare balance across categorical fields and releases, use normalised Shannon entropy: entropy divided by the logarithm of the number of planned classes, where 1 means perfect balance. This adapts the Shannon evenness measure ([Frerebeau, 2025](../references.md#frerebeau-2025)), which divides by the logarithm of the number of observed categories; counting planned classes keeps an unused class visible. [Report readiness as separate measures](./index.md#report-readiness-as-separate-measures) gives the formula and its edge cases. Balance is not correctness or adequate coverage, so report it alongside the other readiness measures, not as a blended score.

## Detect noise and outliers

Noise is the default state of collected African-language text, especially anything scraped, where wrong-language passages, boilerplate and non-linguistic content are common ([Kreutzer et al., 2022](../references.md#kreutzer-2022)). Run the basic cleaning pass first, covering language identification and de-duplication before splitting; see [Data Cleaning and Preprocessing](../2_data-collection/7_data-cleaning-preprocessing.md).

Then look for the subtler outliers, which are useful flags for a human to inspect:

- items whose length, formatting or content sits far outside the rest;
- items that a simple model confidently disagrees with.

The goal is not to delete everything unusual, because genuine dialectal variation can look like an outlier. Surface it for a decision.

## Build an error-analysis pipeline

When a model trained on the data makes mistakes, treat those mistakes as data about the dataset. A repeatable error-analysis pipeline:

1. groups errors into categories;
2. looks for patterns by class, dialect, source or annotator;
3. traces each pattern back to a root cause, such as an ambiguous guideline, a label that overlaps another, a noisy source or a tooling quirk.

Most findings convert directly into fixes: a sharpened guideline, a merged or split label, a re-cleaned source. Error analysis is also where you separate genuine model errors from genuine label errors, which feeds straight back into the [assurance loop](./index.md#close-the-feedback-loop).

## Version the dataset

A dataset is corrected, extended and re-split after its first release, so version every release, keep a changelog, and never overwrite the raw collection; versioning also lets you roll back a fix that introduces a regression. The numbering rules, tagging and changelog format are in [Versioning for datasets](../9_dataset-lifecycle/discoverability.md#versioning-for-datasets). Pair the version history with the dataset's [documentation](../6_documentation/documentation.md) and [governance](../data-governance/index.md) records, so that what changed, who changed it and under what terms stay answerable.

Start each version from a dated snapshot of the annotation tool's full export, so a model trained on it can be tied back to exactly that state of the labels (see [Exporting from your annotation tool](../6_documentation/data-storage.md#exporting-from-your-annotation-tool)).
