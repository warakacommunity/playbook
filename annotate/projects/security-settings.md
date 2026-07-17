---
title: "Data security"
sidebar_label: "Data security"
sidebar_position: 7
description: "Per-project access controls, offline restrictions, annotation locking, browser-cache control — the data-security knobs project owners can configure."
mdx:
  format: md
---

# Data security

Per-project security settings let owners + admins constrain how a
project's data flows across devices, browsers, and exports. These
are AfriAnnotate-specific knobs — useful for projects with
sensitive data (PII, health records, ethics-restricted speech
corpora) where the default permissive behaviour is wrong.

## Where it lives

**Project → Settings → Security**.

Visible to **Owner** and **Admin**. **Manager** sees a read-only
summary. Lower roles don't see the tab.

## Security templates (quick-pick)

The tab opens with four pre-set templates that flip a sensible
combination of toggles. Most projects pick one and don't customise
further:

| Template | Use for | What it does |
|---|---|---|
| **Basic / Balanced** (default) | Most projects | Defaults — offline allowed, metadata mirrors locally, annotators can edit/delete, anonymisation off, no browser-cache restriction |
| **Compliance / Strict** | PII, health, GDPR-sensitive | Offline disabled, metadata mirror off, lock-on-submit, no annotator delete, anonymise exports, browser-cache off, wipe-cache-on-logout on, fresh session for export |
| **Operational / Permissive** | Internal tooling, low-stakes | Maximum convenience — same as Basic plus multi-device + multi-user allowed |
| **Custom** | Anything that needs tuning | Each toggle visible individually |

Switching template **does not** retroactively scrub data already
distributed — the new policy applies to future actions only.

## The toggles

### Offline + multi-device

| Setting | Default | Effect when off |
|---|---|---|
| **Allow offline for annotators** | On | Desktop wrapper refuses to cache this project for annotators — they must be online to label |
| **Allow offline for reviewers** | On | Same rule for reviewers |
| **Allow metadata mirror** | On | When off, even the project's name / description / members / labeling config stay cloud-only. Stricter than offline-disabled |
| **Allow multi-device per user** | On | When off, pulling on a second device evicts the first device's local copy |
| **Allow multi-user per device** | On | When off, only one annotator can have this project on a given physical device (prevents kiosk-laptop overlap) |
| **Allow on mobile** | **Off** | When on, the project appears in the mobile app for annotation + review |
| **Require offline unlock** | On | Annotator must enter their password to unlock the encrypted offline cache. When off, the cache is still encrypted but unlocked by a device-derived key |

`allow_metadata_mirror = off` is the strictest of the offline
gates — it prevents even the dashboard from rendering this project
without an online connection. Use it for projects where "this
project exists, named X, with these members" is itself confidential.

### Annotation lifecycle

| Setting | Default | Effect when on |
|---|---|---|
| **Lock annotations after submit** | Off | An annotation cannot be edited or deleted after it's submitted. Annotators must skip / discard *before* submit to back out |
| **Annotators can delete annotations** | On | When off, only managers + reviewers can remove annotations. Annotators can still edit (subject to the lock above) |
| **Anonymise annotators in exports** | Off | Exported annotations replace the annotator user ID + email with an opaque per-project pseudonym (`annotator_a1`, `annotator_b2`, etc.) |

### Browser + session controls

| Setting | Default | Effect when on |
|---|---|---|
| **Prevent browser caching** | Off | Browser HTTP cache + intermediate proxies forbidden from storing this project's annotation data. Pages reload fresh after closing a tab |
| **Wipe cache on logout** | Off | When the annotator logs out, the browser cache + IndexedDB outbox + any device-local data for this project is wiped |
| **Require fresh session for export** | Off | Exporting requires the operator to re-authenticate (entering their password again) even if they're already signed in. Useful for audit-trail-heavy workflows |
| **Audit-log annotator actions** | Off | Every annotator action (open task, submit, skip, navigate away) lands in the **AnnotationAuditLog** table — separate from the platform audit log. Heavy on log volume; turn on for the most sensitive projects only. The log survives annotation deletion (compliance-critical) |
| **Session idle timeout (seconds)** | 0 (no timeout) | When > 0, the session expires after this many seconds of inactivity. Set to 900 (15 min) for moderate-sensitivity projects |
| **Max offline cache age (days)** | 0 (indefinite) | When > 0, locally-cached data is auto-invalidated after N days. Long-tail returners must refetch. Use to ensure stale offline data doesn't sit on a laptop for months |
| **Restrict export to managers** | Off | When on, only Manager + above can export data. Annotators see their work in the labelling stream but can't run exports. Use on crowd projects where annotators shouldn't extract corpus content |

## When each toggle matters

A worked map of which toggles to flip for common scenarios:

### PII-containing dataset (consumer signups, health records)

- **Allow offline**: off
- **Allow metadata mirror**: off
- **Lock annotations after submit**: on
- **Anonymise annotators in exports**: on
- **Prevent browser caching**: on
- **Wipe cache on logout**: on
- **Require fresh session for export**: on
- **Session idle timeout**: 900 (15 min)
- **Audit-log annotator actions**: on

### Field-recorded speech corpus (annotators in remote areas)

- **Allow offline**: **on** — they NEED it
- **Allow metadata mirror**: on
- **Allow multi-device**: off — one device per annotator only
- **Lock annotations after submit**: on — audio is hard to "undo"
- **Anonymise annotators in exports**: depends on ethics protocol

### Internal dogfood / playground project

- Just pick **Operational / Permissive** and move on

### Demo or training data with no real PII

- **Basic / Balanced** default is fine

## Where these settings take effect

The settings affect different layers:

| Setting | Enforced by |
|---|---|
| Allow offline / metadata mirror / multi-device | Desktop + mobile sync (`afri_sync` module) |
| Allow on mobile | Mobile app's project list filter |
| Lock-on-submit / annotator can delete | Backend API permission checks on annotation update/delete |
| Anonymise annotators in exports | Export pipeline (`data_export/`) |
| Prevent browser caching | HTTP response headers (`Cache-Control: no-store`) |
| Wipe cache on logout | SPA on logout — clears IndexedDB + Service Worker cache |
| Require fresh session for export | Middleware on export endpoints |
| Session idle timeout | Frontend idle detector + token-refresh path |
| Audit-log annotator actions | Audit-event sink (writes to `AuditEvent`) |

## Encrypted offline cache

A note on the offline cache (when `Allow offline = on`):

- The cache itself is **always encrypted at rest**, regardless of
  the `Require offline unlock` setting
- With **unlock required**, the encryption key is derived from the
  annotator's password — losing the password means losing the cache
- With **unlock not required**, the key is derived from the device
  + user account combination — the cache can't be moved to a
  different machine or opened from a different user's session, but
  doesn't survive a re-install of the OS

The cache is in the operator's local filesystem
(`~/Library/Application Support/AfriAnnotate/` on macOS,
equivalent paths on Windows / Linux). Project owners worried about
endpoint-security should layer disk-level encryption (FileVault /
BitLocker / LUKS) on top.

## What's not covered

These settings control **per-project** access. **Platform-wide**
data security (HTTPS, JWT, password hashing, multi-tenancy
isolation) is covered separately — see
[Security model](/annotate/platform-admin/security).

Per-org **consent collection** (the annotator's agreement to
participate in this project's data collection) is a different
feature — see [Consent library](/annotate/organization/consent).

## What's next

- **[Licensing →](/annotate/projects/licensing)** — downstream license terms for the
  dataset (different from security: licensing controls *what
  downstream consumers can do*, security controls *who can see the
  data*)
- **[Audio QC →](/annotate/projects/audio-qc)** — server-side quality checks for
  audio recordings
- **[Consent library →](/annotate/organization/consent)** — annotator-side
  consent
- **[Security model →](/annotate/platform-admin/security)** — the
  platform-wide auth / transport / storage model
