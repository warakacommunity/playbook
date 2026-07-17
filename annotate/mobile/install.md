---
title: "Install the mobile app"
description: "Install AfriAnnotate on Android — how the APK gets distributed, sign in, what works."
sidebar_position: 1
mdx:
  format: md
---

# Install the mobile app

AfriAnnotate ships an Android app that connects to whichever cloud
your team already uses. Annotators can label from a phone or tablet
with the same accounts, projects, and roles they have on the web.

The APK is **distributed by the hoster** (the team that runs your
platform). Distribution mechanism is the hoster's choice — there's
no single "official" channel because the platform is open source.

## Common distribution channels

| Channel | Best for |
|---|---|
| **Side-load** (download APK + tap to install) | Tight teams, small tester groups, internal beta |
| **Firebase App Distribution** | Auto-updates, per-tester invites, larger tester groups, install analytics |
| **Google Play Console** (internal track, closed alpha, open alpha) | Trusted-on-device installs, broader rollout, app-store reviews |
| **Custom MDM / enterprise channel** | Corporate-managed devices |

The flow on each is roughly the same — your hoster will send you a
link or APK; you install; you sign in.

:::info Reference deployment
**AfriAnnotate's reference deployment** uses **Firebase App
Distribution** for the internal tester group. Testers receive an
email from `noreply@appdistribution.firebase.google.com` titled
*"AfriAnnotate is available for testing"*, and follow the steps in
the [Firebase App Distribution flow](#firebase-app-distribution-flow)
below. Other hosters may pick a different channel; ask if unsure.
:::

## Side-load flow (the most generic)

1. Your hoster sends you the APK file (WhatsApp, Drive, email
   attachment).
2. Open the file on your Android device.
3. Android prompts **"Install unknown app?"** — toggle **Allow
   from this source** for whichever app you opened the file from
   (Files, Drive, Gmail, etc.). This is necessary because the APK
   isn't from the Play Store.
4. Tap **Install**. The app appears on your home screen.

## Firebase App Distribution flow

1. Your hoster adds your email to a tester group + pushes a new
   build. You receive an email from
   `noreply@appdistribution.firebase.google.com`.
2. Open the email on the **same phone** you'll install the app on.
3. Tap the link in the email. You'll land on the App Distribution
   page in your browser.
4. First time: Android prompts you to install **App Tester** from
   Google Play. Install it, then return to the link.
5. Tap **Download** to fetch the APK.
6. Android prompts **"Install unknown app?"** — toggle **Allow
   from this source** for your browser.
7. Tap **Install**.

Firebase auto-emails testers every time a new release ships. Tap
the link in the new email, download, install over the existing app
— Android keeps your sign-in state.

## Play Store flow

1. Your hoster invites you to the internal / closed alpha track via
   email.
2. Click the **Become a tester** link. Confirm the invite in Play.
3. Search for the app in Play Store on your device — it now appears.
4. Install normally. Updates flow through Play.

## Sign in

1. Open the app.
2. The login screen is the same one you see on your team's web URL
   — your existing email + password work.
3. After login the app routes you to your projects. Pull-to-refresh
   anywhere to re-sync.

## What works on mobile

| Feature | Mobile | Web |
|---|---|---|
| Browse projects | ✓ | ✓ |
| Label tasks (text, image, audio) | ✓ | ✓ |
| Submit annotations | ✓ | ✓ |
| Review queue | ✓ | ✓ |
| Comments + notifications | ✓ | ✓ |
| Profile, password, sign-out | ✓ | ✓ |
| Create projects | — (intentional) | ✓ |
| Invite members | — (intentional) | ✓ |
| Org / Platform admin | — (intentional) | ✓ |

Annotator surfaces only. Operator tasks live on the web.

## What works offline (partially)

The mobile app is a **thin client** — it loads the React SPA from
the cloud at runtime and most `/api/*` calls need network.
Mid-session offline support exists in code but is **not yet
verified end-to-end**:

- **Submitting annotations**: an IndexedDB-backed write outbox
  catches failed `POST /api/annotations` calls when the network is
  down, replays them on the next `online` event. Treat this as
  experimental — for high-value work, confirm the cloud received
  the annotation before going offline (it shows up in the project's
  Data Manager).
- **Reading projects / tasks**: requires network. Pages cached by
  the service worker render their shell offline, but data won't
  load — the task list will show "Couldn't reach the server" once
  the SPA tries to fetch.
- **Sign-in**: requires network the first time. A live JWT in
  device storage lets subsequent app launches skip the re-auth
  round-trip, but every API call still needs cloud.

:::caution Outbox is a v0 — don't trust it yet
The write outbox catches the obvious cases (Wi-Fi drop mid-submit)
but hasn't been hardened across phone restarts, app backgrounding,
or extended offline sessions. Until end-to-end testing is complete,
treat it as a safety net for occasional network blips — **not** a
license to label all day from the field with no cloud access.
:::

Full offline support (read cache + verified write outbox + per-task
media pre-caching) is on the roadmap.

## Troubleshooting

**The email never arrives.**
Check spam, then check whether your address is actually in the
tester list — your hoster can confirm. Corporate mail filters
sometimes block App Distribution / Play Store emails; if that's
the case, ask for the APK as a direct file transfer (WhatsApp,
Drive, email attachment) and side-load.

**"Install unknown app" prompt doesn't appear.**
Android 8+ asks per-app for unknown-source permission. Go to
**Settings → Apps → [your browser / file manager] → Install
unknown apps** and toggle it on, then re-open the link / file.

**App opens to a blank screen.**
Force-quit the app and re-open. The pre-boot SPA assets are cached
locally but the cloud connection happens on first launch — if the
cloud was unreachable mid-launch, you can get into a bad state. A
full restart fixes it.

**Login bounces between login and home.**
Sign out (sidebar → Sign out), force-quit, re-open. The signed-out
state on the cloud and the cached state on the device occasionally
disagree after an interrupted sign-in; a clean cycle resets both.

## Updating to a new release

Mechanism varies by distribution channel:

- **Firebase App Distribution**: testers get an email; tap link,
  download, install over the existing app.
- **Play Store**: updates flow through Play normally.
- **Side-load**: your hoster sends a new APK; install over the
  existing app.

Each release is versioned `app-vX.Y.Z` (see [Release notes](/blog)).
The `versionName` is visible in **Settings → Apps →
\<your-platform-name\>**.
