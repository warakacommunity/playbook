---
title: Release Checklist
sidebar_position: 1
ready: true
last_update:
  date: 2026-11-26
  author: Shamsuddeen Hassan Muhammad
---

# Release Checklist

Releasing a dataset is the moment the work becomes useful to others, and a clear checklist is the difference between a resource people can trust and a folder of files they cannot. Run through these before you publish. Each item links to the chapter that covers it in depth.

:::tip[Key points]

- Do not release until quality, documentation, licence, consent and a named steward are all in place.
- Keep the annotation tool's full export as the copy of record, and check every converted format against it.
- Pseudonymise annotators and leave out internal fields before you publish.
- Publish fixed splits with a version tag, and set the licence on the repository itself.

:::

## Before you release

- **Data cleaned and validated.** Noise removed, duplicates dropped before splitting, language and format checked (see [Data Quality](../4_data-quality/index.md)).
- **Annotation quality verified.** Inter-annotator agreement measured and reported, gold checks passed, disagreement understood rather than hidden (see [Data Quality](../4_data-quality/index.md) and [Annotation Design](../3_annotation-design/workflow-adjudication.md)). Report coverage, agreement with the number of items behind it, the share checked by a reviewer, label balance and per-class scores on gold items as separate numbers, not one combined score (see [Report readiness as separate measures](../4_data-quality/index.md#report-readiness-as-separate-measures)).
- **Documentation completed.** A datasheet describing what the data is, how it was collected, from whom, and its known limitations (see [Documentation](../6_documentation/documentation.md)).
- **Licensing defined.** A clear licence chosen on purpose, applied to the data, with attribution and provenance recorded (see [Data Governance](../data-governance/index.md)).
- **Ethical review conducted.** Consent confirmed, personal and sensitive data handled, harms considered, community authority respected (see [Data Governance](../data-governance/index.md)).
- **Consent filter run for this export's purpose.** Items without an accepted purpose left out, withdrawals since the last export applied, consent summary in the dataset card (see [Legal and consent](../legal-consent/index.md#from-consent-record-to-release-metadata)).
- **Annotators pseudonymised.** Annotator names, emails and account IDs replaced by per-project pseudonyms, and internal administrative records excluded (see [Personally identifiable information](../data-governance/index.md#personally-identifiable-information)).
- **Source provenance retained for re-annotation.** Each record carries its source dataset ID, version or revision, configuration, split and stable row ID, plus the source URL, licence and transformations needed to join it back and check for leakage. A row number alone is not stable across versions (see the [dataset card](../templates/dataset-card.md#4-preprocessing-cleaning-labeling)).
- **Baselines and splits provided.** Official train, development, and test splits, and at least baseline results, so others can compare fairly (see [Evaluation](../8_model-building/starter-kit.md)).
- **Public access ensured.** Hosted where the community can find it, with a persistent identifier and a listing in the catalogues people search (see [Hosting and preservation](./hosting.md) and [Identifiers, versions, and catalogues](./discoverability.md)).
- **A steward named.** Someone answers for the dataset after release, and the maintenance plan says how (see [Maintenance and stewardship](./maintenance.md)).

## Verify the export before you release

The release files are usually not the annotation tool's own records but a conversion of them, and conversion can lose information without any error message. Keep the tool's full export as the copy of record (see [Exporting from your annotation tool](../6_documentation/data-storage.md#exporting-from-your-annotation-tool)) and check every derived format against it. The common losses are:

- **Overlapping and nested spans.** Flat BIO or CoNLL tagging gives each token one tag ([Ramshaw and Marcus, 1995](../references.md#ramshaw-marcus-1995)), so a span inside another span, or two labels on the same words, cannot both be represented. A converter has to drop or alter one of them, often without warning.
- **Relations, skipped items, and region notes.** Links between spans, items an annotator skipped, and free-text notes attached to a region may be missing from some formats. For relation and coreference layers, see [Relations and Coreference](../sequence-labelling/relations.md#release-format).
- **Segmentation masks.** Pixel masks are exported differently by different converters. Some write one binary image per mask, so the label and the link to the item must travel in file names or a separate index; COCO stores them as polygons or run-length encoding inside the JSON ([COCO Consortium, n.d.-a](../references.md#coco-format)); see [Masks: polygons, RLE and id maps](../image-data/formats-and-merging.md#masks-polygons-rle-and-id-maps).
- **Bounding-box conventions.** COCO, PASCAL VOC and YOLO measure boxes differently (corner or centre, width or second corner, pixels or fractions), so a box converted with the wrong convention still loads but lands in the wrong place. [Formats and merging](../image-data/formats-and-merging.md#coordinate-conventions-that-break-conversions) sets out each convention and the round-trip checks for image and video labels.
- **Line breaks in free text.** Transcripts, translations, and comments with line breaks can be split or merged when written to CSV, which is one reason not to ship free text as CSV (see [Formats and packaging](./hosting.md#formats-and-packaging)).

Before release, run a short conversion check:

1. **Convert a sample that covers every label type** in the schema, including the rare ones and any overlaps or relations.
2. **Count annotations per type before and after** conversion. Any difference should be one you expected and can explain.
3. **Open a few converted records by eye**, and for images draw the converted boxes or masks back onto the picture.
4. **Confirm the record count** in the release matches the selection you meant to release (for example, all items, or only adjudicated ones; see [Decide which annotations you release](../6_documentation/data-storage.md#decide-which-annotations-you-release)).
5. **Remove or pseudonymise annotator details and internal fields.** Replace annotator names, emails, or account IDs with pseudonyms (see [Personally identifiable information](../data-governance/index.md#personally-identifiable-information)), or drop them if you release only one label per item. Remove timestamps and time spent unless the dataset card documents them and says why they are included.

## Publishing to a hub

Once the boxes are ticked, publishing the fixed splits takes a few lines with the Hugging Face `datasets` library. The Hub keeps every commit, gives the dataset a documentation page, and lets you tag the exact version you release:

```python
# pip install datasets huggingface_hub
from datasets import load_dataset
from huggingface_hub import HfApi

# Load the fixed splits produced in earlier chapters.
dataset = load_dataset("json", data_files={
    "train": "data/train.jsonl",
    "validation": "data/dev.jsonl",
    "test": "data/test.jsonl",
})

# Publish the splits, then tag this commit so others can cite the exact data they used.
dataset.push_to_hub("your-org/hausa-news-2026")
HfApi().create_tag("your-org/hausa-news-2026", tag="v1.1.0", repo_type="dataset")
```

Two notes specific to responsible release. Set the licence on the repository to match the one in your [dataset card](../6_documentation/documentation.md), so the terms travel with the data rather than living only in a separate document. And if you kept a private held-out portion to guard against contamination (see [Data Integrity](../8_model-building/data-integrity.md)), publish only the public splits here and keep the private set off the hub.

A dataset that ticks every box is one the world can find, trust, reuse, and build on, which is the whole point of building it.
