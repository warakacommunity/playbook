---
sidebar_position: 7
title: Model card template
last_update:
  date: 2026-07-07
  author: Idris Abdulmumin
---

# Model card template

*Last reviewed: 2026-07-07.*

*A Model-Cards-derived template ([Mitchell et al., 2019](https://arxiv.org/abs/1810.03993)) extended with the deployment-realism sections the playbook's [deployment chapter](../deployment/index) argues are non-optional: target-tier latency, quantised quality drop, code-switched evaluation, script-variant coverage. Fork it, fill it in, ship it alongside the model release.*

## How to use this template

1. Copy everything below the divider into a new file (`docs/model-card.md` in your project repo, or a `README.md` on the Hugging Face Hub model page).
2. Replace every `[BRACKETED FIELD]` with a real answer.
3. Delete any section that genuinely does not apply and add `Not applicable — [why]` in its place. Do not silently skip.
4. Publish it alongside the model, not separately. A model without a card is a model that will be misused.

Motivated by [Mitchell et al., 2019](https://arxiv.org/abs/1810.03993), the playbook's [Before You Start](../before-you-start/index) editorial rules, the [deployment chapter](../deployment/index), and the [legal-consent chapter](../legal-consent/index).

---

## [MODEL NAME]

- **Version:** [X.Y]
- **Release date:** [YYYY-MM-DD]
- **Last reviewed:** [YYYY-MM-DD]
- **Canonical URL:** [HF Hub page, GitHub release, or landing URL]
- **Licence:** [SPDX identifier — e.g., CC BY-NC 4.0, Apache-2.0]
- **Preferred citation:** [BibTeX or plain text]
- **Contact / named steward:** [NAME + channel — the person or body who handles re-use requests and reported issues.]

## 1. Model details

- **Type of model:** [Encoder / encoder-decoder / decoder-only / speech encoder / text-to-speech / OCR encoder-decoder / retrieval + reader / etc.]
- **Architecture:** [E.g., "XLM-RoBERTa-large fine-tuned via LoRA (rank 16)".]
- **Number of parameters:** [Total + trainable if PEFT was used.]
- **Base model:** [The upstream checkpoint this was built from. Include its URL and its licence.]
- **Training regime:** [Full fine-tuning / LoRA / QLoRA / adapter / from scratch.]
- **Language(s):** [Specific ISO codes + varieties, dialects, registers included.]
- **Modality:** [Text / speech / vision / multimodal.]
- **Task(s):** [Specific.]
- **Who developed the model:** [Named individuals + affiliations + community whose language it serves.]
- **Who funded development:** [Names + grant IDs.]

## 2. Intended use

- **Primary intended use:** [Specific task and context. Not "NLP research" — the actual use case.]
- **Primary intended users:** [Researchers, developers, community members, deployment teams — whichever applies.]
- **Out-of-scope uses:** [Explicit list. Every model card should name the uses the developers do **not** endorse. See the [legal-consent chapter's "when to say no"](../legal-consent/index#when-to-say-no) — the same reasoning applies here.]

## 3. Training data

- **Corpus / corpora used:** [Named datasets + URLs + licences. Include AfriSenti, MasakhaNER 2, LAFAND-MT, or your project-specific corpus.]
- **Companion dataset cards:** [Link to the dataset cards for each corpus used. See the [dataset card template](./dataset-card).]
- **Preprocessing applied:** [Tokenisation, normalisation, diacritic handling, script conversion, deduplication, filtering. Specific enough to reproduce.]
- **Size of the training set:** [Per language, per split.]
- **Known biases in the training data:** [Under-represented demographics, over-represented sources, domain narrowness, code-switching profile.]
- **Any data augmentation applied:** [Synthetic data, back-translation, LLM-generated examples. Named + reasoning.]

## 4. Evaluation

Per the [core principles](../1_introduction/core-principles), evaluation must be per-language and per-class. See the [evaluation script template](./evaluation-script) for the compliant harness.

- **Evaluation set(s) used:** [Named benchmarks + splits + preprocessing.]
- **Primary metric:** [chrF for translation, CER for speech, per-class F1 for classification, top-k retrieval for QA. State the choice and the reasoning.]
- **Secondary metrics:** [BLEU, WER, EM — the ones kept for comparison with prior work.]

### 4.a Results

Report per language and per class. Do **not** publish a single headline number that averages across languages; the playbook's editorial position is that such averages hide catastrophic per-language failure.

| Language | [PRIMARY METRIC] | [SECONDARY METRIC] | Support (n) |
| --- | --- | --- | --- |
| [LANG 1] | [SCORE] | [SCORE] | [N] |
| [LANG 2] | [SCORE] | [SCORE] | [N] |

For classification: add a per-class F1 breakdown per language.

### 4.b Human evaluation

Mandatory for generative output (translation, TTS, generative QA, LLM-based tasks).

- **Number of evaluators:** [MIN 2 for statistical stability; MIN 5 for MOS.]
- **Number of items evaluated:** [Per language.]
- **Scale used:** [1-5 MOS, direct assessment, adequacy + fluency, etc.]
- **Result:** [Score + confidence interval + how disagreements were resolved.]
- **Where the raw evaluation data is available:** [URL — human eval must be reproducible.]

### 4.c Code-switched evaluation

Required per the [multilingual switching chapter](../deployment/multilingual-switching).

- **Code-switched test set used:** [Description + URL.]
- **Score on code-switched inputs:** [Report separately from monolingual — a single number hides the code-switching failure.]

### 4.d Script-variant evaluation

Required for languages written in more than one script (Hausa Latin + Ajami, Amharic Ge'ez + Latin transliteration, etc.).

- **Script variants tested:** [Named + score per variant.]

## 5. Deployment realism

Beyond standard model-card fields, these sections are the playbook's non-negotiable additions.

### 5.a Target deployment tier

- **Hardware class the model is intended to run on:** [Server GPU / mid-range Android / Android Go / Raspberry Pi 5 / etc. — see the [edge-devices chapter's phone tier map](../deployment/edge-devices#the-phone-tier-map-—-the-deployment-surface).]
- **Runtime supported:** [ONNX Runtime Mobile / TFLite / whisper.cpp / llama.cpp / MLC-LLM / etc.]
- **Model size on disk:** [Full precision + quantised sizes.]
- **RAM required at inference:** [Full precision + quantised.]

### 5.b Latency and throughput

- **p50 latency on target hardware:** [ms per inference on a representative input.]
- **p95 latency:** [The percentile that matters for UX.]
- **Throughput under sustained load:** [Including thermal throttling — see the [edge-devices evaluation section](../deployment/edge-devices#evaluation-methodology-for-edge-deployment).]
- **Battery drain per 100 inferences on target phone tier:** [If applicable.]

### 5.c Quantisation

- **Quantisation applied:** [INT8 dynamic / INT8 static / INT4 / mixed-precision / QAT.]
- **Quality drop from quantisation:** [Primary metric before + after quantisation, per language. This must be reported; deploying a model without measuring the quantised quality drop is the failure mode.]
- **Quantised model URL:** [Where to download the quantised weights.]

### 5.d Offline behaviour

For any model shipped as part of an offline-capable deployment. See the [offline chapter](../deployment/offline).

- **Runs fully on-device:** [Yes / no.]
- **Model-download UX for the target app:** [Wi-Fi-preferred, resumable, integrity-checked, cancellable — reference to the [offline chapter's model-download UX section](../deployment/offline#model-download-ux-—-the-part-that-gets-ignored).]

## 6. Limitations and known failure modes

- **Known limitations:** [Specific to this model + task + languages. Draw from the "known limitations" section of the relevant [Before You Start](../before-you-start/index) page.]
- **Known systematic errors:** [Where the model reliably gets things wrong, from the evaluation data.]
- **What the metrics do NOT show:** [Per the [core principles](../1_introduction/core-principles) — the playbook's editorial position is that metric blind spots must be named on the card.]
- **Populations under-served:** [Dialects, registers, demographics where the model performs worse.]
- **Recommendations for downstream users encountering an issue:** [Named contact + expected response time.]

## 7. Ethical considerations

- **Consent basis for the training data:** [Reference to the corpus's consent architecture. See the [consent form template](./consent-form).]
- **Community involvement in model development:** [Named community stewards + their role.]
- **Deployment risks:** [Specific to the task. For hate-speech classifiers, deployment-as-automated-moderation risk (see the [hate-speech page](../before-you-start/hate-speech)). For TTS, voice-cloning risk (see the [TTS page](../before-you-start/tts#voice-consent-and-voice-cloning-risks)). For classifiers deployed against marginalised users, false-positive disparity.]
- **Mitigations:** [What the developers have done; what the deployer must still do.]

## 8. Reproducibility

- **Training code URL:** [Repo + specific commit hash.]
- **Training configuration:** [Config file URL + hyperparameters.]
- **Random seeds:** [Fixed for reproducibility.]
- **Compute environment:** [Framework + version + hardware.]
- **Estimated training compute:** [GPU-hours + hardware tier. Useful for downstream users comparing carbon and cost implications.]

## 9. Distribution

- **Where the model is hosted:** [HF Hub URL, GitHub release, university repository.]
- **Licence terms in full:** [SPDX + link to full text.]
- **Restrictions on re-use:** [Explicit; matches the training-data licence unless the developers have negotiated broader terms.]
- **Attribution requirements:** [How the developers and the community should be credited.]

## 10. Maintenance

- **Who maintains this model:** [NAMED individual or institution.]
- **Release cadence:** [How often the model is updated.]
- **Deprecation policy:** [When and how the model will be marked deprecated; migration path to a successor.]
- **Errata process:** [How discovered issues are reported and how fixes are shipped.]

## 11. Citation

Preferred citation:

```
[BibTeX or plain-text]
```

If the model builds on published corpora, cite them:

- [DATASET 1 CITATION]
- [DATASET 2 CITATION]

If the model builds on a base model:

- [BASE MODEL CITATION]

---

**Contributor's note.** If your model card extends this template with fields specific to a task (retrieval scores for QA, MOS breakdown for TTS, per-page CER for OCR, per-script CER, etc.), keep the standard sections intact and add task-specific sections *below*. The shared field structure is what makes cross-model comparison possible.
