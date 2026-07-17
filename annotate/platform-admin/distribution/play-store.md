---
title: "Google Play Store"
sidebar_label: "Play Store (Android)"
sidebar_position: 3
description: "Publish the Android app to Google Play Store Internal Testing → Production."
mdx:
  format: md
---

# Google Play Store

End-to-end runbook for getting the Android app on the Play Store
**Internal Testing** track — the fastest tier (5-min review on first
upload, instant after that, up to 100 testers by Google email).

For pre-production distribution to colleagues with less friction
(zero metadata, unlimited testers, no review), use
[Firebase App Distribution](/annotate/platform-admin/distribution/firebase) first; switch to Play Store
when you're ready for public release.

## One-time setup

### 1. Google Play Console account ($25)

1. Go to [https://play.google.com/console/signup](https://play.google.com/console/signup).
2. Pay the **$25 one-time** developer fee with a credit card.
3. Choose **"Organization"** account type if publishing under a
   company name (required to use anything other than your personal
   name as the publisher).
4. Complete the identity verification step (Google emails a code +
   asks for ID — takes 1-3 days for organisation accounts).
5. Once approved, accept the Developer Distribution Agreement.

### 2. Generate the release keystore

The keystore signs every APK/AAB you ship. Lose it and you can never
push updates to this listing — only recovery is republishing under a
different package name.

```bash
cd native/mobile

# Pick a long random password + save it in your password manager
# (Bitwarden, 1Password) BEFORE running this:
export AFRI_KEYSTORE_PASSWORD='<long random password>'
export AFRI_KEY_PASSWORD="$AFRI_KEYSTORE_PASSWORD"
./scripts/generate-release-keystore.sh
```

Output: `native/mobile/android/keystore/afri-release.jks` (gitignored).

:::danger Back up the keystore IMMEDIATELY
Two off-machine locations at minimum — at least attach it to a
password-manager vault entry. If you lose this file, **you cannot
ever push another update to this Play Store listing**.
:::

### 3. Create the app listing in Play Console

In Play Console → **Create app**:

| Field | Value |
|---|---|
| App name | AfriAnnotate |
| Default language | English (United States) — or your primary audience's locale |
| App or game | App |
| Free or paid | Free |
| Declarations | tick all required boxes |

Click **Create**. You land on the listing dashboard with a checklist
of required items.

### 4. Fill the required listing items (Internal Testing minimum)

Internal Testing skips the heaviest review steps but still needs:

| Section | What's needed |
|---|---|
| **App access** | Tick "all functionality is available without restrictions" if no login wall blocks the reviewer; else add a test account |
| **Ads** | "No, my app does not contain ads" |
| **Content rating** | Complete the questionnaire (~10 questions). For an annotation tool you'll get an "Everyone" rating in 5 min |
| **Target audience** | Adults (13+ usually, depending on whether you process minors' data) |
| **News app** | "No" |
| **COVID-19 contact tracing** | "No" |
| **Data safety** | Declare what data your app collects → see [Data safety declarations](#data-safety-declarations) below |
| **Government app** | "No" |
| **Financial features** | "No" |
| **Privacy policy** | URL to a publicly accessible page → see [Privacy policy](#privacy-policy) below |

### 5. Upload icon + screenshots

Required assets (keep them in `native/mobile/store-assets/` — create
the dir if missing):

| Asset | Format | Notes |
|---|---|---|
| App icon | 512×512 PNG, 32-bit RGBA | Sharp, no rounded corners (Play applies them) |
| Feature graphic | 1024×500 PNG/JPG | Shown at top of listing |
| Phone screenshots | 2-8 × min 320 px shortest side | From a real device or emulator |
| Tablet screenshots | Optional unless you want a tablet listing |

For the launch you can skip tablet screenshots and feature graphic
(Play marks them "optional" until the public Production track).

## Per-release build + upload

### 1. Build a signed AAB

```bash
cd native/mobile

# Source keystore creds (don't paste them inline — would end up in
# shell history):
read -rs -p "Keystore password: " AFRI_KEYSTORE_PASSWORD; echo
export AFRI_KEYSTORE_PASSWORD AFRI_KEY_PASSWORD="$AFRI_KEYSTORE_PASSWORD"
export AFRI_KEYSTORE_PATH="$PWD/android/keystore/afri-release.jks"

./scripts/build-release.sh
```

Output: `native/mobile/android/app/build/outputs/bundle/release/app-release.aab`.

The script:

- bakes `CAP_API_URL=https://label.afriannotate.org` into the bundle
- runs `cap sync android` to push the SPA into the Android project
- runs `./gradlew :app:bundleRelease` with a monotonic timestamp
  versionCode, so every build naturally beats the last uploaded
  version

Override via env:

```bash
CAP_API_URL=https://staging.example.com \
ANDROID_VERSION_NAME=v1.0.0-rc1 \
  ./scripts/build-release.sh
```

### 2. Upload to Internal Testing

In Play Console → AfriAnnotate → **Testing → Internal testing**:

1. Click **Create new release**.
2. **Upload AAB**: drag in `app-release.aab`. Play parses it for ~30s
   and shows version code/name.
3. **Release name**: defaults to the version name; fine.
4. **Release notes**: paste user-facing changes (e.g. "Initial test
   build"). Empty release notes are rejected.
5. Click **Save** → **Review release** → **Start rollout to Internal
   testing**.

First-ever upload triggers a 5-30 min review. Subsequent uploads on
the Internal track go live in 1-2 min.

### 3. Add testers

Testing → Internal testing → **Testers** tab:

- **Create email list** → name it (e.g. `internal-testers`) → paste
  up to 100 Google account emails (one per line).
- Save → tick the list under "Add testers".
- Copy the **opt-in URL** under "How testers join your test" → send
  it to the testers.

Testers visit the URL on their Android device, click **Become a
tester**, then install via the Play Store link Google sends them.
The app updates automatically when you push new AABs.

## Privacy policy

Google requires a **publicly accessible URL** with a privacy policy
covering:

- What personal data the app collects (email, name, annotations,
  optionally voice recordings, location if any)
- How it's stored (your hosting infrastructure — be specific about
  cloud provider + region)
- Who it's shared with (no third parties unless you add analytics)
- How users request deletion (email contact or in-app flow)
- Children's data handling (under-13 — most platforms forbid this
  data unless you have specific consent)
- Cookie + JWT usage

Easiest path:

1. Generate boilerplate via [TermsFeed](https://www.termsfeed.com/privacy-policy-generator/) or [FreePrivacyPolicy](https://app.freeprivacypolicy.com/).
2. Customise with your specifics.
3. Host on the cloud Django at `/privacy-policy/` (add the route +
   template) or on a static GitHub Pages site.

The URL goes into Play Console → **Policy → App content → Privacy
policy**.

## Data safety declarations

Play's Data Safety form asks about every data type the app collects.
For a standard AfriAnnotate deployment without extra analytics:

| Data type | Collected? | Shared? | Optional? | Purpose |
|---|---|---|---|---|
| Email address | Yes (signup) | No | No | Account management |
| Name | Yes (signup) | No | Yes | Personalisation |
| App interactions | Yes | No | No | App functionality |
| Audio recordings | If user records (AudioRecord task) | No | Yes | App functionality |
| Photos / files | If user uploads | No | Yes | App functionality |
| Crash logs | No (default) — if you add Sentry/Crashlytics, declare here | — | — | — |
| Analytics | No (default) — if you add GA/Mixpanel, declare here | — | — | — |
| Device or other IDs | No (default) | — | — | — |

Tick **"Data is encrypted in transit"** (HTTPS to the cloud) and
**"Data is encrypted at rest"** (Cloud SQL + GCS both encrypt at rest
by default for the reference cloud; verify for your hosting setup).

Tick **"Users can request that data be deleted"** and document the
contact email or in-app deletion flow.

## Iterating

Per release:

```bash
git pull
./scripts/build-release.sh
# Upload the new AAB to Internal testing → Create new release
```

Testers get the update automatically (Play notifies them, or they
update on next launch).

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Your APK or Android App Bundle has been rejected because it has an invalid digest.` | Keystore mismatch — the first AAB pinned the listing to a specific cert; you uploaded one signed with a different cert. Use the original keystore, or republish under a new package name. |
| `versionCode N has already been used` | The AAB's `versionCode` must be strictly higher than any previously uploaded. The build script defaults to a timestamp, but if you've manually overridden once, future overrides need to keep increasing. Easiest fix: run again without the override. |
| `Targeting an outdated API` | Google bumps the required `targetSdkVersion` annually. Bump `native/mobile/android/variables.gradle` if Play complains. |
| Tester opt-in URL gives `App not available in your region` | In Play Console → Internal testing → **Countries / regions**, explicitly tick the countries testers live in. Defaults to none. |
| Tester sees `There are no apps available for testing on this account` | They're signed into the device with a different Google account than the one on the tester list, or they haven't clicked **Become a tester** on the opt-in URL yet. |

## What's next

- **[Firebase App Distribution →](/annotate/platform-admin/distribution/firebase)** — for less-formal
  pre-release builds
- **Public release**: when ready, copy the same AAB from Internal
  Testing to the Closed Testing → Open Testing → Production track in
  Play Console. Each tier adds more review depth but uses the same
  build artifact.
