---
title: Vyanzo vya Data
description: Ramani ya mahali ambapo data ghafi kwa ajili ya mifumo ya AI ya lugha za Kiafrika inatoka hasa, na jinsi ya kupima chanzo kimoja dhidi ya kingine kabla ya kuchagua mbinu ya ukusanyaji.
ready: true
last_update:
  date: 2026-09-24
  author: Shamsudddeen Hassan Muhammad
translation_status: machine
source_hash: c0205e707565
translated_at: 2026-09-28
---

# Vyanzo vya Data {#data-sources}

Jifunze makundi makuu ya maeneo ambapo data ghafi inatoka, ubora na udhaifu wa kila moja, na jinsi ya kuchagua kati yake kabla ya kuamua kutumia mbinu fulani ya ukusanyaji.

## Kwa nini "chanzo" na "mbinu" ni maswali tofauti {#why-source-and-method-are-different-questions}

Ni rahisi kuchanganya *mahali data inakotoka* na *jinsi unavyoipata*. Haya ni maamuzi tofauti. "Twitter" ni chanzo; "kuita API yake" ni mbinu. "Hifadhi ya taifa ya magazeti" ni chanzo; "kukwangua (scraping) tovuti yake" na "kuomba usafirishaji wa mkupuo (bulk export)" ni mbinu mbili tofauti za kufikia chanzo hicho hicho. Ukurasa huu unaweka ramani ya vyanzo; kurasa mbili zinazofuata, [Ukwanguaji wa Wavuti (Web Scraping)](./web-scraping) na [Miunganisho ya Kupanga Programu za Maombi (Application Programming Interfaces)](./application-programming-interfaces), zinaeleza kwa kina mbinu mbili zinazotumiwa mara nyingi zaidi kuvifikia.

## Makundi makuu {#the-main-categories}

### Wavuti wazi (The open web) {#the-open-web}
Tovuti za habari, blogu, mabaraza (forums), na ensaiklopidia. Zinaweza kufikiwa kwa ukwanguaji (scraping) au, pale inapopatikana, kwa API. Kwa lugha za Kiafrika hiki ndicho chanzo ambacho watu wengi hukimbilia kwanza na, kama [Utangulizi](/sw/introduction) unavyoonyesha, ndicho kinachokatisha tamaa mara nyingi zaidi, si kwa sababu wavuti haujaorodheshwa vizuri, bali kwa sababu maandishi ya msingi katika lugha nyingi lengwa hayapo kabisa huko kuanzia mwanzo.

### Hifadhi za taasisi na serikali {#institutional-and-government-archives}
Kumbukumbu za mahakama, mienendo ya bunge, nyaraka za sensa, machapisho ya wizara. Mara nyingi huwa na ubora wa juu na yanakuwa katika lugha lengwa kwa uthabiti zaidi kuliko maandishi ya wavuti wazi, kwa kuwa taasisi zinatakiwa kuchapisha katika lugha rasmi au za kikanda. Ufikiaji wake huwa wa polepole (maombi, wakati mwingine ada) lakini maandishi yanayopatikana huwa yanahitaji usafishaji mdogo sana.

### Vyanzo vya jamii na masimulizi {#community-and-oral-sources}
Mahojiano, methali zilizorekodiwa, ngano, vipindi vya kupiga simu redioni, mikutano ya jamii: vyanzo ambavyo vipo kwa sababu watu wanazungumza, si kwa sababu kuna mtu aliandika kitu. Mara nyingi hiki ndicho chanzo *pekee* kinachofaa kwa lugha zisizo na utamaduni imara wa maandishi, na hapa ndipo kanuni kuu ya kitabu hiki cha mwongozo (playbook) inapofanya kazi kwa nguvu zaidi: data hii haiwezi kukusanywa vizuri na watu walio nje ya jamii ya lugha hiyo. Kuajiri kupitia zana kama [AfriFinder](https://afriplaybook.waraka.org/afrifinder) kumejengwa mahususi kwa kundi hili.

### Hifadhi za matangazo na vyombo vya habari {#broadcast-and-media-archives}
Hifadhi za redio na televisheni, pale zinapofikika, ziko katikati ya "iliyokwanguliwa kutoka kwenye wavuti wazi" na "iliyorekodiwa kuanzia mwanzo": maudhui tayari yapo katika mfumo wa mazungumzo, mara nyingi katika rejista sanifu (standard register), na wakati mwingine watangazaji wanakuwa na nakala za maandishi (transcripts) au manukuu (subtitles) ambayo hutumika kama maandishi sambamba (parallel text). Mazungumzo ya ushirikiano na utoaji leseni na watangazaji huchukua muda, hivyo chanzo hiki hutoa matokeo mazuri ukianza mapema.

### Seti za data na kopasi (corpora) zilizopo {#existing-datasets-and-corpora}
Usipuuze kazi ambayo tayari imefanywa. Seti za data kama [AfriSenti](https://arxiv.org/abs/2302.08956) kwa ajili ya hisia (sentiment), au mikusanyiko mikubwa ya lugha nyingi iliyojengwa kutokana na data ya msingi iliyotafsiriwa na jamii, ipo hasa ili mradi unaofuata usilazimike kuanza sifuri kwa lugha au kazi fulani. Kila mara angalia leseni na matumizi yaliyokusudiwa kabla ya kutumia tena au kusambaza tena.

### Maandishi ya kidini na kifasihi {#religious-and-literary-texts}
Tafsiri za Biblia, vitabu vya nyimbo, na maandishi yanayofanana na hayo (yanayosambazwa kupitia miradi kama JW300 au BibleNLP) yanajumuisha idadi kubwa isiyo ya kawaida ya lugha zenye rasilimali chache (low-resource languages), mara nyingi zaidi kuliko chanzo kingine chochote cha maandishi sambamba. Ni muhimu sana, hasa kama kianzio (bootstrap), lakini huja na tatizo la rejista linalojulikana vizuri: maandishi ya kidini ni rasmi, ya kizamani, na yenye mada finyu, na modeli iliyofunzwa kwayo pekee itazalisha rejista hiyo mbali sana na inakostahili. Yachukulie kama mahali pa kuanzia, si sampuli inayowakilisha.

### Kampeni za ukusanyaji zilizojengwa kwa madhumuni maalum {#purpose-built-collection-campaigns}
Wakati mwingine hakuna kitu kinachoweza kutumika kilichopo na jibu la kweli ni: mtu lazima aende kukitengeneza (kampeni za kurekodi, mahojiano yaliyopangwa, kampeni za ukusanyaji data kwa simu za mkononi). Hili ndilo kundi ghali zaidi kwa kila kipengee na ndilo ambalo [Upangaji wa Gharama na Rasilimali (Cost and Resource Planning)](./cost-resource-planning) umejengwa kulizunguka, lakini pia ndilo kundi pekee ambapo unadhibiti rejista, idhini (consent), na uwakilishi kuanzia mwanzo.

## Kupima vyanzo dhidi ya vingine {#weighing-sources-against-each-other}

Kwa chanzo chochote kinachopendekezwa, kipime dhidi ya maswali haya machache kabla ya kuwekeza muda wako kwacho:

| Swali | Kwa nini ni muhimu |
|---|---|
| Leseni ni ipi, na je matokeo yanaweza kusambazwa tena? | Huamua kama seti yako ya data ya mwisho inaweza kutolewa kabisa |
| Je, idhini (consent) tayari imeandikwa, au inahitaji kupatikana? | Huunda mapitio ya kimaadili na ratiba ya muda |
| Je, inashughulikia rejista na mada ambazo kazi yako inahitaji, au sehemu moja tu finyu (mf. kidini, rasmi, habari)? | Chanzo kinaweza kuwa kikubwa na bado kisiwe na uwakilishi mzuri |
| Je, matokeo ghafi yatahitaji usafishaji kiasi gani kabla ya kuweza kutumika? | Hifadhi za taasisi kwa kawaida huwa safi zaidi kwa kila neno linalokusanywa kuliko ukwanguaji wa wavuti wazi |
| Je, chanzo hiki ni thabiti, au ufikiaji unaweza kubadilika au kutoweka? | Tazama [Miunganisho ya Kupanga Programu za Maombi (Application Programming Interfaces)](./application-programming-interfaces) kwa kile kinachotokea inapotoweka |

Hakuna chanzo kimoja ambacho ni "bora" kwa ujumla; chaguo sahihi linategemea muundo ([Miundo ya Data (Data Modalities)](./data-modalities)), kiwango cha rasilimali cha lugha, na ni rejista gani ambayo kazi ya mwisho (downstream task) inahitaji hasa.
