---
sidebar_position: 5
ready: true
last_update:
  date: 2026-11-24
  author: Idris Abdulmumin
---

# Core principles

A handful of beliefs run through every chapter of this playbook. They are the reason it gives the advice it does. If you remember nothing else, remember these.

## Build with speakers, not just for them

The people who speak a language know what is correct, what sounds natural, and what is offensive. They belong at the centre of dataset work, not at the end of a pipeline as cheap labellers. The participatory model that this playbook grows out of treats native speakers as co-creators ([Nekoto et al., 2020](../references.md#nekoto-2020)), and it is the approach we recommend throughout. Bird makes the wider case for centring the communities whose languages are at stake rather than treating them as sources of data ([Bird, 2020](../references.md#bird-2020)).

## Consent and ownership come first

Data comes from people, and those people keep a stake in it. Ask for informed consent before anyone contributes, be honest about how the data will be used, and make sure the community stays the owner of what it helps create. The CARE Principles for Indigenous Data Governance set out the same idea as collective benefit and the community's authority to control its data ([Carroll et al., 2020](../references.md#carroll-2020)). Ownership is not a box to tick at release. It shapes every decision, from what you collect to who you let use it.

## Quality over scale

A small, clean, well-documented dataset is worth more than a large, noisy one. An audit of web-crawled multilingual corpora found that many lower-resource corpora have systematic problems: some contain no usable text, many have wrong language labels, and a significant fraction have fewer than half of their sentences at acceptable quality ([Kreutzer et al., 2022](../references.md#kreutzer-2022)). Small, high-quality data goes a long way: a few thousand human-translated sentences were enough to adapt large pre-trained models to new African languages and domains ([Adelani et al., 2022b](../references.md#mafand-2022)). It is better to label a thousand examples well than a million badly. The whole [data quality](../4_data-quality/index.md) chapter exists because this principle is easy to say and hard to keep.

## Context travels with the data

A dataset without documentation is hard to trust and easy to misuse. Record what you collected, from whom, how, and why. Name the languages, scripts, and varieties precisely. Datasheets ([Gebru et al., 2021](../references.md#gebru-2021)) and data statements ([Bender and Friedman, 2018](../references.md#bender-friedman-2018)) give you a ready set of questions to answer. Good [documentation](../6_documentation/documentation.md) is what lets other people reuse your work, and what lets you defend it later.

## Build in the open, design for reuse

Release under a clear, open licence, and make the data, the guidelines, and the process reproducible. Many African-language datasets carry missing or unclear licences, which leaves them hard to reuse legally ([Lanfrica, n.d.](../references.md#lanfrica-licensing)). The FAIR principles (findable, accessible, interoperable, reusable) are a useful checklist ([Wilkinson et al., 2016](../references.md#wilkinson-2016)). Work that others can find, check, and extend compounds over time. Work locked away helps no one and is usually lost.

## Do no harm

Protect the people in the data and the people who build it. Watch for content that is offensive, that identifies someone, or that is unsafe to release. When you are unsure, ask the community, and err on the side of caution.

---

These principles do not always pull in the same direction. Scale competes with quality; openness can sit uneasily with privacy. Much of this playbook is about making those trade-offs well, in the open, and with the people whose languages are at stake.

## Further reading

- [Nekoto et al. (2020)](../references.md#nekoto-2020): the participatory approach to African-language machine translation that this playbook builds on.
- [Bird (2020)](../references.md#bird-2020): why language technology should centre the communities whose languages it uses.
- [Carroll et al. (2020)](../references.md#carroll-2020): the CARE Principles for Indigenous Data Governance.
- [Wilkinson et al. (2016)](../references.md#wilkinson-2016): the FAIR principles for making data findable and reusable.
- [Gebru et al. (2021)](../references.md#gebru-2021): Datasheets for Datasets, a standard set of documentation questions.
