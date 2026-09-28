---
sidebar_position: 99
title: Kamus
description: Ma'anar muhimman kalmomin da aka yi amfani da su a cikin AfriPlaybook.
ready: true
last_update:
  date: 2026-09-24
  author: Shamsudddeen Hassan Muhammad
translation_status: machine
source_hash: 3bbe5f86c09a
translated_at: 2026-09-28
---

Wani kundin duba kalmomin da aka yi amfani da su a cikin Playbook. Nassoshin duba suna nuni zuwa ga babi-babin da aka gabatar da kowane tsari dalla-dalla.

Wannan wani mafari ne. Ana maraba da ƙari da gyare-gyare ta hanyar mahaɗar "Gyara wannan shafi" da ke ƙasa.

## A {#a}

**Yanke hukunci (Adjudication).** Tsarin warware saɓani tsakanin masu sanya lakabi (annotators), wanda yawanci wani babban mai sanya lakabi ko wani wanda aka naɗa don yanke hukunci ke yi. Ya zama ruwan dare idan masu sanya lakabi da yawa suka sanya lakabi ga abu ɗaya kuma ana buƙatar lakabin "zinare" (gold) na ƙarshe. Duba babin *Annotation Design and Workforce Management* (Tsarin Sanya Lakabi da Gudanar da Ma'aikata).

**Sanya lakabi (Annotation).** Haɗa bayanan da aka tsara (lakabi, gurbi, rukunoni, ƙididdiga) ga ɗanyen bayanai (raw data) domin a yi amfani da su wajen horarwa ko kimanta ƙirar harshe (language models).

**Ƙa'idojin sanya lakabi (Annotation guidelines).** Rubutattun ƙa'idojin da ke gaya wa masu sanya lakabi ainihin yadda za su sanya lakabi ga kowane irin bayani da aka shigar. Ya haɗa da ma'anoni, dokokin yanke shawara, misalan da aka yi aiki a kai, da kuma yanayi masu wuyar warwarewa. Shi ne abu mafi muhimmanci guda ɗaya don samun kyakkyawar jituwa tsakanin masu sanya lakabi (inter-annotator agreement).

**Tsarin sanya lakabi (Annotation schema).** Ma'anar tsari na abin da za a iya sanya wa lakabi: misali, rukunin nau'ikan abubuwan da aka amince da su a NER, ko ma'aunin ƙididdiga a nazarin ra'ayi (sentiment analysis). Tsarin yana iyakance abin da ƙa'idoji za su iya siffantawa.

## B {#b}

**Fassarar baya (Backtranslation).** Fassara daga harshen da ake so a fassara zuwa ainihin harshen asali don samar da ƙarin nau'ikan horarwa. Ana yawan amfani da shi don haɓaka ma'adanar bayanai (datasets) na fassara masu ƙarancin albarkatu. Ingancin yana bambanta, don haka a tabbatar da shi tare da masu jin ainihin harshen kafin a yi horo a kan bayanan da aka yi wa fassarar baya.

**Ma'auni (Benchmark).** Daidaitaccen ma'adanar bayanai da tsarin kimantawa da ake amfani da su don kwatanta ƙirori (models). Misalan da suka dace da NLP na Afirka: AfriSenti, NaijaSenti, AfriHate, BRIGHTER, AmhEn.

## C {#c}

**Cohen's kappa (κ).** Wani ma'aunin jituwa tsakanin masu sanya lakabi (inter-annotator-agreement metric) ga masu sanya lakabi biyu a kan lakabin rukunoni, wanda aka gyara don jituwar bazata. Matsayi: −1 zuwa 1; a al'adance κ > 0.6 yana nufin "mai yawa," κ > 0.8 yana nufin "kusan cikakke."

**Amincewa (Consent).** Rubutaccen izini daga mutanen da ke bayar da gudummawar magana, rubutu, ko hotuna, wanda yawanci ya haɗa da sharuɗɗa kan amfani, adanawa, da haƙƙin janyewa. Ana buƙatarsa don aikin bayanai na ɗa'a da na doka; duba babin *Data Collection, Curation, and Governance* (Tattara Bayanai, Kulawa, da Gudanarwa).

**Tarin bayanai (Corpus)** *(jam'i corpora)*. Wani tsari na tarin rubutu, magana, ko wasu bayanan harshe da ake amfani da su don bincike ko horar da ƙira (model).

**Neman taimakon jama'a (Crowdsourcing).** Ɗaukar masu sanya lakabi da yawa da ke warwatse, yawanci a kan intanet, don sanya lakabi ga bayanai. Zaɓi: yawa ko inganci. Dabarun sarrafa inganci (abubuwan da ke da matsayin zinare, ma'aunin jituwa, gwajin cancanta) suna ƙara zama muhimmai yayin da yawan jama'a ke ƙaruwa.

## D {#d}

**Ma'adanar bayanai (Dataset).** Wani tarin abubuwa da aka tsara tare da lakabi da takardu, a shirye don a yi amfani da su wajen horarwa ko kimantawa. Ma'adanar bayanai ita ce *tarin bayanai (corpus) + tsari (schema) + lakabi (labels) + takardu (documentation) + lasisi (license)*.

**Ikon mallakar bayanai (Data sovereignty).** Ƙa'idar da ke cewa bayanan da suka shafi wata al'umma mallakar wannan al'ummar ne, tare da ikon sarrafa adanawa, samun dama, da amfani da su. Yana da matuƙar muhimmanci musamman ga bayanan harshe daga ƴan asali da masu magana da harsunan da ke da ƙarancin masu amfani da su.

## F {#f}

**Fleiss' kappa.** Ma'aunin jituwa tsakanin masu sanya lakabi ga masu sanya lakabi fiye da biyu a kan lakabin rukunoni; wani faɗaɗawa ne na Cohen's kappa.

## G {#g}

**Matsayin zinare (Gold standard).** Wani lakabin duba da ake ɗauka a matsayin daidai bayan yanke hukunci ko bitar masana. Ana amfani da shi don kimanta masu sanya lakabi, kimanta ƙirori, da kuma a matsayin ainihin gaskiya (ground truth) a cikin rukunin gwaji.

## I {#i}

**Jituwa tsakanin masu sanya lakabi (Inter-annotator agreement, IAA).** Wani ma'auni na ƙididdiga kan yadda masu sanya lakabi daban-daban ke fitar da lakabi iri ɗaya a kai a kai. Ƙarancin IAA yana nuna cewa ƙa'idojin ba su fito fili ba, aikin yana da ruɗani, ko kuma masu sanya lakabin suna buƙatar ƙarin horo.

## K {#k}

**Krippendorff's alpha (α).** Wani ma'aunin jituwa tsakanin masu sanya lakabi mai sassauci wanda ke sarrafa bayanan da suka ɓace, masu sanya lakabi da yawa, da ma'aunin lakabi daban-daban (nominal, ordinal, interval, ratio).

## L {#l}

**Lasisi (License).** Sharuɗɗan doka waɗanda a ƙarƙashinsu za a iya amfani da ma'adanar bayanai ko wani ɓangare na lamba (code), a gyara shi, kuma a sake rarraba shi. Sanannun buɗaɗɗun lasisi: Apache 2.0, MIT, CC-BY-SA, CC-BY-NC. Amincewa da lasisi abubuwa ne daban-daban, waɗanda aka tattauna a babin *Documentation, Data Release, and Governance* (Takardu, Sakin Bayanai, da Gudanarwa).

**Harshe mai ƙarancin albarkatu (Low-resource language).** Harshen da ke da ƙarancin bayanan dijital da ƙarancin albarkatun NLP. Yawancin harsunan Afirka sun faɗa cikin wannan rukunin. Gina tsarin da zai yi amfani yana buƙatar tattara bayanai da gangan kuma sau da yawa ana buƙatar canja wuri a tsanake daga harsunan da ke da alaƙa masu ɗimbin albarkatu.

## M {#m}

**Yanayi (Modality).** Nau'in bayanan da aka shigar: rubutu, magana, hoto, bidiyo, ko wani haɗin su. An tattauna sanya lakabi na musamman ga yanayi a babin *Modality-Specific Task Design* (Tsarin Aiki na Musamman ga Yanayi).

**Mai harsuna da yawa (Multilingual).** Rufe ko yin aiki a kan harsuna da yawa, yawanci tare da raba ma'aunin ƙira (model parameters).

## N {#n}

**Gane Sunayen Abubuwa (Named Entity Recognition, NER).** Gano guraben rubutu da ke nuni ga abubuwan da aka ambata da suna (mutane, wurare, ƙungiyoyi, da sauransu) da kuma sanya musu lakabi da nau'insu.

## P {#p}

**Tarin bayanai masu daidaito (Parallel corpus).** Tarin bayanai (corpus) da ke da abun ciki iri ɗaya a cikin harsuna biyu ko fiye, waɗanda aka jera jimlolinsu. Shi ne tushen horar da fassarar na'ura (machine-translation).

**Sanya lakabin ɓangarorin magana (Part-of-speech, POS, tagging).** Sanya lakabi ga kowane guntun kalma (token) da aikin nahawunsa (suna, aiki, sifa, da sauransu).

## R {#r}

**Sake gudanarwa (Reproducibility).** Wata sifa da ke nuna cewa wani mai bincike, idan aka ba shi ma'adanar bayanai, lamba (code), da tsarin da aka bayar da rahoto a kai, zai iya sake gudanar da gwajin kuma ya sami sakamako iri ɗaya. Playbook yana ɗaukar sake gudanarwa a matsayin babbar manufar tsari.

## S {#s}

**Bayanan ƙirƙira (Synthetic data).** Bayanan da wata ƙira (model) ta samar maimakon waɗanda aka tattara daga tushen ɗan adam. Yana da amfani wajen haɓakawa; yana da haɗari idan ba a tabbatar da shi ba saboda kurakurai na iya haɗuwa. An tattauna shi a babin *LLM-Assisted and Synthetic Data Generation* (Samar da Bayanan Ƙirƙira da Taimakon LLM).

## T {#t}

**Rarraba kalmomi (Tokenisation).** Raba rubutu zuwa ainihin ɓangarorin da ƙira (model) ke aiki a kansu. Zaɓuɓɓuka game da rarraba kalmomi (subword, BPE, SentencePiece, character) suna shafar aikin da ke biyo baya sosai, musamman a cikin harsunan da ke da wadataccen tsarin kalmomi (morphologically rich languages).

## Duba kuma {#see-also}

- [Yadda za a yi nuni ga Playbook](/cite)
- [Yadda za a bayar da gudummawar babi](https://github.com/warakacommunity/playbook/blob/main/README.md#how-to-contribute-a-chapter)
- [Al'ummar Discord](https://discord.gg/ChNPHV2PPS)
