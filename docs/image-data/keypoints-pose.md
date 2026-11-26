---
title: Keypoints and pose
sidebar_position: 5
ready: true
last_update:
  date: 2026-11-26
  author: Seid Muhie Yimam
---

# Keypoints and pose

Keypoint annotation marks a fixed set of named points on each object in an image: the joints of a person, the hooves and spine of a cow, the tip and base of a leaf, the corners of the eyes. Joined by lines, the points form a skeleton, and the skeleton is the pose. Keypoints sit between a box and a mask in effort, but they carry something neither can: where the parts of an object are and how they relate to each other.

In African work keypoints serve several groups of tasks:

- **Sign language and gesture.** Data can be shared as pose keypoints as well as, or instead of, video (see [Sign language](../sign-language-video/sign-language.md#releasing-the-data) and [Gesture](../sign-language-video/gesture.md)).
- **Livestock and wildlife.** Body landmarks are used to study posture, gait and body shape.
- **Plant phenotyping.** Landmarks on leaves, stems and fruit are used to measure growth.
- **Health and rehabilitation.** These projects use body or facial landmarks, which makes them some of the most sensitive images a project can hold.

This page covers keypoints on still images. For points that follow an object through a video, see [Tracking objects across frames](../sign-language-video/video.md#tracking-objects-across-frames).

:::tip[Key points]

- Fix and version the ordered point list, the skeleton and the left/right rule before the pilot.
- Use the visibility flag carefully: annotators must never guess a point they cannot place.
- Compare annotations by size-normalised distance (OKS or PCK), never by IoU, and report it per point.
- Estimate your own per-point tolerances from a double-annotated pilot; COCO's fit only human bodies.
- Body and face landmarks are personal data, even when released instead of video.

:::

## What the data looks like

The COCO format is the common exchange format for keypoints. Each category lists its keypoint names in a fixed order and a `skeleton` of edges between them (1-based indices into that list, used for drawing). Each object stores a flat `keypoints` array of `x, y, v` triples, one per name, plus `num_keypoints`, the number of points that were labelled ([COCO Consortium, n.d.-a](../references.md#coco-format)). A small livestock schema looks like this:

```json
{
  "categories": [{
    "id": 1, "name": "cattle",
    "keypoints": ["head", "withers", "tail_base",
                  "left_fore_hoof", "right_fore_hoof",
                  "left_hind_hoof", "right_hind_hoof"],
    "skeleton": [[1, 2], [2, 3], [2, 4], [2, 5], [3, 6], [3, 7]]
  }],
  "annotations": [{
    "id": 1, "image_id": 1, "category_id": 1,
    "bbox": [120, 70, 290, 235],
    "keypoints": [120, 80, 2,  260, 70, 2,  400, 90, 2,
                  190, 300, 2, 230, 305, 1, 370, 300, 2,  410, 298, 2],
    "num_keypoints": 7
  }]
}
```

Larger human schemas build on the same layout. COCO's person category has 17 body points, and COCO-WholeBody adds 6 foot, 68 face and 21 points per hand, 133 in all, stored as separate arrays with a validity flag for each part ([Jin et al., 2020](../references.md#jin-2020)). Animal pose benchmarks such as AP-10K, with about 10,000 images of 54 species, define one shared point list across many species ([Yu et al., 2021](../references.md#ap10k-2021)). Reuse a published schema when your task fits it, because models and evaluation code already expect it.

## Define the schema before the pilot

Fix the schema before the first pilot image, and version it. Changing the point list after annotation has started means re-annotating, and reordering it silently corrupts every earlier record, because the array position is the only thing that says which point is which.

- **The ordered point list.** Name each point, give a one-line definition and a picture of where it goes ("withers: the highest point of the back, between the shoulder blades"). Keep only the points the downstream task needs; every extra point costs time on every object.
- **The skeleton.** List the edges. They are mainly for drawing and review, but an edge that looks wrong on screen is the fastest way to spot a misplaced point.
- **Left and right.** State whether left means the subject's left or the viewer's left. MPII Human Pose annotated joints "person centric", so a left joint is the left limb of the person, whichever side of the image it falls on ([Andriluka et al., 2014](../references.md#andriluka-2014)). Use the same rule for animals (the animal's own left). Record the mirror pairs in the schema, because a horizontal-flip augmentation must swap them.
- **What gets points.** Say which objects are annotated: every instance, or only those above a minimum size. COCO does not annotate keypoints on small objects (segment area under 32 by 32 pixels) and gives crowds no keypoints ([COCO Consortium, n.d.-c](../references.md#coco-keypoints-eval)). Say what to do with a tight group of animals, and whether points may only go on an object that already has a box.
- **The edge of the image.** A point outside the frame is not labelled. Never move it to the image border, which teaches the model a false position.

## Visibility and occlusion

Each point carries a visibility flag. In COCO, `v=0` means not labelled (and then `x=y=0`), `v=1` labelled but not visible, and `v=2` labelled and visible ([COCO Consortium, n.d.-a](../references.md#coco-format)). The flag is where annotators diverge most, so write the rule down:

- **`v=2`** when the point itself can be seen.
- **`v=1`** when it is hidden, for example behind another animal or the subject's own body, but its position can be placed with confidence from the parts that are visible. Decide in the guidelines how much inference is allowed, and give examples.
- **`v=0`** when it cannot be placed with confidence. Annotators **must not** guess. A guessed point looks exactly like a measured one in the export, and it trains the model on noise.

Collect the visibility flag even if your model ignores it: it lets you report accuracy on visible and occluded points separately, and it lets reviewers see whether one annotator marks far more points as occluded than the others.

## Annotating in practice

Annotate each object in the same order every time, following the schema list, so that a skipped point is noticed. Draw or confirm the object's box first when several objects share an image, so that every point belongs to exactly one instance. Zoom in for small objects, and check the skeleton overlay before submitting: a limb that crosses the body or a left hoof drawn on the right is visible at a glance.

Model drafts help a lot here, because placing points from nothing is slow and a pretrained pose model often gets most of them right. Treat them as drafts that annotators correct, and record which records started from a draft; see [Model-assisted annotation](../3_annotation-design/model-assisted-annotation.md#treat-drafts-as-drafts). For animals, tools for training a project-specific pose model from a few hundred labelled frames exist: DeepLabCut reported tracking comparable to human accuracy with about 200 labelled frames ([Mathis et al., 2018](../references.md#mathis-2018)). That makes a small, carefully labelled seed set worth the effort.

Before the pilot, confirm that your annotation tool exports keypoints with names, order and visibility intact, in the coordinate convention you expect (pixels or percentages of the image size; see [Coordinates and image orientation](./object-detection.md#coordinates-and-image-orientation)).

## Agreement and evaluation

Keypoints cannot be compared with IoU. They are compared by distance, normalised for object size so that a 10-pixel error on a calf in the distance counts more than the same error on a cow close to the camera. When an image has several objects, first pair the two annotators' objects one to one, as in [Agreement when an image has many objects](./object-detection.md#agreement-when-an-image-has-many-objects), using the similarity below in place of IoU.

**Object Keypoint Similarity (OKS)** is the COCO measure. For each labelled point it turns the distance into a score between 0 and 1 and averages over the points the reference labelled (`v` greater than 0):

$$
\mathrm{OKS} = \frac{\sum_i \exp\left(-d_i^2 / 2 s^2 \kappa_i^2\right)\,\delta(v_i > 0)}{\sum_i \delta(v_i > 0)}
$$

In this formula:

- `d_i` is the distance between the two positions of point `i`.
- `s` is the object's scale (the square root of its segment area).
- `κ_i` is a per-point tolerance.

COCO estimated the tolerances from 5,000 redundantly annotated validation images. It measured how far annotators disagreed on each point type relative to object scale, then set `κ_i = 2σ_i`. Points that are not labelled in the reference do not affect the score, and COCO averages precision over OKS thresholds from 0.50 to 0.95 ([COCO Consortium, n.d.-c](../references.md#coco-keypoints-eval)).

:::warning

The COCO tolerances fit COCO's 17 human points only. For your own schema, estimate them the same way from the double-annotated pilot: a hoof is easier to place than the withers, and the tolerance should say so.

:::

**Percentage of Correct Keypoints (PCK)** is simpler to explain. A point is correct if it lies within `α × max(h, w)` pixels of the reference, where `h` and `w` are the height and width of the object's box. Yang and Ramanan used α = 0.1 for full-body and 0.2 for upper-body people ([Yang and Ramanan, 2013](../references.md#yang-2013)).

PCKh replaces the box with the head: the threshold is 50% of the head segment length, which does not change as the body bends ([Andriluka et al., 2014](../references.md#andriluka-2014)). For animals or plants, pick a reference length that is stable in your images (body length, leaf length) and report α with every score.

Report agreement per point, not only the mean, because the mean hides the one point annotators cannot agree on. Check for left/right swaps explicitly: the COCO evaluation names confusion of left and right as a source of annotation error and of model error ([COCO Consortium, n.d.-c](../references.md#coco-keypoints-eval)), and a swapped pair costs little on OKS when the two points lie close together, as front hooves often do.

<details>
<summary>Python sketch: OKS, PCK and swap check for one pair of annotations</summary>

```python
# pip install numpy
import numpy as np

# Schema: names in a fixed order, and which pairs are left/right mirrors.
NAMES = ["head", "withers", "tail_base", "left_fore_hoof", "right_fore_hoof",
         "left_hind_hoof", "right_hind_hoof"]
MIRROR = {3: 4, 4: 3, 5: 6, 6: 5}


def oks(gt, other, area, kappa):
    """COCO-style Object Keypoint Similarity of one annotation against a reference.

    gt and other are (k, 3) arrays of x, y, v. Only points the reference
    labelled (v > 0) count; area is the reference object's area in pixels.
    """
    labelled = gt[:, 2] > 0
    if not labelled.any():
        return None
    d2 = ((gt[:, :2] - other[:, :2]) ** 2).sum(axis=1)
    sim = np.exp(-d2 / (2 * area * kappa ** 2))
    sim[other[:, 2] == 0] = 0.0       # a point the other annotator left out is a miss
    return float(sim[labelled].mean())


def pck(gt, other, ref_len, alpha):
    """Share of the reference's labelled points that the other lands within alpha * ref_len."""
    labelled = gt[:, 2] > 0
    d = np.linalg.norm(gt[:, :2] - other[:, :2], axis=1)
    hit = (d <= alpha * ref_len) & (other[:, 2] > 0)
    return float(hit[labelled].mean())


def swapped_pairs(gt, other, ref_len, alpha):
    """Mirror pairs that fit better when left and right are exchanged."""
    out = []
    for i, j in MIRROR.items():
        if i < j and min(gt[i, 2], gt[j, 2], other[i, 2], other[j, 2]) > 0:
            straight = np.linalg.norm(gt[i, :2] - other[i, :2]) + np.linalg.norm(gt[j, :2] - other[j, :2])
            crossed = np.linalg.norm(gt[i, :2] - other[j, :2]) + np.linalg.norm(gt[j, :2] - other[i, :2])
            if crossed < straight and straight > 2 * alpha * ref_len:
                out.append((NAMES[i], NAMES[j]))
    return out


# Two annotators on one cow; B swapped the fore hooves and could not see the tail.
a = np.array([[120, 80, 2], [260, 70, 2], [400, 90, 2], [190, 300, 2],
              [230, 305, 1], [370, 300, 2], [410, 298, 2]], dtype=float)
b = np.array([[122, 83, 2], [258, 72, 2], [0, 0, 0], [231, 304, 2],
              [191, 301, 2], [372, 302, 2], [409, 300, 2]], dtype=float)

box_w, box_h = 290, 235              # tight box around A's points
area = box_w * box_h                  # stand-in for the segment area
kappa = np.full(len(NAMES), 0.1)      # placeholder; estimate from your own pilot
ref = max(box_w, box_h)               # PCK reference length, as in Yang and Ramanan

print(f"OKS: {oks(a, b, area, kappa):.2f}")
print(f"PCK@0.1: {pck(a, b, ref, 0.1):.2f}")
print("left/right swaps:", swapped_pairs(a, b, ref, 0.05))
```

The tolerances `kappa` are placeholders; replace them with values estimated from your own double-annotated pilot. To aggregate over a dataset, report the mean OKS of matched objects together with the per-point PCK, and count the swaps.

</details>

## Privacy

Body and face landmarks are personal data. A face mesh is close to a biometric template, and movement can identify a person to people who know them, so pose released instead of video is not anonymous (see [Sign language](../sign-language-video/sign-language.md#releasing-the-data)). Treat keypoint files with the same consent, access and retention rules as the images they came from; see [Data Governance](../data-governance/index.md#personally-identifiable-information) and [Visual privacy](./visual-privacy.md). Health and rehabilitation images need the strictest care of all.

## What it will actually cost you

Keypoints usually cost more than boxes and less than full masks, but the range is wide, because cost grows with the number of points per object and with how often points are hidden. Time annotators during the pilot to get your own cost per object rather than relying on a general figure. The other costs to plan for:

- **Schema work.** Writing point definitions with pictures and settling the visibility rule takes several rounds of piloting with domain experts (a veterinarian for livestock, an agronomist for plants, Deaf signers for sign language).
- **Double annotation for the pilot.** You need it twice over: once to measure agreement and once to estimate your own per-point tolerances for OKS.
- **Adjudication.** Disagreements on occluded points and left/right swaps take longer to resolve than box disagreements, because the adjudicator has to reason about anatomy, not only look.
- **Expert time.** Some landmarks (on an animal's skeleton, on a plant's organs) need specialists, who are a smaller and more expensive pool than general annotators.

## Known limitations to watch for

- **Guessed points.** The most damaging error, because it is invisible in the export. Audit a sample of `v=1` points against the image.
- **Left/right swaps.** Common, cheap on the mean score, and harmful for any task that depends on side, such as lameness in one leg.
- **Borrowed tolerances.** COCO's per-point tolerances describe human annotators on human bodies. Using them for cattle or leaves makes OKS meaningless.
- **Unstated reference length.** A PCK score without its α and its reference length cannot be compared with anything.
- **Schema drift.** A point added or reordered mid-project splits the dataset into incompatible halves. Version the schema and store the version with every record.
- **Pose models trained elsewhere.** A pretrained pose model may have seen few images like yours: few of your breeds, your crops, your clothing or your camera angles. Check its drafts on your own images before trusting them, and measure how often annotators change them.

## Further reading

- [COCO keypoint evaluation](https://cocodataset.org/#keypoints-eval): the OKS definition and how its tolerances were estimated.
- [Andriluka et al., 2014](../references.md#andriluka-2014): the MPII Human Pose benchmark, person-centric left and right, and PCKh.
- [Yang and Ramanan, 2013](../references.md#yang-2013): the original PCK definition.
- [Yu et al., 2021](../references.md#ap10k-2021): AP-10K, a starting point for animal keypoint schemas.
- [Mathis et al., 2018](../references.md#mathis-2018): DeepLabCut, pose estimation for user-defined points with little labelled data.
