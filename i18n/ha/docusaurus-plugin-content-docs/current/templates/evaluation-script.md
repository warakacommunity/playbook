---
sidebar_position: 3
title: Kwarangwal na rubutun kima
ready: true
last_update:
  date: 2026-07-07
  author: Shamsudddeen Hassan Muhammad
translation_status: machine
source_hash: 4530f59c36b7
translated_at: 2026-09-28
---

# Kwarangwal na rubutun kima {#evaluation-script-skeleton}

*An duba na ƙarshe: 2026-07-07.*

*Wurin farawa na Python wanda ke tilasta maka tsare-tsaren edita na AfriPlaybook: bayar da rahoto ga kowane harshe (per-language reporting), bayar da rahoto ga kowane aji (per-class reporting), chrF a matsayin na farko ga fassara, CER a matsayin na farko ga magana mai ɗumbin tsarin kalmomi (morphology-rich speech), da kuma wajabcin ɗaukar samfurin kimar ɗan adam (human-evaluation sampling). Yi reshe (fork) ɗinsa, sanya ma'aunin (metric) da ka zaɓa, sannan ka fitar da bin ƙa'idar kyauta.*

## Dalilin wanzuwar wannan samfuri {#why-this-template-exists}

AfriPlaybook yana da tsauraran matsayi kan kima ([core principles](/introduction/core-principles)): bayar da rahoto ga kowane harshe da kowane aji, fifita ma'aunin matakin harafi (character-level metrics) ga harsuna masu ɗumbin tsarin kalmomi, kada a taɓa barin makin na'ura ya tsaya shi kaɗai ga sakamakon ƙirƙira (generative output). Ya fi sauƙin faɗar waɗannan abubuwa fiye da tilasta su a kowane aiki.

Wannan samfurin yana sanya bin ƙa'ida ya zama abin da aka saba da shi. Sakamakon yana da rabe-raben kowane harshe da kowane aji ta hanyar tsari; ainihin ma'auni na fassara shi ne chrF; ainihin ma'auni na magana shi ne CER; an tsara tsarin ɗaukar samfurin kimar ɗan adam a ciki. Yi reshe (fork) ɗinsa, daidaita wurin sanya ma'auni na musamman ga aiki, kuma duk wani aiki da ke amfani da shi zai gaji tsarin ba tare da buƙatar tunawa da shi ba.

## Kwarangwal ɗin {#the-skeleton}

Kwafi shingen lambar da ke ƙasa zuwa cikin fayil (`evaluate.py`), cika sassan `TODO`, sannan ka gudanar da shi a kan hasashenka (predictions).

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
        raise ValueError("Every record must have a 'language' field: the "
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
        # chrF is primary: playbook editorial policy (see core-principles).
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
        # CER is primary: word-boundary conventions in agglutinative
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

## Abin da samfurin ke tilastawa {#what-the-template-enforces}

- **Kowane bayani dole ne ya kasance yana da filin `language`.** Mai loda bayanan zai ƙi aiki ba tare da shi ba, don haka ba za ka iya samar da babban lamba a ɓoye wanda ke ɓoye bambancin kowane harshe ba.
- **Sakamakon rarrabawa (classification) yana fitar da F1 na kowane aji tare da bayyana tallafi.** Buƙatar bayar da rahoto ga kowane aji na AfriPlaybook an haɗa shi a cikin siffar sakamakon; aikin da ya ɗauki wannan rubutun ba zai iya cire shi cikin sauƙi ba.
- **Sakamakon fassara yana fitar da chrF a matsayin ainihin lamba, BLEU a matsayin na biyu mai lakabi.** An jera filin `chrf` da farko; filin `bleu` yana nan don kwatantawa da aikin baya amma an rage masa daraja a bayyane.
- **Sakamakon magana yana fitar da CER a matsayin ainihin lamba, WER a matsayin na biyu mai lakabi.** Irin tsarin rage darajar.
- **Ɗaukar samfurin kimar ɗan adam sakamako ne mai daraja ta farko.** Tutar `--human-eval-out` tana rubuta ƙayyadadden samfurin da aka raba ga kowane harshe; na'urar tana tunatar da mai aiki cewa kimar ɗan adam ba zaɓi ba ne ga sakamakon ƙirƙira. Sanya tunatarwar ta zama mai sarrafa kanta saboda ƙwaƙwalwar ɗan adam ba abin dogaro ba ce.

## Abin da samfurin ba ya yi {#what-the-template-does-not-do}

- **Ba ya gudanar da ƙirar (model).** Rubutun yana ɗauka cewa kana da JSONL na hasashe da nassoshi (references) tuni; tsarin horarwa da fitar da sakamako sun keɓanta ga aiki.
- **Ba ya tilasta kima a kan dukkan saitin gwaji.** Ɗaukar samfuri ya halatta ga maimaitawa mai ƙarancin ƙarfin kwamfuta (compute-poor) (duba [compute-poor chapter's evaluation section](/compute-poor/#evaluation-under-a-compute-budget)); tsarin yana bayar da rahoton abin da ka ciyar da shi.
- **Ba ya maye gurbin kayan aiki na musamman ga aiki.** Ga NER, yi amfani da `seqeval`; ga QA, yi amfani da rubutun bayar da maki na ma'ajiyar abokin aiki na AfriQA; ga TTS, yi amfani da kayan aikin tattara MOS na ɗan adam. Sanya ma'aunin na musamman ga aiki a cikin ƙamus na `TASKS`; kiyaye tsarin kowane harshe da kowane aji.
- **Ba ya tilasta sake yin aiki (reproducibility).** Kowane aiki da ke fitar da lambobin kima ya kamata kuma ya adana ainihin hasashen JSONL, nau'ikan ɗakin karatu na ma'auni, da ƙwayar bazuwar (random seed). Ƙara waɗannan a matsayin kayayyakin adanawa (commit artifacts) tare da rubutun kimarka.

## Faɗaɗa samfurin {#extending-the-template}

Tsarin ƙara sabon aiki shi ne:

1. Ƙara aikin `def eval_yourtask(records)` wanda ke dawo da ƙamus (dict) tare da `per_language` a matakin sama.
2. Zaɓi ma'aunin da ke mutunta gaskiyar harshe mai ɗumbin tsarin kalmomi (matakin harafi a kan matakin kalma inda tsarin kalmomi ke da muhimmanci; kowane aji ga rarrabawa; farawa da nemo bayanai ga QA).
3. Yi rijista a cikin ƙamus na `TASKS`.
4. Ƙara layin docstring wanda ke bayyana menene ainihin ma'aunin kuma me yasa.

## Munanan tsare-tsare {#anti-patterns}

1. **Cire buƙatar filin `language`** don sanya tsarin ya zama "mai sauƙi". Wannan shi ne tsarin tilastawa; cire shi yana cire bin ƙa'idar.
2. **Ƙara filin "babban lamba" (headline number)** wanda ke ɗaukar matsakaici a fadin harsuna. Gaba ɗaya matsayin edita na AfriPlaybook shi ne cewa manyan lambobi a fadin harsuna suna ɓoye mummunar gazawar kowane harshe. Kada ka ƙara shi.
3. **Sanya BLEU ko WER ya zama ainihin filin** don dacewa da "abin da masu dubawa ke tsammani". Masu dubawa za su iya kallon lamba ta biyu; matsayin AfriPlaybook shi ne cewa harsuna masu ɗumbin tsarin kalmomi suna buƙatar ma'aunin matakin harafi a matsayin na farko.
4. **Tsallake tsarin ɗaukar samfurin kimar ɗan adam** saboda "mun san ƙirar tana da kyau". Ba ka sani ba har sai masu jin yaren asali sun faɗa hakan.

## Ƙarin karatu {#further-reading}

- [sacrebleu documentation](https://github.com/mjpost/sacrebleu): Aiwatar da chrF da BLEU.
- [jiwer documentation](https://github.com/jitsi/jiwer): Aiwatar da CER da WER.
- [scikit-learn classification report](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.classification_report.html): F1 na kowane aji tare da tallafi.
- [seqeval](https://github.com/chakki-works/seqeval): daidaitaccen ɗakin karatu na kima na musamman ga NER, nassoshi masu amfani kan yadda ake bayar da maki ga yi wa jeri lakabi (sequence tagging).
- [AfriQA companion repo](https://github.com/masakhane-io/afriqa): nassoshin bayar da maki na musamman ga QA; sarrafa sunayen laƙabi da bayar da maki ga amsoshi da yawa suna da sarkakiya sosai don haka ya fi kyau a koma ga wannan maimakon sake aiwatarwa.

---

**Lura ga mai bayar da gudummawa.** Idan ka faɗaɗa wannan samfurin don aiki mai ma'anar kima daban-daban (nemo bayanai, tsarin sakamako, ƙirƙirar jeri tare da daidaitawa), kiyaye siffar sakamakon kowane harshe + kowane aji yadda yake. Wannan siffar ita ce ke sanya tsarin edita na AfriPlaybook ya zama mai ɗaukuwa. Ayyukan sabon aiki suna ƙara filaye ne; ba sa cire waɗanda ke tilasta bin ƙa'ida.
