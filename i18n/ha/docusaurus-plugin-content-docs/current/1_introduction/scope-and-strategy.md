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

# Abin da wannan jagora yake (da kuma abin da ba shi ba) {#what-this-playbook-is-and-isnt}

## Takaitaccen bayani a jimla ɗaya {#the-one-sentence-framing}

**AfriPlaybook shi ne tabbataccen tsarin yanke shawara ga duk wanda zai fara aikin Sarrafa Harshen Jama'a (NLP) na harsunan Afirka, wanda ya ginu a kan ainihin kwarewar ayyukan Masakhane na baya.**

Duk wani abu da wannan jagora (playbook) ya ƙara ya kamata ya fito da ma'anar wannan jimla. Duk abin da ya cire kuma ya zama an yi shi ne bisa kyakkyawan dalili da ya dace da ita.

## Abin da wannan jagora ba shi ba {#what-this-playbook-is-not}

- **Ba** darasi ba ne kan horaswa (training) ko daidaita samfuri (fine-tuning). Wannan aikin an riga an yi bayaninsa dalla-dalla a [Hugging Face NLP Course](https://huggingface.co/learn/nlp-course), da [Google Deep Learning Tuning Playbook](https://github.com/google-research/tuning_playbook), da [Google Text Classification guide](https://developers.google.com/machine-learning/guides/text-classification), da kuma [Advanced NLP with spaCy](https://course.spacy.io/en/). Mun sanya adireshinsu (link); ba za mu sake rubuta su ba.
- **Ba** littafin karatu ba ne. Don samun bayanan ka'idoji (rarraba kalmomi (tokenisation), samfuran jeri (sequence models), ma'aunin kimantawa (evaluation metrics), da tushen ilimin lissafi), duba littafin Jurafsky da Martin mai suna [*Speech and Language Processing*](https://web.stanford.edu/~jurafsky/slp3/). Tabbatacce ne kuma kyauta ne.
- **Ba** kundin tsarin lambobin kwamfuta (code) ba ne. Lambobin kwamfuta suna saurin tsufa fiye da yadda za a iya sabunta kowane jagora. Idan muka yi nuni ga lambar kwamfuta, muna nuni ne ga rumbun ajiya mai aiki, mai tsari, wanda ake kula da shi. Idan mu da kanku muka samar da lambar kwamfuta, tana zama ne a wani rumbun ajiya na daban wanda ke da nasa tsarin fitarwa.
- **Ba** ya tsaka-tsaki. Muna da matsaya. Muna fifita ma'auni na kowane harafi ga harsuna masu sarƙaƙiyar ƙa'idojin kalmomi ([`chrF`](https://aclanthology.org/W15-3049/), CER) a kan ma'auni na kowace kalma (BLEU, WER). Muna fifita bayar da sakamako ga kowane harshe da kowane aji a kan bayar da matsakaicin sakamako guda ɗaya. Muna fifita kimantawar ɗan adam ga duk wani abu da ke ƙirƙirar bayanai. Muna buƙatar amincewa daga mutanen da ke cikin bayanan. Muna goyon bayan al'umma su mallaki abubuwan da aka gina. Idan ba ka yarda da waɗannan matsayar ba, wannan jagorar ba naka ba ne.

## Abin da wannan jagora yake {#what-this-playbook-is}

A tsari, wannan jagora ya faɗo ne a rukunin **littattafan jagora na rayuwar rumbun bayanai (dataset-lifecycle) da kuma amfani da basirar ɗan adam (AI) ta hanyar da ta dace**. Littattafan da suka fi kama da shi su ne [Datasheets for Datasets](https://arxiv.org/abs/1803.09010) (Gebru et al., 2018), [Data Statements for NLP](https://aclanthology.org/Q18-1041/) (Bender & Friedman, 2018), [Model Cards](https://arxiv.org/abs/1810.03993) (Mitchell et al., 2019), da kuma [The Turing Way](https://the-turing-way.netlify.app/). Abin da muka ƙara a kan wannan tsari shi ne:

- **Babi na musamman kan ma'aikata masu lakabi (annotation-workforce)** (yadda ake tsara aiki, ɗaukar ma'aikata, bayar da umarni, dubawa, biyan kuɗi, da riƙe masu lakabi (annotators)), wanda yawancin littattafan jagora na rayuwar rumbun bayanai ba su cika yin bayani a kansa ba.
- **Hanyoyi na musamman kan yanayi (modality)** don dacewa da yanayin harsunan Afirka: rubutu, magana (ASR, TTS, S2ST), OCR/AI na takardu, harshen kurame da bidiyo. Yawancin jagororin NLP rubutu kawai suke mayar da hankali a kai.
- **Tattaunawa ta musamman kan ƙarancin bayanai (low-resource) da yanayin Afirka**: matsalar rashin kyakkyawar hanyar sadarwa, rubutun haruffa daban-daban, gauraya harsuna (code-switching), ƙarancin kasafin kuɗin na'ura, ayyukan da al'umma ke jagoranta, da damuwar al'umma kan haƙƙin mallaka (IP).

A zahiri, aikinmu shi ne mu zama takarda ɗaya tilo da sabon aiki zai iya karantawa wanda zai kiyaye shi daga maimaita kashi ɗaya bisa huɗu na aikin da aka riga aka yi.

## Me ya sa muka zaɓi wannan fage: hujjoji {#why-this-scope-the-evidence}

A watan Yulin 2026 mun gudanar da wani bincike mai zaman kansa wanda ya kwatanta AfriPlaybook da wasu "jagorori" guda ashirin a rukuni uku: tabbatattun jagororin NLP na samfuri da horaswa (Google DL Tuning, Google Text Classification, Hugging Face NLP Course, spaCy), littattafan jagora na bayanai / AI ta hanyar da ta dace (Datasheets, Data Statements, Model Cards, Turing Way, PAIR, BigScience ROOTS, Deon), da kuma ayyukan ƙarancin bayanai da AfriPlaybook ya riga ya kasance tare da su (MasakhaneMT, MasakhaNER 1 and 2, AfriSenti, AfriQA, LAFAND-MT, FLORES, NLLB). Sakamakon ya fito ƙarara:

> Takwas daga cikin babi goma masu lamba sun mayar da hankali ne kan tattara bayanai, ma'aikata masu lakabi, tabbatar da inganci, gudanarwa, tattara bayanai a rubuce, da al'umma. Babi na gina samfuri ne kawai ya taɓa batun ƙirƙirar samfuri, kuma babi ne gajere. Tabbatattun jagororin NLP na Rukuni na A an tsara su ne a kan zaɓin samfuri, daidaita samfuri, daidaita ma'aunin samfuri (hyperparameter tuning), da ƙaddamarwa (deployment), kuma sun cire batun lakabi, harsuna masu ƙarancin bayanai, da la'akari da al'adu gaba ɗaya. A tsari, AfriPlaybook littafin jagora ne na bayanai/lakabi, ba jagorar daidaita samfuri ba ne.

Wannan ba suka ba ne. Wuri ne da muka zaɓa. Wannan jagora shi ne abin da waɗancan jagororin na Rukuni na A suke ɗauka cewa an riga an yi. Ƙoƙarin yin gogayya da su a fagensu zai sa AfriPlaybook ya rasa tasirinsa kuma ya samar da abubuwan da za su tsufa a cikin shekara guda. Mallakar fagen lakabi, ingancin bayanai, kimantawa, al'umma, da ƙaddamarwa a yanayin Afirka abu ne mai ƙarfi, mai dorewa, kuma, ga al'ummar da jagorar ke yi wa aiki, abu ne mai matuƙar amfani.

## Abin da zai biyo baya: tsarin mataki-mataki {#what-comes-next-the-phased-plan}

Wannan jagora na yanzu kyakkyawan daftari ne na tsarin rayuwar rumbun bayanai. Faɗaɗawa ta gaba ita ce mayar da jagorar ya zama **hanya mafi guntuwa zuwa ga aiki mai gudana** ga mai karatu wanda ke da aiki da kuma harshe amma bai san ta inda zai fara ba. A tsarin girmamawa:

### Mataki na 1: ƙari guda biyu mafi tasiri {#phase-1-the-two-highest-leverage-additions}

- **[Kafin Ka Fara](/before-you-start/)**. Hanyar matakai huɗu don duba aikin da aka yi a baya kafin gina rumbun bayanai: bincika abin da ke akwai, auna shi da jerin abubuwan dubawa, yanke shawara ko za a sake amfani da shi, a faɗaɗa shi, ko a gina sabo, sannan a koya daga mutanen da suka gina shi. Misalai uku da aka yi aiki a kansu (NER, ra'ayi, da kalaman ƙiyayya) sun yi amfani da wannan hanya a kan sanannun rumbun bayanai. Misalai ne kawai, ba cikakken jeri ba ne, saboda babu wani jeri da aka rubuta da hannu da zai iya tafiya daidai da ci gaban wannan fage.
- **[Nazarin Ayyuka](/case-studies/)**: ainihin waiwaye daga ayyukan Masakhane: MasakhaNER 1 and 2, AfriSenti, AfroBench, LAFAND-MT, AfriQA. Kowane ɗaya yana amsa jerin tambayoyi iri ɗaya (yawan mutanen ƙungiya, lokaci, kasafin kuɗi, matsala mafi wahala, kuskure mafi girma, abin da ya ba ƙungiyar mamaki) daga mutanen da suka yi aikin. Nazarin ayyuka guda biyu masu irin wannan inganci sun fi babi goma na rubutu na gaba ɗaya daraja.

### Mataki na 2: ainihin yanayin da ya shafi kowa {#phase-2-cross-cutting-realism}

- **Ƙaddamarwa a yanayin Afirka.** NLP ba tare da intanet ba da kuma inda hanyar sadarwa ba ta da kyau. Na'urori masu ƙanƙanta (Edge devices). SMS/USSD/WhatsApp a matsayin hanyoyin amfani da NLP. Sauya harsuna da yawa a cikin tattaunawa ɗaya. Rubutun da ba na yau da kullum ba (Ajami, Ge'ez, N'Ko) a cikin ainihin fuskokin manhaja (UIs).
- **Tsarin canja wuri tsakanin harsuna.** Tabbataccen jagora, wanda aka ciro daga takardun binciken Masakhane, kan waɗanne harsunan Afirka ne ke amfana daga waɗanne tushen canja wuri. Daga Bantu zuwa Bantu, daga Cushitic zuwa Cushitic, da canja wurin rubutu a inda ya dace.

### Mataki na 3: gudanarwa mai dorewa {#phase-3-durable-governance}

- **Shari'a, amincewa, da haƙƙin mallaka na al'umma (IP).** Dokokin bayanai na matakin ƙasa (Nigeria NDPA, Kenya DPA, South Africa PoPIA, Ghana DPA, Rwanda) da tasirinsu a aikace. Tsarin amincewa da ke aiki da masu magana da ba su iya karatu da rubutu ba. Tsarin haƙƙin mallaka na al'umma. Hanyoyin fitarwa da ke hana kwashe bayanai ba bisa ƙa'ida ba.
- **Shigar da harsuna masu ƙarancin masu magana.** Ga harshen da ke da al'ummar da ke magana da shi amma ba shi da rumbun bayanai na dijital, menene mataki na ɗaya? Ƙa'idojin rubutu, fara tattara bayanai, wayar da kan al'umma, da abubuwan da ya kamata a guje wa.

### Mataki na 4: ayyuka a yanayin ƙarancin na'ura {#phase-4-compute-poor-practice}

- **Horaswa da kimantawa a yanayin ƙarancin na'ura.** Tsarin Community-GPU, Colab, Kaggle. LoRA da QLoRA (an haɗa su da ainihin tushensu, ba a sake ƙirƙiro su ba). Tacewa (Distillation) don ƙaddamarwa a na'urori masu ƙanƙanta. Yaushe ne canja wuri tsakanin harsuna ke zama dabarar rage aikin na'ura.

### Mataki na 5: nemo albarkatun da ke akwai (wanda aka sake tsara shi) {#phase-5-finding-current-resources-redesigned}

Ainihin Mataki na 5 ya kasance kundin adireshi ne mai gudana da aka tsara: kowane rumbun bayanai na harshen Afirka, samfuri, kayan aiki, da ma'auni, tare da ra'ayin edita na layi ɗaya a kan kowane abu, wanda ake sabuntawa a duk bayan wata shida. A gaskiya, tsarin sabuntawar shi ne aiki mafi girma, kuma babu wata ƙungiya da ke da ƙarfin duba abubuwa sama da 200 a duk bayan wata shida don bayar da sabon ra'ayin edita a kan kowannensu. Tsohon kundin adireshi da ke cewa "SOTA as of 2026-Q3" a shekarar 2027 ya fi rashin kundin adireshi muni.

Mataki na 5 da aka sake tsarawa ya zo a matsayin **[Mataki na 1 na Kafin Ka Fara](/before-you-start/#step-1-search-for-prior-work)**, wanda ya ambaci ƴan wuraren da za a fara bincike (ACL Anthology, Lanfrica, Hugging Face, takardun taron AfricaNLP, Google Scholar, da arXiv) kuma yana koyar da hanyoyin bincike da ke gano rumbun bayanan harsunan Afirka na yanzu. Ba ya lissafa rumbun bayanai; majiyoyin ne ke lissafa kansu.

**Mun amince da sauyin**: mun haƙura da bayar da ra'ayin edita a kan kowane rumbun bayanai da samfuri (masu karatu za su koyi yadda za su tantance abubuwan da kansu ta amfani da jerin abubuwan dubawa a [Kafin Ka Fara](/before-you-start/#step-2-judge-what-you-find)). Mun sami babi wanda zai ci gaba da kasancewa mai amfani na tsawon shekaru ba tare da an taɓa shi ba kuma ba ya buƙatar wani takamaiman mai kula don ci gaba da aiki.

## Abin da muka rage wa fifiko {#what-we-deprioritise}

- **Hanyoyin daidaita ma'aunin samfuri (hyperparameter tuning).** Wannan aikin Google's DL Tuning Playbook ne. Mun sanya adireshinsa (link).
- **Hanyoyin zaɓar tsarin samfuri.** Wannan aikin Hugging Face NLP Course ne da kuma katin samfuri (model cards) da ke kan HF Hub. Mun sanya adireshinsu.
- **Hanyoyin daidaita samfuri (fine-tuning) ga takamaiman samfuran asali.** Haka nan. Mun sanya adireshinsu.
- **Kundin tsara umarni (prompt engineering).** Yana saurin canzawa. Wannan aikin littattafan jagora na masu samar da samfuran ne. Mun sanya adireshinsu.
- **Bayar da sabis, jinkiri, da rage tsadar ƙaddamarwa a intanet (cloud).** Wannan aikin jagororin MLOps ne da masu samar da sabis na intanet. Za mu iya tattauna ɓangarorin da suka shafi *yanayin Afirka* (na'urori masu ƙanƙanta, ba tare da intanet ba) amma ba za mu yi gogayya a kan yanayin gaba ɗaya ba.

## Ƙa'ida ɗaya da ke tabbatar da ingancin wannan jagora {#the-one-rule-that-keeps-this-playbook-honest}

**Ana auna kowane babi da tambaya ɗaya: shin mai karatu wanda ke da takamaiman aiki da harshe zai fita da mataki na gaba da zai iya aiwatarwa a cikin mintuna goma sha biyar ko ƙasa da haka?**

Idan eh, babin ya cancanci gurbinsa. Idan a'a, ko dai a sake rubuta shi don ya amsa wannan tambayar, ko kuma a cire shi. Kasancewa mai ɗauke da komai amma ba shi da amfani shi ne irin gazawar da muka fi tsoro.

---

*Za a sake duba wannan bayanin yanke shawara a duk lokacin da aka fitar da wani babban sabon tsari na jagorar. Duba [kundin sauye-sauye](https://github.com/warakacommunity/playbook/releases) don ganin bayanin abin da ya canza da kuma lokacin da ya canza.*
