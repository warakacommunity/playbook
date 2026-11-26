---
title: Box and region rules
sidebar_position: 6
ready: true
last_update:
  date: 2026-11-26
  author: Seid Muhie Yimam
---

# Box and region rules

Drawing a box looks like the easiest annotation in this playbook, and that is why it goes wrong. Give two careful annotators the same photo of a goat behind a fence, and they will draw different boxes unless someone has decided, in writing:

- whether the box covers only the visible goat or the whole animal;
- whether the half-hidden goat counts at all;
- what to do about the herd in the background.

The [object detection](./object-detection.md#annotation-and-evaluation) page names these rules; this page gives them, for boxes and other regions on still images, so you can copy them into your [annotation guidelines](../templates/annotation-guidelines.md). For objects that move across video frames, see [Tracking objects across frames](../sign-language-video/video.md#tracking-objects-across-frames).

:::tip[Key points]

- Box only the visible extent of an object, and show annotators a perfect box and a common mistake for every class.
- Replace "use your discretion" with numbers: a minimum size in pixels, a trigger for group boxes.
- Prefer flagging hard objects (difficult, occluded, truncated) to skipping them.
- Give ignore regions and image-level flags their own export values, and keep "checked and empty" apart from "unusable" and "not done".
- Pilot the rules, score agreement, and log every rule change.

:::

You do not need to invent the rules from scratch. The large public detection datasets each wrote and published theirs, and their choices are a tested starting point. The table summarises them; the sections below explain each rule and where you will need to change it.

| Rule | PASCAL VOC | COCO | Open Images |
|---|---|---|---|
| Box extent | Visible area of the object, not its estimated full extent | Box enclosing the object's segmentation | Smallest box containing all visible parts |
| Occlusion | Flag if more than 5% of the object is hidden inside the box | Not flagged; occluded objects may need several polygons | Flag if occluded by another object |
| Truncation | Flag if more than 15 to 20% of the object lies outside the box | Not flagged | Flag if the object extends beyond the image |
| Small or unclear objects | Skip if very small, or if too little is visible to know the class; mark hard objects "difficult" | Area recorded; evaluation reported by size | Not specified |
| Many touching objects | Not specified | After 10 to 15 instances, one "crowd" region for the rest | One "group-of" box over more than 5 heavily overlapping instances |
| Whole-image problems | Mark the image bad (heavy blur, collages, too many objects) | Not specified | Not specified |

Sources: [PASCAL VOC, 2011](../references.md#voc-guidelines-2011); [Everingham et al., 2010](../references.md#everingham-2010); [Lin et al., 2014](../references.md#lin-2014); [COCO Consortium, n.d.-a](../references.md#coco-format); [Kuznetsova et al., 2020](../references.md#kuznetsova-2020).

## How tight the box should be

Box the **visible** extent of the object: the smallest axis-aligned box that contains every visible pixel of it. PASCAL VOC and Open Images both use this definition ([PASCAL VOC, 2011](../references.md#voc-guidelines-2011); [Kuznetsova et al., 2020](../references.md#kuznetsova-2020)). Do not stretch the box to where you guess the hidden part of the object ends. A box around the full estimated extent of a partly hidden object is a different annotation, usually called an amodal box, and if your task needs it, name it as a separate shape and train annotators on it separately.

Allow one exception and write it down. VOC lets the box leave out a few thin pixels, under 5% of the object, when including them would make the box much larger, such as a car's radio aerial ([PASCAL VOC, 2011](../references.md#voc-guidelines-2011)). In your data the same problem comes from a cow's tail, a bicycle's load strap, or a stalk sticking out of a maize cob.

The harder question is what counts as part of the object. Open Images found that a simple definition still left many class-specific corner cases, such as whether straps belong to a camera, and even cultural differences: in some places annotators boxed a "hand" as the whole arm. Their fix was to show annotators two perfect boxes for every class, plus common mistakes for the classes where pilots exposed them ([Kuznetsova et al., 2020](../references.md#kuznetsova-2020)). Do the same for each class in your label set. Decide, with a picture, whether a load carried on the head belongs to the person, whether the cart belongs to the donkey, and whether mud on a leaf is part of the leaf. VOC's rule is that a close-fitting occluder such as clothing, mud or snow is treated as part of the object ([PASCAL VOC, 2011](../references.md#voc-guidelines-2011)).

When something in front splits an object into two visible parts, for example a fence post across a goat, draw one box over the whole visible extent, not two boxes. For polygons and masks, one object may need several polygons in the same annotation ([COCO Consortium, n.d.-a](../references.md#coco-format)); keep them under one object identifier.

## Occlusion and truncation flags

An occlusion flag says that something in the image hides part of the object. A truncation flag says that the object continues beyond the image edge. They are separate flags because they mean different things for training: a model can still learn from an occluded cow, but a box around half a lorry cut off by the frame tells the model nothing about the lorry's rear.

Choose one of two styles and state it:

- **Thresholded flags**, as in VOC: occluded if more than 5% of the object is hidden inside the box, truncated if more than 15 to 20% of the object lies outside it ([PASCAL VOC, 2011](../references.md#voc-guidelines-2011)). Thresholds make the flag more consistent across annotators, but annotators still have to estimate the hidden share, so give a picture of a case just above and just below each threshold.
- **Plain yes or no flags**, as in Open Images, where each attribute is stored as 1 (present), 0 (absent) or -1 (unknown) ([Open Images, n.d.](../references.md#openimages-v7)). The explicit "unknown" value is worth copying: it keeps "the annotator did not check" apart from "the object is not occluded".

Flags cost a click per box, so add them only if someone will use them: to select clean training examples, to report accuracy separately for occluded and truncated objects, or to explain disagreements. Measure agreement on the flags as well as on the boxes, using the pairs matched as in [Agreement when an image has many objects](./object-detection.md#agreement-when-an-image-has-many-objects).

## Minimum size and unclear objects

VOC told annotators to skip objects that are very small "at your discretion" and objects with less than 10 to 20% visible when the class cannot be told, while body parts such as feet or a face are enough to know it is a person ([PASCAL VOC, 2011](../references.md#voc-guidelines-2011)). Discretion is where annotators diverge, so replace it with a number measured on the stored image, for example "box nothing whose shorter side is under 10 pixels at full resolution". Pick the number in the pilot by looking at what your annotators can still identify, and write down whether they may zoom.

Skipping is not free. An object left unboxed in the reference data turns every correct detection of it into a false positive. VOC handled this with a **difficult** flag: objects that are hard to recognise because of small size, occlusion, blur, or the need for context are still boxed, but are left out of evaluation, and a model that finds them is not penalised ([Everingham et al., 2010](../references.md#everingham-2010)). Prefer flagging to skipping, so the data stays usable when better models arrive.

Record each object's area, so you can report results by object size later. COCO reports separate scores for small objects (area under 32 × 32 pixels), medium and large (over 96 × 96 pixels) ([COCO detection evaluation, n.d.](../references.md#coco-eval)). Aerial and drone imagery is dominated by small objects, which is why the [object detection limitations](./object-detection.md#known-limitations-to-watch-for) ask for size-split results.

## Crowds and groups

Some scenes have too many touching objects to box one by one: a herd at a water point, a crowd at a market, a heap of tomatoes on a stall. The big datasets solved this in two different ways.

- **COCO crowd regions.** Annotators segmented the first 10 to 15 instances of a class individually, then covered the rest with one crowd region, marked `iscrowd: 1`. Crowd regions are ignored in evaluation ([Lin et al., 2014](../references.md#lin-2014)).
- **Open Images group-of boxes.** Annotators could draw one box around more than 5 instances of the same class that heavily overlap, and mark it "group-of" ([Kuznetsova et al., 2020](../references.md#kuznetsova-2020)). In their evaluation, a group-of box counts as found if at least one detection falls inside it, and counts once however many detections fall inside.

For your guideline, state the trigger (how many instances, how much overlap), whether individual boxes come first, and how the group will be scored. Then check the rule against what the data is for. If the purpose is counting animals or plants, a group box destroys the count; mark one point per object instead, as discussed under [Choosing the annotation shape](./index.md#choosing-the-annotation-shape).

## Ignore regions

An ignore region marks part of an image where the reference labels are deliberately incomplete, so that a model's detections there are neither rewarded nor penalised. COCO crowd regions work this way ([Lin et al., 2014](../references.md#lin-2014)), and Open Images notes that group-of boxes scored with zero weight act as ignore regions ([Kuznetsova et al., 2020](../references.md#kuznetsova-2020)). Common reasons to draw one:

- the far background, where objects are below the minimum size and too many to flag;
- areas that were blurred or masked for privacy, where the object can no longer be judged (see [Visual privacy](./visual-privacy.md));
- reflections, posters, screens and other pictures of objects, when your rule says not to box them. VOC boxed objects seen in mirrors and photo-realistic pictures but not in cartoons ([PASCAL VOC, 2011](../references.md#voc-guidelines-2011)), while Open Images boxed depictions and flagged them ([Kuznetsova et al., 2020](../references.md#kuznetsova-2020)). Either works if it is written down.

Give ignore regions their own label, not a class name with a note. Then check that your evaluation actually reads them: a standard COCO evaluator reads `iscrowd`, but a custom "ignore" label is just another class unless your scoring script maps it.

## Image-level flags

Some problems belong to the whole image, not to a box. VOC marked images bad when they were too blurred, when they were collages, or when there were too many objects to label; poor lighting alone did not count unless the objects could not be recognised ([PASCAL VOC, 2011](../references.md#voc-guidelines-2011)). Give annotators a short, fixed list of image-level flags, each with a reason, for example:

- **Unusable**: blurred, badly exposed, the wrong subject, a screenshot or collage. Send the reason back to whoever captured the image, as the [diagnosis labelling](../agri-advisory/diagnosis-labelling.md#who-does-it-and-how) case study does.
- **Not exhaustively labelled**: some objects were left unboxed, so the image must not be used to count false positives.
- **Needs privacy review**: an identifiable face, plate or screen that the ingest step missed.

Keep three states apart in the export: an image checked and found to contain no objects (a valid negative example), an image flagged unusable, and an image skipped or not yet done. If all three export as "no boxes", the empty images teach the model the wrong thing.

## Worked examples

The rows below show how one set of rules applies to common scenes. Your numbers may differ; the point is that each row has one answer that every annotator would reach.

| Scene | Rule applied | What is recorded |
|---|---|---|
| A goat half hidden behind a fence post | Box the visible extent across the post | One box, occluded |
| A lorry cut off by the right edge of the photo | Box the part inside the image | One box, truncated |
| A cow far away, 8 pixels tall, minimum is 10 | Below the minimum, but recognisable | One box, difficult, or inside an ignore region |
| Sixty cattle packed at a market | Box the clear ones up to the trigger, group the rest | Individual boxes plus one group or crowd region |
| A woman carrying a basket on her head | The class sheet says carried loads are not part of the person | Person box stops at the head; basket boxed only if it is a class |
| A photo of a tractor on a billboard | The rule says depictions are not boxed | Ignore region, or a box flagged as a depiction |
| A leaf photo with heavy motion blur | Objects cannot be identified | No boxes; image flagged unusable, reason "blur" |
| A field photo with no crops of interest | Checked and empty | No boxes; image marked as a checked negative |

A record that keeps these decisions might look like this, with the flag fields shown as examples:

```json
{
  "image": {"id": 41, "file_name": "market_0041.jpg", "width": 1600, "height": 1200,
            "image_flags": [], "exhaustive": true},
  "regions": [
    {"id": 1, "label": "cattle", "bbox": [212, 300, 140, 118],
     "occluded": 1, "truncated": 0, "difficult": 0, "group": 0},
    {"id": 2, "label": "cattle", "bbox": [700, 280, 610, 260],
     "occluded": 1, "truncated": 0, "difficult": 0, "group": 1},
    {"id": 3, "label": "ignore", "bbox": [0, 0, 1600, 210]}
  ]
}
```

## Writing the rules into your guidelines

The [annotation guidelines template](../templates/annotation-guidelines.md) has a place for each rule:

- **Definitions** (section 3): the box-extent rule, and for each class one picture of a perfect box and one of a common mistake, as Open Images did ([Kuznetsova et al., 2020](../references.md#kuznetsova-2020)).
- **Decision procedure** (section 4): the order of questions for each object. Is it a target class? Is enough visible to tell? Is it above the minimum size? Is it part of a group? Then which flags apply.
- **[Corner cases](../templates/annotation-guidelines.md#4b-corner-cases)** (section 4.b): every row of your own worked-examples table, with the image.
- **Label set** (section 5): the flags, the ignore label and the image-level flags, with their exact export values.

Short rules written as imperatives are easier to follow than paragraphs. A block like this one can go straight into the guideline:

```markdown
- Box only what you can see. Do not extend the box behind other objects.
- Leave out thin parts under about 5% of the object if including them would
  make the box much larger (tails, straps, stalks).
- Do not box objects whose shorter side is under 10 pixels at full zoom;
  if there are many, draw one ignore region over them.
- More than 15 touching animals of one class: box the 15 clearest,
  then draw one group box over the rest.
- Tick "occluded" if something in the image hides part of the object.
  Tick "truncated" if the object continues past the image edge.
- If you cannot identify the objects in the image, flag it unusable and pick a reason.
```

### Pilot, measure and revise

VOC reached unusually consistent boxes by discussing the guidelines in detail with annotators, observing them during annotation, and having an organiser check every image for missed objects ([Everingham et al., 2010](../references.md#everingham-2010)). You will rarely have that much control, but the same loop works at a smaller scale:

1. Pilot the rules on a shared set of images.
2. Score agreement and read the disagreement types ([Agreement when an image has many objects](./object-detection.md#agreement-when-an-image-has-many-objects)):
   - loose boundaries point to the box-extent rule;
   - missed objects point to the minimum-size and occlusion rules;
   - wrong labels point to the class definitions.
3. Add what you learn to the corner cases and the [training material](../3_annotation-design/training_guidlines.md).
4. Log each rule change in the guideline's change log, since boxes drawn before and after a change are not directly comparable.

### Two habits that save rework

- **Check model-drawn boxes against boxes drawn from scratch.** If annotators start from model-drawn boxes, the drafts pull them towards the model's choices, and a box that is nearly right is easy to accept. Check box fit on a sample drawn from scratch (see [Treat drafts as drafts](../3_annotation-design/model-assisted-annotation.md#treat-drafts-as-drafts)).
- **Try extreme-point clicking.** How boxes are drawn matters. Clicking the four extreme points of an object (top, bottom, left-most and right-most) was about five times faster than dragging corners in its authors' study, at about 7 seconds per box ([Papadopoulos et al., 2017](../references.md#papadopoulos-2017)). Open Images drew 90% of its boxes this way, and found it easier to deploy and more accurate than its earlier box-verification method ([Kuznetsova et al., 2020](../references.md#kuznetsova-2020)). If your annotation tool supports it, pilot it.

## Further reading

- [PASCAL VOC annotation guidelines](https://www.robots.ox.ac.uk/~vgg/projects/pascal/VOC/voc2011/guidelines.html): one page, short and concrete; a good model for your own.
- [Open Images V4 (Kuznetsova et al., 2020)](https://arxiv.org/abs/1811.00982), section 2.4: what a perfect box is, group-of boxes and box attributes at scale.
- [Microsoft COCO (Lin et al., 2014)](https://arxiv.org/abs/1405.0312), section 4 and appendix: instance segmentation and crowd regions.
