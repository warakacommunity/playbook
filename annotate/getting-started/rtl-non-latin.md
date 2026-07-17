---
title: "RTL and non-Latin scripts"
sidebar_label: "RTL / non-Latin scripts"
description: "Author annotation projects on Arabic-script (RTL), Ge'ez, Tifinagh, and other non-Latin scripts. Bidi-correct rendering, ICU-backed word / sentence segmentation, and six ready-made African-language NER template presets."
sidebar_position: 7
ready: true
mdx:
  format: md
---

# RTL and non-Latin scripts

AfriAnnotate ships end-to-end support for right-to-left rendering
and non-Latin script segmentation on any `<Text>` or `<HyperText>`
tag. This page walks through the author interface, the six shipped
template presets, and how to verify the behaviour on your corpus.

## The upstream gap this closes

Vanilla Label Studio's RTL and non-Latin script support has been
broken in the open for three years. Three GitHub issues remain
open at upstream with no merged fix:

- [#1888 Hebrew word-mixing under NER](https://github.com/HumanSignal/label-studio/issues/1888)
  (filed 2022-01-03, tagged "often asked")
- [#2653 Arabic LTR/RTL offset ambiguity](https://github.com/HumanSignal/label-studio/issues/2653)
  (filed 2022-07-12)
- [#6642 Arabic RTL Text rendering](https://github.com/HumanSignal/label-studio/issues/6642)
  (filed 2024-11-13)

Two root causes at the source level:

1. **RichText schema does not accept directional attributes.** The
   `TagAttrs` MobX-State-Tree model whitelists ten attributes —
   `value`, `valuetype`, `inline`, `savetextresult`,
   `selectionenabled`, `clickablelinks`, `highlightcolor`,
   `showlabels`, `encoding`, `granularity`. None are directional.
   MST silently strips any unknown attribute, so
   `<Text dir="rtl" lang="ar">` reaches the DOM as plain `<div>` —
   the browser has no signal to render right-to-left.
2. **Word-boundary segmentation delegates to the browser.** The LSF
   `applyTextGranularity` utility calls `Selection.modify('move',
   direction, 'word')` — the browser's own `Selection.modify` API
   with no ICU segmentation, no locale hint, no script-aware
   branching. Amharic Ge'ez word boundaries (no whitespace in
   classical usage), Arabic ligatures, and Tifinagh all inherit
   whatever the browser locale happens to expose.

AfriAnnotate closes both gaps with three targeted, upstreamable
patches — RichText schema whitelist extension, `Intl.Segmenter`-backed
word / sentence segmentation, and six ready-made African-language
template presets. Every one of them is a candidate for a pull request
to upstream Label Studio.

## Author interface

Four new attributes are accepted on any `<Text>` or `<HyperText>` tag:

| Attribute | Values | Purpose |
|---|---|---|
| `dir` | `ltr` \| `rtl` \| `auto` | Sets the container element's bidi base direction. `rtl` renders Arabic-script content right-to-left with correct word order. |
| `direction` | same as `dir` | CSS-familiar alias. `dir` wins on collision. |
| `lang` | BCP 47 language tag | Enables ICU-backed word / sentence segmentation when the browser exposes `Intl.Segmenter`. Examples: `ar` (Arabic), `am` (Amharic), `am-ET` (Ethiopia-specific), `ha-Arab` (Hausa in Arabic script), `ff-Arab` (Fulfulde Ajami), `kr-Arab` (Kanuri Ajami), `zgh-Tfng` (Standard Moroccan Tamazight in Tifinagh). |
| `unicodeBidi` | `isolate` \| `bidi-override` \| `embed` \| `plaintext` \| ... | CSS `unicode-bidi` behaviour. Combine with `dir` for stubborn mixed-script rendering (e.g. Arabic quotations inside English body). |

Minimal Arabic NER config:

```xml
<View>
  <Labels name="label" toName="text">
    <Label value="PER" background="red"/>
    <Label value="ORG" background="darkorange"/>
    <Label value="LOC" background="orange"/>
    <Label value="DATE" background="steelblue"/>
    <Label value="MISC" background="green"/>
  </Labels>

  <Text name="text"
        value="$text"
        dir="rtl"
        lang="ar"
        granularity="word"/>
</View>
```

Amharic NER config — LTR (Ge'ez is left-to-right) but non-Latin, so
`lang="am"` still routes segmentation through ICU:

```xml
<View>
  <Labels name="label" toName="text">
    <Label value="PER" background="red"/>
    <Label value="ORG" background="darkorange"/>
    <Label value="LOC" background="orange"/>
    <Label value="DATE" background="steelblue"/>
    <Label value="TITL" background="purple"/>
    <Label value="MISC" background="green"/>
  </Labels>

  <Text name="text"
        value="$text"
        dir="ltr"
        lang="am"
        granularity="word"/>
</View>
```

## What ICU segmentation buys you

When the tag carries a `lang` and the granularity is `word` or
`sentence`, AfriAnnotate routes selection snapping through
[`Intl.Segmenter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter) —
the cross-browser JavaScript API to ICU. This gives you the same
segmentation quality across Chrome, Safari, and modern Firefox, and
respects the specific locale's word-boundary rules rather than
whatever the browser's default happens to be.

Concretely:

- **Arabic**: ligatures and diacritics are treated as part of the
  enclosing word. Double-click a partial word and the selection
  extends to the full graphemic word.
- **Amharic Ge'ez**: word boundaries follow Amharic-specific rules,
  not Latin defaults. Amharic morphology is highly agglutinative and
  classical usage does not always align with modern whitespace
  conventions; the ICU path handles this.
- **Tifinagh (Neo-Tifinagh)**: the same word-boundary rules that ICU
  exposes for Berber varieties are applied at selection time.

The path degrades gracefully when any of the following is true:

- The tag omits `lang` (default Latin / LTR behaviour preserved).
- The browser does not expose `Intl.Segmenter` (older Firefox).
- The granularity is `paragraph` (Segmenter does not support it).
- The selection spans multiple text nodes (rare — single-text-node
  selections are the common case for NER-style span labelling).
- `Intl.Segmenter` throws (unsupported locale, unusual DOM). A
  console warning is emitted and the browser `Selection.modify` path
  runs instead.

## Six ready-made template presets

Every one of the six African-language NER presets ships in the
project-creation Labeling Interface picker under **Natural Language
Processing**. Each is pre-configured with the correct `dir`, `lang`,
and `granularity="word"` attributes:

| Preset | Language | BCP 47 tag | Script | Direction |
|---|---|---|---|---|
| NER — Arabic (RTL, Arabic script) | Arabic | `ar` | Arabic | RTL |
| NER — Hausa Ajami | Hausa | `ha-Arab` | Arabic (Ajami) | RTL |
| NER — Kanuri Ajami | Kanuri | `kr-Arab` | Arabic (Ajami) | RTL |
| NER — Fulfulde Ajami | Fulfulde | `ff-Arab` | Arabic (Ajami) | RTL |
| NER — Amharic (Ge'ez script) | Amharic | `am` | Ge'ez | LTR |
| NER — Tamazight (Tifinagh script) | Standard Moroccan Tamazight | `zgh-Tfng` | Tifinagh | LTR |

Each preset carries a label-set rationale in its **details** panel.
Amharic ships with an extra `TITL` label reflecting the load-bearing
role of Amharic honorifics (አቶ / ወ/ሮ / ወ/ሪት / ዶክተር) in downstream
systems; the other five presets use the standard PER / ORG / LOC /
DATE / MISC quintet.

## Verifying end-to-end

The three shipped patches map onto three quick checks against any of
the RTL template presets:

1. **Bidi rendering.** Load a task with Arabic text. Words should
   appear in original order right-to-left. Before slice 1, the schema
   stripped `dir="rtl"` silently and the browser rendered
   left-to-right — words visibly scrambled once you tried to select
   or label a span.
2. **ICU word snapping.** Double-click any word (or click-drag a
   partial word). The selection should snap to the full word by ICU
   rules for the tag's `lang`. On an English `Text lang="en"` the
   Latin-default behaviour is preserved; on `lang="am"` you get
   Amharic-specific segmentation instead of whatever the browser's
   locale exposes.
3. **Round-trip preservation.** Label a span, submit the annotation,
   reload the task. The region persists and the container still
   carries the `dir` / `lang` / `unicodeBidi` attributes.

## Related pages

- [`<Text>` tag reference](/annotate/labeling-config/tags/text) —
  full attribute list including the four RTL attributes.
- [`<HyperText>` tag reference](/annotate/labeling-config/tags/hypertext) —
  same four attributes are accepted on HyperText.
- [Labelling config overview](/annotate/labeling-config/overview) — how the
  XML config composes.
