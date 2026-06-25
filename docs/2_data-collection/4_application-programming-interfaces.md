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

## The bigger pattern

Both this page and [Web Scraping](./web-scraping) point at the same lesson from different directions: methods that depend on a third party's continued goodwill — whether that's a platform's API pricing or a site's tolerance for crawlers — are inherently less stable than methods that don't. Community-sourced data, institutional partnerships, and purpose-built collection campaigns (see [Data Sources](./data-sources)) take longer to set up, but they don't disappear because someone else changed a pricing page.
