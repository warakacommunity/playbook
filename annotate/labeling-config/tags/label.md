---
title: "Label"
sidebar_label: "Label"
description: "Control tag — The `Label` tag represents a single label. Use with the `Labels` tag, including `BrushLabels`, `EllipseLabels`, `HyperTextLabels`, `KeyPointLabels`, and other `Labels` tags to specify the value of a specific label."
mdx:
  format: md
---

# `<Label>`

**Category:** Control tag

The `Label` tag represents a single label. Use with the `Labels` tag, including `BrushLabels`, `EllipseLabels`, `HyperTextLabels`, `KeyPointLabels`, and other `Labels` tags to specify the value of a specific label.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| value | string | **yes** | — | Value of the label |
| selected | true,false | no | `false` | Whether to preselect this label |
| maxUsages | number | no | — | Maximum number of times this label can be used per task |
| hint | string | no | — | Hint for label on hover |
| hotkey | string | no | — | Hotkey to use for the label. Automatically generated if not specified |
| alias | string | no | — | Label alias |
| showAlias | true,false | no | `false` | Whether to show alias inside label text |
| aliasStyle | string | no | `opacity:0.6` | CSS style for the alias |
| size | string | no | `medium` | Size of text in the label |
| background | string | no | `#36B37E` | Background color of an active label in hexadecimal |
| selectedColor | string | no | `#ffffff` | Color of text in an active label in hexadecimal |
| granularity | symbol,word | no | — | Set control based on symbol or word selection (only for Text) |
| html | string | no | — | HTML code is used to display label button instead of raw text provided by `value` (should be properly escaped) |
| category | int | no | — | Category is used in the export (in label-studio-converter lib) to make an order of labels for YOLO and COCO |

## Examples

### Example

Basic named entity recognition labeling configuration for text

```html
<View>
  <Labels name="type" toName="txt-1">
    <Label alias="B" value="Brand" />
    <Label alias="P" value="Product" />
  </Labels>
  <Text name="txt-1" value="$text" />
</View>
```

