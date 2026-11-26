---
title: Audio Quality Control
sidebar_position: 2
ready: true
last_update:
  date: 2026-11-26
  author: Seid Muhie Yimam
---

# Audio Quality Control

A speech corpus is only as good as its worst clips. A clipped, silent or truncated recording costs a contributor a few seconds to re-record on the day, and a team weeks if the problem surfaces during training. Automated quality control (QC) catches these problems as each clip arrives, before a human validator spends time on it and long before it reaches a model.

This page is the shared home for audio QC across the speech chapters. It covers:

- deciding what the corpus is for;
- cheap signal checks that every clip should pass;
- optional model-based checks;
- the short list of failures that always block a clip;
- what should happen when a check fails, and how to tune the thresholds.

The [ASR](./index.md) and [Text-to-Speech](../text-to-speech/index.md) chapters cover the rest of each pipeline. The [agri-advisory speech layer](../agri-advisory/speech-layer.md#quality-control) shows automated QC and human validation working together on field recordings.

:::tip[Key points]

- Decide whether the corpus is for robust ASR or clean TTS before you set any threshold.
- Run cheap signal checks on every clip at upload, and store the measured values, not just pass or fail.
- Treat model-based scores as triage for a human, never as an automatic rejection.
- Block only clips no one could use; give every other failure a graded response.
- Give validators the same criteria as the automated checks, and tune every number on pilot data.

:::

## Decide the corpus purpose first

The same recording can be good data for one corpus and bad data for another. Background chatter in a market recording is exactly what a robust ASR model needs to learn from; the same chatter baked into a TTS voice is a defect the listener hears in every sentence. Decide what the corpus is for before you set any threshold, because the purpose changes which findings are failures and which are only warnings.

| Aspect | Robust ASR corpus | Clean TTS corpus |
|---|---|---|
| Background noise and voices | Useful data: keep them | A defect: require a quiet room |
| SNR, loudness, minor clipping | Log as warnings | Enforce; re-record marginal clips |
| Hard rejection | Only corruption: near-empty audio, almost no speech, severe clipping | Corruption, plus clips whose background noise is above the strict noise-floor limit (send these back for a re-record) |
| Device noise suppression and gain control | Off, unless deployment audio passes through the same processing | Off |
| What a validator accepts | Every word intelligible, whatever the background | Every word intelligible, quiet background, steady level |

**Robust ASR.** Real deployment audio is noisy, and a model trained only on quiet clips fails on it, which is why community-recorded corpora generalise better than studio ones (see [what African-language speech varies on](./index.md#what-african-language-speech-actually-varies-on)).

**Clean TTS.** A synthetic voice reproduces whatever is in its training audio, noise included; the [TTS recording pipeline](../text-to-speech/index.md#recording-pipeline) covers the studio side.

**Capture processing.** Browsers and phone apps can apply noise suppression, echo cancellation and automatic gain control to the microphone signal before your code ever sees it.

- Noise suppression removes the very ambience a robust ASR corpus is meant to keep.
- Automatic gain control changes the level as the speaker talks, so loudness measurements stop meaning anything.
- Whether these are on by default varies by browser and device, so do not assume.

In a web recorder, request each one explicitly in the capture constraints (`noiseSuppression`, `echoCancellation` and `autoGainControl`, set to false). Then read back the settings actually applied with `getSettings()` and store them with each clip, because a browser may not honour a request ([MDN Web Docs, 2026e](../references.md#mdn-media-track-constraints)).

The one exception is when deployment audio passes through the same processing, for example a voice-note app that always suppresses noise. Capturing through it then matches the deployment condition.

**One threshold table.** Write the chosen thresholds in a single table and hand the same criteria to the automated checks, the recording instructions and the human validators (the validators' criteria card is in [Peer validation of crowd recordings](./index.md#peer-validation-of-crowd-recordings)). If the machines warn on noise but the validators were told to reject noisy clips, validators will throw away exactly the audio that makes an ASR model robust. Record the chosen purpose, the thresholds and the capture settings in the [dataset card](../templates/dataset-card.md), so users know what kind of audio they are getting.

## Tier 1: signal checks on every clip

These checks are cheap. They need only the waveform, run quickly on an ordinary CPU, and should run on every clip at upload. The example values below are illustrative starting points to tune on your own pilot data ([Tuning the thresholds](#tuning-the-thresholds)). Only the true-peak and loudness references come from a published standard.

| Check | What it measures | Example starting point |
|---|---|---|
| Duration | Clip length against the expected range for the prompt | For example, at least 1 second and no longer than the longest prompt needs |
| DC offset | A constant bias in the signal, usually a faulty microphone or interface | For example, mean sample value close to zero (absolute mean of 0.01 or less) |
| True peak | The highest level of the reconstructed signal, measured with oversampling ([ITU-R, 2023](../references.md#itu-bs1770)) | For example, at or below -1 dBTP, the production ceiling in EBU R 128 |
| Clipping | The share of samples at full scale, and the longest run of consecutive clipped samples | For example, fewer than 0.1% of samples clipped and no long runs |
| Integrated loudness | Perceived loudness over the clip, in LUFS ([ITU-R, 2023](../references.md#itu-bs1770)) | A project-chosen window around a reference level (see below) |
| Signal-to-noise ratio | Energy in speech frames against energy in non-speech frames, using voice activity detection (VAD) | For example, 15 dB or more for clean speech; a warning only for robust ASR |
| Speech ratio | The share of frames that contain speech | For example, at least 60% of frames |
| Leading and trailing silence | Quiet before the first and after the last speech | For example, no more than 1.5 seconds at either end |
| Internal silence | The longest pause inside the clip | For example, no pause longer than 2 seconds; a long gap often means a skipped line |

**Loudness reference.** Integrated loudness is measured with the algorithm in ITU-R BS.1770 ([ITU-R, 2023](../references.md#itu-bs1770)). The EBU R 128 broadcast recommendation normalises programmes to -23 LUFS, with a permitted deviation of ±0.5 LU (±1 LU where that is not practically achievable, for example in live programmes), and caps true peak at -1 dBTP ([European Broadcasting Union, 2014](../references.md#ebu-r128)). That tolerance was set for finished broadcast programmes. A speech corpus recorded on many phones in many rooms will never hit it, so use -23 LUFS as a reference point with a much wider window chosen by the project (for example, ±4 LU), and flag rather than reject clips outside it.

**SNR depends on VAD.** SNR here is estimated, not measured: a voice activity detector splits the clip into speech and non-speech frames, and the ratio of their energies stands in for the true SNR. If the clip has almost no silence, or the VAD mistakes steady background noise for speech, the estimate is unreliable. That is one more reason to treat SNR as a warning for robust ASR rather than a gate.

The sketch below computes most tier 1 values for one clip. It uses the `soundfile` and [`pyloudnorm`](https://github.com/csteinmetz1/pyloudnorm) packages, with pyloudnorm providing a BS.1770 loudness meter. The energy-based speech detector is a deliberately crude stand-in: replace it with a proper VAD in production.

```python title="audio_qc.py"
# pip install soundfile pyloudnorm numpy scipy
import numpy as np
import soundfile as sf
import pyloudnorm as pyln
from scipy.signal import resample_poly

def tier1_metrics(path, frame_ms=30, clip_level=0.999):
    audio, sr = sf.read(path, always_2d=True)
    x = audio.mean(axis=1)                       # mix down to mono

    duration = len(x) / sr
    dc_offset = float(np.mean(x))
    if duration < 0.4:
        # Too short for BS.1770 gating (400 ms blocks); tier 3 blocks these anyway.
        return {"duration_s": duration, "dc_offset": dc_offset, "too_short": True}

    # True peak: oversample 4x so peaks between samples are caught.
    true_peak = np.max(np.abs(resample_poly(x, 4, 1)))
    true_peak_dbtp = 20 * np.log10(max(true_peak, 1e-12))

    # Clipping: share of samples at full scale, and the longest clipped run.
    clipped = np.abs(x) >= clip_level
    clip_share = float(clipped.mean())
    edges = np.flatnonzero(np.diff(np.concatenate(([0], clipped.astype(int), [0]))))
    longest_run = int((edges[1::2] - edges[::2]).max()) if edges.size else 0

    # Integrated loudness per ITU-R BS.1770.
    loudness_lufs = pyln.Meter(sr).integrated_loudness(x)

    # Crude energy-based speech detection (use a real VAD in production).
    n = int(sr * frame_ms / 1000)
    frames = x[: len(x) // n * n].reshape(-1, n)
    energy = (frames ** 2).mean(axis=1) + 1e-12
    noise_floor = np.percentile(energy, 10)
    is_speech = energy > noise_floor * 10        # 10 dB above the quietest frames
    speech_ratio = float(is_speech.mean())
    if is_speech.any() and (~is_speech).any():
        snr_db = 10 * np.log10(energy[is_speech].mean() / energy[~is_speech].mean())
    else:
        snr_db = None                            # cannot estimate: no speech or no silence

    speech_idx = np.flatnonzero(is_speech)
    lead_s = speech_idx[0] * frame_ms / 1000 if speech_idx.size else duration
    trail_s = (len(is_speech) - 1 - speech_idx[-1]) * frame_ms / 1000 if speech_idx.size else duration

    return {
        "duration_s": duration, "dc_offset": dc_offset,
        "true_peak_dbtp": true_peak_dbtp, "clip_share": clip_share,
        "longest_clip_run": longest_run, "loudness_lufs": loudness_lufs,
        "snr_db": snr_db, "speech_ratio": speech_ratio,
        "leading_silence_s": lead_s, "trailing_silence_s": trail_s,
    }
```

Store the returned values with the clip, not just a pass or fail. The values are what let you tune thresholds later, explain a failure to a contributor, and report the distribution in the dataset card.

## Tier 2: model-based checks (optional)

Some failures are invisible to signal checks: a contributor who read a different sentence, spoke another language, or handed the phone to someone else halfway through. Pretrained models can flag these, but each result is a triage signal rather than a verdict:

- **Prompt mismatch.** Decode the clip with a multilingual ASR model such as MMS and compute CER against the prompt ([Pratap et al., 2023](../references.md#pratap-2023)). A high value can mean a wrong reading, a different orthography, or a recogniser that does not know the language.
- **Unexpected language.** Run spoken language identification and compare its prediction with the languages the clip is meant to contain. MMS also released a spoken language-identification model covering several thousand languages ([Pratap et al., 2023](../references.md#pratap-2023)), but its accuracy on a given African language still needs checking locally. Code-switching is not automatically an error.
- **Speaker change.** Compare fixed-length speaker embeddings across windows of the clip. ECAPA-TDNN is one speaker-verification architecture that produces such embeddings ([Desplanques et al., 2020](../references.md#desplanques-2020)); a change of similarity can flag a possible change of speaker for listening.
- **Predicted perceptual quality.** DNSMOS P.835 predicts speech quality (`SIG`), background-noise quality (`BAK`) and overall quality (`OVRL`) from P.835 human ratings ([Reddy et al., 2021](../references.md#reddy-2021)). NISQA predicts overall quality plus noisiness, coloration, discontinuity and loudness ([Mittag et al., 2021](../references.md#mittag-2021)). Use either as a review signal, not as a universal quality threshold.
- **Alignment confidence.** Forced alignment can add word timings and a confidence signal (see [time alignment in the ASR chapter](./index.md#time-alignment-word-and-phoneme-timestamps)).

These checks cost far more than tier 1, usually need a GPU at scale, and rest on models that are often weak on African languages. A low score may say more about the model than the clip. Keep them optional, calibrate them on locally reviewed clips, and send failures to a human reviewer rather than rejecting the clip automatically. The same caution applies when the audio is intended for TTS: a model score cannot decide whether a voice is suitable for release.

## Tier 3: failures that always block

A few failures are not a matter of policy, because no reviewer could use the clip whatever the corpus is for. Keep them on one short list, and block these clips however lenient the rest of your QC policy is:

- **Near-empty audio**: a clip below the minimum duration, or with no decodable audio at all.
- **Almost no speech**: a speech ratio so low the clip is effectively silence (for example, under 20% of frames).
- **Severe clipping**: a share of clipped samples that points to an overloaded input rather than one loud word (for example, more than 1% of samples).
- **Wrong format**: a file that does not decode, or has a sample rate or channel count your pipeline cannot accept.

Keep this list short. Every item added here removes a decision from human validators, and for a robust ASR corpus most quality findings belong in tier 1 as warnings.

## What happens when a check fails

A failed check does not need one fixed consequence. Choose one of four graded responses for each check, or for each group of checks:

| Response | What happens | Use it for |
|---|---|---|
| Accept with a warning | The clip enters the pool; the warning is logged | Findings that are expected in this corpus, such as low SNR in robust ASR |
| Accept and send to review | The clip is kept, but a person must sign it off | A sensible default for most tier 1 and all tier 2 failures |
| Reject and ask for a re-record | The contributor learns which check failed and records again | Clean TTS corpora, and clips a re-record would clearly fix |
| Hold submission until fixed | The recorder shows the problem, and the contributor fixes it before submitting | Problems the contributor can fix on the spot, such as clipping or a long silent start |

Whatever the response, each failure should carry three things:

- **The diagnostic value**: the measured loudness or clipped share, not just "failed".
- **A plain-language message** the contributor can act on, such as "too quiet: move closer to the phone", ideally in the contributor's own language.
- **An audit record**: which clip failed which check, when, and what happened next.

The audit trail lets you fix thresholds that turn out to be wrong. It also shows reviewers and dataset users how the corpus was filtered.

Clips that the automated checks hard-blocked should never be served to human validators ([Peer validation of crowd recordings](./index.md#peer-validation-of-crowd-recordings)). Validators' time is the scarcest resource in a speech project, and it should go to the judgements machines cannot make: whether every word is intelligible, whether the clip matches the prompt, and whether the tone is right.

## Tuning the thresholds

Every number on this page is a starting point. Microphones, rooms and languages differ, and a threshold that suits one project rejects half of another's good clips.

1. **Pilot first.** Record a small pilot batch under real conditions and compute the tier 1 values for every clip.
2. **Look at the distributions.** Plot each metric and see where the clips actually fall before choosing a cut-off.
3. **Listen at the edges.** Have native speakers listen to clips just inside and just outside each candidate threshold. If they cannot hear a difference, the threshold is in the wrong place.
4. **Watch the warning and failure rates.** A check that fails a large share of clips is either catching a real setup problem (fix the setup) or set too tight (loosen it).
5. **Document the final values** in the dataset card, with the corpus purpose and capture settings, and keep the per-clip values with the release.

## What breaks

- **Validators reject the noise the corpus needs.** Automated checks allow background noise, but validators were never told, and reject it anyway. Fix: give validators the same criteria table the checks use.
- **Noise suppression on by accident.** The recorder used the device defaults, which removed the ambience a robust ASR corpus was meant to keep. Fix: set capture processing explicitly and store the applied settings per clip.
- **Broadcast thresholds applied to phone recordings.** A tight loudness window copied from broadcast practice rejects most community recordings. Fix: use the broadcast level as a reference, not a gate.
- **Pass or fail with no values.** Clips were rejected with no stored measurement, so nobody can tell whether the threshold or the recording was wrong. Fix: store the diagnostic value with every result.

