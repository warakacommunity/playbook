---
title: Tushen Bayanai
description: Taswirar inda ainihin ɗanyun bayanai (raw data) na tsarin fasahar AI na harsunan Afirka suke fitowa, da kuma yadda za a auna wani tushe da wani kafin zaɓar hanyar tattarawa.
ready: true
last_update:
  date: 2026-09-24
  author: Shamsudddeen Hassan Muhammad
translation_status: machine
source_hash: c0205e707565
translated_at: 2026-09-28
---

# Tushen Bayanai {#data-sources}

Koyi manyan rukunonin wuraren da ɗanyun bayanai (raw data) ke fitowa, abin da kowanne ya kware a kai da kuma kasawarsa, da kuma yadda za a zaɓa a tsakaninsu kafin a tsunduma cikin wata hanyar tattarawa.

## Me ya sa "tushe" da "hanya" suke zama tambayoyi mabambanta {#why-source-and-method-are-different-questions}

Yana da sauƙi a haɗa *inda bayanai ke fitowa* da *yadda ake samun su*. Hukunce-hukunce ne mabambanta. "Twitter" tushe ne; "kiran API ɗinsa" hanya ce. "Rumbun adana bayanan jaridun ƙasa" tushe ne; "kwashe bayanan shafinsa na intanet (scraping)" da "neman a fitar da bayanai masu yawa" hanyoyi ne guda biyu mabambanta don isa ga tushe ɗaya. Wannan shafin yana zayyana tushen bayanan; shafuka biyu na gaba, [Kwashe Bayanan Intanet (Web Scraping)](./web-scraping) da [Hanyoyin Sadarwar Manhajoji (Application Programming Interfaces)](./application-programming-interfaces), sun yi bayani dalla-dalla kan hanyoyi biyu da aka fi amfani da su wajen isa gare su.

## Manyan rukunoni {#the-main-categories}

### Buɗaɗɗen yanar gizo (The open web) {#the-open-web}
Shafukan labarai, shafukan rubuce-rubuce (blogs), dandalin tattaunawa, da kundin sani (encyclopedias). Ana iya samun su ta hanyar kwashe bayanai (scraping) ko, idan akwai, ta hanyar API. Ga harsunan Afirka, wannan shi ne tushen da mafi yawan mutane ke fara zuwa, kuma kamar yadda [Gabatarwa](/introduction) ta nuna, shi ne wanda ya fi ba da kunya sau da yawa, ba don ba a tsara yanar gizon da kyau ba, amma saboda ainihin rubutun a yawancin harsunan da ake buƙata kusan babu su a wurin tun asali.

### Rumbunan adana bayanai na hukumomi da gwamnati {#institutional-and-government-archives}
Bayanan kotu, abubuwan da suka gudana a majalisa, takardun ƙidayar jama'a, wallafe-wallafen ma'aikatu. Sau da yawa suna da inganci sosai kuma sun fi dacewa da harshen da ake buƙata fiye da rubutun buɗaɗɗen yanar gizo, tunda ana buƙatar hukumomi su wallafa a cikin harsunan hukuma ko na yanki. Samun damar shiga yakan ɗauki lokaci (buƙatu, wani lokacin ana biyan kuɗi) amma rubutun da ake samu yakan buƙaci ƙaramin aikin tsaftacewa.

### Tushen al'umma da na baka {#community-and-oral-sources}
Tattaunawa, karin magana da aka ɗauka, tatsuniyoyi, shirye-shiryen rediyo da ake kira, tarukan al'umma: tushen da ke wanzuwa saboda mutane suna magana, ba don wani ya rubuta wani abu ba. Wannan sau da yawa shi ne *kaɗai* tushen da zai yi aiki ga harsunan da ba su da kyakkyawan tarihin rubutu, kuma a nan ne ainihin ƙa'idar wannan jagorar (playbook) ta fi yin tasiri: ba za a iya tattara waɗannan bayanai yadda ya kamata ba daga mutanen da ba sa cikin al'ummar masu magana da harshen. Ɗaukar ma'aikata ta hanyar amfani da kayan aiki kamar [AfriFinder](https://afriplaybook.waraka.org/afrifinder) an gina shi ne musamman don wannan rukunin.

### Rumbunan adana bayanai na gidajen rediyo da talabijin da kafofin watsa labarai {#broadcast-and-media-archives}
Rumbunan adana bayanai na rediyo da talabijin, inda ake iya samun su, suna tsakanin "kwashewa daga buɗaɗɗen yanar gizo" da "ɗaukar sauti daga farko": abubuwan da ke ciki sun riga sun wanzu a sigar magana, sau da yawa a cikin daidaitaccen tsarin harshe (standard register), kuma wani lokacin gidajen watsa labarai suna da rubutaccen fassarar sautin (transcripts) ko fassarar rubutu a kan allo (subtitles) waɗanda ke aiki a matsayin rubutu mai daidaituwa (parallel text). Tattaunawar haɗin gwiwa da bayar da lasisi tare da gidajen watsa labarai tana ɗaukar lokaci, don haka wannan tushen yana buƙatar a fara da wuri.

### Rumbunan bayanai (datasets) da matattarar rubutu (corpora) da ke akwai {#existing-datasets-and-corpora}
Kada ka yi watsi da aikin da aka riga aka yi. Rumbunan bayanai kamar [AfriSenti](https://arxiv.org/abs/2302.08956) don gane yanayin ra'ayi (sentiment), ko manyan tarin bayanai na harsuna daban-daban da aka gina daga bayanan farko da al'umma suka fassara, sun wanzu ne musamman don kada aikin gaba ya fara daga sifili ga wani harshe ko aiki. Koyaushe ka duba lasisin da kuma aikin da aka yi niyyar amfani da shi kafin ka sake amfani da shi ko rarraba shi.

### Rubutun addini da na adabi {#religious-and-literary-texts}
Fassarorin Littafi Mai Tsarki, waƙoƙin addini, da rubuce-rubuce masu kama da haka (waɗanda ake rarrabawa ta hanyar ayyuka kamar JW300 ko BibleNLP) sun ƙunshi adadi mai yawa na harsunan da ba su da wadatattun kayan aiki (low-resource languages), sau da yawa sun fi kowane tushen rubutu mai daidaituwa (parallel-text). Suna da matuƙar amfani, musamman a matsayin matakin farko (bootstrap), amma suna zuwa da wata matsalar tsarin harshe (register) da aka sani sosai: rubutun addini yana da tsari na musamman, tsohon yayi ne, kuma yana da iyakantaccen jigo, kuma ƙirar fasaha (model) da aka horar da ita a kansa kawai za ta sake samar da wannan tsarin harshen a wuraren da bai dace ba. Ɗauke shi a matsayin wurin farawa, ba a matsayin samfurin da ke wakiltar komai ba.

### Kamfe na tattara bayanai don wata manufa ta musamman {#purpose-built-collection-campaigns}
A wasu lokutan babu wani abin da za a iya amfani da shi da ya wanzu kuma gaskiyar magana ita ce: dole ne wani ya je ya ƙirƙiro shi (kamfe na ɗaukar sauti, tattaunawa mai tsari, shirye-shiryen tattara bayanai ta wayar hannu). Wannan shi ne rukunin da ya fi tsada ga kowane abu kuma shi ne wanda aka gina [Tsare-tsaren Kuɗi da Albarkatu (Cost and Resource Planning)](./cost-resource-planning) a kansa, amma kuma shi ne kaɗai rukunin da kake da ikon sarrafa tsarin harshe (register), amincewa (consent), da kyakkyawan wakilci (representativeness) tun daga farko.

## Auna tushen bayanai da juna {#weighing-sources-against-each-other}

Ga kowane tushen da ake son amfani da shi, auna shi da waɗannan ƴan tambayoyin kafin ka ɓata lokaci a kansa:

| Tambaya | Me ya sa take da muhimmanci |
|---|---|
| Menene lasisin, kuma za a iya sake rarraba sakamakon? | Yana tantance ko za a iya fitar da rumbun bayananka (dataset) na ƙarshe gaba ɗaya |
| Shin an riga an rubuta amincewa (consent), ko kuwa ana buƙatar a samo ta? | Yana tsara duba ƙa'idojin ɗa'a da kuma lokacin da za a ɗauka |
| Shin ya ƙunshi tsarin harshe (register) da jigogin da aikinka ke buƙata, ko kuma wani ɗan ƙaramin ɓangare ne kawai (misali addini, na hukuma, labarai)? | Tushe na iya zama babba amma kuma ba ya wakiltar abin da ake buƙata yadda ya kamata |
| Wane irin aikin tsaftacewa ne ɗanyen sakamakon zai buƙata kafin a iya amfani da shi? | Rumbunan adana bayanai na hukumomi yawanci sun fi tsafta ga kowace kalma da aka tattara fiye da bayanan da aka kwashe daga buɗaɗɗen yanar gizo |
| Shin wannan tushen tabbatacce ne, ko kuwa damar shiga za ta iya canzawa ko ta ɓace? | Duba [Hanyoyin Sadarwar Manhajoji (Application Programming Interfaces)](./application-programming-interfaces) don ganin abin da ke faruwa idan hakan ta faru |

Babu wani tushe guda ɗaya da ya fi "kyau" a dunkule; zaɓin da ya dace ya danganta ne da yanayin bayanan ([Yanayin Bayanai (Data Modalities)](./data-modalities)), matakin albarkatun harshen, da kuma wane irin tsarin harshe (register) ainihin aikin da za a yi a gaba yake buƙata.
