---
sidebar_position: 1
slug: /
ready: true
last_update:
  date: 2026-09-27
  author: Shamsuddeen Hassan Muhammad
translation_status: machine
source_hash: 2984c0a6353f
translated_at: 2026-09-28
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Karibu {#welcome}

<picture>
  <source media="(max-width: 600px)" srcSet={useBaseUrl('/img/cover/afriplaybook-cover-mobile.svg') + '?v=2026-09-26'} />
  <img className="no-zoom" src={useBaseUrl('/img/cover/afriplaybook-cover.svg') + '?v=2026-09-26'} alt="AfriPlaybook: mwongozo wa vitendo wa kuunda seti za data (datasets) zenye ubora wa juu kwa lugha za Kiafrika. Kitambaa kilichofumwa cha rangi ya indigo ambacho nyuzi zake zinaunda gridi ya data, kikiwa na alama za adire ya okeri na nguo ya matope kama seli zilizowekewa lakabi." width="1200" height="600" style={{width: '100%', height: 'auto'}} />
</picture>

Hii ni tovuti ya **AfriPlaybook**, mwongozo wazi wa kuunda seti za data (datasets) kwa ajili ya lugha za Kiafrika. Inafuatilia seti ya data kuanzia wazo la kwanza hadi kutolewa kwa umma: kuamua nini cha kukusanya na kutoka kwa nani, kusanifu kazi ya uwekaji lakabi (annotation), kuajiri na kuwalipa watu wanaoifanya, kukagua kazi yao, kuweka kumbukumbu za matokeo, na kuyachapisha ili wengine waweze kuendeleza kutoka hapo.

Afrika ni nyumbani kwa takriban theluthi moja ya lugha zote duniani, lakini nyingi kati ya hizo hazina maandishi na sauti ambazo teknolojia ya lugha inategemea. Sababu ni kwamba kuunda data nzuri ni kazi ghali, inayohitaji umakini, na ni watu wachache sana wanaofundishwa jinsi ya kuifanya. Miongozo mingi kuhusu uundaji wa seti za data huchukulia kuwa lugha ni Kiingereza, kuna bajeti ya kutosha, na ni kazi ambayo mtu fulani ameshaitatua hapo awali. Badala yake, kitabu hiki cha mwongozo (playbook) kinazingatia mazingira ambayo miradi mingi ya lugha za Kiafrika inakumbana nayo: ufadhili mdogo, timu za watu wa kujitolea au wa muda, lugha na maandishi kadhaa kwa wakati mmoja, na jamii ambazo zinapaswa kubaki kuwa wamiliki wa kile wanachosaidia kukiunda.

## Kitabu hiki cha mwongozo ni kwa ajili ya nani {#who-this-playbook-is-for}

Kitabu hiki cha mwongozo kimeandikwa kwa ajili ya mtu yeyote anayeunda, au anayetaka kuunda, seti ya data kwa ajili ya lugha ya Kiafrika, na kwa watafiti wa NLP (Uchakataji wa Lugha Asilia) wanaofanya kazi na lugha yoyote ambayo data yake ni adimu. Kinatoa mifano yake kutoka kwenye miradi ya Kiafrika, lakini matatizo kinayoyashughulikia si ya kipekee kwa Afrika pekee: maandishi machache yanayoweza kutumika mtandaoni, maandishi au lahaja kadhaa ndani ya lugha moja, bajeti ndogo, na jamii ambazo ridhaa na umiliki wao lazima uheshimiwe. Mengi ya ushauri wake yanatumika popote ambapo mazingira hayo yapo. Miongoni mwa wasomaji wake tunatarajia wanafunzi, watafiti, wataalamu wa isimu na wanaharakati wa lugha wanaotaka lugha yao iweze kutumiwa na mashine, waandaaji wa kijamii wanaoendesha zoezi la ukusanyaji, na wahandisi ambao wamegundua kuwa data wanayohitaji haipo. Hakuna uelewa wa awali wa ujifunzaji wa mashine (machine learning) unaotarajiwa. Kinachotarajiwa ni lugha unayoijali na utayari wa kufanya kazi kwa umakini.

## Kile utakachojifunza {#what-you-will-learn}

Sura zimepangwa katika sehemu mbalimbali:

- **Misingi (Foundations)** inashughulikia kazi zinazofanana kwa kila mradi: kupanga, kukusanya data, kusanifu uwekaji lakabi, kusimamia data, kuhakikisha ubora wake, na kufanya kazi na jamii.
- **[Maandishi (Text)](/sw/sections/text)** inashughulikia uainishaji wa maandishi (text classification), uzalishaji wa maandishi (text generation) na tafsiri ya mashine (machine translation).
- **[Sauti (Speech)](/sw/sections/speech)** inashughulikia utambuzi wa sauti (speech recognition), maandishi-kuwa-sauti (text-to-speech), tafsiri ya sauti (speech translation), uelewa wa sauti (audio understanding), utambuzi wa hisia (emotion recognition) na utenganishaji wa wazungumzaji (speaker diarization).
- **[Maono (Vision)](/sw/sections/vision)** inashughulikia data za picha, AI ya nyaraka na OCR, na lugha ya alama na video.
- **[Mbinu Mseto (Multimodal)](/sw/sections/multimodal)** inashughulikia kazi zinazounganisha picha na maandishi, na matumizi ya miundo mikubwa ya lugha (large language models) kusaidia kuunda data.
- **[Mzunguko wa Maisha na Utoaji (Lifecycle & Release)](/sw/sections/lifecycle)** inashughulikia tathmini, uwekaji kumbukumbu, utoaji, usambazaji, uhamishaji kati ya lugha, na sheria na maadili ya ridhaa.
- **[Violezo (Templates)](/sw/templates/)** inakupa nyaraka za kurekebisha na kutumia, kama vile fomu za ridhaa, miongozo ya uwekaji lakabi na kadi za seti za data (dataset cards).
- **[Uchunguzi Kifani (Case Studies)](/sw/case-studies/)** inaelezea miradi halisi, iliyoandikwa na watu walioiendesha.

Kila moja ya sehemu za kazi inaeleza nini kinabadilika unapounda data kwa ajili ya aina hiyo ya kazi.

## Jinsi ya kukisoma {#how-to-read-it}

Sio lazima usome kitabu hiki cha mwongozo kwa mfuatano. Ikiwa unaanza mradi kutoka sifuri, anza na [Utangulizi](/sw/introduction), ambao unaeleza kwa nini lugha za Kiafrika zinakosa data na kwa nini kukwangua (scraping) mtandao hakutatatua tatizo hilo, na kisha usome sura za Misingi kwa mfuatano. Ikiwa tayari unajua kazi yako, nenda kwenye [Kabla Hujaanza](/sw/before-you-start/), ambayo inaorodhesha rasilimali zilizopo kwa ajili ya kazi za kawaida na inakusaidia kuamua kama upanue seti ya data iliyopo au uunde mpya. [Jinsi ya kusoma kitabu hiki cha mwongozo](/sw/introduction/how-to-read) inapendekeza njia nyingine za kupitia kitabu hiki, na [faharasa](/sw/glossary) inafafanua istilahi zake. Ikiwa unafanya kazi nje ya mtandao au kwenye mtandao wa polepole, kitabu kizima cha mwongozo kinapatikana kama PDF moja kutoka kwenye menyu ya **AfriPlaybook** iliyo juu ya ukurasa.

## Bure na wazi {#free-and-open}

Tovuti hii ni ya bure kusoma na itaendelea kuwa hivyo. Kitabu hiki cha mwongozo kinasimamiwa na jamii ya Waraka, Masakhane, na watafiti wa AfricaNLP, kwa msaada kutoka [Masakhane African Languages Hub](https://www.masakhane.io/masakhane-african-languages-hub/about). Kinaboreshwa tu kwa kiasi ambacho wasomaji wake wanakiboresha. Ikiwa utapata kosa, umeendesha mradi ambao mafunzo yake wengine wanapaswa kuyasikia, au unaweza kutafsiri ukurasa, tafadhali [changia](/sw/introduction/how-to-contribute). Muonekano wa tovuti unapatikana kwa lugha ya Kihausa, Kiamhari, Kiswahili, Kifaransa na Kireno, na tafsiri za sura zinaongezwa kadiri watu wa kujitolea wanavyozikamilisha. Maswali na kutokubaliana vinakaribishwa katika [GitHub Discussions](https://github.com/warakacommunity/playbook/discussions) na kwenye [Discord](https://discord.gg/ChNPHV2PPS).

Ikiwa kitabu hiki cha mwongozo kinasaidia utafiti au ufundishaji wako, tafadhali [kinukuu](/cite).
