---
sidebar_position: 1
---

# Case Studies

*Retrospectives from real African-language NLP projects, written by the people who built them.*

Most NLP writing is aspirational — how the pipeline is *supposed* to work, how the metrics are *supposed* to move, how the annotator workflow is *supposed* to scale. The interesting parts sit in the gap between the paper's methods section and what actually happened: what surprised the team, what was harder than they expected, what they would do differently. This chapter closes that gap.

Every case study on this page answers the same seventeen questions, drawn from the [retrospective template](./_retrospective-template.md). Same questions across every project, so a reader can compare across them and see the patterns.

## Why this exists

The playbook's advice is only as trustworthy as the projects behind it. When we recommend a workforce size, an annotation cadence, or a metric, we should be able to point at a project where that decision was made and say what happened. Case studies are the evidence base. Everything else in the playbook should be traceable to them.

They are also the fastest way to teach. A person starting an NER project will learn more from four pages on how MasakhaNER 2 was actually built than from forty pages of general annotation-design theory. That is the point.

## Case studies available now

*None yet — this chapter has just been opened. The retrospectives listed below are in various stages of drafting; if you led one of these projects, please pick up the questionnaire and fill in what you know. See the [template](./_retrospective-template.md).*

## In progress

- **MasakhaNER 1 and 2** — 20-language named entity recognition benchmark. Needs project-lead input on team assembly, timeline surprises, and the transition from v1 to v2.
- **AfriSenti** — 14-language sentiment corpus. Needs a retrospective on the annotator training, per-language IAA challenges, and the crowd-vs-community decision.
- **LAFAND-MT** — parallel translation corpora for 16 African-English pairs. Needs a retrospective on source-selection, alignment quality, and human evaluation.
- **AfroBench** — evaluation benchmark spanning multiple tasks. Needs a retrospective on what the metrics did and did not reveal.
- **AfriQA** — cross-lingual open-domain QA benchmark. Needs a retrospective on question-authoring workflow and cross-language evaluation.

## How to contribute a case study

1. Copy the [retrospective template](./_retrospective-template.md).
2. Rename it to the project slug (`docs/case-studies/masakhaner.md`, `docs/case-studies/afrisenti.md`, etc.).
3. Answer the seventeen questions. It is more valuable to answer honestly and briefly than to write a polished narrative. If a question is not applicable, say so and why.
4. Open a pull request. Tag the original project leads for review before merging.

The value is in the honest answers. If your project had a hard week, a wrong assumption, a mistake that cost time — those are the answers that make the case study useful. Save the marketing for the conference paper.

## Editorial policy

Case studies are **published with the project leads' names**. This is not anonymous industry gossip. It is a record, attributable, so future readers know whose experience they are drawing on and whom to ask follow-up questions.

Case studies do not include unpublished information (funder names withheld by request, unreleased data, unpublished commercial terms) unless the project leads explicitly clear it. When in doubt, leave it out.

---

*See also [**What this playbook is (and isn't)**](../1_introduction/scope-and-strategy.md) for why case studies were prioritised as the second Phase-1 addition to the playbook.*
