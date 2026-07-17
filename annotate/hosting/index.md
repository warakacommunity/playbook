---
title: "Host your own"
sidebar_label: "Overview"
sidebar_position: 1
description: "End-to-end runbook for hosting your own AfriAnnotate fork — cloud deploy, DNS, email, branding, mobile + desktop builds."
mdx:
  format: md
---

# Host your own AfriAnnotate

AfriAnnotate is open source ([https://github.com/AfriAnnotate/Tool](https://github.com/AfriAnnotate/Tool)). This page
is the **end-to-end runbook** for standing up your own instance — fork
the repo, point it at your own cloud, send mail from your own domain,
ship mobile + desktop apps to your own users.

The reference deployment runs at [label.afriannotate.org](https://label.afriannotate.org)
on Google Cloud Run + Cloud SQL + Cloud Storage + Cloudflare DNS +
Brevo for email + Firebase Hosting for the docs site. Other hosters
swap any of those out (AWS, self-hosted Postgres, your own SMTP) —
the app code is the same.

## Prerequisites

Before you start, gather:

- **A domain you own** for the web app (e.g. `label.example.org`). You
  don't need separate domains for docs + app + email — subdomains of
  one apex work fine.
- **A cloud account** with billing enabled. The reference deployment
  uses Google Cloud; AWS / Azure / Hetzner / DigitalOcean all work
  with the same Django app.
- **An email provider account** — Brevo (reference), SendGrid, AWS SES,
  Mailgun, Postmark. Free tiers cover early-stage teams. See [Email
  delivery](/annotate/platform-admin/email).
- **(Optional) Apple Developer account** ($99/year) if you want to ship
  the iOS app or macOS desktop app to anyone outside your own machine.
- **(Optional) Google Play Console account** ($25 one-time) if you want
  to ship the Android app on the Play Store. Skip if you're only using
  Firebase App Distribution.

## The full path

The fastest path from `git clone` to "your team is labelling data on
their phones":

| Step | What | Time | Cost |
|---|---|---|---|
| 1 | Fork the repo | 1 min | Free |
| 2 | Deploy the cloud | 30 min – 2 hr | $5–50/mo |
| 3 | Wire DNS + TLS | 30 min (mostly DNS propagation) | Domain registration |
| 4 | Configure email provider + DNS records | 30 min | Free tier covers most teams |
| 5 | Set platform branding | 5 min | Free |
| 6 | Sign in as platform owner + create your org | 5 min | Free |
| 7 | Build + distribute mobile app (Android) | 1 hr | Free (Firebase) or $25 (Play) |
| 8 | Build + distribute iOS app | 1.5 hr | $99/year Apple Developer |
| 9 | Build + distribute macOS desktop | 30 min | Same $99/year |

Total: **~4-6 hours** for the full stack, end-to-end, on a fresh
account. You can defer 7-9 if your team is web-only.

## Step 1 — Fork the repo

Fork [https://github.com/AfriAnnotate/Tool](https://github.com/AfriAnnotate/Tool) into your own GitHub organisation (or
clone-and-push to a different remote). Edit
`docs-site/branding.config.js` first — change the values to your own
platform name, host, repo URL, email. Everything in the docs +
runtime branding picks these up automatically.

```bash
git clone <your-fork-url>
cd <your-fork>

# Edit branding
$EDITOR docs-site/branding.config.js
```

The platform-runtime branding (what users see in the web app, emails,
mobile splash) is configured separately at runtime via **Platform →
Branding** in the web UI — see step 5.

## Step 2 — Deploy the cloud

The Django app + React SPA are designed to run on any container host.

**Reference deployment (Google Cloud):**

- **Compute**: Cloud Run service, 1 vCPU / 1 GiB minimum, autoscale
  to N concurrent instances. Cold start ~3 s on the smallest size.
- **Database**: Cloud SQL Postgres 15. The smallest tier
  (`db-f1-micro`, 0.6 GiB RAM) handles a few hundred concurrent
  users — bump up as you scale.
- **Storage**: Cloud Storage bucket for uploaded files (CSVs, images,
  audio). Private, accessed via short-lived signed URLs.
- **Networking**: Cloudflare DNS in front (gray cloud, DNS-only — we
  don't proxy traffic through their TLS).

The deployment scripts live in `deployment/` — read the README there
for the per-cloud setup. You'll need to set these env vars:

| Env var | What |
|---|---|
| `DATABASE_URL` | `postgres://user:pass@host:5432/dbname` |
| `SECRET_KEY` | Django secret — generate via `python -c "import secrets; print(secrets.token_urlsafe(64))"` |
| `PLATFORM_HOST` | Your platform's public hostname (e.g. `label.example.org`) |
| `DEFAULT_FROM_EMAIL` | The From address on outgoing mail |
| `EMAIL_HOST` / `EMAIL_PORT` / `EMAIL_HOST_USER` / `EMAIL_HOST_PASSWORD` | SMTP creds (see step 4) |
| `GCS_BUCKET_NAME` | (or `AWS_STORAGE_BUCKET_NAME`, `AZURE_CONTAINER`) |

Build the SPA into static files (`yarn ls:build` from `web/`), then
push the whole repo as a container image:

```bash
gcloud builds submit --tag gcr.io/<your-project>/afriannotate
gcloud run deploy afriannotate \
  --image gcr.io/<your-project>/afriannotate \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars=...
```

(See `deployment/cloudrun.md` in the repo at [https://github.com/AfriAnnotate/Tool](https://github.com/AfriAnnotate/Tool)
for the full command + secret-manager wiring.)

## Step 3 — DNS + TLS

Once Cloud Run gives you a `*.run.app` URL, point your domain at it:

```
TYPE   NAME                    VALUE                              TTL
A      label.example.org       <cloud-run-A-record-from-mapping>  Auto
CNAME  label.example.org       ghs.googlehosted.com               Auto
```

(Cloud Run's "Custom Domains" page tells you which exact record type
to use after you add the domain.)

Then configure HTTPS:

- **Cloud Run** auto-provisions and renews a managed cert once DNS is
  pointed correctly. Takes ~15 min after DNS verifies.
- **HSTS** is enabled in the app's response headers (1-year `max-age`).
- **Cloudflare gray cloud** (DNS only, no proxy) is the simplest path —
  the TLS session goes browser → Cloud Run directly. Setting Cloudflare
  to orange cloud (proxy) works but adds a Cloudflare cert layer that
  complicates HSTS preload.

## Step 4 — Email

Pick a provider, register your sender domain with them, publish three
DNS records:

| Record | Purpose |
|---|---|
| SPF | Tells receivers "this provider may send for us" |
| DKIM | Cryptographic signature on outgoing mail |
| DMARC | Policy for what to do with mail that fails SPF/DKIM |

See [Email delivery](/annotate/platform-admin/email) for the full setup with
worked examples for Brevo / SendGrid / SES / Mailgun / Postmark.

**Test before you ship**: send yourself a verification email from your
deployed cloud. If it arrives in inbox (not spam), you're good. If it
goes to spam at Gmail/Outlook, your SPF/DKIM/DMARC isn't right — fix
that BEFORE inviting users, because once Gmail flags you as spam you
fight uphill to recover.

## Step 5 — Platform branding

The reference deployment ships with "AfriAnnotate" hard-coded in some
places (favicon, default email signatures). Most branding is
configurable at runtime without rebuilding:

1. Sign in as the first user on your platform (auto-promoted to
   platform owner — see step 6).
2. **Platform → Branding** in the sidebar.
3. Rename the platform — the new name propagates to:
   - Browser tab title
   - "Sign in to X" copy on the login page
   - Email subjects ("Welcome to X")
   - Mobile splash screen name
4. (Optional) Upload a logo + favicon.

If you want to rebuild the docs site with your own branding (recommended
for forks), edit `docs-site/branding.config.js` and re-deploy. Every
docs page reads the config at build time.

## Step 6 — Claim platform-owner

The first user to sign up on a fresh platform is **automatically
promoted to platform owner** (`is_superuser=True`, `is_staff=True`).
Sign up immediately after the cloud is deployed — before sharing the
URL with anyone — so you're the owner.

- Open `https://your-platform-host.example.org` in a browser.
- Click **Sign up** (or just type your email — the email-first flow
  routes you).
- Verify your email via the link.
- You land on the home page with a platform-owner role.

The platform auto-creates a default organisation around you. Rename it
in **Organization → Settings** if you want.

## Step 7-9 — Mobile + desktop builds

Once the cloud is live and you've claimed platform owner, you can ship
the mobile + desktop apps. See [Distribution overview](/annotate/platform-admin/distribution)
for the channel-by-channel guide:

- **Android via Firebase** (recommended first) — [Firebase App Distribution](/annotate/platform-admin/distribution/firebase)
- **Android via Play Store** (when public) — [Google Play Store](/annotate/platform-admin/distribution/play-store)
- **iOS via TestFlight** — [iOS TestFlight](/annotate/platform-admin/distribution/testflight)
- **macOS .dmg** — [Notarized macOS .dmg](/annotate/platform-admin/distribution/macos-dmg)

Each app uses the same App Store Connect API key for upload + notarization
(set up once), the same Apple Developer Team ID, and the same Firebase
project. The runbook for each channel includes the one-time setup.

## What to do after first deploy

- **Invite your team.** Org → Members → Invite people. They get an
  email with a link that signs them in + adds them to your org.
- **Set up consent forms** if your annotators need to agree to data
  use terms. Org → Settings → Consent library.
- **Connect cloud storage** to a project that has lots of media — UI
  uploads are fine for small projects but a connected GCS/S3 bucket
  scales better. See [Cloud storage](/annotate/data-import/cloud-storage).
- **Tune rate limits** if your traffic is bursty. Platform → Settings
  → Rate limits — adjust per-endpoint backoff base/cap without a
  deploy.

## Maintenance reality check

Hosting an annotation platform is not zero-maintenance:

- **Cloud bills**: Cloud Run + Cloud SQL + GCS for ~50 active users
  runs ~$30-50/month. Egress dominates at scale.
- **TLS cert**: Cloud Run auto-renews. If you use a different host,
  your TLS automation is your responsibility.
- **Database backups**: Cloud SQL does daily automated backups + 7-day
  point-in-time. Test the restore once at least.
- **Email reputation**: Run a DMARC report check monthly. Strict
  filters (Mimecast, university IT) drop senders without warning.
- **Upstream patches**: subscribe to [https://github.com/AfriAnnotate/Tool/releases](https://github.com/AfriAnnotate/Tool/releases)
  for the LTS branch. Major bumps are rare; security patches happen
  ~quarterly.

## What's next

- **[Distribution overview →](/annotate/platform-admin/distribution)** —
  shipping the mobile / desktop apps to your users
- **[Email delivery →](/annotate/platform-admin/email)** — SPF / DKIM / DMARC
  details
- **[Security model →](/annotate/platform-admin/security)** — auth, transport,
  storage, isolation
- **[FAQ →](/annotate/faq)** — common questions, especially "I deployed but
  nothing works"
