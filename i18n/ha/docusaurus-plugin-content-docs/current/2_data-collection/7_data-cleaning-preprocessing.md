---
ready: true
last_update:
  date: 2026-07-07
  author: Idris Abdulmumin
translation_status: machine
source_hash: 6cd7da976931
translated_at: 2026-09-28
---
# Tsaftace Bayanai da Shirya Su {#data-cleaning-and-preprocessing}

Koyi yadda ake shirya ɗanyun bayanai (raw data) don amfani a tsarin fasahar AI na harshe ta hanyar inganta inganci, daidaito, da kuma sauƙin amfani.

## Dalilin da ya sa Tsaftace Bayanai ke da Muhimmanci {#why-data-cleaning-matters}

Ɗanyun bayanai sau da yawa suna ɗauke da abubuwan da ba a buƙata (noise), rashin daidaito, da kurakurai. Tsaftacewa da shiryawa yadda ya kamata suna tabbatar da cewa ma'ajin bayanai (datasets) abin dogaro ne, sahihai, kuma sun dace da ayyuka na gaba kamar horarwa (training) da tantancewa (evaluation).

## Muhimman Matakai a Tsaftace Bayanai {#key-steps-in-data-cleaning}

### Cire Maimaici, Daidaitawa, da Tace Bayanai {#deduplication-normalization-and-filtering}

- **Cire Maimaici (Deduplication)** – Cire bayanan da suka maimaita kansu don guje wa karkata (bias) da yawan wakilci fiye da kima  
- **Daidaitawa (Normalization)** – Daidaita rubutu (misali, manya da ƙananan baƙaƙe, alamomin rubutu, tsarin rubutu ko encoding)  
- **Tace Bayanai (Filtering)** – Cire bayanan da ba su dace ba, marasa inganci, ko waɗanda ba su cikin tsarin aikin  

### Gano Harshe da Tsara Fasali {#language-detection-and-formatting}

- **Gano harshe (Language detection)** – Gano da kuma tabbatar da harshen kowane guntun bayani  
- **Tsara fasali (Formatting)** – Tabbatar da tsari mai daidaito (misali, JSON, CSV, guraben rubutu)  
- **Daidaiton tsarin rubutu (Encoding consistency)** – Kula da tsarin haruffa iri ɗaya (misali, UTF-8)  

### Kula da Abubuwan da ba a Buƙata da Kalamai Masu Cutarwa {#noise-and-toxicity-handling}

- **Cire abubuwan da ba a buƙata (Noise removal)** – Tsaftace abubuwan da ba a so kamar alamomin HTML, emojoji (idan ba a buƙatarsu), ko rubutun da ya lalace  
- **Kula da kalamai masu cutarwa (Toxicity handling)** – Gano da kuma kula da abubuwa masu cutarwa, ɓatanci, ko marasa tsaro dangane da manufofin aikin  

### Kula da Bayanan da Suka Ɓata da Waɗanda Suka Lalace {#missing-and-corrupted-data-handling}

- **Bayanan da suka ɓata (Missing data)** – Gano bayanan da ba su cika ba sannan a yanke shawarar ko za a cike su, a yi watsi da su, ko a cire su  
- **Bayanan da suka lalace (Corrupted data)** – Gano abubuwan da suka karye ko ba za su karantu ba sannan a tsaftace su ko a zubar da su  
- **Binciken tabbatarwa (Validation checks)** – Tabbatar da ingancin bayanai bayan an gama shirya su  

## Tsarin tsaftacewa, tun daga farko har ƙarshe {#a-cleaning-pipeline-end-to-end}

Matakan da ke sama sun fi sauƙin kiyayewa idan an rubuta su a matsayin aiki guda ɗaya a kan ɗanyun bayanan. Fankishin (function) da ke ƙasa yana ɗaukar JSONL ɗin da masu tattara bayanai suka samar a [Web Scraping](./web-scraping) da [APIs](./application-programming-interfaces), sannan ya daidaita, ya cire maimaici, ya tace harshe, kuma ya tace tsayi a lokaci guda, inda zai rubuta duka bayanan da aka tsaftace da kuma ɗan ƙaramin rahoto na abubuwan da aka cire da kuma dalilin yin hakan.

```python
import json
import re
import unicodedata
from collections import Counter


def normalize(text: str) -> str:
    """NFC-normalize Unicode, collapse whitespace, strip control characters.
    NFC matters for African scripts: the same Yoruba or Amharic character can
    be encoded as one codepoint or as a base plus combining marks, and the two
    forms will not deduplicate or match unless normalized first."""
    text = unicodedata.normalize("NFC", text)
    text = "".join(ch for ch in text if unicodedata.category(ch)[0] != "C")
    return " ".join(text.split())


def clean(in_path: str, out_path: str, expected_lang: str,
          min_words: int = 5) -> None:
    from glotlid import GlotLID

    identifier = GlotLID()
    seen: set[str] = set()
    dropped = Counter()
    kept = 0

    with open(in_path, encoding="utf-8") as src, \
         open(out_path, "w", encoding="utf-8") as out:
        for line in src:
            record = json.loads(line)
            text = normalize(record.get("text", ""))

            if len(text.split()) < min_words:
                dropped["too_short"] += 1
                continue

            fingerprint = text.casefold()
            if fingerprint in seen:           # exact-duplicate removal
                dropped["duplicate"] += 1
                continue
            seen.add(fingerprint)

            label, score = identifier.predict(text)
            if not label.startswith(expected_lang) or score < 0.7:
                dropped[f"wrong_language:{label}"] += 1
                continue

            record["text"] = text
            record["language"] = label
            out.write(json.dumps(record, ensure_ascii=False) + "\n")
            kept += 1

    print(f"Kept {kept} records.")
    for reason, count in dropped.most_common():
        print(f"Dropped {count}: {reason}")


if __name__ == "__main__":
    clean("raw_hausa.jsonl", "clean_hausa.jsonl", expected_lang="hau")
```

Binciken maimaici a nan na kamanceceniya ne daki-daki (exact-match), wanda ya isa ga yawancin ayyukan tattara bayanai. Idan ana damuwa da bayanan da suka kusan yin kama da juna (near-duplicates), misali labari ɗaya da aka sake wallafawa a shafuka daban-daban da ƴan gyare-gyare kaɗan, yi amfani da MinHash tare da wani kundi (library) kamar `datasketch` maimakon gwada kowane biyu, wanda ba zai yiwu ba idan bayanan suna da yawa. Rahoton da aka buga ba wani abu ba ne da ake tunawa daga baya: matakin tsaftacewa da ke cire yawancin bayanansa a asirce yawanci alama ce ta kuskuren lambar harshe (language code) ko ƙa'idar da ba ta dace ba (bad threshold), kuma za ka lura da hakan ne kawai idan ƙididdigar tana gabanka.

## Wani bayani kan tsarin da aka tsaftace {#a-note-on-the-cleaned-format}

Ajiye bayanan da aka tsaftace a matsayin JSONL, layi ɗaya ga kowane bayani, shi ne tsari mafi dacewa ga ayyukan harsunan Afirka. Yana gudana ba tare da loda gaba ɗaya fayil ɗin a cikin ƙwaƙwalwar na'ura (memory) ba, yana jurewa a ƙara masa wasu bayanan (appended to), kuma kowane bayani yana ɗauke da guraben asalinsa (provenance fields) maimakon dogaro da wani fayil na daban (manifest). Guda ɗaya daga cikin bayanan da aka tsaftace yana kama da haka:

```json
{
  "text": "Kano ita ce cibiyar kasuwanci a arewacin Najeriya.",
  "language": "hau_Latn",
  "source_url": "https://example.org/hausa-article-1",
  "license": "CC BY-SA 4.0",
  "collected_at": "2026-02-14T09:31:00+00:00"
}
```

CSV wani zaɓi ne mai kyau ga bayanai masu tsarin teburi (tabular data) waɗanda ba su da sabbin layuka a cikinsu (embedded newlines), amma ba ya aiki da kyau wajen sarrafa rubutu mai layuka da yawa da kuma waƙafi a cikin rubutu (commas-in-text), sannan alamomin lafazi (diacritics) da suka zama ruwan dare a tsarin rubutun Afirka sun fi samun kariya a cikin UTF-8 JSON fiye da a cikin manhajojin lissafi (spreadsheets) waɗanda za su iya canza tsarin rubutun (re-encode) yayin adanawa. Ko wane irin tsari ne, rubuta shi a matsayin UTF-8 kuma kada ka taɓa barin wani kayan aiki (tool) ya rage darajar tsarin rubutun a asirce.
