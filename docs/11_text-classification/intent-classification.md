---
title: Intent Classification
sidebar_position: 12
sidebar_label: "Intent Classification"
ready: true
last_update:
  date: 2026-11-24
  author: Seid Muhie Yimam
---

# Intent Classification

**What is Intent Classification?**

Intent classification (also called intent detection) assigns a short user utterance to the action the user wants a system to take: check a balance, send money, book a ticket, set an alarm. It is the first step of every voice assistant, chatbot, USSD menu replacement and customer-service bot. Intent classification is almost always paired with **slot filling**, which finds the pieces of information the action needs, such as the amount, the recipient or the date. Slot filling is a sequence-labelling task, tagged and scored like named entity recognition (see [Sequence Labelling](../sequence-labelling/index.md)).

Intent differs from the other example tasks in this chapter. Sentiment, emotion and hate speech describe what the writer feels or does to others; intent describes what the writer wants the system to do next. The label set is therefore defined by the application, not by psychology or policy, and a dataset built for one assistant rarely fits another without revisiting the labels.

## Intent and slot labels definition

An intent label set is a list of actions, grouped by domain, plus a label for everything the system cannot handle.

- **Intent**: one action the system supports, named as verb plus object (`transfer_money`, `check_balance`, `book_flight`). Each utterance gets exactly one intent in most datasets.
- **Domain**: a group of related intents (banking, travel, home). Useful for organising collection and for reporting results, but rarely a label on its own.
- **Slot**: a typed span inside the utterance that fills an argument of the intent (`amount`, `currency`, `recipient`, `date`, `city`). An utterance can have zero, one or many slots.
- **Out-of-scope**: an utterance that matches none of the supported intents. Deployed systems receive many of these, and a classifier trained without them forces every input into some intent. The CLINC150 dataset was built specifically to test this, with 150 in-scope intents plus out-of-scope queries, and showed that classifiers that do well in scope often fail to reject out-of-scope input ([Larson et al., 2019](../references.md#clinc150-2019)).

Examples of intent decisions are as follows:

| Intent | Decision rule | Example |
|---|---|---|
| transfer_money | The user asks to move money to another person or account. | "Send 500 to my brother." |
| check_balance | The user asks how much money is in an account, without moving it. | "How much is left on my account?" |
| transaction_history | The user asks about past transactions, not the current balance. | "What did I pay last week?" |
| out_of_scope | No supported action fits, even partially. | "Will it rain in Kisumu tomorrow?" |

Write a rule for every pair of intents that annotators could confuse, such as `check_balance` and `transaction_history` above. Most disagreement in intent data comes from a few such pairs, not from the whole label set.

## What the data looks like

Each record holds the utterance, its intent, and its slots. Slots are stored either as BIO tags over tokens or as character offsets. A Kiswahili mobile-money example, "I want to send five thousand shillings to Amina tomorrow":

```json
{
  "id": "swa_0042",
  "text": "Nataka kutuma shilingi elfu tano kwa Amina kesho",
  "intent": "transfer_money",
  "tokens": ["Nataka", "kutuma", "shilingi", "elfu", "tano", "kwa", "Amina", "kesho"],
  "slots": ["O", "O", "B-currency", "B-amount", "I-amount", "O", "B-recipient", "B-date"],
  "language": "swa"
}
```

The token and slot lists must be the same length. If you store offsets instead, check that each offset points at the text it claims to, exactly as for extractive question answering.

## Existing resources for African languages

- **INJONGO** is a joint intent and slot-filling dataset for sixteen African languages (Amharic, Ewe, Hausa, Igbo, Kinyarwanda, Lingala, Luganda, Oromo, chiShona, Sesotho, Kiswahili, Twi, Wolof, isiXhosa, Yorùbá and isiZulu) plus English ([Yu et al., 2025](../references.md#injongo-2025)). It has 40 intents in five domains (banking, home, travel, utility, and kitchen and dining) and 23 slot types, with 3,200 utterances per African language split 70/10/20. The utterances were not translated: native speakers were shown an English example of each intent and wrote new, culturally relevant utterances and slot values in their own language. The intent data is on the [Hugging Face Hub](https://huggingface.co/datasets/masakhane/InjongoIntent); the paper states CC BY 4.0 while the Hub card lists Apache 2.0, so check the card before redistribution.
- **MASSIVE** is a virtual-assistant dataset of about one million utterances in 51 languages, with 18 domains, 60 intents and 55 slot types, produced by having professional translators localise the English SLURP dataset ([FitzGerald et al., 2023](../references.md#massive-2023)). Its African languages are Afrikaans, Amharic and Kiswahili, each with the same 16,521 utterances split into train, development and test. It is licensed CC BY 4.0 and is on the [Hugging Face Hub](https://huggingface.co/datasets/AmazonScience/massive).

The two datasets illustrate the main design choice in intent data. MASSIVE is large and parallel, so results compare directly across languages, but its utterances began as American English requests about American services. INJONGO is smaller but was written in each language for its speakers, and its authors found that training on these culturally grounded English utterances transferred better to African languages than training on Western-centric English data ([Yu et al., 2025](../references.md#injongo-2025)).

## Collecting utterances

Real user logs are the best source, if you have consent to use them; see [Legal, consent, and community IP](../legal-consent/index.md). Most new projects do not, and collect utterances by elicitation instead:

1. **Write a scenario per intent.** Describe the situation, not the sentence: "You want to send money to a relative in another town." Showing annotators an example sentence speeds them up but pulls their wording towards it.
2. **Collect from many writers.** Each writer has habits; twenty writers producing twenty utterances each give more variety than four writers producing a hundred.
3. **Ask for local content.** Local names, places, currencies, units and services. A mobile-money intent in Kenya mentions M-Pesa and shillings, not credit cards and dollars.
4. **Keep code-switching.** Many users mix languages in a single request, and Sheng, Kiswahili-English and French-Wolof requests are normal input. Do not ask writers to "correct" them into one language.
5. **Collect out-of-scope examples on purpose.** Write scenarios outside the supported actions, and include requests close to supported intents ("send a letter" next to "send money").
6. **Balance intents.** Aim for a similar number of utterances per intent. INJONGO's release has 80 utterances per intent per language, which is a useful benchmark for a first version.

Translation is cheaper and gives parallel data, but it imports the source culture and a stilted register. If you translate, have translators localise names and entities, and keep a separately written test set to measure the gap.

## Annotation and agreement

When utterances are elicited per intent, the intent label comes from the scenario, and the annotation work is mostly verification and slot tagging:

- **Verify the intent.** A second annotator assigns an intent to each utterance without seeing the scenario. Disagreements show either a bad utterance or two intents that need a clearer rule.
- **Tag slots as spans.** Use a span-labelling tool, as for NER. INJONGO tagged slots in Label Studio with an NER-style setup, and resolved disagreements by majority vote over three annotators per sentence ([Yu et al., 2025](../references.md#injongo-2025)).
- **Write slot boundary rules.** Decide whether "shilingi" is inside the `amount` span or its own `currency` slot, whether prepositions such as "kwa" (to) are inside `recipient`, and how dates expressed with several words are tagged. The same boundary questions as in NER apply; see [Named Entity Recognition](../sequence-labelling/ner.md#writing-the-guideline).
- **Merge or drop rare slot types.** INJONGO started with 34 slot types and reduced them to 23 after annotation by deleting and merging types. Expect to do the same, and record what changed.

Measure intent agreement with Cohen's or Fleiss' kappa (see [Annotation](./annotation.md#inter-annotator-agreement)) and slot agreement with entity-level F1 between annotators. INJONGO reported Fleiss' kappa before and after a review round, from a lowest pre-review score of 0.618 (isiZulu) to post-review scores between 0.912 and 1.00 ([Yu et al., 2025](../references.md#injongo-2025)). As with NER, report both figures.

For multi-turn conversations, label the target turn only after reading a fixed amount of earlier context. Keep earlier turns read-only, record the context window, and distinguish the target turn's intent from an intent expressed earlier in the conversation. See [Dialogue and Multi-Turn Annotation](../text-generation/dialogue.md).

## Evaluation

Intent and slots are scored separately and then together:

- **Intent accuracy**: the fraction of utterances with the correct intent. Add macro F1 if intents are imbalanced.
- **Slot F1**: span-level F1 over slots, computed with [seqeval](https://github.com/chakki-works/seqeval) exactly as for NER.
- **Exact match (sentence accuracy)**: the fraction of utterances where the intent and every slot are correct. It is the closest of the three to "did the assistant do the right thing".
- **Out-of-scope recall**: if the system must reject unsupported requests, measure how many out-of-scope test utterances it rejects, alongside in-scope accuracy.

```python
from seqeval.metrics import f1_score
from seqeval.scheme import IOB2

def evaluate(gold, pred):
    """gold, pred: lists of dicts with 'intent' and 'slots' (BIO tag lists)."""
    n = len(gold)
    intent_acc = sum(g["intent"] == p["intent"] for g, p in zip(gold, pred)) / n
    slot_f1 = f1_score([g["slots"] for g in gold], [p["slots"] for p in pred],
                       mode="strict", scheme=IOB2)
    exact = sum(g["intent"] == p["intent"] and g["slots"] == p["slots"]
                for g, p in zip(gold, pred)) / n
    return {"intent_acc": intent_acc, "slot_f1": slot_f1, "exact_match": exact}
```

Expect slot filling to be the weak point. On INJONGO, fine-tuned multilingual models reached high intent accuracy, but prompted large language models did much worse on slots than on intents ([Yu et al., 2025](../references.md#injongo-2025)). Report all three numbers per language.

## Common pitfalls

- **Template leakage.** Writers reuse the example sentence and the test set contains near-copies of training utterances. Fix: deduplicate near-identical utterances and split by writer, so no writer appears in both train and test.
- **Translated test sets only.** Scores on translated data overestimate performance on real users. Fix: keep a natively written test set, however small.
- **No out-of-scope data.** The deployed classifier assigns a confident intent to every greeting and complaint. Fix: collect and evaluate out-of-scope utterances.
- **Labels that mirror the menu, not the user.** Intents copied from an existing USSD menu split actions users think of as one, or merge ones they separate. Fix: pilot the label set on real or elicited requests before freezing it.
- **Slot boundaries left to annotators.** The same amount is tagged with and without its currency word. Fix: boundary rules with examples, as for NER.

