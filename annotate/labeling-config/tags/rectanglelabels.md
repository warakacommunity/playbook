---
title: "RectangleLabels"
sidebar_label: "RectangleLabels"
description: "Control tag — The `RectangleLabels` tag creates labeled rectangles. Use to apply labels to bounding box semantic segmentation tasks."
mdx:
  format: md
---

# `<RectangleLabels>`

**Category:** Control tag

The `RectangleLabels` tag creates labeled rectangles. Use to apply labels to bounding box semantic segmentation tasks.

Use with the following data types: image. Annotation results store the left top corner of the bounding box,
read more about it and rotation in the [Object Detection Template](https://labelstud.io/templates/image_bbox#Bounding-box-rotation-in-the-Label-Studio-results).

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| toName | string | **yes** | — | Name of the image to label |
| choice | single,multiple | no | `single` | Configure whether you can select one or multiple labels |
| maxUsages | number | no | — | Maximum number of times a label can be used per task |
| showInline | true,false | no | `true` | Show labels in the same visual line |
| opacity | float | no | `0.6` | Opacity of rectangle |
| fillColor | string | no | — | Rectangle fill color in hexadecimal |
| strokeColor | string | no | — | Stroke color in hexadecimal |
| strokeWidth | number | no | `1` | Width of stroke |
| canRotate | true,false | no | `true` | Show or hide rotation control. Note that the anchor point in the results is different than the anchor point used when rotating with the rotation tool. For more information, see [Rotation](https://labelstud.io/templates/image_bbox#Rotation). |
| snap | pixel,none | no | `none` | Snap rectangle to image pixels |

## Examples

### Example

Basic labeling configuration for applying labels to rectangular bounding boxes on an image

```html
<View>
  <RectangleLabels name="labels" toName="image">
    <Label value="Person" />
    <Label value="Animal" />
  </RectangleLabels>
  <Image name="image" value="$image" />
</View>
```

