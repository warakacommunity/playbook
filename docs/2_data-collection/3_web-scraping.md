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

## When scraping is the right call

Scraping earns its place when the target source is large, public, has a clear and permissive access policy, and — critically — actually contains meaningful volume in the target language. It's the wrong tool when the honest problem is that the language simply isn't well represented online yet. In that case, the community, institutional, and purpose-built collection routes covered in [Data Sources](./data-sources) are where the real work is.
