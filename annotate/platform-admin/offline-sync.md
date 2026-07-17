---
title: "Offline sync"
sidebar_label: "Offline sync"
sidebar_position: 6
description: "How the desktop / mobile apps sync project data offline and back to the cloud — afri_sync architecture."
mdx:
  format: md
---

# Offline sync

The desktop app (and to a lesser extent the mobile app) can pull a
project's metadata + task data to a local SQLite mirror, letting
annotators label offline. The `afri_sync` module handles the
bidirectional sync: pull-from-cloud on first open + on demand,
push-to-cloud on every annotation submit (or on next connectivity).

This is AfriAnnotate-specific (not in upstream Label Studio) —
useful for field annotators in low-connectivity environments where
"always online" isn't an option.

## Architecture at a glance

```
                ┌────────────────────────────────────┐
                │  Cloud Django + Postgres + GCS     │
                │  ── source of truth ──             │
                └─────────────┬──────────────────────┘
                              │ HTTPS + JWT
              ┌───────────────┼─────────────────────┐
              │               │                     │
       ┌──────▼─────┐   ┌─────▼──────┐      ┌───────▼───────┐
       │ Web SPA    │   │ Desktop app│      │ Mobile app    │
       │ (no cache) │   │  Local     │      │  IndexedDB    │
       │            │   │  SQLite    │      │  outbox only  │
       │            │   │  + GCS     │      │  (mobile is   │
       │            │   │   mirror   │      │   online-first)│
       └────────────┘   └────────────┘      └───────────────┘
                              │
                       Operator can label
                       offline against local;
                       sync back on reconnect.
```

## Key modules

| Module / file | Role |
|---|---|
| `label_studio/afri_sync/sync.py` | The sync loop — pull, diff, push |
| `label_studio/afri_sync/models.py` | `CloudConfig`, `SyncMeta`, `OfflineProjectPref`, `SyncRun` |
| `label_studio/afri_sync/signals.py` | Django signals that mark records as needing sync when they change |
| `label_studio/afri_sync/cloud_proxy_middleware.py` | Desktop's middleware that proxies requests cloud-ward when the local mirror is stale |
| `label_studio/afri_sync/views.py` + `urls.py` | HTTP endpoints the desktop calls for explicit sync (pull / push / status) |

## SyncMeta — the shadow table

Every model that participates in sync has a corresponding
`SyncMeta` row keyed by `(model_label, instance_id)` carrying:

- `last_pulled_at` — when this row was last refreshed from cloud
- `last_pushed_at` — when this row was last pushed to cloud
- `dirty` — whether local changes are awaiting push
- `version` — monotonic counter for conflict detection

The shadow table is the operator-side decoupling that makes sync
robust: any model can opt into sync by adding a `SyncMeta` row,
without changing the model itself.

## CloudConfig

Per-user record telling the desktop **where to sync to**:

- Cloud base URL (e.g. `https://label.afriannotate.org`)
- JWT access + refresh tokens
- Last-sync-status (`idle`, `pulling`, `pushing`, `error`, `paused`)
- Last-error (truncated message + timestamp)

Configured at desktop install time via the first-launch wizard.
Operators can switch clouds in **Profile → Cloud settings** — useful
when moving from staging to production.

## OfflineProjectPref

Per-(user, project) record carrying:

- Whether the user has chosen to keep this project offline
- The local timestamp the sync was last completed for this project
- The project's `allow_offline_for_annotators` /
  `allow_metadata_mirror` policies (mirrored from the cloud's
  Project row so the desktop can enforce them without a roundtrip)
- Disk-space budget (some projects get capped at e.g. 1 GB local
  mirror)

When a project's `allow_metadata_mirror = false` (see
[Data security](/annotate/projects/security-settings)), the desktop never
creates an `OfflineProjectPref` for it — the project is invisible
to the desktop's sync loop.

## SyncRun

Audit table — one row per sync invocation:

- `started_at` / `completed_at`
- `user_id` (whose sync this was)
- `pull_count` / `push_count` (records moved)
- `errors` (JSON array of per-record errors)
- `status` (`success` / `partial` / `failure`)

The desktop's "Sync status" UI reads from this table for the
operator-visible log.

## The sync loop

When the desktop is **online** + the user is signed in, the sync
loop runs:

1. **Pull** — for each project the user has marked offline:
   1. List records changed since `last_pulled_at`
   2. Fetch the changed records
   3. Apply to local SQLite
   4. Update `last_pulled_at` on each `SyncMeta`
2. **Push** — for each local record marked `dirty`:
   1. Send it to the cloud
   2. Cloud responds with the canonical version
   3. Apply any cloud-side fields (e.g. server-side IDs for new
      records)
   4. Clear `dirty`, update `last_pushed_at`

The loop runs:

- On a timer (default every 30s when online)
- Immediately on app launch / wake-from-sleep
- On user click of the "Sync now" button
- Triggered by `online` events (when reconnecting after offline)

## Conflict resolution

When the cloud's `version` is higher than the desktop's pending
push:

- **Three-way merge** for fields that don't conflict (e.g. cloud
  updated description, desktop updated annotations — both apply)
- **Cloud wins** for genuinely conflicting fields (same field
  edited on both sides — cloud's value persists; desktop's local
  edit is queued in the sync error log for operator review)

This is a simplification — for annotation submissions, the
desktop's submit is **always** preserved as a new annotation (it
never overwrites the cloud's). New annotations from offline work
appear in the cloud's task as additional annotations alongside
whatever's already there. Manager / Reviewer roles decide which
to accept.

## CloudProxyMiddleware

Desktop-only middleware. When an HTTP request hits the local
embedded Django (`localhost:18080`):

1. If the path is on the **proxy allowlist** (most reads / writes
   that the local mirror handles) — serve locally
2. If the path is **online-required** (e.g. ML backend predictions,
   cloud storage signed URL minting, audit log writes) — proxy
   the request to the configured cloud URL, return the cloud's
   response
3. If the proxy fails (offline) — return a structured error the
   SPA recognises ("This action requires connectivity")

The middleware lets the SPA stay platform-agnostic — it just makes
HTTP calls to `localhost:18080` regardless of whether the data
lives locally or remotely.

## Debugging sync

When a user reports "my offline work disappeared" or "my project
isn't syncing":

1. Open **Profile → Sync history** in the desktop. The user sees
   their recent `SyncRun` entries with status.
2. **Error column** for the failing run shows the truncated error;
   click to expand the full message.
3. Common errors:
   - `401 Unauthorized` — JWT expired and refresh token also
     expired. User needs to sign back in.
   - `409 Conflict on annotation N` — Cloud has a newer version of
     an annotation the desktop is trying to update. See the
     conflict-resolution notes above; rarely a problem because
     annotations are append-only.
   - `403 Forbidden` — Project's `allow_offline_for_annotators` was
     turned off after the desktop pulled it. Project disappears
     from the desktop on next sync.
   - Network errors (`ConnectionError`, `Timeout`) — the desktop
     keeps retrying; operator just needs to be online again.

For operator-level debugging (you on the cloud side, looking at
why a specific user's sync is failing), `SyncRun` is available via
the Django admin at `/admin/afri_sync/syncrun/`.

## Operator policies that affect sync

These are configured per-project (see
[Data security](/annotate/projects/security-settings)):

- `allow_offline_for_annotators` — gate
- `allow_offline_for_reviewers` — same for reviewers
- `allow_metadata_mirror` — strictest gate; without this even the
  project's existence is hidden from the desktop
- `allow_multi_device` — if false, pulling on a second device
  evicts the first
- `allow_multi_user_per_device` — if false, only one annotator can
  have this project on a given device

These are the levers operators have to control offline residency
without changing per-user behaviour.

## What's next

- **[Data security →](/annotate/projects/security-settings)** — the
  per-project toggles that govern what gets synced where
- **[Security model →](/annotate/platform-admin/security)** — how the desktop's local
  cache is encrypted at rest
- **[Mobile architecture →](/annotate/mobile/architecture)** — the
  cloud-first writes story (mobile uses a different model — outbox
  only, no full mirror)
