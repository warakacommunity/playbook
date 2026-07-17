---
title: "MultiModalCanvas"
sidebar_label: "MultiModalCanvas"
description: "Object tag — Binds several time-based object tags (Audio, Video, AudioTextAlign) into ONE labeling surface with ONE playhead and ONE shared-region timeline. Payoff for the 'one recording, many views' pattern common in speech, gesture, and audio-video corpus annotation."
mdx:
  format: md
---

# `<MultiModalCanvas>`

**Category:** Object tag · **AfriAnnotate-specific**

Binds several time-based object tags — Audio, Video, AudioTextAlign,
TimeSeries, AudioRecord — into a single labeling surface with a shared
playhead and a shared-region timeline. Play/pause on any child drives
all; regions drawn on the shared strip apply across every modality.

Use when your task carries multiple aligned recordings of the same
event (e.g. audio + video of a lecture, a signed conversation with
gloss transcript, an interview with speaker-diarised audio) and you
want annotators to work on all of them without switching context.

## How it works

* The canvas acts as the "conductor" of a **sync group** — its `sync=`
  attribute names the group, and every child tag with the SAME `sync=`
  value participates. Under the hood this uses the existing
  `SyncableMixin` that Audio and Video already use for cross-tag
  playback; MultiModalCanvas adds AudioTextAlign to the same group.
* The canvas exposes a unified control strip (▶/⏸ + scrubber + time
  display) at the top of the labeling area and broadcasts every
  seek / play / pause to the whole group.
* **Shared regions** — drag on the strip to create a labeled interval
  that applies to every synced tag. Region-review sidebar on the
  right lists all shared regions with click-to-seek, delete, and
  add-note controls.
* Existing per-tag regions (bounding boxes on Video, waveform regions
  on Audio) still work — they're just orthogonal to the shared
  timeline.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element. Used as the target of the `<Labels toName="...">` that colours shared regions. |
| sync | string | **yes** | — | Shared sync-group identifier. Every child tag with the same `sync=` value joins the group. |
| showtracks | `all`, `video`, `audio` | no | `all` | Which tracks the shared timeline strip visualises. `all` shows every child. |
| height | number (px) | no | `140` | Height in pixels of the shared timeline strip above the child tags. |

## Result payload

Shared regions serialize to a `multimodalcanvas` result type:

```json
{
  "from_name": "lec",
  "to_name": "lec",
  "type": "multimodalcanvas",
  "value": {
    "regions": [
      {
        "id": "mm-abc123",
        "start": 12.4,
        "end": 24.9,
        "labels": ["Segment"],
        "note": "speaker changes here",
        "origin": "canvas"
      }
    ]
  }
}
```

Per-tag regions (e.g. an Audio waveform selection or a Video bbox)
serialize as before via their own result types.

## Example

Audio + video + tier-aligned transcript, all synced under one
playhead. Labels apply to shared regions:

```html
<View>
  <MultiModalCanvas name="lec" sync="lecture">
    <Video          name="v" value="$mp4" sync="lecture"/>
    <Audio          name="a" value="$wav" sync="lecture"/>
    <AudioTextAlign name="t" value="$wav"
                    transcript="$transcript"
                    sync="lecture"
                    tiers="utterance,word:utterance:subdivision"/>
  </MultiModalCanvas>
  <Labels name="lbl" toName="lec">
    <Label value="Segment" background="#3b82f6"/>
    <Label value="Silence" background="#9ca3af"/>
    <Label value="Overlap" background="#ef4444"/>
  </Labels>
</View>
```

Play on any element drives all three; drag on the shared strip to
create a labeled shared region that spans every modality.
