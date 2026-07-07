---
sidebar_position: 1
last_update:
  date: 2026-07-07
---

# Finding current resources

*Last reviewed: 2026-07-07.*

The [Before You Start](../before-you-start/index.md) pages tell you which African-language NLP resources exist and what our editorial opinion is on each. Those pages age. Datasets get superseded, models get deprecated, new work drops at every AfricaNLP workshop. This chapter is the small companion that stays honest for years: **it names the primary sources — the organisations, archives, workshops, and search patterns — where the truth lives, and points you at them.**

The rule that makes this chapter survive without a maintainer: we name *sources*, not *contents*. A Hugging Face organisation page updates itself; a Zenodo community indexes new uploads automatically; a workshop's proceedings arrive on schedule every year. We do not try to list what is on those pages today. We point you at them and trust the sources to be current.

## When to use this chapter

- The Before You Start page for your task was last reviewed more than **six months ago**, and you need to know what has shipped since. The dates at the top of each Before You Start page are the tripwire.
- Your task is not covered by a Before You Start page — you need to find your own primary sources.
- You are scoping a new project and want the current state of the ecosystem, not a snapshot.

## Where the corpora and models actually live

### The Hugging Face organisations to trust

These are the organisations whose model cards and dataset cards are the primary source of truth for African-language NLP resources. Bookmark them.

- **[huggingface.co/masakhane](https://huggingface.co/masakhane)** — the community organisation. MasakhaNER 1 and 2, AfriSenti, LAFAND-MT, AfriQA, plus per-language fine-tunes and community-curated corpora. **Start here for any African-language dataset or model search.**
- **[huggingface.co/hausanlp](https://huggingface.co/hausanlp)** — the Hausa-focused community organisation. Hausa language models, sentiment and hate-speech corpora, and per-task fine-tunes centred on Hausa specifically. Start here when your project is Hausa-first.
- **[huggingface.co/ethionlp](https://huggingface.co/ethionlp)** — the Ethiopian-language community organisation. Amharic, Tigrinya, Afaan Oromo, and other Ethiopic-family resources; the Ge'ez-script-first counterpart to what Masakhane maintains for the broader continent. Start here when your project is Ethiopian-language-first.
- **[huggingface.co/sunbird](https://huggingface.co/sunbird)** — Sunbird AI. Luganda ASR, MT, TTS, and integrated speech-and-text pipelines. The working reference for a small team shipping African-language NLP in production.
- **[huggingface.co/Davlan](https://huggingface.co/Davlan)** — David Adelani's organisation. AfroXLMR base and large variants (including 76-language), per-language fine-tunes across NER, sentiment, MT.
- **[huggingface.co/castorini](https://huggingface.co/castorini)** — Waterloo's IR + multilingual research. AfriBERTa, mDPR, multilingual retrieval and QA baselines.
- **[huggingface.co/facebook](https://huggingface.co/facebook)** — Meta AI research releases. MMS (ASR + TTS, 1000+ languages), NLLB-200 (translation, 200 languages), SeamlessM4T, XLS-R.
- **[huggingface.co/google](https://huggingface.co/google)** — Google research releases. FLEURS evaluation benchmark, Gemma multilingual variants, mT5.
- **[huggingface.co/CohereForAI](https://huggingface.co/CohereForAI)** — Cohere For AI research. Aya multilingual instruction-tuned models with meaningful African-language coverage.
- **[huggingface.co/openai](https://huggingface.co/openai)** — Whisper family (ASR). Coverage claims are marketing-broad; verify per language.

### The archives outside Hugging Face

- **[OpenSLR (Open Speech and Language Resources)](https://openslr.org/)** — the umbrella project for low-resource speech corpora. Includes many African-language speech and text datasets from over the years. Coverage is idiosyncratic; read each dataset's landing page carefully.
- **[SADiLaR (Centre for Digital Language Resources — South Africa)](https://sadilar.org/en/resources/repository/)** — the definitive host for South African language resources (all 11 official languages), including NCHLT speech corpora.
- **[SIL Language and Culture Archives](https://www.sil.org/resources/archives)** — SIL-supported linguistic resources. Especially useful for scripts, orthographies, and typological data on under-resourced African languages.
- **[Zenodo](https://zenodo.org/)** — where AfricaNLP workshop papers and community-released datasets often land. Search for `african-languages`, `african-nlp`, `masakhane`, or the specific project name.
- **[Common Voice datasets](https://commonvoice.mozilla.org/en/datasets)** — Mozilla's per-language speech download page. Africa coverage varies dramatically per language; check current per-language totals before committing.
- **[ELRA (European Language Resources Association)](http://catalog.elra.info/)** — some African-language corpora hosted here; access model varies (some open, some fee-based).

### Where new work first surfaces

- **[AfricaNLP workshop proceedings](https://www.africanlp-workshop.github.io/)** — the annual workshop series (co-located variously with LREC, EACL, ICLR, EMNLP). The single highest-density venue for new African-language NLP work. Proceedings are open-access; skim the latest workshop's paper list to see what shipped in the last twelve months.
- **[WMT African-language shared tasks](https://www.statmt.org/wmt/)** — the WMT translation shared tasks have included African-language tracks in recent years. Where the current MT baselines get published.
- **[Deep Learning Indaba](https://deeplearningindaba.com/)** — the pan-African deep learning event. The Indaba's annual programme and its associated IndabaX country events are where practitioner-scale work surfaces before it lands in a paper.
- **[IndabaX country events](https://deeplearningindaba.com/2024/indabax/)** — country-specific deep learning meetups. The place to find people running African-language NLP work in a specific country.
- **[ACL Anthology — filter by "African"](https://aclanthology.org/)** — the ACL Anthology's search covers the main venues. Filter by year, then by the languages you care about.
- **[arXiv cs.CL](https://arxiv.org/list/cs.CL/recent)** — most current work lands here weeks or months before the paper appears in a venue. Save searches for `african languages`, `Yoruba`, `Swahili`, or the specific language you care about.

## Search patterns that actually work

The Hugging Face Hub, Zenodo, and Google Scholar all have search filters that pull the right results if you know the operators. The playbook's editorial recommendation:

**On the Hugging Face Hub:**

- **Datasets → filter by language**: [huggingface.co/datasets?language=swa](https://huggingface.co/datasets?language=swa) (replace `swa` with the ISO 639 code for your target language: `hau` Hausa, `ibo` Igbo, `yor` Yoruba, `amh` Amharic, `zul` Zulu, and so on).
- **Datasets → filter by task**: combine language filter with `task_categories:translation`, `task_categories:automatic-speech-recognition`, `task_categories:token-classification`, etc.
- **Free-text search**: `masakhane`, `AfriSenti`, `MasakhaNER`, `LAFAND`, `AfriQA`, `NLLB`, `MMS`. Named projects get hits fast.
- **Author filter**: search for a specific author (`author:Davlan`, `author:masakhane`) when you know the group but not the project name.

**On Zenodo:**

- **Search by keyword**: `african-languages`, `masakhane`, `low-resource-nlp`.
- **Communities**: search for community pages named after specific projects — Zenodo community pages aggregate all uploads tagged to them, which is often more focused than a keyword search.

**On Google Scholar and arXiv:**

- Query pattern: `"African languages" OR "low-resource" [YOUR TASK] 2024..2026` — the date bound is what keeps the results current.
- Saved searches with email alerts on arXiv are the highest-leverage habit for staying current; set them up once, get relevant papers weekly.

## The tools referenced across the playbook

Each of these is linked in context in the chapter that motivates it; this section is a single navigable index for quick reference.

**Annotation:**
- [Label Studio](https://labelstud.io/) — the annotation platform behind AfriAnnotate.
- [AfriAnnotate](https://github.com/warakacommunity/afriannotate) — the AfriPlaybook demo annotation tool.

**Speech (ASR + TTS):**
- [whisper.cpp](https://github.com/ggerganov/whisper.cpp) — reference on-device ASR runtime.
- [Common Voice contribution client](https://commonvoice.mozilla.org/) — for adding to Common Voice.
- [Meta MMS runtime](https://github.com/facebookresearch/fairseq/tree/main/examples/mms) — MMS-specific tooling.

**OCR:**
- [Tesseract](https://github.com/tesseract-ocr/tesseract), [TrOCR (via HF)](https://huggingface.co/docs/transformers/model_doc/trocr), [Kraken](https://kraken.re/), [Calamari](https://github.com/Calamari-OCR/calamari), [PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR).

**LLM inference and training:**
- [Hugging Face Transformers](https://huggingface.co/docs/transformers/), [PEFT (LoRA/QLoRA)](https://huggingface.co/docs/peft/), [bitsandbytes](https://github.com/TimDettmers/bitsandbytes).
- [llama.cpp](https://github.com/ggerganov/llama.cpp), [MLC-LLM](https://mlc.ai/mlc-llm/), [ONNX Runtime Mobile](https://onnxruntime.ai/docs/tutorials/mobile/).

**Metrics:**
- [sacrebleu](https://github.com/mjpost/sacrebleu) (chrF, BLEU), [jiwer](https://github.com/jitsi/jiwer) (CER, WER), [seqeval](https://github.com/chakki-works/seqeval) (NER), [scikit-learn](https://scikit-learn.org/) (classification).

**Fonts and script rendering (for [non-Latin script deployment](../deployment/non-latin-scripts.md)):**
- [Google Noto](https://fonts.google.com/noto) — the reference open-font family covering all African scripts.
- [SIL International fonts](https://software.sil.org/fonts/) — Charis, Doulos, Andika for Latin-diacritic African-language rendering.

## The communities to actually join

If you take one action away from this chapter, make it joining one of these. Currency lives in the conversations, not in the archives.

- **[Masakhane](https://www.masakhane.io/)** — the pan-African NLP research community. Slack invite path from the main site; participation is the highest-leverage way to keep current with what the community itself considers important.
- **[Deep Learning Indaba](https://deeplearningindaba.com/)** — the annual event and its year-round newsletter. Where practitioner-scale work surfaces before it becomes a paper.
- **[Cohere For AI research community](https://cohere.com/research/aya)** — Aya-related work and community events; open to researchers working on multilingual and low-resource NLP.
- **[Hugging Face community forums](https://discuss.huggingface.co/)** — per-language and per-task subforums where practical questions get answered fast.
- **[AfricaNLP-workshop mailing list](https://www.africanlp-workshop.github.io/)** (via the workshop site) — call-for-papers announcements, dataset releases, community discussion.
- **[Slack: MasakhaneNLP](https://slack.com/)** — the community's primary async chat. Join through the [Masakhane](https://www.masakhane.io/) site.

## Anti-patterns

1. **Treating a Before You Start page more than six months old as current.** The playbook's "last reviewed" date is the tripwire; if the page is older, cross-check against the primary sources above.
2. **Trusting a general "African NLP" claim from an LLM without cross-check.** The LLM was probably trained on scraped web summaries, not on the primary sources; verify against the HF Hub or Zenodo before acting on the claim.
3. **Missing the workshop proceedings.** Most recent African-language NLP work first appears at an AfricaNLP workshop; not skimming the latest proceedings means missing the current baseline.
4. **Building on a single dataset without checking whether a newer version has been released.** Check the dataset's HF Hub page for the current version tag before starting a fine-tune.
5. **Adopting a model based on the model card's headline number.** Read the "known limitations" section of the [Before You Start](../before-you-start/index.md) page for the task, then read the model card's full evaluation section, then measure on your target language before deploying.

## Why this chapter is short

The alternative to this chapter was a curated living directory of every African-language dataset and model with an editorial opinion on each entry, updated on a semiannual review cadence. That directory would have been useful for six months and stale by the twelfth. The [Hugging Face Hub](https://huggingface.co/), [Zenodo](https://zenodo.org/), and the [AfricaNLP workshop proceedings](https://www.africanlp-workshop.github.io/) already do the exhaustive-listing job better than any hand-curated directory can, because they update themselves.

Our job is different: teach you the primary sources, the search patterns, and the trusted organisations. The rest is theirs to keep current.

See the [scope-and-strategy chapter](../1_introduction/scope-and-strategy.md#phase-5-—-the-living-directory) for the reasoning behind this design choice.

---

**Contributor's note.** If you discover a primary source — a Hugging Face org, a Zenodo community, a workshop series, a research group — that is authoritative for a subset of African-language NLP and is not listed above, contribute an addition. The rule is: named sources with editorial rationale, not contents. If your contribution is a specific dataset or model, put it in a per-language Case Study or a Before You Start extension, not here.
