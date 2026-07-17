---
title: "Vector"
sidebar_label: "Vector"
description: "Control tag — The `Vector` tag is used to add vectors to an image without selecting a label. This can be useful when you have only one label to assign to the vector. Use for image segmentation tasks."
mdx:
  format: md
---

# `<Vector>`

**Category:** Control tag

The `Vector` tag is used to add vectors to an image without selecting a label. This can be useful when you have only one label to assign to the vector. Use for image segmentation tasks.

Use with the following data types: image.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of tag |
| toname | string | **yes** | — | Name of image to label |
| opacity | number | no | `0.6` | Opacity of vector |
| fillColor | string | no | `transparent` | Vector fill color in hexadecimal or HTML color name |
| strokeColor | string | no | `#f48a42` | Stroke color in hexadecimal |
| strokeWidth | number | no | `3` | Width of stroke |
| pointSize | small,medium,large | no | `small` | Size of vector handle points |
| pointStyle | rectangle,circle | no | `circle` | Style of points |
| smart | true,false | no | — | Show smart tool for interactive pre-annotations |
| smartOnly | true,false | no | — | Only show smart tool for interactive pre-annotations |
| snap | pixel,none | no | `none` | Snap vector to image pixels |
| closable | true,false | no | `false` | Allow closed shapes |
| skeleton | true,false | no | `false` | Enables skeleton mode to allow branch paths |
| minPoints | number,none | no | `none` | Minimum allowed number of points |
| maxPoints | number,none | no | `none` | Maximum allowed number of points |
| pointSizeEnabled | number | no | `5` | Size of a point in pixels when shape is selected |
| pointSizeDisabled | number | no | `3` | Size of a point in pixels when shape is not selected |

