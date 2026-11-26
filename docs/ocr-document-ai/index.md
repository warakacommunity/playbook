---
ready: true
title: Document AI
last_update:
  date: 2026-11-26
  author: Tadesse Destaw
---

# Document AI

Document AI turns images of documents into machine-readable text and structure. It is where vision meets language, and for African languages it carries a special weight, because it unlocks two things at once: the printed and handwritten material that holds much of the world's African-language text, and the historical and cultural record kept in scripts that mainstream tools ignore. Optical character recognition (OCR) for African scripts lags behind Latin-script languages, held back by script complexity and scarce data ([Fidel, 2025](../references.md#fidel-2025)).

:::tip[Key points]

- OCR, handwriting recognition and layout analysis share one pipeline: source, scan, annotate, release.
- The writing system is the main challenge: diacritics, Ge'ez, Ajami, N'Ko and Tifinagh.
- Tools built for Latin or standard Arabic script do poorly here, so most of the work is building data.
- Phone-captured documents need careful capture: whole page, flat, even light, pages in order.

:::

This chapter covers three document tasks:

- **[OCR](./ocr.md)**: recognising printed text.
- **[Handwritten text recognition](./handwritten.md)**: recognising handwriting.
- **[Layout and document understanding](./layout.md)**: recovering a document's structure.

## What the three tasks share, and the African scripts that define them

All three tasks start from scanned or photographed pages and produce text or structure. They share one pipeline: source the documents, scan them to a consistent standard, annotate them against their true content, and release them with clear rights (see the [Vision overview](../sections/vision.md)).

What sets African document AI apart is the writing systems:

| Writing system | Used for (examples) | Main difficulty |
|---|---|---|
| Latin script with diacritics | Yorùbá, Hausa, many others | Tone marks and special letters change the word if dropped |
| Ge'ez (Fidel) syllabary | Amharic, Tigrinya | Large character set with many similar shapes |
| Ajami (Arabic script adapted to African languages) | Hausa, Fulfulde | Extra letters and conventions not in standard Arabic |
| Other scripts | N'Ko, Tifinagh | Few OCR tools or datasets |

Tools built for Latin or even standard Arabic perform poorly on these scripts. African document AI is therefore largely a project of building the data these scripts never had.

Two recent datasets show the way:

- **Fidel** assembled a large Amharic OCR corpus spanning printed, handwritten and synthetic text ([Fidel, 2025](../references.md#fidel-2025)).
- **Ajami HTR** built a handwritten-text dataset for Ajami manuscripts in Fulfulde and Hausa, bringing a previously digitally invisible script into reach ([Ajami HTR, 2025](../references.md#ajami-htr-2025)).

## Documents photographed on phones

Contributors often capture documents with a phone rather than a scanner. Treat one document as one unit: keep all its pages together, photographed in reading order.

- **Resolution.** Photograph at a higher resolution than you would use for ordinary field photos. Small diacritics and fine strokes in dense scripts are easily lost.
- **Capture.** Lay each page flat, light it evenly without flash glare or the photographer's shadow, and keep the whole page in frame.
- **Metadata.** Record with each document its type (letter, ledger, gazette, manuscript), its languages and script, and whether it is printed, handwritten or both. This lets you route pages later to [OCR](./ocr.md), [handwritten text recognition](./handwritten.md) or [layout](./layout.md) work.
- **Orientation and location.** Apply each photo's stored rotation and handle its location metadata as described in [Scene text](./ocr.md#scene-text).

The general field-capture practice is in the [Vision overview](../sections/vision.md).
