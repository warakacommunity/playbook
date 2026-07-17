---
title: "How the mobile app works"
sidebar_label: "Architecture"
sidebar_position: 3
description: "What Capacitor / thin-client / cloud-first means for the mobile app — the relationship between iOS, Android, desktop, and the cloud."
mdx:
  format: md
---

# How the mobile app works

The mobile app **is not a separate codebase** that re-implements
AfriAnnotate's features in Swift / Kotlin. It's a thin native
wrapper around the **same React SPA** that powers the web at
[label.afriannotate.org](https://label.afriannotate.org).

This page explains the architecture — useful when you're trying to
understand why a feature that ships on web "also" ships on mobile
without any per-platform work, or why a mobile-specific bug almost
always turns out to be a SPA or backend bug.

## The big picture

```
                ┌────────────────────────────────┐
                │  cloud Django + SPA + DB       │
                │  https://label.afriannotate.org      │
                └────────────┬───────────────────┘
                             │ HTTPS + JWT
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────▼─────┐ ┌──────▼─────┐ ┌──────▼──────┐
     │ Web browser  │ │ iOS app    │ │ Android app │
     │ (SPA direct) │ │ (Capacitor │ │ (Capacitor  │
     │              │ │  WKWebView)│ │  WebView)   │
     └──────────────┘ └────────────┘ └─────────────┘
```

- **One backend** — the same Django + PostgreSQL + cloud storage
  cluster handles every client. There's no per-platform API; mobile
  and web both call `/api/projects/...`, `/api/annotations/...`, and
  so on.
- **One SPA bundle** — the same React app webpacked from
  `web/apps/labelstudio/`. Mobile builds copy this exact bundle into
  the Capacitor wrapper.
- **Different shells** — iOS gets a `WKWebView` wrapped in a Swift
  app; Android gets a Chromium-derived `WebView` wrapped in a Kotlin
  app; web gets a regular browser. All three render the same SPA.

## Why thin-client?

Three reasons:

1. **Feature parity is free.** A new screen in the SPA appears on
   web, iOS, and Android the next time you upload a build to each.
   No "we need to port this to iOS" work.
2. **Mobile is a tiny fraction of users for an annotation platform.**
   Most labelling happens on a laptop with a keyboard + a real mouse.
   The mobile app is for field annotators, on-call reviewers, etc. —
   a small audience that doesn't justify a parallel codebase.
3. **Cloud-first writes match how teams already operate.** Every
   annotation goes to the cloud, every export comes from the cloud.
   A native app with its own database would have to solve sync —
   instead the WebView talks directly to the cloud, and offline
   support is layered on as a thin IndexedDB outbox in the SPA, not
   per-platform native code.

The tradeoff: mobile is online-first. An IndexedDB-backed writes
outbox exists for failed annotation submissions, but it's **not
verified end-to-end** — treat it as a safety net for the
Wi-Fi-dropped-mid-submit case, not as a license to label all day
offline. Reads (loading project lists, tasks, images) still need
network. See
[Mobile install → What works offline](/annotate/mobile/install#what-works-offline-partially)
for the user-facing guidance.

## What's actually inside the .apk / .ipa

Building the Android `.apk` or iOS `.ipa` produces a roughly 10 MB
file with these pieces:

| Piece | What it is | Size |
|---|---|---|
| Native shell | Capacitor's iOS / Android wrapper (Swift / Kotlin) | ~1 MB |
| Embedded WebView | The OS-provided WebView itself isn't bundled — it's shared with Safari (iOS) or Chrome (Android) | 0 MB |
| Bundled SPA `index.html` | Tiny boot HTML that decodes the JWT, redirects to the cloud login if no auth | ~5 KB |
| React SPA JS + CSS | The full labelstudio SPA bundle (webpacked, minified) | ~8 MB |
| Icons + splash | App icon, launch screen images | ~500 KB |

The bundled SPA does NOT include a copy of Django or any backend
logic. There is no embedded SQLite. Every meaningful operation goes
to the cloud over HTTPS.

## What the mobile app does on first launch

1. **Native shell starts.** iOS launches `App.app`; Android launches
   `MainActivity`. Both immediately create a `WKWebView` /
   `WebView` and tell it to load `index.html` from the bundle.
2. **`index.html` runs the boot script.** Reads the SPA's
   `localStorage` for an access JWT + refresh JWT. Decodes each
   token's `exp` claim. If either is still in the future, treats the
   user as authenticated. Else, hard-redirects the WebView to
   `https://label.afriannotate.org/user/login/`.
3. **WebView navigates to the cloud.** If authenticated, the WebView
   loads the cloud SPA shell directly. If not, it loads the Django-
   served login page, the user types email + password, gets a fresh
   JWT, lands on the SPA.
4. **From this point onwards**, the WebView is rendering the cloud's
   served HTML/JS/CSS — the bundled `index.html` was just a boot
   redirector. Every subsequent navigation, API call, image load,
   etc. happens against `label.afriannotate.org`.

This is why a "fix a bug in the mobile app" task almost always means
"fix a bug in the SPA" — the SPA is what the user sees once they're
past the login redirect.

## Why we don't ship a fully-offline mobile app (yet)

The roadmap calls for it but v0.1 is **not there**. The honest reasons:

- **The labelling editor is enormous.** LSF (the embedded
  React-based editor that runs inside `<Labels>` / `<RectangleLabels>`
  / `<TextArea>` etc.) makes assumptions about a server being
  reachable for some operations (predictions, ML backends,
  per-region image loads from cloud storage). Making it fully offline-
  capable is real work, not just "cache the bundle".
- **Cloud storage is the source of truth for media.** When a task's
  data is `{"image": "https://gcs.bucket/path/to/big-image.jpg"}`,
  the image isn't *in* the app — it's a URL the WebView fetches.
  Going offline means pre-caching the image, which means a real
  per-task pre-cache strategy with size budgets.
- **The write outbox is shipped but unverified.** The IndexedDB
  outbox in `web/apps/labelstudio/src/utils/offline-{fetch,outbox}.ts`
  catches failed annotation submissions and drains on the next
  `online` event. End-to-end testing across phone restarts,
  app-killed-while-backgrounded, extended-offline sessions, and
  conflict resolution is **incomplete** — until that lands, the
  outbox is a safety net for connectivity blips, not a production
  guarantee.

The current state: writes have a best-effort safety net (don't bet
the project on it); reads still require network.

## What's different across platforms

Three places the platforms diverge meaningfully:

1. **Status bar handling.** iOS uses `viewport-fit=cover` semantics +
   `safe-area-inset-*`; Android uses an opaque status-bar plugin.
   Capacitor abstracts most of this but the SPA still ships some
   per-platform CSS branches.
2. **Hardware back button.** Android has a hardware back button (or
   gesture); iOS doesn't. The SPA registers a back-button handler
   that pops history when running inside Capacitor on Android, and
   exits the app at the root. iOS uses swipe-from-left-edge for
   history back.
3. **Distribution channel.** APK side-load is Android-only;
   TestFlight is iOS-only. See the
   [Distribution overview](/annotate/platform-admin/distribution/) for the
   per-platform channels.

## Where to look in the codebase

- **Capacitor config** — `native/mobile/capacitor.config.ts` —
  WebView allowlist, status-bar plugin config, scheme selection.
- **Bundled boot HTML** — `native/mobile/spa-template/index.html` —
  the redirect script that lands the WebView on the cloud login or
  the SPA shell.
- **iOS Xcode project** — `native/mobile/ios/App/` — generated by
  `cap add ios`; you edit Info.plist + signing settings here.
- **Android Gradle project** — `native/mobile/android/` —
  generated by `cap add android`; you edit AndroidManifest.xml +
  build.gradle here.
- **Build scripts** — `native/mobile/scripts/` —
  `build-release.sh` (Android), `build-release-ios.sh` (iOS),
  `build-bundle.sh` (the SPA-into-Capacitor step shared by both).

## What's next

- **[Install the mobile app →](/annotate/mobile/install)** — practical install
  instructions for end users
- **[Distribution overview →](/annotate/platform-admin/distribution/)** —
  channels for shipping new builds to testers / users
- **[Security model →](/annotate/platform-admin/security)** — TLS, auth,
  data storage end-to-end
