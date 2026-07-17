---
title: "BitmaskLabels"
sidebar_label: "BitmaskLabels"
description: "Control tag — The `BitmaskLabels` tag for pixel-wise image segmentation tasks is used in the area where you want to apply a mask or use a brush to draw a region on the image."
mdx:
  format: md
---

# `<BitmaskLabels>`

**Category:** Control tag

The `BitmaskLabels` tag for pixel-wise image segmentation tasks is used in the area where you want to apply a mask or use a brush to draw a region on the image.

`BitmaskLabels` operates on pixel level and outputs a Base64 encoded PNG data URL image with black pixels on transparent background.

Export data example: `data-url:image/png;[base64-encoded-string]`

**Note:** You need to set `smoothing="false"` on the Image tag to be able to work with individual pixels;

 <video class="Video astro-OQEP7KKB" loop="" playsinline="" autoplay="" muted="">
   <source src="https://cdn.sanity.io/files/mzff2hy8/production/4812f66851a7fd4836e729bc7ccb7e510823af5d.mp4" type="video/mp4" class="astro-OQEP7KKB">
 </video>

Use with the following data types: image.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| toName | string | **yes** | — | Name of the image to label |
| choice | single,multiple | no | `single` | Configure whether the data labeler can select one or multiple labels |
| maxUsages | number | no | — | Maximum number of times a label can be used per task |
| showInline | true,false | no | `true` | Show labels in the same visual line |

## Examples

### Example

Basic image segmentation labeling configuration

```html
<View>
  <BitmaskLabels name="labels" toName="image">
    <Label value="Person" />
    <Label value="Animal" />
  </BitmaskLabels>
  <Image name="image" value="$image" smoothing="false" />
</View>
```

