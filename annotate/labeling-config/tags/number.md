---
title: "Number"
sidebar_label: "Number"
description: "Control tag — The Number tag supports numeric classification. Use to classify tasks using numbers."
mdx:
  format: md
---

# `<Number>`

**Category:** Control tag

The Number tag supports numeric classification. Use to classify tasks using numbers.

Use with the following data types: audio, image, HTML, paragraphs, text, time series, video

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| toName | string | **yes** | — | Name of the element that you want to label |
| min | number | no | — | Minimum number value |
| max | number | no | — | Maximum number value |
| step | number | no | `1` | Step for value increment/decrement |
| defaultValue | number | no | — | Default number value; will be added automatically to result for required fields |
| hotkey | string | no | — | Hotkey for increasing number value |
| required | true,false | no | `false` | Whether number is required or not |
| requiredMessage | string | no | — | Message to show if validation fails |
| perRegion | true,false | no | — | Use this tag to classify specific regions instead of the whole object |
| perItem | true,false | no | — | Use this tag to classify specific items inside the object instead of the whole object |
| slider | true,false | no | `false` | Use slider look instead of input; use min and max to add your constraints |

## Examples

### Example

Basic labeling configuration for numeric classification of text

```html
<View>
  <Text name="txt" value="$text" />
  <Number name="number" toName="txt" max="10" />
</View>
```

