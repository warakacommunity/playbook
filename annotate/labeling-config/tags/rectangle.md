---
title: "Rectangle"
sidebar_label: "Rectangle"
description: "Control tag — The `Rectangle` tag is used to add a rectangle (Bounding Box) to an image without selecting a label. This can be useful when you have only one label to assign to a rectangle."
mdx:
  format: md
---

# `<Rectangle>`

**Category:** Control tag

The `Rectangle` tag is used to add a rectangle (Bounding Box) to an image without selecting a label. This can be useful when you have only one label to assign to a rectangle.

Use with the following data types: image. Annotation results store the left top corner of the bounding box,
read more about it and rotation in the [Object Detection Template](https://labelstud.io/templates/image_bbox#Bounding-box-rotation-in-the-Label-Studio-results).

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| toName | string | **yes** | — | Name of the image to label |
| opacity | float | no | `0.6` | Opacity of rectangle |
| fillColor | string | no | — | Rectangle fill color in hexadecimal |
| strokeColor | string | no | `#f48a42` | Stroke color in hexadecimal |
| strokeWidth | number | no | `1` | Width of the stroke |
| canRotate | true,false | no | `true` | Whether to show or hide rotation control. Note that the anchor point in the results is different than the anchor point used when rotating with the rotation tool. For more information, see [Rotation](https://labelstud.io/templates/image_bbox#Rotation). |
| smart | true,false | no | — | Show smart tool for interactive pre-annotations |
| smartOnly | true,false | no | — | Only show smart tool for interactive pre-annotations |
| snap | pixel,none | no | `none` | Snap rectangle to image pixels |

## Examples

### Example

Basic labeling configuration for adding rectangular bounding box regions to an image

```html
<View>
  <Rectangle name="rect-1" toName="img-1" />
  <Image name="img-1" value="$img" />
</View>
```

