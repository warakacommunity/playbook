---
title: Speech
sidebar_label: Overview
ready: true
last_update:
  date: 2026-11-26
  author: Idris Abdulmumin
---

# Speech

Collecting and labelling audio for African languages. The tasks below share the same
recording, consent and quality groundwork; they differ in what is produced from the audio.

## Shared across speech data

- Speaker recruitment, consent & voice rights
- Recording setup & environment (device, microphone, background noise, [capture processing](../asr/audio-quality-control.md#decide-the-corpus-purpose-first)): decide first whether the corpus is for robust ASR or clean TTS
- [Capture-time feedback](../asr/index.md#give-feedback-while-the-speaker-can-still-re-record): show input level and actionable clipping, low-input and silence warnings while re-recording is still possible
- Audio formats, sample rates & file standards
- [Audio quality control](../asr/audio-quality-control.md) (duration, clipping, loudness, SNR, silence, and what to do when a check fails)
- Transcription conventions (orthography, code-switching, disfluencies)
- Metadata (speaker demographics, device, environment, locale)
- Licensing & ethical handling of voices
- [Optional speaker profiles](../legal-consent/index.md#purpose-limitation-and-downstream-use): nothing preselected, coarse fields, separate consent before release

## Tasks
- **ASR (Automatic Speech Recognition)**: transcription, multilingual ASR, code-switching
- **TTS (Text-to-Speech)**: single-speaker, multi-speaker, expressive TTS
- **Speech-to-Speech Translation (STS)**: direct speech translation across languages
- **Audio Understanding**: audio classification, sound event detection
- **Speech emotion recognition**
- **Speaker diarization**
