---
title: "KeyPoint"
sidebar_label: "KeyPoint"
description: "Control tag — The `KeyPoint` tag is used to add a key point to an image without selecting a label. This can be useful when you have only one label to assign to the key point."
mdx:
  format: md
---

# `<KeyPoint>`

**Category:** Control tag

The `KeyPoint` tag is used to add a key point to an image without selecting a label. This can be useful when you have only one label to assign to the key point.

Use with the following data types: image.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| toName | string | **yes** | — | Name of the image to label |
| opacity | float | no | `0.9` | Opacity of keypoint |
| fillColor | string | no | `#8bad00` | Keypoint fill color in hexadecimal |
| strokeWidth | number | no | `1` | Width of the stroke |
| strokeColor | string | no | `#8bad00` | Keypoint stroke color in hexadecimal |
| smart | true,false | no | — | Show smart tool for interactive pre-annotations |
| smartOnly | true,false | no | — | Only show smart tool for interactive pre-annotations |
| snap | pixel,none | no | `none` | Snap keypoint to image pixels |

## Examples

### Example

Basic keypoint image labeling configuration

```html
<View>
  <KeyPoint name="kp-1" toName="img-1" />
  <Image name="img-1" value="$img" />
</View>
```

