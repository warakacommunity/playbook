---
title: "Mark a user as verified"
description: "Override the email-verification gate when a user's mail provider rejects the verify link."
sidebar_position: 3
mdx:
  format: md
---

# Mark a user as verified

When a user's email provider rejects the verification email (most
common: corporate / university gateways like Mimecast that block
shared transactional-mail IPs), they can't sign in. AfriAnnotate
gives the platform owner an explicit override.

## When to use this

Reach for it ONLY when both are true:

1. The user has signed up but never clicked their verify link.
2. You've **tested** that the system can deliver verification mail
   in general — i.e. it works for Gmail addresses. If it doesn't,
   the SMTP / DNS is broken and you should fix the infrastructure
   first; manual verify is an escape hatch, not the default flow.

If you skip the test and the user's mail filter happens to also
strip your "welcome" message, you'll have manually-verified a
user who has no way to receive password resets or notifications
later. Confirm the infrastructure delivers, then accept that this
ONE recipient's filter is the problem.

## How to do it

1. Sign in as a platform owner / staff user.
2. Open **Platform → Users** in the sidebar.
3. Click the user's row, or click **Edit**. A modal opens.
4. Scroll to the **Email verification** section.
5. Click **Mark as verified**.

The button only appears for users whose email isn't yet verified.
For users who've already self-verified, the section shows the
verification date and no button (it's idempotent — re-calling
the endpoint on an already-verified user is a 200 no-op).

## What this changes

When you click the button:

- `is_email_verified` flips to `true` on the user.
- `email_verified_at` is set to now.
- An entry lands in the **audit log**: `user.verify_email_manual`,
  with `verified_by = <your email>` in the metadata so the action
  is traceable.
- The user can now sign in normally. The middleware that bounces
  unverified users to `/verify-email/required/` lets them through.

The user's password and other state are untouched. They sign in
with the password they set at signup.

## What this does NOT change

- Their email address — still the unverified one.
- Their organisation membership — they still need an invite or
  to be added via **Platform → Users → + Create User** if they're
  on a fresh signup.
- Future emails — password reset, notifications, anything else
  going to that address will keep bouncing if the provider's
  filter is the root cause. Tell the user to use a personal email
  for receiving notifications, or ask their IT to allowlist your
  sending IPs.

## Working around the underlying mail block

A few longer-term fixes once you've manually unblocked the user:

1. **Ask the recipient's IT to allowlist your sender**. Provide them
   with your domain (`label.afriannotate.org`), SPF (`v=spf1
   include:spf.brevo.com -all`), and DKIM selectors. Most
   corporate IT desks will allowlist a verified, DKIM-signed
   transactional sender on request — it just takes a ticket.

2. **Move the user to a personal email**. They can re-sign-up with
   Gmail / Outlook / iCloud / a personal domain, and you can
   transfer their existing memberships from the original account
   via the SDK or the Django admin.

3. **Pay for a dedicated IP from your email provider**. Shared IPs
   at any transactional provider eventually pick up some bad
   reputation; dedicated IPs that you control are cleaner with
   strict filters. Pricing varies by provider — typically
   $50–$100/mo as of 2026.

## Audit

Every manual verify is logged. To review:

1. Open **Platform → Audit log**.
2. Filter by action type `user.verify_email_manual`.
3. Each row shows: the target user, the staff member who verified
   them, and the timestamp.

This is the same audit surface that records org-deletes,
permission grants, and other staff actions.
