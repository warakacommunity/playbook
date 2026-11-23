---
ready: true
title: LLM-Assisted Data
last_update:
  date: 2026-11-23
  author: Shamsuddeen Hassan Muhammad
---

# LLM-Assisted Data

Large language models can help build datasets by drafting labels, translations, or examples for humans to check. Used well, this lowers the cost of annotation; used carelessly, it quietly fills a dataset with confident errors. For African languages the line between the two is sharper than elsewhere, because current models are weakest precisely on these languages, so the help they offer needs more scrutiny, not less.

This chapter has two parts: using LLMs to assist human annotation, below, and [creating synthetic data](./synthetic-data.md) with them.

## Human-in-the-loop, not human-out-of-the-loop

The safe pattern is that the LLM proposes and a human disposes. An LLM pre-labels or drafts, and a qualified native speaker reviews, corrects, and approves every item, or at least enough of them to trust the rest. The model is a way to make a human faster, not a way to replace the human, and treating its output as final is where LLM-assisted annotation goes wrong. Measure the LLM against your human annotators the same way you measure two annotators against each other, with agreement, so you know empirically how far to trust it on this task and this language. The same rules hold for drafts from any model, not only an LLM; [Model-Assisted Annotation](../3_annotation-design/model-assisted-annotation.md) covers them in general, including active learning and what to record about the model.

In practice the pattern is to have the model draft a label, constrain that draft to the allowed label set, and import it as a pre-annotation a human then reviews. The function below keeps the model provider abstract, so it works with any API, and rejects anything the model invents outside the label set:

```python title="prelabel.py"
import json

LABELS = ["positive", "negative", "neutral"]

PROMPT = """You are labeling the sentiment of Hausa text.
Reply with ONLY one word from this list: {labels}.
Text: {text}"""

def prelabel(text: str, call_llm) -> dict:
    """Draft one label with an LLM. `call_llm` is any function that takes a
    prompt string and returns the model's text reply."""
    raw = call_llm(PROMPT.format(labels=", ".join(LABELS), text=text))
    guess = raw.strip().strip(".!\"'").lower()

    task = {"data": {"text": text}}
    if guess not in LABELS:
        # Off-list output: send no draft at all, so a human labels this item
        # from scratch. Never map it to a default class such as "neutral".
        task["data"]["llm_raw"] = raw  # keep it for auditing the prompt
        return task

    # Import as a pre-annotation (Label Studio "predictions" shape): it shows
    # up pre-filled for a human to confirm or correct, never as final.
    task["predictions"] = [{
        "model_version": "llm-prelabel-v1",
        "result": [{
            "from_name": "sentiment", "to_name": "text", "type": "choices",
            "value": {"choices": [guess]},
        }],
    }]
    return task

if __name__ == "__main__":
    def my_model(prompt: str) -> str:   # replace with your provider's API call
        raise NotImplementedError

    texts = ["Na ji dadin fim din sosai."]  # replace with your unlabeled items
    rows = [prelabel(t, call_llm=my_model) for t in texts]
    with open("prelabeled.json", "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, indent=2)
```

Two things make this the safe pattern rather than the dangerous one. The off-list check means a model that replies with a category you never defined does not get a draft at all: the item goes to a human with an empty form, rather than being forced into a default class that would quietly inflate it, and the raw reply is kept so you can see how often the prompt fails. The `predictions` wrapper imports the label as a draft for review, not as a finished annotation. Once humans have corrected a batch, treat the LLM as one more annotator and run the [Data Quality](../4_data-quality/index.md#measure-inter-annotator-agreement) agreement script comparing its drafts to the human verdicts, which tells you in a number how far to trust it before you lean on it for the rest.

## Prompts, bias, and knowing when to stop

Three cautions matter especially for African languages. Prompt design and output validation are not optional, because the prompt has to constrain the model to the label set and the output has to be checked for format and plausibility, since an unconstrained model invents categories. Bias, hallucination, and inconsistency are amplified in low-resource settings, where a model with thin knowledge of a language confidently produces fluent nonsense and carries over the biases of its mostly foreign training data. And there are tasks where you should not use an LLM at all: anything the model is too weak in the language to do reliably, anything culturally specific it has not learned, and anything where its error would be invisible to a non-expert reviewer. The persistent benchmark gap between English and African languages is the reason to stay conservative ([AfroBench](../references.md#afrobench)). Weigh cost against quality honestly, because an LLM that is fast but wrong is more expensive than a slower human once you count the cost of fixing what it broke downstream.

## Reviewing drafts without rubber-stamping

A pre-filled label is not neutral: reviewers tend to accept what is already on the screen. A controlled study of pre-annotation found that it speeds annotators up and can raise quality, but that it also biases them towards the machine's choices, including its mistakes ([Fort & Sagot, 2010](../references.md#fort-sagot-2010)). With a model that is weak in the language, that anchoring is the main way LLM errors survive human review. A few habits keep the review honest:

- **Keep a blind control set.** Have annotators label a random slice of items from scratch, with no draft shown, and compare their agreement with the LLM on that slice to the acceptance rate on drafted items. If reviewers accept far more drafts than the blind slice says are correct, they are rubber-stamping.
- **Track the edit rate per annotator and per batch.** An annotator who never changes a draft, or a batch where corrections suddenly drop, needs a closer look, not praise for speed.
- **Hide model confidence.** Do not show scores or explanations from the model next to the draft; they make anchoring worse without telling the reviewer anything reliable.
- **Re-measure when anything changes.** A new model version, a new prompt, or a new language or domain resets what you know about the model's accuracy, so repeat the agreement check before scaling up again.

## Document what the model did

A dataset built with LLM help is a different object from one labelled entirely by people, and its users need to know which is which. Record in the dataset documentation ([Documentation and Reporting](../6_documentation/documentation.md)) the model name and version, the date it was queried, the exact prompt and settings, which items carry an LLM draft, and how often humans accepted or changed those drafts. Keep a field per item that marks whether it was drafted by the model, so later users can filter or re-check that subset. Before sending any text to a hosted model, check that your consent and data agreements allow it to leave your infrastructure and go to a third party, and read the provider's terms on using its outputs to build datasets and models ([Data Governance](../data-governance/index.md#consent-and-rights)).
