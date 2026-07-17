---
title: "Organisation overview"
sidebar_label: "Overview"
sidebar_position: 1
description: "What lives under Organization → in the sidebar — overview dashboard, activity feed, settings, members, consent, metrics, quality, review."
mdx:
  format: md
---

# Organisation overview

The **Organization** section in the sidebar is where org-level
work happens — beyond a single project, but scoped to one org.

Visible to every org member. Some tabs are role-gated (settings,
member management). See [Roles](/annotate/organization/roles) for who can do what.

## The pages

| Page | Sidebar entry | What it does |
|---|---|---|
| **Overview** | Organization → Overview | Dashboard summarising the org's state |
| **Projects** | Organization → Projects | List of every project in the org |
| **People** | Organization → Members | Members + invites — see [Members](/annotate/organization/members) |
| **Workspaces** | Organization → Workspaces | Project grouping — see [Workspaces](/annotate/organization/workspaces) |
| **Consent** | Organization → Consent | Consent library — see [Consent](/annotate/organization/consent) |
| **Metrics** | Organization → Metrics | Cross-project analytics — see [Metrics](/annotate/organization/metrics) |
| **Quality** | Organization → Quality | Cross-project agreement + evaluations — see [Agreement](/annotate/review-and-quality/agreement) |
| **Activity** | Organization → Activity | Audit-event feed scoped to this org |
| **Review** | Organization → Review | Cross-project review queue |
| **Settings** | Organization → Settings | Org name, branding, defaults |

## Overview dashboard

The first page when you click into the org. Shows:

- **Counts**: members, projects (active + archived), total tasks,
  total annotations
- **Active projects**: the 5 most-recently-updated projects, with
  task / annotation counts + last activity timestamp
- **Recent activity**: last 10 audit events (joins, new projects,
  consent signatures) — abbreviated; full feed at **Activity**
- **Annotator leaderboard**: top 5 annotators by submissions in
  the last 30 days

Useful as a quick "where is the org" view for managers + owners
before diving into specific projects.

## Activity feed

**Organization → Activity** opens the **audit-event feed** scoped
to this org. Every event that touched a record in this org lands
here:

- User events: members added / removed / role-changed, consent
  signed / revoked
- Project events: created / archived / deleted / config changed
- Annotation events: submitted (in aggregate — not every single
  one), reviewed
- Storage events: cloud-storage connection added / removed
- Webhook events: webhook fired (with response status)

Each row shows: action type, actor (who), target (what), time, +
a "details" expand for the `meta` JSON.

Filterable by action type / actor / date range. Exportable to CSV
for compliance audits.

For platform-level audit log (cross-org), see
[Platform → Audit log](/annotate/platform-admin#audit-log).

## Review (cross-project)

**Organization → Review** is the **cross-project review queue** —
a single landing page for reviewers who work across multiple
projects.

Aggregates the per-project review queues into one. Useful for:

- Lead reviewers who oversee multiple projects
- Reviewers who want to pick from the org's full backlog rather
  than enter one project at a time
- Bulk-assign workflows ("assign these tasks across these three
  projects to this reviewer")

Same filters as per-project review queues (by agreement, by model
confidence, by annotator). Per-project review settings still
apply — this page is just a UI aggregator.

## Settings

**Organization → Settings**.

Org-level configuration. Visible to **Owner** and **Admin**:

- **General**: org name, description, contact email
- **Defaults**: defaults applied to new projects — labelling
  config templates, security templates, consent requirements
- **Integrations**: org-wide MLBackend or webhook defaults
- **Session policy**: link to the [Session policy](/annotate/platform-admin/session-policy)
  page (the actual config lives there)
- **Danger Zone**: rename org, **transfer ownership** (see below),
  delete org

### Transferring ownership

The Owner role can be reassigned to another active org member —
**Organization → Settings → Danger Zone → Transfer ownership**:

1. Pick a current org member (Admin role recommended)
2. Confirm — the previous Owner is automatically demoted to Admin
3. The new Owner inherits all Owner-level permissions; the old
   Owner keeps everything except Owner-only actions (billing,
   delete-org)

Useful for handovers when the original Owner leaves the team or
needs to step back. The transfer is logged in the audit log
(`action = org.ownership_transfer`).

Some settings here are also editable at the **platform** level by
the platform owner — when both are set, the project-level wins,
then the org level, then the platform default.

## Models

**Organization → Models** lists every ML backend registered at
the org level (rather than the project level).

Org-level models are reusable — link one ML backend to multiple
projects without re-registering. The detail page mirrors the
per-project ML backend settings; see
[ML backend](/annotate/projects/ml-backend) for the full setup flow.

## What's next

- **[Members →](/annotate/organization/members)** — managing who's in the org
- **[Workspaces →](/annotate/organization/workspaces)** — grouping projects within the org
- **[Consent library →](/annotate/organization/consent)** — managing org-wide consent
- **[Metrics →](/annotate/organization/metrics)** — analytics dashboards
- **[Roles →](/annotate/organization/roles)** — permission matrix for each role
