---
title: Web Scraping
description: What web scraping can and can't deliver for African-language data, the legal and ethical considerations, and the access landscape as it stands.
---

# Web Scraping

Learn what web scraping is actually good for, where it falls short for African languages, and the legal, ethical, and practical considerations that should shape any scraping plan.

## What scraping is, and what it isn't

Web scraping means programmatically extracting content from web pages — as opposed to using a platform's official API (the next section), or requesting a bulk export from an institution. It's attractive because it's cheap to start and doesn't require anyone's permission to begin (though, as below, that doesn't mean permission isn't needed). It's the most common entry point into data collection for exactly that reason.

It's also, by itself, the weakest tool in this chapter for the playbook's core problem. As Chapter 1 lays out, when [Kreutzer et al. (2022)](https://aclanthology.org/2022.tacl-1.4/) audited the large multilingual web crawls most NLP pipelines are built on, they found that for many low-resource languages a large share of the supposedly in-language text was mislabelled, machine-translated, or not the target language at all. Scraping more of the web doesn't fix that; it just collects more of the same noise faster. Scraping is a method for reaching a source that already has volume and quality — it cannot manufacture either where they don't exist.

## The access landscape keeps shifting

Scraping plans that assume the open web behaves the way it did five years ago should be reconsidered. A large and growing share of sites now explicitly disallow AI-related crawlers in their `robots.txt` files, and several major platforms have moved to metered or paid access for bulk crawling rather than leaving it open. Legal disputes over scraping and AI training data remain active and unresolved in multiple jurisdictions ([Brown et al., 2024](https://arxiv.org/abs/2410.23432)). None of this makes scraping impossible, but it means:

- A scraping plan written today may not work the same way in a year. Budget time to re-check access periodically through a project, not just at the start.
- `robots.txt` and a site's terms of service aren't just etiquette — they're the basis on which a site operator, or a court, will judge whether your collection was legitimate. Read and respect them.
- A site that explicitly blocks crawling is signalling something about how it wants its content used. Treat that as a reason to look elsewhere rather than a technical obstacle to route around.

## A framework for deciding whether and how to scrape

[Brown et al. (2024)](https://arxiv.org/abs/2410.23432) lay out a four-part framework for research scraping that maps directly onto the questions a contributor to this playbook should ask before starting:

- **Legal** — Does the site's terms of service prohibit automated access? Is the content copyrighted, and would your intended redistribution plan need a license or fall under an exception?
- **Ethical** — Did the people who created this content have any reasonable expectation about how it would be used? Scraping a government gazette is different from scraping a personal blog or a forum where people were writing for a small, known audience.
- **Institutional** — Does your institution's ethics review process (IRB or equivalent) need to sign off, especially if the content could identify a person?
- **Scientific** — Will the resulting sample be representative of what you actually need, or just of what was easiest to scrape? A crawl biased toward formal news sites will under-represent the everyday, conversational register most NLP tasks actually need.

## Practical guidance

- **Respect `robots.txt` and rate limits.** Aggressive crawling can get your IP blocked, and for a site already wary of AI scraping, it confirms exactly the behavior they were trying to keep out.
- **Prefer official archives and bulk-export options over scraping live pages**, where they exist — they're more stable, less likely to break your pipeline mid-collection, and easier to defend later as a collection method.
- **Document everything as you go**: the exact URL pattern, the date of collection, the scraper version, and any filtering applied. This becomes the backbone of [Data Provenance and Traceability](./data-provenance-traceability) — provenance is much harder to reconstruct after the fact than to log at the time.
- **Don't scrape behind logins or around anti-bot measures.** Circumventing access controls carries real legal risk and is a hard line many institutional review boards will not approve, regardless of the research value.
- **For African-language text specifically, validate language identification on anything you scrape.** Off-the-shelf language identifiers are themselves trained mostly on high-resource languages and frequently misclassify African-language text — exactly the failure mode Kreutzer et al. documented at scale. Spot-check a sample with a native speaker before trusting an automated filter.

## A minimal, well-behaved scraper

The points above translate into code more directly than they might seem to. A scraper that respects `robots.txt`, rate-limits itself, records provenance, and verifies the language of what it collects is not much longer than a careless one. The example below uses only widely available libraries (`requests`, `beautifulsoup4`, and a language identifier).

```python
import time
import json
import urllib.robotparser
from datetime import datetime, timezone
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup

USER_AGENT = "AfriPlaybook-collector/1.0 (+contact: you@example.org)"
RATE_LIMIT_SECONDS = 2.0  # one request every two seconds, at most


def allowed_by_robots(url: str) -> bool:
    """Honour robots.txt before fetching. If we can't read it, don't fetch."""
    parts = urlparse(url)
    robots_url = f"{parts.scheme}://{parts.netloc}/robots.txt"
    parser = urllib.robotparser.RobotFileParser()
    try:
        parser.set_url(robots_url)
        parser.read()
    except Exception:
        return False
    return parser.can_fetch(USER_AGENT, url)


def fetch(url: str) -> str | None:
    if not allowed_by_robots(url):
        print(f"Skipped (robots.txt disallows): {url}")
        return None
    response = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=30)
    response.raise_for_status()
    time.sleep(RATE_LIMIT_SECONDS)  # be a good guest
    return response.text


def extract_text(html: str) -> str:
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style", "nav", "footer"]):
        tag.decompose()
    return " ".join(soup.get_text(separator=" ").split())


def collect(urls: list[str], expected_lang: str, out_path: str) -> None:
    """Fetch each URL, keep only text that looks like the target language,
    and record provenance for every record we keep."""
    from glotlid import GlotLID  # pip install glotlid

    identifier = GlotLID()
    with open(out_path, "w", encoding="utf-8") as out:
        for url in urls:
            html = fetch(url)
            if html is None:
                continue
            text = extract_text(html)
            label, score = identifier.predict(text)  # e.g. ("hau_Latn", 0.97)
            if not label.startswith(expected_lang) or score < 0.7:
                print(f"Skipped (language {label}, score {score:.2f}): {url}")
                continue
            record = {
                "text": text,
                "source_url": url,
                "language": label,
                "lang_confidence": round(float(score), 3),
                "collected_at": datetime.now(timezone.utc).isoformat(),
                "collector": USER_AGENT,
            }
            out.write(json.dumps(record, ensure_ascii=False) + "\n")


if __name__ == "__main__":
    collect(
        urls=["https://example.org/hausa-article-1"],
        expected_lang="hau",  # ISO 639-3 prefix for Hausa
        out_path="raw_hausa.jsonl",
    )
```

Three things in this script do the work the prose asked for. The `allowed_by_robots` check refuses to fetch anything the site disallows, and fails closed if the policy can't be read. The `RATE_LIMIT_SECONDS` pause keeps the crawl from looking like an attack. And the language check, using [GlotLID](https://github.com/cisnlp/GlotLID) here, drops anything that isn't confidently the target language, which is the single most important filter for African-language scraping given how often general-purpose crawls mislabel it ([Kreutzer et al., 2022](https://aclanthology.org/2022.tacl-1.4/)). The confidence threshold of `0.7` is a starting point, not a universal value: set it by spot-checking a sample with a native speaker, as described above.

## When scraping is the right call

Scraping earns its place when the target source is large, public, has a clear and permissive access policy, and — critically — actually contains meaningful volume in the target language. It's the wrong tool when the honest problem is that the language simply isn't well represented online yet. In that case, the community, institutional, and purpose-built collection routes covered in [Data Sources](./data-sources) are where the real work is.
