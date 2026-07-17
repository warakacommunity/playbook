---
title: "VideoVectorLabels"
sidebar_label: "VideoVectorLabels"
description: "Control tag — The `VideoVectorLabels` tag creates labeled vectors on video frames."
mdx:
  format: md
---

# `<VideoVectorLabels>`

**Category:** Control tag

The `VideoVectorLabels` tag creates labeled vectors on video frames.
Combines VideoVector and Labels into one tag for convenient vector annotation.

Use with the following data types: video.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of tag |
| toName | string | **yes** | — | Name of video to label |
| choice | single,multiple | no | `single` | Configure whether you can select one or multiple labels |
| maxUsages | number | no | — | Maximum number of times a label can be used per task |
| showInline | true,false | no | `true` | Show labels in the same visual line |
| opacity | number | no | `0.2` | Opacity of vector |
| fillColor | string | no | — | Vector fill color in hexadecimal |
| strokeColor | string | no | — | Stroke color in hexadecimal |
| strokeWidth | number | no | `1` | Width of stroke |
| closable | true,false | no | `false` | Allow closed shapes |
| skeleton | true,false | no | `false` | Enables skeleton mode |
| minPoints | number,none | no | `none` | Minimum allowed number of points |
| maxPoints | number,none | no | `none` | Maximum allowed number of points |

