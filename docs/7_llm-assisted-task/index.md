---
ready: true
title: LLM-Assisted Data
last_update:
  date: 2026-11-26
  author: Shamsuddeen Hassan Muhammad
---

# LLM-Assisted Data

Large language models (LLMs) can help build datasets by drafting labels, translations or examples for humans to check. Used well, this lowers the cost of annotation. Used carelessly, it quietly fills a dataset with confident errors. For African languages the line between the two is sharper than elsewhere, because current models are weakest precisely on these languages, so the help they offer needs more scrutiny, not less.

This chapter has two parts: using LLMs to assist human annotation, below, and [creating synthetic data](./synthetic-data.md) with them.

:::tip[Key points]

- The LLM proposes and a qualified native speaker decides; never treat model output as final.
- Constrain the model to your label set and send off-list replies to a human with no draft.
- Measure the model against human annotators with agreement before you rely on it.
- Do not use an LLM where it is too weak in the language or where its errors would be invisible to the reviewer.
- Record the prompt, settings and date, and check consent before sending text to a hosted model.

:::

## Human-in-the-loop, not human-out-of-the-loop

The safe pattern is that the LLM proposes and a human disposes. An LLM pre-labels or drafts, and a qualified native speaker reviews, corrects and approves every item, or at least enough of them to trust the rest. The model is a way to make a human faster, not a way to replace the human. Treating its output as final is where LLM-assisted annotation goes wrong.

Measure the LLM against your human annotators the same way you measure two annotators against each other, with agreement, so you know how far to trust it on this task and this language. The same rules hold for drafts from any model, not only an LLM. [Model-Assisted Annotation](../3_annotation-design/model-assisted-annotation.md) covers them in general, including active learning and what to record about the model.

In practice, have the model draft a label, constrain that draft to the allowed label set, and import it into your annotation tool as a pre-annotation that a human then reviews. The function below keeps the model provider abstract, so it works with any API, and rejects anything the model invents outside the label set:

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

    record = {"text": text, "draft_label": None, "llm_drafted": False}
    if guess not in LABELS:
        # Off-list output: send no draft at all, so a human labels this item
        # from scratch. Never map it to a default class such as "neutral".
        record["llm_raw"] = raw  # keep it for auditing the prompt
        return record

    # A draft for a human to confirm or correct, never a final label.
    # Convert it to your annotation tool's pre-annotation import format.
    record.update({
        "draft_label": guess,
        "llm_drafted": True,
        "model_version": "llm-prelabel-v1",
    })
    return record

if __name__ == "__main__":
    def my_model(prompt: str) -> str:   # replace with your provider's API call
        raise NotImplementedError

    texts = ["Na ji dadin fim din sosai."]  # replace with your unlabeled items
    rows = [prelabel(t, call_llm=my_model) for t in texts]
    with open("prelabeled.json", "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, indent=2)
```

Two things make this the safe pattern rather than the dangerous one:

- **The off-list check.** A model that replies with a category you never defined gets no draft at all. The item goes to a human with an empty form, rather than being forced into a default class that would quietly inflate it. The raw reply is kept so you can see how often the prompt fails.
- **Drafts stay drafts.** The label is stored as a draft, flagged as model-made, and imported for review, not as a finished annotation.

Once humans have corrected a batch, treat the LLM as one more annotator and run the [Data Quality](../4_data-quality/index.md#measure-inter-annotator-agreement) agreement script comparing its drafts to the human verdicts. That number tells you how far to trust it before you lean on it for the rest.

## Prompts, bias, and knowing when to stop

Three cautions matter especially for African languages:

- **Prompt design and output validation are not optional.** The prompt has to constrain the model to the label set, and the output has to be checked for format and plausibility, since an unconstrained model invents categories.
- **Bias, hallucination and inconsistency are amplified in low-resource settings.** A model with thin knowledge of a language confidently produces fluent nonsense and carries over the biases of its mostly foreign training data.
- **Some tasks should not use an LLM at all.** These include anything the model is too weak in the language to do reliably, anything culturally specific it has not learned, and anything where its error would be invisible to a non-expert reviewer.

The persistent benchmark gap between English and African languages is the reason to stay conservative ([AfroBench](../references.md#afrobench)). Weigh cost against quality honestly: an LLM that is fast but wrong is more expensive than a slower human once you count the cost of fixing what it broke downstream.

## Reviewing drafts without rubber-stamping

A pre-filled label is not neutral: reviewers tend to accept what is already on the screen. With a model that is weak in the language, that anchoring is the main way LLM errors survive human review. And every new prompt resets what you know about the model's accuracy, just as a new model version does, so repeat the checks whenever you change it. The review habits that keep drafts honest (a blind control slice, edit rates per annotator, hiding model confidence) apply to any model and are set out in [Review drafts without rubber-stamping](../3_annotation-design/model-assisted-annotation.md#review-drafts-without-rubber-stamping).

## Document what the model did

Record what the model contributed, as for any model-assisted dataset: the model name and version, a per-item flag for drafted items, and how often humans accepted or changed the drafts (see [Record what the model did](../3_annotation-design/model-assisted-annotation.md#record-what-the-model-did)). For an LLM, also:

- **Record the exact prompt and generation settings**, and the date the model was queried, in the [dataset documentation](../6_documentation/documentation.md). The same model gives different drafts under a different prompt.
- **Check consent and data agreements before sending text to a hosted provider.** Your agreements must allow the text to leave your infrastructure and go to a third party.
- **Read the provider's terms on using outputs** to build datasets and models ([Data Governance](../data-governance/index.md#consent-and-rights)).
