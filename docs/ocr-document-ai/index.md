---
ready: true
title: Document AI
last_update:
  date: 2026-11-24
  author: Tadesse Destaw
---

# Document AI

Document AI turns images of documents into machine-readable text and structure. It is where vision meets language, and for African languages it carries a special weight, because it unlocks two things at once: the printed and handwritten material that holds much of the world's African-language text, and the historical and cultural record kept in scripts that mainstream tools ignore. Optical character recognition for African scripts lags far behind Latin-script languages, despite tens of millions of speakers, because of both script complexity and data scarcity ([Fidel, 2025](../references.md#fidel-2025)).

This chapter covers three document tasks:

- **[OCR](./ocr.md)**: recognising printed text.
- **[Handwritten text recognition](./handwritten.md)**: recognising handwriting.
- **[Layout and document understanding](./layout.md)**: recovering a document's structure.

## What the three tasks share, and the African scripts that define them

All three tasks start from scanned or photographed pages and produce text or structure, and all share the pipeline of sourcing, scanning to a consistent standard, annotating against the true content, and releasing with clear rights (see the [Vision overview](../sections/vision.md)). What sets African document AI apart is the writing systems. Beyond the Latin script with its heavy diacritics, African text is written in the Ge'ez (Fidel) syllabary used for Amharic and Tigrinya, in Ajami, which is Arabic script adapted for languages such as Hausa and Fulfulde, and in others like N'Ko and Tifinagh. Tools built for Latin or even standard Arabic perform poorly on these, so African document AI is largely a project of building the data these scripts never had. Two recent datasets show the way: Fidel assembled a large Amharic OCR corpus spanning printed, handwritten, and synthetic text ([Fidel, 2025](../references.md#fidel-2025)), and a handwritten-text dataset for Ajami manuscripts in Fulfulde and Hausa brought a previously digitally invisible script into reach ([Ajami HTR, 2025](../references.md#ajami-htr-2025)).

**Documents photographed on phones.** When contributors capture documents with a phone rather than a scanner, treat one document as one unit: a single task holds every page, photographed in reading order, at a higher resolution than you would use for ordinary field photos, because small diacritics and fine strokes in dense scripts are easily lost. Record with each document its type (letter, ledger, gazette, manuscript), its languages and script, and whether it is printed, handwritten or both, so pages can later be routed to [OCR](./ocr.md), [handwritten text recognition](./handwritten.md) or [layout](./layout.md) work. Ask contributors to lay each page flat, light it evenly without flash glare or their own shadow, and keep the whole page in frame. Phone photos still need their orientation applied and their location metadata handled as described in [Scene text](./ocr.md#scene-text), and the general field-capture practice is in the [Vision overview](../sections/vision.md).
