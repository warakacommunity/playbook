---
title: "Members + invites"
sidebar_label: "Members + invites"
description: "Add, remove, and manage members of your AfriAnnotate organisation."
sidebar_position: 1
mdx:
  format: md
---

# Members + invites

Every user on AfriAnnotate belongs to zero or more **organisations**.
Within each org they hold one **role** (Owner, Admin, Manager,
Reviewer, Annotator, Guest) that gates what they can see and do.
For the full role matrix, see [Roles + permissions](/annotate/organization/roles).

This page covers the operations: adding members, inviting people,
changing roles, removing members.

## Find members

Open **Organization → Members** from the sidebar. The page shows
every member of the current org with their role, status, and date
joined. You can filter by role or status, and search by name /
email / username.

The members page is visible to Owners, Admins, and Managers. The
**Invite people** and **+ Add member** buttons are scoped per-role
— Managers can add but not change Owners or Admins, Admins can do
everything except give the Owner role.

## Invite link (self-serve onboarding)

For onboarding many annotators at once:

1. Open **Organization → Members → Invite people**.
2. Copy the invite URL — the link contains a token unique to this
   org.
3. Share the link (Slack, email, etc.).
4. Recipients click it, create their account (or sign in if they
   already have one), and land in your organisation. New users
   join as **Annotators** by default; their role can be changed
   later from this page.

To rotate the link, click **Regenerate**. The previous token stops
working immediately. Existing accounts stay; only future joiners
with the old token are rejected.

## Add a specific person (pre-create)

For named people who'll get a specific role:

1. Open **Platform → Users → + Create User** (staff-only).
2. Fill in name, email, and starting role.
3. Choose **Invite mode** — the platform sends a setup-link email
   so the user sets their own password.

Use **Set password now** if you'll hand them credentials in person.
The user can change the password later from their profile.

## Change a member's role

From **Organization → Members**, click the role chip next to the
member's name and pick a new one. Allowed transitions depend on
your own role:

- **Owners** can grant any role including Owner (only one Owner
  per org).
- **Admins** can grant Admin, Manager, Reviewer, Annotator, Guest.
- **Managers** can grant Manager (in projects they own), Reviewer,
  Annotator.

Role changes audit-log with the actor + previous and new role.

## Remove a member

From the member row, click **Remove**. The user's
`OrganizationMember` row is **soft-deleted** — the audit trail keeps
the row, but the user no longer appears in the active members list
and their organisation-scoped queries return empty.

The user's account is **not** deleted; they can still sign in. If
they had no other organisations, they'll see the "You were removed
from X" empty-state page (the X names the most recently removed
org). They keep access to their profile and password but see no
projects or organisation pages.

If you need to fully delete the user's account, go to **Platform →
Users → click user → Delete**. That's a hard-delete (cascades
across annotations and uploads) and requires the **superuser**
flag — staff alone can't do it.

## Per-project roles

A user's organisation-level role is their **default** within
projects. Projects can override it on a per-project basis:

1. Open a project, then **Settings → Members**.
2. Click **+ Add member** and pick the user.
3. Choose their per-project role.

A user added to a project as **Annotator** can label tasks in that
project even if their org-level role is something else. A user
*not* added to the project doesn't see it at all unless their
org role is Owner / Admin (which sees everything).

## Workspaces

You can group projects into [workspaces](/annotate/organization/workspaces) for
campaigns, languages, or whatever your team's natural unit is.
Workspace membership cascades to projects inside the workspace —
add someone to the workspace and they automatically see all its
projects.

## Audit log

Every member change lands in **Platform → Audit log**:
- `org.member_added` — who, by whom, role
- `org.member_removed` — who, by whom
- `org.role_changed` — who, by whom, old role → new role

Staff-only. Searchable by user, action type, or date.

## Common gotchas

**A user says they were invited but can't sign in.**
Two possible causes: their email never arrived (see [FAQ → Email
+ sign-in](/annotate/faq#email--sign-in)), or they verified their email
on the cloud's HTML signup page but the token-flow was interrupted
and they have no org membership. Re-invite them.

**Member status shows as "Pending invitation" — never activates.**
A pre-created user (via **Platform → Users → + Create User** with
**Invite mode**) who never clicked their setup link shows this
state. It's a *status*, not a role. The link is one-shot but you
can re-send it from the user's row.

**Removed someone by mistake.**
Open **Organization → Members** and check the "Removed" filter
(if shown — varies by version). If not, re-invite them with the
same email; the platform reuses the existing account and restores
the membership row.

## Suspending a member (without removing)

Sometimes you want to **pause** a member's access without ripping
them out of the org. Use **suspension** instead of removal:

1. **Organization → Members** → click the member's row
2. **Suspend** button → reason (optional but recommended)
3. Save

Effect:

- Member can't sign in — login attempts hit a "Your access has been
  temporarily paused" page
- Their existing annotations stay; their audit trail is preserved
- Tasks they had in `IN_PROGRESS` stay (manager can reassign or
  release)
- Their org membership row stays (`suspended_at` is set)

To unsuspend, open the member row → **Unsuspend**.

Suspension is distinct from **removal** — removed members lose the
`Membership` row (annotations stay, membership history goes).
Suspension keeps everything intact and is reversible.

Useful when:

- Audit / legal hold — pause a contractor during an investigation
- HR action — pause without committing to removal
- Quality issues — pause while a manager reviews recent work
  (pairs with [Auto-suspend rules](/annotate/organization/auto-suspend) for automated
  triggers)

## Default role on invite

By default, invite links land new members at **Annotator**. Org
admins can change this:

1. **Organization → Settings → Invitations → Default role**
2. Pick Annotator (default) / Reviewer / Manager / Admin
3. Save

Individual invites can override the default at send time.

## Email-domain allowlist

Gate joins by company domain (e.g. only `@your-org.com` emails):

1. **Organization → Settings → Invitations → Allowed email domains**
2. Comma-separated list: `example.org, partner-org.com`
3. Save

Effect:

- Invite-link signups whose email domain isn't on the list are
  **rejected** with a clear error
- Existing members with off-list domains aren't affected
  (grandfathered)
- Empty list = allow any domain (default)

Useful for SAML-less enterprise where domain matching is the
cheap proof-of-affiliation. For real SSO, see the
[Security model](/annotate/platform-admin/security).

## What's next

- **[Auto-suspend rules →](/annotate/organization/auto-suspend)** — automated
  member suspension based on quality / activity signals
- **[Roles + permissions →](/annotate/organization/roles)** — full matrix of what each
  role can do
- **[Workspaces →](/annotate/organization/workspaces)** — group projects
- **[Mark a user verified →](/annotate/platform-admin/manual-verify)** —
  override for mail-bounced users
