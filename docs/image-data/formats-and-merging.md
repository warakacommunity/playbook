---
title: Formats and merging
sidebar_position: 7
ready: true
last_update:
  date: 2026-11-24
  author: Seid Muhie Yimam
---

# Formats and merging

Two steps sit between finished annotation and a usable vision dataset, and both can damage labels without raising an error. The first is conversion: the annotation tool's records become COCO, YOLO, PASCAL VOC, a mask image or a tracking file, and each format counts coordinates differently. The second is merging: when two or three people boxed or painted the same image, someone decides whether the release carries all of their shapes or one combined shape per object. This page covers both. How to draw boxes and masks is on the [object detection](./object-detection.md) and [segmentation](./segmentation.md) pages; how to check any export before release is in [Verify the export before you release](../9_dataset-lifecycle/release.md#verify-the-export-before-you-release).

## Keep one copy of record

Keep the tool's most complete export as the copy of record and generate every other format from it, never by hand-editing a converted file ([Exporting from your annotation tool](../6_documentation/data-storage.md#exporting-from-your-annotation-tool)). Converter formats are narrow: a detection format usually carries only the boxes, so text answers, relations, review outcomes and skipped items are left behind. A good annotation tool tells you before download which results a format will drop; if yours does not, count them yourself. The same applies to merging: keep every annotator's original shapes in the copy of record, and release the merged label as a derived view, so that the merge can be redone with a different rule later.

## The formats at a glance

| Format | Shape | Coordinates | Files |
|---|---|---|---|
| COCO | Box, polygon, RLE mask, keypoints | Box `[x, y, width, height]` in pixels from the top-left corner, 0-indexed | One JSON for the whole set |
| YOLO (detection) | Box | Class index, then box centre, width and height, normalised to 0–1 | One `.txt` per image |
| YOLO (segmentation) | Polygon | Class index, then `x y` pairs normalised to 0–1 | One `.txt` per image |
| PASCAL VOC | Box, with truncated, occluded and difficult flags | Corners `xmin, ymin, xmax, ymax` in pixels | One XML per image, masks as PNG |
| Mask image | Pixel mask | Same width and height as the image; pixel value is the class or instance id | One PNG per image |
| MOT | Tracked box | Frame, track id, box left, top, width and height in pixels, 1-based | One text file per video |
| Keyframe track XML | Tracked box or shape | Corner coordinates on keyframes, plus outside and occluded flags | One XML per video |

The details behind each row:

- **COCO** stores each object with an enclosing box measured from the top-left image corner and 0-indexed. A single object (`iscrowd` 0) is outlined with one or more polygons, while a crowd region (`iscrowd` 1) is stored as run-length encoding (RLE) ([COCO Consortium, n.d.](../references.md#coco-format)).
- **YOLO** detection labels hold one row per object; an image with no objects may have no label file, so count images and objects rather than files ([Ultralytics, n.d.](../references.md#ultralytics-detect-format)). The segmentation variant replaces the box with a polygon of at least three points and does not take RLE ([Ultralytics, n.d.](../references.md#ultralytics-segment-format)).
- **PASCAL VOC** marks an object as truncated when the box does not cover its full extent, occluded when much of it is hidden, and difficult when it cannot be recognised without context; difficult objects are left out of evaluation ([Everingham and Winn, 2012](../references.md#voc2012-devkit)). The thresholds annotators applied for these flags are in [Box and region rules](./region-guidelines.md#occlusion-and-truncation-flags). Converting VOC to YOLO drops all three flags, which matters if your guidelines use them.
- **MOT** ground-truth rows give the frame, the track identity, the box, a flag saying whether the row counts in evaluation (1) or is ignored (0), the object class and a visibility ratio from 0 to 1. Frame numbers, track identities and box coordinates are all 1-based, so the top-left pixel is (1, 1) ([Milan et al., 2016](../references.md#milan-2016)).
- **Keyframe track XML**, such as the CVAT-style format, stores each track as an id and a label with shapes on some frames. Each shape carries `keyframe`, `outside` and `occluded` flags, and the shapes between keyframes may not be written out at all ([CVAT.ai, n.d.](../references.md#cvat-xml-format)).

## Coordinate conventions that break conversions

A box converted with the wrong convention still loads and still looks like a box. It simply lands in the wrong place. Check each of these against the actual export file, not the tool's interface:

- **Corner or centre.** COCO and MOT anchor the box at its top-left corner, YOLO at its centre.
- **Width and height, or a second corner.** COCO, YOLO and MOT store width and height; VOC and keyframe-track XML store the opposite corner.
- **Pixels, fractions or percentages.** YOLO divides by the image size. Some annotation tools store percentages of the image instead, so a converter needs the original width and height. Make sure every record carries them (see [Coordinates and image orientation](./object-detection.md#coordinates-and-image-orientation)).
- **0-based or 1-based.** COCO counts from 0, MOT from 1. A one-pixel shift is invisible on a large object and serious on a small one, such as a lesion or a distant animal in drone imagery.
- **Image orientation.** If EXIF rotation was applied in one step and not another, every box on a rotated photo is wrong. Apply orientation to the pixels before annotation, as the object detection page describes.
- **Rotated boxes.** Record the angle unit, direction and range and which side counts as the width. Normalise both axes by the same scale on non-square images; dividing x by the width and y by the height turns a rotated rectangle into a parallelogram.

The functions below convert between the three box conventions. Run your real converter on a sample and compare its output with these by hand before trusting it:

```python
def coco_to_voc(box):
    """[x, y, w, h] in pixels -> [xmin, ymin, xmax, ymax] in pixels."""
    x, y, w, h = box
    return [x, y, x + w, y + h]

def voc_to_yolo(box, img_w, img_h):
    """[xmin, ymin, xmax, ymax] in pixels -> [cx, cy, w, h] normalised to 0-1."""
    xmin, ymin, xmax, ymax = box
    return [(xmin + xmax) / 2 / img_w, (ymin + ymax) / 2 / img_h,
            (xmax - xmin) / img_w, (ymax - ymin) / img_h]

def yolo_to_coco(box, img_w, img_h):
    """[cx, cy, w, h] normalised -> [x, y, w, h] in pixels."""
    cx, cy, w, h = box
    return [(cx - w / 2) * img_w, (cy - h / 2) * img_h, w * img_w, h * img_h]

# Round trip on one box from a 1280 x 720 image.
box = [340, 120, 85, 110]
back = yolo_to_coco(voc_to_yolo(coco_to_voc(box), 1280, 720), 1280, 720)
assert all(abs(a - b) < 0.01 for a, b in zip(box, back)), back
```

## Masks: polygons, RLE and id maps

Masks travel in three forms, and converting between them is where shapes quietly change:

- **Polygons** are compact and editable but approximate a curved edge with straight lines. Holes and objects split into several parts need explicit rules, which the [segmentation page](./segmentation.md#store-polygons-and-masks-without-ambiguity) sets out.
- **RLE** in the COCO tools stores a binary mask as alternating run lengths, starting with a run of zeros, over the pixels read column by column (column-major order). The same tools can compute area, union, intersection and IoU directly on the encoded masks ([pycocotools mask API](https://github.com/cocodataset/cocoapi/blob/master/PythonAPI/pycocotools/mask.py)). A mask encoded row by row by another library decodes into a transposed shape, so decode one mask and draw it before converting a whole set.
- **Id-map PNGs** store one class or instance id per pixel. PASCAL VOC also uses a void value (255) for a five-pixel band along object borders and for regions too small or ambiguous to label; void pixels are ignored in evaluation ([Everingham and Winn, 2012](../references.md#voc2012-devkit)). If your masks use a void or ignore value, say so in the dataset card, or users will train on it as a class.

Rasterising a polygon to pixels and tracing a mask back to a polygon are both lossy. Choose which representation is authoritative, convert in one direction only, and record the rasterisation rule so that agreement and evaluation always compare like with like.

## Video tracks: MOT and keyframe tracks

Tracking formats differ in what they store between keyframes. A keyframe-track file may hold only the frames an annotator touched, with the tool interpolating the rest when it displays the video. MOT expects one row per object per frame. Converting from the first to the second therefore means interpolating the missing frames yourself, and two rules keep that honest:

- **Do not interpolate across a gap.** Where a track is marked outside, the object has left the visible stretch; filling those frames invents boxes that nobody drew.
- **Carry occlusion across.** MOT's visibility ratio and the occluded flag are not the same measure. Write down how one maps to the other (for example, occluded becomes visibility 0.5) or leave visibility unset rather than inventing a precise value.

Check identity as well as geometry after conversion: count tracks and their lengths before and after, and confirm that no track id was reused for a different object. The annotation and evaluation side of tracking is in [Tracking objects across frames](../sign-language-video/video.md#tracking-objects-across-frames).

## Round-trip checks

The general conversion check is in [Verify the export before you release](../9_dataset-lifecycle/release.md#verify-the-export-before-you-release). For vision data, add these steps:

1. **Convert there and back.** Convert a sample to the release format with the real converter, convert it back, and compare with the copy of record. Boxes should match within a pixel; matched masks should have an IoU close to 1.
2. **Count per image, not per file.** Compare the number of objects per image and per class before and after. Include images with no objects, which some formats represent by a missing file.
3. **Draw the converted shapes back onto the images.** Look at a few images per class, including rotated photos, the smallest objects and objects at the image edge.
4. **Check the bounds.** No coordinate should fall outside the image, and no box should have zero or negative width or height.
5. **Check what each format dropped.** Flags such as truncated, occluded or difficult, crowd regions, ignore regions and track identities each survive in some formats only. List what the release format cannot carry in the dataset card.

## Merging boxes from several annotators

When several people annotate the same image, decide first whether to merge at all. Keep all annotators' boxes when the variation is itself useful, for example to measure how uncertain an object's extent is, and say in the dataset card which annotations you release ([Decide which annotations you release](../6_documentation/data-storage.md#decide-which-annotations-you-release)). When users need one box per object, merge in four steps:

1. **Group the boxes that mark the same object.** Use the same one-to-one pairing as for agreement, at an IoU threshold you state in advance ([Agreement when an image has many objects](./object-detection.md#agreement-when-an-image-has-many-objects)). With three or more annotators, build each group from the pairings or by adding each box to the group whose current combined box it overlaps most.
2. **Require enough support.** Keep a group only if at least a stated number of annotators drew it, for example two of three. Do not drop the rest silently: a box only one person drew is either a missed object or an extra one, and belongs in [adjudication](../3_annotation-design/workflow-adjudication.md#resolve-disagreement-but-read-it-first).
3. **Settle the class.** Take the majority class within the group; send ties and groups where the classes disagree to adjudication rather than averaging them away.
4. **Combine the coordinates.** Average each coordinate (corners for VOC-style boxes) across the group, or take the median, which resists one careless box.

Weighted boxes fusion (WBF) is the best-known method of this kind. It was designed to combine the outputs of several detection models: it clusters boxes above an IoU threshold, sets each fused corner to the confidence-weighted average of the boxes in the cluster, and lowers the fused confidence when fewer models contributed to it ([Solovyev et al., 2021](../references.md#solovyev-2021)). It can be applied to human annotators by giving each annotator a confidence, either equal or based on their score against gold items, and the lowered confidence then reflects how many annotators drew the box. Because it was built for model ensembles, report it as an adaptation, run it per class, and keep the support count for each fused box so that users can filter on it. Unlike non-maximum suppression, which keeps one box and discards the rest, WBF uses every box in the cluster.

Merging is for geometry, not for meaning. If annotators disagree on whether something is an object at all, or which class it belongs to, the disagreement may come from the guideline or from genuine differences in interpretation ([Plank, 2022](../references.md#plank-2022)). Read it before you merge it away.

## Merging masks from several annotators

For masks, the simplest merge is a pixel-wise vote: a pixel belongs to the region if at least a stated number of annotators painted it. The vote count is useful in itself, because the band where annotators split marks the uncertain edge:

```python
import numpy as np

def majority_mask(masks, min_votes=None):
    """masks: list of same-sized binary arrays for one class or one matched instance."""
    stack = np.stack(masks).astype(bool)
    n = stack.shape[0]
    k = min_votes if min_votes is not None else n // 2 + 1  # strict majority by default
    votes = stack.sum(axis=0)
    return votes >= k, votes  # merged mask, and per-pixel vote count

# With two annotators a strict majority means both agree (the intersection);
# min_votes=1 gives the union. State which one you used.
```

A plain vote trusts every annotator equally. STAPLE (Simultaneous Truth and Performance Level Estimation) instead uses an expectation-maximisation algorithm to estimate, at the same time, a probability map of the true segmentation and each rater's sensitivity and specificity, so that more reliable raters count for more ([Warfield et al., 2004](../references.md#warfield-2004)). Open implementations exist for binary masks and for multi-class label maps, for example the [STAPLE](https://simpleitk.org/doxygen/latest/html/classitk_1_1simple_1_1STAPLEImageFilter.html), [multi-label STAPLE](https://simpleitk.org/doxygen/latest/html/classitk_1_1simple_1_1MultiLabelSTAPLEImageFilter.html) and [label voting](https://simpleitk.org/doxygen/latest/html/classitk_1_1simple_1_1LabelVotingImageFilter.html) filters in SimpleITK. STAPLE returns probabilities; thresholding them, for example at 0.5, gives a binary mask, and the threshold belongs in the dataset card. The per-rater estimates are also a quality signal, to be read with the same care as any annotator score ([Act on annotator signals fairly](../4_data-quality/index.md#act-on-annotator-signals-fairly)).

Three cautions apply to both methods:

- **Pair instances first.** For instance masks, match each annotator's instances one to one before voting, exactly as for boxes; voting over a whole image merges neighbouring objects into one.
- **Thin features need a tolerance.** A one-pixel offset between two careful annotators can leave a road or river with no majority pixels at all. Merge polylines with a buffer, or vote on slightly widened masks, and say which ([Thin and diffuse features](./segmentation.md#thin-and-diffuse-features)).
- **Two annotators cannot outvote each other.** With two, a strict majority is the intersection, which shrinks every region, and the union swells it. Use a third annotator or an adjudicator for the disputed band.

## What to record

Write these in the [dataset card](../templates/dataset-card.md#4-preprocessing-cleaning-labeling) so that users can rebuild or redo your choices:

- the release formats, their coordinate conventions, and what each format leaves out;
- which representation of masks is authoritative, the rasterisation rule, and any void or ignore value;
- for video, how keyframe tracks were expanded to per-frame rows and how occlusion was mapped;
- whether released labels are individual or merged, the grouping IoU threshold, the minimum support, the averaging rule or method (vote, median, WBF, STAPLE) and any threshold applied to a probability map;
- how many objects were sent to adjudication instead of being merged.
