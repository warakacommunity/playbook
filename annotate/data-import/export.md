---
title: "Export annotations"
sidebar_label: "Export"
sidebar_position: 4
description: "How to get finished annotations out of AfriAnnotate — formats, snapshots, API export, target storage."
mdx:
  format: md
---

# Export annotations

Once your team has labelled data, you'll want to get the
annotations out of AfriAnnotate into a downstream training
pipeline, BI tool, or archival storage.

Four ways to export:

| Method | Best for | Trigger |
|---|---|---|
| **UI snapshot** | One-off downloads, ad-hoc reviews | Project → Export → Download |
| **API export** | Programmatic / scheduled pulls | `POST /api/projects/<id>/exports` |
| **Target cloud storage** | Continuous push to a bucket | Auto on annotation submit |
| **Webhooks** | Real-time per-annotation push | See [Webhooks](/annotate/projects/webhooks) |

## UI snapshot — the quick path

1. Open the project
2. Click **Export** (top right of Data Manager, or from the project
   dashboard menu)
3. Pick a **format** (see below)
4. Pick a **scope**:
   - **All tasks** (default) — every task in the project
   - **All tasks with annotations** — skip the unlabeled ones
   - **Selected tasks** — whatever's selected in Data Manager
5. (Optional) **Apply tab filters** — include only tasks matching
   your current Data Manager tab
6. (Optional) **Anonymise annotators** — replace user IDs / emails
   with opaque pseudonyms (also controllable per-project via
   [Data security](/annotate/projects/security-settings))
7. Click **Download**

The file lands as a `.zip` or `.json` / `.csv` etc. depending on the
format.

## Available formats

| Format | What's in it | Use for |
|---|---|---|
| **JSON** | Full task JSON — data + annotations + predictions, [shape documented at Task format](/annotate/data-import/task-format) | Re-importing, custom downstream parsing |
| **JSON_MIN** | Just the result objects (no task metadata, no data fields) | Compact downloads when you only need labels |
| **CSV** | Flat one-row-per-task with annotation columns | Spreadsheet review, BI tools |
| **TSV** | Same as CSV with tab separators | When commas in your data fight CSV |
| **CoNLL2003** | NER spans in BIO scheme | Named-entity-recognition models that expect this format |
| **COCO** | Object-detection JSON with bounding boxes | YOLO / Faster R-CNN / DETR training |
| **YOLO** | `.txt` per image with normalised bbox lines | YOLO training pipelines |
| **Pascal VOC** | `.xml` per image | Older object-detection pipelines |
| **Brush masks → PNG** | Pixel masks as PNG | Semantic segmentation training |
| **ASR Manifest** | JSONL with `{audio_filepath, text, duration}` | Whisper / NeMo / Coqui ASR training |

Some formats only apply to specific tag types. The Export modal
greys out formats incompatible with your project's labeling config.

## API export

Programmatic export — useful for scheduled pulls, CI, or
integration with external pipelines:

```bash
# Trigger an export (async — returns a snapshot ID)
SNAPSHOT_ID=$(curl -X POST "https://label.afriannotate.org/api/projects/<id>/exports" \
  -H "Authorization: Bearer YOUR_PAT" \
  -H "Content-Type: application/json" \
  -d '{"format": "JSON", "anonymize": false}' | jq -r .id)

# Poll until the snapshot is ready
while true; do
  STATUS=$(curl "https://label.afriannotate.org/api/projects/<id>/exports/$SNAPSHOT_ID" \
    -H "Authorization: Bearer YOUR_PAT" | jq -r .status)
  if [ "$STATUS" = "completed" ]; then break; fi
  echo "Status: $STATUS"
  sleep 5
done

# Download the snapshot
curl "https://label.afriannotate.org/api/projects/<id>/exports/$SNAPSHOT_ID/download" \
  -H "Authorization: Bearer YOUR_PAT" \
  -o annotations.json
```

Snapshots are persisted for 30 days then garbage-collected. The
list of snapshots for a project is at
`GET /api/projects/<id>/exports`.

## Snapshots vs live export

Two flavours:

- **Snapshots** (`/exports`) — point-in-time copies. Tasks +
  annotations frozen at the moment of snapshot creation.
- **Live export** (`/api/projects/<id>/tasks/?fields=annotations`) —
  current state of the database. Useful when you want the latest
  data but don't need a versioned artifact.

For ML training pipelines, **snapshots are usually right** — your
training run wants to know exactly what data was in the dataset at
the time of training, not "whatever's in the database now."

For BI dashboards, **live export** is right — you want the latest
counts.

## Target cloud storage

A project can be configured to **continuously push** new
annotations to an external bucket. Useful when the same data flows
into many downstream consumers — instead of each consumer pulling
from AfriAnnotate's API, the bucket is the single source of
truth.

Configure at **Project → Settings → Cloud Storage → Target**:

1. Pick **Storage type**: GCS / S3 / Azure
2. Provide credentials (access key / service account / connection
   string)
3. Provide **Bucket name** + **Prefix** (path inside the bucket)
4. Pick **Format** — JSON snapshot of each annotation as it's
   submitted

When an annotator submits, AfriAnnotate writes a JSON file to
`<bucket>/<prefix>/<task-id>-<annotation-id>.json`. Updates
overwrite. Deletes remove the file.

See [Cloud storage](/annotate/data-import/cloud-storage) for the full credential setup.

## Anonymise annotators in exports

When **Anonymise** is toggled, every annotation in the export
replaces the annotator's user ID and email with an opaque
pseudonym (`annotator_a1`, `annotator_b2`, etc.) consistent
per-project.

Useful when:

- Downstream consumers shouldn't see real annotator identities
  (privacy / contractor-NDA / academic-IRB)
- You need to ship the dataset publicly but keep the labour records
  internal

The pseudonym mapping is stored in AfriAnnotate's database so
you can reverse-look-up internally if needed. Exporting two
different snapshots produces the same pseudonyms for the same
annotators (deterministic per project).

This is a separate setting from the project-level
**Anonymise annotators in exports** toggle on
[Data security](/annotate/projects/security-settings) — that one is the
default for every export from that project; the per-export toggle
overrides it.

## Export the dataset license + manifest

When a project has a **license** set (see
[Licensing](/annotate/projects/licensing)), every JSON export includes a
top-level `manifest` block:

```json
{
  "manifest": {
    "project_id": 42,
    "exported_at": "2026-05-12T08:42:11Z",
    "exported_by": 10,
    "task_count": 1234,
    "annotation_count": 1500,
    "license": {
      "identifier": "CC-BY-SA-4.0",
      "name": "Creative Commons Attribution-ShareAlike 4.0",
      "url": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "platform": "AfriAnnotate",
    "platform_version": "0.1.0"
  },
  "tasks": [...]
}
```

The manifest travels with the data, so downstream consumers always
know what license applies.

## Performance

Snapshots run in background workers — they don't block on the user's
browser. Typical durations:

- ≤ 10k tasks: < 30 seconds
- 10k–100k tasks: 1–5 minutes
- 100k–1M tasks: 5–30 minutes (dominated by media-URL signing for
  cloud-storage-connected projects)

For very large datasets (> 1M tasks), prefer the **target cloud
storage** continuous-push path over snapshots — the snapshot path
roundtrips through Django.

## What's next

- **[Webhooks →](/annotate/projects/webhooks)** — push individual
  annotation events instead of pulling batches
- **[Cloud storage →](/annotate/data-import/cloud-storage)** — target-storage continuous
  push setup
- **[Task format →](/annotate/data-import/task-format)** — the JSON shape of exported
  task data
- **[API → Overview →](/annotate/api/overview)** — the full export API
  reference
