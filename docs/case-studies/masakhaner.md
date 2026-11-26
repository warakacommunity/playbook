---
ready: true
sidebar_position: 2
title: MasakhaNER 1 → 2
last_update:
  date: 2026-11-26
  author: Shamsuddeen Hassan Muhammad
---

# MasakhaNER 1 → 2

*Public-record draft. Last reviewed: 2026-11-22.*

:::warning[Public-record draft: awaiting project-lead review]
This retrospective is assembled from the published papers ([Adelani et al., 2021](../references.md#adelani-2021); [Adelani et al., 2022a](../references.md#adelani-2022)), the [MasakhaNER GitHub repository](https://github.com/masakhane-io/masakhane-ner), and the [MasakhaNER 2 dataset card on the Hugging Face Hub](https://huggingface.co/datasets/masakhane/masakhaner2). **It has not been reviewed or approved by the project leads.** Numbers, dates, and social/political narrative may be incomplete, wrong at the margins, or missing what actually happened.

If you led this project, please open a pull request replacing this draft with your own voice. The questionnaire below is exactly the structure the retrospective needs, and the public-record answers give you a starting point to correct rather than a blank page.
:::

## Project facts

- **Project name:** MasakhaNER 1 (2021) → MasakhaNER 2 (2022)
- **Task and modality:** Named Entity Recognition, text (news domain)
- **Languages covered:**
  - MasakhaNER 1 (10 African languages): Amharic, Hausa, Igbo, Kinyarwanda, Luganda, Luo, Nigerian Pidgin, Swahili, Wolof, Yorùbá.
  - MasakhaNER 2 (20): Bambara, Chichewa, chiShona, Ewe, Fon, Ghomala, Hausa, Igbo, isiXhosa, isiZulu, Kinyarwanda, Swahili, Luganda, Luo, Mossi, Nigerian Pidgin, Setswana, Twi, Wolof, Yorùbá.
  - Amharic is in version 1 only; version 2 drops it and adds eleven new languages.
- **Release date(s):** v1, preprint March 2021, published in *Transactions of the ACL* vol. 9 (2021); v2, preprint October 2022, published at EMNLP 2022.
- **Canonical paper / repo / dataset URL(s):**
  - v1: [Adelani et al., 2021](../references.md#adelani-2021), TACL
  - v2: [Adelani et al., 2022a](../references.md#adelani-2022), EMNLP
  - Code, guidelines and data: [github.com/masakhane-io/masakhane-ner](https://github.com/masakhane-io/masakhane-ner)
  - v2 on the Hugging Face Hub: [huggingface.co/datasets/masakhane/masakhaner2](https://huggingface.co/datasets/masakhane/masakhaner2)
- **Project leads (attributable):** David Ifeoluwa Adelani is first author of both papers; v1 lists 61 authors and v2 lists 45, many of them annotators and language coordinators affiliated with Masakhane. *[Awaiting project-lead confirmation of contributing-lead attribution.]*
- **Licence:** CC BY-NC 4.0 for the NER annotations, per the GitHub repository. The repository notes that the underlying news texts carry different licences depending on the source website. The Hugging Face card's metadata tag says `afl-3.0` while its licensing section says CC BY-NC 4.0; treat the repository as authoritative. The papers do not state why the non-commercial clause was chosen.
- **Communities and partners:** Annotators and language coordinators came from the Masakhane community and other AI/NLP communities in Africa. The v2 paper notes that the choice of languages was itself constrained by which languages had available volunteers.
- **Data sources:** Local news, chosen so the entities would be relevant to native speakers. v1 drew on outlets such as BBC (Igbo, Pidgin), VOA (Hausa, Swahili), IGIHE (Kinyarwanda), Bukedde (Luganda) and Ramogi FM (Luo). v2 collected new monolingual news for nine languages and, for the eleven languages without enough monolingual news, annotated the human-translated news of [MAFAND-MT](../references.md#mafand-2022). Wikipedia was considered for v2 and rejected over quality concerns.
- **Consent and permissions:** Not described in either paper. The source texts are published news, and their licences vary by outlet (see *Licence* above).
- **Guidelines and revisions:** Both versions followed the MUC-6 annotation guide with four types: PER, ORG, LOC and DATE. v1 replaced CoNLL-2003's MISC type with DATE because MISC is ill-defined and causes disagreement among non-expert annotators. The MasakhaNER annotation guideline is published in the GitHub repository.
- **Agreement and quality figures:** v1 reports entity-level Fleiss' κ of 0.959 to 1.000 per language. v2 reports entity-level Fleiss' κ of 0.907 (Luo) to 1.000 (Ghomala) after language coordinators resolved disagreements, followed by automatic quality-control flags that 10 of the 20 language teams went back and fixed (see question 11).


## The seventeen questions

### 1. What was the goal at the start?

Build a high-quality NER benchmark for African languages that the community could actually annotate with participatory methods, and that would produce reusable transfer signal across the family of covered languages. Published goals were to demonstrate that quality NER for African languages is feasible with community-led annotation, and to seed downstream fine-tuning across the ten (later twenty) languages.

*[Awaiting project-lead confirmation of the internal target vs. the paper-abstract framing.]*

### 2. Who was on the team?

Contributors from Masakhane and collaborating institutions, organised around the participatory model of Masakhane ([Nekoto et al., 2020](../references.md#nekoto-2020)), which the v2 ethics statement cites. The two versions were staffed differently:


- **v1:** 2 to 6 native-speaker annotators per language (Table 3 of the paper), from the same regions as the news sources. They volunteered through Masakhane, were not paid, and all became co-authors. They were trained on the MUC-6 guide and held collaborative workshops per language to discuss disagreements.
- **v2:** a language coordinator plus three native-speaker annotators per language, all paid (\$10 per hour, at about 200 sentences per hour; see question 4). Coordinators attended two online training workshops, each annotated 100 English sentences that were checked, and then trained their own teams on English and African-language text.


*[Awaiting project-lead answers on: total headcount beyond the author lists, roles such as ML engineer, project manager or community liaison, and recruitment channels.]*

### 3. How long did it take? (Planned vs. actual)

The v1 preprint appeared in March 2021 and the paper was published in TACL later that year. The v2 preprint followed in October 2022, about 19 months after the v1 preprint, and was presented at EMNLP 2022. Neither paper reports a per-language annotation timeline. The v2 paper gives one useful unit cost: annotating 100 sentences takes about 30 minutes, and 500 sentences about two and a half hours.

*[Awaiting project-lead answers on: original timeline, actual timeline, where slippage came from.]*

### 4. What did it cost? (Money and effort)

Public record only: v1 ran on volunteer time. v2 was funded by [Lacuna Fund](https://lacunafund.org/), and annotators and coordinators were paid \$10 per hour at about 200 sentences per hour. The acknowledgements credit donated compute: GPUs at Saarland University for v1, and Google Cloud credits and Luleå University of Technology resources for v2. Neither paper gives a total budget.

*[Awaiting project-lead answers on: approximate budget, split by cost centre, effort in person-months, and the volunteer hours behind v1.]*

### 5. What was the hardest problem (technical)?

Public-record inference: keeping one set of guidelines consistent across ten (later twenty) typologically diverse languages. The v1 paper lists language features that complicate entity spans, for example Igbo, Wolof and Yorùbá writing numbers out as words, which changes how many tokens a DATE entity has. In v2, the Yorùbá source text lacked diacritics, so native speakers added them by hand before annotation. Choosing the best transfer language was the main technical analysis in v2.

*[Awaiting project-lead confirmation of the specific hardest technical problem.]*


### 6. What was the hardest problem (social or political)?

Not stated in the papers. Participatory-annotation projects at this scale typically deal with coordinating volunteer annotators across time zones and unequal internet access, and negotiating whether guidelines apply uniformly across languages that categorise entities differently. *[Awaiting project-lead account.]*


### 7. What was the biggest mistake?

*[Not present in the papers or repo; a retrospective question. Awaiting project-lead answer.]*

### 8. What surprised the team?

Public-record findings that the papers present as notable:

- **English is a poor default source language.** In v2, zero-shot transfer from the best African source language beat transfer from English (average 56.9 F1) by +14 F1 on average across the 20 languages, and the second-best source by +12 F1 (Section 6 of the v2 paper).
- **Geography matters more than dataset size.** Geographic distance and entity overlap were the strongest predictors of good transfer; the size of the source dataset was not among the most important features.
- **Script can zero out a model.** In v1, mBERT scored 0.0 F1 on Amharic, a language whose Ge'ez script it had not seen in pre-training.

*[Awaiting project-lead confirmation of what internally surprised the team vs. what the paper frames as expected.]*

### 9. Which decisions turned out to matter?

Public-record inference from the papers:

- **A participatory model rather than crowd work.** Native speakers from the source regions annotated, adjudicated and co-authored. The workforce structure is arguably what distinguishes the corpus from a crowd-sourced NER benchmark for the same languages.
- **Language coordinators in v2.** Each language had a coordinator who trained and supervised the annotators. For Nigerian Pidgin, the coordinator discussing and resolving disagreements with the annotators raised entity-level κ from 0.648 to 0.966 (after coordinator intervention, before final adjudication).
- **DATE instead of MISC.** Dropping CoNLL's ill-defined MISC type kept the label set small enough for non-expert annotators to agree on.
- **Reusing MAFAND-MT text.** Annotating an existing translated news corpus let v2 cover eleven languages for which there was not enough monolingual news, at the cost of possible translationese (the authors report no serious issues).
- **Publishing the annotation guideline alongside the data,** so downstream teams can extend the corpus without reverse-engineering the label conventions.
- **CC BY-NC 4.0 rather than a permissive licence.** Researchers can reuse the annotations freely; commercial use is not covered by the licence.


*[Awaiting project-lead confirmation and any additional decisions.]*

### 10. Which decisions turned out not to matter?

*[Awaiting project-lead answer.]*

### 11. What did the metrics not show?

Public-record observations:

- **Agreement figures are post-discussion.** v1 reports perfect κ = 1 for Kinyarwanda, Luo, Swahili and Wolof, but each of these had two annotators who were told to discuss and resolve conflicts among themselves. v2 reports κ after coordinator intervention; the paper notes that pre-intervention scores were much lower, giving only one example (Nigerian Pidgin, 0.648 before, 0.966 after).
- **Quality control was uneven.** In v2, reviewing the automatically flagged tokens was voluntary, and only 10 of the 20 language teams fixed all flagged tokens.
- **Averages hide the spread.** The best v2 model, AfroXLM-R-large, averages 87.0 F1, but per-language scores range from 74.8 (Ghomala) to 96.2 (chiShona). In v1, XLM-R-large averages 80.5 F1 with a range from 67.9 (Wolof) to 90.5 (Hausa).
- **Dataset sizes differ.** v1 splits range from 921 sentences (Luo) to about 3,200; v2 has roughly 4,800 to 11,000 sentences per language, so per-language scores are not equally reliable.

The papers do report per-language agreement and per-language F1; what remains unpublished is which languages needed the most recalibration and why.

*[Awaiting project-lead answer.]*

### 12. Where did the workforce model help or hurt?

Public-record: the v2 ethics statement places the work in the participatory research tradition of Masakhane ([Nekoto et al., 2020](../references.md#nekoto-2020)), with native speakers involved throughout as stakeholders. Volunteering and co-authorship carried v1; v2 moved to paid annotators and paid coordinators, which coincides with the jump from 10 to 20 languages and with a more formal training and adjudication process. The cost of volunteer goodwill shows in v2's quality control: because reviewing flagged tokens was voluntary, half the languages did not complete it.


*[Awaiting project-lead answer on what did not work well, and on retention between v1 and v2.]*

### 13. What tooling was load-bearing?

Public-record: both versions were annotated in the ELISA annotation tool, provided by Heng Ji and Ying Lin. The v1 paper credits ELISA's entity-level F1 display and correction interface with making high agreement easy to reach, and v2 used its adjudication function. v2 added scripts that automatically flag likely errors: tokens usually tagged as entities but missed in one place, tokens with near-zero entropy over entity types, and probable sentence-boundary errors. The GitHub repository holds the guideline, data and training code (based on the Hugging Face Transformers implementation), and the Hugging Face Hub distributes v2.

*[Awaiting project-lead answer on which tools were load-bearing and which produced friction.]*

### 14. What would you do differently with the same budget?

*[Not present in the papers. Awaiting project-lead answer.]*

### 15. What advice would you give a team starting the same task today?

Public-record inference from the papers:

1. Read the MasakhaNER annotation guideline (in the [GitHub repository](https://github.com/masakhane-io/masakhane-ner)) before writing your own. It is the reference for applying PER, ORG, LOC and DATE to African-language news.
2. Budget for a coordinator per language who discusses and resolves disagreements with the annotators. In v2, this is what moved Nigerian Pidgin from κ = 0.648 to 0.966 (after coordinator intervention, before final adjudication).
3. Publish per-language and per-class F1, not only an average. The average hides where the corpus's coverage is thin.
4. Before annotating thousands of sentences, try transfer from the closest covered language. In v2, zero-shot transfer from the best source language came close to training on 500 annotated target sentences (about two and a half hours of annotation), and fine-tuning on 100 to 500 target sentences on top of it helped further. See [cross-language transfer](../cross-language-transfer/index.md).

*[Awaiting project-lead confirmation and additions.]*

### 16. Where has the project been used since release?

Widely. Examples from the public record:

- Standard evaluation set for Africa-centric language models such as [AfroXLMR](https://huggingface.co/Davlan/afro-xlmr-large).
- NER task in [AfroBench](../references.md#afrobench), via MasakhaNER-X, an aggregation of MasakhaNER 1 and 2 covering 20 languages (from XTREME-UP).
- Part of the same Masakhane lineage as [MAFAND-MT](../references.md#mafand-2022) (whose translated news v2 annotated), [AfriSenti](../references.md#muhammad-2023) and [AfriQA](../references.md#afriqa-2023).


*[Awaiting project-lead answers on: notable industry deployments, any bad-faith uses discovered.]*

### 17. What is the current state of the project?

Data, code and guidelines are on the [MasakhaNER GitHub repository](https://github.com/masakhane-io/masakhane-ner), and v2 is also on the Hugging Face Hub; both versions ship with 70/10/20 train/dev/test splits. The repository is not archived and was last updated in October 2025. We found no public announcement of a version 3. v2 was described at release (2022) as the largest human-annotated NER dataset for African languages, though v1 is still the source for Amharic.


*[Awaiting project-lead answer on: whether a v3 is under way, current maintenance model, and named steward for re-use requests.]*

## Appendix

- **Public materials**: [v1 paper (TACL 2021)](https://aclanthology.org/2021.tacl-1.66/); [v2 paper (EMNLP 2022)](https://aclanthology.org/2022.emnlp-main.298/); [GitHub repo with guideline and code](https://github.com/masakhane-io/masakhane-ner); [HF Hub dataset](https://huggingface.co/datasets/masakhane/masakhaner2).
- **Related case studies in this playbook**: AfriSenti (draft pending), AfriQA (draft pending), MAFAND-MT (draft pending), AfroBench (draft pending).
- **Related playbook pages**: [Before You Start: NER](../before-you-start/ner.mdx) walks through reusing MasakhaNER for a new project.
- **Follow-up projects**: later Masakhane corpora in sentiment ([AfriSenti](../references.md#muhammad-2023)) and question answering ([AfriQA](../references.md#afriqa-2023)) also used native-speaker annotation organised through the community.


---

**Contributor's note.** This is the first Case Study in the chapter, and it is a public-record draft. Its purpose is to prove the seventeen-question format works at scale; its purpose is *not* to replace the project leads' voice. If you led MasakhaNER 1 or 2, please open a pull request rewriting this in your own words. Even a partial rewrite of a few sections adds more value than an entirely public-record page.
