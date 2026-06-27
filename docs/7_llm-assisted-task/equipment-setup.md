---
title: Synthetic Data Creation
sidebar_position: 2
---

# Synthetic Data Creation

Synthetic data is text or labels generated rather than collected, and it is a tempting answer to African data scarcity. It can genuinely help, but it is also where scarcity bites hardest, because generating good synthetic data in a language needs a model that is already good at that language, which is the thing you do not have.

## The methods, from safest to riskiest

The approaches form a spectrum. Data augmentation makes new examples from real ones through paraphrasing or back-translation, and because it stays anchored to real data it is the safest, though back-translation depends on a translation model that may itself be weak. Fully synthetic generation, where an LLM writes new examples from scratch, is the most scalable and the most dangerous, since the model's weaknesses in the language are copied straight into the data. Scenario-based generation, producing data for specific situations a real corpus underrepresents, sits in between. A rigorous evaluation of these strategies for low-resource languages found that careful combinations, such as showing the model real target-language examples and then having it revise its own output, can narrow the gap to real data to as little as five percent, but also that naive synthetic generation often fails for the lowest-resource languages ([LLM Data Generation, 2025](../references.md#llm-datagen-2025)).

That winning combination, real examples first then a self-revision pass, is short to express. The function stays provider-agnostic, taking your API call as `call_llm`:

```python
REAL_EXAMPLES = [
    ("Na ji dadin fim din sosai.", "positive"),
    ("Abincin bai yi kyau ba.", "negative"),
]

def generate_then_revise(label: str, call_llm) -> str:
    shots = "\n".join(f"- ({lab}) {txt}" for txt, lab in REAL_EXAMPLES)
    draft = call_llm(
        f"Here are real Hausa examples:\n{shots}\n"
        f"Write one new, natural Hausa sentence whose sentiment is {label}."
    ).strip()
    # Self-revision: anchoring to real examples and revising is what the study
    # found narrows the gap; naive one-shot generation is the part that fails.
    revised = call_llm(
        f"Revise this Hausa sentence to sound natural to a native speaker, "
        f"keeping its {label} sentiment. Reply with only the sentence:\n{draft}"
    ).strip()
    return revised
```

The two passes are the whole point: the real examples hold the model to the actual language, and the revision step catches the stilted phrasing a single generation produces. Neither pass removes the need to validate what comes out.

## Validate, or do not ship

Synthetic data is only safe if you check it against reality. Validate generated data against the distribution of real data, in vocabulary, length, and label balance, and have native speakers evaluate a sample for fluency and correctness before any of it trains a model. Watch in particular for the contamination that synthetic data spreads, because training on machine-translated or model-generated text degrades the next model and is hard to detect later, the same trap the web-crawl audit exposed in mined data ([Kreutzer et al., 2022](../references.md#kreutzer-2022)). A quick distributional check catches the most common drift before a native-speaker review confirms the rest:

```python
from collections import Counter
import statistics

def length_stats(texts: list[str]) -> tuple[float, float]:
    lengths = [len(t.split()) for t in texts]
    return statistics.mean(lengths), statistics.pstdev(lengths)

def vocab_overlap(real: list[str], synth: list[str]) -> float:
    """Share of synthetic vocabulary that also appears in real data.
    A low value means the generator is using words real speakers do not."""
    real_vocab = {w for t in real for w in t.lower().split()}
    synth_vocab = {w for t in synth for w in t.lower().split()}
    return len(real_vocab & synth_vocab) / len(synth_vocab) if synth_vocab else 0.0

print("real length (mean, sd): ", length_stats(real_texts))
print("synth length (mean, sd):", length_stats(synth_texts))
print("vocab overlap:          ", round(vocab_overlap(real_texts, synth_texts), 3))
print("synth label balance:    ", Counter(synth_labels))
```

Synthetic text that is far shorter or longer than real text, or that shares little vocabulary with it, is a sign the generator has wandered off the language, and a skewed label balance means it is over-producing the easy classes. These checks are necessary but not sufficient: passing them only earns the data a native-speaker read, not a place in the training set. Treat synthetic data as a supplement to real, human-made data for African languages, never as a replacement for it.
