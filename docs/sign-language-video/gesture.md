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

![The same gesture means different things by region, so define the vocabulary with the community](images/gesture-cultural.svg)

## What the data looks like

Gesture data is video or sensor recordings of gestures, labelled with what each one means. The labels can come from cameras or from wearable sensors that capture motion directly. The point that matters most for African data is that gesture is cultural: the form-meaning link of a gesture is a cultural convention, so the same movement can mean different things in different places ([Kita, 2009](../references.md#kita-2009)), and gestures that matter in an African community may have no equivalent in datasets built elsewhere. A gesture vocabulary has to be defined with the community whose gestures they are, rather than assumed from a foreign taxonomy, or the dataset will encode the wrong meanings.

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

Annotating gesture is marking which gesture occurs and, in continuous video, when it starts and stops, which makes it a temporal labelling task with the same boundary-ambiguity issues as audio events. Define the gesture set and its cultural meanings clearly, recruit annotators from the relevant community, and measure agreement on shared clips. The config marks which gesture occurs and, on the timeline, when it starts and stops:

```xml
<View>
  <Video name="video" value="$video"/>
  <Labels name="gesture" toName="video">
    <Label value="Beckon" background="#1F5B3F"/>
    <Label value="Refuse" background="#C66A3D"/>
    <Label value="Count"  background="#E0A458"/>
  </Labels>
</View>
```

Gesture recognition is evaluated with accuracy and [F1](https://en.wikipedia.org/wiki/F-score), with per-class reporting where the gesture set is imbalanced, and a human check for the culturally loaded categories that automatic scores cannot judge.

## The 2026 modelling landscape

Gesture recognition in 2026 sits at a genuinely different scale from sign language: the tasks are looser, the label sets smaller, and the throughput per corpus much higher. The workable open-model references:

- **Video-classification backbones.** **VideoMAE v2** ([Wang et al., 2023](../references.md#videomae-v2-2023)), **TimeSformer** ([Bertasius et al., 2021](../references.md#bertasius-2021)) and **[SlowFast](https://github.com/facebookresearch/SlowFast)** ([Feichtenhofer et al., 2019](../references.md#feichtenhofer-2019)): the workable open backbones for video classification tasks including gesture. As a rough planning figure, budget for a few thousand labelled clips of the target vocabulary; the number you need depends on how many gestures you have and how similar they look.
- **Pose-based recognition.** **[MediaPipe Holistic Landmarker](https://ai.google.dev/edge/mediapipe/solutions/vision/holistic_landmarker)** and **[OpenPose](https://github.com/CMU-Perceptual-Computing-Lab/openpose)** ([Cao et al., 2021](../references.md#cao-2021)) extract body and hand keypoints from video. Classifying the extracted keypoints is usually cheaper to compute than end-to-end video classification, and it can be less sensitive to background, clothing and lighting. MediaPipe ships libraries for Android, iOS and the web, so the same pipeline can run on a phone.
- **General MLLMs.** **[Qwen2.5-VL](https://qwenlm.github.io/blog/qwen2.5-vl/)**, **[InternVL 3](https://github.com/OpenGVLab/InternVL)**: can attempt open-vocabulary gesture recognition from natural-language descriptions, useful when the deployment surface requires labelling a gesture the training set did not cover. Check them on your own clips before relying on them.

If you capture keypoints at recording time, treat pose tracking as an optional preview or a separate keypoint file, never as a reason to block a take or lower the video quality on a weak phone; see [Recording on a phone or in a browser](./sign-language.md#recording-on-a-phone-or-in-a-browser). If people correct or hand-place keypoints, the schema, visibility and agreement rules are in [Keypoints and pose](../image-data/keypoints-pose.md).

**Editorial opinion.** For a new African-context gesture project, the shortest defensible path is: extract MediaPipe Holistic keypoints from the target corpus, train a lightweight classifier (LSTM, temporal convolutional network, or small transformer) on the keypoints, and evaluate on per-region splits, because the failure mode of gesture recognition is systematically regional. Do not skip community definition of the gesture vocabulary. A gesture that is polite in one community is offensive in another; a taxonomy borrowed from a foreign gesture corpus will encode the wrong labels.

## What it will actually cost you

Gesture corpora are cheaper per-record than sign-language corpora because the label set is smaller, the videos are shorter, and annotation is faster. Rough order-of-magnitude:

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
- **Video PII on people-full-frame data.** A gesture corpus with faces visible is PII. Blurring faces during preprocessing degrades the model's ability to use gaze and facial cues, but blurring during release is often required. Design for both training and release from the start. [Redact for training, or only for release?](../image-data/visual-privacy.md#redact-for-training-or-only-for-release) sets out the choice.
- **Continuous vs. isolated gesture recognition.** Isolated recognition (one clip = one gesture) is the easy case; continuous recognition (streaming video, model must decide when a gesture starts and stops) is substantially harder. Report the two separately.
- **Consent for identifiable demonstrators.** Video is fully identifiable; blurring compromises the model. Consent frameworks must be built around the demonstrator being visible in every clip, and remuneration must be at rates comparable to filming, not clip-labelling.

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
