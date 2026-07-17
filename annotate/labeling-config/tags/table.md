---
title: "Table"
sidebar_label: "Table"
description: "Object tag — The `Table` tag is used to display object keys and values in a table."
mdx:
  format: md
---

# `<Table>`

**Category:** Object tag

The `Table` tag is used to display object keys and values in a table.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| value | string | **yes** | — | Data field value containing JSON type for Table |
| valueType | string | no | — | Value to define the data type in Table |

## Examples

### Example

Basic labeling configuration for text in a table

```html
<View>
  <Table name="text-1" value="$text"></Table>
</View>
```

