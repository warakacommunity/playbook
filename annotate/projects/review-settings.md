---
title: "Review settings"
sidebar_label: "Review settings"
sidebar_position: 4
description: "Per-project reviewer workflow — queue ordering, accept/reject policy, task limit, agreement threshold."
mdx:
  format: md
---

# Review settings

**Project → Settings → Review**.

Controls how reviewers receive tasks for review and how their
decisions (accept / reject / fix-and-accept) drive task state.

The reviewer workflow is enabled per-project — projects that don't
need review (e.g. small ground-truth corpora) can leave it off.

Visible to **Owner**, **Admin**, **Manager**. Reviewers don't see
the settings tab (they get assignments via the Review Queue).

## Enabling review

**Settings → Review → Enable review workflow**: toggle on.

Once enabled:

- A **Review Queue** appears in the project sidebar for users with
  the **Reviewer** role
- Submitted annotations land in the queue based on the ordering
  rules below
- Reviewers can **Accept**, **Reject**, or **Fix & Accept** each
  annotation
- The task's `Status` column in Data Manager shows review state
  (`Awaiting review` / `Reviewed` / `Accepted` / `Rejected`)

## Task ordering in the review queue

Pick how the queue orders tasks for reviewers:

| Order | Behaviour |
|---|---|
| **By task ID** (sequential) | Earliest task first |
| **Random** | Pseudo-random shuffle per (project, reviewer) |
| **By agreement (lowest first)** | Disputed tasks first — requires [agreement metrics](/annotate/review-and-quality/agreement) |
| **By model confidence (lowest first)** | Active-learning ordering — requires [ML backend](/annotate/projects/ml-backend) |
| **By annotator** | Group by who labelled — useful for "review everything from this annotator" workflows |

## Task limit

Optional cap on what proportion of project tasks reach the review
queue. Defaults to **100 %** (every annotated task is reviewable).

| Setting | Effect |
|---|---|
| **100 %** | All annotated tasks reviewable |
| **N %** (1–99) | Pseudo-random subset of size N% — useful for **sampled review** in large projects where reviewing every task is impractical |
| **0** | No tasks reach the review queue — annotations auto-accept |

The sample is deterministic per (project, reviewer) seeded by the
project ID, so the same reviewer gets the same subset across
sessions.

When reviewers explicitly select a slice of tasks in Data Manager
(rather than entering the queue), the percentage limit is bypassed
for that session.

## Task-is-reviewed-after policy

Controls **when** a task is considered reviewed:

- **First annotation reviewed** (default) — task transitions to
  `Reviewed` after any reviewer accepts/rejects one annotation. If
  the project allows multiple annotators per task, other
  annotations stay reviewable
- **All annotations reviewed** — task stays in the queue until
  every annotation on it has been reviewed. Use when you need
  consensus-level confidence

The "all annotations reviewed" mode pairs with the navigation
fix that lets reviewers walk back through the queue along the
same path they came forward.

## Accept / reject behaviour

What happens when a reviewer makes a decision:

| Decision | Effect on annotation | Effect on task |
|---|---|---|
| **Accept** | Marked `accepted = true` | Task counts toward `COMPLETED` if max-annotations threshold reached |
| **Fix & Accept** | Reviewer's edits saved as the new annotation `value`; marked `accepted = true` | Same as Accept |
| **Reject** | Marked `accepted = false`. Annotation stays in the database, flagged. **Does NOT** automatically return to the labelling stream | Task does NOT count toward `COMPLETED` from this annotation |

To return a rejected task to the labelling stream, an annotator
must explicitly delete the rejected annotation (or use the bulk-
delete in Data Manager). The platform doesn't auto-resurface
rejections to avoid loops.

## Annotation limit (active reviewer pause)

Cap on tasks an annotator can complete before being **paused**
pending reviewer approval. Useful for new annotators where you
want to validate their first N tasks before letting them work
freely.

Default: 0 (no limit — annotators can label as many tasks as they
want without waiting).

Set to e.g. 20: the annotator labels 20 tasks, then their
labelling stream pauses with a "Waiting for reviewer to validate
your first batch" message. Once reviewers accept at least M of
the N (M configurable), the pause lifts.

This is part of the Quality settings layered onto the Review
workflow — see [Agreement metrics](/annotate/review-and-quality/agreement)
for the full annotator-evaluation flow.

## Assigning reviewers

Two ways reviewers get tasks:

### Pre-assignment (managers)

1. **Data Manager** → select tasks → **Assign Reviewers**
2. Pick reviewer(s) from project members
3. Save

Pre-assigned tasks go to the named reviewer's queue first; the
random/agreement/etc. ordering applies to **unassigned** tasks.

### On-demand (reviewers themselves)

Reviewers can also enter the queue without pre-assignment and pick
up the next task based on the configured ordering rules. Both
patterns can coexist — pre-assigned tasks are surfaced first to
their assignee, then the rest of the queue is fair-share.

## Review stream UX

When a reviewer enters the queue:

- Task opens with the annotation overlay visible
- Right panel shows **Accept** / **Fix & Accept** / **Reject** buttons
- Below the buttons, a **Reasons** dropdown (when rejection comments
  are required — see [Annotation settings](/annotate/projects/annotation-settings))
- Keyboard shortcuts: `Cmd+Shift+A` (accept), `Cmd+Shift+R`
  (reject)
- After decision, the next task in queue auto-loads

A "go back" gesture (`<` arrow key) walks back through the queue
the reviewer just came forward through — useful for revisiting a
decision they made too quickly.

## What's next

- **[Review workflow overview →](/annotate/review-and-quality/overview)** —
  the end-to-end reviewer journey
- **[Agreement metrics →](/annotate/review-and-quality/agreement)** —
  what `By agreement (lowest first)` ordering uses
- **[Annotation settings →](/annotate/projects/annotation-settings)** — the
  annotator-side companion settings
