---
sidebar_position: 4
title: ASR
---

# Before You Start — Automatic Speech Recognition

*Last reviewed: 2026-07-07.*

Automatic Speech Recognition (ASR) is the second most operationally consequential African-language task after machine translation — it is what lets a market trader use a service in Igbo without literacy in Latin script, what puts government information into radio broadcasts, and what unlocks accessibility for the majority of African users whose most fluent modality is speech, not text. It is also the task where the cost gap between "we could build this" and "we shipped this" is largest. Read this page before scoping a new speech project.

## What already exists

Two large model releases (Meta MMS, OpenAI Whisper) and three community-curated corpora anchor the current landscape. Everything else builds on these.

### Datasets — the core set

- **[Mozilla Common Voice](https://commonvoice.mozilla.org/)** — the largest community-contributed multilingual speech corpus. African-language coverage varies dramatically by language and grows with community effort — Kinyarwanda, Kabyle, Luganda, and Kiswahili have serious volumes; many others sit at pilot scale. Contribution UX is well-designed and reusable. All data CC0. The [datasets page](https://commonvoice.mozilla.org/en/datasets) has the current per-language totals; check before starting your own recording.
- **[FLEURS (Few-shot Learning Evaluation of Universal Representations of Speech)](https://arxiv.org/abs/2205.12446)** ([Conneau et al., 2022](https://arxiv.org/abs/2205.12446)) — Google's evaluation-focused speech benchmark spanning 102 languages including ~40 African. Use as an evaluation set, not training data. Available on the [Hugging Face Hub](https://huggingface.co/datasets/google/fleurs).
- **[NCHLT Speech Corpora](https://sadilar.org/en/resources/repository/)** — South African government-funded speech corpora across the 11 official South African languages (isiZulu, isiXhosa, Setswana, Sesotho, Sepedi, Xitsonga, Tshivenda, Siswati, isiNdebele, Afrikaans, English). Read-speech domain; the standard reference for South African ASR. Hosted at SADiLaR.
- **[MakerereNLP speech corpora](https://sunbird.ai/)** — Luganda ASR, community-collected. Used in production by Sunbird AI. Notable for combining speech data with translation, giving a rare integrated speech-and-text African-language dataset.
- **[SLR (Open Speech and Language Resources)](https://openslr.org/)** — the umbrella project hosting many low-resource speech datasets, including several African languages. Coverage is idiosyncratic and quality varies — read each dataset's card before use. Notable entries: SLR100 (Yoruba), SLR86 (Kiswahili), and various regional-language collections.

### Datasets — worth knowing about, use with care

- **[VoxPopuli](https://arxiv.org/abs/2101.00390)** — European Parliament recordings; limited African-language content but included because it is often confused with a general multilingual resource.
- **[LibriVox](https://librivox.org/)-derived corpora** — audiobook read speech; almost no African-language content, but a common baseline for read-speech ASR research.
- **[Kencorpus](https://ojs.mruni.eu/index.php/social/article/view/6903)** — Kenyan language speech and text; smaller scale, useful for Swahili + related work.
- **Aggregated collections on Hugging Face** — search `masakhane/`, `sunbird/`, `keleafrica/`, and `google/fleurs`. Check license and domain per dataset; do not assume aggregators enforce quality.

### Models — what has been trained on this data

- **[Meta MMS (Massively Multilingual Speech)](https://ai.meta.com/blog/multilingual-model-speech-recognition/)** ([Pratap et al., 2023](https://arxiv.org/abs/2305.13516)) — the strongest baseline for African-language ASR coverage. Supports over 1,000 languages including a substantial African set. Available on the [Hugging Face Hub as facebook/mms-1b-all](https://huggingface.co/facebook/mms-1b-all) with adapter variants per language.
- **[OpenAI Whisper](https://arxiv.org/abs/2212.04356)** — supports ~99 languages including a few African. Quality is uneven; strong on high-resource languages (Kiswahili is decent, most others are weak). Ubiquitously deployed. Available on the [Hugging Face Hub](https://huggingface.co/openai/whisper-large-v3). Do not assume Whisper's language support translates into usable accuracy — measure it.
- **[Wav2Vec2 XLS-R](https://arxiv.org/abs/2111.09296)** ([Babu et al., 2021](https://arxiv.org/abs/2111.09296)) — the widely-used self-supervised speech model. A common starting point for fine-tuning on a specific low-resource language, especially when MMS coverage is thin.
- **[NVIDIA Canary and Parakeet](https://developer.nvidia.com/canary)** — general multilingual ASR models; limited African-language coverage but strong engineering. Consider if latency is a hard constraint.
- **Community fine-tunes** on the [Hugging Face Hub under `masakhane/`](https://huggingface.co/masakhane), `sunbird/`, and per-country research groups. Quality varies; the cards usually state training data.

**Editorial opinion.** For a new project on a language covered by MMS, start with MMS. Fine-tune the language-specific adapter on your best available in-domain speech data. Evaluate on FLEURS if available, and on a small (~500-utterance) native-speaker-verified in-domain set otherwise. If Whisper covers your language and the domain is close to Whisper's training distribution, run it as a second baseline — but do not deploy Whisper-only without independently measuring its accuracy on your target language. If your language is in neither MMS nor Whisper, the task is genuinely research-grade — read the "cross-language transfer" chapter and consider fine-tuning XLS-R on related-language data before scoping a full corpus effort.

## Fork or start fresh?

```
Is your language covered by Meta MMS (~1000 languages, includes many African)?
├── Yes — does the domain match (read speech vs. spontaneous vs. broadcast)?
│   ├── Yes → Use MMS out of the box as your baseline. Collect a 200-500
│   │        utterance native-speaker-verified in-domain evaluation set.
│   │        Fine-tune the MMS adapter only if the baseline is inadequate.
│   └── No, domain mismatch → Fine-tune the MMS adapter on your target
│       domain. 5-20 hours of clean transcribed speech in the target
│       domain is typically enough to get a usable adapter for a covered
│       language.
└── No — is Whisper's language list a plausible starting point?
    ├── Yes → Whisper baseline + Whisper fine-tune are the fastest path.
    │        Verify with native speakers that Whisper's baseline accuracy is
    │        not misleading — its listed "language support" does NOT mean
    │        usable accuracy.
    └── No, or Whisper baseline is unusable → XLS-R fine-tune on the
        closest related language you have data for. See the
        [cross-language transfer](../cross-language-transfer/index.md)
        chapter for family-by-family pivot guidance. Build a small
        evaluation set first, then decide whether corpus creation is
        the right investment.
```

## What it will actually cost you

Speech data is roughly **10 to 30x more expensive to produce than text**. Every design choice cascades through recording quality, transcription accuracy, and evaluation cost. Rough estimates:

- **Fine-tuning MMS or Whisper on an existing per-language corpus.** One to three person-weeks; three to ten GPU-days for meaningful convergence; more evaluation than training. If your target corpus is small (under 20 hours), most of the effort is data-preparation, not modelling.
- **Recording and transcribing 100 hours of read speech** (Common-Voice-style, crowd-sourced with community organisation). Four to nine months elapsed; ten to twenty-five person-months of coordination, community recruitment, verification, and processing; costs vary by pay model but $8-$30 per verified hour of speech is a realistic band for community-fair rates. Sitting-down studio recording is 3-5x higher per hour.
- **Recording and transcribing 100 hours of spontaneous speech** (interviews, broadcasts, conversation). Six to twelve months elapsed; twenty to fifty person-months. Transcription is the dominant cost — spontaneous speech is 3-5x slower to transcribe than read speech.
- **Building a defensible test set only** (200-500 utterances, native-speaker verified, in-domain). Four to eight weeks elapsed; one to two person-months.
- **Human evaluation of ASR output.** Two person-weeks per evaluator for 200 utterances; do this with at least two evaluators independently.

These are order-of-magnitude estimates. Every project varies. The message is: **speech is not text, and speech project timelines that read like text project timelines are wrong**.

## Known limitations to watch for

- **CER, not WER, is the primary metric for morphologically rich African languages.** Word-boundary conventions in Bantu languages are unstable across annotators; word-level metrics amplify boundary disagreement into apparent error. Compute both, report both, but treat character error rate as the headline. This is playbook editorial policy — see [core principles](../1_introduction/core-principles.md) and the sacrebleu / [jiwer](https://github.com/jitsi/jiwer) documentation.
- **Tone languages need tone-preserving transcription conventions.** Yoruba, Igbo, several Bantu languages, and many others carry lexical distinctions in tone. A transcription that drops tone marks makes the corpus useless for anything requiring lexical fidelity. Establish the tone convention in the annotation guidelines, verify it in the first 500 utterances, and do not proceed until agreement is stable.
- **Code-switching is the rule, not the exception.** Real African-language spontaneous speech mixes languages within a sentence. Models trained on strictly monolingual read speech fail immediately on real-world input. Test on code-switched data before deployment, not after.
- **Dialect and variety matter more than the language name.** Kiswahili in Tanzania differs from Kiswahili in Uganda, and both differ from the Kenyan coastal variety. Nigerian English is not South African English. If your corpus is monolectal and your deployment is multilectal, expect degradation.
- **Microphone quality and recording environment set the ceiling.** Studio-recorded corpora produce models that fail on phone-microphone input. Common-Voice-style community recording is closer to real-world audio and generalises better despite being noisier. Match the training recording condition to the deployment condition.
- **Whisper's listed language support is a marketing claim, not an accuracy claim.** Whisper's model card lists ~99 languages; usable accuracy is genuinely there for maybe 40. Verify with native speakers on your target language before deploying.
- **VAD (voice activity detection) and diarisation are separate problems.** ASR papers report on pre-segmented utterances; production systems have to solve VAD and speaker separation first. Budget for these.

## The canonical fine-tuning link

For fine-tuning Meta MMS on a specific language and domain, use the [MMS fine-tuning documentation](https://huggingface.co/facebook/mms-1b-all#adapter-weights) — the MMS "adapter" approach is designed for exactly this. For Whisper fine-tuning, use the [Hugging Face Whisper fine-tuning guide](https://huggingface.co/blog/fine-tune-whisper). For general Wav2Vec2/XLS-R fine-tuning, use the [Hugging Face audio classification/ASR tutorial](https://huggingface.co/docs/transformers/tasks/asr).

For evaluation: [jiwer](https://github.com/jitsi/jiwer) is the canonical Python library for WER and CER computation. Report both, headline the CER.

## Further reading

- [Meta MMS paper (Pratap et al., 2023)](https://arxiv.org/abs/2305.13516) — the definitive technical report on massively-multilingual speech recognition and the strongest African-coverage baseline.
- [Whisper paper (Radford et al., 2022)](https://arxiv.org/abs/2212.04356) — the widely-deployed baseline, useful reading for its discussion of what makes an ASR model robust versus fragile.
- [FLEURS paper (Conneau et al., 2022)](https://arxiv.org/abs/2205.12446) — the standard cross-lingual evaluation benchmark.
- [XLS-R paper (Babu et al., 2021)](https://arxiv.org/abs/2111.09296) — the model behind most low-resource ASR fine-tuning work of the last three years.
- [Common Voice technical description](https://arxiv.org/abs/1912.06670) — how the Common Voice contribution model is structured; useful reading before designing a community-recording effort.
- [Sunbird AI blog](https://sunbird.ai/) — a working reference for how a small team runs ASR + MT in production for African languages.

---

**Contributor's note.** This is the third exemplar of the "Before You Start" pattern (after [NER](./ner.md) and [MT](./machine-translation.md)). If you are adding sentiment, QA, hate-speech, TTS, or OCR pages next, mirror the same four sections and keep the editorial opinions. A page without an opinion is a link farm.
