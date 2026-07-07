---
sidebar_position: 5
title: Multilingual switching within a session
---

# Multilingual switching within a session

*Last reviewed: 2026-07-07.*

Code-switching is not an edge case in African-language deployment; it is the majority interaction pattern. Real users routinely mix two or three languages within a single sentence, and switch again in the next turn. Kiswahili and English drift together in a single WhatsApp reply; Hausa and English trade off across sentences in the same voice note; French, Wolof, and Arabic braid through the same market conversation. An NLP system that assumes each user speaks one language at a time will systematically fail its intended audience. This page is the practical guide to designing the model *and* the UI for the code-switched reality African users bring.

## What in-session multilingual switching actually is

Code-switching happens at several granularities, and a system that handles one does not automatically handle the others.

- **Turn-level switching** — the user writes one message in one language, the next in another, and expects the system to keep up. Common in messaging apps where different topics or interlocutors trigger different language habits. Simplest to detect.
- **Sentence-level switching** — a single message contains multiple sentences in different languages ("Sannu. How are you today?"). Straightforward if the system runs LID per sentence rather than per turn.
- **Intra-sentence switching (code-mixing)** — a single sentence draws words and phrases from two or more languages ("I dey go market for kaya"). The most common and least-well-handled case. Rule-based per-sentence LID breaks here; the model must handle mixed input natively.
- **Script-level switching** — the same user switches between Latin script and Ajami, Ge'ez, N'Ko, or Arabic in the same session. Rarer but real, and technically the hardest for the input pipeline.

The four cases compound. A production African-language chatbot has to handle all of them, ideally without asking the user which one they are in.

## The default UI pattern breaks

The pattern that ships in most consumer NLP products — pick a language at first launch, use it for everything until the user changes it — is unusable for code-switched African users. It fails in specific, documented ways:

- **Users abandon the language picker.** A picker that lists 15 African languages plus English and French sees most users tapping "English" or "French" and switching to their own language mid-conversation anyway, at which point the model breaks.
- **Users switch languages faster than the setting can be changed.** In a WhatsApp reply, the user typed in Hausa, then in English, then in Hausa again in the space of one exchange. A per-user language setting cannot follow that.
- **Users write in whatever language happens to be easiest at that moment.** Sometimes that is the language with the shortest phrasing for what they mean. Sometimes it is the one their keyboard is currently on. Sometimes it is the language of the last message they read. A locked "user language" does not model this.
- **Auto-detection based on the first turn is wrong.** The first message in a session is often the least representative — a greeting in a lingua franca ("Hi", "Bonjour"), or a copy-pasted URL. Locking the session language based on that message locks in the wrong language for most of the interaction.

The design implication is that **language identification must be a per-message, per-sentence, or per-span operation, not a per-user setting**. The rest of this page is about how to do that reliably in a low-resource context.

## Detection strategies

Reliable in-session language identification for African languages needs to handle short inputs, mixed inputs, and inputs that are legitimately ambiguous. Practical patterns:

- **Multi-granularity LID.** Run identification at both the sentence and the word level, and reconcile. Sentence-level LID captures the dominant language; word-level LID catches embedded terms in another language. Neither on its own is sufficient.
- **Trained on real code-switched data, not clean corpora.** LID trained only on Wikipedia or clean news is optimistic — it recognises the languages it was trained on in the register it was trained on, and mis-classifies short SMS-style or WhatsApp-style code-switched input at high rates. Corpora like [LinCE](https://ritual.uh.edu/lince/) (linguistic-code-switching evaluation) and [MixMT](https://arxiv.org/abs/2201.03927) targets are useful references for how code-switched LID is benchmarked; for African-specific code-switching, evaluation data is thinner and often has to be assembled per project.
- **Context accumulation.** Use the last N turns of the conversation as prior evidence. If the user has been writing in Kiswahili for the last four turns, a short next message in ambiguous script is more likely Kiswahili than English. A Bayesian update over turn-level LID scores handles this well.
- **User metadata as a soft prior, not a hard rule.** The user's location, prior language preferences, or platform locale can bias detection toward likely languages without overriding actual signal.
- **Graceful failure under uncertainty.** When LID confidence is low, respond in a lingua franca (usually English or French) with a short "which language would you prefer?" fallback, but do NOT hard-lock the response language to whichever one the user picks. Return to per-message detection on the next turn.
- **A confidence threshold below which the system falls back to a smaller, safer response** — a static clarification prompt in the two most likely languages — rather than confidently answering in the wrong language.

## Response strategies

Once the input language is understood, the response has to be chosen. This is not always the same as the input language, and the rules that work:

- **Default to matching the user's dominant language in the session, not the language of their latest message.** A user who has been writing in Hausa for four turns and sends one English question probably still expects a Hausa-adjacent reply, or at least a bilingual reply that carries the same information in both.
- **Do not over-correct.** If the user consistently writes English words for technical terms while responding in a local language, the system should mirror that pattern rather than translating the English terms into the local language every time.
- **Match the register.** If the user is writing in informal, abbreviated code-switched WhatsApp Hausa, an ultra-formal Hausa reply reads as tone-deaf. Register-matching is a form of respect the user notices.
- **Mirror the script.** If the user is writing in Latin-script Hausa, respond in Latin-script Hausa; if in Ajami, respond in Ajami. Do not "correct" the user's script choice.
- **Allow the user to override the response language explicitly** ("please reply in English"), but do NOT treat this as a session-wide setting — the next message might reset it.

## Model training implications

The training data + evaluation set determine whether the model can handle code-switching at all. Practical requirements:

- **Include real code-switched examples in training data.** Even a small fraction (5-15%) of code-switched examples in fine-tuning data substantially improves model behaviour on mixed input, versus training exclusively on monolingual data.
- **Evaluate on a code-switched test set specifically.** Reporting a headline BLEU/CER/F1 on monolingual test data hides catastrophic failure on mixed input. Split evaluation into monolingual and code-switched subsets, and report both. This is a per-language and per-modality decision — see [core principles](../1_introduction/core-principles.md).
- **Do not artificially clean code-switched training data.** Correcting mixed-language text into monolingual before training removes the exact signal the model needs to handle real user input. Preserve the mix; treat it as ground truth.
- **Consider adapter-based multilingual models** over single-language fine-tunes. Multilingual encoders (AfroXLMR, XLM-RoBERTa, mBERT) with per-language LoRA adapters handle code-switching more gracefully than a swarm of monolingual fine-tunes because the shared encoder builds cross-lingual representations that mixed input can draw on.

## UI patterns that work

- **Detected language shown to the user, editable but not required.** A small "detected as Hausa" chip on each turn, tappable to correct, is better than an intrusive language picker at the start of the session.
- **Keyboard-agnostic input handling.** Users' phone keyboards are configured for their preferred language; do not require them to change keyboards to enter mixed input. This means diacritic-tolerant input processing, script-tolerant matching, and case-insensitive routing.
- **Voice input as a first-class alternative.** Many African users voice-note more comfortably than they type in local languages, especially in the presence of complex diacritics or Ajami/Ge'ez scripts. Prominent voice-input support removes the friction. See the [ASR page](../before-you-start/asr.md).
- **Clear, tolerant error messages.** When the system cannot identify or handle input, it should say so in a lingua franca, offer options in a small number of likely languages, and not lock the user into their answer.
- **Feedback loop.** Let the user report a mis-detection or a wrong response, and use that signal to update the session's language prior for the next turn.

## Anti-patterns to avoid

1. **A "select your language" gate at first launch.** Nearly always ignored, and locks users out of the app when the switch happens.
2. **Locking session language based on the first user message.** The first message is the least representative.
3. **Treating code-switched input as noise to be cleaned.** It is not noise; it is the target register.
4. **Rejecting or asking the user to rephrase code-switched input.** This is the failure mode that trains users to distrust the system fastest.
5. **Assuming all users of a given language write with the same character set.** Ajami-writing Hausa users and Latin-writing Hausa users are the same demographic; the system must handle both.
6. **Publishing headline metrics only on monolingual test sets.** The published number bears no relation to real-user experience.
7. **Delegating language handling entirely to the model** and skipping the UI-side design. The best model in the world cannot recover from a UI that forces users into a monolingual choice.

## Further reading

- [LinCE benchmark (Linguistic Code-switching Evaluation)](https://ritual.uh.edu/lince/) — the multilingual code-switching benchmark; useful reference for how code-switched LID and downstream tasks are evaluated.
- [Aguilar et al., 2020 — LinCE paper](https://arxiv.org/abs/2005.04322) — the methodology behind LinCE.
- [Solorio & Liu, 2008 — foundational computational code-switching work](https://aclanthology.org/D08-1120/) — the paper the field kept citing for a decade after.
- [MixMT shared task (Kumar et al., 2022)](https://arxiv.org/abs/2201.03927) — code-switched MT evaluation; useful for the response-side of the problem.
- [Sitaram et al., 2019 — survey of computational code-switching](https://aclanthology.org/2019.starsem-1.14/) — the summary state-of-the-field survey.
- [Kreutzer et al., 2022](https://aclanthology.org/2022.tacl-1.4/) — indirectly relevant: many low-resource-language corpus quality problems are magnified in code-switched user text.

---

**Contributor's note.** If you have shipped a production African-language NLP system that handles code-switching well — or that failed to handle it — the highest-value contribution here is a per-project note describing the LID approach, the training-data mix, and the specific failures your team had to design around. Real deployment retrospectives are the ground truth this page is trying to preserve.
