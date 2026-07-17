---
title: "Your account"
sidebar_label: "Your account"
description: "View + edit your profile, change your password, and manage personal access tokens on AfriAnnotate."
sidebar_position: 2
mdx:
  format: md
---

# Your account

Manage your profile, password, and API tokens from the profile page.
Click your avatar in the sidebar (or the top-right on mobile) → your
name to land on `/users/<your-id>`.

The page has tabs along the top: **Info**, **Settings**, plus
**Cloud sync** / **Analytics** / **Consents** depending on your
role.

## Info tab — read-only snapshot

A static view of your profile as everyone else sees it:

- Display name (first + last)
- Email address (current)
- Phone (if set)
- Avatar
- Organisation membership (which orgs, what role in each)
- Annotation count (across all projects you're a member of)

Everything here is read-only — to actually edit anything, jump to
the **Settings** tab.

## Settings tab — editable

The Settings tab pairs the form + the per-section panels in two
columns at wide widths:

### Personal info (left card)

- **First name** + **Last name** — text inputs, save with the
  card-bottom **Save** button.
- **Email** — shown as read-only with a separate **Change email**
  button. Clicking it expands a sub-form for the new address. The
  current email stays active until you click the verify link the
  platform emails to the new address.
- **Phone** — text input, save with the same Save button.
- **Avatar** — drag in an image (max 1200×1200, 1 MB) or click
  **Delete** to remove.

If you've started an email change but haven't clicked the verify
link, you'll see a "Pending change to <new@example.com> — check
that inbox to complete" hint below the email row.

### Change password (right card)

- **Current password** (required for verification)
- **New password** (min 8 characters)
- **Confirm new password** — must match
- **Update password** button on the right

After a successful change, the form clears + a toast confirms.
Your active session stays signed in; other sessions are not
forcibly invalidated, but any JWTs minted with the old password
hash become unrenewable on next refresh.

The two cards are paired side-by-side on wide screens and stack on
phones / narrow tablets.

### Personal Access Token (below the pair)

A single card for managing your JWT-based API tokens:

- **+ Create new token** — opens a dialog. Pick a label + an
  expiration (7 / 30 / 90 / 180 / 365 days, or never).
- After creation, **copy the token immediately** — the platform
  shows it once. You can't retrieve it later, only revoke + replace.
- Each token has its own **Revoke** button. Revoking is immediate.

Use tokens as `Authorization: Bearer <token>` in API calls — see
[API → Authentication](/annotate/api/overview#authentication) for the full
reference.

### Language

A language switcher at the top of the Settings tab. Sets the locale
for the SPA + the templates served to your browser. Currently
supported: English (default), with Hausa / Swahili / French /
Portuguese / Amharic planned.

### Membership info

A summary of your org memberships with the role you hold in each.
For more, see [Members](/annotate/organization/members) and
[Roles](/annotate/organization/roles).

## Cloud sync tab (desktop-only)

Visible only when you're on the desktop app, not on the cloud web
UI. Manages the desktop's local-Django mirror + cloud sync
preferences. Details in the repo's offline plan.

## Consents tab

Lists every consent template you've accepted, with the version,
date, and an option to **Revoke**. Revoking an actively-required
consent removes your access to projects requiring it; past
annotations stay in the dataset, flagged. See
[Consent library](/annotate/organization/consent).

## What you can do that the upstream Label Studio guide doesn't mention

- **Change your email** — supported via the verify-the-new-address
  flow.
- **Multiple Personal Access Tokens** — create as many as you need,
  each with its own expiration and revocation.

## What's next

- **[Security model →](/annotate/platform-admin/security)** — what
  AfriAnnotate does behind the scenes to keep your password safe
- **[API → Authentication →](/annotate/api/overview#authentication)** —
  using your PAT in scripts
- **[Roles + permissions →](/annotate/organization/roles)** — what your
  org role lets you do
