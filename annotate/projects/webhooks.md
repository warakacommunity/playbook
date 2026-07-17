---
title: "Webhooks"
sidebar_label: "Webhooks"
sidebar_position: 8
description: "Fire HTTP POSTs to your own service when annotations are submitted, projects are updated, etc."
mdx:
  format: md
---

# Webhooks

Webhooks let your external services react to events in
AfriAnnotate — fire an HTTP POST to your URL whenever an
annotation is submitted, a task is created, a project is updated.

Useful for:

- Piping annotations into your ML training pipeline
- Notifying a Slack channel when a project hits a milestone
- Triggering downstream BI / warehouse ingestion
- Updating an external ticketing system when annotators submit work

Webhooks are configured **per project** at **Project → Settings →
Webhooks**.

## Configuring a webhook

1. **Project → Settings → Webhooks**
2. Click **+ Add webhook**
3. Fill in:
   - **Name** — human-readable label
   - **URL** — your HTTPS endpoint (HTTP allowed for development
     against `localhost`; production should be HTTPS)
   - **Send payload** — `Yes` (send the full event body) or `No`
     (send only the event type + IDs; you fetch the rest via API)
   - **Events** — tick which events trigger this webhook (see below)
4. (Optional) **Send headers** — extra HTTP headers your endpoint
   requires (e.g. `Authorization: Bearer ...`)
5. (Optional) **Send for actions** — narrow further by action type
6. Click **Save**

The next event matching your filter triggers a `POST` to your URL.

## Event types

| Event | When it fires |
|---|---|
| `PROJECT_CREATED` | A project is created |
| `PROJECT_UPDATED` | A project's settings change |
| `PROJECT_DELETED` | A project is archived / deleted |
| `TASKS_CREATED` | One or more tasks imported into a project |
| `TASKS_DELETED` | Tasks deleted |
| `ANNOTATION_CREATED` | An annotator submits an annotation |
| `ANNOTATION_UPDATED` | An existing annotation is edited |
| `ANNOTATION_DELETED` | An annotation is deleted |
| `ANNOTATIONS_CREATED` | Bulk-create (e.g. via API import) |
| `ANNOTATIONS_DELETED` | Bulk-delete |
| `LABEL_LINK_CREATED` | A reusable label (from Labels Manager) is linked to a project |
| `LABEL_LINK_UPDATED` | A label link is edited |
| `LABEL_LINK_DELETED` | A label link is removed |

The most common subscriptions are `ANNOTATION_CREATED` and
`ANNOTATION_UPDATED` — those are the "new label arrived" trigger
that downstream ML pipelines wait for.

## Payload shape

The POST body is JSON:

```json
{
  "action": "ANNOTATION_CREATED",
  "project": {
    "id": 42,
    "title": "Hausa sentiment v1"
  },
  "task": {
    "id": 1234,
    "data": { "text": "Sannu da zuwa" }
  },
  "annotation": {
    "id": 9876,
    "result": [
      {
        "from_name": "sentiment",
        "to_name": "txt",
        "type": "choices",
        "value": { "choices": ["positive"] }
      }
    ],
    "completed_by": 10,
    "lead_time": 4.288,
    "created_at": "2026-05-12T08:42:11Z"
  }
}
```

For events that affect many objects (e.g. `TASKS_CREATED` after a
bulk import), the payload contains arrays:

```json
{
  "action": "TASKS_CREATED",
  "project": { "id": 42 },
  "tasks": [
    { "id": 1234, "data": {...} },
    { "id": 1235, "data": {...} }
  ]
}
```

If you set **Send payload = No**, the body is just `{action, project,
ids}` — IDs only. Useful when payload size matters; fetch the full
data via API on-demand.

## Headers your endpoint receives

In addition to standard HTTP headers:

| Header | Value |
|---|---|
| `Content-Type` | `application/json` |
| `User-Agent` | `AfriAnnotate-Webhooks/1.0` |
| `X-AfriAnnotate-Event` | The event name (e.g. `ANNOTATION_CREATED`) |
| `X-AfriAnnotate-Signature` | (Optional) HMAC-SHA256 signature — see below |

Plus any custom headers you configured at webhook-create time.

## Signature verification (optional)

If you set a **Signing secret** on the webhook, every request
carries an `X-AfriAnnotate-Signature` header. Your endpoint can
verify it to confirm the request came from AfriAnnotate (not a
spoofer):

```python
import hmac, hashlib

SIGNING_SECRET = "whsec_..."  # the secret you saved

def verify_signature(payload_body: bytes, header_value: str) -> bool:
    expected = hmac.new(
        SIGNING_SECRET.encode(),
        payload_body,
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(expected, header_value)
```

Use signing for any non-localhost endpoint — otherwise anyone who
guesses or scans your URL can POST fake events.

## Retries

If your endpoint:

- Returns a 2xx — success, no retry
- Returns 4xx — request is invalid; AfriAnnotate marks the
  delivery as failed and does NOT retry (likely a bug your end)
- Returns 5xx or times out (default timeout 5 s) — retry with
  exponential backoff: 1s, 5s, 30s, 5min, 1h. Drops after the 5th
  retry

Failed deliveries land in **Project → Settings → Webhooks → click
the webhook → Recent deliveries**. Each delivery shows the event,
the response status, the response body, and a **Replay** button.

## Test a webhook

The webhook configuration page has a **Send test event** button —
fires a synthetic `ANNOTATION_CREATED` with a sample payload at
your URL. Useful for verifying connectivity + payload parsing
before real events flow.

## Common patterns

### Slack notification on every submitted annotation

URL: a Slack incoming-webhook URL.
Events: `ANNOTATION_CREATED`.
Send payload: `Yes`.

In your Slack webhook receiver, format the JSON into a chat message.

### ML training pipeline trigger

URL: an internal HTTPS endpoint that queues a training job.
Events: `ANNOTATION_CREATED`, `ANNOTATION_UPDATED`.
Send payload: `No` (you have your own API access to fetch the
data; you only need the trigger).

### Compliance audit log mirror

URL: your SIEM / log-ingestion endpoint.
Events: everything.
Send payload: `Yes`.

Combine with the platform's audit log
([Platform → Audit log](/annotate/platform-admin#audit-log)) — the audit
log is the canonical record; the webhook is for near-real-time
mirroring to your external system.

## What's next

- **[Project settings →](/annotate/projects/setup)** — the rest of the per-project
  configuration
- **[API → Overview →](/annotate/api/overview)** — the same data your
  webhook receives is fetchable via REST API
- **[Data export →](/annotate/data-import/export)** — for batch / scheduled
  pulls instead of real-time push
