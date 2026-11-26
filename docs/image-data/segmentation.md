---
ready: true
title: Segmentation
sidebar_position: 4
last_update:
  date: 2026-07-07
  author: Tadesse Destaw
---

# Segmentation

*Last reviewed: 2026-07-07.*

Segmentation is the most detailed image task: instead of a box, it labels every pixel, outlining the exact shape of objects or regions. It matters in African work wherever a precise area or boundary is the point, such as measuring the exact extent of a crop field, delineating a lesion in a medical scan, or mapping land cover from satellite imagery.

:::tip[Key points]

- Store masks as single-channel, lossless id maps (pixel value = class id), never as JPEG colour images.
- Pixel labelling is the costliest image annotation: pilot it to measure time per mask before you budget.
- Measure agreement and model quality by overlap (IoU, Dice), reported per class, not only as an average.
- Model-drafted masks save time on everyday photos, but measure the speed-up on your own imagery.

:::

## What the data looks like

A segmentation dataset pairs images with pixel-level masks. There are two main kinds:

- **Semantic segmentation** labels every pixel by class, without separating individual objects.
- **Instance segmentation** also tells one object apart from another of the same class.

Much of the African data comes from a few high-value domains. The LacunaLabels crop-field boundary set was built because annual maps of African crop fields did not exist ([Estes et al., 2024](../references.md#estes-2024)). The first release of the LandCoverNet land-cover set covered Africa ([Alemohammad and Booth, 2020](../references.md#alemohammad-2020)).

Satellite segmentation has its own difficulty: cloud cover. Thick cloud is opaque in every optical band, while radar such as Sentinel-1 images the surface through cloud, by day and night ([ESA, 2014](../references.md#esa-sentinel1-radar)). The gaps are therefore often filled by combining optical with radar imagery ([Meraner et al., 2020](../references.md#meraner-2020)). For tiling, coordinate systems and imagery licences, see [Large and geo-referenced imagery](./large-imagery.md).

A mask is usually stored as a PNG the same size as the image, where each pixel value is a class id, paired with a small mapping from id to class name:

```text
field_0007.jpg          # the image
field_0007_mask.png     # same width and height; pixel value = class id

# class mapping (e.g. classes.json)
{"0": "background", "1": "crop_field", "2": "water", "3": "built_up"}
```

Storing the mask as a single-channel id map, rather than a colour image, keeps it exact. A colour mask is easily damaged on its way through ordinary image tools: saved as JPEG, resized with smoothing, or converted between colour profiles, it picks up in-between colours along edges that match no class, which silently changes or loses labels. An id map, kept as a lossless PNG and resized only with nearest-neighbour sampling, stays faithful to what the annotator drew.

### Store polygons and masks without ambiguity

- **Polygons:** store them as ordered lists of vertices, with written rules for holes and for objects split into several parts.
- **Masks:** store them as single-channel raster PNGs or as run-length encoding (RLE, a compact way of writing runs of identical pixels).
- **One source of truth:** if you keep both polygons and masks, record which one is authoritative.
- **Size:** large raster exports can be heavy, so measure their storage and transfer cost before you choose the release format.
- **Pixel-exact correction:** painted strokes are approximate. When annotators must correct single pixels, show the image without display smoothing so they see the real pixels.
- **Rasterisation:** if polygons are turned into masks for agreement or evaluation, document how, so every comparison uses the same representation.

For RLE, id-map and polygon conversions, and for merging several annotators' masks (pixel voting, STAPLE), see [Formats and merging](./formats-and-merging.md).

## Annotation and evaluation

Pixel-level annotation is the most expensive labelling in this playbook, so design it to be feasible:

- Use an annotation tool with boundary assistance, such as model-drafted masks that annotators correct.
- Define exactly how to treat ambiguous edges and mixed pixels.
- Pilot to measure how long a mask really takes before you commit a budget.

A typical land-cover task looks like this:

**Task specification: land-cover segmentation**

| Setting | Value |
|---|---|
| Annotator sees | One image, with zoom and pan |
| Annotator gives | Painted pixel masks (brush regions), each assigned one class |
| Choice | Exactly one class per painted region, from: crop field, water, built-up. Unpainted pixels count as background |
| Notes | Give each class a distinct, high-contrast display colour so overlaps and gaps are easy to see |

### Tool and export checks

The annotation tool should support zoom, correction of vertices or brush strokes, holes, and overlapping instances where your schema allows them. Before large-scale work, check that exported masks or polygons line up with the source image and keep their class and instance identifiers. The occlusion, crowd and ignore-region rules in [Box and region rules](./region-guidelines.md) apply to polygons and masks too.

### Measure overlap, class by class

Because masks are so detailed, agreement and model quality are measured by overlap rather than exact match. The usual metrics are [mean Intersection over Union (mIoU)](https://en.wikipedia.org/wiki/Jaccard_index), the [Dice coefficient](https://en.wikipedia.org/wiki/Dice-S%C3%B8rensen_coefficient) and pixel accuracy. Each compares a predicted mask with a reference mask by how much they overlap, not by demanding identical pixels. Each metric has known pitfalls, so choose them from the problem rather than by habit ([Maier-Hein et al., 2024](../references.md#maier-hein-2024)).

IoU and Dice are short to compute directly from id-map masks. Computing them per class keeps a small but important region honest:

```python
import numpy as np

def per_class_iou(pred: np.ndarray, true: np.ndarray, class_id: int) -> float:
    p, t = (pred == class_id), (true == class_id)
    union = (p | t).sum()
    return (p & t).sum() / union if union else float("nan")

def per_class_dice(pred: np.ndarray, true: np.ndarray, class_id: int) -> float:
    p, t = (pred == class_id), (true == class_id)
    denom = p.sum() + t.sum()
    return 2 * (p & t).sum() / denom if denom else float("nan")

classes = {1: "crop_field", 2: "water", 3: "built_up"}
ious = {name: per_class_iou(pred_mask, true_mask, cid)
        for cid, name in classes.items()}
print("per-class IoU:", {k: round(v, 3) for k, v in ious.items()})
print("mIoU:", round(np.nanmean(list(ious.values())), 3))
```

Averaging IoU across classes rather than across pixels is a deliberate choice. A thin feature like a river covers few pixels, so a pixel-weighted score would let a model ignore it and still look accurate. Per-class mIoU makes that failure visible.

The code compares a model's mask with a reference mask. To compare two annotators who each drew several instances in one image, first pair the instances one to one, as described in [Agreement when an image has many objects](./object-detection.md#agreement-when-an-image-has-many-objects). Then score each pair with mask IoU.

### Thin and diffuse features

**Thin linear features** such as roads, rivers, field boundaries, roots and cracks are better drawn as open polylines or branching skeletons than as thin painted masks. Specify vertex density and how curves are sampled.

Plain IoU punishes a line drawn one or two pixels off as heavily as a missed one, so evaluate with a tolerance buffer instead. Relaxed precision and recall count a predicted pixel as correct if it lies within a set number of pixels of the reference, and the other way round ([Mnih and Hinton, 2010](../references.md#mnih-2010)). Choose the tolerance for your project and report it with the score.

**Diffuse, low-contrast regions** such as cloud, smoke and flood water can be drafted cheaply with automatic selection by colour similarity (threshold or flood-fill selection). These selections can leak across weak edges, so keep the raw pixels visible and require human correction before any draft becomes a final label.

## The 2026 modelling landscape

Segmentation in 2026 is split between purpose-built segmentation models, foundation segmenters that generalise across tasks with minimal fine-tuning, and geospatial-domain-specific models. The workable open-model references:

- **[Segment Anything Model (SAM 2)](https://github.com/facebookresearch/sam2)** (Meta, 2024; [Ravi et al., 2024](../references.md#ravi-2024)): the reference open foundation segmenter, Apache-2.0 licensed, promptable with points, boxes or masks (it takes no text prompts). Substantially reduces the cost of segmentation annotation when annotators correct its masks rather than draw from scratch, but the speed-up depends on the objects: it shrinks for the small, thin and unusual objects the model misses (see [Click-to-mask](../3_annotation-design/model-assisted-annotation.md#click-to-mask)). The workable frontier for annotation-time productivity.
- **Mask2Former** (Meta, 2022; [Cheng et al., 2022](../references.md#cheng-2022)): one transformer architecture for semantic, instance, and panoptic segmentation. In the playbook's experience, a few thousand target-domain masks (500-3,000 is a reasonable first target) is enough to start fine-tuning a task-specific segmenter; measure on your own held-out set.
- **OneFormer** (2022; [Jain et al., 2022](../references.md#jain-2022)) and **Mask DINO** (2022; [Li et al., 2022](../references.md#li-2022-maskdino)): competing unified segmenters; measure against Mask2Former on your specific task.
- **[DINOv3](https://github.com/facebookresearch/dinov3)** (Meta, 2025; [Siméoni et al., 2025](../references.md#simeoni-2025)) as a segmentation backbone: self-supervised pretraining aimed at high-quality dense features, with variants pre-trained on satellite imagery; fine-tune a segmentation head on top for tasks with limited labelled data. It is released under its own DINOv3 License, so read the terms.
- **Geospatial models.** **[Prithvi](https://huggingface.co/ibm-nasa-geospatial/Prithvi-EO-1.0-100M)** (IBM/NASA, 2023; [Jakubik et al., 2023](../references.md#jakubik-2023)) and **SatMAE** (2022; [Cong et al., 2022](../references.md#cong-2022)) are the workable open geospatial foundation models for satellite-imagery segmentation (crop mapping, land cover, deforestation). Prithvi's authors fine-tuned it for flood mapping, burn-scar and multi-temporal crop segmentation, and report that the labelled fine-tuning data could be cut substantially without losing accuracy; a few hundred to a couple of thousand target-region tiles is a reasonable first target.
- **[nnU-Net v2](https://github.com/MIC-DKFZ/nnUNet)** ([Isensee et al., 2021](../references.md#isensee-2021)): the reference medical-imaging segmenter (CT / MRI / X-ray). A 2024 re-evaluation found that, under rigorous validation, U-Nets in the nnU-Net framework still beat many newer architectures ([Isensee et al., 2024](../references.md#isensee-2024)), so it remains the workable default for medical-imaging African contexts.

:::note[Editorial opinion: a suggested starting path]

For a new African-context segmentation project (crop-field boundaries, land cover, lesion delineation in medical images), the shortest defensible path is:

1. Use SAM 2 to draft initial masks and have people correct them. Measure the speed-up on your own pilot, and see [Model-Assisted Annotation](../3_annotation-design/model-assisted-annotation.md#images-and-video-masks-boxes-and-tracks) for what reviewers must check and how to keep annotators from simply accepting the draft.
2. Fine-tune Mask2Former, or DINOv3 with a segmentation head, on the corrected corpus.
3. Report per-class IoU alongside mIoU.

For **satellite imagery**, fine-tune Prithvi or SatMAE on target-region tiles before fine-tuning a general segmenter. These backbones were pretrained on multispectral, multi-temporal satellite input of a kind general-imagery backbones never see ([Jakubik et al., 2023](../references.md#jakubik-2023); [Cong et al., 2022](../references.md#cong-2022)), so they are the better starting point for cloud-affected, lower-resolution tiles.

:::

## What it will actually cost you

Segmentation is the most expensive vision annotation in the playbook. On PASCAL VOC, full per-pixel labels were estimated at about 240 seconds per image against 20 seconds for image-level labels, roughly twelve times as long ([Bearman et al., 2016](../references.md#bearman-2016)). Model-assisted labelling with SAM and SAM 2 has reduced this cost substantially since 2023 ([Kirillov et al., 2023](../references.md#kirillov-2023); [Ravi et al., 2024](../references.md#ravi-2024)), but it is still several times more expensive per record than classification. Rough order-of-magnitude, from the playbook's experience:

- **Fine-tuning Mask2Former or DINOv3 on an existing segmentation corpus.** Two to four person-weeks; forty to two hundred GPU-hours.
- **Building a new segmentation corpus** with SAM 2-assisted labelling (500-3,000 images, 5-30 classes). Six to twelve months elapsed; five to twelve person-months. Boundary adjudication is the constraint; pilot to measure per-mask time before committing.
- **Pure-manual segmentation labelling** (where SAM 2 does not work: historical imagery, degraded scans, unusual modalities). Expect it to be several times slower than assisted labelling. In the SAM data engine, average time per mask fell from 34 to 14 seconds as the model improved, which the authors report as 6.5 times faster than COCO's manual mask annotation ([Kirillov et al., 2023](../references.md#kirillov-2023)); for video, annotation fell from 37.8 seconds per frame with SAM applied frame by frame to 4.5 seconds with SAM 2 ([Ravi et al., 2024](../references.md#ravi-2024)). Measure the ratio on your own pilot and budget accordingly.
- **Satellite-imagery segmentation** with Prithvi or SatMAE fine-tuning. Three to eight months for 500-2,000 labelled tiles.
- **Medical-imaging segmentation** with nnU-Net v2. Six to fifteen months for a domain-specific corpus (clinical labels, ethical review, patient consent).
- **Evaluation-only segmentation sets** (200-500 masks). Two to four months; two to five person-months.
- **Human evaluation of segmentation output.** One to two person-weeks per evaluator per 200 masks. The overlap is visually obvious in most cases; ambiguous boundaries take longer.

## Known limitations to watch for

- **Per-class IoU is the honest number.** A model that scores mIoU 0.75 overall may score 0.90 on the dominant background class and 0.30 on the small-but-important target class. The per-class breakdown is what shows failure.
- **Boundary annotation is inherently subjective.** Two careful annotators rarely trace a lesion or a crop-field edge on exactly the same pixels, and the gap grows with blurry edges and low resolution. Measure the boundary agreement between annotators in your pilot, report it, and treat it as the floor below which model differences mean little.
- **Class imbalance in pixel space.** Rivers, roads and other thin features cover few pixels but matter downstream. Pixel-weighted accuracy hides this failure; per-class mIoU exposes it.
- **Cloud cover in satellite imagery.** Optical imagery is unusable under thick cloud. Radar fills the gap ([above](#what-the-data-looks-like)), but fusing optical and radar input makes the model more complex than optical-only segmentation ([Meraner et al., 2020](../references.md#meraner-2020)).
- **SAM 2 is uneven outside everyday photos.** SAM and SAM 2 were trained on everyday photographs and videos ([Kirillov et al., 2023](../references.md#kirillov-2023); [Ravi et al., 2024](../references.md#ravi-2024)). On medical images, zero-shot SAM ranged from good to poor depending on the dataset, with single-prompt IoU from about 0.11 on spine MRI to 0.87 on hip X-ray ([Mazurowski et al., 2023](../references.md#mazurowski-2023)). Satellite imagery, especially multispectral bands it never saw, is a similar risk. Do not assume the annotation speed-up applies universally; measure it on your data.
- **Masks must be single-channel id maps.** Colour masks get damaged by JPEG saving and smooth resizing ([above](#what-the-data-looks-like)). Enforce lossless id-map PNGs and nearest-neighbour resizing in the export pipeline.
- **Instance vs. semantic segmentation are different tasks.** Semantic (paint every crop-field pixel green) is cheaper than instance (paint each crop field a separately-numbered green). If downstream needs counting, plan for instance segmentation.
- **Consent for medical-imaging patients.** Segmentation masks derived from patient scans carry the same consent obligations as the scans themselves. The [data governance chapter](../data-governance/index.md) covers the discipline.

## Further reading

- SAM 2 ([Ravi et al., 2024](../references.md#ravi-2024)): the workable open foundation segmenter; the reference for annotation-time productivity.
- Mask2Former ([Cheng et al., 2022](../references.md#cheng-2022)): the unified transformer-based segmentation architecture; the defensible fine-tuning default.
- Prithvi ([Jakubik et al., 2023](../references.md#jakubik-2023)): the workable open geospatial foundation model for satellite-imagery segmentation.
- A region-wide, multi-year set of crop field boundary labels for Africa ([Estes et al., 2024](../references.md#estes-2024)): how a continent-wide African segmentation set was labelled and quality-checked.

<details>
<summary>Additional references</summary>

- DINOv3 ([Siméoni et al., 2025](../references.md#simeoni-2025)): self-supervised pretraining aimed at dense prediction.
- nnU-Net ([Isensee et al., 2021](../references.md#isensee-2021)) and its 2024 re-evaluation ([Isensee et al., 2024](../references.md#isensee-2024)): the reference medical-imaging segmenter for CT / MRI / X-ray.
- OneFormer ([Jain et al., 2022](../references.md#jain-2022)): competing unified segmenter to Mask2Former.
- SatMAE ([Cong et al., 2022](../references.md#cong-2022)): geospatial masked-autoencoder pretraining for satellite imagery.
- [LacunaLabels](https://registry.opendata.aws/africa-field-boundary-labels/) and [LandCoverNet](https://source.coop/radiantearth/landcovernet): the African-context crop-field boundary and land-cover reference corpora.

</details>
