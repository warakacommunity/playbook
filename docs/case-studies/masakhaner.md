---
wip: true
sidebar_position: 2
title: MasakhaNER 1 → 2
draft: false
last_update:
  date: 2026-07-07
  author: Idris Abdulmumin
---

# MasakhaNER 1 → 2

*Public-record draft. Last reviewed: 2026-07-07.*

:::warning[Public-record draft — awaiting project-lead review]
This retrospective is assembled from the published papers ([Adelani et al., 2021](https://aclanthology.org/2021.tacl-1.66/); [Adelani et al., 2022](https://arxiv.org/abs/2210.12391)), the [MasakhaNER GitHub repository](https://github.com/masakhane-io/masakhane-ner), and the [MasakhaNER 2 dataset card on the Hugging Face Hub](https://huggingface.co/datasets/masakhane/masakhaner2). **It has not been reviewed or approved by the project leads.** Numbers, dates, and social/political narrative may be incomplete, wrong at the margins, or missing what actually happened.

If you led this project, please open a pull request replacing this draft with your own voice — the questionnaire below is exactly the structure the retrospective needs, and the public-record answers give you a starting point to correct rather than a blank page.
:::

## Front matter

- **Project name:** MasakhaNER 1 (2021) → MasakhaNER 2 (2022)
- **Task and modality:** Named Entity Recognition, text
- **Languages covered:** MasakhaNER 1 — 10 African languages: Amharic, Hausa, Igbo, Kinyarwanda, Luganda, Luo, Nigerian Pidgin, Swahili, Wolof, Yoruba. MasakhaNER 2 — 20: Amharic, Bambara, Ewe, Fon, Ghomala, Hausa, Igbo, Kinyarwanda, Luganda, Luo, Mossi, Chichewa, Chishona, Kiswahili, Setswana, Twi, Wolof, isiXhosa, Yoruba, isiZulu.
- **Release date(s):** v1 — 2021 (TACL); v2 — 2022 (arXiv preprint).
- **Canonical paper / repo / dataset URL(s):**
  - v1: [Adelani et al., 2021 (TACL)](https://aclanthology.org/2021.tacl-1.66/)
  - v2: [Adelani et al., 2022 (arXiv)](https://arxiv.org/abs/2210.12391)
  - Code + guidelines: [github.com/masakhane-io/masakhane-ner](https://github.com/masakhane-io/masakhane-ner)
  - Data on HF Hub: [huggingface.co/datasets/masakhane/masakhaner2](https://huggingface.co/datasets/masakhane/masakhaner2)
- **Project leads (attributable):** David Ifeoluwa Adelani et al. (see paper author lists). *[Awaiting project-lead confirmation of contributing-lead attribution.]*
- **License:** CC BY-NC 4.0

## The seventeen questions

### 1. What was the goal at the start?

Build a high-quality NER benchmark for African languages that the community could actually annotate with participatory methods, and that would produce reusable transfer signal across the family of covered languages. Published goals were to demonstrate that quality NER for African languages is feasible with community-led annotation, and to seed downstream fine-tuning across the ten (later twenty) languages.

*[Awaiting project-lead confirmation of the internal target vs. the paper-abstract framing.]*

### 2. Who was on the team?

Distributed across contributors from Masakhane and collaborating institutions; native-speaker annotators recruited per language through the community's participatory model, following the pattern from [Nekoto et al., 2020](https://aclanthology.org/2020.findings-emnlp.195/). Exact per-language headcount not stated in the papers.

*[Awaiting project-lead answers on: total headcount, roles (lead annotator, native-speaker annotator, ML engineer, project manager, community liaison), recruitment channels, and compensation model (paid vs. volunteer + volunteer-hour estimate).]*

### 3. How long did it take? (Planned vs. actual)

v1 was announced and shipped in 2021; v2 followed roughly 12–18 months later in 2022. The papers do not report a per-language annotation timeline. The public commit history on GitHub suggests active annotation work spread across several months per language batch.

*[Awaiting project-lead answers on: original timeline, actual timeline, where slippage came from.]*

### 4. What did it cost? (Money and effort)

Not stated in the papers or the public repo. Community-led participatory annotation on this scale is order-of-magnitude a small-to-medium research grant.

*[Awaiting project-lead answers on: approximate budget, split by cost centre, effort in person-months, whether volunteer time dominated and its estimated hours.]*

### 5. What was the hardest problem — technical?

Public-record inference: consistent annotation guidelines across ten (later twenty) typologically diverse languages, and adjudicating disagreements over entity boundaries where diacritic conventions and code-switching complicated the definition of a single token. The v2 paper notes cross-lingual transfer analysis as a substantial technical piece of the work.

*[Awaiting project-lead confirmation of the specific hardest technical problem.]*

### 6. What was the hardest problem — social or political?

Not stated in the papers. Participatory-annotation projects at this scale typically deal with coordinating volunteer annotators across time zones and unequal internet access, and negotiating whether guidelines apply uniformly across languages that categorise entities differently. *[Awaiting project-lead account.]*

### 7. What was the biggest mistake?

*[Not present in the papers or repo; a retrospective question. Awaiting project-lead answer.]*

### 8. What surprised the team?

Public-record: the cross-lingual transfer performance in v2 exceeded some baseline expectations for languages with limited pretraining data (see paper Section 5). *[Awaiting project-lead confirmation of what internally surprised the team vs. what the paper frames as expected.]*

### 9. Which decisions turned out to matter?

Public-record inference from the papers and community discussions:

- Committing to a participatory annotation model rather than a crowd-work model. The workforce structure is arguably the difference between the corpus and a commercial NER benchmark for the same languages.
- Publishing the annotation guidelines alongside the data. Downstream teams have been able to extend the corpus without needing to reverse-engineer the label conventions.
- Choosing CC BY-NC 4.0 rather than a permissive licence. Kept the corpus in a community-benefiting space; downstream researchers can use it, commercial re-use requires negotiation.

*[Awaiting project-lead confirmation and any additional decisions.]*

### 10. Which decisions turned out not to matter?

*[Awaiting project-lead answer.]*

### 11. What did the metrics not show?

Public-record: the headline per-language F1 scores in the v2 paper do not disaggregate performance by entity type in detail, nor do they surface per-annotator agreement patterns. The paper mentions IAA at the corpus level; the more granular story of which languages required additional annotator recalibration is not in the public record.

*[Awaiting project-lead answer.]*

### 12. Where did the workforce model help or hurt?

Public-record: the [Nekoto et al., 2020 participatory model](https://aclanthology.org/2020.findings-emnlp.195/) is the reference the MasakhaNER papers cite; the model helped by giving native-speaker annotators authority over guideline decisions. *[Awaiting project-lead answer on what did not work well.]*

### 13. What tooling was load-bearing?

Public-record from the repo: annotation was conducted using a mix of shared annotation platforms and per-language spreadsheet workflows. The repo includes annotation guideline documents and conversion scripts. HuggingFace Datasets was the distribution surface for v2.

*[Awaiting project-lead answer on which specific tools were load-bearing vs. which produced friction.]*

### 14. What would you do differently with the same budget?

*[Not present in the papers. Awaiting project-lead answer.]*

### 15. What advice would you give a team starting the same task today?

Public-record inference from the papers and community practice:

1. Read the MasakhaNER 2 annotation guidelines before writing your own — they are the reference for how to disambiguate PER/ORG/LOC for African-language content, and their reasoning documents years of adjudication decisions.
2. Do not skip the participatory workflow. Guideline drift is the single largest source of annotation quality problems, and native-speaker adjudicators catch drift that cross-cultural annotators miss.
3. Publish per-language + per-class F1, not aggregate macro-F1. The aggregate hides where the corpus's coverage is thin and misleads downstream users.
4. Budget for one full round of annotator recalibration after the first 500 sentences per language.

*[Awaiting project-lead confirmation and additions.]*

### 16. Where has the project been used since release?

Widely. As of the v2 paper's citation count and downstream releases:

- Base for most subsequent African-language NER fine-tunes on the HF Hub.
- Reference for [AfroXLMR](https://huggingface.co/Davlan/afro-xlmr-large) fine-tuning evaluation.
- Used in [AfroBench](https://arxiv.org/abs/2510.05644) and related multi-task benchmarks.
- Cited by [AfriSenti](https://arxiv.org/abs/2302.08956), [LAFAND-MT](https://aclanthology.org/2022.naacl-main.223/), [AfriQA](https://arxiv.org/abs/2305.06897), and other Masakhane-lineage corpora as the reference for participatory annotation methodology.

*[Awaiting project-lead answers on: notable industry deployments, any bad-faith uses discovered.]*

### 17. What is the current state of the project?

Actively maintained; the [MasakhaNER GitHub repo](https://github.com/masakhane-io/masakhane-ner) receives updates and community contributions. Not superseded — v2 remains the reference corpus for African-language NER.

*[Awaiting project-lead answer on: whether a v3 is under way, current maintenance model, and named steward for re-use requests.]*

## Appendix

- **Public materials** — [v1 paper (TACL 2021)](https://aclanthology.org/2021.tacl-1.66/); [v2 paper (arXiv 2022)](https://arxiv.org/abs/2210.12391); [GitHub repo](https://github.com/masakhane-io/masakhane-ner); [HF Hub dataset](https://huggingface.co/datasets/masakhane/masakhaner2).
- **Related case studies in this playbook** — AfriSenti (draft pending), AfriQA (draft pending), LAFAND-MT (draft pending).
- **Follow-up projects** — the annotation methodology of MasakhaNER influenced AfriSenti (14-language sentiment) and later Masakhane corpora across sentiment, MT, and QA.

---

**Contributor's note.** This is the first Case Study in the chapter, and it is a public-record draft. Its purpose is to prove the seventeen-question format works at scale; its purpose is *not* to replace the project leads' voice. If you led MasakhaNER 1 or 2, please open a pull request rewriting this in your own words — even a partial rewrite of a few sections adds more value than an entirely public-record page.
