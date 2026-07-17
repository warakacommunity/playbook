---
title: "Annotation templates"
sidebar_label: "Templates"
sidebar_position: 3
description: "Pre-built labeling configurations for common scenarios — Text Classification, NER, Image BBox, Audio Transcription, and more."
mdx:
  format: md
---

# Annotation templates

A **template** is a pre-built XML labeling configuration that
covers a common annotation scenario. Pick one when you create a
project; it gives you a working labeling interface in seconds.

Templates are the **fastest path** from a fresh project to your
first labeled task. Customise from there.

## Where to find them

When you create a project:

1. **+ Create Project** → fill in name + workspace
2. Click **Labeling Setup**
3. The left panel groups templates by data type (Text, Image,
   Audio, Video, Time Series, Multi-modal, HTML, PDF, Structured
   data)
4. Click a template card → preview opens on the right
5. Click **Use this template**

You can also browse the gallery without creating a project at
**Project → Settings → Labeling Interface → Templates**.

## Built-in templates

### Text

| Template | What it does |
|---|---|
| **Text Classification** | Single- or multi-select category for each text task. The Hello-World of NLP labeling. |
| **Sentiment Analysis** | Three-way positive / neutral / negative. |
| **Named Entity Recognition** | Span labels (PER, LOC, ORG, etc.) over text. |
| **Relation Extraction** | NER + directional relations between entities. |
| **Question Answering** | Mark the answer span inside a passage. |
| **Text Summarisation** | Free-text summary input + optional rating of generated summary. |
| **Machine Translation Review** | Source + target text + rating / correction. |
| **Toxicity / Safety** | Multi-label safety classification (toxic, threatening, hate, etc.). |

### Image

| Template | What it does |
|---|---|
| **Image Classification** | Single label per image. |
| **Image Bounding Box** | Draw rectangles around objects, label each. |
| **Polygon Segmentation** | Draw polygons; export as polygon coords or pixel masks. |
| **Semantic Segmentation (Brush)** | Paint pixel-level masks with a brush + eraser. |
| **Keypoint Detection** | Drop keypoints (e.g. body joints, facial landmarks). |
| **OCR** | Bounding box + transcription per box. |
| **Multi-page Document Annotation** | Multi-image scrollable view for PDF / scanned docs. |

### Audio

| Template | What it does |
|---|---|
| **Audio Classification** | Single category per clip (genre, emotion, language). |
| **Audio Region Labeling** | Mark + label time-spans within audio. |
| **Audio Transcription** | Free-text transcription of an audio clip. |
| **Speaker Diarisation** | Time-spans labeled per speaker. |
| **Audio + Text Alignment** | Pair audio with transcript; align words to time. Uses `<AudioTextAlign>` |
| **Read-aloud Capture** | Show a prompt; annotator records themselves reading it. Uses `<AudioRecord>` + Audio QC pipeline (AfriAnnotate-specific) |

### Video

| Template | What it does |
|---|---|
| **Video Classification** | One label per video clip. |
| **Video Region Labeling** | Time-spans + categories within video. |
| **Object Tracking** | Bounding boxes that follow an object across frames. |

### Multi-modal

| Template | What it does |
|---|---|
| **Image + Text** | Image with caption — classify the pair. |
| **Audio + Text** | Audio with reference transcript — judge accuracy. |
| **PDF + Text** | PDF view with side-by-side annotation panel. |

### Conversational AI

| Template | What it does |
|---|---|
| **Chat Annotation** | Multi-turn dialogue labeling per-turn. |
| **Pairwise Comparison** | Two model outputs; annotator picks the better one (RLHF flavour). |
| **Ranking** | N model outputs; annotator ranks them. |

### Time Series

| Template | What it does |
|---|---|
| **Time Series Classification** | Single label per series. |
| **Time Series Segmentation** | Time-spans + categories within a multi-channel series. |
| **Anomaly Detection** | Mark anomalous intervals. |

### Structured Data

| Template | What it does |
|---|---|
| **HTML Annotation** | Highlight + label HTML elements. |
| **Table Annotation** | Label cells in a tabular display. |

## Picking a template

A few common decisions:

| You have… | Pick… |
|---|---|
| A list of sentences + a category set | **Text Classification** |
| A corpus + person/place/organisation labels | **Named Entity Recognition** |
| Images + you want to identify objects | **Image Bounding Box** |
| Images + pixel-perfect masks | **Semantic Segmentation (Brush)** |
| Audio + you need transcriptions | **Audio Transcription** |
| Read-aloud corpus collection (TTS / ASR training) | **Read-aloud Capture** |
| Comparing two model outputs (RLHF) | **Pairwise Comparison** |
| Time-bucketed data labels | **Time Series Classification** or **Time Series Segmentation** |

## Customising a template

Every template is a starter — you almost always want to tweak. Two
ways:

### Visual editor

After picking a template:

1. **Project → Settings → Labeling Interface → Visual**
2. The form lets you rename labels, change colours, toggle settings
   (e.g. "Select text by words" vs "by character")
3. Save

The visual editor is best for label + colour changes. For deeper
edits, use the code editor.

### Code editor

Same page → click **Code**. You see the underlying XML:

```xml
<View>
  <Text name="text" value="$text"/>
  <Choices name="sentiment" toName="text" choice="single">
    <Choice value="Positive"/>
    <Choice value="Neutral"/>
    <Choice value="Negative"/>
  </Choices>
</View>
```

Edit the XML directly. The right pane previews changes in
real-time. See [Tag reference](/annotate/labeling-config/tags/) for the full XML grammar.

## Save as a new template

If you've customised a config that other projects might benefit
from:

1. **Project → Settings → Labeling Interface → ⋮ menu → Save as template**
2. Name + describe it
3. Save

Saved templates live at the **organisation level** — every project
owner in the same org can pick them when creating new projects.
Promote to **platform-level** (visible to every org on the platform)
via **Platform → Settings → Custom templates** (platform-owner
only).

## Template gallery

Browse the full library (built-in + your org's custom templates) at
**Project → Settings → Labeling Interface → Templates** — same
gallery the create-project wizard uses.

You can also browse the upstream Label Studio template gallery at
[labelstud.io/templates](https://labelstud.io/templates) — the XML
formats are identical, so any upstream template works
unmodified.

## What's next

- **[Labeling config overview →](/annotate/labeling-config/overview)** — XML grammar +
  visual editor walkthrough
- **[Tag reference →](/annotate/labeling-config/tags/)** — every tag, its attributes, and
  worked examples
- **[Project setup →](/annotate/projects/setup)** — full project create
  flow (the template picker sits inside this)
