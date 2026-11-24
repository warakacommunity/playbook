---
sidebar_position: 9
title: Data Storage and Release Infrastructure
ready: true
last_update:
  date: 2026-11-24
  author: Idris Abdulmumin
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

For imports with several input fields, use a JSONL or CSV manifest that names every field explicitly. Keep larger media collections in storage controlled by the project or community, in a separate folder per project and close enough to annotators for reliable access. Let the tool reference those files rather than making uncontrolled copies. Treat referenced media as immutable: labels and timestamps may point into a particular file. Store a checksum with each item, and give a corrected file a new ID and a new import rather than replacing it underneath existing labels.

## Know where every copy lives, and for how long

Keep an inventory of tool storage, project buckets, export snapshots, backups and authorised personal downloads. For every copy, record the provider, system, location and country, its purpose, who can access it, and its retention and deletion dates. Check these entries against the storage and retention promises in the consent form and privacy notice.

Schedule deletion of expired working exports and other data whose retention has ended. Run the deletion as a dry run first, inspect what it would remove, and confirm that the real job is scheduled and monitored. Prefer media storage that the project or community controls, with the annotation tool reading from it there. The inventory also makes withdrawal, erasure and exit exports tractable; see [Closing a project](../project-management/index.md#8-release-and-hand-over).

## Exporting from your annotation tool

The annotation tool holds more about your data than any single export format shows. How you get the data out decides what you can still check, recompute, and explain later, so plan the export as carefully as the annotation.

### Keep a copy of record

Archive the tool's most complete export, usually its full, nested JSON, as the copy of record. It should hold every annotator's labels, not only a merged answer, together with timestamps, time spent per item, skipped items, review outcomes, and which items were gold. This is the file from which agreement, annotator quality, and calibration can be recomputed if a question comes up after release. It also keeps the disagreement between annotators, which is often information rather than noise ([Plank, 2022](../references.md#plank-2022)), even if the release keeps only one label per item. Keep it in `raw/` in the layout above (for example `raw/annotation-export-2026-11-22.json`), and never overwrite it.

### Treat other formats as derived views

CoNLL files, COCO or YOLO labels, ASR manifests, and flat CSV are views of the copy of record, each built for one use. Always regenerate them from the full export rather than editing them by hand, so that a fix made in one place reaches every format. A converted format can silently lose information the full export holds, so check what each conversion keeps before you rely on it (see [Verify the export before you release](../9_dataset-lifecycle/release.md#verify-the-export-before-you-release)).

### Archive what the export leaves out

Some records the project depends on are not in any annotation export. Agreement scores are computed rather than stored with the labels, and consent records usually live in a separate system. Archive each of them next to the export with the same version number, so that a released dataset can still be traced to its consent and its contributors (see [Keeping consent records](../legal-consent/index.md#keeping-consent-records) and [Benefit-sharing and credit](../data-governance/index.md#benefit-sharing-and-credit)).

### Decide which annotations you release

When several people labelled the same item, decide which annotations go into the release: all of them, only the first or the latest, or only the adjudicated label. Each choice suits a different use, and users cannot tell which one you made unless you say so. Record the choice and the reason in the [dataset card](../templates/dataset-card.md).

### Package deliveries before release

Data often goes to a partner or another team before the public release. Make each such delivery self-contained: the media with relative paths so the bundle works on another machine, a short README, the licence, and a draft data card. Fill the card only with information the project actually holds and leave unknown fields marked as unknown rather than guessed. The rules for the public release bundle are in [Formats and packaging](../9_dataset-lifecycle/hosting.md#formats-and-packaging).

### Tie training runs to a snapshot

Annotation continues while models are trained, so a live export changes from one day to the next. Have each training run record the dated export snapshot it used, so that results can be reproduced and a later label fix can be traced to the runs it affects.
