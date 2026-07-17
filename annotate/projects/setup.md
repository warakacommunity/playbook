---
title: "Create a project"
sidebar_label: "Create a project"
description: "Create and configure data-labeling projects on AfriAnnotate."
sidebar_position: 1
mdx:
  format: md
---

# Create a project

Every labeling activity in AfriAnnotate happens inside a **project**.
A project owns:

- A **labeling configuration** (the XML that defines what tags
  annotators see).
- A **dataset** of tasks (your imported data).
- A **workspace** assignment (or "unassigned" at the org root).
- A set of **members** with per-project roles (annotator, reviewer,
  manager).
- Optional **review** + **quality** settings.

You need permission to create projects: **Owner**, **Admin**, or
**Manager** in your organisation. Annotators and reviewers don't see
the **Create Project** button.

## Quick path (the wizard)

The fastest way is the three-step wizard:

1. From the home page or sidebar, click **+ Create Project**.
2. **Name** the project. Optional: add a description, pick a workspace,
   pick a colour. The name is what shows up in the sidebar — keep it
   short.
3. **Labeling setup** — pick a template (Text Classification, Named
   Entity Recognition, Image Bounding Box, Audio Transcription, etc.)
   or write your own XML config from scratch.
4. **Data import** — drag in CSVs, JSON, images, audio. AfriAnnotate
   parses the file headers + warns inline if any of the labeling
   config's required `$varname` keys are missing from the uploaded
   data.
5. Click **Save**.

The project is now live and you're on its dashboard.

:::tip Validation gate
If the wizard shows a per-file warning like "Missing fields: $image"
on an uploaded card — the upload is fine but the labeling config
expects a field that file doesn't have. Either edit the data so it
has the column, or adjust the labeling config to match the data's
column names. The **Save** button stays disabled until the mismatch
is resolved.
:::

## Detailed walkthrough

### 1. Naming + workspace

- **Name** is required, max 250 chars, must be unique within your
  organisation.
- **Description** is optional; surfaced on the project list card.
- **Workspace** groups related projects. Use workspaces for
  campaigns, languages, or whatever your team's natural unit is.
  See [Workspaces](/annotate/organization/workspaces).
- **Colour** is purely visual; it tints the project's card on the
  home page + the dashboard chrome.

### 2. Labeling setup

You have two paths:

**Templates** — pick from the curated list by data type (Text, Image,
Audio, Video, Time Series, Multi-modal, HTML, PDF, structured data).
Each template is a working starter you can tweak. The visual editor
on the right shows what annotators will see; the XML on the left is
the source.

**Custom config** — start from a blank `<View>` and add tags from the
[tag library](/annotate/labeling-config/overview). The visual editor
re-renders as you type valid XML.

You can save reusable starters as **org templates** so other project
owners in your organisation can re-use them. See [Labeling
config](/annotate/labeling-config/overview).

### 3. Data import

Three ways to get data in:

- **Drag-drop** files (one or many) — supports CSV/TSV, JSON, JSONL,
  TXT, plus media (images / audio / video / PDF).
- **Paste a URL** — fetches a single dataset from a publicly-reachable
  HTTPS endpoint.
- **Cloud storage** — connect a GCS/S3/Azure bucket from project
  settings AFTER initial creation. See
  [Cloud storage](/annotate/data-import/cloud-storage).

For CSVs, the wizard asks: **treat as a list of tasks** (one row per
task, columns = data fields) or **as time series** (the whole file
is one task). Get this wrong and the labeling config sees the wrong
columns; the per-file validation card flags it.

### 4. Save

Save commits the project + flips the draft flag. The wizard hides
itself and you land on the project dashboard.

:::info First save
Up to this point the project is in a draft state — no annotators
see it, no tasks have been ingested. The wizard would have created
a hidden draft project as soon as you opened it, which is why
abandoning the wizard (Cancel or close-tab) reliably cleans up
behind you. If you see ghost projects in your list, see
[Troubleshooting](/annotate/troubleshooting).
:::

## After creation: project settings

From the project dashboard, **Settings** opens the per-project
config:

- **General** — name, description, workspace, colour, archive.
- **Labeling Interface** — edit the XML config live.
- **Instructions** — markdown shown to annotators (and reviewers).
- **Annotation** — sampling order, per-annotator task budget,
  maximum annotations per task, skip behaviour.
- **Quality** — review workflow, agreement metrics, accept-/reject
  pipeline.
- **Members** — add team members to the project + set their per-
  project role.
- **Cloud Storage** — connect GCS/S3/Azure for tasks + uploaded
  files. Source storage feeds tasks in; target storage exports
  annotations out.
- **Webhooks** — fire HTTP POSTs on project events (task created,
  annotation submitted, etc.).
- **Danger Zone** — archive or delete the project.

## Common gotchas

**The Save button is greyed out.**
See the [FAQ](/annotate/faq#the-save-button-is-greyed-out-in-the-project-create-wizard)
for the gating rules.

**Data Import tab is disabled.**
You haven't picked a labeling configuration yet. Pick one in the
Labeling Setup tab first.

**Project doesn't appear in my list.**
You're probably looking at a different organisation. The org
switcher is in the bottom-left of the sidebar — switch orgs and
re-check. Projects belong to ONE org and don't appear across orgs.

## What's next

- **[Labeling config →](/annotate/labeling-config/overview)** — XML reference,
  templates, the visual editor
- **[Data import →](/annotate/data-import/tasks)** — supported formats,
  pre-annotations, predictions
- **[Members + roles →](/annotate/organization/members)** — adding people
  to the project
- **[Review workflow →](/annotate/review-and-quality/overview)** — assign
  reviewers, agreement metrics, accept/reject
