---
sidebar_position: 1
ready: true
last_update:
  date: 2026-09-26
  author: Shamsudddeen Hassan Muhammad
---

# Before You Start

Teams sometimes spend months collecting data that already exists. A team may collect Hausa sentiment data that [AfriSenti](https://arxiv.org/abs/2302.08956) already covers, or annotate Yoruba named entities before discovering [MasakhaNER 2](https://arxiv.org/abs/2210.12391).

This happens because African-language datasets are hard to find, and the same language often appears under different names and codes. For example, Swahili has at least three codes in common use:

- `sw`: the two-letter ISO 639-1 code.
- `swa`: the ISO 639-3 code for Swahili as a macrolanguage, covering all its varieties.
- `swh`: the ISO 639-3 code for Coastal (Standard) Swahili alone.

All three mean Swahili, but a computer treats them as three different labels, and projects do not agree on which to use. The Masakhane benchmarks (AfriMMLU, AfriXNLI, AfriMGSM) use `swa`. FLORES and Belebele use `swh`. Many Hugging Face datasets and web-crawled corpora use `sw`. If you search for one code, you miss the data filed under the others.

A complete list of African-language datasets would not solve this, because new datasets appear every month and no list stays current for long. Instead, this chapter describes four steps to take before you build: search for what exists, check whether it fits your needs, decide whether to reuse, extend, or build, and learn from the people who made it.

## Step 1: Search for prior work

Search for your language and task together (for example, "Hausa sentiment") to find datasets you might reuse as they are. Plan a few hours for these searches, and keep notes as you go.

**Where to look first:**

- **[ACL Anthology](https://aclanthology.org/)**: the main archive of NLP research papers, from the major conferences, journals, and workshops. Search for your language and task, then check each paper for a released dataset. For a larger, systematic search, the Anthology's [Python package](https://aclanthology.org/faq/api/) (`pip install acl-anthology`) gives you the metadata of every paper to filter yourself.
- **[Lanfrica](https://lanfrica.com/)**: a continually updated catalogue of African language resources, including datasets, models, and papers.
- **[Hugging Face datasets, filtered by language](https://huggingface.co/datasets?language=swa)**: replace `swa` with your language's code (`hau` Hausa, `yor` Yoruba, `amh` Amharic, `zul` isiZulu). Add a task filter, such as `text-classification`, to narrow the results.
- **[AfricaNLP workshop proceedings](https://aclanthology.org/venues/africanlp/)**: papers from the annual workshop on African-language NLP. Skim the latest year to see what is new.
- **Google Scholar and [arXiv](https://arxiv.org/list/cs.CL/recent)**: new work often appears here first. Combine your language, task, and a date range, for example `"Hausa" sentiment dataset 2023..2026`.

**How to search well:**

- **Try every name and code the language goes by**: its English name, its own name for itself, alternative spellings, and all of its ISO codes (for Swahili: `sw`, `swa`, and `swh`). Older papers may use names the community no longer uses.
- **Search for related languages too.** A dataset for a closely related language can still give you guidelines, a label set, or a starting point.
- **Ask.** Post a short question in the [Masakhane](https://www.masakhane.io/) community or a language-specific group: *"Does anyone know of X data for Y?"* Much work is unpublished or hard to find.

**Keep a simple record** of everything you find: name, link, task, languages, size, licence, and whether guidelines were released. You will need it for Step 2, and it becomes the related-work section of your own paper.

:::tip[Template: Dataset search log]
A fill-in log that follows the four steps on this page: your language's names and codes, every search you ran, a Pass, Partly, or Fail mark for each dataset against the Step 2 checklist, your Step 3 decision, and the people you contacted. [Open the dataset search log template](../templates/search-log.md) or [download it as a Word document](pathname:///downloads/templates/dataset-search-log.docx).
:::

## Step 2: Judge what you find

Check each dataset you find against this list:

- **Licence.** Does it allow your use? Many African-language datasets are released for non-commercial use only (CC BY-NC).
- **Access.** Can you download it today, or is it "available on request" from an author who no longer replies? Are you looking at the latest version?
- **Fit.** Does it match your language variety, dialect, script, and domain? News text does not stand in for social media or conversational speech.
- **Labels.** Is the label set right for your task, or would you need to relabel?
- **Splits.** Is the data divided into fixed training, development, and test sets, so that results can be compared across papers? If the test set is public, large language models may have been trained on it, which makes their scores look better than they are.
- **Guidelines.** Were the annotation guidelines released? You can reuse good guidelines even if you cannot use the data.
- **Quality.** Who annotated it: native speakers or crowd workers? Is inter-annotator agreement reported? It measures how often annotators chose the same label, and low agreement is a warning sign.
- **Documentation.** Is there a datasheet or data card: a document that describes how the data was collected and what it contains? Is consent described?

A dataset that fails several of these checks may still be worth studying, even if you cannot build on it.

## Step 3: Reuse, extend, or build

Use your notes from Steps 1 and 2 to choose what to do. Find the row that matches what your search turned up and how it did against the Step 2 checklist, then follow that row across.

<div className="decision-table">

| What you found | Your choice | What to do |
| --- | --- | --- |
| A dataset for your language and task that **passes** the Step 2 checks | **Reuse it** | Do not build a new one. Spend your effort on what is still missing, such as evaluation, a new domain, or a deployment. |
| A dataset for your language and task that **partly** fits (wrong domain, missing labels, or a different dialect) | **Extend it** | Add the missing domain, labels, or dialect. Reuse the original guidelines, keep your data splits compatible with theirs, and tell the original authors. |
| A dataset for your language and task that **fails** the checks (unusable licence, poor quality, or unavailable) | **Build a new one, learning from the old one** | Read its paper and guidelines before you start, and explain in your documentation why you could not reuse it. |
| A dataset only for a **related language**, or for your language on a **related task** | **Borrow, then build small** | Borrow its guidelines and label set. Try [cross-language transfer](/cross-language-transfer) first, then build a small, high-quality evaluation set in your language. |
| **Nothing** relevant | **Build from scratch** | Start with the [long-tail language onboarding](/long-tail-language) chapter, then [Data Collection](/data-collection/Overview), [Annotation Design](/annotation-design/annotation-task-design), and [Data Quality](/data-quality). |

</div>

If more than one row applies, choose the one nearest the top. Reusing or extending data usually costs less than building it.

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

The three pages below apply these four steps to real tasks, using well-known datasets as examples. If your language or task is missing, search for it using Step 1.

- [Named Entity Recognition](./ner.mdx): a well-covered task, where the usual answer is to reuse or extend.
- [Sentiment analysis](./sentiment.mdx): where domain and culture decide whether existing data fits.
- [Hate speech and content safety](./hate-speech.mdx): where you must also protect annotators and users.

Each page shows the date it was last reviewed. Newer datasets may have appeared since then.

