---
title: "Brush"
sidebar_label: "Brush"
description: "Control tag — The `Brush` tag is used for image segmentation tasks where you want to apply a mask or use a brush to draw a region on the image."
mdx:
  format: md
---

# `<Brush>`

**Category:** Control tag

The `Brush` tag is used for image segmentation tasks where you want to apply a mask or use a brush to draw a region on the image.

Use with the following data types: image.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| toName | string | **yes** | — | Name of the image to label |
| choice | single,multiple | no | `single` | Configure whether the data labeler can select one or multiple labels |
| maxUsages | number | no | — | Maximum number of times a label can be used per task |
| showInline | true,false | no | `true` | Show labels in the same visual line |
| smart | true,false | no | — | Show smart tool for interactive pre-annotations |
| smartOnly | true,false | no | — | Only show smart tool for interactive pre-annotations |

## Examples

### Example

Basic image segmentation labeling configuration:

```xml
<View>
  <Brush name="brush" toName="image" />
  <Labels name="labels" toName="image">
    <Label value="Person" />
    <Label value="Animal" />
  </Labels>
  <Image name="image" value="$image" />
</View>
```

