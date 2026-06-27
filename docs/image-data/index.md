---
title: Image Data
---

# Image Data

Image data covers the vision tasks where the input is a still picture: deciding what an image shows, locating objects within it, and outlining their exact shapes. Computer vision is less language-dependent than the rest of this playbook, but it is no less African, because the questions that matter on the continent are specific to it. A survey of computer-vision research in Africa found the field concentrated in a few high-impact areas, above all agriculture and health, and constrained by the same data scarcity that limits African NLP ([State of CV in Africa, 2024](../references.md#cv-africa-2024)).

This chapter covers three image tasks:

- **[Classification](./classification.md)**: assigning a label to a whole image.
- **[Object detection](./object-detection.md)**: locating and labelling objects with boxes.
- **[Segmentation](./segmentation.md)**: outlining objects or regions pixel by pixel.

## What the three tasks share

The tasks differ in how finely they label an image, but the pipeline around them is shared: source images you have the right to use, with attention to consent where people are identifiable; capture or scan to a consistent standard; annotate with a clear scheme and locally knowledgeable annotators; measure agreement; and release under a clear licence. The [Vision overview](../sections/vision.md), [Annotation Design](../3_annotation-design/annotation-task-design.md), and [Data Governance](../data-governance/index.md) chapters cover these. Two African realities run through all three tasks. The high-value domains are agriculture, health, and the environment, where datasets such as LacunaLabels for crop-field boundaries and LandCoverNet for land cover were built precisely because global datasets under-represent African landscapes. And images of people carry the same likeness and consent obligations as voices do, so faces, locations, and identifiable settings need the same governance care as any personal data.
