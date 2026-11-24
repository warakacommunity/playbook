---
sidebar_position: 5
title: Multilingual switching within a session
ready: true
last_update:
  date: 2026-07-07
  author: Shamsuddeen Hassan Muhammad
---

# Multilingual switching within a session

*Last reviewed: 2026-07-07.*

Code-switching is not an edge case in African-language deployment; it is an everyday interaction pattern. It is well documented in African data: Nigerian tweets in Hausa, Igbo, Nigerian Pidgin and Yorùbá include a significant fraction of code-mixed text ([Muhammad et al., 2022](../references.md#naijasenti-2022)), South African soap-opera speech mixes English with isiZulu, isiXhosa, Setswana and Sesotho ([van der Westhuizen and Niesler, 2018](../references.md#westhuizen-2018)), and Swahili-English switching has its own language-identification work ([Piergallini et al., 2016](../references.md#piergallini-2016)). Real users routinely mix two or three languages within a single sentence, and switch again in the next turn. Kiswahili and English drift together in a single WhatsApp reply; Hausa and English trade off across sentences in the same voice note; French, Wolof, and Arabic braid through the same market conversation. An NLP system that assumes each user speaks one language at a time will systematically fail its intended audience. This page is the practical guide to designing the model *and* the UI for the code-switched reality African users bring.

## What in-session multilingual switching actually is

Code-switching happens at several granularities, and a system that handles one does not automatically handle the others.

- **Turn-level switching**: the user writes one message in one language, the next in another, and expects the system to keep up. Common in messaging apps where different topics or interlocutors trigger different language habits. Simplest to detect.
- **Sentence-level switching**: a single message contains multiple sentences in different languages ("Sannu. How are you today?"). Straightforward if the system runs LID per sentence rather than per turn.
- **Intra-sentence switching (code-mixing)**: a single sentence draws words and phrases from two or more languages ("I dey go market for kaya"). The most common and least-well-handled case. Rule-based per-sentence LID breaks here; the model must handle mixed input natively.
- **Script-level switching**: the same user switches between Latin script and Ajami, Ge'ez, N'Ko, or Arabic in the same session. Rarer but real, and technically the hardest for the input pipeline.

The four cases compound. A production African-language chatbot has to handle all of them, ideally without asking the user which one they are in.

## The default UI pattern breaks

The pattern that ships in most consumer NLP products (pick a language at first launch, use it for everything until the user changes it) is unusable for code-switched African users. It fails in predictable ways:

- **Users abandon the language picker.** A picker that lists 15 African languages plus English and French sees many users tapping "English" or "French" and switching to their own language mid-conversation anyway, at which point the model breaks.
- **Users switch languages faster than the setting can be changed.** In a WhatsApp reply, the user typed in Hausa, then in English, then in Hausa again in the space of one exchange. A per-user language setting cannot follow that.
- **Users write in whatever language happens to be easiest at that moment.** Sometimes that is the language with the shortest phrasing for what they mean. Sometimes it is the one their keyboard is currently on. Sometimes it is the language of the last message they read. A locked "user language" does not model this.
- **Auto-detection based on the first turn is wrong.** The first message in a session is often the least representative: a greeting in a lingua franca ("Hi", "Bonjour"), or a copy-pasted URL. Locking the session language based on that message locks in the wrong language for most of the interaction.

The design implication is that **language identification must be a per-message, per-sentence, or per-span operation, not a per-user setting**. The rest of this page is about how to do that reliably in a low-resource context.

## Detection strategies

Reliable in-session language identification for African languages needs to handle short inputs, mixed inputs, and inputs that are legitimately ambiguous. Practical patterns:

- **Multi-granularity LID.** Run identification at both the sentence and the word level, and reconcile. Sentence-level LID captures the dominant language; word-level LID catches embedded terms in another language. Neither on its own is sufficient.
- **Trained on real code-switched data, not clean corpora.** LID trained only on Wikipedia or clean news is optimistic: it recognises the languages it was trained on in the register it was trained on, and mis-classifies short SMS-style or WhatsApp-style code-switched input often. Language-ID models that score well on clean held-out test sets can fail badly on real web text in lower-resource languages, through domain mismatch and confusion between similar languages ([Caswell et al., 2020](../references.md#caswell-2020)). The LinCE benchmark ([Aguilar et al., 2020](../references.md#aguilar-2020)) and the MixMT shared task ([Srivastava and Singh, 2022](../references.md#srivastava-2022)) are useful references for how code-switched LID and translation are evaluated. For African languages, AfroLID covers 517 languages and varieties and was also tested on Twitter text ([Adebara et al., 2022](../references.md#afrolid-2022)), but African code-switched evaluation data is thinner and often has to be assembled per project.
- **Context accumulation.** Use the last N turns of the conversation as prior evidence. If the user has been writing in Kiswahili for the last four turns, a short next message in ambiguous script is more likely Kiswahili than English. A simple Bayesian update over turn-level LID scores is one way to do this.
- **User metadata as a soft prior, not a hard rule.** The user's location, prior language preferences, or platform locale can bias detection toward likely languages without overriding actual signal.
- **Graceful failure under uncertainty.** When LID confidence is low, respond in a lingua franca (usually English or French) with a short "which language would you prefer?" fallback, but do NOT hard-lock the response language to whichever one the user picks. Return to per-message detection on the next turn.
- **A confidence threshold below which the system falls back to a smaller, safer response** (a static clarification prompt in the two most likely languages) rather than confidently answering in the wrong language.

## Response strategies

Once the input language is understood, the response has to be chosen. This is not always the same as the input language, and the rules that work:

- **Default to matching the user's dominant language in the session, not the language of their latest message.** A user who has been writing in Hausa for four turns and sends one English question probably still expects a Hausa-adjacent reply, or at least a bilingual reply that carries the same information in both.
- **Do not over-correct.** If the user consistently writes English words for technical terms while responding in a local language, the system should mirror that pattern rather than translating the English terms into the local language every time.
- **Match the register.** If the user is writing in informal, abbreviated code-switched WhatsApp Hausa, an ultra-formal Hausa reply reads as tone-deaf. Register-matching is a form of respect the user notices.
- **Mirror the script.** If the user is writing in Latin-script Hausa, respond in Latin-script Hausa; if in Ajami, respond in Ajami. Do not "correct" the user's script choice.
- **Allow the user to override the response language explicitly** ("please reply in English"), but do NOT treat this as a session-wide setting. The next message might reset it.

## Model training implications

The training data + evaluation set determine whether the model can handle code-switching at all. Practical requirements:

- **Include real code-switched examples in training data.** Models trained only on monolingual data have no examples of the mixed input real users send, and surveys of the field name the lack of code-switched training data as one reason models handle code-switching poorly ([Doğruöz et al., 2021](../references.md#dogruoz-2021)). How much code-switched data you need depends on the task and language pair, so measure the effect on a code-switched test set.
- **Evaluate on a code-switched test set specifically.** Reporting a headline BLEU/CER/F1 on monolingual test data hides catastrophic failure on mixed input. Split evaluation into monolingual and code-switched subsets, and report both. This is a per-language and per-modality decision (see [core principles](../1_introduction/core-principles.md)).
- **Do not artificially clean code-switched training data.** Correcting mixed-language text into monolingual before training removes the exact signal the model needs to handle real user input. Preserve the mix; treat it as ground truth.
- **Consider a shared multilingual model** over a swarm of single-language fine-tunes. Multilingual encoders such as XLM-RoBERTa, mBERT, or AfroXLMR, which was adapted to 17 African languages plus English, French and Arabic ([Alabi et al., 2022](../references.md#alabi-2022)), see every language a user mixes, whereas each monolingual model sees only one. Whether per-language adapters (for example LoRA) or one jointly fine-tuned model handles mixed input better is something to test on your code-switched set.

## UI patterns that work

- **Detected language shown to the user, editable but not required.** A small "detected as Hausa" chip on each turn, tappable to correct, is better than an intrusive language picker at the start of the session.
- **Keyboard-agnostic input handling.** Users' phone keyboards are configured for their preferred language; do not require them to change keyboards to enter mixed input. This means diacritic-tolerant input processing, script-tolerant matching, and case-insensitive routing.
- **Voice input as a first-class alternative.** Some users find voice notes easier than typing in local languages, especially in the presence of complex diacritics or Ajami/Ge'ez scripts. Prominent voice-input support removes the friction. See the [ASR page](../asr/index.md).
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

- [Aguilar et al., 2020](../references.md#aguilar-2020): LinCE, a benchmark of code-switched language identification, NER, POS tagging and sentiment across four language pairs; a reference for how code-switched tasks are evaluated.
- [Solorio and Liu, 2008](../references.md#solorio-2008): early computational work on predicting where speakers switch language.
- [Srivastava and Singh, 2022](../references.md#srivastava-2022): the MixMT shared task on code-mixed machine translation; useful for the response side of the problem.
- [Sitaram et al., 2019](../references.md#sitaram-2019): a survey of code-switched speech and language processing, with a catalogue of code-switched resources.
- [Doğruöz et al., 2021](../references.md#dogruoz-2021): a survey of the linguistic and social side of code-switching and what it means for language technology.
- [Kreutzer et al., 2022](../references.md#kreutzer-2022). Indirectly relevant: many low-resource-language corpus quality problems are magnified in code-switched user text.

---

**Contributor's note.** If you have shipped a production African-language NLP system that handles code-switching well (or that failed to handle it), the highest-value contribution here is a per-project note describing the LID approach, the training-data mix, and the specific failures your team had to design around. Real deployment retrospectives are the ground truth this page is trying to preserve.
