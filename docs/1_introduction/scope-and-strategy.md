---
sidebar_position: 6
ready: true
last_update:
  date: 2026-11-26
  author: Shamsuddeen Hassan Muhammad
---

# What this playbook is (and isn't)

This page sets out the playbook's scope: what it covers, what it leaves to other guides, and why. Read it if you want to know whether the playbook will answer your question, or if you plan to write a new chapter.

:::tip[Key points]

- The playbook is a guide to building African-language datasets, not a model-training tutorial or a textbook.
- It takes clear positions, such as human evaluation for generative tasks and community ownership of data.
- It adds what similar handbooks cover only lightly: annotation workforce, non-text modalities, and an African, low-resource lens.
- For model training, tuning and serving, it links to established guides instead of rewriting them.
- Every chapter must give a reader an actionable next step within fifteen minutes.

:::

## The one-sentence framing

**AfriPlaybook is the canonical decision framework for anyone starting an African-language NLP project, grounded in the empirical experience of Masakhane's own past projects.**

Everything the playbook adds should sharpen that sentence. Everything it removes should be justified against it.

## What this playbook is not

- It is **not** a tutorial on training or fine-tuning models. That work is well covered by the [Hugging Face NLP Course](https://huggingface.co/learn/nlp-course), the [Google Deep Learning Tuning Playbook](https://github.com/google-research/tuning_playbook), the [Google Text Classification guide](https://developers.google.com/machine-learning/guides/text-classification), and [Advanced NLP with spaCy](https://course.spacy.io/en/). We link to them; we do not rewrite them.
- It is **not** a textbook. For the theory (tokenisation, sequence models, evaluation metrics, statistical foundations), go to Jurafsky and Martin's [*Speech and Language Processing*](https://web.stanford.edu/~jurafsky/slp3/). It is authoritative and free.
- It is **not** a catalogue of code recipes. Code drifts out of date faster than any playbook can be maintained. When we point at code, we point at a live, versioned, maintained repository. When we ship code ourselves, it lives in a companion repo that ships its own release tags.

- It is **not** neutral. We take positions:
  - character-level metrics for morphology-rich languages, such as chrF ([Popović, 2015](../references.md#popovic-2015)) and CER (character error rate), over word-level ones (BLEU, WER);
  - per-language and per-class score reporting over a single average;
  - human evaluation for anything generative;
  - consent from the people in the data;
  - community ownership of the resources built.

  If you disagree with those positions, this is not the playbook for you.

## What this playbook is

Structurally, this playbook belongs to the genre of **dataset-lifecycle and responsible-AI handbooks**. Its closest cousins are Datasheets for Datasets ([Gebru et al., 2021](../references.md#gebru-2021)), Data Statements for NLP ([Bender and Friedman, 2018](../references.md#bender-friedman-2018)), Model Cards ([Mitchell et al., 2019](../references.md#mitchell-2019)), and [The Turing Way](https://the-turing-way.netlify.app/). What we add on top of that lineage:

- A **first-class annotation-workforce chapter** (how to design work, hire, brief, review, pay, and retain annotators), which most dataset-lifecycle handbooks touch only lightly.
- **First-class modality tracks** for African-language reality: text, speech (ASR, TTS, S2ST), OCR/document AI, sign language and video. Most of the NLP guides named above focus on text.
- An **explicit low-resource, African-context lens**: patchy connectivity, multiple scripts, code-switching, small compute budgets, community-led workflows, community IP concerns.

Substantively, our job is to be the one document a new project can read that saves it a quarter of duplicated work.

## Why the focus is on data

The playbook focuses on data on purpose. The best-known NLP playbooks are built around model choice, fine-tuning, hyperparameter tuning and deployment. Most leave out annotation, low-resource languages and cultural context. This playbook covers what those guides assume has already been done.

The evidence points the same way:

- Practitioners, including teams in East and West Africa, report that data work is undervalued compared with model work, and that poor data causes compounding problems later ([Sambasivan et al., 2021](../references.md#sambasivan-2021)).
- Most of the world's languages, including most African languages, still have little labelled data ([Joshi et al., 2020](../references.md#joshi-2020)).

Owning the annotation, data quality, evaluation, community and African-context space keeps the playbook focused and durable. Competing with model-training guides on their own ground would spread it thin and produce content that dates within a year.

## Related chapters beyond the dataset lifecycle

Some chapters go beyond building a dataset, but only where the African context changes the answer:

- [Before You Start](../before-you-start/index.md): how to search for prior work, judge what you find, and decide whether to reuse, extend or build. It teaches search patterns instead of keeping a list of datasets, because no hand-written list can keep up with the field.
- [Case Studies](../case-studies/index.md): retrospectives from people who built African-language datasets.
- [Deployment](../deployment/index.md): offline and low-connectivity use, edge devices, messaging channels, and non-standard scripts.
- [Cross-language transfer](../cross-language-transfer/index.md): which related languages can help when your language has little data.
- [Legal, consent, and community IP](../legal-consent/index.md): data laws, consent and community rights.
- [Long-tail language onboarding](../long-tail-language/index.md): where to start for a language with speakers but no digital corpus.
- [Compute-poor training and evaluation](../compute-poor/index.md): working with small compute budgets.

## What we deprioritise

- **Hyperparameter tuning methodology.** Owned by Google's DL Tuning Playbook. We link.
- **Model architecture selection recipes.** Owned by the Hugging Face NLP Course and the model cards on the HF Hub. We link.
- **Fine-tuning recipes for named base models.** Same. We link.
- **Prompt engineering catalogues.** Fast-moving. Owned by the model providers' own cookbooks. We link.
- **Serving, latency, and cost optimisation for cloud deployments.** Owned by MLOps playbooks and cloud providers. We may cover the *African-context* pieces (edge, offline) but do not compete on the general case.

## The one rule that keeps this playbook honest

**Every chapter is graded against one question: does a reader with a specific task and language leave with an actionable next step in fifteen minutes or less?**

If yes, the chapter earns its place. If no, it is either rewritten to answer that question, or removed. Comprehensive without useful is the failure mode we most fear.

---

*This scope is reviewed at major playbook releases. See the [changelog](https://github.com/warakacommunity/playbook/releases) for what changed and when.*
