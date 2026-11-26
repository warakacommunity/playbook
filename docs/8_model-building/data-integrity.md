---
title: Data Integrity and Contamination Control
sidebar_position: 2
ready: true
last_update:
  date: 2026-11-26
  author: Idris Abdulmumin
---

# Data Integrity and Contamination Control

A benchmark only measures what it claims to if the test data is genuinely unseen. Data integrity is the discipline of keeping it that way. It has become harder, and more important, now that large models are trained on huge amounts of web text.

:::tip[Key points]

- Deduplicate first, including near-duplicates, then split.
- Split by group (speaker, document, prompt, source) so no source appears on both sides.
- Fix the splits and add a check that fails loudly if anything leaks.
- Check new data for overlap with existing benchmarks and report it.
- Keep part of the test set private to guard against contamination of large models.

:::

## Prevent train-test leakage

The most basic failure is **leakage**: the same or near-identical examples appear in both training and test data. Leakage inflates scores and hides real weaknesses. It is easy to introduce when you deduplicate after splitting rather than before.

- **Deduplicate first**, including near-duplicates, then split.
- **Keep the splits fixed**, so that no one trains on the test set by accident later.
- **Watch for subtler leakage.** In speech and document tasks, the same speaker or document can span splits. The model then learns to recognise the source rather than the task.

For images and video, where duplicates are resized or recompressed copies and the grouping key is usually a site, device, subject or source video, see [Splits and near-duplicates](../image-data/splits-and-duplicates.md).

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

### Read speech: keep speakers and prompts apart

Read or prompted speech has two grouping keys, not one: every clip has a speaker and a prompt sentence, and either can leak. If the same sentence appears in train and test, read by different people, a model can memorise the sentence text and score better than it should, even though no speaker is shared. For read speech, no speaker and no prompt sentence should appear in more than one of train, dev and test. Common Voice keeps each speaker in a single split and removes repeated sentences from its train, dev and test sets ([Ardila et al., 2020](../references.md#ardila-2020)). The same advice for acted emotion corpora is in the [SER quality assurance section](../speech-emotion-recognition/index.md#quality-assurance).

When several recordings of one sentence are kept, a split by speaker alone is not enough, and a split by prompt alone is not enough either. Treat speakers and prompts as nodes in a graph, link every speaker to every prompt they read, and split by connected component: everything connected through a shared speaker or a shared prompt lands in the same split.

```python
import random
from collections import defaultdict

def speaker_prompt_disjoint_split(records, fractions=(0.8, 0.1, 0.1), seed=0):
    """records: dicts with 'speaker_id' and 'prompt_id'. Returns (splits, dropped)."""
    # Rows missing either key cannot be placed safely; drop and report them.
    usable = [r for r in records if r.get("speaker_id") and r.get("prompt_id")]
    dropped = [r for r in records if not (r.get("speaker_id") and r.get("prompt_id"))]

    # 1. Connected components over shared speaker and shared prompt (union-find).
    parent = {}
    def find(a):
        parent.setdefault(a, a)
        while parent[a] != a:
            parent[a] = parent[parent[a]]
            a = parent[a]
        return a
    for r in usable:
        parent[find(("spk", r["speaker_id"]))] = find(("prm", r["prompt_id"]))

    components = defaultdict(list)
    for r in usable:
        components[find(("spk", r["speaker_id"]))].append(r)

    # 2. Assign whole components to splits, in a fixed-seed random order.
    comps = list(components.values())
    random.Random(seed).shuffle(comps)
    total = len(usable)
    splits = {"train": [], "dev": [], "test": []}
    targets = {"dev": fractions[1] * total, "test": fractions[2] * total}
    for comp in comps:
        if len(splits["test"]) < targets["test"]:
            splits["test"].extend(comp)
        elif len(splits["dev"]) < targets["dev"]:
            splits["dev"].extend(comp)
        else:
            splits["train"].extend(comp)

    # 3. Assert that no speaker or prompt crosses a split boundary.
    for key in ("speaker_id", "prompt_id"):
        seen = {}
        for name, rows in splits.items():
            for r in rows:
                assert seen.setdefault(r[key], name) == name, f"{key} {r[key]} leaked"

    return splits, dropped
```

Report the split sizes, the number of speakers and prompts in each split, and every dropped row in the [dataset card](../templates/dataset-card.md). The fractions in the example are a placeholder, not a norm.

:::warning[When no clean split exists]

If many speakers read the same small set of prompts, one component can swallow most of the corpus. No clean split exists after the fact. You then have to drop the rows that connect the component and report them. Better: assign each prompt to a split **before recording starts**, so the graph never joins up.

:::

## Watch for benchmark overlap

A new dataset can quietly overlap with existing ones, sharing source texts or examples, which means evaluating on it no longer tests anything new. Before releasing, check your data against the established benchmarks for the language and report any overlap honestly, so that users know what an evaluation on your set actually demonstrates.

## Guard against LLM contamination

The hardest modern problem is **contamination**. Large language models (LLMs) are trained on enormous web crawls that may already contain your test set, so a model can score well by memorisation rather than ability. For African languages, the same scarcity that limits training data also makes a public benchmark more likely to have been swept up whole.

Where you can:

- keep a portion of the test set private;
- record the cut-off date of your data;
- treat suspiciously high scores from a large model on a public benchmark with caution.

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

A non-trivial overlap means an evaluation on that set partly measures memorisation rather than ability. The check only covers corpora you can inspect, so a private held-out portion remains the stronger guarantee. Contamination control is now part of building a credible evaluation, not an afterthought.
