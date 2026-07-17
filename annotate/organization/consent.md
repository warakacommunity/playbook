---
title: "Consent library"
sidebar_label: "Consent library"
description: "Manage organisation-wide consent templates and per-project consent requirements on AfriAnnotate."
sidebar_position: 4
mdx:
  format: md
---

# Consent library

The Consent Library is an org-level surface where Owners and Admins
manage **consent templates**: documents annotators must accept
before they can label tasks. Project owners then pick which
templates to require on each project from **Project Settings →
Consent**.

This is an AfriAnnotate feature on top of the upstream Label Studio
codebase. It's designed for African data-labeling projects where
contributor consent (PII handling, voice-recording reuse, data
retention policy) is a regulatory expectation under POPIA, GDPR,
and similar regimes.

## Where it lives

**Organization → Consent library**. Visible to org Owners,
Admins, and platform staff.

## What's on the page

Three sections:

1. **Templates** — the master list. Every consent template owned by
   the org, with kind (Annotator agreement, Data retention, etc.),
   version, and archive state.
2. **Defaults** — which templates new projects require by default.
3. **Request log + audit history** — every consent acceptance / 
   revocation across all projects in the org, searchable + 
   exportable.

## Create a template

From the Templates section:

1. Click **+ New template**.
2. Fill in:
   - **Title** — what annotators see at the top of the consent
     dialog
   - **Kind** — pre-defined categories (Annotator agreement, Data
     retention, Voice recording reuse, Image use, Custom)
   - **Body** — the actual consent text, markdown supported
   - **Purposes** — optional per-purpose toggles (e.g. "Allow my
     voice to be used for ML training" + "Allow my voice to be
     redistributed in academic datasets" as separate checkboxes)
3. Click **Save**.

Templates are versioned automatically — each save bumps the version
number. Older versions stay in the audit log for any annotator who
already accepted them.

## Edit / archive a template

- **Edit** — opens the same form. Saving bumps the version. The
  next time an annotator opens a project that requires this
  template, they'll see the new version and re-accept.
- **Archive** — soft-deletes the template. New projects can't
  require it; existing acceptances stay in the audit log.

## Per-project consent

Templates are managed at the **org** level, but **required at the
project** level:

1. Open **Project → Settings → Consent**.
2. Toggle which templates from the org library are required for
   THIS project.
3. (Optional) Mark templates as **gating** — annotators can't open
   the labeling stream until they've accepted gating templates.

Non-gating templates show up as a banner at the top of the labeling
UI; annotators can dismiss them.

## What annotators see

On their first task open in a project with required consent:

1. A modal opens listing each required template by title.
2. Each template has its body rendered + the per-purpose checkboxes
   (if defined).
3. Annotator clicks **I agree** + **Continue**.
4. The acceptance is logged with:
   - User ID
   - Template + version
   - Per-purpose answers (if any)
   - Timestamp
   - Project ID

Re-accepting after a template version change works the same way —
annotator sees a diff (current version vs accepted version)
highlighted.

## Audit log

Every acceptance and revocation lands in:

- **Per-template log** on the Consent library page (filter by
  template)
- **Org-wide audit log** at **Platform → Audit log**
  (filter `action = consent.accept` or `consent.revoke`)

Both surfaces are exportable to CSV.

## Revoking consent

Annotators revoke from their profile:

1. **Profile → Consents**
2. Each previously-accepted template shows with current acceptance
   state.
3. Click **Revoke** on any template.

Revocation:
- Logs immediately
- Removes the annotator's access to projects requiring that
  template (next time they open the project)
- Does NOT delete past annotations — those stay in the dataset,
  flagged as "labelled before consent was withdrawn"

The retention policy for data labelled before withdrawal is
controlled by your org's Data retention template; review it at
[Consent → Defaults](/annotate/organization/consent).

## PDF + CSV export

Org admins can export every accepted template as PDF (for
compliance audits) or CSV (for analysis):

1. **Organization → Consent library → Audit history**.
2. Filter by date range / template / user.
3. Click **Export PDF** or **Export CSV**.

PDFs include the template body, the acceptance timestamp, and the
user's identity verification (whether the email was verified at the
time of consent).

## Technical depth

A few features that matter for compliance audits but aren't visible
on the day-to-day UI:

### Typed signatures

Beyond the simple "I agree" checkbox, templates can require a
**typed signature** — the annotator types their full name into a
text field that must match their account's `first_name + last_name`
within a configurable Levenshtein distance. Useful for legal /
ethics-board-mandated consent where a click-through isn't strong
enough.

Configure per template: **Templates → Edit → Require typed
signature** → yes / no.

### Age attestation

Templates can require **age attestation** — the annotator confirms
they're over 18 (or another age threshold configured on the
template) before the consent is recorded. Stored as a separate
field on the signature so under-age signatures are filterable in
the audit log.

GDPR Article 8 and POPIA section 35 both require explicit attestation
for under-18 consent; this is how the platform supports it.

### Country-of-residence capture

Optionally capture the annotator's country of residence at signing
time — a dropdown sourced from ISO 3166-1. Used for:

- Compliance reporting ("we have consent from N annotators in
  these 12 countries")
- Cross-border data-transfer notices (some templates show
  jurisdiction-specific addenda)
- Per-purpose filtering on export ("only include consents from
  annotators in EEA countries")

### Tamper-evident audit log

Every signature is HMAC-SHA256-hashed against the previous
signature's hash, forming a chain. Any retroactive edit to a past
signature breaks every subsequent hash, so post-hoc tampering is
detectable.

Verification:

```bash
# Spot-check a single signature
curl "https://label.afriannotate.org/api/consent/signatures/<id>/verify" \
  -H "Authorization: Bearer YOUR_PAT"

# Verify the whole chain for a project (catches retroactive edits)
curl "https://label.afriannotate.org/api/consent/signatures/verify-chain?project=<id>" \
  -H "Authorization: Bearer YOUR_PAT"
```

Both endpoints return `{"valid": true | false, "broken_at": <signature_id>}`.

Implementation: `label_studio/consent/models.py` — see the
`_hash_chain()` function for the exact HMAC construction. The key
is derived from `SECRET_KEY` per-org so rotating `SECRET_KEY`
invalidates the chain (expected; document the rotation in your
ops runbook).

## What's next

- **[Members + invites](/annotate/organization/members)** — who's on the org
- **[Security model](/annotate/platform-admin/security)** — how consent
  audits fit into the broader compliance + audit framework
- **[Profile + consents](/annotate/getting-started/account)** — what
  annotators see
