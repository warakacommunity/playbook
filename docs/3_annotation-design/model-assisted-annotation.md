---
title: Model-Assisted Annotation
sidebar_position: 5
ready: true
last_update:
  date: 2026-11-24
  author: Seid Muhie Yimam
---

# Model-Assisted Annotation

A model can do part of the annotation work before or while a person does the rest. For example, a tagger proposes part-of-speech tags; a speech recogniser drafts a transcript; a diarization pipeline proposes speaker turns; a segmentation model turns a click into a mask. The annotator then corrects the draft instead of starting from an empty form. Done carefully, this saves effort where the model is already good and keeps human attention for the hard cases. Done carelessly, it fills a dataset with the model's own mistakes, now carrying a human's approval.

This page covers model assistance from any kind of model: a small model you trained on your own seed data, a pretrained speech or vision model, or a large language model. The LLM-specific parts (prompting, constraining output to the label set, when not to use an LLM at all) are in [LLM-Assisted Data](../7_llm-assisted-task/index.md). This page adds what applies to every kind of model: how drafts reach annotators, how to store and retire them, how to choose which items people label next, and how to record what the model did.

## Two ways a model can help

There are two different modes, and they place different demands on the model and on your setup.

| Mode | How it works | Suits |
| --- | --- | --- |
| Bulk pre-annotation | The model labels a batch of items ahead of time. Annotators open each item with the draft already in place and accept, edit or delete it. | Most text and speech tasks (tagging, classification, transcription, diarization); any model that can finish before the batch is needed. |
| Interactive suggestions | The model is called while the annotator works. The annotator gives a hint, such as a click on an object or a highlighted phrase, and the model returns a suggestion for that one place. | Drawing-heavy tasks: image or video masks and outlines, boundaries easier to accept than place. |

Interactive suggestions only help if they are fast enough that the annotator does not sit waiting for them. If the model cannot answer quickly for your annotators, on their devices and their connections, use bulk pre-annotation instead.

In both modes, annotation must carry on when the model fails. If a draft could not be produced, the item should open with an empty form for the annotator to label from scratch, and if an interactive suggestion does not arrive, the annotator should be able to keep drawing by hand. A model outage should cost you the speed-up, never the annotation session.

For annotators who work offline or on unreliable connections, compute drafts before the batch goes to their devices and do not rely on interactive suggestions. For offline work in general, see [Offline field operations](../2_data-collection/10_offline-field-operations.md).

## Start from a small hand-labelled seed

If no usable model exists for your language and task, do not wait for one. Label a small seed set by hand, train a model on it, and use that model to draft the rest. MasakhaPOS worked this way: annotators tagged the first 100 sentences per language by hand, a model fine-tuned on them predicted tags for the remaining sentences, and annotators corrected those predictions. Punctuation, numbers and symbols were predicted almost perfectly and proper nouns well, which removed much of the effort ([Dione et al., 2023](../references.md#masakhapos-2023)). The details are on the [Part-of-Speech Tagging](../sequence-labelling/pos.md#annotation) page.

The seed is also the first test of your guidelines. Label it with the same care as any other data, ideally with more than one annotator, because a model trained on an inconsistent seed will draft the same inconsistencies into every later item.

## Treat drafts as drafts

A model's output is a proposal, not an annotation. Keep that distinction in how you store it:

- **Store drafts separately from human annotations.** A draft and the human annotation made from it are two records. Keeping both lets you see later what the model proposed and what the person changed.
- **Tag every draft with the model and its version.** A draft without a version cannot be traced, retired or compared with a newer model.
- **Retire stale drafts after a model change.** When you retrain or swap the model, delete or regenerate the drafts the old version made on items no one has annotated yet. Otherwise annotators work from a mix of model versions, which makes batches harder to compare and reproduce and leaves stale suggestions in the queue. Human annotations already made keep their record of the version they started from.
- **Keep gold, evaluation and test sets human-only.** Items used as gold checks, items used to measure agreement, and the test set should be labelled from scratch with no draft shown. A test set corrected from model drafts is biased towards that model, and every model you later evaluate on it inherits the bias.

Pre-filled drafts also pull annotators towards the model's choices. A controlled study of pre-annotation for part-of-speech tagging found that it sped annotators up and could raise quality, but also biased them towards the pre-annotation ([Fort and Sagot, 2010](../references.md#fort-sagot-2010)). The checks on the LLM page apply to any model ([Reviewing drafts without rubber-stamping](../7_llm-assisted-task/index.md#reviewing-drafts-without-rubber-stamping)): above all, keep a blind slice labelled from scratch and re-measure whenever the model changes.

When two annotators start from the same draft, their agreement partly measures the shared draft. Compute inter-annotator agreement on items both annotators labelled from scratch, using the metrics in [Data Quality](../4_data-quality/index.md#measure-inter-annotator-agreement). To measure how good the model itself is, treat its output as one more annotator and compare it with the human labels.

## Choose what to label next: active learning

In active learning, the model helps choose which unlabelled items people label next. The most common strategy, and probably the simplest, is uncertainty sampling: annotators get the items the model is least sure about ([Settles, 2009](../references.md#settles-2009)). A worked example for text classification is in [Collecting and preparing data](../11_text-classification/collecting-and-preparing-data.md#collection--selection-approaches).

Before the loop starts, reserve a persistent random evaluation holdout and keep it out of every training round. The loop then has three parts:

1. **Select** the items the current model is most uncertain about from the training pool.
2. **Retrain** the model on the labels in the training pool, at regular points. Never train on the evaluation holdout or test set.
3. **Re-score** the remaining training pool with the retrained model, so the next selection uses the new model's uncertainty rather than stale scores from an older one.

If you retrain but never re-score, the queue keeps following the old model however many labels arrive. Set how often to retrain by what a cycle costs you: a cheap model that updates in seconds can retrain often, a full fine-tune that takes GPU time should run less often, and with many annotators working in parallel, cycles should not overlap.

Actively selected data has a known weakness. It is tied to the model that chose it: the items are the ones that model found hard, not a sample of the data as it really is. In experiments across several tasks, Lowell, Lipton and Wallace found that the gains from active learning were inconsistent across models and tasks, and that a different model trained later on actively acquired data did not reliably beat one trained on the same number of randomly drawn items ([Lowell et al., 2019](../references.md#lowell-2019)). Two habits follow:

- **Keep random samples for distinct purposes.** The persistent evaluation holdout estimates performance on data the model did not choose or train on. Separately, draw part of each round's training items at random to estimate label prevalence and domain coverage; those randomly drawn training items may be used for retraining, unlike the evaluation holdout. Actively chosen items over-represent hard and rare cases and distort both estimates.
- **Record how each item was selected.** Store whether an item came from the random training slice or from uncertainty sampling, which model version chose it, and whether it belongs to training, evaluation or test data, so later users can reweight or set the selected items aside.

## Record what the model did

A dataset built with model help is a different object from one labelled entirely from scratch, and its users need to know which parts are which. Record, at the level of the item and ideally of each region or span:

- the model name and version that produced the draft, and the date;
- whether the annotation started from a draft or was made from scratch;
- for each region or span, whether it was accepted from the draft, edited, or drawn by the annotator. Where your annotation tool keeps an identifier that links a saved region to the draft region it came from, keep it in the export.

From these fields, report in the dataset documentation the share of annotations accepted unchanged, edited, and made from scratch, overall and per language. A high share accepted unchanged is not proof of a good model; read it next to the blind slice. Add these fields to your [transformation log](../2_data-collection/8_data-provenance-traceability.md#a-transformation-log-that-travels-with-the-data) and your [dataset documentation](../6_documentation/documentation.md).

Check your export before you rely on it. Some export formats keep only the final labels and drop drafts, model versions and per-item flags, so run a test export early and confirm that the provenance fields survive.

:::warning[Never pass model output off as human labels]

Some workflows turn a trusted model's output directly into final labels, with no human looking at each item. If you do this, label every such item as model-produced, keep it out of gold and test sets, and say in the documentation how many items were labelled this way. Silently mixing unreviewed model output into human annotations is the fastest way to make a dataset untrustworthy.

:::

## Images and video: masks, boxes and tracks

Drawing is the slowest part of vision annotation, so this is where model help saves the most time and where unchecked drafts do the most damage. Three forms are common: a click that becomes a mask, boxes pre-filled by a detector, and objects carried from frame to frame by a tracker. The rules in [Treat drafts as drafts](#treat-drafts-as-drafts) apply to all three. This section adds what is specific to images and video, then how to audit the result.

### Click-to-mask

A promptable segmentation model of the Segment Anything (SAM) family returns a mask when the annotator clicks on an object or draws a box around it. The annotator adds clicks inside the object or outside it to fix the mask, then touches up the edges with a brush or eraser. In the first stage of building the SAM dataset, annotators worked this way, and the average time per mask fell from 34 to 14 seconds as the model was retrained on their corrections. In the next stage the model's confident masks were filled in automatically and annotators labelled only the objects it had missed; the time per mask went back up to 34 seconds, because those objects were harder ([Kirillov et al., 2023](../references.md#kirillov-2023)).

The lesson for your project is that a speed-up measured on easy, prominent objects does not carry over to the leftovers. Pilot on your own images and time the masks that need the most correction, not the average. Then write down what a reviewer must check on every model-drawn mask:

- edges follow your guideline's boundary rule, not the model's idea of where the object ends;
- holes, thin parts and fine structures (stems, leaf tips, wires, fingers) are present;
- two touching objects have not been merged into one mask, and one object has not been split in two;
- the mask does not leak into shadow, background or a neighbouring object of similar colour.

These models are trained mostly on everyday photos. Expect weaker drafts on medical, satellite and other unusual imagery; see [Segmentation](../image-data/segmentation.md#known-limitations-to-watch-for). For very large images, prompt the model on tiles rather than the whole image; see [Tiling with overlap](../image-data/large-imagery.md#tiling-with-overlap).

### Detector pre-labels

For boxes, run a detector over the batch and let annotators accept, adjust or delete each proposed box and add any it missed. Three problems are specific to this mode:

- **Missed objects stay missed.** A draft shows what the model found. Nothing in it prompts the annotator to look for what it did not find, so small, partly hidden and unusual objects are the ones most likely to be left out. Ask annotators to scan the whole image for missing objects before they submit, and track how many boxes they add (see the audit below).
- **The detector's box conventions may not be yours.** A detector trained on another dataset draws boxes the way that dataset did: around the visible part or the whole object, one box per crowd or one per person. Check its drafts against your [box and region rules](../image-data/region-guidelines.md#how-tight-the-box-should-be) on the pilot, and map its class names to your label set by hand rather than trusting a label that looks the same.
- **The confidence threshold sets the type of work.** A low threshold fills the image with false boxes to delete; a high one leaves more objects to add from scratch. Choose it on the pilot and record it with the model version.

A cheaper variant asks annotators only to answer yes or no for each proposed box. Papadopoulos and colleagues trained detectors this way, with no boxes drawn by hand, and estimated that it cut total annotation time by a factor of six to nine ([Papadopoulos et al., 2016](../references.md#papadopoulos-2016)). Open Images used the same idea for image-level labels: classifiers proposed candidate labels and people verified each one as present or absent. The paper treats any class that was not verified as unknown, not absent ([Kuznetsova et al., 2020](../references.md#kuznetsova-2020)). The same holds for your data. A label the model never proposed was never checked, so record which classes were verified for each image and do not read a missing label as a negative.

When annotators do draw boxes from scratch, for the blind slice or for objects the model missed, clicking the four extreme points of the object (top, bottom, left-most and right-most) is about five times faster than dragging box corners ([Papadopoulos et al., 2017](../references.md#papadopoulos-2017)).

### Auto-tracking in video

In video, the annotator draws or confirms an object in one frame and a tracking or mask-propagation model carries it through the frames that follow. Where it drifts, the annotator corrects that frame and propagates again. In the data engine for SAM 2, labelling with the image model on every frame took 37.8 seconds per frame; adding mask propagation brought this to 7.4 seconds, and the full video model to 4.5 seconds. Annotators still edited about 19% of frames in each tracked object, and a separate group of annotators checked every tracked object, sending back any that did not follow the target correctly through all frames ([Ravi et al., 2024](../references.md#ravi-2024)).

Trackers fail in predictable places: occlusion, objects crossing each other, an object leaving and re-entering the frame, fast motion, motion blur and shot cuts. These are where identities get swapped, which a frame-by-frame look can miss. Review each track by playing it through from entry to exit, check frames at a fixed interval and at every entry, exit and occlusion, and follow the identity rules in [Tracking objects across frames](../sign-language-video/video.md#tracking-objects-across-frames). Cut long videos into chunks at shot boundaries before propagating, so that a track does not jump across a cut; see [Long video](../sign-language-video/long-video.md#shot-boundaries-and-keyframes). Video annotation needs skilled annotators and strong quality control even without a model ([Vondrick et al., 2013](../references.md#vondrick-2013)), and auto-tracking does not remove that need.

### Auditing auto-labels

A batch where nearly every draft was accepted can mean a good model or annotators who stopped looking. The audit separates the two. Build it into the workflow from the first batch, not after a problem shows up.

1. **Compare against a blind slice.** Have a random sample of items labelled from scratch by annotators who do not see the draft, as described in [Treat drafts as drafts](#treat-drafts-as-drafts). Match the regions in the corrected drafts to the scratch regions, using the one-to-one pairing in [Agreement when an image has many objects](../image-data/object-detection.md#agreement-when-an-image-has-many-objects), and count what the corrected version missed, added wrongly or placed differently. This is the only measure of what review let through.
2. **Measure correction rates.** For every region, record whether the draft was accepted unchanged, adjusted, deleted, or added by the annotator because the model missed it. For adjusted regions, also record how far the final region moved from the draft, as the IoU between them. Report these per class, per annotator, per batch and per model version.
3. **Review a sample of accepted drafts.** Reviewers tend to look at what changed. Send a random sample of drafts accepted unchanged to review as well, with extra weight on small objects, rare classes and low-confidence drafts.
4. **Plant known errors.** Mix in a few drafts with errors you made on purpose, such as a shifted box, a removed object or a wrong class, and count how many annotators catch. In a study of crowdworkers checking pre-filled values extracted from report tables, errors such as confused digits were corrected 82% of the time, but errors that could only be spotted by knowing the annotation rules were handled correctly only 31% of the time, and annotators who were sceptical of AI were more accurate ([Beck et al., 2025](../references.md#beck-2025)). Plant errors of both kinds, tell annotators that such checks exist, and remove planted items before release.

Read the correction rates as signals, not as accuracy. Very low adjustment and addition rates from one annotator, compared with others on the same kind of data, suggest rubber-stamping; check that annotator's work against the blind slice. Additions near zero while the blind slice keeps finding missed objects mean annotators are anchored to the draft. A rate that changes sharply after a model update tells you to re-measure the blind slice. Pre-annotation pulls annotators towards the model's choices ([Fort and Sagot, 2010](../references.md#fort-sagot-2010)), and in vision this pull is easy to miss: a boundary that is close enough looks right, so the model's edge becomes the dataset's edge.

The sketch below counts the four outcomes for boxes in one image from the draft and the final annotation. The thresholds are examples; set your own and report them.

```python
# pip install numpy scipy
import numpy as np
from scipy.optimize import linear_sum_assignment

def iou(a, b):
    # boxes as [x_min, y_min, x_max, y_max]
    ix = max(0, min(a[2], b[2]) - max(a[0], b[0]))
    iy = max(0, min(a[3], b[3]) - max(a[1], b[1]))
    inter = ix * iy
    union = (a[2] - a[0]) * (a[3] - a[1]) + (b[2] - b[0]) * (b[3] - b[1]) - inter
    return inter / union if union else 0.0

def correction_counts(draft, final, match_iou=0.5, unchanged_iou=0.95):
    """draft, final: lists of (label, box). Returns counts of each outcome."""
    counts = {"unchanged": 0, "adjusted": 0, "deleted": 0, "added": 0}
    if draft and final:
        cost = np.array([[1 - iou(d[1], f[1]) for f in final] for d in draft])
        rows, cols = linear_sum_assignment(cost)
        pairs = [(r, c) for r, c in zip(rows, cols) if 1 - cost[r, c] >= match_iou]
    else:
        pairs = []
    for r, c in pairs:
        same_label = draft[r][0] == final[c][0]
        same_box = 1 - cost[r, c] >= unchanged_iou
        counts["unchanged" if same_label and same_box else "adjusted"] += 1
    counts["deleted"] = len(draft) - len(pairs)
    counts["added"] = len(final) - len(pairs)
    return counts

draft = [("goat", [10, 10, 50, 60]), ("goat", [70, 15, 110, 70])]
final = [("goat", [10, 10, 50, 60]), ("sheep", [72, 14, 112, 72]), ("goat", [130, 20, 160, 66])]
print(correction_counts(draft, final))
# {'unchanged': 1, 'adjusted': 1, 'deleted': 0, 'added': 1}
```

If your tool keeps a link from each saved region to the draft region it came from, as recommended in [Record what the model did](#record-what-the-model-did), use that link instead of matching by overlap. For masks, compute IoU on the masks instead of the boxes. To merge regions from several annotators into one label, see [Formats and merging](../image-data/formats-and-merging.md#merging-boxes-from-several-annotators).

## Where the model runs

Model assistance sends your data to wherever the model runs. Before you connect a model, check:

- **Consent and law.** Your consent terms and the data-protection law that applies must allow the data to go to that service and to the country where it is hosted. A recorded voice, a face or a message can be personal data ([The law that applies](../data-governance/index.md#the-law-that-applies-african-data-protection-regimes)).
- **Hosting.** For sensitive data, prefer a model you host yourself, on infrastructure you control, over a third-party service. Read a hosted provider's terms on keeping and reusing what you send.
- **Credentials.** Treat the keys or tokens that connect your annotation tool to the model as secrets: keep them out of shared documents and group chats, and rotate them when someone leaves the project or a key may have leaked ([Securing data during annotation](../data-governance/index.md#securing-data-during-annotation)).

## By modality

The same practice appears throughout the playbook. Each bullet gives the modality-specific point and links to the task page for the rest:

- **Sequence labelling.** Seed, then correct predicted tags: [Part-of-Speech Tagging](../sequence-labelling/pos.md#annotation) and the [shared pipeline](../sequence-labelling/index.md#the-shared-pipeline).
- **Transcription.** Where a usable recogniser exists, pre-fill each segment with its draft for correction. This is faster, but it anchors transcribers the same way post-editing machine translation does, so transcribe an audit sample from scratch and record for each transcript whether it was written from scratch or post-edited. For transcription conventions, see [ASR](../asr/index.md#distinctive-annotation-transcription-is-the-hard-part); for post-editing translations, see [Machine Translation](../machine-translation/index.md#annotate-translations).
- **Speaker turns.** Correct a pretrained pipeline's output: [Speaker Diarization](../speaker-diarization/index.md#starting-from-a-pretrained-pipeline).
- **Automated audio checks.** Models used to screen recordings rather than to draft labels: [Audio quality control](../asr/audio-quality-control.md#tier-2-model-based-checks-optional). These models are often weak on African languages, so route clips that fail to a human rather than rejecting them.
- **Images and video.** Click-to-mask, detector pre-labels and auto-tracking are covered [above](#images-and-video-masks-boxes-and-tracks); the models themselves are listed in [Segmentation](../image-data/segmentation.md#the-2026-modelling-landscape) and [Object detection](../image-data/object-detection.md#the-2026-modelling-landscape).
- **Sign language.** Model-proposed segment boundaries or pose overlays are a first draft only: fluent signers check every boundary, the data records which segments the machine proposed, and a sample is double-annotated from scratch ([Fort and Sagot, 2010](../references.md#fort-sagot-2010)). For the annotation tiers themselves, see [Sign language](../sign-language-video/sign-language.md#the-annotation-model).
- **LLM drafts.** Constraining drafts to the label set and when not to use an LLM: [LLM-Assisted Data](../7_llm-assisted-task/index.md).

