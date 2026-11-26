---
ready: true
sidebar_position: 2
title: Retrospective template
last_update:
  date: 2026-11-22
  author: Shamsuddeen Hassan Muhammad
---

# Retrospective template

*Last reviewed: 2026-11-22.*

The retrospective structure every page in the [Case Studies](./index.md) chapter follows: a list of project facts, then seventeen questions about what actually happened. Same structure for every project, so readers can compare across them.

## How to use this template

1. **Create the page.** Copy this file to `docs/case-studies/<project-slug>.md`, named after the project (for example `afrisenti.md` or `mafand-mt.md`), and change `title` in its front matter. Do not set `last_update` by hand; it is generated automatically from git history. Leave `ready: true` out while you write: without it, the site shows an "In development" placeholder instead of the page body. Add it when every question is answered, or, for a public-record draft, as described in step 4.
2. **Fill in the project facts.** Link to the paper, dataset card, guidelines and repository rather than restating them.
3. **Answer the seventeen questions.** Short and honest beats long and polished. If a question is not applicable, say so and why.
4. **Mark public-record drafts.** If you are not a project lead, mark the page as a **public-record draft** with a warning banner, cite your sources, and mark every unconfirmed answer as awaiting project-lead review (see [MasakhaNER 1 → 2](./masakhaner.md) for the pattern). Once every unconfirmed answer is clearly marked, add `ready: true` so the draft is published.
5. **Add the page to the sidebar.** Add the page id (for example `'case-studies/<project-slug>'`) to the Case Studies entry in `sidebars.js`. The chapter's pages are listed there explicitly, so a page that is not added will not appear in the sidebar.
6. **Open a pull request** and tag the project leads for review before merging.

## Project facts

*Facts, not reflection. One or two lines each, with a link where a document already exists.*

- **Project name:**
- **Task and modality:**
- **Languages covered:**
- **Release date(s):**
- **Canonical paper / repo / dataset URL(s):**
- **Project leads (attributable):**
- **Licence:** the licence, why it was chosen, any restrictions inherited from sources, and any terms negotiated with communities.
- **Communities and partners:** who speaks the languages, which communities or organisations were involved, and how they took part (consulted, co-designed, annotated, co-own the data).
- **Data sources:** where the raw data came from (web crawl, social media, broadcast, books, elicitation, recordings), in what volume, and any source that was dropped and why.
- **Consent and permissions:** how individual and community consent was obtained, from whom, and what contributors were told about reuse. Link the consent form if public ([consent form template](../templates/consent-form.md)).
- **Guidelines and revisions:** link to the guidelines, the number of versions, and the one or two changes that mattered most ([annotation guidelines template](../templates/annotation-guidelines.md)).
- **Agreement and quality figures:** the agreement metric used, the figure per language (not only the average), the adjudication process, and any quality checks on the final release.


## The seventeen questions

Answer each. Skip nothing. If a question does not apply, say so and why in one sentence.

### 1. What was the goal at the start?

*What did the team set out to build, and what did success look like on day one? Not the paper's abstract but the internal target, before scope changes.*

### 2. Who was on the team?

*Total headcount, roles (lead annotator, native-speaker annotator, ML engineer, project manager, community liaison), and how the team was assembled: recruited how, from where, how many annotators per language, how they were screened and trained, the pay rate or volunteer arrangement, and how credit was given.*


### 3. How long did it take? (Planned vs. actual)

*Original timeline, actual timeline, and where the biggest slippage came from.*

### 4. What did it cost? (Money and effort)

*Approximate budget in dollars or the local currency of the largest cost centre, and total effort in person-months. Split by cost centre if you can: annotator pay, compute, coordination, adjudication. If the project ran on volunteer time, say so and estimate the volunteer effort in person-hours.*

### 5. What was the hardest problem (technical)?

*The one that nearly derailed the project. Data collection issue? Metric that would not converge? Tooling that could not do what was needed? Be specific.*

### 6. What was the hardest problem (social or political)?

*The one that had nothing to do with the code. Community pushback, unclear consent, licensing disagreement, funder pressure, credit dispute, translation-quality tension.*

### 7. What was the biggest mistake?

*What you would not do again. Be honest. This is where the case study earns its keep.*

### 8. What surprised the team?

*Something that neither the plan nor the risks anticipated. Positive or negative. Both are useful.*

### 9. Which decisions turned out to matter?

*Two or three choices made early that shaped the project's outcome. The ones you would tell a new team to think hardest about.*

### 10. Which decisions turned out not to matter?

*Time spent worrying about things that were never on the critical path. Almost as useful as question 9.*

### 11. What did the metrics not show?

*Where a headline number in the paper hid something the team knew but the paper could not surface. Per-language variance, one class doing much worse, evaluation set overfit, human-eval disagreement with automatic metrics.*

### 12. Where did the workforce model help or hurt?

*Participatory setup, crowd, in-house, hybrid. What worked, what did not. Recruitment, training, retention, pay.*

### 13. What tooling was load-bearing?

*The tools without which the project would not have shipped. Annotation platform, evaluation script, versioning, communication.*

### 14. What would you do differently with the same budget?

*Not "with more budget"; that is a wish. With the actual budget the project had, what would you cut and what would you shift?*

### 15. What advice would you give a team starting the same task today?

*Two to five sentences of practical guidance. This is the section future readers of this case study will remember.*

### 16. Where has the project been used since release?

*Downstream work you know about. Papers that use the dataset, systems built on it, deployments. Bad-faith uses too, if you know of any.*

### 17. What is the current state of the project?

*Actively maintained, in caretaker mode, archived, superseded. If superseded, by what. Say where the data is hosted, which versions have been released, who maintains it now, and how errors are reported ([dataset card template](../templates/dataset-card.md), [sustainability plan template](../templates/sustainability-plan.md)).*


## Appendix (optional)

- **Public materials**: links to the paper, dataset, code, annotation guidelines, evaluation scripts.
- **Related case studies in this playbook.**
- **Follow-up projects** you are aware of.

---

*A case study is not a marketing document. Its usefulness is proportional to its honesty.*
