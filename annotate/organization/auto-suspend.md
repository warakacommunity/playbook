---
title: "Auto-suspend rules"
sidebar_label: "Auto-suspend rules"
sidebar_position: 6
description: "Automatically suspend org members based on quality, throughput, inactivity, abandonment, quota, or custom signals — instead of relying on manual review."
mdx:
  format: md
---

# Auto-suspend rules

Auto-suspend rules **automatically pause org members** when their
behaviour crosses an operator-configured threshold. Useful at
scale where reviewing every annotator's metrics by hand isn't
feasible.

Suspended members can't sign in or claim new tasks. Existing work
they've already submitted stays in the database. A suspended user
can be unsuspended at any time — the audit trail of why they were
suspended (which rule, which metrics) is preserved.

This is AfriAnnotate-specific — built for crowdsourced data
labelling where annotator quality varies wildly and manual review
of every contributor doesn't scale.

## Where it lives

**Organization → Settings → Member policies → Auto-suspend rules**.

Visible to **Owner** and **Admin** only.

## The seven rule types

Each rule defines a **threshold** + **window** + **action**. When
the threshold is crossed inside the window, the member is suspended
(with optional grace-period warning first).

### 1. Inactivity

Suspend members who haven't logged in for N days.

| Field | Example |
|---|---|
| Threshold | 30 days |
| Action | Soft-suspend (notify, allow unsuspend) or hard-suspend (require admin to unsuspend) |
| Grace period | 7 days — email warning before actual suspension |

### 2. Low agreement

Suspend members whose **inter-annotator agreement** drops below a
threshold over a rolling window.

| Field | Example |
|---|---|
| Threshold | Agreement < 0.6 |
| Window | Last 50 annotations |
| Action | Suspend until manual unsuspend |
| Minimum-data filter | Require ≥ 20 annotations before evaluating (don't suspend on a tiny sample) |

Pairs with [agreement metrics](/annotate/review-and-quality/agreement) —
the metric needs to be enabled on at least one project that the
member contributes to.

### 3. High rejection rate

Suspend members whose **reviewer rejection rate** crosses a
threshold over a rolling window.

| Field | Example |
|---|---|
| Threshold | > 30% rejected |
| Window | Last 50 annotations |
| Action | Suspend |
| Minimum-data filter | Require ≥ 10 reviewer decisions |

Different from agreement: agreement is annotator-vs-annotator;
rejection rate is annotator-vs-reviewer. Both signals correlate
but cover different failure modes.

### 4. Low throughput

Suspend members who submit fewer than N annotations per period.

| Field | Example |
|---|---|
| Threshold | < 10 submissions / week |
| Window | Last 4 weeks |
| Action | Soft-suspend with grace period (members may have legitimate breaks) |

Useful for contractors paid per-task — flags people who started
but never delivered, so manager can follow up.

### 5. High abandoned-task rate

Suspend members who repeatedly start tasks and walk away mid-
submit. Tracked via tasks marked `IN_PROGRESS` but never reaching
`COMPLETED` from this annotator's session.

| Field | Example |
|---|---|
| Threshold | > 20% abandoned |
| Window | Last 50 task-starts |

Distinct from skips — a skip is an explicit "I don't want to label
this." An abandoned task is "I opened it, did some work, and
disappeared without submitting." Often a sign the annotator's
device is dying / connectivity is unreliable / they got distracted.

### 6. Quota exceeded

Suspend members who breach their per-period task quota.

| Field | Example |
|---|---|
| Threshold | > 100 tasks / day |

Useful for projects with daily-budget constraints — once a member
has hit their quota for the day, suspend them until tomorrow to
prevent over-spend.

### 7. Custom metric

Suspend on any metric the platform exposes:

| Field | Example |
|---|---|
| Metric | `precomputed_agreement` (or any field on `User` / `Membership` / `Annotation`) |
| Operator | < / > / = / between |
| Threshold | 0.5 |
| Window | (optional) — applied as a SQL filter |

Useful for org-specific scoring (e.g. "annotators flagged by my
custom Python metric").

## Suspension actions

Each rule's **action** field picks what suspension looks like:

| Action | Behaviour |
|---|---|
| **Soft-suspend** | Member is paused. The user can request unsuspension via an in-app prompt; an admin sees the request in the org's notification feed and approves |
| **Hard-suspend** | Member is paused. Admin must explicitly unsuspend; the user has no in-app appeal path |
| **Warn-only** | No suspension; email + in-app notification to the member that they're at risk. Useful for the first rollout — see who would have been suspended before flipping to actual suspension |

Combined with **grace period** (N days between threshold-cross
and actual suspension): the member gets a warning at threshold-
cross + days of grace to fix the metric before suspension lands.

## Per-rule scope

Each rule can be scoped to:

- **Whole org** (default) — every annotator in the org evaluated
  against this rule
- **Specific projects** — only annotators active on the named
  projects are evaluated
- **Specific roles** — e.g. only `Annotator` role, not Reviewers

Useful when different projects have different tolerance —
high-stakes projects can have stricter rules than scratch
projects.

## Audit trail

Every auto-suspension lands in the **audit log**
(`AuditEvent.type = 'membership.auto_suspend'`) with:

- The rule that triggered
- The member's metrics at the moment of suspension
- The decision (suspended / warned only)
- Timestamp + duration of grace period if applicable

Admins reviewing a suspension later see exactly why the system
pulled the trigger.

## Unsuspending

Three paths to lift a suspension:

1. **Admin manually unsuspend** — org admin opens the member,
   clicks **Unsuspend**. Reason required.
2. **Member self-appeal** (soft-suspend only) — member sees an
   in-app prompt explaining the suspension, can submit an appeal
   reason. Admins see it in the notification feed.
3. **Threshold re-cross** — for some rule types (e.g. agreement),
   the member can be auto-unsuspended when their metric recovers
   above the threshold. Configurable per-rule.

## When NOT to use auto-suspend

Auto-suspend is a blunt instrument. Skip it when:

- You have < 20 annotators — manual review is fine, auto-suspend
  is over-engineering
- Your annotators are vetted internal staff — a false-positive
  suspension is more disruptive than the labour saved
- Your project has high natural variance — diverse-perspective
  labelling (subjective tasks) won't have "agreement" that maps
  to "quality"

For those cases, **warn-only** rules are useful as a monitoring
signal without the suspension teeth.

## What's next

- **[Annotator evaluation →](/annotate/review-and-quality/annotator-evaluation)** —
  the metrics auto-suspend uses (agreement, calibration, min score)
- **[Members →](/annotate/organization/members)** — manual suspend / unsuspend / remove
  controls
- **[Roles →](/annotate/organization/roles)** — what each role can see + do, including
  who can configure auto-suspend
