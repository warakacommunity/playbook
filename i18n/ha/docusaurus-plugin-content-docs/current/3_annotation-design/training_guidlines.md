---
title: Horarwa da Ƙa'idoji
sidebar_position: 2
ready: true
last_update:
  date: 2026-09-26
  author: Shamsudddeen Hassan Muhammad
translation_status: machine
source_hash: 45b9c4c45d0a
translated_at: 2026-09-28
---

# Horarwa da Ƙa'idoji {#training-and-guidelines}

Masu sanya lakabi (annotators) suna samun daidaito ne kawai gwargwadon umarnin da aka ba su da kuma horarwar da ke daidaita su. Yawancin abin da ke kama da rashin jituwar masu sanya lakabi a zahiri rashin jituwa ne kan ƙa'idoji (guidelines), kuma ana iya gyara yawancin wannan kafin ainihin aikin ya fara. Wannan shafin ya shafi tsara ƙa'idoji da horarwa yadda ya kamata da wuri, tun lokacin da yin hakan ke da sauƙi.

## Rubuta ƙa'idoji ta hanyar amfani da misalai, ba ma'anoni ba {#write-guidelines-around-examples-not-definitions}

Ma'ana tana gaya wa mai sanya lakabi abin da lakabi (label) ke nufi. Misali yana nuna musu yadda za su yi amfani da shi. Kyakkyawan ƙa'idoji suna yin duka biyun kuma sun fi dogaro kan misalai. Ga kowane lakabi, bayar da bayyanannun misalai masu kyau, bayar da misalai marasa kyau waɗanda ke nuna iyaka da wasu lakabobi masu kama da juna, kuma ka haɗa da yanayi masu wuyar ganewa (edge cases) waɗanda idan ba haka ba kowane mai sanya lakabi zai yanke hukunci daban-daban da kansa. Faɗi a fili yadda za a bi da abubuwan da ba a tabbatar da su ba, gaurayayyu, ko "babu ɗaya daga cikin waɗanda ke sama", saboda a nan ne jituwa ke lalacewa a hankali. Ƙa'idojin harsunan Afirka suna ɗaukar ƙarin nauyi wanda ƙa'idojin Turanci ba kasafai suke fuskanta ba. Dole ne su faɗi yadda masu sanya lakabi ya kamata su bi da bambance-bambancen karin harshe, sauya harshe (code-switching) tsakanin ainihin harshen da kuma harshen 'yan mulkin mallaka, ƙa'idojin rubutu (orthographies) da ba su da daidaito ko masu gasa da juna, da kuma maganganun da suka shafi al'ada waɗanda wanda ba ɗan asali ba ba zai gane ma'anarsu ba. Yanke hukunci kan waɗannan yanayoyi sau ɗaya, a cikin ƙa'idar, maimakon sau dubbai, daban-daban, a cikin bayanan.

:::tip[Samfuri: Ƙa'idojin sanya lakabi]
Takardar ƙa'idoji ta cike-gurbi wacce aka tsara ta bisa tsarin MasakhaNER 2 da AfriSenti. Ta ƙunshi ma'anoni, tsarin yanke hukunci mataki-mataki, rukunin lakabi, ƙa'idojin rubutu da alamomin wasali (diacritics), maƙasudin jituwa, yanke hukunci (adjudication), da kuma tarihin sauye-sauye (change log). [Buɗe samfurin ƙa'idojin sanya lakabi](/templates/annotation-guidelines).
:::

## Horarwa da daidaitawa har sai masu sanya lakabi sun dace da juna {#train-and-calibrate-until-annotators-converge}

Horarwa tana mayar da rubutacciyar ƙa'ida zuwa fahimta ɗaya, don haka gudanar da ita kafin a fara sanya lakabi (annotation) kuma ka tsara ta maimakon barin ta a matsayin karatu kawai. Aikin gano sunaye (named-entity) na Masakhane yana ba da kyakkyawan tsari. Aikin MasakhaNER 2.0, kowane harshe yana da mai gudanarwa wanda da farko ya sanya lakabi ga wasu jimloli da kansa kuma aka horar da shi a tarurrukan bita na intanet guda biyu, wanda kuma daga baya ya horar da tawagar masu sanya lakabi guda uku waɗanda suke 'yan asalin masu jin wannan harshen ([Adelani et al., 2022](/references#adelani-2022)). Zagayen daidaitawa (calibration) yana amfani da irin wannan tsarin a ƙaramin mataki: sa masu sanya lakabi da yawa su sanya lakabi ga samfuri ɗaya, kwatanta lakabobinsu, tattauna rashin jituwar a fili, sannan a maimaita har sai jituwa ta kai matakin da ake buƙata kafin ainihin aikin ya fara. AfriSenti ya cimma jituwar masu sanya lakabi (inter-annotator agreement) sama da 0.70 kan gano ra'ayi (sentiment) ta hanyar haɗa 'yan asalin masu jin harshen tare da bayyanannun ƙa'idoji da kuma ainihin irin wannan daidaitawar ([Muhammad et al., 2023](/references#muhammad-2023)). Jituwar da aka cimma ta wannan hanyar ana samunta ne ta hanyar aiki, ba wai ana tsammaninta ba ne kawai.

## Gudanar da gwaji, sannan a inganta tsarin {#pilot-then-iterate-the-design}

Gwaji (pilot) wani ƙaramin aiki ne na gwada ainihin aikin gaba ɗaya, kuma manufarsa ita ce gano abin da ke da matsala a lokacin da gyara shi ke da sauƙi. Sanya lakabi ga wani ƙaramin yanki mai wakiltar aikin tare da ainihin masu sanya lakabinka da ainihin manhajarka, sannan ka nemi umarnin da ba su da tabbas, lakabobin da ke cin karo da juna, da kuma abubuwan da ke ɗaukar lokaci mai tsawo fiye da yadda ake tsammani. Auna daidaito da wahala, tattara ra'ayoyin masu sanya lakabi kan abin da ya rudar da su, sannan ka mayar da duk wannan bayanin cikin ƙa'idojin, rukunin lakabi, da tsarin aikin. Ka yi tsammanin yin gyare-gyare. Gwajin da bai canza komai ba yawanci yana nufin babu wanda ya duba da kyau.

## Tabbatar da tsarin tare da mafi ƙarancin rumbun bayanai mai amfani {#prove-the-design-with-a-minimum-viable-dataset}

Kafin ka tsunduma cikin aikin sanya lakabi gadan-gadan, gina mafi ƙarancin rumbun bayanai mai amfani (minimum viable dataset), wani ƙaramin yanki mai wakiltar aikin wanda aka sanya wa lakabi tun daga farko har ƙarshe. Yana tabbatar da abubuwan da ke da tsada idan aka yi kuskure a babban mataki: ko tsarin lakabin ya ƙunshi bayanan gaba ɗaya, ko tsarin aikin da manhajar suna aiki yadda ya kamata, da kuma ko farashin kowane abu zai sa aikin gaba ɗaya ya kasance mai yiwuwa a fannin kuɗi. Dauki sakamakonsa a matsayin matakin yanke hukunci. Idan mafi ƙarancin rumbun bayanai mai amfani ya fito da kyau kuma da daidaito, faɗaɗa aikin. Idan bai yi haka ba, sake tsara aikin yanzu, maimakon bayan abubuwa dubu goma sun gadi wannan kuskuren.
