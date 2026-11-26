---
title: Sequence Labelling
sidebar_label: Overview
sidebar_position: 1
ready: true
last_update:
  date: 2026-11-26
  author: Seid Muhie Yimam
---

# Sequence Labelling

Sequence labelling assigns a label to every token in a sentence, rather than one label to the whole text. Named entity recognition (NER) marks which tokens belong to a person, organisation, place or date; part-of-speech (POS) tagging gives every token a grammatical category; chunking groups tokens into flat phrases such as noun phrases and verb phrases. Slot filling in a voice assistant, which finds the amount and the recipient in "send five thousand shillings to Amina", is the same task under another name.

This chapter covers what the three tasks share: tagging schemes, the tokenisation decisions that African languages force on you, the annotation pipeline, and how to score the result. The task pages then go deeper:

- [Named Entity Recognition](./ner.md): entity types, guidelines, nested and ambiguous entities, MasakhaNER and other resources.
- [Part-of-Speech Tagging](./pos.md): the Universal POS tagset, MasakhaPOS, Universal Dependencies treebanks, and the word-segmentation problem.
- [Relations and Coreference](./relations.md): links between entity spans, coreference chains, relation agreement, and formats that can hold them.
- Slot filling is covered with intent detection in [Intent Classification](../11_text-classification/intent-classification.md).

Before building a corpus, check what already exists. [Before You Start: NER](../before-you-start/ner.mdx) walks through the reuse, extend or build decision for NER, and the same four steps apply to POS.

:::tip[Key points]

- Decide what a token is before annotation starts; agglutination, clitics and tone marks make this a real decision in many African languages.
- Store labels in BIO, let the tool or a script write the tags, and normalise every file to one scheme before merging.
- Normalise text to NFC once, freeze it, and store offsets in logical order and in code points.
- Annotate independently, adjudicate, run automatic checks, and split by document.
- Score NER and chunking with span-level F1, POS with token accuracy, and report per-language and per-type results.

:::

## What the data looks like

Sequence-labelling data is a list of tokens with one label per token. The most common distribution format is the CoNLL style: one token per line followed by its label, and a blank line between sentences. The MasakhaNER and MasakhaPOS repositories distribute their data in this token-per-line style:

```text title="train.txt (CoNLL style)"
Muhammadu	B-PER
Buhari	I-PER
ya	O
ziyarci	O
Kano	B-LOC
ranar	B-DATE
Litinin	I-DATE
.	O
```

The Hausa sentence reads "Muhammadu Buhari visited Kano on Monday." On the Hugging Face Hub the same data is usually stored as one record per sentence, with parallel lists of tokens and labels:

```json
{
  "id": "hau_0001",
  "tokens": ["Muhammadu", "Buhari", "ya", "ziyarci", "Kano", "ranar", "Litinin", "."],
  "ner_tags": ["B-PER", "I-PER", "O", "O", "B-LOC", "B-DATE", "I-DATE", "O"],
  "language": "hau"
}
```

Whatever the format, the two lists must have the same length for every sentence. A mismatch, usually caused by a tokeniser that split a word differently in one pass, shifts every label after it by one position and corrupts the sentence silently.

## Tagging schemes

A label set such as PER, ORG and LOC names the categories; a tagging scheme says how a multi-token span is written as one label per token. Treating chunking as tagging, with the span structure encoded in the tags rather than as brackets, goes back to [Ramshaw and Marcus (1995)](../references.md#ramshaw-marcus-1995).

- **BIO (also called IOB2).** `B-` marks the first token of a span, `I-` every following token inside it, and `O` a token outside any span. Two adjacent entities of the same type stay separate because the second starts with `B-`. This is the default for NER and the scheme MasakhaNER uses.
- **BIOES (also called IOBES or BILOU).** Adds `E-` for the last token of a multi-token span and `S-` for a single-token span. It gives the model more explicit boundary information, at the cost of twice as many labels.
- **IO.** Only `I-` and `O`. Simplest to annotate, but two adjacent entities of the same type merge into one. Avoid it for anything you plan to release.
- **Plain tags.** POS tagging labels single tokens, so it needs no scheme: each token gets one tag from the tagset.

The same Hausa sentence in BIOES:

```text
Muhammadu  B-PER
Buhari     E-PER
ya         O
ziyarci    O
Kano       S-LOC
ranar      B-DATE
Litinin    E-DATE
.          O
```

Annotators should never type B, I or E by hand. They select a span in the annotation tool and choose its type; the tool or an export script writes the tags. Conversion between BIO and BIOES is mechanical, so pick BIO for storage and convert if a model needs the other.

:::warning[Check the scheme before you merge]
Older datasets sometimes use IOB1, where `B-` appears only when two same-type entities touch. Merging an IOB1 file with an IOB2 file produces sentences that look valid but score wrongly. Read the dataset card, and normalise every file to one scheme before combining them.
:::

## Tokenisation and morphology

Every sequence-labelling decision rests on the question "what is a token?", and for many African languages the answer is not "whatever sits between two spaces". Decide it in the guidelines, before annotation starts, because changing it afterwards means re-annotating.

- **Agglutination and conjunctive orthography.** In many Bantu languages one orthographic word carries what English spreads across a sentence. The MasakhaPOS team give the chiShona word *ndakazomuona*, "I eventually saw him", built from a subject concord, an aspect marker, an auxiliary, an object concord and the verb stem ([Dione et al., 2023](../references.md#masakhapos-2023)). Universal Dependencies does not split such words into morphemes, so the whole word is one token with one tag.
- **Disjunctive orthography.** Setswana and Sesotho write many of the same morphemes as separate words. Here the problem runs the other way: several orthographic tokens can form one grammatical unit, such as the Setswana relative marker *yo o* in *ngwana yo o ratang*, "the child who likes" ([Dione et al., 2023](../references.md#masakhapos-2023)).
- **Clitics and contractions.** Function words attach to their neighbours in Hausa, Igbo, isiZulu, Kinyarwanda, Wolof and Yorùbá. The Igbo form *yana* is a pronoun *ya* plus the conjunction *na*; the Wolof *cib* is the preposition *ci* plus the article *ab* with its vowel deleted, so it cannot be split by cutting characters off ([Dione et al., 2023](../references.md#masakhapos-2023)). For NER the same issue appears when a prefix or a preposition is written inside the same word as a name: the guideline must say whether the tagged span is the whole word or only the name.
- **Diacritics and tone marks.** In Yorùbá, Igbo and other tonal languages written with tone marks, the marks distinguish words. A pipeline that strips or normalises them inconsistently turns two different words into one string, and an entity boundary or a POS tag that depended on the difference is lost. Normalise Unicode (NFC) once, at ingestion, and never strip marks in preprocessing. The MasakhaNER 2 team had native speakers restore missing diacritics in the Yorùbá source text before annotation ([Adelani et al., 2022a](../references.md#adelani-2022)).
- **Numbers written as words.** Igbo, Wolof and Yorùbá often write numbers out in full, which changes how many tokens a date or an amount spans ([Adelani et al., 2021](../references.md#adelani-2021)).

Subword tokenisers used by pretrained models add a second layer. A model such as AfroXLMR splits a long agglutinative word into several pieces, but the label belongs to the word. The usual practice is to give the label to the first piece and ignore the rest when computing the loss, then read predictions back from the first piece of each word. Evaluate on words, never on subword pieces.

## Scripts, spans and offsets

Annotators select spans on a screen, but what the tool stores is a pair of character offsets into a string. For Latin-script text the two rarely drift apart. For the other scripts African languages are written in, such as the Arabic-script Ajami used for Hausa, Fulfulde and other languages, Ge'ez for Amharic and Tigrinya, Tifinagh for Tamazight and N'Ko for Manding languages, the path from what is displayed to what is stored has more places to break. Fonts, input methods and rendering in general are covered in [Non-Latin scripts in real UIs](../deployment/non-latin-scripts.md); this section covers only what affects span annotation.

### Pilot the tool on real script samples

Before annotation starts, load a few dozen real sentences in each script your corpus uses into your annotation tool, on the annotators' own devices, and check three things:

1. **Display.** Right-to-left lines, and mixed lines such as Ajami text with Latin names or numbers, appear in the right order, and stay in the right order while a span is highlighted and after it is labelled.
2. **Selection.** Double-clicking or dragging over a word selects that word by the rules of its script, not by Latin defaults. Watch for letters that join in Arabic script and for Ge'ez text that separates words with the traditional word-space mark (፡) instead of a space.
3. **Round trip.** Label a few spans, save, reload the item, and export. In the exported file, check that every span's offsets still pick out the text that was labelled.

If any check fails, fix the configuration or change tools before annotators start. A display or offset problem found after annotation means checking every span by hand.

### Choose the selection unit

Whether annotators select characters, words or whole sentences is a design decision, and it interacts with the token rules above.

- **Word selection** (the selection snaps to whole words) removes most boundary noise, since annotators cannot leave off a letter by accident. But it follows the tool's own idea of a word, which may disagree with your project's tokenisation, and it cannot select part of a word.
- **Character selection** lets annotators mark a span inside a word, such as a name that carries a prefixed preposition or a clitic. It also produces more small boundary disagreements, which the guideline and adjudication must absorb.

Choose with the affix and clitic rule in your guideline in mind (see [Writing the guideline](./ner.md#writing-the-guideline) for NER). If the rule says the span is the whole orthographic word, word selection is safer. If it says to tag only the name inside a longer word, you need character selection, or a tokenisation that splits the word before annotation.

### Store offsets in logical order

Unicode text is stored in logical order, the order in which it is read and typed; the bidirectional algorithm changes only how right-to-left text is displayed ([Unicode Consortium, 2026e](../references.md#unicode-uax9)). Offsets must count positions in that stored order, from the start of the string, never positions on the screen. Users of annotation tools have been unsure whether exported offsets on Arabic text count from the left or the right of the line ([an example](https://github.com/HumanSignal/label-studio/issues/2653)); storing offsets in logical order removes the question, as long as the dataset card says that is the convention.

Two further details decide whether an offset means the same thing in every program that reads it:

- **The unit.** Python counts Unicode code points; JavaScript, which many web annotation tools are built on, counts UTF-16 code units. The two agree for the Arabic, Ethiopic (main blocks), Tifinagh and N'Ko blocks, but differ for characters outside the Basic Multilingual Plane, where each character counts as two UTF-16 units. These include emoji, common in social-media text, and some African scripts, such as Adlam (used for Fulfulde) and Mende Kikakui. Convert to code points when you export, and test with a sentence that contains an emoji or an Adlam letter.
- **Combining marks.** Some tone-marked letters remain two code points even after NFC normalisation, such as Yorùbá *ẹ́* (an *ẹ* followed by a combining acute accent). A span boundary must never fall between a letter and its mark.

Record the convention in the dataset card: the normalisation form (NFC), the unit (code points), logical order, and whether the end offset is exclusive. A short check on every export catches most offset errors:

```python
import unicodedata

def check_offsets(text: str, spans: list[dict]) -> list[str]:
    """Check that each span's offsets give its text, in NFC and logical order."""
    problems = []
    if unicodedata.normalize("NFC", text) != text:
        problems.append("text is not NFC-normalised")
    for s in spans:
        start, end = s["start"], s["end"]
        if text[start:end] != s["text"]:
            problems.append(f"{start}:{end} gives {text[start:end]!r}, expected {s['text']!r}")
        if end < len(text) and unicodedata.combining(text[end]):
            problems.append(f"span {start}:{end} cuts a combining mark off its letter")
        if start < len(text) and unicodedata.combining(text[start]):
            problems.append(f"span {start}:{end} starts on a combining mark")
    return problems
```

### Tag the language and the script

Tag every record with its language and, where the language is written in more than one script, the script: `ha-Latn` and `ha-Arab` for Hausa in Latin and Ajami script, `ff-Arab` for Fulfulde in Ajami, `zgh-Tfng` for Standard Moroccan Tamazight in Tifinagh. These are BCP 47 language tags ([Phillips and Davis, 2009](../references.md#rfc-5646)), the form used on the web, for example in the HTML `lang` attribute. Leave the script subtag out when it adds nothing, for example for Amharic, which the registry already associates with Ge'ez script ([W3C, n.d.](../references.md#w3c-language-tags)).

Other pages of this playbook use the form `hau_Latn` (see [Data Provenance and Traceability](../2_data-collection/8_data-provenance-traceability.md)). It carries the same information: an ISO 639-3 language code and an ISO 15924 script code joined by an underscore, where BCP 47 uses a hyphen and the two-letter ISO 639-1 code when one exists (`ha`, not `hau`). The underscore form always includes the script, so when mapping between the two forms, add the script the registry implies (`am` becomes `amh_Ethi`). Either form works. Pick one for the dataset, use it in every record, and give the mapping to the other in the dataset card.

### Freeze the text annotators saw

Offsets are only valid against the exact string the annotator saw. Normalise Unicode and line endings before import (see [Data Cleaning and Preprocessing](../2_data-collection/7_data-cleaning-preprocessing.md#freeze-the-text-before-span-annotation)), never after annotation, and release that exact text with the annotations. Any later cleaning, such as removing a stray space or re-normalising, shifts every offset after it.

### Language identification of code-switched text

Language identification can be an annotation task in its own right. The guideline should settle four things:

- **Codes, not names.** Tag each token or span with a code from a controlled list, not a free-text language name. Use the same code form as the record tags above (an ISO 639-3 code, or the BCP 47 tag), and add the script where scripts mix.
- **Hard cases.** Say how to tag named entities, words that mix two languages, and text whose language is other or unknown.
- **Finding the code.** Annotators know languages by their own names, not by codes. Let them look a language up by its native name or a common alternative name, while the data records the code.
- **Missing varieties.** Provide an `other` option with a free-text note, and have a coordinator review those notes regularly and add a code where one exists.

Apply the same coded-value rule to metadata such as speaker language, country and script, so that exports from different batches can be merged. Detecting the language at deployment time is a separate problem; see [Multilingual switching within a session](../deployment/multilingual-switching.md#detection-strategies).

### Spans in web pages and PDFs

When annotators mark spans in a rendered web page or a PDF rather than in plain text, the offsets refer to text extracted from the document, and a different extraction (another library, another version, or a re-downloaded page that has changed) produces a different string. Three rules keep such spans usable:

- **Keep a snapshot.** Store the exact HTML file or PDF that was annotated, not just its URL.
- **State the extraction.** Store offsets against one stated text extraction, and record the tool and version that produced it. If you strip HTML tags during cleaning (as in [Collecting and Preparing Data](../11_text-classification/collecting-and-preparing-data.md#processing--sampling)), annotate the stripped text, not the page.
- **Re-check a sample.** Before release, re-extract a sample of documents and confirm that every span still resolves to the labelled text.

## The shared pipeline

The general groundwork is in [Data Collection](../2_data-collection/0_Overview.md), [Annotation Design](../3_annotation-design/annotation-task-design.md) and [Data Quality](../4_data-quality/index.md). For sequence labelling the steps are:

1. **Choose the source text.** News is the most common choice because it is available, varied and full of entities; both MasakhaNER and MasakhaPOS annotated news. If your use case is social media, SMS or government documents, annotate that instead, or at least build a test set from it.
2. **Fix tokenisation and sentence splitting first.** Write down the token rules from the section above, tokenise the whole corpus once, and freeze it. Every annotator labels the same tokens.
3. **Write the guideline and pilot it.** Start from an existing guideline (the MasakhaNER guideline for NER, the UD guidelines for POS), translate its examples into your language, and add a section for every language-specific case. Pilot on 50 to 100 sentences with all annotators and revise.
4. **Pre-annotate where it helps.** For POS, a model trained on a small hand-annotated seed can propose tags for annotators to correct, as MasakhaPOS did (see [Part-of-Speech Tagging](./pos.md#annotation)). Watch for anchoring: annotators accept a wrong suggestion more readily than they would make the error themselves. [Model-Assisted Annotation](../3_annotation-design/model-assisted-annotation.md) covers seeding, review of drafts, and what to record about the model.
5. **Annotate independently, then adjudicate.** At least two annotators per sentence, a language coordinator who resolves disagreements, and a written record of each decision that changes the guideline. See [Workflow and adjudication](../3_annotation-design/workflow-adjudication.md).
6. **Run automatic checks.** Flag tokens tagged inconsistently across the corpus, invalid tag sequences, and sentences whose token and label lists differ in length (see the check below).
7. **Split by document, not by sentence.** Sentences from the same article share names and vocabulary, so put the whole article in one split.

A short validity check catches the most common export errors. Run it on the release files as well as on the tool's export, since a format conversion can break tag sequences too (see [Verify the export before you release](../9_dataset-lifecycle/release.md#verify-the-export-before-you-release)):

```python
def check_sentence(tokens: list[str], tags: list[str]) -> list[str]:
    """Return problems found in one BIO-tagged sentence."""
    problems = []
    if len(tokens) != len(tags):
        return [f"{len(tokens)} tokens but {len(tags)} tags"]
    prev = "O"
    for i, (tok, tag) in enumerate(zip(tokens, tags)):
        if tok != tok.strip() or not tok:
            problems.append(f"token {i} is empty or has whitespace: {tok!r}")
        if tag.startswith("I-"):
            # An I- tag must continue a span of the same type.
            if prev == "O" or prev[2:] != tag[2:]:
                problems.append(f"token {i} '{tok}': {tag} does not continue {prev}")
        prev = tag
    return problems


print(check_sentence(["Kano", "ranar", "Litinin"], ["B-LOC", "I-DATE", "I-DATE"]))
# ["token 1 'ranar': I-DATE does not continue B-LOC"]
```

## Evaluation: tokens or spans

Sequence labelling can be scored per token or per span, and the two answer different questions.

- **Token-level accuracy** counts the fraction of tokens with the correct tag. It is the standard metric for POS tagging, where every token carries a meaningful tag.
- **Span-level (entity-level) F1** counts a predicted entity as correct only if both its boundaries and its type match the gold entity exactly, then computes precision, recall and F1 over entities. It is the standard metric for NER and chunking, and the one MasakhaNER reports.

Token accuracy is a poor measure for NER, because most tokens are `O` and a model that tags everything `O` already scores high. Span F1 is strict in the other direction: a name with one token missing counts as both a false positive and a false negative. The example below shows the gap on the Hausa sentence, where the model finds only the first half of the person's name:

```python
# pip install seqeval
from seqeval.metrics import classification_report, f1_score
from seqeval.scheme import IOB2

y_true = [["B-PER", "I-PER", "O", "O", "B-LOC", "B-DATE", "I-DATE", "O"]]
y_pred = [["B-PER", "O",     "O", "O", "B-LOC", "B-DATE", "I-DATE", "O"]]

token_acc = sum(t == p for t, p in zip(y_true[0], y_pred[0])) / len(y_true[0])
print(f"token accuracy: {token_acc:.3f}")                           # 0.875
print(f"entity F1: {f1_score(y_true, y_pred, mode='strict', scheme=IOB2):.3f}")  # 0.667
print(classification_report(y_true, y_pred, mode="strict", scheme=IOB2))
```

Use [seqeval](https://github.com/chakki-works/seqeval) for span-level scoring. Its default mode reproduces the CoNLL `conlleval` script, which quietly repairs invalid sequences such as an `I-` tag with no `B-` before it; `mode="strict"` with an explicit scheme does not, and is the safer choice when comparing models. Always report the mode you used.

Report per-language and per-type scores, not only an average. A single average across twenty languages hides the languages and entity types where the corpus or the model is weak, and those are what a reader needs to know before reusing your data.

## Chunking and shallow parsing

Chunking divides a sentence into non-overlapping phrases (noun phrases, verb phrases, prepositional phrases) without building a full parse tree. It is cheaper to annotate than a treebank and useful for terminology extraction, information extraction and grammar checking.

Resources for African languages are scarce, and we know of only one multilingual effort. Eiselen built annotation protocols, annotated phrase-chunking data and CRF chunkers for ten South African languages, using government-domain text and storing the chunks in the IOB format ([Eiselen, 2016a](../references.md#eiselen-2016-chunking)). Two of its findings carry over to any new project:

- The disjunctively written languages (such as Setswana and Sesotho) reached notably better results with limited data.
- Character n-gram features helped the conjunctively written languages (such as isiZulu and isiXhosa), where one orthographic word holds several phrase-level units.

The per-language corpora, produced in the NCHLT Text Resource Development project, are distributed through the [SADiLaR repository](https://repo.sadilar.org/) under a Creative Commons Attribution licence; the [NCHLT isiZulu Phrase Chunk Annotated Corpus](https://hdl.handle.net/20.500.12185/320) is one example.

Beyond that, we found no openly released chunking dataset for other African languages. If you need one, the practical routes are:

- **Derive chunks from a treebank.** Where a Universal Dependencies treebank exists for your language (see [Part-of-Speech Tagging](./pos.md#universal-dependencies-treebanks)), flat chunks can be read off the dependency trees with a few rules. Check the rules by hand on a sample, because they encode assumptions about head-final or head-initial phrases.
- **Annotate on top of POS tags.** Chunk annotation goes much faster when annotators see gold or predicted POS tags. Use the BIO scheme with phrase types (`B-NP`, `I-NP`, `B-VP` and so on) and score with span F1, exactly as for NER.

:::tip[Contribute]
If you have built or know of a chunking or shallow-parsing dataset for an African language, add it to this section with a pull request.
:::

## What breaks: common failure modes

- **Tokenisation drift.** The corpus was tokenised twice with different settings and labels shifted. Fix: tokenise once, store the tokens, and never re-tokenise annotated text.
- **Diacritics stripped in preprocessing.** Tone-marked and unmarked forms merge and the model learns the wrong one. Fix: NFC-normalise at ingestion and test that a round trip preserves every mark.
- **Invalid tag sequences in exports.** An `I-` tag follows `O`, and the scorer silently repairs or penalises it depending on its mode. Fix: run a validity check on every export.
- **Scoring subword pieces.** Reported F1 is inflated because long words count several times. Fix: map predictions back to words before scoring.
- **Same article in train and test.** Names repeat across sentences of the same story, so test scores flatter the model. Fix: split by document.
- **Average-only reporting.** One weak language or entity type disappears into the mean. Fix: publish per-language and per-type tables.

