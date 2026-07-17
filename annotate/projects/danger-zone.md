---
title: "Danger Zone"
sidebar_label: "Danger Zone"
sidebar_position: 99
description: "Archive a project, delete a project, reset annotations — destructive operations behind a confirmation gate."
mdx:
  format: md
---

# Danger Zone

**Project → Settings → Danger Zone**.

Three destructive operations. Each behind a typed-confirmation
gate so accidental clicks don't wipe data.

Visible to **Owner** and **Admin** only. Manager + lower roles
don't see the tab.

## Archive project

Moves the project to an archived state. Visible only when filtering
the project list with **Archived = true**. Annotators don't see
archived projects in their stream; reviewers don't see them in
their queue.

- **Reversible**: yes — unarchive from the same Danger Zone or
  via Data Manager's archived-projects filter
- **Effect on tasks**: stay where they are; annotations preserved
- **Effect on exports**: archived projects' API endpoints stay
  responsive; programmatic exports keep working
- **Effect on storage**: nothing changes; uploaded files stay in
  GCS / S3

Use **Archive** when a project is finished but you want the data
around (compliance retention, future re-use, training-data
reference). It's the polite version of `DELETE`.

## Delete project

**Soft-deletes** the project (and all its tasks, annotations,
predictions, comments, audit entries) on click. Hard-purge happens
automatically after a 30-day retention window.

- **Reversible**: yes during the 30-day window — via **Platform →
  Audit log → click the delete event → Undo**. After 30 days, the
  hard-purge runs and recovery is impossible
- **Effect on annotators**: project disappears from their list
  immediately
- **Effect on exports**: any in-progress export jobs fail with
  `404 project not found`
- **Effect on storage**: uploaded files stay in GCS / S3 for the
  retention window; purged at the same time the project is hard-
  deleted
- **Effect on webhooks**: a final `PROJECT_DELETED` event fires
  on every registered webhook

Confirmation gate: type the project name **exactly** into the
prompt before the **Delete** button enables.

## Reset annotations

Wipes every annotation on every task in the project, leaving tasks
intact. Useful when:

- The labelling config changed materially and existing annotations
  are no longer valid (e.g. you renamed a label or removed a tag)
- You're testing a workflow and need a clean slate without
  re-importing data
- An ML backend's bulk-predict misfired and you want to start over

- **Reversible**: **no** — annotations are gone. Operators can
  manually un-delete from the audit log's per-row "restore"
  affordance, but only one row at a time
- **Effect on predictions**: predictions are kept (they're on
  `task.predictions[]`, not `task.annotations[]`)
- **Effect on Data Manager**: tasks revert to `Status = Created`
- **Effect on agreement metrics**: precomputed scores cleared

Confirmation gate: type the project name + the literal string
`reset` before the button enables.

## Audit log

Every Danger Zone action lands in the **audit log** with:

- Action type (`project.archive` / `project.delete` /
  `project.reset_annotations`)
- The operator who took the action
- Timestamp + IP
- `meta.task_count`, `meta.annotation_count` — what got affected

Filter the audit log to find / undo Danger Zone events:
**Platform → Audit log → Filter: action contains "project"**.

## Why these are gated

These actions affect real labelling work that took real annotator
time. Wiping a project's annotations after a team has spent weeks
labelling is the kind of mistake that's hard to recover from at
scale.

The triple gate (Danger Zone tab + typed confirmation + 30-day
retention for deletes) is intentional friction — fast for a
deliberate operator, slow for an accidental click.

## What's NOT in Danger Zone

A few destructive operations that live elsewhere:

- **Remove members** — **Settings → Members** (per-member confirm)
- **Disconnect cloud storage** — **Settings → Cloud Storage**
  (data not deleted, just disconnected)
- **Delete a labelling config** — not possible directly; replace
  the config to "delete" the old one

For **org-level** destructive operations (transfer ownership,
delete the whole org), see [Platform → Orgs](/annotate/platform-admin#orgs).

## What's next

- **[Project setup →](/annotate/projects/setup)** — the inverse: creating a project
- **[Platform → Audit log →](/annotate/platform-admin#audit-log)** — find
  + undo recent Danger Zone events
- **[Data security →](/annotate/projects/security-settings)** — per-project access
  controls that often pair with archive (e.g. archive + reset to
  scrub a project before re-using it for sensitive data)
