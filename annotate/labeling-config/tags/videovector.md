---
title: "VideoVector"
sidebar_label: "VideoVector"
description: "Control tag — VideoVector tag brings vector annotation capabilities to videos."
mdx:
  format: md
---

# `<VideoVector>`

**Category:** Control tag

VideoVector tag brings vector annotation capabilities to videos.
It works in combination with the `<Video/>` and the `<Labels/>` tags.
Supports closable paths and skeleton mode with
keyframe-based interpolation across video frames.

Use with the following data types: video

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| toName | string | **yes** | — | Name of the element to control (video) |
| opacity | number | no | `0.2` | Opacity of vector |
| fillColor | string | no | `#f48a42` | Vector fill color in hexadecimal or HTML color name |
| strokeColor | string | no | `#f48a42` | Stroke color in hexadecimal |
| strokeWidth | number | no | `2` | Width of stroke |
| pointSize | small,medium,large | no | `small` | Size of vector handle points |
| pointStyle | rectangle,circle | no | `circle` | Style of points |
| closable | true,false | no | `false` | Allow closed shapes |
| skeleton | true,false | no | `false` | Enables skeleton mode to allow branch paths |
| minPoints | number,none | no | `none` | Minimum allowed number of points |
| maxPoints | number,none | no | `none` | Maximum allowed number of points |
| snap | pixel,none | no | `none` | Snap vector to image pixels |
| pointSizeEnabled | number | no | `5` | Size of a point in pixels when shape is selected |
| pointSizeDisabled | number | no | `3` | Size of a point in pixels when shape is not selected |

