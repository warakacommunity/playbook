---
title: Speech
sidebar_label: Overview
ready: true
last_update:
  date: 2026-11-24
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

### Make speaker profiles optional and deliberate

Before a contributor's first recording, offer a speaker-profile step with nothing preselected. Every field may be left blank or answered "prefer not to say", and declining does not block contribution. Use coarse fields such as age band rather than birthdate, gender, and language varieties listed strongest first. Do not ask reviewers who only correct clips to complete a speaker profile.

Take separate, versioned consent before attaching these fields to released rows. Without it, omit the fields entirely rather than exporting blanks. Apply revocation at the next export. Never attach one person's profile to a row that combines several speakers, and release demographics only in aggregate unless the speaker opted into row-level release. See [Purpose limitation and downstream use](../legal-consent/index.md#purpose-limitation-and-downstream-use).

## Tasks
- **ASR (Automatic Speech Recognition)** – (transcription, multilingual ASR, code-switching)
- **TTS (Text-to-Speech)** – (single-speaker, multi-speaker, expressive TTS)
- **Speech-to-Speech Translation (STS)** – (direct speech translation across languages)
- **Audio Understanding** – (audio classification, sound event detection)
- **Speech emotion recognition**
- **Speaker diarization**
