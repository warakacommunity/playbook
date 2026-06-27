---
title: Application Programming Interfaces (APIs)
description: How to collect data through official APIs, and why building a project's data plan around any single platform's API is riskier than it looks.
---

# Application Programming Interfaces (APIs)

Learn how API-based collection differs from scraping, what it's well suited for, and why API access is one of the least stable foundations a data collection plan can be built on.

## How this differs from scraping

An API (Application Programming Interface) is a structured, sanctioned channel a platform provides for accessing its data — as opposed to extracting it from rendered web pages. Where scraping takes what's publicly visible and infers structure from a page's HTML, an API hands you already-structured data (a tweet object, a Wikipedia article's wikitext, a government dataset's rows) directly, usually with documentation, authentication, and explicit rate limits.

This makes APIs more reliable to build a pipeline around in the short term: the data is cleaner, the schema is documented, and you're not fighting page-layout changes. It does not make them more reliable in the long term, for reasons worth taking seriously before you commit a project's collection plan to one.

## A cautionary, very real example

AfriSenti, the sentiment dataset behind SemEval-2023's first Afrocentric shared task, was built on more than 110,000 tweets across 14 African languages, gathered through Twitter's then-free API access for academic research ([Muhammad et al., 2023](https://arxiv.org/abs/2302.08956)). That access model no longer exists. In 2023, Twitter (now X) ended free academic API access and introduced paid tiers, with enterprise-level access priced at tens of thousands of dollars per month — far beyond what most academic projects can pay ([Brown et al., 2024](https://arxiv.org/abs/2410.23432)). A project planned today that assumed it could reproduce AfriSenti's collection process, on the same terms, simply could not.

This isn't a story about one platform behaving badly. It's the generic risk of any API: it's a privilege the platform grants, not a right you hold, and it can be repriced, restricted, or revoked with little notice, for reasons that have nothing to do with you or your research. Plan accordingly.

## What APIs are well suited for

- **Open and public-data APIs**, where governments or international bodies expose structured datasets (census, agricultural, health, climate data) under an explicit open license. These tend to be the most stable category, since the publishing motivation — transparency, compliance — doesn't depend on platform monetization.
- **Wikimedia APIs** (Wikipedia, Wiktionary, Wikidata), which cover a surprising number of African languages, even some with otherwise very little written presence online, and are explicitly built for reuse.
- **National broadcaster and library APIs**, where they exist, often as the structured counterpart to the broadcast archives discussed in [Data Sources](./data-sources).
- **Social media APIs**, with eyes open: useful for register and topical diversity that's hard to get elsewhere, but the category most exposed to the pricing and access risk described above.

## Practical guidance

- **Read the terms of service before you read the API documentation.** What you're allowed to do with the data you collect — store it, redistribute it, publish it as part of a dataset — is governed by the ToS, not by what the API technically lets you request.
- **Archive what you collect immediately**, in its raw form, rather than re-fetching from the API later. If access changes or disappears, your archived pull is what you have; assume you may not be able to go back for more.
- **Log the exact endpoint, parameters, API version, and date of every pull.** This is the same provenance discipline as scraping (see [Data Provenance and Traceability](./data-provenance-traceability)), and it matters more here, because an API's behavior can change silently between calls in a way a static web page can't.
- **Respect rate limits and use backoff.** Getting your access revoked for abuse, even unintentionally, can end a collection effort outright, unlike a scraper simply being slowed down.
- **Don't design a project's entire data plan around a single platform's API.** Treat any one API as one source among several, and have a sense of what the project does if that source disappears mid-project — because, as the AfriSenti example shows, it has happened before, with no advance warning.

## A worked example: pulling from a Wikimedia API

Of the categories above, the Wikimedia APIs are the safest to learn on: they are built for reuse, cover many African languages, and are not going to reprice overnight. The example below pulls article extracts from a language edition of Wikipedia, archives the raw response exactly as received, and records provenance for each article. Swap `lang` for any Wikipedia language code, such as `yo` (Yoruba), `sw` (Swahili), `ha` (Hausa), or `am` (Amharic).

```python
import json
from datetime import datetime, timezone

import requests

USER_AGENT = "AfriPlaybook-collector/1.0 (+contact: you@example.org)"


def pull_extracts(lang: str, titles: list[str]) -> list[dict]:
    """Fetch plain-text extracts for given article titles from one
    Wikipedia language edition, archiving raw responses and provenance."""
    endpoint = f"https://{lang}.wikipedia.org/w/api.php"
    params = {
        "action": "query",
        "format": "json",
        "prop": "extracts",
        "explaintext": "1",          # plain text, not HTML
        "titles": "|".join(titles),
        "formatversion": "2",
    }
    response = requests.get(
        endpoint, params=params, headers={"User-Agent": USER_AGENT}, timeout=30
    )
    response.raise_for_status()
    pulled_at = datetime.now(timezone.utc).isoformat()

    # Archive the raw response first, before any processing.
    with open(f"raw_{lang}_response.json", "w", encoding="utf-8") as raw:
        json.dump(response.json(), raw, ensure_ascii=False, indent=2)

    records = []
    for page in response.json()["query"]["pages"]:
        if "extract" not in page:       # missing or redirected pages
            continue
        records.append({
            "title": page["title"],
            "text": page["extract"],
            "language": lang,
            "source_url": f"https://{lang}.wikipedia.org/wiki/{page['title'].replace(' ', '_')}",
            "license": "CC BY-SA 4.0",  # Wikipedia text license
            "api_endpoint": endpoint,
            "pulled_at": pulled_at,
        })
    return records


if __name__ == "__main__":
    records = pull_extracts(lang="yo", titles=["Nàìjíríà", "Èkó"])
    with open("wikipedia_yo.jsonl", "w", encoding="utf-8") as out:
        for record in records:
            out.write(json.dumps(record, ensure_ascii=False) + "\n")
```

The order of operations matters here. The raw response is written to disk before anything is extracted from it, so that if the schema turns out to differ from what was expected, or access changes later, the original pull is preserved and the parsing can be redone offline. Each record carries its license (`CC BY-SA 4.0` for Wikipedia text, which means downstream reuse must attribute and share alike), the exact endpoint, and the pull time. That is the provenance discipline from [Data Provenance and Traceability](./data-provenance-traceability) applied at the point of collection, where it is cheap, rather than reconstructed afterwards, where it is often impossible.

## The bigger pattern

Both this page and [Web Scraping](./web-scraping) point at the same lesson from different directions: methods that depend on a third party's continued goodwill — whether that's a platform's API pricing or a site's tolerance for crawlers — are inherently less stable than methods that don't. Community-sourced data, institutional partnerships, and purpose-built collection campaigns (see [Data Sources](./data-sources)) take longer to set up, but they don't disappear because someone else changed a pricing page.
