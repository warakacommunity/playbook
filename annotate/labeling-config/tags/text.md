---
title: "Text"
sidebar_label: "Text"
description: "Object tag — The `Text` tag shows text that can be labeled. Use to display any type of text on the labeling interface."
mdx:
  format: md
---

# `<Text>`

**Category:** Object tag

The `Text` tag shows text that can be labeled. Use to display any type of text on the labeling interface.
You can use `<Style>.htx-text{ white-space: pre-wrap; }</Style>` to preserve all spaces in the text, otherwise spaces are trimmed when displayed and saved in the results.
Every space in the text sample is counted when calculating result offsets, for example for NER labeling tasks.

Use with the following data types: text.

### How to read my text files in python?
The Label Studio editor counts `\r\n` as two different symbols, displaying them as `\n\n`, making it look like there is extra margin between lines.
You should either preprocess your files to replace `\r\n` with `\n` completely, or open files in Python with `newline=''` to avoid converting `\r\n` to `\n`:
`with open('my-file.txt', encoding='utf-8', newline='') as f: text = f.read()`
This is especially important when you are doing span NER labeling and need to get the correct offsets:
`text[start_offset:end_offset]`

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| value | string | **yes** | — | Data field containing text or a UR |
| valueType | url,text | no | `text` | Whether the text is stored directly in uploaded data or needs to be loaded from a URL |
| saveTextResult | yes,no | no | — | Whether to store labeled text along with the results. By default, doesn't store text for `valueType=url` |
| encoding | none,base64,base64unicode | no | — | How to decode values from encoded strings |
| selectionEnabled | true,false | no | `true` | Enable or disable selection |
| highlightColor | string | no | — | Hex string with highlight color, if not provided uses the labels color |
| showLabels | true,false | no | — | Whether or not to show labels next to the region; unset (by default) — use editor settings; true/false — override settings |
| granularity | symbol,word,sentence,paragraph | no | — | Control region selection granularity |
| dir | ltr,rtl,auto | no | — | Text direction for RTL / non-Latin script rendering. `rtl` renders Arabic-script content right-to-left with correct bidi. `<Text dir="rtl" lang="ar">` reaches the DOM as a `dir="rtl"` container so the browser handles bidirectional text natively. **AfriAnnotate-specific.** |
| direction | ltr,rtl,auto | no | — | CSS-familiar alias of `dir`. `dir` wins on collision. **AfriAnnotate-specific.** |
| lang | string (BCP 47) | no | — | Language tag such as `ar` (Arabic), `am` (Amharic), `ha-Arab` (Hausa Ajami), `ff-Arab` (Fulfulde Ajami), `kr-Arab` (Kanuri Ajami), or `zgh-Tfng` (Standard Moroccan Tamazight in Tifinagh). When set together with `granularity="word"` or `granularity="sentence"`, selection snapping runs through `Intl.Segmenter(lang)` — ICU-backed word / sentence boundaries respecting the specific locale rather than whatever the browser's default happens to be. Falls back to the browser `Selection.modify` path on missing lang, unsupported browsers, `paragraph` granularity, or multi-container selections. **AfriAnnotate-specific.** |
| unicodeBidi | normal,embed,bidi-override,isolate,isolate-override,plaintext | no | — | CSS `unicode-bidi` behaviour, mapped onto the rendered container's `style`. Combine with `dir` for stubborn mixed-script rendering (e.g. Arabic quotations inside English body). **AfriAnnotate-specific.** |

For the end-to-end walkthrough with six ready-made African-language
template presets, see the [RTL and non-Latin scripts guide](/annotate/getting-started/rtl-non-latin).

## Examples

### Example

Labeling configuration to label text for NER tasks with a word-level granularity

```html
<View>
  <Text name="text-1" value="$text" granularity="word" highlightColor="#ff0000" />
  <Labels name="ner" toName="text-1">
    <Label value="Person" />
    <Label value="Location" />
  </Labels>
</View>
```

### Example
```html
<Text name="p1">Some simple text with explanations</Text>
```

