---
sidebar_position: 7
title: Samfurin katin ƙirar fasaha
ready: true
last_update:
  date: 2026-07-07
  author: Shamsudddeen Hassan Muhammad
translation_status: machine
source_hash: 625694bf6ec6
translated_at: 2026-09-28
---

# Samfurin katin ƙirar fasaha {#model-card-template}

*An duba na ƙarshe: 2026-07-07.*

*Samfurin da aka samo daga Model-Cards ([Mitchell et al., 2019](https://arxiv.org/abs/1810.03993)) wanda aka faɗaɗa da sassan gaskiyar aiki (deployment-realism) wanda [babin ƙaddamarwa (deployment chapter)](/deployment/) na AfriPlaybook ya kafa hujjar cewa ba za a iya tsallake su ba: jinkirin matakin da aka sa a gaba (target-tier latency), raguwar inganci sakamakon rage girma (quantised quality drop), kimantawar gauraya harsuna (code-switched evaluation), ɗaukar nau'o'in haruffa (script-variant coverage). Yi kwafinsa (fork), cika shi, sannan ka fitar da shi tare da ƙirar fasahar (model).*

## Yadda za a yi amfani da wannan samfurin {#how-to-use-this-template}

1. Kwafi duk abin da ke ƙarƙashin layin raba rubutu zuwa sabon fayil (`docs/model-card.md` a cikin ma'adanar aikin ka, ko `README.md` a shafin ƙirar fasaha na Hugging Face Hub).
2. Sauya duk wani `[FILI MAI BAKA (BRACKETED FIELD)]` da ainihin amsa.
3. Goge duk wani sashe da bai dace ba sannan ka ƙara `Ba ya aiki a nan: [dalili]` a madadinsa. Kada ka tsallake ba tare da bayani ba.
4. Buga shi tare da ƙirar fasahar, ba daban ba. Ƙirar fasahar da ba ta da kati, ƙirar fasaha ce da za a yi amfani da ita ta hanyar da ba ta dace ba.

An samo asali daga [Mitchell et al., 2019](https://arxiv.org/abs/1810.03993), da jerin abubuwan dubawa na [Kafin Ka Fara (Before You Start)](/before-you-start/) na AfriPlaybook, da [babin ƙaddamarwa](/deployment/), da kuma [babin amincewar doka (legal-consent chapter)](/legal-consent/).

---

## [SUNAN ƘIRAR FASAHA (MODEL NAME)] {#model-name}

- **Fitarwa (Version):** [X.Y]
- **Ranar fitarwa:** [YYYY-MM-DD]
- **An duba na ƙarshe:** [YYYY-MM-DD]
- **Tabbataccen URL (Canonical URL):** [Shafin HF Hub, fitarwar GitHub, ko URL na sauka]
- **Lasisi:** [Mai gano SPDX, misali, CC BY-NC 4.0, Apache-2.0]
- **Kalaman da aka fi so wajen ambato (Preferred citation):** [BibTeX ko rubutu zalla]
- **Tuntuɓa / wanda aka naɗa don kulawa:** [SUNA + kafa: mutum ko hukumar da ke kula da buƙatun sake amfani da kuma matsalolin da aka kawo rahotonsu.]

## 1. Cikakkun bayanan ƙirar fasaha {#1-model-details}

- **Nau'in ƙirar fasaha:** [Mai ɓoye bayanai (Encoder) / mai ɓoyewa da warwarewa (encoder-decoder) / mai warwarewa kawai (decoder-only) / mai ɓoye magana (speech encoder) / rubutu-zuwa-magana (text-to-speech) / mai ɓoyewa da warwarewa na OCR / mai nemo bayanai + mai karatu (retrieval + reader) / da sauransu.]
- **Tsari (Architecture):** [Misali, "XLM-RoBERTa-large wanda aka ƙara wa horo (fine-tuned) ta hanyar LoRA (rank 16)".]
- **Yawan ma'auni (Number of parameters):** [Jimilla + waɗanda za a iya horarwa idan an yi amfani da PEFT.]
- **Tushen ƙirar fasaha (Base model):** [Tushen asali (upstream checkpoint) da aka gina wannan a kai. Saka URL ɗinsa da lasisinsa.]
- **Tsarin horarwa:** [Cikakken ƙarin horo (Full fine-tuning) / LoRA / QLoRA / adafta (adapter) / daga farko (from scratch).]
- **Harshe (Harsuna):** [Tabbatattun lambobin ISO + nau'o'i, karin harshe, da rabe-raben da aka haɗa.]
- **Yanayi (Modality):** [Rubutu / magana / gani (vision) / mai yanayi da yawa (multimodal).]
- **Aiki (Ayyuka):** [Tabbatacce.]
- **Wanda ya ƙirƙiri ƙirar fasahar:** [Sunayen mutane + ƙungiyoyin da suke ciki + al'ummar da harshensu yake yi wa aiki.]
- **Wanda ya ɗauki nauyin ƙirƙirawa:** [Sunaye + lambobin tallafi (grant IDs).]

## 2. Abin da aka yi niyyar amfani da shi wajen yi {#2-intended-use}

- **Babban abin da aka yi niyyar amfani da shi wajen yi:** [Tabbataccen aiki da yanayi. Ba "binciken NLP" ba amma ainihin abin da za a yi amfani da shi a kai.]
- **Ainihin masu amfani da aka yi niyya:** [Masu bincike, masu haɓakawa, mambobin al'umma, ƙungiyoyin ƙaddamarwa, duk wanda ya dace.]
- **Amfanin da bai dace ba (Out-of-scope uses):** [Jerin a bayyane. Kowane katin ƙirar fasaha ya kamata ya ambaci amfanin da masu haɓakawa **ba su** amince da shi ba. Duba [babin amincewar doka "lokacin da za a ce a'a"](/legal-consent/#when-to-say-no); irin wannan dalilin ne yake aiki a nan.]

## 3. Bayanan horarwa (Training data) {#3-training-data}

- **Tarin rubutu (Corpus / corpora) da aka yi amfani da shi:** [Sunayen ma'adanar bayanai (datasets) + URLs + lasisi. Haɗa da AfriSenti, MasakhaNER 2, LAFAND-MT, ko tarin rubutun da ya keɓanta da aikin ka.]
- **Katunan ma'adanar bayanai masu alaƙa:** [Sanya mahaɗi zuwa katunan ma'adanar bayanai na kowane tarin rubutu da aka yi amfani da shi. Duba [samfurin katin ma'adanar bayanai](/templates/dataset-card).]
- **Gyaran farko da aka yi (Preprocessing applied):** [Rarraba kalmomi (Tokenisation), daidaitawa (normalisation), sarrafa wasula (diacritic handling), canza haruffa (script conversion), cire maimaici (deduplication), tacewa (filtering). Ya zama a bayyane sosai yadda za a iya sake yin sa.]
- **Girman bayanan horarwa:** [A kowane harshe, a kowane rabe-rabe (split).]
- **Son zuciya da aka sani a cikin bayanan horarwa (Known biases):** [Rukunin mutanen da ba a wakilta sosai ba, majiyoyin da aka fi ba wa fifiko, ƙanƙantar fage, tsarin gauraya harsuna (code-switching profile).]
- **Duk wani ƙarin bayanai da aka yi (Data augmentation):** [Bayanan ƙirƙira (Synthetic data), fassarar baya (back-translation), misalan da LLM ya ƙirƙira. A ambaci suna + dalili.]

## 4. Kimantawa (Evaluation) {#4-evaluation}

Bisa ga [ƙa'idojin asali](/introduction/core-principles), dole ne kimantawa ta kasance a kowane harshe kuma a kowane aji (per-class). Duba [samfurin rubutun kimantawa (evaluation script template)](/templates/evaluation-script) don samun tsarin da ya dace.

- **Bayanan kimantawa da aka yi amfani da su:** [Sunayen ma'auni (benchmarks) + rabe-rabe + gyaran farko.]
- **Babban ma'auni (Primary metric):** [chrF don fassara, CER don magana, F1 na kowane aji don rarrabawa (classification), top-k retrieval don QA. Bayyana zaɓin da kuma dalili.]
- **Ma'auni na biyu (Secondary metrics):** [BLEU, WER, EM: waɗanda aka ajiye don kwatantawa da aikin baya.]

### 4.a Sakamako {#4a-results}

Bayar da rahoto a kowane harshe da kowane aji. **Kada** ka buga lamba ɗaya a matsayin kanun labari wacce ke nuna matsakaita (average) a dukkan harsuna; matsayin edita na AfriPlaybook shi ne cewa irin waɗannan matsakaitan suna ɓoye gagarumar gazawa a kowane harshe.

| Harshe | [BABBAN MA'AUNI (PRIMARY METRIC)] | [MA'AUNI NA BIYU (SECONDARY METRIC)] | Adadi (n) |
| --- | --- | --- | --- |
| [HARSHE NA 1] | [MAKI] | [MAKI] | [N] |
| [HARSHE NA 2] | [MAKI] | [MAKI] | [N] |

Don rarrabawa (classification): ƙara rabe-raben F1 na kowane aji a kowane harshe.

### 4.b Kimantawar ɗan adam {#4b-human-evaluation}

Wajibi ne don sakamakon ƙirƙira (fassara, TTS, QA na ƙirƙira, ayyukan da suka dogara da LLM).

- **Yawan masu kimantawa:** [A ƘALLA 2 don tabbatar da ƙididdiga; A ƘALLA 5 don MOS.]
- **Yawan abubuwan da aka kimanta:** [A kowane harshe.]
- **Ma'aunin da aka yi amfani da shi:** [1-5 MOS, kimantawa kai tsaye (direct assessment), wadatarwa + ƙwarewa (adequacy + fluency), da sauransu.]
- **Sakamako:** [Maki + tazarar tabbaci (confidence interval) + yadda aka warware saɓani.]
- **Inda ainihin bayanan kimantawa suke:** [URL; dole ne a iya sake yin kimantawar ɗan adam.]

### 4.c Kimantawar gauraya harsuna (Code-switched evaluation) {#4c-code-switched-evaluation}

Ana buƙata bisa ga [babin gauraya harsuna da yawa (multilingual switching chapter)](/deployment/multilingual-switching).

- **Bayanan gwaji na gauraya harsuna da aka yi amfani da su:** [Bayani + URL.]
- **Maki a kan bayanan gauraya harsuna:** [Bayar da rahoto daban da na harshe ɗaya; lamba ɗaya tana ɓoye gazawar gauraya harsuna.]

### 4.d Kimantawar nau'o'in haruffa (Script-variant evaluation) {#4d-script-variant-evaluation}

Ana buƙata don harsunan da ake rubutawa da haruffa fiye da ɗaya (Hausa Boko + Ajami, Amharic Ge'ez + fassarar haruffan Latin, da sauransu).

- **Nau'o'in haruffan da aka gwada:** [Sunaye + maki a kowane nau'i.]

## 5. Gaskiyar aiki wajen ƙaddamarwa (Deployment realism) {#5-deployment-realism}

Bayan daidaitattun filayen katin ƙirar fasaha, waɗannan sassan ƙari ne na AfriPlaybook waɗanda ba a sasantawa a kansu.

### 5.a Matakin ƙaddamarwa da aka sa a gaba {#5a-target-deployment-tier}

- **Ajin na'urar (Hardware class) da aka yi niyyar gudanar da ƙirar fasahar a kai:** [Server GPU / matsakaiciyar Android / Android Go / Raspberry Pi 5 / da sauransu. Duba [taswirar matakin waya na babin na'urorin gefe (edge-devices chapter's phone tier map)](/deployment/edge-devices#the-phone-tier-map-the-deployment-surface).]
- **Tsarin gudanarwa (Runtime) da ake tallafawa:** [ONNX Runtime Mobile / TFLite / whisper.cpp / llama.cpp / MLC-LLM / da sauransu.]
- **Girman ƙirar fasaha a kan ma'adana (disk):** [Cikakken girma (Full precision) + girman da aka rage (quantised sizes).]
- **RAM da ake buƙata wajen aiki (inference):** [Cikakken girma + wanda aka rage girma.]

### 5.b Jinkiri da yawan aiki (Latency and throughput) {#5b-latency-and-throughput}

- **Jinkirin p50 a kan na'urar da aka sa a gaba:** [ms a kowane aiki (inference) a kan bayanan da ke wakiltar ainihin aiki.]
- **Jinkirin p95:** [Kason da ke da muhimmanci ga ƙwarewar mai amfani (UX).]
- **Yawan aiki a ƙarƙashin ci gaba da aiki (Throughput under sustained load):** [Ciki har da raguwar gudu saboda zafi (thermal throttling); duba [sashin kimantawar na'urorin gefe](/deployment/edge-devices#evaluation-methodology-for-edge-deployment).]
- **Shan baturi a duk ayyuka 100 a kan matakin wayar da aka sa a gaba:** [Idan ya dace.]

### 5.c Rage girma (Quantisation) {#5c-quantisation}

- **Rage girman da aka yi (Quantisation applied):** [INT8 dynamic / INT8 static / INT4 / mixed-precision / QAT.]
- **Raguwar inganci sakamakon rage girma:** [Babban ma'auni kafin + bayan rage girma, a kowane harshe. Dole ne a bayar da rahoton wannan; ƙaddamar da ƙirar fasaha ba tare da auna raguwar inganci sakamakon rage girma ba, wata hanya ce ta gazawa.]
- **URL na ƙirar fasahar da aka rage girma:** [Inda za a sauke ma'aunan da aka rage girma (quantised weights).]

### 5.d Yanayin aiki ba tare da intanet ba (Offline behaviour) {#5d-offline-behaviour}

Don duk wata ƙirar fasaha da aka fitar a matsayin wani ɓangare na ƙaddamarwa mai aiki ba tare da intanet ba. Duba [babin aiki ba tare da intanet ba (offline chapter)](/deployment/offline).

- **Yana aiki gaba ɗaya a kan na'ura:** [Eh / a'a.]
- **Ƙwarewar mai amfani (UX) wajen sauke ƙirar fasaha don manhajar da aka sa a gaba:** [An fi son Wi-Fi, ana iya ci gaba da saukewa (resumable), an duba ingancinsa (integrity-checked), ana iya soke shi; duba [sashin UX na sauke ƙirar fasaha na babin aiki ba tare da intanet ba](/deployment/offline#model-download-ux-the-part-that-gets-ignored).]

## 6. Iyakoki da hanyoyin gazawa da aka sani {#6-limitations-and-known-failure-modes}

- **Iyakokin da aka sani:** [Waɗanda suka keɓanta da wannan ƙirar fasaha + aiki + harsuna. Jerin abubuwan dubawa na Mataki na 2 a kan misalin da ya dace na [Kafin Ka Fara (Before You Start)](/before-you-start/) wuri ne mai kyau na farawa.]
- **Kura-kuran tsari da aka sani (Known systematic errors):** [Inda ƙirar fasahar take yawan yin kuskure, daga bayanan kimantawa.]
- **Abin da ma'aunan BA SU nuna ba:** [Bisa ga [ƙa'idojin asali](/introduction/core-principles), matsayin edita na AfriPlaybook shi ne cewa dole ne a ambaci ɓoyayyun kurakuran ma'auni (metric blind spots) a kan katin.]
- **Rukunin mutanen da ba a yi wa aiki yadda ya kamata ba:** [Karin harshe, rabe-rabe, rukunin mutane inda ƙirar fasahar take yin aiki mara kyau.]
- **Shawarwari ga masu amfani na ƙasa (downstream users) da suka fuskanci matsala:** [Sunan wanda za a tuntuɓa + lokacin da ake sa ran samun amsa.]

## 7. Abubuwan da suka shafi ɗa'a (Ethical considerations) {#7-ethical-considerations}

- **Tushen amincewa ga bayanan horarwa:** [Nuni zuwa ga tsarin amincewa na tarin rubutun. Duba [samfurin takardar amincewa (consent form template)](/templates/consent-form).]
- **Shigar al'umma a cikin haɓaka ƙirar fasaha:** [Sunayen masu kula da al'umma + rawar da suka taka.]
- **Haɗurran ƙaddamarwa:** [Waɗanda suka keɓanta da aikin. Don masu rarraba kalaman ƙiyayya (hate-speech classifiers), haɗarin ƙaddamarwa a matsayin mai daidaitawa mai sarrafa kansa (duba [shafin kalaman ƙiyayya (hate-speech page)](/before-you-start/hate-speech)). Don TTS, haɗarin kwaikwayon murya (duba [babin Rubutu-zuwa-Magana (Text-to-Speech chapter)](/text-to-speech/)). Don masu rarrabawa da aka ƙaddamar a kan masu amfani da aka saniyar ware, bambancin kuskuren gano abu (false-positive disparity).]
- **Matakan ragewa (Mitigations):** [Abin da masu haɓakawa suka yi; abin da mai ƙaddamarwa dole ne ya ci gaba da yi.]

## 8. Ikon sake yin aiki (Reproducibility) {#8-reproducibility}

- **URL na lambar horarwa (Training code):** [Ma'adana (Repo) + takamaiman commit hash.]
- **Tsarin horarwa (Training configuration):** [URL na fayil ɗin tsari (Config file) + hyperparameters.]
- **Random seeds:** [Kafaffu don ikon sake yin aiki.]
- **Yanayin kwamfuta (Compute environment):** [Tsari (Framework) + fitarwa (version) + na'ura (hardware).]
- **Ƙiyasin aikin kwamfuta na horarwa:** [Awannin GPU + matakin na'ura. Yana da amfani ga masu amfani na ƙasa waɗanda suke kwatanta tasirin iskar gas (carbon) da farashi.]

## 9. Rarrabawa (Distribution) {#9-distribution}

- **Inda aka ajiye ƙirar fasahar:** [URL na HF Hub, fitarwar GitHub, ma'adanar jami'a.]
- **Cikakkun sharuɗɗan lasisi:** [SPDX + mahaɗi zuwa cikakken rubutu.]
- **Takunkumi a kan sake amfani:** [A bayyane; ya dace da lasisin bayanan horarwa sai dai idan masu haɓakawa sun tattauna sharuɗɗa masu faɗi.]
- **Buƙatun bayar da yabo (Attribution requirements):** [Yadda ya kamata a jinjina wa masu haɓakawa da al'umma.]

## 10. Kulawa (Maintenance) {#10-maintenance}

- **Wanda ke kula da wannan ƙirar fasaha:** [SUNAN mutum ko cibiya.]
- **Tsarin fitarwa (Release cadence):** [Sau nawa ake sabunta ƙirar fasahar.]
- **Manufar daina amfani (Deprecation policy):** [Yaushe kuma ta yaya za a yiwa ƙirar fasahar alamar an daina amfani da ita; hanyar ƙaura zuwa wacce za ta gaje ta.]
- **Tsarin gyara kura-kurai (Errata process):** [Yadda ake bayar da rahoton matsalolin da aka gano da kuma yadda ake fitar da gyare-gyare.]

## 11. Ambato (Citation) {#11-citation}

Kalaman da aka fi so wajen ambato:

```
[BibTeX or plain-text]
```

Idan ƙirar fasahar ta ginu a kan tarin rubutun da aka buga, ambace su:

- [AMBATON MA'ADANAR BAYANAI NA 1 (DATASET 1 CITATION)]
- [AMBATON MA'ADANAR BAYANAI NA 2 (DATASET 2 CITATION)]

Idan ƙirar fasahar ta ginu a kan tushen ƙirar fasaha (base model):

- [AMBATON TUSHEN ƘIRAR FASAHA (BASE MODEL CITATION)]

---

**Lura ga mai bayar da gudummawa.** Idan katin ƙirar fasahar ka ya faɗaɗa wannan samfurin da filayen da suka keɓanta da wani aiki (makin nemo bayanai don QA, rabe-raben MOS don TTS, CER na kowane shafi don OCR, CER na kowane nau'in haruffa, da sauransu), bar daidaitattun sassan yadda suke sannan ka ƙara sassan da suka keɓanta da aikin a *ƙasa*. Tsarin filayen da aka raba shi ne yake sa kwatanta ƙirar fasaha daban-daban ya yiwu.
