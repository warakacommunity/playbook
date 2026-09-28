---
title: "Nazarin Bincike: Tattara Bayanai Masu Siffofi Daban-daban"
description: Yadda aka tattara ArtELingo-28, ma'aunin gwaji na al'adu daban-daban kan hoto-da-motsin rai a cikin harsuna 28, da kuma shawarwarin da ba sa fitowa a sassan Siffofi, Majiyoyi, ko API har sai ka yi ƙoƙarin haɗa su.
ready: true
last_update:
  date: 2026-09-24
  author: Shamsudddeen Hassan Muhammad
translation_status: machine
source_hash: d8b94cc47ea0
translated_at: 2026-09-28
---

# Nazarin Bincike: Tattara Bayanai Masu Siffofi Daban-daban {#case-study-multimodal-data-collection}

Wani misali a aikace na abin da ke faruwa idan tsarin tattara bayanai ya zama dole ya gamsar da siffofi (modalities) guda biyu (da kuma harsuna da dama) a lokaci guda, ta amfani da ArtELingo-28 ([Mohamed et al., EMNLP 2024](https://aclanthology.org/2024.emnlp-main.1165/)) a matsayin takamaiman abin dubawa.

## Aikin {#the-task}

ArtELingo-28 wani ma'aunin gwaji (benchmark) ne da aka gina don nazarin yadda mutane daga al'adu daban-daban ke nuna motsin rai ga zanen fasaha guda ɗaya, a cikin harsuna 28. Ga kowane hoto, masu sanya lakabi (annotators) a cikin harsuna da yawa sun zaɓi motsin ran da zanen ya haifar musu kowanne daban, sannan suka rubuta gajeren bayani don bayyana dalili. Sakamakon haka shi ne kusan lakabobi (annotations) 200,000 a kan hotunan WikiArt 2,000 (kusan lakabobi 140 ga kowane hoto, waɗanda aka rarraba a cikin harsuna 28), wanda ya ba da damar yin kwatance, hoto bayan hoto, ko masu sanya lakabi a cikin harsuna biyu daban-daban sun fahimci zane guda ɗaya a hanya ɗaya.

Wannan wata matsala ce ta tattara bayanai masu siffofi daban-daban a zahiri: rukunin hoto da rukunin rubutu sun fito ne daga wurare daban-daban gaba ɗaya, suna ƙarƙashin dokoki daban-daban, kuma dole ne a tattara su a hanyar da za ta sa su kasance a jere da juna.

## Shawara ta 1: an sake amfani da rukunin hoton ne, ba a tattara sabo ba {#decision-1-the-image-layer-was-reused-not-collected-fresh}

Hotunan da kansu ba sababbin ɗauka ba ne ko kuma an kwaso su ne don wannan aikin; an samo su ne daga WikiArt, wani rumbun adana fasaha na jama'a da ke akwai, wanda shi ne majiyar da ayyukan da suka gabata a wannan fannin suka yi amfani da ita. Wannan yana nuna wani muhimmin al'amari daga [Siffofin Bayanai](./data-modalities): ba kowace siffa (modality) a cikin aikin da ke da siffofi daban-daban ba ne ke buƙatar a tattara ta a hanya ɗaya, ko ma a tattara ta gaba ɗaya. A nan, an samo siffar hoton ne daga wani rumbun adana bayanai da ke akwai kuma aka tsara shi; siffar rubutu/lakabi ita ce ɓangaren da ke buƙatar sabon tattarawa a zahiri. Gane wane rukuni ne "an riga an warware shi" da kuma wane rukuni ne ainihin matsalar tattarawa yana adana lokaci da kasafin kuɗi sosai.

Sake amfani da hotunan da ke akwai maimakon tattara sababbi ba ya cire batun lasisi; yana canza masa wuri ne kawai. Duk wani aikin da aka gina a kan rumbun adana hotuna na wani ɓangare na uku dole ne ya gano, daban da tsarin tattara lakabinsa, waɗanne haƙƙoƙin sake rarrabawa yake da su ga hotunan da zarar an haɗa su a cikin sabon rumbun bayanai (dataset) da aka saki tare da sababbin bayanai da lakabobi. Wannan tambayar tana zaune ne dumu-dumu a cikin yankin da aka tattauna daga baya a [Rubutattun Bayanai, Sakin Bayanai, da Gudanarwa](https://afriplaybook.waraka.org/category/6-documentation-data-release-and-governance), amma dole ne a amsa ta a lokacin matakin tsara tattara bayanai, ba a gano ta bayan an gama sanya lakabi ba.

## Shawara ta 2: kwatancen al'adu daban-daban yana kafa ƙa'ida kafin a fara sanya lakabi {#decision-2-cross-cultural-comparison-sets-a-constraint-before-annotation-starts}

Gaba ɗaya asalin kimiyyar, cewa za ka iya kwatanta yadda al'ummomin harsuna daban-daban ke nuna motsin rai ga zanen fasaha "guda ɗaya", ya dogara ne a kan kowane harshe ya sanya lakabi ga rukunin hotuna guda ɗaya. Wannan yana jin kamar a bayyane yake, amma dole ne a tsara shi a cikin tsarin tattara bayanai tun daga ranar farko. Idan wani babban tsari na gaba na irin wannan aikin ya samo hotunansa daga majiyoyi masu sassauƙan lasisi maimakon tsayayyen rukunin da aka riga aka amince da shi, dole ne ya tabbatar da cewa samun hotunan yana da daidaito a kowane rabe-raben harshe *kafin* a fara sanya lakabi, ba bayan an gama ba. Rukunin gwaji (test set) wanda bisa kuskure ya rasa wasu hotuna a cikin rukunin sanya lakabi na wani harshe yana ɓata kwatancen da aka gina gaba ɗaya aikin don tallafawa a asirce. Wannan wata shawara ce ta matakin tattara bayanai wacce ta ɓad-da-kama a matsayin matsalar matakin sanya lakabi. A lokacin da masu sanya lakabi suke aiki, ya yi latti a gyara cikin sauƙi da ƙaramin kuɗi.

## Shawara ta 3: tsara kasafin kuɗi da aiki dole ne ya ƙaru bisa ga harshe, ba kawai bisa ga hoto ba {#decision-3-cost-and-labor-planning-had-to-scale-by-language-not-just-by-image}

Ga rumbun bayanai na sanya bayani a hoto na harshe ɗaya, ma'aunin farashin tattarawa kusan "ga kowane hoto" ne. A nan, ma'aunin shi ne "ga kowane hoto, ga kowane harshe": hotuna 2,000 da aka sanya wa lakabi kowanne daban a cikin kowane ɗayan harsuna 28 wani mataki ne na aiki da ya bambanta gaba ɗaya da hotuna 2,000 da aka sanya wa lakabi sau ɗaya. An ɗauki masu sanya lakabi ta hanyar Amazon Mechanical Turk kuma an biya su $0.10 ga kowane lakabi (kusan $8 a kowace sa'a, idan aka yi la'akari da matsakaicin kusan daƙiƙa 45 ga kowane aiki), kuma aikin ya sami amincewar hukumar duba ayyuka (institutional review board) da kuma amincewa bisa fahimta (informed consent) kafin a fara sanya lakabi, duba da amfani da ma'aikatan intanet da ake biya (paid crowdworkers). Babu ɗaya daga cikin waɗannan lambobin da za a iya sani ba tare da fara yanke shawara kan abin ninkawa ba (harsuna 28) a matakin tsara tattara bayanai, wanda shi ne ainihin aikin da aka bayyana a [Tsara Kasafin Kuɗi da Albarkatu](./cost-resource-planning).

## Abubuwan lura don aikin ka na siffofi daban-daban {#takeaways-for-your-own-multimodal-project}

- **Yi lissafin kowace siffa daban kafin tsara tattarawa.** Yanke shawara, rukuni bayan rukuni, wace siffa ce ta riga ta kasance a tsarin da za a iya amfani da ita a wani wuri (sake amfani da ita) kuma wacce ce dole a ƙirƙira ta sabuwa (yi mata kasafin kuɗi yadda ya kamata).
- **Idan kwatancen tsakanin-X shi ne asalin kimiyyar aikin** (tsakanin al'adu, tsakanin harsuna, tsakanin lokuta), **ƙa'idar kwatance wata shawara ce ta tsarin matakin tattara bayanai**, ba wani abu da za a tabbatar bayan an gama ba. Tabbatar da abin da zai kasance ba canji a kowane rabe-rabe kafin ɗaukar ko da mai sanya lakabi guda ɗaya.
- **Sake amfani da kadarorin da ke akwai, kamar rumbun adana hotuna, ba ya cire aikin lasisi; yana matsar da tambayar ne** daga "zan iya tattara wannan" zuwa "zan iya sake rarraba wannan a haɗe da abin da na ƙara a kai."
- **Lokacin da aiki ya ninka a cikin harsuna da yawa, abin da ke kawo tsadar ba girman rumbun bayanan ba ne; abin ninkawar ne.** Tsara kasafin kuɗi da lokacin aiki a kan wannan abin ninkawar a fili, maimakon a matsayin wani tunani mara tabbas na "sannan a yi shi don sauran harsunan ma" a ƙarshe.

:::tip Bada gudunmawar naka nazarin binciken
Wannan shafin ya ƙunshi misali ɗaya da aka wallafa. Idan ka gudanar da wani aikin tattara bayanai masu siffofi daban-daban ko na harsuna daban-daban, ko ya yi nasara ko bai yi ba, [rubuta shi](https://github.com/warakacommunity/playbook/blob/main/README.md#ways-to-contribute) a matsayin ƙarin nazarin bincike. Abin da ya faru ba daidai ba sau da yawa ya fi amfani ga mutum na gaba fiye da abin da ya tafi daidai.
:::
