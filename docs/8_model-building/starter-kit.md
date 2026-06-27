---
title: Evaluation, Benchmarking, and Starter Kits
sidebar_position: 1
---

# Evaluation, Benchmarking, and Starter Kits

A dataset's worth is shown by how well it lets people measure progress. Evaluation is where a corpus becomes a benchmark, and for African languages it is where the field's real standing becomes visible, since broad benchmarks keep finding a wide gap between English and African languages on most tasks ([AfroBench](../references.md#afrobench)).

## Evaluation that fits the task and the language

Each task has its own metrics, covered in the task chapters: error rates for speech and OCR, chrF over BLEU for translation, F1 for classification, and human evaluation wherever generation is involved. Two principles cut across all of them for African languages. Choose metrics that are fair to rich morphology, since word-level measures like BLEU and WER penalise correct-but-inflected output, which is why character-level measures are preferred. And never let an automatic score stand alone, because native-speaker human evaluation is the only reliable judge of fluency, adequacy, and cultural fit. Report results per language and per class rather than as a single average, so that strong performance on a well-resourced language or a common class cannot hide failure elsewhere.

## Splits, generalization, and bias

How you split the data shapes what the benchmark measures. Make the train, development, and test splits cleanly separated, with no leakage, and consider domain-aware or cross-lingual splits that test whether a model generalises rather than memorises. African evaluation should test the things that actually break in deployment: cross-lingual transfer between related languages, domain shift from clean training data to messy real input, and robustness across dialects and accents. Bias and robustness evaluation belongs here too, checking whether performance holds across the genders, regions, and varieties the data is meant to serve.

## Ship a starter kit

A dataset is far more useful when it comes with a way to use it. Provide baseline models for the task, training and evaluation scripts, and clear reproducibility instructions, so the next person starts from a working result rather than a cold file. The evaluation script should report per language by default, since a single average is exactly what hides the gap this chapter is about:

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
    print(evaluate_per_language(predictions))
    # e.g. {"swa": 0.81, "hau": 0.74, "yor": 0.52, "overall": 0.73}
```

The illustrative output makes the case for shipping it this way: an overall 0.73 looks healthy until the per-language breakdown shows one language at 0.52, which is the number the people who speak it actually experience. Defining the official splits and a leaderboard, or at least published baseline scores, gives the community a shared yardstick and positions the dataset against existing benchmarks such as IrokoBench and AfroBench ([Adelani et al., 2024](../references.md#irokobench-2024); [AfroBench](../references.md#afrobench)). The easier you make it to get a first number, the more people will build on your work.
