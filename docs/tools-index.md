---
sidebar_position: 101
title: Tools index
description: A quick-reference list of the tools mentioned across the AfriPlaybook.
ready: true
last_update:
  date: 2026-11-26
  author: Shamsuddeen Hassan Muhammad
---

# Tools index

Each tool below is explained in the chapter that uses it. This page collects them in one place for quick reference. The Playbook is tool-neutral: these are examples of open tools people use, not recommendations. Choose the tool that fits your task, your languages and your connectivity.

## Annotation

| Tool | What it is for |
|---|---|
| [Label Studio](https://labelstud.io/) | Open-source annotation for text, audio, images and video |
| [doccano](https://github.com/doccano/doccano) | Open-source text annotation: classification, sequence labelling and sequence-to-sequence |
| [INCEpTION](https://inception-project.github.io/) | Open-source semantic annotation of text, including spans and relations |
| [CVAT](https://github.com/cvat-ai/cvat) | Open-source image and video annotation: boxes, polygons and tracks |
| [ELAN](https://archive.mpi.nl/tla/elan) | Time-aligned annotation of audio and video, with multiple tiers |
| [Praat](https://www.fon.hum.uva.nl/praat/) | Speech analysis and phonetic annotation |

## Speech

| Tool | What it is for |
|---|---|
| [Common Voice](https://commonvoice.mozilla.org/) | Mozilla's crowdsourced platform for recording and validating speech; its datasets are released under CC0 |
| [whisper.cpp](https://github.com/ggml-org/whisper.cpp) | Speech recognition that runs on the device |
| [Meta MMS](https://github.com/facebookresearch/fairseq/tree/main/examples/mms) | Tools for Meta's Massively Multilingual Speech models |

## OCR

| Tool | What it is for |
|---|---|
| [Tesseract](https://github.com/tesseract-ocr/tesseract) | Open-source OCR engine |
| [TrOCR](https://huggingface.co/docs/transformers/model_doc/trocr) | Transformer-based text recognition |
| [Kraken](https://kraken.re/) and [Calamari](https://github.com/Calamari-OCR/calamari) | Trainable OCR, often used for historical documents |
| [PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) | OCR toolkit with detection and recognition models |

## Model training and inference

| Tool | What it is for |
|---|---|
| [Hugging Face Transformers](https://huggingface.co/docs/transformers/) | Loading, fine-tuning and running pre-trained models |
| [PEFT](https://huggingface.co/docs/peft/) | Parameter-efficient fine-tuning, such as LoRA and QLoRA |
| [bitsandbytes](https://github.com/bitsandbytes-foundation/bitsandbytes) | 8-bit and 4-bit quantisation for training and inference |
| [llama.cpp](https://github.com/ggml-org/llama.cpp), [MLC-LLM](https://mlc.ai/mlc-llm/), [ONNX Runtime Mobile](https://onnxruntime.ai/docs/tutorials/mobile/) | Running models on phones and small devices |

## Metrics

| Tool | What it measures |
|---|---|
| [sacrebleu](https://github.com/mjpost/sacrebleu) | chrF and BLEU for translation |
| [jiwer](https://github.com/jitsi/jiwer) | CER and WER for speech recognition and OCR |
| [seqeval](https://github.com/chakki-works/seqeval) | Entity-level scores for NER |
| [scikit-learn](https://scikit-learn.org/) | Classification metrics and Cohen's kappa |

## Fonts and script rendering

See also [non-Latin script deployment](./deployment/non-latin-scripts.md).

| Font family | What it covers |
|---|---|
| [Google Noto](https://fonts.google.com/noto) | Open fonts covering many scripts, including African ones |
| [SIL fonts](https://software.sil.org/fonts/) | Charis, Doulos and Andika, for Latin-script text with diacritics |
