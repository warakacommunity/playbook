---
title: Relations and Coreference
sidebar_label: Relations and Coreference
sidebar_position: 4
ready: true
last_update:
  date: 2026-11-22
  author: Seid Muhie Yimam
---

# Relations and Coreference

Named entity recognition says *what* the spans in a sentence are. Relation annotation says how they are connected: that Amina is Juma's daughter, that a pest attacks a crop, that a disease outbreak was reported in a district on a given date. Coreference annotation says which spans refer to the same thing, so that a name, a later "she" and a later "the farmer" can be read as one person. Both are layers on top of entity spans, and both are needed for knowledge-graph building, question answering over documents, and information extraction from advisory, health or news text.

This page covers the design decisions, the workflow, agreement, and the release format. Span selection, tokenisation and offsets are explained in the Sequence Labelling overview, under [Tokenisation and morphology](./index.md#tokenisation-and-morphology) and [Scripts, spans and offsets](./index.md#scripts-spans-and-offsets), and entity types and guidelines in [Named Entity Recognition](./ner.md).

Annotated relation and coreference data for African languages is scarce. At the time of writing (2026), we know of no openly released, multi-language relation or coreference corpus for African languages comparable to MasakhaNER for entities, so most projects will be building from scratch and should plan a longer pilot than for NER.

:::tip[Contribute]
If you have built or know of a relation-extraction or coreference dataset for an African language, add it to this page with a pull request.
:::

## What the data looks like

A relation is a directed link from one span (the head) to another (the tail), with a type. The Swahili sentence below, "Amina, Juma's daughter, grows maize in Kisii", has four entity spans and three relations:

```json
{
  "id": "swa_0001",
  "text": "Amina, binti wa Juma, analima mahindi huko Kisii.",
  "language": "swa_Latn",
  "entities": [
    {"id": "T1", "start": 0,  "end": 5,  "label": "PER",  "text": "Amina"},
    {"id": "T2", "start": 16, "end": 20, "label": "PER",  "text": "Juma"},
    {"id": "T3", "start": 30, "end": 37, "label": "CROP", "text": "mahindi"},
    {"id": "T4", "start": 43, "end": 48, "label": "LOC",  "text": "Kisii"}
  ],
  "relations": [
    {"head": "T1", "tail": "T2", "type": "child_of"},
    {"head": "T1", "tail": "T3", "type": "grows"},
    {"head": "T1", "tail": "T4", "type": "based_in"}
  ]
}
```

The entities are character offsets into the stored text, and the relations refer to entity ids, not to text. This is the shape every relation format shares, whatever its syntax. The standoff format of the brat annotation tool ([Stenetorp et al., 2012](../references.md#stenetorp-2012)), for example, writes each span as a `T` line with its offsets and each relation as an `R` line that names two span ids (see the [brat standoff format](https://brat.nlplab.org/standoff.html)).

Flat BIO or CoNLL files cannot hold relations: they have one label per token and no way to point from one span to another. If you also release a BIO view of the entities for NER models, release the relation file alongside it, generated from the same spans.

## Design decisions

Write these into the guideline before the pilot, because each one changes what annotators draw.

### The relation inventory

List every relation type with its direction and the entity types it may join. A small table in the guideline is enough:

| Relation | Head | Tail | Example |
|---|---|---|---|
| `child_of` | PER | PER | Amina → Juma |
| `grows` | PER, ORG | CROP | Amina → mahindi |
| `based_in` | PER, ORG | LOC | Amina → Kisii |
| `reported_in` | DISEASE | LOC | kipindupindu → Kisii (cholera reported in Kisii) |

Direction must be stated for every type, since "Amina `child_of` Juma" and "Juma `child_of` Amina" say opposite things. For symmetric relations, such as "married to" or "sibling of", say how they are stored: either once, with a fixed rule for which argument is the head (for example, the one that appears first in the text), or as a type marked symmetric so that scoring ignores direction.

Kinship deserves care in many African languages. Kinship terms often do not map one to one onto English "brother", "cousin" or "aunt". Define the kinship relations from the language's own terms, with examples, rather than translating an English inventory.

Keep the inventory small. Every extra type adds pairs that annotators can confuse, and a pilot with five well-separated types teaches more than one with twenty overlapping ones.

### Scope and the "no relation" case

- **Within or across sentences.** Decide whether a relation may join spans in different sentences. Cross-sentence relations capture more of what a text says, but annotators must hold more context, agreement is usually lower, and the number of candidate pairs grows quickly with document length. If you limit relations to one sentence, say so in the dataset card.
- **Stated, not inferred.** Decide whether a relation must be expressed in the text or may be inferred from world knowledge. Annotators who know the people or places will otherwise add relations the text never states.
- **Other and no relation.** In most annotation interfaces, a pair with no relation drawn is ambiguous: it can mean "not related" or "not looked at". Add an explicit `other` type for pairs that are clearly related in a way the inventory does not cover, and review those pairs when revising the inventory. If you need true negatives for training a classifier, generate the candidate pairs (for example, every pair of entities in a sentence with allowed types) and ask annotators to label each one, including "none".

### Spans come first

A relation needs both of its endpoint spans to exist. Annotators draw the entities, then the relation between them. If a span is later deleted or changed, every relation that pointed to it must be deleted or re-checked, and the validation script below checks for relations left pointing at nothing.

A minimal labelling configuration, in the same XML format used elsewhere in the playbook, puts the relation types and the entity labels side by side:

```xml
<View>
  <Relations>
    <Relation value="child_of"/>
    <Relation value="grows"/>
    <Relation value="based_in"/>
    <Relation value="reported_in"/>
    <Relation value="other"/>
  </Relations>
  <Labels name="entity" toName="text">
    <Label value="PER"/>
    <Label value="LOC"/>
    <Label value="CROP"/>
    <Label value="DISEASE"/>
  </Labels>
  <Text name="text" value="$text" granularity="word"/>
</View>
```

If your annotation tool's relation feature cannot restrict which entity types a relation may join, the allowed head and tail types from the inventory table must be checked after export.

## Workflow: entities first, then relations

Annotate in two passes. In the first pass, annotators mark the entities, and the entities are adjudicated as for NER (see [Annotation and agreement](./ner.md#annotation-and-agreement)). In the second pass, annotators draw relations on the adjudicated, now fixed, spans. The two passes can be done by the same people a few days apart, or by different people.

Separating the passes keeps relation errors apart from span errors. If both are done at once, two annotators who disagree on whether a span is "Juma" or "binti wa Juma" will also appear to disagree on every relation touching it, and agreement figures can no longer say which layer is weak. It also makes the second pass faster, since annotators only connect spans that already exist. If entities are pre-annotated by a model, the cautions in [Model-assisted annotation](../3_annotation-design/model-assisted-annotation.md) apply to the first pass.

For coreference, the same split applies: fix the mentions first, then link them into chains.

## Agreement and automatic checks

Report entity agreement and relation agreement separately. Entity agreement is measured as for NER. For relations, the Linguistic Data Consortium's approach for its entity, relation and event annotation is to map the two annotators' entity mentions onto each other first, then compare relations only through that mapping, and to classify each pair of relations as, among other categories, an exact match, a match on its arguments with a different type, or no match at all ([Kulick et al., 2014](../references.md#kulick-2014)). The two-pass workflow makes the mapping trivial: after adjudication, both annotators work on the same spans.

Score relations as (head, tail, type) triples with pairwise F1, treating one annotator as reference and the other as prediction. Kappa needs a count of the cases both annotators left unmarked. For relations that count (every pair of spans no one connected) is either undefined or so large and arbitrary that kappa then depends on how you chose to count it, and approaches F1 as the count grows. Pairwise F1, which equals positive specific agreement, does not need it ([Hripcsak and Rothschild, 2005](../references.md#hripcsak-2005)). If you labelled explicit candidate pairs, including "none", kappa over those pairs is also meaningful. The general treatment of agreement statistics is in [Data Quality](../4_data-quality/index.md#measure-inter-annotator-agreement).

```python
def relation_agreement(rels_a, rels_b):
    """Compare two annotators' relations on the same, already adjudicated spans.

    Each relation is a (head, tail, type) triple of span ids and a relation type.
    Returns pairwise F1 and a list of disagreements: B's relations that differ
    from A in type, direction or arguments, and A's relations B missed entirely.
    """
    matched = rels_a & rels_b
    p = len(matched) / len(rels_b) if rels_b else 0.0
    r = len(matched) / len(rels_a) if rels_a else 0.0
    f1 = 2 * p * r / (p + r) if p + r else 0.0

    pairs_a = {(h, t): typ for h, t, typ in rels_a}
    problems = []
    for h, t, typ in sorted(rels_b - rels_a):
        if (h, t) in pairs_a:
            problems.append(("type", (h, t), pairs_a[(h, t)], typ))
        elif (t, h) in pairs_a:
            problems.append(("direction", (h, t), pairs_a[(t, h)], typ))
        else:
            problems.append(("arguments", (h, t), None, typ))
    pairs_b = {(h, t) for h, t, _ in rels_b}
    for h, t, typ in sorted(rels_a - rels_b):
        if (h, t) not in pairs_b and (t, h) not in pairs_b:
            problems.append(("missing", (h, t), typ, None))
    return f1, problems


# T1 Amina, T2 Juma, T3 mahindi, T4 Kisii
a = {("T1", "T2", "child_of"), ("T1", "T3", "grows"), ("T1", "T4", "based_in")}
b = {("T2", "T1", "child_of"), ("T1", "T3", "grows"), ("T1", "T4", "based_in")}

f1, problems = relation_agreement(a, b)
print(f"relation F1: {f1:.3f}")  # 0.667
print(problems)  # [('direction', ('T2', 'T1'), 'child_of', 'child_of')]
```

The breakdown matters more than the score. Many "direction" disagreements mean the guideline does not say clearly which argument is the head; many "type" disagreements point to two types that overlap; many "arguments" or "missing" disagreements usually mean the scope rules (within or across sentences, stated or inferred) are unclear.

Run automatic checks on every export, as for BIO tags:

- **Dangling relations.** Every head and tail id must exist among the entities of the same record.
- **Argument types.** Every relation must join entity types the inventory allows.
- **Self-links and duplicates.** No relation from a span to itself, and no relation stored twice (or, for a symmetric type, stored in both directions).

```python
ALLOWED = {
    "child_of": ({"PER"}, {"PER"}),
    "grows":    ({"PER", "ORG"}, {"CROP"}),
    "based_in": ({"PER", "ORG"}, {"LOC"}),
    "reported_in": ({"DISEASE"}, {"LOC"}),
    "other":    (None, None),  # any types
}
SYMMETRIC = set()  # for example {"married_to"} if the inventory has symmetric types

def check_relations(record: dict) -> list[str]:
    """Return problems in one record with 'entities' and 'relations' lists."""
    spans = {e["id"]: e["label"] for e in record["entities"]}
    problems, seen = [], set()
    for rel in record["relations"]:
        h, t, typ = rel["head"], rel["tail"], rel["type"]
        if h not in spans or t not in spans:
            problems.append(f"{typ}: points to a missing span ({h}, {t})")
            continue
        if h == t:
            problems.append(f"{typ}: links {h} to itself")
        heads, tails = ALLOWED.get(typ, (set(), set()))
        if heads is not None and (spans[h] not in heads or spans[t] not in tails):
            problems.append(f"{typ}: {spans[h]} -> {spans[t]} is not allowed")
        if (h, t, typ) in seen or (typ in SYMMETRIC and (t, h, typ) in seen):
            problems.append(f"{typ}: duplicate ({h}, {t})")
        seen.add((h, t, typ))
    return problems
```

## Coreference as a special case

Coreference is relation annotation with one relation type, "refers to the same entity as", which is symmetric and transitive. Rather than drawing links between pairs, it is usually stored as chains (clusters): each chain is the set of mentions that refer to one entity. In "Amina alifika Kisii jana. Yeye ni mkulima wa mahindi." ("Amina arrived in Kisii yesterday. She is a maize farmer."), the mentions *Amina*, *Yeye* and *mkulima wa mahindi* form one chain.

```json
{
  "id": "swa_doc_0001",
  "text": "Amina alifika Kisii jana. Yeye ni mkulima wa mahindi.",
  "mentions": [
    {"id": "M1", "start": 0,  "end": 5,  "text": "Amina"},
    {"id": "M2", "start": 14, "end": 19, "text": "Kisii"},
    {"id": "M3", "start": 26, "end": 30, "text": "Yeye"},
    {"id": "M4", "start": 34, "end": 52, "text": "mkulima wa mahindi"}
  ],
  "chains": [["M1", "M3", "M4"], ["M2"]]
}
```

The decisions specific to coreference are:

- **What counts as a mention.** Names only, or also descriptions ("the farmer") and pronouns. Decide whether a predicate such as *mkulima wa mahindi* in a copular sentence is a mention of the same entity; guidelines differ on this, so state your rule.
- **Mentions inside words.** In many Bantu languages the subject and object are marked by prefixes on the verb, so *alifika* already contains a reference to Amina, and the chiShona *ndakazomuona* in the [overview](./index.md#tokenisation-and-morphology) contains an object concord meaning "him". Many languages also drop subject pronouns. Decide whether such references are annotated, and if so, whether the mention is the whole verb or a sub-word span. Whether to annotate zero references at all is a decision the guideline must make explicitly ([Passonneau, 2004](../references.md#passonneau-2004)).
- **Singletons.** Decide whether mentions that refer to nothing else in the document (such as *Kisii* above) are kept as one-mention chains. Keeping them makes the mention layer reusable for NER and entity linking.
- **Document scope.** Coreference is normally annotated within a document. Split train, development and test by document, never by sentence, so that a chain is never cut across splits.

Agreement on coreference cannot be measured mention by mention with plain kappa, because annotators can build different numbers of chains. One approach treats the chain each mention belongs to as its value and uses Krippendorff's alpha with a distance that penalises partly overlapping chains less than completely different ones ([Passonneau, 2004](../references.md#passonneau-2004)). For scoring models, use the standard coreference metrics (MUC, B-cubed, CEAF and BLANC) through the reference implementation, so your numbers are comparable with other work ([Pradhan et al., 2014](../references.md#pradhan-2014)). Report which metrics you used.

## Release format

Before release, confirm that the export format can hold the relation or chain layer:

- **Offsets and ids.** Entities or mentions as character offsets into a stored, frozen text, and relations or chains as lists of ids. State the offset convention in the dataset card, as described in [Scripts, spans and offsets](./index.md#scripts-spans-and-offsets).
- **Inventory and guideline.** Release the relation inventory with directions and allowed argument types, and the guideline version, with the data.
- **Round trip.** Reload a sample of the exported file and check that every relation resolves to the right spans and every span's offsets still give its text. A relation that silently disappears in a format conversion is easy to miss; see [Verify the export before you release](../9_dataset-lifecycle/release.md#verify-the-export-before-you-release).

## What breaks: common failure modes

- **Entities and relations annotated together.** Span disagreements show up as relation disagreements and the agreement figure cannot be read. Fix: two passes, with entities adjudicated in between.
- **Direction left implicit.** Half the annotators draw `child_of` from parent to child. Fix: state the head and tail for every type, with an example.
- **Dangling relations.** A span was deleted or re-drawn and its relations still point at the old id. Fix: run the relation check on every export.
- **Exported to a flat format.** The relation layer is lost when data is converted to BIO or CoNLL. Fix: release offsets plus a relation list, and derive flat views from it.
- **"No relation" read as a negative label.** Unmarked pairs are used as negatives, but many were never looked at. Fix: an explicit `other` type, and labelled candidate pairs if you need negatives.
- **Translated kinship inventory.** English kinship types force distinctions the language does not make and miss ones it does. Fix: define kinship relations from the language's own terms.

