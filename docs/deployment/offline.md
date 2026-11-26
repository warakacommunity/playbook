---
sidebar_position: 2
title: Offline and patchy connectivity
ready: true
last_update:
  date: 2026-07-07
  author: Shamsuddeen Hassan Muhammad
---

# Offline and patchy connectivity

*Last reviewed: 2026-07-07.*

The offline case is not exotic. On ITU figures for 2025, more than a quarter of the world's population is still offline, and average Internet use in Africa is just 36% ([ITU, 2025](../references.md#itu-ff-2025)). Connectivity within Africa is also very unequal: urban fibre sits next to rural mobile connections that are metered by the megabyte and can drop several times in one session.

Any deployment that assumes a steady round-trip to a cloud server will fail for a large share of its intended users, and it fails silently. The app opens, the user tries to use it, nothing happens, and the user closes the app and does not come back. This page is about designing so that this does not happen.

:::tip[Key points]

- Decide at kickoff which connectivity class your users are in: steady, metered, or patchy and offline.
- For patchy or offline users, build local-first: the model runs on the device and every core action works with no network.
- Treat model downloads as a design surface: Wi-Fi first, resumable, cancellable and checked before use.
- Evaluate the quantised model on the target phone, with native speakers, and with the network switched off.

:::

## The three connectivity classes to design for

Every African-language deployment has to answer this question up front: *which of these three classes is my product actually going to serve?*

| Class | What it looks like | Design for |
| --- | --- | --- |
| **1. Steady, unmetered** | Urban fibre, campus Wi-Fi, home broadband. | A normal cloud-hosted app. |
| **2. Metered mobile** | 3G/4G/5G paid per megabyte, often prepaid. Often cheap for specific bundled apps (Free Basics, MTN Ayoba, WhatsApp bundles) but expensive for everything else. The user watches every megabyte. | **Small payloads, cached models, no background refresh.** |
| **3. Patchy or offline** | The connection comes and goes several times an hour, or is absent for hours or days. | **Local-first**: the model runs on the device, the app works fully offline, and sync happens when it can. |

This decision, made at project kickoff, shapes everything after it: model size, evaluation targets, UI patterns and error messages. In our experience, getting it wrong is one of the most common reasons African NLP products are "great in the lab, dead in the field".

## The local-first design pattern

The pattern that consistently ships in low-connectivity deployments is **local-first**. The model is bundled with the app, or downloaded once when the connection is good, and every later interaction runs locally. Sync (of new data, updated models or logs) happens when it can and never blocks a user action.

The term comes from software research, where local-first apps treat the copy of the data on the device as the primary copy and servers hold secondary copies that help sync between devices ([Kleppmann et al., 2019](../references.md#kleppmann-2019)). The same pattern underlies data collection and annotation tools that work offline; for the project-side decisions that go with it (whether data may stay on devices, conflicts, work that arrives late), see [Offline Field Operations](../2_data-collection/10_offline-field-operations.md).

### What "local-first" means in practice

- **Model runs on-device.** For text classification, NER, sentiment, small MT, and simple ASR, this is now feasible with quantised sub-1B models. For larger models (NLLB-200 distilled, medium ASR), on-device is possible on newer phones but tight.
- **The user can open the app, use it, close it, and reopen it, with no network, and every core action works.** Login, task selection, model inference, saving a result, browsing history. If any of these blocks on the network, the pattern is broken.
- **New writes queue in a durable local store** (SQLite, IndexedDB, or a file journal) and drain when connectivity returns. See the [outbox pattern](https://microservices.io/patterns/data/transactional-outbox.html) for the reference architecture.
- **Sync is idempotent.** Every queued write carries an application-generated unique ID; the server treats duplicates as no-ops. This handles the case where the client thought the sync failed but the server actually received the write.
- **Model updates are staged, versioned, and rollback-safe.** A phone that failed mid-download does not end up with a corrupt model on next launch.

### What breaks if you skip local-first

- The user opens the app on a spotty connection, tries to log in, hits a spinner, and closes the app. Never returns.
- The user completes a task, hits "save", the server never receives it, and the user loses the work.
- A model update fails halfway, the app crashes on next open, the user uninstalls.
- The evaluation looks fine because the evaluation is on connected devices in a connected office, and the failure mode never surfaces until deployment.

## Model size budget

On-device budgets by phone tier (disk, RAM and the models that fit) are on [Edge devices](./edge-devices.md#the-phone-tier-map-the-deployment-surface). What matters here is the connection the model travels over:

- **Download large models over Wi-Fi by default.** Never download over a metered connection without the user's explicit consent.
- **Say what it will cost.** For a connectivity-constrained user, the right question is not "will it fit"; it is "how do we tell the user how much data they are about to spend, and on what". A download over Wi-Fi is close to free; a download over metered mobile data is a decision the user should make consciously.

## Model download UX: the part that gets ignored

In our experience, model downloads are one of the most under-designed parts of African-context NLP apps. The pattern that works:

- **Ask for Wi-Fi before starting.** Detect the connection type. If the user is on metered mobile data, state the cost in absolute terms ("This model is 340 MB; downloading it now will use 340 MB of your mobile data"), and make "not now" the default.
- **Show a progress bar with an accurate ETA.** Not a spinner. Users on slow connections need to know whether to leave the phone downloading or come back later.
- **Make it resumable.** A dropped connection at 80% of a 340 MB download must not restart from zero. Range-request support is not optional: the server must accept HTTP range requests, which it advertises with an `Accept-Ranges` header ([MDN Web Docs, 2026b](../references.md#mdn-range-requests)).
- **Make it cancellable.** Without penalty. A user who cancels a download should be able to try again later with no state to clean up.
- **Verify integrity before use.** Check a hash. A truncated model on disk that "loaded fine" and then crashed the app on first inference is a real failure mode.

## Evaluation for offline deployments

The evaluation set for an offline deployment should include:

- **A model-on-device latency measurement** on the target hardware class. Not a laptop benchmark. Run inference on the actual phone tier you are targeting; publish the p50 and p95 latency separately.
- **A test on the actual quantised model**, not the training checkpoint, on your languages and with native-speaker review. Quantisation damage is uneven across languages ([Marchisio et al., 2024](../references.md#marchisio-2024); see [compute-poor](../compute-poor/index.md#quantisation-the-deployment-lever)).
- **A round-trip test with the sync pipeline off.** Complete a task, close the app, reopen it a day later with no network, confirm the queued write is still there and drains cleanly on next connection.
- **A battery-and-heat measurement.** On-device inference on entry-level phones is thermally noticeable. If your app runs the model 50 times per session and drains 30% battery, users will notice and stop opening it.

## Anti-patterns to avoid

- **"We'll add offline support later."** The data model has to support it from day one. Retrofitting local-first onto an app that assumed steady connectivity is a rewrite, not a feature.
- **"The user can retry on a better connection."** In practice they will not. They will close the app and use a competitor's Free-Basics-bundled product.
- **"We'll cache aggressively."** Caching is not the same as local-first. If any core action requires a network round-trip and cannot degrade gracefully, the app will fail for a large fraction of your intended users.
- **"We'll ship a big model to newer phones and a small one to older phones."** Splits the codebase and doubles the QA surface. Prefer one small, well-optimised model that runs everywhere over two models that each fail on the other tier.
- **Testing exclusively on office Wi-Fi.** Genuinely test on a phone with mobile data on a spotty connection, with the router deliberately unplugged mid-session. Testing only on Wi-Fi is how offline failures stay hidden until launch.

## Further reading

- [Kleppmann et al., 2019](../references.md#kleppmann-2019): the original statement of local-first software, including offline editing and how to resolve sync conflicts.
- [Pratap et al., 2023](../references.md#pratap-2023): Meta's Massively Multilingual Speech (MMS) project, with speech recognition, speech synthesis and language identification models for over 1,100 languages. A starting point for multilingual speech, though its models usually need distilling or quantising before they fit an entry-level phone.
- [Offline data for Progressive Web Apps](https://web.dev/learn/pwa/offline-data): the web side of the same design pattern (IndexedDB, Cache Storage, persistent storage), useful when the deployment surface is a PWA rather than a native app.
- [ITU, 2025](../references.md#itu-ff-2025): current global and regional Internet-use statistics, the source of the connectivity figures on this page.
- [Marchisio et al., 2024](../references.md#marchisio-2024): how quantisation affects multilingual models, and why automatic metrics are not enough to check it.
- [Kreutzer et al., 2022](../references.md#kreutzer-2022). Indirectly relevant: many of the quality issues in low-resource models are magnified when the model then runs on-device with no server-side quality filter to catch them.

---

**Contributor's note.** If you add a page to the deployment chapter, mirror this page's structure (*the classes to design for / the pattern that works / the anti-patterns to avoid*) and keep the practical, opinionated stance. Deployment guidance that does not take a position is not useful.
