---
ready: true
title: Layout & document understanding
sidebar_position: 4
last_update:
  date: 2026-07-07
  author: Tadesse Destaw
---

# Layout & document understanding

*Last reviewed: 2026-07-07.*

Layout and document understanding recovers the structure of a document, not just its text: which parts are titles, paragraphs, columns, tables, and figures, and how they relate. It is what turns a flat OCR transcript into something usable, and it matters most for the complex documents African digitisation actually deals with, such as multi-column newspapers, government forms, and archival records.

:::tip[Key points]

- Layout data is page images with labelled regions, plus reading order and table structure where needed.
- Public layout corpora come mostly from modern scientific and business documents; African archives look very different.
- Annotate with a fixed, well-defined region label set and score with mAP, as in object detection.
- Report reading order, table structure and end-to-end OCR quality separately from region mAP.
- Split evaluation by script mix and by period, so failures do not hide in the average.

:::

![Document layout regions: title, paragraph, column, table, figure, marginalia, with reading order](images/layout-regions.svg)

## What the data looks like

A layout dataset is a set of document images annotated with labelled regions: boxes or polygons marking each structural element. Reading order and table structure are often added on top.

The African challenge is less about script than about source. Many target documents are old, unevenly scanned and multi-column, and mix languages and scripts on a single page. This defeats models trained on clean modern documents:

- The large public layout corpora, such as PubLayNet, come from scientific articles ([Zhong et al., 2019](../references.md#zhong-2019-publaynet)).
- Models trained on them lose accuracy sharply on more varied layouts ([Pfitzmann et al., 2022](../references.md#pfitzmann-2022-doclaynet)).

Archival material in particular, with its faded ink, marginalia and irregular layouts, needs data collected from the real archives rather than borrowed from elsewhere.

## Annotation and evaluation

Annotating layout means drawing and labelling regions. It is the same skill as object detection, but with a document-specific label set, plus reading order and table cells where the task needs them. The guidelines must define each region type and say how to handle overlap and nesting.

**Task specification: document layout regions**

| Setting | Value |
|---|---|
| Annotator sees | One page image |
| Annotator gives | A box around each structural region, with one label per box |
| Choice | Exactly one label per region, from: Title, Paragraph, Column, Table, Figure, Marginalia |
| Notes | Where the task needs them, also record reading order and table-cell structure as separate fields |

Because the regions are boxes, the data uses the same COCO format as [object detection](../image-data/object-detection.md), with these region types as the categories. Capture reading order and table-cell structure as added fields rather than trying to encode them in the boxes alone.

Layout analysis is evaluated like detection:

- **[Mean Average Precision (mAP)](https://lightning.ai/docs/torchmetrics/stable/detection/mean_average_precision.html)** measures how well predicted regions match the true ones, as in the DocLayNet baselines ([Pfitzmann et al., 2022](../references.md#pfitzmann-2022-doclaynet)).
- **[F1](https://en.wikipedia.org/wiki/F-score)** over structural elements is reported alongside it.
- A human check on a sample supports both, as always.

## The 2026 modelling landscape

Layout analysis in 2026 sits between three model families:

- **Purpose-built layout models.** **LayoutLMv3** (Microsoft, 2022) is a widely used reference for document understanding, jointly modelling text, layout and image; it is pre-trained on about 11 million English scanned document images and evaluated on forms, receipts, document VQA, classification and layout analysis ([Huang et al., 2022](../references.md#huang-2022-layoutlmv3)). Its released weights are licensed CC BY-NC-SA 4.0, which rules out commercial use. **DiT (Document Image Transformer)** is a self-supervised, MIT-licensed image backbone for document tasks, including layout analysis ([Li et al., 2022](../references.md#li-2022-dit)). Both are designed for fine-tuning on a target document class; measure how many annotated pages yours needs.
- **End-to-end document parsers.** **Donut** (NAVER, 2022) is an OCR-free document understanding transformer that reads the page image directly and produces structured output, MIT-licensed ([Kim et al., 2022](../references.md#kim-2022-donut)). **Nougat** (Meta, 2023) targets academic documents specifically, converting them to markup with maths and tables ([Blecher et al., 2023](../references.md#blecher-2023-nougat)); it was trained on English-dominated scientific papers, its weights are CC-BY-NC, and it may suit African academic material with equations and tables. **[Surya](https://github.com/VikParuchuri/surya)** produces layout regions and reading order as part of its OCR pipeline (Apache-2.0 code, weights under a modified OpenRAIL-M licence).
- **General MLLMs.** **[GOT-OCR 2.0](https://arxiv.org/abs/2409.01704)**, **[Qwen2.5-VL](https://qwenlm.github.io/blog/qwen2.5-vl/)**, and **[InternVL 3](https://github.com/OpenGVLab/InternVL)** all produce structured outputs (tables, forms, marginalia) as part of general document reading. Noisier than dedicated models for pure layout detection, but superior when the downstream task is instruction-following ("extract the header row of every table on this page").

**Editorial opinion: where to start.** These are the editors' suggested starting points, not measured results:

| Material | Suggested first path |
|---|---|
| Contemporary printed material (newspapers, government forms, health surveys) | Measure Surya's layout output and DiT / LayoutLMv3 baselines on 200-500 target-domain pages. Fine-tune LayoutLMv3 on 500-2,000 annotated pages if out-of-box mAP is below about 0.6 for your region types (mind its non-commercial weights licence). |
| Historical archival material | Plan for fine-tuning on archive-representative pages: general models trained on modern business documents mishandle marginalia, faded regions and mixed-script pages. |
| Multi-column newspapers | Treat Surya's reading-order output as the baseline, and measure it before treating reading order as a separate task. |

**Closed-API baselines.** **Azure Document Intelligence**, **Google Document AI**, and **Amazon Textract** all provide layout + table extraction with varying African-material coverage. They are built mainly for clean modern business documents; expect weaker results on archival material, multi-column newspapers, and mixed-script pages, and measure before relying on them. Use as ceiling reference for research, not deployment surface unless the target document class has been validated in advance.

## What it will actually cost you

Layout annotation is faster per region than transcription, but slower per page than whole-page classification, because every region needs a box and a label. The figures below are rough, order-of-magnitude planning estimates from the editors, not measured benchmarks:

| Activity | Scale | Rough effort |
|---|---|---|
| Fine-tune LayoutLMv3 on an existing layout corpus | Existing corpus | 1-3 person-weeks of engineering; 20-60 GPU-hours |
| Annotate a new layout corpus for a new document class | 500-2,000 pages | 4-9 months elapsed; 3-7 person-months (about 15-30 pages per annotator per day for a moderate label set) |
| Add reading-order annotation | On top of layout regions | About 30-50% more annotation time per page |
| Add table-cell structure | Pages containing tables | About 100-200% more annotation time per page; table structure is slow |
| Build an evaluation-only layout set | 300-1,000 pages | 2-5 months elapsed; 2-4 person-months |
| Human evaluation of layout output | 200 pages | 1-2 person-weeks per evaluator; fast, because each region's correctness is visually obvious |

## Known limitations to watch for

- **Business documents ≠ African archival material.** LayoutLMv3 is pre-trained on English scanned business documents (IIT-CDIP) and benchmarked on modern forms (FUNSD), receipts (CORD) and scientific articles (PubLayNet) ([Huang et al., 2022](../references.md#huang-2022-layoutlmv3)). Its priors are unlikely to transfer to 1970s government gazettes or church records, and layout models in general lose accuracy when layouts differ from their training data ([Pfitzmann et al., 2022](../references.md#pfitzmann-2022-doclaynet)).
- **Multi-column reading order is not solved.** Reading-order detection has its own models and benchmarks, and a dedicated reading-order model measurably improves the line ordering of both open-source and commercial OCR engines ([Wang et al., 2021](../references.md#wang-2021-layoutreader)). Unusual layouts, such as three-column newspapers with a half-page advertisement in the middle, are where ordering tends to fail. Report reading-order accuracy separately from region mAP.
- **Mixed-script pages often break models.** On a page that mixes Latin and Ge'ez, Latin and Ajami, or Latin and Tifinagh, expect region-detection failures on the script the model was not trained on. Segment training data by script mix.
- **Marginalia are their own task.** Marginalia interact with layout at every level: position (edge of page, in the gutter), reading order (before or after the main text?), and content (glosses, corrections, ownership marks). Do not treat them as regular text regions.
- **Table extraction is a separate benchmark.** Layout region detection tells you *where* the table is; table structure recognition tells you *what* is in each cell. Benchmarks such as PubTables-1M treat table detection, structure recognition and functional analysis as distinct tasks ([Smock et al., 2021](../references.md#smock-2021-pubtables)). Do not conflate them in evaluation.
- **Historical documents drift orthographically and typographically.** Evaluate layout models trained on a corpus that spans the 20th century split by decade. A good overall mAP can hide a much lower score on the earliest decade, because the failure is averaged away.
- **Downstream OCR quality dominates.** A perfect layout model feeding a mediocre OCR model produces mediocre document output. Report end-to-end document quality (OCR-in-region CER) alongside layout mAP.

## Further reading

- LayoutLMv3 ([Huang et al., 2022](../references.md#huang-2022-layoutlmv3)): a widely used document-understanding model and fine-tuning recipe; note the non-commercial weights licence.
- Donut ([Kim et al., 2022](../references.md#kim-2022-donut)): the OCR-free document parsing approach; useful when the downstream task is structured extraction from document images.
- [Surya (Paruchuri, 2024-2026)](https://github.com/VikParuchuri/surya): a strong current open OCR + layout + reading-order release; a modern baseline worth measuring for African-language document processing, but check its per-language results for your language first.
- DocLayNet ([Pfitzmann et al., 2022](../references.md#pfitzmann-2022-doclaynet)): a human-annotated layout dataset spanning varied document types, and evidence that layout models trained on scientific articles generalise poorly.
- LayoutReader ([Wang et al., 2021](../references.md#wang-2021-layoutreader)): reading-order detection as its own task, with the ReadingBank benchmark.

<details>
<summary>Additional references</summary>

- Nougat ([Blecher et al., 2023](../references.md#blecher-2023-nougat)): the academic-document parser; useful for African academic and scholarly material with equations and tables.
- DiT ([Li et al., 2022](../references.md#li-2022-dit)): a self-supervised document-image backbone for classification and layout tasks.
- [FUNSD dataset](https://guillaumejaume.github.io/FUNSD/): a form-understanding benchmark of 199 annotated noisy scanned forms ([Jaume et al., 2019](../references.md#jaume-2019-funsd)); useful for calibration.
- PubLayNet ([Zhong et al., 2019](../references.md#zhong-2019-publaynet)): a large layout benchmark of over 360,000 scientific-article pages; useful for calibration and cross-corpus comparison.
- PubTables-1M ([Smock et al., 2021](../references.md#smock-2021-pubtables)): a table extraction benchmark separating detection, structure recognition and functional analysis.

</details>
