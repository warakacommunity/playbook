---
title: LLM-Assisted Data
---

# LLM-Assisted Data

Large language models can help build datasets by drafting labels, translations, or examples for humans to check. Used well, this lowers the cost of annotation; used carelessly, it quietly fills a dataset with confident errors. For African languages the line between the two is sharper than elsewhere, because current models are weakest precisely on these languages, so the help they offer needs more scrutiny, not less.

This chapter has two parts: using LLMs to assist human annotation, below, and [creating synthetic data](./equipment-setup.md) with them.

## Human-in-the-loop, not human-out-of-the-loop

The safe pattern is that the LLM proposes and a human disposes. An LLM pre-labels or drafts, and a qualified native speaker reviews, corrects, and approves every item, or at least enough of them to trust the rest. The model is a way to make a human faster, not a way to replace the human, and treating its output as final is where LLM-assisted annotation goes wrong. Measure the LLM against your human annotators the same way you measure two annotators against each other, with agreement, so you know empirically how far to trust it on this task and this language.

In practice the pattern is to have the model draft a label, constrain that draft to the allowed label set, and import it as a pre-annotation a human then reviews. The function below keeps the model provider abstract, so it works with any API, and rejects anything the model invents outside the label set:

```python
import json

LABELS = ["positive", "negative", "neutral"]

PROMPT = """You are labeling the sentiment of Hausa text.
Reply with ONLY one word from this list: {labels}.
Text: {text}"""

def prelabel(text: str, call_llm) -> dict:
    """Draft one label with an LLM. `call_llm` is any function that takes a
    prompt string and returns the model's text reply."""
    raw = call_llm(PROMPT.format(labels=", ".join(LABELS), text=text))
    guess = raw.strip().lower()
    label = guess if guess in LABELS else "neutral"  # reject off-list output

    # Import this as a pre-annotation (Label Studio "predictions" shape): it
    # shows up pre-filled for a human to confirm or correct, never as final.
    return {
        "data": {"text": text},
        "predictions": [{
            "model_version": "llm-prelabel-v1",
            "result": [{
                "from_name": "sentiment", "to_name": "text", "type": "choices",
                "value": {"choices": [label]},
            }],
        }],
    }

if __name__ == "__main__":
    rows = [prelabel(t, call_llm=my_model) for t in texts]  # my_model: your API call
    with open("prelabeled.json", "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, indent=2)
```

Two things make this the safe pattern rather than the dangerous one. The off-list check means a model that replies with a category you never defined is silently corrected rather than corrupting the data, and the `predictions` wrapper imports the label as a draft for review, not as a finished annotation. Once humans have corrected a batch, treat the LLM as one more annotator and run the [Data Quality](../4_data-quality/index.md) agreement script comparing its drafts to the human verdicts, which tells you in a number how far to trust it before you lean on it for the rest.

## Prompts, bias, and knowing when to stop

Three cautions matter especially for African languages. Prompt design and output validation are not optional, because the prompt has to constrain the model to the label set and the output has to be checked for format and plausibility, since an unconstrained model invents categories. Bias, hallucination, and inconsistency are amplified in low-resource settings, where a model with thin knowledge of a language confidently produces fluent nonsense and carries over the biases of its mostly foreign training data. And there are tasks where you should not use an LLM at all: anything the model is too weak in the language to do reliably, anything culturally specific it has not learned, and anything where its error would be invisible to a non-expert reviewer. The persistent benchmark gap between English and African languages is the reason to stay conservative ([AfroBench](../references.md#afrobench)). Weigh cost against quality honestly, because an LLM that is fast but wrong is more expensive than a slower human once you count the cost of fixing what it broke downstream.
