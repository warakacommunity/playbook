---
title: Dialogue and Multi-Turn Annotation
sidebar_label: Dialogue
sidebar_position: 5
ready: true
last_update:
  date: 2026-11-24
  author: Seid Muhie Yimam
---

# Dialogue and Multi-Turn Annotation

Dialogue annotation labels a conversation, one of its turns, or a span inside a turn. The central rule is to preserve context: an intent, dialogue act or response judgement can change when earlier turns are hidden. Dialogue-act models have long used the sequence of preceding acts, not each utterance on its own, to decide a label ([Stolcke et al., 2000](../references.md#stolcke-2000)).

## Store the conversation structure

Store each record as an ordered array of turns. Every turn needs a speaker role from a short controlled list (such as `user` and `agent`) and its text; timestamps are optional but useful for spoken dialogue. Keep speaker identifiers pseudonymous and preserve turn order exactly.

```json
{
  "conversation_id": "conversation_0042",
  "turns": [
    {"turn_id": "t1", "speaker": "user", "text": "Nataka kutuma shilingi elfu tano."},
    {"turn_id": "t2", "speaker": "agent", "text": "Kwa nani?"},
    {"turn_id": "t3", "speaker": "user", "text": "Kwa Amina kesho."}
  ],
  "target_turn_id": "t3",
  "context_window": 2
}
```

Show earlier turns as read-only context and make only the target turn labelable. Fix the context window, whether the full history or a stated number of preceding turns, and keep it constant within an evaluation. Record that choice in every export.

## Choose the annotation unit

Turn-level labels include intent, dialogue act, toxicity and response quality. Span-level labels identify slots, entities or other evidence inside a turn. A project can use both, but their scopes must remain distinct: a slot belongs to its turn, while an intent may depend on the whole context. For dialogue acts, consider adapting the ISO 24617-2 standard, which defines dialogue act types and how to annotate them, before inventing a new taxonomy ([Bunt et al., 2020](../references.md#bunt-2020)). For intents and slots, existing datasets that cover African languages offer schemas to start from ([FitzGerald et al., 2023](../references.md#massive-2023); [Yu et al., 2025](../references.md#injongo-2025)).

The guideline must cover code-switching across and within turns. Language models still handle many kinds of code-switching poorly, partly because little training data captures it ([Doğruöz et al., 2021](../references.md#dogruoz-2021)). Do not translate or normalise it away; use the language-identification conventions in [Sequence Labelling](../sequence-labelling/index.md#language-identification-of-code-switched-text) and the deployment considerations in [Multilingual switching within a session](../deployment/multilingual-switching.md).

For response judgement, keep the conversation visible and assess whether the candidate answers the latest turn, remains consistent with earlier turns, matches language and register, and avoids harm. The comparison controls are in [Judging responses in a dialogue](../3_annotation-design/human-evaluation-designs.md#judging-responses-in-a-dialogue).

## Check quality and exports

Double-annotate a sample and report agreement separately for turn-level labels and spans. Review disagreements with the same context window annotators saw. Check that every target turn exists, turn IDs are unique and ordered, speaker roles come from the controlled list, and no annotation points outside its target turn. Release the conversation structure and context-window convention with the labels so another team can reproduce the task.

## Further reading

- [Bunt et al., 2020](../references.md#bunt-2020): the second edition of the ISO 24617-2 standard for dialogue act annotation.
- [Budzianowski et al., 2018](../references.md#budzianowski-2018): MultiWOZ, 10,000 crowdsourced multi-domain dialogues, and the collection procedure behind them.
- [Stolcke et al., 2000](../references.md#stolcke-2000): dialogue act tagging on 1,155 hand-labelled Switchboard conversations, modelling the sequence of acts.
- [Doğruöz et al., 2021](../references.md#dogruoz-2021): a survey of code-switching from linguistic, social and language-technology perspectives.
- [Yu et al., 2025](../references.md#injongo-2025): INJONGO, intent and slot data written by native speakers of 16 African languages.
