---
sidebar_position: 2
title: Samfurin katin kunshin bayanai
ready: true
last_update:
  date: 2026-07-07
  author: Shamsudddeen Hassan Muhammad
translation_status: machine
source_hash: 1f9e3931cc51
translated_at: 2026-09-28
---

# Samfurin katin kunshin bayanai {#dataset-card-template}

*Bita ta ƙarshe: 2026-07-07.*

*Wani samfuri ne da aka samo daga Datasheets-for-Datasets wanda aka faɗaɗa shi da tambayoyin da suka shafi yanayin Afirka waɗanda wannan jagorar ke ganin ba za a iya sasantawa a kansu ba. Yi kwafin (fork) wannan fayil ɗin, canza sunansa zuwa gajeren sunan kunshin bayananka (`docs/case-studies/afrisenti-datacard.md` ko `datacard.md` a cikin ma'adanar aikin naka), cika kowane sashe da gaskiya, sannan ka fitar da shi tare da rumbun bayanan (corpus). Kunshin bayanai (dataset) ba tare da kati ba ba kimiyya ba ce a buɗe; wuri ne kawai na zubar da abubuwa.*

## Yadda za a yi amfani da wannan samfurin {#how-to-use-this-template}

1. Kwafi dukkan abin da ke ƙarƙashin layin raba `---` zuwa wani sabon fayil.
2. Maye gurbin kowane gurbin `[SQUARE BRACKET]` da ainihin amsar.
3. Goge duk wata tambaya da ba ta dace da aikin ba sannan ka ƙara layin `Not applicable: [why]` a gurbinta. Kada ka tsallake ba tare da bayani ba.
4. Bar tsarin sashen da rubutun kanun magana ba tare da an canza su ba, domin masu karatu na gaba su iya bincika katunan kunshin bayanai daban-daban don neman fili iri ɗaya.
5. Ƙara kwanan watan `last-reviewed` a sama domin masu karatu na gaba su san lokacin da katin yake a kan tsari.

An samo asali daga [Datasheets for Datasets (Gebru et al., 2018)](https://arxiv.org/abs/1803.09010), [Data Statements for NLP (Bender & Friedman, 2018)](https://aclanthology.org/Q18-1041/), da kuma babi na [dokoki, amincewa, da haƙƙin mallakar al'umma](/legal-consent/) na wannan jagorar.

---

## Sunan kunshin bayanai {#dataset-name}

**[SUNAN]**

Gajeren bayani na layi ɗaya: **[LAYI ƊAYA]**

- **Fassara (Version):** [X.Y]
- **Ranar fitarwa:** [YYYY-MM-DD]
- **Bita ta ƙarshe:** [YYYY-MM-DD]
- **Tabbataccen URL:** [SHAFIN KUNSHIN BAYANAI]
- **Lasisi:** [Mai gano SPDX, misali, CC BY-NC 4.0]
- **DOI / kalaman da aka fi so wajen ambato:** [BibTeX ko rubutu zalla]

## 1. Dalili {#1-motivation}

- **Don wane dalili aka ƙirƙiri wannan kunshin bayanai?** [Ba gaba ɗaya "don binciken NLP" ba, amma takamaiman aikin da kuma yadda za a yi amfani da shi.]
- **Wanene ya ƙirƙiri kunshin bayanan?** [Sunayen mutane + ƙungiyoyinsu + al'ummar da aka samo yaren daga gare su.]
- **Wanene ya ɗauki nauyin ƙirƙirarsa?** [Sunaye + lambobin tallafi.]
- **Mene ne aka bari kuma me yasa?** [Harsuna, karin harsuna, fannoni, ko rukunin abubuwan da aka cire da gangan.]

## 2. Tsari {#2-composition}

- **Mene ne misalan (instances) ke wakilta?** [Jumloli? Furci? Takardu? Muryoyin da aka ɗauka? Hotuna da rubutunsu?]
- **Misalai nawa ne a ciki?** [Jimilla + kowane harshe + kowane rabo.]
- **Shin kunshin bayanan ya ƙunshi duk misalan da za su iya kasancewa, ko kuma samfuri ne kawai?** [Idan samfuri ne, ta yaya aka ɗauki samfurin? Samfurin mene ne?]
- **Wane bayani ne kowane misali ya ƙunsa?** [Fannoni, nau'o'i, tsarin ɓoye bayanai (encoding).]
- **Akwai lakabobi (labels)?** [Aiki, rukunin lakabi, URL na ƙa'idojin sanya lakabi (annotation guidelines).]
- **Akwai wani bayani da ya ɓace daga wasu misalan?** [Idan eh, me yasa.]
- **Shin an bayyana alaƙar da ke tsakanin misalan a fili?** [Mai magana ɗaya? Takarda ɗaya? Tsari?]
- **Akwai shawarwarin raba bayanai?** [Rabon horo (train) / haɓakawa (dev) / gwaji (test) da kuma yadda aka samo su.]
- **Akwai kurakurai, tushen hargitsi (noise), ko maimaici a cikin kunshin bayanan?** [Hargitsin lakabi da aka sani, kusan-kwafi, matsalolin daidaitawa.]
- **Shin kunshin bayanan yana tsaye da kansa ne, ko yana da alaƙa da wasu majiyoyi na waje?** [Idan na waje ne, yaya ƙarfin waɗannan hanyoyin haɗin (links) suke?]
- **Shin kunshin bayanan ya ƙunshi bayanan da za a iya ɗauka a matsayin na sirri ko masu mahimmanci?** [Abubuwan gano mutum, bayanan lafiya, rukunonin da aka ba wa kariya a ƙarƙashin [babin dokoki da amincewa](/legal-consent/).]

## 3. Tsarin tattarawa: ƙarin bayani kan yanayin Afirka {#3-collection-process-the-african-context-extension}

Bayan daidaitattun tambayoyin takardar bayanai, wannan sashen shi ne inda buƙatun yanayin Afirka na wannan jagorar suke. Kada ka tsallake.

- **Wace hanya aka bi wajen samo bayanan?** [Ɗaukar muryar al'umma? Fassara da aka nema? Kwashe bayanan yanar gizo (web scrape)? Haɗin gwiwa?]
- **Su waye suka shiga cikin tattara bayanan?** [Sunayen masu sanya lakabi (annotators), masu fassara, ko masu bayar da gudummawa, tare da amincewa don bayyana sunayensu. Masu aikin sa-kai ko waɗanda aka biya; idan an biya su, a wane farashi bisa wane ma'auni.]
- **A wane tsawon lokaci aka tattara bayanan?** [Kwanan watan farawa da na ƙarewa.]
- **Shin wani kwamiti ko hukuma ta yi bita kan tsarin tattara bayanan?** [IRB, bitar ɗa'a, kwamitin gudanarwa na al'umma. Faɗi sunan hukumar da kwanan watan bitar.]
- **Yaya tsarin neman amincewa da aka yi bayani a kansa yake?** [Amincewar mutum + ta al'umma. Idan masu bayar da gudummawar ba su iya karatu da rubutu ba, wane takamaiman tsari aka yi amfani da shi (duba [babin dokoki da amincewa](/legal-consent/#consent-from-non-literate-speakers)).]
- **Shin kunshin bayanan yana da alaƙa da mutane?** [Idan eh, duk ƙananan tambayoyin da ke ƙasa sun shafi aikin.]
- **Ta yaya ake janye amincewa?** [Tabbataccen ID, hanyar tuntuɓa, matakan a aikace.]
- **Wane haruffa da tsarin rubutu (orthography) aka yi amfani da su?** [Idan harshen yana amfani da haruffa ko tsarin rubutu fiye da ɗaya, wanne ne, kuma wace tuntuɓar al'umma ce ta kai ga wannan zaɓin.]
- **Wane karin harshe (dialect), nau'i, da matakin harshe (register) ne aka wakilta?** [KADA ka rubuta "[HARSHE]" sannan ka tsaya; kowane harshen Afirka mai girma yana da bambance-bambancen ciki waɗanda suke da mahimmanci.]
- **Wane tsari ne na gauraya harsuna (code-switching) bayanan suke da shi?** [Harshe ɗaya? Kaso nawa ne aka gauraya da Turanci/Faransanci/Larabci/Kiswahili? Mene ne aka gauraya da wani?]
- **Waɗanne matakai aka ɗauka don tabbatar da cewa bayanan sun nuna ainihin muryar al'ummar?** [Sanya masu asalin harshen a cikin ƙa'idoji, sanya lakabi, da warware saɓani; tsarin aiki na haɗin gwiwa (duba [Nekoto et al., 2020](https://aclanthology.org/2020.findings-emnlp.195/)).]

## 4. Sarrafa bayanai a matakin farko, tsaftacewa, sanya lakabi {#4-preprocessing-cleaning-labeling}

- **Shin an yi wani sarrafa bayanai a matakin farko (preprocessing) / tsaftacewa / sanya lakabi ga bayanan?** [Rarraba kalmomi (tokenisation), daidaitawa (normalisation), kula da wasula, canza haruffa, cire maimaici, tacewa.]
- **Shin an adana ɗanyen bayanan (raw data) ban da bayanan da aka sarrafa a matakin farko?** [Idan a'a, me yasa.]
- **Wane manhaja aka yi amfani da ita wajen sarrafa bayanan a matakin farko?** [Takamaiman ɗakunan karatu (libraries) da fassarorinsu, ko hanyar haɗi zuwa lambar sarrafa bayanan.]
- **Shin an auna yarjejeniyar tsakanin masu sanya lakabi (inter-annotator agreement)?** [Wane maki, a kan wane kason rumbun bayanan.]
- **Wane tsari aka bi wajen warware saɓani tsakanin masu sanya lakabi?** [Bita ta biyu daga babban mai sanya lakabi? Ƙuri'ar amincewa? Yarwa?]

## 5. Amfani {#5-uses}

- **Shin an riga an yi amfani da kunshin bayanan don wasu ayyuka?** [Takardun bincike, ƙaddamarwa, ma'aunai na gaba.]
- **Akwai wata ma'adana da ke haɗa zuwa kowace ko duk takardun bincike ko tsarin da ke amfani da kunshin bayanan?** [Idan eh, URL.]
- **Waɗanne ayyuka ne za a iya amfani da kunshin bayanan a kansu?** [Shawarar marubucin, wanda ya dogara a kan ainihin abin da aka tattara rumbun bayanan dominsa.]
- **Akwai ayyukan da BAI KAMATA a yi amfani da kunshin bayanan a kansu ba?** [Matsayi mai ƙarfi na editan wannan jagorar shi ne cewa katunan kunshin bayanai su bayyana a fili ayyukan da za a GUJE WA: manhajojin leƙen asiri, sake amfani da su don kasuwanci ba tare da tuntuɓar al'umma ba, sake horarwa na gaba wanda ke samar da ƙirar samfura (models) da aka samo daga gare su a ƙarƙashin lasisi masu rauni. Bayyana su.]

## 6. Rarrabawa {#6-distribution}

- **A ƙarƙashin wane lasisi ake rarraba kunshin bayanan?** [Mai gano SPDX + dalilin zaɓin a jumla ɗaya. Duba [jagorar zaɓin lasisi na babin dokoki da amincewa](/legal-consent/#licence-selection).]
- **Shin an taƙaita amfani da kunshin bayanan ga wanda ba na kasuwanci ba ne kawai?** [Eh ko a'a, tare da dalili.]
- **Ta yaya za a iya samun kunshin bayanan?** [Saukarwa kai tsaye, buƙata-da-bita, Zenodo, Hugging Face Hub, da sauransu.]
- **Akwai wasu kuɗaɗe ko ƙuntatawa wajen samunsa?**
- **Wanene aka naɗa a matsayin mai kula da buƙatun sake amfani?** [Sunan mutum ko hukuma, tare da hanyar tuntuɓa. Duba [tsarin fitarwa na hana kwashe bayanai](/legal-consent/#anti-extraction-release-patterns) a cikin babin dokoki da amincewa.]
- **Ta yaya za a sabunta kunshin bayanan?** [Tsari, tsarin fassara (versioning scheme).]
- **Har zuwa yaushe kunshin bayanan zai kasance a buɗe?** [Alƙawarin hukuma, idan akwai.]

## 7. Kulawa {#7-maintenance}

- **Wanene ke tallafawa / ɗaukar nauyi / kula da kunshin bayanan?**
- **Akwai tsarin gyara kurakurai (errata)?** [Yadda ake ba da shawarar gyare-gyare da kuma yadda ake aiwatar da su.]
- **Shin za a sabunta kunshin bayanan?** [Gyare-gyare kawai? Ƙare-ƙare? Dukansu biyun?]
- **Shin akwai tsofaffin fassarorin kunshin bayanan?** [A ina.]
- **Ta yaya masu amfani za su iya bayar da gudummawa ko faɗaɗa kunshin bayanan?** [PRs, hanyoyin tuntuɓa, tsarin bitar al'umma.]

## 8. Bitar ɗa'a {#8-ethical-review}

- **Shin wani kwamitin ɗa'a ya yi bita kan kunshin bayanan?** [Sunan kwamitin, kwanan watan bita, sakamako.]
- **Shin al'ummar da aka wakilci bayanansu sun nuna wata damuwa?** [Idan eh, mene ne kuma ta yaya aka magance su.]
- **Akwai sanannun son zuciya (biases) a cikin kunshin bayanan?** [Rukunin mutanen da ba a wakilta sosai ba, majiyoyin da aka fi ba wa fifiko, ƙanƙantar matakin harshe ko fanni.]
- **Wace shawara ce aka bayar ga masu amfani na gaba waɗanda suka gano ƙarin damuwa?** [Sunan wanda za a tuntuɓa + tsari.]

## 9. Ambato {#9-citation}

Kalaman da aka fi so wajen ambato:

```
[BibTeX or plain-text]
```

Shawarwarin ambato masu rakiya (don ainihin tsarin aiki, ƙirar samfura, ko tsarin kimantawa):

- [TAKARDAR BINCIKE TA 1]
- [TAKARDAR BINCIKE TA 2]

---

**Lura ga mai bayar da gudummawa.** Idan ka faɗaɗa ko yin kwafin (fork) wannan samfurin don wani aiki ko harshe tare da ƙarin filayen da ake buƙata (misali, bayanan asali (metadata) na ɗaukar murya don rumbun bayanan TTS, filayen daidaita hotuna don rumbun bayanan OCR), ƙara filayen a *ƙarƙashin* daidaitattun sassan, ba a maimakonsu ba. Tsarin fili na haɗin gwiwa shi ne abin da ke sa kwatanta rumbun bayanai daban-daban ya yiwu.
