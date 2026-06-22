---
sidebar_position: 1
slug: /
---

# 1. Introduction

:::tip[Help build the AfriPlaybook]
This playbook is open source and community-owned. You don't need to write a whole chapter to help. Fixing an error, translating a page, or sharing what worked on a real project all count. See [**Built in the open**](#built-in-the-open) below, or jump straight to the [contribution guide](https://github.com/MasakhaneHubNLP/MasakhanePlaybook/blob/main/README.md#ways-to-contribute).
:::


> The bullet was the means of the physical subjugation. Language was the means of the spiritual subjugation.
>
> — Ngũgĩ wa Thiong'o, *Decolonising the Mind: The Politics of Language in African Literature* (1986)

Africa is home to roughly a third of the world's living languages, about 2,000 of the some 7,000 spoken on Earth ([Ethnologue, 2019](https://www.ethnologue.com/)). Almost none of them are visible to the systems now reshaping how the rest of the world reads, writes, searches, translates, and speaks. When a language model stumbles over Yorùbá, Chichewa, or Wolof, the cause is rarely the model. It is the data. The text and speech these systems learn from barely exist in a usable form.

[Joshi et al. (2020)](https://aclanthology.org/2020.acl-main.560/) sort the world's languages into six tiers by how many resources they have. The bottom tier, the *left-behinds*, with essentially no labelled data and little prospect of being served by current methods, holds the overwhelming majority of languages, and African languages crowd into it. Most have no annotated corpus, no benchmark, no tools. They are missing not because they are small. Many have tens of millions of speakers. They are missing because no one has built the data.

![Joshi et al.'s six language resource classes, plotted by how much labelled and unlabelled data each has. Class 0, the left-behinds, holds the overwhelming majority of languages and sits at the bottom with almost no data; African languages crowd into classes 0 and 1. The better-resourced classes hold only a handful of languages each.](./africanlp-language-classes.svg)

## Scraping will not fix this

When a language has no data, the instinct is to go and scrape more of it: crawl a wider slice of the web and trust that coverage will follow. For African languages, that instinct fails.

The web does not contain much African-language text, and what it contains is thin and noisy. When [Kreutzer et al. (2022)](https://aclanthology.org/2022.tacl-1.4/) audited the large multilingual crawls everyone trains on, they found that for many low-resource languages a large share of the data was mislabelled, machine-translated, or not language at all. At the tail, quality collapses along with quantity.

The only sure way to get high-quality data for African languages is to build it with the people who speak them, the people who know the words, the grammar, the idioms, and the culture. One of the main blockers to AfricaNLP is that the people who speak these languages are not the ones building the data. The people who build it often cannot tell what is correct, what is offensive, or what is missing. They do not know what matters to the communities behind the language, or how to keep the data they collect from causing harm.

That gap has real consequences. Data built without its speakers can look clean while being quietly wrong, and any model trained on it inherits every mistake. Such errors spread, into search results, translations, and the everyday tools that millions of people are starting to depend on. Getting the data right decides whether a language is served well, served badly, or left out of these tools altogether.

This playbook is about how to fix that problem. It is a practical, opinionated, step-by-step guide to building high-quality datasets for African languages, drawing on the direct experience of the people who speak and understand them. The playbook is build by the people who know the languages, for the people who want to build datasets for them. It is about how to do it right, and how to do it safely.


## The field is growing, the data is not keeping up

African-language NLP is no longer a fringe pursuit. A recent survey of two decades of the field counts 1,902 papers from 4,901 authors between 2005 and 2025, and the curve is steep: in 2006 there were 21 papers from 78 researchers; by 2024 there were 287 papers from 1,103 ([Belay et al., 2025](https://arxiv.org/abs/2509.25477)).

![AfricaNLP papers and authors grew roughly fourteenfold between 2006 and 2024.](./africanlp-growth.svg)

But look at *what* that work produces. When the same survey hand-labelled nearly 7,800 contribution statements by what they actually delivered, methods accounted for 53 percent of the effort and new datasets for just 21 percent ([Belay et al., 2025](https://arxiv.org/abs/2509.25477)). The field is learning to model far faster than it is building the data those models learn from.

![Methods make up 53 percent of AfricaNLP contributions; new datasets just 21 percent.](./africanlp-contributions.svg)

The reason is no mystery. A method can be carried from one language to the next; a dataset has to be built for each one, from scratch, by people who speak it. That means recruiting annotators, writing guidelines, running quality control, and securing consent. It is slow, unglamorous work, and it is rarely funded. So it lags, and the languages that most need data are the ones least likely to get it.

This is not an abstract worry about coverage. Which languages have data is starting to decide who can use AI at all. Look at where adoption is surging: Microsoft attributes Asia's 2026 jump to models growing stronger in local languages, with usage in South Korea climbing after a release that finally handled Korean well ([Global AI Diffusion, 2026](https://arxiv.org/abs/2511.02781)). Capability in a language pulls its speakers online. The mirror image is a widening divide. In early 2026, 27.5 percent of working-age adults in the Global North used generative AI, against 15.4 percent in the Global South, and the North was pulling away more than twice as fast, with African economies clustered at the foot of the global table. Even the benchmark used to certify "multilingual" progress counts only two African languages, Swahili and Yorùbá, among fourteen. Capability decides access, and for African languages that capability is waiting on data no one has built yet.

## Why we wrote this playbook

Almost every guide to building datasets quietly assumes English, a generous budget, and a problem someone has already solved once. Little of that holds when you are starting a corpus for a language with no prior resources, a volunteer team, and decisions to make that the literature never covers.

The AfriPlaybook is the manual we wish we had had. It is a practical, opinionated guide to building high-quality language datasets across the full lifecycle, from deciding what to collect, through annotation design, quality control, and documentation, to release. It is written for the real conditions of African-language NLP: low resources, multilingual teams, scarce funding, and communities who must stay the owners of what they help create. The aim is narrow: to lower the barrier to getting started, and to raise the floor on quality, so that the datasets this community produces are ones the world can trust and reuse.

That is the gap this playbook exists to close. It pairs a step-by-step guide through every stage of dataset creation with practical [annotation tooling](../documentation/tooling.md), so that a small team can move from a plan to a documented, released dataset without reinventing the process each time. Lowering the cost of building data is how the balance in the chart above begins to shift.

## Built in the open

This playbook is open source, and it is maintained by the AfricaNLP and Masakhane community. We invite researchers to contribute to a chapter or two, but the playbook is not just for researchers. It is for everyone who builds datasets for African languages, whether as a volunteer, a student, a community organizer, or a professional. The playbook is only as good as the people who contribute to it, and the people who build datasets are the ones who know best what it should say. The guide we have now is good, but it can be better, and it can only get better if more people add what they know. There are many ways to contribute:

- **Write** a chapter or section that fills a gap.
- **Review** existing chapters: correct an error, sharpen a claim, add a reference.
- **Share a case study** from a real project, including what went wrong.
- **Open a discussion** when you disagree with an approach. Disagreement makes the guide better.

Start with the [contribution guide](https://github.com/MasakhaneHubNLP/MasakhanePlaybook/blob/main/README.md#ways-to-contribute), raise an idea in [GitHub Discussions](https://github.com/MasakhaneHubNLP/MasakhanePlaybook/discussions), or join us on [Discord](https://discord.gg/ChNPHV2PPS). If you build datasets for African languages, or want to learn how, you are already part of who this is for. Come and build it with us.

## How to read this playbook

The playbook runs end-to-end through the dataset lifecycle, but you don't have to read it that way. Pick the path that fits where you are:

- **New to dataset design.** Start here, then read chapters 2–4 in order: Data Collection, Annotation Design, Data Quality. They build on each other and cover the foundations everyone needs.
- **You already have raw data and want help annotating it.** Go to chapter 3 (Annotation Design and Workforce Management), then chapter 4 (Data Quality Assurance and Validation).
- **You're working with a specific modality** (speech, multimodal, low-resource scripts). Skip to chapter 5 (Modality-Specific Task Design).
- **You're using LLMs to generate or augment data.** Read chapter 7 (LLM-Assisted and Synthetic Data Generation) for the trade-offs and safeguards.
- **You're preparing a dataset for release.** Read chapter 6 (Documentation, Data Release, and Governance) and chapter 9 (Dataset Lifecycle Management and Release Checklist).
- **You're coordinating a team or community group.** See [Onboarding a Team](./onboarding.md) and [Running a Playbook Workshop](./running-workshops.md).
- **You're offline or on a slow connection.** Use **Download PDF** in the navbar. The whole playbook bundles into one file, rebuilt on every release.
- **You'd rather read in another language.** Use the language switcher at the top-right. Translations are community-maintained and grow over time.

Throughout, you'll find practical templates (consent forms, annotation guidelines, governance checklists), worked examples from real African-language projects, and links to datasets and tools you can reuse. New terms are defined in the [glossary](/AfriPlaybook/glossary).

---

## How to cite this playbook

If the AfriPlaybook informs your research, teaching, or project, please cite it.

**BibTeX:**

```bibtex
@misc{masakhane2026playbook,
  author       = {{Masakhane Community}},
  title        = {AfriPlaybook: A Practical Guide for Building NLP Systems for African Languages},
  year         = {2026},
  publisher    = {Masakhane},
  url          = {https://warakacommunity.github.io/AfriPlaybook/},
  note         = {Open-source community resource}
}
```

**Plain text (APA-style):**

> Masakhane Community. (2026). *AfriPlaybook: A Practical Guide for Building NLP Systems for African Languages*. [https://warakacommunity.github.io/AfriPlaybook/](https://warakacommunity.github.io/AfriPlaybook/)

For other formats (MLA, Chicago, etc.) and a machine-readable [`CITATION.cff`](https://github.com/MasakhaneHubNLP/MasakhanePlaybook/blob/main/CITATION.cff), see the [/cite](/cite) page.

If you reference a specific chapter, please include the chapter title and its URL.
