---
title: Named Entity Recognition
sidebar_label: Named Entity Recognition
sidebar_position: 2
ready: true
last_update:
  date: 2026-11-23
  author: Seid Muhie Yimam
---

# Named Entity Recognition

Named entity recognition (NER) finds the spans of text that name people, organisations, places and similar things, and labels each span with its type. It is the most studied sequence-labelling task for African languages, and usually the first one a new language gets, because entities are what search, news monitoring, de-identification and question answering need first.

This page covers how to build NER data well. The decision of whether to build at all is covered in [Before You Start: NER](../before-you-start/ner.mdx), which judges MasakhaNER against a reuse checklist, and the history of how MasakhaNER itself was built is in the [MasakhaNER case study](../case-studies/masakhaner.md). Tagging schemes, tokenisation and span-level scoring, which NER shares with the other tasks, are explained in the [Sequence Labelling overview](./index.md).

## What the data looks like

NER data is tokenised text with one BIO tag per token, stored one token per line or as parallel lists of tokens and tags. A Yorùbá example in the token-per-line style:

```text
Ọlátúnjí	B-PER
lọ	O
sí	O
Ìbàdàn	B-LOC
ní	O
ọjọ́	B-DATE
Ajé	I-DATE
.	O
```

The sentence means "Olatunji went to Ibadan on Monday." The tone marks and underdots are part of the data: stripping them changes words, and an entity whose spelling no longer matches its other mentions is harder for a model to learn.

## Existing resources

Check these before collecting anything. The reuse decision for each is worked through in [Before You Start: NER](../before-you-start/ner.mdx).

- **MasakhaNER 1** annotated news in ten languages with PER, ORG, LOC and DATE ([Adelani et al., 2021](../references.md#adelani-2021)). It is still the source for Amharic.
- **MasakhaNER 2** extended the same scheme to twenty languages, from Bambara to isiZulu, and showed that transfer from a related African language beats transfer from English ([Adelani et al., 2022a](../references.md#adelani-2022)). For eleven of its languages it annotated the human-translated news of MAFAND-MT ([Adelani et al., 2022b](../references.md#mafand-2022)). The data, guideline and scripts are in the [MasakhaNER repository](https://github.com/masakhane-io/masakhane-ner).
- **NCHLT named entity corpora** cover ten South African languages (Afrikaans, isiNdebele, isiXhosa, isiZulu, Sepedi, Sesotho, Setswana, Siswati, Tshivenda and Xitsonga) with PERSON, LOCATION, ORGANISATION and MISCELLANEOUS tags on government-domain text ([Eiselen, 2016b](../references.md#eiselen-2016-ner)). They are distributed per language through the [SADiLaR repository](https://repo.sadilar.org/) under a Creative Commons Attribution licence, which makes them one of the few NER sets with a licence that allows commercial use.
- **Yorùbá Global Voices NER** is a smaller set annotated on Global Voices news articles as part of a study of word embeddings for Yorùbá and Twi ([Alabi et al., 2020](../references.md#alabi-2020)).
- **WikiANN** is automatically labelled ("silver") NER for 282 languages, built by projecting English entity types through Wikipedia links ([Pan et al., 2017](../references.md#wikiann-2017)). It covers many African languages that have Wikipedia editions, but no human checked the labels. Use it for pretraining or as a starting point for correction, never as a test set.

## Choosing entity types

Start from the smallest label set that serves the use case, and add types only when you can write a decision rule for each.

| Type | Covers | Decision rule |
|---|---|---|
| PER | Named people, including titles that are part of the name | Tag the name; tag a title only if it is used as part of the name in this language. |
| ORG | Companies, ministries, parties, clubs, media outlets | Tag when the name refers to the institution, not to its building or place. |
| LOC | Countries, cities, regions, rivers, mountains, markets | Tag geographic and political places. |
| DATE | Absolute and relative dates | Tag the date expression; the guideline lists which surrounding words are included. |

MasakhaNER chose exactly these four. MasakhaNER 1 replaced CoNLL-2003's MISC type with DATE, because MISC is ill-defined and non-expert annotators disagree on it ([Adelani et al., 2021](../references.md#adelani-2021)). The NCHLT corpora kept MISC. If you need MISC-like content for a product, prefer named, defined types (PRODUCT, EVENT, MONEY, LAW) over a catch-all.

Domain projects usually need more: crop and disease names for agricultural advisory, drug and condition names for health, currency amounts and phone numbers for mobile money. Add each extra type to an existing corpus as a separate annotation pass rather than re-annotating the core types, as recommended in [Before You Start: NER](../before-you-start/ner.mdx#step-3-reuse-extend-or-build).

## Writing the guideline

Read the [MasakhaNER annotation guideline](https://github.com/masakhane-io/masakhane-ner) before writing your own. It follows the MUC-6 conventions and has been applied across twenty African languages. Then add a section for each case your language raises. The cases that cause most disagreement are:

- **Span boundaries around affixes and clitics.** When a preposition, locative or possessive marker is written inside the same word as a name, decide whether the tagged span is the whole word or whether the word must be split first. Write one rule and give five examples.
- **Titles and honorifics.** Decide whether forms such as Alhaji, Chief, Dr or a traditional title are inside the PER span. Languages and communities differ; the guideline must be explicit.
- **Dates and numbers written as words.** Igbo, Wolof and Yorùbá often write numbers out in full, so a single date can span many tokens ([Adelani et al., 2021](../references.md#adelani-2021)). List which words belong to a DATE span (the word for "day", "month", "year", the preposition before it).
- **Names that are also common words.** Many African personal names are ordinary words or phrases. Annotators tag them only when they refer to a person, which needs the context of the sentence, and the guideline should give contrasting examples.
- **Entities in another language.** English or French organisation names inside a Hausa or Wolof sentence are still entities. Tag them by type, whatever their language.

Keep the guideline as a living document. Every adjudication decision that sets a precedent goes into it with an example, and the version number goes into the dataset card.

## Nested and ambiguous entities

**Nested entities** occur when one entity contains another: a university named after a city contains a LOC inside an ORG. The BIO scheme can represent only one layer, so flat datasets such as CoNLL-2003 and MasakhaNER tag the outermost entity and ignore the inner one. Do the same unless your use case needs the inner entities, and say in the guideline that you do. If you do need them, store spans as character offsets with types (start, end, label), which can hold overlapping spans, and derive a flat BIO view for models that need one. If what you need is how entities are connected, such as two mentions of the same person or a person's link to an organisation, that is a separate layer on top of the entity spans; see [Relations and Coreference](./relations.md).

**Ambiguous entities** have one form with different types in different contexts. The commonest cases are:

- **Place or organisation.** A country name is LOC when it is a place ("she travelled to Ghana") and ORG when it acts as a government ("Ghana signed the agreement"). Decide whether you make this distinction at all, or tag every mention by its literal reading to keep agreement high. Either is defensible if it is written down and applied consistently.
- **Person or place.** Places named after people, and people named after places, need context. Tag by what the mention refers to in this sentence.
- **Organisation or product.** A media outlet's name can refer to the company or to the broadcast.

Give annotators a way to flag a sentence as uncertain rather than forcing a guess. The flagged sentences are exactly what the coordinator should review and what the next guideline version should resolve.

## Annotation and agreement

Each sentence should be annotated independently by at least two native speakers, with a coordinator who resolves disagreements. MasakhaNER 2 used three annotators and a paid language coordinator per language; the case study records how much the coordinator stage raised agreement ([MasakhaNER case study](../case-studies/masakhaner.md#9-which-decisions-turned-out-to-matter)).

Measure agreement on entities, not on tokens, for the same reason the model is scored on entities: most tokens are `O`, so token-level agreement looks high even when annotators disagree on most entities. Two measures are common:

- **Entity-level Fleiss' or Cohen's kappa**, as reported by both MasakhaNER papers.
- **Pairwise entity F1**, treating one annotator's spans as gold and the other's as predictions. It needs no chance correction and reads directly against model scores.

```python
# Pairwise entity-level F1 between two annotators on the same sentences.
from seqeval.metrics import f1_score
from seqeval.scheme import IOB2

annotator_a = [["B-PER", "O", "O", "B-LOC", "O", "B-DATE", "I-DATE", "O"]]
annotator_b = [["B-PER", "O", "O", "B-ORG", "O", "B-DATE", "O",      "O"]]

print(f1_score(annotator_a, annotator_b, mode="strict", scheme=IOB2))  # 0.333
```

The two annotators agree on the person but disagree on the type of one entity and the boundary of another, so only one of three spans matches. Report agreement both before and after adjudication: the before figure tells a reader how hard the task was, the after figure how clean the released data is. General guidance on agreement statistics is in [Text Classification: Annotation](../11_text-classification/annotation.md#inter-annotator-agreement).

Agreement is only one check. MasakhaNER 2 also flagged likely errors automatically, such as a token usually tagged as an entity that was left untagged in one place ([Adelani et al., 2022a](../references.md#adelani-2022)). A simple version of that check is worth running on any corpus:

```python
from collections import Counter, defaultdict

def inconsistent_tokens(sentences, min_count=5, threshold=0.8):
    """Find tokens tagged as an entity most of the time but left 'O' elsewhere."""
    seen = defaultdict(Counter)
    for tokens, tags in sentences:
        for tok, tag in zip(tokens, tags):
            seen[tok][tag[2:] if tag != "O" else "O"] += 1
    flagged = []
    for tok, counts in seen.items():
        total = sum(counts.values())
        if total < min_count or counts["O"] == 0:
            continue
        label, n = counts.most_common(1)[0]
        if label != "O" and n / total >= threshold:
            flagged.append((tok, dict(counts)))
    return flagged
```

## Evaluation

Score NER with span-level precision, recall and F1, using [seqeval](https://github.com/chakki-works/seqeval) in strict mode, as explained in the [overview](./index.md#evaluation-tokens-or-spans). Then go further than the headline number:

- **Per-type scores.** DATE and ORG are usually weaker than PER and LOC, and an average hides it.
- **Per-language scores.** MasakhaNER 2's best model averaged 87.0 F1, but individual languages ranged from 74.8 to 96.2 ([MasakhaNER case study](../case-studies/masakhaner.md#11-what-did-the-metrics-not-show)).
- **Seen versus unseen entities.** Split the test entities into those that also appear in training and those that do not. A model that memorises names scores well on the first group and poorly on the second, and new names are what a deployed model meets.
- **Out-of-domain test set.** If the model will run on social media, SMS or transcripts, build a small test set from that text. News-trained NER loses accuracy on other genres.

## What breaks: common failure modes

- **Silver data as gold.** WikiANN-style projected labels are used as a test set and the scores mean nothing. Fix: evaluate only on human-annotated data.
- **Boundary rules applied inconsistently.** One annotator includes titles or prepositions in spans and another does not; F1 drops for reasons that have nothing to do with the model. Fix: one written rule per boundary case, with examples, and a pilot round before full annotation.
- **Entity leakage across splits.** The same names and articles appear in train and test, and the model's score reflects memorisation. Fix: split by document and report seen versus unseen entities.
- **Licence mismatch.** A product team builds on MasakhaNER and later finds the annotations are licensed for non-commercial use only. Fix: read the licence first; see [Before You Start: NER](../before-you-start/ner.mdx#step-2-judging-masakhaner-2-against-the-checklist).
- **Script blind spots.** A model with no pretraining on the Ge'ez script scores near zero on Amharic, as mBERT did in MasakhaNER 1 ([Adelani et al., 2021](../references.md#adelani-2021)). Fix: choose a pretrained model whose pretraining covers the script and the language.
- **Monolingual test, code-switched deployment.** Real text mixes languages within a sentence and the model fails on it. Fix: include code-switched sentences in the test set and the guideline.

