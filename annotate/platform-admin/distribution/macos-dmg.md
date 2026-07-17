---
title: "Notarized macOS .dmg"
sidebar_label: "macOS .dmg"
sidebar_position: 5
description: "Build, sign, notarize, and ship the macOS desktop app as a downloadable .dmg."
mdx:
  format: md
---

# Notarized macOS .dmg

The macOS Tauri desktop app ships as a **notarized .dmg** that users
download and double-click. No App Store, no App Review, no
provisioning profiles. Users open the .dmg, drag
`AfriAnnotate.app` to `/Applications`, and run it.

For this to work without Gatekeeper warnings, the .dmg must be:

1. **Signed** with a Developer ID Application certificate from your
   Apple Developer account
2. **Notarized** by Apple (automated malware scan + signature check)
3. **Stapled** (the notarization ticket pinned into the .dmg so
   Gatekeeper accepts it offline)

The build script handles all three in one pass.

:::info Why not TestFlight macOS?
TestFlight macOS is technically supported but requires App Review +
App Sandbox + entitlements paperwork — overkill for an internal-test
channel. The AfriAnnotate desktop currently uses an embedded
runtime that doesn't fit cleanly inside the macOS App Sandbox.
Notarized .dmg has no review step, no sandbox requirements, and users
install by double-clicking. Revisit TestFlight macOS only if the
desktop ever moves to a fully thin-client model.
:::

## One-time setup

The [iOS TestFlight setup](/annotate/platform-admin/distribution/testflight) is a prerequisite — that's
where the App Store Connect API key comes from. If you haven't done
that yet, follow it first, then return here.

### 1. Create a Developer ID Application certificate

`Developer ID Application` is the cert for signing apps that
distribute **outside** the Mac App Store. It's different from the
`Apple Distribution` cert iOS TestFlight uses.

Open Xcode → **Settings** → **Accounts**:

- Select your Apple ID in the left panel
- Click **Manage Certificates...**
- Click the **+** at the bottom-left
- Choose **Developer ID Application**

Xcode talks to developer.apple.com and creates the cert. You'll see
it appear in the list. Click **Done**.

Confirm it landed:

```bash
security find-identity -v -p codesigning | grep "Developer ID Application"
```

You should see one line like:

```
1) ABC1234567890ABCDEF1234567890ABCDEF12345 "Developer ID Application: Your Name (TEAM12345)"
```

Copy the quoted Common Name — that's `APPLE_SIGNING_IDENTITY`.

### 2. Reuse the App Store Connect API key for notarization

Apple's `notarytool` accepts the same `.p8` key the iOS upload uses
(with App Manager role). Nothing extra to set up — the desktop build
script reads `native/mobile/scripts/.testflight.env` directly.

If you want a separate creds file for the desktop, create
`native/desktop/scripts/.macos.env` with the same shape:

```bash
export APPLE_SIGNING_IDENTITY="Developer ID Application: Your Name (TEAM12345)"
export APP_STORE_CONNECT_API_KEY_ID=ABCDE12345
export APP_STORE_CONNECT_API_ISSUER_ID=00000000-0000-0000-0000-000000000000
export APP_STORE_CONNECT_API_KEY_FILE=$HOME/Documents/AuthKey_ABCDE12345.p8
```

Gitignored under `native/desktop/.gitignore`.

### 3. Make sure the Tauri project builds

If you've never run a Tauri build on this machine:

```bash
cd native/desktop
npm install
rustup target add aarch64-apple-darwin x86_64-apple-darwin
```

The first `cargo tauri build` is slow (~5-10 min on a fresh machine
— it compiles all Rust dependencies). Subsequent builds are
incremental (~30-90 s).

## Per-release flow

Once setup is done, every release is one command:

```bash
cd native/desktop
./scripts/build-release-mac.sh
```

It:

1. Builds the SPA in production mode + stages it into
   `native/desktop/public/`
2. Runs `npx tauri build --bundles dmg --target aarch64-apple-darwin`
3. Tauri's bundler signs the produced `.app` and packages it into a
   `.dmg` using your Developer ID Application cert
4. Submits the `.dmg` to Apple's notary service
   (`xcrun notarytool submit --wait`)
5. Staples the notarization ticket (`xcrun stapler staple`)

The output is a notarized `.dmg` ready to host on Firebase Hosting,
GitHub Releases, or your own download server.

### Architectures

By default the script builds for **Apple Silicon only**
(`aarch64-apple-darwin`). To build for Intel or both:

```bash
# Intel only
MAC_TARGET=x86_64-apple-darwin ./scripts/build-release-mac.sh

# Universal (both — slower, ~2x size)
MAC_TARGET=universal-apple-darwin ./scripts/build-release-mac.sh
```

Universal is the safe default for broad compatibility (~150 MB vs
~80 MB).

### Local smoke test without notarization

```bash
SKIP_NOTARIZE=1 ./scripts/build-release-mac.sh
```

Signed-only, no Apple round-trip. Right-click → **Open** to bypass
Gatekeeper on your own machine. Other Macs will refuse.

## Distributing the .dmg

| Channel | Setup | Cost | Auto-update |
|---|---|---|---|
| **Firebase Hosting** (recommended) | Drop the .dmg into `docs-site/static/downloads/` and `firebase deploy --only hosting:docs`. Lives at `https://label.afriannotate.org/downloads/AfriAnnotate.dmg`. | Free for projects under 10 GB/mo | Manual (users re-download) or wire Tauri's updater |
| **GitHub Releases** | `gh release create` + upload the .dmg. Versioned by tag. Public free, private with paid plan. | Free for public | Manual or Tauri updater |
| **Your own S3 / CloudFront** | Standard static-hosting setup | Pay-per-byte | Manual or Tauri updater |

For auto-update support without users re-downloading, wire up Tauri's
built-in updater (`tauri.updater` in `tauri.conf.json`).

## Troubleshooting

| Symptom | Fix |
|---|---|
| `error: target may not be installed` | `rustup target add aarch64-apple-darwin` (or whatever target). |
| `codesign: code object is not signed at all` | `APPLE_SIGNING_IDENTITY` env doesn't match an installed cert. Run `security find-identity -v -p codesigning` to see what's available. |
| `notarytool submit: Invalid Credentials` | Wrong `APP_STORE_CONNECT_API_KEY_ID` / `_ISSUER_ID` / .p8 file. Same creds work for both iOS upload and Mac notarization — if iOS upload works, this should too. |
| Notarization fails: `binary is not signed with a valid Developer ID certificate` | Wrong cert. `Apple Distribution` (iOS App Store) is NOT accepted for notarization — you need `Developer ID Application`. |
| Notarization fails: `signature does not contain a hardened runtime entitlement` | Tauri 2 enables hardened runtime by default; check `tauri.conf.json` → `bundle.macOS` isn't disabling it. |
| Gatekeeper refuses to open on another Mac | The .dmg wasn't stapled. Run `xcrun stapler validate path/to/AfriAnnotate.dmg` — if "not stapled", re-run the build with notarization enabled. |
| Notarization takes > 30 min | Apple's notary service is occasionally slow despite green status on developer.apple.com/system-status. Check `xcrun notarytool history` for status; either wait or submit again. |

## What's next

- **[iOS TestFlight →](/annotate/platform-admin/distribution/testflight)** — the mobile-side equivalent
  using the same Apple Developer account
- **Tauri auto-updater** — configure `tauri.conf.json`'s `updater`
  section to let the app pull updates from a server you control
- **Windows + Linux builds** — the same Tauri pipeline produces
  `.msi` (Windows) and `.deb`/`.AppImage` (Linux); separate signing
  setup needed for Windows (EV cert), Linux is unsigned
