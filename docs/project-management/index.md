---
title: Project Management
---

# Project Management

A dataset is not built by a model or a script. It is built by people, usually a small, distributed, partly volunteer team that works across several countries, time zones, and languages on a budget that would make most industry data teams flinch. The landmark Masakhane machine-translation effort was written by 49 authors spread across the African continent and beyond, coordinating almost entirely online ([Nekoto et al., 2020](../references.md#nekoto-2020)). That is the normal shape of an African-language data project, not the exception. Managing one well is what turns a good intention into a released, documented, reusable dataset.

The work is also easy to underestimate. In a study of 53 AI practitioners across India, East and West Africa, and the United States, **92% reported at least one "data cascade"**: a problem introduced upstream, in how data was scoped, sourced, or labelled, that stayed invisible until it broke something expensive downstream ([Sambasivan et al., 2021](../references.md#sambasivan-2021)). Almost all of those failures trace back to decisions a project manager makes in the first week. This chapter is about making them deliberately.

:::tip[The one-line version]
Scope narrowly, pilot before you scale, pay people fairly and on time, write things down, and assume the person who finishes the project will not be the person who started it.
:::

## Scope the project before you collect anything

The most expensive mistakes are made before any data is collected, because everything downstream inherits them. Spend real time here.

### Goals and success criteria

Write down, in one or two sentences, what the dataset is *for* and how you will know it is finished. "A 5,000-sentence Yorùbá sentiment dataset, three annotators per item, inter-annotator agreement above 0.6, released under CC BY 4.0 by December" is a goal you can plan against. "Improve Yorùbá NLP" is not. A concrete success criterion sets the scale, the budget, and the stopping point, and it protects the project from quietly expanding until it runs out of money or volunteers.

### Choosing languages and varieties

Name what you are building for precisely: the language, the script, the regional variety, and the register. "Swahili" collected from Tanzanian news is not interchangeable with Kenyan social-media Swahili, and a model trained on one will quietly underperform on the other. It is almost always better to do one language or variety well than three badly. A focused corpus is easier to staff with genuine native speakers, easier to quality-check, and easier to document honestly. Multi-language efforts are possible, but they are coordination problems first and linguistics problems second: MasakhaNER 2.0 reached 20 African languages only by running each language as its own sub-team under a shared protocol ([Adelani et al., 2022](../references.md#adelani-2022)).

### Scale, modality, and task

Decide three things together, because they trade off: how much data (scale), in what form such as text, speech, or images (modality), and for what label (task). Resist the urge to oversize. A small, clean, well-documented dataset is worth more than a large noisy one, and web-scale collection is precisely where low-resource quality collapses ([Kreutzer et al., 2022](../references.md#kreutzer-2022)). Size the project to the team and budget you actually have, not the one you wish you had.

## Plan the work

### Milestones and a pilot-first timeline

Always run a **pilot** of 50 to 200 items, with your real annotators and your real guidelines, before committing the full budget. A pilot surfaces unclear instructions, hard edge cases, and disagreement patterns while they are still cheap to fix, and it gives you a measured annotation rate (items per hour) to plan the rest of the schedule from. Build the timeline backwards from your release date through the stages that have to happen in order: guidelines, pilot, revision, main annotation, quality control, documentation, release. Add slack, because volunteer availability is seasonal and unpredictable.

### Dependencies and sequencing

Some steps cannot be parallelised, and getting their order wrong is a classic data cascade. Guidelines must stabilise before main annotation starts, or you will re-annotate. Consent and licensing must be settled before collection, not after, because retrofitting consent onto already-collected data is often impossible. Map these hard dependencies explicitly so the project does not stall waiting on a step that should have happened earlier.

## Budget and fund the work

### Estimating costs

For most text projects, **annotation labour is the dominant cost**, so estimate it first: (number of items) × (annotators per item) × (time per item) × (hourly rate), plus review and adjudication time, plus coordination. Speech and image projects add recording, equipment, and storage on top. Build the estimate bottom-up from your pilot's measured rate rather than guessing, and keep a contingency line, because re-annotation, attrition, and scope creep are normal rather than signs of failure.

### Paying annotators fairly, and on time

Annotators are skilled contributors, not a cost to be minimised, and pay should reflect that. Set a fair, transparent rate, ideally benchmarked to local professional rates rather than the global crowdsourcing floor, and agree it up front. In much of the continent, **mobile money** (M-Pesa, MTN MoMo, Airtel Money) is the practical payout rail: it reaches annotators without bank accounts and clears quickly, but budget for transaction fees and for the reality that cross-border payouts are still awkward. Late or opaque payment is the fastest way to lose a good team and damage the community's trust in the next project.

### Funding and grants

Dataset creation is chronically underfunded relative to modelling, which is part of why so few datasets get built. A growing number of programmes target exactly this gap. **Lacuna Fund**, co-founded in 2020 by The Rockefeller Foundation, Google.org, and Canada's IDRC, funds the creation and labelling of machine-learning datasets in low-resource settings, with a dedicated stream for sub-Saharan African languages ([Lacuna Fund, n.d.](../references.md#lacuna-fund)). Other routes include AI4D-Africa, university and institutional partnerships, and in-kind support such as compute or annotator time from community organisations. Write the data-management and consent plan into the proposal from the start, because funders increasingly expect it and it is far cheaper to plan than to retrofit.

## Build the team

A well-run African-language data project usually has more roles than people, so individuals wear several hats. What matters is that each role is owned by someone.

### Coordinators and language leads

A **coordinator** owns the schedule, the budget, and communication. For any multi-language or multi-region effort, each language also needs a **language lead**: a fluent speaker who owns the guidelines, edge cases, and quality for that language and acts as the final authority on what is correct. This federated structure, rather than one central team labelling everything, is what let participatory efforts scale across dozens of languages at once ([Nekoto et al., 2020](../references.md#nekoto-2020)).

### Annotators and reviewers

Annotators produce the labels, while reviewers and adjudicators resolve disagreements and check quality. Keep the roles distinct even if the same people rotate through them, because self-review hides exactly the errors you most need to catch. Recruit annotators who are genuinely fluent and culturally fluent, able to read sarcasm, idiom, and offence in context, not just available.

### Recruitment

Finding qualified native speakers is often the binding constraint on the whole project, especially for smaller languages. The companion tool **[AfriFinder](https://community.waraka.ai/afrifinder)** exists to make this easier, by helping you reach and vet native-speaker annotators for the specific language and variety you need. Plan recruitment as a real work item with its own lead time, not an afterthought.

## Coordinate and track

### Task tracking and communication

Distributed, part-time teams need lightweight, asynchronous coordination that survives intermittent connectivity. A shared task board (even a spreadsheet), a single source of truth for the current guidelines, and one agreed channel for questions will carry most projects. Default to async and write decisions down, because your team spans time zones and few people are online at the same moment. Keep tooling low-bandwidth-friendly, and assume mobile data and unreliable power are part of the working environment.

### Progress monitoring

Track a few honest numbers, such as items completed, current agreement scores, and annotator drop-off, and review them on a regular cadence rather than only at the end. Falling agreement usually means the guidelines need a fix, not that annotators need scolding. Rising drop-off usually means pay, workload, or distressing content needs attention. Catching these early is the entire point of monitoring: a data cascade is far cheaper to stop in week two than to discover at release ([Sambasivan et al., 2021](../references.md#sambasivan-2021)).

## Manage risk and plan for continuity

### Common risks and mitigations

A handful of risks recur across almost every African-language data project:

- **Annotator attrition.** Volunteers and part-timers leave. Mitigate with realistic timelines, fair and timely pay, and a slightly larger pool than the minimum.
- **Guideline drift.** Interpretations diverge over weeks. Mitigate with a versioned guidelines document and periodic re-calibration on shared items.
- **Funding or platform loss.** A grant ends or a tool's pricing changes. Mitigate by owning your raw data and exports, and avoiding hard dependence on any single external service.
- **Harm and safety.** Offensive content, identifiable individuals, or unsafe material. Mitigate with content warnings, opt-outs, and review before release (see the [data governance](../data-governance/index.md) and annotation chapters).

### Handover and continuity

Assume the project will outlive its current team, and that the person who releases the dataset may not be the person who started it. Continuity is bought cheaply, in advance, by writing things down: keep the guidelines, the schema, the consent records, and the processing scripts in a shared repository, not on one person's laptop. Good documentation is not paperwork for its own sake. It is what lets the next contributor pick the work up, and what lets you defend the dataset's provenance years later (see [Documentation](../6_documentation/documentation.md)).

:::note[How this connects]
Scoping and budgeting decisions made here set up the [Data Collection](../2_data-collection/1_data-modalities.md), [Annotation Design](../3_annotation-design/annotation-task-design.md), and [Data Quality](../4_data-quality/index.md) chapters that follow. Project management is the thread that runs through all of them.
:::
