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

## What the data looks like

A detection dataset is images annotated with bounding boxes, each box marking the location and class of one object. The annotation is far more laborious than classification, since every object in every image must be boxed, which makes tool choice and clear guidelines matter more. African detection data is dominated by aerial and satellite imagery for agriculture and the environment, where boxes mark fields, buildings, or vehicles, and by wildlife and livestock monitoring. As with classification, images captured in real African conditions, low resolution, oblique angles, dense scenes, are essential, because models trained on clean benchmarks degrade on them.

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

Box annotation needs explicit rules: how tightly to fit the box, how to handle occluded or overlapping objects, how small an object must be to mark, and what to do at the image edge. These rules are where annotators silently diverge, so pin them down and measure agreement on a shared set; [Box and region rules](./region-guidelines.md) gives a tested set to start from. Detection is evaluated with [mean Average Precision (mAP)](https://lightning.ai/docs/torchmetrics/stable/detection/mean_average_precision.html), which rewards both correct labels and accurate placement, built on [Intersection over Union (IoU)](https://en.wikipedia.org/wiki/Jaccard_index), the overlap between a predicted box and the true one. Report the IoU threshold you used, since mAP at a loose threshold flatters a model that places boxes sloppily.

The labeling config gives the annotator a set of box labels to draw over the image:

```xml
<View>
  <Image name="image" value="$image"/>
  <RectangleLabels name="bbox" toName="image">
    <Label value="Cattle"   background="#C66A3D"/>
    <Label value="Building"  background="#1F5B3F"/>
    <Label value="Vehicle"   background="#E0A458"/>
  </RectangleLabels>
</View>
```

`torchmetrics` computes mAP from predictions and targets, and reads the IoU threshold straight off so you can report it honestly:

```python
# pip install torchmetrics
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

Object detection in 2026 is dominated by transformer-based detectors and open-vocabulary detectors. The workable open-model references:

- **[RT-DETR / RT-DETR v2](https://arxiv.org/abs/2304.08069)** (Baidu, 2023-2024): the real-time DETR variant, Apache-2.0 licensed, competitive mAP with substantially better inference latency than YOLO-lineage detectors. The defensible default for a new African-context detection project.
- **[Co-DETR](https://arxiv.org/abs/2211.12860)** and **[DINO-DETR](https://arxiv.org/abs/2203.03605)**: the strongest current closed-vocabulary DETR variants for accuracy at the cost of inference speed. Useful when accuracy dominates deployment cost.
- **[YOLOv10 / YOLO11 / YOLO12](https://docs.ultralytics.com/)** (Ultralytics, 2024-2026): the widely-deployed YOLO lineage, AGPL-3.0 licensed (commercial deployments require an Ultralytics licence). Still the workable default for edge deployment where inference speed dominates. Note the licence caveat before committing to production.
- **Open-vocabulary detectors.** **[Grounding DINO](https://arxiv.org/abs/2303.05499)** (IDEA-Research, 2023), **[OWLv2](https://arxiv.org/abs/2306.09683)** (Google, 2023), **[YOLO-World](https://arxiv.org/abs/2401.17270)** (Tencent, 2024): detect arbitrary categories from natural-language prompts without a fixed training vocabulary. Useful when the deployment surface has a growing or long-tail category set.
- **General MLLMs with detection.** **[Qwen2.5-VL](https://qwenlm.github.io/blog/qwen2.5-vl/)** and **[Molmo](https://molmo.allenai.org/)** produce bounding-box output from natural-language prompts; workable when the detection is one part of a larger multimodal task, weaker than dedicated detectors on pure-detection benchmarks.

**Editorial opinion.** For a new African-context detection project (agriculture, environment, wildlife, infrastructure), the shortest defensible path is: fine-tune RT-DETR v2 on 2,000-10,000 annotated target-domain images, evaluate mAP at IoU 0.50 AND 0.75 (report both), and report per-class AP alongside the mean. For edge deployment, distil to a YOLO11 or MobileNetV4-based detector after training. For long-tail or growing vocabularies, evaluate Grounding DINO zero-shot before committing to a closed-vocabulary detector. If you use a detector to pre-label boxes for annotators, see [Detector pre-labels](../3_annotation-design/model-assisted-annotation.md#detector-pre-labels) for the problems that come with correcting a detector's drafts.

## What it will actually cost you

Detection is 3-10x more expensive per-record than classification because every object in every image must be boxed, and adjudicating box tightness across annotators is slow. Rough order-of-magnitude:

- **Fine-tuning RT-DETR v2 or YOLO11 on an existing detection corpus.** One to three person-weeks; twenty to a hundred GPU-hours.
- **Building a new detection corpus** for an African-context task (2,000-10,000 images with 5-30 boxes per image). Six to fifteen months elapsed; six to fifteen person-months. Box-tightness adjudication is the constraint; a corpus with strict box-fit rules costs 30-50% more than one with loose rules.
- **Extending to keypoint annotation on top of boxes.** Roughly 50-100% more annotation effort per image; see [Keypoints and pose](./keypoints-pose.md#what-it-will-actually-cost-you).
- **Evaluation-only detection sets** (500-2,000 images). Three to six months; three to six person-months.
- **Satellite / drone-imagery annotation.** Faster per-object (small objects on aerial imagery) but requires GIS-familiar annotators: a smaller pool than classification-annotators and typically higher hourly rates.
- **Human evaluation of detection output.** Two to three person-weeks per evaluator per 200 images. Detection evaluation is slow because the evaluator must check both class correctness and box-fit correctness.

## Known limitations to watch for

- **Report mAP@0.75, not just mAP@0.50.** A detector that scores well at 0.50 but poorly at 0.75 is placing loose boxes. If your downstream task uses the box for measurement (counting, area estimation, cropping for downstream classification), loose boxes destroy the downstream signal.
- **Small-object performance is the hidden failure.** Aerial and satellite imagery is dominated by small objects; most detectors trained on natural-imagery benchmarks under-perform on small objects. Report AP by object size (small / medium / large) as separate numbers. For very large aerial and satellite images, tile with overlap; see [Large and geo-referenced imagery](./large-imagery.md).
- **Class imbalance in the same imagery.** A field-imagery corpus with 1,000 healthy plants and 5 diseased plants per image trains a detector that ignores the diseased class. Rebalance during training (oversampling, class-weighted loss) or accept the failure.
- **Dense-scene occlusion.** Livestock counting, market-scene detection, and crowd analysis all involve dense scenes where objects occlude each other. Standard detectors under-perform in dense scenes; report crowd-scene AP separately.
- **Confounded backgrounds.** If all photos of the diseased class were taken in one field and all photos of the healthy class in another, the detector learns to distinguish fields, not classes. This is the object-detection version of the classification confound.
- **Satellite-imagery seasonality.** A detector trained on rainy-season satellite imagery of maize fields fails on dry-season imagery. Multi-seasonal training data is not optional.
- **Consent and identifiability at aerial resolution.** Drone imagery of a village at 5cm/pixel resolution shows identifiable people, homes, and possessions. Regulatory frameworks vary by country; the [data governance chapter](../data-governance/index.md) covers the discipline, and [Privacy at high resolution](./large-imagery.md#privacy-at-high-resolution) and [Visual privacy](./visual-privacy.md) apply it to images.
- **Licence caveat for YOLO lineage.** YOLOv5, v8, v10, v11, v12 are AGPL-3.0. Commercial deployment requires an Ultralytics licence. Check before shipping.

## Further reading

- [RT-DETR v2 (Lv et al., 2024)](https://arxiv.org/abs/2407.17140): the workable real-time DETR-lineage detector; the defensible default for African-context detection projects.
- [Grounding DINO (Liu et al., 2023)](https://arxiv.org/abs/2303.05499): the workable open-vocabulary detector; useful for long-tail or growing category sets.
- [State of CV in Africa (2024)](https://arxiv.org/abs/): the reference survey of the field on the continent; useful for understanding where detection sits among the African CV corpora.

<details>
<summary>Additional references</summary>

- [YOLO11 (Ultralytics, 2024)](https://docs.ultralytics.com/): the widely-deployed YOLO lineage; note the AGPL-3.0 licence.
- [OWLv2 (Minderer et al., 2023)](https://arxiv.org/abs/2306.09683): the Google open-vocabulary detector.
- [YOLO-World (Cheng et al., 2024)](https://arxiv.org/abs/2401.17270): real-time open-vocabulary detection.
- [Co-DETR (Zong et al., 2022)](https://arxiv.org/abs/2211.12860): the strongest current DETR variant for closed-vocabulary accuracy.
- [COCO (Lin et al., 2014)](https://cocodataset.org/): the reference detection benchmark; useful for calibration and cross-corpus comparison.

</details>
