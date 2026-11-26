---
title: Training and Guidelines
sidebar_position: 2
ready: true
last_update:
  date: 2026-11-26
  author: Shamsuddeen Hassan Muhammad
---

# Training and Guidelines

Annotators are only as consistent as the instructions they are given and the training that aligns them. Much of what looks like annotator disagreement is really guideline disagreement, and most of that can be fixed before the main task starts. This page is about getting the guidelines and the training right early, while it is still cheap.

:::tip[Key points]

- Build guidelines around examples, including negative examples and edge cases, not definitions alone.
- Decide dialect, code-switching, orthography and cultural cases once, in the guideline.
- Run calibration rounds until annotators agree, before the full task begins.
- Keep the guidelines one click away from the labelling screen, with the version shown.
- Pilot the whole task on a small slice, and scale only if agreed go/no-go criteria are met.

:::

## Write guidelines around examples, not definitions

A definition tells an annotator what a label means. An example shows them how to apply it. Good guidelines do both and lean on the examples. For each label, give:

- clear **positive examples**;
- **negative examples** that mark the boundary against neighbouring labels;
- the **edge cases** that each annotator would otherwise decide differently.

Say explicitly how to treat uncertain, mixed or "none of the above" items, because those are where agreement quietly breaks down.

African-language guidelines carry extra work that English ones rarely face. They have to say how annotators should treat:

- dialectal variation;
- code-switching between the target language and another language, often a colonial one such as English, French or Portuguese;
- inconsistent or competing orthographies (spelling systems);
- culturally specific expressions whose meaning an outsider would miss.

Decide these cases once, in the guideline, rather than thousands of times, differently, in the data.

:::tip[Template: Annotation guidelines]
A fill-in guidelines document modelled on MasakhaNER 2 and AfriSenti. It covers definitions, a step-by-step decision procedure, the label set, orthography and diacritics, agreement targets, adjudication, and a change log. [Open the annotation guidelines template](../templates/annotation-guidelines.md).
:::

## Train and calibrate until annotators converge

Training turns a written guideline into shared judgement, so run it before annotation starts and give it structure rather than leaving it to a read-through. The Masakhane named-entity work offers a concrete model. For MasakhaNER 2.0, each language had a coordinator who first annotated a set of sentences themselves and was trained across two online workshops, and who then trained a team of three native-speaker annotators for that language ([Adelani et al., 2022a](../references.md#adelani-2022)).

Calibration rounds apply the same logic at a smaller scale:

1. Have several annotators label the same sample.
2. Compare their labels.
3. Discuss the disagreements openly, and update the guideline where it was unclear.
4. Repeat until agreement reaches an acceptable level, then start the full task.

Even with native-speaker annotators, agreement differs by language. AfriSenti, annotated by native speakers, reported intermediate to good sentiment agreement (free-marginal kappa between 0.40 and 0.75) for its languages, except Afaan Oromo, where annotation was hardest and agreement was much lower ([Muhammad et al., 2023a](../references.md#muhammad-2023)). Agreement is earned, not assumed, so measure it for each language.

Continue calibration inside the live task. Serve a new annotator only gold items (items with a known correct answer) for their first `N` assignments, with `N` chosen for the task and stated in the project plan. This gives each person an early score, and their onboarding labels are not counted as production labels. Annotators move on to ordinary items once they reach that count. Any retraining or pause is a separate decision, made on enough evidence and through the fair process in [Data Quality](../4_data-quality/index.md#act-on-annotator-signals-fairly). Onboarding uses up gold items quickly, so top up the pool as described in [Use gold data and control checks](../4_data-quality/index.md#use-gold-data-and-control-checks).

## Keep the guidelines where annotators work

A guideline that lives in a separate document gets read once and then forgotten. Put it inside the labelling workflow instead:

- show it the first time an annotator opens the task;
- afterwards keep it one step away from the labelling screen, so checking a rule costs a click rather than a search;
- put the rules annotators use most near the top, because annotators skim.

For speech, video and image tasks, written rules are not enough. Embed short audio clips, video clips or images as worked examples next to the rule they illustrate, including the boundary cases. Keep clips short so they load on slow connections.

Treat the copy annotators see as a view of the versioned master in your [annotation guidelines template](../templates/annotation-guidelines.md), not as a second document. Show the version number in both places, update the working copy whenever the change log gets a new entry, and tell annotators what changed. Examples taken from the dataset carry the same consent and privacy limits as the data itself, so store them where only project members can open them, not behind a public link.

## Pilot the design, then decide whether to scale {#pilot-then-iterate-the-design}

A pilot is a small dry run of the whole task. Its purpose is to find what is broken while fixing it is still cheap. Annotate a small but representative slice, typically 50 to 200 items, end to end with your real annotators, your real guidelines and your real tool. Treat it as a minimum viable dataset: the smallest slice that tests the things that are expensive to get wrong at scale.

During the pilot, look for:

- **Unclear instructions and colliding labels.** Check whether the label schema actually covers the data, and where annotators disagree.
- **Slow or hard items.** Note the items that take far longer than expected, and whether the workflow and tool hold up.
- **Annotators who need more calibration.** The pilot is also where you first see annotators whose labels look random or careless. Treat this as a signal for feedback and retraining, handled through the staged process in [Act on annotator signals fairly](../4_data-quality/index.md#act-on-annotator-signals-fairly), not as grounds for removal on a pilot score alone.
- **The real annotation rate.** Measure items per hour, and use that rate, not a guess, to plan the schedule and budget.

Measure consistency and difficulty, collect the annotators' own feedback on what confused them, and feed all of it back into the guidelines, the label set and the workflow. Expect to revise. A pilot that changes nothing usually means nobody looked hard enough.

Then make a go/no-go decision against criteria agreed before the pilot started, for example:

- agreement is close to your target;
- the guidelines answered most of the annotators' questions;
- the full dataset fits the budget and timeline at the measured rate.

If any answer is no, revise the guidelines, the task or the scope and pilot again. Do not scale a design that is not working: redesigning now is far cheaper than after ten thousand items have inherited the flaw.
