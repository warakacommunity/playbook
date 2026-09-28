---
title: Tsara Aikin Lakabi da Abubuwan da Suka Shafi Ɗan Adam
sidebar_position: 1
ready: true
last_update:
  date: 2026-07-07
  author: Idris Abdulmumin
translation_status: machine
source_hash: 282e3ad159d9
translated_at: 2026-09-28
---

# Tsara Aikin Lakabi da Abubuwan da Suka Shafi Ɗan Adam {#annotation-task-design-and-human-factors}

Tsarin aikin lakabi (annotation) yana tabbatar da ingancinsa tun kafin a sanya lakabin farko. Aikin da ke a bayyane, mai kyakkyawan tsari, kuma mai sauƙin yi yana samar da bayanai masu inganci a kowane lokaci. Wanda ke sanya wa mutanen da ke yinsa nauyi da yawa ko gajiyarwa yana samar da bayanai marasa amfani, komai kyawun ƙa'idojin aikin. Ka tsara aikin don ɗan adam ɗin da zai zauna da shi na tsawon sa'o'i.

## Ƙiyasta sarƙaƙiyar aikin kafin ka faɗaɗa shi {#estimate-task-complexity-before-you-scale}

Kowane mataki na sanya lakabi yana zuwa da nauyin tunani, kuma wannan nauyin yana ƙaruwa a kan abubuwa dubbai. Hukunci mai zaɓi biyu, kamar ko rubutu yana ɗauke da zagi ko a'a, ya fi sauƙi sosai fiye da mai lakabi da yawa, kamar sanya dukkanin yanayin zuciya da suka dace daga cikin guda takwas, wanda shi ma ya fi sauƙi fiye da aikin matakin tsayi (span-level) kamar yi wa kowane suna (named entity) da nau'insa alama. Ka ƙiyasta sarƙaƙiyar aikin a gaskiye, domin ita ce ke jagorantar kasafin kuɗi da kuma yawan kura-kurai. A inda aikin yake da matuƙar sarƙaƙiya, raba shi zuwa jerin matakai masu sauƙi maimakon neman a yi komai a lokaci ɗaya. Aikin gano sunaye na Masakhane ya sanya ayyukansa na kowane harshe su kasance masu sauƙin gudanarwa ta hanyar ba kowane harshe ƙaramar ƙungiyarsa da ke aiki da ƙa'ida ɗaya mai sauƙi da aka raba maimakon tsarin sanya lakabi guda ɗaya mai faɗi ([Adelani et al., 2022](/references#adelani-2022)). Yi amfani da aikin gwaji (pilot) don auna ainihin lokacin da ake ɗauka a kan kowane abu, kuma ka bari wannan adadin, ba kyakkyawan zato ba, ya tsara jadawalin aikin.

## Tsara aikin don guje wa gajiyar masu sanya lakabi {#design-against-annotator-fatigue}

Inganci yana raguwa yayin da natsuwa ke raguwa. Zama mai tsayi ba tare da hutu ba, ayyuka masu maimaita kansu, da abubuwa masu ruɗani duka suna gajiyar da masu sanya lakabi (annotators), kuma masu sanya lakabi da suka gaji suna zaɓar lakabi mai sauƙi maimakon wanda ya dace. Ka tsara wannan ta hanyar yin ayyuka a gungu-gungu masu gajeren lokaci, samun hutu akai-akai, da kuma canza nau'in ayyuka idan aikin ya ba da damar hakan. Gajiya ba matsalar inganci ba ce kawai. Ga ayyukan da ke nuna wa masu sanya lakabi kalaman ƙiyayya, cin zarafi, ko wasu abubuwa masu tayar da hankali, wanda ya zama ruwan dare a cikin bayanan yanayin zuciya da tsaro na Afirka, daɗewa ana fuskantar su yana zama matsalar lafiyar ƙwaƙwalwa, kuma yana buƙatar gargaɗi game da abubuwan da ke ciki, damar tsallakewa ko tsayawa, ƙayyade yawan aiki, da samun tallafi (an tattauna wannan a babi na sanya lakabi da [data governance](/data-governance/)). Ɗaukar aikin sanya lakabi a matsayin aikin ƙwarewa, mai ɗorewa maimakon dannawa kawai da za a watsar shi ne kuma abin da ke sa a samu kyakkyawar ƙungiya a shirye don aikin gaba ([Sambasivan et al., 2021](/references#sambasivan-2021)).

## Bari manhajar aiki ta yi wani ɓangare na aikin {#let-the-interface-do-some-of-the-work}

Manhajar sanya lakabi wani ɓangare ne na tsarin aikin, ba kawai wani wuri ba ne na ajiya. Kyakkyawar manhaja tana kawar da kura-kurai da yawa tun kafin su faru. Tana ƙayyade abubuwan da ake shigarwa zuwa ga rukunin lakabin da aka amince da su don kar kuskuren rubutu ya zama sabon rukuni, tana nuna mahallin da ke kewaye da kalma wanda mai sanya lakabi ke buƙata don yanke hukunci a kan kalmar a cikin jimla, kuma tana amfani da gajerun hanyoyin maballin rubutu (keyboard shortcuts) don aikin ya kasance da sauri kuma ba tare da gajiyar jiki ba. Ƙuntatawa biyu suna da muhimmanci musamman ga ayyukan Afirka. Yawancin masu sanya lakabi suna aiki a kan na'urori masu ƙaramin ƙarfi tare da hanyar sadarwa mai yankewa da tsada, don haka ya kamata manhajar ta kasance mai sauƙi, mai jure yankewar hanyar sadarwa, kuma mai yiwuwar amfani a kan ƙaramin allo. Ya kamata kuma ta kula da tsarin rubutun harshen da ake aiki a kai yadda ya kamata, gami da alamomin wasali da rubutun da ba na Latin ba, ta yadda abin da mai sanya lakabi ya rubuta shi ne abin da za a adana. Aikin da ke da wahalar yi za a yi shi a cikin wahala.

## Tsarin sanya lakabi (labeling configuration) {#a-labeling-configuration}

Waɗannan ƙa'idojin ba wai a iska suke ba: zaɓuɓɓuka ne da kake yi a cikin tsarin sanya lakabi (labeling configuration). Misalan da ke cikin wannan AfriPlaybook suna amfani da tsarin Label Studio, wani buɗaɗɗen tsarin XML wanda manhajojin sanya lakabi da yawa ke goyan baya (ciki har da manhajar da ke tare da wannan littafin, AfriAnnotate), don haka tsare-tsaren (configs) da ke nan ana iya amfani da su a wurare daban-daban maimakon a ɗaure su da wata manhaja guda ɗaya. Tsari (config) wata ƙaramar takarda ce, mai sauƙin karantawa wacce ke bayyana ainihin abin da mai sanya lakabi zai gani da kuma abin da aka ba shi damar yi. Misalin da ke ƙasa yana tsara aikin sanya lakabi guda ɗaya na yanayin zuciya irin wanda ke bayan AfriSenti ([Muhammad et al., 2023](/references#muhammad-2023)).

```xml
<View>
  <!-- The source text sits in its own card so the annotator can always tell
       the content apart from the instruction prompts and labels below it. -->
  <View style="background:#FBF7F0; border:1px solid #E7DDCB; border-radius:8px; padding:14px 16px; margin-bottom:18px;">
    <Text name="text" value="$text"/>
  </View>

  <!-- One choice only, drawn from a fixed set: a typo cannot become
       a new category, and the decision stays a cheap binary-style call. -->
  <Choices name="sentiment" toName="text" choice="single" required="true">
    <Choice value="Positive" hotkey="1"/>
    <Choice value="Neutral"  hotkey="2"/>
    <Choice value="Negative" hotkey="3"/>
  </Choices>

  <!-- An explicit escape hatch, so a tired or unsure annotator skips
       rather than guessing. These get routed to adjudication. -->
  <Choices name="flag" toName="text" choice="single">
    <Choice value="Code-mixed / wrong language" hotkey="8"/>
    <Choice value="Unclear, needs a second opinion" hotkey="9"/>
  </Choices>
</View>
```

Uku daga cikin abubuwan da aka tsara a sama an tilasta su kai tsaye a cikin wannan tsarin (config). `choice="single"` tare da ƙayyadadden rukunin `<Choice>` yana ƙuntata abin da ake shigarwa zuwa ga lakabin da aka amince da su kawai, don haka manhajar, ba takardar ƙa'idoji ba, ce ke hana ɓatattun rukunai. Siffofin `hotkey` suna ba mai sanya lakabi damar yin aiki gaba ɗaya daga maballin rubutu (keyboard), wanda ya fi sauri kuma ya fi sauƙi ga hannaye a tsawon lokacin aiki. Kuma ɓangaren `flag` yana ba da tabbatacciyar hanyar tsallakewa da tattaunawar gajiya ta buƙata, maimakon tilasta yin hasashe. Saka rubutun a cikin nasa tsarin na `<View>` wani ƙaramin abu ne da ke da muhimmanci a kan abubuwa dubbai: yana raba abin da ke ciki daga umarni da lakabi, ta yadda mai sanya lakabi ba zai taɓa ruɗewa tsakanin abin da yake karantawa da abin da ake tambayarsa ba.

Wannan tsarin yana bayyana, ga mai sanya lakabi, a matsayin tsaftataccen allon aiki guda ɗaya inda ainihin rubutun ya fito daban da tambayar:

![Aikin sanya lakabi guda ɗaya na yanayin zuciya a cikin manhajar sanya lakabi ta AfriAnnotate](/afriannotate-demo/01-text-nlp/01-sentiment-classification/3-label-selected.png)

Ga aikin matakin tsayi (span-level) kamar gano sunaye (named-entity recognition), tsari iri ɗaya yana bayyana aiki mai wahala ta hanyar canza `<Choices>` zuwa `<Labels>`, wanda ke ba mai sanya lakabi damar zaɓar wani yanki na rubutu ya yi masa alama:

```xml
<View>
  <Labels name="entities" toName="text">
    <Label value="PER" hotkey="1" background="#e8743b"/>
    <Label value="ORG" hotkey="2" background="#19a979"/>
    <Label value="LOC" hotkey="3" background="#945ecf"/>
    <Label value="DATE" hotkey="4" background="#13a4b4"/>
  </Labels>
  <Text name="text" value="$text"/>
</View>
```

Filin `$text` a cikin duka tsare-tsaren biyu yana dacewa kai tsaye da filin `text` a cikin tsaftatattun bayanan JSONL daga babin [Data Collection](../data-collection/data-cleaning-preprocessing), don haka matakin shigo da bayanai shine kawai ɗora wannan fayil ɗin: kowane layi yana zama aiki ɗaya, kuma filayen asali suna tafiya tare ba tare da an canza su ba. Farawa daga ƙaramin tsari (config) kamar wannan, da faɗaɗa shi kawai lokacin da aikin gwaji (pilot) ya nuna ana buƙatar hakan, yana sa aikin ya kasance mai sauƙin gudanarwa ta hanyar da tattaunawar sarƙaƙiya da ke sama ta ba da shawara.

Zaɓar wani yanki na rubutu da yi masa alama a matsayin suna (entity), a cikin manhajar AfriAnnotate:

![Yi wa suna alama a cikin AfriAnnotate](/afriannotate-demo/gifs/ner.gif)

## Daga tsari (config) zuwa aikin da ke gudana {#from-a-config-to-a-running-project}

Bayyana tsarin (config) shine kawai matakin farko; ɗora bayanai da sanya musu lakabi shine sauran aikin. Ƙaramin bayanin da ke ƙasa yana nuna cikakken tsarin, ƙirƙirar aiki, ɗora fayil ɗin CSV na ayyuka, zaɓar samfurin sanya lakabi, da sanya lakabi ga kowane aiki:

<video controls width="100%" style={{borderRadius: '10px', border: '1px solid var(--ifm-color-emphasis-200)'}} src="/afriannotate-demo/00-workflow/project-creation/process.mp4"></video>
