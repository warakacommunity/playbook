---
ready: true
last_update:
  date: 2026-07-07
  author: Idris Abdulmumin
translation_status: machine
source_hash: 54b0fe739aba
translated_at: 2026-09-28
---
# Asalin Bayanai da Binciko Hanyarsu (Data Provenance and Traceability) {#data-provenance-and-traceability}

Koyi yadda za ka bibiyi asali, tarihi, da sauye-sauyen bayanan ka don tabbatar da gaskiya, sake samarwa (reproducibility), da kuma ɗaukar alhaki.

## Me Ya Sa Asalin Bayanai (Provenance) Ke Da Muhimmanci {#why-provenance-matters}

Fahimtar inda bayanai suka fito da kuma yadda aka sarrafa su yana da muhimmanci wajen gina rumbun bayanai (datasets) masu abin dogaro. Asalin bayanai yana tallafawa sake samarwa, yana ba da damar yin binciken ƙwaƙwaf (auditing), kuma yana taimakawa wajen gano matsalolin da ka iya tasowa a ingancin bayanai da kuma nuna son kai (bias).

## Muhimman Abubuwan da Suka Ginu a Asalin Bayanai {#key-components-of-provenance}

### Bibiyar Asali (Source Tracking) {#source-tracking}

- **Adiresoshin intanet (URLs) da manazarta** – Yi rikodin adiresoshin intanet ko asalin inda aka samo bayanan  
- **Masu bayar da gudummawa** – Bibiyi wanda ya tattara, ya ƙirƙira, ko ya bayar da bayanan  
- **Yanayin tattarawa** – Rubuta yaushe, a ina, kuma ta yaya aka samo bayanan  

### Jerin Asalin Bayanai (Data Lineage) {#data-lineage}

- **Sauyawar bayanai** – Bibiyi yadda bayanai ke sauyawa a tsawon lokaci  
- **Tsarin juzu'i (Versioning)** – Kula da juzu'o'i daban-daban na rumbun bayanai  
- **Bibiyar matakan aiki (Pipeline tracking)** – Rubuta kowane mataki na sarrafa bayanai  

### Bayanan Sauye-sauye (Transformation Logs) {#transformation-logs}

- **Matakan riga-kafin sarrafawa (Preprocessing steps)** – Yi rikodin ayyukan tsaftacewa, daidaitawa (normalization), da tace bayanai  
- **Matakan sanya lakabi (Annotation processes)** – Bibiyi hanyoyin sanya lakabi da ƙa'idojin da aka yi amfani da su  
- **Gyare-gyare** – Yi rikodin duk wani sauyi da aka yi wa bayanan bayan an tattara su  
- **Hanyoyin binciken ƙwaƙwaf (Audit trails)** – Kula da bayanan da aka ajiye don sake samarwa da kuma tantancewa  

## Katin rumbun bayanai (dataset card) da za ka iya yi wa tsarin juzu'i {#a-dataset-card-you-can-version}

Asalin bayanai na kowane layi (Per-record provenance), kamar filayen da masu tattarawa da masu tsaftacewa ke sanyawa a kowane layi, yana amsa tambayar "daga ina wannan layin ya fito". Katin rumbun bayanai yana amsa wannan tambayar ga rumbun bayanan gaba ɗaya, a cikin fayil guda ɗaya wanda ke zama a ma'adanar (repository) kusa da bayanan kuma yana sauyawa tare da shi. Rubuta shi a matsayin YAML yana sa ya kasance mai sauƙin karantawa, mai sauƙin gano bambanci a tsarin kula da juzu'i (version control), kuma kayan aiki za su iya karanta shi. Wannan tsari yana bin ruhin ƙa'idojin rubuta bayanai da aka tattauna a [Rubuta Bayanai](/documentation/documentation), an bar shi a taƙaice yadda za a iya kula da shi a aikace.

```yaml
# dataset-card.yaml
name: hausa-news-2026
version: 1.1.0
languages:
  - hau_Latn          # Hausa, Latin script (ISO 639-3 + script)
modality: text
task: text-classification
size:
  records: 18432
  collected_records: 24901   # before cleaning, for an honest drop rate

sources:
  - name: Example Hausa news portal
    url: https://example.org
    method: web-scraping
    license: CC BY-SA 4.0
    access_date: 2026-02-14
  - name: Hausa Wikipedia
    url: https://ha.wikipedia.org
    method: wikimedia-api
    license: CC BY-SA 4.0
    access_date: 2026-02-15

processing:
  - step: normalize
    detail: Unicode NFC, whitespace collapse, control-char strip
  - step: deduplicate
    detail: exact case-folded match
  - step: language-filter
    detail: GlotLID, threshold 0.7, kept hau_Latn only

governance:
  consent: not-applicable      # public, already-published text
  owner: Example Community NLP Group
  contact: data@example.org
  pii_reviewed: true

citation: >
  Example Community NLP Group (2026). hausa-news-2026 (v1.1.0).
```

Filaye biyu a nan sun sami gurbinsu musamman don aikin harsunan Afirka. Yin rikodin `collected_records` tare da `size` na ƙarshe yana sa a ga adadin abin da aka zubar: idan aikin tsaftacewa ya bar wani ɗan ƙaramin kaso ne kawai na abin da aka tattara, ya kamata a bayyana hakan a fili, ba a ɓoye ba. Kuma tabbatar da harshen a matsayin `hau_Latn`, tare da lambar ISO 639-3 da kuma haruffan rubutun, yana guje wa ruɗanin da lambobi zalla kamar `ha` ke kawowa, wanda ke da muhimmanci ga harsunan da ake rubutawa da haruffa fiye da ɗaya.

## Bayanan sauye-sauye (transformation log) da ke tafiya tare da bayanai {#a-transformation-log-that-travels-with-the-data}

Katin rumbun bayanai yana yin rikodin yanayin da ake ciki yanzu. Bayanan sauye-sauye yana yin rikodin tarihi, ana ƙara layi ɗaya a duk lokacin da bayanan suka sauya, ta yadda koyaushe za a iya bibiyar juzu'in da aka saki ta kowane mataki da ya samar da shi. Ƙarawa a cikin bayanan JSONL ya isa, kuma ba ya buƙatar wani abu don kiyaye shi:

```json
{"version": "1.0.0", "date": "2026-02-16", "action": "initial-collection", "records": 24901, "by": "A. Bello", "notes": "raw scrape + wikipedia pull"}
{"version": "1.0.1", "date": "2026-02-18", "action": "cleaning", "records": 19120, "by": "pipeline v2", "notes": "normalize, dedup, language-filter"}
{"version": "1.1.0", "date": "2026-03-02", "action": "manual-review", "records": 18432, "by": "native-speaker reviewers", "notes": "removed 688 mislabelled and off-topic records"}
```

Idan aka karanta daga sama zuwa ƙasa, wannan bayanin yana ba da cikakken labarin rumbun bayanan: nawa aka tattara, nawa suka tsira daga tsaftacewa, da kuma abin da bita ta ɗan adam ta sauya. Wannan shi ne ainihin hanyar binciken ƙwaƙwaf da ke sa a iya kare rumbun bayanai daga baya, kuma ya fi sauƙi a ƙara layi a kowane mataki fiye da ƙoƙarin sake gina tarihin daga ƙwaƙwalwa a lokacin fitarwa.
