---
title: "Audio"
sidebar_label: "Audio"
description: "Object tag — The Audio tag plays audio and shows its waveform. Use for audio annotation tasks where you want to label regions of audio, see the waveform, and manipulate audio during annotation."
mdx:
  format: md
---

# `<Audio>`

**Category:** Object tag

The Audio tag plays audio and shows its waveform. Use for audio annotation tasks where you want to label regions of audio, see the waveform, and manipulate audio during annotation.

Use with the following data types: audio

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| value | string | **yes** | — | Data field containing path or a URL to the audio. |
| defaultspeed | string | no | `1` | Default speed level (from 0.5 to 2). |
| defaultscale | string | no | `1` | Audio pane default y-scale for waveform. |
| defaultzoom | string | no | `1` | Default zoom level for waveform. (from 1 to 1500). |
| defaultvolume | string | no | `1` | Default volume level (from 0 to 1). |
| hotkey | string | no | — | Hotkey used to play or pause audio. |
| sync | string | no | — | Object name to sync with. |
| height | string | no | `96` | Total height of the audio player. |
| waveheight | string | no | `32` | Minimum height of a waveform when in `splitchannels` mode with multiple channels to display. |
| spectrogram | true,false | no | `false` | Determines whether an audio spectrogram is automatically displayed upon loading. |
| splitchannels | true,false | no | `false` | Display multiple audio channels separately, if the audio file has more than one channel. (**NOTE: Requires more memory to operate.**) |
| decoder | string | no | `webaudio` | Decoder type to use to decode audio data. (`"webaudio"`, `"ffmpeg"`, or `"none"` for no decoding - provides fast loading for large files but disables waveform visualization) |
| player | string | no | `html5` | Player type to use to play audio data. (`"html5"` or `"webaudio"`) |

## Examples

### Example

Play audio on the labeling interface

```html
<View>
  <Audio name="audio" value="$audio" />
</View>
```

### Example

Play audio with multichannel support

```html
<View>
  <Audio name="audio" value="$audio" splitchannels="true" />
</View>
```

### Example

Audio classification

```html
<View>
  <Audio name="audio" value="$audio" />
  <Choices name="ch" toName="audio">
    <Choice value="Positive" />
    <Choice value="Negative" />
  </Choices>
</View>
```

### Example

Audio transcription

```html
<View>
  <Audio name="audio" value="$audio" />
  <TextArea name="ta" toName="audio" />
</View>
```

### Example

Labeling configuration to label regions of audio and rate the audio sample

```html
<View>
  <Labels name="lbl-1" toName="audio-1">
    <Label value="Guitar" />
    <Label value="Drums" />
  </Labels>
  <Rating name="rate-1" toName="audio-1" />
  <Audio name="audio-1" value="$audio" />
</View>
```

### Example

Sync with video

```html
<View>
  <Video name="video-1" value="$video" sync="audio-1" />
  <Labels name="lbl-1" toName="audio-1">
    <Label value="Guitar" />
    <Label value="Drums" />
  </Labels>
  <Audio name="audio-1" value="$video" sync="video-1" />
</View>
```

### Example

Sync with paragraphs

```html
<View>
  <Labels name="lbl-1" toName="audio-1">
    <Label value="Guitar" />
    <Label value="Drums" />
  </Labels>
  <Audio name="audio-1" value="$audio" sync="txt-1" />
  <Paragraphs audioUrl="$audio" sync="audio-1" name="txt-1" value="$text" layout="dialogue" showplayer="true" />
</View>
```

