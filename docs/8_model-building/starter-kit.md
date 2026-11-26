---
title: Evaluation, Benchmarking, and Starter Kits
sidebar_position: 1
ready: true
last_update:
  date: 2026-11-26
  author: Shamsuddeen Hassan Muhammad
---

# Evaluation, Benchmarking, and Starter Kits

A dataset's worth is shown by how well it lets people measure progress. Evaluation is where a corpus becomes a benchmark. For African languages, it is also where the field's real standing becomes visible: broad benchmarks keep finding a wide gap between English and African languages on most tasks ([AfroBench](../references.md#afrobench)).

:::tip[Key points]

- Choose metrics that are fair to rich morphology, such as character-level measures.
- Never let an automatic score stand alone; use native-speaker human evaluation.
- Report results per language and per class, not as a single average.
- Keep splits clean and test what breaks in deployment: transfer, domain shift, dialects.
- Ship baselines, scripts and official splits so others start from a working result.

:::

## Evaluation that fits the task and the language

Each task has its own metrics, covered in the task chapters:

| Task | Typical metric |
|---|---|
| Speech recognition, OCR | Error rates (word or character) |
| Translation | chrF rather than BLEU |
| Classification | F1 |
| Any generation task | Human evaluation |

Three principles cut across all of them for African languages:

- **Be fair to rich morphology.** Word-level measures such as BLEU and WER penalise output that is correct but inflected differently. This is why character-level measures are preferred.
- **Never let an automatic score stand alone.** Native-speaker human evaluation is the only reliable judge of fluency, adequacy and cultural fit.
- **Report per language and per class**, not as a single average. Otherwise strong results on a well-resourced language or a common class can hide failure elsewhere.

## Splits, generalisation and bias

How you split the data shapes what the benchmark measures. Keep the train, development and test splits cleanly separated, with no leakage (see [Data integrity](./data-integrity.md#prevent-train-test-leakage)). Consider domain-aware or cross-lingual splits that test whether a model generalises rather than memorises.

African evaluation should test what actually breaks in deployment:

- **cross-lingual transfer** between related languages;
- **domain shift** from clean training data to messy real input;
- **robustness** across dialects and accents.

Bias and robustness checks belong here too: does performance hold across the genders, regions and varieties the data is meant to serve?

## Ship a starter kit

A dataset is far more useful when it comes with a way to use it. Provide:

- baseline models for the task;
- training and evaluation scripts;
- clear reproducibility instructions.

The next person then starts from a working result rather than a bare file. The evaluation script should report per language by default, since a single average is exactly what hides the gap this chapter is about:

```python
from collections import defaultdict
from sklearn.metrics import f1_score

def evaluate_per_language(records: list[dict]) -> dict:
    """records: [{"language": "hau", "y_true": ..., "y_pred": ...}, ...]
    Returns a macro-F1 per language plus an overall figure."""
    by_lang = defaultdict(lambda: {"true": [], "pred": []})
    for r in records:
        by_lang[r["language"]]["true"].append(r["y_true"])
        by_lang[r["language"]]["pred"].append(r["y_pred"])

    scores = {lang: round(f1_score(d["true"], d["pred"], average="macro"), 3)
              for lang, d in by_lang.items()}
    scores["overall"] = round(f1_score(
        [r["y_true"] for r in records],
        [r["y_pred"] for r in records], average="macro"), 3)
    return scores

if __name__ == "__main__":
    # Replace with your model's predictions, one record per test item.
    predictions = [
        {"language": "hau", "y_true": "pos", "y_pred": "pos"},
        {"language": "yor", "y_true": "neg", "y_pred": "pos"},
    ]
    print(evaluate_per_language(predictions))
    # On a full test set the output looks like:
    # {"swa": 0.81, "hau": 0.74, "yor": 0.52, "overall": 0.73}
```

The illustrative output (from a full test set) makes the case for shipping it this way. An overall 0.73 looks healthy until the per-language breakdown shows one language at 0.52, which is the number the people who speak it actually experience.

Define the official splits and a leaderboard, or at least publish baseline scores. This gives the community a shared yardstick and positions the dataset against existing benchmarks such as IrokoBench and AfroBench ([Adelani et al., 2024](../references.md#irokobench-2024); [AfroBench](../references.md#afrobench)). The easier you make it to get a first number, the more people will build on your work.

:::tip[Template: Evaluation script]
A Python starting point that reports results per language and per class, uses chrF for translation and CER for speech, and includes a hook for human evaluation. [Open the evaluation script template](../templates/evaluation-script.md).
:::

:::tip[Template: Model card]
A model card for the baselines you release. It follows Model Cards for Model Reporting and adds deployment checks: speed on low-cost phones, quality after compression, and results on code-switched text and each script. [Open the model card template](../templates/model-card.md).
:::
