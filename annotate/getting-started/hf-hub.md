---
title: "Hugging Face Hub — import + push"
sidebar_label: "Hugging Face Hub"
description: "Import any Hugging Face dataset into a AfriAnnotate project, annotate normally, then push back three ways — fresh, enrich-source, or fork. Multi-dataset binding per project, aggregation strategies, provenance stamped on every task."
sidebar_position: 6
ready: true
mdx:
  format: md
---

# Hugging Face Hub — import + push

AfriAnnotate treats Hugging Face Hub as a first-class source and
sink for annotation data. This page walks through both directions:
importing a dataset into a project, and pushing annotations back.

## What you can do

- **Import** any public HF dataset into a project. Private and
  gated datasets work too if you paste a Hugging Face access token
  with `read` scope.
- **Push back three ways**: `fresh` (a brand-new dataset), `enrich-source`
  (add annotation columns onto the source repo — you need write
  access), or `fork` (source + annotations to your own repo).
- **Bind multiple HF datasets** to one project. Each binding has its
  own Unbind + Push controls; pushes can go to different repos
  independently.
- **Aggregate multi-annotator work** on push — pick `majority`,
  `first`, `adjudicator`, or `raw`. Output is a real
  `datasets.Dataset` with typed columns per label control-tag, not a
  raw JSON blob.
- **Everything provenance-stamped.** Every imported task carries
  `Task.meta.hf_dataset_id`, `hf_config`, `hf_split`, and
  `hf_row_index`. Every pushed dataset carries an SPDX license,
  consent summary, and annotator-language metadata in its dataset
  card.

## One-time setup — save your HF token

Third-party tokens are stored encrypted-at-rest via a Fernet field
keyed off `HF_TOKEN_ENCRYPTION_KEY`. API responses never return the
raw value — only a boolean `has_hf_token` flag.

1. Go to [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
   and create an access token with **read** scope (add **write** if
   you plan to `enrich-source` or `fork` into a repo you own).
2. In AfriAnnotate, open the **Contribute** editor for any
   project, or your **Profile → Integrations** page.
3. Paste the token into the **Hugging Face token** field and click
   **Save**. The audit log records the set with your actor, IP,
   timestamp, and the token's 3-char prefix — never the raw value.

You can also paste a per-project override token later — the token
input is inline on the **Project → Settings → Hugging Face** tab.

## Import a dataset into a project

The importer runs as a **3-tab wizard** at project creation time —
you can also add a new binding to an existing project via
**Project → Settings → Hugging Face → + Add binding**.

### Tab 1 — Dataset

1. Type the dataset ID (e.g. `masakhane/mafand`,
   `abumafrim/lafand-mt`, or `google/xtreme`).
2. Pick a config (if the dataset has multiple).
3. Pick a split — `train`, `validation`, `test`, or any custom split.
4. Set a row limit (leave blank for the full split). Useful for a
   pilot pass before you commit to labelling 50,000 rows.

### Tab 2 — Column mapping

The wizard shows a table of the HF dataset's columns on the left,
and your project's label config field names on the right. Map them
inline — rename the HF column, or point a HF column at a different
field name.

- **Media columns** (audio, image, video) — pick the HF column that
  holds the file / URL / bytes payload.
- **Text columns** — pick the HF column that holds the source text.
- **Metadata columns** — anything else can flow into `Task.meta`
  and be filtered on in the Data Manager.

### Tab 3 — Confirm

The wizard shows a preview of the first few rows with your column
mapping applied. Confirm to create the tasks. Each imported task
carries the provenance stamps (`Task.meta.hf_dataset_id`,
`hf_config`, `hf_split`, `hf_row_index`) so you can round-trip
cleanly on push.

## Annotate normally

Once tasks are imported, they behave like any other AfriAnnotate
task — RBAC, review queue, agreement metrics, auto-suspend rules,
consent flow, all apply. Nothing HF-specific in the annotation UI.

## Push annotations back

Push controls live on **Project → Settings → Hugging Face** below
each binding.

### Push mode

Pick one of three:

| Mode | What happens | When to use |
|---|---|---|
| **`fresh`** | Push to a brand-new HF dataset repo (either yours or an org's) with only the annotated rows and the annotation columns. | Fresh corpus release. The safe default. |
| **`enrich-source`** | Push annotation columns directly onto the source repo — the imported rows come back with their new labels attached. **Requires write access on the source repo.** | You own or co-own the source dataset and want the labelled version to be the canonical one. |
| **`fork`** | Push the source rows *plus* annotation columns to a new repo owned by you. | You don't own the source but want a labelled derivative under your own account. |

### Aggregation strategy

If the project is single-annotator, pick `raw`. For multi-annotator
projects, choose how to reduce N annotations per task into one
column value:

| Strategy | Behaviour |
|---|---|
| **`majority`** | Modal value per label control-tag. Ties broken by the earliest-submitted annotation. |
| **`first`** | First submitted annotation wins. |
| **`adjudicator`** | Reviewer-adjudicated value, if a reviewer has weighed in; else falls back to `majority`. |
| **`raw`** | No aggregation. Every task carries an array of per-annotator annotations, one row per annotator per task. |

Optional: enable **`_annotations` sidecar column** to preserve the
full per-annotator provenance alongside the aggregated column —
useful for downstream disagreement analysis without sacrificing the
clean labelled column.

### Column shape

Push output is a real `datasets.Dataset` with **typed columns per
label control-tag**. A `<Labels>` tag becomes a `Sequence[str]`
column; a `<Choices>` tag becomes a `ClassLabel` column; a
`<KBRef>` tag becomes a `Struct({external_id, label})` column; a
`<TypedFeature>` layer becomes a `Struct(<per-feature dtypes>)`
column. No raw JSON blobs — the schema is what a downstream `datasets`
consumer expects.

### Dataset card

Every push writes a `README.md` (dataset card) to the target repo
containing:

- The project's SPDX license (picked via the Licensing wizard).
- A consent summary derived from the accepted consent templates.
- Annotator language routing (which target language(s) this
  corpus was collected in).
- Aggregation strategy used on this push.
- The list of active bindings on the source project.

## Unbind and clean up

Each binding has an **Unbind** button on the same settings tab.
Unbind is destructive by default — it deletes the tasks and their
annotations that were imported through that binding. If you want
to keep the annotations, push first, then unbind.

For platform admins: a management command
`clean-orphaned-hf-tasks` sweeps orphaned tasks left behind by
mid-workflow failures. See
[Management commands](/annotate/platform-admin/management-commands) for
the runbook.

## Related pages

- [`<KBRef>`](/annotate/labeling-config/tags/kbref) — attach concepts from
  a Knowledge Base to imported HF text tasks for named-entity
  linking.
- [`<TypedFeature>`](/annotate/labeling-config/tags/typedfeature) — attach
  dtype'd attribute forms on top of HF-imported spans.
- [Licensing wizard](/annotate/projects/licensing) — pick the SPDX license
  that ships on your pushed dataset's card.
- [Consent library](/annotate/organization/consent) — which consent
  template's summary lands in the pushed dataset's card.
- [Python SDK](/annotate/api/sdk) — same import / push flow via
  `client.hub.import_()` and `client.hub.push()`.
