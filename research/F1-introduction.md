# F1 — Introduction & how to use the playbook · research brief

> **Status:** pilot research brief (first of the F1–L2 set). Internal — not part of the
> published site. Generated 2026-06-25 via a fan-out + adversarial-verification research run
> (30 sources fetched, 137 claims extracted, 25 verified by 3-vote check; 23 confirmed, 2 killed).
> **Every factual line below carries its confidence and source.** Two plausible-but-wrong claims
> were caught and are listed under "Do not use" — please don't reintroduce them.

## TL;DR — what to change in the intro

1. **Don't drop Joshi et al. (2020); reframe it.** The 0–5 "language classes" taxonomy is still the
   canonical grounding, but the field has moved on: there is **no agreed definition of
   "low-resource," and resourcedness is now understood as multidimensional** (not just data volume).
   Cite Joshi 2020 **alongside** Ranathunga & de Silva (AACL 2022) and Nigatu et al. (EMNLP 2024).
   *(high confidence)*
2. **There is no single verified "successor taxonomy" to swap in.** The honest update is
   "Joshi 2020 + the 2022–2024 critique," not "replace it with X." *(high confidence)*
3. **Refresh the headline numbers** to 2024–2025 figures (below) and make the LLM-era gap explicit —
   most current LLMs still fail on African-language generation. *(high confidence)*
4. **Point to the 2021–2025 community resources** (Masakhane et al.) instead of pre-2020 work.
5. **Add a short "how to use / good practice" framing** around dataset documentation and community
   data governance (Datasheets, Data Statements, CARE Principles) — see §4 (flagged lower-confidence,
   canonical sources but not adversarially verified in this run).

---

## 1 · Resource / language categorization (highest priority)

- **The 2020 source is confirmed:** Joshi et al. (2020), *"The State and Fate of Linguistic Diversity
  and Inclusion in the NLP World,"* ACL 2020 — the 0–5 data-availability "class" taxonomy. *(high)*
- **Since 2020 it has been shown insufficient on its own:** there is **no clear consensus in NLP on
  what qualifies as "low-resource,"** and "low-resourcedness" is **multidimensional** (data, tools,
  speakers, institutional support, digitization), not a single data-volume axis. *(high — Ranathunga
  & de Silva 2022; Nigatu et al. 2024)*
- **Categorizing languages *solely* by data availability is now considered inadequate**, and recent
  work recommends NLP papers give **explicit descriptions of the languages they work on** rather than
  leaning on a single class label. *(high)*

**What to cite now:** keep **Joshi 2020** as the baseline, and add **Ranathunga & de Silva (AACL
2022)** and **Nigatu et al. (EMNLP 2024)** for the "it's multidimensional / define your language
explicitly" critique.

> ### Do NOT use (caught and refuted, 0–3)
> - ❌ *"Ranathunga & de Silva propose categorizing languages by speaker population/vitality as an
>   alternative to Joshi's data-based taxonomy."* — **false**; the paper does not propose a
>   speaker-vitality replacement taxonomy.
> - ❌ Specific per-model language counts *"AfriBERTa = 17, AfriTeVa = 20, AfroLM = 23, AfroXLMR = 30."*
>   — these exact figures **failed verification**; do not state them without re-checking each model's
>   own paper.

---

## 2 · State of African / low-resource NLP (figures with dates)

| Stat | Value | Year / source | Confidence |
|---|---|---|---|
| Living languages worldwide | **7,164** (Ethnologue 27th ed.) | 2024 | high |
| — same, newer edition | 7,170 (Ethnologue 29th ed.) | 2026 | high (caveat) |
| Living languages in Africa | **~2,140** | Ethnologue, 2024 | high |
| African languages with **any** LLM support | **~42** of 2,000+ | 2025 | high |
| African languages **"fully" supported** | **4** | 2025 | medium ⚠ (narrow 8-SLM intersection) |
| Languages "performant multilingual LLMs" reliably cover | **~100** | 2025 | high |
| Sahara benchmark language coverage | **517** African languages; most generation **< 15 BLEU** | ACL 2025 | high |

- **All indigenous languages of Sub-Saharan Africa can be considered low-resourced.** *(high)*
- **Most major LLMs underperform on non-English and especially low-resource languages**, and
  **perform poorly on African-language generation**; web-sourced multilingual training data is itself
  low-quality for these languages. *(high)*
- **As of 2025, training genuinely performant multilingual LLMs for low-resource languages remains an
  open problem.** *(high)*

---

## 3 · Landmark initiatives, datasets & benchmarks to reference (2021–2025)

**Verified in this run:**
- **Masakhane / Adelani (2025)** built **participatory, human-annotated datasets for 21 African
  languages**, incl. **MasakhaNER 2.0** (NER) and **MAFAND-MT** (machine translation). *(high)*
- **Glot500-m** — multilingual model/corpus scaled to **511 languages** (ACL 2023). *(high)*
- **FineWeb2** — pretraining data pipeline covering **1,000+ languages** (2025 preprint). *(high — preprint)*

**Commonly referenced, but scale NOT verified in this run — check each paper before quoting numbers:**
AfriSenti (sentiment), AfriQA (open-retrieval QA), MasakhaNEWS, AfriMMLU / IrokoBench (NAACL 2025),
AfroLID, SIB-200, FLORES-200, AfriBERTa, AfroXLMR, GlotLID, Lanfrica. Source links are in §Sources;
treat their coverage figures as **to-verify** until confirmed against the primary paper.

---

## 4 · "How to use" framing & good practice ⚠ lower confidence

> These are well-established canonical references, but the specific framings below were **not** part
> of the 25 adversarially-verified claims in this run — verify before stating as fact.

- **Dataset documentation standards:** *Datasheets for Datasets* (Gebru et al.), *Data Statements for
  NLP* (Bender & Friedman, UW Tech Policy Lab), and Model Cards — recommend per-dataset documentation
  of provenance, languages, speakers, consent and intended use.
- **Community data governance:** the **CARE Principles for Indigenous Data Governance** (Carroll et
  al., *Data Science Journal* 2020) — Collective benefit, Authority to control, Responsibility,
  Ethics — as a complement to **FAIR** (Findable, Accessible, Interoperable, Reusable).
- **Participatory practice:** Nekoto et al. (2020), *"Participatory Research for Low-resourced Machine
  Translation: A Case Study in African Languages"* (Masakhane) is the canonical model for
  community-driven, speaker-led data work — a natural anchor for a Waraka "how to use" section.

---

## What changed since 2020 / what to cite now

| Old (≤2020 framing) | Update for the new intro |
|---|---|
| Joshi 2020 0–5 classes as *the* definition | Joshi 2020 **+** "no consensus, multidimensional" critique (Ranathunga & de Silva 2022; Nigatu et al. 2024) |
| Pre-LLM "low-resource = little data" | LLM-era gap: ~100 languages well-covered, **~42** African languages with any LLM support, poor African-language generation (2025) |
| Older language counts | Ethnologue **2024: 7,164 worldwide / ~2,140 Africa** |
| Few named African datasets | Masakhane suite (MasakhaNER 2.0, MAFAND-MT, MasakhaNEWS), AfriSenti, AfriQA, IrokoBench, Glot500, FineWeb2 |

---

## Caveats & confidence

- **7,164** is the 2024 Ethnologue figure; the **29th ed. (2026) reports 7,170** — use the year you cite.
- The **"4 fully-supported African languages"** figure comes from a **narrow 8-small-LM intersection**
  — present it as illustrative, not definitive.
- Several key sources (Sahara, FineWeb2, the SLM-coverage paper) are **arXiv preprints** — fine for a
  practitioner playbook, but note them as such.
- **§4 (documentation/governance) was not adversarially verified here** — lower confidence.

## Open questions for the F1 authors

1. Which governance standard should the "how to use" section formally adopt — **CARE + FAIR**, or
   something lighter for contributors?
2. Confirm there is genuinely **no successor taxonomy** worth adopting, or pick the Joshi-2020 +
   critique framing as final.
3. Decide how to cite the **unverified benchmarks** (AfroLID, SIB-200, FLORES-200, IrokoBench) — I can
   run a focused verification pass on dataset scales before they go in the chapter.

---

## Sources

**Taxonomy & definition**
- Joshi et al. 2020, *The State and Fate of Linguistic Diversity…* (ACL 2020) — https://aclanthology.org/2020.acl-main.560/
- Nigatu et al. 2024 (EMNLP 2024) — https://aclanthology.org/2024.emnlp-main.983/
- Ranathunga & de Silva 2022 (AACL) — https://arxiv.org/pdf/2210.08523

**LLM coverage / what changed since 2020**
- Stanford HAI 2024, *Mind the Language Gap* — https://hai.stanford.edu/policy/mind-the-language-gap-mapping-the-challenges-of-llm-development-in-low-resource-language-contexts
- Glot500 (ACL 2023) — https://ar5iv.labs.arxiv.org/html/2305.12182
- 2025 low-resource/LLM survey (preprint) — https://arxiv.org/pdf/2507.00297

**State of African / low-resource NLP (stats)**
- Ethnologue, *How many languages* — https://www.ethnologue.com/insights/how-many-languages/
- African SLM coverage (preprint; per-model counts unverified) — https://arxiv.org/html/2506.02280v3
- Sahara benchmark (ACL 2025) — https://arxiv.org/html/2502.19582v1
- Additional stats sources — https://arxiv.org/pdf/2305.13820 · https://arxiv.org/pdf/2509.25477

**Datasets & benchmarks**
- Adelani 2025 (21-language participatory datasets) — https://arxiv.org/abs/2506.20920
- IrokoBench / AfriMMLU (NAACL 2025) — https://aclanthology.org/2025.naacl-long.139/
- AfriSenti — https://arxiv.org/abs/2302.08956 · AfriQA — https://arxiv.org/abs/2309.07445
- MasakhaNER 2.0 — https://arxiv.org/abs/2210.11744 · others — https://arxiv.org/abs/2304.09972 · https://arxiv.org/abs/2305.06897

**Documentation & governance (canonical; not verified this run)**
- Datasheets for Datasets (Gebru et al.) — https://arxiv.org/pdf/1803.09010
- Data Statements for NLP (UW Tech Policy Lab) — https://techpolicylab.uw.edu/data-statements/
- CARE Principles for Indigenous Data Governance (Carroll et al. 2020) — https://datascience.codata.org/articles/10.5334/dsj-2020-043
- FAIR data reference — https://www.nature.com/articles/s41597-021-00892-0

**Participatory African NLP good practice**
- Nekoto et al. 2020, *Participatory Research for Low-resourced MT* — https://arxiv.org/pdf/2010.02353
- AfricaNLP 2024 workshop — https://sites.google.com/view/africanlp2024/home
- Recent (2024–2025) — https://arxiv.org/html/2510.05644v1 · https://arxiv.org/pdf/2505.21315 · https://arxiv.org/html/2406.03368v1 · https://arxiv.org/pdf/2504.14105
