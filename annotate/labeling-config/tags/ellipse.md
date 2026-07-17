---
title: "Ellipse"
sidebar_label: "Ellipse"
description: "Control tag — The `Ellipse` tag is used to add an elliptical bounding box to an image. Use for bounding box image segmentation tasks with ellipses."
mdx:
  format: md
---

# `<Ellipse>`

**Category:** Control tag

The `Ellipse` tag is used to add an elliptical bounding box to an image. Use for bounding box image segmentation tasks with ellipses.

Use with the following data types: image.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| toName | string | **yes** | — | Name of the image to label |
| opacity | float | no | `0.6` | Opacity of ellipse |
| fillColor | string | no | — | Ellipse fill color in hexadecimal |
| strokeColor | string | no | `#f48a42` | Stroke color in hexadecimal |
| strokeWidth | number | no | `1` | Width of the stroke |
| canRotate | true,false | no | `true` | Show or hide rotation control |
| smart | true,false | no | — | Show smart tool for interactive pre-annotations |
| smartOnly | true,false | no | — | Only show smart tool for interactive pre-annotations |

## Examples

### Example

Basic image segmentation with ellipses labeling configuration

```html
<View>
  <Ellipse name="ellipse1-1" toName="img-1" />
  <Image name="img-1" value="$img" />
</View>
```

