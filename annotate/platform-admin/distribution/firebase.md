---
title: "Firebase App Distribution"
sidebar_label: "Firebase (Android)"
sidebar_position: 2
description: "Ship Android builds to internal testers via Firebase App Distribution."
mdx:
  format: md
---

# Firebase App Distribution

Firebase App Distribution is Google's free tool for shipping pre-release
Android builds to a list of testers without going through the Play Store
review. Testers get an email with an install link; updates push
automatically when you upload a new build.

This is the recommended path for **distributing to colleagues** — zero
metadata required (no privacy policy, no data-safety form, no icons),
unlimited testers, auto-update notifications, version tracking. When
you're closer to public launch, switch to [Play Store Internal
Testing](/annotate/platform-admin/distribution/play-store) without redoing any work.

## One-time setup

### 1. Add Firebase to your GCP project

If you already host the cloud on GCP, you can attach Firebase to the
existing project — no new project, no new billing setup.

```bash
# Install the Firebase CLI (npm — Node 18+).
npm install -g firebase-tools

# Log in with the same Google account that owns the GCP project.
firebase login

# Attach Firebase to your existing GCP project.
firebase projects:addfirebase <your-gcp-project-id>
```

The Firebase console (https://console.firebase.google.com) now lists
the project alongside your GCP one.

### 2. Register the Android app inside the Firebase project

```bash
# Tells Firebase "an Android app with this package belongs to this
# project". Generates a unique App ID. Use the same package ID as
# in native/mobile/capacitor.config.ts (appId).
firebase apps:create ANDROID com.afriannotate.app \
  --project <your-gcp-project-id> \
  --display-name "AfriAnnotate Android"
```

Output includes a line like:

```
App ID: 1:495886042450:android:abc123def456...
```

Copy that App ID for the next step.

### 3. Stash the App ID for the distribute script

Create `native/mobile/scripts/.firebase.env` (gitignored):

```bash
cat > native/mobile/scripts/.firebase.env <<EOF
export FIREBASE_APP_ID=1:495886042450:android:abc123def456...
export FIREBASE_GROUPS=internal-testers
EOF
```

### 4. Create a tester group + add testers

```bash
# Create the group.
firebase appdistribution:group:create internal-testers \
  --display-name "AfriAnnotate internal testers" \
  --project <your-gcp-project-id>

# Add testers by email (comma-separated; up to unlimited).
firebase appdistribution:testers:add \
  --emails "colleague1@gmail.com,colleague2@gmail.com" \
  --group-aliases internal-testers \
  --project <your-gcp-project-id>
```

That's the entire one-time setup.

## Per-release distribution

```bash
cd native/mobile

# 1. Build a signed APK + AAB. Both signed with the same release
#    keystore so a tester can later move from side-loaded APK to
#    Play-installed AAB without "signature mismatch" errors.
read -rs -p "Keystore password: " RELEASE_KEYSTORE_PASSWORD; echo
export AFRI_KEYSTORE_PASSWORD=$RELEASE_KEYSTORE_PASSWORD
export AFRI_KEY_PASSWORD=$RELEASE_KEYSTORE_PASSWORD
export AFRI_KEYSTORE_PATH="$PWD/android/keystore/afri-release.jks"

./scripts/build-release.sh

# 2. Upload + notify. Picks up FIREBASE_APP_ID from .firebase.env.
./scripts/firebase-distribute.sh

# Or pass APK + notes explicitly:
./scripts/firebase-distribute.sh \
  ./android/app/build/outputs/apk/release/app-release.apk \
  "Audio QC fix; submit-button responsive on small screens"
```

The distribute script:

- auto-finds the most recent `app-release.apk` under
  `android/app/build/outputs/apk/release/` if you don't pass a path
- uses your last commit message as release notes if you don't pass any
- uploads via the Firebase CLI
- triggers email notifications to every tester in `internal-testers`

Each tester gets an email titled "New release of AfriAnnotate
Android available for testing" with an install button.

## What testers see (first time)

1. Email arrives. Tap **Get started**.
2. Browser opens an "Accept invitation" page. Sign in with the same
   Google account the email was sent to.
3. Page prompts to install **App Tester** (Google's free tester app).
   They install it once, never again.
4. App Tester opens, shows AfriAnnotate Android. They tap
   **Install** → first time they'll see "For your security..." → toggle
   **Allow from this source** → install completes.

Subsequent updates: App Tester pushes a notification when a new build
is available; one tap to update.

## Removing the app from testers

Testers uninstall the AfriAnnotate app like any other. To revoke
their access entirely:

```bash
firebase appdistribution:testers:remove \
  --emails "ex-tester@gmail.com" \
  --project <your-gcp-project-id>
```

To wipe a whole tester group:

```bash
firebase appdistribution:group:delete internal-testers \
  --project <your-gcp-project-id>
```

## Cost

Firebase App Distribution is **free** with no quotas worth worrying
about. The whole flow lives on the GCP free tier (doesn't touch Cloud
Run / Cloud SQL / GCS).

## Troubleshooting

| Symptom | Fix |
|---|---|
| `firebase: command not found` | Install via `npm install -g firebase-tools` (requires Node 18+). |
| `Failed to authenticate` | `firebase login` again. Tokens last ~30 days. |
| Tester reports "App not installed" on Android 14+ | They have a previous install signed with a different keystore (e.g. the auto-debug keystore from `cap run android`). Have them uninstall the existing copy first, then install the Firebase build. |
| Tester sees "Your invitation is no longer valid" | They were removed from the tester group. Re-add their email. |
| `versionCode N has already been used` | Firebase enforces the same monotonic-versionCode rule as Play Store. The build script auto-bumps via a timestamp so this shouldn't happen unless you manually override; if it does, just rebuild. |

## iOS via Firebase?

Firebase App Distribution supports iOS too, but the iOS dance is
significantly more painful — each tester's UDID must be registered in
your provisioning profile **before** the build is signed. For < 100
iOS testers, use [TestFlight Internal Testing](/annotate/platform-admin/distribution/testflight) instead
— no UDID dance, no per-build re-signing.

## What's next

- **[Google Play Store →](/annotate/platform-admin/distribution/play-store)** — when you're ready to ship
  publicly
- **[iOS TestFlight →](/annotate/platform-admin/distribution/testflight)** — the iOS-side equivalent
