---
title: "Labels Manager"
sidebar_label: "Labels Manager"
sidebar_position: 4
description: "Reusable label sets across projects — define a label library once, link it to multiple projects, change the canonical value in one place."
mdx:
  format: md
---

# Labels Manager

The **Labels Manager** is an org-level label library that lets you
define a set of labels once and reuse them across projects. Useful
when several projects share an ontology (e.g. "PII categories",
"sentiment values", "African-language POS tags") and you want one
canonical source of truth.

Without Labels Manager, every project's `<Labels>` / `<Choices>`
list is hard-coded into its XML — meaning a label-naming change has
to be made N times if N projects use it.

## Where it lives

**Organization → Labels Manager** in the sidebar. Visible to org
**Owner**, **Admin**, and **Manager**.

## Concepts

Two model types:

- **Label** — a single label entry. Has a `value` (the string the
  XML uses), a `title` (optional human-friendly display), and an
  optional `description` (tooltip shown to annotators).
- **LabelLink** — joins a Label to a project's specific `<Labels>`
  / `<Choices>` tag. A label can be linked into many projects via
  many LabelLinks. Editing the Label updates everywhere it's linked.

So the model is:

```
   Label "POSITIVE"                  Project A
   ─────────────────                 ──────────
      value: "POSITIVE"        ┌──── tag: <Choices name="sent">
      title: "Positive"       ─┤
      description: "..."       └──── Project B
                                     ──────────
                                     tag: <Labels name="kind">
```

Two LabelLinks — same label, two projects.

## Create a label

1. **Organization → Labels Manager → + New label**
2. Fill in:
   - **Value** — the literal string used in XML and stored in
     annotation results (e.g. `POSITIVE`)
   - **Title** — optional display label shown to annotators
     (e.g. `Positive sentiment`)
   - **Description** — optional tooltip / help text
   - **Color** — hex; defaults to a generated one based on the
     value's hash
   - **Hotkey** — optional keyboard shortcut hint
3. Click **Save**

The label now exists in the library — but isn't linked to any
project yet.

## Link to a project

Two ways:

### From Labels Manager

1. Find the label in the library
2. Click **Link to project**
3. Pick the project + the specific `<Labels>` / `<Choices>` tag in
   that project's XML
4. Save

### From the project's labeling config

1. Open **Project → Settings → Labeling Interface**
2. In the visual editor, click the **+** next to an existing
   `<Labels>` block
3. Pick **Link from library** instead of **New label**
4. Search + pick from the library

## Editing labels

Changes to a Label propagate to **every linked project**
immediately:

- Renaming the title or updating the description — annotators see
  the new copy on next labeling-stream open
- Changing the color — visible everywhere
- Changing the **value** — risky. The literal string in
  annotation `result.value` doesn't change retroactively; existing
  annotations keep their old value. New annotations use the new
  value. To rename annotation values, you need a data migration on
  exports (the platform doesn't auto-rewrite history)

The "value can't be changed safely" caveat is the main reason
operators pick a value carefully upfront. Title and description
edits are safe.

## Archive a label

If a label is retired, archive rather than delete:

1. Open the label
2. Click **Archive**

Archive removes it from the **+ Add label** picker in linked
projects' labeling configs but keeps existing LabelLinks intact.
Annotations on existing tasks still display the archived label
correctly; new tasks can't pick it.

Hard-delete is only available after every LabelLink has been
removed.

## Why use it

A few common scenarios:

### Shared ontologies across orgs

Your org runs five sentiment-analysis projects on five different
text corpora. Without Labels Manager, you'd hard-code `POSITIVE` /
`NEUTRAL` / `NEGATIVE` into each project's XML. Six months later
you decide to add `MIXED` — you'd have to edit five XMLs.

With Labels Manager, you add `MIXED` to the library once. Every
linked project picks it up.

### Hierarchical taxonomies

Your team labels animals with a 3-level taxonomy (kingdom →
phylum → species, with hundreds of entries). Maintaining that as
inline XML is painful. As a library, you define each label once,
then link the full taxonomy into every project that needs it.

### Per-project subsets

Sometimes a project needs only a subset of an org-level ontology.
The Labels Manager UI supports **groups** — a named subset of
labels in the library that can be linked together. A project links
to the group, not individual labels.

## API

Labels Manager is exposed via REST:

```bash
# List labels in an org
curl "https://label.afriannotate.org/api/organizations/<id>/labels" \
  -H "Authorization: Bearer YOUR_PAT"

# Create a label
curl -X POST "https://label.afriannotate.org/api/organizations/<id>/labels" \
  -H "Authorization: Bearer YOUR_PAT" \
  -d '{"value": "POSITIVE", "title": "Positive", "color": "#16A34A"}'

# Link to a project
curl -X POST "https://label.afriannotate.org/api/projects/<project-id>/label-links" \
  -H "Authorization: Bearer YOUR_PAT" \
  -d '{"label_id": 42, "tag_name": "sent"}'
```

## When NOT to use Labels Manager

For projects with **one-off, project-specific labels** that won't
ever be reused, inlining in XML is fine. Labels Manager has a
small overhead — every label needs a row in the database, every
link adds a join. For 5-label classification projects that don't
share labels with anything else, hard-coded XML is simpler.

## What's next

- **[Labeling config →](/annotate/labeling-config/overview)** — XML grammar
- **[Tag reference →](/annotate/labeling-config/tags/labels)** — the `<Labels>` tag
- **[Templates →](/annotate/labeling-config/templates)** — starter labeling configs with
  pre-filled labels you can promote to library entries
