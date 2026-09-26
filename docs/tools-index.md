---
sidebar_position: 101
title: Tools index
description: A quick-reference list of the tools mentioned across the AfriPlaybook.
ready: true
last_update:
  date: 2026-09-26
  author: Shamsudddeen Hassan Muhammad
---

# Tools index

Each tool below is explained in the chapter that uses it. This page collects them in one place for quick reference.

## Annotation

- [Label Studio](https://labelstud.io/): the annotation platform behind AfriAnnotate.
- [AfriAnnotate](https://github.com/warakacommunity/afriannotate): the AfriPlaybook demo annotation tool.

## Speech

- [Common Voice](https://commonvoice.mozilla.org/): for contributing recordings to Common Voice.
- [whisper.cpp](https://github.com/ggerganov/whisper.cpp): speech recognition that runs on the device.
- [Meta MMS](https://github.com/facebookresearch/fairseq/tree/main/examples/mms): tools for Meta's Massively Multilingual Speech models.

## OCR

- [Tesseract](https://github.com/tesseract-ocr/tesseract), [TrOCR](https://huggingface.co/docs/transformers/model_doc/trocr), [Kraken](https://kraken.re/), [Calamari](https://github.com/Calamari-OCR/calamari), and [PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR).

## Model training and inference

- [Hugging Face Transformers](https://huggingface.co/docs/transformers/), [PEFT](https://huggingface.co/docs/peft/) (LoRA and QLoRA), and [bitsandbytes](https://github.com/TimDettmers/bitsandbytes).
- [llama.cpp](https://github.com/ggerganov/llama.cpp), [MLC-LLM](https://mlc.ai/mlc-llm/), and [ONNX Runtime Mobile](https://onnxruntime.ai/docs/tutorials/mobile/), for running models on phones and small devices.

## Metrics

- [sacrebleu](https://github.com/mjpost/sacrebleu) for chrF and BLEU, [jiwer](https://github.com/jitsi/jiwer) for CER and WER, [seqeval](https://github.com/chakki-works/seqeval) for NER, and [scikit-learn](https://scikit-learn.org/) for classification.

## Fonts and script rendering

See also [non-Latin script deployment](./deployment/non-latin-scripts.md).

- [Google Noto](https://fonts.google.com/noto): an open font family that covers African scripts.
- [SIL fonts](https://software.sil.org/fonts/): Charis, Doulos, and Andika, for Latin-script text with diacritics.
