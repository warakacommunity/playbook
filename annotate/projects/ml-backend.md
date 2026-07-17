---
title: "ML backend"
sidebar_label: "ML backend"
sidebar_position: 9
description: "Connect an external ML model to AfriAnnotate for pre-annotation, interactive predictions, and active-learning loops."
mdx:
  format: md
---

# ML backend

A **machine-learning backend** is an external service that
AfriAnnotate talks to over HTTPS to:

- **Pre-annotate** new tasks (the model labels first; the annotator
  reviews + corrects)
- **Provide interactive predictions** in the labeler (annotator
  draws a partial region; the model fills in the rest)
- **Train on submitted annotations** and improve over time
  (active-learning loop)

The protocol is the same as upstream Label Studio's ML backend
interface — point AfriAnnotate at any service that implements
the `MLBackend` HTTP contract.

## When to use one

| Scenario | Use ML backend? |
|---|---|
| You have a pretrained model you trust enough to bootstrap labels | Yes — saves enormous amounts of annotator time |
| You're collecting labels from scratch with no prior model | No (yet) — train after the first 1k labels and add the backend later |
| You want a foundation model (e.g. Whisper) to handle one piece of every task | Yes — wire it up just for that piece |
| You want server-side audio QC | Yes — see [Audio QC](/annotate/projects/audio-qc) |

## Setup

### 1. Run an ML backend service

The service must speak HTTP and respond to these endpoints:

| Endpoint | Purpose |
|---|---|
| `POST /predict` | Given task `data`, return a prediction in the same JSON format as a `result` entry |
| `POST /train` (optional) | Receive a batch of annotations; train; return job status |
| `GET /health` | Liveness probe |
| `GET /setup` (optional) | Return model metadata + status |

Two ways to get a service:

- **Use upstream Label Studio's ML backend examples** — clone
  [`heartexlabs/label-studio-ml-backend`](https://github.com/HumanSignal/label-studio-ml-backend),
  pick a starter (Whisper, BERT, YOLO, Segment Anything, etc.),
  customise + deploy on your infrastructure
- **Write your own** — implement the HTTP contract in any
  framework. The contract is documented at
  [labelstud.io/guide/ml](https://labelstud.io/guide/ml)

### 2. Connect to your project

**Project → Settings → ML Backend**.

1. Click **+ Add ML backend**
2. Fill in:
   - **Title** — internal name
   - **URL** — the service's base URL (https://... or http://localhost:9090
     during local dev)
   - **Authentication** — Basic auth, Bearer token, or none
   - **Description** (optional)
3. Click **Validate** — AfriAnnotate pings `/health`
4. (Optional) Tick **Use for interactive preannotations**
5. (Optional) Tick **Start model training on annotation submit**
6. Save

Once connected, the backend shows up in **Settings → ML Backend**
with status (Connected / Down / Error) + last-checked timestamp.

## Pre-annotation flow

When a project has an ML backend with **"Use for interactive
preannotations"** off (default) but the backend is configured:

- A bulk-predict job runs after import — for each new task, the
  backend's `/predict` is called and the response is stored as a
  `prediction` on the task
- Annotators opening the task see the prediction as draft regions
  they can accept / edit / discard
- On submit, the annotation is the human's edited version; the
  prediction stays as-is for comparison

The bulk-predict job is async; watch progress at
**Settings → ML Backend → Predict status**.

To re-run predictions (e.g. after deploying a new model version),
click **Retrieve predictions** on the ML Backend settings tab.

## Interactive predictions

When **"Use for interactive preannotations"** is on, the backend is
called **live** as the annotator works:

- For image segmentation: the annotator clicks a point or scribbles
  a region; the backend (e.g. Segment Anything) fills in the
  precise mask
- For text NER: the annotator highlights a phrase; the backend
  classifies the entity type
- For audio transcription: the annotator opens the task; the
  backend (e.g. Whisper) auto-fills the transcript

Latency matters here — the labeler waits for the response. Aim
for < 500 ms p95. If your backend is slower, prefer bulk pre-
annotation over interactive.

## Active learning

When **"Start training on annotation submit"** is on, every
submitted annotation triggers a `POST /train` to the backend with
the new annotation. The backend can:

- Run an incremental training step (online learning)
- Queue the annotation for a batched nightly retrain
- Just log it and use it for analysis

Combined with a **uncertainty-sampling** prediction strategy (the
backend returns confidence scores; AfriAnnotate surfaces low-
confidence tasks first), you get an active-learning loop: the
backend asks for labels on the tasks it's most uncertain about,
which is where new labels add the most value.

## Multiple backends per project

A project can have **multiple** ML backends. Useful when:

- Different tags need different models (e.g. text classification +
  NER on the same task)
- You're A/B-testing two model versions and want to capture both
  predictions

Each backend's predictions land as a separate entry in the task's
`predictions[]` array, distinguished by `model_version`.

## Network requirements

The cloud Django needs **outbound HTTPS** access to the ML backend
URL. If your backend is on a private network:

- Use a VPN connector (Cloud Run's serverless VPC connector for the
  reference cloud)
- Or expose the backend via a reverse proxy with allowlist
- Or run the backend inside the same VPC as AfriAnnotate

For **local development**, run the backend on `localhost:9090` and
configure the project's backend URL as `http://host.docker.internal:9090`
(if cloud Django runs in Docker) or `http://localhost:9090`
otherwise.

## Authentication

Three modes:

- **None** — backend's URL is the only secret. Fine for local dev.
- **Basic auth** — username + password sent on every request.
- **Bearer token** — `Authorization: Bearer <token>` header. Most
  common for production. Token rotates manually.

The credentials live encrypted in
AfriAnnotate's database (with `SECRET_KEY` as the encryption
key). Rotating `SECRET_KEY` invalidates all stored credentials.

## Reliability

The backend can fail without crashing the labeler:

- **Pre-annotation** — failed predictions are logged; the task opens
  without a draft annotation, the annotator labels from scratch
- **Interactive** — the labeler shows a tooltip "Predictions
  unavailable" and lets the annotator continue manually
- **Training-on-submit** — annotation is still saved to
  AfriAnnotate's database; training failures are logged but
  don't roll back the annotation

Monitor backend health at **Settings → ML Backend → Health**, and
optionally pipe the `/health` endpoint into your platform's
monitoring (Cloud Monitoring / Datadog / etc.).

## What's next

- **[Project setup →](/annotate/projects/setup)** — basic project creation flow
- **[Audio QC →](/annotate/projects/audio-qc)** — the in-house QC pipeline that can
  use an ML backend for heavy checks (Whisper / MMS / MOS / etc.)
- **[Webhooks →](/annotate/projects/webhooks)** — for pure event notification
  without the request/response prediction contract
- **Upstream protocol docs**:
  [labelstud.io/guide/ml](https://labelstud.io/guide/ml)
