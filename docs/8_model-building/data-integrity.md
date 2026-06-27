---
title: Data Integrity and Contamination Control
sidebar_position: 2
---

# Data Integrity and Contamination Control

A benchmark only measures what it claims to if the test data is genuinely unseen. Data integrity is the discipline of keeping it that way, and it has become harder and more important in the age of large models trained on everything.

## Prevent train-test leakage

The most basic failure is leakage: the same or near-identical examples appearing in both training and test. It inflates scores and hides real weakness, and it is easy to introduce when deduplication happens after splitting rather than before. Deduplicate first, including near-duplicates, then split, and keep the splits fixed so that no one accidentally trains on the test set later. Watch for subtler leakage too, such as the same speaker or document spanning splits in speech and document tasks, which lets a model recognise the source rather than learn the task.

Both rules, deduplicate first and split by group, fit in one function. Splitting by a group key such as `speaker_id` or `document_id` is what stops the same source landing on both sides:

```python
from sklearn.model_selection import GroupShuffleSplit

def dedup_then_split(records, group_key="speaker_id", test_size=0.2, seed=0):
    # 1. Remove exact duplicates BEFORE splitting, not after.
    seen, unique = set(), []
    for r in records:
        fp = r["text"].strip().casefold()
        if fp not in seen:
            seen.add(fp)
            unique.append(r)

    # 2. Split by group so no speaker/document spans both sides.
    groups = [r[group_key] for r in unique]
    splitter = GroupShuffleSplit(n_splits=1, test_size=test_size, random_state=seed)
    train_idx, test_idx = next(splitter.split(unique, groups=groups))

    train_groups = {groups[i] for i in train_idx}
    test_groups = {groups[i] for i in test_idx}
    assert not (train_groups & test_groups), "a group leaked across splits"

    return [unique[i] for i in train_idx], [unique[i] for i in test_idx]
```

The `assert` is not decoration: it turns a silent, score-inflating leak into a loud failure at the moment the split is made, which is far cheaper than discovering it after the benchmark has been published.

## Watch for benchmark overlap

A new dataset can quietly overlap with existing ones, sharing source texts or examples, which means evaluating on it no longer tests anything new. Before releasing, check your data against the established benchmarks for the language and report any overlap honestly, so that users know what an evaluation on your set actually demonstrates.

## Guard against LLM contamination

The hardest modern problem is contamination: large language models are trained on enormous web crawls that may already contain your test set, so a model can score well by memorisation rather than ability. For African languages this cuts both ways, since the same scarcity that limits training data also means a public benchmark is more likely to have been swept up wholesale. Where you can, keep a portion of the test set private, note the cut-off date of your data, and treat suspiciously high scores from a large model on a public benchmark with caution.

A simple n-gram overlap check gives an early signal of whether your test set already appears in a corpus a model may have trained on:

```python
def ngrams(text: str, n: int = 8) -> set:
    tokens = text.lower().split()
    return {" ".join(tokens[i:i + n]) for i in range(len(tokens) - n + 1)}

def contamination_rate(test_texts: list[str], corpus_texts: list[str],
                       n: int = 8) -> float:
    """Fraction of test items sharing an n-gram with a reference corpus,
    such as a sample of the web text a model was likely trained on."""
    corpus_ngrams = set()
    for t in corpus_texts:
        corpus_ngrams |= ngrams(t, n)
    hits = sum(1 for t in test_texts if ngrams(t, n) & corpus_ngrams)
    return hits / len(test_texts) if test_texts else 0.0
```

A non-trivial overlap means an evaluation on that set partly measures memorisation rather than ability. For African languages the same scarcity that makes data precious also makes a public benchmark more likely to have been swept up whole, so a private held-out portion, which this check cannot be run around, is the stronger guarantee. Contamination control is now part of building a credible evaluation, not an afterthought.
