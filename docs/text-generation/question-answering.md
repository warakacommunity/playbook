---
ready: true
title: Question answering
sidebar_position: 4
last_update:
  date: 2026-11-22
  author: Shamsuddeen Hassan Muhammad
---

# Question answering

Question answering returns a correct answer to a question. It takes three main forms. Extractive QA pulls the answer as a span from a given passage, open-retrieval QA first finds the relevant passage and then extracts or generates the answer, and generative QA produces an answer from the model's own knowledge. QA is one of the most useful tasks for African languages, because it turns a pile of documents into something a person can actually ask, and it is also one where current models struggle most.

![The three forms of question answering: extractive, open-retrieval, and generative](images/qa-types.svg)

## What the data looks like

The landmark resource is AfriQA, the first cross-lingual open-retrieval QA dataset focused on African languages, with more than 12,000 questions across ten languages, where the question is asked in the African language and the answer is retrieved from passages that are often in English or French ([Ogundepo et al., 2023](../references.md#afriqa-2023)). That cross-lingual design is itself a response to scarcity, since there is far more reference text in English than in most African languages. Knowledge-style QA is covered by AfriMMLU within the IrokoBench benchmark, which tests multiple-choice knowledge questions across seventeen languages ([Adelani et al., 2024](../references.md#irokobench-2024)). Building new QA data means writing questions and marking correct answers, work that has to be done by people fluent in the language and, for specialised domains, in the subject.

A few other resources are worth knowing before building from scratch. TyDi QA covers eleven typologically diverse languages, including Swahili, and was written by people who wanted to know an answer but did not yet know it, without translation, which makes its questions closer to real information needs ([Clark et al., 2020](../references.md#tydiqa-2020)). KenSwQuAD is a SQuAD-style extractive dataset of 7,526 question-answer pairs over 1,445 Swahili texts from the Kencorpus project ([Wanjawa et al., 2023](../references.md#kenswquad-2023)). Belebele is a multiple-choice reading comprehension benchmark in 122 language variants, many of them African, built on FLORES-200 passages so that results can be compared directly across languages ([Bandarkar et al., 2024](../references.md#belebele-2024)). Because Belebele is fully parallel, it is a good evaluation set but says little about questions that arise naturally in a given language.

Extractive QA data follows the shape made common by SQuAD: a context passage, a question, and the answer marked as both its text and its start position in the passage, so the span can be checked exactly. Recording the character offset, not just the text, removes ambiguity when the same string appears more than once:

```json
{
  "context": "Kano ita ce birni mafi girma a arewacin Najeriya, kuma cibiyar kasuwanci ce.",
  "question": "Wane birni ne mafi girma a arewacin Najeriya?",
  "answers": [{"text": "Kano", "answer_start": 0}],
  "language": "hau_Latn"
}
```

For unanswerable questions, which are worth including so a model learns to decline rather than invent, keep an empty `answers` list. The annotation guideline on exactly where an answer span begins and ends matters most in morphologically rich languages, where the answer may carry a prefix or suffix that the question does not.

## Distinctive challenges

QA exposes the knowledge gap directly. A model that has read little in a language has little to answer from, and cross-lingual retrieval, while a clever workaround, can lose or distort meaning as it crosses languages. Answer boundaries are also harder to mark consistently in morphologically rich languages, where the same answer appears in different inflected forms. Clear annotation guidelines on what counts as a correct answer span are essential.

## Annotation and quality assurance

How questions are written shapes what a model learns. When annotators read a passage and then write questions about it, they tend to reuse its words, and a model can then score well by matching words rather than understanding. Two habits reduce this: ask annotators to paraphrase rather than copy phrases from the passage, or have them write questions from a topic or prompt before they see the passage, which is the approach TyDi QA took ([Clark et al., 2020](../references.md#tydiqa-2020)). Translating an English QA set is cheaper, but it carries translationese and questions about people, places and events that matter little to speakers of the target language, so prefer questions written natively where you can.

Write the span guideline before annotation starts and give worked examples for the hard cases: whether to include prefixes, suffixes, or clitics attached to the answer; how to mark numbers, dates and names written in more than one way; and when a question has no answer in the passage. Where several answers are acceptable, record them all, since the scoring code below takes the best match over the gold answers.

Then check the data in two ways. First, have a second annotator re-answer a sample of questions without seeing the first answer, and review the disagreements; KenSwQuAD, for example, had a separate group of annotators re-check a 12.5% sample of its texts ([Wanjawa et al., 2023](../references.md#kenswquad-2023)). Second, run mechanical checks on every record, because a wrong offset silently corrupts training and scoring:

```python
def check_record(rec: dict) -> list[str]:
    """Return a list of problems found in one extractive QA record."""
    problems = []
    for ans in rec["answers"]:
        start, text = ans["answer_start"], ans["text"]
        if rec["context"][start:start + len(text)] != text:
            problems.append(f"offset {start} does not point to '{text}'")
        if text != text.strip():
            problems.append(f"answer '{text}' has leading or trailing whitespace")
    if not rec["question"].strip():
        problems.append("empty question")
    return problems
```

Also check that no passage appears in both the training and test splits, since several questions are usually written on the same passage.

## Evaluation

Extractive QA is scored with Exact Match, the fraction of answers that match the reference exactly, and token-level [F1](https://en.wikipedia.org/wiki/F-score), which gives partial credit for overlap. Both inherit the morphology problem: an answer that is correct but inflected differently from the reference can score zero on Exact Match, so F1 and a human check are needed alongside it. For generative QA, where the answer is free text, automatic scoring is even less reliable, and native-speaker human evaluation is the dependable measure.

The two extractive metrics are short to compute, and seeing them written out shows exactly why Exact Match is the harsher of the two:

```python
import re
from collections import Counter


def normalize(text: str) -> str:
    """Lowercase and collapse whitespace. Do NOT strip 'articles' the way the
    English SQuAD script does: that step is English-specific and wrong here."""
    return " ".join(text.lower().split())


def exact_match(pred: str, gold: str) -> int:
    return int(normalize(pred) == normalize(gold))


def token_f1(pred: str, gold: str) -> float:
    pred_toks = normalize(pred).split()
    gold_toks = normalize(gold).split()
    common = Counter(pred_toks) & Counter(gold_toks)
    shared = sum(common.values())
    if shared == 0:
        return 0.0
    precision = shared / len(pred_toks)
    recall = shared / len(gold_toks)
    return 2 * precision * recall / (precision + recall)


# Score against the best of several accepted gold answers.
def best_over_golds(pred: str, golds: list[str]) -> tuple[int, float]:
    em = max(exact_match(pred, g) for g in golds)
    f1 = max(token_f1(pred, g) for g in golds)
    return em, f1


if __name__ == "__main__":
    print(best_over_golds("birnin Kano", ["Kano"]))  # EM 0, F1 0.67
```

The example output makes the point: "birnin Kano" is a correct answer but scores zero on Exact Match because of one extra word, while token F1 gives it partial credit. The `normalize` function deliberately omits the article-stripping step from the original English SQuAD scorer, which would silently corrupt answers in languages whose grammar works nothing like English. Report F1 alongside Exact Match, and always sample answers by hand to catch the correct-but-inflected cases that both metrics undercount.

Marking an answer span in the AfriAnnotate editor:

![Selecting an answer span for extractive QA in AfriAnnotate](/afriannotate-demo/01-text-nlp/17-qa-span-selection/2-labeling-editor.png)
