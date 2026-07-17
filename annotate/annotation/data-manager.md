---
title: "Data Manager"
sidebar_label: "Data Manager"
sidebar_position: 3
description: "The tabular view of every task in a project — filter, sort, bulk-assign, bulk-export, drill into individual tasks."
mdx:
  format: md
---

# Data Manager

The **Data Manager** is the tabular view of every task in a project.
It's where annotators pick tasks to work on, reviewers assign tasks,
and managers do bulk operations.

Click any project → **Data Manager** in the tab strip (this is the
default landing page when you open a project).

## What's on the page

Three regions:

- **Header bar** at the top — search box, view tabs, action menu,
  count
- **Table** in the middle — one row per task, configurable columns
- **Selection footer** at the bottom — appears when rows are
  selected; bulk actions

## Columns

The default columns:

| Column | What it shows |
|---|---|
| **ID** | Task ID — clickable, opens task preview |
| **Annotations** | Count of human annotations on this task |
| **Predictions** | Count of model-produced pre-annotations |
| **Comments** | Count of unresolved comments |
| **Created at** | Task creation timestamp |
| **Updated at** | Most recent annotation update |
| **Status** | Unassigned / In progress / Submitted / Reviewed / Accepted / Rejected |
| **Reviewers** | Reviewer assignments (if review workflow is enabled) |
| **Agreement** | Pre-computed annotation agreement (see [Agreement metrics](/annotate/review-and-quality/agreement)) |

Plus one **dynamic column per data field** in the project's task
schema — for an Image+Text project you'll see `image` and `text`
columns surfacing the actual values.

### Configure columns

Click the **⚙ icon** in the column header → toggle visibility of any
column. Drag column headers to reorder.

The configuration persists per-user per-project (so different team
members can have different views).

## Tabs (saved views)

A **tab** is a saved combination of filters + sort + columns. Useful
for recurring queries like "all tasks I've skipped" or "all tasks
awaiting review."

Default tab: **All tasks** — every task, default columns, no filter.

### Create a tab

1. Apply the filters / sort / columns you want
2. Click **+ New tab** in the tab strip
3. Name it (e.g. `My skipped tasks`)
4. Save

The tab's URL is shareable — paste it into Slack and a teammate who
opens it sees the same filters applied (assuming they have access
to the project).

### Tab visibility

Tabs you create are **private by default** (visible only to you).
Managers + admins can flip a tab to **shared** so the whole team
sees it.

## Filters

Click **+ Add filter** to add one. Each filter has:

- **Column** — which column to filter on
- **Operator** — comparison (equals, contains, between, before,
  after, is empty, is not empty, etc.)
- **Value(s)** — the comparison value(s)

Multiple filters AND together. For OR semantics, save two separate
tabs.

Common filters:

- **Status = Submitted** — what's been submitted but not yet reviewed
- **Annotations = 0** — unlabeled tasks
- **Annotations > 0 AND Reviewers IS EMPTY** — awaiting assignment
- **Updated at > 7 days ago** — stale tasks
- **Agreement < 0.5** — disputed tasks (low inter-annotator agreement)

## Sort

Click any column header to sort by that column. Click again to
reverse. Shift-click another header to add a secondary sort.

Sort + filter both persist in the URL — the URL is the
canonical-state representation of the view, so reloading the page
keeps your view intact.

## Bulk actions

Select rows via the leftmost checkbox column (or check the header
checkbox to select all visible rows). The **selection footer**
appears at the bottom with these actions:

| Action | What it does |
|---|---|
| **Label N tasks** | Open the labeling stream pre-filtered to these tasks. Useful when you've filtered down to "tasks I haven't touched" and want to label them all sequentially |
| **Assign reviewers** | Bulk-assign reviewers to selected tasks. Picks from project member list |
| **Delete annotations** | Delete every annotation on selected tasks. Tasks stay; annotations don't. Confirmation modal |
| **Delete tasks** | Delete the tasks themselves. Annotations cascade. Manager + above only. Confirmation modal |
| **Set ground truth** | Promote each task's primary annotation to ground truth (used by [agreement metrics](/annotate/review-and-quality/agreement)) |
| **Export** | Snapshot the selected tasks to a downloadable file in your chosen format. See [Data export](/annotate/data-import/export) for formats |

**Note**: "Select all visible" only picks tasks in the current
table page (default 30). To act on more tasks than the page shows,
use the **Select all matching filter** option in the footer — it
selects every task that matches the current filter, even ones not
on screen.

## Task preview

Click a task's ID (or row, anywhere outside a checkbox) to open the
**task preview** in a side panel. The preview shows:

- The task's `data` JSON
- Every annotation on the task (tabs at the top, one per annotator)
- Every prediction (model-produced pre-annotations)
- Comments thread
- Audit log entries

The preview is the operator's way to spot-check a task without
opening the full labeling stream.

## Workspaces + cross-project view

The Data Manager is **per-project**. To see tasks across multiple
projects, go to **Organization → Tasks** (cross-project search,
limited columns).

For workspace-scoped task views, the workspace landing page lists
projects but doesn't aggregate their tasks; the per-project Data
Manager is the right destination for task-level work.

## Performance

Data Manager pages a limited slice of tasks at a time (default 30
per page). The total count at the top of the table reads from a
pre-computed value on the project, refreshed every annotation
submit. Large projects (> 100k tasks) work fine — filtering +
sorting hit indexed columns. Pagination + a high `page_size` query
parameter let you walk the full dataset programmatically.

## API

The Data Manager UI is a thin shell over the REST API at
`/api/projects/<id>/tasks/`. Anything you can do in the UI you can
do via the API:

```bash
# List tasks with filters
curl "https://label.afriannotate.org/api/projects/<id>/tasks/?status=submitted&page=1&page_size=100" \
  -H "Authorization: Bearer YOUR_PAT"

# Bulk-delete annotations on filtered tasks
curl -X POST "https://label.afriannotate.org/api/projects/<id>/tasks/delete-annotations" \
  -H "Authorization: Bearer YOUR_PAT" \
  -d '{"filters": {"status": "rejected"}}'
```

See [API → Overview](/annotate/api/overview) for the full endpoint list.

## What's next

- **[Labeling guide →](/annotate/annotation/labeling)** — what happens when you click
  **Label All Tasks**
- **[Data export →](/annotate/data-import/export)** — exporting annotations
  out
- **[Review workflow →](/annotate/review-and-quality/overview)** — the
  reviewer side of Data Manager (assigning tasks for review)
