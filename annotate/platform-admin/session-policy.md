---
title: "Session policy"
sidebar_label: "Session policy"
sidebar_position: 7
description: "Per-organisation session timeout — max session age + max time between activity."
mdx:
  format: md
---

# Session policy

Each organisation has a **SessionTimeoutPolicy** that controls how
long users stay signed in before being forced to re-authenticate.

Two knobs:

| Setting | Default | What it does |
|---|---|---|
| **Max session age** | 8 days (11 520 min) | Hard ceiling on session duration regardless of activity. After this, the user must sign in again. |
| **Max time between activity** | 3 days (4 320 min) | Idle timeout. If no API call lands during this window, the session expires. |

Both measured in minutes; minimum of 1 each.

## Where it lives

**Organization → Settings → Session policy**.

Visible to org **Owner** and **Admin**. Reviewer / Annotator
inherit the org's policy without seeing the configuration.

## When the policy takes effect

The policy is checked on every JWT validation — every authenticated
API request. The JWT's `exp` claim is the standard short-lived
window (5 min for access, 24 h for refresh), but the policy adds an
**org-scoped** ceiling on top:

1. JWT access token expires → use refresh token → mint new access
2. **Check policy**:
   - `now - session_created_at > max_session_age` → reject refresh
   - `now - last_activity_at > max_time_between_activity` → reject
3. If either policy check fails, the SPA forces re-login

The SPA detects the rejected refresh and redirects to the login
page; the user types email + password again.

## Recommended values

| Use case | Max age | Idle |
|---|---|---|
| **Low-sensitivity** (internal dogfood, demo orgs) | 30 days | 7 days |
| **Default** | 8 days | 3 days |
| **Compliance / strict** | 24 hours | 4 hours |
| **PII handling** | 8 hours | 30 minutes |

There's no theoretical maximum — but very long sessions are
unusual security-wise. Long-lived **PATs** (Personal Access Tokens)
are the right primitive for "this thing needs API access forever";
sessions are for humans.

## Why per-org

Different orgs on the same platform may have different security
postures. A research org running on the same hardware as a
fintech-compliance project shouldn't be forced into the fintech
org's strict timeout. So the policy lives at the org level, not
the platform level.

Platform owners can override an org's policy if they need to —
**Platform → Settings → Force session policy** — but that's
unusual.

## How activity is tracked

"Activity" = any successful authenticated API call. The user
loading the SPA shell counts; reading a task counts; opening a
project counts; submitting an annotation counts.

What does **NOT** count:

- The SPA re-rendering existing data without an API call
- Tabs left open in the background
- Service worker background activity

The activity timestamp lives on the JWT's session record. Every
successful refresh call updates it.

## Effect on the mobile app

The mobile app's bundled SPA holds the JWT in `localStorage` and
refreshes through the same flow. When the session expires on the
server side, the mobile app's next API call gets a 401, the SPA's
error handler bounces to the cloud Django login URL.

For mobile users in low-connectivity environments, set
**Max time between activity** high enough that a phone left
offline for a few days doesn't lock out the annotator — 7 days is
a reasonable starting point.

## Effect on the desktop app

The desktop app's local mirror keeps working when the JWT expires,
but the **sync to cloud** stops (the cloud rejects the JWT).
Annotators can keep labelling offline; the work queues up locally
and syncs back when they next sign in.

The desktop's "Sync history" page surfaces "session expired" as
an error reason on the failed run.

## API

The policy is readable + editable via the Org Settings API:

```bash
# Read
curl "https://label.afriannotate.org/api/organizations/<id>/session-policy" \
  -H "Authorization: Bearer YOUR_PAT"

# Update
curl -X PATCH "https://label.afriannotate.org/api/organizations/<id>/session-policy" \
  -H "Authorization: Bearer YOUR_PAT" \
  -d '{"max_session_age": 1440, "max_time_between_activity": 60}'
```

Changes take effect on the **next** refresh-token round-trip —
existing in-flight access tokens stay valid until their
short-lived JWT `exp` claim hits, then the new policy is enforced.

## What's next

- **[Data security →](/annotate/projects/security-settings)** — per-project
  session controls (idle timeout, fresh session for export, etc.)
  that layer on top of the org-level policy
- **[Security model →](/annotate/platform-admin/security)** — the overall auth + transport
  story
