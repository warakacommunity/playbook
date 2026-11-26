---
ready: true
title: Object detection
sidebar_position: 3
last_update:
  date: 2026-07-07
  author: Tadesse Destaw
---

# Object detection

*Last reviewed: 2026-07-07.*

Object detection goes a step beyond classification: it finds where objects are in an image and draws a labelled box around each one. In African contexts it powers tasks like counting livestock from drone imagery, spotting infrastructure in satellite photos, or locating individual plants in a field.

:::tip[Key points]

- A detection dataset is images plus one labelled box per object; store it in COCO format.
- Write explicit box rules (fit, occlusion, minimum size, image edge) before annotating.
- Measure agreement by pairing boxes one to one, not by averaging IoU.
- Report mAP at IoU 0.50 and 0.75, per class and by object size.
- Collect images from real local conditions and several seasons; check model licences before deployment.

:::

## What the data looks like

A detection dataset is a set of images annotated with bounding boxes. Each box marks the location and class of one object. Every object in every image must be boxed, so annotation takes far more work than classification. Clear guidelines and a suitable annotation tool matter more as a result.

Most African detection data falls into two groups:

- **Aerial and satellite imagery** for agriculture and the environment, where boxes mark fields, buildings or vehicles.
- **Wildlife and livestock monitoring**, often from camera traps or drones.

As with classification, use images captured in real local conditions: low resolution, oblique angles and dense scenes. Models trained only on clean benchmark images perform worse on such images.

The most widely supported format is COCO, where one JSON file holds the images, the boxes, and the categories, linked by id. Each box is `[x, y, width, height]` in pixels from the top-left corner:

```json
{
  "images": [
    {"id": 1, "file_name": "field_0007.jpg", "width": 1280, "height": 720}
  ],
  "annotations": [
    {"id": 1, "image_id": 1, "category_id": 1, "bbox": [340, 120, 85, 110], "area": 9350, "iscrowd": 0}
  ],
  "categories": [
    {"id": 1, "name": "cattle"}
  ]
}
```

COCO is worth using even for a small African dataset, because the evaluation tools below read it directly, so you avoid writing a custom parser and your results stay comparable with everyone else reporting mAP.

### Coordinates and image orientation

State whether coordinates are pixels, fractions or percentages, and check the actual export convention rather than assuming it from the interface. Every record should carry the original image width and height and any rotation applied to the pixels. For rotated boxes or ellipses, record the angle unit, direction and anchor point as well as the shape coordinates.

Apply EXIF orientation to the image pixels before annotation, and only then strip metadata for privacy. Otherwise a box drawn on the displayed image can point to the wrong place in the stored image. Validate that every exported shape lies within the image bounds, including after rotation or resizing. The same orientation-before-stripping rule applies to [field image capture](../agri-advisory/field-image-capture.md#quality-control). Stripping and redaction are covered in [Visual privacy](./visual-privacy.md).

For how COCO, YOLO, PASCAL VOC and tracking formats map to each other, and how to merge boxes from several annotators into one, see [Formats and merging](./formats-and-merging.md).

For objects that persist across video frames, keep one identity per object and follow [Tracking objects across frames](../sign-language-video/video.md#tracking-objects-across-frames).

## Annotation and evaluation

Box annotation needs explicit rules for:

- how tightly to fit the box;
- how to handle occluded or overlapping objects;
- how small an object must be to mark;
- what to do at the image edge.

Annotators quietly diverge on exactly these points. Write the rules down and measure agreement on a shared set of images. [Box and region rules](./region-guidelines.md) gives a tested set to start from.

A typical box task looks like this:

**Task specification: object boxes**

| Setting | Value |
|---|---|
| Annotator sees | One image, with zoom |
| Annotator gives | A rectangle around each target object, with one class: Cattle, Building or Vehicle |
| Choice | Exactly one class per box; as many boxes as there are objects, or none if the image has no target objects |
| Notes | Give each class its own colour so boxes are easy to tell apart. Add occlusion and truncation flags only if you will use them (see [Box and region rules](./region-guidelines.md#occlusion-and-truncation-flags)). |

Detection is evaluated with [mean Average Precision (mAP)](https://lightning.ai/docs/torchmetrics/stable/detection/mean_average_precision.html). mAP rewards both correct labels and accurate placement. It is built on [Intersection over Union (IoU)](https://en.wikipedia.org/wiki/Jaccard_index), the overlap between a predicted box and the true one. Always report the IoU threshold you used: mAP at a loose threshold flatters a model that places boxes carelessly.

The `torchmetrics` library computes mAP from predictions and targets at the IoU thresholds you choose, so you can report each one:

```python
# pip install torchmetrics pycocotools
import torch
from torchmetrics.detection import MeanAveragePrecision

# Boxes here are [x_min, y_min, x_max, y_max]; convert from COCO's
# [x, y, w, h] with x_max = x + w, y_max = y + h before scoring.
preds = [{"boxes": torch.tensor([[340.0, 120.0, 425.0, 230.0]]),
          "scores": torch.tensor([0.92]),
          "labels": torch.tensor([1])}]
target = [{"boxes": torch.tensor([[342.0, 118.0, 427.0, 232.0]]),
           "labels": torch.tensor([1])}]

metric = MeanAveragePrecision(iou_thresholds=[0.5, 0.75])
metric.update(preds, target)
result = metric.compute()
print(f"mAP@0.50: {result['map_50']:.3f}")
print(f"mAP@0.75: {result['map_75']:.3f}")  # stricter: punishes loose boxes
```

The gap between the two thresholds is the useful read: a model that scores well at 0.50 but poorly at 0.75 is finding the right objects but boxing them loosely, which matters when the box itself carries the measurement, such as counting tightly packed livestock or delineating a field.

The annotation interface should support zoom, precise box or keypoint editing, occlusion and truncation flags where required, and exports that preserve image identifiers, coordinates, labels and annotator identities. Test small, overlapping and partially visible objects during the pilot.

Keypoints mark named points on each object, such as joints, hooves or leaf tips, and join them into a skeleton. They need their own schema, a visibility rule for hidden points, a stated left/right convention and distance-based agreement measures rather than IoU, so they have their own page: [Keypoints and pose](./keypoints-pose.md).

### Agreement when an image has many objects

Measuring agreement between two annotators is harder for detection than for classification, because each annotator draws a different number of boxes in a different order, and nothing says which box of one person corresponds to which box of the other. Comparing only one box per image, or averaging IoU over the whole set without first pairing the boxes, inflates agreement and hides the most common detection error: an object one person boxed and the other missed. The general approach to agreement for non-categorical annotations is in [Data Quality](../4_data-quality/index.md#match-the-metric-to-the-annotation-shape); this section gives the detection-specific procedure. Score each image in four steps.

1. **Pair the regions one to one.** Compute the IoU between every box of annotator A and every box of annotator B, set any IoU below a threshold you state in advance to zero, then find the one-to-one pairing that maximises total overlap. This is the classic assignment problem, solved by the Hungarian method ([Kuhn, 1955](../references.md#kuhn-1955)) and available as [`linear_sum_assignment`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.linear_sum_assignment.html) in SciPy; a greedy pass that takes the highest-IoU pair first is a reasonable approximation. Keep a pair only if its IoU reaches that threshold, for example 0.5, the criterion the PASCAL VOC benchmark set for a correct detection ([Everingham et al., 2010](../references.md#everingham-2010)). Every box left unpaired is a disagreement.
2. **Report matched-region F1 at that threshold.** With `m` matched pairs, F1 is `2m / (boxes by A + boxes by B)`. It falls whenever either annotator boxes something the other did not, which is exactly what an averaged IoU hides.
3. **Report position and label agreement separately.** Pair the boxes on position alone, then report the mean IoU of the matched pairs (how well the boxes fit) and the share of matched pairs with the same class (whether they agree on what the object is). An IoU-only score treats a box labelled "cattle" and a box labelled "goat" in the same place as agreement, because IoU ignores the label.
4. **Sort every disagreement into a type.** A box only one annotator drew is a *missed object* by the other annotator if you treat the one who drew it as the reference, and an *extra object* otherwise; a matched pair with different classes is a *wrong label*; a matched pair below a stricter IoU, such as 0.75, is a *loose boundary*. A matched pair can carry both a wrong label and a loose boundary; count it under each. The mix tells you what to fix: missed objects point to the small-object and occlusion rules, wrong labels to the class definitions, and loose boundaries to the box-fit rule.

Sum the counts over all images before computing F1 (micro-averaging), rather than averaging per-image scores, so that a crowded image with thirty animals weighs more than an image with one. With three or more annotators, score every pair and report the mean, or score each annotator against the adjudicated reference.

The same procedure works for other region shapes once you swap the overlap measure. For polygons and instance masks, compute IoU on the filled shapes; the [segmentation page](./segmentation.md#annotation-and-evaluation) covers mask IoU and its per-class reading for semantic segmentation. For keypoints, IoU is meaningless, so pair and score with a size-normalised distance such as Object Keypoint Similarity (OKS); [Keypoints and pose](./keypoints-pose.md#agreement-and-evaluation) covers OKS, PCK and checks for left/right swaps.

<details>
<summary>Python sketch: matched-region agreement for one image</summary>

```python
# pip install numpy scipy
import numpy as np
from scipy.optimize import linear_sum_assignment


def iou(a, b):
    """IoU of two boxes given as [x_min, y_min, x_max, y_max]."""
    ix = max(0.0, min(a[2], b[2]) - max(a[0], b[0]))
    iy = max(0.0, min(a[3], b[3]) - max(a[1], b[1]))
    inter = ix * iy
    union = (a[2] - a[0]) * (a[3] - a[1]) + (b[2] - b[0]) * (b[3] - b[1]) - inter
    return inter / union if union > 0 else 0.0


def compare(regions_a, regions_b, match_iou=0.5, tight_iou=0.75):
    """Compare two annotators' regions on ONE image.

    Each region is (box, label). Matching uses position only, so a
    same-place, different-label pair is reported as a label disagreement
    rather than as two missed objects.
    """
    iou_m = np.array([[iou(a[0], b[0]) for b in regions_b] for a in regions_a])
    pairs = []
    if iou_m.size:
        iou_m[iou_m < match_iou] = 0.0  # below-threshold pairs cannot be matched
        rows, cols = linear_sum_assignment(iou_m, maximize=True)  # one-to-one
        pairs = [(r, c) for r, c in zip(rows, cols) if iou_m[r, c] >= match_iou]
    matched_a = {r for r, _ in pairs}
    matched_b = {c for _, c in pairs}
    return {
        "matched": len(pairs),
        "only_a": len(regions_a) - len(matched_a),   # missed by B, or extra in A
        "only_b": len(regions_b) - len(matched_b),   # missed by A, or extra in B
        "wrong_label": sum(regions_a[r][1] != regions_b[c][1] for r, c in pairs),
        # a pair can count as both wrong_label and loose_boundary
        "loose_boundary": sum(iou_m[r, c] < tight_iou for r, c in pairs),
        "ious": [float(iou_m[r, c]) for r, c in pairs],
    }


# Annotator A boxed three cattle; B boxed two of them and called one a goat.
a = [([340, 120, 425, 230], "cattle"), ([500, 300, 560, 380], "cattle"),
     ([700, 90, 760, 150], "cattle")]
b = [([344, 118, 427, 232], "cattle"), ([505, 310, 552, 378], "goat")]

r = compare(a, b)
f1 = 2 * r["matched"] / (len(a) + len(b))
label_agree = 1 - r["wrong_label"] / max(r["matched"], 1)
print(f"matched-region F1 @0.5: {f1:.2f}")                      # 0.80
print(f"mean IoU of matched pairs: {np.mean(r['ious']):.2f}")   # 0.78
print(f"label agreement on matched pairs: {label_agree:.2f}")   # 0.50
# {'matched': 2, 'only_a': 1, 'only_b': 0, 'wrong_label': 1, 'loose_boundary': 1}
print({k: v for k, v in r.items() if k != "ious"})
```

To aggregate over a dataset, sum `matched`, `only_a`, `only_b`, and the box counts across images before computing F1.

</details>

## The 2026 modelling landscape

Object detection in 2026 is led by transformer-based detectors and open-vocabulary detectors. Open models worth knowing:

| Model family | What it offers | Licence and notes |
|---|---|---|
| **[RT-DETR](https://arxiv.org/abs/2304.08069) / [RT-DETRv2](https://arxiv.org/abs/2407.17140)** (Baidu, 2023-2024) | Real-time transformer detector; its authors report better speed and accuracy than YOLO detectors of similar size | Apache-2.0. A sensible default for a new project |
| **[Co-DETR](https://arxiv.org/abs/2211.12860)** and **[DINO](https://arxiv.org/abs/2203.03605)** | High-accuracy transformer detectors, slower at inference | Use when accuracy matters more than deployment cost |
| **YOLO family** (YOLOv10, YOLO11, YOLO12; packaged in the [Ultralytics](https://docs.ultralytics.com/) library) | Widely deployed; fast, suits edge devices | AGPL-3.0; closed-source commercial use needs a separate commercial licence. Check before production |
| **Open-vocabulary detectors**: [Grounding DINO](https://arxiv.org/abs/2303.05499) (IDEA Research, 2023), [OWLv2](https://arxiv.org/abs/2306.09683) (Google, 2023), [YOLO-World](https://arxiv.org/abs/2401.17270) (Tencent, 2024) | Detect categories named in a text prompt, with no fixed training vocabulary | Useful when the category set is long-tailed or keeps growing |
| **Multimodal LLMs**: [Qwen2.5-VL](https://qwenlm.github.io/blog/qwen2.5-vl/) (boxes), [Molmo](https://molmo.allenai.org/) (points) | Locate objects from a natural-language prompt | Useful when detection is one step in a larger multimodal task; usually weaker than dedicated detectors on pure detection |

:::note[Editorial opinion]

For a new African-context detection project (agriculture, environment, wildlife, infrastructure), the shortest defensible path is:

1. Fine-tune RT-DETRv2 on roughly 2,000 to 10,000 annotated images from your target domain.
2. Evaluate mAP at IoU 0.50 **and** 0.75, and report per-class AP alongside the mean.
3. For edge deployment, distil the trained model into a smaller, faster detector, such as a YOLO11 or MobileNet-based model.
4. For long-tail or growing vocabularies, test Grounding DINO zero-shot before committing to a closed-vocabulary detector.

:::

If you use a detector to pre-label boxes for annotators, see [Detector pre-labels](../3_annotation-design/model-assisted-annotation.md#detector-pre-labels) for the problems that come with correcting a detector's drafts.

## What it will actually cost you

Every object in every image must be boxed, and settling disagreements about box fit is slow. Expect detection to cost several times more per image than classification. The figures below are rough planning estimates from experience, not measured benchmarks:

| Activity | Rough effort |
|---|---|
| Fine-tuning RT-DETRv2 or YOLO11 on an existing detection corpus | One to three person-weeks; twenty to a hundred GPU-hours |
| Building a new corpus (2,000 to 10,000 images, 5 to 30 boxes each) | Six to fifteen months elapsed; six to fifteen person-months. Box-fit adjudication is the bottleneck; strict box-fit rules cost noticeably more than loose ones |
| Adding keypoints on top of boxes | Extra effort per image that grows with the number of points and how often they are hidden; time it in your pilot (see [Keypoints and pose](./keypoints-pose.md#what-it-will-actually-cost-you)) |
| Evaluation-only set (500 to 2,000 images) | Three to six months; three to six person-months |
| Satellite or drone imagery | Objects are small and often quick to box, but annotators need some familiarity with aerial imagery and maps, which narrows the pool |
| Human evaluation of detector output | Two to three person-weeks per evaluator per 200 images; evaluators must check both the class and the box fit |

## Known limitations to watch for

- **Report mAP@0.75, not just mAP@0.50.** A detector that scores well at 0.50 but poorly at 0.75 places loose boxes. If your downstream task uses the box for measurement (counting, area estimation, cropping for a classifier), loose boxes destroy that signal.
- **Small objects are the hidden failure.** Aerial and satellite imagery is full of small objects, and most detectors trained on everyday photos do worse on them. Report AP by object size (small, medium, large) as separate numbers. For very large images, tile with overlap; see [Large and geo-referenced imagery](./large-imagery.md).
- **Class imbalance within the same images.** A field corpus with 1,000 healthy plants and 5 diseased plants per image trains a detector that ignores the diseased class. Rebalance during training (oversampling, class-weighted loss) or accept the failure.
- **Dense scenes.** Livestock counting, market scenes and crowds all involve objects hiding each other. Standard detectors do worse here; report AP on crowded scenes separately.
- **Confounded backgrounds.** If all photos of diseased plants come from one field and all healthy ones from another, the detector learns to tell the fields apart, not the classes. This is the detection version of the classification confound.
- **Seasonality in satellite imagery.** A detector trained on rainy-season images of maize fields can fail on dry-season images. Include several seasons in the training data.
- **Consent and identifiability from the air.** High-resolution drone imagery of a village (a few centimetres per pixel) shows people, homes and possessions, which can make them identifiable. Rules vary by country. The [data governance chapter](../data-governance/index.md) covers the discipline, and [Privacy at high resolution](./large-imagery.md#privacy-at-high-resolution) and [Visual privacy](./visual-privacy.md) apply it to images.
- **YOLO licences.** The Ultralytics YOLO releases (YOLOv5, YOLOv8, YOLO11) are AGPL-3.0, and so are the YOLOv10 and YOLO12 code releases. Commercial deployment without releasing your code needs a commercial licence. Check before shipping.

## Further reading

- [RT-DETR v2 (Lv et al., 2024)](https://arxiv.org/abs/2407.17140): the workable real-time DETR-lineage detector; the defensible default for African-context detection projects.
- [Grounding DINO (Liu et al., 2023)](https://arxiv.org/abs/2303.05499): the workable open-vocabulary detector; useful for long-tail or growing category sets.
- [State of CV in Africa (2024)](../references.md#cv-africa-2024): a survey of computer-vision research on the continent; useful for seeing where detection sits among African CV work.

<details>
<summary>Additional references</summary>

- [RT-DETR (Zhao et al., 2024)](https://arxiv.org/abs/2304.08069): the original real-time DETR paper.
- [YOLO11 (Ultralytics, 2024)](https://docs.ultralytics.com/): the widely deployed YOLO family; note the AGPL-3.0 licence.
- [OWLv2 (Minderer et al., 2023)](https://arxiv.org/abs/2306.09683): the Google open-vocabulary detector.
- [YOLO-World (Cheng et al., 2024)](https://arxiv.org/abs/2401.17270): real-time open-vocabulary detection.
- [Co-DETR (Zong et al., 2022)](https://arxiv.org/abs/2211.12860): a high-accuracy DETR variant for closed-vocabulary detection.
- [COCO (Lin et al., 2014)](https://cocodataset.org/): the reference detection benchmark; useful for calibration and cross-corpus comparison.

</details>
