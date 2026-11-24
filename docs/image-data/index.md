---
ready: true
title: Image Data
last_update:
  date: 2026-11-24
  author: Tadesse Destaw
---

# Image Data

Image data covers the vision tasks where the input is a still picture: deciding what an image shows, locating objects within it, and outlining their exact shapes. Computer vision is less language-dependent than the rest of this playbook, but it is no less African, because the questions that matter on the continent are specific to it. A survey of computer-vision research in Africa found the field concentrated in a few high-impact areas, above all agriculture and health, and constrained by the same data scarcity that limits African NLP ([State of CV in Africa, 2024](../references.md#cv-africa-2024)).

This chapter covers three image tasks, plus keypoint annotation:

- **[Classification](./classification.md)**: assigning a label to a whole image.
- **[Object detection](./object-detection.md)**: locating and labelling objects with boxes.
- **[Segmentation](./segmentation.md)**: outlining objects or regions pixel by pixel.
- **[Keypoints and pose](./keypoints-pose.md)**: marking named points and skeletons on people, animals and plants.

## What the three tasks share

The tasks differ in how finely they label an image, but the pipeline around them is shared: source images you have the right to use, with attention to consent where people are identifiable; capture or scan to a consistent standard; annotate with a clear scheme and locally knowledgeable annotators; measure agreement; and release under a clear licence. The [Vision overview](../sections/vision.md), [Annotation Design](../3_annotation-design/annotation-task-design.md), and [Data Governance](../data-governance/index.md) chapters cover these. Two African realities run through all three tasks. The high-value domains are agriculture, health, and the environment, where open labelled data has been scarce. The LacunaLabels crop-field boundary set was built because annual maps of African crop fields did not exist ([Estes et al., 2024](../references.md#estes-2024)), and the first release of the LandCoverNet land-cover set covered the African continent, in response to a lack of open training data that represents the geographic diversity of land cover ([Alemohammad and Booth, 2020](../references.md#alemohammad-2020)). Widely used image collections are also skewed towards North America and Europe, and recognition systems trained on them do worse on images from poorer and African households ([Shankar et al., 2017](../references.md#shankar-2017); [DeVries et al., 2019](../references.md#devries-2019)). And images of people carry the same likeness and consent obligations as voices do, so faces, locations, and identifiable settings need the same governance care as any personal data.

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
- **What does your evaluation expect?** The [object detection](./object-detection.md) page scores boxes with mAP, the [segmentation](./segmentation.md) page scores masks with mean IoU (mIoU), and keypoints are scored with a size-normalised distance such as Object Keypoint Similarity (see [Keypoints and pose](./keypoints-pose.md#agreement-and-evaluation)). Pick the shape whose standard metric matches the claim you want to make, and record it in the dataset card.

Two practical cautions. Not every annotation tool supports every shape, and some export rotated boxes, ellipses or polylines in their own formats, so confirm that the shape survives export to the format you will release before the pilot rather than after. And mixing shapes for the same class (boxes from one annotator, polygons from another) makes agreement and evaluation incomparable, so the guidelines should name one shape per class.

## More on image data

The task pages above assume ordinary photos annotated one at a time. These pages cover the practices that cut across all of them:

- **[Box and region rules](./region-guidelines.md)**: written rules for box tightness, occlusion, truncation, minimum size, crowds, ignore regions and unusable images, ready to copy into your guidelines.
- **[Large and geo-referenced imagery](./large-imagery.md)**: annotating satellite, drone and other very large images with zoom and tiling, keeping labels tied to ground coordinates, and the licences that come with satellite data.
- **[Visual privacy](./visual-privacy.md)**: faces, bystanders, number plates, screens and file metadata, and how to keep them out at capture, strip them at ingest and redact or withhold them at release.
- **[Representativeness audits](./representativeness.md)**: counting what your images cover (places, people, lighting, devices and classes) against the population the model is for, and reporting the gaps.
- **[Splits and near-duplicates](./splits-and-duplicates.md)**: finding copies and near-copies of images, and splitting by site, subject or video so the test set does not leak.
- **[Formats and merging](./formats-and-merging.md)**: converting between COCO, YOLO, PASCAL VOC, mask images and tracking formats without corrupting coordinates, and combining boxes and masks from several annotators.

## Further reading

- [State of CV in Africa (2024)](../references.md#cv-africa-2024): *The State of Computer Vision Research in Africa*, a survey of where African computer-vision work concentrates and what holds it back.
- [Shankar et al. (2017)](../references.md#shankar-2017) and [DeVries et al. (2019)](../references.md#devries-2019): how the geographic skew of image datasets shows up as lower accuracy on images from under-represented places.
- [Maier-Hein et al. (2024)](../references.md#maier-hein-2024): Metrics Reloaded, recommendations for choosing classification, detection and segmentation metrics to fit the problem, with the pitfalls of each.
