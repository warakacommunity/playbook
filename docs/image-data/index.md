---
ready: true
title: Image Data
last_update:
  date: 2026-11-23
  author: Tadesse Destaw
---

# Image Data

Image data covers the vision tasks where the input is a still picture: deciding what an image shows, locating objects within it, and outlining their exact shapes. Computer vision is less language-dependent than the rest of this playbook, but it is no less African, because the questions that matter on the continent are specific to it. A survey of computer-vision research in Africa found the field concentrated in a few high-impact areas, above all agriculture and health, and constrained by the same data scarcity that limits African NLP ([State of CV in Africa, 2024](../references.md#cv-africa-2024)).

This chapter covers three image tasks:

- **[Classification](./classification.md)**: assigning a label to a whole image.
- **[Object detection](./object-detection.md)**: locating and labelling objects with boxes.
- **[Segmentation](./segmentation.md)**: outlining objects or regions pixel by pixel.

## What the three tasks share

The tasks differ in how finely they label an image, but the pipeline around them is shared: source images you have the right to use, with attention to consent where people are identifiable; capture or scan to a consistent standard; annotate with a clear scheme and locally knowledgeable annotators; measure agreement; and release under a clear licence. The [Vision overview](../sections/vision.md), [Annotation Design](../3_annotation-design/annotation-task-design.md), and [Data Governance](../data-governance/index.md) chapters cover these. Two African realities run through all three tasks. The high-value domains are agriculture, health, and the environment, where datasets such as LacunaLabels for crop-field boundaries and LandCoverNet for land cover were built precisely because global datasets under-represent African landscapes. And images of people carry the same likeness and consent obligations as voices do, so faces, locations, and identifiable settings need the same governance care as any personal data.

## Choosing the annotation shape

Before any of the three tasks starts, decide what shape annotators will draw. The shape fixes what the dataset can measure, and it is expensive to change: a polygon can always be reduced to a box later, but a box can never be turned back into the outline it skipped, so switching to a richer shape after annotation means annotating again. Choose the cheapest shape that still carries the measurement your downstream task needs, write it into the guidelines, and test it in the pilot.

| Shape | Use it for | Precision | Effort |
|---|---|---|---|
| Image-level label | Presence only: is there a diseased leaf in this photo? | None on location | Lowest |
| Box | Counting and locating objects | Rough extent | Low |
| Rotated box | Elongated objects at an angle (boats, buildings in aerial images) | Tighter than a box | Low to medium |
| Ellipse | Round objects (cells, fruit, tree crowns) | Good for round shapes | Low to medium |
| Polygon | Objects with crisp edges (fields, rooftops) | High | Medium to high |
| Pixel mask | Diffuse regions (lesions, water, burnt land); exact areas | Highest | High |
| Open polyline | Linear features: roads, rivers, field edges, cracks | High along the line | Medium |
| Branching skeleton | Networks: roots, leaf veins, drainage | High along the branches | High |
| Keypoints | Landmarks and pose: joints, hand shape, the tips of a leaf | Exact points | Medium |

A few questions settle most choices:

- **What will be computed from the annotation?** Presence needs a label; a count needs a box, or one point per object; an area needs an ellipse, polygon or mask; a length needs a polyline. If nobody will use the exact outline, do not spend annotation effort on it.
- **What do the objects look like?** A box around a long diagonal object is mostly background, which is why rotated boxes exist; a box around a round fruit overstates its size, which is why ellipses exist. Polygons suit crisp edges, while masks suit regions whose edges fade, where a polygon would force a hard line through a gradient.
- **How crowded are the images?** In dense scenes, such as a herd seen from a drone, boxes overlap heavily and a single point or a small keypoint set per object can be faster and less ambiguous.
- **What does your evaluation expect?** The [object detection](./object-detection.md) page scores boxes with mAP, the [segmentation](./segmentation.md) page scores masks with mean IoU (mIoU), and keypoints are scored with a size-normalised distance such as Object Keypoint Similarity (see [Agreement when an image has many objects](./object-detection.md#agreement-when-an-image-has-many-objects)). Pick the shape whose standard metric matches the claim you want to make, and record it in the dataset card.

Two practical cautions. Not every annotation tool supports every shape, and some export rotated boxes, ellipses or polylines in their own formats, so confirm that the shape survives export to the format you will release before the pilot rather than after. And mixing shapes for the same class (boxes from one annotator, polygons from another) makes agreement and evaluation incomparable, so the guidelines should name one shape per class.
