---
title: "API"
sidebar_label: "API"
description: "Authenticate to the AfriAnnotate API, list projects, import tasks, export annotations."
sidebar_position: 1
mdx:
  format: md
---

# API

The AfriAnnotate API exposes everything the web UI does — create
projects, import tasks, manage members, export annotations. Use it
to script bulk operations, integrate AfriAnnotate into a pipeline,
or build a custom client.

**Base URL**: `https://label.afriannotate.org/` — the URL your hoster
gave you, e.g. `https://label.afriannotate.org/` for the reference
deployment or whatever your team's deployment uses.

All endpoints live under `/api/`. Most are JSON-in, JSON-out;
file uploads are `multipart/form-data`.

## Authentication

API calls authenticate with a **Personal Access Token (PAT)** — a
JWT issued from your user profile.

### Get a token

1. Sign in at [label.afriannotate.org](https://label.afriannotate.org).
2. Open your profile (sidebar → your avatar → **Account & Settings**).
3. Open the **Settings** tab.
4. Find the **Personal Access Token** card.
5. Click **Create new token**, give it a label and an expiration,
   and click **Create**.
6. **Copy the token immediately** — AfriAnnotate shows it once.
   You won't be able to retrieve it later (only revoke + replace).

The token is a JWT. You can create as many as you need; revoke any
individually from the same card.

:::tip
For scripts that run in CI, create a dedicated token per environment
with a sensible expiration (90 days is a common starting point).
Rotate by creating a new token + updating the env var + revoking
the old one — no downtime.
:::

### Use the token in HTTP requests

Pass the token as a Bearer credential in the `Authorization` header:

```bash
curl https://label.afriannotate.org/api/projects/ \
  -H 'Authorization: Bearer <your-token>'
```

That's it. No session cookies, no CSRF dance — every authenticated
request works with this header.

### Use the token from the Python SDK

The official Python SDK auto-handles the header for you:

```python
from label_studio_sdk import LabelStudio

client = LabelStudio(
    base_url="https://label.afriannotate.org",
    api_key="<your-token>",
)

projects = client.projects.list()
for p in projects:
    print(p.id, p.title)
```

See [Python SDK](/annotate/api/sdk) for the full client reference.

## Common endpoints

These are the API endpoints you'll reach for most often. The full
endpoint reference is auto-generated from the backend schema — see
the **OpenAPI** dump at
[label.afriannotate.org/api/openapi/](https://label.afriannotate.org/api/openapi/).

### List your projects

```bash
curl https://label.afriannotate.org/api/projects/ \
  -H 'Authorization: Bearer <token>'
```

Returns a paginated list of projects you have access to in your
active organisation. Need a project's `id` (the `pk`) for most
other endpoints.

### Create a project

```bash
curl -X POST https://label.afriannotate.org/api/projects/ \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Hausa sentiment v1",
    "label_config": "<View><Choices name=\"sentiment\" toName=\"text\"><Choice value=\"positive\"/><Choice value=\"negative\"/></Choices><Text name=\"text\" value=\"$text\"/></View>"
  }'
```

Returns the new project with `id`. Validate the labeling config
ahead of time with `POST /api/projects/<id>/validate/`.

### Import tasks

JSON-in:

```bash
curl -X POST https://label.afriannotate.org/api/projects/<id>/import \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '[
    {"data": {"text": "Yana da kyau sosai"}},
    {"data": {"text": "Ban so wannan ba"}}
  ]'
```

Each task's `data` keys must match the `$varname` references in
the labeling config. See [Task format](/annotate/data-import/task-format).

### List tasks

```bash
curl 'https://label.afriannotate.org/api/projects/<id>/tasks/?page=1&page_size=100' \
  -H 'Authorization: Bearer <token>'
```

### Export annotations

```bash
# See available export formats for the project
curl https://label.afriannotate.org/api/projects/<id>/export/formats \
  -H 'Authorization: Bearer <token>'

# Export in JSON
curl 'https://label.afriannotate.org/api/projects/<id>/export?exportType=JSON' \
  -H 'Authorization: Bearer <token>' \
  -o annotations.json
```

Supported formats include JSON (with full task + annotation
structure), CSV (flat one-row-per-task), CoNLL2003, COCO, YOLO,
Pascal VOC, ASR / TextGrid (for audio), and more — varies by task
type.

## Rate limits

- **Authenticated endpoints**: no explicit per-second cap; subject
  to the hoster's per-process concurrency limit (~80 in-flight
  requests on the reference cloud). If you're bulk-loading thousands
  of tasks, batch into groups of ~500-1000 tasks per `POST` and pace
  at ~5 requests/sec.
- **Anonymous auth endpoints** (`/api/auth/forgot-password`,
  `/api/auth/account-status`, `/api/auth/resend-verification`):
  exponential per-(IP, email) backoff. First retry 15-60s, doubles
  per attempt, caps at 30 min.

## Error format

4xx and 5xx responses return JSON of the form:

```json
{
  "error": "Short slug",
  "code": "snake_case_code",
  "detail": "Optional human-readable detail"
}
```

The `code` is stable — match against it in scripts. `error` and
`detail` are for humans + may change between releases.

## What's next

- **[Python SDK →](/annotate/api/sdk)** — install + usage walkthrough
- **[Task format →](/annotate/data-import/task-format)** — exact shape of
  the JSON tasks expect
- **[Cloud storage →](/annotate/data-import/cloud-storage)** — GCS / S3 /
  Azure as task sources instead of HTTP upload
- **[FAQ → API + integrations](/annotate/faq#api--integrations)** —
  token rotation, rate limits, common errors
