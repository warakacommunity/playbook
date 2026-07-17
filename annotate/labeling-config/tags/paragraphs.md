---
title: "Paragraphs"
sidebar_label: "Paragraphs"
description: "Object tag — The `Paragraphs` tag displays paragraphs of text on the labeling interface. Use to label dialogue transcripts for NLP and NER projects."
mdx:
  format: md
---

# `<Paragraphs>`

**Category:** Object tag

The `Paragraphs` tag displays paragraphs of text on the labeling interface. Use to label dialogue transcripts for NLP and NER projects.
The `Paragraphs` tag expects task data formatted as an array of objects like the following:
[{ $nameKey: "Author name", $textKey: "Text" }, ... ]

Use with the following data types: text.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| value | string | **yes** | — | Data field containing the paragraph content |
| valueType | json,url | no | `json` | Whether the data is stored directly in uploaded JSON data or needs to be loaded from a URL |
| audioUrl | string | no | — | Audio to sync phrases with |
| sync | string | no | — | Object name to sync with |
| showPlayer | true,false | no | `false` | Whether to show audio player above the paragraphs. Ignored if sync object is audio |
| saveTextResult | no,yes | no | `yes` | Whether to store labeled text along with the results. By default, doesn't store text for `valueType=url` |
| layout | none,dialogue | no | `none` | Whether to use a dialogue-style layout or not |
| nameKey | string | no | `author` | The key field to use for name |
| textKey | string | no | `text` | The key field to use for the text |
| contextScroll | true,false | no | `false` | Turn on contextual scroll mode |

## Examples

### Example

Labeling configuration to label paragraph regions of text containing dialogue

```html
<View>
  <Paragraphs name="dialogue-1" value="$dialogue" layout="dialogue" />
  <ParagraphLabels name="importance" toName="dialogue-1">
    <Label value="Important content"></Label>
    <Label value="Random talk"></Label>
  </ParagraphLabels>
</View>
```

### Example

Paragraphs with audio

```html
<View>
  <Paragraphs audioUrl="$audio" value="$para" name="paragraphs"
              layout="dialogue" textKey="text" nameKey="author"
              showPlayer="true"
              />

  <Choices name="choices" toName="paragraphs" choice="multiple">
      <Choice value="Good quality"/>
      <Choice value="Fast speech"/>
  </Choices>
</View>

<!-- {"data": {
  "para": [
    {"text": "test 1", "author": "A", "start": 0.0, "end": 1.0},
    {"text": "test 2", "author": "B", "start": 1.0, "end": 2.0},
    {"text": "test 3", "author": "A", "start": 2.0, "end": 3.0}
  ],
  "audio": "/static/samples/game.wav"
}}
-->
```

