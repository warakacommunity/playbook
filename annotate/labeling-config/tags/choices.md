---
title: "Choices"
sidebar_label: "Choices"
description: "Control tag — The `Choices` tag is used to create a group of choices, with radio buttons or checkboxes. It can be used for single or multi-class classification. Also, it is used for advanced classification tasks where annotators can choose one or multiple answers."
mdx:
  format: md
---

# `<Choices>`

**Category:** Control tag

The `Choices` tag is used to create a group of choices, with radio buttons or checkboxes. It can be used for single or multi-class classification. Also, it is used for advanced classification tasks where annotators can choose one or multiple answers.

Choices can have dynamic value to load labels from task. This task data should contain a list of options to create underlying `<Choice>`s. All the parameters from options will be transferred to corresponding tags.

The `Choices` tag can be used with any data types.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the group of choices |
| toName | string | **yes** | — | Name of the data item that you want to label |
| choice | single,single-radio,multiple | no | `single` | Single or multi-class classification |
| showInline | true,false | no | `false` | Show choices in the same visual line |
| required | true,false | no | `false` | Validate whether a choice has been selected |
| requiredMessage | string | no | — | Show a message if validation fails |
| visibleWhen | region-selected,no-region-selected,choice-selected,choice-unselected | no | — | Control visibility of the choices. Can also be used with the `when*` parameters below to narrow down visibility |
| whenTagName | string | no | — | Use with `visibleWhen`. Narrow down visibility by name of the tag. For regions, use the name of the object tag, for choices, use the name of the `choices` tag |
| whenLabelValue | string | no | — | Use with `visibleWhen="region-selected"`. Narrow down visibility by label value. Multiple values can be separated with commas |
| whenChoiceValue | string | no | — | Use with `visibleWhen` (`"choice-selected"` or `"choice-unselected"`) and `whenTagName`, both are required. Narrow down visibility by choice value. Multiple values can be separated with commas |
| perRegion | true,false | no | — | Use this tag to select a choice for a specific region instead of the entire task |
| perItem | true,false | no | — | Use this tag to select a choice for a specific item inside the object instead of the whole object |
| value | string | no | — | Task data field containing a list of dynamically loaded choices (see example below) |
| allowNested | true,false | no | — | Allow to use `children` field in dynamic choices to nest them. Submitted result will contain array of arrays, every item is a list of values from topmost parent choice down to selected one. |
| layout | select,inline,vertical | no | — | Layout of the choices: `select` for dropdown/select box format, `inline` for horizontal single row display, `vertical` for vertically stacked display (default) |

## Examples

### Example

Basic text classification labeling configuration

```html
<View>
  <Choices name="gender" toName="txt-1" choice="single-radio">
    <Choice alias="M" value="Male" />
    <Choice alias="F" value="Female" />
    <Choice alias="NB" value="Nonbinary" />
    <Choice alias="X" value="Other" />
  </Choices>
  <Text name="txt-1" value="John went to see Mary" />
</View>
```
**Example** *(This config with dynamic labels)*  

`Choice`s can be loaded dynamically from task data. It should be an array of objects with attributes.
  `html` can be used to show enriched content, it has higher priority than `value`, however `value` will be used in the exported result.

```html
<View>
  <Audio name="audio" value="$audio" />
  <Choices name="transcription" toName="audio" value="$variants" />
</View>
<!-- {
  "data": {
    "variants": [
      { "value": "Do or doughnut. There is no try.", "html": "![](https://labelstud.io/images/logo.png)" },
      { "value": "Do or do not. There is no trial.", "html": "<h1>You can use hypertext here</h2>" },
      { "value": "Do or do not. There is no try." },
      { "value": "Duo do not. There is no try." }
    ]
  }
} -->
```
**Example** *(is equivalent to this config)*  
```html
<View>
  <Audio name="audio" value="$audio" />
  <Choices name="transcription" toName="audio" value="$variants">
    <Choice value="Do or doughnut. There is no try." />
    <Choice value="Do or do not. There is no trial." />
    <Choice value="Do or do not. There is no try." />
    <Choice value="Duo do not. There is no try." />
  </Choices>
</View>
```

