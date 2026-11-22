---
ready: true
title: Vision
sidebar_label: Overview
last_update:
  date: 2026-11-22
  author: Shamsuddeen Hassan Muhammad
---

# Vision

Collecting and labelling images, documents and video for African contexts and scripts. The
chapters below share the same capture, consent and annotation groundwork; they differ in
whether the input is a still picture, a page of text, or moving images, and in how finely
it is labelled.

## Shared across image & video data

- Sourcing & rights for images, scans and video
- Capture devices & standards (camera or phone, scanner, resolution, format, lighting, frame rate)
- Consent for images of people, who are identifiable from their face, body and surroundings
- Privacy: faces, locations and identifiable settings handled as personal data
- Preprocessing (deskew, denoise, normalization, encoding)
- Annotation (labels, bounding boxes, segmentation masks, transcriptions, temporal spans)
- Annotation tools & inter-annotator agreement
- Metadata, dataset formatting & splits
- Licensing of images and likeness rights

Consent, privacy and licensing are covered in [Data Governance](../data-governance/index.md)
and [Licensing](../6_documentation/licensing.md); annotation schemes and agreement in
[Annotation Design](../3_annotation-design/annotation-task-design.md).

## Chapters

- **[Image Data](../image-data/index.md)**: still pictures, from coarse to fine labels: [classification](../image-data/classification.md), [object detection](../image-data/object-detection.md), [segmentation](../image-data/segmentation.md)
- **[Document AI](../ocr-document-ai/index.md)**: where vision meets language, for Latin, Ge'ez, Ajami and other African scripts: [OCR](../ocr-document-ai/ocr.md), [handwritten text recognition](../ocr-document-ai/handwritten.md), [layout & document understanding](../ocr-document-ai/layout.md)
- **[Video](../sign-language-video/index.md)**: images over time, annotated in time as well as space: [sign language](../sign-language-video/sign-language.md), [gesture](../sign-language-video/gesture.md), [video understanding](../sign-language-video/video.md)

Image Data sets the base that the other two extend: Document AI adds text and script, and
Video adds time. Tasks that pair images with text, such as captioning and visual question
answering, are in the [Multimodal](./multimodal.md) section.
