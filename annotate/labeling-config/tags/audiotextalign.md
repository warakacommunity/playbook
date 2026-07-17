---
title: "AudioTextAlign"
sidebar_label: "AudioTextAlign"
description: "Object tag — The AudioTextAlign tag pairs an audio clip with its transcript and lets annotators align words / tokens to time positions in the audio. Useful for forced-alignment correction, prosody annotation, and building TTS training corpora."
mdx:
  format: md
---

# `<AudioTextAlign>`

**Category:** Object tag · **AfriAnnotate-specific**

The AudioTextAlign tag pairs an audio clip with its transcript and lets annotators align words / tokens to time positions in the audio. Useful for forced-alignment correction, prosody annotation, and building TTS training corpora.

Use with the following data types: audio + matching transcript text.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| value | string | **yes** | — | Data field containing the audio URL. |
| toname | string | no | — | Name of the object tag the alignment is associated with (optional). |
| totext | string | no | — | Name of a Text tag whose transcript drives the alignable tokens (alternative to inline transcript). |
| transcript | string | no | — | Inline transcript text. Either this or totext is required. |
| granularity | word,phoneme | no | `word` | Alignment granularity — "word" (default) or "phoneme" (requires pre-computed phoneme tokens). |
| autoalign | string | no | — | Pre-compute alignment via a server-side model. Set to the model identifier (e.g. "whisper-ha", "mfa") or leave null for manual alignment. |
| decoder | string | no | `webaudio` | Audio decoder backend — "webaudio" (default, browser-native) or "wavesurfer" (separate render layer for very long files). |
| player | compact,full,minimal | no | `compact` | Visual style of the audio player. |
| mode | token,span | no | `token` | "token" mode lets annotators drag tokens onto the waveform; "span" mode lets them paint timespans and assign tokens to each. |
| tokens | string | no | — | Comma-separated override of the tokens to align (default: split transcript on whitespace). |
| tiers | string | no | — | Comma-separated tier hierarchy for multi-level ELAN-style alignment. Each entry is a tier name in hierarchy order; each is child of the previous unless the entry uses the optional `:parent[:derivation]` suffix (e.g. `"utt,word:utt:subdivision,phone:word:subdivision"`). Empty (default) keeps the single implicit "word" tier — pre-3.2 configs round-trip unchanged. Backend `.eaf` import at `POST /api/tasks/<pk>/audio-text-align/import-eaf` produces payloads that populate all declared tiers. |
| timelock | on,off | no | *auto* | Enforce that child-tier rows sit within their parent's `[start, end]` interval. On when multiple tiers are declared, off otherwise. When on, the UI paints violating rows red and shows a warning banner counting them; annotators can still edit but the state is visible. |

## Examples

### Example

Word-level alignment with inline transcript — annotator drags each
word token onto the waveform to place its start/end time:

```html
<View>
  <Header value="Drag each word to its position in the audio."/>
  <AudioTextAlign
    name="align"
    value="$audio_url"
    transcript="Sannu da zuwa Aljanna"
    granularity="word"
    mode="token"
    player="compact"
  />
</View>
```

### Example

Pre-aligned via Whisper, annotator only corrects misalignments —
much faster for long-form audio:

```html
<View>
  <AudioTextAlign
    name="align"
    value="$audio_url"
    transcript="$transcript"
    autoalign="whisper-ha"
    granularity="word"
    mode="token"
  />
</View>
```

### Example

Span mode for noisy audio — instead of placing token boundaries
exactly, the annotator paints timespans and assigns the
appropriate token to each:

```html
<View>
  <AudioTextAlign
    name="align"
    value="$audio_url"
    totext="text"
    mode="span"
    player="full"
    decoder="wavesurfer"
  />
  <Text name="text" value="$transcript"/>
</View>
```

### Example — ELAN-style multi-tier alignment

Declare a tier hierarchy (`utterance → word → phoneme`) so annotators
can move between granularities without leaving the tag. The mini
track view under the audio player renders one horizontal strip per
tier, filled bars for aligned intervals, red bars for time-lock
violations (child rows outside their parent's `[start, end]`). Import
existing corpora via `POST /api/tasks/<pk>/audio-text-align/import-eaf`
with a multipart `.eaf` upload — the parser handles ELAN's `TIER`,
`TIME_ORDER`, `ALIGNABLE_ANNOTATION`, and `REF_ANNOTATION` shapes and
returns a payload shaped exactly like `result.value.audiotextalign`.

```html
<View>
  <AudioTextAlign
    name="align"
    value="$audio_url"
    transcript="$transcript"
    tiers="utterance,word:utterance:subdivision,phone:word:subdivision"
    mode="span"
  />
</View>
```

