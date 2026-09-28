---
sidebar_position: 6
ready: true
last_update:
  date: 2026-09-26
  author: Shamsudddeen Hassan Muhammad
translation_status: machine
source_hash: 09681a8900be
translated_at: 2026-09-28
---
# Mwongozo huu ni nini (na si nini) {#what-this-playbook-is-and-isnt}

## Muhtasari wa sentensi moja {#the-one-sentence-framing}

**AfriPlaybook ni mfumo mkuu wa maamuzi kwa yeyote anayeanzisha mradi wa Uchakataji wa Lugha Asilia (NLP) kwa lugha za Kiafrika, unaojikita katika uzoefu wa kivitendo wa miradi iliyopita ya Masakhane.**

Kila kitu ambacho mwongozo huu unaongeza kinapaswa kuimarisha sentensi hiyo. Kila kitu unachokiondoa kinapaswa kutetewa dhidi yake.

## Mwongozo huu si nini {#what-this-playbook-is-not}

- **Si** mafunzo kuhusu kufunza au urekebishaji finyu (fine-tuning) wa modeli. Kazi hiyo imeshughulikiwa vyema na [Hugging Face NLP Course](https://huggingface.co/learn/nlp-course), [Google Deep Learning Tuning Playbook](https://github.com/google-research/tuning_playbook), [Google Text Classification guide](https://developers.google.com/machine-learning/guides/text-classification), na [Advanced NLP with spaCy](https://course.spacy.io/en/). Tunaweka viungo vyao; hatuviandiki upya.
- **Si** kitabu cha kiada. Kwa nadharia (uundaji wa tokini (tokenisation), modeli za mfuatano (sequence models), vipimo vya tathmini (evaluation metrics), misingi ya kitakwimu), nenda kwenye kitabu cha Jurafsky na Martin cha [*Speech and Language Processing*](https://web.stanford.edu/~jurafsky/slp3/). Ni cha kuaminika na cha bure.
- **Si** orodha ya mbinu za uandishi wa kodi. Kodi hupitwa na wakati haraka kuliko mwongozo wowote unavyoweza kudumishwa. Tunapoelekeza kwenye kodi, tunaelekeza kwenye hifadhi (repository) iliyo hai, yenye matoleo, na inayodumishwa. Tunapotoa kodi sisi wenyewe, inakaa katika hifadhi pacha inayotoa lebo zake yenyewe za matoleo.
- **Hauko** katikati (neutral). Tunachukua misimamo. Vipimo vya kiwango cha herufi (character-level metrics) kwa lugha zenye mofolojia tajiri ([`chrF`](https://aclanthology.org/W15-3049/), CER) badala ya vile vya kiwango cha neno (word-level) (BLEU, WER). Utoaji wa ripoti za alama kwa kila lugha na kwa kila darasa badala ya wastani mmoja. Tathmini ya binadamu kwa chochote kinachozalisha (generative). Ridhaa kutoka kwa watu waliomo kwenye data. Umiliki wa jamii wa rasilimali zilizojengwa. Ikiwa hukubaliani na misimamo hiyo, huu si mwongozo wako.

## Mwongozo huu ni nini {#what-this-playbook-is}

Kimiundo, mwongozo huu ni wa aina ya **vitabu vya mwongozo vya mzunguko wa maisha wa seti ya data na AI inayowajibika (responsible-AI)**. Ndugu zake wa karibu ni [Datasheets for Datasets](https://arxiv.org/abs/1803.09010) (Gebru na wenzake, 2018), [Data Statements for NLP](https://aclanthology.org/Q18-1041/) (Bender & Friedman, 2018), [Model Cards](https://arxiv.org/abs/1810.03993) (Mitchell na wenzake, 2019), na [The Turing Way](https://the-turing-way.netlify.app/). Kile tunachoongeza juu ya asili hiyo:

- **Sura ya daraja la kwanza kuhusu nguvu kazi ya uwekaji lakabi (annotation-workforce)** (jinsi ya kubuni kazi, kuajiri, kutoa maelekezo, kukagua, kulipa, na kuwabakisha waweka lakabi (annotators)), ambayo vitabu vingi vya mwongozo vya mzunguko wa maisha wa seti ya data huigusia kwa uchache tu.
- **Njia za muundo (modality tracks) za daraja la kwanza** kwa uhalisia wa lugha za Kiafrika: maandishi, hotuba (ASR, TTS, S2ST), OCR/AI ya nyaraka, lugha ya alama na video. Miongozo mingi ya NLP ni ya maandishi pekee.
- **Mtazamo wa wazi wa rasilimali chache (low-resource) na muktadha wa Kiafrika**: muunganisho hafifu wa mtandao, hati nyingi, ubadilishaji msimbo (code-switching), bajeti ndogo za ukokotoaji (compute budgets), mtiririko wa kazi unaoongozwa na jamii, masuala ya miliki bunifu ya jamii (community IP).

Kimsingi, kazi yetu ni kuwa waraka mmoja ambao mradi mpya unaweza kusoma na kuokoa robo ya kazi inayojirudia.

## Kwa nini upeo huu: ushahidi {#why-this-scope-the-evidence}

Mnamo Julai 2026 tulifadhili utafiti huru uliolinganisha AfriPlaybook dhidi ya "miongozo" ishirini tarajiwa katika makundi matatu: miongozo mikuu ya NLP ya modeli na mafunzo (Google DL Tuning, Google Text Classification, Hugging Face NLP Course, spaCy), vitabu vya mwongozo vya data / AI inayowajibika (Datasheets, Data Statements, Model Cards, Turing Way, PAIR, BigScience ROOTS, Deon), na kazi za rasilimali chache ambazo tayari AfriPlaybook inakaa nazo (MasakhaneMT, MasakhaNER 1 na 2, AfriSenti, AfriQA, LAFAND-MT, FLORES, NLLB). Uamuzi ulikuwa wazi:

> Sura nane kati ya kumi zilizopewa namba zinajikita katika ukusanyaji wa data, nguvu kazi ya uwekaji lakabi, uhakikisho wa ubora, utawala, uwekaji kumbukumbu, na jamii. Sura ya ujenzi wa modeli pekee ndiyo inayogusia uundaji wa modeli, na ni sura fupi. Miongozo mikuu ya NLP ya Kundi-A imeundwa kuzunguka uchaguzi wa modeli, urekebishaji finyu (fine-tuning), urekebishaji wa vigezo kuu (hyperparameter tuning), na usambazaji (deployment), na inatenga waziwazi uwekaji lakabi, lugha zenye rasilimali chache, na mazingatio ya kitamaduni. Kimiundo, AfriPlaybook ni kitabu cha mwongozo cha data/uwekaji lakabi, si mwongozo wa kurekebisha modeli.

Huo si ukosoaji. Ni uwekaji wa nafasi. Mwongozo huu ni kile ambacho miongozo hiyo ya Kundi-A inachukulia kuwa tayari kimefanywa. Kujaribu kushindana nao katika eneo lao kungeifanya AfriPlaybook kuwa nyepesi na kuzalisha maudhui yatakayopitwa na wakati ndani ya mwaka mmoja. Kumiliki nafasi ya uwekaji lakabi, ubora wa data, tathmini, jamii, na usambazaji katika muktadha wa Kiafrika ni jambo linalotetewa, la kudumu, na, kwa jamii ambayo mwongozo huu unaihudumia, ni la msingi kwelikweli.

## Nini kinafuata: mpango wa awamu {#what-comes-next-the-phased-plan}

Mwongozo wa sasa ni rasimu thabiti ya uti wa mgongo wa mzunguko wa maisha wa seti ya data. Upanuzi unaofuata unahusu kuufanya mwongozo huu kuwa **njia fupi zaidi kuelekea mradi unaofanya kazi** kwa msomaji aliye na jukumu na lugha na hajui aanzie wapi. Kwa mpangilio wa kipaumbele:

### Awamu ya 1: nyongeza mbili zenye ushawishi mkubwa zaidi {#phase-1-the-two-highest-leverage-additions}

- **[Kabla Hujakianza](/sw/before-you-start/)**. Mbinu ya hatua nne ya kukagua kazi za awali kabla ya kujenga seti ya data: tafuta kile kilichopo, kihukumu dhidi ya orodha ya ukaguzi, amua kama utakitumia tena, utakipanua, au utajenga, na jifunze kutoka kwa watu waliokijenga. Mifano mitatu iliyofanyiwa kazi (NER, hisia (sentiment), na matamshi ya chuki) inatumia mbinu hiyo kwenye seti za data zinazojulikana sana. Hiyo ni mifano, si orodha kamili, kwa sababu hakuna orodha iliyoandikwa kwa mkono inayoweza kwenda sambamba na uwanja huu.
- **[Uchunguzi Kifani](/sw/case-studies/)**: tathmini za nyuma (retrospectives) halisi kutoka katika kazi za Masakhane yenyewe: MasakhaNER 1 na 2, AfriSenti, AfroBench, LAFAND-MT, AfriQA. Kila moja inajibu seti sawa ya maswali (ukubwa wa timu, muda, bajeti, tatizo gumu zaidi, kosa kubwa zaidi, kile kilichoishangaza timu) kutoka kwa watu waliofanya kazi hiyo. Uchunguzi kifani mbili za ubora huu zina thamani zaidi ya sura kumi za maelezo ya jumla.

### Awamu ya 2: uhalisia mtambuka {#phase-2-cross-cutting-realism}

- **Usambazaji kwa muktadha wa Kiafrika.** NLP ya nje ya mtandao na yenye muunganisho hafifu. Vifaa vya ukingoni (edge devices). SMS/USSD/WhatsApp kama nyuso za NLP. Ubadilishaji wa lugha nyingi katika mazungumzo mamoja. Hati zisizo za kawaida (Ajami, Ge'ez, N'Ko) katika miingiliano halisi ya watumiaji (UIs).
- **Taratibu za uhamishaji kati ya lugha (cross-language transfer matrix).** Mwongozo wa kivitendo, uliotolewa kutoka kwenye makala za Masakhane yenyewe, kuhusu ni lugha zipi za Kiafrika zinanufaika na vyanzo vipi vya uhamishaji. Kibantu-hadi-Kibantu, Kikushi-hadi-Kikushi, uhamishaji wa hati pale inapofaa.

### Awamu ya 3: utawala wa kudumu {#phase-3-durable-governance}

- **Kisheria, ridhaa, na miliki bunifu ya jamii (community IP).** Sheria za data za kiwango cha nchi (Nigeria NDPA, Kenya DPA, Afrika Kusini PoPIA, Ghana DPA, Rwanda) na athari zake za kivitendo. Mifumo ya ridhaa inayofanya kazi na wazungumzaji wasiojua kusoma na kuandika. Mifumo ya miliki bunifu ya jamii. Mitindo ya utoaji inayozuia unyonyaji (anti-extraction).
- **Uingizaji wa lugha zenye uwakilishi mdogo (long-tail language onboarding).** Kwa lugha yenye jamii ya wazungumzaji lakini isiyo na kopasi (corpus) ya kidijitali, hatua ya kwanza ni ipi? Othografia, uanzishaji wa kopasi, uhamasishaji wa jamii, mitindo isiyofaa (anti-patterns).

### Awamu ya 4: mazoezi ya ukokotoaji duni {#phase-4-compute-poor-practice}

- **Mafunzo na tathmini katika mazingira ya ukokotoaji duni.** Mitindo ya GPU ya jamii, Colab, Kaggle. LoRA na QLoRA (zilizounganishwa na vyanzo vikuu, si zilizotolewa upya). Uchujao (distillation) kwa usambazaji wa ukingoni. Wakati ambapo uhamishaji kati ya lugha ni mkakati wa kuokoa ukokotoaji.

### Awamu ya 5: kutafuta rasilimali za sasa (iliyoundwa upya) {#phase-5-finding-current-resources-redesigned}

Awamu ya 5 ya awali ilikuwa saraka hai iliyohaririwa: kila seti ya data ya lugha ya Kiafrika, modeli, zana, na kigezo (benchmark), kukiwa na maoni ya uhariri ya mstari mmoja kwa kila ingizo, iliyosasishwa kwa mzunguko wa ukaguzi wa kila nusu mwaka. Kwa kutafakari kwa uaminifu, mzunguko wa ukaguzi ulikuwa sehemu nzito, na hakuna timu yenye uwezo wa kukagua maingizo 200+ kila nusu mwaka na kutoa mstari mpya wa uhariri kwa kila moja. Saraka iliyopitwa na wakati inayosema "SOTA kuanzia 2026-Q3" mnamo 2027 ni mbaya zaidi kuliko kutokuwa na saraka.

Awamu ya 5 iliyoundwa upya inatolewa kama **[Hatua ya 1 ya Kabla Hujakianza](/sw/before-you-start/#step-1-search-for-prior-work)**, ambayo inataja maeneo machache ya kuanza kutafuta (ACL Anthology, Lanfrica, Hugging Face, machapisho ya warsha ya AfricaNLP, Google Scholar, na arXiv) na inafundisha mitindo ya utafutaji inayopata seti za data za sasa za lugha za Kiafrika. Haiorodheshi seti za data; vyanzo vinajiorodhesha vyenyewe.

**Kukubali mabadilishano (tradeoff)**: tunaacha maoni ya uhariri kwa kila ingizo kwenye kila seti ya data na modeli (wasomaji wanajifunza kuhukumu maingizo wenyewe kwa kutumia orodha ya ukaguzi katika [Kabla Hujakianza](/sw/before-you-start/#step-2-judge-what-you-find)). Tunapata sura inayosalia kuwa ya kweli kwa miaka mingi bila kuguswa na haihitaji mtunzaji aliyetajwa jina ili kuifungua.

## Kile tunachokipa kipaumbele cha chini {#what-we-deprioritise}

- **Mbinu za urekebishaji wa vigezo kuu (hyperparameter tuning).** Inamilikiwa na DL Tuning Playbook ya Google. Tunaweka kiungo.
- **Mbinu za uchaguzi wa usanifu wa modeli.** Inamilikiwa na Hugging Face NLP Course na kadi za modeli kwenye HF Hub. Tunaweka kiungo.
- **Mbinu za urekebishaji finyu (fine-tuning) kwa modeli za msingi zilizotajwa.** Vilevile. Tunaweka kiungo.
- **Katalogi za uhandisi wa vidokezo (prompt engineering).** Zinabadilika haraka. Zinamilikiwa na vitabu vya mbinu vya watoa huduma wa modeli wenyewe. Tunaweka kiungo.
- **Utoaji huduma, ucheleweshaji (latency), na uboreshaji wa gharama kwa usambazaji wa wingu.** Inamilikiwa na miongozo ya MLOps na watoa huduma wa wingu. Tunaweza kushughulikia sehemu za *muktadha wa Kiafrika* (ukingoni, nje ya mtandao) lakini hatushindani kwenye kesi ya jumla.

## Kanuni moja inayoifanya mwongozo huu kuwa wa kweli {#the-one-rule-that-keeps-this-playbook-honest}

**Kila sura inapimwa dhidi ya swali moja: je, msomaji aliye na jukumu na lugha mahususi anaondoka na hatua inayofuata inayotekelezeka ndani ya dakika kumi na tano au chini ya hapo?**

Kama ndiyo, sura hiyo inapata nafasi yake. Kama hapana, inaandikwa upya ili kujibu swali hilo, au inaondolewa. Kuwa na maelezo ya kina bila kuwa na manufaa ni aina ya kufeli tunayoihofia zaidi.

---

*Rekodi hii ya uamuzi itapitiwa upya katika kila toleo kuu la mwongozo. Tazama [kumbukumbu ya mabadiliko](https://github.com/warakacommunity/playbook/releases) kwa rekodi ya nini kilibadilika na lini.*
