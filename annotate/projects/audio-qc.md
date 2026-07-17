---
title: "Audio QC"
sidebar_label: "Audio QC"
sidebar_position: 5
description: "Server-side quality control for audio recordings — duration, peak, loudness, SNR, speech ratio, plus opt-in heavy checks (Whisper transcript match, MOS, speaker consistency)."
mdx:
  format: md
---

# Audio QC

When a project contains the `<AudioRecord>` tag, every submission can
optionally run through a pipeline of automated quality checks
**server-side**, before the annotation is accepted into the corpus.

This is AfriAnnotate-specific — built for ASR / TTS corpus collection
at scale, where bad recordings (clipped, silent, off-prompt, wrong
speaker) need to be caught at submit time rather than discovered at
training time.

## What it checks

Three tiers of checks, governed by the project's
**Audio QC configuration**:

### Tier 1 — Cheap, default-enabled

These run in-process on the cloud Django and add sub-second latency
per minute of audio.

| Check | Default | Fails when |
|---|---|---|
| **Duration** | 1 s – 300 s | Recording shorter or longer than the bounds |
| **DC offset** | `\|mean\| ≤ 0.01` | Microphone signal has a constant DC bias |
| **True peak** | ≤ -1 dBTP | ITU-R BS.1770 true peak via 4× oversampling |
| **Clipping** | < 0.1 % samples at threshold, no runs ≥ 10 | Two-prong: too many clipped samples or any long run |
| **Loudness** | -23 LUFS ± 4 (EBU R128) | Recording too quiet or too loud |
| **SNR** | ≥ 15 dB (good ≥ 20) | Signal-to-noise from VAD-derived speech/noise frames |
| **Speech ratio** | ≥ 0.6 | Less than 60 % of frames contain speech |
| **Leading silence** | ≤ 1.5 s | Long quiet head suggests muddled start |
| **Trailing silence** | ≤ 1.5 s | Long quiet tail suggests muddled end |
| **Internal silence** | No run ≥ 2 s | Long mid-recording pause — often a skipped line |

Thresholds are conservative — better to flag for review than let bad
data into the corpus. Tune per project in **Project → Settings →
Audio QC**.

### Tier 2 — Heavy, opt-in

These call out to ML models (Whisper, MMS, ECAPA-TDNN, DNSMOS,
NISQA). Run either in-process (CPU-only) or via an external
**MLBackend** for GPU acceleration.

| Check | Model | What it catches |
|---|---|---|
| **Transcript match** | `whisper-tiny-int8` | CER between Whisper's decode of the audio and the prompted text. Fails when CER > 0.30 (raise to 0.40 for low-resource African languages). Catches "didn't read the prompt" |
| **Language ID** | `whisper-tiny` or VoxLingua107 | Verifies the speaker actually spoke the expected language |
| **Forced alignment** | Meta MMS (`facebook/mms-1b-fl102`, 1107 languages) | Word-level timing + min confidence threshold |
| **MOS (DNSMOS)** | Microsoft DNSMOS-P.835 ONNX | Predicts SIG / BAK / OVRL on 1–5 scale. Fails when OVRL < 3.0 |
| **MOS (NISQA)** | NISQA v2 | Overall MOS + sub-scores (noisiness, coloration, discontinuity, loudness) |
| **Speaker consistency** | ECAPA-TDNN | Mid-recording speaker swap detection via windowed cosine similarity |

All heavy checks are **default-off**. Operators opt in per project.

### Tier 3 — Hard rejects (regardless of action setting)

Some failures are corruption-level and always block submission, even
if the project's action policy is "Warn but accept":

- Duration below 1 s (the floor of the duration check)
- Speech ratio below 0.2 (basically silence)
- Clipping > 1 % of samples (catastrophic, indicates clipping the
  preamp, not just one loud word)

## Action on fail

When at least one non-hard-reject check fails, the project's
**Action on fail** setting decides what happens:

| Action | Behaviour |
|---|---|
| **Warn but accept** | Annotation accepted; failure appears as a warning on the audit log + the task's QC tab |
| **Accept and force into review queue** (default) | Annotation accepted but the task is automatically routed to a Reviewer for sign-off |
| **Reject — annotator must re-record** | Annotation rejected; the labeling UI shows the failed checks + a "Re-record" button |
| **Block — submit button disabled** | Same as Reject but the failure surfaces *live* in the labeling UI (the recorder shows red on the failing meter before submit is attempted) |

Hard-reject failures (duration too short, > 1 % clipping, speech
ratio < 0.2) always trigger **block-equivalent** behaviour regardless
of the setting — those are corruption-level, not policy decisions.

## Dispatch modes

Where the QC pipeline runs:

- **In-process** (default) — runs inside the cloud Django process,
  same machine that received the submit. Cheap checks complete in
  ~50-200 ms per minute of audio. Heavy checks run too but slowly.
  Adequate for small teams + cheap-only configurations.
- **MLBackend** — heavy checks are dispatched to an external GPU
  service via the standard `MLBackend` integration. Cheap checks
  still run in-process. Adequate for scale + heavy-check projects.

Configure via **Project → Settings → Audio QC → Dispatch mode**.

## How a check failure surfaces

Three places:

1. **Live in the labeler** (when Action = Block submission): the
   recorder's meters turn red BEFORE the annotator submits. Useful
   for the catch-clipping case where they can immediately re-record.
2. **At submit time** (all Actions): the Submit response includes a
   `qc` block listing every check that failed, with diagnostic
   values. The SPA shows them as a toast + persists them in the
   annotation's `meta` field.
3. **On the Task page** under a new **QC** tab: the failed checks
   plus the diagnostic values, plus a "Why did this fail?" inline
   help that explains the specific threshold the recording missed.

Audit-log entries (`AuditEvent.type = 'audio_qc.failed'`) include the
task ID, the annotator, the failed check names, and the
diagnostic values. Filterable in **Platform → Audit log**.

## Live-capture settings

A subset of the config (under `live`) affects the **browser-side
recorder behaviour** rather than server-side checks:

- **Show peak meter**: tiny real-time clip indicator next to the
  record button
- **Show SNR meter**: real-time SNR estimate (CPU-heavy on mobile —
  default off)
- **Min / max duration**: hard caps in the recorder UI (server cuts
  overage too)
- **WPM range / syllables-per-second range**: post-recording sanity
  warning if reading speed is wildly off (per-language; Bantu and
  Yoruba use sylls/sec rather than WPM)
- **Browser audio constraints**: noise suppression / echo cancellation
  / auto-gain control toggles that the WebAudio MediaRecorder uses

The recorder reads these via `<AudioRecord>` attributes — see the
[tag reference](/annotate/labeling-config/tags/audiorecord) for what the
config does at runtime.

## Silence gate

Optional gate that prevents recording from starting until the
ambient noise drops below a threshold for a continuous window. Off
by default — useful for corpora collected in uncontrolled
environments (homes, shared offices, outdoors) where noisy starts
contaminate downstream ASR / TTS training.

Configure under `silence_gate` in the Audio QC config:

- `enabled` — turn the gate on
- `threshold_db` — peak below which counts as "quiet" (typical
  residential noise floors run -50 to -45 dBFS)
- `window_seconds` — how long the level must stay quiet before the
  recorder unlocks
- `tolerance_db` — hysteresis above the threshold to prevent
  fluttering when ambient sits exactly on the line

## Auto-enable behaviour

`audio_qc_enabled` is auto-flipped to **true** when the project's
labeling config contains an `<AudioRecord>` tag. Owners can manually
disable it. Auto-enabled is the right default — once you've added a
recorder, you almost certainly want the checks running.

## Customising the config

The `audio_qc_config` field on the project is a freeform JSON blob
that merges over the default config defined at
`label_studio/audio_qc/config.py:DEFAULT_CONFIG`. Anything not
overridden falls back to default values.

In the UI, **Project → Settings → Audio QC** edits this JSON via a
form (per-check checkboxes + threshold inputs). Power users can edit
the raw JSON via the API:

```bash
curl -X PATCH "https://label.afriannotate.org/api/projects/<id>" \
  -H "Authorization: Bearer YOUR_PAT" \
  -H "Content-Type: application/json" \
  -d '{"audio_qc_config": {"checks": {"snr": {"min_db": 18.0}}}}'
```

## What's next

- **[`<AudioRecord>` tag reference →](/annotate/labeling-config/tags/audiorecord)** —
  attribute reference for the recorder itself
- **[`<AudioTextAlign>` tag reference →](/annotate/labeling-config/tags/audiotextalign)** —
  the alignment tag for forced-alignment corpora
- **[Project settings →](/annotate/projects/setup)** — the rest of the per-project
  configuration
