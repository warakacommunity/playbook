---
sidebar_position: 1
slug: /
ready: true
last_update:
  date: 2026-09-24
  author: Shamsudddeen Hassan Muhammad
---

# Welcome

![AfriPlaybook cover: a baobab tree against a low ochre sun under an indigo sky, framed by earth-tone kente cloth, with the word for language in Hausa, Amharic, Swahili, Yorùbá, Igbo, Zulu, Somali, Kinyarwanda, Luganda and Wolof linked like a network across the sky.](images/afriplaybook-cover.svg)

This is the website of the **AfriPlaybook**, an open guide to building datasets for African languages. It follows a dataset from first idea to public release: deciding what to collect and from whom, designing the annotation task, recruiting and paying the people who do it, checking their work, documenting the result, and publishing it so that others can build on it.

Africa is home to roughly a third of the world's languages, yet most of them have almost none of the text and speech that language technology depends on. The reason is that building good data is expensive, careful work, and few people are ever taught how to do it. Most guidance on dataset creation assumes English, a comfortable budget, and a task someone has solved before. This playbook assumes instead the conditions most African-language projects face: modest funding, volunteer or part-time teams, several languages and scripts at once, and communities who should remain the owners of what they help to create.

## Who this playbook is for

The playbook is written for anyone who builds, or wants to build, a dataset for an African language, and for NLP researchers working on any language where data is scarce. It draws its examples from African projects, but the problems it deals with are not unique to Africa: little usable text online, several scripts or dialects within one language, small budgets, and communities whose consent and ownership must be respected. Most of its advice applies wherever those conditions hold. Among its readers we expect graduate students beginning a thesis, researchers planning a shared task or benchmark, linguists and language activists who want their language to be usable by machines, community organisers running a collection drive, and engineers who have discovered that the data they need does not exist. No background in machine learning is assumed. What is assumed is a language you care about and a willingness to do careful work.

## What you will learn

The chapters are grouped into parts:

- **Foundations** covers the work common to every project: planning, collecting data, designing annotation, governing data, assuring its quality, and working with communities.
- **[Text](../sections/text.md)** covers text classification, text generation and machine translation.
- **[Speech](../sections/speech.md)** covers speech recognition, text-to-speech, speech translation, audio understanding, emotion recognition and speaker diarization.
- **[Vision](../sections/vision.md)** covers image data, document AI and OCR, and sign language and video.
- **[Multimodal](../sections/multimodal.md)** covers tasks that pair images with text, and the use of large language models to help build data.
- **[Lifecycle & Release](../sections/lifecycle.md)** covers evaluation, documentation, release, deployment, cross-language transfer, and the law and ethics of consent.
- **[Templates](../templates/index.md)** gives you documents to adapt, such as consent forms, annotation guidelines and dataset cards.
- **[Case Studies](../case-studies/index.md)** describes real projects, written by the people who ran them.

Each of the task parts explains what changes when you build data for that kind of task.

## How to read it

You do not have to read the playbook in order. If you are starting a project from nothing, begin with the [Introduction](./introduction.md), which explains why African languages lack data and why scraping the web will not fix it, and then read the Foundations chapters in sequence. If you already know your task, go to [Before You Start](../before-you-start/index.md), which lists existing resources for common tasks and helps you decide whether to extend an existing dataset or build a new one. [How to read this playbook](./how-to-read.mdx) suggests other routes through the book, and the [glossary](../glossary.md) defines its terms. If you work offline or on a slow connection, the whole playbook is available as a single PDF from the **AfriPlaybook** menu at the top of the page.

## Free and open

This website is free to read and will remain so. The playbook is maintained by the Waraka community in collaboration with AfricaNLP and Masakhane, and it improves only as far as its readers improve it. If you find an error, have run a project whose lessons others should hear, or can translate a page, please [contribute](./how-to-contribute.md). The site interface is available in Hausa, Amharic, Swahili, French and Portuguese, and translations of the chapters are added as volunteers complete them. Questions and disagreements are welcome in [GitHub Discussions](https://github.com/warakacommunity/playbook/discussions) and on [Discord](https://discord.gg/ChNPHV2PPS).

If the playbook informs your research or teaching, please [cite it](/cite).
