---
title: Dialogue and Multi-Turn Annotation
sidebar_label: Dialogue
sidebar_position: 5
ready: true
last_update:
  date: 2026-11-23
  author: Seid Muhie Yimam
---

# Dialogue and Multi-Turn Annotation

Dialogue annotation labels a conversation, one of its turns, or a span inside a turn. The central rule is to preserve context: an intent, dialogue act or response judgement can change when earlier turns are hidden.

## Store the conversation structure

Store each record as an ordered array of turns. Every turn needs a stable speaker role and text; timestamps are optional but useful for spoken dialogue. Keep speaker identifiers pseudonymous and preserve turn order exactly.

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

Turn-level labels include intent, dialogue act, toxicity and response quality. Span-level labels identify slots, entities or other evidence inside a turn. A project can use both, but their scopes must remain distinct: a slot belongs to its turn, while an intent may depend on the whole context.

The guideline must cover code-switching across and within turns. Do not translate or normalise it away; use the language-identification conventions in [Sequence Labelling](../sequence-labelling/index.md#language-identification-of-code-switched-text) and the deployment considerations in [Multilingual Code-Switching](../deployment/multilingual-switching.md).

For response judgement, keep the conversation visible and assess whether the candidate answers the latest turn, remains consistent with earlier turns, matches language and register, and avoids harm. The comparison controls are in [Judging responses in a dialogue](../3_annotation-design/human-evaluation-designs.md#judging-responses-in-a-dialogue).

## Check quality and exports

Double-annotate a sample and report agreement separately for turn-level labels and spans. Review disagreements with the same context window annotators saw. Check that every target turn exists, turn IDs are unique and ordered, speaker roles come from the controlled list, and no annotation points outside its target turn. Release the conversation structure and context-window convention with the labels so another team can reproduce the task.
