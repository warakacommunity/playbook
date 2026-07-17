---
title: "Relations"
sidebar_label: "Relations"
description: "Control tag — The `Relations` tag is used to create label relations between regions. Use to provide many values to apply to the relationship between two labeled regions."
mdx:
  format: md
---

# `<Relations>`

**Category:** Control tag

The `Relations` tag is used to create label relations between regions. Use to provide many values to apply to the relationship between two labeled regions.

Use with the following data types: audio, image, HTML, paragraphs, text, time series, video.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| choice | single,multiple | no | `single` | Configure whether you can select one or multiple labels |

## Examples

### Example

Basic labeling configuration to apply the label "similar" or "dissimilar" to a relation identified between two labeled regions of text

```html
<View>
  <Relations>
    <Relation value="similar" />
    <Relation value="dissimilar" />
  </Relations>

  <Text name="txt-1" value="$text" />
  <Labels name="lbl-1" toName="txt-1">
    <Label value="Relevant" />
    <Label value="Not Relevant" />
  </Labels>
</View>
```

