---
title: Training and Guidelines
sidebar_position: 2
---

# Training and Guidelines

Annotators are only as consistent as the instructions they are given and the training that aligns them. Much of what looks like annotator disagreement is really guideline disagreement, and most of that is fixable before the main task starts. This page is about getting the guidelines and the training right early, while it is still cheap.

## Write guidelines around examples, not definitions

A definition tells an annotator what a label means. An example shows them how to apply it. Good guidelines do both and lean on the examples. For each label, give clear positive examples, give negative examples that mark the boundary against neighbouring labels, and include the edge cases that would otherwise be decided inconsistently by each annotator alone. Say explicitly how to treat uncertain, mixed, or "none of the above" items, because those are where agreement quietly breaks down. African-language guidelines carry an extra burden that English ones rarely face. They have to say how annotators should treat dialectal variation, code-switching between the target language and a colonial language, inconsistent or competing orthographies, and culturally specific expressions whose meaning a non-member would miss. Decide these cases once, in the guideline, rather than thousands of times, differently, in the data.

## Train and calibrate until annotators converge

Training turns a written guideline into shared judgment, so run it before annotation starts and give it structure rather than leaving it to a read-through. The Masakhane named-entity work offers a concrete model. For MasakhaNER 2.0, each language had a coordinator who first annotated a set of sentences themselves and was trained across two online workshops, and who then trained a team of three native-speaker annotators for that language ([Adelani et al., 2022](../references.md#adelani-2022)). Calibration rounds apply the same logic at a smaller scale: have several annotators label the same sample, compare their labels, discuss the disagreements openly, and repeat until agreement reaches an acceptable level before the full task begins. AfriSenti reached inter-annotator agreement above 0.70 on sentiment by combining native speakers with clear guidelines and exactly this kind of calibration ([Muhammad et al., 2023](../references.md#muhammad-2023)). Agreement reached this way is earned, not assumed.

## Pilot, then iterate the design

A pilot is a small dry run of the whole task, and its purpose is to find what is broken while fixing it is still cheap. Annotate a small but representative subset with your real annotators and your real tool, then look for the unclear instructions, the labels that collide, and the items that take far longer than expected. Measure consistency and difficulty, collect the annotators' own feedback on what confused them, and feed all of it back into the guidelines, the label set, and the workflow. Expect to revise. A pilot that changes nothing usually means nobody looked hard enough.

## Prove the design with a minimum viable dataset

Before committing to full-scale annotation, build a minimum viable dataset, a small and representative slice annotated end to end. It validates the things that are expensive to get wrong at scale: whether the label schema actually covers the data, whether the workflow and tool hold up, and whether the per-item rate makes the full project affordable. Treat its results as a decision point. If the minimum viable dataset comes out clean and consistent, scale up. If it does not, redesign the task now, rather than after ten thousand items have inherited the flaw.
