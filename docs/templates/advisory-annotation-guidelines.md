---
sidebar_position: 8
title: Advisory annotation guidelines
ready: true
last_update:
  date: 2026-09-30
  author: Shamsuddeen Hassan Muhammad
---

# Advisory annotation guidelines

*Last reviewed: 2026-09-30.*

*The role sheets for a crop-advisory dataset: one sheet each for the field collector, the agronomist, the advisory author, the linguistic reviewer, the speaker and the preference rater, plus the fields of the weekly agreement report. Each sheet is what one person holds while they work, so each fits on one or two printed pages. The defaults come from the worked example in the [Agricultural Advisory Data](../agri-advisory/index.md) chapter; change them where your crops or languages differ.*

## How to use this template

1. Copy the sheet for each role into your project's rubric folder, one file per language, named `[LANG]-v1.md`.
2. Replace every `[PLACEHOLDER]` with a real value. The language lead owns the vernacular term list and the examples; the agronomist lead owns the ontology and the safety rules.
3. Translate the collector, speaker and rater sheets into the working language. Agronomists and reviewers usually work from the English master with the vernacular term list beside it.
4. Version the sheets. Every review decision records the rubric version it applied, so a change to a sheet must bump the version and go in the change log at the end.
5. Hand out the sheet, then train on it with twenty real items before anyone works unsupervised. Corner cases found in that session go into the sheet before the next cohort starts.

This template pairs with the generic [annotation guidelines template](./annotation-guidelines.md), which covers definitions, decision trees and the change log for any labelling task. Use that one for the project-wide document and this one for the per-role sheets. The QA loop the sheets feed is described in [workflow and adjudication](../3_annotation-design/workflow-adjudication.md); consent wording is in the [consent form template](./consent-form.md).

---

## [PROJECT NAME] role sheets

**Rubric version:** [X.Y] · **Date:** [YYYY-MM-DD] · **Language:** [LANGUAGE] ([ISO 639-3]) · **Ontology version:** [ONTOLOGY_VERSION] · **Language lead:** [NAME, CONTACT]

## 1. Field collector sheet

You photograph plants and record what the farmer asks about them. Every accepted photo earns [RATE]. A rejected photo earns nothing, so read the rejection list before you start.

### How to photograph

- Take two photos of each plant: one at plant level showing the whole plant, and one close-up of the affected part. Both are uploaded under the same capture.
- Use natural daylight. Do not use the flash. If the sun is too harsh, move so the light falls on the plant from the side, and keep your shadow and your hand out of the frame.
- One plant per photo. If the problem affects a whole patch, take the plant-level photo of one plant and add a separate `field` photo.
- Fill the frame with the plant. In the close-up the affected part should fill most of the frame.
- No hands, faces, tools or people in the frame. A face is blurred at ingest, and a photo where it cannot be blurred is dropped even if the plant is perfect.
- Hold the phone still and check focus before you move on. Blurred close-ups are the most common rejection.

### Capture form

Fill every field before you save. Values in the third column are the only ones the app accepts.

| Field | What to enter | Allowed values |
| --- | --- | --- |
| `crop` | The crop as you know it | [CROP LIST FOR THIS LANGUAGE] |
| `crop_vernacular` | The local name the farmer uses | free text |
| `suspected_issue` | Your best guess | any ontology node, or `unsure` |
| `growth_stage` | Where the plant is in its life | `seedling`, `vegetative`, `flowering`, `fruiting`, `maturity`, `post_harvest`, `unknown` |
| `plant_part` | What the close-up shows | `leaf`, `stem`, `root`, `fruit`, `flower`, `whole_plant`, `field`, `other` |
| `district` | Where you are | picked from the list; the app fills it from GPS when it can |
| `capture_date` | Today | filled by the app |
| `farmer_question_text` | What the farmer asked, in [LANGUAGE] | free text, 5 to 40 words |
| `consent_ref` | The farmer's consent reference | from the consent record |

### When you are unsure

Choose `unsure`. An honest `unsure` is worth more than a wrong guess, because the agronomist labels every image anyway and a confident wrong guess makes their job slower. Do not skip the photo because you cannot name the problem.

### The farmer's question

Type the farmer's question in their words, in [LANGUAGE]. If the farmer is not present, type the question you would ask about this plant. This text becomes the cue for the speech recordings, so it must read as something a farmer would say aloud. "My maize leaves have holes and something is eating inside, what should I spray?" is right. "Fall armyworm" is not a question. When the farmer is not there and you type the question yourself, say so in the capture note, so the record shows whose question it is.

### Daily sync

The app works without signal. Captures wait in the outbox on your phone and upload in order when you connect. Sync every evening. A capture that has not synced within [N, e.g. 3] days is flagged, and a lost phone loses everything in the outbox.

### What gets an image rejected

| Reason | What the reviewer sees |
| --- | --- |
| Blurred or out of focus | Symptom cannot be read |
| Face or person visible | Cannot be anonymised |
| More than one plant in the close-up | Label would be ambiguous |
| Flash, backlight or deep shadow | Colour of the symptom is lost |
| Missing form field | Record fails validation |
| Duplicate of an earlier capture | Perceptual hash match at ingest |
| Crop not in the target list | Outside the coverage matrix |
| Screenshot or photo of a photo | Not a field image |

## 2. Agronomist label sheet

You give each image its diagnosis and review the advisory for faithfulness. Work at the pace the project plans ([~100 actions per day]), and mark uncertainty rather than hide it.

### Ontology levels

The ontology has three levels: crop, issue family, specific issue. Label at the deepest level the image supports.

| Level | Example | When to stop here |
| --- | --- | --- |
| Crop | `maize` | Never; every label has at least a family |
| Issue family | `maize/pest` | Symptom is clearly a pest but the species is not visible |
| Specific issue | `maize/pest/fall_armyworm` | The diagnostic sign is visible in the image |
| Healthy | `maize/healthy` | Same crop, same stage, no issue |

Families are `pest`, `disease`, `nutrient`, `abiotic` and `healthy`; `uncertain` can be chosen at any level. The full node list for this language is in [ONTOLOGY FILE], with vernacular names beside each node.

### The uncertain node

Use `uncertain` when the image does not let you choose between two families, or when you would ask for a second photo in the field. Add a note saying what you would need. An uncertain label sends the image to a second agronomist, and to adjudication if the two labels differ. It counts as a label in the agreement figures, and a pattern of `uncertain` on images your colleagues label with `high` confidence will be raised at the weekly review.

### Confidence

| Value | Meaning |
| --- | --- |
| `high` | You would give this diagnosis to a farmer without a second look |
| `medium` | The label is the most likely one, but a closely related node is possible; name the alternative in the note |
| `low` | You are choosing between two or more nodes and would want a second opinion; the item is routed for double labelling |

### When to add a second label

Add a secondary label only when two issues are visible on the same plant (nitrogen deficiency plus streak virus is common on stressed maize). Never add a secondary label as a hedge against being wrong; that is what confidence and the note are for.

### Faithfulness review of the advisory

The advisory reaches you after the author has written it. Check each line against the label and the national extension recommendation for [COUNTRY].

- The advisory names the same diagnosis as the label, in the vernacular term from the ontology list.
- The cause it gives is the true cause, in plain language.
- The immediate action is what the extension recommendation says for this crop and stage.
- Any input named is registered and sold in [COUNTRY]; a foreign brand or a banned active ingredient is a rewrite.
- The dose or rate, if given, matches the label of that product.
- The next-season advice names a step for this issue (rotation, resistant variety, planting date).
- The "seek help" line names a real route: extension office, agro-dealer, cooperative.
- Nothing in the advisory could harm the farmer, the crop or the soil if followed as written.

Decision: `accept`, `relabel` (the diagnosis is wrong, the advisory goes back to the author with the new label), `rewrite` (the diagnosis stands, the advisory is wrong), or `reject` (the image cannot support any label).

### Safety line check

Where the advisory names a pesticide, herbicide or fungicide, it must carry a safety line covering protective clothing, the pre-harvest interval and keeping the product away from children and water. Missing safety line is an automatic `rewrite`, whatever else is right.

## 3. Advisory author rubric

You write what a good extension officer would say to this farmer, about this plant, in [LANGUAGE]. You write it fresh; nothing is translated from English. Each accepted advisory earns [RATE]. An advisory is accepted when the linguistic reviewer and the agronomist both pass it, with at most one rewrite.

### The five-part structure

| Part | What it answers | Length guide |
| --- | --- | --- |
| 1. What it is | Name the problem in the vernacular, and how the farmer can recognise it | 1 to 2 sentences |
| 2. Why it happens | The cause, in terms the farmer can act on | 1 to 2 sentences |
| 3. What to do now | Concrete steps for this week, in order | 2 to 4 sentences |
| 4. What to do next season | Prevention specific to this issue | 1 to 2 sentences |
| 5. When to seek help | The sign that means "go to the extension office", and where that is | 1 sentence |

Write in this order every time. A reader who has seen ten advisories should know where to look for the dose.

### Length

60 to 180 words, counted in [LANGUAGE]. Below 60 the advisory is usually missing a part. Above 180 it will not be read aloud comfortably, and the speech layer reads it verbatim.

### Register and names

- Speak to one farmer, as you would in person: second person, short sentences, no headings or bullet points.
- Use the vernacular crop and pest names from the ontology list. Give the scientific or English name only if farmers in [REGION] use it too.
- Use the numbers farmers use: a bottle cap, a matchbox, a 20-litre jerrycan, rather than millilitres alone.

### Inputs

Name only inputs sold in [COUNTRY] at the agro-dealer a smallholder would reach. The list of approved products for this crop is in [INPUT LIST]. Give the cultural or biological option first where the extension service recommends one, then the chemical option.

### Safety line

Any mention of a pesticide, herbicide or fungicide must include one sentence on protection: cover skin, eyes and mouth; wash after spraying; keep the product from children and water; and wait [N] days before harvest. Write it in the same voice as the rest. A safety line that reads like a legal notice will be skipped by the speaker and the farmer alike.

### Ten reasons a reviewer rejects

1. The text reads as translated from English.
2. Any of the five parts is missing.
3. Fewer than 60 or more than 180 words.
4. The diagnosis in the text does not match the label.
5. An input that is not sold in [COUNTRY], or a banned active ingredient.
6. A chemical is named without a safety line.
7. A wrong or missing dose where one is needed.
8. Generic advice that would fit any crop and any problem.
9. English or scientific names where a vernacular name exists.
10. A tone that lectures the farmer.

### Two examples

Both examples are shown in English here. Your rubric shows them in [LANGUAGE], and each language lead writes their own from a real pair.

**Accepted** (label `maize/pest/fall_armyworm`, vegetative stage, 154 words):

> The holes in the leaves and the wet sawdust in the funnel are from fall armyworm, the caterpillar farmers here call [VERNACULAR]. The moth lays eggs on young maize and the caterpillars hide in the funnel and eat from inside. This week, walk the field early in the morning and pick out the caterpillars you can see, then drop a pinch of dry sand or ash into each funnel. If more than one plant in five is attacked, spray [APPROVED PRODUCT] into the funnels at [DOSE FROM THE PRODUCT LABEL, IN A LOCAL MEASURE]. Cover your skin, mouth and eyes when spraying, wash afterwards, keep the product away from children and water, and do not harvest green maize for [PRE-HARVEST INTERVAL FROM THE LABEL] days. Next season, plant early with your neighbours so the moth finds less young maize. If the caterpillars are still there a week after spraying, take a few in a bottle to the extension office at [PLACE].

**Rejected** (same label, 66 words):

> Fall armyworm (Spodoptera frugiperda) is a serious pest of maize. It is caused by the larvae of a moth. Control: apply Lambda-cyhalothrin 2.5 EC at 1 ml per litre of water, or use a recommended insecticide. Cultural methods such as crop rotation and early planting are also effective. Contact your extension agent for further advice. Always follow good agricultural practice to prevent pest and disease problems.

Reason for rejection: reads as translated (1), no vernacular name (9), the product is named by active ingredient with a dose the farmer cannot measure (7), no safety line (6), and the next-season and seek-help parts are generic (8).

## 4. Linguistic reviewer sheet

You are a native speaker and you are not the author of the advisory in front of you. You check whether a farmer in [REGION] would hear it as advice from one of their own. Each review earns [RATE]. Decisions: `accept` or `rewrite` with a note. You do not judge agronomy; that is the agronomist's sheet.

| Check | Pass when |
| --- | --- |
| Authored in-language | Sentence order and idiom are native; no English word order showing through |
| Vernacular names | Crop and issue names match the ontology term list for this language |
| Register | Spoken second-person address, the way an extension officer talks, no lecture |
| Readability | A farmer with primary schooling could follow it read aloud once |
| Structure | The five parts are present and in order |
| Length | 60 to 180 words in [LANGUAGE] |
| Orthography | Follows [ORTHOGRAPHY STANDARD]; diacritics [preserved / not required] |
| Dialect | Terms are understood across [REGIONS]; a regional term is glossed once |
| Numbers and units | Local measures, written the way they are spoken |
| Safety line | Present where a chemical is named, in the same voice as the rest |
| Read-aloud test | Reading it aloud takes under [90] seconds and nothing trips the tongue |

A `rewrite` note names the failed check and quotes the phrase. "Rewrite: register, 'the farmer should' in sentence 3 should address the farmer directly." An advisory that fails the same check twice goes to the language lead.

## 5. Speaker prompt card

You will record two kinds of clip. Each is tied to one photo. A session pays [SESSION RATE] and a clip counts once it passes validation.

### Farmer question (speak freely)

Look at the photo and the short cue on screen. Ask, in your own words, what a farmer would ask about this plant. The cue only reminds you of the topic. Say it the way you would say it at the farm gate. One or two sentences is enough. Do not read the cue aloud.

### Spoken advisory (read exactly)

Read the advisory on screen word for word. Do not paraphrase, skip a sentence or add a greeting. The transcript of your clip is the text on screen, so any change you make becomes an error. Read the safety line at the same pace as the rest.

### Recording conditions

- The app records at 48 kHz. Watch the level meter: green is right, red is too loud.
- Hold the phone a hand's width from your mouth. Do not cover the microphone.
- Record where you can hear yourself without shouting. Normal outdoor sound is fine; a running engine or a radio is not.
- Wait one second after pressing record before you speak, and one second after you finish.

### If you make a mistake

Stop, discard the clip and record it again. Do not correct yourself inside the clip. A clip with a restart in the middle is rejected by the validator.

### Consent reminder

Your voice is personal data. You agreed to [PURPOSES TICKED] on [DATE], and you chose [whether age band, gender and region are attached]. You can withdraw within 60 days by contacting [LANGUAGE LEAD] with your reference number [REF]. Nothing you record is synthesised or altered.

## 6. Preference rater sheet

You see one photo, its diagnosis, and two advisories, A and B. Pick the one a farmer in [REGION] should receive. You are not told where either advisory came from, and which one appears as A changes from pair to pair. Each rating earns [RATE]. Where two people rate the same pair, both answers are kept, so do not discuss a pair with another rater.

### How to compare

1. Read the diagnosis first, then A in full, then B in full.
2. Apply the four checks in order, and stop at the first one that separates the two advisories:

   | Check | Choose |
   | --- | --- |
   | Correct: addresses the diagnosis shown | the correct one |
   | Safe: no harmful step, and a safety line for any chemical | the safe one |
   | Usable here: inputs, measures and names farmers in [REGION] use | the locally usable one |
   | Language: clear, natural, right register | the clearer one |

3. Choose `A`, `B` or `tie`, and mark the strength: `slight`, `clear` or `strong`.
4. Tick every reason that applies. At least one reason is required unless you chose `tie`.
5. Do not guess which advisory a person wrote. The source is no reason to prefer it.

### Reason codes

| Code | Tick it when the advisory you chose |
| --- | --- |
| `more_accurate` | Names the right problem and the right action |
| `safer` | Handles chemicals more carefully, or avoids a harmful step |
| `more_complete` | Covers a part the other one skips |
| `more_actionable` | Gives steps the farmer can follow this week |
| `uses_available_inputs` | Names inputs and measures available in [COUNTRY] |
| `better_vernacular_terms` | Uses the crop and pest names farmers here use |
| `more_natural_language` | Sounds like an extension officer talking to a farmer |
| `more_concise` | Says the same thing in fewer words |
| `other` | None of the above fits; explain in the note |

### Ties

Choose `tie` only when you would give either advisory to a farmer. If you lean one way, choose it and mark the strength `slight`. If neither advisory is acceptable, choose the less harmful one and say in the note what is wrong with both.

### Free-text note

One or two sentences, in [LANGUAGE] or English. Quote the phrase that decided it: "B says spray in the afternoon heat, A says early morning; A is safer." The language lead reads the notes and uses them to revise the reason list.

### Batches

A batch holds [N, e.g. 30] pairs. Finish a batch in one sitting and rest before the next. Some pairs in every batch have a known answer and are used to check your ratings; you will not know which.

## 7. Weekly agreement report

Filled every Monday by the language lead from the platform's agreement export and coverage dashboard, per language, and sent to the partner. The fields follow the Monday report in [Quality, Consent and Release](../agri-advisory/quality-consent-release.md#the-monday-report).

| Field | Source | Threshold |
| --- | --- | --- |
| Pairs captured, labelled, authored, reviewed, adjudicated, accepted | Project counts | Coverage matrix target for the week |
| Cohen's κ on ontology labels | Double-labelled sample (30% rolling, 100% on weak cells), per crop and per annotator | ≥ 0.75 |
| Advisory agreement, round one and round two | Share of advisories accepted by the linguistic reviewer without a rewrite; then after one rewrite | ≥ 90% by round two |
| Speech items validated first pass | Validation vote outcomes | ≥ 95% |
| Preference ratings: rater agreement and share of A choices | Double-rated pairs; choices per rater, ties excluded from the A share | Agreement reported, no floor; A share near 50% per rater; gold accuracy at or above [FLOOR] |
| Speakers by age band and gender | Consented speaker profiles | Recruitment target for the language |
| Open review queue | Items waiting at each QA stage | Under [N] days old |
| Coverage gaps | Crop × issue family × growth stage cells below 50% of target | Plan to fill each |
| Annotators paused | Ground-truth accuracy below floor | Reason and retraining status |
| Consent and withdrawals | Acceptances this week (written / oral), opt-outs received and applied | All opt-outs applied before next export |
| Payment | Ledger credits and payouts per role, local currency | Matches accepted counts |
| Actions and risks | One line per cell below threshold | Owner and date |

A cell below threshold two weeks running triggers a rubric review, and the version bump goes in the change log below.

## Change log

| Version | Date | Sheet changed | Change | Effect on earlier work |
| --- | --- | --- | --- | --- |
| 1.0 | [YYYY-MM-DD] | all | Initial | None |
| [NEXT] | [YYYY-MM-DD] | [SHEET] | [CHANGE] | [Re-review? Keep?] |

---

**Contributor's note.** If you have run a crop-advisory collection and one of these sheets did not survive contact with your collectors or agronomists, send the redlined version with what you changed and why.
