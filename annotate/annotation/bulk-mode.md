---
title: "Bulk annotation mode"
sidebar_label: "Bulk mode"
sidebar_position: 5
description: "Label many tasks at once via a streamlined single-action UI — useful for high-throughput simple classification."
mdx:
  format: md
---

# Bulk annotation mode

For projects with simple classifications (single-choice labels,
yes/no judgements), **Bulk mode** lets annotators rapid-fire many
tasks at once with a single click per task.

Useful for:

- Single-choice text classification (sentiment, toxicity, spam)
- Yes/no audio judgements ("is this clean speech?")
- Image quick-sort ("is this a cat?")

Not useful for:

- Tasks with multiple regions / spans / bounding boxes
- Tasks with free-text inputs (TextArea)
- Long-form transcription

## Enabling bulk mode

**Project → Settings → Annotation → Enable bulk mode**.

Toggle on. The labeller will offer a **Bulk** view alongside the
standard one-task-at-a-time view.

Requires the project's labelling config to have **at most one
`<Choices>` or `<Labels>` tag** plus the matching object tag.
The toggle is greyed out for projects whose config wouldn't make
sense in bulk mode (e.g. anything with regions).

## What annotators see

The bulk view shows multiple tasks at once — a grid for images,
a list for text, a paginated player for audio.

For each task:

- The data (image / text / audio clip)
- The choice options as click-targets
- A small **status indicator** (untouched / labelled / skipped)

Annotator clicks the choice — task is instantly labelled, status
flips green, next task focuses automatically.

Keyboard shortcuts work the same as single-task mode
(`1`–`9` apply labels, `Space` plays audio, etc.) — see
[Hotkeys](/annotate/annotation/hotkeys).

Submit happens **per task** as soon as the annotator picks a
choice — there's no "submit batch" step. Annotators can scroll
back and change a label they got wrong; the change re-saves.

## Configuring batch size

By default, bulk mode shows **20 tasks per page**. Annotators
paginate as they finish.

Configure at **Project → Settings → Annotation → Bulk page size**:
1 – 100 tasks per page.

Larger pages mean less pagination overhead but more memory + more
cognitive load. 20 is the sweet spot for most projects; 50+ for
text classification on phones with weak connections (fewer
roundtrips).

## Skip + comment in bulk mode

Skipping works the same — the task is marked skipped and the next
one focuses. If your project requires
[comments on skip](/annotate/projects/annotation-settings#require-comments-on-skip),
a small inline comment field appears before the skip lands.

## What bulk mode does NOT do

- **It doesn't bypass agreement / review settings.** Bulk-labelled
  tasks still flow through whatever
  [review workflow](/annotate/projects/review-settings) is enabled on the
  project. Reviewers see them in their queue just like single-mode
  annotations
- **It doesn't bypass audio QC.** Audio tasks labelled in bulk
  still run through the
  [audio QC pipeline](/annotate/projects/audio-qc) on submit
- **It doesn't bypass [auto-suspend](/annotate/organization/auto-suspend)
  rules.** Throughput from bulk mode counts the same as single
  mode — abusing bulk to inflate task counts past quality is
  caught by the agreement-based rules

## When NOT to use bulk mode

If your project's task variance is high — some tasks are clear,
others need a long look — bulk mode encourages annotators to
move too fast through the ambiguous ones. Single-task mode forces
a pause before each submit, which helps quality.

Bulk mode pairs well with:
- Single-choice classification with low variance
- Tasks where ground truth is fast to assess (under ~5 s/task)
- High-volume corpora where the labour cost of per-task UI overhead
  matters

## What's next

- **[Hotkeys →](/annotate/annotation/hotkeys)** — keyboard shortcuts
- **[Labeling guide →](/annotate/annotation/labeling)** — the single-task mode
  walkthrough
- **[Annotation settings →](/annotate/projects/annotation-settings)** —
  the project-level toggle that enables bulk mode
