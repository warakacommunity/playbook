---
title: "Task format"
sidebar_label: "Task format"
description: "The JSON shape of a task — imports, exports, and the annotation result schema."
sidebar_position: 2
mdx:
  format: md
---

# Task format

A **task** is the unit of work in AfriAnnotate — one row in a
project's dataset. It has input data (what the annotator sees),
zero or more annotations (what humans produced), and optionally
predictions (what a model produced ahead of time).

The same JSON shape is used for both **imports** (POST a task in)
and **exports** (snapshot a project out). This page is the
reference: read it once and you can write your own importer,
exporter, or QA script.

## Annotated task JSON

What a fully-annotated task looks like when exported:

```json
{
    "id": 1,
    "created_at": "2026-03-09T21:52:49.513742Z",
    "updated_at": "2026-03-09T22:16:08.746926Z",
    "project": 83,

    "data": {
        "image": "https://example.com/datasets/cars/1.jpg"
    },

    "annotations": [
        {
            "id": 1001,
            "result": [
                {
                    "from_name": "tag",
                    "id": "Dx_aB91ISN",
                    "source": "$image",
                    "to_name": "img",
                    "type": "rectanglelabels",
                    "value": {
                        "x": 50.8,
                        "y": 5.87,
                        "width": 12.4,
                        "height": 10.46,
                        "rotation": 0,
                        "rectanglelabels": ["Moonwalker"]
                    }
                }
            ],
            "was_cancelled": false,
            "ground_truth": false,
            "created_at": "2026-03-09T22:16:08.728353Z",
            "updated_at": "2026-03-09T22:16:08.728378Z",
            "lead_time": 4.288,
            "task": 1,
            "completed_by": 10
        }
    ],

    "predictions": [
        {
            "model_version": "model-v1",
            "score": 0.92,
            "result": [
                {
                    "from_name": "tag",
                    "id": "t5sp3TyXPo",
                    "source": "$image",
                    "to_name": "img",
                    "type": "rectanglelabels",
                    "value": {
                        "x": 13.2,
                        "y": 34.7,
                        "width": 39.6,
                        "height": 11.61,
                        "rotation": 0,
                        "rectanglelabels": ["Moonwalker"]
                    }
                }
            ]
        }
    ]
}
```

## Top-level fields

| Field | Description |
|---|---|
| `id` | Task identifier within the project. Auto-assigned on import. |
| `data` | The task input. Keys here must match the `$varname` references in the project's labeling config (e.g. `data.image` matches `<Image value="$image" />`). |
| `project` | ID of the project the task belongs to. |
| `annotations` | Array of human annotations on this task. Empty if no one has labeled it yet. |
| `predictions` | Array of model-produced annotations (pre-annotations). Same shape as `annotations` plus a `score`. |
| `drafts` | (Export only.) Unsaved in-progress annotations, included when you snapshot via the UI or API. |
| `created_at` / `updated_at` | ISO-8601 timestamps. |

## Annotation object

Each item in `annotations[]`:

| Field | Description |
|---|---|
| `id` | Identifier for this specific annotation. One task can have many annotations from different annotators. |
| `result` | The actual labels — see [Result format](#result-format) below. |
| `lead_time` | Wall-clock seconds the annotator spent on this annotation, including breaks while the tab was open. |
| `was_cancelled` | `true` when the annotator clicked **Skip**. |
| `ground_truth` | `true` when this annotation has been promoted as the canonical reference for the task. |
| `completed_by` | Annotator user ID. On **import**, you can override this — see [Specifying annotators on import](#specifying-annotators-on-import). |
| `created_at` / `updated_at` | Timestamps. |
| `reviews` | (When the review workflow is enabled.) Array of review entries: `{ id, created_by, accepted }`. |

## Prediction object

Same shape as `annotations[]` with these additions:

| Field | Description |
|---|---|
| `model_version` | String tag identifying the model that produced the prediction. Useful when you A/B several model versions. |
| `score` | Overall confidence, 0–1. Used for active-learning ordering. |

`completed_by`, `lead_time`, `ground_truth` don't apply.

## Result format

Each item in `annotations[i].result[]` (or `predictions[i].result[]`)
is one **region** — a labeled bit of the data:

- **Regions** are the selected area: a text span, bounding box,
  audio segment, choice classification, etc.
- **Result entries** carry the labels on that region.

Each region has a unique `id` per annotation, formed of
`[A-Za-z0-9_-]`. **Multiple result entries sharing the same `id`
belong to the same region** — that's how a single bounding box can
carry both a kind label *and* a per-region text comment, for
example.

### Required keys on every result

| Field | Description |
|---|---|
| `id` | Region identifier — shared across result entries that describe the same region. |
| `from_name` | Name of the **control tag** that produced this entry (e.g. `<Choices name="sentiment" .../>`). |
| `to_name` | Name of the **object tag** the region applies to (e.g. `<Image name="img" .../>`). |
| `type` | Lowercase tag type, e.g. `"choices"`, `"rectanglelabels"`, `"labels"`. |
| `value` | Tag-specific payload. Shape depends on the tag — see the [Label Studio tag reference](https://labelstud.io/tags/) for each tag's value schema. |

Optional:

- `source` — the data variable the region is on (e.g. `"$image"`).
- `parent_id` — when a region nests inside another (used by some
  hierarchical tag types).

### Predictions reuse the same region IDs

When you pre-load predictions on a task and the annotator opens it
to review, the predictions are surfaced as draft regions. If the
annotator submits without changing them, the region IDs in the
saved annotation **stay the same as the prediction's IDs** — so
you can correlate "what the model said" against "what the human
accepted" by matching IDs.

## Common result shapes

### Image bounding box

```xml
<Image name="img" value="$image"/>
<RectangleLabels name="tag" toName="img">
  <Label value="Moonwalker"/>
</RectangleLabels>
```

```json
{
  "from_name": "tag",
  "to_name": "img",
  "type": "rectanglelabels",
  "id": "Dx_aB91ISN",
  "value": {
    "x": 50.8, "y": 5.87,
    "width": 12.4, "height": 10.46,
    "rotation": 0,
    "rectanglelabels": ["Moonwalker"]
  }
}
```

Coordinates are **percentages of the image dimensions**, not pixels.

### Text span (NER)

```xml
<Text name="txt" value="$text"/>
<Labels name="ent" toName="txt">
  <Label value="PER"/>
  <Label value="LOC"/>
</Labels>
```

```json
{
  "from_name": "ent",
  "to_name": "txt",
  "type": "labels",
  "id": "spZx2X",
  "value": {
    "start": 12,
    "end": 24,
    "text": "Nelson Mandela",
    "labels": ["PER"]
  }
}
```

`start` / `end` are character offsets into the source string.

### Choice classification

```xml
<Text name="txt" value="$text"/>
<Choices name="sentiment" toName="txt" choice="single">
  <Choice value="positive"/>
  <Choice value="negative"/>
</Choices>
```

```json
{
  "from_name": "sentiment",
  "to_name": "txt",
  "type": "choices",
  "id": "auto_001",
  "value": {
    "choices": ["positive"]
  }
}
```

Classification doesn't have a geometric region — it gets a synthetic
ID so the rest of the schema stays uniform.

### Relation between regions

```json
{
  "type": "relation",
  "from_id": "Dx_aB91ISN",
  "to_id": "RQbW3Sj_Zr",
  "direction": "right"
}
```

A relation refers to two existing region IDs and adds a directional
arrow between them.

### Per-region text (multiple results, same region ID)

```xml
<Image name="img" value="$image"/>
<RectangleLabels name="product" toName="img">
  <Label value="Coffee"/>
</RectangleLabels>
<TextArea name="note" toName="img" perRegion="true"/>
```

One bounding box, two result entries, **same `id`**:

```json
[
  {
    "id": "X_12fGk",
    "from_name": "product",
    "to_name": "img",
    "type": "rectanglelabels",
    "value": {
      "x": 10, "y": 20, "width": 30, "height": 40,
      "rectanglelabels": ["Coffee"]
    }
  },
  {
    "id": "X_12fGk",
    "from_name": "note",
    "to_name": "img",
    "type": "textarea",
    "value": {
      "text": ["Roasted beans"]
    }
  }
]
```

Find every result for one region by filtering `result[]` for matching
`id`.

## Specifying annotators on import

By default, the user calling the import API becomes the
`completed_by` for every imported annotation. You can override this
to attribute imports to specific users — useful when migrating
historical labels into AfriAnnotate:

```json
{
  "data": { "text": "..." },
  "annotations": [
    {
      "result": [...],
      "completed_by": null
    },
    {
      "result": [...],
      "completed_by": { "email": "annotator@example.com" }
    },
    {
      "result": [...],
      "completed_by": 42
    }
  ]
}
```

| Form | Behaviour |
|---|---|
| Omitted or `null` | The user calling the import API is set as the annotator. |
| Object with `email` | Looked up in your organisation; falls back to the importing user if not found. |
| Number | Treated as a user ID. Must be a member of the org. |

This applies to imports via the UI, the REST API, and the Python
SDK.

## What's next

- [Import data →](/annotate/data-import/tasks) — file formats, drag-drop, URL paste,
  cloud storage
- [Cloud storage →](/annotate/data-import/cloud-storage) — connecting S3 / GCS / Azure
  as source or target
- [API → Import tasks →](/annotate/api/overview#import-tasks) — programmatic
  imports with curl / SDK
