---
title: "KeyPointLabels"
sidebar_label: "KeyPointLabels"
description: "Control tag — The `KeyPointLabels` tag creates labeled keypoints. Use to apply labels to identified key points, such as identifying facial features for a facial recognition labeling project."
mdx:
  format: md
---

# `<KeyPointLabels>`

**Category:** Control tag

The `KeyPointLabels` tag creates labeled keypoints. Use to apply labels to identified key points, such as identifying facial features for a facial recognition labeling project.

Use with the following data types: image.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| toName | string | **yes** | — | Name of the image to label |
| choice | single,multiple | no | `single` | Configure whether you can select one or multiple labels |
| maxUsages | number | no | — | Maximum number of times a label can be used per task |
| showInline | true,false | no | `true` | Show labels in the same visual line |
| opacity | float | no | `0.9` | Opacity of the keypoint |
| strokeWidth | number | no | `1` | Width of the stroke |
| snap | pixel,none | no | `none` | Snap keypoint to image pixels |

## Examples

### Example

Basic keypoint image labeling configuration for multiple regions

```html
<View>
  <KeyPointLabels name="kp-1" toName="img-1">
    <Label value="Face" />
    <Label value="Nose" />
  </KeyPointLabels>
  <Image name="img-1" value="$img" />
</View>
```

