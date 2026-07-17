---
title: "Metrics dashboard"
sidebar_label: "Metrics dashboard"
sidebar_position: 5
description: "Organisation- and project-level dashboards for task counts, annotation velocity, contributor leaderboards, agreement, and activity feeds."
mdx:
  format: md
---

# Metrics dashboard

AfriAnnotate ships dashboards at two levels:

- **Organisation metrics** — across all projects in the org. Useful
  for org admins doing capacity planning, contributor leaderboards,
  monthly reporting.
- **Project metrics** — scoped to one project. Useful for project
  managers monitoring annotation velocity, lead times, agreement
  trends.

This is an AfriAnnotate-specific surface — built-in dashboards
beyond what upstream Label Studio provides out of the box.

## Where they live

- **Organisation → Metrics** in the sidebar. Visible to any org
  member (Manager + above for write actions; Annotator / Reviewer
  read-only).
- **Project → Dashboard** in the project view. Visible to any
  project member.

## What's on the organisation dashboard

Six panels across the top of the org Metrics page:

| Panel | What it shows |
|---|---|
| **Overview** | Active members, total projects, total tasks, total annotations — all-time, last 30 d, last 7 d |
| **Timeseries** | Day-by-day annotation counts, stacked by project. Configurable bucket (day / week / month) and range (7 / 30 / 90 d / custom) |
| **Contributors** | Top-N annotators by annotation count, with median lead time + 30-d trend |
| **Activity feed** | Recent audit events across the org — joins, role changes, project creates, etc. |
| **Evaluations** | Per-annotator agreement summary — mean agreement score, tasks scored, trend |
| **Label distribution** | Heatmap of which labels are being applied across the org's projects |

Each panel has an **Export CSV** button. Time-bucketed panels also
have a JSON export for piping into BI tools.

## What's on the project dashboard

Four panels:

| Panel | What it shows |
|---|---|
| **Overview** | Tasks, annotations, completion %, reviewer accept rate |
| **Timeseries** | Day-by-day annotation counts for this project, optionally stacked by annotator |
| **Annotators** | Leaderboard of annotators on this project — count, lead time, agreement, skip rate |
| **Agreement** | Distribution of `precomputed_agreement` scores across tasks (see [Agreement metrics](/annotate/review-and-quality/agreement) for what populates these) |

## Query semantics

All metric endpoints accept these query parameters:

- `range=24h | 7d | 30d | 90d | all` — convenience range presets
- `from=<iso> & to=<iso> & bucket=day|week|month` — explicit range
  + bucket size

If both `range` and `from/to` are passed, `from/to` wins.

### Time-zone handling

Buckets are computed in the requesting user's local time zone (read
from `User.timezone`). A "day" bucket means a calendar day in that
user's zone, not UTC. If you're piping multiple users' exports
together, set `tz=UTC` to force UTC buckets.

### Org-level cross-tenancy

Org dashboards are scoped to the user's **active organisation**.
Platform staff (`is_staff = True`) see an "All organisations"
toggle that includes every org in the platform — for cross-tenant
KPIs at the platform-owner level.

## API

Every dashboard panel has a corresponding endpoint:

### Organisation endpoints

```bash
# Overview KPIs
curl "https://label.afriannotate.org/api/organizations/<id>/metrics/overview?range=30d" \
  -H "Authorization: Bearer YOUR_PAT"

# Timeseries
curl "https://label.afriannotate.org/api/organizations/<id>/metrics/timeseries?range=90d&bucket=day" \
  -H "Authorization: Bearer YOUR_PAT"

# Contributors
curl "https://label.afriannotate.org/api/organizations/<id>/metrics/contributors?range=30d" \
  -H "Authorization: Bearer YOUR_PAT"

# Activity feed (audit events)
curl "https://label.afriannotate.org/api/organizations/<id>/metrics/activity?limit=50" \
  -H "Authorization: Bearer YOUR_PAT"

# Per-annotator evaluations
curl "https://label.afriannotate.org/api/organizations/<id>/metrics/evaluations" \
  -H "Authorization: Bearer YOUR_PAT"

# Export evaluations as CSV
curl "https://label.afriannotate.org/api/organizations/<id>/metrics/evaluations/export" \
  -H "Authorization: Bearer YOUR_PAT" \
  -o evaluations.csv

# Label distribution heatmap
curl "https://label.afriannotate.org/api/organizations/<id>/metrics/label-distribution" \
  -H "Authorization: Bearer YOUR_PAT"
```

### Project endpoints

```bash
# Project overview
curl "https://label.afriannotate.org/api/projects/<id>/metrics/overview?range=30d" \
  -H "Authorization: Bearer YOUR_PAT"

# Project timeseries
curl "https://label.afriannotate.org/api/projects/<id>/metrics/timeseries?range=30d&bucket=day" \
  -H "Authorization: Bearer YOUR_PAT"

# Project annotator leaderboard
curl "https://label.afriannotate.org/api/projects/<id>/metrics/annotators?range=30d" \
  -H "Authorization: Bearer YOUR_PAT"

# Project agreement distribution
curl "https://label.afriannotate.org/api/projects/<id>/metrics/agreement" \
  -H "Authorization: Bearer YOUR_PAT"
```

All endpoints return JSON. Time-bucketed responses use ISO 8601
date strings as bucket keys for easy parsing.

## Performance notes

- **Overview** + **Activity feed** are fast (< 100 ms) on any
  reasonable database size — they read from indexed counts.
- **Timeseries** + **Contributors** + **Evaluations** are mid-
  weight (~500-1500 ms on a 1M-annotation database) — they run a
  GROUP BY over the annotations table.
- **Agreement distribution** can be slow on large projects — it
  reads `Task.precomputed_agreement` which is computed at
  annotation-submit time, so the dashboard reads are O(tasks), not
  O(annotations).

If a project has > 100k tasks and the agreement panel takes > 10 s,
consider raising the `precompute_agreement_async_threshold` setting
in **Platform → Settings** — that pushes the precompute to a
background worker so the foreground stays snappy.

## Caching

Org overview + activity panels are cached for **60 seconds** on the
server side. Hard-refresh (Cmd-Shift-R / Ctrl-Shift-R) bypasses the
cache when you've just made a change you want to see immediately.

## Embedding metrics elsewhere

The metric endpoints are public-ish JSON — any tool that can hit an
authenticated URL + parse JSON can ingest them. Common patterns:

- **Slack daily digest** — a cron that hits the overview endpoint
  once a day and posts the count delta to a Slack channel
- **Grafana dashboard** — point Grafana at the timeseries endpoints
  via the JSON-API plugin
- **Internal BI** — schedule a Cloud Function to pull the CSV
  exports nightly and pipe to your warehouse

The endpoints don't currently emit Prometheus-format metrics
directly; if that's important, write a thin adapter that reformats
them.

## What's next

- **[Agreement metrics →](/annotate/review-and-quality/agreement)** — what
  populates the agreement panel, including the custom-metric registry
- **[Members →](/annotate/organization/members)** — manage who counts as an org
  contributor
- **[Roles →](/annotate/organization/roles)** — what each role can see on the dashboard
