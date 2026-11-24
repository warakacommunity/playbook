---
sidebar_position: 5
title: Licensing and Compliance
ready: true
last_update:
  date: 2026-11-24
  author: Shamsuddeen Hassan Muhammad
---

# Licensing and Compliance

A licence states what others may and may not do with your dataset. The reasoning behind choosing one, including the African community licences such as NOODL ([NOODL, 2025](../references.md#noodl-2025)) and Esethu ([Esethu Framework, 2025](../references.md#esethu-2025)), is in the [data governance](../data-governance/index.md) chapter. This page is the practical companion, covering the common licence types and a template for documenting your choice. To arrive at a choice, work through the [licensing decision tree](../governance-toolkit/licensing-decision-tree.md) in the Governance Toolkit.

## Common licence types for NLP datasets

For open data, the Creative Commons family is the usual starting point: CC0 dedicates data to the public domain, CC BY requires attribution, and CC BY-SA adds share-alike, so adaptations must carry the same or a compatible licence ([Creative Commons, n.d.-a](../references.md#cc-licenses); [Creative Commons, n.d.-c](../references.md#cc0)). Use version 4.0, which also licenses database rights under the same conditions as copyright ([Creative Commons, n.d.-b](../references.md#cc-faq)). Where community rights and benefit need protecting, the African community licences keep control and benefit with the source community. We advise against applying a software licence such as MIT or Apache to data: they are written for code and leave reusers unsure what is permitted for data, just as Creative Commons recommends against using its content licences for software ([Creative Commons, n.d.-b](../references.md#cc-faq)).

## Choosing, attributing, and complying

Choose the licence that matches how open you actually want to be, balanced against the community's wishes and any obligations from source data. Whatever you choose, require attribution and record provenance, and check that your licence is compatible with the terms of any data you built on, since you cannot grant rights you do not hold. Check each source's licence at its origin rather than trusting the label on a hosting site: an audit of more than 1,800 text datasets found licence omission rates above 70% and error rates above 50% on popular hosting sites ([Longpre et al., 2024a](../references.md#longpre-2024)), and many African-language datasets have missing or unclear licences ([Lanfrica, n.d.](../references.md#lanfrica-licensing)). Comply with the data-protection law of every country your contributors are in (see [Data Governance](../data-governance/index.md)).

## Licensing agreement template

For a formal release, a short agreement records the terms:

- **Part 1. Dataset and licensor details:** `[dataset, version, licensor]`.
- **Part 2. Grant of rights:** the licensor grants `[rights]` under `[licence]`.
- **Part 3. Restrictions:** prohibited uses are `[list]`.
- **Part 4. Attribution requirements:** reusers must credit `[citation]`.
- **Part 5. Warranty and liability:** provided "as is", with `[limitations]`.
- **Part 6. Termination:** the terms under which the licence ends.
- **Part 7. Signature:** `[names, dates]`.

## Further reading

- [Ball (2014)](../references.md#ball-2014): a practical guide to licensing research data, including which licence conditions (non-commercial, share-alike, no-derivatives) to use with care for datasets.
- [Creative Commons (n.d.-b)](../references.md#cc-faq): the official answers on databases, attribution, and why CC licences cannot be revoked.
- [Lanfrica (n.d.)](../references.md#lanfrica-licensing): how missing and unclear licences limit the reuse of African-language datasets.
