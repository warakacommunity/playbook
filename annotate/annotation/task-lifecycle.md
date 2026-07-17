---
title: "Task lifecycle"
sidebar_label: "Task lifecycle"
sidebar_position: 4
description: "What states a task transitions through — Created → In Progress → Completed — and what each state means for annotators, reviewers, and exports."
mdx:
  format: md
---

# Task lifecycle

Every task in AfriAnnotate carries a **state** that tracks
where it is in the labelling workflow. Three states, two
transitions:

```
   ┌──────────┐       ┌──────────────┐       ┌─────────────┐
   │ CREATED  │──────▶│ IN_PROGRESS  │──────▶│ COMPLETED   │
   └──────────┘       └──────────────┘       └─────────────┘
        ▲                                          │
        │                  un-complete             │
        └──────────────────────────────────────────┘
```

States are managed by the **FSM (finite-state machine)** module
under `label_studio/fsm/`. They live in their own `TaskState`
records keyed by UUID7 (time-series-ordered) — distinct from the
`Task` row so state history is preserved.

## The three states

### CREATED

The task has been imported into the project but no annotator has
opened it yet. Default state for every new task.

In Data Manager: **Status = Created** (or sometimes shown as
"Unlabelled" depending on the column config).

Visible to annotators in the labelling stream if it matches their
assignment filter (by default: unassigned + not already labelled).

### IN_PROGRESS

An annotator has opened the task. Set automatically the first
time someone:

- Opens the task in the labeller
- Submits a draft annotation
- Adds a comment

Stays in this state across draft saves, partial annotations, and
multiple submissions until the task is **completed** (see below).

### COMPLETED

The task has reached its **completion criterion** for this project.
Two ways tasks transition here:

1. **Reached the maximum-annotations-per-task setting**. Example: a
   project configured for 3 annotators per task moves to
   COMPLETED when 3 distinct annotators have submitted.
2. **Has at least one accepted ground-truth annotation**, when the
   project requires review before completion.

Once COMPLETED, the task is hidden from the default labelling
stream (annotators don't see it). Still visible in Data Manager;
still part of exports.

## Annotation state

Annotations have their own state but in the current schema it's
just `CREATED` — annotations are append-only artifacts.
Submissions, updates, and deletes all happen on the annotation
itself, not via state transitions. The `AnnotationState` table
exists for **history tracking** rather than business-logic
gating.

## Project state

Projects also carry state — CREATED → IN_PROGRESS → COMPLETED:

- **CREATED**: project just made; labeling config might not even
  be set yet; no annotations
- **IN_PROGRESS**: actively being annotated
- **COMPLETED**: project archived. Annotators no longer see it in
  their list; exports still work

Transitions happen automatically. Operators can manually archive
(complete) via **Project → Settings → Danger Zone → Archive**.

## Transitions in the Data Manager

The **Status** column in Data Manager shows whichever of these states
applies. You can filter on it:

- Filter `Status = Created`: tasks no annotator has touched. Useful
  for "what's left to do" queries.
- Filter `Status = In Progress`: actively being worked on. Useful
  for "what's mid-flight" — pair with `Annotations = 0` to find
  tasks someone opened but hasn't submitted yet.
- Filter `Status = Completed`: done. Useful for export filtering
  to ship only finished tasks.

## Where state changes are recorded

Every transition lands in:

- The `TaskState` table — full transition history, queryable
- The **audit log** (`AuditEvent` with `type = 'task.transition'`)
- Optionally, **webhooks** subscribed to task events

For operator debugging, the FSM admin at
`/admin/fsm/taskstate/` shows the state-history table.

## Manual overrides

Operators with the **Manager** role and above can force-transition
a task:

1. Open the task preview in Data Manager
2. Click the **State** badge
3. Pick a new state

Useful for unsticking tasks after a workflow change — e.g. you
changed the maximum-annotations-per-task setting from 3 to 2,
and some tasks are stuck in IN_PROGRESS at 2 annotations.

Manual overrides land in the audit log with `meta.reason: "manual"`
and the operator who did it.

## The FSM framework (developer-facing)

The FSM module is reusable. It's not specific to tasks — you can
define your own entity states + transitions if you're extending
the platform:

- **State models** (`fsm/state_models.py`): `BaseState`,
  `TaskState`, `AnnotationState`, `ProjectState` — UUID7-keyed
  state records
- **Transition system** (`fsm/transitions.py`): declarative
  pydantic-based transitions with validation
- **Registry** (`fsm/registry.py`): register your own entity types
  via `@register_state_choices`
- **TransitionExecutor** (`fsm/transition_executor.py`):
  orchestrates the actual state change + side effects (audit
  event, webhook, etc.)

See `label_studio/fsm/README.md` in the repo for the full
developer guide.

## What's next

- **[Data Manager →](/annotate/annotation/data-manager)** — where you see + filter on
  task state
- **[Labeling guide →](/annotate/annotation/labeling)** — what happens to a task
  while it's IN_PROGRESS
- **[Review workflow →](/annotate/review-and-quality/overview)** — the
  Reviewer's accept / reject path that drives transitions to
  COMPLETED
