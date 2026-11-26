---
sidebar_position: 9
title: Data Storage and Release Infrastructure
ready: true
last_update:
  date: 2026-11-26
  author: Idris Abdulmumin
---

# Data Storage and Release Infrastructure

Where and how a dataset is stored decides whether others can find and trust it, and whether it survives. The aim is simple: keep the data safe while you build it, and publish it somewhere stable and discoverable when it is ready.

:::tip[Key points]

- Never overwrite the raw collection; keep processed versions and splits separately.
- Keep an inventory of every copy of the data, with its location, access and deletion date.
- Archive the annotation tool's most complete export as the copy of record; build every other format from it.
- Release a working copy and an archival copy with a DOI, never only on a personal site.

:::

## Hosting the release

Release on a stable platform the community already searches. Keep a working copy (for example on Hugging Face) and an archival copy with a DOI, a permanent identifier (for example on Zenodo), and list the dataset in African catalogues such as Lanfrica. Never release only on a personal site or a link that can rot. How to choose platforms and publish in both places is in [Hosting and Preservation](../9_dataset-lifecycle/hosting.md#choosing-where-the-data-lives).

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

Version every release with a number and a changelog, so that results stay reproducible and users can cite the exact data they used. The numbering rules and changelog format are in [Versioning for datasets](../9_dataset-lifecycle/discoverability.md#versioning-for-datasets).

Keep larger media collections in storage controlled by the project or community, in a separate folder per project and close enough to annotators for reliable access. Let the annotation tool reference those files rather than making uncontrolled copies. Treat referenced media as immutable: labels and timestamps may point into a particular file. Store a checksum with each item, and give a corrected file a new ID and a new import rather than replacing it underneath existing labels. How to prepare the import itself is covered in [Getting data into the tool](./tooling.md#getting-data-into-the-tool).

## Know where every copy lives, and for how long

Keep an inventory of every copy of the data: the annotation tool's storage, project storage buckets, export snapshots, backups and authorised personal downloads. For every copy, record:

- the provider, system, location and country;
- its purpose and who can access it;
- its retention and deletion dates.

Check these entries against the storage and retention promises in the consent form and privacy notice.

Schedule deletion of expired working exports and other data whose retention has ended. Run the deletion as a dry run first, inspect what it would remove, and confirm that the real job is scheduled and monitored. Copies outside the project's own storage are the hardest to track, which is another reason to keep media where the project or community controls it, as described above. The inventory also makes withdrawal, erasure and exit exports tractable; see [Release and hand over](../project-management/index.md#8-release-and-hand-over).

## Exporting from your annotation tool

The annotation tool holds more about your data than any single export format shows. How you get the data out decides what you can still check, recompute, and explain later, so plan the export as carefully as the annotation.

### Keep a copy of record

Archive the tool's most complete export (often a nested JSON file) as the copy of record. It should hold every annotator's labels, not only a merged answer, together with timestamps, time spent per item, skipped items, review outcomes, and which items were gold. This is the file from which agreement, annotator quality, and calibration can be recomputed if a question comes up after release. It also keeps the disagreement between annotators, which is often information rather than noise ([Plank, 2022](../references.md#plank-2022)), even if the release keeps only one label per item. Keep it in `raw/` in the layout above (for example `raw/annotation-export-2026-11-22.json`), and never overwrite it.

### Treat other formats as derived views

CoNLL files, COCO or YOLO labels, ASR manifests, and flat CSV are views of the copy of record, each built for one use. Always regenerate them from the full export rather than editing them by hand, so that a fix made in one place reaches every format. A converted format can silently lose information the full export holds, so check what each conversion keeps before you rely on it (see [Verify the export before you release](../9_dataset-lifecycle/release.md#verify-the-export-before-you-release)).

### Archive what the export leaves out

Some records the project depends on are not in any annotation export. Agreement scores are computed rather than stored with the labels, and consent records usually live in a separate system. Archive each of them next to the export with the same version number, so that a released dataset can still be traced to its consent and its contributors (see [Keeping consent records](../legal-consent/index.md#keeping-consent-records) and [Benefit-sharing and credit](../data-governance/index.md#benefit-sharing-and-credit)).

### Decide which annotations you release

When several people labelled the same item, decide which annotations go into the release: all of them, one annotator's label per item, or only the reviewed or adjudicated label. Each choice suits a different use, and users cannot tell which one you made unless you say so. Record the choice and the reason in the [dataset card](../templates/dataset-card.md).

### Package deliveries before release

Data often goes to a partner or another team before the public release. Make each such delivery self-contained: the media with relative paths so the bundle works on another machine, a short README, the licence, and a draft data card. Fill the card only with information the project actually holds and leave unknown fields marked as unknown rather than guessed. The rules for the public release bundle are in [Formats and packaging](../9_dataset-lifecycle/hosting.md#formats-and-packaging).

### Tie training runs to a snapshot

Annotation continues while models are trained, so a live export changes from one day to the next. Have each training run record the dated export snapshot it used, so that results can be reproduced and a later label fix can be traced to the runs it affects.
