---
sidebar_position: 8
title: Question Answering
---

# Question Answering

*Last reviewed: 2026-07-07.*

Question Answering (QA) is the task where NLP promises to actually *serve* a user — turn a question they ask in their own language into a useful answer. It is also structurally the hardest task in this chapter, because a useful QA system requires **both** good retrieval **and** good reading or reasoning. A failure in either half is a failure of the whole. For African languages, both halves are typically under-resourced, and cross-lingual configurations (question in an African language, answers drawn from English or French sources) often work better than monolingual ones. Read this page before scoping.

## What already exists

QA for African languages has one flagship community resource and a small number of adjacent multilingual benchmarks worth knowing about.

### Datasets — the core set

- **[AfriQA](https://arxiv.org/abs/2305.06897)** ([Ogundepo et al., 2023](https://arxiv.org/abs/2305.06897)) — the reference cross-lingual open-domain QA benchmark for African languages. Covers 10 African languages (Bemba, Fon, Hausa, Igbo, Kinyarwanda, Swahili, Twi, Wolof, Yoruba, Zulu). Questions are authored in the target African language; answers are retrieved from English Wikipedia. This *cross-lingual open-domain* framing is not incidental — the paper argues it is the practical setting for African-language QA today, and the numbers back the argument. Available on the [Hugging Face Hub](https://huggingface.co/datasets/masakhane/afriqa) and the [Masakhane AfriQA repo](https://github.com/masakhane-io/afriqa).
- **[TyDi QA](https://arxiv.org/abs/2003.05002)** ([Clark et al., 2020](https://arxiv.org/abs/2003.05002)) — Google's typologically-diverse QA benchmark with 11 languages including Swahili. Extractive-style; questions and answers are in the same language. Useful reference for the monolingual QA setting where AfriQA takes the cross-lingual one.
- **[XQuAD](https://arxiv.org/abs/1910.11856)** and **[MLQA](https://aclanthology.org/2020.acl-main.653/)** — multilingual reading-comprehension benchmarks derived from SQuAD; extremely limited African coverage but useful reference for the extractive QA setting.
- **[MKQA](https://arxiv.org/abs/2007.15207)** — multilingual open-domain QA covering 26 languages; includes some coverage relevant to African-language work.

### Datasets — worth knowing about

- **[Cross-Lingual Open-Retrieval QA (Asai et al., 2021)](https://arxiv.org/abs/2104.01931)** — the setting AfriQA generalises. The precursor methodology, useful reading for the design decisions.
- **Domain-specific QA corpora** — small published corpora for African-language QA in health, agriculture, and civic-tech domains exist across recent AfricaNLP proceedings. Search before scoping a domain-specific corpus from scratch.

### Models — what works for the task

- **Retrieval models.** [mDPR (multilingual Dense Passage Retrieval)](https://arxiv.org/abs/2004.04906) and [mContriever](https://arxiv.org/abs/2112.09118) are the standard cross-lingual retrievers. AfriQA-adapted variants exist on the Hugging Face Hub; start with the AfriQA paper's baselines rather than a generic multilingual retriever.
- **Reader / reasoning models.** For extractive QA, fine-tuned AfroXLMR is the classification-style path. For generative QA, general multilingual LLMs (Aya, mT5, NLLB-family, or larger) applied via fine-tuning or in-context learning are the practical baselines.
- **Multilingual LLMs.** [Cohere Aya](https://cohere.com/research/aya) covers many African languages and is a defensible baseline for generative QA. Commercial APIs (Gemini, GPT-family, Claude, Cohere) increasingly claim African-language coverage; measure per language before deploying — see the API caveats in the [compute-poor chapter](../compute-poor/index.md#api-based-approaches-—-legitimate-but-not-free).

**Editorial opinion.** For a new project on a language covered by AfriQA, the shortest defensible path is: use AfriQA's baselines as the honest floor, evaluate a stronger retrieval + reader combination on the AfriQA test set, and human-evaluate a sample of outputs before deploying. Do not skip human evaluation — QA metrics on cross-lingual open-domain settings are known to over-report system quality relative to human judgement.

## Fork or start fresh?

```
Is your language covered by AfriQA (10 languages)?
├── Yes — is the cross-lingual open-domain setting (question in
│        target language, answers from English Wikipedia) close
│        enough to your use case?
│   ├── Yes → Use AfriQA as the training and evaluation set.
│   │        Fine-tune the retrieval + reader stack from the paper.
│   │        Human-evaluate 200-500 outputs before deployment.
│   └── No — your use case is monolingual (questions AND answers
│       in the target language), domain-specific, or grounded in a
│       different corpus (not Wikipedia).
│       → Use AfriQA as a starting point for the retriever, but
│         collect a domain-specific evaluation set FIRST. Extending
│         to a monolingual corpus for reading is expensive; consider
│         whether the cross-lingual setting can serve the underlying
│         need before committing.
└── No — your language is not covered by AfriQA.
    ├── Is Swahili covered? (Yes, in AfriQA and TyDi QA.) Is your
    │   target related? → Cross-lingual transfer via a related covered
    │   language is worth trying before building. See the
    │   [cross-language transfer](../cross-language-transfer/index.md)
    │   chapter.
    └── Genuinely uncovered → Read the [long-tail language
        onboarding](../long-tail-language/index.md) chapter.
        QA corpora are more expensive to build than sentiment or
        NER corpora — question authoring is a skill; not every
        native speaker can author good questions; answer span
        annotation requires character-level precision. Start with
        a 500-1000 question pilot and scale only if the pilot's
        IAA holds.
```

## What it will actually cost you

QA corpora cost more than sentiment or NER corpora of the same size, at every scale. The extra cost is authorship (question writing is not annotation), answer alignment (span-level, not label-level), and cross-lingual verification (in cross-lingual settings, both source-language and target-language expertise are required for review). Rough order-of-magnitude:

- **Fine-tuning the AfriQA baseline pipeline on the existing corpus.** One to three person-weeks; twelve to forty GPU-hours for reasonable convergence on the retriever + reader jointly. Colab Pro / Kaggle is enough for the reader; retriever fine-tuning benefits from a larger GPU.
- **Extending AfriQA with domain-specific questions on covered languages.** Two to six months elapsed; two to six person-months of question-authoring work; one person-month of lead effort. Question-authoring throughput is 2-4x slower than labelling; budget accordingly.
- **Building a new QA corpus for an uncovered language, aiming for 2,000-5,000 question-answer pairs.** Six to fifteen months elapsed; five to fifteen person-months. Question authoring is skilled work; two to four expert authors + adjudicators is the workable team size.
- **A defensible evaluation-only QA set** (500-1,000 questions). Two to four months; one to three person-months.
- **Human evaluation of QA outputs.** Two to three person-weeks per evaluator per 200 items — QA evaluation is slower than sentiment or NER evaluation because the evaluator has to read the question, the retrieved passage, and the answer and judge the joint quality.

## Known limitations to watch for

- **Retrieval quality dominates.** A brilliant reader on top of a mediocre retriever produces mediocre answers. Report retrieval metrics (recall@k, mean reciprocal rank) alongside answer metrics; treat the retriever as a first-class component, not a preprocessing detail.
- **Cross-lingual open-domain QA is a different problem from monolingual reading comprehension.** They share vocabulary but not techniques. The AfriQA paper is explicit about which setting it targets; do not import monolingual-QA intuitions into cross-lingual work.
- **Exact-match metrics are misleading for African languages.** Morphological variation (a correct answer with different inflection scores zero on EM), diacritic normalisation, and transliteration all inflate apparent error. Report F1 alongside EM, and treat human judgement as the final word.
- **Answer spans require character-level precision.** In the extractive setting, sloppy span annotation is the fastest way to poison a QA corpus. Provide annotators with a tokeniser that respects the target language's word boundaries, and adjudicate span disagreements at the character level.
- **Wikipedia is a biased source.** Answers retrieved from English Wikipedia over-represent perspectives and content familiar to English editors. For African-language questions about African topics, the retrieved corpus systematically under-serves the question. Where feasible, augment with Wikimedia projects in other languages or with community-curated corpora.
- **LLM-based QA hallucinates.** Generative QA is fast to prototype and easy to over-trust. On African-language questions, general LLMs often produce fluent-sounding wrong answers, and the fluency masks the error. Evaluate for factuality with native speakers on 200+ outputs before publishing any LLM-based QA number.
- **Cross-lingual transfer is unusually weak between distant languages.** Language-family-adjacent transfer (Bantu → Bantu, Chadic → Chadic) is worth trying; broad multilingual transfer (Swahili → Fon) is not generally reliable. See the [cross-language transfer chapter](../cross-language-transfer/index.md).
- **Ambiguity resolution is a cultural problem, not just a linguistic one.** "Who is the president?" answered against a 2020 Wikipedia dump is stale; "What is the capital of Ivory Coast?" has a de-jure answer (Yamoussoukro) and a de-facto one (Abidjan). QA systems need explicit strategies for temporal and referential ambiguity; the strategies must be culturally informed.

## The canonical fine-tuning link

For extractive QA, use the [Hugging Face question-answering tutorial](https://huggingface.co/docs/transformers/tasks/question_answering). For retriever fine-tuning, use the [DPR training documentation](https://huggingface.co/docs/transformers/model_doc/dpr) as a starting point, and the [AfriQA paper's companion repo](https://github.com/masakhane-io/afriqa) for the specific cross-lingual retrieval configuration that works on their benchmark. For generative QA fine-tuning, use the [HF summarisation tutorial](https://huggingface.co/docs/transformers/tasks/summarization) as the closest structural analogue — the training loop is the same; the loss and data preparation differ.

For evaluation, the AfriQA repo has the canonical scoring scripts. Use them rather than rolling your own; QA evaluation quirks (answer normalisation, alias handling, multiple-answer scoring) are subtle enough to get wrong.

## Further reading

- [AfriQA paper (Ogundepo et al., 2023)](https://arxiv.org/abs/2305.06897) — the reference community QA resource for African languages, with a substantial methodological discussion of why cross-lingual open-domain is the workable setting for this class of language.
- [TyDi QA paper (Clark et al., 2020)](https://arxiv.org/abs/2003.05002) — the typologically-diverse monolingual QA benchmark; important comparison point.
- [DPR paper (Karpukhin et al., 2020)](https://arxiv.org/abs/2004.04906) — the foundational dense retrieval architecture that most current open-domain QA builds on.
- [XOR QA (Asai et al., 2021)](https://arxiv.org/abs/2104.01931) — the cross-lingual open-retrieval QA setup AfriQA generalises.
- [Cohere Aya (Üstün et al., 2024)](https://arxiv.org/abs/2402.07827) — the multilingual instruction-tuned base model with meaningful African-language coverage; the workable open baseline for generative QA.
- [Nekoto et al., 2020 — participatory approach](https://aclanthology.org/2020.findings-emnlp.195/) — the reference for how the AfriQA team recruited and coordinated native-speaker question authors.
- [Kreutzer et al., 2022](https://aclanthology.org/2022.tacl-1.4/) — indirectly relevant: retrieval corpora for African-language QA often draw on multilingual web resources whose quality problems it identifies.

---

**Contributor's note.** This is the seventh Before-You-Start exemplar. The last remaining planned page is OCR / document AI. If you are contributing to this page — a domain-specific extension, a monolingual QA note, an LLM-QA evaluation retrospective — preserve the retrieval-first framing. Skipping retrieval quality to talk about reader quality is the modelling failure this page most wants to prevent.
