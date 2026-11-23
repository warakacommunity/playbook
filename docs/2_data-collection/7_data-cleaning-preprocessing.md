---
ready: true
last_update:
  date: 2026-11-23
  author: Idris Abdulmumin
---
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

### Preparing Media for Annotation

Audio and video usually reach annotators through a web browser or a phone. Files that play fine on the collector's laptop can fail there: some codecs do not play in every browser, large files stall on slow links, and a video whose index sits at the end starts slowly and can waste mobile data. Prepare a copy of each file for annotation and keep the original (the master) unchanged.

- **Use widely supported formats.** For video, MP4 with H.264 (AVC) video and AAC audio plays in every major browser; WebM with AV1 and Opus is the open alternative but has gaps on older Apple devices ([MDN Web Docs, 2026c](../references.md#mdn-video-codecs)). For audio, AAC in MP4 and MP3 play in all major browsers, and FLAC is the better-supported choice when you need lossless audio ([MDN Web Docs, 2026d](../references.md#mdn-audio-codecs)). Test your chosen format on the devices your annotators actually use.
- **Make MP4 files streamable.** An MP4 file has an index (the `moov` atom) that the player needs before it can start. When the index sits at the end of the file, the player must first fetch the end of the file, which costs extra requests and a slower start, or, without range requests, the whole file. FFmpeg's `faststart` option moves the index to the beginning of the file; it is off by default and does not work with fragmented output ([FFmpeg Developers, n.d.-c](../references.md#ffmpeg-formats)).
- **Serve media from storage that supports range requests.** With HTTP range requests a player can fetch only the part of a file it needs, so annotators can seek within a long recording without downloading all of it. A server that supports them advertises `Accept-Ranges` in its responses ([MDN Web Docs, 2026b](../references.md#mdn-range-requests)). Check this before you point your annotation tool at a storage bucket.
- **Set limits for heavy files.** Decide a maximum size and duration for one item, based on your annotators' devices and connections, and split or re-encode anything larger. For speech, split at pauses rather than at fixed times (see [Segmenting long recordings](../asr/index.md#segmenting-long-recordings)). Lighter files matter most for people working on phones or [offline](./10_offline-field-operations.md).
- **Check files before annotators see them.** Empty, truncated or silent files waste annotation time; flag them at ingest (for speech corpora, see [Audio Quality Control](../asr/audio-quality-control.md#tier-1-signal-checks-on-every-clip); see also [Quality assurance in Audio Understanding](../audio-understanding/index.md#quality-assurance)). After any conversion, check that each file's duration still matches the original, because timestamps in the annotations refer to it.
- **Encode for frame-accurate work when you need it.** Tasks that step frame by frame, such as sign-language glossing, need a constant frame rate and tighter keyframe settings; see [Preparing video for annotation](../sign-language-video/video.md#preparing-video-for-annotation) and, for sign language, [Recording](../sign-language-video/sign-language.md#recording).

A typical conversion for browser playback:

```bash
# Re-encode a phone video to H.264 video and AAC audio, with the index at the front.
# yuv420p keeps 8-bit colour, which browsers play (phone HDR video is often 10-bit).
ffmpeg -i interview.mov -c:v libx264 -pix_fmt yuv420p -c:a aac -movflags +faststart interview.mp4

# A file that is already 8-bit H.264 with AAC audio only needs the index moved, without re-encoding.
ffmpeg -i clip.mp4 -c copy -movflags +faststart clip_web.mp4
```

Record each conversion (tool, version, settings) in the [transformation log](./8_data-provenance-traceability.md#a-transformation-log-that-travels-with-the-data), so the annotated copy can always be traced back to its original.

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
