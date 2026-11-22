---
title: Part-of-Speech Tagging
sidebar_label: Part-of-Speech Tagging
sidebar_position: 3
ready: true
last_update:
  date: 2026-11-22
  author: Seid Muhie Yimam
---

# Part-of-Speech Tagging

Part-of-speech (POS) tagging gives every token in a sentence its grammatical category: noun, verb, adposition, pronoun and so on. It is rarely the end product, but it feeds lemmatisers, morphological analysers, spell and grammar checkers, chunkers, parsers and terminology tools, and it is often the first annotated resource a language community builds after a corpus. For African languages it is also where the question "what counts as a word?" has to be answered explicitly, and that answer shapes every later resource.

The tagging scheme, tokenisation issues and evaluation choices that POS shares with NER are explained in the [Sequence Labelling overview](./index.md). This page covers the tagset, existing resources, the annotation decisions specific to POS, and evaluation.

## What the data looks like

POS data is one tag per token, with no B or I prefixes because each tag covers exactly one token. The first lines of the Hausa training file of MasakhaPOS look like this:

```text
Hakan ADP
na AUX
kunshe VERB
ta PART
cikin ADP
```

Treebanks in [Universal Dependencies](https://universaldependencies.org/) use the richer CoNLL-U format: ten tab-separated columns per token, holding the word form, lemma, universal POS tag (UPOS), language-specific tag, morphological features, and the dependency head and relation. If you might later add lemmas, features or syntax, store your POS data in CoNLL-U from the start and leave the unused columns as `_`.

## Choosing a tagset

Use the Universal POS tagset (UPOS) unless you have a strong reason not to. It grew out of an earlier twelve-category universal tagset ([Petrov et al., 2012](../references.md#petrov-2012)) and is now the seventeen-tag set of Universal Dependencies ([de Marneffe et al., 2021](../references.md#ud-2021)):

| Group | Tags |
|---|---|
| Open class | ADJ, ADV, INTJ, NOUN, PROPN, VERB |
| Closed class | ADP, AUX, CCONJ, DET, NUM, PART, PRON, SCONJ |
| Other | PUNCT, SYM, X |

UPOS makes your data comparable with treebanks in more than a hundred languages, enables cross-lingual transfer from them, and comes with written definitions for every tag on the [UD website](https://universaldependencies.org/u/pos/). MasakhaPOS used it for all twenty of its languages ([Dione et al., 2023](../references.md#masakhapos-2023)).

The cost is that UPOS is coarse. Noun class, which drives agreement in Bantu languages and several others, is not a POS distinction. Record it as a morphological feature (the CoNLL-U `FEATS` column) or a language-specific tag (`XPOS`) rather than inventing new UPOS tags. If a language community already uses a more detailed tagset, keep it in `XPOS` and map it to UPOS, so that both views are available.

## Existing resources

- **MasakhaPOS** is the largest POS dataset for African languages: about 1,500 news sentences in each of twenty languages (Bambara, Ghomala, Ewe, Fon, Hausa, Igbo, Kinyarwanda, Luganda, Luo, Mossi, Chichewa, Nigerian Pidgin, chiShona, Kiswahili, Setswana, Twi, Wolof, isiXhosa, Yorùbá and isiZulu), annotated with UPOS ([Dione et al., 2023](../references.md#masakhapos-2023)). Twelve of the languages reuse MAFAND-MT news text ([Adelani et al., 2022b](../references.md#mafand-2022)), so for those languages the same sentences carry both NER (in MasakhaNER 2) and POS annotation. It is on the [Hugging Face Hub](https://huggingface.co/datasets/masakhane/masakhapos) and in the [MasakhaPOS repository](https://github.com/masakhane-io/masakhane-pos). The dataset card states a non-commercial Creative Commons licence, so check it before commercial use.
- **NCHLT annotated text corpora** for the South African languages are lemmatised, POS-tagged and morphologically analysed, with one token per line followed by its lemma, morphological analysis and tag ([Eiselen & Puttkammer, 2014](../references.md#eiselen-puttkammer-2014)). They come from the same project as the NCHLT NER and chunking data and are distributed through the SADiLaR repository; the [NCHLT isiZulu Annotated Text Corpora](https://hdl.handle.net/20.500.12185/315), for example, hold about 46,000 tokens. Check which tagset each corpus uses and map it to UPOS before combining it with other data, and read the licence on each record before downloading.
- **Universal Dependencies treebanks** exist for a growing number of African languages; see the next section.

### Universal Dependencies treebanks

The [UD website](https://universaldependencies.org/) lists treebanks for, among others, Afrikaans (AfriBooms), Amharic, Bambara, Beja, Coptic, Hausa (four Autogramm treebanks for different dialect areas), Khoekhoe, Nigerian Pidgin (Naija NSC), Northwest Gbaya, Ruuli, Tigrinya, Setswana (Popapolelo), Wolof (WTB) and Yorùbá (YTB). Their sizes range from under a thousand tokens to about 140,000 (Naija NSC), and several have no training split: they are test sets only. When MasakhaPOS was built, only four African languages in UD (Afrikaans, Coptic, Nigerian Pidgin and Wolof) had training data ([Dione et al., 2023](../references.md#masakhapos-2023)). UD publishes a new release twice a year, so check the website for the current list, sizes and licences rather than relying on this paragraph.

Even a small test-only treebank is valuable: it gives you gold POS tags, lemmas and syntax produced under the same guidelines you will use, and a fixed benchmark to report against.

## Tokenisation and word segmentation

UD annotates syntactic words, not orthographic words or morphemes. Applying that rule to African languages forces three decisions, each documented in detail by the MasakhaPOS team ([Dione et al., 2023](../references.md#masakhapos-2023)):

- **Long agglutinative words stay whole.** A chiShona word such as *ndakazomuona*, "I eventually saw him", is one token with one tag (VERB). The subject and object concords inside it are agreement, which UD records as features, not as separate words.
- **Contractions of separate words are split.** The Igbo *yana* becomes *ya* (PRON) plus *na* (CCONJ). When a contraction also changed the sound, as in Wolof *cib* from *ci* plus *ab*, the split has to restore the underlying forms, and some contractions are ambiguous: Wolof *geek* splits into *gi* plus *ak*, where *ak* can be a conjunction or a preposition. Fused forms that cannot be segmented, such as chiShona *vave*, stay whole and take the tag of their main function.
- **Some multi-token units are one word.** In disjunctively written languages a grammatical unit can span several orthographic tokens, such as the Setswana relative marker *yo o*. UD allows multi-token words only for a few cases, and the MasakhaPOS authors argue the class should be widened.

Write the segmentation rules into the guideline with examples, apply them with a script before annotation where possible, and let annotators flag tokens the script got wrong. MasakhaPOS found that disagreements about segmentation made automatic agreement scores hard to compute, because annotators' token sequences differed; fixing segmentation first avoids that.

## Annotation

POS annotation is slow, because every token needs a decision. Two practices from MasakhaPOS make it manageable ([Dione et al., 2023](../references.md#masakhapos-2023)):

1. **Hand-annotate a seed, then correct predictions.** The team annotated 100 sentences per language by hand, fine-tuned a model on them, and had annotators correct the model's tags on the remaining 1,400. Punctuation, numbers and symbols were predicted almost perfectly, and proper nouns well, which removed much of the effort.
2. **Restrict the choices.** Annotators picked from a drop-down of the seventeen UPOS tags, which prevented typos and invented tags.

Each language had three native-speaker annotators with a linguistics background and a language coordinator. Annotators worked independently and the coordinator led the resolution of disagreements, in some languages by discussing every sentence on a call.

Expect hard cases where a word sits between two categories. The common ones in African languages, all discussed in the MasakhaPOS paper, are:

- **Verb or adjective.** In Wolof and Yorùbá, most concepts that English expresses with adjectives are expressed with verbs, and Igbo and Ewe have only a handful of underived adjectives. Decide whether property words are VERB or ADJ, per language, and give examples.
- **Verb or subordinating conjunction.** A form of the verb "say" often introduces reported clauses, as Yorùbá *pé* does. Decide on syntactic tests (can it be reduplicated like a verb? can it start a sentence like a conjunction?) and record them.
- **Adverb or particle.** Ideophones, words that depict a sound, manner or intensity, behave sometimes like adverbs and sometimes like particles bound to one verb.

Each of these decisions should be made once per language, written down with examples, and applied by the coordinator during adjudication.

## Agreement and quality assurance

Report agreement at two levels: tag-level (Cohen's or Fleiss' kappa over tokens, once segmentation is fixed) and sentence-level (the fraction of sentences on which annotators agreed on every tag). Sentence-level agreement is harsh but easy to interpret. In MasakhaPOS it varied widely: of the thirteen language teams whose annotators worked independently, seven agreed on more than 75% of sentences, while four agreed on fewer than half before adjudication ([Dione et al., 2023](../references.md#masakhapos-2023)). Low first-pass agreement is normal for POS in a new language; what matters is that every disagreement is resolved and the resolution is written into the guideline.

Automatic checks catch what agreement misses:

```python
from collections import Counter, defaultdict

UPOS = {"ADJ", "ADP", "ADV", "AUX", "CCONJ", "DET", "INTJ", "NOUN", "NUM",
        "PART", "PRON", "PROPN", "PUNCT", "SCONJ", "SYM", "VERB", "X"}

def pos_report(sentences):
    """sentences: list of (tokens, tags). Report invalid tags and ambiguous word forms."""
    invalid, forms = [], defaultdict(Counter)
    for i, (tokens, tags) in enumerate(sentences):
        for tok, tag in zip(tokens, tags):
            if tag not in UPOS:
                invalid.append((i, tok, tag))
            forms[tok.lower()][tag] += 1
    # Frequent forms with more than one tag: review that each tag is justified.
    ambiguous = {f: dict(c) for f, c in forms.items() if len(c) > 1 and sum(c.values()) >= 10}
    return invalid, ambiguous
```

A word form with several tags is not necessarily an error, since many words are genuinely ambiguous, but frequent forms whose tags split roughly evenly are worth a coordinator's review. Also watch the `X` tag: MasakhaPOS found annotators used it for misspelled words, which were then corrected and retagged.

## Evaluation

Score POS with token-level accuracy over all tokens, then break it down:

- **Per-tag accuracy or F1.** In MasakhaPOS, PUNCT, NUM, PROPN, NOUN and VERB were easiest (above 90% accuracy across languages) and SYM, INTJ and X hardest ([Dione et al., 2023](../references.md#masakhapos-2023)). Rare tags barely move overall accuracy, so look at them separately.
- **Per-language accuracy.** The best MasakhaPOS model, AfroXLMR-large, averaged 89.4% accuracy, with eleven of the twenty languages above 90%.
- **Out-of-vocabulary tokens.** Accuracy on words not seen in training is the better guide to how a tagger will do on new text, especially in agglutinative languages where most word forms are rare.

Because MasakhaPOS splits its data 50/10/40 (train/development/test), its test sets are larger than usual, which makes per-language comparisons more reliable. Keep a large test set if you build your own.

For a language with no POS data, cross-lingual transfer is worth trying before annotating. MasakhaPOS found that a source language from the same family with similar morphosyntax transferred best, and that combining the best few source languages helped further ([Dione et al., 2023](../references.md#masakhapos-2023)); see [Cross-language transfer](../cross-language-transfer/index.md). Transfer gives a starting point for pre-annotation, not a replacement for an in-language test set.

## What breaks: common failure modes

- **Segmentation decided during annotation.** Annotators split contractions differently and their token sequences no longer align. Fix: write and apply segmentation rules before tagging starts.
- **Invented tags.** Annotators add NOUN-CLASS-7 or ADJ/VERB to capture a real distinction. Fix: keep UPOS in the UPOS column and put the extra information in `XPOS` or `FEATS`.
- **Inconsistent verb and adjective decisions.** Property words are VERB in one batch and ADJ in another. Fix: one documented decision per language, enforced during adjudication.
- **Accepting pre-annotation errors.** Correctors trust the model's suggestions on hard tokens. Fix: hand-annotate a control sample without suggestions and compare.
- **Diacritics stripped.** Tone-marked words merge with unmarked homographs that have different tags. Fix: keep marks throughout, as described in the [overview](./index.md#tokenisation-and-morphology).
- **Only overall accuracy reported.** A tagger that is perfect on punctuation and poor on verbs looks good. Fix: publish per-tag and out-of-vocabulary accuracy.

