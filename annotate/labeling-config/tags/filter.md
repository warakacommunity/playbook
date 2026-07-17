---
title: "Filter"
sidebar_label: "Filter"
description: "Visual tag — Use the Filter tag to add a filter search for a large number of labels or choices. Use with the Labels tag or Choices tag."
mdx:
  format: md
---

# `<Filter>`

**Category:** Visual tag

Use the Filter tag to add a filter search for a large number of labels or choices. Use with the Labels tag or Choices tag.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| placeholder | string | no | `"Quick Filter"` | Placeholder text for filter |
| minlength | number | no | `3` | Size of the filter |
| style | string | no | — | CSS style of the string |
| hotkey | string | no | — | Hotkey to use to focus on the filter text area |

## Examples

### Example

Add a filter to labels for a named entity recognition task

```html
<View>
  <Filter name="filter" toName="ner"
          hotkey="shift+f" minlength="0"
          placeholder="Filter" />
  <Labels name="ner" toName="text" showInline="false">
    <Label value="Person" />
    <Label value="Organization" />
  </Labels>
  <Text name="text" value="$text" />
</View>
```

