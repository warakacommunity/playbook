---
title: "HyperText"
sidebar_label: "HyperText"
description: "Object tag — The `HyperText` tag displays hypertext markup for labeling. Use for labeling HTML-encoded text and webpages for NER and NLP projects."
mdx:
  format: md
---

# `<HyperText>`

**Category:** Object tag

The `HyperText` tag displays hypertext markup for labeling. Use for labeling HTML-encoded text and webpages for NER and NLP projects.

Use with the following data types: HTML.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| value | string | **yes** | — | Value of the element |
| valueType | url,text | no | `text` | Whether the text is stored directly in uploaded data or needs to be loaded from a URL |
| inline | true,false | no | `false` | Whether to embed HTML directly in Label Studio or use an iframe |
| saveTextResult | yes,no | no | — | Whether to store labeled text along with the results. By default, doesn't store text for `valueType=url` |
| encoding | none,base64,base64unicode | no | — | How to decode values from encoded strings |
| selectionEnabled | true,false | no | `true` | Enable or disable selection |
| clickableLinks | true,false | no | `false` | Whether to allow opening resources from links in the hypertext markup. |
| highlightColor | string | no | — | Hex string with highlight color, if not provided uses the labels color |
| showLabels | true,false | no | — | Whether or not to show labels next to the region; unset (by default) — use editor settings; true/false — override settings |
| granularity | symbol,word,sentence,paragraph | no | — | Control region selection granularity |
| dir | ltr,rtl,auto | no | — | Text direction for RTL / non-Latin script rendering. `rtl` renders Arabic-script HTML content right-to-left with correct bidi. In iframe render mode (the default for `<HyperText>`) the content is wrapped in a `<div dir="rtl">` inside the sandboxed document so bidi cascades through the whole HTML tree. **AfriAnnotate-specific.** |
| direction | ltr,rtl,auto | no | — | CSS-familiar alias of `dir`. `dir` wins on collision. **AfriAnnotate-specific.** |
| lang | string (BCP 47) | no | — | Language tag such as `ar` (Arabic), `am` (Amharic), `ha-Arab` (Hausa Ajami), `ff-Arab` (Fulfulde Ajami), `kr-Arab` (Kanuri Ajami), or `zgh-Tfng` (Standard Moroccan Tamazight in Tifinagh). When set together with `granularity="word"` or `granularity="sentence"`, selection snapping runs through `Intl.Segmenter(lang)` — ICU-backed word / sentence boundaries respecting the specific locale. Falls back to the browser `Selection.modify` path on missing lang, unsupported browsers, `paragraph` granularity, or multi-container selections. **AfriAnnotate-specific.** |
| unicodeBidi | normal,embed,bidi-override,isolate,isolate-override,plaintext | no | — | CSS `unicode-bidi` behaviour, mapped onto the wrapping container's `style`. Combine with `dir` for stubborn mixed-script rendering (e.g. Arabic quotations inside English body). **AfriAnnotate-specific.** |

For the end-to-end walkthrough with six ready-made African-language
template presets, see the [RTL and non-Latin scripts guide](/annotate/getting-started/rtl-non-latin).

## Examples

### Example

Labeling configuration to label HTML content

```html
<View>
  <HyperText name="text-1" value="$text" />
  <Labels name="parts" toName="text-1">
    <Label value="Caption" />
    <Label value="Article" />
    <Label value="Author" />
  </Labels>
</View>
```

### Example
```html
<View>
  <HyperText name="p1">
    <p>Some explanations <em>with style</em></p>
  </HyperText>
</View>
```

