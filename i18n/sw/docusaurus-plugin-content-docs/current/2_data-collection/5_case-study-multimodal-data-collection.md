---
title: "Uchunguzi Kifani: Ukusanyaji wa Data za Mifumo Mbalimbali"
description: Jinsi ArtELingo-28, kigezo cha picha na hisia cha kitamaduni mtambuka cha lugha 28, kilivyokusanywa hasa, na maamuzi ambayo hayaonekani kwenye sehemu za Mifumo, Vyanzo, au API hadi unapojaribu kuziunganisha.
ready: true
last_update:
  date: 2026-09-24
  author: Shamsudddeen Hassan Muhammad
translation_status: machine
source_hash: d8b94cc47ea0
translated_at: 2026-09-28
---

# Uchunguzi Kifani: Ukusanyaji wa Data za Mifumo Mbalimbali {#case-study-multimodal-data-collection}

Mfano uliofanyiwa kazi wa kile kinachotokea wakati mpango wa ukusanyaji unapaswa kutosheleza mifumo (modalities) miwili (na makumi ya lugha) kwa wakati mmoja, kwa kutumia ArtELingo-28 ([Mohamed et al., EMNLP 2024](https://aclanthology.org/2024.emnlp-main.1165/)) kama kielelezo thabiti.

## Jukumu {#the-task}

ArtELingo-28 ni kigezo (benchmark) kilichoundwa kusoma jinsi watu kutoka tamaduni tofauti wanavyoitikia kihisia kwa sanaa ileile ya kuona, katika lugha 28. Kwa kila picha, wawekaji lakabi (annotators) katika lugha nyingi walichagua kwa kujitegemea hisia ambayo sanaa hiyo iliibua na kuandika maelezo mafupi (caption) kueleza kwa nini. Matokeo yake ni takriban lakabi (annotations) 200,000 kwenye picha 2,000 za WikiArt (takriban lakabi 140 kwa kila picha, zilizosambazwa katika lugha 28), na kufanya iwezekane kulinganisha, picha kwa picha, ikiwa wawekaji lakabi katika lugha mbili tofauti wanaelewa mchoro uleule kwa njia ileile.

Hili ni tatizo halisi la ukusanyaji wa mifumo mbalimbali (multimodal): tabaka la picha na tabaka la maandishi yanatoka sehemu tofauti kabisa, yanasimamiwa na sheria tofauti, na yanapaswa kukusanywa kwa njia ambayo inayaweka yakiwa yameoanishwa.

## Uamuzi wa 1: tabaka la picha lilitumiwa tena, halikukusanywa upya {#decision-1-the-image-layer-was-reused-not-collected-fresh}

Picha zenyewe hazikupigwa upya au kukusanywa kwa ajili ya mradi huu; zimetolewa kwenye WikiArt, hifadhi ya sanaa ya umma iliyopo, chanzo kilekile kilichotumiwa na miradi iliyotangulia katika aina hii ya kazi. Hili linaonyesha hoja kutoka kwenye [Mifumo ya Data](./data-modalities): si kila mfumo (modality) katika mradi wa mifumo mbalimbali unahitaji kukusanywa kwa njia ileile, au hata kukusanywa kabisa. Hapa, mfumo wa picha ulitolewa kutoka kwenye hifadhi iliyopo na iliyochujwa; mfumo wa maandishi/lakabi ulikuwa sehemu ambayo ilihitaji ukusanyaji mpya haswa. Kutambua ni tabaka lipi "tayari limetatuliwa" na ni tabaka lipi ndilo tatizo halisi la ukusanyaji huokoa muda na bajeti kubwa.

Kutumia tena picha zilizopo badala ya kukusanya mpya hakuondoi suala la leseni; kunalihamisha. Mradi wowote unaojengwa kwenye hifadhi ya picha ya mtu mwingine unapaswa kutatua, tofauti na mpango wake wa ukusanyaji wa lakabi, ni haki gani za usambazaji upya ulizonazo kwa picha hizo mara tu zinapounganishwa kwenye seti ya data (dataset) mpya iliyotolewa pamoja na maelezo na lebo mpya. Swali hilo lipo moja kwa moja katika eneo linaloshughulikiwa baadaye katika [Nyaraka, Utoaji wa Data, na Utawala](https://afriplaybook.waraka.org/category/6-documentation-data-release-and-governance), lakini linapaswa kujibiwa wakati wa hatua ya kupanga ukusanyaji, si kugunduliwa baada ya uwekaji lakabi kukamilika.

## Uamuzi wa 2: ulinganishaji wa kitamaduni mtambuka huweka kizuizi kabla ya uwekaji lakabi kuanza {#decision-2-cross-cultural-comparison-sets-a-constraint-before-annotation-starts}

Msingi mzima wa kisayansi, kwamba unaweza kulinganisha jinsi jamii za lugha tofauti zinavyoitikia sanaa "ileile", unategemea kila lugha kuweka lakabi kwenye seti ileile ya msingi ya picha. Hilo linaonekana wazi, lakini linapaswa kuundwa ndani ya mpango wa ukusanyaji kuanzia siku ya kwanza. Ikiwa toleo la baadaye, kubwa zaidi la aina hii ya mradi litatoa picha zake kutoka kwa vyanzo vyenye leseni isiyobana sana badala ya seti maalum iliyoidhinishwa mapema, linapaswa kuthibitisha kwamba upatikanaji wa picha unalingana katika mgawanyo wa kila lugha *kabla* ya uwekaji lakabi kuanza, si baada. Seti ya majaribio (test set) ambayo kwa bahati mbaya inakosa picha chache katika kundi la uwekaji lakabi la lugha moja inaharibu kimyakimya ulinganishaji ambao mradi mzima umejengwa kuusaidia. Huu ni uamuzi wa hatua ya ukusanyaji unaojificha kama tatizo la hatua ya uwekaji lakabi. Kufikia wakati wawekaji lakabi wanafanya kazi, inakuwa imechelewa sana kurekebisha kwa gharama nafuu.

## Uamuzi wa 3: upangaji wa gharama na nguvu kazi ulipaswa kuongezeka kulingana na lugha, si tu kwa picha {#decision-3-cost-and-labor-planning-had-to-scale-by-language-not-just-by-image}

Kwa seti ya data ya uwekaji maelezo ya lugha moja, kipimo cha gharama ya ukusanyaji ni takriban "kwa kila picha." Hapa, kipimo ni "kwa kila picha, kwa kila lugha": picha 2,000 zilizowekewa lakabi kwa kujitegemea katika kila moja ya lugha 28 ni kiwango tofauti kimsingi cha nguvu kazi kuliko picha 2,000 zilizowekewa lakabi mara moja. Wawekaji lakabi waliajiriwa kupitia Amazon Mechanical Turk na kulipwa $0.10 kwa kila lakabi (takriban $8/kwa saa, ikizingatiwa wastani wa sekunde 45 kwa kila kazi), na mradi ulipata idhini ya bodi ya ukaguzi wa kitaasisi (institutional review board) na ridhaa iliyoarifiwa (informed consent) kabla ya uwekaji lakabi, kutokana na matumizi yake ya wafanyakazi wa umati wanaolipwa (paid crowdworkers). Hakuna hata moja ya namba hizo ambayo ingejulikana bila kwanza kuamua kizidishio (lugha 28) katika hatua ya kupanga ukusanyaji, ambayo ndiyo hasa kazi iliyoelezwa katika [Upangaji wa Gharama na Rasilimali](./cost-resource-planning).

## Mambo ya kuzingatia kwa mradi wako wa mifumo mbalimbali {#takeaways-for-your-own-multimodal-project}

- **Orodhesha kila mfumo kando kabla ya kupanga ukusanyaji.** Amua, tabaka kwa tabaka, ni mfumo upi tayari upo katika umbo linaloweza kutumika mahali fulani (utumiwe tena) na upi unapaswa kuundwa upya (utengewe bajeti ipasavyo).
- **Ikiwa ulinganishaji mtambuka wa X ndio lengo la kisayansi la mradi** (kitamaduni mtambuka, lugha mtambuka, wakati mtambuka), **kizuizi cha ulinganifu ni uamuzi wa muundo wa hatua ya ukusanyaji**, si jambo la kuthibitisha baada ya tukio. Thibitisha kile kinachobaki thabiti katika kila mgawanyo kabla ya kuajiri mweka lakabi hata mmoja.
- **Kutumia tena rasilimali zilizopo, kama vile hifadhi ya picha, hakuondoi kazi ya leseni; kunahamisha swali** kutoka "je, ninaweza kukusanya hii" hadi "je, ninaweza kusambaza tena hii ikiwa imeunganishwa na kile ninachoongeza juu yake."
- **Wakati mradi unaongezeka katika lugha nyingi, kichocheo cha gharama si ukubwa wa seti ya data; ni kizidishio.** Panga bajeti na ratiba kulingana na kizidishio hicho waziwazi, badala ya wazo la baadaye lisiloeleweka la "na kisha ufanye hivyo kwa lugha zingine pia".

:::tip Changia uchunguzi kifani wako mwenyewe
Ukurasa huu unashughulikia mfano mmoja uliochapishwa. Ikiwa umeendesha juhudi za ukusanyaji wa mifumo mbalimbali au lugha mtambuka, iwe imefanikiwa au la, [iandike](https://github.com/warakacommunity/playbook/blob/main/README.md#ways-to-contribute) kama uchunguzi kifani wa ziada. Kile kilichoenda vibaya mara nyingi kinafaa zaidi kwa mtu anayefuata kuliko kile kilichoenda vizuri.
:::
