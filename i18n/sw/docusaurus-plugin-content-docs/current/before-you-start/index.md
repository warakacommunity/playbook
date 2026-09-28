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

# Kabla Hujanza {#before-you-start}

Wakati mwingine timu hutumia miezi kadhaa kukusanya data ambayo tayari ipo. Timu inaweza kukusanya data ya hisia (sentiment data) ya Kihausa ambayo [AfriSenti](https://arxiv.org/abs/2302.08956) tayari inashughulikia, au kuweka lakabi (annotate) kwenye nomino za pekee (named entities) za Kiyoruba kabla ya kugundua [MasakhaNER 2](https://arxiv.org/abs/2210.12391).

Hili hutokea kwa sababu seti za data (datasets) za lugha za Kiafrika ni ngumu kupatikana, na lugha hiyo hiyo mara nyingi huonekana chini ya majina na kodi tofauti. Kwa mfano, Kiswahili kina angalau kodi tatu zinazotumika sana:

- `sw`: kodi ya herufi mbili ya ISO 639-1.
- `swa`: kodi ya ISO 639-3 kwa Kiswahili kama lugha kuu (macrolanguage), inayojumuisha lahaja zake zote.
- `swh`: kodi ya ISO 639-3 kwa Kiswahili cha Pwani (Sanifu) pekee.

Zote tatu zinamaanisha Kiswahili, lakini kompyuta inazichukulia kama lebo tatu tofauti, na miradi haikubaliani ni ipi itumike. Vigezo vya tathmini (benchmarks) vya Masakhane (AfriMMLU, AfriXNLI, AfriMGSM) vinatumia `swa`. FLORES na Belebele zinatumia `swh`. Seti nyingi za data za Hugging Face na kopasi (corpora) zilizokusanywa kutoka kwenye wavuti zinatumia `sw`. Ikiwa unatafuta kodi moja, unakosa data iliyohifadhiwa chini ya kodi nyingine.

Orodha kamili ya seti za data za lugha za Kiafrika haingetatua hili, kwa sababu seti mpya za data hujitokeza kila mwezi na hakuna orodha inayobaki kuwa ya kisasa kwa muda mrefu. Badala yake, sura hii inaelezea hatua nne za kuchukua kabla ya kuanza kuunda: tafuta kile kilichopo, angalia kama kinakidhi mahitaji yako, amua kama utatumia tena, utapanua, au utaunda, na jifunze kutoka kwa watu walioitengeneza.

## Hatua ya 1: Tafuta kazi zilizotangulia {#step-1-search-for-prior-work}

Tafuta lugha yako na kazi (task) kwa pamoja (kwa mfano, "Hausa sentiment") ili kupata seti za data unazoweza kutumia tena kama zilivyo. Panga saa chache kwa ajili ya utafutaji huu, na uweke kumbukumbu unapoendelea.

**Sehemu za kuanzia kutafuta:**

- **[ACL Anthology](https://aclanthology.org/)**: hifadhi kuu ya makala za utafiti za NLP, kutoka kwenye makongamano makubwa, majarida, na warsha. Tafuta lugha yako na kazi, kisha angalia kila makala kwa seti ya data iliyotolewa. Kwa utafutaji mkubwa na wa kimfumo, [kifurushi cha Python](https://aclanthology.org/faq/api/) cha Anthology (`pip install acl-anthology`) kinakupa metadata ya kila makala ili uweze kuchuja mwenyewe.
- **[Lanfrica](https://lanfrica.com/)**: orodha inayosahihishwa mara kwa mara ya rasilimali za lugha za Kiafrika, ikijumuisha seti za data, miundo (models), na makala.
- **[AtlasNLP](https://lit.eecs.umich.edu/AtlasNLP/)**: ramani ya zaidi ya seti za data 13,000 za NLP zilizoelezewa kwenye makala za ACL Anthology, ambazo unaweza kuzichuja kwa kazi, lugha, na nchi. Itumie kuona ni seti zipi za data tayari zipo kwa ajili ya lugha au nchi yako.
- **[Seti za data za Hugging Face, zilizochujwa kwa lugha](https://huggingface.co/datasets?language=swa)**: badilisha `swa` na kodi ya lugha yako (`hau` Kihausa, `yor` Kiyoruba, `amh` Kiamhari, `zul` Kizulu). Ongeza kichujio cha kazi, kama vile `text-classification`, ili kupunguza matokeo.
- **[Kumbukumbu za warsha ya AfricaNLP](https://aclanthology.org/venues/africanlp/)**: makala kutoka kwenye warsha ya kila mwaka ya NLP ya lugha za Kiafrika. Pitia mwaka wa hivi karibuni ili kuona kipi ni kipya.
- **Google Scholar na [arXiv](https://arxiv.org/list/cs.CL/recent)**: kazi mpya mara nyingi huonekana hapa kwanza. Unganisha lugha yako, kazi, na kipindi cha tarehe, kwa mfano `"Hausa" sentiment dataset 2023..2026`.

**Jinsi ya kutafuta vizuri:**

- **Jaribu kila jina na kodi inayotumiwa na lugha hiyo**: jina lake la Kiingereza, jina lake lenyewe, tahajia mbadala, na kodi zake zote za ISO (kwa Kiswahili: `sw`, `swa`, na `swh`). Makala za zamani zinaweza kutumia majina ambayo jamii haitumii tena.
- **Tafuta lugha zinazohusiana pia.** Seti ya data ya lugha inayohusiana kwa karibu bado inaweza kukupa miongozo, seti ya lebo, au mahali pa kuanzia.
- **Uliza.** Chapisha swali fupi kwenye jamii ya [Masakhane](https://www.masakhane.io/) au kikundi maalum cha lugha: *"Kuna yeyote anayejua data ya X kwa ajili ya Y?"* Kazi nyingi hazijachapishwa au ni ngumu kupatikana.

**Weka kumbukumbu rahisi** ya kila kitu unachokipata: jina, kiungo, kazi, lugha, ukubwa, leseni, na kama miongozo ilitolewa. Utaihitaji kwa ajili ya Hatua ya 2, na inakuwa sehemu ya kazi zinazohusiana (related-work section) kwenye makala yako mwenyewe.

:::tip[Kiolezo: Rekodi ya utafutaji wa seti ya data]
Rekodi ya kujaza inayofuata hatua nne kwenye ukurasa huu: majina na kodi za lugha yako, kila utafutaji uliofanya, alama ya Kufaulu (Pass), Kiasi (Partly), au Kufeli (Fail) kwa kila seti ya data dhidi ya orodha ya ukaguzi ya Hatua ya 2, uamuzi wako wa Hatua ya 3, na watu uliowasiliana nao. [Fungua kiolezo cha rekodi ya utafutaji wa seti ya data](/sw/templates/search-log) au [kipakue kama waraka wa Word](pathname:///downloads/templates/dataset-search-log.docx).
:::

## Hatua ya 2: Tathmini kile unachokipata {#step-2-judge-what-you-find}

Angalia kila seti ya data unayoipata dhidi ya orodha hii:

- **Leseni (Licence).** Je, inaruhusu matumizi yako? Seti nyingi za data za lugha za Kiafrika hutolewa kwa matumizi yasiyo ya kibiashara pekee (CC BY-NC).
- **Upatikanaji (Access).** Je, unaweza kuipakua leo, au "inapatikana kwa maombi" kutoka kwa mwandishi ambaye hajibu tena? Je, unaangalia toleo la hivi karibuni?
- **Ufaafu (Fit).** Je, inalingana na aina ya lugha yako, lahaja, hati, na uwanja (domain)? Matini ya habari haiwezi kusimama badala ya mitandao ya kijamii au mazungumzo ya kawaida.
- **Lebo (Labels).** Je, seti ya lebo ni sahihi kwa kazi yako, au utahitaji kuweka lebo upya?
- **Mgawanyo (Splits).** Je, data imegawanywa katika seti maalum za mafunzo (training), uendelezaji (development), na majaribio (test), ili matokeo yaweze kulinganishwa kwenye makala mbalimbali? Ikiwa seti ya majaribio ipo wazi kwa umma, miundo mikubwa ya lugha (large language models) inaweza kuwa imefunzwa kwayo, jambo ambalo hufanya alama zake kuonekana bora kuliko zilivyo.
- **Miongozo (Guidelines).** Je, miongozo ya uwekaji lakabi (annotation guidelines) ilitolewa? Unaweza kutumia tena miongozo mizuri hata kama huwezi kutumia data.
- **Ubora (Quality).** Nani aliweka lakabi: wazungumzaji wazawa au wafanyakazi wa mtandaoni (crowd workers)? Je, makubaliano kati ya waweka lakabi (inter-annotator agreement) yameripotiwa? Hupima ni mara ngapi waweka lakabi walichagua lebo sawa, na makubaliano ya chini ni dalili ya onyo.
- **Nyaraka (Documentation).** Je, kuna karatasi ya data (datasheet) au kadi ya data: waraka unaoelezea jinsi data ilivyokusanywa na kile inachokijumuisha? Je, idhini (consent) imeelezewa?

Seti ya data inayofeli ukaguzi kadhaa kati ya hizi bado inaweza kuwa na thamani ya kusomwa, hata kama huwezi kuijengea.

## Hatua ya 3: Tumia tena, panua, au unda {#step-3-reuse-extend-or-build}

Tumia kumbukumbu zako kutoka Hatua ya 1 na 2 kuchagua cha kufanya. Tafuta safu mlalo (row) inayolingana na kile ambacho utafutaji wako ulileta na jinsi ilivyofanya dhidi ya orodha ya ukaguzi ya Hatua ya 2, kisha fuata safu hiyo kwenda mbele.

<div className="decision-table">

| Ulichokipata | Chaguo lako | Cha kufanya |
| --- | --- | --- |
| Seti ya data kwa ajili ya lugha na kazi yako ambayo **inafaulu** ukaguzi wa Hatua ya 2 | **Itumie tena** | Usiunde mpya. Tumia juhudi zako kwenye kile ambacho bado kinakosekana, kama vile tathmini, uwanja mpya, au utekelezaji (deployment). |
| Seti ya data kwa ajili ya lugha na kazi yako ambayo inafaa **kiasi** (uwanja usio sahihi, lebo zinazokosekana, au lahaja tofauti) | **Ipanue** | Ongeza uwanja, lebo, au lahaja inayokosekana. Tumia tena miongozo ya awali, weka mgawanyo wako wa data uendane na wao, na uwaambie waandishi wa awali. |
| Seti ya data kwa ajili ya lugha na kazi yako ambayo **inafeli** ukaguzi (leseni isiyoweza kutumika, ubora duni, au haipatikani) | **Unda mpya, ukijifunza kutoka kwa ile ya zamani** | Soma makala na miongozo yake kabla ya kuanza, na ueleze kwenye nyaraka zako kwa nini hukuweza kuitumia tena. |
| Seti ya data kwa ajili ya **lugha inayohusiana** pekee, au kwa ajili ya lugha yako kwenye **kazi inayohusiana** | **Azima, kisha unda kwa udogo** | Azima miongozo na seti yake ya lebo. Jaribu [uhamishaji kati ya lugha (cross-language transfer)](/cross-language-transfer) kwanza, kisha unda seti ndogo ya tathmini yenye ubora wa juu katika lugha yako. |
| **Hakuna** kinachohusiana | **Unda kuanzia mwanzo** | Anza na sura ya [kuingiza lugha za mkia mrefu (long-tail language onboarding)](/long-tail-language), kisha [Ukusanyaji wa Data](/data-collection/Overview), [Usanifu wa Uwekaji Lakabi](/annotation-design/annotation-task-design), na [Ubora wa Data](/data-quality). |

</div>

Ikiwa zaidi ya safu mlalo moja inahusika, chagua iliyo karibu zaidi na juu. Kutumia tena au kupanua data kwa kawaida hugharimu chini ya kuiunda.

## Hatua ya 4: Jifunze kutoka kwa watu walioiunda {#step-4-learn-from-the-people-who-built-it}

Makala huelezea kile kilichofanya kazi. Ni nadra kuelezea kile kilichoenda vibaya, kile kilichochukua muda mrefu kuliko ilivyopangwa, au kile ambacho timu ingebadilisha.

**Soma kwanza**, kwa mtiririko huu: sehemu ya mapungufu ya makala, miongozo ya uwekaji lakabi, karatasi ya data, na masuala yaliyo wazi (open issues) kwenye hifadhi (repository) yake.

**Kisha wasiliana na waandishi.** Wengi wanafurahi kusaidia. Uliza maswali maalum:

- Ungefanya nini tofauti ikiwa ungeanza tena?
- Nini kilichukua muda mrefu au kugharimu zaidi ya ulivyotarajia?
- Uliajirije, ulifunzaje, na uliwalipaje waweka lakabi?
- Kuna chochote ulichokusanya lakini hukutoa?
- Je, ungependa kushirikiana kwenye upanuzi?

**Kisha ipitishe kwa wengine.** Mradi wako utakapokamilika, andika kile ulichojifunza ukitumia [kiolezo cha tathmini ya nyuma (retrospective template)](/sw/case-studies/retrospective-template) na ukiongeze kwenye [Uchunguzi Kifani (Case Studies)](/sw/case-studies/).

## Mifano iliyofanyiwa kazi {#worked-examples}

Kurasa tatu hapa chini zinatumia hatua hizi nne kwenye kazi halisi, zikitumia seti za data zinazojulikana sana kama mifano. Ikiwa lugha au kazi yako inakosekana, itafute ukitumia Hatua ya 1.

- [Utambuzi wa Nomino za Pekee (Named Entity Recognition)](/sw/before-you-start/ner): kazi iliyoshughulikiwa vizuri, ambapo jibu la kawaida ni kutumia tena au kupanua.
- [Uchambuzi wa hisia (Sentiment analysis)](/sw/before-you-start/sentiment): ambapo uwanja na utamaduni huamua kama data iliyopo inafaa.
- [Matamshi ya chuki na usalama wa maudhui (Hate speech and content safety)](/sw/before-you-start/hate-speech): ambapo lazima pia uwalinde waweka lakabi na watumiaji.

Kila ukurasa unaonyesha tarehe ulipopitiwa mara ya mwisho. Seti mpya za data zinaweza kuwa zimejitokeza tangu wakati huo.
