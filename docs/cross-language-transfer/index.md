---
sidebar_position: 1
ready: true
last_update:
  date: 2026-07-07
  author: Idris Abdulmumin
---

# Cross-language transfer for African languages

*Last reviewed: 2026-07-07.*

Africa is home to roughly 2,140 living languages ([Ethnologue, 2024](../references.md#ethnologue-2024)). The best-covered public NLP resources — [MasakhaNER 2](https://arxiv.org/abs/2210.12391) at 20 languages, [NLLB-200](https://arxiv.org/abs/2207.04672) at roughly 40 African languages, [Meta MMS](https://arxiv.org/abs/2305.13516) at hundreds — reach a small fraction of that. The overwhelming majority of African languages have **no dedicated model, no substantial training corpus, and no benchmark**. Cross-language transfer — starting from a well-resourced related language and adapting to an uncovered one — is the practical route for most of them, and often the only route.

This chapter is the map. It answers: *given a target African language that no released model covers well, which resourced language should you transfer from, and when should you not bother trying?*

## Why cross-language transfer works — and when it does

Three properties predict whether a source language will transfer usefully to a target:

1. **Genealogical relatedness.** Languages descended from the same ancestor share vocabulary roots, morphological patterns, and syntactic structures. Transfer within a language family is usually strong; across families it is often weak.
2. **Script sharing.** Latin-script pivots transfer to Latin-script targets; Ge'ez-script pivots to Ge'ez-script targets; Ajami (Arabic script) to Ajami. Cross-script transfer is an open research problem, not a solved one — treat any promise of "the model handles both scripts" with independent verification.
3. **Typological similarity.** Word order (SVO, SOV, VSO), agglutination versus isolation, tone versus non-tone, click phonology, noun-class systems. Two languages can be closely related genealogically but typologically divergent in ways that break transfer. Two languages can be unrelated but typologically similar and transfer surprisingly well.

The rule of thumb is: **check all three, and treat any single-axis match as an experimental starting point, not a guarantee.**

## The one heuristic to memorise

**If your target language has no direct model, start from the closest genealogical relative in the same script that IS covered by a released model.** Fine-tune on a small evaluation set in the target language first (200–500 examples) and measure the transfer quality *before* investing in corpus creation. If transfer looks reasonable, you may need only modest additional data. If transfer fails, you need a full corpus effort.

That heuristic will not always give the best answer, but it will always give a defensible starting point that you can improve from. The rest of this chapter is about picking the closest covered relative for the major African language families.

## Per-family transfer guidance

The families below cover most of the African linguistic landscape. Within each, we name the pivots that have public models (MasakhaNER 2 for NER, NLLB-200 for MT, MMS for ASR), and note where transfer typically works and where it typically does not. All pivot lists are current as of the last review date at the top of this page — check the source repos for updates.

### Bantu (~500 languages, sub-Saharan)

Rich agglutinative morphology, noun-class systems, tonal, mostly Latin script. Bantu is the family with the deepest African-language NLP coverage.

**Pivots with published NER (MasakhaNER 2), MT (NLLB-200), and ASR (MMS/FLEURS) support:** Kiswahili (swa), isiZulu (zul), isiXhosa (xho), Kinyarwanda (kin), Luganda (lug), Chichewa / Nyanja (nya), Chishona (sna), Setswana (tsn).

Sub-branch transfer patterns:
- **Southern Bantu (Nguni: isiZulu, isiXhosa, isiNdebele, Siswati)** — transfer within Nguni is strong; use isiZulu or isiXhosa as pivot for a Nguni target.
- **Sotho-Tswana (Setswana, Sesotho, Sepedi)** — transfer within this group is strong; Setswana is the well-covered pivot.
- **Great Lakes / East African (Kinyarwanda, Kirundi, Luganda, Runyankole, Runyoro)** — moderate transfer; Kinyarwanda and Luganda are the pivots, and transfer to closely-related targets (e.g., Kirundi from Kinyarwanda) is often near-parity, while transfer across the Great Lakes region drops off.
- **Central Bantu (Chichewa, Chishona, Bemba, Tonga)** — moderate; Chichewa and Chishona are the covered pivots.
- **Kiswahili is unusual** — it is the highest-resourced Bantu language and the natural first pivot for coastal East African languages, but its heavy Arabic and English loanword influence makes it a less clean pivot for morphologically-conservative interior Bantu languages.

**When Bantu transfer fails:** across sub-branches for morphology-heavy tasks (Southern Nguni to Great Lakes is unreliable for NER of common nouns); wherever tone marking conventions differ between source and target.

### Chadic (Afroasiatic, West Africa)

Rich verbal morphology, tone in most languages, mostly Latin script but Hausa also written in Ajami (Arabic script).

**Pivots:** Hausa (hau) is the only well-covered Chadic language — in MasakhaNER 2, NLLB-200, and MMS. All published resources are Latin-script Hausa.

Sub-branch transfer patterns:
- **Hausa → other West Chadic (Ngizim, Bole, Bade, etc.)** — genealogical relation is real, but typological similarity is uneven; expect experimental starting points, not near-parity.
- **Hausa → East Chadic or Biu-Mandara** — genealogical distance is large; Hausa is a weaker pivot than distance suggests.
- **Hausa Ajami** — cross-script transfer from Latin Hausa is an open research problem; do not assume the model that handles Latin Hausa will handle Ajami Hausa.

Where a Chadic pivot fails, the next best options are:
- Broader Afroasiatic pivots (Arabic, Amharic, Somali) — cousin-family transfer, often surprising in either direction.
- English or French as a lingua franca pivot — weaker linguistically but often stronger practically because of much larger training corpora.

### Nilotic (East Africa)

Tonal, mostly Latin script, some VSO word order. Includes some of the most under-resourced African language groups.

**Pivots:** Dholuo (luo) is covered in MasakhaNER 2 and (partially) in NLLB-200. No dedicated MMS adapter for many Nilotic languages.

Sub-branch transfer patterns:
- **Dholuo → other Western Nilotic (Dinka, Nuer, Anuak, Shilluk)** — modest; genealogically related but Dholuo has substantial East African contact features.
- **Nilotic → Nilotic across major branches (Western, Eastern, Southern)** — low; the branches diverged early and typology varies significantly.

Where Nilotic transfer fails, cross-family transfer via Kiswahili (as regional lingua franca and pivot) is often the practical fallback.

### Volta-Niger / Kwa (West Africa)

Tonal, Latin script with lexically-load-bearing diacritics, complex vowel systems.

**Pivots covered in MasakhaNER 2 and NLLB-200:** Yoruba (yor), Igbo (ibo), Ewe (ewe), Twi / Akan (twi), Fon (fon).

Sub-branch transfer patterns:
- **Yoruba / Igbo → related Volta-Niger languages** — real but variable; both are tonal with different-enough sub-systems that direct transfer needs verification.
- **Ewe, Twi, Fon (Gbe / Tano)** — closely related; transfer among these is generally strong.
- **Diacritic handling is the single biggest technical footgun** — a pivot model trained with normalized diacritics will systematically mis-recognize entities in a diacritically-faithful target corpus.

### Cushitic (Horn of Africa)

Rich morphology, VSO or SOV word order, Latin script (Somali, Oromo) or Ge'ez script (some Ethiopic Cushitic).

**Pivots:** Somali (som) has NLLB-200 and Whisper coverage; MMS covers a broader set.

Sub-branch transfer patterns:
- **Somali → Oromo / Afar** — moderate; genealogical relation is real but morphological systems differ.
- **Latin-script Cushitic → Ge'ez-script Cushitic** — script barrier dominates; do not assume.
- **Cushitic ↔ Semitic (Amharic, Tigrinya)** — both are Afroasiatic, but the Cushitic–Semitic branch split is deep; transfer is limited despite regional proximity.

### Semitic — Ethiopic (Horn of Africa)

Rich templatic morphology, Ge'ez script, SOV, three-consonant root system.

**Pivots:** Amharic (amh) is well covered — MasakhaNER 2, NLLB-200, MMS. Tigrinya (tir) is covered in NLLB-200 and MMS.

Sub-branch transfer patterns:
- **Amharic ↔ Tigrinya ↔ Tigre ↔ Ge'ez** — genealogically close, all Ge'ez-script; Amharic is the strongest pivot for uncovered Ethiopic Semitic targets.
- **Amharic → Cushitic or non-Ethiopic Semitic (Arabic, Hebrew)** — low despite Afroasiatic family; script and morphological system differ enough to break transfer.
- **The Ge'ez script itself is the largest single barrier.** If your target is Ge'ez-script, do not pivot from a Latin-script model without an intermediate script-conversion step, and be aware that script conversion introduces its own errors.

### Mande (West Africa)

Tonal, Latin script for most (some N'Ko for Manding languages), varied word order.

**Pivots:** Bambara (bam) is covered in MasakhaNER 2 and NLLB-200.

Sub-branch transfer patterns:
- **Bambara → other Manding (Mandinka, Malinke, Dyula, Susu)** — moderate to strong; the Manding continuum has substantial mutual intelligibility, and Bambara is a defensible pivot for Manding targets.
- **Bambara → other Mande (Soninke, Vai, Mende)** — weak; the Mande–Manding split is deep.
- **N'Ko script for Manding** — as with Ajami and Ge'ez, cross-script transfer needs an explicit approach; it is not solved.

### Senegambian / Atlantic (West Africa)

Latin script (Wolof) or Ajami (Fulfulde). Complex noun-class systems.

**Pivots:** Wolof (wol) is covered in MasakhaNER 2 and NLLB-200. Fulfulde (ful) has partial NLLB-200 coverage.

Sub-branch transfer patterns:
- **Wolof → Serer, Cangin languages** — moderate.
- **Fulfulde is a dialect continuum** stretching from Senegal to Sudan; a pivot trained on West African Fulfulde may not transfer cleanly to Central or East African varieties.
- **Ajami Fulfulde** — same script-barrier caveat as Hausa Ajami.

### Other families

- **Grassfields Bantu** (Ghomala / bbj in MasakhaNER 2) — genealogically Bantu-adjacent but distinct enough that direct Kiswahili or Zulu transfer is weak; use Ghomala as the pivot for closely-related Grassfields targets, and expect low transfer to non-Grassfields Bantu.
- **Gur** (Mossi / mos in MasakhaNER 2) — the pivot for Gur targets; transfer within Gur is understudied but likely follows the sub-branch pattern seen elsewhere.
- **Khoisan (click languages: Namibia, Botswana, South Africa)** — public NLP coverage is essentially zero; there is no useful pivot within the family, and cross-family transfer to click languages is an open research area, not a practical strategy.

## When transfer breaks — the warning signs

Even a genealogically-close, script-shared, typologically-similar pivot can fail. Watch for:

- **Systematic entity mis-recognition** — the target-language equivalent of the same entity type is being missed at a higher rate than the pivot. Suggests morphology differences the pivot model was not exposed to.
- **Diacritic-error clusters** — errors concentrate on words carrying diacritics the pivot's normalization stripped.
- **Code-switching artefacts** — the pivot handles code-switching one way (say, Kiswahili-English), the target's code-switching pattern is different (say, Kikuyu-Kiswahili-English), and the model over-fits to the pivot's pattern.
- **Domain mismatch masquerading as language mismatch** — the pivot was trained on news; your evaluation set is social media; the "cross-language" failure is actually a domain failure.
- **Reverse transfer looks worse than forward** — if fine-tuning your target back onto the pivot's benchmark hurts its scores substantially, the two are further apart than they looked.

## How to measure transfer success on YOUR target

Before scoping a large corpus effort:

1. **Build a small evaluation set** in your target language. 200–500 examples, native-speaker verified, in the domain you actually care about. This is non-negotiable and is the minimum viable evidence.
2. **Run the pivot model** on this evaluation set out-of-the-box. Record the numbers. Human-evaluate a sample of the outputs — automatic metrics on a small set are noisy.
3. **Fine-tune the pivot model** on 100–500 examples in your target language (if you have any at all). Compare against the out-of-the-box baseline. The delta tells you how "warm" the transfer is.
4. **Decide from the delta.** If out-of-the-box is already usable, deploy and iterate. If light fine-tuning closes most of the gap, budget for a modest corpus (1–5k examples). If light fine-tuning barely moves the needle, you need a full corpus effort.

This is the same framework as the fork-or-fresh decision trees in the [Before You Start](../before-you-start/index.md) chapters — cross-language transfer is the "fresh but with a warm start" branch.

## Further reading

- [MasakhaNER 2 paper (Adelani et al., 2022)](https://arxiv.org/abs/2210.12391) — the largest published empirical study of cross-lingual transfer for African-language NER. Their Table 5 and cross-language transfer sections are the reference for what actually transfers between African languages, and by how much.
- [NLLB paper (NLLB Team et al., 2022)](https://arxiv.org/abs/2207.04672) — extensive analysis of cross-lingual transfer for translation, including language-family effects and the impact of related-language training data.
- [Meta MMS paper (Pratap et al., 2023)](https://arxiv.org/abs/2305.13516) — the reference on cross-lingual transfer at massive language scale for speech.
- [XLS-R paper (Babu et al., 2021)](https://arxiv.org/abs/2111.09296) — cross-lingual speech-representation transfer, useful reading for the underlying mechanics.
- [Kreutzer et al., 2022](https://aclanthology.org/2022.tacl-1.4/) — quality audit of low-resource web crawls; important because a fair chunk of "cross-language transfer" reported in some papers is really the transfer of noise from mislabelled corpora.
- [Adelani et al., 2021 — MasakhaNER 1](https://aclanthology.org/2021.tacl-1.66/) — the earlier study that established many of the participatory-workflow and cross-language-transfer patterns.
- [Joshi et al., 2020](https://aclanthology.org/2020.acl-main.560/) — the language-resourcedness taxonomy that frames why cross-language transfer matters for the bottom tiers of the world's languages.

---

**Contributor's note.** This chapter is deliberately hedged. Cross-language transfer for African languages is a genuinely research-grade problem, and any page that claims "transfer from X to Y works" without citing an empirical result is claiming more than it knows. If you are adding to this chapter — for a family, a script issue, a specific target-language pivot — cite what you know from published results, and mark what you are inferring. Uncited claims will be removed on next review.
