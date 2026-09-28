---
title: Gudanar da Bayanai
ready: true
last_update:
  date: 2026-07-07
  author: Idris Abdulmumin
translation_status: machine
source_hash: 3c6cb60be1f0
translated_at: 2026-09-28
---

# Gudanar da Bayanai {#data-governance}

Gudanar da bayanai (data governance) wani tsari ne na yanke shawara kan wanda ke da iko da rumbun bayanai (dataset): wanda zai iya samunsa, wanda zai iya amfani da shi, wanda zai ci gajiyarsa, da kuma wanda zai ɗauki alhaki idan wani abu ya faru. Ga bayanan harsunan Afirka, waɗannan ba wasu ƙa'idojin doka ba ne da za a ƙara a ƙarshe. Suna tabbatar da ko rumbun bayanai zai ƙarfafa al'umma ne ko kuma zai kwashe musu nasu a ɓoye. Bayanan suna fitowa ne daga mutane, daga muryoyinsu, kalmominsu, da iliminsu, kuma gudanarwa ita ce hanyar da waɗannan mutane za su ci gaba da kasancewa da murya a kan abin da suka taimaka wajen ƙirƙira.

Wannan yana da matuƙar muhimmanci a nan fiye da wuraren da ke da wadatattun bayanai, saboda irin buɗewar da ke taimakawa harshe mai ƙarancin bayanai (low-resource language) ita ce kuma za ta iya jefa shi a haɗari. Rumbun rubutu ko magana (corpus) da ake iya saukewa kyauta yana da sauƙin sake amfani da shi, kuma yana da sauƙin kwashewa zuwa cikin tsarin kasuwanci (commercial model) wanda ba zai dawo da wata fa'ida, yabo, ko ba da dama ga masu magana da harshen ba. Al'ummomin Sarrafa Harshen Jama'a (NLP) na Afirka sun fito ƙarara a kan wannan. Al'ummar Masakhane tana ganin cewa ya kamata 'yan Afirka su yanke shawarar wane bayani ne ke wakiltar al'ummominsu, su ci gaba da mallakarsa, kuma su san yadda ake amfani da shi ([Masakhane](/references#masakhane)). Gudanarwa ita ce yadda wannan ƙa'ida ke komawa aiki a aikace.

:::tip[A taƙaice]
Ku yanke shawara tare da al'umma kan wanda zai kula da bayanan, ku sami amincewa ta gaskiya, ku zaɓi lasisi (licence) da gangan, ku kare mutanen da ke cikin bayanan, kuma ku tabbatar da cewa fa'idodin sun isa ga masu magana da harshen.
:::

![FAIR da CARE a matsayin tsare-tsaren da ke cika juna: FAIR yana sa bayanai su kasance masu amfani, CARE yana sa su zama na adalci](../../../../../docs/data-governance/images/fair-care.svg)

## Gudanarwa don al'umma, ba don rumbun bayanai kawai ba {#govern-for-the-community-not-just-the-dataset}

### Mallakar al'umma da cin gashin kai {#community-ownership-and-self-determination}

Mutanen da harshen ya kasance nasu ne ya kamata su kasance da magana ta ƙarshe a kan yadda ake amfani da bayanansu. Wannan alƙawari na haɗin gwiwa, wanda ke ɗaukar masu magana da harshen a matsayin abokan mallaka maimakon masu samar da ɗanyen kaya, yana gudana a cikin manyan ayyukan bayanai na nahiyar. Ya tsara aikin fassarar Masakhane na farko ([Nekoto et al., 2020](/references#nekoto-2020)), Shirin Harsunan Afirka na AI4D, wanda ya gina buɗaɗɗun rumbunan bayanai ta hanyar gasar al'umma da gajerun tallafin bincike ([Siminyu et al., 2021](/references#siminyu-2021)), da manyan rumbunan magana kamar NaijaVoices waɗanda mambobin al'umma suka ɗauka maimakon kwashewa daga intanet ([Emezue et al., 2025](/references#emezue-2025)). Hakanan yana nuna wani babban kira na kawar da mulkin mallaka a fasahar harshe ta hanyar sanya al'ummomin da harsunansu ke cikin haɗari a gaba maimakon ɗaukarsu a matsayin majiyar bayanai kawai ([Bird, 2020](/references#bird-2020)). Cin gashin kai ba wai wani ƙin amincewa ba ne guda ɗaya a lokacin fitarwa. Yana tsara kowane zaɓi na baya: me ake tattarawa, daga wajen wa, a kan waɗanne sharuɗɗa, kuma wanda zai iya amfani da sakamakon.

### FAIR da CARE, a tare {#fair-and-care-together}

Tsare-tsare biyu ya kamata su jagoranci ƙirar rumbun bayanai, kuma suna amsa tambayoyi daban-daban. FAIR yana tambayar ko bayanan suna da Sauƙin gani (Findable), Sauƙin samu (Accessible), Sauƙin aiki da juna (Interoperable), da Sauƙin sake amfani (Reusable), kuma yanzu ya zama ainihin abin da ake tsammani ga bayanan bincike ([Wilkinson et al., 2016](/references#wilkinson-2016)). Duk da haka, FAIR bai ce komai ba game da iko ko adalci. Bayanai na iya zama cikakken FAIR kuma har yanzu a ɗauke su daga al'ummar da ba ta samun komai a sakamako. An rubuta CARE ne don cike wannan gurbi. Alƙawuransa guda huɗu, Fa'idar gamayya (Collective benefit), Ikon sarrafawa (Authority to control), Alhaki (Responsibility), da Da'a (Ethics), suna tabbatar da haƙƙin ƴan asali da al'ummomin gida na gudanar da bayanai game da su ([Carroll et al., 2020](/references#carroll-2020)). Yi amfani da su duka biyun. FAIR yana sa bayanan su kasance masu amfani; CARE yana sa su zama na adalci. FAIR ba tare da CARE ba kwashewa ce da aka yi wa kyakkyawan rubutu.

Ɓangaren sauƙin gani na FAIR yana da gida a aikace a cikin NLP na Afirka. African AI Atlas na Lanfrica yana bin diddigin rumbunan bayanai, ƙira-ƙirai (models), da takardu waɗanda da za su kasance a warwatse a cikin ma'adanai, fayilolin PDF, da shafukan ayyukan da suka mutu, ta yadda za a iya samun aikin da aka riga aka yi kuma a sake amfani da shi maimakon sake ginawa daga farko ([Lanfrica](/references#lanfrica)).

## Amincewa da haƙƙoƙi {#consent-and-rights}

### Cikakkiyar amincewa {#informed-consent}

Duk wanda ya bayar da gudummawar bayanai, ko rikodin murya ne, fassara, lakabi (annotation), ko hoto, ya kamata ya sani kafin ya bayar da gudummawa abin da yake amincewa da shi: don me bayanan suke, wanda zai iya amfani da su, ko za su kasance a buɗe ga jama'a, da kuma cewa za su iya ƙi ko janyewa ba tare da wani hukunci ba. Wannan ba zaɓi ba ne ga tattarawa da ta dogara da rikodin wanda ya zama ruwan dare a aikin harsunan Afirka, inda muryar mai bayar da gudummawa ko hotonsa ne bayanan. NaijaVoices yana nuna yadda kyakkyawan aiki yake. Don gina rumbun magana na sa'o'i 1,800 na Igbo, Hausa, da Yorùbá daga masu bayar da murya fiye da 5,000, ya horar da masu gudanarwa na al'umma a kan da'a na tattara bayanai da cikakkiyar amincewa (informed consent), kuma waɗannan masu gudanarwa sun bayyana aikin, manufarsa, da kuma yadda ake son amfani da bayanan ga kowane mai bayar da gudummawa kafin a fara kowane rikodin ([Emezue et al., 2025](/references#emezue-2025)). Ku tattara cikakkiyar amincewa, biyan diyya mai adalci, da sharuɗɗan haƙƙoƙin bayanai a bayyane tare, a lokacin tattarawa ([Esethu Framework, 2025](/references#esethu-2025)). Ƙara amincewa a baya yawanci ba zai yiwu ba, wanda shi ne abin da ke sa wannan ya zama shawarar da ake yankewa da wuri maimakon a makare.

### Haƙƙoƙi a kan bayanan da aka samo da waɗanda aka bayar da gudummawarsu {#rights-over-sourced-and-contributed-data}

Ku kasance a bayyane game da wane irin bayanai kuke riƙe da su, saboda haƙƙoƙin sun sha bamban sosai. Bayanan da aka bayar da gudummawarsu, rikodin, fassarar magana zuwa rubutu, da lakabin da mutane ke yi don aikinku, ana gudanar da su ne ta hanyar amincewa da sharuɗɗan da kuka amince da su. Bayanan da aka samo, rubutun da aka ciro daga intanet, kafofin sada zumunta, ko ma'adanai, suna ɗauke da haƙƙoƙin wani daban: haƙƙin mallaka (copyright), sharuɗɗan aiki na dandamali, kuma sau da yawa ba tare da wani bayyanannen lasisi ba kwata-kwata. Masu aikin NLP na Afirka sun nuna haƙƙin mallaka da samun dama a matsayin babbar matsala da ba a warware ba, tunda yawancin rubutun da ake da su suna cikin wani yanayi na rashin tabbas a doka kuma "bayyane ga jama'a" ba ɗaya yake da "kyauta don sake rarrabawa ko yin horo a kai ba" ([Carnegie Endowment, 2024](/references#carnegie-2024)). Lokacin da haƙƙoƙin ba su bayyana ba, ku yi rikodin rashin tabbas ɗin maimakon ɓoye shi.

## Bayar da Lasisi {#licensing}

Lasisi yana gaya wa duniya abin da za a iya yi da abin da ba za a iya yi da bayananku ba. A cikin NLP na Afirka, gazawar da ta zama ruwan dare ba ita ce yin amfani da lasisin da bai dace ba, a'a, rashin lasisi ne ko wanda bai bayyana ba, kuma rumbun bayanai da ba shi da lasisi a zahiri ba zai yiwu a yi amfani da shi ba, saboda mai sake amfani ba zai iya sanin ko an ba shi damar taɓa shi ba ([Lanfrica, "Licensing as a Barrier"](/references#lanfrica-licensing)). Ku zaɓa da gangan.

### Bayanai da lambar kwamfuta suna da lasisi daban-daban {#data-and-code-are-licensed-differently}

Lasisin manhaja kamar MIT ko Apache-2.0 ba a gina su don bayanai ba, kuma sanya lasisin lambar kwamfuta a kan rumbun rubutu ko magana yana barin haƙƙoƙin sake amfani da shi cikin duhu. Ga buɗaɗɗun bayanai, rukunin Creative Commons shi ne zaɓin da aka saba yi: CC0 don sadaukarwa ga jama'a, CC BY don sake amfani tare da jaddada asali (attribution), ko CC BY-SA don jaddada asali da kuma raba-daidai (share-alike). Ku zaɓi wanda ya dace da yadda kuke son kasancewa a buɗe, kuma ku sanya shi a kan bayanan, daban da kowace lambar kwamfuta.

### Lasisin Afirka da na al'umma {#african-and-community-licences}

Lasisin CC da ke a buɗe gaba ɗaya suna ɗauka cewa manufar ita ce mafi girman sake amfani. Ga bayanan Afirka masu ƙarancin bayanai, mafi girman sake amfani sau da yawa yana nufin wani dakin bincike na ƙasashen waje mai kyakkyawan tallafi zai iya ɗaukar rumbun rubutu ko maganar, ya yi horo a kansa, kuma ba zai dawo da komai ga masu magana da harshen ba. Akwai wani sabon aji na lasisi da ke mai da hankali kan al'umma don cike wannan gurbi, kuma wanda ya fi ci gaba a cikinsu na Afirka ne.

Lasisin Nwulite Obodo Open Data License (NOODL) ya samo sunansa ne daga harshen Igbo wanda ke nufin "ɗagawa, farfaɗowa, da gina al'umma," kuma an rubuta shi ne don magance buɗewar da ba ta da adalci wacce daidaitattun lasisi ke dorawa kan masu ƙirƙirar rumbun bayanan Afirka ([NOODL, 2025](/references#noodl-2025)). Babban ra'ayinsa shi ne sanya sharuɗɗa ta hanyar duba wane ne mai sake amfani. Masu amfani a Afirka da sauran ƙasashe masu tasowa za su iya sake amfani da bayanan kyauta a kan tsarin raba-daidai kuma su rarraba gyare-gyaren a cikin yankin. Masu amfani a wajen waɗannan yankuna suna karɓar irin waɗannan sharuɗɗan na raba-daidai kuma dole ne su dawo da kuɗin sarauta ko wasu fa'idodi ga masu mallakar rumbun bayanan na Afirka. Buɗewa ta zama mai amfanar juna maimakon fitarwa ta hanya ɗaya.

Lasisin Esethu, daga Lelapa AI, Way With Words, da Data Science for Social Impact, yana ƙara wata kafa ta tattalin arziki: ana sake zuba jarin kudaden shiga na lasisi wajen faɗaɗa rumbun bayanan da tallafawa aikin yi na gida, ta yadda albarkatun da al'ummarta za su haɓaka tare ([Esethu Framework, 2025](/references#esethu-2025)). Dukansu biyun sun ginu ne a kan tsarin da ya gabata na Kaitiakitanga License na Te Hiku Media don bayanan Māori, wanda ke ɗaukar bayanai a matsayin abin kulawa maimakon abin mallaka, yana mayar da fa'ida ga al'ummar da aka samo su, kuma yana hana amfani kamar sa ido ko gina rumbun bayanai ba tare da amincewa ba ([Te Hiku Media](/references#tehiku-kaitiakitanga)). Ku yi la'akari da ɗaya daga cikin waɗannan a duk lokacin da lasisin CC na yau da kullun zai nufin barin muryar al'umma, ko rabonta na ƙimar da bayananta suka ƙirƙira.

### Jaddada asali da sake amfani {#attribution-and-reuse}

Duk lasisin da kuka zaɓa, ku buƙaci jaddada asali kuma ku yi rikodin asali: daga ina bayanan suka fito, wanda ya bayar da gudummawarsu, kuma a kan waɗanne sharuɗɗa. Asali yana ba masu amfani na gaba damar yaba wa majiyar kuma su mutunta sharuɗɗan, kuma yana ba ku damar tabbatarwa bayan shekaru da yawa cewa an gina rumbun bayanan ta hanyar da ta dace. An tattauna yin rikodin sa a cikin [Rubuta Bayanai](/documentation/documentation).

## Sirri da bayanai masu mahimmanci {#privacy-and-sensitive-data}

### Bayanan sirri na mutum {#personally-identifiable-information}

Tattara harsunan Afirka a kai a kai yana ɗaukar bayanan sirri: sunaye da wurare a cikin rubutu, kuma, ba makawa, muryoyi a cikin sauti da fuskoki a cikin hotuna, waɗanda ke gane mutum kai tsaye. Ku tattara kaɗan gwargwadon yadda aikin ke buƙata, ku ɓoye asali (anonymise) a inda za ku iya ta hanyar rufe sunaye da cire bayanan-bayanai (metadata), kuma kada ku taɓa ɗaukar muryar da aka yi rikodinta a matsayin wacce ba a san asali ba. A inda bayanan da za a iya ganewa suke da mahimmanci, dole ne su dogara a kan bayyananniya, cikakkiyar amincewa, kuma sharuɗɗan amincewar dole ne su yi tafiya tare da bayanan.

### Abubuwa masu mahimmanci da waɗanda aka taƙaita {#sensitive-and-restricted-content}

Wasu ilimin bai kamata su kasance a buɗe ga jama'a ba ko da kuwa suna da sauƙin tattarawa. Abubuwa masu tsarki ko na biki, ilimin da aka taƙaita a al'adance, bayanan lafiya, da maganganun da ke da haɗari a siyasance duk suna iya jefa masu bayar da gudummawa cikin haɗari na gaske. Wannan shi ne abin da Ikon sarrafawa na CARE ke karewa: al'umma, ba mai tattarawa ba, ita ke yanke shawarar abin da za a iya rabawa da abin da zai kasance a rufe ([Carroll et al., 2020](/references#carroll-2020)). Idan ba ku da tabbas, ku tambayi al'umma kuma ku karkata ga rashin fitarwa.

### Dokar da ke aiki: Dokokin kare bayanan Afirka {#the-law-that-applies-african-data-protection-regimes}

A fadin nahiyar, gudanarwa yanzu ta zama doka kamar yadda ta zama da'a. Zuwa shekarar 2026, ƙasashen Afirka 44 sun kafa dokar kare bayanai, kuma yawancinsu suna da hukuma mai aiki don tilasta ta ([Tech In Africa, 2026](/references#techinafrica-2026)). Idan kuna tattara bayanan sirri, kuma muryar da aka yi rikodinta bayanan sirri ne, kusan tabbas ɗaya daga cikin waɗannan dokokin kare bayanai (data-protection regimes) ya shafe ku:

- **Afirka ta Kudu, POPIA** (Protection of Personal Information Act, 2020): doka ce da ta dogara da haƙƙoƙi wacce ke buƙatar tushe na doka, iyakance manufa, da binciken tasiri (impact assessment) don sarrafawa mai sarrafa kanta (automated processing).
- **Najeriya, Data Protection Act (2023)**, wanda ya ginu a kan NDPR na baya: amincewa, haƙƙoƙin mai bayanan (data subject), da rajistar masu kula da bayanai (data controllers).
- **Kenya, Data Protection Act (2019)** da ƙa'idojinsa na 2021, tare da Dabarun AI na Ƙasa na 2025–2030, wanda ke ƙara abubuwan da ake tsammani a matakin rumbun bayanai gami da shawarar hanyoyin bincike don bayanan horar da AI.
- **Ghana, Data Protection Act (2012)**: ɗaya daga cikin na farko a nahiyar.
- **Ƙungiyar Tarayyar Afirka, Malabo Convention**: yarjejeniya ta farko a fadin nahiyar kan kare bayanan sirri da tsaron intanet, wacce ke aiki tun watan Yuni 2023 ([Malabo Convention, 2023](/references#malabo-2023)).

Buƙatun a aikace sun yi kama a cikin waɗannan dokokin: tattarawa a kan tushe na doka, yawanci cikakkiyar amincewa; amfani da bayanan kawai don manufar da kuka bayyana; girmama haƙƙoƙin mai bayanan na samun dama, gyarawa, da gogewa; kuma ku kasance a shirye don gudanar da binciken tasiri ga duk wani abu da ke ciyar da shawarwari masu sarrafa kansu. Ku duba dokar kowace ƙasa da masu bayar da gudummawarku suke ciki, ba kawai taku ba. African Next Voices ya tabbatar da wannan batu a aikace. Ya tattara kusan sa'o'i 9,000 na magana a fadin Kenya, Najeriya, da Afirka ta Kudu ([African Next Voices, 2025](/references#african-next-voices)), wanda ya sanya aiki ɗaya a ƙarƙashin dokokin kare bayanai daban-daban guda uku a lokaci guda.

## Da'a da guje wa cutarwa {#ethics-and-harm-avoidance}

### Bita mai sauƙi na da'a {#a-lightweight-ethics-review}

Kafin a fara tattarawa, ku yi wani ɗan gajeren bita na gaskiya: wa zai iya cutuwa da wannan rumbun bayanan, ta yaya, kuma menene zai rage haɗarin. Ba lallai ba ne ya zama wani kwamiti na hukuma a hukumance, wanda yawancin ayyukan al'umma ba za su iya samun dama ba, amma yana buƙatar faruwa kafin a tattara bayanai, yayin da zaɓuɓɓuka suke da sauƙin canzawa. Yadda ake yin aikin, da wanda ake tuntuɓa a kan hanya, sau da yawa yana yanke shawarar ko an yi wa al'umma aiki da gaske ko kuma an yi nazari a kanta kawai, wanda shi ne abin da alƙawuran Alhaki da Da'a na CARE suke buƙatar ku kula da su ([Carroll et al., 2020](/references#carroll-2020)).

### Bangaranci, wakilci, da cutarwa {#bias-representation-and-harm}

Ku tambayi wanda aka wakilta a cikin bayanan da wanda ya ɓace, a fadin yaruka, yankuna, jinsi, da shekaru, saboda waɗannan guraben suna zama makafin wurare na kowane ƙira (model) da aka horar a kansa. Ayyukan da suka haɗa da abubuwa masu cutarwa, kamar kalaman ƙiyayya ko yare mai ɓata rai, suna ɗauke da wani aiki na biyu na kulawa ga masu saka lakabi (annotators) waɗanda dole ne su karanta shi, wanda ake cikawa ta hanyar gargaɗin abun ciki, zaɓin fita, da tallafi (duba babi na lakabi). Rubuta bangaranci (bias) da aka sani a bayyane wani ɓangare ne na gudanarwa, ba amincewa da gazawa ba ne.

## Mallakar al'umma da raba fa'ida {#community-ownership-and-benefit-sharing}

### Tsare-tsaren gudanarwa {#governance-models}

Ku yanke shawara a rubuce kan wanda zai yanke shawara, kuma ku bar wannan ikon ga al'umma. A aikace wannan na iya zama kwamitin ba da shawara na al'umma, wani jagoran harshe da aka tsara don kowane harshe, ko wani tsari na amintattun bayanai a hukumance, kuma tsarin da ya dace ya dogara da girman aikin da tsarin al'umma. Abin da ke da mahimmanci shi ne cewa haƙƙoƙin yanke shawara a bayyane suke kuma mutanen da harshen nasu ne suke riƙe da su, maimakon komawa ga duk wanda ya kasance yana karɓar baƙuncin fayilolin.

### Raba fa'ida da yabo {#benefit-sharing-and-credit}

Gudanarwa ba ta da amfani idan ƙima tana fita waje kawai. Raba fa'ida (benefit-sharing) yana nufin ribar da aka samu daga rumbun bayanai, ko karramawa ce, biyan diyya, ƙarfin aiki, kayan aiki, ko wani kaso na ƙimar gaba, suna komawa ga masu bayar da gudummawa da al'ummarsu. Wannan shi ne tsarin ra'ayin da ke bayan ƙa'idar Kaitiakitanga License cewa fa'ida tana gudana zuwa majiya, sake zuba jarin kudaden shiga na lasisi na tsarin Esethu a cikin rumbun bayanai da ayyukan gida, da tsarin "noman bayanai" na NaijaVoices, wanda ke haɗa tattarawa tare da tallafin al'umma na juna da ƙananan tallafi don aikin harshen gida ([Te Hiku Media](/references#tehiku-kaitiakitanga); [Esethu Framework, 2025](/references#esethu-2025); [Emezue et al., 2025](/references#emezue-2025)). Aƙalla, ku yaba wa masu saka lakabi, masu magana, da al'ummomi da sunayensu a cikin takaddun bayanai da wallafe-wallafe. Su abokan ƙirƙira ne, kuma kiran sunayensu ita ce raba fa'ida mafi arha da ake da ita.

:::note[Yadda wannan ke da alaƙa]
Shawarwarin gudanarwa da aka yanke a nan suna tsara sharuɗɗan komai na gaba: abin da za ku iya [tattarawa](/data-collection/data-modalities), yadda kuke gudanar da [lakabi](/annotation-design/annotation-task-design), da abin da kuke yi wa rikodi a cikin [Rubuta Bayanai](/documentation/documentation). Ku gyara gudanarwa da wuri kuma sauran aikin zai tsaya a kan kyakkyawan harsashi.
:::
===
