---
ready: true
title: Speaker Diarization
last_update:
  date: 2026-11-26
  author: Shamsuddeen Hassan Muhammad
---

# Speaker Diarization

Speaker diarization answers "who spoke when", segmenting an audio recording by speaker. It is the task that makes multi-speaker audio usable, turning a recording of a conversation, meeting, radio panel, or interview into labelled turns that can be transcribed and analysed per speaker. For African languages it is both useful and under-resourced, and the conditions of real African audio make it harder than the benchmarks suggest.

This page is the practical guide to building diarization data and evaluation for African contexts: what the data actually looks like, the collection sources that yield useful diarization ground truth, the annotation conventions that determine whether the corpus is trainable, the evaluation choices that surface where a model fails, and the deployment realities. For transcription-based tasks see [ASR](../asr/index.md); for audio classification and event detection see [Audio Understanding](../audio-understanding/index.md).

:::tip[Key points]

- Collect audio that matches where the model will be used: overlap, noise and code-switching belong in the corpus.
- Get consent from every speaker in a recording, not only from the person who recorded it.
- Write down annotation conventions (short turns, backchannels, overlap, non-speech, speaker IDs) before labelling starts.
- Report DER per source, per condition and on overlap regions, not only one overall number.
- Start from a pretrained pipeline and spend annotation effort on its failures.

:::

![Who spoke when: speaker turns with an overlap region, and the three components of Diarization Error Rate](images/diarization-der.svg)

## Why diarization is hard for African audio

Three conditions of real African audio put pressure on diarization models in ways benchmark suites like AMI or CALLHOME do not fully anticipate.

- **Overlapping speech is common in natural conversation** and is the hardest single case for any diarization system. In African-language broadcast panels, community meetings, and market conversations, overlaps are frequent and often extended (several seconds of two or three voices simultaneously). Models trained on Western meeting data with rare, brief overlaps degrade sharply.
- **Code-switching within a single speaker** confuses models that lean on acoustic language cues to distinguish voices. A single speaker who alternates Kiswahili and English mid-conversation should be one speaker to the diarizer, but voice-embedding models that latch onto language-conditioned acoustic features can split them.
- **Recording conditions are variable**, since much community audio is captured on phones in noisy settings rather than in studios. Reverberant rooms, background music from radios, market noise, and the acoustic-quality gap between speaker positions in a panel all challenge voice-activity detection and embedding stability.

Robust African-language diarization data embraces these conditions rather than filtering them out. A corpus of studio-clean interview audio produces a model that fails on the phone-recorded community-radio panel it was built to serve.

## What the data looks like

Diarization data is multi-speaker audio annotated with speaker-turn boundaries, marking where each speaker starts and stops and which segments belong to the same person. The natural sources are exactly the kinds of recordings African projects already gather: radio broadcasts, community meetings, focus groups, and interviews.

Public diarization data for African contexts is still scarce, and most African speech corpora are single-speaker read or prompted speech with no speaker-turn labels. One of the few evaluation sets is AfriSpeech-Dialog, 50 simulated medical and non-medical conversations in African-accented English, on which the authors report a degradation of more than 10% for state-of-the-art diarization and ASR systems compared with native-accent speech ([Sanni et al., 2025](../references.md#afrispeech-dialog-2025)). Corpora in African languages themselves, with natural overlap and code-switching, largely still have to be built, which is what the rest of this page is about.

Diarization labels are stored in RTTM, the standard format the evaluation tools expect. Each line is one speaker segment: the recording id, the start time, the duration, and the speaker label, with the fixed `<NA>` placeholders the format requires:

```text
# type    file        chnl  start   dur    ortho spkr-type  speaker  conf slat
SPEAKER   panel_01    1     0.000   3.450  <NA>  <NA>       spk_A    <NA>  <NA>
SPEAKER   panel_01    1     3.450   2.100  <NA>  <NA>       spk_B    <NA>  <NA>
SPEAKER   panel_01    1     5.100   1.800  <NA>  <NA>       spk_A    <NA>  <NA>
```

Overlapping speech, the hardest case above, simply appears as two lines whose start and duration overlap in time. The speaker labels (`spk_A`, `spk_B`) only need to be consistent within a recording: there is no requirement to identify who the person actually is, only to tell the voices apart.

## Data collection: choosing the source

The right diarization corpus depends on the downstream deployment.

- **Broadcast radio panels and podcasts.** Multiple speakers, clean-ish microphones (each participant often on their own mic), predictable acoustic environment. Easy to annotate; easy for models. The reference source when the deployment target is broadcast content transcription and speaker attribution.
- **Community meetings and focus groups.** Multiple speakers, single-microphone or table-microphone setup, natural overlaps, background noise. Hard to annotate; hard for models. The reference source when the deployment target is community-work transcription, oral-history archival, or civic-tech feedback processing.
- **Phone-recorded field interviews.** Two speakers typically, phone-quality audio, variable acoustics between interviewer and interviewee, sometimes recorded on speakerphone. The reference source when the deployment is journalism, health-worker debriefs, or NGO field research.
- **Call-centre and helpline audio.** Two speakers (agent + caller) typically, telephony-band audio, well-defined turn structure. Easier for models than community meetings; harder than broadcast because of the audio-quality ceiling. Consent framework is the load-bearing decision; see the [audio-understanding chapter's call-centre note](../audio-understanding/index.md#data-collection-specifics-for-african-contexts).

Match the training corpus's acoustic-and-turn-taking profile to the deployment target. A diarizer trained on broadcast panels and deployed on community-meeting audio should be expected to lose a large share of its accuracy in production; a diarizer trained on community meetings and deployed on broadcast tends to over-fragment turns because the model has learned to expect noise where there isn't any. Measure the gap on a held-out sample of real deployment audio before trusting any benchmark number.

:::danger[Every voice needs consent]

A multi-speaker recording has as many data subjects as it has speakers. Consent from the person who made the recording, or from the broadcaster, does not cover the other voices in it. Plan consent per speaker before collection; see [Data Governance](../data-governance/index.md).

:::

## Annotation

Annotating diarization is a careful listening-and-marking task. The annotator marks each speaker change in time and gives each distinct voice a consistent label across the whole recording. The hard parts are:

- **overlapping speech**, where two labels apply at once;
- **brief sounds**, where the annotator must decide whether it is a new speaker or just noise.

The guidelines must cover both. A simple task specification looks like this:

**Task specification: speaker diarization**

| Setting | Value |
|---|---|
| Annotator sees | The audio on a timeline (waveform) |
| Annotator gives | Time regions, each with a start, an end and one speaker label |
| Choice | Exactly one label per region, from: Speaker 1, Speaker 2, Speaker 3, Overlap |
| Notes | Add speaker labels as needed for recordings with more voices. Use Overlap where two or more voices talk at once. |

The `Overlap` label gives annotators an explicit way to mark two voices at once, instead of guessing which single speaker to assign. Each exported speaker region (start time, end time, label) maps directly onto an RTTM line like those above. RTTM has no overlap speaker: overlap appears as two speakers' lines that overlap in time, as described earlier. An `Overlap` region does not say who is talking, so resolve it before export, for example with a second pass that assigns the speakers in it, or let annotators draw overlapping regions, one per speaker, instead.

**Six annotation conventions to fix in writing before starting:**

- **Minimum turn length.** How short can a speaker turn be before it counts as noise or a backchannel (`mhm`, `yeah`) rather than a real turn? Very short utterances, under about half a second, are the grey zone. Fix a threshold and apply it consistently.
- **Backchannel handling.** A listener says `mhm` while another speaker holds the floor. Is that a separate turn (creating an overlap), or is it discarded (keeping the main speaker's turn intact)? Both conventions are defensible; document which one you use.
- **Overlap onset and offset precision.** Annotators often disagree by a few hundred milliseconds on where an overlap starts and ends. Decide on a precision tolerance and reflect it in the collar used for evaluation.
- **Speaker-count uncertainty.** In community-meeting audio, telling a fourth speaker apart from an earlier speaker who returns is genuinely hard. Guidelines should say how to flag uncertain cases for adjudication, rather than forcing annotators to commit.
- **Non-speech marking.** Music, silence, background noise, laughter: give them their own labels, or leave them without any speaker label? Leaving them unlabelled is simpler, but it loses the difference between "nothing is happening" and "there is background noise here". A `Music` or `Noise` label is often worth the extra work.
- **Named speakers vs anonymous labels.** In broadcast panels with public figures, are speakers labelled by name or by anonymous ID? Publishing named speakers has consent implications. The safer default is anonymous IDs, with a separate mapping table that only the project team holds.

Whatever tool you use, check that it supports the basics of this task: keyboard-controlled playback, a zoomable timeline, precise segment boundaries, speaker labels and a clear way to mark overlap. Check also that its export keeps segment times, speaker labels, overlap and the identity of the annotator who made each region.

## Quality assurance during annotation

- **Per-batch second-pass review.** A second annotator, working independently, re-diarises a random sample of each batch (for example 5–10%). Compute the Diarization Error Rate (DER) per file between the two annotations, and flag files above a threshold you set in advance (for example a DER above 0.10 with a reasonable collar) for adjudication. This is the cheapest quality signal for a diarization corpus.
- **Overlap-region focused review.** Overlap regions are where annotator disagreement is highest. Sample-audit overlap regions separately from clean-turn regions; the disagreement rate in overlaps sets the effective ceiling on downstream model performance.
- **Speaker-consistency checks.** Verify that the same speaker gets the same label across the entire recording. A speaker who is re-labelled halfway through as a "new" voice invalidates the recording. Automated voice-embedding similarity across annotator-labelled turns is a cheap catch for this.
- **Per-condition inter-annotator agreement (IAA).** Track IAA separately for broadcast, community-meeting and phone-recorded segments. A corpus whose IAA is 0.85 overall but 0.55 on community-meeting audio has a systematic weakness that the overall figure hides.

## Evaluation

Two metrics are standard:

- **[Diarization Error Rate (DER)](https://pyannote.github.io/pyannote-metrics/reference.html)** combines missed speech, false speech and speaker-confusion errors into one figure ([Bredin, 2017](../references.md#bredin-2017)).
- **Jaccard Error Rate (JER)**, introduced for the DIHARD II challenge, averages an error per speaker, so every speaker counts equally however much they talk ([Ryant et al., 2019](../references.md#ryant-2019)).

As elsewhere, a human review of a sample catches systematic problems that a single aggregate number cannot.

`pyannote.metrics` reads RTTM files and computes DER directly, so scoring a system is a matter of loading the reference and the prediction:

```python
# pip install pyannote.metrics pyannote.database
from pyannote.metrics.diarization import DiarizationErrorRate
from pyannote.database.util import load_rttm

reference = load_rttm("reference.rttm")["panel_01"]
hypothesis = load_rttm("system_output.rttm")["panel_01"]

# pyannote's collar is the TOTAL width around each reference boundary:
# collar=0.5 forgives ±0.25 s, the usual "0.25 s collar" in NIST/DIHARD scoring.
metric = DiarizationErrorRate(collar=0.5)
der = metric(reference, hypothesis)
print(f"DER: {der:.3f}")

# The components matter for African audio: break the score down to see
# whether errors come from overlap, noise, or genuine speaker confusion.
components = metric(reference, hypothesis, detailed=True)
print(f"  missed speech:    {components['missed detection']:.2f}s")
print(f"  false alarm:      {components['false alarm']:.2f}s")
print(f"  speaker confusion: {components['confusion']:.2f}s")
```


The `collar` forgives small timing differences at speaker boundaries, which are rarely what you care about. Reading the breakdown is the useful part: in noisy phone-recorded community audio, a high false-alarm component usually points at background noise being mistaken for speech, while high confusion points at the overlap and code-switching that make African conversational audio hard, telling you which collection or annotation problem to fix next.

**Beyond aggregate DER.** Like character error rate in ASR, DER sums everything into one number, and that number hides where the model fails. Also report:

- **Per-source DER.** Split evaluation by source (broadcast / community meeting / phone / call-centre) and report separately. A model whose overall DER is 15% and whose community-meeting DER is 40% has a source-specific problem the aggregate hides.
- **Per-condition DER.** Split by acoustic condition (studio / phone / outdoor) and report separately. Same reasoning: the aggregate flatters models that fail on the condition you actually deploy in.
- **Overlap-region DER.** Compute DER on the subset of the audio where two or more speakers are talking. This is where most model failure lives in real conversation; the metric on overlap regions specifically is what predicts production performance.
- **Speaker-count accuracy.** Did the model estimate the right number of distinct speakers in each recording? Over-splitting a two-speaker interview into five apparent speakers is a common failure mode DER partly captures but does not fully expose.

## Starting from a pretrained pipeline

Few projects need to train a diarizer from scratch. Open-source toolkits such as `pyannote.audio` ship pretrained pipelines (voice activity detection, speaker embedding, and clustering) that can be run directly on African audio and then fine-tuned on a modest amount of in-domain annotated data ([Bredin et al., 2020](../references.md#bredin-2020)). This changes where the annotation budget goes:

- **Annotate an evaluation set first.** A few hours of carefully diarised audio from the real deployment sources, split by source and condition as above, tells you whether the off-the-shelf pipeline is already good enough.
- **Spend training annotation on the failures.** If the breakdown shows confusion in overlaps or over-splitting of code-switching speakers, annotate more of exactly that audio for fine-tuning rather than more of what the model already handles.
- **Pre-annotate, then correct.** Running the pretrained pipeline first and having annotators correct its RTTM output is usually faster than marking from scratch, but check a sample annotated from scratch so annotators do not simply accept the model's boundaries (see [Treat drafts as drafts](../3_annotation-design/model-assisted-annotation.md#treat-drafts-as-drafts)).
- **Check the model licence and access terms.** Some pretrained pipelines are gated behind a user agreement; confirm the terms allow your intended use and redistribution before building on them.

## Deployment realities

- **Streaming vs offline.** Real-time diarization for live captioning is a different engineering problem from offline diarization for post-hoc transcription. Streaming diarization must commit to speaker assignments as they occur; offline can revise earlier decisions when the whole recording is seen. Choose at scoping; streaming diarization is materially harder.
- **Diarization-then-ASR vs joint modelling.** Traditional pipelines diarise first, then ASR each speaker's segments. Newer joint models (streaming ASR with speaker attribution) do both at once. For African languages the pipeline approach reuses existing ASR and diarization work; joint models are more research-forward.
- **Diarization as a privacy tool**: a diarised recording where speakers are anonymised (`Speaker 1`, `Speaker 2`) is safer to share for research than raw multi-speaker audio where speaker identity is inferrable. Consider whether the released artefact should be diarised-with-anonymous-labels rather than raw audio.
- **On-device diarization** is unusual as a deployment target but relevant for privacy-preserving voice assistants and edge health-triage. The compute cost is higher than on-device ASR because voice embedding + clustering is a distinct workload; expect a larger model footprint.

## What breaks: common failure modes

- **Studio-training / community-deployment collapse.** DER on clean training data looks acceptable; deployment on noisy community meetings can multiply it several times over. Fix: train on data whose acoustic conditions match deployment.
- **Overlap invisible in aggregate DER.** An overall DER of 15% can hide an overlap-region DER of 45% or more, because overlapping speech is a small share of total time. Fix: report overlap DER separately and treat it as the load-bearing number for conversational deployment.
- **Code-switching splits one speaker into two.** Voice-embedding model latches onto language-conditioned acoustic features and treats a code-switching speaker as multiple speakers. Fix: include code-switched training data and evaluate on code-switched subsets.
- **Speaker-count over-estimation on short turns.** Model treats every backchannel or brief sound as a new speaker. Fix: enforce minimum turn length in inference post-processing; audit annotation guidelines for backchannel handling.
- **Boundary sloppiness at a wide collar.** DER measured at `collar=0.5` (±0.25 s) looks acceptable; measured at `collar=0.1` (±0.05 s) it reveals boundaries that are consistently 300 ms off. Fix: measure at the collar the deployment actually tolerates, and remember that pyannote's `collar` is the total width, half on each side of a boundary.
- **Consent gap on multi-speaker archives.** Broadcast panel audio consented for broadcast; downstream ML release without new consent breaches the original agreement. Fix: consent must be re-negotiated for each speaker in a multi-speaker recording.
- **Named-speaker leak.** Corpus intended to be anonymous but downstream metadata reveals speaker identity through timestamps + broadcast schedules + context. Fix: anonymisation of speaker labels is not enough; audit the full metadata for identity leakage.

