# Data Provenance and Traceability

Learn how to track the origin, history, and transformations of your data to ensure transparency, reproducibility, and accountability.

## Why Provenance Matters

Understanding where data comes from and how it has been processed is essential for building trustworthy datasets. Provenance supports reproducibility, enables auditing, and helps identify potential issues in data quality and bias.

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
- **Annotation processes** – Track labeling methods and guidelines used  
- **Modifications** – Log any changes made to the data after collection  
- **Audit trails** – Maintain records for reproducibility and verification  

## A dataset card you can version

Per-record provenance, like the fields the collectors and cleaner attach to each line, answers "where did this row come from". A dataset card answers the same question for the dataset as a whole, in a single file that lives in the repository next to the data and changes with it. Writing it as YAML keeps it readable, diff-friendly in version control, and parseable by tooling. This format follows the spirit of the documentation standards covered in [Documentation](../6_documentation/documentation.md), kept short enough to actually maintain.

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

Two fields here earn their place specifically for African-language work. Recording `collected_records` alongside the final `size` makes the drop rate visible: if a cleaning pass kept only a fraction of what was collected, that belongs in the open, not hidden. And pinning the language as `hau_Latn`, with both the ISO 639-3 code and the script, avoids the ambiguity that bare codes like `ha` invite, which matters for languages written in more than one script.

## A transformation log that travels with the data

The dataset card records the current state. A transformation log records the history, one appended line each time the data changes, so that a released version can always be traced back through every step that produced it. Appending to a JSONL log is enough, and it costs nothing to keep:

```json
{"version": "1.0.0", "date": "2026-02-16", "action": "initial-collection", "records": 24901, "by": "A. Bello", "notes": "raw scrape + wikipedia pull"}
{"version": "1.0.1", "date": "2026-02-18", "action": "cleaning", "records": 19120, "by": "pipeline v2", "notes": "normalize, dedup, language-filter"}
{"version": "1.1.0", "date": "2026-03-02", "action": "manual-review", "records": 18432, "by": "native-speaker reviewers", "notes": "removed 688 mislabelled and off-topic records"}
```

Read top to bottom, this log tells the whole story of the dataset: how much was collected, how much survived cleaning, and what human review changed. That is exactly the audit trail that makes a dataset defensible later, and it is far cheaper to append a line at each step than to reconstruct the history from memory at release time.