---
title: "Relation"
sidebar_label: "Relation"
description: "Control tag — The `Relation` tag represents a single relation label. Use with the `Relations` tag to specify the value of a label to apply to a relation between regions."
mdx:
  format: md
---

# `<Relation>`

**Category:** Control tag

The `Relation` tag represents a single relation label. Use with the `Relations` tag to specify the value of a label to apply to a relation between regions.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| value | string | **yes** | — | Value of the relation |
| background | string | no | — | Background color of the active label in hexadecimal |

## Examples

### Example

Basic labeling configuration to apply the label "similar" to a relation identified between two labeled regions of text

```html
<View>
  <Relations>
    <Relation value="similar" />
  </Relations>

  <Text name="txt-1" value="$text" />
  <Labels name="lbl-1" toName="txt-1">
    <Label value="Relevant" />
    <Label value="Not Relevant" />
  </Labels>
</View>
```

