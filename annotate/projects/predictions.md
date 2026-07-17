---
title: "Predictions management"
sidebar_label: "Predictions"
sidebar_position: 10
description: "Manage model-produced predictions on tasks — bulk delete, re-run, A/B compare model versions."
mdx:
  format: md
---

# Predictions management

**Project → Settings → Predictions**.

The Predictions tab lets you manage model-produced pre-annotations
on your tasks — separately from the [ML backend](/annotate/projects/ml-backend)
connection settings. Useful when you've got predictions on tasks
and need to do something with them at the project level.

Visible to **Owner**, **Admin**, **Manager**.

## What's a prediction

A **prediction** is a model-produced annotation, stored on
`task.predictions[]` alongside the human `annotations[]`. They
share the same JSON shape (see [Task format](/annotate/data-import/task-format))
plus an additional `model_version` string identifying which model
produced them.

Predictions surface in the labeller as **draft regions** the
annotator can accept / edit / discard. They don't count toward the
task's annotation count.

## What the tab shows

A list of every model version that has predictions on any task in
this project:

| Column | Meaning |
|---|---|
| **Model version** | The `model_version` string from the prediction |
| **Predictions** | Count of tasks with predictions from this model |
| **Created** | First-seen timestamp |
| **Source** | Where the predictions came from (`ML Backend` if from a registered backend, `Import` if uploaded via API, `Manual` if added via UI) |

## What you can do

### Bulk delete predictions

Pick a model version → **Delete predictions** → confirm. Removes
every prediction tagged with that `model_version` across the
project's tasks.

Use cases:

- You retrained a model and want to clear old predictions before
  re-running
- Predictions came from a misconfigured run and need to go
- You're prepping a project for human-only labelling and don't
  want models biasing annotators

The tasks themselves stay; only the `predictions[]` array on
each task is cleared.

### Re-run predictions on filtered tasks

For projects with a connected [ML backend](/annotate/projects/ml-backend):

1. Open Data Manager
2. Filter to the tasks you want re-predicted
3. Bulk action → **Re-run predictions**
4. Pick the model version (if multiple backends)

The backend's `/predict` is called for each filtered task,
overwriting any existing prediction with the same `model_version`.

### Compare two model versions

When a project has predictions from multiple model versions on the
same tasks (e.g. you ran `whisper-v1` then `whisper-v2`), the
Predictions tab shows both. Click **Compare** to see a side-by-
side table:

- One column per model version
- One row per task
- For tasks where predictions diverge, the row is highlighted
- For tasks where one model produced a prediction and the other
  didn't, a `—` shows in the missing column

Useful for evaluating whether a model upgrade is worth shipping —
sample tasks where v1 and v2 disagree and review them by hand.

## Importing predictions via API

Beyond ML-backend-driven generation, predictions can be imported
directly via the task-import API:

```json
{
  "data": { "text": "..." },
  "predictions": [
    {
      "model_version": "whisper-tiny-2026-05",
      "score": 0.87,
      "result": [
        {
          "from_name": "transcript",
          "to_name": "audio",
          "type": "textarea",
          "value": { "text": ["Sannu da zuwa"] }
        }
      ]
    }
  ]
}
```

POST this to `/api/projects/<id>/import` with the standard task
import. Useful when you're running models outside AfriAnnotate
and just want to surface predictions to annotators.

## Predictions in the labeller

When an annotator opens a task that has predictions:

- The most recent prediction (latest `created_at`) is shown as a
  **draft annotation** with editable regions
- A toggle at the top of the labeller lets the annotator switch
  to a different model version's prediction (when multiple exist)
- The annotator can **Accept** the prediction as-is, **Edit** then
  submit, or **Discard** to label from scratch

On submit, the annotation is the human's edited version; the
prediction stays in `task.predictions[]` for analytics.

## Predictions in agreement metrics

By default, predictions **don't** count in agreement metrics — only
human annotations are compared. To include predictions:

- **Project → Settings → Quality → Include predictions in
  agreement**: toggle on
- Pick a model version (or "all versions") to compare against

This treats the prediction as a synthetic annotator. Useful for:

- Measuring "human ↔ model" agreement to size training-data quality
- Promoting predictions to ground truth when they pass an agreement
  threshold against multiple human reviewers

## Predictions in exports

Exports include `predictions[]` by default. To exclude them:

- **Export → Options → Include predictions**: toggle off
- Or via API: `POST /api/projects/<id>/exports` with
  `"include_predictions": false`

## Performance

For projects with millions of tasks + multiple model versions, the
Predictions tab loads counts via an indexed query — fast even at
scale. Bulk-delete is async (triggers a Celery job; UI polls);
re-run-predictions is also async and scales with the ML backend's
throughput.

## What's next

- **[ML backend →](/annotate/projects/ml-backend)** — connect a model that produces
  predictions
- **[Task format →](/annotate/data-import/task-format)** — the JSON shape
  of predictions
- **[Agreement metrics →](/annotate/review-and-quality/agreement)** —
  including predictions in agreement scoring
- **[Active learning patterns →](/annotate/projects/ml-backend#active-learning)** —
  uncertainty sampling
