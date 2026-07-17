---
title: "Rating"
sidebar_label: "Rating"
description: "Control tag — The `Rating` tag adds a rating selection to the labeling interface. Use for labeling tasks involving ratings."
mdx:
  format: md
---

# `<Rating>`

**Category:** Control tag

The `Rating` tag adds a rating selection to the labeling interface. Use for labeling tasks involving ratings.

Use with the following data types: audio, image, HTML, paragraphs, text, time series, video.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| toName | string | **yes** | — | Name of the element that you want to label |
| maxRating | number | no | `5` | Maximum rating value |
| defaultValue | number | no | `0` | Default rating value |
| size | small,medium,large | no | `medium` | Rating icon size |
| hotkey | string | **yes** | — | HotKey for changing rating value |
| required | true,false | no | `false` | Whether rating validation is required |
| requiredMessage | string | no | — | Message to show if validation fails |
| perRegion | true,false | no | — | Use this tag to rate regions instead of the whole object |
| perItem | true,false | no | — | Use this tag to rate items inside the object instead of the whole object |

## Examples

### Example

Basic labeling configuration to rate the content of a text passage

```html
<View>
  <Text name="txt" value="$text" />
  <Rating name="rating" toName="txt" maxRating="10" icon="star" size="medium" />
</View>
```

