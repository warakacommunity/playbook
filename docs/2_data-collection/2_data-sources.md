---
title: Data Sources
description: A map of where raw data for African-language AI systems actually comes from, and how to weigh one source against another before choosing a collection method.
---

# Data Sources

Learn the main categories of places raw data comes from, what each is good and bad at, and how to choose between them before committing to a collection method.

## Why "source" and "method" are different questions

It's easy to conflate *where data comes from* with *how you get it*. They're separate decisions. "Twitter" is a source; "calling its API" is a method. "A national newspaper archive" is a source; "scraping its website" and "requesting a bulk export" are two different methods for reaching the same source. This page maps the sources; the next two pages — [Web Scraping](./web-scraping) and [Application Programming Interfaces](./application-programming-interfaces) — go deep on the two methods used most often to reach them.

## The main categories

### The open web
News sites, blogs, forums, encyclopedias. Reachable by scraping or, where available, by API. For African languages this is the source most people reach for first and, per Chapter 1, the one that disappoints most often — not because the web is poorly indexed, but because the underlying text in many target languages barely exists there in the first place.

### Institutional and government archives
Court records, parliamentary proceedings, census documents, ministry publications. Often higher-quality and more consistently in the target language than open-web text, since institutions are required to publish in official or regional languages. Access is usually slower (requests, sometimes fees) but the resulting text tends to need far less cleaning.

### Community and oral sources
Interviews, recorded proverbs, folktales, radio call-in shows, community meetings — sources that exist because people are talking, not because someone wrote something down. This is often the *only* viable source for languages without a strong written tradition, and it's where the playbook's core principle bites hardest: this data cannot be collected well by people outside the language community. Recruiting through tools like [AfriFinder](https://warakacommunity.github.io/afrifinder) is built for exactly this category.

### Broadcast and media archives
Radio and television archives, where accessible, sit between "scraped from the open web" and "recorded from scratch" — the content already exists in spoken form, often in a standard register, and broadcasters sometimes hold transcripts or subtitles that double as parallel text. Partnership and licensing conversations with broadcasters take time, so this source rewards starting early.

### Existing datasets and corpora
Don't discount work that's already been done. Datasets like [AfriSenti](https://arxiv.org/abs/2302.08956) for sentiment, or large multilingual collections built from community-translated seed data, exist precisely so the next project doesn't have to start from zero for a given language or task. Always check the license and intended use before reusing or redistributing.

### Religious and literary texts
Bible translations, hymnals, and similar texts (distributed through projects like JW300 or BibleNLP) cover an unusually large number of low-resource languages, often more than any other parallel-text source. They're genuinely useful, especially as a bootstrap, but come with a well-documented register problem: religious text is formal, archaic, and topically narrow, and a model trained only on it will reproduce that register far outside where it belongs. Treat it as a starting point, not a representative sample.

### Purpose-built collection campaigns
Sometimes nothing usable exists and the honest answer is: someone has to go create it — recording campaigns, structured interviews, mobile-phone data collection drives. This is the most expensive category per item and the one [Cost and Resource Planning](./cost-resource-planning) is built around, but it's also the only category where you control register, consent, and representativeness from the start.

## Weighing sources against each other

For any candidate source, score it against the same handful of questions before committing time to it:

| Question | Why it matters |
|---|---|
| What's the license, and can the result be redistributed? | Determines whether your eventual dataset can be released at all |
| Is consent already documented, or does it need to be obtained? | Shapes both ethics review and timeline |
| Does it cover the register and topics your task needs, or just one narrow slice (e.g. religious, formal, news)? | A source can be large and still badly unrepresentative |
| How much cleaning will the raw output need before it's usable? | Institutional archives are usually cleaner per word collected than open-web scrapes |
| Is this source stable, or could access change or disappear? | See [Application Programming Interfaces](./application-programming-interfaces) for what happens when it does |

No single source is "best" in the abstract — the right choice depends on the modality ([Data Modalities](./data-modalities)), the language's resource tier, and what register the downstream task actually needs.
