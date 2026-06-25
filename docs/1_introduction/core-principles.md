---
sidebar_position: 5
---

# Core principles

A handful of beliefs run through every chapter of this playbook. They are the reason it gives the advice it does. If you remember nothing else, remember these.

## Build with speakers, not just for them

The people who speak a language know what is correct, what sounds natural, and what is offensive. They belong at the centre of dataset work, not at the end of a pipeline as cheap labellers. The [participatory model](https://aclanthology.org/2020.findings-emnlp.195/) (Nekoto et al., 2020) that this playbook grows out of treats native speakers as co-creators, and it is the approach we recommend throughout.

## Consent and ownership come first

Data comes from people, and those people keep a stake in it. Ask for informed consent before anyone contributes, be honest about how the data will be used, and make sure the community stays the owner of what it helps create. Ownership is not a box to tick at release. It shapes every decision, from what you collect to who you let use it.

## Quality over scale

A small, clean, well-documented dataset is worth more than a large, noisy one. Web-scale crawls for low-resource languages are full of mislabelled and machine-translated text ([Kreutzer et al., 2022](https://aclanthology.org/2022.tacl-1.4/)). It is better to label a thousand examples well than a million badly. The whole [data quality](../4_data-quality/index.md) chapter exists because this principle is easy to say and hard to keep.

## Context travels with the data

A dataset without documentation is hard to trust and easy to misuse. Record what you collected, from whom, how, and why. Name the languages, scripts, and varieties precisely. Good [documentation](../6_documentation/documentation.md) is what lets other people reuse your work, and what lets you defend it later.

## Build in the open, design for reuse

Release under a clear, open licence, and make the data, the guidelines, and the process reproducible. Work that others can find, check, and extend compounds over time. Work locked away helps no one and is usually lost.

## Do no harm

Protect the people in the data and the people who build it. Watch for content that is offensive, that identifies someone, or that is unsafe to release. When you are unsure, ask the community, and err on the side of caution.

---

These principles do not always pull in the same direction. Scale competes with quality; openness can sit uneasily with privacy. Much of this playbook is about making those trade-offs well, in the open, and with the people whose languages are at stake.
