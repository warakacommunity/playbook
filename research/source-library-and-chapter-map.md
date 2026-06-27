# AfriPlaybook — Source Library & Chapter Map

Working reference for the content pass. **Not published** (lives outside `docs/`).
Prioritise 2024–2026 African sources; reach for the seminal older ones only when canonical.
Keep prose human (sparse em-dashes). When a source is used in a chapter, add it to
`docs/references.md` with an `{#author-year}` anchor and cite it inline.

Legend for "Use in": chapter/section slugs in the playbook.

---

## Part 1 — Source library

### Landscape, surveys & statistics
- **Joshi et al. (2020)** — *State and Fate of Linguistic Diversity* — 0–5 language "classes"; African langs in classes 0–1. `joshi-2020`. **Use in:** Introduction, Data Collection.
- **Ethnologue (2024)** — ~2,140 of ~7,160 living languages are African. `ethnologue-2024`. **Use in:** Introduction.
- **Kreutzer et al. (2022)** — *Quality at a Glance* — web-crawl audit; low-resource quality collapses (mislabelled / MT / non-language). `kreutzer-2022`. **Use in:** Introduction, Data Collection, Data Quality, Project Management.
- **Belay et al. (2025)** — *The Rise of AfricaNLP* — ~1,902 papers, ~4,901 authors (2005–2025); 21 papers in 2006 → 287 in 2024; contributions 53% methods / 21% datasets; AfricaNLPContributions dataset (~7.8K annotated sentences) + research-explorer tool. `belay-2025`. **Use in:** Introduction (data-vs-methods gap), all chapter intros.
- **Charting the Landscape of African NLP (2025, EMNLP)** — progress map + road ahead (arXiv:2505.21315). *Not yet in refs.* **Use in:** Introduction, section overviews.
- **State of NLP in Kenya: A Survey (2024)** — regional survey (arXiv:2410.09948). *Not in refs.* **Use in:** Introduction, regional examples.
- **Ranathunga & de Silva (2022)** — linguistic disparity; "low-resource" is multidimensional. `ranathunga-desilva-2022`. **Use in:** Introduction.
- **Nigatu et al. (2024)** — *Zeno's Paradox of 'Low-Resource' Languages.* `nigatu-2024`. **Use in:** Introduction.

### Communities & participatory programmes
- **Masakhane** — pan-African grassroots NLP community (3,000+ members); "Africans decide what data represents them, retain ownership, know how it's used." `masakhane`. **Use in:** Community, Governance, Introduction.
- **Nekoto et al. (2020)** — Masakhane participatory MT; 49 co-authors; MasakhaNER (10 langs), MasakhaNEWS, MAFAND-MT lineage. `nekoto-2020`. **Use in:** Project Management, Community, Governance, Machine Translation. *(Avoid over-citing — diversify.)*
- **Siminyu et al. (2021)** — *AI4D – African Language Program* — challenges + 3–4 month fellowships → 9+ open datasets. `siminyu-2021`. **Use in:** Project Management, Community, Data Collection.
- **Deep Learning Indaba / IndabaX** — since 2017; mission "Africans owners & shapers of AI"; annual (2025 Kigali, 2026 next); IndabaX grew 13 events (2018) → 25 countries (2022) → 36 (2023) → 47 (2024–25); goal all African countries by 2027; events ~50–300+ attendees. *Not in refs* (deeplearningindaba.com). **Use in:** Community, Introduction, Project Management (recruitment/network).
- **African Languages Lab (2025)** — collaborative low-resource African NLP (arXiv:2510.05644). *Not in refs.* **Use in:** Community, Data Collection.
- **SADiLaR** — South African Centre for Digital Language Resources (national infrastructure). *Not in refs.* **Use in:** Community, Data Collection, Documentation.
- **Regional orgs:** EthioNLP, HausaNLP, GhanaNLP, Data Science Nigeria, Lelapa AI. **Use in:** Community, regional examples.

### Datasets & benchmarks (concrete examples)
- **Adelani et al. (2022)** — MasakhaNER 2.0 — 20 African languages; per-language sub-teams. `adelani-2022`. **Use in:** Text Classification/NER, Project Management (coordination at scale).
- **AfriSenti (Muhammad et al., 2023)** — 14 sentiment datasets, 110k+ tweets, 14 languages. *Not in refs.* **Use in:** Text Classification (sentiment), Data Collection.
- **NaijaVoices (Emezue et al., 2025)** — 1,800h Igbo/Hausa/Yorùbá speech, 5,000+ voice donors; trained community facilitators; informed consent before recording; "data farming" + micro-grants; a Lanfrica project. `emezue-2025`. **Use in:** Governance (consent, benefit-sharing), ASR, TTS, Data Collection.
- **African Next Voices (2025)** — ~US$2.2M Gates grant; ~9,000h everyday speech; 18 languages; Kenya/Nigeria/South Africa (Maseno Centre for Applied AI; Data Science Nigeria); domains farming/health/education; one of the largest African voice datasets; featured in Nature. `african-next-voices`. **Use in:** ASR, Speech overview, Data Collection, Governance (cross-border law example).
- **AfriVoices-KE (2026)** — multilingual Kenyan speech dataset (arXiv:2604.08448). *Not in refs.* **Use in:** ASR, Speech.
- **Swivuriso (2026)** — South African Next Voices multilingual speech (arXiv:2512.02201). *Not in refs.* **Use in:** Speech, ASR.
- **GhanaNLP Parallel Corpora (2026)** — Ghanaian-language MT corpora (arXiv:2603.13793). *Not in refs.* **Use in:** Machine Translation, Data Collection.
- **Mafoko (2026)** — open multilingual terminologies for South African NLP (arXiv:2508.03529). *Not in refs.* **Use in:** Machine Translation, terminology/glossary.

### Governance, licences & law
- **CARE Principles (Carroll et al., 2020)** — Collective benefit, Authority to control, Responsibility, Ethics; Indigenous/community data sovereignty. `carroll-2020`. **Use in:** Governance, Documentation, Ethics.
- **FAIR (Wilkinson et al., 2016)** — Findable, Accessible, Interoperable, Reusable. `wilkinson-2016`. **Use in:** Governance, Documentation, Dataset Lifecycle.
- **Bird (2020)** — *Decolonising Speech and Language Technology* (COLING). `bird-2020`. **Use in:** Governance, Community, Introduction.
- **NOODL — Nwulite Obodo Open Data License (2025)** — Igbo "build the community"; tiered: free share-alike within Africa/developing nations, royalties/benefits for users elsewhere; Data Science Law Lab / CIPIT Strathmore. `noodl-2025`. **Use in:** Governance (licensing), Dataset Lifecycle.
- **Esethu Framework / Esethu license (2025)** — Lelapa AI + Way With Words + DSFSI; community licence; licensing revenue reinvested into dataset + local jobs. `esethu-2025`. **Use in:** Governance, Community, Dataset Lifecycle.
- **Te Hiku Media — Kaitiakitanga License** — Māori; guardianship not ownership; benefit to source; bans surveillance/unconsented corpus-building. `tehiku-kaitiakitanga`. **Use in:** Governance (licensing model).
- **Carnegie Endowment (2024)** — African NLP copyright/innovation/access; "publicly visible ≠ free to train on." `carnegie-2024`. **Use in:** Governance (rights), Data Collection.
- **Lanfrica + African AI Atlas** — findability layer; maps datasets/models/papers; "data farming." `lanfrica`. **Use in:** Governance (FAIR/findability), Documentation, Data Collection.
- **Lanfrica — "Licensing as a Barrier" (blog)** — missing/unclear licences make African datasets unusable. `lanfrica-licensing`. **Use in:** Governance (licensing), Dataset Lifecycle.
- **African data-protection law** — by 2026, 44 African countries have DP laws; POPIA (SA, 2020), Nigeria DPA (2023, ex-NDPR), Kenya DPA (2019)+2021 regs + Kenya AI Strategy 2025–2030, Ghana DPA (2012). `techinafrica-2026`. **Use in:** Governance (law/privacy).
- **Malabo Convention (2023)** — AU treaty on data protection + cybersecurity; in force June 2023. `malabo-2023`. **Use in:** Governance (law).

### Process & data work
- **Sambasivan et al. (2021)** — *Data Cascades in High-Stakes AI* — 92% of 53 practitioners (incl. East/West Africa) hit ≥1 cascade. `sambasivan-2021`. **Use in:** Project Management, Data Quality, Annotation Design.
- **Lacuna Fund** — Rockefeller/Google.org/IDRC (2020); funds low-resource dataset creation; sub-Saharan language stream. `lacuna-fund`. **Use in:** Project Management (funding), Community.

---

## Part 2 — Chapter → sources map

**Foundations**
- *Introduction / Overview* (done): Joshi 2020, Ethnologue 2024, Kreutzer 2022, Belay 2025, Nigatu 2024, Ranathunga 2022. Add: Charting-Landscape 2025, Deep Learning Indaba, Bird 2020.
- *Project Management* (done): Nekoto 2020, Sambasivan 2021, Adelani 2022, Lacuna Fund, Kreutzer 2022. Add later: AI4D/Siminyu, Deep Learning Indaba (recruitment network).
- *Data Collection*: Kreutzer 2022, Carnegie 2024, NaijaVoices, African Next Voices, AI4D/Siminyu, Lanfrica, Joshi 2020, African Languages Lab.
- *Data Governance* (done): Masakhane, Nekoto 2020, Siminyu 2021, NaijaVoices, Bird 2020, Wilkinson 2016, Carroll 2020, Lanfrica(+licensing), Carnegie 2024, NOODL, Esethu, Te Hiku, Malabo, Tech-in-Africa/DP-laws, African Next Voices.
- *Annotation Design*: Sambasivan 2021, MasakhaNER 2.0 (guidelines/sub-teams), AfriSenti (taxonomy), annotator safety sources.
- *Data Quality*: Sambasivan 2021, Kreutzer 2022, agreement-metric refs.
- *Community*: Masakhane, Deep Learning Indaba/IndabaX, AI4D/Siminyu, SADiLaR, regional orgs, Esethu, Lacuna Fund.

**Text**
- *Text Classification* (consolidated): AfriSenti (sentiment/emotion/hate), MasakhaNER 2.0 (entity), Adelani 2022.
- *Text Generation*: Belay 2025 (gaps), African LLM benchmarks (IrokoBench/AfriMMLU — to research).
- *Machine Translation*: Nekoto 2020 (MAFAND/Masakhane MT), GhanaNLP corpora 2026, Mafoko 2026, FLORES/SIB-200 (to research).

**Speech**
- *ASR*: African Next Voices, NaijaVoices, AfriVoices-KE 2026, Swivuriso 2026.
- *TTS*: NaijaVoices, Te Hiku/Papa Reo (model-values precedent).
- *Speech-to-Speech / Audio Understanding / Emotion / Diarization*: African Next Voices (domains), + task-specific datasets to research.

**Vision** — Image Data / Document AI / Video: to research (African document/OCR + vision datasets, e.g. Lacuna-funded vision sets).

**Multimodal** — Image-Text / LLM-Assisted Data: to research (African VQA/captioning; synthetic-data safeguards).

**Lifecycle & Release**
- *Evaluation*: Belay 2025, IrokoBench/AfriMMLU (to research).
- *Documentation*: Datasheets (Gebru et al.), Data Statements (Bender & Friedman), CARE 2020, FAIR 2016, Lanfrica.
- *Dataset Lifecycle*: NOODL, Esethu, Lanfrica-licensing, FAIR, Malabo/DP-laws.

**Appendix** — Glossary, References (this maps into `docs/references.md`).

---

## To-research queue (remaining gaps)
- African OCR / Document AI handwriting datasets; African vision/satellite datasets (Lacuna-funded).
- African sign-language / gesture / video datasets.
- Documentation standards as applied to African data (Datasheets — Gebru et al.; Data Statements — Bender & Friedman; Model Cards — Mitchell et al.).
- More speech task datasets (diarization, speech emotion) for African languages.

---

## Part 3 — Datasets & benchmarks catalogue (by modality)

> Staging area. Add an entry to `docs/references.md` only when a chapter actually cites it.
> Figures are from source pages/abstracts; re-verify the exact number when citing.

### LLM / multi-task benchmarks
- **IrokoBench (2024/25, NAACL)** — human-translated benchmark, **17** African languages, 3 tasks: **AfriXNLI** (NLI), **AfriMGSM** (math reasoning), **AfriMMLU** (multi-choice knowledge QA). arXiv:2406.03368. → Evaluation, Text Generation, Introduction.
- **AfroBench** — broad LLM evaluation suite for African languages (aggregates many tasks). arXiv:2311.07978. → Evaluation, Introduction.
- **AfriMTEB / AfriE5 (2025)** — text-embedding benchmark + adapted model for African languages. arXiv:2510.23896. → Evaluation, Text.
- **The State of LLMs for African Languages (2025)** — survey of LLM coverage/gaps. arXiv:2506.02280. → Introduction, Text Generation, Evaluation.

### Text — classification / NER / QA
- **MasakhaNER** (10 langs) / **MasakhaNER 2.0** (20 langs, `adelani-2022`) — named entity recognition. → Text Classification (entity), Annotation Design.
- **MasakhaNEWS** — news **topic classification**, 16 African languages. → Text Classification.
- **SIB-200** — topic classification / clustering across 200+ languages (broad African coverage). → Text Classification.
- **AfriSenti (2023)** — sentiment, **14** languages, 110k+ tweets. → Text Classification (sentiment).
- **AfriHate** — multilingual African hate-speech / abusive-language dataset. → Text Classification (hate speech).
- **InjongoIntent** — **intent classification**, 16 African languages, 40 intent types. → Text Classification, LLM-Assisted Data.
- **AfriQA** — cross-lingual open-retrieval **QA** for African languages. → Text Generation (QA), Evaluation.

### Machine translation
- **MAFAND / MAFAND-MT** (Masakhane) — news-domain MT for ~16–21 African languages. → Machine Translation.
- **FLORES-200 / NLLB** (Meta) — eval + MT across 200 languages incl. many African. → Machine Translation, Evaluation.
- **Toucan / Cheetah / Sahara** (UBC DLNLP) — generation + MT covering 400+ African languages. → Machine Translation, Text Generation.
- **GhanaNLP Parallel Corpora (2026)** — Ghanaian-language MT (arXiv:2603.13793). → Machine Translation.
- **Mafoko (2026)** — open multilingual terminologies, South African NLP (arXiv:2508.03529). → Machine Translation, Glossary.
- **AFRIDOC-MT (Masakhane, EMNLP 2025; Lacuna-funded)** — first **document-level** MT corpus: En + Amharic/Hausa/Swahili/Yorùbá/Zulu; 334 health + 271 IT-news docs, human-translated (Techpoint Africa + WHO). Finding: sentence-trained models fail to generalise to documents; NLLB-200 best NMT, GPT-4o best general LLM. arXiv:2501.06374; HF `masakhane/AfriDocMT`. → Machine Translation (document-level), Evaluation, Data Collection (sourcing+consent of domain text).
- **AfriScience-MT (2026)** — **scientific/STEM** translation corpus, 6 langs (Amharic, Hausa, Luganda, N. Sotho, Yorùbá, isiZulu) across 11 domains; professional translators + science communicators coined new terms where none existed; first STEM science-translation corpus for African languages. arXiv:2605.29741; HF `AfriScience-MT`. → Machine Translation (scientific), Glossary/terminology, Data Governance (terminology creation), Annotation Design.
- **AfriNLLB (2026)** — efficient translation models for African languages (arXiv:2602.09373). → Machine Translation, Evaluation.

### Speech — ASR / TTS / representation
- **African Next Voices (2025)** — ~9,000h, 18 langs, Kenya/Nigeria/SA, Gates ~$2.2M. `african-next-voices`. → ASR, Speech overview, Data Collection.
- **NaijaVoices (2025)** — 1,800h Igbo/Hausa/Yorùbá, 5,000+ donors, consent + data-farming. `emezue-2025`. → ASR, TTS, Governance.
- **AfriSpeech-200** — 200h accented English (clinical + general), 120 accents, 13 countries. → ASR, Audio Understanding.
- **BibleTTS** — high-fidelity single-speaker TTS, up to 86h/lang, CC-BY-SA; Niger-Congo/Afro-Asiatic/Nilo-Saharan. → TTS.
- **Common Voice (Mozilla)** — crowdsourced read speech; e.g. Kinyarwanda 1,183+ validated hours. → ASR, Data Collection (crowdsourcing).
- **Kallaama** — 100h+ transcribed **agricultural** speech in Wolof, Pulaar, Sereer (Senegal). → ASR, Data Collection (domain/consent).
- **Zambezi Voice (Univ. of Zambia)** — 79h labelled (Bemba/Nyanja/Tonga/Lozi) + 525h unlabelled radio. → ASR, Data Collection.
- **AfriVoices-KE (2026)** — multilingual Kenyan speech (arXiv:2604.08448). → ASR, Speech.
- **Swivuriso (2026)** — South African Next Voices speech (arXiv:2512.02201). → Speech, ASR.
- **AfriHuBERT (2025)** — self-supervised speech representation model for African languages (arXiv:2409.20201). → ASR, Audio Understanding.
- **Voice of a Continent (2025)** — maps Africa's speech-tech frontier (arXiv:2505.18436). → Speech overview.

### Models & pretraining corpora (context, not always primary data)
- **AfriBERTa** — 11 African languages, ~108.8M-token corpus. → Introduction, Text.
- **AfroXLMR / AfroXLMR-61L** — adaptive fine-tuning, 20 → 61 African languages. → Text, Evaluation.
- **SERENGETI** — pretrained on **517** African languages (largest), religious/news/academic. → Introduction, Text.
- **Glot500 / GlotLID** — 500+ language corpus + language ID. → Introduction, Data Collection (LID).
- **AfroLID** — neural language ID for 500+ African languages. → Data Collection (cleaning/LID).
- **WURA** — document-level corpus (16 African langs + En/Fr), behind AfriTeVa V2. → Data Collection, Text Generation.
- **InkubaLM (Lelapa AI)** — small African LLM (5 languages). → Text Generation.
- **MzansiText / MzansiLM (2026)** — open corpus + decoder LM, South African languages (arXiv:2603.20732). → Text Generation, Data Collection.
- **Ibom NLP (2025)** — Nigeria's minority languages (arXiv:2511.06531). → Community, Data Collection (minority langs).

### Multimodal / vision / OCR
- **HavQA** — visual question answering for **Hausa**. → Image-Text (VQA).
- **Afri-MCQA (2026)** — Multimodal **Cultural** QA for African languages (arXiv:2601.05699). → Image-Text, LLM-Assisted Data.
- **Challenging Multimodal LLMs with African Standardized Exams** — document + multimodal eval (OpenReview). → Document AI, Evaluation.
- **Large Multimodal Models for Low-Resource Languages: A Survey (2025)** — arXiv:2502.05568. → Multimodal overview.
- **Deep Learning Indaba 2026 — Call for African Datasets** — text+audio+vision community dataset pipeline. → Community, Multimodal, Data Collection.
- *(Gap: dedicated African OCR/handwriting + sign-language/video datasets — keep researching.)*
