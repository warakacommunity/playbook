---
title: "Sign up and invite people"
sidebar_label: "Sign up + invite"
description: "Create your AfriAnnotate account, verify your email, and invite teammates to your organisation."
sidebar_position: 1
mdx:
  format: md
---

# Sign up and invite people

AfriAnnotate accounts live on the cloud. Sign-up is a few clicks; the
trickier part is **who lands where**, because the platform branches
the experience based on whether you're invited, self-signing-up, or
the first user.

## Create an account

1. Open [**label.afriannotate.org**](https://label.afriannotate.org).
2. Type your email and click **Continue**.
   - If the email is **known**, you'll see the password prompt
     (sign-in mode).
   - If it's **unknown**, you'll be routed to the signup form.
3. Set a password (8 characters minimum) and confirm it.
4. Click **Create Account**. AfriAnnotate sends a verification email
   from `no-reply@label.afriannotate.org` to the address you entered.
5. Open that email and click **Verify email**.
6. After the click, AfriAnnotate signs you in automatically and sends
   you to your landing page — no second password prompt.

## Where you land after verifying

AfriAnnotate routes you to one of three places depending on your
situation:

### A. First user on the platform → platform owner

If you're the **first** user ever on the platform, AfriAnnotate:

- Auto-creates the default organisation around you.
- Promotes you to **platform owner** (`is_superuser` + `is_staff`).
- Auto-verifies your email (no link required — there's no one to chase
  you up if the mail fails).
- Sends a welcome email confirming the platform is yours to configure.

You land on the home page with **Platform Settings** visible in the
sidebar. Rename the default org under **Platform → Branding**.

### B. Invited via an invite link → joined directly

If you signed up via an **invite link** an admin sent you (the link
contains a token, e.g. `?token=…`), AfriAnnotate:

- Creates your account.
- Attaches you to the inviter's organisation as an **Annotator**
  (default role).
- Sends a verify email — click the link to confirm, then you're in.

You land on the home page with the inviting org's projects visible.

### C. Self-signup without an invite → no organisation yet

If you signed up directly at `label.afriannotate.org` without an invite
link, AfriAnnotate:

- Creates your account.
- Does **not** attach you to any organisation. (We deliberately don't
  auto-create a per-user organisation — that would let anyone with the
  URL spin up their own workspace.)
- Sends the verify email.

After verifying, you land on the **"You're not a member of any
organisation yet"** page. You can still:

- View / edit your profile (`/users/<your-id>`).
- Change your password.
- Sign out and back in.

You **cannot** see projects, members, or platform settings until an
existing platform owner invites you to their org — see [Invite
people](#invite-people-to-your-organisation) below.

## Invite people to your organisation

Two ways, depending on the role and the urgency.

### Invite link (self-serve)

For onboarding many annotators at once, share an invite link. Anyone
with the link can join your org.

1. Sign in as a platform owner / admin.
2. Open **Organization → Members → Invite people**.
3. Copy the invite URL. Share it with your team (Slack, email, etc.).
4. Recipients click the link, create their account (steps above), and
   land in your organisation as Annotators by default.

You can rotate the invite token (regenerate the link) any time —
existing accounts stay; future joiners with the old token are
rejected.

### Pre-create the user (operator-driven)

For named people who'll get a specific role, pre-create:

1. Open **Platform → Users → + Create User**.
2. Fill in name + email + (optional) starting role.
3. Choose **Invite mode** — sends them a setup-link email so they can
   set their own password. (Choose **Set password now** to type it
   yourself if you'll hand them credentials in person.)

The user receives an email with a one-shot **Set password** link. The
link auto-verifies their email + signs them in on the first click —
they don't need to also click a separate "verify email" link.

## Common gotchas

- **The verify email didn't arrive.** Check spam, then try a personal
  Gmail address. Corporate filters (Mimecast, university mail) often
  reject transactional senders. If the user is genuinely blocked, a
  platform owner can [mark them verified
  manually](/annotate/platform-admin/manual-verify) so they can sign in.
- **The user signs in but sees "no organisation".** They self-signed-up
  without an invite. Invite them from **Organization → Members →
  Invite people**, or pre-create them with a role from **Platform →
  Users**.
- **"Wrong account after signing out"**. Clear your browser session
  (close + reopen the tab) and sign in again with the intended account.
  The platform clears both the JWT in localStorage and the Django
  session cookie on sign-out, but a stuck browser cache can rarely
  still serve a stale page — a hard refresh fixes it.

## What's next

- **[Set up your first project →](/annotate/projects/setup)**
- **[Manage members + roles →](/annotate/organization/members)**
- **[Manual verify (for stuck users) →](/annotate/platform-admin/manual-verify)**
