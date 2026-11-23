---
title: Model-Assisted Annotation
sidebar_position: 5
ready: true
last_update:
  date: 2026-11-22
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
- **Images and video.** Promptable segmentation models turn a click or a box into a draft mask: [Segmentation](../image-data/segmentation.md#the-2026-modelling-landscape).
- **Sign language.** Model-proposed segment boundaries or pose overlays are a first draft only: fluent signers check every boundary, the data records which segments the machine proposed, and a sample is double-annotated from scratch ([Fort and Sagot, 2010](../references.md#fort-sagot-2010)). For the annotation tiers themselves, see [Sign language](../sign-language-video/sign-language.md#the-annotation-model).
- **LLM drafts.** Constraining drafts to the label set and when not to use an LLM: [LLM-Assisted Data](../7_llm-assisted-task/index.md).

