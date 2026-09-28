---
title: Usimamizi wa Mradi
ready: true
last_update:
  date: 2026-09-26
  author: Shamsudddeen Hassan Muhammad
translation_status: machine
source_hash: f5df8e4cfff4
translated_at: 2026-09-28
---

# Usimamizi wa Mradi {#project-management}

Setidata (dataset) ya lugha ya Kiafrika kwa kawaida hujengwa na timu ndogo iliyotawanyika: watafiti, waweka lakabi (annotators) wazawa wa lugha, na watu wa kujitolea wanaofanya kazi kwa muda katika nchi kadhaa, kanda za saa, na lugha, mara nyingi kwa ruzuku ndogo. Mradi wa tafsiri ya mashine (machine translation) wa Masakhane, kwa mfano, uliandikwa na waandishi 49 kote Afrika na kwingineko, ambao waliratibu kazi zao karibu kabisa mtandaoni ([Nekoto et al., 2020](/sw/references#nekoto-2020)).

Miradi kama hii hufeli kwa sababu ambazo hazihusiani sana na data yenyewe. Katika utafiti wa wataalamu 53 wa AI nchini India, Afrika Mashariki na Magharibi, na Marekani, asilimia 92 waliripoti angalau "mporomoko wa data (data cascade)" mmoja: tatizo lililoanzishwa mapema, katika jinsi data ilivyoainishwa upeo wake, kukusanywa, au kuwekewa lakabi, ambalo lilibaki limejificha hadi liliposababisha uharibifu wa gharama kubwa baadaye ([Sambasivan et al., 2021](/sw/references#sambasivan-2021)). Matatizo mengi kati ya haya huanza na maamuzi ya mipango. Sura hii inapitia maamuzi hayo kwa mpangilio utakaokumbana nao.

## 1. Ainisha upeo wa mradi {#1-scope-the-project}

Makosa yanayofanywa kabla ya ukusanyaji ndiyo yenye gharama kubwa zaidi, kwa sababu kila hatua ya baadaye huyarithi.

**Kagua kile ambacho tayari kipo.** Kabla ya kupanga setidata mpya, fuata hatua nne katika [Kabla Hujanza](/sw/before-you-start/). Unaweza kutumia tena au kupanua setidata iliyopo, jambo ambalo hubadilisha mpango mzima.

**Andika lengo na jinsi utakavyojua umemaliza.** "Setidata ya hisia ya sentensi 5,000 za Kiyoruba, waweka lakabi watatu kwa kila kipengee, makubaliano kati ya waweka lakabi (inter-annotator agreement) zaidi ya 0.6, itakayotolewa chini ya CC BY 4.0 ifikapo Desemba" ni lengo ambalo unaweza kulipangia. "Kuboresha NLP ya Kiyoruba" si lengo. Lengo thabiti huweka kiwango, bajeti, na hatua ya kuishia, na huzuia mradi kukua hadi kuishiwa pesa au watu wa kujitolea.

**Taja lugha kwa usahihi:** lugha, hati, lahaja ya kikanda, na rejista. Kiswahili kilichokusanywa kutoka kwenye habari za Tanzania hakiwezi kubadilishana na Kiswahili cha mitandao ya kijamii cha Kenya, na modeli iliyofunzwa kwa kimoja itafanya vibaya kwa kingine. Lugha moja iliyofanywa vizuri kwa kawaida ni bora kuliko tatu zilizofanywa vibaya. Miradi ya lugha nyingi inawezekana, lakini kwanza ni matatizo ya uratibu: MasakhaNER 2 ilifikia lugha 20 kwa kuendesha kila lugha kama timu yake ndogo chini ya itifaki ya pamoja ([Adelani et al., 2022](/sw/references#adelani-2022)).

**Amua kiwango, muundo (modality), na jukumu (task) kwa pamoja**, kwa sababu vinategemeana: kiasi gani cha data, katika umbo gani (maandishi, sauti, au picha), na kwa lakabi zipi. Pima ukubwa wa mradi kulingana na timu na bajeti uliyonayo. Setidata ndogo, safi, na iliyowekewa nyaraka vizuri ina thamani zaidi kuliko kubwa yenye makosa mengi, na matatizo ya ubora ni mabaya zaidi katika makusanyo makubwa yaliyochukuliwa mtandaoni kwa lugha zenye rasilimali chache ([Kreutzer et al., 2022](/sw/references#kreutzer-2022)).

**Rekodi maamuzi haya katika mkataba wa mradi (project charter)**, na ushiriki na timu nzima pamoja na mfadhili wako.

:::tip[Kiolezo: Mkataba wa mradi]
Hati ya kujaza inayorekodi madhumuni ya mradi, wabia, lugha, data, leseni, timu, ratiba, bajeti, utawala, na maadili, ikiwa na sehemu ya saini kwa kila mbia. [Fungua kiolezo cha mkataba wa mradi](/sw/templates/project-charter).
:::

## 2. Tatua masuala ya maadili, idhini, na sheria mapema {#2-settle-ethics-consent-and-the-law-early}

Hatua hizi huchukua muda mrefu kuliko timu nyingi zinavyotarajia, na lazima zikamilishwe kabla hujakusanya data yoyote. Idhini (consent) haiwezi kuongezwa kwenye data ambayo tayari umekusanya.

- **Idhini ya maadili.** Ikiwa unafanya kazi katika chuo kikuu, kwa kawaida utahitaji idhini kutoka kwa kamati ya maadili ya utafiti kabla ya kukusanya data kutoka kwa watu. Ukaguzi unaweza kuchukua wiki au miezi, hivyo omba mara tu upeo unapowekwa wazi.
- **Sheria ya ulinzi wa data.** Nchi nyingi za Kiafrika sasa zina sheria za ulinzi wa data, ikiwa ni pamoja na Afrika Kusini (POPIA), Kenya (Data Protection Act, 2019), na Nigeria (Nigeria Data Protection Act, 2023). Kagua sheria katika kila nchi unayokusanya data au kuihifadhi, hasa ikiwa data itavuka mipaka.
- **Idhini na leseni.** Amua jinsi utakavyoomba idhini na ni leseni gani utaitoa chini yake kabla ya ukusanyaji kuanza. Leseni unayotaka mwishoni huweka kikomo cha data unayoweza kukusanya mwanzoni.

Sura za [Sheria, idhini, na haki miliki ya jamii](/sw/legal-consent/) na [Utawala wa Data](/sw/data-governance/) zinaelezea haya kwa kina.

## 3. Panga kazi {#3-plan-the-work}

**Jenga ratiba kuanzia nyuma** kutoka tarehe yako ya kutolewa, kupitia hatua ambazo lazima zifanyike kwa mpangilio: miongozo, majaribio ya awali (pilot), marekebisho, uwekaji lakabi mkuu, udhibiti wa ubora, uwekaji nyaraka, na utoaji.

**Fanya majaribio ya awali kwanza.** Weka lakabi vipengee 50 hadi 200 na waweka lakabi wako halisi na miongozo yako halisi kabla ya kutumia bajeti kamili. Majaribio ya awali hukuonyesha maagizo yasiyoeleweka, kesi ngumu, na kutokubaliana wakati bado ni rahisi kurekebisha. Pia inakupa kiwango kilichopimwa cha uwekaji lakabi (vipengee kwa saa) ili kupanga ratiba iliyosalia.

**Fanya uamuzi wa kuendelea/kutoendelea baada ya majaribio ya awali.** Kubalianeni kuhusu vigezo mapema, kwa mfano:

- Je, makubaliano kati ya waweka lakabi yako karibu na lengo lako?
- Je, miongozo ilijibu maswali mengi ya waweka lakabi?
- Kwa kiwango kilichopimwa, je, setidata kamili inatosheleza bajeti na ratiba?

Ikiwa jibu la mojawapo ya haya ni hapana, rekebisha miongozo au upeo na ufanye majaribio ya awali tena. Usipanue muundo ambao haufanyi kazi.

**Heshimu mpangilio wa hatua zinazotegemeana.** Miongozo lazima iwe thabiti kabla ya uwekaji lakabi mkuu kuanza, la sivyo utaweka lakabi upya. Idhini ya maadili na idhini ya washiriki lazima ziwepo kabla ya ukusanyaji.

**Panga kulingana na kalenda.** Waweka lakabi wengi ni wanafunzi au wana kazi nyingine. Mitihani, sikukuu za kitaifa na za kidini, vipindi vya kufunga, chaguzi, na misimu ya mvua yote hubadilisha nani anapatikana na lini. Weka tarehe hizi katika mpango na uongeze muda wa ziada.

## 4. Panga bajeti na fadhili kazi {#4-budget-and-fund-the-work}

**Kadiria gharama ya uwekaji lakabi kwanza**, kwa sababu kwa kawaida ndiyo gharama kubwa zaidi kwa miradi ya maandishi:

> idadi ya vipengee × waweka lakabi kwa kila kipengee × muda kwa kila kipengee × kiwango cha malipo kwa saa

Kisha ongeza muda wa ukaguzi na uamuzi (adjudication), na wa uratibu. Kwa mfano, vipengee 5,000 vyenye waweka lakabi watatu kwa dakika moja kwa kila kipengee ni saa 250 za waweka lakabi kabla ya ukaguzi wowote. Tumia kiwango ulichopima katika majaribio ya awali, si makisio. Ukurasa wa [Upangaji wa Gharama na Rasilimali](/sw/data-collection/cost-resource-planning) unaelezea ukadiriaji kwa kina zaidi.

**Panga bajeti kwa gharama ambazo ni rahisi kusahaulika:**

- Bando la intaneti na muda wa maongezi kwa waweka lakabi wanaofanya kazi kwenye simu zao wenyewe.
- Vifaa, vifaa vya kurekodia, na hifadhi kwa miradi ya sauti na picha.
- Ada za miamala ya malipo, hasa kwa malipo yanayovuka mipaka.
- Muda wa uratibu kwa kiongozi wa mradi na viongozi wa lugha.
- Fungu la akiba ya dharura (contingency) kwa uwekaji lakabi upya na kwa waweka lakabi wanaoacha kazi.

**Lipa waweka lakabi kwa haki na kwa wakati.** Waweka lakabi ni wachangiaji wenye ujuzi. Weka kiwango cha wazi kulingana na viwango vya kitaalamu vya ndani badala ya viwango vya chini kabisa vya kimataifa vya kutumia umati (crowdsourcing), na mkubaliane kabla kazi haijaanza. Pesa za simu (M-Pesa, MTN MoMo, Airtel Money) mara nyingi ndiyo njia rahisi zaidi ya kulipa: inawafikia watu wasio na akaunti za benki na inafika haraka. Malipo yaliyochelewa au yasiyoeleweka ni njia ya haraka zaidi ya kupoteza timu nzuri na kuharibu uaminifu kwa mradi unaofuata.

**Panga jinsi pesa inavyosonga kiuhalisia:**

- Pesa za ruzuku mara nyingi hupitia chuo kikuu au shirika, na malipo yanaweza kuchukua wiki au miezi kuwafikia waweka lakabi. Kubalianeni kuhusu mchakato wa malipo na ofisi yenu ya fedha kabla kazi haijaanza.
- Viwango vya ubadilishaji fedha hubadilika. Ikiwa ruzuku iko katika dola au yuro lakini unalipa kwa sarafu ya ndani, kagua bajeti kulingana na kiwango cha sasa kabla ya kila mzunguko wa malipo.
- Weka kumbukumbu ya kila malipo. Wafadhili wataiomba, na inakulinda wewe na waweka lakabi.
- Kagua sheria za kodi zinazotumika kwa malipo katika kila nchi.

**Tafuta ufadhili unaolenga uundaji wa setidata.** [Lacuna Fund](/sw/references#lacuna-fund), iliyoanzishwa mwaka 2020 na The Rockefeller Foundation, Google.org, na IDRC ya Kanada, inafadhili setidata za kujifunza kwa mashine (machine learning) katika mazingira yenye rasilimali chache, ikiwa ni pamoja na lugha za Kiafrika. Chaguzi nyingine ni pamoja na AI4D Africa, ushirikiano wa vyuo vikuu, na usaidizi wa vitu kama vile kompyuta au muda wa waweka lakabi. Jumuisha mpango wako wa usimamizi wa data na idhini katika pendekezo. Wafadhili wanazidi kutarajia hilo.

## 5. Jenga timu {#5-build-the-team}

Miradi mingi ina majukumu mengi kuliko watu, hivyo mtu mmoja mara nyingi hushikilia majukumu kadhaa. Jambo la msingi ni kwamba kila jukumu lina mmiliki aliyetajwa.

| Jukumu | Anawajibika kwa |
| --- | --- |
| **Kiongozi wa mradi** | Ratiba, bajeti, mawasiliano, na kutoa taarifa kwa mfadhili. |
| **Kiongozi wa lugha** (mmoja kwa kila lugha) | Miongozo, kesi ngumu, na ubora kwa lugha hiyo. Mamlaka ya mwisho kuhusu kile kilicho sahihi. |
| **Kiongozi wa kiufundi** | Zana ya uwekaji lakabi, mfumo wa data, hifadhi, na nakala za usalama. |
| **Kiongozi wa maadili na data** | Idhini ya maadili, kumbukumbu za idhini, ulinzi wa data, na utoaji leseni. |
| **Waweka lakabi** | Kuzalisha lakabi. |
| **Wakaguzi** | Kukagua ubora na kutatua kutokubaliana. |

Tenganisha uwekaji lakabi na ukaguzi, hata kama watu wanapokezana. Kukagua kazi yako mwenyewe huficha makosa unayohitaji sana kuyabaini. Kiongozi wa lugha kwa kila lugha, badala ya timu moja kuu inayoweka lakabi kila kitu, ndicho kilichoruhusu miradi ya Masakhane kufanya kazi katika lugha nyingi kwa wakati mmoja ([Nekoto et al., 2020](/sw/references#nekoto-2020)).

**Ajiri mapema.** Kupata wazawa wanaozungumza lugha kwa ufasaha mara nyingi ndicho kikwazo kigumu zaidi, hasa kwa lugha ndogo. Ipe ajira muda wake katika mpango. Sehemu nzuri za kutafuta ni pamoja na idara za lugha na isimu za vyuo vikuu, mashirika ya kijamii, na jamii zilizopo za utafiti kama vile [Masakhane](https://www.masakhane.io/). Waombe watahiniwa kuweka lakabi seti fupi ya majaribio kabla ya kuwaajiri, na mfunze kila mtu kuhusu miongozo kabla ya majaribio ya awali.

**Weka makubaliano kwa maandishi.** Kila mchangiaji anapaswa kuwa na makubaliano mafupi ya maandishi yanayojumuisha malipo, saa za kazi, jinsi data na kazi yao itakavyotumika, leseni, na jinsi watakavyotambuliwa.

**Kubalianeni kuhusu utambuzi mwanzoni.** Amua mapema nani atakuwa mwandishi kwenye makala, nani atatambuliwa, na jinsi waweka lakabi watakavyotajwa katika nyaraka za setidata. Utambuzi wa wazi na wa haki huwafanya watu wa kujitolea waendelee kushiriki, na huepusha migogoro wakati wa utoaji.

## 6. Ratibu na kufuatilia {#6-coordinate-and-track}

**Fanya kazi bila usawazishaji wa muda (asynchronously).** Timu zilizotawanyika, za muda zinahitaji zana rahisi zinazofanya kazi kwenye simu na kwenye mtandao dhaifu. Kwa miradi mingi, mambo matatu yanatosha:

- kifuatiliaji kimoja cha majukumu cha pamoja (lahajedwali inafaa);
- sehemu moja kwa ajili ya toleo la sasa la miongozo;
- njia moja iliyokubaliwa kwa ajili ya maswali, kama vile kundi la WhatsApp au Slack.

Andika maamuzi, kwa sababu watu wachache wako mtandaoni kwa wakati mmoja.

**Kagua namba chache kila baada ya wiki moja au mbili:**

- vipengee vilivyokamilika kulingana na mpango;
- makubaliano kati ya waweka lakabi;
- ni waweka lakabi wangapi wanafanya kazi;
- gharama kwa kila kipengee hadi sasa.

Kushuka kwa makubaliano kwa kawaida kunamaanisha miongozo inahitaji kurekebishwa, si kwamba waweka lakabi wanahitaji kusahihishwa. Waweka lakabi kuacha kazi kwa kawaida huashiria matatizo ya malipo, mzigo wa kazi, au maudhui yanayosumbua. Tatizo linalobainika katika wiki ya pili hugharimu kidogo sana kuliko lile linalopatikana wakati wa utoaji ([Sambasivan et al., 2021](/sw/references#sambasivan-2021)).

## 7. Dhibiti vihatarishi {#7-manage-risks}

Vihatarishi hivi hujitokeza katika karibu kila mradi wa data wa lugha ya Kiafrika:

| Kihatarishi | Dalili ya mapema ya onyo | Nini cha kufanya |
| --- | --- | --- |
| **Waweka lakabi kuacha kazi** | Vipengee vichache kwa wiki; majibu ya polepole | Weka ratiba halisi, lipa kwa wakati, na ajiri kundi kubwa kidogo kuliko unalohitaji. |
| **Mkengeuko wa miongozo** | Makubaliano hushuka kadiri muda unavyoenda | Weka miongozo katika matoleo, na kagua tena waweka lakabi kwenye vipengee vya pamoja mara kwa mara. |
| **Malipo kuchelewa** | Ofisi ya fedha haijathibitisha mchakato | Kubalianeni kuhusu mchakato wa malipo kabla kazi haijaanza, na weka kiasi kidogo cha fedha taslimu kwa malipo ya dharura ikiwa shirika lako linaruhusu. |
| **Mabadiliko ya sarafu** | Sarafu ya ndani inashuka dhidi ya sarafu ya ruzuku | Kagua tena bajeti kabla ya kila mzunguko wa malipo, na weka fungu la akiba ya dharura. |
| **Kukatika kwa mtandao na umeme** | Waweka lakabi wanakosa tarehe za mwisho katika kanda moja | Chagua zana zinazofanya kazi nje ya mtandao au kwenye mtandao dhaifu, na ugharamie gharama za bando la intaneti. Kufungiwa kwa intaneti na serikali kumetokea katika nchi kadhaa, hivyo panga kwa ajili ya mapengo. |
| **Ufadhili au zana kutoweka** | Tarehe ya mwisho ya ruzuku inakaribia; zana inabadilisha bei yake | Weka nakala zako mwenyewe za data ghafi zote na zilizohamishwa, na epuka kutegemea huduma moja. |
| **Madhara kwa waweka lakabi** | Waweka lakabi wanaruka vipengee au kuacha kazi baada ya mafungu nyeti | Watahadharishe waweka lakabi kuhusu maudhui nyeti, waruhusu kujiondoa, punguza mfiduo, na kagua data kabla ya utoaji. |

## 8. Toa na kukabidhi {#8-release-and-hand-over}

**Panga utoaji tangu mwanzo.** Amua wapi setidata itahifadhiwa, chini ya leseni gani, jinsi matoleo yatakavyopewa namba, na nani atajibu maswali na kurekebisha makosa baada ya ruzuku kuisha. Sura ya [Uwekaji Nyaraka](/sw/documentation/documentation) inaeleza jinsi ya kuandika karatasi ya data kwa ajili ya utoaji.

**Chukulia kwamba mtu mwingine atamaliza mradi.** Wanachama wa timu huhitimu, kubadilisha kazi, au kuishiwa muda. Weka miongozo, mpangilio (schema), kumbukumbu za idhini, na hati za uchakataji katika hifadhi (repository) ya pamoja, si kwenye kompyuta mpakato ya mtu mmoja. Hii inamruhusu mtu anayefuata kuendeleza kazi, na inakuruhusu kuonyesha data ilitoka wapi miaka kadhaa baadaye.

**Andika kile ulichojifunza.** Mradi unapokwisha, rekodi kile kilichofanya kazi na kile ambacho hakikufanya kazi, ukitumia [kiolezo cha tathmini ya nyuma](/sw/case-studies/retrospective-template). Inasaidia timu inayofuata kupanga vizuri zaidi kuliko ulivyoweza.

## Orodha ya ukaguzi kabla hujaanza {#checklist-before-you-start}

- [ ] Umetafuta setidata zilizopo ([Kabla Hujanza](/sw/before-you-start/)).
- [ ] Lengo, lahaja ya lugha, kiwango, na vigezo vya mafanikio vimeandikwa katika mkataba wa mradi.
- [ ] Idhini ya maadili na mahitaji ya ulinzi wa data yametambuliwa, pamoja na muda katika mpango.
- [ ] Mchakato wa idhini na leseni ya utoaji imeamuliwa.
- [ ] Majaribio ya awali yamepangwa, na vigezo vya kuendelea/kutoendelea vimekubaliwa.
- [ ] Bajeti imejengwa kutoka kwa kiwango kilichopimwa, ikijumuisha gharama zilizojificha na akiba ya dharura.
- [ ] Mchakato wa malipo umekubaliwa na ofisi yako ya fedha.
- [ ] Kila jukumu lina mmiliki aliyetajwa.
- [ ] Makubaliano ya maandishi na sera ya utambuzi kwa wachangiaji wote.
- [ ] Mpango wa utoaji, uhifadhi, na matengenezo upo tayari.

:::note[Jinsi hii inavyoungana]
Maamuzi katika sura hii huandaa [Ukusanyaji wa Data](/sw/data-collection/data-modalities), [Muundo wa Uwekaji Lakabi](/sw/annotation-design/annotation-task-design), na [Ubora wa Data](/sw/data-quality/), ambazo zinafuata.
:::
