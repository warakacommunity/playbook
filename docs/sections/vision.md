---
ready: true
title: Vision
sidebar_label: Overview
last_update:
  date: 2026-11-24
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

**Field capture on phones.** When contributors photograph things in the field, such as water points, shop signs, buildings or the pages of a document, the same few decisions apply beyond agriculture:

- **One task per site or object.** Key each task to a stable site or object ID, and set a minimum and a maximum number of photos per task, so that every record has enough views and no single site dominates.
- **Taken now, or picked from the phone.** Record whether each photo was taken live during the task or chosen from the device's gallery. A picked photo may be old, taken elsewhere, or someone else's, so check its rights and provenance before use.
- **Capture time and location as fields.** Many tools resize photos on upload, and resizing often drops the EXIF block. Store the capture time, and location only where contributors opt in, as explicit fields, coarsened to the level the project needs ([Visual privacy](../image-data/visual-privacy.md)).
- **Normalise formats at ingest.** iPhones often save photos as HEIC, and some files arrive as TIFF or AVIF. Convert them to one format at ingest, applying the orientation to the pixels first ([Coordinates and image orientation](../image-data/object-detection.md#coordinates-and-image-orientation)).
- **Keep offline photos linked.** A photo queued on a phone without signal must keep a stable link to its task and record when it uploads later ([Offline Field Operations](../2_data-collection/10_offline-field-operations.md)).

[Field Image Capture](../agri-advisory/field-image-capture.md) shows these steps in a full project.

## Chapters

- **[Image Data](../image-data/index.md)**: still pictures, from coarse to fine labels: [classification](../image-data/classification.md), [object detection](../image-data/object-detection.md), [segmentation](../image-data/segmentation.md), [keypoints and pose](../image-data/keypoints-pose.md), and the practices that cut across them: [box and region rules](../image-data/region-guidelines.md), [formats and merging](../image-data/formats-and-merging.md), [large and geo-referenced imagery](../image-data/large-imagery.md), [visual privacy](../image-data/visual-privacy.md), [splits and near-duplicates](../image-data/splits-and-duplicates.md) and [representativeness audits](../image-data/representativeness.md)
- **[Document AI](../ocr-document-ai/index.md)**: where vision meets language, for Latin, Ge'ez, Ajami and other African scripts: [OCR](../ocr-document-ai/ocr.md), [handwritten text recognition](../ocr-document-ai/handwritten.md), [layout & document understanding](../ocr-document-ai/layout.md)
- **[Video](../sign-language-video/index.md)**: images over time, annotated in time as well as space: [sign language](../sign-language-video/sign-language.md), [gesture](../sign-language-video/gesture.md), [video understanding](../sign-language-video/video.md), [long video](../sign-language-video/long-video.md)

Image Data sets the base that the other two extend: Document AI adds text and script, and
Video adds time. Tasks that pair images with text, such as captioning and visual question
answering, are in the [Multimodal](./multimodal.md) section.
