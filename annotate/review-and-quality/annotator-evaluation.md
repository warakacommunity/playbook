---
title: "Annotator evaluation"
sidebar_label: "Annotator evaluation"
sidebar_position: 3
description: "How AfriAnnotate measures individual annotator quality — calibration ramps, minimum-score gating, low-agreement auto-routing."
mdx:
  format: md
---

# Annotator evaluation

Beyond aggregate agreement metrics on the project as a whole,
AfriAnnotate can score **individual annotators** and gate
their work based on the score. Three related features:

1. **Calibration ramp** — new annotators warm up on ground-truth
   tasks before hitting live data
2. **Minimum-score pause** — annotators whose score drops below a
   threshold are auto-paused
3. **Low-agreement auto-routing** — tasks where annotators
   disagree are auto-routed to additional review

Configure under **Project → Settings → Quality → Annotator
evaluation**.

## Calibration ramp

New annotators on a project are **prioritised onto ground-truth
tasks** until they've submitted N annotations against tasks with a
known correct answer. Their score on these GT tasks calibrates
their evaluation before they touch live data.

| Setting | Default |
|---|---|
| **Calibration GT tasks** | 0 (disabled) |
| **Calibration threshold** | Annotator score on GT tasks must be ≥ this to graduate |

Worked example with `Calibration GT tasks = 20` + threshold `0.8`:

1. New annotator joins the project
2. Their labelling stream is filtered to **only ground-truth tasks**
3. They label 20 of them; the system computes their mean agreement
   with the GT
4. **Pass** (≥ 0.8) → graduate to live tasks
5. **Fail** (< 0.8) → annotator stays on GT until score improves,
   or admin manually graduates them

Useful when:

- Onboarding new annotators on a new project / domain
- Quality matters more than time-to-first-label
- You have a sufficient GT-task corpus (~ 50-100+ GT tasks) to
  draw the calibration sample from

Pairs with [Agreement metrics](/annotate/review-and-quality/agreement) — needs the project's
agreement metric to be configured and at least some GT tasks
defined.

## Minimum-score pause

Once an annotator has > N submissions on the project, their
**rolling agreement score** is computed continuously. If it drops
below a threshold, they're auto-paused.

| Setting | Default |
|---|---|
| **Minimum score for continued work** | 0 (disabled) |
| **Minimum-data threshold** | 20 submissions (don't evaluate on small samples) |
| **Window** | Last 50 annotations (rolling) |

Worked example with `Minimum score = 0.7` + `Minimum data = 20` +
`Window = 50`:

1. Annotator has 19 submissions — no evaluation (sample too small)
2. Hits 20 — evaluation begins; current rolling score is 0.85 →
   they keep working
3. Score drops to 0.65 (rolling, last 50 annotations) → auto-paused
4. They see an in-app message: "Your work has been temporarily
   paused for quality review"
5. Manager / reviewer reviews their recent work; either:
   - Unpauses (after correcting / providing feedback)
   - Suspends via the [auto-suspend](/annotate/organization/auto-suspend)
     escalation
   - Removes them from the project

Useful when:

- Live monitoring of crowd quality
- Crowd projects where you can't afford to keep low-quality
  contributors filling up the pool

Distinct from [auto-suspend rules](/annotate/organization/auto-suspend) —
this is per-project pause; auto-suspend is org-wide block.

## Low-agreement auto-routing

When the per-task agreement (across annotators) drops below a
threshold, the task can be **automatically routed** to additional
review:

| Strategy | Behaviour |
|---|---|
| **None** (default) | No automatic action; the disputed task just sits with low agreement |
| **Add annotator** | Assign one more annotator to the task. Useful for breaking 2-way ties |
| **Force review** | Push the task into the review queue regardless of project's per-project review settings |
| **Force review + add annotator** | Both — get a third opinion AND have a reviewer arbitrate |

| Setting | Default |
|---|---|
| **Low-agreement threshold** | 0 (disabled) |
| **Strategy** | None |

Worked example with threshold `0.5` + `Force review`:

1. Three annotators label task — agreement score 0.45
2. System sees < 0.5; auto-routes the task to the review queue
3. Reviewer arbitrates; their accept becomes the canonical
   annotation

This complements the manual reviewer assignment in
[Review settings](/annotate/projects/review-settings) — instead of
reviewers picking what to review, the system surfaces the
genuinely contested tasks.

## Embedding API for semantic similarity

For projects whose agreement metric is **Semantic Similarity**
(comparing free-text annotations by meaning rather than exact
match), AfriAnnotate POSTs the annotation text to an external
embedding endpoint and uses cosine similarity as the score:

| Setting | What |
|---|---|
| **Embedding API URL** | Your hosted endpoint (e.g. a Sentence Transformer service) |
| **Auth token** | Bearer token if required |
| **Timeout (ms)** | Default 3000 |

The endpoint contract: `POST {url}` with body `{"texts": ["...", "..."]}`,
return `{"embeddings": [[...], [...]]}`. AfriAnnotate cosines
the pair.

Useful for free-text annotations (summaries, descriptions,
translations) where exact-match metrics aren't meaningful.

## Per-annotator metrics

Beyond the auto-actions above, the **Annotator** tab on the
project dashboard surfaces per-person metrics:

- Submissions count (today / week / month / all-time)
- Mean / median lead time per submission
- Skip rate
- Rejection rate (from reviewers)
- Agreement score (rolling, last N annotations)
- Calibration status (in ramp / graduated / paused)

Available to **Manager** and above. Annotators see their own
metrics in **Profile → Analytics**.

## Custom agreement metric (Python sandbox)

Combine the above with a [custom agreement metric](/annotate/review-and-quality/agreement#custom-metrics)
and you can build arbitrary evaluation logic — e.g. "score
annotator X based on agreement with annotator Y only" for
training-against-expert workflows.

The custom metric runs in a sandboxed Python interpreter; see the
custom-metrics docs for the function signature + sandbox limits.

## When NOT to use these features

Annotator evaluation has friction. Skip it when:

- Your team is small (< 10 annotators) — manager-eyeball is
  faster
- Your task type doesn't have a clean "right answer" — subjective
  labelling won't have agreement that maps to quality
- You're early in a project — calibration ramps need GT tasks,
  which you don't have yet

Start with **warn-only mode** (no auto-pause / route) for a few
weeks to observe what the system would have done before flipping
on actions.

## What's next

- **[Agreement metrics →](/annotate/review-and-quality/agreement)** — built-in + custom
  metrics that feed evaluation
- **[Auto-suspend rules →](/annotate/organization/auto-suspend)** —
  org-wide escalation for persistent quality issues
- **[Review workflow →](/annotate/review-and-quality/overview)** — how reviewers see + act on
  auto-routed tasks
