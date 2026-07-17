---
title: "ParagraphLabels"
sidebar_label: "ParagraphLabels"
description: "Control tag — The `ParagraphLabels` tag creates labeled paragraphs. Use with the `Paragraphs` tag to label a paragraph of text."
mdx:
  format: md
---

# `<ParagraphLabels>`

**Category:** Control tag

The `ParagraphLabels` tag creates labeled paragraphs. Use with the `Paragraphs` tag to label a paragraph of text.

Use with the following data types: paragraphs.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| toName | string | **yes** | — | Name of the paragraph element to label |
| choice | single,multiple | no | `single` | Configure whether you can select one or multiple labels |
| maxUsages | number | no | — | Maximum number of times a label can be used per task |
| showInline | true,false | no | `true` | Show labels in the same visual line |

## Examples

### Example

Basic labeling configuration to label paragraphs

```html
<View>
  <ParagraphLabels name="labels" toName="prg">
    <Label value="Statement" />
    <Label value="Question" />
  </ParagraphLabels>
  <Paragraphs name="prg" value="$dialogue" layout="dialogue" />
</View>
```

