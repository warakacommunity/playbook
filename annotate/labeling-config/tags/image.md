---
title: "Image"
sidebar_label: "Image"
description: "Object tag — The `Image` tag shows an image on the page. Use for all image annotation tasks to display an image on the labeling interface."
mdx:
  format: md
---

# `<Image>`

**Category:** Object tag

The `Image` tag shows an image on the page. Use for all image annotation tasks to display an image on the labeling interface.

Use with the following data types: images.

When you annotate image regions with this tag, the annotations are saved as percentages of the original size of the image, from 0-100.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| value | string | **yes** | — | Data field containing a path or URL to the image |
| valueList | string | no | — | References a variable that holds a list of image URLs. For an example, see the [Multi-Page Document Annotation](https://labelstud.io/templates/multi-page-document-annotation) template. |
| smoothing | true,false | no | — | Enable smoothing, by default it uses user settings |
| width | string | no | `100%` | Image width |
| maxWidth | string | no | `750px` | Maximum image width |
| zoom | true,false | no | `false` | Enable zooming an image with the mouse wheel |
| negativeZoom | true,false | no | `false` | Enable zooming out an image |
| zoomBy | float | no | `1.1` | Scale factor |
| grid | true,false | no | `false` | Whether to show a grid |
| gridSize | number | no | `30` | Specify size of the grid |
| gridColor | string | no | `#EEEEF4` | Color of the grid in hex, opacity is 0.15 |
| zoomControl | true,false | no | `false` | Show zoom controls in toolbar |
| brightnessControl | true,false | no | `false` | Show brightness control in toolbar |
| contrastControl | true,false | no | `false` | Show contrast control in toolbar |
| rotateControl | true,false | no | `false` | Show rotate control in toolbar |
| crosshair | true,false | no | `false` | Show crosshair cursor |
| horizontalAlignment | left,center,right | no | `left` | Where to align image horizontally. Can be one of "left", "center", or "right" |
| verticalAlignment | top,center,bottom | no | `top` | Where to align image vertically. Can be one of "top", "center", or "bottom" |
| defaultZoom | auto,original,fit | no | `fit` | Specify the initial zoom of the image within the viewport while preserving its ratio. Can be one of "auto", "original", or "fit" |
| crossOrigin | none,anonymous,use-credentials | no | `none` | Configures CORS cross domain behavior for this image, either "none", "anonymous", or "use-credentials", similar to [DOM `img` crossOrigin property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/crossOrigin). |

## Examples

### Example

Labeling configuration to display an image on the labeling interface

```html
<View>
  <!-- Retrieve the image url from the url field in JSON or column in CSV -->
  <Image name="image" value="$url" rotateControl="true" zoomControl="true"></Image>
</View>
```

### Example

Labeling configuration to perform multi-image segmentation

```html
<View>
  <!-- Retrieve the image url from the url field in JSON or column in CSV -->
  <Image name="image" valueList="$images" rotateControl="true" zoomControl="true"></Image>
</View>
<!-- {
  "data": {
    "images": [
      "https://images.unsplash.com/photo-1556740734-7f3a7d7f0f9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "https://images.unsplash.com/photo-1556740734-7f3a7d7f0f9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    ]
  }
} -->
```

