---
title: "Taxonomy"
sidebar_label: "Taxonomy"
description: "Control tag — The `Taxonomy` tag is used to create one or more hierarchical classifications, storing both choice selections and their ancestors in the results. Use for nested classification tasks with the `Choice` tag."
mdx:
  format: md
---

# `<Taxonomy>`

**Category:** Control tag

The `Taxonomy` tag is used to create one or more hierarchical classifications, storing both choice selections and their ancestors in the results. Use for nested classification tasks with the `Choice` tag.

You can define nested classifications using the `Choice` tag, or retrieve external classifications using the `apiUrl` parameter. For more information on these options, see the [Taxonomy template page](https://labelstud.io/templates/taxonomy).

Use with the following data types: audio, image, HTML, paragraphs, text, time series, video.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| toName | string | **yes** | — | Name of the element that you want to classify |
| apiUrl | string | no | — | **Beta** -- Retrieve the taxonomy from a remote source. This can be a JSON-formatted file or a hierarchical data source read as an API. For more information, see the [Taxonomy template page](https://labelstud.io/templates/taxonomy) |
| leafsOnly | true,false | no | `false` | Allow annotators to select only leaf nodes of taxonomy |
| showFullPath | true,false | no | `false` | Whether to show the full path of selected items |
| pathSeparator | string | no | `/` | Separator to show in the full path (default is " / "). To avoid errors, ensure that your data does not include this separator |
| maxUsages | number | no | — | Maximum number of times a choice can be selected per task or per region |
| maxWidth | number | no | — | Maximum width for dropdown with units (eg: "500px") |
| minWidth | number | no | — | Minimum width for dropdown with units (eg: "300px") |
| required | true,false | no | `false` | Whether it is required to have selected at least one option |
| requiredMessage | string | no | — | Message to show if validation fails |
| placeholder= | string | no | — | What to display as prompt on the input |
| perRegion | true,false | no | — | Use this tag to classify specific regions instead of the whole object |
| perItem | true,false | no | — | Use this tag to classify specific items inside the object instead of the whole object |
| labeling | true,false | no | — | Use taxonomy to label regions in text. Only supported with `<Text>` and `<HyperText>` object tags. |
| legacy | true,false | no | — | Use this tag to enable the legacy version of the Taxonomy tag. The legacy version supports the ability for annotators to add labels as needed. However, when true, the `apiUrl` parameter is not usable. |

## Examples

### Example

Labeling configuration for providing a taxonomy of choices in response to a passage of text

```html
<View>
  <Taxonomy name="media" toName="text">
    <Choice value="Online">
      <Choice value="UGC" />
      <Choice value="Free" />
      <Choice value="Paywall">
        <Choice value="NY Times" />
        <Choice value="The Wall Street Journal" />
      </Choice>
    </Choice>
    <Choice value="Offline" />
  </Taxonomy>
  <Text name="text" value="You'd never believe what he did to the country" />
</View>
```

