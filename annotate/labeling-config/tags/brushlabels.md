---
title: "BrushLabels"
sidebar_label: "BrushLabels"
description: "Control tag — The `BrushLabels` tag for image segmentation tasks is used in the area where you want to apply a mask or use a brush to draw a region on the image."
mdx:
  format: md
---

# `<BrushLabels>`

**Category:** Control tag

The `BrushLabels` tag for image segmentation tasks is used in the area where you want to apply a mask or use a brush to draw a region on the image.

Use with the following data types: image.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| toName | string | **yes** | — | Name of the image to label |
| choice | single,multiple | no | `single` | Configure whether the data labeler can select one or multiple labels |
| maxUsages | number | no | — | Maximum number of times a label can be used per task |
| showInline | true,false | no | `true` | Show labels in the same visual line |

## Examples

### Example

Basic image segmentation labeling configuration

```html
<View>
  <BrushLabels name="labels" toName="image">
    <Label value="Person" />
    <Label value="Animal" />
  </BrushLabels>
  <Image name="image" value="$image" />
</View>
```

