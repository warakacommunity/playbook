---
title: Gudanar da Ingancin Bayanai
sidebar_position: 2
ready: true
last_update:
  date: 2026-07-07
  author: Idris Abdulmumin
translation_status: machine
source_hash: f57cca4991b5
translated_at: 2026-09-28
---

# Gudanar da Ingancin Bayanai {#data-quality-management}

Tabbatarwa (assurance) tana sa kowane lakabi (label) ya zama na gaskiya. Gudanarwa (management) tana kula da rumbun bayanai (dataset) gaba ɗaya: daidaitonsa, surutansa (noise), tsarin kurakuransa, da kuma yadda yake canzawa a tsawon lokaci. Waɗannan su ne halayen rumbun bayanai waɗanda ke yanke hukunci ko matattarar bayanai (corpus) abin dogaro ce kuma za a iya sake amfani da ita.

## Magance rashin daidaiton rukunoni {#handle-class-imbalance}

Rumbunan bayanai masu ƙarancin kayan aiki (low-resource datasets) ba kasafai suke da daidaito ba. Maganganun ƙiyayya (hate speech) ƙaramin yanki ne na rubuce-rubucen yau da kullum, ƙaramar karin magana (minority dialect) ƙaramin yanki ne na yaren ƙasa, kuma nau'ikan abubuwa masu wuyar samu (rare entity types) da kyar suke bayyana. Idan aka bar shi haka, rashin daidaito yana barin ƙirar kwamfuta (model) ta sami sakamako mai kyau ta hanyar yin watsi da rukunonin (classes) da kuka fi damuwa da su. Akwai hanyoyi guda uku na gaskiya don magance wannan, kuma yawancin ayyuka suna haɗa su. Haɓaka rukunoni masu wuyar samu a lokacin tattarawa ta hanyar ɗaukar samfuri (sampling) da aka yi niyya ko na kalmomin sirri (keyword-based), kamar yadda ayyukan maganganun ƙiyayya da na motsin rai suke yi don samun isassun misalai tabbatattu. Yi amfani da ɗaukar samfuri daban-daban (stratified sampling) domin ƙananan rukunoni da ƙananan ƙungiyoyi su kasance a koyaushe a cikin rukunin lakabi (annotation set). Kuma idan ba za a iya guje wa rashin daidaito ba, a yi la'akari da shi a lokacin kimantawa (evaluation) ta hanyar bayar da rahoton sakamakon kowane rukuni maimakon daidaito guda ɗaya (single accuracy) wanda babban rukuni zai iya mamayewa. Yanke shawarar wanne daga cikin waɗannan kuke dogara da shi, kuma ku rubuta shi, saboda zaɓin ɗaukar samfuri da ba a bayyana ba shi kansa matsalar inganci ne.

## Gano surutai da bayanan da suka saba wa tsari {#detect-noise-and-outliers}

Surutai (noise) su ne ainihin yanayin rubutun harsunan Afirka da aka tattara, musamman duk wani abu da aka kwaso daga intanet (scraped), inda sassan rubutu na yaren da ba shi ba, abubuwan cikawa da aka fassara da na'ura, da kuma rubutu da aka maimaita suke da yawa ([Kreutzer et al., 2022](/references#kreutzer-2022)). Tsaftace daki-daki. Gudanar da gano harshe (language identification) don cire rubutun da ba a buƙata, ta amfani da kayan aikin da aka gina don harsunan Afirka kamar AfroLID ko GlotLID maimakon na'urorin gano harshe na gaba ɗaya waɗanda ke karanta su ba daidai ba. Cire ainihin abubuwan da aka maimaita da kuma waɗanda suka kusan zama iri ɗaya kafin raba bayanan, domin kar rubutu iri ɗaya ya shiga cikin bayanan horarwa (train) da na gwaji (test). Sannan a nemi bayanan da suka saba wa tsari (outliers) waɗanda ba su da sauƙin ganewa: abubuwan da tsawonsu, tsarinsu, ko abubuwan da ke cikinsu suka bambanta sosai da sauran, ko kuma waɗanda ƙirar kwamfuta mai sauƙi ta ƙi yarda da su da ƙarfin gwiwa, tunda duka biyun alamu ne masu amfani ga ɗan adam ya bincika. Manufar ba ita ce a goge duk wani abu da ba a saba gani ba, saboda ainihin bambancin karin magana zai iya zama kamar abin da ya saba wa tsari, amma a fito da shi don yanke shawara.

## Gina tsarin nazarin kurakurai {#build-an-error-analysis-pipeline}

Lokacin da ƙirar kwamfuta da aka horar da ita a kan bayanan ta yi kurakurai, ɗauki waɗannan kurakuran a matsayin bayanai game da rumbun bayanan. Tsarin nazarin kurakurai (error-analysis pipeline) da za a iya maimaitawa yana raba kurakurai zuwa rukunoni, yana neman tsari ta hanyar rukuni, karin magana, tushe, ko mai sanya lakabi (annotator), kuma yana gano asalin kowane tsari, ko hakan ya kasance ƙa'ida ce mai rikitarwa, lakabin da ya shiga cikin wani, tushe mai cike da surutai, ko wata matsala ta kayan aiki. Fa'idar ita ce yawancin abubuwan da aka gano suna komawa kai tsaye zuwa gyare-gyare: ƙa'ida da aka inganta, lakabi da aka haɗa ko aka raba, tushe da aka sake tsaftacewa. Nazarin kurakurai kuma shi ne inda ake zana layin bambanci tsakanin ainihin kuskuren ƙirar kwamfuta da ainihin kuskuren lakabi, wanda ke komawa kai tsaye cikin tsarin tabbatarwa (assurance loop).

## Sanya sigar rumbun bayanai {#version-the-dataset}

Rumbun bayanai ba ya ƙarewa a fitowarsa ta farko; ana gyara shi, a faɗaɗa shi, kuma a sake raba shi a tsawon lokaci. Ɗauke shi kamar lambar kwamfuta (code). Ba wa kowace fitowa lambar siga (version number), yi rikodin abin da ya canza da kuma dalilin da ya sa a cikin ɗan gajeren kundin canje-canje (changelog), kuma a raba ainihin bayanan da aka tattara da sigogin da aka sarrafa domin kar a taɓa goge ainihin bayanan. Sanya siga (versioning) shi ne abin da ke sa a iya sake samun sakamako iri ɗaya (reproducible), yana barin mai amfani na gaba ya kawo ainihin bayanan da suka yi horo a kai, kuma yana ba ku damar komawa baya lokacin da "gyara" mai kyakkyawar niyya ya haifar da koma-baya (regression). Haɗa tarihin siga da takardun bayani (documentation) da asalin rumbun bayanan (duba [Takardun Bayani](/documentation/documentation) da [Gudanar da Bayanai](/data-governance/)), domin abin da ya canza, wanda ya canza shi, da kuma a ƙarƙashin waɗanne sharuɗɗa duk a iya amsa su bayan shekaru da yawa.
