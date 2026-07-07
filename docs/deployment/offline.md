---
sidebar_position: 2
title: Offline and patchy connectivity
last_update:
  date: 2026-07-07
  author: Idris Abdulmumin
---

# Offline and patchy-connectivity NLP

*Last reviewed: 2026-07-07.*

The offline case is not exotic. On [ITU 2024 figures](https://www.itu.int/en/ITU-D/Statistics/Pages/facts/default.aspx), around 37% of the world's population is still unconnected, and connectivity within Africa is heavily unequal — urban fibre coexists with rural mobile connections that are metered by the megabyte and drop several times per hour. Any deployment that assumes a steady round-trip to a cloud region will fail invisibly for a large share of its intended users. The failure mode is silent: the app opens, the user tries to interact, nothing happens, and the user closes the app and does not come back. This page is about designing so that does not happen.

## The three connectivity classes to design for

Every African-language deployment has to answer this question up-front: *which of these three classes is my product actually going to serve?*

1. **Steady, unmetered connectivity.** Urban fibre, campus Wi-Fi, home broadband. Design as you would for any cloud-hosted app.
2. **Metered mobile connectivity.** 3G/4G/5G paid per megabyte, often prepaid, often bundled cheaply for specific apps (Free Basics, MTN Ayoba, WhatsApp bundles) but expensive for everything else. The user is intensely aware of data cost. Design for **small payloads, cached models, and no background refresh**.
3. **Patchy or offline.** Connectivity comes and goes multiple times per hour, or the user has no connectivity for hours or days at a time. Design for **local-first**: the model runs on-device, the app is fully usable offline, and sync happens opportunistically.

Deciding this correctly at project kickoff shapes every downstream decision — model size, evaluation targets, UI patterns, error messages. Getting it wrong is one of the two most common causes of "great in the lab, dead in the field" African NLP products.

## The local-first design pattern

The pattern that consistently ships in low-connectivity deployments is **local-first**: the model is bundled with the app or downloaded once when connectivity is good, and every subsequent interaction runs locally. Sync (of new data, updated models, or logs) is opportunistic and never blocks a user action.

### What "local-first" means in practice

- **Model runs on-device.** For text classification, NER, sentiment, small MT, and simple ASR, this is now feasible with quantised sub-1B models. For larger models (NLLB-200 distilled, medium ASR), on-device is possible on newer phones but tight.
- **The user can open the app, use it, close it, and reopen it — with no network — and every core action works.** Login, task selection, model inference, saving a result, browsing history. If any of these blocks on the network, the pattern is broken.
- **New writes queue in a durable local store** (SQLite, IndexedDB, or a file journal) and drain when connectivity returns. See the [outbox pattern](https://microservices.io/patterns/data/transactional-outbox.html) for the reference architecture.
- **Sync is idempotent.** Every queued write carries an application-generated unique ID; the server treats duplicates as no-ops. This handles the case where the client thought the sync failed but the server actually received the write.
- **Model updates are staged, versioned, and rollback-safe.** A phone that failed mid-download does not end up with a corrupt model on next launch.

### What breaks if you skip local-first

- The user opens the app on a spotty connection, tries to log in, hits a spinner, and closes the app. Never returns.
- The user completes a task, hits "save", the server never receives it, and the user loses the work.
- A model update fails halfway, the app crashes on next open, the user uninstalls.
- The evaluation looks fine because the evaluation is on connected devices in a connected office, and the failure mode never surfaces until deployment.

## Model size budget

For on-device inference on the phones actually used in African contexts, budget:

- **Android Go / entry-level Android** (2 GB RAM, ARM Cortex-A53 class): under 200 MB model on disk, under 100 MB in RAM, no GPU, inference in tens to hundreds of milliseconds per short sentence. Distilled sub-100M-parameter models, quantised to INT8, are the target.
- **Mid-range Android** (4-6 GB RAM, ARM Cortex-A75 class): under 800 MB model on disk, under 400 MB in RAM, NNAPI available on newer devices. Distilled 600M-parameter models are feasible with careful quantisation.
- **High-end Android and modern iOS**: models over 1 GB are possible but the download itself becomes a UX problem. Consider streaming download over Wi-Fi only, and never over a metered connection without explicit consent.

The right question is not "will it fit"; it is "how do we tell the user how much data they are about to spend, and on what". Every download over Wi-Fi is close to free; every download over metered mobile is a decision the user should make consciously.

## Model download UX — the part that gets ignored

Model downloads are the single most-underdesigned surface in African-context NLP apps. The pattern that works:

- **Ask for Wi-Fi before starting.** Detect connection type; if the user is on metered mobile, warn about data cost in absolute terms ("This model is 340 MB, which is roughly the cost of 2 hours of YouTube video on your plan"), and default to "not now".
- **Show a progress bar with an accurate ETA.** Not a spinner. Users on slow connections need to know whether to leave the phone downloading or come back later.
- **Make it resumable.** A dropped connection at 80% of a 340 MB download must not restart from zero. Range-request support is not optional.
- **Make it cancellable.** Without penalty. A user who cancels a download should be able to try again later with no state to clean up.
- **Verify integrity before use.** Check a hash. A truncated model on disk that "loaded fine" and then crashed the app on first inference is a real failure mode.

## Evaluation for offline deployments

The evaluation set for an offline deployment should include:

- **A model-on-device latency measurement** on the target hardware class. Not a laptop benchmark. Run inference on the actual phone tier you are targeting; publish the p50 and p95 latency separately.
- **A test on the actual quantised model**, not the un-quantised training checkpoint. Quantisation can degrade quality by 2-8 chrF points on translation; measure it, do not assume it.
- **A round-trip test with the sync pipeline off.** Complete a task, close the app, reopen it a day later with no network, confirm the queued write is still there and drains cleanly on next connection.
- **A battery-and-heat measurement.** On-device inference on entry-level phones is thermally noticeable. If your app runs the model 50 times per session and drains 30% battery, users will notice and stop opening it.

## Anti-patterns to avoid

- **"We'll add offline support later."** The data model has to support it from day one. Retrofitting local-first onto an app that assumed steady connectivity is a rewrite, not a feature.
- **"The user can retry on a better connection."** In practice they will not. They will close the app and use a competitor's Free-Basics-bundled product.
- **"We'll cache aggressively."** Caching is not the same as local-first. If any core action requires a network round-trip and cannot degrade gracefully, the app will fail for a large fraction of your intended users.
- **"We'll ship a big model to newer phones and a small one to older phones."** Splits the codebase and doubles the QA surface. Prefer one small, well-optimised model that runs everywhere over two models that each fail on the other tier.
- **Testing exclusively on office Wi-Fi.** Genuinely test on a phone with mobile data on a spotty connection, with the router deliberately unplugged mid-session. Every offline app that ever failed in the field was tested exclusively on Wi-Fi first.

## Further reading

- [Meta MMS on-device speech recognition writeup](https://ai.meta.com/blog/multilingual-model-speech-recognition/) — Meta's technical report on the constraints and compromises of on-device multilingual ASR.
- [The Progressive Web App offline pattern](https://web.dev/learn/pwa/offline/) — the web-side of the same design pattern, useful when the deployment surface is a PWA rather than a native app.
- [ITU Facts and Figures 2024](https://www.itu.int/en/ITU-D/Statistics/Pages/facts/default.aspx) — the current global connectivity statistics and the source of the "37% unconnected" number.
- [Kreutzer et al., 2022 — quality of low-resource web crawls](https://aclanthology.org/2022.tacl-1.4/) — indirectly relevant: many of the quality issues in low-resource models are magnified when the model then runs on-device with no server-side quality filter to catch them.

---

**Contributor's note.** This is the first real page in the deployment chapter. If you are adding SMS/USSD, edge-device, multilingual-switching, or non-Latin-script pages, mirror the structure — *the class(es) to design for / the pattern that works / the anti-patterns to avoid* — and keep the practical, opinionated stance. Deployment guidance that fails to take a position is not useful.
