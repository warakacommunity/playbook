---
title: "Management commands"
sidebar_label: "Management commands"
sidebar_position: 9
description: "Django management commands operators can run for housekeeping, recompute, backfill, and scheduled job triggers."
mdx:
  format: md
---

# Management commands

Operator-facing CLI commands for housekeeping, backfills, and
manually triggering scheduled jobs. Run via `manage.py` (or
`docker exec ... manage.py` if your platform runs in a container).

Most operators interact with these through their orchestrator
(Cloud Run jobs, cron, Kubernetes CronJob) rather than running
them by hand — but it's worth knowing what's available for
debugging + one-off operations.

## Quality + agreement

### `run_auto_suspend_rules`

Manually trigger an evaluation pass of every active
[auto-suspend rule](/annotate/organization/auto-suspend) across all orgs.
Normally runs as a 24-hour scheduled job; run it directly if you
want to validate rule behaviour or kick a delayed run.

```bash
python manage.py run_auto_suspend_rules
```

Flags:
- `--org-id <N>` — limit to a specific org
- `--dry-run` — report which members would be suspended without
  actually suspending. Useful when rolling out a new rule

### `backfill_agreement`

Recompute `Task.precomputed_agreement` for tasks that don't have
a score yet (or whose score is stale after a metric change).

```bash
python manage.py backfill_agreement --project <N>
```

Useful after:
- Changing a project's agreement metric
- Importing historical annotations that didn't trigger live
  computation
- A bug-fix to an agreement-metrics function (rescore everything)

### `detect_label_drift`

Scan a project's annotations and flag tasks where label-frequency
distributions have shifted significantly over time — useful for
catching cases where annotators' interpretation of "POSITIVE"
drifted over months without anyone noticing.

```bash
python manage.py detect_label_drift --project <N> --window 30d
```

Output: CSV of (annotation_id, drift_score, suggested_review).
Operators can feed this into the review queue.

## Housekeeping

### `expire_pending_invites`

Hard-delete invite records that are older than the org's invite-
expiry policy + grace window. Usually runs as a 24-hour job;
run by hand if your invite table is bloated.

```bash
python manage.py expire_pending_invites
```

### `send_inactivity_reminders`

Send email reminders to org members who haven't logged in for N
days. Usually runs as a 24-hour job; run by hand for testing.

```bash
python manage.py send_inactivity_reminders --days 14 --dry-run
```

Dry-run shows who would receive a reminder without sending.

### `annotations_fill_updated_by`

One-time migration helper that backfills `Annotation.updated_by`
for historical annotations imported before that field existed.
Idempotent. Useful when upgrading from a very old version.

```bash
python manage.py annotations_fill_updated_by
```

### `calculate_stats` / `calculate_stats_all_orgs`

Recompute task / annotation aggregate stats stored on `Project` +
`Organization` records. Normally maintained live by signals; the
command is for fixing drift after a manual database edit or
migration.

```bash
python manage.py calculate_stats --project <N>
python manage.py calculate_stats_all_orgs   # every org, every project
```

## Deployment + infrastructure

### `locked_migrate`

Wrapper around `migrate` that takes an advisory database lock
before running. Use on multi-instance deployments (Cloud Run with
min-instances > 0, Kubernetes Deployments with replicas > 1)
where two pods could otherwise race to apply migrations.

```bash
python manage.py locked_migrate
```

Behaves identically to `migrate` if no other instance is running;
otherwise waits for the lock holder to finish. Mandatory on Cloud
Run with `--max-instances > 1`.

### `show_async_migrations`

List in-flight async migrations + their progress. Some migrations
run as background workers (tracked in the `AsyncMigrationStatus`
table); this command surfaces them.

```bash
python manage.py show_async_migrations
```

Useful when `migrate` finishes instantly but the platform's still
catching up on a big backfill behind the scenes.

### `send_test_email`

Send a test email to verify SMTP wiring without going through the
signup / forgot-password flow.

```bash
python manage.py send_test_email you@example.com
```

Reads the standard `EMAIL_HOST` / `EMAIL_HOST_USER` /
`EMAIL_HOST_PASSWORD` env vars (see [Email delivery](/annotate/platform-admin/email)) and
sends a fixed-template message. If you don't receive it, your SMTP
isn't wired correctly — the first diagnostic when "the platform
doesn't send mail."

## Org lifecycle

### `destroy_organization`

Hard-purge an org + everything under it (projects, tasks,
annotations, member rows). Bypasses the 30-day retention window.

```bash
python manage.py destroy_organization --org-id <N> --confirm
```

`--confirm` is mandatory (no accidental nukes). Use for testing
deployments where seed orgs need cleaning up, or for compliance-
mandated immediate-purge requests. Logs a final
`org.destroyed_by_admin` audit event.

### `seed_sample_projects`

Bootstrap a fresh platform with example projects — text
classification, NER, image bounding box, audio transcription, and
a multi-modal example.

```bash
python manage.py seed_sample_projects --org-id <N>
```

Uses synthetic data from a small bundled corpus; nothing leaves
the deployment. Useful for demo platforms + giving operators a
starting point to explore the UI.

### `seed_testers`

Pre-create N tester accounts in a target org. Each gets a
generated email + auto-set password printed to stdout at the end.

```bash
python manage.py seed_testers --org-id <N> --count 5
```

Useful for demo deployments, integration tests, or practising the
onboarding-flow without spamming real inboxes.

## Sync (desktop)

### `afri_sync_pull`

Manually trigger a pull from the cloud into the local SQLite
mirror on a desktop install. Only useful on the desktop runtime;
no-op on the cloud Django.

```bash
python manage.py afri_sync_pull
```

Useful when a sync is stuck and you want to force-restart the
pull loop. The same primitive runs as part of the desktop's
scheduled sync.

## Background jobs (RQ / Celery)

Beyond explicit management commands, several jobs run continuously
as RQ workers:

- **`auto_suspend_rules_daily`** — wraps `run_auto_suspend_rules`;
  enqueues itself every 24 h
- **Agreement precomputation** — fires on annotation submit;
  computes per-task agreement and updates `Task.precomputed_agreement`
- **Webhook delivery** — fires on subscribed events; handles retries
  + dead-letter
- **Export snapshot** — generates the requested format async; user
  polls for `status: completed`
- **Email send** — every transactional message goes through this queue

Monitor via RQ Dashboard (`/django-rq/`, staff-only) or your
Celery monitor of choice.

## How operators should use this page

Three patterns:

1. **Wire into orchestration** — set up Cloud Run jobs / Kubernetes
   CronJobs that run `run_auto_suspend_rules`,
   `expire_pending_invites`, `send_inactivity_reminders` on a 24h
   schedule. The reference cloud uses Cloud Run jobs with cron
   triggers.
2. **One-off backfills** — when you import historical data or
   change a metric, run `backfill_agreement` to bring everything
   into sync.
3. **Debugging** — when "the auto-suspend rules don't seem to be
   firing," run `run_auto_suspend_rules --dry-run` to see what
   the system would have done.

## What's NOT a management command

- **Project / annotation creation** — these are user actions; use
  the API
- **Bulk delete / archive** — use the Data Manager UI or API; the
  CLI doesn't reach into user workspaces
- **Auth + session ops** — use the user-facing flows; CLI doesn't
  have password-reset etc.

The CLI is for operator-level housekeeping, not application logic.

## What's next

- **[Auto-suspend →](/annotate/organization/auto-suspend)** — the rule
  system `run_auto_suspend_rules` evaluates
- **[Agreement metrics →](/annotate/review-and-quality/agreement)** — what
  `backfill_agreement` recomputes
- **[Offline sync →](/annotate/platform-admin/offline-sync)** — what `afri_sync_pull`
  triggers
