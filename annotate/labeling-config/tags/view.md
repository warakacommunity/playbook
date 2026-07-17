---
title: "View"
sidebar_label: "View"
description: "Visual tag — The `View` element is used to configure the display of blocks, similar to the div tag in HTML."
mdx:
  format: md
---

# `<View>`

**Category:** Visual tag

The `View` element is used to configure the display of blocks, similar to the div tag in HTML.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| display | block,inline | **yes** | — |  |
| style | string | no | — | CSS style string |
| className | string | no | — | Class name of the CSS style to apply. Use with the Style tag |
| idAttr | string | no | — | Unique ID attribute to use in CSS |
| visibleWhen | region-selected,choice-selected,no-region-selected,choice-unselected | no | — | Control visibility of the content. Can also be used with the `when*` parameters below to narrow visibility |
| whenTagName | string | no | — | Use with `visibleWhen`. Narrow down visibility by tag name. For regions, use the name of the object tag, for choices, use the name of the `choices` tag |
| whenLabelValue | string | no | — | Use with `visibleWhen="region-selected"`. Narrow down visibility by label value. Multiple values can be separated with commas |
| whenChoiceValue | string | no | — | Use with `visibleWhen` (`"choice-selected"` or `"choice-unselected"`) and `whenTagName`, both are required. Narrow down visibility by choice value. Multiple values can be separated with commas |

## Examples

### Example

Create two cards that flex to take up 50% of the screen width on the labeling interface

```html
<View style="display: flex;">
  <!-- Left side -->
  <View style="flex: 50%">
    <Header value="Facts:" />
    <Text name="text" value="$fact" />
  </View>
  <!-- Right side -->
  <View style="flex: 50%; margin-left: 1em">
    <Header value="Enter your question:" />
    <TextArea name="question" />
  </View>
</View>
```

### Example
```html
<View>
  <Text name="text" value="$text"/>
  <Choices name="sentiment" toName="text">
    <Choice value="Positive"/>
    <Choice value="Negative"/>
    <Choice value="Neutral"/>
  </Choices>
  <!-- Shown only when Positive or Negative is selected -->
  <View visibleWhen="choice-selected" whenTagName="sentiment"
        whenChoiceValue="Positive,Negative">
    <Header value="Why?"/>
    <TextArea name="why_positive" toName="text"/>
  </View>
</View>
```

### Example
```html
<View>
  <Labels name="label" toName="text">
    <Label value="PER" background="red"/>
    <Label value="ORG" background="darkorange"/>
    <Label value="LOC" background="orange"/>
    <Label value="MISC" background="green"/>
  </Labels>
  <Text name="text" value="$text"/>
  <!-- Shown only when region PER or ORG is selected -->
  <View visibleWhen="region-selected" whenLabelValue="PER,ORG">
    <Header value="yoho"/>
  </View>
</View>
```

