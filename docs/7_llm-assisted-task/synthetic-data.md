---
ready: true
title: Synthetic Data Creation
sidebar_position: 2
last_update:
  date: 2026-11-26
  author: Shamsuddeen Hassan Muhammad
---

# Synthetic Data Creation

Synthetic data is text or labels generated rather than collected, and it is a tempting answer to African data scarcity. It can genuinely help, but it is also where scarcity bites hardest. Generating good synthetic data in a language needs a model that is already good at that language, which is the thing you do not have.

:::tip[Key points]

- Prefer augmentation anchored in real data over fully synthetic generation.
- Give the model real target-language examples, then add a self-revision pass.
- Check synthetic data against real data, then have native speakers review a sample before it trains anything.
- Mark every synthetic record, and keep evaluation and test splits entirely human-made.
- Use synthetic data to supplement real data, never to replace it.

:::

## The methods, from safest to riskiest

The approaches form a spectrum:

| Method | What it does | Risk |
|---|---|---|
| **Data augmentation** | Makes new examples from real ones through paraphrasing or back-translation. | Safest, because it stays anchored to real data, though back-translation depends on a translation model that may itself be weak. |
| **Scenario-based generation** | Produces data for specific situations a real corpus under-represents. | In between. |
| **Fully synthetic generation** | An LLM writes new examples from scratch. | Most scalable and most dangerous: the model's weaknesses in the language are copied straight into the data. |

For fully synthetic generation, how you prompt the model matters. A rigorous evaluation of LLM data-generation strategies across 11 languages, with Swahili the only African one, found that combining real target-language demonstrations with LLM self-revision brought downstream performance to within about 5 F1 points of training on real data in some settings. The gap widened for lower-resource languages and was largest when the model got no target-language examples ([Anikina et al., 2025](../references.md#llm-datagen-2025)).

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
    # found narrows the gap; generation without target-language examples widens it.
    revised = call_llm(
        f"Revise this Hausa sentence to sound natural to a native speaker, "
        f"keeping its {label} sentiment. Reply with only the sentence:\n{draft}"
    ).strip()
    return revised
```

The two passes are the whole point: the real examples hold the model to the actual language, and the revision step catches the stilted phrasing a single generation produces. Neither pass removes the need to validate what comes out.

## Validate, or do not ship

Synthetic data is only safe if you check it against reality:

- **Compare with real data.** Check generated data against the distribution of real data in vocabulary, length and label balance.
- **Have native speakers read it.** They should evaluate a sample for fluency and correctness before any of it trains a model.

Watch in particular for the contamination that synthetic data spreads. An audit of web-crawled multilingual corpora found many low-resource subsets dominated by wrong-language and non-linguistic text ([Kreutzer et al., 2022](../references.md#kreutzer-2022)), and model-generated text that slips into a corpus is just as hard to spot afterwards. Training models indiscriminately on generated data makes them progressively lose the tails of the real distribution, a degradation known as model collapse ([Shumailov et al., 2024](../references.md#shumailov-2024)). For a language with little real text, those tails are often the dialects, registers and rare words you most needed.

A quick distributional check catches the most common drift before a native-speaker review confirms the rest:

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

## Label and document what is synthetic

Once synthetic items pass review, keep them distinguishable from real ones for the life of the dataset:

- **Mark every record.** Add a field that says whether it is human-written, augmented (and from which real item), or fully generated. Record the model, prompt and date that produced it. This lets you, and anyone reusing the data, train with or without the synthetic portion, report results separately, and remove it later if a problem surfaces.
- **Keep evaluation and test splits entirely human-made.** A test set that contains generated text measures how well a model imitates the generator, not how well it handles the language.
- **Document and check terms.** State the share and origin of synthetic data in the dataset's documentation, and check the generating model's terms of use before release (see [Documentation](../6_documentation/documentation.md) and [Data Governance](../data-governance/index.md)).
