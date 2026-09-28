---
sidebar_position: 2
slug: /introduction
ready: true
last_update:
  date: 2026-09-27
  author: Shamsuddeen Hassan Muhammad
translation_status: machine
source_hash: 93748695704e
translated_at: 2026-09-28
---

# Utangulizi {#introduction}

:::tip[Changia]
Mwongozo huu ni wa chanzo wazi (open source) na unamilikiwa na jamii. Huhitaji kuandika sura nzima ili kusaidia. Kusahihisha kosa, kutafsiri ukurasa, au kushiriki kile kilichofanya kazi kwenye mradi halisi yote yanahesabika. Tazama [**Changia**](/sw/introduction/how-to-contribute).
:::

> Risasi ilikuwa njia ya ukandamizaji wa kimwili. Lugha ilikuwa njia ya ukandamizaji wa kiroho.
>
> Ngũgĩ wa Thiong'o, *Decolonising the Mind: The Politics of Language in African Literature* (1986)

Bara la Afrika lina takriban theluthi moja ya lugha hai duniani: takriban lugha 2,140 kati ya 7,160 zinazozungumzwa duniani ([Ethnologue, 2024](/sw/references#ethnologue-2024)). Nyingi kati ya hizo zimesalia nje ya uwezo wa mifumo ambayo sasa inaunda upya jinsi ulimwengu mwingine unavyosoma, kuandika, kutafuta, kutafsiri, na kuzungumza. Hata zile zinazoungwa mkono zaidi, kama vile Kiswahili, Kihausa na Kiamhari, ziko nyuma sana ya lugha zenye rasilimali nyingi (high-resource languages). Wakati modeli ya lugha (language model) inapoharibu Kiyoruba, Kichewa, au Kiwolof, chanzo mara nyingi si modeli bali ni data. Maandishi na sauti ambazo mifumo hii hujifunza kutoka kwayo hazipo sana katika umbo linaloweza kutumika.

[Joshi et al. (2020)](/sw/references#joshi-2020) wanapanga lugha za ulimwengu katika madaraja sita kulingana na wingi wa rasilimali walizonazo. Daraja la chini kabisa, *zilizoachwa nyuma* (*left-behinds*), ambazo kimsingi hazina data iliyowekewa lebo (labelled data) na zina matumaini madogo ya kuhudumiwa na mbinu za sasa, linashikilia idadi kubwa sana ya lugha, na lugha za Kiafrika zimejazana humo. Nyingi hazina kopasi iliyowekewa lakabi (annotated corpus), hazina kigezo cha tathmini (benchmark), hazina zana. Nyingi zina makumi ya mamilioni ya wazungumzaji. Kile zinachokosa ni data, kwa sababu karibu hakuna mtu aliyeiunda. Picha hii bado ni kweli, ingawa uwanja huu sasa unachukulia *rasilimali chache* (*low-resource*) kama jambo lenye vipimo vingi: suala la zana, wazungumzaji, ufadhili, na usaidizi wa kitaasisi sawa na data ghafi, bila ufafanuzi mmoja uliokubaliwa ([Ranathunga & de Silva, 2022](/sw/references#ranathunga-desilva-2022); [Nigatu et al., 2024](/sw/references#nigatu-2024)).

![Madaraja sita ya rasilimali za lugha ya Joshi et al., yaliyochorwa kulingana na kiasi cha data iliyowekewa lebo na isiyowekewa lebo ambayo kila moja inayo. Daraja la 0, zilizoachwa nyuma, linashikilia idadi kubwa sana ya lugha na liko chini kabisa likiwa na karibu hakuna data; Lugha za Kiafrika zimejazana katika madaraja ya 0 na 1. Madaraja yenye rasilimali bora yanashikilia lugha chache tu kila moja.](../../../../../docs/1_introduction/images/africanlp-language-classes.svg)

## Kukwangua (scraping) hakutatatua hili {#scraping-will-not-fix-this}

Wakati lugha haina data, silika ni kwenda na kukwangua (scrape) zaidi: kutambaa (crawl) sehemu pana zaidi ya wavuti na kuamini kwamba uwakilishi utafuata. Kwa lugha za Kiafrika, silika hiyo inashindwa.

Wavuti haina maandishi mengi ya lugha za Kiafrika, na yale iliyomo ni machache na yenye makosa (noisy). Wakati [Kreutzer et al. (2022)](/sw/references#kreutzer-2022) walipokagua data kubwa za lugha nyingi zilizokusanywa kutoka kwenye wavuti (multilingual crawls) ambazo kila mtu anatumia kufunza modeli, waligundua kuwa kwa lugha nyingi zenye rasilimali chache, sehemu kubwa ya data ilikuwa imewekewa lebo kimakosa, ilitafsiriwa na mashine, au haikuwa lugha kabisa. Mwishoni mwa orodha, ubora unaporomoka pamoja na wingi.

Njia pekee ya uhakika ya kupata data yenye ubora wa juu kwa lugha za Kiafrika ni kuiunda pamoja na watu wanaozizungumza, watu wanaojua maneno, sarufi, nahau, na utamaduni. Moja ya vikwazo vikuu katika AfricaNLP ni kwamba watu wanaozungumza lugha hizi si wale wanaounda data. Watu wanaoiunda mara nyingi hawawezi kutambua kipi ni sahihi, kipi kinachukiza, au kipi kinakosekana. Hawajui ni nini muhimu kwa jamii zilizo nyuma ya lugha hiyo, au jinsi ya kuzuia data wanayokusanya isilete madhara.

Pengo hilo lina matokeo halisi. Data iliyoundwa bila wazungumzaji wake inaweza kuonekana safi huku ikiwa na makosa yaliyojificha, na modeli yoyote inayofunzwa kwayo hurithi kila kosa. Makosa kama hayo husambaa kwenye matokeo ya utafutaji, tafsiri, na zana za kila siku ambazo mamilioni ya watu wanaanza kuzitegemea. Kupata data sahihi huamua ikiwa lugha inahudumiwa vizuri, inahudumiwa vibaya, au inaachwa kabisa nje ya zana hizi.

Mwongozo huu unahusu jinsi ya kutatua tatizo hilo. Ni mwongozo wa vitendo, wenye msimamo, na wa hatua kwa hatua wa kuunda seti za data (datasets) zenye ubora wa juu kwa lugha za Kiafrika, ukitegemea uzoefu wa moja kwa moja wa watu wanaozizungumza na kuzielewa. Mwongozo huu umeundwa na watu wanaozijua lugha hizo, kwa ajili ya watu wanaotaka kuunda seti za data kwa ajili yao. Unahusu jinsi ya kufanya kwa usahihi, na jinsi ya kufanya kwa usalama.

## Uwanja unakua, data haiendi sambamba {#the-field-is-growing-the-data-is-not-keeping-up}

Katika miongo miwili iliyopita, AfricaNLP imekua kutoka kuwa eneo dogo la kuvutia hadi kuwa uwanja ulioimarika. Uzalishaji wa tafiti umekua zaidi ya mara kumi, kutoka takriban makala 20 kwa mwaka mnamo 2006 hadi karibu 300 mnamo 2024 ([Belay et al., 2025](/sw/references#belay-2025)).

![Makala na waandishi wa AfricaNLP walikua takriban mara kumi na nne kati ya 2006 na 2024.](../../../../../docs/1_introduction/images/africanlp-growth.svg)

Lakini makala nyingi zaidi hazijamaanisha data zaidi. Zaidi ya nusu ya kazi hizi zinapendekeza mbinu mpya, huku takriban mchango mmoja tu kati ya mitano ukianzisha seti mpya ya data ([Belay et al., 2025](/sw/references#belay-2025)). Tunazidi kuwa bora katika kuunda modeli kwa kasi zaidi kuliko tunavyounda data ambazo zinajifunza kutoka kwayo.

![Mbinu zinaunda asilimia 53 ya michango ya AfricaNLP; seti mpya za data asilimia 21 tu.](../../../../../docs/1_introduction/images/africanlp-contributions.svg)

Mbinu na seti za data haziundwi kwa njia sawa. Mbinu mara nyingi inaweza kutumika tena katika lugha mbalimbali; seti ya data inapaswa kuundwa kwa kila lugha, kuanzia mwanzo, na watu wanaoizungumza. Hiyo inamaanisha kuajiri waweka lakabi (annotators), kuandika miongozo, kuendesha udhibiti wa ubora, na kupata idhini. Ni kazi ya polepole, isiyo na mvuto, na mara chache hufadhiliwa, hasa kwa lugha za Kiafrika.

Mwongozo huu upo ili kurahisisha kazi hiyo. Unapitia kila hatua ya kuunda seti ya data: kuamua nini cha kukusanya, kusanifu uwekaji lakabi (annotation), kuangalia ubora, kuweka kumbukumbu (documenting), na kutoa (releasing). Umeandikwa kwa ajili ya mazingira halisi ya NLP ya lugha za Kiafrika: data chache, timu za lugha nyingi, ufadhili haba, na jamii ambazo zinapaswa kubaki kuwa wamiliki wa kile wanachosaidia kuunda.

## Kwa nini tuliandika mwongozo huu {#why-we-wrote-this-playbook}

Karibu kila mwongozo wa kuunda seti za data unachukulia kimyakimya uwepo wa Kiingereza, bajeti kubwa, na tatizo ambalo mtu fulani ameshalitatua mara moja. Mambo hayo hayatumiki sana unapoanza kuunda kopasi (corpus) kwa lugha isiyo na rasilimali za awali, timu ya watu wa kujitolea, na maamuzi ya kufanya ambayo machapisho hayajawahi kuyazungumzia.

AfriPlaybook ni mwongozo ambao tungetamani kuwa nao. Wengi wetu tulijifunza kuunda seti za data kwa lugha za Kiafrika kwa njia ngumu, kupitia majaribio na makosa, kukiwa na maandishi machache na watu wachache wa kuwauliza. Hiyo ni sehemu ya sababu kwa nini seti za data zimebaki nyuma sana ya mbinu. Mwongozo huu unakusanya kile tulichojifunza ili timu inayofuata iweze kuanza mapema, kuepuka makosa tuliyofanya, na kuunda data ambayo ulimwengu unaweza kuiamini na kuitumia tena.

Mwongozo utaendelea kukua kadiri jamii inavyoshiriki kile inachojifunza. Kadiri tunavyokusanya uzoefu wetu, ndivyo inavyokuwa rahisi zaidi kuunda data, na ndivyo seti za data zinavyoweza kwenda sambamba na mbinu mapema zaidi.

## Imeundwa kwa uwazi {#built-in-the-open}

Mwongozo huu ni wa chanzo wazi (open source), unaodumishwa na jamii ya Waraka, Masakhane, na watafiti wa AfricaNLP. Sio tu kwa ajili ya watafiti. Ni kwa ajili ya kila mtu anayeunda seti za data kwa lugha za Kiafrika: watu wa kujitolea, wanafunzi, waandaaji wa jamii, na wataalamu pia. Watu wanaounda seti za data wanajua vyema kile ambacho mwongozo kama huu unapaswa kusema, kwa hivyo ubora wake unategemea watu wanaouchangia. Kuna njia nyingi za kusaidia:

- **Andika** sura au sehemu inayojaza pengo.
- **Kagua** sura zilizopo: sahihisha kosa, boresha hoja, ongeza rejea.
- **Shiriki kifani (case study)** kutoka kwenye mradi halisi, ikijumuisha kile kilichoenda kombo.
- **Anzisha mjadala** unapokutofautiana na mbinu fulani. Kutokubaliana hufanya mwongozo kuwa bora zaidi.

Anza na [mwongozo wa kuchangia](https://github.com/warakacommunity/playbook/blob/main/README.md#ways-to-contribute), toa wazo katika [GitHub Discussions](https://github.com/warakacommunity/playbook/discussions), au jiunge nasi kwenye [Discord](https://discord.gg/ChNPHV2PPS). Ikiwa unaunda seti za data kwa lugha za Kiafrika, au unataka kujifunza jinsi ya kufanya hivyo, tayari wewe ni sehemu ya wale ambao mwongozo huu unawalenga. Njoo tuunde pamoja.

---

## Jinsi ya kunukuu mwongozo huu {#how-to-cite-this-playbook}

Ikiwa AfriPlaybook inaarifu utafiti, ufundishaji, au mradi wako, tafadhali inukuu.

**BibTeX:**

```bibtex
@misc{waraka2026playbook,
  author       = {{Waraka Community}},
  title        = {AfriPlaybook: A Practical Guide to Building High-Quality Datasets for African Languages},
  year         = {2026},
  publisher    = {Waraka Community},
  url          = {https://afriplaybook.waraka.org/},
  note         = {Open-source community resource}
}
```

**Maandishi ya kawaida (mtindo wa APA):**

> Waraka Community. (2026). *AfriPlaybook: A Practical Guide to Building High-Quality Datasets for African Languages*. [https://afriplaybook.waraka.org/](https://afriplaybook.waraka.org/)

Kwa miundo mingine (MLA, Chicago, n.k.) na [`CITATION.cff`](https://github.com/warakacommunity/playbook/blob/main/CITATION.cff) inayosomeka na mashine, tazama ukurasa wa [/cite](/cite).

Ikiwa unarejelea sura mahususi, tafadhali jumuisha jina la sura na URL yake.
