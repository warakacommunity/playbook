---
title: "Header"
sidebar_label: "Header"
description: "Visual tag — The `Header` tag is used to show a header on the labeling interface."
mdx:
  format: md
---

# `<Header>`

**Category:** Visual tag

The `Header` tag is used to show a header on the labeling interface.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| value | string | **yes** | — | Text of header, either static text or the field name in data to use for the header |
| size | number | no | `4` | Level of header on a page, used to control size of the text |
| style | string | no | — | CSS style for the header |
| underline | true,false | no | `false` | Whether to underline the header |

## Examples

### Example

Display a header on the labeling interface based on a field in the data

```html
<View>
  <Header value="$text" />
</View>
```

### Example

Display a static header on the labeling interface

```html
<View>
  <Header value="Please select the class" />
</View>
```

