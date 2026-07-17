---
title: "You have no organisation"
sidebar_label: "No org state"
sidebar_position: 3
description: "What to do when AfriAnnotate shows You're not a member of any organisation yet."
mdx:
  format: md
---

# You have no organisation

If you sign up to AfriAnnotate **without** an invite link
and **without** being the first user on the platform, you'll land
on the **No Organisation** page.

It says: *"You're not a member of any organisation yet. Ask the
platform owner to invite you to an org."*

This is a real, deliberate state — not a bug. AfriAnnotate
doesn't auto-create an organisation around every signup because
that produces dozens of single-user orgs sprinkled across the
database, none of them coordinated.

## Why you're here

Three paths land you on this page:

1. **You self-signed-up** without clicking an invite link. The
   platform created your account but has no way to know which org
   you should belong to.
2. **You were on an org and got removed.** The org admin removed
   you (intentionally or accidentally), and you have no membership
   in any other org.
3. **Your org was deleted.** A platform owner deleted the org you
   were on. Soft-deleted orgs are restorable for 30 days; ask the
   platform owner.

## What to do

### Get an invite

The fast path. Ask an existing platform owner / org admin to:

1. Open **Organization → Members → + Invite people**
2. Type your email
3. Pick a role (Annotator / Reviewer / Manager / Admin)
4. Send

You'll get an email titled *"You've been invited to join \<Org\> on
AfriAnnotate"* with a link. Clicking the link from the same
browser that's already signed in attaches you to the org
immediately and lands you on the org's overview page.

### Open an existing invite link

If somebody sent you a link before you signed up, opening it now
(while signed in) attaches you to that org. Invite links work
once per recipient.

### Be added by a platform owner

Platform staff can pre-create your membership directly without an
email round-trip:

1. Platform owner opens **Platform → Users → + Create User** or
   finds your existing user record
2. Clicks **+ Add to org**
3. Picks the org + role
4. Save

You'll see the org appear in your sidebar on next page reload.

### Create your own org

Currently this is **not** something every user can do — by default
only platform staff can create new orgs (via
[Platform → Orgs](/annotate/platform-admin#orgs)). Platforms can lift this
restriction in **Platform → Settings → Allow users to create
orgs**, but very few do — it leads to fragmented data.

If you genuinely need your own org (e.g. you're a consultant
working with multiple teams), ask the platform owner to flip the
setting OR create the org for you.

## What you can do while on this page

- **Switch accounts** via the user menu (if you have another login)
- **Edit your profile** — name, password, language preference
- **Sign out**

What you **can't** do:

- See any projects
- Label any tasks
- Open Data Manager
- Anything else that requires an org context

The platform's design philosophy: an org-less user is a real
person who's just not connected to work yet, not a broken state.
Once you get an invite, everything works normally.

## For platform owners reading this

A signup that lands here represents either:

1. **Intentional self-signup** — somebody you want on the platform
   just signed themselves up. Invite them to the appropriate org
2. **Accidental signup** — someone reading the website signed up
   without realising they need an invite. Email them an
   explanation, or just send an invite to the org you want them on
3. **Removal recovery** — the user was removed and now has no org.
   Decide if they should be re-added

You can see every org-less user at **Platform → Users → filter
"No orgs"**. If a user is in this state for more than ~24 hours
and isn't being actioned, it's worth following up — they likely
need explicit shepherding.

## What's next

- **[Members + invites →](/annotate/organization/members)** — the invite
  flow from the org-admin side
- **[Roles →](/annotate/organization/roles)** — what each role can do once
  you're in
- **[Sign up →](/annotate/getting-started/signup)** — the signup flow that landed you here
