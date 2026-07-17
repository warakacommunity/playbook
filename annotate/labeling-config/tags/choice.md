---
title: "Choice"
sidebar_label: "Choice"
description: "Control tag — The `Choice` tag represents a single choice for annotations. Use with the `Choices` tag or `Taxonomy` tag to provide specific choice options."
mdx:
  format: md
---

# `<Choice>`

**Category:** Control tag

The `Choice` tag represents a single choice for annotations. Use with the `Choices` tag or `Taxonomy` tag to provide specific choice options.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| value | string | **yes** | — | Choice value |
| selected | true,false | no | — | Specify whether to preselect this choice on the labeling interface |
| alias | string | no | — | Alias for the choice. If used, the alias replaces the choice value in the annotation results. Alias does not display in the interface. |
| style | style | no | — | CSS style of the checkbox element |
| hotkey | string | no | — | Hotkey for the selection |
| html | string | no | — | Can be used to show enriched content, it has higher priority than `value`, however `value` will be used in the exported result (should be properly escaped) |
| hint | string | no | — | Hint for choice on hover |
| color | string | no | — | Color for Taxonomy item |

## Examples

### Example

Basic text classification labeling configuration

```html
<View>
  <Choices name="gender" toName="txt-1" choice="single">
    <Choice value="Man" />
    <Choice value="Woman" />
    <Choice value="Nonbinary" />
    <Choice value="Other" />
  </Choices>
  <Text name="txt-1" value="John went to see Mary" />
</View>
```

