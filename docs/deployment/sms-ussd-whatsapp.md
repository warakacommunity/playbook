---
sidebar_position: 3
title: SMS, USSD, and WhatsApp
---

# SMS, USSD, and WhatsApp as NLP surfaces

*Last reviewed: 2026-07-07.*

Three of every five African mobile phone users interact with digital services primarily through SMS, USSD, or WhatsApp — not through native apps. Whether the user is checking a bank balance, receiving a health reminder, applying for a service, or asking a question of a government helpline, the interaction almost certainly happens on one of these three channels. Any NLP system aiming for real African-market reach lands here. Any NLP system designed for a native-app-with-full-keyboard input will not reach most of the intended users.

This page is the practical guide to the three channels — what each is good for, what breaks NLP models on them, and the design choices that separate a chatbot that ships from a demo that never gets adopted.

## The three channels compared

| Property | SMS | USSD | WhatsApp |
| --- | --- | --- | --- |
| Handset required | Any GSM phone | Any GSM phone | Smartphone |
| Data connection required | No | No | Yes |
| Session model | Store-and-forward, asynchronous | Real-time, session-based (~30–180 s timeout) | Persistent, asynchronous |
| Cost model per interaction | Per SMS (fractions of a cent to a few cents) | Per session (variable by operator + country) | Per conversation window (WhatsApp Business API pricing) |
| Media support | Text only, 160 chars per SMS | Text only, ~182 chars per menu | Text, images, audio, video, documents, buttons |
| Language / character set | GSM-7 (7-bit, no diacritics) or UCS-2 (halves the length) | GSM-7 or UCS-2 | Full Unicode |
| Offline for the user | Effectively yes | Yes | No (requires data) |
| Access pattern | Push-and-pull | Pull only (user dials `*XXX#`) | Both, but push messages are template-restricted |
| Language switching mid-session | Trivial (each message independent) | Restricted by menu depth | Full |

Each channel serves a different user need. Design for the channel your users are actually on, not the one the demo was easiest to build for.

## SMS — asynchronous, universal, character-poor

**What SMS is good for.** One-shot outbound notifications (appointment reminders, exam results, market prices, weather alerts). Inbound short reports (crop condition, health check-in). Any use case where the transaction is *complete in one message each way* and the recipient does not need to be online.

**What SMS is bad for.** Multi-turn dialog. Complex information exchange. Anything requiring diacritics (the GSM-7 character set does not include the tone marks and diacritics load-bearing in Yoruba, Igbo, and many other African languages; falling back to UCS-2 works but halves the effective message length and doubles the per-message cost).

**NLP design implications:**

- **Every response must fit in 160 GSM-7 characters or 70 UCS-2 characters.** Multi-SMS responses are technically supported but cost per SMS and often arrive out-of-order on older handsets. Design the model output length limit at generation time; do not truncate after the fact.
- **User input is heavily abbreviated, code-switched, and often has no diacritics.** A model expecting clean orthography will fail on inputs like `"i wnt 2 knw d price of maiz"`, `"kabari za soko?"` (Swahili), `"anyi na-agu ihe"` (Igbo). Train and evaluate on real SMS-noise text, not on clean corpora.
- **Language identification is the single hardest problem.** The same phone number may send `"hello"`, `"karibu"`, `"how much?"`, and `"bei ni ngapi?"` on consecutive days. LID trained on Wikipedia or news corpora over-fits to clean text and fails on SMS. Use SMS-noise-tolerant LID or condition on user metadata (region, prior interactions).
- **No formatting.** No bold, no bullet points, no links that most feature phones can open. Response design is prose only.

**Reference platforms and aggregators:**

- **[Africa's Talking](https://africastalking.com/)** — SMS + USSD aggregator with coverage across most sub-Saharan African countries. The de-facto reference for cross-country SMS deployment.
- **[Twilio](https://www.twilio.com/)** — global SMS with African coverage; more expensive per-message than local aggregators but more familiar to teams coming from a US/EU background.
- **[MTN](https://developers.mtn.com/), [Airtel](https://developers.airtel.africa/), [Vodacom](https://vodacombusiness.co.za/) aggregator APIs** — direct-to-operator, cheaper at scale, more setup effort per country.

## USSD — session-based, universal, menu-driven

**What USSD is good for.** Menu-driven interactions where the flow is predictable — money transfer, service subscription, balance check, structured data collection (crop yields, health survey), voter registration. Government services with well-defined transaction shapes.

**What USSD is bad for.** Open-ended conversation. Anything requiring more than ~30 seconds of thought per menu. Anything the user needs to reference later — USSD sessions leave no record on the handset.

**Design implications for NLP:**

- **USSD is mostly not NLP.** The interaction is menu-based (`1`. Send money `2`. Check balance `3`. Airtime); the "NLP" component is usually only in service naming and message-string localisation. Design the flow as a state machine and the localisation as a translation catalogue.
- **Session timeouts are aggressive.** Most operators time out at 30 seconds of user inactivity, some at 180 seconds. Menu depth and text length both matter — a long welcome message eats the session budget.
- **Each menu screen is roughly 182 characters** including the numbered options. Design copy to fit.
- **Handsets are inconsistent.** Older Nokia and Symbian feature phones display USSD differently from modern KaiOS and Android USSD popups. Test on real handsets across the low end.
- **Diacritics are as constrained as SMS**; falling back to UCS-2 shortens the per-menu character budget further. Prefer diacritic-free rendering for the options-list layer even if the payload data is diacritic-preserving.
- **NLP can enter USSD flows** at the free-text field level ("*What is your complaint?*" text-entry, followed by a classification into a routing category). At those points the same SMS-noise-tolerant design applies. Keep the free-text opportunity limited — every free-text field increases session length.

**Cost structure:** USSD short codes (`*XXX#`) are leased per country per operator, typically several hundred to several thousand USD per year plus per-session charges. Aggregators like Africa's Talking wrap the short code leasing and give you a single API surface across countries; this is usually the right choice for anything below a very large-scale deployment.

## WhatsApp — rich, persistent, gated

**What WhatsApp is good for.** Consumer-facing chatbots that need media (images, voice notes, documents). Persistent conversations that survive across days or weeks. Rich UI patterns (quick-reply buttons, list menus, media carousels). Anything where the user is on a smartphone with data — which is a growing but non-universal share of the African market.

**What WhatsApp is bad for.** Rural, no-data, feature-phone users. Users who cannot afford the data bundle for the WhatsApp Business chat window (though WhatsApp bundles are cheap in many markets and often zero-rated by operators). One-off outbound notifications at very large scale (per-conversation-window pricing adds up).

**Design implications for NLP:**

- **Rich input surface.** Users send text, voice notes, images (a photo of a form, a hand-written question), documents, and locations. The NLP model has to handle multimodal input if the use case is anything other than pure text-chat.
- **Voice notes are ubiquitous** in African WhatsApp usage — often more natural for the user than typing, especially in code-switched conversation. Voice-to-text using MMS or Whisper (see [ASR Before You Start](../before-you-start/asr.md)) is a real design choice, not a research aside.
- **Business API access is gated** through Meta and its business solution providers. The application takes weeks; templates for outbound messages must be pre-approved; abuse controls are strict. Plan for this in the project schedule.
- **Template messages for outbound are pre-approved by Meta.** Anything with an NLP-generated body cannot be sent as an outbound-first message; NLP output only appears within an already-open 24-hour customer service window.
- **Language switching within a session is standard.** WhatsApp users routinely mix English/French/Arabic + a local language in a single conversation. The model must handle this as normal input, not as an edge case.

**Reference platforms:**

- **[WhatsApp Business API](https://business.whatsapp.com/products/business-platform)** — the direct route; requires a business solution provider (BSP).
- **[Twilio](https://www.twilio.com/whatsapp), [MessageBird](https://messagebird.com/products/whatsapp), [Vonage](https://www.vonage.com/communications-apis/messages/features/whatsapp/)** — BSPs with global reach.
- **[360dialog](https://www.360dialog.com/) and [Turn.io](https://www.turn.io/)** — specialised WhatsApp BSPs with strong support for social-impact and civic-tech deployments; Turn.io specifically was purpose-built for large-scale social-purpose messaging on WhatsApp.
- **[Africa's Talking WhatsApp](https://africastalking.com/whatsapp)** — combined SMS+USSD+WhatsApp for cross-channel deployments.

## The NLP problems these channels magnify

Across all three channels, the same set of NLP problems show up amplified:

1. **Language identification on short, noisy, code-switched input.** The dominant failure mode. A model that gets 95% LID accuracy on Wikipedia will get 60-70% on SMS. Train LID on real user text, or condition on metadata (region, prior turns).
2. **Robust input normalisation.** Users write phonetically, abbreviate freely, drop diacritics, mix scripts, and swap languages mid-sentence. The pipeline needs to survive this without silently mis-routing.
3. **Response length control.** SMS's 160-character hard limit means model outputs must be constrained at generation time. USSD's per-menu budget is similar. WhatsApp is unconstrained on length but rewards short responses in practice.
4. **Cost per interaction is user-visible or paid.** Unlike a web app where the marginal cost of a longer response is invisible, on these channels the cost is real. Design responses to minimise per-interaction billing.
5. **Voice as first-class input for WhatsApp.** Text-only design misses the largest natural interaction pattern on the channel. ASR quality (per the [ASR page](../before-you-start/asr.md)) becomes a deployment blocker.

## Anti-patterns to avoid

1. **Building on WhatsApp because the demo was easier**, when the user population is majority feature-phone. WhatsApp deployment excludes those users. If reach matters, design for USSD or SMS first.
2. **Assuming SMS or USSD input is in standard orthography.** It never is. Train on real user text or budget for aggressive input normalisation.
3. **Requiring perfect language identification at high accuracy** when the input is short, code-switched, and noisy. Design the downstream flow to degrade gracefully on LID uncertainty (offer language selection as a fallback).
4. **Long USSD menu trees.** Depth-first navigation runs out of session budget. Design flat and let the model route from a free-text field where possible.
5. **Ignoring diacritic loss.** A model whose outputs are semantically correct but drop tone marks may be actively misleading in Yoruba or Igbo. Handle diacritic reconstruction at the response layer if the channel character set drops them.
6. **Using outbound WhatsApp templates for anything that requires personalisation.** Templates are strict; the model output has to fit the template placeholder structure. Design around this.
7. **Not testing on real handsets and real network conditions.** Emulators do not exercise the character-encoding fallbacks, session timeouts, or delivery-order issues that matter in production.

## Where this connects to the rest of the playbook

- **Language identification** for code-switched short user input is a task that deserves its own Before-You-Start page once we can source enough public evaluation data; there is a gap here today.
- **Input normalisation** for SMS-noise text is part of the [data quality](../4_data-quality/index.md) chapter's scope; work on annotation guidelines that reflect real user text rather than clean-corpus text belongs there.
- **ASR quality** on WhatsApp voice notes is directly the [ASR chapter's](../before-you-start/asr.md) scope; the channel just moves ASR from "feature" to "deployment blocker."
- **Response-length control** is a training-time concern, not just a decoding-time one. Fine-tunes on short-response data (WhatsApp, SMS, Twitter-like text) generalise better to these channels than fine-tunes on long-form content.
- **Deployment for offline / patchy connectivity** ([the previous page](./offline.md)) applies to WhatsApp as much as to any other channel that requires a data connection.

## Further reading

- [Africa's Talking developer docs](https://developers.africastalking.com/) — the reference for SMS + USSD + WhatsApp cross-channel deployment across most of sub-Saharan Africa.
- [WhatsApp Business Platform docs](https://developers.facebook.com/docs/whatsapp) — Meta's official technical reference.
- [Turn.io case studies](https://www.turn.io/case-studies) — worked examples of large-scale WhatsApp deployments for social-impact use cases, including several in African languages.
- [GSMA Mobile Economy Sub-Saharan Africa report](https://www.gsma.com/mobileeconomy/sub-saharan-africa/) — the industry data on channel usage, connectivity, and handset mix; useful for scoping which channels reach which populations.
- [Kreutzer et al., 2022](https://aclanthology.org/2022.tacl-1.4/) — indirectly relevant: many of the low-resource-language corpus quality problems it identifies are magnified in SMS-style user-generated text.

---

**Contributor's note.** If you have shipped a production SMS, USSD, or WhatsApp deployment in an African language, the highest-value contribution here is a per-project note describing the language-identification approach you used, the noise patterns you had to normalise, and the cost realities of the channel at scale. Consider a [Case Studies](../case-studies/index.md) entry.
