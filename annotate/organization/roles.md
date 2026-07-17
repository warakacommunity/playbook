---
title: "Roles + permissions"
sidebar_label: "Roles + permissions"
description: "AfriAnnotate roles and what each can do at the org + project level."
sidebar_position: 3
mdx:
  format: md
---

# Roles + permissions

AfriAnnotate's authorisation model has two layers:

1. **Organisation role** — set when the user joins your org. Determines
   the default permissions across all projects in that org.
2. **Per-project role** — optional override. A user added explicitly
   to a project gets the role assigned there, regardless of their
   org-level role.

In addition, there are two **platform-level flags** orthogonal to org
membership:

- **`is_staff`** — gives access to **Platform Settings**, the Users
  page, the audit log, and the email-template editor. Staff act across
  organisations.
- **`is_superuser`** — full Django-admin access. Set on the first user
  of a fresh platform; rarely granted afterwards.

## Org roles, top to bottom

| Role | Short | What they can do |
|---|---|---|
| **Owner** | OW | Manages the organisation end-to-end. Full access to every project, every workspace, every member. One Owner per org. The first user to create the org becomes the Owner. |
| **Administrator** | AD | Full access except changing the Owner. Invites + removes members, creates + archives projects, configures org settings. |
| **Manager** | MA | Creates projects + workspaces. Manages members within projects they own or are added to. Cannot see other Managers' private projects. Does not access the Organization page. |
| **Reviewer** | RE | Reviews annotated tasks. Sees only projects they're added to. Can accept / reject / re-assign annotations. Cannot label tasks (unless also added as Annotator on the same project). |
| **Annotator** | AN | Labels tasks. Sees only projects they're added to. Default role for users joining via invite link. |
| **Guest** | GU | **Read-only observer.** Can view projects they're explicitly added to but cannot annotate, review, edit, or manage anything. Useful for stakeholders, external auditors, ethics reviewers, or new hires shadowing before becoming Annotators. |

## Permissions matrix

| Action | Owner | Admin | Manager | Reviewer | Annotator | Guest |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Create projects | ✓ | ✓ | ✓ | — | — | — |
| Archive / delete own projects | ✓ | ✓ | ✓ | — | — | — |
| Archive / delete any project | ✓ | ✓ | — | — | — | — |
| Invite users to the org | ✓ | ✓ | — | — | — | — |
| Remove users from the org | ✓ | ✓ | — | — | — | — |
| Change member roles | ✓ | ✓ (except Owner) | — | — | — | — |
| See all projects in the org | ✓ | ✓ | — (only theirs) | — (only assigned) | — (only assigned) | — (only assigned) |
| Edit labeling config | ✓ | ✓ | ✓ (own) | — | — | — |
| Import + delete tasks | ✓ | ✓ | ✓ (own) | — | — | — |
| Submit annotations | ✓ | ✓ | ✓ (own) | ✓ (review only) | ✓ | — |
| Review annotations | ✓ | ✓ | ✓ (own) | ✓ | — | — |
| Export annotations | ✓ | ✓ | ✓ (own) | — | — | — |
| View projects (read-only) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ (only assigned) |
| Edit organisation settings | ✓ | ✓ | — | — | — | — |
| Open Platform Settings | staff only | staff only | staff only | staff only | staff only | staff only |
| Mark users email-verified | staff only | staff only | staff only | staff only | staff only | staff only |

The "own" qualifier on Manager rows means projects they created or
were explicitly added to.

## Per-project overrides

A user's org role applies by default to every project in that org.
Override on a per-project basis by adding them with a specific role:

- An org-level **Admin** added to project X as **Annotator** can
  still see every project in the org (admin) but on project X is
  treated as an annotator (no reviewer queue, no settings).
- An org-level **Annotator** is invisible to projects they aren't
  explicitly added to. They have to be added to each project they
  should see.

To manage per-project roles: **Project → Settings → Members → +
Add member**.

## Platform-level flags

`is_staff` and `is_superuser` are managed from **Platform → Users**:

1. Click the user's row → modal opens.
2. **Platform role** section near the bottom:
   - **Grant staff** / **Revoke staff** — Owners + Admins of any
     org can be staff regardless of org role. Staff see Platform
     Settings, the Users page, the audit log.
   - **Grant superuser** — only the existing superuser can grant
     this. Use sparingly.

The first user on a fresh platform is auto-granted both flags. Use
the **+ Create User** form on the Users page to assign roles to
new users at creation time.

## Audit + accountability

Every role change audit-logs with:
- The actor (who made the change)
- The target (whose role changed)
- The previous + new role
- Timestamp

View at **Platform → Audit log** (staff-only). Filter by action type
to see only role-related events (`org.role_changed`,
`user.staff_grant`, `user.staff_revoke`).

## Common gotchas

**Manager can't see another Manager's project.**
Working as designed — Managers see only their own projects + ones
they're explicitly added to. Use Admins for cross-project oversight.

**Annotator on the mobile app sees the same projects as on web.**
Yes — same account, same org, same per-project memberships. The
mobile UI hides operator surfaces (project create, members, platform
settings) but the underlying access rules are identical.

**Removing the Owner role.**
You can't transfer Owner from one user to another through the UI.
If you need to, contact a platform superuser to perform the
transfer through Django admin.

## What's next

- **[Members + invites →](/annotate/organization/members)** — the day-to-day operations
  for adding / removing / promoting users
- **[Workspaces →](/annotate/organization/workspaces)** — group projects + cascade
  membership
- **[Security model →](/annotate/platform-admin/security)** — the full
  auth + authorisation architecture
