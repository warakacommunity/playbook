---
title: "Collapse"
sidebar_label: "Collapse"
description: "Visual tag — Collapse tag, a content area which can be collapsed and expanded."
mdx:
  format: md
---

# `<Collapse>`

**Category:** Visual tag

Collapse tag, a content area which can be collapsed and expanded.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| accordion | true,false | no | `true` | Works as an accordion |
| bordered | string | no | `false` | Shows border |
| open | true,false | no | `false` | Sets default collapsed state |

## Examples

### Example
```html
<Collapse>
  <Panel value="Panel Header">
    <View><Header value="Hello world" /></View>
  </Panel>
</Collapse>
```

