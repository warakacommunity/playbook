---
sidebar_position: 1
ready: true
last_update:
  date: 2026-09-24
  author: Shamsudddeen Hassan Muhammad
---

import DecisionTree from '@site/src/components/DecisionTree/DecisionTree';

# Before You Start

Teams sometimes spend months collecting data that already exists. A team may collect Hausa sentiment data that [AfriSenti](https://arxiv.org/abs/2302.08956) already covers, or annotate Yoruba named entities before discovering [MasakhaNER 2](https://arxiv.org/abs/2210.12391).

This happens because African-language datasets are hard to find, and the same language often appears under different names and codes. For example, Swahili has at least three codes in common use:

- `sw`: the two-letter ISO 639-1 code.
- `swa`: the ISO 639-3 code for Swahili as a macrolanguage, covering all its varieties.
- `swh`: the ISO 639-3 code for Coastal (Standard) Swahili alone.

All three mean Swahili, but a computer treats them as three different labels, and projects do not agree on which to use. The Masakhane benchmarks (AfriMMLU, AfriXNLI, AfriMGSM) use `swa`. FLORES and Belebele use `swh`. Many Hugging Face datasets and web-crawled corpora use `sw`. If you search for one code, you miss the data filed under the others.

A complete list of African-language datasets would not solve this, because new datasets appear every month and no list stays current for long. Instead, this chapter describes four steps to take before you build: search for what exists, check whether it fits your needs, decide whether to reuse, extend, or build, and learn from the people who made it.

## Step 1: Search for prior work

Set aside an afternoon. Search for your **language** and your **task** together, then each on its own.

**Where to look first:**

- **[Lanfrica](https://lanfrica.com/)**: a continually updated catalogue of African language resources (datasets, models, papers). A good place to start.
- **[Hugging Face datasets, filtered by language](https://huggingface.co/datasets?language=swa)**: replace `swa` with your language's ISO 639 code (`hau` Hausa, `yor` Yoruba, `amh` Amharic, `zul` isiZulu).
- **[Masakhane on Hugging Face](https://huggingface.co/masakhane)**: many community benchmarks live here.
- **[ACL Anthology](https://aclanthology.org/)**: the main archive of NLP papers, including the AfricaNLP workshop proceedings.
- **Google Scholar and [arXiv](https://arxiv.org/list/cs.CL/recent)**: new work often appears here first.

The [Finding current resources](../finding-resources/index.md) chapter lists more archives, community organisations, and search patterns.

**How to search well:**

- **Try every name and code the language goes by**: its English name, its own name for itself, alternative spellings, and all of its ISO codes (for Swahili: `sw`, `swa`, and `swh`). Older papers may use names the community no longer uses.
- **Search for related languages too.** A dataset for a closely related language can still give you guidelines, a label set, or a starting point.
- **Read the related-work sections** of the papers you find. They point to work your search missed.
- **Ask.** Post a short question in the [Masakhane](https://www.masakhane.io/) community or a language-specific group: *"Does anyone know of X data for Y?"* Much work is unpublished or hard to find.

**Keep a simple record** of everything you find: name, link, task, languages, size, licence, and whether guidelines were released. You will need it for Step 2, and it becomes the related-work section of your own paper.

## Step 2: Judge what you find

Check each dataset you find against this list:

- **Licence.** Does it allow your use? Many African-language datasets are released for non-commercial use only (CC BY-NC).
- **Access.** Can you download it today, or is it "available on request" from an author who no longer replies?
- **Fit.** Does it match your language variety, dialect, script, and domain? News text does not stand in for social media or conversational speech.
- **Labels.** Is the label set right for your task, or would you need to relabel?
- **Splits.** Are there fixed train, development, and test splits? If the test set is public, check whether large models may have already seen it.
- **Guidelines.** Were the annotation guidelines released? You can reuse good guidelines even if you cannot use the data.
- **Quality.** Who annotated it: native speakers or crowd workers? Is inter-annotator agreement reported?
- **Documentation.** Is there a datasheet or data card? Is consent described?

A dataset that fails several of these checks may still be worth studying, even if you cannot build on it.

## Step 3: Reuse, extend, or build

<DecisionTree tree={{
  question: "Does a dataset already exist for your language and task?",
  options: [
    {
      label: "Yes",
      next: {
        question: "Does it pass the checks in Step 2 for your purpose?",
        options: [
          {
            label: "Yes",
            result: <><strong>Reuse it.</strong> Spend your effort on what is still missing: evaluation, a new domain, or a deployment.</>,
          },
          {
            label: "Partly (wrong domain, missing labels, or a different dialect)",
            result: <><strong>Extend it.</strong> Add the missing domain, labels, or variety. Reuse the original guidelines, keep your splits compatible, and tell the original authors.</>,
          },
          {
            label: "No (unusable licence, poor quality, or unavailable)",
            result: <><strong>Build a new one, but learn from the old one.</strong> Read its paper and guidelines first, and explain in your documentation why it could not be reused.</>,
          },
        ],
      },
    },
    {
      label: "No",
      next: {
        question: "Does one exist for a related language, or for your language on a related task?",
        options: [
          {
            label: "Yes",
            result: <>Borrow its guidelines and label set. Try <a href="/cross-language-transfer">cross-language transfer</a> first, then build a small, high-quality evaluation set in your language.</>,
          },
          {
            label: "No",
            result: <>You are building from scratch. Start with the <a href="/long-tail-language">long-tail language onboarding</a> chapter, then <a href="/data-collection/Overview">Data Collection</a>, <a href="/annotation-design/annotation-task-design">Annotation Design</a>, and <a href="/data-quality">Data Quality</a>.</>,
          },
        ],
      },
    },
  ],
}} />

<div className="only-print">

```
Does a dataset already exist for your language and task?
├── Yes. Does it pass the checks in Step 2 for your purpose?
│   ├── Yes → Reuse it. Spend your effort on what is still missing.
│   ├── Partly → Extend it. Reuse the guidelines, keep splits
│   │            compatible, and tell the original authors.
│   └── No → Build a new one, but read its paper and guidelines first.
└── No. Does one exist for a related language or a related task?
    ├── Yes → Borrow its guidelines; try cross-language transfer;
    │         build a small evaluation set in your language.
    └── No → Build from scratch. Start with the long-tail language
              onboarding chapter, then Data Collection, Annotation
              Design, and Data Quality.
```

</div>

## Step 4: Learn from the people who built it

Papers describe what worked. They rarely describe what went wrong, what took longer than planned, or what the team would change.

**Read first**, in this order: the paper's limitations section, the annotation guidelines, the datasheet, and the open issues on its repository.

**Then contact the authors.** Many are happy to help. Ask specific questions:

- What would you do differently if you started again?
- What took longer or cost more than you expected?
- How did you recruit, train, and pay annotators?
- Is there anything you collected but did not release?
- Would you be interested in collaborating on an extension?

**Then pass it on.** When your own project is done, write up what you learned with the [retrospective template](../case-studies/retrospective-template.md) and add it to the [Case Studies](../case-studies/index.md).

## Worked examples

The three pages below apply these four steps to real tasks, using well-known datasets as examples. **They are examples, not complete lists.** If your language or task is missing, search for it using Step 1.

- [Named Entity Recognition](./ner.mdx): a well-covered task, where the usual answer is to reuse or extend.
- [Sentiment analysis](./sentiment.mdx): where domain and culture decide whether existing data fits.
- [Hate speech and content safety](./hate-speech.mdx): where you must also protect annotators and users.

Each page shows the date it was last reviewed. Newer datasets may have appeared since then.

