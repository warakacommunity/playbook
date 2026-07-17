---
title: "FAQ"
sidebar_label: "FAQ"
description: "Common questions about AfriAnnotate — email deliverability, organisation membership, mobile app, API tokens."
sidebar_position: 99
mdx:
  format: md
---

# FAQ

Common questions, especially the ones that come up during onboarding.
If your situation isn't here, check [Troubleshooting](/annotate/troubleshooting)
or open an issue at
[https://github.com/AfriAnnotate/Tool/issues](https://github.com/AfriAnnotate/Tool/issues).

## Email + sign-in

### I signed up but never got the verification email

The verification email is sent **immediately** at signup, from
`no-reply@label.afriannotate.org`. If it doesn't arrive within a
minute or two:

1. **Check spam**. Some inboxes route transactional mail there
   reflexively.
2. **Confirm DNS is healthy** by signing up with a personal Gmail
   address. If Gmail receives the email, the platform's
   infrastructure is fine and your original recipient is the problem.
3. **Corporate filter blocking the sender** is the most common reason
   for "Gmail works, my work email doesn't". University and
   corporate gateways (Mimecast, Microsoft ATP, Cisco IronPort) often
   reject mail from any shared transactional sender, regardless of
   correct SPF / DKIM / DMARC.

If it's a corporate block, your platform owner can
[mark you verified manually](/annotate/platform-admin/manual-verify) so you
can sign in, while you sort out the longer-term fix (ask your IT to
allowlist `label.afriannotate.org` as a sender).

### I verified my email but still see the "Check your inbox" page

The platform should redirect you automatically when you click the
verification link in the email. If the page still shows after a
click:

- **Reload the page**. The middleware that bounces unverified users
  to this page checks the database on every request — a successful
  verify flips the flag instantly.
- **You're logged in as a different user**. The page shows the email
  of whichever account is currently signed in. If the verify link was
  for `you@example.com` but the browser session was already signed
  in to `other@example.com`, the verify click force-logged you out
  and signed you in as `you@example.com` — but the rendered page
  might briefly still show stale state. Reload.

### Sign-out doesn't always work / takes two clicks

This was a real bug fixed in v0.1.x (revision `afri-cloud-00028-xmq`,
2026-05-05). The previous logout cleared the JWT in localStorage but
not the Django session cookie, so the next `/api/whoami` would still
return the stale session-authed user and the SPA showed "still
signed in". The fix: every sign-out now fetches `/logout` (which
kills the session cookie) AND clears the JWT, in that order, then
hard-navigates to login.

If you still see this symptom on the current version, hard-refresh
(Cmd-Shift-R / Ctrl-Shift-R) to bypass the cached SPA bundle. If it
persists, file an issue.

## Organisation membership

### I'm signed in but see "You're not a member of any organisation"

You self-signed-up without an invite link, so the platform created
your account but didn't attach you to any organisation. You can:

- Ask an existing **platform owner** or **admin** of the org you
  want to join to invite you from **Organization → Members → Invite
  people**.
- Open an **invite link** they send you in the same browser — it'll
  attach the link's organisation to your existing account, no
  re-signup needed.

This is intentional: we don't auto-create a per-user organisation,
because doing so would let anyone with the URL spin up their own
private workspace and quietly use compute / storage.

### I was in an org before but now see "You were removed from X"

A platform owner / admin of the organisation **removed your
membership**. The page names which org. Options:

- Ask an admin of that org to re-invite you.
- Open an invite link to a **different** organisation on the same
  device — your account picks up the new membership.

Soft-deleted memberships are kept in the database for the audit log;
"removed" means your `OrganizationMember` row was soft-deleted, not
hard-deleted.

## Projects

### The "Save" button is greyed out in the project create wizard

The wizard refuses to save when:

- The project **name** is empty.
- A **CSV** was uploaded and you haven't picked how to treat it
  (List of tasks vs Time Series).
- The uploaded data is **missing required fields** the label config
  expects. Hover the Save button — the tooltip names the missing
  fields (e.g. `$image`, `$text`). Either upload data that has
  those columns OR adjust the labeling config.

### The "Data Import" tab is disabled

You haven't selected a labeling configuration yet. Pick one from
the **Labeling Setup** tab first; the Data Import tab activates as
soon as the project has a non-empty config.

## Mobile

### Where do I get the Android app

The reference cloud distributes via **Firebase App Distribution**. Ask your
platform owner to add you to the testers group; you'll receive an
email with an install link. Other hosters may use the Play Store,
a private MDM, or a direct APK side-load — check with your platform
owner. See [Install the mobile app](/annotate/mobile/install) for the full
flow.

### Does the mobile app work offline

Not yet. The app is currently a thin client that loads the SPA
from the cloud at runtime, and every `/api/*` call needs network.
Offline mode for annotators is on the roadmap; the longer-running
[offline plan](https://github.com/AfriAnnotate/Tool/blob/production/docs/offline-plan.md)
covers the IndexedDB writes-outbox and local mirror work.

## API + integrations

### Where's my Personal Access Token

**Profile → Settings → Personal Access Token** (the dedicated card).
This is a JWT-based token system — you can create multiple tokens,
each with its own expiration, revocable individually. Use it as
`Authorization: Bearer <token>` in any API call.

We used to also show a "Legacy Token" card (a single static
DRF-style hex token) but removed it in 2026-05 because it
duplicated visually with the JWT one. The underlying
`GET /api/current-user/token` endpoint stays live for backward
compatibility with existing integrations, but new code should use
the JWT token system.

### How do I rotate / revoke a token

In the same Settings card, find the token in the list and click
**Revoke**. The token stops working immediately. Create a new one
to replace it.

### What's the rate limit on the API

Anonymous endpoints (`/api/auth/account-status`, `/api/auth/forgot-password`,
`/api/auth/resend-verification`) are rate-limited per (IP, email)
with exponential backoff — first retry after 15-60s depending on
the endpoint, doubling per attempt up to 30 min. Authenticated
endpoints have no explicit per-second cap but are subject to the
hoster's per-process concurrency limit (~80 in-flight requests on
the reference cloud).

## Platform admin

### How do I rename the platform / change branding

**Platform → Branding**. Rename here propagates to:
- The browser tab title
- The "Sign in to X" copy on the login page
- The "Welcome to X" greeting on the home page
- Verification + welcome emails

The DNS-level domain (`label.afriannotate.org`) doesn't change —
that's the cloud's address, not your platform's display name.

### Can I disable the legacy DRF Token UI everywhere

It's already hidden in the user profile Settings tab (2026-05).
The endpoint `GET /api/current-user/token` is still live for
existing integrations.

## Pricing + access

### Is there a free tier

AfriAnnotate is currently in early access. There's no public
pricing page yet. Reach out at
[https://github.com/AfriAnnotate/Tool/issues](https://github.com/AfriAnnotate/Tool/issues)
if you'd like to evaluate the platform with your team.
