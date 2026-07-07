---
sidebar_position: 1
---

# Deployment for African contexts

*The chapter that nobody else writes.*

Most NLP deployment writing assumes a fibre connection, a GPU-backed cloud region a short round-trip away, a modern laptop or high-end phone, and a monolingual user typing standard-orthography input. **None of these assumptions hold across the majority of African deployment surfaces.** Connectivity is patchy or expensive; a large share of interactions happen on Android Go phones with 2 GB of RAM; users switch languages within a single conversation; and the practical text-entry surface is often SMS or WhatsApp, not a native app. Deployment writing that ignores this is written for someone else's market.

This chapter is opinionated deployment guidance for the surfaces where African-language NLP actually meets its users. It is not a general MLOps guide — for cloud deployment, latency budgets in low-hundreds-of-milliseconds, and standard-issue Kubernetes practice, use [ML Systems (Chip Huyen)](https://huyenchip.com/ml-interviews-book/) or the cloud providers' own material. This chapter picks up where those leave off.

## What this chapter covers

- **[Offline and patchy-connectivity NLP](./offline.md)** — the design pattern where the model runs on-device or in a locally-cached scenario, syncs opportunistically, and degrades gracefully when the network drops mid-session. *Available now.*
- **[SMS, USSD, and WhatsApp as NLP surfaces](./sms-ussd-whatsapp.md)** — the three practical text-entry channels for hundreds of millions of African users, with channel-by-channel design implications and NLP problems each magnifies. *Available now.*
- **[Edge devices and cheap-hardware inference](./edge-devices.md)** — the phone tier map, quantised model inference, on-device runtimes (whisper.cpp / llama.cpp / ONNX Runtime Mobile / MLC-LLM), battery and thermal realities, single-board-computer edge servers. *Available now.*
- **Multilingual switching within a session** — real users routinely code-switch across two or three languages in one conversation. Model behaviour and UI behaviour both need to handle this without a "language picker" round-trip. Coming next.
- **Non-standard scripts in real UIs** — Ajami (Arabic-script Hausa/Wolof/Fulani), Ge'ez (Amharic/Tigrinya/Tigre), N'Ko (Manding), and the ongoing question of orthographic variants within a single language. Coming next.

## Why this chapter belongs in a playbook, not a blog post

Deployment realities shape modelling decisions upstream. A team that will ship to Android Go should not fine-tune a 7B model. A team that will accept SMS input should not assume tone-mark diacritics. A team whose users code-switch should test on code-switched evaluation sets. These decisions cascade back through training data, evaluation set design, and even annotation guidelines. Keeping the deployment lens visible from the start prevents a lot of expensive rework at the end.

## What this chapter is not

- **Not a tutorial on any single cloud provider or MLOps tool.** Those change annually and are documented by the vendors.
- **Not a benchmark of quantised model latency.** Vendor-specific and out of date the moment it is published. When we need those numbers, we point at a live benchmark.
- **Not a critique of any particular platform.** Practical guidance, not commentary.

For the strategic reasoning behind this chapter — why the playbook adds a "Deployment for African contexts" section instead of writing a general deployment guide — see [**What this playbook is (and isn't)**](../1_introduction/scope-and-strategy.md).
