---
sidebar_position: 1
ready: true
last_update:
  date: 2026-09-26
  author: Shamsudddeen Hassan Muhammad
translation_status: machine
source_hash: 26131869afcd
translated_at: 2026-09-28
---

# Kafin Ka Fara {#before-you-start}

Wani lokaci ƙungiyoyi kan ɗauki watanni suna tattara bayanan da tun asali akwai su. Wata ƙungiya na iya tattara bayanan ra'ayi (sentiment data) na Hausa wanda [AfriSenti](https://arxiv.org/abs/2302.08956) ya riga ya ƙunsa, ko kuma su yi wa sunayen gungun kalmomi (named entities) na Yarbanci lakabi (annotate) kafin su gano [MasakhaNER 2](https://arxiv.org/abs/2210.12391).

Hakan na faruwa ne saboda yana da wuya a samu ma'ajin bayanai (datasets) na harsunan Afirka, kuma galibi harshe ɗaya kan bayyana da sunaye da lambobin gane harshe (codes) daban-daban. Misali, harshen Swahili yana da aƙalla lambobin gane harshe guda uku da ake yawan amfani da su:

- `sw`: lambar gane harshe mai haruffa biyu ta ISO 639-1.
- `swa`: lambar gane harshe ta ISO 639-3 don Swahili a matsayin babban harshe (macrolanguage), wanda ya ƙunshi dukkan rassan harshen.
- `swh`: lambar gane harshe ta ISO 639-3 don daidaitaccen Swahili na bakin teku kaɗai.

Dukkansu ukun suna nufin Swahili, amma na'ura mai ƙwaƙwalwa tana ɗaukarsu a matsayin lakabobi (labels) guda uku daban-daban, kuma ayyuka (projects) ba sa jituwa a kan wanda ya kamata a yi amfani da shi. Ma'aunan gwaji na Masakhane (AfriMMLU, AfriXNLI, AfriMGSM) suna amfani da `swa`. FLORES da Belebele suna amfani da `swh`. Ma'ajin bayanai da yawa na Hugging Face da kuma ma'ajin rubutu da aka kwaso daga intanet (web-crawled corpora) suna amfani da `sw`. Idan ka yi bincike da lamba ɗaya, za ka rasa bayanan da aka ajiye a ƙarƙashin sauran.

Cikakken jerin ma'ajin bayanai na harsunan Afirka ba zai magance wannan ba, saboda sababbin ma'ajin bayanai suna fitowa kowane wata kuma babu wani jeri da zai kasance sabo na dogon lokaci. Maimakon haka, wannan babi ya bayyana matakai huɗu da za a ɗauka kafin ka gina naka: bincika abin da ke akwai, duba ko ya dace da buƙatunka, yanke shawara ko za ka sake amfani da shi, faɗaɗa shi, ko gina sabo, sannan ka koya daga mutanen da suka yi shi.

## Mataki na 1: Bincika ayyukan da aka yi a baya {#step-1-search-for-prior-work}

Bincika harshenka da aikin (task) tare (misali, "Hausa sentiment") don samun ma'ajin bayanai da za ka iya sake amfani da su yadda suke. Ware sa'o'i kaɗan don waɗannan binciken, kuma ka riƙa yin rubutu (notes) yayin da kake yi.

**Inda za a fara dubawa:**

- **[ACL Anthology](https://aclanthology.org/)**: babban ma'ajin takardun bincike na NLP, daga manyan taruka, mujallu, da bita (workshops). Bincika harshenka da aikin, sannan ka duba kowace takarda don ganin ko an fitar da ma'ajin bayanai. Don bincike mai faɗi kuma a tsanake, [Python package](https://aclanthology.org/faq/api/) na Anthology (`pip install acl-anthology`) zai ba ka bayanan asali (metadata) na kowace takarda don ka tace da kanka.
- **[Lanfrica](https://lanfrica.com/)**: kundin adana bayanan harsunan Afirka da ake sabuntawa a kai a kai, wanda ya haɗa da ma'ajin bayanai, ƙirar kwamfuta (models), da takardun bincike.
- **[AtlasNLP](https://lit.eecs.umich.edu/AtlasNLP/)**: taswirar ma'ajin bayanai na NLP sama da 13,000 da aka bayyana a takardun ACL Anthology, waɗanda za ka iya tacewa ta hanyar aiki, harshe, da ƙasa. Yi amfani da shi don ganin waɗanne ma'ajin bayanai ne tuni suke akwai don harshenka ko ƙasarka.
- **[Hugging Face datasets, filtered by language](https://huggingface.co/datasets?language=swa)**: canza `swa` da lambar gane harshenka (`hau` Hausa, `yor` Yoruba, `amh` Amharic, `zul` isiZulu). Ƙara abin tace aiki, kamar `text-classification`, don rage yawan sakamakon binciken.
- **[AfricaNLP workshop proceedings](https://aclanthology.org/venues/africanlp/)**: takardu daga taron bita na shekara-shekara kan NLP na harsunan Afirka. Duba na shekarar baya-bayan nan don ganin abin da ke sabo.
- **Google Scholar da [arXiv](https://arxiv.org/list/cs.CL/recent)**: sababbin ayyuka galibi suna fara bayyana a nan. Haɗa harshenka, aiki, da tsakanin kwanakin wata, misali `"Hausa" sentiment dataset 2023..2026`.

**Yadda za a yi bincike mai kyau:**

- **Gwada kowane suna da lambar gane harshe da ake kiran harshen da shi**: sunansa na Turanci, sunan da masu harshen ke kiran sa, wasu hanyoyin rubuta sunan, da dukkan lambobin ISO ɗinsa (don Swahili: `sw`, `swa`, da `swh`). Tsofaffin takardu na iya amfani da sunayen da al'umma ba ta amfani da su yanzu.
- **Bincika harsunan da ke da alaƙa ma.** Ma'ajin bayanai na harshen da ke da kusanci sosai zai iya ba ka ƙa'idoji (guidelines), rukunin lakabi (label set), ko wurin farawa.
- **Tambaya.** Tura gajeruwar tambaya a cikin al'ummar [Masakhane](https://www.masakhane.io/) ko wani rukunin da ya keɓanta da harshe: *"Akwai wanda ya san bayanan X don Y?"* Ayyuka da yawa ba a wallafa su ba ko kuma suna da wuyar samu.

**Ajiye sauƙaƙan bayani** na duk abin da ka samu: suna, mahaɗi (link), aiki, harsuna, girma, lasisi (licence), da kuma ko an fitar da ƙa'idoji. Za ka buƙace shi don Mataki na 2, kuma zai zama ɓangaren ayyukan da ke da alaƙa (related-work section) a cikin takardarka.

:::tip[Samfuri: Kundin binciken ma'ajin bayanai]
Kundin cike gurbi da ke bin matakai huɗu da ke wannan shafin: sunayen harshenka da lambobin gane harshe, kowane bincike da ka gudanar, alamar Ci (Pass), Wani ɓangare (Partly), ko Faɗuwa (Fail) ga kowane ma'ajin bayanai dangane da jerin abubuwan dubawa na Mataki na 2, shawararka ta Mataki na 3, da mutanen da ka tuntuɓa. [Buɗe samfurin kundin binciken ma'ajin bayanai](/templates/search-log) ko [sauke shi a matsayin takardar Word](pathname:///downloads/templates/dataset-search-log.docx).
:::

## Mataki na 2: Auna abin da ka samu {#step-2-judge-what-you-find}

Duba kowane ma'ajin bayanai da ka samu dangane da wannan jerin:

- **Lasisi.** Shin yana ba ka damar amfani da shi? Ma'ajin bayanai da yawa na harsunan Afirka an fitar da su ne don amfanin da ba na kasuwanci ba kaɗai (CC BY-NC).
- **Samun Dama.** Shin za ka iya sauke shi a yau, ko kuwa "ana samunsa idan an buƙata" daga marubucin da ba ya bayar da amsa kuma? Shin kana kallon sabon tsarin (latest version) ne?
- **Dacewa.** Shin ya dace da nau'in harshenka, karin magana (dialect), haruffan rubutu (script), da fage (domain)? Rubutun labarai ba zai maye gurbin na kafafen sada zumunta ko maganganun tattaunawa ba.
- **Lakabobi.** Shin rukunin lakabin ya dace da aikinka, ko za ka buƙaci sake sanya lakabi (relabel)?
- **Rabe-rabe.** Shin an raba bayanan zuwa ƙayyadaddun rukunin horarwa (training), haɓakawa (development), da gwaji (test sets), ta yadda za a iya kwatanta sakamako a tsakanin takardu daban-daban? Idan rukunin gwajin a buɗe yake ga kowa, ƙila an horar da manyan ƙirar harshe (large language models) a kansa, wanda hakan ke sa maki ɗinsu ya yi kyau fiye da yadda yake a zahiri.
- **Ƙa'idoji.** Shin an fitar da ƙa'idojin sanya lakabi (annotation guidelines)? Za ka iya sake amfani da kyawawan ƙa'idoji koda ba za ka iya amfani da bayanan ba.
- **Inganci.** Wane ne ya sanya masa lakabi: masu jin harshen a matsayin na uwa ko ma'aikatan wucin gadi (crowd workers)? Shin an bayar da rahoton jituwar masu sanya lakabi (inter-annotator agreement)? Yana auna sau nawa masu sanya lakabi suka zaɓi lakabi iri ɗaya, kuma ƙarancin jituwa alama ce ta gargaɗi.
- **Takardun Bayani.** Shin akwai takardar bayanai (datasheet) ko katin bayanai (data card): takardar da ke bayyana yadda aka tattara bayanan da kuma abin da suka ƙunsa? Shin an bayyana batun amincewa (consent)?

Ma'ajin bayanan da bai ci da yawa daga cikin waɗannan gwaje-gwajen ba zai iya zama mai amfani a yi nazarinsa, koda ba za ka iya gina naka a kansa ba.

## Mataki na 3: Sake amfani, faɗaɗawa, ko ginawa {#step-3-reuse-extend-or-build}

Yi amfani da rubutunka daga Mataki na 1 da na 2 don zaɓar abin da za ka yi. Nemo layin da ya dace da abin da bincikenka ya gano da kuma yadda ya kasance dangane da jerin abubuwan dubawa na Mataki na 2, sannan ka bi wannan layin a tsallake.

<div className="decision-table">

| Abin da ka samu | Zaɓinka | Abin da za ka yi |
| --- | --- | --- |
| Ma'ajin bayanai na harshenka da aikinka wanda ya **ci** gwaje-gwajen Mataki na 2 | **Sake amfani da shi** | Kada ka gina sabo. Batar da ƙoƙarinka a kan abin da har yanzu ya ɓace, kamar tantancewa (evaluation), sabon fage, ko ƙaddamarwa (deployment). |
| Ma'ajin bayanai na harshenka da aikinka wanda ya dace **wani ɓangare** (fagen da ba daidai ba, lakabobin da suka ɓace, ko wani karin magana daban) | **Faɗaɗa shi** | Ƙara fagen da ya ɓace, lakabobi, ko karin magana. Sake amfani da ainihin ƙa'idojin, tabbatar da rabe-raben bayananka sun dace da nasu, kuma ka sanar da ainihin marubutan. |
| Ma'ajin bayanai na harshenka da aikinka wanda ya **faɗi** gwaje-gwajen (lasisin da ba za a iya amfani da shi ba, ƙarancin inganci, ko babu shi) | **Gina sabo, ta hanyar koya daga tsohon** | Karanta takardarsa da ƙa'idojinsa kafin ka fara, kuma ka yi bayani a cikin takardun bayananka dalilin da ya sa ba za ka iya sake amfani da shi ba. |
| Ma'ajin bayanai kawai don **harshen da ke da alaƙa**, ko don harshenka a kan **aikin da ke da alaƙa** | **Aro, sannan ka gina kaɗan** | Aro ƙa'idojinsa da rukunin lakabinsa. Gwada [canja wuri tsakanin harsuna (cross-language transfer)](/cross-language-transfer) tukuna, sannan ka gina ƙaramin rukunin tantancewa mai inganci a cikin harshenka. |
| **Babu** abin da ya dace | **Gina daga farko** | Fara da babin [shigar da harsunan da ba a fiye amfani da su ba (long-tail language onboarding)](/long-tail-language), sannan [Tattara Bayanai (Data Collection)](/data-collection/Overview), [Tsara Lakabi (Annotation Design)](/annotation-design/annotation-task-design), da [Ingancin Bayanai (Data Quality)](/data-quality). |

</div>

Idan fiye da layi ɗaya ya dace, zaɓi wanda ya fi kusa da sama. Sake amfani ko faɗaɗa bayanai galibi ya fi sauƙin kuɗi fiye da gina su.

## Mataki na 4: Koya daga mutanen da suka gina shi {#step-4-learn-from-the-people-who-built-it}

Takardu suna bayyana abin da ya yi aiki. Ba kasafai suke bayyana abin da ya lalace ba, abin da ya ɗauki lokaci fiye da yadda aka tsara, ko abin da ƙungiyar za ta canza.

**Fara karantawa**, a wannan tsarin: ɓangaren ƙalubalen (limitations) takardar, ƙa'idojin sanya lakabi, takardar bayanai, da matsalolin da ke buɗe (open issues) a ma'adanarta (repository).

**Sannan ka tuntuɓi marubutan.** Da yawa suna farin cikin taimakawa. Yi takamaiman tambayoyi:

- Me za ku yi daban idan za ku sake farawa?
- Me ya ɗauki lokaci ko ya ci kuɗi fiye da yadda kuka zata?
- Yaya kuka ɗauka, horarwa, da biyan masu sanya lakabi (annotators)?
- Akwai wani abu da kuka tattara amma ba ku fitar da shi ba?
- Za ku yi sha'awar haɗin gwiwa wajen faɗaɗawa?

**Sannan ka isar da shi ga wasu.** Idan aikinka ya kammala, rubuta abin da ka koya ta amfani da [samfurin waiwaye (retrospective template)](/case-studies/retrospective-template) sannan ka ƙara shi a cikin [Nazarin Bincike (Case Studies)](/case-studies/).

## Misalan da aka yi aiki a kansu {#worked-examples}

Shafuka ukun da ke ƙasa suna amfani da waɗannan matakai huɗu a kan ayyuka na zahiri, ta amfani da sanannun ma'ajin bayanai a matsayin misalai. Idan harshenka ko aikinka ya ɓace, bincika shi ta amfani da Mataki na 1.

- [Gane Sunayen Gungun Kalmomi (Named Entity Recognition)](/before-you-start/ner): aikin da aka fi mayar da hankali a kansa, inda amsar da aka saba bayarwa ita ce sake amfani ko faɗaɗawa.
- [Binciken ra'ayi (Sentiment analysis)](/before-you-start/sentiment): inda fage da al'ada ke tantance ko bayanan da ke akwai sun dace.
- [Maganar ƙiyayya da tsaron abun ciki (Hate speech and content safety)](/before-you-start/hate-speech): inda dole ne ka kare masu sanya lakabi da masu amfani da shi.

Kowane shafi yana nuna ranar da aka yi masa bita ta ƙarshe. Sababbin ma'ajin bayanai na iya bayyana tun daga wancan lokacin.
