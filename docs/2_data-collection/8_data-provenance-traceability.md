---
ready: true
last_update:
  date: 2026-11-24
  author: Idris Abdulmumin
---
# Data Provenance and Traceability

Learn how to track the origin, history, and transformations of your data to ensure transparency, reproducibility, and accountability.

## Why Provenance Matters

Understanding where data comes from and how it has been processed is essential for building trustworthy datasets. Provenance is information about the entities, activities and people involved in producing data, and it helps others judge the data's quality, reliability and trustworthiness ([Groth and Moreau, 2013](../references.md#w3c-prov-2013)). It supports reproducibility, enables auditing, and helps identify potential issues in data quality and bias.

The gap is real in practice. An audit of more than 1,800 text datasets found licence omission rates above 70% and licence error rates above 50% on popular dataset hosting sites; it also found that low-resource language datasets tend to carry restrictive licences ([Longpre et al., 2024a](../references.md#longpre-2024)). Recording the source and licence of every item at collection time is far easier than reconstructing them later.

## Key Components of Provenance

### Source Tracking

- **URLs and references** – Record links or original sources of the data  
- **Contributors** – Track who collected, created, or provided the data  
- **Collection context** – Document when, where, and how the data was obtained  

### Data Lineage

- **Data evolution** – Track how data changes over time  
- **Versioning** – Maintain different versions of datasets  
- **Pipeline tracking** – Document each stage of data processing  

### Transformation Logs

- **Preprocessing steps** – Record cleaning, normalization, and filtering operations  
- **Annotation processes** – Track labeling methods and guidelines used, including any model that pre-labeled items or chose which items to label (see [Record what the model did](../3_annotation-design/model-assisted-annotation.md#record-what-the-model-did))
- **Modifications** – Log any changes made to the data after collection  
- **Audit trails** – Maintain records for reproducibility and verification  

Record the annotation tool, spreadsheet or script used for labelling, with its version, alongside each batch. If the tool is updated mid-project, the batch record shows which labels were made under which version and configuration.

### Label-level change history

Lock or version submitted labels rather than silently overwriting them. Keep who created, changed or deleted each label and when, so every released label can be traced through review and correction. On sensitive projects, do not let annotators hard-delete submitted work; route corrections through an authorised reviewer. For field audio, lock the submitted recording and its label because the recording may be impossible to repeat. The [agri-advisory reviewer chain](../agri-advisory/diagnosis-labelling.md#what-the-data-looks-like) is a worked example: each action on a label is appended, never overwritten.

This history supports accountability, but it must not prevent an authorised withdrawal or erasure. Apply those requests to active data and future exports, and record the action without publishing the person's identity or reason. Data already released publicly cannot be recalled: retracted datasets have kept circulating through copies and derived datasets, often without their documentation ([Peng et al., 2021](../references.md#peng-2021); [Luccioni et al., 2022](../references.md#luccioni-2022)); see [Withdrawal](../legal-consent/index.md#withdrawal). Governance events such as role and policy changes belong in the separate [accountability log](../data-governance/index.md#keep-an-accountability-log).

## A dataset card you can version

Per-record provenance, like the fields the collectors and cleaner attach to each line, answers "where did this row come from". A dataset card answers the same question for the dataset as a whole, in a single file that lives in the repository next to the data and changes with it. Writing it as YAML keeps it readable, diff-friendly in version control, and parseable by tooling. This format follows the spirit of the documentation standards covered in [Documentation](../6_documentation/documentation.md), such as datasheets ([Gebru et al., 2021](../references.md#gebru-2021)), data statements ([Bender and Friedman, 2018](../references.md#bender-friedman-2018)) and Data Cards ([Pushkarna et al., 2022](../references.md#pushkarna-2022)), kept short enough to actually maintain.

```yaml
# dataset-card.yaml
name: hausa-news-2026
version: 1.1.0
languages:
  - hau_Latn          # Hausa, Latin script (ISO 639-3 + script)
modality: text
task: text-classification
size:
  records: 18432
  collected_records: 24901   # before cleaning, for an honest drop rate

sources:
  - name: Example Hausa news portal
    url: https://example.org
    method: web-scraping
    license: CC BY-SA 4.0
    access_date: 2026-02-14
  - name: Hausa Wikipedia
    url: https://ha.wikipedia.org
    method: wikimedia-api
    license: CC BY-SA 4.0
    access_date: 2026-02-15

processing:
  - step: normalize
    detail: Unicode NFC, whitespace collapse, control-char strip
  - step: deduplicate
    detail: exact case-folded match
  - step: language-filter
    detail: GlotLID, threshold 0.7, kept hau_Latn only

governance:
  consent: not-applicable      # public, already-published text
  owner: Example Community NLP Group
  contact: data@example.org
  pii_reviewed: true

citation: >
  Example Community NLP Group (2026). hausa-news-2026 (v1.1.0).
```

Two fields here earn their place specifically for African-language work. Recording `collected_records` alongside the final `size` makes the drop rate visible: if a cleaning pass kept only a fraction of what was collected, that belongs in the open, not hidden. And pinning the language as `hau_Latn`, with both the ISO 639-3 code ([SIL International, n.d.](../references.md#iso-639-3)) and the script, avoids the ambiguity that bare codes like `ha` invite, which matters for languages written in more than one script. Standard BCP 47 language tags express the same idea with a script subtag, such as `ha-Arab` for Hausa in Ajami ([Phillips and Davis, 2009](../references.md#rfc-5646)).

## A transformation log that travels with the data

The dataset card records the current state. A transformation log records the history, one appended line each time the data changes, so that a released version can always be traced back through every step that produced it. Appending to a JSONL log is enough, and it costs nothing to keep:

```json
{"version": "1.0.0", "date": "2026-02-16", "action": "initial-collection", "records": 24901, "by": "A. Bello", "notes": "raw scrape + wikipedia pull"}
{"version": "1.0.1", "date": "2026-02-18", "action": "cleaning", "records": 19120, "by": "pipeline v2", "notes": "normalize, dedup, language-filter"}
{"version": "1.1.0", "date": "2026-03-02", "action": "manual-review", "records": 18432, "by": "native-speaker reviewers", "notes": "removed 688 mislabelled and off-topic records"}
```

Read top to bottom, this log tells the whole story of the dataset: how much was collected, how much survived cleaning, and what human review changed. That is exactly the audit trail that makes a dataset defensible later, and it is far cheaper to append a line at each step than to reconstruct the history from memory at release time.

## Further reading

- [Groth and Moreau, 2013](../references.md#w3c-prov-2013): the W3C PROV family of standards for describing who and what produced a piece of data.
- [Longpre et al., 2024a](../references.md#longpre-2024): a large audit of dataset licensing and attribution, with the Data Provenance Explorer for tracing popular collections.
- [Pushkarna et al., 2022](../references.md#pushkarna-2022): Data Cards, a structured format for documenting a dataset's sources, collection and annotation.
- [Akhtar et al., 2024](../references.md#akhtar-2024): Croissant, a machine-readable metadata format that lets tools find and load a dataset.
- [Luccioni et al., 2022](../references.md#luccioni-2022): how to deprecate or withdraw a dataset so that its status travels with it.
