---
sidebar_position: 1
ready: true
last_update:
  date: 2026-11-26
  author: Shamsuddeen Hassan Muhammad
---

# Deployment for African contexts

Most NLP deployment writing assumes a fibre connection, a GPU-backed cloud region a short round-trip away, a modern laptop or high-end phone, and a monolingual user typing in a standard spelling. **None of these assumptions holds across most African deployment surfaces.**

- **Connectivity is patchy or expensive.** About 36% of people in Africa use the Internet, against 74% of the world's population ([ITU, 2025](../references.md#itu-ff-2025)), and the cost of handsets and data is one of the main barriers to mobile internet use ([GSMA, 2025](../references.md#gsma-somic-2025)).
- **Devices are low-end.** Many users are on entry-level Android phones, including Android (Go edition), the lighter configuration of Android for low-RAM devices ([Android Developers, n.d.-a](../references.md#android-go)).
- **Users switch languages** within a single conversation.
- **The practical text-entry surface** is often SMS or WhatsApp, not a native app.

This chapter is opinionated deployment guidance for the surfaces where African-language NLP actually meets its users. It is not a general MLOps guide. For cloud deployment, latency budgets in the low hundreds of milliseconds and standard Kubernetes practice, use Chip Huyen's [*Designing Machine Learning Systems*](https://huyenchip.com/books/) or the cloud providers' own material. This chapter picks up where those leave off.

:::tip[Key points]

- Most African deployments face patchy or costly connectivity, low-end phones, code-switching users and SMS or WhatsApp input.
- Plan for these limits from the start: they shape model size, training data, evaluation sets and annotation guidelines.
- The chapter covers offline use, SMS/USSD/WhatsApp, edge devices, language switching and non-Latin scripts.
- It is not a general MLOps guide or a benchmark of model latency.

:::

## What this chapter covers

| Page | What it covers |
|---|---|
| [Offline and patchy-connectivity NLP](./offline.md) | Running the model on-device or from a local cache, syncing when a connection appears, and degrading gracefully when the network drops mid-session. |
| [SMS, USSD, and WhatsApp as NLP surfaces](./sms-ussd-whatsapp.md) | The three practical text-entry channels for hundreds of millions of African users (about 47% of Africa's population had a mobile subscription in 2024; [GSMA Intelligence, 2025](../references.md#gsma-me-africa-2025)), with the design implications and NLP problems of each. |
| [Edge devices and cheap-hardware inference](./edge-devices.md) | The phone tier map, quantised inference, on-device runtimes (whisper.cpp, llama.cpp, ONNX Runtime Mobile, MLC-LLM), battery and thermal limits, and single-board-computer edge servers. |
| [Multilingual switching within a session](./multilingual-switching.md) | Code-switching as an everyday interaction pattern: four granularities of switching, detection and response strategies, training implications, and UI patterns that make code-switched deployment usable. |
| [Non-Latin scripts in real UIs](./non-latin-scripts.md) | Ajami, Ge'ez, N'Ko, Tifinagh, Vai, and Latin with diacritics: Unicode support, font shipping, input methods, rendering pitfalls, search and normalisation, and testing. |

## Why this chapter belongs in a playbook, not a blog post

Deployment realities shape modelling decisions upstream. A team that will ship to Android Go should not fine-tune a 7B model. A team that will accept SMS input should not assume tone-mark diacritics. A team whose users code-switch should test on code-switched evaluation sets. These decisions cascade back through training data, evaluation set design, and even annotation guidelines. Keeping the deployment lens visible from the start prevents a lot of expensive rework at the end.

## What this chapter is not

- **Not a tutorial on any single cloud provider or MLOps tool.** Those change annually and are documented by the vendors.
- **Not a benchmark of quantised model latency.** Vendor-specific and out of date the moment it is published. When we need those numbers, we point at a live benchmark.
- **Not a critique of any particular platform.** Practical guidance, not commentary.

For the strategic reasoning behind this chapter (why the playbook adds a "Deployment for African contexts" section instead of writing a general deployment guide), see [**What this playbook is (and isn't)**](../1_introduction/scope-and-strategy.md).
