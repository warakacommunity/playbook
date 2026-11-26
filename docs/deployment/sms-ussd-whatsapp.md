---
sidebar_position: 3
title: SMS, USSD, and WhatsApp
ready: true
last_update:
  date: 2026-07-07
  author: Shamsuddeen Hassan Muhammad
---

# SMS, USSD, and WhatsApp

*Last reviewed: 2026-07-07.*

Many African mobile users reach digital services through SMS, USSD or WhatsApp rather than through native apps. In 2024, about 47% of Africa's population had a mobile subscription, but only about 28% used mobile internet ([GSMA Intelligence, 2025](../references.md#gsma-me-africa-2025)). SMS and USSD work on any GSM phone without a data connection, so they reach the people a data-only app misses.

Checking a bank balance, receiving a health reminder, applying for a service, asking a government helpline a question: these interactions often happen on one of the three channels. An NLP system that aims for real reach in Africa lands here. One designed only for a native app with a full keyboard will miss many of its intended users.

This page is a practical guide to the three channels: what each is good for, what breaks NLP models on them, and the design choices that separate a chatbot that ships from a demo that never gets adopted.

:::tip[Key points]

- Choose the channel your users are actually on: SMS and USSD reach any GSM phone, WhatsApp needs a smartphone and data.
- Fit every response to the channel's character limit at generation time; tone marks and special letters can force a much shorter limit.
- Expect short, abbreviated, code-switched input without diacritics; language identification is the main failure point.
- On WhatsApp, plan for voice notes, Meta's business approval and template rules from the start.
- Test on real handsets and real networks, not emulators.

:::

## The three channels compared

| Property | SMS | USSD | WhatsApp |
| --- | --- | --- | --- |
| Handset required | Any GSM phone | Any GSM phone | Smartphone |
| Data connection required | No | No | Yes |
| Session model | Store-and-forward, asynchronous | Real-time, session-based (operator timeouts, often 120–180 s per session) | Persistent, asynchronous |
| Cost model per interaction | Per SMS (fractions of a cent to a few cents) | Per session (variable by operator + country) | Per message (WhatsApp Business Platform pricing) |
| Media support | Text only, 160 chars per SMS | Text only, up to 182 chars per screen | Text, images, audio, video, documents, buttons |
| Language / character set | GSM-7 (7-bit, a few Western European accents, no tone marks or underdots) or UCS-2 (70 chars per SMS) | GSM-7 or UCS-2 | Full Unicode |
| Offline for the user | Effectively yes | Yes | No (requires data) |
| Access pattern | Push-and-pull | Pull only (user dials `*XXX#`) | Both, but push messages are template-restricted |
| Language switching mid-session | Trivial (each message independent) | Restricted by menu depth | Full |

The SMS and USSD character limits come from the GSM alphabet specification ([ETSI, 2000](../references.md#etsi-ts-123038)), though some operators accept fewer than 182 characters per USSD screen ([Clickatell, n.d.](../references.md#clickatell-ussd)); USSD session limits are set by each operator ([ITU, 2017](../references.md#itu-dfs-2017)); WhatsApp pricing and messaging rules are Meta's ([Meta, n.d.-a](../references.md#meta-whatsapp-pricing)). Check current figures with your aggregator or provider.

Each channel serves a different user need. Design for the channel your users are actually on, not the one the demo was easiest to build for.

## SMS: asynchronous, universal, character-poor

**What SMS is good for.** One-shot outbound notifications (appointment reminders, exam results, market prices, weather alerts). Inbound short reports (crop condition, health check-in). Any use case where the transaction is *complete in one message each way* and the recipient does not need to be online.

**What SMS is bad for.** Multi-turn dialog. Complex information exchange. Anything requiring diacritics: the GSM-7 default alphabet has only a few Western European accented letters, and none of the tone marks, underdots and hooked letters load-bearing in Yorùbá, Igbo, Hausa and many other African languages. Falling back to UCS-2 works, but cuts a single SMS from 160 to 70 characters ([ETSI, 2000](../references.md#etsi-ts-123038)), so the same text needs more billed messages.

**NLP design implications:**

- **Every response must fit in 160 GSM-7 characters or 70 UCS-2 characters** ([ETSI, 2000](../references.md#etsi-ts-123038)). Multi-SMS responses are technically supported but each part is billed, and parts can arrive separately or out of order on some handsets and networks. Design the model output length limit at generation time; do not truncate after the fact.
- **User input is heavily abbreviated, code-switched, and often has no diacritics.** A model expecting clean orthography will fail on inputs like `"i wnt 2 knw d price of maiz"`, `"kabari za soko?"` (Swahili), `"anyi na-agu ihe"` (Igbo). Train and evaluate on real SMS-noise text, not on clean corpora.
- **Language identification (LID) is one of the hardest problems.** The same phone number may send `"hello"`, `"karibu"`, `"how much?"`, and `"bei ni ngapi?"` on consecutive days. See [the problems these channels magnify](#the-nlp-problems-these-channels-magnify) for why benchmark LID scores mislead here and what to use instead.
- **No formatting.** No bold, no bullet points, no links that most feature phones can open. Response design is prose only.

**Reference platforms and aggregators:**

- **[Africa's Talking](https://africastalking.com/)**: a pan-African SMS + USSD aggregator with a single API across many countries; a common choice for cross-country SMS deployment.
- **[Twilio](https://www.twilio.com/)**: global SMS with African coverage; compare its per-message prices with local aggregators, but it is familiar to many teams coming from a US/EU background.
- **[MTN](https://developers.mtn.com/), [Airtel](https://developers.airtel.africa/), [Vodacom](https://vodacombusiness.co.za/) aggregator APIs**: direct-to-operator, cheaper at scale, more setup effort per country.

## USSD: session-based, universal, menu-driven

**What USSD is good for.** Menu-driven interactions where the flow is predictable: money transfer, service subscription, balance check, structured data collection (crop yields, health survey), voter registration. Government services with well-defined transaction shapes.

**What USSD is bad for.** Open-ended conversation. Anything requiring more than ~30 seconds of thought per menu. Anything the user needs to reference later, because USSD sessions leave no record on the handset.

**Design implications for NLP:**

- **USSD is mostly not NLP.** The interaction is menu-based (`1`. Send money `2`. Check balance `3`. Airtime); the "NLP" component is usually only in service naming and message-string localisation. Design the flow as a state machine and the localisation as a translation catalogue.
- **Session timeouts are aggressive.** The USSD specification allows sessions of up to 600 seconds, but operators typically give third-party services up to 180 seconds, with 120 seconds a typical maximum for the whole session ([ITU, 2017](../references.md#itu-dfs-2017)); some also time out a single screen if the user takes too long to answer. Menu depth and text length both matter; a long welcome message eats the session budget.
- **Each menu screen holds up to 182 GSM-7 characters** including the numbered options ([ETSI, 2000](../references.md#etsi-ts-123038)), and some operators accept fewer, so aim for about 160 ([Clickatell, n.d.](../references.md#clickatell-ussd)). Design copy to fit.
- **Handsets are inconsistent.** Older Nokia and Symbian feature phones display USSD differently from modern KaiOS and Android USSD popups. Test on real handsets across the low end.
- **Diacritics are as constrained as SMS**; falling back to UCS-2 shortens the per-menu character budget further. Prefer diacritic-free rendering for the options-list layer even if the payload data is diacritic-preserving.
- **NLP can enter USSD flows** at the free-text field level ("*What is your complaint?*" text-entry, followed by a classification into a routing category). At those points the same SMS-noise-tolerant design applies. Keep the free-text opportunity limited, because every free-text field increases session length.

**Cost structure:** USSD short codes (`*XXX#`) are leased per country and per operator, usually with a set-up or recurring fee plus per-session charges; prices vary widely by country, so get quotes early. Aggregators like Africa's Talking wrap the short code leasing and give you a single API surface across countries; this is usually the right choice for anything below a very large-scale deployment.

## WhatsApp: rich, persistent, gated

**What WhatsApp is good for.** Consumer-facing chatbots that need media (images, voice notes, documents). Persistent conversations that survive across days or weeks. Rich UI patterns (quick-reply buttons, list menus, media carousels). Anything where the user is on a smartphone with data, which is a growing but far from universal share of the African market (see the mobile-internet figure at the top of this page).

**What WhatsApp is bad for.** Rural, no-data, feature-phone users. Users who cannot afford the data bundle for the WhatsApp Business chat window (though WhatsApp bundles are cheap in many markets and sometimes zero-rated by operators). One-off outbound notifications at very large scale: since July 2025, business-initiated template messages are charged per message ([Meta, n.d.-a](../references.md#meta-whatsapp-pricing)), and the cost adds up.

**Design implications for NLP:**

- **Rich input surface.** Users send text, voice notes, images (a photo of a form, a hand-written question), documents, and locations. The NLP model has to handle multimodal input if the use case is anything other than pure text-chat.
- **Voice notes are common** in WhatsApp usage, often more natural for the user than typing, especially in code-switched conversation. Voice-to-text using MMS or Whisper (see [ASR chapter](../asr/index.md)) is a real design choice, not a research aside.
- **Business access is gated** by Meta: you need a Meta business portfolio, a WhatsApp business account and approved message templates, whether you integrate with Meta's Cloud API yourself or through a business solution provider (BSP). Each template is reviewed before use, which can take up to 24 hours ([Meta, n.d.-b](../references.md#meta-whatsapp-templates)), and abuse controls are strict. Plan for set-up time in the project schedule.
- **Outside the customer service window, only approved templates can be sent.** The window lasts 24 hours from the user's last message or call; outside it, the business can send only template messages ([Meta, n.d.-a](../references.md#meta-whatsapp-pricing)). Free-form NLP output can therefore only go out while the window is open; a business-initiated message must use an approved template, with model output limited to its placeholders.
- **Language switching within a session is standard.** WhatsApp users routinely mix English/French/Arabic + a local language in a single conversation. The model must handle this as normal input, not as an edge case.

**Reference platforms:**

- **[WhatsApp Business Platform](https://business.whatsapp.com/products/business-platform)**: Meta's Cloud API, which you can integrate directly or through a business solution provider (BSP).
- **[Twilio](https://www.twilio.com/whatsapp), [Bird (formerly MessageBird)](https://messagebird.com/products/whatsapp), [Vonage](https://www.vonage.com/communications-apis/messages/features/whatsapp/)**: BSPs with global reach.
- **[360dialog](https://www.360dialog.com/) and [Turn.io](https://www.turn.io/)**: specialised WhatsApp BSPs with strong support for social-impact and civic-tech deployments; Turn.io specifically was purpose-built for large-scale social-purpose messaging on WhatsApp.
- **[Africa's Talking WhatsApp](https://africastalking.com/whatsapp)**: combined SMS+USSD+WhatsApp for cross-channel deployments.

## The NLP problems these channels magnify

Across all three channels, the same NLP problems show up amplified:

1. **Language identification on short, noisy, code-switched input.** The dominant failure mode. LID accuracy measured on clean benchmark text does not carry over to real user text: in a web-crawl study, models that scored well on held-out test sets produced corpora that human judges found only about 5% correct for many lower-resource languages ([Caswell et al., 2020](../references.md#caswell-2020)). Start from LID built for African languages, such as AfroLID ([Adebara et al., 2022](../references.md#afrolid-2022)); measure it on a sample of your own messages; train it on real user text; or condition on metadata (region, prior turns).
2. **Robust input normalisation.** Users write phonetically, abbreviate freely, drop diacritics, mix scripts, and swap languages mid-sentence. The pipeline needs to survive this without silently mis-routing.
3. **Response length control.** SMS's 160-character hard limit means model outputs must be constrained at generation time. USSD's per-menu budget is similar. WhatsApp is unconstrained on length but rewards short responses in practice.
4. **Cost per interaction is user-visible or paid.** Unlike a web app where the marginal cost of a longer response is invisible, on these channels the cost is real. Design responses to minimise per-interaction billing.
5. **Voice as first-class input for WhatsApp.** Text-only design misses one of the most natural interaction patterns on the channel. ASR quality (per the [ASR page](../asr/index.md)) becomes a deployment blocker.

## Anti-patterns to avoid

1. **Building on WhatsApp because the demo was easier**, when the user population is majority feature-phone. WhatsApp deployment excludes those users. If reach matters, design for USSD or SMS first.
2. **Assuming SMS or USSD input is in standard orthography.** It rarely is. Train on real user text or budget for aggressive input normalisation.
3. **Requiring perfect language identification at high accuracy** when the input is short, code-switched, and noisy. Design the downstream flow to degrade gracefully on LID uncertainty (offer language selection as a fallback).
4. **Long USSD menu trees.** Depth-first navigation runs out of session budget. Design flat and let the model route from a free-text field where possible.
5. **Ignoring diacritic loss.** A model whose outputs are semantically correct but drop tone marks may be actively misleading in Yorùbá or Igbo. Handle diacritic reconstruction at the response layer if the channel character set drops them; automatic diacritic restoration has been studied for Yorùbá, for example as a translation task from undiacritised to diacritised text ([Orife, 2018](../references.md#orife-2018)).
6. **Using outbound WhatsApp templates for anything that requires personalisation.** Templates are strict; the model output has to fit the template placeholder structure. Design around this.
7. **Not testing on real handsets and real network conditions.** Emulators do not exercise the character-encoding fallbacks, session timeouts, or delivery-order issues that matter in production.

## Where this connects to the rest of the playbook

- **Language identification** for code-switched short user input is a task that deserves its own Before-You-Start page once we can source enough public evaluation data; there is a gap here today.
- **Input normalisation** for SMS-noise text is part of the [data quality](../4_data-quality/index.md) chapter's scope; work on annotation guidelines that reflect real user text rather than clean-corpus text belongs there.
- **ASR quality** on WhatsApp voice notes is directly the [ASR chapter's](../asr/index.md) scope; the channel just moves ASR from "feature" to "deployment blocker."
- **Response-length control** is a training-time concern, not just a decoding-time one. As a working assumption, fine-tuning on short-response data (WhatsApp, SMS, Twitter-like text) suits these channels better than fine-tuning on long-form content; test this on your own channel data.
- **Deployment for offline / patchy connectivity** ([Offline and patchy-connectivity NLP](./offline.md)) applies to WhatsApp as much as to any other channel that requires a data connection.

## Further reading

- [Africa's Talking developer docs](https://developers.africastalking.com/): developer documentation for SMS, USSD and other channels through a single pan-African API.
- [WhatsApp Business Platform docs](https://developers.facebook.com/docs/whatsapp): Meta's official technical reference, including pricing ([Meta, n.d.-a](../references.md#meta-whatsapp-pricing)) and message templates ([Meta, n.d.-b](../references.md#meta-whatsapp-templates)).
- [Turn.io case studies](https://www.turn.io/case-studies): worked examples of large-scale WhatsApp deployments for social-impact use cases.
- AfroLID ([Adebara et al., 2022](../references.md#afrolid-2022)): a language identifier covering 517 African languages and varieties, a starting point for routing multilingual messages.
- Kreutzer et al.'s audit of web-crawled multilingual corpora ([Kreutzer et al., 2022](../references.md#kreutzer-2022)): indirectly relevant, since many of the low-resource-language corpus quality problems it identifies are magnified in SMS-style user-generated text.

---

**Contributor's note.** If you have shipped a production SMS, USSD, or WhatsApp deployment in an African language, the highest-value contribution here is a per-project note describing the language-identification approach you used, the noise patterns you had to normalise, and the cost realities of the channel at scale. Consider a [Case Studies](../case-studies/index.md) entry.
