---
title: "Security model"
sidebar_label: "Security model"
description: "How AfriAnnotate handles auth, transport security, data storage, and access controls."
sidebar_position: 1
mdx:
  format: md
---

# Security model

AfriAnnotate is a multi-tenant platform. The security model below
describes the auth, transport, storage, and isolation guarantees the
software gives you — independent of which cloud or self-hosted
environment it's deployed to.

:::info Reference deployment
The worked examples below describe the **AfriAnnotate cloud at
`label.afriannotate.org`**, which runs on Google Cloud Run + Cloud SQL + GCS
with Cloudflare for DNS. Self-hosters get the same application-level
guarantees (HSTS, HttpOnly cookies, query-level org filtering,
PBKDF2 password hashing) regardless of the underlying infrastructure —
the differences are in *who* operates the TLS terminator, database
backups, and storage encryption.
:::

## Transport

- All traffic to `label.afriannotate.org` is **HTTPS only**. The TLS
  certificate is managed by the hoster's TLS terminator (Cloud Run,
  ALB, Caddy, nginx + Let's Encrypt — operator's choice). The
  reference cloud uses Google-managed certs that auto-renew.
- HTTP requests are 301-redirected to HTTPS at the edge.
- HSTS is enabled with a one-year `max-age` (set by the app).
- The reference cloud uses Cloudflare for DNS only (gray cloud),
  so the TLS session is end-to-end between the browser and the
  origin load balancer. Self-hosters can put any CDN / no CDN in
  front; HSTS keeps the browser pinned to HTTPS regardless.

## Authentication

- **Web + mobile**: email + password. Passwords are stored as
  Django PBKDF2 hashes (default 600k iterations), never plaintext.
- **Email verification** is required before sign-in for all non-
  first users. Verify links are one-shot tokens with a 24-hour
  TTL; clicking marks the user verified and stamps the audit log.
- **Session cookies** are `HttpOnly`, `Secure`, `SameSite=Lax`, and
  scoped to `label.afriannotate.org`. Default lifetime is 2 weeks.
- **JWT tokens** are minted on every session login and stored in
  `localStorage` for the SPA. Token lifetimes default to 5 min
  (access) / 24 hours (refresh). Refresh rotates automatically.
- **API tokens (PATs)** are JWTs you generate yourself in
  **Profile → Settings**. They use the same Bearer-header
  authentication as session-minted JWTs. See
  [API → Authentication](/annotate/api/overview#authentication).

### Rate limits + brute-force protection

- Anonymous auth endpoints (forgot password, resend verification,
  account-status probe) are rate-limited per (IP, email) with
  exponential backoff — first retry 15-60s, doubling per attempt,
  caps at 30 min.
- Failed-login attempts trigger no per-account lockout — industry
  experience shows lockouts cause more support load from
  legitimate users than they prevent unauthorised access. The
  exponential per-IP backoff on the login endpoint is what slows
  down credential-stuffing.
- Operator-tunable: `PlatformSettings` lets the platform owner
  adjust the rate-limit base + cap for each endpoint without a
  deploy.

## Authorisation

AfriAnnotate's role model is two-tiered:

1. **Org membership + role**: every user belongs to zero or more
   organisations. Within each org they hold one role: Owner (OW),
   Admin (AD), Manager (MA), Reviewer (RE), Annotator (AN), or
   Guest (GU). The role gates what they can see and do in that
   org. See [Roles](/annotate/organization/roles) for the full matrix.
2. **Platform-level flags**: `is_staff` (visibility into Platform
   Settings) and `is_superuser` (full Django admin access). The
   first user on a fresh platform is auto-promoted to both;
   subsequent users default to neither.

Within a project, members can hold a **per-project role** that
overrides their org-level role (e.g. an org-level Admin who's only
an Annotator on a specific project). Project roles are managed
from **Project → Members**.

## Data storage

- **Database**: PostgreSQL. The reference cloud runs Google Cloud
  SQL with daily automated backups + 7-day point-in-time recovery,
  encrypted at rest by GCP. Self-hosters configure backups +
  encryption against their own Postgres.
- **Uploaded files** (CSVs, images, audio): object storage. The
  reference cloud uses Google Cloud Storage; self-hosters can point
  the platform at any S3 / GCS / Azure Blob bucket via env vars.
  Buckets are private; access is short-lived signed URLs minted by
  the backend.
- **User passwords**: Django PBKDF2 hashes (one-way; never
  reversible).
- **Cloud connector credentials** (GCS / S3 / Azure access keys
  you provide for external storage integration): encrypted with
  `SECRET_KEY` before being stored in the database.
- **Third-party API tokens** (Hugging Face Hub PAT and any future
  Weights & Biases / Comet / SageMaker-style secrets a user pastes
  in to enable a per-user integration): encrypted at rest via
  `core.encrypted_fields.EncryptedCharField`. Fernet cipher keyed
  from a dedicated `HF_TOKEN_ENCRYPTION_KEY` env var (recommended for
  production so key rotation is decoupled from `SECRET_KEY`), with a
  `SECRET_KEY`-derived fallback so fresh dev environments work
  without extra config. Never returned in any API response — the
  User serializer surfaces only a boolean `has_hf_token` flag; the
  raw value only leaves the DB when the server-side push/import code
  makes an outbound call to the third-party API.
- **JWT signing key**: the same Django `SECRET_KEY`, rotated only
  on operator-initiated key rotation (which invalidates all live
  tokens).

### DB-only compromise threat model

The encrypted-at-rest layer protects against **DB-only compromise**
(leaked backup file, read-only SQL access via a misconfigured
replica, a table-dump from an over-permissive support agent). An
attacker with just DB access can't turn the ciphertext into a usable
Hugging Face token — they'd need `HF_TOKEN_ENCRYPTION_KEY` (or the
current `SECRET_KEY`) too.

It does NOT protect against **RCE on the app server** or **memory
scraping of a running app process** — an attacker in the app's own
process can load the key and decrypt. That tier needs a real
secrets manager (GCP Secret Manager / HashiCorp Vault / AWS KMS +
envelope encryption) with credentials that don't sit on the app
node, and it's on the operator to wire up when the threat model
demands it.

## Multi-tenancy

- Every database row carries an organisation foreign key.
- Every query is filtered by the requesting user's active
  organisation; the org filter is enforced at the queryset level
  in DRF permissions, not just at the URL level. There's no path
  by which a user in org A can see rows from org B by guessing IDs.
- The active organisation switcher in the sidebar changes the
  `active_organization` foreign key on the user row; from that
  point, all subsequent queries scope to the new org.

## Audit log

Operator-visible actions land in an audit log:

- User events: signup, login, logout, password change, email
  change, manual-verify by admin, deactivation, role changes,
  org additions/removals.
- Org events: create, rename, member added/removed.
- Project events: create, archive, delete, publish.
- Token events: PAT created / revoked; **third-party token set /
  cleared** (Hugging Face Hub PAT — the audit row includes actor,
  IP, timestamp, and a 3-character prefix like `hf_` as a flavour
  marker; the raw token value is never written to the log).
- HF Hub events: dataset import, push (fresh / enrich-source / fork),
  unbind. Push events capture the target repo id + aggregation
  strategy.

Each entry records: action type, target object (user / project /
org), the staff member who took the action (or the user
themselves for self-service actions), timestamp, and a small JSON
`meta` blob with action-specific detail.

Access via **Platform → Audit log**. Staff-only. Searchable +
exportable to CSV.

## Compliance

- **GDPR** / **POPIA** (South Africa): users can self-delete their
  account from the profile page (cascades soft-deletes across
  their annotations + cloud storage refs). Org admins can do the
  same on behalf of removed members.
- **Consent management**: the platform supports per-purpose
  consent templates managed at the org level (annotator agreement,
  data retention policy, etc.). See
  [Consent library](/annotate/organization/consent) when published.
- **Data retention**: deletions hard-purge after 30 days. Audit
  entries for deletions are kept indefinitely so the deletion
  itself is traceable.

## Reporting a vulnerability

Email security disclosures to **security@afriannotate.org**. We aim
to acknowledge within 48 hours and ship a fix within the standard
GitHub Security Advisory disclosure window (typically 14-90 days
depending on severity).

If the vulnerability is in upstream dependencies (Django, DRF, your
cloud provider's runtime / storage), report upstream first; we'll
mirror the fix when the upstream patch lands. For AfriAnnotate-specific issues, report directly to
the email above — please don't open a public GitHub issue for an
unpatched vulnerability.
