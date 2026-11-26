---
title: Text-to-Speech
ready: true
last_update:
  date: 2026-11-26
  author: Shamsuddeen Hassan Muhammad
---

# Text-to-Speech

Text-to-speech (TTS) is the reverse of automatic speech recognition (ASR): it turns written text into spoken audio. A good TTS voice makes a language usable by people who cannot read it or cannot see a screen. This matters a great deal where literacy and connectivity vary widely.

TTS is data-hungry in a particular way. It needs not just a lot of speech, but very clean, consistent speech from voices you have the right to reproduce. This chapter covers the data shape, the recording pipeline, text preparation, annotation and consent, quality assurance during collection, and evaluation.

:::tip[Key points]

- Record clean, consistent, single-speaker audio from a voice you have the right to reproduce.
- Choose prompts for phonetic coverage, tone included, and audit that coverage before recording.
- Normalise every prompt so it is written exactly as it is spoken, with correct tone marks.
- Make voice-cloning risk an explicit part of the speaker's consent.
- Judge the voice with native-speaker listening tests; automatic scores are only proxies.

:::

Before building a TTS corpus, check what already exists with [Before You Start](../before-you-start/index.md). That chapter helps you decide whether to reuse, extend or build; this page details how to carry out the path you choose.

![What a text-to-speech corpus needs: clean single-speaker audio, phonetic coverage, tone labelling, and consent](images/tts-data.svg)

## What the data looks like

A TTS corpus is text paired with high-quality recordings of that text being read, usually by a single speaker for a single voice. Two things set it apart from ASR data:

- **Studio-clean audio.** Any background noise or inconsistency is baked into the synthetic voice.
- **A script chosen for phonetic coverage.** Every sound and sound combination in the language must appear often enough for the model to learn it.

BibleTTS is the model African resource here. It offers up to 86 hours of clean single-speaker audio per language under an open CC-BY-SA licence, across several language families ([Meyer et al., 2022](../references.md#bibletts-2022)). Broader corpora such as NaijaVoices and WAXAL support TTS as well as ASR ([Emezue et al., 2025](../references.md#emezue-2025); [WAXAL, 2026](../references.md#waxal-2026)).

The common layout, popularised by the LJSpeech dataset, is a folder of single-speaker WAV files and one metadata file linking each clip to its text. A pipe-separated file holds the original text and a normalised, spoken-form version side by side. Numbers, dates and abbreviations must be written as they are actually said before the model ever sees them:

```text
# metadata.csv:  clip_id | original text | normalized (spoken) text
yor_0001|Ó dé ní aago 8.|Ó dé ní aago mẹ́jọ.
yor_0002|Ẹ kú àárọ̀, ẹ jọ̀wọ́ jókòó.|Ẹ kú àárọ̀, ẹ jọ̀wọ́ jókòó.
```

Keep the audio itself consistent:

- a single speaker;
- one sample rate (22.05 kHz is common for TTS);
- mono;
- a quiet recording environment.

The diacritics in the example are not decoration. In a tone language they carry the pitch, so the metadata must preserve them exactly: this text is what teaches the voice how to sound.

## Phonetic coverage: what "enough" means per language family

Phonetic coverage is the reason a TTS corpus cannot be assembled from whatever text is convenient. The prompts must contain every phoneme (distinct sound) of the target language, in every position (word-initial, medial and word-final), enough times for the model to learn it. Set a minimum count per phoneme and position, and raise it for tone contrasts. What to watch for depends on the language family.

| Language group | Examples | What the prompts must cover |
|---|---|---|
| Bantu | isiZulu, Kinyarwanda, Luganda, chiShona, Setswana, Kiswahili | Most Bantu languages use tone, and many also contrast vowel length. Tone sits on top of the consonants and vowels and needs its own coverage. isiZulu and isiXhosa add click consonants. Kiswahili is an exception: it has no lexical tone, so segmental coverage matters most. |
| Kwa and Volta-Niger | Yorùbá, Igbo, Ewe, Twi, Fon | Lexical tone, and vowel harmony in many of these languages. Prompts must exercise every tone-vowel combination. A script that covers the sounds but not the tone patterns produces a voice that reads words correctly but sounds wrong. |
| Chadic | Hausa (Latin or Ajami script) | Tone and vowel length, which standard Latin-script Hausa does not mark, plus glottalised consonants (`ɓ`, `ɗ`, `ƙ`, `ƴ`) that many text sources drop or misspell. Check prompts against a linguistic reference before recording; the hooked letters matter. |
| Ethiopian Semitic | Amharic, Tigrinya | Gemination (doubled consonants) and ejective consonants, plus pharyngeals in Tigrinya, which Latin transliteration mangles. Write prompts in Ge'ez script from the start. Ge'ez script does not mark gemination, so record it in the normalised text or a pronunciation lexicon. |
| Nilotic | Dholuo, Dinka, Nuer | Tone and, in some languages, vowel-length contrasts. As with Kwa and Volta-Niger languages, tone-vowel coverage is a separate constraint from segmental coverage. |

A phonetic-coverage audit before recording begins is the cheapest quality-control step you have:

1. Run each candidate prompt through a phonemiser: a language-specific grapheme-to-phoneme (G2P) tool if you have one, or a careful approximation in IPA otherwise.
2. Count how often each phoneme appears in each position.
3. Add prompts to fill the gaps.

The audit takes days. The alternative is discovering, after a hundred hours of recording, that half the phonemes are under-represented.

## Choosing the voice

Selecting the speaker is a technical and a political decision, and the two are rarely aligned. A single-voice TTS system produces exactly one voice, and every listener will hear it as "the" way the language sounds. The choice signals which dialect, which register, which speech style, and often which gender is authoritative for the language. Involve the community in the choice; a project team decision here erodes the community's ownership of the resource.

Practical criteria for a first-voice speaker:

- **Native speaker of the target variety**: no one else should be the primary voice. Non-native competence, even at high proficiency, produces a voice the community will not recognise as their own.
- **Vocal consistency across sessions**: the model learns the speaker's voice, and drift in tone, energy, or accent across recording sessions produces an unstable synthetic voice. Some speakers are naturally more consistent than others; audition candidates over multiple short sessions before committing.
- **Prosodic clarity**: clear enunciation, natural sentence-level rhythm, moderate speech rate. Broadcasters, teachers, and voice actors often meet this bar; casual speakers may not.
- **Stamina**: a full TTS recording effort can take tens of hours of studio time spread over weeks or months. A speaker who tires quickly, or whose voice changes with fatigue, records lower-quality clips late in each session.
- **Availability for a long project**: retaining the same speaker for the full corpus is cheaper than switching mid-way and re-recording.

If the community's preference is to build a multi-voice corpus (multiple speakers rather than one), the same criteria apply per speaker, plus a design decision about whether the released model produces per-speaker voices or a single averaged voice. Multi-voice TTS is a more research-grade path and needs a proportional data budget.

## Recording pipeline

The recording pipeline is where most quality problems start, and where the cheapest fixes live.

**Studio setup.** A treated small room with a cardioid condenser microphone through a decent audio interface is the working reference. Home recording rooms with sound blankets work; a professional studio is better but not required for TTS quality. What matters is a consistent acoustic environment across every session. Moving the microphone, changing the room's absorption, or swapping equipment mid-project all show up in the model.

**Session structure.** Sessions of 60 to 90 minutes with breaks work better than four-hour marathons for both speaker vocal health and consistency. Warm up with a few sacrificial prompts (not used in the corpus) at the start of every session, so the first "real" clips are not the ones where the speaker is still finding their voice. End every session with a check-listen on a random sample of that day's clips.

**Prompt delivery.** The speaker reads from a prompt display (a screen, a tablet, or printed cards) that shows one prompt at a time. Auto-advancing displays that require the speaker to keep pace add stress; speaker-controlled advancement is calmer. Between prompts, wait for silence to end (roughly one second of room tone) before starting the next clip; splicing on speech onset without room tone produces artefacts.

**Take management.** Every prompt gets one clean take. Second takes on the same prompt lose the original's rhythm and are hard to blend; better to re-record the clip in a later session if the first is bad. Log per-clip decisions (kept, rejected, needs re-record) at recording time; reviewing tens of hours of audio after the fact is exhausting.

**Quality gate.** At the end of each session, listen back to a random sample of the day's clips (for example, 5%) against the prompt text. If clip content matches the prompt, tone is preserved, and there are no environmental artefacts, keep the session. If any fail, understand why before recording continues.

## Text preparation and normalisation

TTS models learn to pronounce whatever is written; garbage in, garbage out is literal here. Text normalisation is the step where an incoming prompt is rewritten so that what the model sees is exactly what should be spoken.

- **Numbers, dates, and times** are written as they are read: "8" becomes "eight" in the metadata's normalised column. Different languages read numbers differently; get a native speaker to verify the normaliser's output before recording.
- **Abbreviations and symbols** (`Dr.`, `Mrs.`, `USD`, `%`): expand every one. A model that has never seen "percent" spelled out will not know what to say when it sees `%`.
- **Homographs**: words that are spelled the same but pronounced differently (English `read` past vs. present is the canonical example; African languages have their own). Mark the intended pronunciation in the normalised column, often via a phonemic transcription or a language-specific convention.
- **Tone marks**: for tone languages, verify that every prompt in the corpus has correct tone marking before recording. A prompt with dropped diacritics teaches the model a wrong pronunciation that later inference will reproduce.
- **Script switching**: Hausa Ajami vs. Latin, Amharic Ge'ez vs. Latin transliteration, Mandinka Latin vs. N'Ko. Fix the script for the corpus before recording starts; do not mix scripts within a single voice. See the [non-Latin scripts in real UIs](../deployment/non-latin-scripts.md) chapter for the deployment implications.
- **Loanwords and code-mixed content**: real user text mixes English, French, or Arabic terms with the local language. A monolingual TTS corpus produces a model that stumbles on real user input; include a proportion of realistic code-mixed prompts, and mark the switch points explicitly in normalisation.

## Distinctive annotation and consent

Beyond transcription, TTS data often needs pronunciation or phoneme labelling. This matters most for tone languages, where the same spelling can carry different pitches and meanings. Getting tone right is the difference between a natural voice and an unintelligible one.

Consent is sharper here than anywhere else in the playbook, because a TTS dataset reproduces a specific person's voice:

- The speaker must understand and agree that their voice will be synthesised.
- The licence should constrain misuse such as impersonation or voice cloning.
- Licences in the Kaitiakitanga tradition, discussed in the [data governance](../data-governance/index.md) chapter, treat data as held in guardianship and forbid uses such as surveillance ([Te Hiku Media](../references.md#tehiku-kaitiakitanga)). They are a good template for voice data.

:::warning[Voice-cloning risk cannot be withdrawn]

Modern TTS models can be adapted from a released voice to say arbitrary content, and once a model is public that risk cannot be revoked. Explain this at consent time, in the speaker's own language, and record the acknowledgement as part of the consent record. The [legal, consent, and community IP](../legal-consent/index.md) chapter and the [consent form template](../templates/consent-form.md) cover the practical patterns.

:::

## Quality assurance during collection

Quality problems caught in the studio cost minutes. The same problems caught during model training cost weeks. Build a per-session review workflow before recording begins.

A TTS corpus needs cleaner audio than an ASR corpus. Ask for a quiet background, hold clips to a strict noise floor, and switch off any automatic noise suppression or gain control on the recorder, since both alter the voice. When a clip's signal-to-noise ratio is borderline, re-record it rather than keep it. [Audio quality control](../asr/audio-quality-control.md#decide-the-corpus-purpose-first) compares ASR and TTS settings and explains how to use one set of thresholds for the automated checks, the recording instructions and the reviewers.

- **Per-clip listening review**: a reviewer independent of the speaker listens to every kept clip, matches it against the intended prompt text, and flags mismatches (dropped words, misread numbers, tone errors, environmental noise). Random-sample verification catches statistical drift; full listening catches the individual bad clip.
- **Technical audio checks**: run automated signal checks on every clip as it arrives (duration, clipping, true peak, loudness, signal-to-noise ratio, silence), with strict thresholds for a TTS voice. A clip that peaks at digital zero is unusable and should be re-recorded, not "fixed" in post. The tiered checks and what to do when one fails are on the [Audio quality control](../asr/audio-quality-control.md) page. Model-based checks, such as predicted quality scores, can help triage, but they are optional and cannot decide whether a voice is fit for release; see [tier 2 on Audio quality control](../asr/audio-quality-control.md#tier-2-model-based-checks-optional).
- **Tone-preservation verification**: for tone languages, a randomly-sampled per-week check with a linguist or trained native speaker confirms that tone patterns match the intended text. Tone drift is the single most subtle failure mode.
- **Speaker-consistency spot check**: every ten hours of recording, compare the first hour and the most recent hour on a matched-prompt basis. Voice drift is normal over long projects; detecting it early lets you either accept it as a stylistic choice or intervene to correct.

## Evaluation

TTS quality is judged mostly by people. The standard measure is the [Mean Opinion Score (MOS)](https://en.wikipedia.org/wiki/Mean_opinion_score): listeners rate samples for naturalness, usually on a 1 to 5 scale. Intelligibility tests then check whether listeners can actually understand the output.

Objective measures such as Mel-Cepstral Distortion exist and help track progress during development. They correlate only loosely with what a human ear hears, so native-speaker listening tests remain the real measure of a voice. For how to design those tests (anchored rating scales, A/B comparisons, and the controls that keep judgements honest), see [Human Evaluation Designs](../3_annotation-design/human-evaluation-designs.md).

Because MOS is collected from listeners, the listening test is an annotation task in its own right. The design below plays a synthesised clip and asks for two things: a naturalness rating, and the sentence the listener heard. The typed sentence catches a voice that sounds smooth but is hard to understand.

**Task specification: TTS listening test**

| Setting | Value |
|---|---|
| Annotator sees | One synthesised audio clip with a player |
| Annotator gives | A naturalness rating ("How natural does this voice sound?") and the sentence they heard, typed exactly as understood |
| Choice | Rating: exactly one value on a 1 to 5 scale, required. Typed sentence: free text, required |
| Notes | Give each clip to several listeners so that the mean opinion score averages real opinions |

Check listener agreement with the [Data Quality](../4_data-quality/index.md) script. The naturalness rating is ordinal (ordered), so Krippendorff's alpha with ordinal weighting is the right agreement measure.

The typed-back sentence gives a second, objective signal. Compare it to the intended text with the same Character Error Rate (CER) used on the [ASR](../asr/index.md) page. A low error rate confirms the voice is not just pleasant but actually intelligible.

Alongside MOS, run one or more of the automatic proxies during development, remembering that they are proxies, not verdicts:

- **[UTMOS](https://arxiv.org/abs/2204.02152)** and **[NISQA](https://arxiv.org/abs/2104.09494)** predict naturalness MOS. Useful for tracking training progress; not a substitute for human MOS at release.
- **CER round-trip**: synthesise a held-out test set, transcribe with an ASR (per the [ASR chapter](../asr/index.md)), compute CER against the reference text. A low CER means the voice is intelligible enough for an ASR to read it; a rising CER during training means intelligibility is degrading.
- **Speaker-similarity metrics**: for projects that clone a specific voice, or projects that need to verify a model does NOT clone one, ECAPA-TDNN or x-vector cosine similarity between reference and synthesised audio provides a signal on voice identity.

## Deployment realities

For a language covered by [Meta MMS-TTS](https://huggingface.co/facebook/mms-tts), the out-of-the-box model is often good enough for a first deployment. Before committing to a full fine-tune, measure MOS with native listeners on your target text style, not on generic read-speech sentences. When MMS-TTS quality is inadequate, fine-tuning an open architecture such as VITS or XTTS on several hours of studio-quality single-speaker audio is the practical next step.

:::note[Check model licences]

Pretrained weights carry their own licences. The MMS-TTS checkpoints are released for non-commercial use (CC-BY-NC 4.0), and the [XTTS-v2](https://huggingface.co/coqui/XTTS-v2) weights are under the non-commercial Coqui Public Model License. Check the licence on the model card before you build a product on either.

:::

For deployment on constrained hardware (phones, low-power edge servers), quantisation matters as much as it does for other modalities. The [edge devices](../deployment/edge-devices.md) chapter covers the phone-tier map, runtime choices, and the model-size budgets you have to design against. Voice-note replies over WhatsApp, an increasingly common African deployment surface, are covered in the [SMS, USSD, and WhatsApp](../deployment/sms-ussd-whatsapp.md) chapter.

## What breaks: common failure modes

- **Tone-flattened voice.** The model reads the segmental phonemes correctly but drops the tone contrasts. Cause: training data has inconsistent tone marking. Fix: audit tone marks before recording, not after.
- **Voice drift across a corpus.** The synthetic voice sounds slightly different from clip to clip. Cause: speaker consistency drifted during recording. Fix: per-week spot check during collection, not a single post-hoc review.
- **Robotic prosody on real user input.** The voice sounds natural on prompts similar to the training script but stilted on real user text. Cause: training script did not reflect real user register (news read-aloud vs. conversational). Fix: include a proportion of naturalistic prompts in the training set.
- **Fine on training language, breaks on code-mixed input.** Cause: monolingual corpus. Fix: include realistic code-mixed prompts in training, with switch points marked in normalisation.
- **Right voice, wrong pronunciation.** The model reads words differently from how a native speaker would, especially for named entities. Cause: no pronunciation lexicon; the model has to guess. Fix: build a lexicon of high-frequency proper nouns and enforce their pronunciation via the normalisation step.
- **Post-quantisation collapse.** The model sounds fine at full precision but degrades sharply after quantisation for on-device deployment. Cause: quantisation was an afterthought rather than a design constraint. Fix: measure at the deployment precision from the start; see the [compute-poor training](../compute-poor/index.md) chapter's discussion of quantisation as a deployment lever.
