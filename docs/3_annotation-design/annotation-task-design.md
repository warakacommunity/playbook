---
title: Annotation Task Design and Human Factors
sidebar_position: 1
ready: true
last_update:
  date: 2026-11-24
  author: Idris Abdulmumin
---

# Annotation Task Design and Human Factors

The shape of an annotation task decides its quality long before the first label is applied. A task that is clear, well-scoped, and comfortable to do produces consistent data. One that overloads or exhausts the people doing it produces noise, no matter how good the guidelines are. Design the task for the human who will sit with it for hours.

## Estimate task complexity before you scale

Every annotation decision carries a cognitive cost, and that cost compounds over thousands of items. A binary judgment, such as whether a text is offensive or not, is far cheaper than a multi-label one, such as assigning all applicable emotions from a set of eight, which is cheaper again than span-level work like marking every named entity and its type. Estimate the complexity honestly, because it drives both the budget and the error rate. Where a task is genuinely complex, break it into a sequence of simpler decisions rather than asking for everything at once. The Masakhane named-entity effort kept its per-language tasks tractable by giving each language its own small team working to one shared, simple protocol rather than a single sprawling labelling scheme ([Adelani et al., 2022a](../references.md#adelani-2022)). Use the pilot to measure the real time per item, and let that number, not optimism, set the schedule.

## Design against annotator fatigue

Quality falls as attention does. Long unbroken sessions, monotonous batches, and ambiguous items all wear annotators down, and tired annotators reach for the easy label rather than the right one. Plan for this with short batches, regular breaks, and rotation across task types where the project allows it. Fatigue is not only a quality problem. For tasks that expose annotators to hate speech, abuse, or other distressing material, which is common in African sentiment and safety datasets, prolonged exposure becomes a wellbeing problem, and it calls for content warnings, the freedom to skip or stop, workload limits, and access to support (covered in the annotation and [data governance](../data-governance/index.md) chapters). Treating annotation as skilled, sustainable work rather than disposable clicks is also what keeps a good team available for the next project ([Sambasivan et al., 2021](../references.md#sambasivan-2021)).

## Let the interface do some of the work

The annotation tool is part of the task design, not a neutral container. A good interface removes whole classes of error before they happen. It constrains inputs to the allowed label set so a typo cannot become a new category, it shows the surrounding context an annotator needs to judge a word inside a sentence, and it uses keyboard shortcuts so the work is fast and the physical strain is low. Two constraints matter especially for African projects. Many annotators work on modest hardware over intermittent, metered connections, so the tool should be light, tolerant of dropped connections, and usable on a small screen. It should also handle the orthography of the target language properly, including diacritics and non-Latin scripts, so that what the annotator types is what gets stored; for span tasks, check too that the stored offsets still point at the text that was selected (see [Scripts, spans and offsets](../sequence-labelling/index.md#scripts-spans-and-offsets)). A task that is awkward to do will be done awkwardly. To compare candidate tools against these and other needs, use [A checklist for choosing a tool](../6_documentation/tooling.md#a-checklist-for-choosing-a-tool).

Language matters for the interface as well as the data. Where the tool allows it, show the label names, the in-task instructions and the interface itself in the annotators' working language, so that no one has to translate a category in their head on every item. Pick one interface language per project, so that everyone on a project sees the same wording and the agreement figures compare like with like. Keep the label a tool stores separate from the name annotators see; [A labeling configuration](#a-labeling-configuration) below shows how, and the [annotation guidelines template](../templates/annotation-guidelines.md#5-label-set) has columns for both.

### Design for phones and touch

Classification, rating, short transcription and recording can work well on phones. Fine geometry, precise audio or text boundaries, and span selection in long passages need a larger screen or a simpler task. Phones have no hover or modifier keys, so no required action may depend on them; keyboard shortcuts are an optional accelerator, not the only route. Provide fixed-step nudge controls and large handles for boundaries, and make delete and undo visible and forgiving. Pilot on the cheapest phone annotators use, and compare speed, quality and boundary agreement by device before scaling.

### Check script and input readiness

Before the pilot, check that every annotator's own device has a working keyboard or input method for the script and its tonal diacritics. Check right-to-left rendering, combining marks, and whole-word or span selection in scripts such as Ge'ez and Ajami. Normalise to NFC at input and export, record the input method in the guidelines, and spot-check diacritics entered through workarounds. The detailed checks are in [Scripts, spans and offsets](../sequence-labelling/index.md#scripts-spans-and-offsets) and [Non-Latin scripts in real UIs](../deployment/non-latin-scripts.md).

### Ask only applicable follow-up questions

Show follow-up questions only when they apply: target type and severity after a hateful-content label, or a reason after rejection. Export a distinct `not_applicable` value so a hidden question differs from an unanswered one, and mark required questions clearly. Decide whether each attribute belongs to the whole item or to one span or region, such as sentiment per aspect or transcription per box. This avoids irrelevant answers and unnecessary fatigue; see [Hate Speech](../11_text-classification/hate-speech-analysis.md) and [Sentiment Analysis](../11_text-classification/sentiment-analysis.md).

### Use rapid mode only with guardrails

For low-variance, single-choice judgements such as straightforward topic triage, one keypress or click per item can increase throughput. It does not suit spans, regions, free text or transcription, and it can encourage rushing. Retain hidden gold, review, and per-annotator speed and agreement monitoring. Keep varied or difficult items one at a time. A list view reduces round trips on weak connections but increases cognitive load, so choose its size through the pilot rather than a universal rule.

## A labeling configuration

These principles are not abstract: they are choices you make in the labeling configuration. The examples throughout this playbook use the Label Studio configuration format, an open XML format that several annotation tools support, so the configs here are portable rather than tied to any one product. A config is a small, readable document that defines exactly what the annotator sees and what they are allowed to do. The example below sets up a single-label sentiment task of the kind behind AfriSenti ([Muhammad et al., 2023](../references.md#muhammad-2023)).

```xml
<View>
  <!-- The source text sits in its own card so the annotator can always tell
       the content apart from the instruction prompts and labels below it. -->
  <View style="background:#FBF7F0; border:1px solid #E7DDCB; border-radius:8px; padding:14px 16px; margin-bottom:18px;">
    <Text name="text" value="$text"/>
  </View>

  <!-- One choice only, drawn from a fixed set: a typo cannot become
       a new category, and the decision stays a cheap binary-style call. -->
  <Choices name="sentiment" toName="text" choice="single" required="true">
    <Choice value="Positive" hotkey="1"/>
    <Choice value="Neutral"  hotkey="2"/>
    <Choice value="Negative" hotkey="3"/>
  </Choices>

  <!-- An explicit escape hatch, so a tired or unsure annotator skips
       rather than guessing. These get routed to adjudication. -->
  <Choices name="flag" toName="text" choice="single">
    <Choice value="Code-mixed / wrong language" hotkey="8"/>
    <Choice value="Unclear, needs a second opinion" hotkey="9"/>
  </Choices>
</View>
```

Three of the design points above are enforced directly in this config. `choice="single"` with a fixed `<Choice>` set constrains the input to the allowed labels, so the interface, not the guideline document, prevents stray categories. The `hotkey` attributes let an annotator work entirely from the keyboard, which is both faster and gentler on the hands over a long session. And the `flag` block gives the explicit skip route the fatigue discussion calls for, rather than forcing a guess. Wrapping the text in its own styled `<View>` is a small touch that matters over thousands of items: it sets the content apart from the prompts and labels, so an annotator never confuses what they are reading with what they are being asked.

The labels in a config are also the codes your exported data will carry, so treat them as stable identifiers. In the Label Studio format, a choice's `value` is what the annotator sees, and an optional `alias` replaces it in the stored results ([HumanSignal, n.d.](../references.md#labelstudio-choice-tag)). Writing `<Choice value="Positive" alias="POS"/>` lets you later change the display text, for example to the annotators' own word for "positive", without changing a single exported label. Changing a stored code, by contrast, is a data migration: record it in the guideline's change log with an old-to-new mapping. When several projects share an ontology, for example one project per language, keep one canonical label list and build every project's config from it rather than copying and editing it by hand, so that the same category has the same code in every language. Adding a label is cheap in the tool, but items labelled before it existed may need a check for the new category. Removing or merging labels needs a mapping or re-annotation of the affected items.

Before importing the full dataset, render this configuration on a few representative tasks. Check that the source text is visually distinct from the instructions, every label and shortcut works, long text and target-script characters display correctly, and the skip route is easy to find.

For a span-level task such as named-entity recognition, the same format expresses a harder job by swapping `<Choices>` for `<Labels>`, which lets the annotator select a stretch of text and tag it:

```xml
<View>
  <Labels name="entities" toName="text">
    <Label value="PER" hotkey="1" background="#e8743b"/>
    <Label value="ORG" hotkey="2" background="#19a979"/>
    <Label value="LOC" hotkey="3" background="#945ecf"/>
    <Label value="DATE" hotkey="4" background="#13a4b4"/>
  </Labels>
  <Text name="text" value="$text"/>
</View>
```

The `$text` field in both configs maps straight onto the `text` field in the cleaned JSONL records from the [Data Collection](../data-collection/data-cleaning-preprocessing) chapter, so the import step is just uploading that file: each line becomes one task, and the provenance fields ride along unchanged. Starting from a tiny config like this, and growing it only when a pilot shows it is needed, keeps the task tractable in the way the complexity discussion above recommends.

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

For open-ended concept tagging, let annotators choose from a curated list rather than typing free text. Give each entry a stable external or project-local ID, a label and description, and aliases including local-language names and spelling or diacritic variants. Keep the list in version-controlled TSV or CSV, and store its version and the entry ID with every annotation, not only the display label. Deprecate entries in use rather than deleting or renumbering them.

The same rule covers attributes on spans, relations, coreference chains and whole documents. Removing an attribute from the interface does not remove values already stored, so include its migration in the schema change log. The [agricultural ontology](../agri-advisory/diagnosis-labelling.md#what-the-data-looks-like) and [sign-language lexicon](../sign-language-video/sign-language.md#glossing-conventions) are worked examples; [entity linking](../sequence-labelling/ner.md#beyond-spans-linking-entities) adds an optional external-reference layer.

## Designing rating scales

Choose the number of points through the pilot and the decision the score must support. Decide whether a neutral midpoint is wanted rather than assuming odd or even is inherently better. Give every point a one-line anchor and example, visible in the interface. Offer `cannot_judge` or `not_applicable` separately instead of overloading the midpoint. For numeric input, fix the minimum, maximum and step. Treat ratings as ordinal in agreement and aggregation, as in [Absolute rating](./human-evaluation-designs.md#absolute-rating).

## Annotating across time

For audio and video, choose the unit first: frame, time span or whole clip. Define onset and offset operationally, whether events may overlap, and whether an exhaustive background label is needed. Set any minimum duration and minimum gap in the project guideline. Faster playback can help find events in long footage, but place boundaries slowly or frame by frame. Agree the boundary tolerance before measuring agreement. Model pre-segmentation with human correction is acceptable when its provenance is documented.

Apply these conventions with the task-specific guidance for [video](../sign-language-video/video.md), [audio understanding](../audio-understanding/index.md) and [speaker diarization](../speaker-diarization/index.md).

## From a config to a running project

Defining the config is only the first step. To run and verify the project:

1. Define and version the configuration and guidelines.
2. Import a small, representative task set with its provenance fields.
3. Validate rendering, input constraints, shortcuts, media loading and offline behaviour where needed.
4. Pilot the task, inspect errors and revise the configuration or guidelines.
5. Annotate the pilot and export the results.
6. Verify that labels, annotator identities, timestamps, source identifiers and provenance survive the export before scaling.
