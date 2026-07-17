---
title: "Distribution overview"
sidebar_label: "Overview"
sidebar_position: 1
description: "How to build + ship the mobile and desktop apps to your users."
mdx:
  format: md
---

# Distribution overview

AfriAnnotate ships as four artifacts you build from this repo:

| Artifact | Where it runs | What gets distributed |
|---|---|---|
| **Web SPA** | Browser | Already live at `label.afriannotate.org` — users just visit the URL |
| **Android app** | Phone / tablet | `.apk` or `.aab` Capacitor wrapper around the SPA |
| **iOS app** | iPhone / iPad | `.ipa` Capacitor wrapper around the SPA |
| **macOS desktop app** | macOS 12+ | `.dmg` Tauri wrapper around the SPA |

The web SPA is "distributed" by Cloud Run + Cloudflare DNS — nothing
for you to do per release; deploys go out via your hosting pipeline.

The other three artifacts need explicit distribution channels.

## Channels at a glance

Different channels suit different audiences. Most hosters end up using
**two channels per platform** — one for pre-release internal testing,
one for public release.

### Android

| Channel | Audience | Apple-style review? | Setup time |
|---|---|---|---|
| **[Firebase App Distribution](/annotate/platform-admin/distribution/firebase)** | Internal testers (≤ unlimited), pre-release | No | 30 min |
| **[Google Play Store](/annotate/platform-admin/distribution/play-store)** | Public release | Yes (Play review, faster than Apple's) | A few hours of metadata setup |

### iOS

| Channel | Audience | Apple Review? | Setup time |
|---|---|---|---|
| **[TestFlight](/annotate/platform-admin/distribution/testflight)** Internal | ≤ 100 testers you add by email | No | 1 hour |
| **TestFlight External** | ≤ 10,000 testers via email or public link | First build per version (24-48 h, usually faster) | Same as Internal |
| **App Store** | Public release | Yes | A few hours of metadata setup |

### macOS desktop

| Channel | Audience | Apple Review? | Setup time |
|---|---|---|---|
| **[Notarized .dmg](/annotate/platform-admin/distribution/macos-dmg)** | Anyone — host the .dmg on your site, users download + double-click | No (just automated malware scan) | 30 min |
| TestFlight (macOS) | ≤ 100 internal / 10,000 external | Yes (for external) — and requires App Sandbox + entitlements, hard for embedded-runtime apps | Several hours + sandbox refactor |
| Mac App Store | Public release | Yes | Same as TestFlight macOS |

For early-stage projects, **notarized .dmg** is dramatically less work
than TestFlight macOS and gives the same end-user experience (download +
install). TestFlight macOS only becomes the right answer when the
desktop app moves to a thin-client model with no embedded server.

## Typical first-release path

For a brand-new fork of AfriAnnotate with ≤ 5 testers:

1. **Web** — deploy the cloud (this is a separate task; see the README in
   [https://github.com/AfriAnnotate/Tool](https://github.com/AfriAnnotate/Tool))
2. **Android** — [Firebase App Distribution](/annotate/platform-admin/distribution/firebase). Side-load APK
   to colleagues, no Play review.
3. **iOS** — [TestFlight Internal Testing](/annotate/platform-admin/distribution/testflight). No Apple
   review.
4. **macOS** — [Notarized .dmg](/annotate/platform-admin/distribution/macos-dmg). No Apple review. Host on
   Firebase Hosting / GitHub Releases.

Total setup time end-to-end: ~3 hours, once you have all the cert /
account paperwork sorted.

## Shared infrastructure

A few things are shared across channels — set them up once and they
work everywhere:

- **Apple Developer account** — needed for TestFlight + notarized .dmg
  + Mac App Store. One enrolment ($99/year) covers iOS + macOS apps for
  your whole team. The same App Store Connect API key works for both
  TestFlight upload AND Mac notarization.
- **Google Cloud / Firebase project** — needed for Firebase App
  Distribution (Android). Free tier covers most early teams.
- **Android release keystore** — generate once via
  `scripts/generate-release-keystore.sh`. Same key signs both APK
  (Firebase) and AAB (Play Store) so users can move between channels
  without re-installing.

Each page below covers its own one-time setup + per-release flow.
