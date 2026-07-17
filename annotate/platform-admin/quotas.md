---
title: "Org quotas"
sidebar_label: "Org quotas"
sidebar_position: 8
description: "Per-organisation hard caps on members, projects, and tasks — useful for multi-tenant SaaS licensing or per-customer billing tiers."
mdx:
  format: md
---

# Organisation quotas

Per-organisation caps on resource consumption. Useful when the
platform hosts multiple tenants and operators need to enforce
different licensing tiers without writing a billing system from
scratch.

Configured per-org at **Platform → Orgs → click an org → Quotas**.

Visible to **Platform staff** only (`is_staff = true`).

## What can be capped

Three resource types:

| Resource | Field | Default |
|---|---|---|
| **Max members** | `max_members` | unlimited |
| **Max projects** | `max_projects` | unlimited |
| **Max tasks** (across all projects in the org) | `max_tasks` | unlimited |

Setting a value to `0` or empty means unlimited (default). Setting
to a positive integer enforces the cap.

## When a quota is enforced

Enforcement happens **at the mutation point**:

- **Add member** — checked when an org admin invites someone /
  pre-creates them. Over-cap → invite rejected with a clear error
- **Create project** — checked when **+ Create Project** is
  clicked. Over-cap → button shows "Project quota reached" and the
  modal explains how to increase
- **Import tasks** — checked at import time. Partial-batch handling:
  if importing 500 tasks brings the org over its 1000-task cap from
  900 current tasks, the import accepts the first 100 and rejects
  the rest with a structured error listing how many landed vs. how
  many were dropped

Counts:

- `max_members` counts active org members (suspended members count
  too; removed members don't)
- `max_projects` counts non-archived projects (archived projects
  don't count, so freeing quota by archiving is supported)
- `max_tasks` counts all tasks across all non-archived projects
  in the org

## Threshold notifications

When usage crosses **80%** of a quota, a notification fires:

- In-app banner for org owners + admins: "Your task quota is at
  82% (820 / 1000). Consider archiving completed projects or
  requesting a higher quota."
- Optional email to the org owner (configurable in
  **Platform → Settings → Quota notifications**)

When usage crosses **100%**, mutations are blocked (per the
enforcement rules above) and a different notification fires —
"Your task quota has been reached. New imports will fail until
you free space or upgrade."

## Increasing a quota

Org admins can't change their own quotas — that's a platform-staff
action. Three paths:

1. **Platform admin manually** — Platform staff opens **Platform →
   Orgs → org → Quotas** and edits the field
2. **Bulk increase via API** — useful for billing-system integrations:

   ```bash
   curl -X PATCH "https://label.afriannotate.org/api/organizations/<id>/quotas" \
     -H "Authorization: Bearer YOUR_STAFF_PAT" \
     -d '{"max_tasks": 10000}'
   ```

3. **Tier upgrade** (when wired to billing) — flipping the org's
   billing tier auto-sets quotas. The platform doesn't ship with
   a built-in billing system; operators wire this themselves via
   webhooks + the API

## What quotas DON'T cover

- **Storage** (GCS / S3 / Azure bytes) — not currently capped at
  the org level. Use cloud-provider quotas
- **API rate limits** — separate; see
  [Platform → Settings → Rate limits](/annotate/platform-admin#settings)
- **Compute** (ML backend predictions) — backend operators bill
  their own usage; AfriAnnotate doesn't proxy that
- **Annotators-per-project** — that's
  [`tasks_per_annotator_limit`](/annotate/projects/annotation-settings),
  configured per-project not per-org

## Use case: tiered SaaS

For a public SaaS deployment with Free / Pro / Enterprise tiers:

| Tier | Members | Projects | Tasks | Annual price |
|---|---|---|---|---|
| Free | 3 | 2 | 1000 | $0 |
| Pro | 20 | 20 | 100 000 | $500 |
| Enterprise | unlimited | unlimited | unlimited | per-customer |

Operator workflow: when a new org signs up via the public landing
page, set their quotas to Free defaults. On billing-system upgrade,
flip the quotas via API.

## Use case: internal cost-allocation

Even without a billing system, quotas are useful for **chargeback**:
allocate task budgets to internal teams, see which teams are
running over.

Combine with the **Metrics dashboard** export to feed quota usage
into your finance team's reporting.

## Audit log

Every quota change lands in the audit log with action type
`platform.quota_change` and the previous / new values, so finance
can prove "yes, you got upgraded to 100k tasks on this date."

## What's next

- **[Platform admin overview →](/annotate/platform-admin)** — the rest of the
  Platform section
- **[Metrics →](/annotate/organization/metrics)** — org-level usage
  reporting
- **[Auto-suspend →](/annotate/organization/auto-suspend)** — quality-
  driven org member management, complements quotas (which is
  consumption-driven)
