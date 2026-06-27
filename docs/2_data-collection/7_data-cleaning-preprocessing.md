# Data Cleaning and Preprocessing

Learn how to prepare raw data for use in language AI systems by improving quality, consistency, and usability.

## Why Data Cleaning Matters

Raw data often contains noise, inconsistencies, and errors. Proper cleaning and preprocessing ensure that datasets are reliable, accurate, and suitable for downstream tasks such as training and evaluation.

## Key Steps in Data Cleaning

### Deduplication, Normalization, and Filtering

- **Deduplication** – Remove duplicate entries to avoid bias and overrepresentation  
- **Normalization** – Standardize text (e.g., casing, punctuation, encoding)  
- **Filtering** – Remove irrelevant, low-quality, or out-of-scope data  

### Language Detection and Formatting

- **Language detection** – Identify and verify the language of each data instance  
- **Formatting** – Ensure consistent structure (e.g., JSON, CSV, text fields)  
- **Encoding consistency** – Maintain uniform character encoding (e.g., UTF-8)  

### Noise and Toxicity Handling

- **Noise removal** – Clean unwanted artifacts such as HTML tags, emojis (if not needed), or corrupted text  
- **Toxicity handling** – Detect and manage harmful, offensive, or unsafe content depending on project goals  

### Missing and Corrupted Data Handling

- **Missing data** – Identify incomplete entries and decide whether to fill, ignore, or remove them  
- **Corrupted data** – Detect broken or unreadable content and clean or discard it  
- **Validation checks** – Ensure data integrity after preprocessing  

## A cleaning pipeline, end to end

The steps above are easier to keep honest when they are written as one pass over the raw records. The function below takes the JSONL produced by the collectors in [Web Scraping](./web-scraping) and [APIs](./application-programming-interfaces), then normalizes, deduplicates, language-filters, and length-filters in a single pass, writing both the cleaned data and a small report of what was dropped and why.

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

The duplicate check here is exact-match, which is enough for most collection runs. When near-duplicates are a concern, for example the same news wire republished across several sites with minor edits, reach for MinHash with a library such as `datasketch` rather than comparing every pair, which does not scale. The printed report is not an afterthought: a cleaning step that silently drops most of its input is usually a sign of a wrong language code or a bad threshold, and you only notice if the counts are in front of you.

## A note on the cleaned format

Keeping cleaned data as JSONL, one record per line, is the most practical default for African-language work. It streams without loading the whole file into memory, it survives being appended to, and every record carries its own provenance fields rather than relying on a separate manifest. A single cleaned record looks like this:

```json
{
  "text": "Kano ita ce cibiyar kasuwanci a arewacin Najeriya.",
  "language": "hau_Latn",
  "source_url": "https://example.org/hausa-article-1",
  "license": "CC BY-SA 4.0",
  "collected_at": "2026-02-14T09:31:00+00:00"
}
```

CSV is a reasonable alternative for purely tabular data with no embedded newlines, but it handles multi-line text and commas-in-text poorly, and the diacritics common in African orthographies are more reliably preserved in UTF-8 JSON than in spreadsheets that may re-encode on save. Whatever the format, write it as UTF-8 and never let a tool silently downgrade the encoding.