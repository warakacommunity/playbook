---
title: "AudioRecord"
sidebar_label: "AudioRecord"
description: "Object tag — The AudioRecord tag lets annotators record audio in-browser via the microphone — useful for ASR corpus collection, pronunciation comparison, voice prompts. Captures WebM/Opus by default with configurable bitrate, sample rate, and noise/echo cancellation. Optional live waveform display while recording."
mdx:
  format: md
---

# `<AudioRecord>`

**Category:** Object tag · **AfriAnnotate-specific**

The AudioRecord tag lets annotators record audio in-browser via the microphone — useful for ASR corpus collection, pronunciation comparison, voice prompts. Captures WebM/Opus by default with configurable bitrate, sample rate, and noise/echo cancellation. Optional live waveform display while recording.

Use with the following data types: live audio capture (no source data required).

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| toname | string | no | — | Name of the object tag the recording is associated with (optional — AudioRecord can stand alone). |
| value | string | no | — | Optional. Data field to pre-fill the recording from (e.g. a reference audio URL). |
| mimetype | string | no | `audio/webm;codecs=opus` | MIME type for the captured audio. Defaults to WebM/Opus — broadly supported by browsers; switch to audio/wav for downstream pipelines that require uncompressed audio. |
| maxduration | string | no | `300` | Maximum recording duration in seconds. Recording auto-stops at this length. |
| bitspersecond | string | no | `64000` | Audio bitrate. Higher = better quality, larger files. 64000 (64 kbps) is a good balance for speech. |
| samplerate | string | no | `16000` | Sample rate in Hz. 16000 is standard for ASR. Use 44100 or 48000 for music / general audio. |
| noisesuppression | boolean | no | `true` | Enable browser noise suppression. Off when capturing exemplar speech for ASR training (you want the noise). |
| echocancellation | boolean | no | `true` | Enable browser echo cancellation. Off in studio conditions. |
| autogaincontrol | boolean | no | `false` | Enable browser auto-gain control. Off for consistent loudness measurements. |
| live | string | no | `peak` | Live display mode while recording. "peak" shows a peak-meter, "waveform" shows a scrolling waveform, "none" hides live feedback. |
| qc | string | no | — | Comma-separated list of server-side quality-control checks to run on the recorded audio (e.g. "clipping,silence,snr"). Failed checks land as audit warnings on the annotation. See Audio QC docs. |
| hotkey | string | no | — | Hotkey to start/stop recording. |
| align | left,center,right | no | `center` | Alignment of the recorder UI within its container. |
| padding | string | no | — | CSS padding around the recorder UI. |

## Examples

### Example

Simple voice-prompt collection — annotator records up to 30 s of
audio in WebM/Opus, no waveform display:

```html
<View>
  <Audio name="prompt" value="$prompt_url"/>
  <Header value="Listen to the prompt, then record yourself reading it back."/>
  <AudioRecord
    name="response"
    toname="prompt"
    maxduration="30"
    live="none"
  />
</View>
```

### Example

ASR-quality capture for a Hausa corpus — 16 kHz mono WAV, noise
suppression disabled to preserve background-noise samples, live peak
meter, server-side QC checks for clipping + silence:

```html
<View>
  <Header value="Read the sentence aloud at a normal speaking pace."/>
  <Text name="sentence" value="$text"/>
  <AudioRecord
    name="utterance"
    toname="sentence"
    mimetype="audio/wav"
    samplerate="16000"
    bitspersecond="256000"
    maxduration="60"
    noisesuppression="false"
    echocancellation="false"
    autogaincontrol="false"
    live="peak"
    qc="clipping,silence,snr"
  />
</View>
```

### Example

Standalone recording (no source data) — useful when the annotator
chooses what to say (e.g. naming a list of items in their native
language):

```html
<View>
  <Header value="Say the word for 'good morning' in your language."/>
  <AudioRecord
    name="greeting"
    maxduration="10"
    live="waveform"
  />
</View>
```

