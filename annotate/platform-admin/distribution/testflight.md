---
title: "iOS TestFlight"
sidebar_label: "iOS TestFlight"
sidebar_position: 4
description: "Build, sign, and ship the iOS app to testers via Apple TestFlight."
mdx:
  format: md
---

# iOS TestFlight

TestFlight is Apple's pre-release distribution channel. Testers install
the **TestFlight app** from the App Store, then accept your build via an
email invite or public link. Updates push automatically.

Two flavours:

| | Internal Testing | External Testing |
|---|---|---|
| Testers | Up to **100** people you add by email in App Store Connect (no need to be developers). | Up to **10,000** testers via email or public link. |
| App Review | Not required. | Required on **first** build per version, then waived for subsequent uploads within that version. |
| Build availability | ~5–15 min after upload (Apple processing). | Same processing, then 24-48 h Beta App Review on first build. |
| Build expiry | 90 days from upload. | 90 days from upload. |

For < 100 testers, **Internal Testing** is what you want — no review,
immediate distribution.

## One-time setup (do once per Apple Developer account)

### 1. Register the bundle ID

Open [developer.apple.com → Certificates, Identifiers & Profiles → Identifiers](https://developer.apple.com/account/resources/identifiers/list).

- Click **+**.
- Choose **App IDs** → Continue.
- Choose **App** → Continue.
- **Description**: AfriAnnotate.
- **Bundle ID**: Explicit → your iOS app's bundle ID (must match
  `IOS_BUNDLE_ID` in `native/mobile/scripts/build-release-ios.sh` and
  the value in `native/mobile/ios/App/App.xcodeproj/project.pbxproj`).
  The reference cloud uses `com.afriannotate.app`; fork-and-rename
  to match your own domain.
- **Capabilities**: leave defaults (you can add Push Notifications
  later if needed).
- Click **Continue** → **Register**.

### 2. Create the app in App Store Connect

Open [App Store Connect → My Apps](https://appstoreconnect.apple.com/apps).

- Click **+** → **New App**.
- **Platforms**: iOS.
- **Name**: AfriAnnotate.
- **Primary language**: English (or whichever fits your audience).
- **Bundle ID**: select your registered bundle ID from the dropdown.
- **SKU**: anything unique (internal-only) — e.g. `<your-app>-ios-001`.
- **User Access**: **Limited Access** (only operators you explicitly
  grant can edit) or **Full Access** (every team member). Limited is
  the conservative default; you can switch later.
- Click **Create**.

### 3. Configure signing in Xcode

```bash
open native/mobile/ios/App/App.xcworkspace
```

In the project navigator → **App** target → **Signing & Capabilities**:

- **Automatically manage signing**: ✓
- **Team**: select your Apple Developer team.
- **Bundle Identifier**: matches step 1.

Xcode will create the development + distribution provisioning profiles
automatically on the next build.

:::tip First-time gotcha
If Xcode says "Account doesn't have permission", you haven't signed in
to Xcode with your Apple ID. Fix: **Xcode → Settings → Accounts → +**
→ enter your Apple ID. Then return to this step.
:::

### 4. Find your Team ID

[developer.apple.com → Membership](https://developer.apple.com/account/#MembershipDetailsCard).

Look for **Team ID** — a 10-character string like `ABC123DEF4`.

Stash it:

```bash
cat > native/mobile/scripts/.testflight.env <<EOF
export APPLE_TEAM_ID=ABC123DEF4

# Pick ONE auth method below — App Store Connect API key (A) or
# Apple ID + app-specific password (B).
EOF
```

That file is gitignored.

### 5. Create an auth credential for the upload script

Two options. Pick one.

#### (A) App Store Connect API key (recommended — works in CI)

1. Open [App Store Connect → Users and Access → Integrations](https://appstoreconnect.apple.com/access/integrations) (the URL is sometimes `/access/api` on older accounts).
2. **Team Keys** tab → **+** to generate a key.
3. **Name**: `AfriAnnotate Uploader`.
4. **Access**: **App Manager** (uploads + manages TestFlight; no admin rights).
5. Click **Generate**.
6. The next screen shows **Key ID** + **Issuer ID** at the top and a **Download API Key** button. Click it — **you can only download this once.** Save the `.p8` file in your password manager.

Add to `.testflight.env`:

```bash
export APP_STORE_CONNECT_API_KEY_ID=ABCDE12345
export APP_STORE_CONNECT_API_ISSUER_ID=00000000-0000-0000-0000-000000000000
export APP_STORE_CONNECT_API_KEY_FILE=$HOME/Documents/AuthKey_ABCDE12345.p8
```

#### (B) Apple ID + app-specific password (simpler, local only)

1. Open [appleid.apple.com → Sign-in and Security → App-Specific Passwords](https://account.apple.com/account/manage).
2. **+** → name it "altool".
3. Save the generated 16-char password (`xxxx-xxxx-xxxx-xxxx`).

Add to `.testflight.env`:

```bash
export APPLE_ID=you@example.com
export APPLE_APP_SPECIFIC_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

### 6. Auto-clear export compliance for future builds

Add to `native/mobile/ios/App/App/Info.plist` (inside the top-level
`<dict>`):

```xml
<!-- "Does your app use encryption?" → false (the app only uses
     Apple OS-provided crypto, qualifying for the EAR Category 5
     Part 2 exemption). -->
<key>ITSAppUsesNonExemptEncryption</key>
<false/>
```

Without this, every build lands in **"Missing Compliance"** status
until you answer Apple's encryption question by hand.

:::note ``ios/`` is gitignored
Capacitor regenerates the platform project on `cap add`. Re-apply this
edit after a fresh `cap add ios`.
:::

## Per-release flow

Once setup is done, every release is two commands:

```bash
cd native/mobile
source scripts/.testflight.env

./scripts/build-release-ios.sh
./scripts/testflight-upload.sh
```

The build script prints the IPA path + SHA256 at the end. The upload
script reports next-step UI clicks.

## Adding testers

### Internal testers (≤ 100, no Apple review)

1. App Store Connect → **AfriAnnotate** → **TestFlight** → **Internal Testing** → **+** to create a group.
2. Name it (e.g. `Internal Testers`), tick **Enable automatic distribution**, **Create**.
3. **+** in the group → **Add New Testers** → email + first name + last name.
4. **Add**.

Apple emails them. They accept, install the TestFlight app, and your
build appears.

### External testers (≤ 10,000)

1. App Store Connect → **TestFlight** → **External Testing** → **+**.
2. Add testers by email OR share the public link.
3. First build of a marketing version goes through **Beta App Review**
   (typically same-day). After that, additional builds in that version
   go live in ~5-15 min like internal.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Build status "Missing Compliance" | Click the build → **Provide Export Compliance Information** → **"None of the algorithms mentioned above"** → tick **"Use this answer for future builds"** → Save. Or set `ITSAppUsesNonExemptEncryption=false` in Info.plist (see step 6 above). |
| Upload rejects with `CFBundleIdentifier Collision` | The build script has a post-archive fixup pass for this. If you've modified the script, ensure the fixup section that walks `App.xcarchive/Products/Applications/App.app/Frameworks/` + restores each framework's bundle ID + re-codesigns is intact. |
| Upload rejects with `Redundant Binary Upload` | App Store Connect already has a build with the same `CURRENT_PROJECT_VERSION`. Re-run `build-release-ios.sh` — it auto-bumps the build number on every invocation. |
| App opens in Safari instead of inside an app frame | Capacitor's `server.allowNavigation` config doesn't include `label.afriannotate.org`. Add it to `native/mobile/capacitor.config.ts`, run `cap sync ios`, rebuild. |
| Notarization (note: this is macOS not iOS) takes > 30 min | Apple's notary service occasionally stalls despite green status. Wait or re-submit. |

## What's next

- **[Notarized macOS .dmg →](/annotate/platform-admin/distribution/macos-dmg)** — the desktop equivalent
  using the same App Store Connect API key
- **[Firebase App Distribution →](/annotate/platform-admin/distribution/firebase)** — the Android analogue
  to TestFlight Internal Testing
