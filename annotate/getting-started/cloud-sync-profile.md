---
title: "Cloud sync (Profile)"
sidebar_label: "Cloud sync profile"
sidebar_position: 5
description: "Configure cloud-sync on the desktop app — sync history, pending changes, force-sync, switch clouds."
mdx:
  format: md
---

# Cloud sync (Profile)

Desktop-app-only feature. The web SPA doesn't show these panels.

When you sign in to the desktop, **Profile → Cloud sync** has three
sub-tabs that let you inspect and manage your machine's bidirectional
sync with the cloud:

- **Pending changes** — unsynced local work
- **Sync history** — what synced when, with what result
- **Settings** — which cloud you're talking to, how often to sync

Backed by the `afri_sync` module — see
[Offline sync](/annotate/platform-admin/offline-sync) for the architecture.

## Pending changes

The list of records that exist locally but haven't yet been pushed
to the cloud. Includes:

- Annotations submitted while offline
- Profile edits made offline
- Comments added offline
- Project-membership changes accepted offline (e.g. you accepted
  an invite while in a tunnel)

Each row shows: record type, project (if relevant), local timestamp,
size, and a **Force sync now** button per row.

Empty when everything's in sync — the green "All synced" banner
appears.

The panel auto-refreshes after every sync run. Manually refresh
with the **Reload** icon if you've just done work and want to see
it land in the pending list before the next scheduled sync.

## Sync history

Chronological list of every sync run (last 100 by default). Each
row shows:

- **Started at** — when the sync run began
- **Duration** — how long it took
- **Pull count** — records fetched from cloud
- **Push count** — records sent to cloud
- **Status** — `Success` / `Partial` / `Failed`
- **Errors** — if any, click to expand the per-record error list

The history is the **first place to look** when a user reports
"my offline work disappeared" or "this project isn't syncing." The
error column tells you whether the desktop got an auth failure,
a permission denial, a conflict, or a network issue.

For deeper inspection, operators can query the `SyncRun` table
directly via the Django admin. The Profile UI is the user-facing
window into the same data.

## Settings

Three sections:

### Cloud URL

The base URL the desktop syncs to. Default is your platform's
cloud (e.g. `https://label.afriannotate.org`). Switching is rare but useful when:

- Moving from staging to production
- Testing against a developer instance
- An operator-led migration from one cloud to another

Switching clouds **doesn't** pull data from the new cloud
automatically — it resets the desktop's sync state. Existing
local data stays; on next sync, the desktop tries to push it to
the new cloud (failing if the user / project / org IDs don't
match). For migrations, follow the operator's runbook rather than
just flipping the URL.

### Sync schedule

How often the desktop auto-syncs:

- **Every 30 s** (default) — aggressive; right for most users
- **Every 5 min** — easier on battery / connectivity
- **Manual only** — disable auto-sync; user clicks **Sync now**
  when they want to

Manual-only is for low-bandwidth field work where every sync
counts against a metered connection.

### Force sync

A single button — **Sync now** — that triggers an immediate sync
regardless of the schedule. Useful when:

- You just finished a chunk of offline work and want to push it
  before closing the laptop
- The auto-sync seems stuck (rare — usually a network issue)
- You want to pull the latest changes from cloud without waiting
  for the next scheduled run

The button is disabled while a sync is in progress; the panel
shows a progress indicator (records pushed / pulled).

## User profile analytics

The fourth tab — **Profile → Analytics** — shows your **personal**
labelling analytics:

- Tasks labelled in the last 7 / 30 / 90 days
- Median lead time per task
- Skip rate
- Agreement score (where computed)
- Per-project breakdown

Useful for self-awareness ("am I getting faster?") and for managers
who ask "how productive is this annotator on this project?" —
managers see the same data at
[Organization → Metrics → Contributors](/annotate/organization/metrics).

## What's next

- **[Offline sync architecture →](/annotate/platform-admin/offline-sync)** —
  what happens under the hood
- **[Account →](/annotate/getting-started/account)** — the rest of the Profile page (name,
  password, email, PATs)
- **[Data security →](/annotate/projects/security-settings)** — the per-
  project policies that govern what gets synced where
