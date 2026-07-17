---
title: "PolygonLabels"
sidebar_label: "PolygonLabels"
description: "Control tag — The `PolygonLabels` tag is used to create labeled polygons. Use to apply labels to polygons in semantic segmentation tasks."
mdx:
  format: md
---

# `<PolygonLabels>`

**Category:** Control tag

The `PolygonLabels` tag is used to create labeled polygons. Use to apply labels to polygons in semantic segmentation tasks.

Use with the following data types: image.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of tag |
| toName | string | **yes** | — | Name of image to label |
| choice | single,multiple | no | `single` | Configure whether you can select one or multiple labels |
| maxUsages | number | no | — | Maximum number of times a label can be used per task |
| showInline | true,false | no | `true` | Show labels in the same visual line |
| opacity | number | no | `0.2` | Opacity of polygon |
| fillColor | string | no | — | Polygon fill color in hexadecimal |
| strokeColor | string | no | — | Stroke color in hexadecimal |
| strokeWidth | number | no | `1` | Width of stroke |
| pointSize | small,medium,large | no | `medium` | Size of polygon handle points |
| pointStyle | rectangle,circle | no | `rectangle` | Style of points |
| snap | pixel,none | no | `none` | Snap polygon to image pixels |

## Examples

### Example

Basic labeling configuration for polygonal semantic segmentation of images

```html
<View>
  <Image name="image" value="$image" />
  <PolygonLabels name="labels" toName="image">
    <Label value="Car" />
    <Label value="Sign" />
  </PolygonLabels>
</View>
```

