---
title: "HyperTextLabels"
sidebar_label: "HyperTextLabels"
description: "Control tag — The `HyperTextLabels` tag creates labeled hyper text (HTML). Use with the HyperText object tag to annotate HTML text or HTML elements for named entity recognition tasks."
mdx:
  format: md
---

# `<HyperTextLabels>`

**Category:** Control tag

The `HyperTextLabels` tag creates labeled hyper text (HTML). Use with the HyperText object tag to annotate HTML text or HTML elements for named entity recognition tasks.

Use with the following data types: HTML.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| toName | string | **yes** | — | Name of the HTML element to label |
| choice | single,multiple | no | `single` | Configure if you can select one or multiple labels |
| maxUsages | number | no | — | Maximum number of times a label can be used per task |
| showInline | true,false | no | `true` | Show labels in the same visual line |

## Examples

### Example

Basic semantic text labeling configuration

```html
<View>
  <HyperTextLabels name="labels" toName="ht">
    <Label value="Header" />
    <Label value="Body Text" />
  </HyperTextLabels>
  <HyperText name="ht" value="$html" />
</View>
```

