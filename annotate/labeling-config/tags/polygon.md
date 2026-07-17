---
title: "Polygon"
sidebar_label: "Polygon"
description: "Control tag — The `Polygon` tag is used to add polygons to an image without selecting a label. This can be useful when you have only one label to assign to the polygon. Use for image segmentation tasks."
mdx:
  format: md
---

# `<Polygon>`

**Category:** Control tag

The `Polygon` tag is used to add polygons to an image without selecting a label. This can be useful when you have only one label to assign to the polygon. Use for image segmentation tasks.

Use with the following data types: image.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of tag |
| toname | string | **yes** | — | Name of image to label |
| opacity | number | no | `0.6` | Opacity of polygon |
| fillColor | string | no | `transparent` | Polygon fill color in hexadecimal or HTML color name |
| strokeColor | string | no | `#f48a42` | Stroke color in hexadecimal |
| strokeWidth | number | no | `3` | Width of stroke |
| pointSize | small,medium,large | no | `small` | Size of polygon handle points |
| pointStyle | rectangle,circle | no | `circle` | Style of points |
| smart | true,false | no | — | Show smart tool for interactive pre-annotations |
| smartOnly | true,false | no | — | Only show smart tool for interactive pre-annotations |
| snap | pixel,none | no | `none` | Snap polygon to image pixels |

## Examples

### Example

Basic labeling configuration for polygonal image segmentation

```html
<View>
  <Polygon name="rect-1" toName="img-1" />
  <Image name="img-1" value="$img" />
</View>
```

