---
title: "TypedFeature"
sidebar_label: "TypedFeature"
description: "Control tag — Renders a form of typed attributes (string / boolean / int / float / link / concept_kb_ref) on a region. Attributes come from a Typed Feature Layer defined at the project level. INCEpTION-style structured annotation on top of NER-style spans."
mdx:
  format: md
---

# `<TypedFeature>`

**Category:** Control tag · **AfriAnnotate-specific**

Attaches a small **form of dtype'd attributes** to a region, where
the feature definitions come from a Typed Feature Layer configured at
the project level. Each feature has a `dtype` — `string`, `boolean`,
`integer`, `float`, `link`, or `concept_kb_ref` — and the tag renders
the appropriate control per feature (text input / checkbox / number /
URL / embedded KB search).

The INCEpTION pattern generalised for AfriAnnotate: on top of a
plain span label ("this is a Gene"), attach structured metadata
("this Gene is a *proto-oncogene*, expressed at *high* level, evidence
= *this specific PMID*") without a proprietary XML schema.

## Setup

1. Open **Project → Settings → Typed layers**.
2. Click **+ New layer** — name it (e.g. `gene_attributes`), pick a
   kind (`span`, `relation`, `chain`, `document`).
3. Add features to the layer — one per attribute you want the
   annotator to fill in. For each: name, dtype, whether required, an
   optional description. For `concept_kb_ref` features, pick the KB
   they should search against.
4. Note the `layer=<id>` chip on the layer card and use that number
   in the tag attribute below.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element. |
| toName | string | **yes** | — | Name of the object tag the metadata targets. |
| layer | integer | **yes** | — | Numeric ID of the TypedFeatureLayer (see Project → Settings → Typed layers). |
| required | boolean | no | `false` | Whether at least one feature value is required for the region. |
| requiredMessage | string | no | — | Message to show if validation fails. |
| perRegion | boolean | no | `false` | Attach the metadata to a specific region instead of the whole task. Set `true` for per-span attributes; leave `false` for task-level. |
| perItem | boolean | no | `false` | Attach the metadata per-item in multi-item objects. |

## Result payload

Values are stored as a plain dict keyed by feature name:

```json
{
  "from_name": "attrs",
  "to_name": "txt",
  "type": "typedfeature",
  "value": {
    "typedfeature": {
      "expression_level": "high",
      "is_oncogene": true,
      "evidence_pmid": 12345678,
      "reference_concept": {
        "external_id": "HGNC:11998",
        "label": "TP53"
      }
    }
  }
}
```

Feature keys mirror the layer's feature `name`s. `concept_kb_ref`
values are stored as an `{external_id, label}` object; every other
dtype is stored as its native JSON scalar.

## dtype reference

| dtype | Renders as | Stored as |
|---|---|---|
| `string` | Single-line text input | JSON string |
| `boolean` | Checkbox | JSON boolean |
| `integer` | Numeric input (step 1) | JSON integer |
| `float` | Numeric input (step any) | JSON number |
| `link` | URL input | JSON string |
| `concept_kb_ref` | Embedded KB search — reuses `<KBRef>`'s autocomplete against the linked KB | `{external_id, label}` object |

## Example — biomedical NER with typed attributes

Span picker + label + KB link + typed-feature form on one canvas:

```html
<View>
  <Labels name="ent" toName="txt">
    <Label value="Gene" background="#f2b6c8"/>
  </Labels>
  <Text name="txt" value="$text"/>
  <KBRef name="concept" toName="txt" kb="1" perRegion="true"/>
  <TypedFeature name="attrs" toName="txt" layer="7" perRegion="true"/>
</View>
```

For a ready-made starting point, pick the **Named Entity Linking
(KB-backed)** template under **Natural Language Processing** on the
project creation Labeling Interface picker — it instantiates
`<Labels>`, `<Text>`, `<KBRef>`, and `<TypedFeature>` together and
walks you through the setup steps in its details panel.
