---
title: Gudanar da Aiki
ready: true
last_update:
  date: 2026-09-26
  author: Shamsudddeen Hassan Muhammad
translation_status: machine
source_hash: f5df8e4cfff4
translated_at: 2026-09-28
---

# Gudanar da Aiki {#project-management}

Yawanci ƙaramin tawaga ne da ke warwatse suke gina rumbun bayanai (dataset) na harsunan Afirka: masu bincike, masu sanya lakabi (annotators) na asali, da masu aikin sa-kai waɗanda ke aiki na ɗan lokaci a ƙasashe daban-daban, yankunan lokaci, da harsuna, galibi da ƙaramin tallafin kuɗi. Aikin fassarar na'ura na Masakhane, alal misali, marubuta 49 ne suka rubuta shi a faɗin Afirka da ma bayanta, waɗanda suka gudanar da aikin kusan gaba ɗaya ta yanar gizo ([Nekoto et al., 2020](/references#nekoto-2020)).

Ayyuka irin waɗannan suna fuskantar matsala saboda dalilan da ba su da alaƙa sosai da bayanan kansa. A wani bincike na kwararru 53 na fasahar AI a Indiya, Gabas da Yammacin Afirka, da Amurka, kashi 92% sun ba da rahoton aƙalla "data cascade" (matsalar bayanai) guda ɗaya: matsalar da aka kawo tun da wuri, a yadda aka tsara, aka tattara, ko aka sanya wa bayanan lakabi, wanda ya kasance a ɓoye har sai da ya haifar da babbar barna mai tsada daga baya ([Sambasivan et al., 2021](/references#sambasivan-2021)). Yawancin waɗannan matsalolin suna farawa ne daga shawarwarin tsare-tsare. Wannan babi zai bi diddigin waɗannan shawarwari a tsarin yadda za ku fuskance su.

## 1. Tsara iyakokin aikin {#1-scope-the-project}

Kura-kuran da aka yi kafin tattara bayanai su ne mafi tsada, saboda kowane mataki na gaba zai gaje su.

**Bincika abin da ke akwai riga.** Kafin ka tsara sabon rumbun bayanai, bi matakai huɗu da ke cikin [Kafin Ka Fara](/before-you-start/). Za ka iya sake amfani ko faɗaɗa rumbun bayanan da ke akwai, wanda zai canza tsarin gaba ɗaya.

**Rubuta burin da kuma yadda za ka san ka gama.** "Rumbun bayanan ra'ayi na Yorùbá mai jimloli 5,000, masu sanya lakabi uku a kowane abu, yarjejeniyar tsakanin masu sanya lakabi (inter-annotator agreement) sama da 0.6, wanda aka saki a ƙarƙashin CC BY 4.0 nan da Disamba" buri ne da za ka iya tsara aiki a kansa. "Inganta Yorùbá NLP" ba buri ba ne. Tabbataccen buri yana saita girman aikin, kasafin kuɗi, da lokacin tsayawa, kuma yana hana aikin ci gaba da faɗaɗa har sai an kure kuɗi ko masu aikin sa-kai.

**Bayyana sunan harshen dalla-dalla:** harshen, rubutun, nau'in yare na yanki, da salon magana (register). Swahili da aka tattara daga labaran Tanzaniya ba zai iya maye gurbin Swahili na kafofin sada zumunta na Kenya ba, kuma ƙirar (model) da aka horar a kan ɗaya ba za ta yi aiki mai kyau a kan ɗayan ba. Harshe ɗaya da aka yi shi da kyau yawanci ya fi harsuna uku da aka yi su ba da kyau ba. Ayyukan harsuna da yawa suna yiwuwa, amma da farko matsaloli ne na gudanarwa: MasakhaNER 2 ya kai harsuna 20 ta hanyar gudanar da kowane harshe a matsayin ƙaramin tawagarsa a ƙarƙashin tsari ɗaya da aka amince da shi ([Adelani et al., 2022](/references#adelani-2022)).

**Yanke shawara a kan girman aiki, yanayi (modality), da aiki a tare**, saboda suna dogara ne a kan juna: yawan bayanan, a wane tsari (rubutu, magana, ko hotuna), da kuma waɗanne lakabi. Daidaita girman aikin da tawagar da kasafin kuɗin da kake da shi. Ƙaramin rumbun bayanai, mai tsafta, wanda aka rubuta bayanansa da kyau ya fi babba mai ɗauke da kurakurai daraja, kuma matsalolin inganci sun fi muni a manyan tarin bayanai da aka kwaso daga yanar gizo (web-crawled) don harsunan da ba su da wadatattun kayan aiki ([Kreutzer et al., 2022](/references#kreutzer-2022)).

**Rubuta waɗannan shawarwari a cikin takardar tsarin aiki (project charter)**, kuma ka raba ta da dukkan tawagar da kuma mai ba ka tallafin kuɗi.

:::tip[Samfuri: Takardar tsarin aiki]
Takardar cike-cike da ke rubuta manufar aikin, abokan hulɗa, harshe, bayanai, lasisi, tawaga, jadawalin lokaci, kasafin kuɗi, gudanarwa, da ɗa'a, tare da wurin sa hannu ga kowane abokin hulɗa. [Buɗe samfurin takardar tsarin aiki](/templates/project-charter).
:::

## 2. Daidaita ɗa'a, amincewa, da doka da wuri {#2-settle-ethics-consent-and-the-law-early}

Waɗannan matakan suna ɗaukar lokaci fiye da yadda yawancin tawagogi suke tsammani, kuma dole ne a kammala su kafin a tattara kowane irin bayanai. Ba za a iya ƙara amincewa (consent) ga bayanan da ka riga ka tattara ba.

- **Amincewar ɗa'a.** Idan kana aiki a jami'a, yawanci za ka buƙaci amincewa daga kwamitin ɗa'a na bincike kafin tattara bayanai daga mutane. Bita na iya ɗaukar makonni ko watanni, don haka ka nemi hakan da zaran an tsara iyakokin aikin.
- **Dokar kare bayanai.** Ƙasashen Afirka da yawa yanzu suna da dokokin kare bayanai, ciki har da Afirka ta Kudu (POPIA), Kenya (Data Protection Act, 2019), da Najeriya (Nigeria Data Protection Act, 2023). Bincika ƙa'idojin kowace ƙasa da kake tattara bayanai ko adana su, musamman idan bayanan za su tsallaka iyakoki.
- **Amincewa da lasisi.** Yanke shawara a kan yadda za ka nemi amincewa da kuma wane lasisi za ka yi amfani da shi wajen sakin bayanan kafin a fara tattarawa. Lasisin da kake so a ƙarshe yana iyakance irin bayanan da za ka iya tattarawa a farko.

Babin [Shari'a, amincewa, da haƙƙin mallakar al'umma](/legal-consent/) da [Gudanar da Bayanai](/data-governance/) sun tattauna waɗannan dalla-dalla.

## 3. Tsara aikin {#3-plan-the-work}

**Tsara jadawalin lokaci a baya-baya** daga ranar da za ka saki bayanan, ta hanyar matakan da dole ne su faru a jere: ƙa'idoji, gwaji (pilot), bita, babban sanya lakabi, kula da inganci, rubuta bayanai (documentation), da saki.

**Gudanar da gwaji tukunna.** Sanya lakabi ga abubuwa 50 zuwa 200 tare da ainihin masu sanya lakabinka da ainihin ƙa'idojinka kafin ka sadaukar da cikakken kasafin kuɗin. Gwaji yana nuna maka umarnin da ba a gane ba, matsaloli masu wuya, da rashin jituwa a lokacin da suke da sauƙin gyarawa. Hakanan yana ba ka ƙididdigar saurin sanya lakabi (abubuwa a kowace awa) don tsara sauran jadawalin aikin.

**Yanke shawarar ci gaba ko dakatawa bayan gwajin.** Ku amince a kan sharuɗɗan tun da wuri, alal misali:

- Shin yarjejeniyar tsakanin masu sanya lakabi ta kusa da burinka?
- Shin ƙa'idojin sun amsa yawancin tambayoyin masu sanya lakabin?
- A ƙididdigar saurin da aka auna, shin cikakken rumbun bayanan zai dace da kasafin kuɗi da jadawalin lokaci?

Idan amsar ɗaya daga cikin waɗannan ita ce a'a, sake duba ƙa'idojin ko iyakokin aikin sannan ka sake yin gwaji. Kada ka faɗaɗa tsarin da ba ya aiki.

**Girmama tsarin matakan da suka dogara da juna.** Dole ne ƙa'idoji su zama tabbatattu kafin a fara babban sanya lakabi, ko kuma za ka sake sanya lakabin. Dole ne amincewar ɗa'a da amincewar mutane su kasance a shirye kafin tattara bayanai.

**Tsara aiki a kan kalanda.** Yawancin masu sanya lakabi ɗalibai ne ko suna da wasu ayyukan. Jarabawa, hutun gwamnati da na addini, lokutan azumi, zaɓuɓɓuka, da damina duk suna canza wanda zai samu lokaci da kuma yaushe. Sanya waɗannan kwanakin a cikin tsarin sannan ka ƙara lokacin hutu (slack).

## 4. Kasafin kuɗi da ɗaukar nauyin aikin {#4-budget-and-fund-the-work}

**Ƙiyasta farashin sanya lakabi tukunna**, saboda yawanci shi ne mafi girman farashi a ayyukan rubutu:

> yawan abubuwa × masu sanya lakabi a kowane abu × lokaci a kowane abu × farashin kowace awa

Sannan ka ƙara lokaci don bita da yanke hukunci (adjudication), da kuma gudanarwa. Alal misali, abubuwa 5,000 tare da masu sanya lakabi uku a minti ɗaya ga kowane abu zai zama awanni 250 na masu sanya lakabi kafin kowane bita. Yi amfani da ƙididdigar da ka auna a gwajin, ba hasashe ba. Shafin [Tsare-tsaren Farashi da Albarkatu](/data-collection/cost-resource-planning) ya tattauna ƙiyasta farashi dalla-dalla.

**Yi kasafin kuɗi don farashin da ke da sauƙin mantawa:**

- Datta (mobile data) da katin waya ga masu sanya lakabi waɗanda ke aiki a kan wayoyinsu.
- Na'urori, kayan ɗaukar sauti, da ma'adanar bayanai don ayyukan magana da hotuna.
- Kuɗaɗen caji na aika kuɗi, musamman don biyan kuɗi na ƙetare iyakoki.
- Lokacin gudanarwa ga jagoran aikin da jagororin harshe.
- Kuɗin ajiya na gaggawa (contingency) don sake sanya lakabi da kuma masu sanya lakabi da suka bar aikin.

**Biya masu sanya lakabi daidai da gumi kuma a kan lokaci.** Masu sanya lakabi ƙwararrun masu bayar da gudummawa ne. Saita farashi a bayyane bisa farashin ƙwararru na gida maimakon mafi ƙarancin farashin aikin sa-kai na duniya (crowdsourcing), kuma ku amince da shi kafin a fara aiki. Kuɗin wayar hannu (M-Pesa, MTN MoMo, Airtel Money) galibi ita ce hanya mafi dacewa ta biyan kuɗi: tana isa ga mutanen da ba su da asusun banki kuma tana isa da sauri. Jinkiri ko rashin bayyana yadda za a biya kuɗi ita ce hanya mafi sauri ta rasa tawaga mai kyau da kuma lalata amincewa don aikin gaba.

**Tsara yadda kuɗi zai riƙa tafiya a zahiri:**

- Kuɗin tallafi galibi yana wucewa ta jami'a ko ƙungiya, kuma biyan kuɗi na iya ɗaukar makonni ko watanni kafin ya isa ga masu sanya lakabi. Ku amince a kan tsarin biyan kuɗi da ofishin kuɗin ku kafin a fara aiki.
- Farashin canjin kuɗi yana canzawa. Idan tallafin yana cikin daloli ko yuro amma kana biya da kuɗin gida, duba kasafin kuɗin daidai da farashin canji na yanzu kafin kowane zagaye na biyan kuɗi.
- Ajiye tarihin kowane biyan kuɗi. Masu ba da tallafi za su tambaye shi, kuma yana kare ka da masu sanya lakabi.
- Bincika ƙa'idojin haraji da suka shafi biyan kuɗi a kowace ƙasa.

**Nemi tallafin kuɗi da ke da nufin ƙirƙirar rumbun bayanai.** [Lacuna Fund](/references#lacuna-fund), wanda The Rockefeller Foundation, Google.org, da IDRC na Kanada suka kafa a 2020, yana ɗaukar nauyin rumbun bayanan koyon na'ura (machine learning) a wuraren da ba su da wadatattun kayan aiki, ciki har da harsunan Afirka. Wasu zaɓuɓɓukan sun haɗa da AI4D Africa, haɗin gwiwar jami'o'i, da tallafi na kayan aiki (in-kind support) kamar na'urorin kwamfuta ko lokacin masu sanya lakabi. Sanya tsarin gudanar da bayananka da amincewa a cikin takardar neman tallafin (proposal). Masu ba da tallafi suna ƙara tsammanin ganin hakan.

## 5. Gina tawagar aiki {#5-build-the-team}

Yawancin ayyuka suna da ayyuka (roles) fiye da mutane, don haka mutum ɗaya galibi yana riƙe da ayyuka da yawa. Abin da ke da muhimmanci shi ne kowane aiki yana da wanda aka ba wa alhakinsa.

| Aiki | Mai alhakin |
| --- | --- |
| **Jagoran aiki (Project lead)** | Jadawalin lokaci, kasafin kuɗi, sadarwa, da bayar da rahoto ga mai ba da tallafi. |
| **Jagoran harshe (Language lead)** (ɗaya a kowane harshe) | Ƙa'idoji, matsaloli masu wuya, da inganci ga wannan harshen. Shi ne mai yanke hukunci na ƙarshe a kan abin da ke daidai. |
| **Jagoran fasaha (Technical lead)** | Kayan aikin sanya lakabi, hanyar sarrafa bayanai (data pipeline), ma'adana, da adana bayanan ajiya (backups). |
| **Jagoran ɗa'a da bayanai (Ethics and data lead)** | Amincewar ɗa'a, bayanan amincewa, kare bayanai, da bayar da lasisi. |
| **Masu sanya lakabi (Annotators)** | Samar da lakabi. |
| **Masu bita (Reviewers)** | Bincika inganci da warware rashin jituwa. |

Raba sanya lakabi da bita daban, koda kuwa mutane suna canza ayyukan a tsakaninsu. Yin bita ga aikinka yana ɓoye kurakuran da ka fi buƙatar ganowa. Samun jagoran harshe ga kowane harshe, maimakon tawaga ɗaya ta tsakiya da ke sanya lakabi ga komai, shi ne abin da ya ba wa ayyukan Masakhane damar yin aiki a kan harsuna da yawa a lokaci ɗaya ([Nekoto et al., 2020](/references#nekoto-2020)).

**Ɗauki ma'aikata da wuri.** Neman masu jin yaren asali waɗanda suka ƙware galibi shi ne ƙalubale mafi wahala, musamman ga ƙananan harsuna. Bawa ɗaukar ma'aikata lokacinsa a cikin tsarin. Kyawawan wuraren da za a duba sun haɗa da sassan harshe da ilimin harsuna na jami'o'i, ƙungiyoyin al'umma, da ƙungiyoyin bincike da ke akwai kamar [Masakhane](https://www.masakhane.io/). Buƙaci masu neman aikin su sanya lakabi ga wani ɗan gajeren gwaji kafin ka ɗauke su aiki, kuma ka horar da kowa a kan ƙa'idojin kafin gwajin (pilot).

**Sanya yarjejeniyoyi a rubuce.** Kowane mai bayar da gudummawa ya kamata ya sami gajeriyar yarjejeniya a rubuce wacce ta ƙunshi biyan kuɗi, awannin aiki, yadda za a yi amfani da bayanansu da aikinsu, lasisin, da kuma yadda za a karrama su.

**Ku amince a kan karramawa (credit) a farko.** Yanke shawara da wuri a kan wanda zai zama marubuci a takardun bincike, wanda za a yi wa godiya, da kuma yadda za a ambaci sunayen masu sanya lakabi a cikin bayanan rumbun bayanan. Karramawa a bayyane kuma ta adalci tana sa masu aikin sa-kai su ci gaba da shiga, kuma tana kauce wa jayayya a lokacin saki.

## 6. Gudanarwa da bibiya {#6-coordinate-and-track}

**Yi aiki a lokuta daban-daban (asynchronously).** Tawagogin da ke warwatse, masu aiki na ɗan lokaci suna buƙatar kayan aiki masu sauƙi waɗanda ke aiki a kan waya da kuma a kan raunin intanet. Ga yawancin ayyuka, abubuwa uku sun isa:

- wani abin bibiyar aiki guda ɗaya da aka raba (spreadsheet yana aiki);
- wuri ɗaya don sabon tsarin ƙa'idojin;
- wata kafa ɗaya da aka amince da ita don tambayoyi, kamar rukunin WhatsApp ko Slack.

Rubuta shawarwari, saboda mutane kaɗan ne ke kan yanar gizo a lokaci ɗaya.

**Yi bita ga wasu lambobi kowane mako ɗaya ko biyu:**

- abubuwan da aka kammala daidai da tsarin;
- yarjejeniya tsakanin masu sanya lakabi;
- masu sanya lakabi nawa ne ke aiki;
- farashin kowane abu ya zuwa yanzu.

Faɗuwar yarjejeniya yawanci yana nufin ƙa'idojin suna buƙatar gyara, ba wai masu sanya lakabin ne suke buƙatar gyara ba. Masu sanya lakabi da ke barin aikin yawanci yana nuna matsaloli game da biyan kuɗi, yawan aiki, ko abubuwan da ke tayar da hankali. Matsalar da aka gano a mako na biyu tana da sauƙin gyarawa fiye da wacce aka gano a lokacin saki ([Sambasivan et al., 2021](/references#sambasivan-2021)).

## 7. Kula da haɗurra {#7-manage-risks}

Waɗannan haɗurran suna tasowa a kusan kowane aikin bayanan harshen Afirka:

| Haɗari | Alamar gargaɗi da wuri | Abin da za a yi |
| --- | --- | --- |
| **Masu sanya lakabi sun bar aiki** | Ƙarancin abubuwa a kowane mako; jinkirin amsawa | Saita jadawalin lokaci mai yiwuwa, biya a kan lokaci, kuma ɗauki ma'aikata da suka ɗan fi yawan waɗanda kake buƙata. |
| **Kauciwa daga ƙa'idoji** | Yarjejeniya tana faɗuwa da shigewar lokaci | Ajiye ƙa'idojin a tsarin juzu'i (versioned), kuma ka riƙa sake duba masu sanya lakabi a kan abubuwan da aka raba akai-akai. |
| **Jinkirin biyan kuɗi** | Ofishin kuɗi bai tabbatar da tsarin ba | Ku amince a kan tsarin biyan kuɗi kafin a fara aiki, kuma ku ajiye ɗan ƙaramin kuɗi don biyan kuɗi na gaggawa idan ƙungiyarku ta amince da hakan. |
| **Canjin kuɗi** | Kuɗin gida ya faɗi idan aka kwatanta da kuɗin tallafi | Sake duba kasafin kuɗin kafin kowane zagaye na biyan kuɗi, kuma ka ajiye kuɗin ajiya na gaggawa (contingency). |
| **Matsalar intanet da wuta** | Masu sanya lakabi sun rasa lokacin ƙarshe a yanki ɗaya | Zaɓi kayan aikin da ke aiki ba tare da intanet ba ko a kan raunin intanet, kuma ka ɗauki nauyin kuɗin datta (mobile data). Gwamnatoci sun taɓa rufe intanet a ƙasashe da yawa, don haka ka tsara yadda za a fuskanci waɗannan gibin. |
| **Tallafi ko kayan aiki ya ɓace** | Ranar ƙarshen tallafi ta kusa; kayan aiki ya canza farashinsa | Ajiye naka kwafin na dukkan ɗanyen bayanai da abubuwan da aka fitar (exports), kuma ka guji dogaro da sabis guda ɗaya. |
| **Cutarwa ga masu sanya lakabi** | Masu sanya lakabi suna tsallake abubuwa ko barin aiki bayan ganin abubuwa masu tayar da hankali | Gargaɗi masu sanya lakabi game da abubuwa masu tayar da hankali, ba su damar fita, iyakance yawan abubuwan da za su gani, kuma ka yi bita ga bayanan kafin saki. |

## 8. Saki da miƙa aiki {#8-release-and-hand-over}

**Tsara sakin daga farko.** Yanke shawara a kan inda za a adana rumbun bayanan, a ƙarƙashin wane lasisi, yadda za a sanya lambobi ga juzu'o'i (versions), da kuma wanda zai amsa tambayoyi da gyara kurakurai bayan tallafin ya ƙare. Babin [Rubuta Bayanai](/documentation/documentation) ya bayyana yadda za a rubuta takardar bayanai (datasheet) don sakin.

**Ɗauka cewa wani daban ne zai kammala aikin.** Mambobin tawagar suna kammala karatu, canza ayyuka, ko kurewar lokaci. Ajiye ƙa'idoji, tsari (schema), bayanan amincewa, da rubutun sarrafa bayanai (processing scripts) a cikin ma'adana da aka raba (shared repository), ba a kan kwamfutar mutum ɗaya ba. Wannan yana ba wa mutum na gaba damar ci gaba da aikin, kuma yana ba ka damar nuna daga inda bayanan suka fito shekaru da yawa bayan haka.

**Rubuta abin da ka koya.** Lokacin da aikin ya ƙare, rubuta abin da ya yi aiki da abin da bai yi ba, ta amfani da [samfurin waiwaye (retrospective template)](/case-studies/retrospective-template). Yana taimaka wa tawaga ta gaba tsara aiki fiye da yadda ka yi.

## Abubuwan dubawa kafin ka fara {#checklist-before-you-start}

- [ ] An bincika rumbun bayanan da ke akwai riga ([Kafin Ka Fara](/before-you-start/)).
- [ ] Buri, nau'in harshe, girman aiki, da sharuɗɗan nasara an rubuta su a cikin takardar tsarin aiki.
- [ ] An gano buƙatun amincewar ɗa'a da kare bayanai, tare da lokaci a cikin tsarin.
- [ ] An yanke shawara a kan tsarin amincewa da lasisin saki.
- [ ] An tsara gwaji, tare da amincewa a kan sharuɗɗan ci gaba/dakatawa.
- [ ] An gina kasafin kuɗi daga ƙididdigar da aka auna, gami da ɓoyayyun farashi da kuɗin ajiya na gaggawa.
- [ ] An amince da tsarin biyan kuɗi da ofishin kuɗin ku.
- [ ] Kowane aiki yana da wanda aka ba wa alhakinsa.
- [ ] Akwai yarjejeniyoyi a rubuce da tsarin karramawa ga dukkan masu bayar da gudummawa.
- [ ] Tsarin saki, adanawa, da kulawa yana nan a shirye.

:::note[Yadda wannan ke da alaƙa]
Shawarwarin da ke cikin wannan babi suna tsara [Tattara Bayanai](/data-collection/data-modalities), [Tsarin Sanya Lakabi](/annotation-design/annotation-task-design), da [Ingancin Bayanai](/data-quality/), waɗanda ke biye.
:::
