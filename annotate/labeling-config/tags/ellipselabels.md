---
title: "EllipseLabels"
sidebar_label: "EllipseLabels"
description: "Control tag — The `EllipseLabels` tag creates labeled ellipses. Use to apply labels to ellipses for semantic segmentation."
mdx:
  format: md
---

# `<EllipseLabels>`

**Category:** Control tag

The `EllipseLabels` tag creates labeled ellipses. Use to apply labels to ellipses for semantic segmentation.

Use with the following data types: image.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| toName | string | **yes** | — | Name of the image to label |
| choice | single,multiple | no | `single` | Configure whether you can select one or multiple labels |
| maxUsages | number | no | — | Maximum number of times a label can be used per task |
| showInline | true,false | no | `true` | Show labels in the same visual line |
| opacity | float | no | `0.6` | Opacity of ellipse |
| fillColor | string | no | — | Ellipse fill color in hexadecimal |
| strokeColor | string | no | — | Stroke color in hexadecimal |
| strokeWidth | number | no | `1` | Width of stroke |
| canRotate | true,false | no | `true` | Show or hide rotation option |

## Examples

### Example

Basic semantic image segmentation labeling configuration

```html
<View>
  <EllipseLabels name="labels" toName="image">
    <Label value="Person" />
    <Label value="Animal" />
  </EllipseLabels>
  <Image name="image" value="$image" />
</View>
```

