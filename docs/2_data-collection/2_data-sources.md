---
title: Data Sources
description: A map of where raw data for African-language AI systems actually comes from, and how to weigh one source against another before choosing a collection method.
ready: true
last_update:
  date: 2026-11-24
  author: Shamsuddeen Hassan Muhammad
---

# Data Sources

Learn the main categories of places raw data comes from, what each is good and bad at, and how to choose between them before committing to a collection method.

## Why "source" and "method" are different questions

It's easy to conflate *where data comes from* with *how you get it*. They're separate decisions. "Twitter" is a source; "calling its API" is a method. "A national newspaper archive" is a source; "scraping its website" and "requesting a bulk export" are two different methods for reaching the same source. This page maps the sources; the next two pages, [Web Scraping](./web-scraping) and [Application Programming Interfaces](./application-programming-interfaces), go deep on the two methods used most often to reach them.

## The main categories

### The open web

News sites, blogs, forums, encyclopedias. Reachable by scraping or, where available, by API. For African languages this is the source most people reach for first and, as the [Introduction](../1_introduction/introduction.md) shows, the one that disappoints most often, not because the web is poorly indexed, but because the underlying text in many target languages barely exists there in the first place ([Joshi et al., 2020](../references.md#joshi-2020)). What does exist is often noisy: an audit of web-crawled multilingual corpora found systematic problems in the lower-resource ones: some contained no usable text at all, and many were mislabelled ([Kreutzer et al., 2022](../references.md#kreutzer-2022)).

### Institutional and government archives

Court records, parliamentary proceedings, census documents, ministry publications. Often higher-quality and more consistently in the target language than open-web text, especially where governments publish in several official or regional languages. The NCHLT text corpora for ten South African languages, for example, were sourced mostly from government websites and documents, because other data providers were reluctant to have their data released openly without limitations ([Eiselen and Puttkammer, 2014](../references.md#eiselen-puttkammer-2014)). Access is usually slower (requests, sometimes fees) but the resulting text tends to need less cleaning.

### Community and oral sources

Interviews, recorded proverbs, folktales, radio call-in shows, community meetings: sources that exist because people are talking, not because someone wrote something down. This is often the *only* viable source for languages without a strong written tradition, and it's where the playbook's core principle bites hardest: this data cannot be collected well by people outside the language community ([Nekoto et al., 2020](../references.md#nekoto-2020); [Bird, 2020](../references.md#bird-2020)). Recruiting through tools like [AfriFinder](https://afriplaybook.waraka.org/afrifinder) is built for exactly this category.

### Broadcast and media archives

Radio and television archives, where accessible, sit between "scraped from the open web" and "recorded from scratch": the content already exists in spoken form, often in a standard register, and broadcasters sometimes hold transcripts or subtitles that double as parallel text. Radio archives have already been used to build speech systems for Acholi in Uganda ([Saeb et al., 2017](../references.md#saeb-2017)) and a 142-hour West African radio corpus for Guinean languages ([Doumbouya et al., 2021](../references.md#doumbouya-2021)). Broadcaster websites can be a text source too: Voice of America's public-domain news, in languages including Hausa, Swahili, Amharic and Somali, was released as an openly licensed corpus ([Palen-Michel et al., 2022](../references.md#palen-michel-2022)). Partnership and licensing conversations with broadcasters take time, so this source rewards starting early.

### Existing datasets and corpora

Don't discount work that's already been done. Datasets like AfriSenti for sentiment ([Muhammad et al., 2023a](../references.md#muhammad-2023)), or community-translated parallel data such as MAFAND-MT ([Adelani et al., 2022b](../references.md#mafand-2022)), exist precisely so the next project doesn't have to start from zero for a given language or task. Catalogues such as [Lanfrica](https://lanfrica.com/) help you find them. Always check the license and intended use before reusing or redistributing.

### Religious and literary texts

Bible translations, hymnals, and similar texts (distributed through corpora like JW300 or the BibleNLP eBible corpus) cover an unusually large number of low-resource languages, often more than any other parallel-text source: JW300 covered over 300 languages ([Agić and Vulić, 2019](../references.md#agic-2019)) and the eBible corpus covers 833 ([Akerman et al., 2023](../references.md#ebible-2023)). They're genuinely useful, especially as a bootstrap, but come with a well-documented register problem: religious text is formal, archaic, and topically narrow, and translation models trained on JW300 and the Bible do not generalise well to domains such as news and everyday conversation ([MENYO-20k, 2021](../references.md#menyo-2021)). Treat it as a starting point, not a representative sample.

Check the rights, too. JW300 is no longer a safe option: the copyright notice on its source website bars text and data mining, a request for permission was refused, and Masakhane stopped using it ([Cashdan, 2025](../references.md#cashdan-2025)).

### Purpose-built collection campaigns

Sometimes nothing usable exists and the honest answer is: someone has to go create it (recording campaigns, structured interviews, mobile-phone data collection drives). Crowdsourced read-speech projects such as Common Voice ([Ardila et al., 2020](../references.md#ardila-2020)) and funded efforts such as African Next Voices ([African Next Voices, 2025](../references.md#african-next-voices)) are examples. This is the most expensive category per item and the one [Cost and Resource Planning](./cost-resource-planning) is built around, but it's also the only category where you control register, consent, and representativeness from the start.

## Weighing sources against each other

For any candidate source, score it against the same handful of questions before committing time to it:

| Question | Why it matters |
|---|---|
| What's the license, and can the result be redistributed? | Determines whether your eventual dataset can be released at all |
| Is consent already documented, or does it need to be obtained? | Shapes both ethics review and timeline |
| Does it cover the register and topics your task needs, or just one narrow slice (e.g. religious, formal, news)? | A source can be large and still badly unrepresentative |
| How much cleaning will the raw output need before it's usable? | Institutional archives are usually cleaner per word collected than open-web scrapes |
| Is this source stable, or could access change or disappear? | See [Application Programming Interfaces](./application-programming-interfaces) for what happens when it does |

No single source is "best" in the abstract; the right choice depends on the modality ([Data Modalities](./data-modalities)), the language's resource tier, and what register the downstream task actually needs.

## Further reading

- [Lanfrica](../references.md#lanfrica): a catalogue of African language datasets, models and papers, the first place to check whether a source already exists.
- [Mozilla Common Voice (n.d.)](../references.md#mozilla-cv-playbook-text): the Common Voice community playbook page on text, on how to find and clear openly licensed sentences for recording campaigns.
- [Lanfrica (n.d.)](../references.md#lanfrica-licensing): why unclear licences leave many African datasets unusable.
