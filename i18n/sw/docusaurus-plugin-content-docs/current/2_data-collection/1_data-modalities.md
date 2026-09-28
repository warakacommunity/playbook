---
title: Miundo ya Data
description: Maana ya muundo wa data (data modality), kwa nini ni uamuzi wa kwanza katika mpango wowote wa ukusanyaji, na jinsi inavyoathiri gharama, vyanzo, na zana muda mrefu kabla ya mtu yeyote kuandika mwongozo wa uwekaji lakabi (annotation guideline).
ready: true
last_update:
  date: 2026-09-24
  author: Shamsudddeen Hassan Muhammad
translation_status: machine
source_hash: be623628188a
translated_at: 2026-09-28
---

# Miundo ya Data {#data-modalities}

Jifunze maana ya muundo wa data (data modality), kwa nini ni uamuzi wa kwanza katika mpango wowote wa ukusanyaji, na jinsi inavyoathiri gharama, vyanzo, na zana muda mrefu kabla ya mtu yeyote kuandika mwongozo wa uwekaji lakabi (annotation guideline).

![Miundo ya data kwa ajili ya seti za data za lugha za Kiafrika na kile ambacho kila moja inahitaji](../../../../../docs/2_data-collection/images/data-modalities.svg)

## Muundo wa data ni nini {#what-a-modality-is}

**Muundo wa data** (data modality) ni umbo ambalo kipande cha data kinachukua: maandishi, picha, sauti, video, au mchanganyiko uliopangwa wa haya. Kila muundo huhifadhi taarifa kwa njia tofauti na unahitaji zana tofauti ili kuikamata, kuihifadhi, na kuichakata. Sentensi na picha zinaweza kuelezea mchoro ule ule, lakini moja ni mfululizo wa alama tofauti na nyingine ni gridi nzito ya thamani za pikseli (pixel values); hakuna chochote kuhusu jinsi unavyokusanya, kuhifadhi, au kuthibitisha kimoja kinachohamishwa moja kwa moja hadi kingine.

Hili ni muhimu zaidi kuliko inavyosikika. Chaguzi nyingi ngumu katika uundaji wa seti ya data (data inatoka wapi, inagharimu kiasi gani, nani anaweza kuiwekea lebo, nini kinaweza kwenda kombo) hufuata baada ya uamuzi wa muundo wa data, na si uamuzi wa uundaji wa modeli (modeling). Mradi wa uchanganuzi wa hisia (sentiment) katika lugha nyingi unaoamua kuongeza kipengele cha sauti haufanyi "kuongeza kipengele tu." Unaanzisha jitihada tofauti kabisa za ukusanyaji, mara nyingi ukiwa na fungu lake la bajeti, maswali yake ya kisheria, na kundi lake la wachangiaji waliohitimu.

:::note Upeo wa sehemu hii
Ukurasa huu unashughulikia muundo wa data katika hatua ya **ukusanyaji**: kila muundo ni nini na kwa nini unabadilisha mahali unapokwenda kutafuta data, nani anaweza kuitoa, na inagharimu kiasi gani. Kubuni kazi za uwekaji lakabi na skema za lebo (label schemas) kwa muundo fulani (visanduku vya kuwekea mipaka (bounding boxes), miongozo ya unukuzi (transcription guidelines), uainishaji wa hisia (emotion taxonomies)) kunashughulikiwa baadaye, katika sehemu za miundo: [Maandishi](/sw/sections/text), [Sauti](/sw/sections/speech), [Maono](/sw/sections/vision) na [Miundo mchanganyiko](/sw/sections/multimodal).
:::

## Miundo ya data utakayokusanya mara nyingi zaidi {#the-modalities-youll-most-often-collect}

### Maandishi {#text}
Hapa ndipo pa kuanzia panapozoeleka zaidi, na penye zana nyingi zilizopo: ukusanyaji data mtandaoni (web crawls), nyaraka za serikali, vitabu, mitandao ya kijamii. Hata hivyo, kwa lugha nyingi za Kiafrika, maandishi pia ni muundo ambao wingi wake unaoonekana unadanganya sana. [Joshi et al. (2020)](https://aclanthology.org/2020.acl-main.560/) na [Kreutzer et al. (2022)](https://aclanthology.org/2022.tacl-1.4/), waliojadiliwa katika [Utangulizi](/sw/introduction), waligundua kuwa sehemu kubwa ya kile kinachoonekana kama maandishi ya lugha za Kiafrika mtandaoni yamewekewa lebo kimakosa, yametafsiriwa na mashine (machine-translated), au si lugha lengwa kabisa. Maandishi "yapo," kwa maana kwamba unaweza kupata faili zinazoyajumuisha; kama yapo katika umbo linalofaa kufunzia modeli ni swali tofauti na gumu zaidi.

### Maongezi na sauti {#speech-and-audio}
Sauti mara nyingi ni muundo wa asili *zaidi* kwa lugha nyingi za Kiafrika, ambazo zimebeba karne nyingi za mapokeo ya simulizi na, katika baadhi ya matukio, hazina mfumo wa tahajia sanifu unaotumiwa sana. Kuikusanya vizuri kwa kawaida kunamaanisha kurekodi, si kukwangua data (scraping): nyaraka za redio, kampeni za kurekodi katika jamii, ukusanyaji wa data kupitia simu, au ushirikiano na watangazaji. Ni ghali zaidi kwa saa kuliko maandishi kwa neno, kwa sababu kurekodi kunahitaji vifaa na idhini, na kwa sababu unukuzi (transcription) baadaye ni kazi ya kitaalamu ya uwekaji lakabi.

### Picha {#images}
Data ya picha inagawanyika katika matatizo mawili tofauti ya ukusanyaji kulingana na kama unatafuta picha zilizopo (nyaraka za makumbusho, mikusanyiko ya picha za umma, picha za satelaiti) au unanasa mpya (vifaa vya kamera, kampeni za picha za simu). La kwanza linaibua maswali ya leseni na usambazaji upya; la pili linaibua maswali ya idhini na faragha, hasa pale ambapo nyuso au maeneo yanayotambulika yanahusika.

### Video {#video}
Inachanganya muundo wa gharama wa sauti (kurekodi, idhini) na gharama ya uhifadhi na kipimo data (bandwidth) cha picha, ikizidishwa na muda. Video hukusanywa mara chache kwa ajili yake yenyewe katika kazi za lugha zenye rasilimali chache; kwa kawaida huonekana ikiwa imeunganishwa na lengo jingine: kopasi (corpora) za lugha ya alama, maudhui ya kufundishia, au kama nyenzo chanzo ambapo sauti na fremu hutolewa baadaye.

### Data ya miundo mchanganyiko (Multimodal data) {#multimodal-data}
Kusema kweli huu si muundo tofauti bali ni *mchanganyiko*: data iliyooanishwa ya maandishi-picha, sauti-video, au picha-maelezo, iliyokusanywa ili miundo iweze kuchanganuliwa pamoja au dhidi ya kila mmoja. Tatizo la ukusanyaji hapa linaongezeka: unahitaji miundo yote miwili iwepo kwa kipengee kile kile cha msingi, mara nyingi kutoka vyanzo tofauti, na unahitaji kufuatilia ni jozi zipi zinaenda pamoja. [Uchunguzi kifani](./case-study-multimodal-data-collection) baadaye katika sura hii unapitia kikamilifu tatizo hili kwa seti ya data ya picha-maelezo-hisia katika lugha 28.

## Kwa nini uamuzi huu unakuja kwanza {#why-this-decision-comes-first}

Kabla ya kuamua kuhusu vyanzo au mbinu (sehemu mbili zinazofuata), inafaa kujibu, kwa maandishi, kwa ajili ya mradi wako mwenyewe:

- **Kazi inahitaji muundo (au miundo) gani hasa?** Usichague maandishi moja kwa moja kwa sababu yamezoeleka; kazi ya uchanganuzi wa hisia kwenye lugha ya mapokeo ya simulizi inaweza kufanywa vyema zaidi kuanzia kwenye sauti.
- **Je, muundo huo upo katika umbo linaloweza kutumika kwa lugha yako (au lugha zako) lengwa**, au "ukusanyaji" unamaanisha "uundaji": kurekodi au kuandika vitu ambavyo bado havipo popote?
- **Nani anaweza kutoa muundo huu?** Maandishi wakati mwingine yanaweza kupatikana kutoka kwa watu ambao hawazungumzi lugha vizuri (kikwanguaji (scraper) hakihitaji kusoma Kihausa ili kupakua ukurasa wa wavuti wa Kihausa); ukusanyaji wa sauti na video karibu kila mara unahitaji wazungumzaji wazawa wakiwa chumbani au kwenye simu.
- **Kufeli kunaonekanaje kwa muundo huu?** Kwa maandishi, ni kimya: faili lililowekewa lebo kimakosa au kutafsiriwa na mashine linaonekana sawa na data halisi hadi mtu akague. Kwa sauti, kufeli mara nyingi ni kwa sauti kubwa na kunaonekana (ubora mbaya wa kurekodi, lahaja isiyo sahihi) lakini ni vigumu zaidi kurekebisha baada ya tukio.

Fanya uamuzi sahihi wa muundo na sehemu iliyosalia ya sura hii (vyanzo, kukwangua data, API) inakuwa orodha ya chaguzi. Ukikosea, hakuna kiasi chochote cha zana nzuri baadaye kitakachorekebisha mpango wa ukusanyaji uliojengwa kwenye aina mbaya ya data.
