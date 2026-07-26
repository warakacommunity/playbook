---
sidebar_position: 1
ready: true
last_update:
  date: 2026-07-07
  author: Idris Abdulmumin
---

# Before You Start

*Fifteen minutes here saves two to four weeks of duplicated groundwork.*

Every serious African-language NLP project starts by re-doing work someone else already did. A new team collects sentiment data for Hausa that overlaps 60% with [AfriSenti](https://arxiv.org/abs/2302.08956). A university group builds NER for Yoruba from scratch, months in, discovers [MasakhaNER 2](https://arxiv.org/abs/2210.12391) covers it. A funder writes a proposal for parallel Amharic-English translation without checking [LAFAND-MT](https://aclanthology.org/2022.naacl-main.223/). This chapter exists to stop that.

For every core task, this chapter answers the same four questions:

1. **What already exists** for African languages — datasets, models, benchmarks, per language, with an editorial opinion attached to each entry.
2. **Fork or start fresh?** — a decision tree that gets you to a defensible answer in five minutes.
3. **What is this actually going to cost you** — realistic effort estimates from the projects that did it before, in person-months and annotator-hours.
4. **Where the canonical fine-tuning tutorial lives** — one authoritative link out. We do not rewrite Hugging Face.

## Available now

- [Named Entity Recognition](./ner.mdx) — the flagship reference chapter, built on MasakhaNER 1 and 2.
- [Machine Translation](./machine-translation.mdx) — built on LAFAND-MT, MENYO-20k, FLORES-200, NLLB-200.
- [Automatic Speech Recognition](./asr.mdx) — built on Common Voice, FLEURS, NCHLT, MakerereNLP, Meta MMS, and Whisper.
- [Sentiment analysis](./sentiment.mdx) — built on AfriSenti (14 languages) and NaijaSenti.
- [Hate speech and content safety](./hate-speech.mdx) — for teams working on a task whose failure modes are qualitatively different from classification-as-usual.
- [Text-to-Speech](./tts.mdx) — built on Meta MMS-TTS, VITS/XTTS/Kokoro architectures, and the voice-consent framing that TTS uniquely requires.
- [Question Answering](./qa.mdx) — built on AfriQA, TyDi QA, mDPR / mContriever retrieval, with cross-lingual open-domain framing.
- [OCR and document AI](./ocr.mdx) — built on Tesseract, TrOCR, Kraken/Calamari, PaddleOCR, and community corpora across Latin, Ge'ez, Ajami, and other African scripts.

## What's next

All seven initially-planned Before-You-Start pages are now available. Future additions — for languages, scripts, or task variants not yet covered — follow the same four-part structure: *what exists / fork-or-fresh / cost / canonical link*, with editorial opinions attached to each recommendation. See the [contribution guide](https://github.com/warakacommunity/playbook/blob/main/README.md#ways-to-contribute) to propose one.

## The one rule

If any entry on any of these pages is more than **six months** out of date, it is broken and needs fixing. Datasets get superseded. Models get deprecated. Recommendations that were right a year ago rot. Each page ships with a "last reviewed" date at the top, and the community owns keeping that date fresh.

If you find a page here past its six-month mark and need to know what has shipped since, the [Finding current resources](../finding-resources/index.md) chapter names the primary Hugging Face organisations, archives, and workshops where the current state of the ecosystem lives.

## What this is not

This chapter is **not** a fine-tuning tutorial. It is the map you consult *before* you decide whether to fine-tune, what to fine-tune, and against what. The tutorial itself lives one link out.

For the strategic reasoning behind this chapter — why the playbook adds a "Before You Start" section instead of writing more model-training content — see [**What this playbook is (and isn't)**](../1_introduction/scope-and-strategy.md).
