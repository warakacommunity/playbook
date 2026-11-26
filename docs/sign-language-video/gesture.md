---
ready: true
title: Gesture
sidebar_position: 3
last_update:
  date: 2026-07-07
  author: Tadesse Destaw
---

# Gesture

*Last reviewed: 2026-07-07.*

Gesture recognition reads the hand and body movements that accompany or replace speech. It overlaps with sign language but is broader and looser: a gesture is usually a single meaningful movement, such as a wave, a count on the fingers, or a culturally specific sign, rather than a full grammatical language.

:::tip[Key points]

- Gesture is cultural: the same movement can mean different things in different places.
- Define the gesture vocabulary with the community, and record the region with every label.
- Count demonstrators, not just clips; test on people the model has not seen.
- Report results per region, and keep isolated and continuous recognition separate.

:::

![The same gesture means different things by region, so define the vocabulary with the community](images/gesture-cultural.svg)

## What the data looks like

Gesture data is video or sensor recordings of gestures, each labelled with what it means. The recordings can come from cameras or from wearable sensors that capture motion directly.

The point that matters most for African data is that gesture is cultural. The link between a gesture's form and its meaning is a cultural convention, so the same movement can mean different things in different places ([Kita, 2009](../references.md#kita-2009)). Gestures that matter in an African community may have no equivalent in datasets built elsewhere. Define the gesture vocabulary with the community whose gestures they are; a vocabulary borrowed from a foreign taxonomy will encode the wrong meanings.

A record names the gesture and, importantly, the meaning and region it was defined in, since the same movement can mean different things in different places:

```json
{
  "video": "clips/gesture_0007.mp4",
  "gesture": "beckon",
  "meaning": "calling someone to approach",
  "region": "coastal Kenya",
  "annotator": "community_member_03"
}
```

Recording the region alongside the meaning is what keeps a culturally specific gesture from being flattened into a single global label that would be wrong somewhere else.

## Annotation and evaluation

Annotating gesture means marking which gesture occurs and, in continuous video, when it starts and stops. This makes it a temporal labelling task, with the same boundary disagreements as audio events. To keep it consistent:

- define the gesture set and its cultural meanings clearly;
- recruit annotators from the relevant community;
- measure agreement on shared clips.

**Task specification: gesture segments in video**

| Setting | Value |
|---|---|
| Annotator sees | A video clip with a timeline |
| Annotator gives | Time segments on the timeline, each marked with one gesture label |
| Choice | Exactly one label per segment, from a fixed set (example: Beckon, Refuse, Count); a clip can have several segments |
| Notes | The label set and each label's meaning come from the community; record the region with the labels |

Evaluate gesture recognition with accuracy and [F1](https://en.wikipedia.org/wiki/F-score). Report per class when the gesture set is imbalanced. Add a human check for culturally loaded categories, which automatic scores cannot judge.

## The 2026 modelling landscape

Gesture recognition works at a different scale from sign language: the tasks are looser, the label sets smaller, and each corpus can be annotated much faster. The usual open-model options:

- **Video-classification backbones.** **VideoMAE v2** ([Wang et al., 2023](../references.md#videomae-v2-2023)), **TimeSformer** ([Bertasius et al., 2021](../references.md#bertasius-2021)) and **[SlowFast](https://github.com/facebookresearch/SlowFast)** ([Feichtenhofer et al., 2019](../references.md#feichtenhofer-2019)): the workable open backbones for video classification tasks including gesture. As a rough planning figure, budget for a few thousand labelled clips of the target vocabulary; the number you need depends on how many gestures you have and how similar they look.
- **Pose-based recognition.** **[MediaPipe Holistic Landmarker](https://ai.google.dev/edge/mediapipe/solutions/vision/holistic_landmarker)** and **[OpenPose](https://github.com/CMU-Perceptual-Computing-Lab/openpose)** ([Cao et al., 2021](../references.md#cao-2021)) extract body and hand keypoints from video. Classifying the extracted keypoints is usually cheaper to compute than end-to-end video classification, and it can be less sensitive to background, clothing and lighting. MediaPipe ships libraries for Android, iOS and the web, so the same pipeline can run on a phone.
- **General multimodal large language models (MLLMs).** **[Qwen2.5-VL](https://qwenlm.github.io/blog/qwen2.5-vl/)** and **[InternVL 3](https://github.com/OpenGVLab/InternVL)** can attempt open-vocabulary gesture recognition from natural-language descriptions. This helps when you must recognise a gesture the training set did not cover. Check them on your own clips before relying on them.

If you capture keypoints while recording, store them as an optional preview or a separate keypoint file. Never let pose tracking block a take or lower the video quality on a weak phone; see [Recording on a phone or in a browser](./sign-language.md#recording-on-a-phone-or-in-a-browser). If people correct or hand-place keypoints, the schema, visibility and agreement rules are in [Keypoints and pose](../image-data/keypoints-pose.md).

:::note[Editorial opinion: a starting path]

For a new African-context gesture project, the shortest defensible path is:

1. Extract MediaPipe Holistic keypoints from the target corpus.
2. Train a lightweight classifier on the keypoints, such as an LSTM, a temporal convolutional network or a small transformer.
3. Evaluate on per-region splits, because gesture recognition tends to fail region by region.

Do not skip community definition of the gesture vocabulary. A gesture that is polite in one community can be offensive in another ([Kita, 2009](../references.md#kita-2009)).

:::

## What it will actually cost you

Gesture corpora cost less per record than sign-language corpora, because the label set is smaller, the videos are shorter and annotation is faster. The figures below are the editors' rough planning estimates, not measured costs; adjust them to your team and setting.

- **Fine-tuning VideoMAE v2 or SlowFast on an existing gesture corpus.** One to two person-weeks; ten to forty GPU-hours.
- **Building a new gesture corpus for a specific community** (20-100 gestures × 30-100 clips each). Three to six months elapsed; two to five person-months. Recruiting demonstrators from the target community is the constraint; a corpus with 20 demonstrators behaves very differently from a corpus with 3 at the same clip count.
- **Adding continuous-video temporal annotation** (start/stop times per gesture in longer clips). Two to three months additional; adds ~50% to the annotation effort per clip.
- **Evaluation-only gesture sets** (200-500 clips across 10-30 demonstrators). One to three months; one to three person-months.
- **Human evaluation of gesture output.** One to two person-weeks per evaluator per 200 items. Evaluation is fast because most gestures are unambiguous at the clip level.

## Known limitations to watch for

- **Regional variation is the rule.** A "beckon" gesture can differ between coastal Kenya, Lagos and Cape Town, because the link between a gesture's form and its meaning is a cultural convention ([Kita, 2009](../references.md#kita-2009)). Evaluate per region; a headline number that hides regional performance is misleading.
- **Cultural meaning is not physical shape.** Two videos of the same hand movement can encode different meanings in different communities. Labels tied only to the physical shape misrepresent the task.
- **The same gesture can be sign-language or non-sign-language.** In a signed language, pointing to a location in the signing space is part of the grammar, used to refer to people and things ([Yin et al., 2021](../references.md#yin-2021)); in a hearing community the same movement is a co-speech deictic gesture. A model that treats them the same misses both linguistic and cultural distinctions.
- **Demonstrator variation dominates.** A model trained on a handful of demonstrators can fail badly on a new one. In practice, the number of *demonstrators* matters more than the number of *clips*. Report accuracy on demonstrators held out of training.
- **Continuous vs. isolated gesture recognition.** Isolated recognition (one clip, one gesture) is the easy case. Continuous recognition, where the model must decide in streaming video when a gesture starts and stops, is much harder. Report the two separately.
- **Faces make the data personal.** A gesture corpus with visible faces is personally identifiable information (PII). Blurring faces before training removes gaze and facial cues the model can use, but blurring at release is often required. Plan for both from the start; [Redact for training, or only for release?](../image-data/visual-privacy.md#redact-for-training-or-only-for-release) sets out the choice.
- **Consent for identifiable demonstrators.** Build consent around the fact that the demonstrator is visible in every clip. Pay demonstrators as people being filmed, not at clip-labelling rates.

## Further reading

- [Kita, 2009](../references.md#kita-2009): a review of how gestures vary across cultures, including emblems, pointing and politeness norms; the background for defining a gesture vocabulary with the community.
- [Yin et al., 2021](../references.md#yin-2021): why signed languages belong in language technology, and where they differ from gesture.
- [MediaPipe Holistic Landmarker](https://ai.google.dev/edge/mediapipe/solutions/vision/holistic_landmarker): pose, hand and face keypoints in one pipeline, with libraries for Android, iOS and the web; the usual starting point for compute-efficient gesture pipelines.
- [Wang et al., 2023](../references.md#videomae-v2-2023): VideoMAE v2, a video-classification backbone for gesture recognition from raw video.
- [State of CV in Africa, 2024](../references.md#cv-africa-2024): a survey of computer-vision research on the continent; useful for seeing where gesture recognition sits in the broader African landscape.

<details>
<summary>Additional references</summary>

- [Bertasius et al., 2021](../references.md#bertasius-2021): TimeSformer, a transformer-based video backbone; a useful comparison to VideoMAE.
- [Feichtenhofer et al., 2019](../references.md#feichtenhofer-2019): SlowFast, a two-pathway video backbone; code at [github.com/facebookresearch/SlowFast](https://github.com/facebookresearch/SlowFast).
- [Cao et al., 2021](../references.md#cao-2021): OpenPose, an older pose-estimation stack than MediaPipe, with body, hand and face keypoints; code at [github.com/CMU-Perceptual-Computing-Lab/openpose](https://github.com/CMU-Perceptual-Computing-Lab/openpose).
- [Materzynska et al., 2019](../references.md#materzynska-2019): the Jester dataset, a widely used gesture-recognition benchmark; useful for calibrating methodology, not for African-context labels.

</details>
