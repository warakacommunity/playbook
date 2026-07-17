---
title: "KBRef"
sidebar_label: "KBRef"
description: "Control tag — Attach a concept from a curated Knowledge Base to a region. Autocomplete search against the KB's entries (label, aliases, external_id). The standard building block for entity linking / concept grounding on top of NER-style span labels."
mdx:
  format: md
---

# `<KBRef>`

**Category:** Control tag · **AfriAnnotate-specific**

Lets an annotator attach a concept from a Knowledge Base to a region
(or to the whole task). Type into the search box; results autocomplete
against the KB's entries (label + aliases + external_id). Pick one and
the annotation stores the concept's `external_id` + `label` for later
downstream use.

This is the standard building block for **entity linking** / concept
normalisation / grounding — the layer that lives above plain NER. NER
answers *"is this a gene?"*; KBRef answers *"which specific gene is
this — HGNC:11998 or HGNC:11999?"* Standard for biomedical, legal,
historical, and cross-lingual annotation where consistent identifiers
matter more than raw text.

## Setup

Before you can reference a KB from a tag, create the KB itself:

1. Open **Organization → Settings → Knowledge Bases**.
2. Click **+ New KB** — name it, pick `local` (managed here) / `remote`
   (external endpoint) / `wikidata`.
3. Add entries directly, or paste TSV/CSV via **Bulk import…**
   (`external_id`, `label`, optional `description`, optional pipe-
   or-semicolon-separated `aliases`).
4. Note the `kb=<id>` chip on the KB row and use that number in the
   tag attribute below.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element. |
| toName | string | **yes** | — | Name of the object tag the KB linking targets (usually the same `<Text>` / `<HyperText>` a companion `<Labels>` tag targets). |
| kb | integer | **yes** | — | Numeric ID of the Knowledge Base (see Organization → Settings → Knowledge Bases). |
| limit | integer | no | `10` | Maximum number of autocomplete rows to show at once (1–100). |
| placeholder | string | no | `Search knowledge base…` | Placeholder text for the search input. |
| required | boolean | no | `false` | Whether a KB link is required for this region before submit. |
| requiredMessage | string | no | — | Message to show if validation fails. |
| perRegion | boolean | no | `false` | Attach the KB link to a specific region (span) instead of the whole task. Set `true` for entity linking; leave `false` for task-level classification. |
| perItem | boolean | no | `false` | Attach the KB link per-item in multi-item objects. |

## Result payload

```json
{
  "from_name": "concept",
  "to_name": "txt",
  "type": "kbref",
  "value": {
    "kbref": {
      "external_id": "HGNC:11998",
      "label": "TP53",
      "description": "Cellular tumor antigen p53",
      "aliases": ["p53", "P53_HUMAN"]
    }
  }
}
```

## Autocomplete ranking

Results are ranked in this order:

1. `label` starts with the query.
2. `label` contains the query anywhere.
3. Any alias matches the query.
4. `external_id` contains the query.

## Example — named-entity linking

Span picker + label + KB search on one canvas. Annotator drags a
span, applies the label, then picks the matching KB entry:

```html
<View>
  <Labels name="ent" toName="txt">
    <Label value="Gene" background="#f2b6c8"/>
    <Label value="Disease" background="#f7c5a3"/>
    <Label value="Drug" background="#c3e2c2"/>
  </Labels>
  <Text name="txt" value="$text"/>
  <KBRef name="concept" toName="txt" kb="1" perRegion="true"/>
</View>
```

For a ready-made starting point, pick the **Named Entity Linking
(KB-backed)** template under **Natural Language Processing** on the
project creation Labeling Interface picker.
