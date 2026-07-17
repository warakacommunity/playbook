---
title: "Annotation settings"
sidebar_label: "Annotation settings"
sidebar_position: 3
description: "Sampling order, max annotations per task, skip behaviour — control how annotators see and submit tasks."
mdx:
  format: md
---

# Annotation settings

**Project → Settings → Annotation**.

Controls how annotators receive tasks from the labelling stream
and how their submissions behave. These knobs sit between the
project's data + labelling config (the *what*) and the actual
labelling experience (the *how*).

Visible to **Owner**, **Admin**, **Manager**. Annotators don't see
the tab.

## Sampling order

The order in which tasks appear in the labelling stream:

| Order | Behaviour |
|---|---|
| **Sequential** (default) | Tasks in import order (by `task.id` ascending) |
| **Random** | Pseudo-random, seeded per-(project, user). Each annotator sees a different shuffle, but the same annotator always gets the same shuffle on re-entry |
| **By agreement (lowest first)** | Lowest pre-computed agreement first — surfaces disputed tasks for reviewer attention. Requires [agreement metrics](/annotate/review-and-quality/agreement) to be running |
| **By model confidence (lowest first)** | Lowest prediction score first — active-learning ordering. Requires an [ML backend](/annotate/projects/ml-backend) providing prediction scores |

The order affects only the **annotator's** stream — Data Manager
respects its own sort column.

## Max annotations per task

How many distinct annotators must label a task before it's
considered "done." Default: 1.

- **= 1** — first annotator's submission completes the task. Cheap,
  fast. No agreement signal.
- **= 2 or 3** — get agreement data; surface disagreements for
  review. Standard for production datasets.
- **= 5 or more** — high-confidence labels (e.g. medical / safety
  data). Expensive but defensible.

Tasks transition to `COMPLETED` once this threshold is reached —
see [Task lifecycle](/annotate/annotation/task-lifecycle).

## Show ground truth

When **on**, annotators see the project's existing ground-truth
annotations in their labelling stream — visible as a reference,
not editable.

Useful for:

- **Training new annotators** — they label after seeing the
  reference, learning the project's style
- **Calibration** — bring annotators back to a shared
  understanding when agreement is drifting

Off by default to avoid biasing labels.

## Skip behaviour

What happens when an annotator clicks **Skip**:

| Setting | Behaviour |
|---|---|
| **Requeue skipped tasks** (default) | Skipped tasks return to the back of the queue. Annotator sees them again later, can reskip indefinitely |
| **Ignore skipped tasks** | Skipped tasks never reappear for this annotator. Useful when annotators are explicitly opting out of certain content (e.g. graphic material) |
| **Block skipped tasks** | Mark skipped tasks as needing reviewer attention. They drop out of the labelling stream and appear in the review queue |

The skip reason can be required — see [Require comments
on skip](#require-comments-on-skip) below.

## Require comments

Two toggles:

### Require comments on skip

When on, the **Skip** button opens a comment prompt before the
skip is finalised. Annotators must write a reason. Useful for:

- Auditing why content is being skipped (offensive, ambiguous,
  off-topic)
- Identifying mislabelled-import issues (the annotator says "this
  isn't English at all")

The comment appears on the task in Data Manager and the audit log.

### Require comments on reject (reviewers)

Same mechanism for reviewers — when rejecting an annotation,
they must write a reason. Useful so annotators know what to fix
on re-record / re-label.

## Auto-submit on last label

When **on**, if the annotator selects a single-choice label and
the project has only one `<Choices choice="single">` tag, the
labeller **auto-submits** without requiring a click on the Submit
button. Useful for high-throughput simple-classification projects.

Off by default — explicit Submit is safer for projects with
multiple result types.

## Annotator-facing language

The labelling stream's UI chrome can be rendered in a project-
specific language regardless of the annotator's profile preference:

```
empty / blank — annotator sees their personal language preference
"ha"           — annotator sees Hausa UI on this project's stream
"yo"           — Yoruba
"sw"           — Swahili
"fr"           — French
"pt"           — Portuguese
"en"           — English
```

Useful when a project has annotators whose work language differs
from their personal preference. Management pages (Settings, Org,
Project Dashboard) always use the operator's own preferred
language.

## Regions min / max per annotation

Hard limits on how many **regions** an annotator must / can include
in a single annotation. Useful for enforcing structural consistency
in task output:

| Setting | Default | Effect |
|---|---|---|
| **Minimum regions per annotation** | 0 (no minimum) | Annotator can't submit until they've drawn at least N regions. Useful for ABSA (aspect-based sentiment): "you must identify ≥ 1 aspect" |
| **Maximum regions per annotation** | unlimited | Submit button refuses past N regions. Useful for QA: "exactly one answer span" → set max = 1 |

A **region** is any labelled area — a bounding box, a text span,
a brush mask, etc. Choice classifications don't count (they're
zero-region).

## Tasks per annotator limit

Cap how many tasks a single annotator can claim on this project.
Useful for distributing work across a pool:

| Setting | Default |
|---|---|
| **Tasks per annotator** | unlimited |

Set to e.g. 200: each annotator can submit at most 200
annotations on this project. After that, the labelling stream
shows "You've reached your task limit on this project; ask the
manager if you should continue."

Distinct from the **Maximum annotations per task** setting above —
that's a per-task ceiling; this is a per-annotator ceiling.

## Maximum annotation time

Hard time limit per annotation (in seconds). Annotators who go
over the limit have their in-progress annotation auto-submitted.

Default: 0 (no limit).

Useful for:

- Reading-speed-constrained tasks (e.g. timed comprehension tests)
- Preventing tab-abandoned-overnight tasks from polluting lead-
  time metrics

## What's next

- **[Review settings →](/annotate/projects/review-settings)** — the reviewer-side
  configuration (queues, ordering, accept / reject behaviour)
- **[Task lifecycle →](/annotate/annotation/task-lifecycle)** — how max
  annotations per task drives the `COMPLETED` transition
- **[Audio QC →](/annotate/projects/audio-qc)** — server-side checks that run before
  an annotation submit is accepted
