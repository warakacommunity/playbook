---
sidebar_position: 9
title: Data Storage and Release Infrastructure
---

# Data Storage and Release Infrastructure

Where and how a dataset is stored decides whether others can find and trust it, and whether it survives. The aim is simple: keep the data safe while you build it, and publish it somewhere stable and discoverable when it is ready.

## Hosting the release

Release on a platform the community will actually look on. Hugging Face is the de facto home for datasets and models and supports versioning and documentation; Zenodo gives a permanent archival identifier (a DOI); institutional repositories and the Lanfrica catalogue add discoverability for African work. Avoid releasing only on a personal site or a link that will rot, which is how datasets disappear.

## Formats, metadata, and versioning

Store the data in open, standard formats that others can read without special tools, and pair it with machine-readable metadata describing its contents, following the documentation standards from this chapter. Keep the raw collection separate from processed versions, and never overwrite the original. A layout that holds this discipline, and that reuses the files built through the earlier chapters, looks like this:

```text
hausa-news-2026/
├── raw/                      # original collection, never overwritten
│   └── raw_hausa.jsonl
├── processed/
│   ├── clean_hausa.jsonl     # after the cleaning pipeline
│   ├── train.jsonl           # fixed splits, made after deduplication
│   ├── dev.jsonl
│   └── test.jsonl
├── dataset-card.yaml         # machine-readable metadata
├── transformation-log.jsonl  # one appended line per change
└── CHANGELOG.md              # human-readable version history
```

Version every release with a number and a changelog, so that results stay reproducible and users can cite the exact data they used, which is the same versioning discipline the [Data Quality](../4_data-quality/index.md) and [Dataset Lifecycle](../9_dataset-lifecycle/maintenance.md) chapters require.
