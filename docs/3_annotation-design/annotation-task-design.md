---
title: Annotation Task Design and Human Factors
sidebar_position: 1
ready: true
last_update:
  date: 2026-11-26
  author: Idris Abdulmumin
---

# Annotation Task Design and Human Factors

The shape of an annotation task decides its quality long before the first label is applied. A task that is clear, well-scoped, and comfortable to do produces consistent data. One that overloads or exhausts the people doing it produces noise, no matter how good the guidelines are. Design the task for the human who will sit with it for hours.

:::tip[Key points]

- Estimate task complexity in a pilot, and split complex jobs into simpler decisions.
- Plan against fatigue, and protect annotators who see harmful content.
- Let the interface prevent errors: a fixed label set, shortcuts, the annotators' language and script, and phones where needed.
- Write each task as a short specification, and keep stored label codes stable.
- Pilot the whole path, from import to export, before you scale.

:::

## Estimate task complexity before you scale

Every annotation decision carries a cognitive cost, and that cost adds up over thousands of items. Costs rise roughly in this order:

- **Binary judgement**, such as whether a text is offensive or not: cheapest.
- **Multi-label judgement**, such as choosing all emotions that apply from a set of eight: more costly.
- **Span-level work**, such as marking every named entity and its type: most costly.

Estimate the complexity honestly, because it drives both the budget and the error rate. Where a task is genuinely complex, break it into a sequence of simpler decisions rather than asking for everything at once. The Masakhane named-entity effort kept its per-language tasks manageable by giving each language its own small team, a language coordinator and three native-speaker annotators, working to one shared annotation guide with four entity types ([Adelani et al., 2022a](../references.md#adelani-2022)). Use the pilot to measure the real time per item, and let that number, not optimism, set the schedule.

Clean those timings first. Time per item usually includes breaks and items left open, so ask annotators to submit or leave an item before stepping away, set aside clear outliers, and use the median rather than the mean; see [Cost and Resource Planning](../2_data-collection/6_cost-resource-planning.md#time-estimation).

## Design against annotator fatigue

Quality falls as attention does. Long unbroken sessions, monotonous batches, and ambiguous items all wear annotators down, and tired annotators reach for the easy label rather than the right one. Plan for this with short batches, regular breaks, and rotation across task types where the project allows it.

Fatigue is not only a quality problem. For tasks that expose annotators to hate speech, abuse, or other distressing material, which is common in African sentiment and safety datasets, prolonged exposure becomes a well-being problem; see [Protect annotators from harmful content](#protect-annotators-from-harmful-content). Treating annotation as skilled, sustainable work rather than disposable clicks is also what keeps a good team available for the next project ([Sambasivan et al., 2021](../references.md#sambasivan-2021)).

## Protect annotators from harmful content

Work with harmful, offensive or emotionally distressing content needs explicit safeguards. This covers hate speech and abuse, but also emotionally intense audio, as in [speech emotion recognition](../speech-emotion-recognition/index.md), and the writing and reading of harmful prompts in [red-teaming](../text-generation/generation.md). Protecting annotators improves both their well-being and the quality of their labels.

- **Before the task.** Warn annotators about the kind of content they will see. Ask for informed opt-in, and let anyone opt out of sensitive tasks.
- **During the task.** Allow annotators to skip items or withdraw without penalty. Control exposure with content filtering, workload limits, regular breaks and task rotation.
- **Support.** Give training and a clear safety protocol. Provide access to psychological support or counselling, and hold team debriefs.
- **Ongoing.** Monitor well-being, communicate respectfully and protect privacy. Pay fairly for the nature of the work, and follow ethical and legal standards.

Record skips and their operational reasons without asking anyone to disclose personal details publicly. [Track skips and unfinished items](./workflow-adjudication.md#track-skips-and-unfinished-items) explains how to reassign or review them and how to report their effect on the dataset.

![Annotator safety and mental health practices for distressing content: consent and opt-out; tiered task design, with trained specialists on high-risk content; pre-screening and filtering of extreme content; exposure limits with breaks and rotation; psychological support and safe ways to report distress; training and briefing; ongoing monitoring for burnout; and fair pay and ethics, with higher pay for higher-risk tasks.](../11_text-classification/images/annotator-safety-and-mental-health-1ijc2ov5oy4.svg)

Show a content warning and ask for opt-in before any harmful-content task, for example:

:::warning[Content warning]

This task contains hate speech, offensive, or distressing material.

- You may skip any item, take breaks at any time, or withdraw with no penalty.
- If you feel distressed, stop and contact the support team.

Checkbox: I understand and choose to participate in this task.

:::

## Let the interface do some of the work

The annotation tool is part of the task design, not a neutral container. A good interface removes whole classes of error before they happen:

- It **limits input to the allowed label set**, so a typo cannot become a new category.
- It **shows the surrounding context** an annotator needs, for example the sentence around a word.
- It **offers keyboard shortcuts**, so the work is fast and the physical strain is low.

Two needs matter especially for African projects. First, many annotators work on modest hardware over intermittent, metered connections, so the tool should be light, tolerant of dropped connections, and usable on a small screen. Second, it should handle the orthography of the target language, including diacritics and non-Latin scripts, so that what the annotator types is what gets stored. For span tasks, also check that the stored offsets still point at the selected text (see [Scripts, spans and offsets](../sequence-labelling/index.md#scripts-spans-and-offsets)).

A task that is awkward to do will be done awkwardly. To compare candidate tools against these and other needs, use [A checklist for choosing a tool](../6_documentation/tooling.md#a-checklist-for-choosing-a-tool).

Language matters for the interface as well as the data. Where the tool allows it, show the label names, the in-task instructions and the interface itself in the annotators' working language, so that no one has to translate a category in their head on every item. Pick one interface language per project, so that everyone sees the same wording and the agreement figures compare like with like. Keep the label code that is stored separate from the name annotators see; [A task specification](#a-task-specification) below shows how, and the [annotation guidelines template](../templates/annotation-guidelines.md#5-label-set) has columns for both.

### Design for phones and touch

Classification, rating, short transcription and recording can work well on phones. Fine geometry, precise audio or text boundaries, and span selection in long passages need a larger screen or a simpler task. Phones have no hover or modifier keys, so no required action may depend on them; keyboard shortcuts are an optional accelerator, not the only route. Provide fixed-step nudge controls and large handles for boundaries, and make delete and undo visible and forgiving. Pilot on the cheapest phone annotators use, and compare speed, quality and boundary agreement by device before scaling.

### Check script and input readiness

Before the pilot, check that every annotator's own device has a working keyboard or input method for the script, including any tonal diacritics. Check right-to-left rendering for Arabic-script (Ajami) text, combining marks, and whole-word or span selection in every script the corpus uses, such as Ge'ez and Ajami. Normalise source text to NFC before import and do not normalise it again after annotation, because that can shift stored offsets ([Freeze the text before span annotation](../2_data-collection/7_data-cleaning-preprocessing.md#freeze-the-text-before-span-annotation)); normalise text that annotators type, such as transcriptions, when it is stored. Record the input method in the guidelines, and spot-check diacritics entered through workarounds. The detailed checks are in [Scripts, spans and offsets](../sequence-labelling/index.md#scripts-spans-and-offsets) and [Non-Latin scripts in real UIs](../deployment/non-latin-scripts.md).

### Ask only applicable follow-up questions

Show follow-up questions only when they apply: target type and severity after a hateful-content label, or a reason after rejection. Export a distinct `not_applicable` value so a hidden question differs from an unanswered one, and mark required questions clearly. Decide whether each attribute belongs to the whole item or to one span or region, such as sentiment per aspect or transcription per box. This avoids irrelevant answers and unnecessary fatigue; see [Hate Speech](../11_text-classification/hate-speech-analysis.md) and [Sentiment Analysis](../11_text-classification/sentiment-analysis.md).

### Use one-click labelling only with guardrails

Some interfaces let annotators label a list of items with one keypress or click each. For simple, single-choice judgements, such as straightforward topic triage, this can raise throughput. It does not suit spans, regions, free text or transcription, and it can encourage rushing.

- Keep hidden gold items, review, and per-annotator speed and agreement checks.
- Keep varied or difficult items to one at a time.
- Showing many items on one page saves round trips on weak connections but adds cognitive load, so set the page size in the pilot rather than by a fixed rule.

## A task specification

These principles are not abstract: they become concrete choices when you specify the task. A task specification is a short, readable statement of exactly what the annotator sees and what they are allowed to do. Write it before you set up any tool, and keep it with the guidelines. The example below sets up a single-label sentiment task of the kind behind AfriSenti ([Muhammad et al., 2023a](../references.md#muhammad-2023)).

**Task specification: sentiment (single label)**

| Setting | Value |
|---|---|
| Annotator sees | The source text, in its own visually distinct card, apart from the instructions and labels |
| Annotator gives | One sentiment label: Positive, Neutral or Negative |
| Choice | Exactly one; required |
| Shortcuts | 1 = Positive, 2 = Neutral, 3 = Negative; 8 and 9 for the two flags |
| Notes | Optional flag: "Code-mixed / wrong language" or "Unclear, needs a second opinion". Flagged items go to adjudication. |

Each row carries a design point from this page:

- **A fixed set of labels, exactly one required.** The interface, not the guideline document, prevents stray categories.
- **Shortcuts.** An annotator can work entirely from the keyboard, which is faster and gentler on the hands over a long session.
- **The flag.** It gives a tired or unsure annotator an explicit route to set an item aside instead of guessing, as the fatigue section calls for.
- **The text in its own card.** Over thousands of items, setting the content apart from the prompts and labels means an annotator never confuses what they are reading with what they are being asked.

### Keep label codes stable

The labels in a specification are also the codes your exported data will carry, so treat them as stable identifiers. Keep the stored code separate from the display name, for example the code `POS` shown as "Positive". You can then change the display text, for example to the annotators' own word for "positive", without changing a single exported label.

- **Changing a stored code** is a data migration: record it in the guideline's change log with an old-to-new mapping.
- **Sharing a label set across projects**, for example one project per language, needs one canonical label list. Build every project's setup from it rather than copying and editing by hand, so that the same category has the same code in every language.
- **Adding a label** is cheap, but items labelled before it existed may need a check for the new category.
- **Removing or merging labels** needs a mapping or re-annotation of the affected items.

### Render it before you import

Before importing the full dataset, set the specification up in your tool and try it on a few representative items. Check that the source text is visually distinct from the instructions, every label and shortcut works, long text and target-script characters display correctly, and the flag is easy to find.

### A span-level specification

A span-level task such as named-entity recognition is a harder job: the annotator selects a stretch of text and tags it.

**Task specification: named entities (spans)**

| Setting | Value |
|---|---|
| Annotator sees | The source text |
| Annotator gives | Spans of text, each tagged PER, ORG, LOC or DATE, with a distinct colour per type |
| Choice | One type per span; any number of spans per text, including none |
| Shortcuts | 1 = PER, 2 = ORG, 3 = LOC, 4 = DATE |

In both specifications, the text the annotator sees is the `text` field of the cleaned JSONL records from [Data Cleaning and Preprocessing](../2_data-collection/7_data-cleaning-preprocessing.md). Each line becomes one item, and its provenance fields travel with it unchanged. Start from a small specification like these and grow it only when a pilot shows it is needed; this keeps the task manageable, as the complexity section recommends.

Pilot span selection with short and long entities, adjacent entities, punctuation and every target script. Verify that the exported text and character offsets reproduce the selected spans exactly. [Freeze the text before span annotation](../2_data-collection/7_data-cleaning-preprocessing.md#freeze-the-text-before-span-annotation) explains the normalisation and export checks that make those offsets stable.

## Choose the label structure

| Structure | Use when | Main caution |
| --- | --- | --- |
| Single choice | Exactly one category applies | Include an explicit uncertain or out-of-scope route. |
| Multiple choice | Several independent categories can apply | Define whether an empty set is valid and how agreement is scored. |
| Hierarchy | The set is large or has natural groupings | Depth and inconsistent stopping points add work. |
| Free text with review | The answer cannot be anticipated | Requires normalisation and review; it is not a controlled vocabulary. |

For a hierarchy, store the full ancestor path so labels can be rolled up. Decide whether annotators must reach a leaf or may stop at a parent when unsure, and monitor that stop-at-parent rate. Keep the tree easy to scan, add search for long lists and an explicit uncertain node, and version the taxonomy. Report agreement per level alongside exact full-path agreement; the [agricultural diagnosis example](../agri-advisory/diagnosis-labelling.md#quality-control) shows why.

## Structured attributes and concept linking

For open-ended concept tagging, let annotators choose from a curated concept list (a controlled vocabulary) rather than typing free text. Free text brings typos and spelling variants that later have to be merged by hand. For each entry in the list, keep:

- a stable identifier, either from an external resource or local to the project;
- a label and a short description;
- aliases, including local-language names and spelling or diacritic variants.

Keep the list in a version-controlled file, such as TSV or CSV. Store the list's version and the entry's identifier with every annotation, not only the display label. Mark entries that are in use as deprecated rather than deleting or renumbering them.

The same rule covers attributes on spans, relations, coreference chains and whole documents. Removing an attribute from the interface does not remove values already stored, so include its migration in the schema change log. The [agricultural ontology](../agri-advisory/diagnosis-labelling.md#what-the-data-looks-like) and [sign-language lexicon](../sign-language-video/sign-language.md#glossing-conventions) are worked examples; [entity linking](../sequence-labelling/ner.md#beyond-spans-linking-entities) adds an optional external-reference layer.

## Designing rating scales

There is no universally best number of points. In one comparison of scales with 2 to 11 points, scales with two to four points were the least reliable, valid and discriminating, the indices rose up to about seven points, and test-retest reliability tended to fall beyond ten. The authors still call the question unresolved, note that a short scale can suit rating under time pressure, and caution against generalising beyond their survey setting ([Preston and Colman, 2000](../references.md#preston-2000)). Use such findings as a starting range, then choose the number of points through the pilot and the decision the score must support. Decide whether a neutral midpoint is wanted rather than assuming odd or even is inherently better. Give every point a one-line anchor and example, visible in the interface. Offer `cannot_judge` or `not_applicable` separately instead of overloading the midpoint. For numeric input, fix the minimum, maximum and step. Treat ratings as ordinal in agreement and aggregation. The rules shared by every rating task are in [Absolute rating](./human-evaluation-designs.md#absolute-rating).

## Annotating across time

For audio and video, choose the unit first: frame, time span or whole clip. Define onset and offset operationally, whether events may overlap, and whether an exhaustive background label is needed. Set any minimum duration and minimum gap in the project guideline. Faster playback can help find events in long footage, but place boundaries slowly or frame by frame. Agree the boundary tolerance before measuring agreement. Model pre-segmentation with human correction is acceptable when its provenance is documented, as described in [Record what the model did](./model-assisted-annotation.md#record-what-the-model-did).

Apply these conventions with the task-specific guidance for [video](../sign-language-video/video.md), [audio understanding](../audio-understanding/index.md) and [speaker diarization](../speaker-diarization/index.md).

## From a specification to a running project

Writing the specification is only the first step. To run and verify the project:

1. Write and version the task specification and guidelines.
2. Import a small, representative set of items with their provenance fields.
3. Check rendering, input constraints, shortcuts, media loading and offline behaviour where needed.
4. Pilot the task, inspect errors, and revise the specification or guidelines.
5. Annotate the pilot and export the results.
6. Before scaling, verify that labels, annotator identities, timestamps, source identifiers and provenance survive the export.
