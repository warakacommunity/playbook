---
sidebar_position: 6
last_update:
  date: 2026-07-07
  author: Idris Abdulmumin
---

# What this playbook is (and isn't)

*A decision record. Written 2026-07 to make the playbook's scope and its next expansion honest and legible to anyone picking it up — readers, contributors, and funders alike.*

## The one-sentence framing

**AfriPlaybook is the canonical decision framework for anyone starting an African-language NLP project — grounded in the empirical experience of Masakhane's own past projects.**

Everything the playbook adds should sharpen that sentence. Everything it removes should be justified against it.

## What this playbook is not

- It is **not** a tutorial on training or fine-tuning models. That work is well covered by the [Hugging Face NLP Course](https://huggingface.co/learn/nlp-course), the [Google Deep Learning Tuning Playbook](https://github.com/google-research/tuning_playbook), the [Google Text Classification guide](https://developers.google.com/machine-learning/guides/text-classification), and [Advanced NLP with spaCy](https://course.spacy.io/en/). We link to them; we do not rewrite them.
- It is **not** a textbook. For the theory — tokenisation, sequence models, evaluation metrics, statistical foundations — go to Jurafsky and Martin's [*Speech and Language Processing*](https://web.stanford.edu/~jurafsky/slp3/). It is authoritative and free.
- It is **not** a catalogue of code recipes. Code drifts out of date faster than any playbook can be maintained. When we point at code, we point at a live, versioned, maintained repository. When we ship code ourselves, it lives in a companion repo that ships its own release tags.
- It is **not** neutral. We take positions. Character-level metrics for morphology-rich languages ([`chrF`](https://aclanthology.org/W15-3049/), CER) over word-level ones (BLEU, WER). Per-language and per-class score reporting over a single average. Human evaluation for anything generative. Consent from the people in the data. Community ownership of the resources built. If you disagree with those positions, this is not the playbook for you.

## What this playbook is

Structurally, this playbook belongs to the genre of **dataset-lifecycle and responsible-AI handbooks** — its closest cousins are [Datasheets for Datasets](https://arxiv.org/abs/1803.09010) (Gebru et al., 2018), [Data Statements for NLP](https://aclanthology.org/Q18-1041/) (Bender & Friedman, 2018), [Model Cards](https://arxiv.org/abs/1810.03993) (Mitchell et al., 2019), and [The Turing Way](https://the-turing-way.netlify.app/). What we add on top of that lineage:

- A **first-class annotation-workforce chapter** — how to design work, hire, brief, review, pay, and retain annotators — which most dataset-lifecycle handbooks touch only lightly.
- **First-class modality tracks** for African-language reality: text, speech (ASR, TTS, S2ST), OCR/document AI, sign language and video. Most NLP playbooks are text-only.
- An **explicit low-resource, African-context lens** — patchy connectivity, multiple scripts, code-switching, small compute budgets, community-led workflows, community IP concerns.

Substantively, our job is to be the one document a new project can read that saves it a quarter of duplicated work.

## Why this scope — the evidence

In July 2026 we commissioned an independent research pass comparing AfriPlaybook against twenty candidate "playbooks" across three groups: canonical model-and-training NLP playbooks (Google DL Tuning, Google Text Classification, Hugging Face NLP Course, spaCy), data / responsible-AI handbooks (Datasheets, Data Statements, Model Cards, Turing Way, PAIR, BigScience ROOTS, Deon), and low-resource work AfriPlaybook already sits alongside (MasakhaneMT, MasakhaNER 1 and 2, AfriSenti, AfriQA, LAFAND-MT, FLORES, NLLB). The verdict was clear:

> Eight of ten numbered chapters center on data collection, annotation workforce, quality assurance, governance, documentation, and community. Only the model-building chapter touches modelling, and it is a short chapter. The canonical Group-A NLP playbooks are structured around model choice, fine-tuning, hyperparameter tuning, and deployment, and explicitly exclude annotation, low-resource languages, and cultural considerations. AfriPlaybook is structurally a data/annotation-handbook, not a model-tuning-playbook.

That is not a criticism. It is a positioning. The playbook is what those Group-A playbooks assume has already been done. Trying to compete with them on their own territory would spread AfriPlaybook thin and produce content that dates within a year. Owning the annotation, data quality, evaluation, community, and African-context deployment space is defensible, durable, and — for the community the playbook serves — genuinely load-bearing.

## What comes next — the phased plan

The current playbook is a solid draft of the dataset-lifecycle spine. The next expansion is about making the playbook **the shortest path to a working project** for the reader who has a task and a language and doesn't know where to start. In priority order:

### Phase 1 — the two highest-leverage additions

- **[Before You Start](../before-you-start/index.md)** per task. For each task (NER, MT, ASR, sentiment, TTS, OCR): a living resource table of every existing dataset and model per African language; a fork-or-scratch decision tree; a realistic effort estimate; a single canonical fine-tuning tutorial to link out to. Written to save an incoming project two to four weeks of duplicated groundwork. Ships first for NER (because MasakhaNER is the flagship reference project) and extends across the task set.
- **[Case Studies](../case-studies/index.md)** — real retrospectives from Masakhane's own body of work: MasakhaNER 1 and 2, AfriSenti, AfroBench, LAFAND-MT, AfriQA. Each answers the same set of questions — team size, timeline, budget, hardest problem, biggest mistake, what surprised the team — from the people who did the work. Two case studies of this quality are worth more than ten chapters of general prose.

### Phase 2 — cross-cutting realism

- **Deployment for African contexts.** Offline and patchy-connectivity NLP. Edge devices. SMS/USSD/WhatsApp as NLP surfaces. Multilingual switching in a single conversation. Non-standard scripts (Ajami, Ge'ez, N'Ko) in real UIs.
- **Cross-language transfer matrix.** Empirical guidance, drawn from Masakhane's own papers, on which African languages benefit from which transfer sources. Bantu-to-Bantu, Cushitic-to-Cushitic, script transfer where relevant.

### Phase 3 — durable governance

- **Legal, consent, and community IP.** Country-level data laws (Nigeria NDPA, Kenya DPA, South Africa PoPIA, Ghana DPA, Rwanda) and their practical implications. Consent frameworks that work with non-literate speakers. Community IP frameworks. Anti-extraction release patterns.
- **Long-tail language onboarding.** For a language with a speaker community but no digital corpus, what is step one? Orthography, corpus bootstrapping, community mobilisation, anti-patterns.

### Phase 4 — compute-poor practice

- **Compute-poor training and evaluation.** Community-GPU, Colab, Kaggle patterns. LoRA and QLoRA (linked to canonical, not re-derived). Distillation for edge deployment. When cross-language transfer is a compute-saving strategy.

### Phase 5 — finding current resources (redesigned)

The original Phase 5 was a curated living directory — every African-language dataset, model, tool, and benchmark, with a one-line editorial opinion on each entry, updated on a semiannual review cadence. On honest reflection, the review cadence was the load-bearing part, and no team has capacity to eyeball 200+ entries semiannually and give each a fresh editorial line. A stale directory that says "SOTA as of 2026-Q3" in 2027 is worse than no directory.

The redesigned Phase 5 ships as **[Finding current resources](../finding-resources/index.md)** — a short chapter that names the *primary sources* (trusted Hugging Face organisations, Zenodo, OpenSLR, SADiLaR, AfricaNLP workshop proceedings, Deep Learning Indaba) and teaches the search patterns that find current African-NLP resources on those platforms. The chapter does not list contents; the sources list themselves.

**Tradeoff acknowledged**: we give up per-entry editorial opinion on every dataset and model (readers get that from the model card and the [Before You Start](../before-you-start/index.md) pages instead). We gain a chapter that stays honest for years without touch and does not require a named maintainer to unblock. The [scope note in *Finding current resources*](../finding-resources/index.md#why-this-chapter-is-short) documents this design choice for future readers.

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

*This decision record will be revisited at each major playbook release. See the [changelog](https://github.com/warakacommunity/AfriPlaybook/releases) for the record of what changed and when.*
