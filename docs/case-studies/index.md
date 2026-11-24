---
ready: true
sidebar_position: 1
last_update:
  date: 2026-11-24
  author: Shamsuddeen Hassan Muhammad
---

# Case Studies

Most NLP writing is aspirational: how the pipeline is *supposed* to work, how the metrics are *supposed* to move, how the annotator workflow is *supposed* to scale. The interesting parts sit in the gap between the paper's methods section and what actually happened: what surprised the team, what was harder than they expected, what they would do differently. This chapter records those parts.

Every case study in this chapter gives a short list of project facts and the same seventeen questions, drawn from the [retrospective template](./retrospective-template.md). Same structure across every project, so a reader can compare across them and see the patterns. This page sets out why the chapter exists, the editorial rules it follows, the initial set of projects, and how to contribute a case study of your own.


## Why this chapter exists

The playbook's advice is only as trustworthy as the projects behind it. When we recommend a workforce size, an annotation cadence, or a metric, we should be able to point at a project where that decision was made and say what happened. Case studies are the evidence base. Everything else in the playbook should be traceable to them.

They are also the fastest way to teach. A person starting an NER project will learn more from four pages on how MasakhaNER 2 was actually built than from forty pages of general annotation-design theory. That is the point.

## The editorial contract

Case studies **must be authored**: written by, or reviewed and approved by, the project's own leads. A case study assembled from published sources with no author attribution is not a case study; it is a paper summary. Where the playbook cannot yet secure a project-lead's own words, we ship a **public-record draft** with a prominent banner, so the page is a starting point for correction rather than a claim of authority.

This is the whole reason Case Studies is worth building. The lightweight, honest alternative, a bibliography of citations, already exists in every referenced paper. This chapter's value is the seventeenth question ("What is the current state of the project?"), asked and answered by the person who knows.

## The reference retrospectives

Five projects are the initial reference set. Each is chosen because it is either a flagship community-lineage project, or the annotation and workforce decisions it embodies are directly relevant to a large number of downstream teams.

### [MasakhaNER 1 → 2](./masakhaner.md)

Named entity recognition benchmark that grew from 10 African languages in MasakhaNER 1 ([Adelani et al., 2021](../references.md#adelani-2021)) to 20 in MasakhaNER 2 ([Adelani et al., 2022a](../references.md#adelani-2022)), and the reference for the participatory annotation methodology used across subsequent Masakhane-lineage corpora.

**Status:** Public-record draft published. Awaiting project-lead review to replace the drafted answers with attributable voice.

### AfriSenti

14-language sentiment corpus of over 110,000 tweets annotated by native speakers, one of the largest community-curated sentiment resources for African languages ([Muhammad et al., 2023a](../references.md#muhammad-2023)).

**Status:** Draft pending. Focus areas for the retrospective: annotator training across 14 languages, per-language IAA challenges, the crowd-vs-community workforce decision.

### MAFAND-MT

Human-translated parallel news corpus for 16 African languages, each paired with English or French, released with the study on adapting pre-trained translation models to African news ([Adelani et al., 2022b](../references.md#mafand-2022)). Its code repository is called `lafand-mt`.

**Status:** Draft pending. Focus areas: source selection under domain constraints, alignment quality control, human evaluation cadence.


### AfroBench

Evaluation benchmark for large language models covering 64 African languages, 15 tasks, and 22 datasets, which documents a persistent performance gap between English and African languages ([AfroBench](../references.md#afrobench)).

**Status:** Draft pending. Focus areas: what the evaluation metrics did and did not surface about model behaviour on African-language content.

### AfriQA

Cross-lingual open-retrieval QA benchmark with over 12,000 questions in 10 African languages, whose answers are retrieved from English or French passages ([Ogundepo et al., 2023](../references.md#afriqa-2023)). It is framed around this practical cross-lingual configuration rather than monolingual reading comprehension.

**Status:** Draft pending. Focus areas: the question-authoring workflow, the cross-language evaluation design, the retrieval-first framing.

## Contribute a case study

The list above is the initial reference set, not the ceiling. Any Masakhane-lineage or adjacent African-language NLP project with a shipped release is a candidate.

To add or claim one:

1. Copy the [retrospective template](./retrospective-template.md).
2. Rename it to the project slug (`docs/case-studies/afrisenti.md`, `docs/case-studies/mafand-mt.md`, etc.) and set the `title` field in its front matter. Do not set `last_update` by hand; it is generated automatically from git history.
3. Fill in the short list of project facts and answer the same seventeen questions. It is more valuable to answer honestly and briefly than to write a polished narrative. If a question is not applicable, say so and why.
4. Add the new page to the Case Studies entry in `sidebars.js`; the chapter's pages are listed there explicitly, so a page that is not added will not appear in the navigation.
5. Open a pull request. Tag the original project leads for review before merging.


To **claim** an existing public-record draft (e.g., MasakhaNER above): open a pull request rewriting the sections you have first-hand knowledge of. Partial rewrites are welcome. A project-lead's answer on the three or four questions that most surprised the team is worth more than a whole page of public-record inference.

The value is in the honest answers. If your project had a hard week, a wrong assumption, a mistake that cost time: those are the answers that make the case study useful. Save the marketing for the conference paper.

## Editorial policy

Case studies are **published with the project leads' names**. This is not anonymous industry gossip. It is a record, attributable, so future readers know whose experience they are drawing on and whom to ask follow-up questions.

Public-record drafts published as placeholders remain under a warning banner until a project lead reviews them; when a project lead claims a draft, they own the final voice.

Case studies do not include unpublished information (funder names withheld by request, unreleased data, unpublished commercial terms) unless the project leads explicitly clear it. When in doubt, leave it out.

---

*See also [**What this playbook is (and isn't)**](../1_introduction/scope-and-strategy.md) for why case studies were prioritised as the second Phase-1 addition to the playbook.*
