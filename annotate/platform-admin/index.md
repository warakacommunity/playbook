---
title: "Platform admin"
sidebar_label: "Overview"
sidebar_position: 0
description: "What lives under Platform → in the sidebar — users, orgs, roles, audit log, notifications, settings, branding, rate limits, feature flags."
mdx:
  format: md
---

# Platform admin

The **Platform** section in the sidebar is the operator-level
surface — different from per-organisation admin pages.

Visible to users with `is_staff` = true (Platform staff) or
`is_superuser` = true (Platform owner). The first user on a fresh
deployment is auto-promoted to both.

## The eight surfaces

| Page | What it does | Who can see |
|---|---|---|
| **Dashboard** | Cross-org KPIs — active users, total orgs / projects / tasks, recent activity. The platform owner's "is everything OK?" view. | Platform staff |
| **Users** | Manage every user across every org. Create / disable / promote, force-verify email, reset passwords, generate PATs. | Platform staff |
| **Orgs** | Create new organisations, transfer ownership, freeze, delete. The cross-tenant lever. | Platform owner |
| **Roles** | Edit role permissions matrix — who can create projects, who can see Data Manager, etc. | Platform owner |
| **Audit log** | Cross-org audit log — every staff action + sensitive user action. Searchable, exportable. | Platform staff |
| **Notifications** | Email templates (verify, reset, welcome) + notification-center config. | Platform staff |
| **Settings** | Branding (platform name, logo, favicon, From email), rate limits per endpoint, feature flags. | Platform owner |
| **Security model** | Reference page on auth, transport, storage, isolation — already covered at [Security](/annotate/platform-admin/security). | Anyone |

## What's "staff" vs "platform owner"

Two flags, slightly different scopes:

- **`is_staff` = true** — sees the entire Platform section but can't
  do destructive cross-tenant actions (delete an org, change role
  definitions, rotate the platform secret key).
- **`is_superuser` = true** — sees + does everything, including
  Django admin.

By convention the first user is both. Operators typically promote a
second person to `is_staff` only (a deputy who can troubleshoot
email + reset passwords but can't accidentally delete the org).

Promotions happen via **Platform → Users → click user → role badge**.

## Where each page is documented

The Platform section has its own pages spread across this docs
section:

- **Security** → [Security model](/annotate/platform-admin/security)
- **Email + DNS** → [Email delivery](/annotate/platform-admin/email)
- **Force-verify a user** → [Mark a user verified](/annotate/platform-admin/manual-verify)
- **Operator FAQ** → [Operator FAQ](/annotate/platform-admin/operator-faq)
- **Distribution** → [Distribution overview](/annotate/platform-admin/distribution)
- **Dashboard, Users, Orgs, Roles, Audit, Notifications, Settings** →
  Below on this page.

The remaining surfaces below haven't yet got dedicated deep-dive
pages — this overview is the source for now. Open
[https://github.com/AfriAnnotate/Tool/issues](https://github.com/AfriAnnotate/Tool/issues) if you'd like one of them
expanded.

## Dashboard

**Platform → Dashboard**.

Six panels at the top:

- **Today / yesterday / last 7d / last 30d**: tasks created,
  annotations submitted, distinct active users
- **Orgs**: total count + new orgs this month
- **Users**: total + signups this week + verified rate
- **Storage**: GCS / S3 / Azure connections active, bytes stored
  (estimate from latest backend audit)
- **Errors**: count of 5xx responses + exceptions in the last 24h,
  with a link to the audit log filter
- **Top orgs** by annotation count this month — a leaderboard

For deep analytics, the per-org metrics pages
([Organisation → Metrics](/annotate/organization/metrics)) give the same
data scoped to one org at a time. The Platform dashboard is the
union.

## Users

**Platform → Users**.

A searchable table of every user in every org. Columns:

| Column | Meaning |
|---|---|
| **Name + email** | Click to open the user detail modal |
| **Orgs** | Comma-separated list of orgs the user is a member of |
| **Roles** | Org-by-org role badges (OW / AD / MA / RE / AN) |
| **Last seen** | Last successful login |
| **Status** | Active / Disabled / Email-unverified / Locked |

Click a row → modal with **Edit** / **Disable** / **Force-verify**
/ **Generate PAT** / **Reset password** / **Toggle is_staff**.

The modal is the same surface the per-org Members page uses, just
unscoped. See [Members](/annotate/organization/members) for the form
fields.

## Orgs

**Platform → Orgs**.

Create a new org, rename, transfer ownership, freeze (read-only),
or delete. Visible only to `is_superuser` since these are
destructive cross-tenant actions.

- **Create**: opens a wizard that asks for name, initial owner
  (must be an existing user), and consent-library defaults
- **Transfer ownership**: changes the org's owner. The previous
  owner is downgraded to Admin
- **Freeze**: makes the org read-only — annotators can label, but
  no new projects / data imports / member changes happen. Useful
  during legal holds
- **Delete**: soft-deletes (30-day undo); hard-purge happens
  automatically after the retention window. Annotators in deleted
  orgs see "you're not a member of any organisation" until
  attached to a new one

## Roles

**Platform → Roles**.

The platform's role matrix. Six roles (Owner / Admin / Manager /
Reviewer / Annotator / Guest) with ~30 permissions each. Each
cell is a tick / cross.

Editing role permissions is a **platform-owner-only** action — it
affects every org. Operators rarely change the matrix; the defaults
come from upstream Label Studio + AfriAnnotate's role audit.

See [Roles](/annotate/organization/roles) for the per-role descriptions.

## Audit log

**Platform → Audit log**.

Every staff action + sensitive user action lands here:

- User events: signup, login, logout, password change, email
  change, manual verify, deactivation, role changes
- Org events: create, rename, member added / removed
- Project events: create, archive, delete, publish
- Token events: PAT created / revoked
- Consent events: signature, revocation
- Data-export events: snapshot taken, exported via API

Each row: action type, target object, actor, timestamp, IP, and a
`meta` JSON blob with action-specific detail.

Filters: action type, actor, target, date range. Exportable to CSV
or JSONL.

The audit log is **append-only** at the database layer — `INSERT`
allowed, `UPDATE` / `DELETE` blocked by a CHECK constraint. Combined
with the consent module's HMAC hash chain, this gives a tamper-
evident audit surface that holds up to compliance scrutiny.

Retention: indefinite by default. Adjust via **Settings → Audit
retention** (kept in `PlatformSettings.audit_retention_days`).

## Notifications

**Platform → Notifications**.

Two sections:

### Email templates

Per-kind template editor for transactional mail:

- Verification ("Verify your email")
- Welcome (for the first user on a fresh platform)
- Forgot password ("Reset your password")
- Email change initiated (sent to new + old addresses)
- Resend verification
- Admin pre-create user ("Set up your account")

Each template is markdown with `{{verify_url}}`, `{{display_name}}`,
`{{platform_name}}` variables substituted at send time.

Saving a template doesn't retroactively change in-flight emails;
the next message of that kind picks up the new copy.

### Notification center

In-app notifications (bell icon in the top-right of the SPA). Each
event type (e.g. "consent revoked", "annotation rejected", "review
queue grew") has a toggle for whether to surface as a notification.

Per-user overrides happen in **Profile → Notifications**; this page
is the *default* for every new user.

## Settings

**Platform → Settings**.

Three sections:

### Branding

- **Platform name** — propagates to browser title, login page,
  email subjects, mobile splash
- **Logo** — used in the navbar + email headers
- **Favicon** — browser tab icon
- **From email** — the From address every transactional message
  lands as. Must match the SPF-authorised domain
- **Support email** — surfaced in error pages + email footers as
  "contact support"
- **Tagline** — the one-line description below the logo

### Rate limits

Per-endpoint backoff base + cap, adjustable without a deploy. Three
endpoints currently tunable:

- `account_status` (the email-first probe)
- `forgot_password`
- `resend_verification`

Defaults: base 15-60 s, cap 30 min, exponential. Tune up for
high-traffic deployments (Mimecast retry storms); tune down for
internal-only platforms.

### Feature flags

Boolean / string toggles for AfriAnnotate features that ship behind
a flag during rollout. Operators flip them per platform; flags
default to whatever `feature_flags.json` ships with.

Common flags (subject to change as features graduate / sunset):

- `fflag_feat_audio_qc_heavy_checks` — opt-in heavy QC pipeline
- `fflag_feat_consent_typed_signature` — typed-sig support on
  consent templates
- `fflag_feat_offline_sync_indexeddb` — desktop offline cache

The mobile app pulls the flag set live at launch via
`/api/feature-flags/public/` — see
[Mobile architecture](/annotate/mobile/architecture).

## What's next

- **[Security model →](/annotate/platform-admin/security)** — auth, transport, storage,
  isolation
- **[Email delivery →](/annotate/platform-admin/email)** — SMTP provider + DNS records
- **[Mark a user verified →](/annotate/platform-admin/manual-verify)** — manual override for
  the verify-email gate
- **[Operator FAQ →](/annotate/platform-admin/operator-faq)** — troubleshooting for hosters
- **[Distribution overview →](/annotate/platform-admin/distribution)** — mobile + desktop
  builds
