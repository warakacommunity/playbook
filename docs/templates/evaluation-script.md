---
sidebar_position: 3
title: Evaluation script skeleton
last_update:
  date: 2026-07-07
---

# Evaluation script skeleton

*Last reviewed: 2026-07-07.*

*A Python starting point that enforces the playbook's editorial policies for you: per-language reporting, per-class reporting, chrF-primary for translation, CER-primary for morphology-rich speech, and a mandatory hook for human-evaluation sampling. Fork it, plug in your metric of choice, ship the compliance for free.*

## Why this template exists

The playbook takes strong positions on evaluation ([core principles](../1_introduction/core-principles.md), and every [Before You Start](../before-you-start/index.md) page): report per-language and per-class, prefer character-level metrics for morphology-rich languages, never let an automatic score stand alone for generative output. It is easier to say those things than to enforce them across every project.

This template makes the compliance the default. The output has per-language and per-class breakdowns by construction; the primary metric for translation is chrF; the primary metric for speech is CER; a human-evaluation sampling hook is scaffolded in. Fork it, adapt the task-specific metric plug-in point, and any project using it inherits the policy without needing to remember it.

## The skeleton

Copy the code block below into a file (`evaluate.py`), fill in the `TODO` sections, and run it against your predictions.

```python
"""Playbook-compliant evaluation harness.

Enforces:
  - Per-language reporting (mandatory)
  - Per-class F1 reporting (mandatory for classification)
  - chrF as primary translation metric, BLEU as secondary comparison-only
  - CER as primary speech metric, WER as secondary
  - Human-evaluation sampling hook (mandatory for generative output)

Fork, adapt the ``TODO`` sections, run.
"""
from __future__ import annotations

import argparse
import json
import random
from collections import defaultdict
from pathlib import Path
from typing import Any

# Metric libraries the playbook recommends. Install as needed:
#   pip install sacrebleu jiwer scikit-learn
try:
    import sacrebleu  # for chrF and BLEU
except ImportError:
    sacrebleu = None
try:
    import jiwer  # for CER and WER
except ImportError:
    jiwer = None
try:
    from sklearn.metrics import classification_report, f1_score
except ImportError:
    classification_report = None
    f1_score = None


# ── Loading -------------------------------------------------------

def load_predictions(path: Path) -> list[dict[str, Any]]:
    """Load a JSONL file of records shaped like:
        {"language": "hau", "class": "positive",
         "reference": "...", "prediction": "..."}
    ``class`` is required for classification tasks; ``reference`` and
    ``prediction`` for generative tasks; ``language`` always required.
    """
    records = []
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            records.append(json.loads(line))
    if not records:
        raise ValueError(f"No records found in {path}")
    if not all("language" in r for r in records):
        raise ValueError("Every record must have a 'language' field — the "
                         "playbook mandates per-language reporting.")
    return records


# ── Task-specific metrics -----------------------------------------

def eval_classification(records: list[dict[str, Any]]) -> dict[str, Any]:
    """Per-language + per-class F1 for classification tasks.

    Records must have ``class`` (gold) and ``prediction`` (predicted).
    """
    if classification_report is None:
        raise ImportError("scikit-learn required for classification. "
                          "pip install scikit-learn")

    by_lang: dict[str, dict[str, list]] = defaultdict(
        lambda: {"true": [], "pred": []})
    for r in records:
        by_lang[r["language"]]["true"].append(r["class"])
        by_lang[r["language"]]["pred"].append(r["prediction"])

    out: dict[str, Any] = {"per_language": {}}
    for lang, d in sorted(by_lang.items()):
        report = classification_report(
            d["true"], d["pred"], output_dict=True, zero_division=0)
        # Per-class F1 with support disclosed.
        per_class = {
            cls: {"f1": round(v["f1-score"], 3),
                  "precision": round(v["precision"], 3),
                  "recall": round(v["recall"], 3),
                  "support": int(v["support"])}
            for cls, v in report.items()
            if cls not in ("accuracy", "macro avg", "weighted avg")
        }
        out["per_language"][lang] = {
            "macro_f1": round(report["macro avg"]["f1-score"], 3),
            "weighted_f1": round(report["weighted avg"]["f1-score"], 3),
            "accuracy": round(report["accuracy"], 3),
            "n": sum(v["support"] for v in per_class.values()),
            "per_class": per_class,
        }
    # Overall macro-F1 across all records (playbook expectation:
    # report as a secondary number, not the headline; the headline is
    # per-language).
    all_true = [r["class"] for r in records]
    all_pred = [r["prediction"] for r in records]
    out["overall_macro_f1"] = round(
        f1_score(all_true, all_pred, average="macro", zero_division=0), 3)
    return out


def eval_translation(records: list[dict[str, Any]]) -> dict[str, Any]:
    """Per-language chrF (primary) + BLEU (secondary) for translation.

    Records must have ``reference`` (gold) and ``prediction`` (system).
    """
    if sacrebleu is None:
        raise ImportError("sacrebleu required for translation. "
                          "pip install sacrebleu")

    by_lang: dict[str, dict[str, list]] = defaultdict(
        lambda: {"refs": [], "hyps": []})
    for r in records:
        by_lang[r["language"]]["refs"].append(r["reference"])
        by_lang[r["language"]]["hyps"].append(r["prediction"])

    out: dict[str, Any] = {"per_language": {}}
    for lang, d in sorted(by_lang.items()):
        # chrF is primary — playbook editorial policy (see core-principles).
        chrf = sacrebleu.corpus_chrf(d["hyps"], [d["refs"]])
        # BLEU is secondary, kept for comparison with prior work only.
        bleu = sacrebleu.corpus_bleu(d["hyps"], [d["refs"]])
        out["per_language"][lang] = {
            "chrf": round(chrf.score, 2),          # PRIMARY
            "bleu": round(bleu.score, 2),          # secondary
            "n": len(d["hyps"]),
        }
    return out


def eval_speech(records: list[dict[str, Any]]) -> dict[str, Any]:
    """Per-language CER (primary) + WER (secondary) for ASR.

    Records must have ``reference`` (gold transcript) and ``prediction``.
    """
    if jiwer is None:
        raise ImportError("jiwer required for speech. pip install jiwer")

    by_lang: dict[str, dict[str, list]] = defaultdict(
        lambda: {"refs": [], "hyps": []})
    for r in records:
        by_lang[r["language"]]["refs"].append(r["reference"])
        by_lang[r["language"]]["hyps"].append(r["prediction"])

    out: dict[str, Any] = {"per_language": {}}
    for lang, d in sorted(by_lang.items()):
        # CER is primary — word-boundary conventions in agglutinative
        # African languages make WER noisy.
        cer = jiwer.cer(d["refs"], d["hyps"])
        wer = jiwer.wer(d["refs"], d["hyps"])
        out["per_language"][lang] = {
            "cer": round(cer * 100, 2),            # PRIMARY (percentage)
            "wer": round(wer * 100, 2),            # secondary
            "n": len(d["hyps"]),
        }
    return out


# ── Human-eval sampling -------------------------------------------

def sample_for_human_eval(records: list[dict[str, Any]],
                          n_per_lang: int = 30,
                          seed: int = 20260707) -> list[dict[str, Any]]:
    """Sample outputs for mandatory human evaluation.

    Playbook policy: no generative output ships without native-speaker
    human evaluation on a sample. Stratifies the sample per language.
    Deterministic given the same seed.
    """
    rng = random.Random(seed)
    by_lang: dict[str, list] = defaultdict(list)
    for r in records:
        by_lang[r["language"]].append(r)
    sampled = []
    for lang, rs in by_lang.items():
        k = min(n_per_lang, len(rs))
        sampled.extend(rng.sample(rs, k))
    return sampled


# ── CLI wiring ----------------------------------------------------

TASKS = {
    "classification": eval_classification,
    "translation": eval_translation,
    "speech": eval_speech,
    # TODO: add per-task metric functions for QA (retrieval + reader),
    # NER (seqeval F1), sentiment (classification), TTS (MOS + CER
    # round-trip via ASR), OCR (CER), etc. Follow the same per-language
    # reporting shape.
}


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Playbook-compliant evaluation")
    parser.add_argument("predictions", type=Path,
                        help="JSONL of records (see load_predictions).")
    parser.add_argument("--task", required=True, choices=list(TASKS),
                        help="Task type.")
    parser.add_argument("--human-eval-out", type=Path, default=None,
                        help="Path to write a sample for human eval.")
    parser.add_argument("--human-eval-per-lang", type=int, default=30,
                        help="Per-language sample size for human eval.")
    args = parser.parse_args()

    records = load_predictions(args.predictions)
    metric_fn = TASKS[args.task]
    results = metric_fn(records)

    print(json.dumps(results, indent=2, ensure_ascii=False))

    if args.human_eval_out is not None:
        sampled = sample_for_human_eval(records, args.human_eval_per_lang)
        with open(args.human_eval_out, "w", encoding="utf-8") as f:
            for r in sampled:
                f.write(json.dumps(r, ensure_ascii=False) + "\n")
        print(f"\nHuman-eval sample ({len(sampled)} records) written to "
              f"{args.human_eval_out}.")
        print("Playbook reminder: human evaluation is NOT optional for "
              "generative output.")


if __name__ == "__main__":
    main()
```

## What the template enforces

- **Every record must have a `language` field.** The loader refuses to run without it — you cannot silently produce a headline number that hides per-language variance.
- **Classification output ships per-class F1 with support disclosed.** The playbook's per-class reporting requirement is baked into the output shape; a project that adopts this script cannot easily strip it out.
- **Translation output ships chrF as the primary number, BLEU as a labelled secondary.** The `chrf` field is listed first; the `bleu` field is present for comparison against prior work but visibly demoted.
- **Speech output ships CER as the primary number, WER as a labelled secondary.** Same demotion pattern.
- **Human-evaluation sampling is a first-class output.** The `--human-eval-out` flag writes a deterministic per-language stratified sample; the console reminds the operator that human eval is not optional for generative output. Automate the reminder because human memory is unreliable.

## What the template does not do

- **It does not run the model.** The script assumes you have a JSONL of predictions and references already; the training loop and inference are project-specific.
- **It does not enforce evaluation on the whole test set.** Sampling is legitimate for compute-poor iteration (see the [compute-poor chapter's evaluation section](../compute-poor/index.md#evaluation-under-a-compute-budget)); the harness reports what you feed it.
- **It does not replace task-specific tooling.** For NER, use `seqeval`; for QA, use the AfriQA companion repo scoring scripts; for TTS, use human MOS collection tooling. Plug the task-specific metric into the `TASKS` dictionary; keep the per-language and per-class scaffolding.
- **It does not enforce reproducibility.** Every project that ships evaluation numbers should also commit the exact predictions JSONL, the metric library versions, and the random seed. Add those as commit artifacts alongside your evaluation script.

## Extending the template

The pattern for adding a new task is:

1. Add a `def eval_yourtask(records)` function that returns a dict with `per_language` at the top level.
2. Choose the metric that respects morphology-rich language reality (character-level over word-level where morphology matters; per-class for classification; retrieval-first for QA — see the [QA page](../before-you-start/qa.md)).
3. Register in the `TASKS` dictionary.
4. Add a docstring line describing what the primary metric is and why.

## Anti-patterns

1. **Removing the `language` field requirement** to make the harness "simpler". This is the enforcement mechanism; removing it removes the compliance.
2. **Adding a "headline number" field** that averages across languages. The playbook's whole editorial position is that headline-across-languages numbers hide catastrophic per-language failure. Do not add one.
3. **Making BLEU or WER the primary field** to match "what the reviewers expect". Reviewers can look at the secondary number; the playbook's position is that morphology-rich languages need character-level metrics as primary.
4. **Skipping the human-eval sampling hook** because "we know the model is good". You do not know until native speakers say so.

## Further reading

- [sacrebleu documentation](https://github.com/mjpost/sacrebleu) — chrF and BLEU implementations.
- [jiwer documentation](https://github.com/jitsi/jiwer) — CER and WER implementations.
- [scikit-learn classification report](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.classification_report.html) — per-class F1 with support.
- [seqeval](https://github.com/chakki-works/seqeval) — the standard NER-specific evaluation library, useful reference for how sequence tagging is scored.
- [AfriQA companion repo](https://github.com/masakhane-io/afriqa) — the QA-specific scoring reference; alias handling and multi-answer scoring are subtle enough to defer to this rather than reimplement.

---

**Contributor's note.** If you extend this template for a task with materially different evaluation semantics (retrieval, structured output, sequence generation with alignment), keep the per-language + per-class output shape intact — that shape is what makes the playbook's editorial policy portable. New task functions add fields; they do not remove the ones that enforce compliance.
