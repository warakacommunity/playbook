---
title: "Operator FAQ + Troubleshooting"
sidebar_label: "Operator FAQ"
sidebar_position: 5
description: "FAQ and troubleshooting for hosters running their own AfriAnnotate — cloud deploy issues, email deliverability, build failures."
mdx:
  format: md
---

# Operator FAQ + Troubleshooting

For hosters running their own fork. End-user-facing FAQ is at
[FAQ](/annotate/faq); this page is the operator-side companion.

## Cloud deploy

### Cloud Run keeps spinning up new revisions but they all fail health check

Likely the container can't reach Cloud SQL. Cloud SQL by default
requires either:

1. A **Cloud SQL connector** sidecar (Cloud Run flag
   `--add-cloudsql-instances=<project>:<region>:<instance>` +
   `DATABASE_URL` using the unix-socket form
   `postgres:///dbname?host=/cloudsql/<connector>`)
2. OR a **public IP + authorised network** — set `DATABASE_URL` to
   the public IP with TLS-required, and add Cloud Run's egress range
   to Cloud SQL's authorised networks.

Reference deployment uses option 1 (connector). Option 2 is simpler
to set up but trickier to secure.

### My Cloud Run revision dies on cold start, ~3-5 seconds in

Almost always a missing env var crashing Django at boot. Check the
revision's logs:

```bash
gcloud logging read \
  'resource.type=cloud_run_revision AND resource.labels.service_name=afriannotate' \
  --limit 50 --format json | jq -r '.[] | .textPayload // .jsonPayload.message'
```

Common offenders:
- `SECRET_KEY` not set → Django raises ImproperlyConfigured
- `DATABASE_URL` not set or wrong → boot dies on first ORM call
- `ALLOWED_HOSTS` doesn't include the Cloud Run URL → 400 on every
  health check probe (Cloud Run probes from internal IPs by default,
  so `*` or your explicit Cloud Run hostname needs to be in there)

### Build succeeds locally but `gcloud builds submit` fails

The `.gcloudignore` may be excluding files needed in the build context.
Check what's actually in the build context:

```bash
gcloud builds submit --dry-run --tag dummy 2>&1 | head -20
```

If it's including `node_modules` (which it shouldn't), add to
`.gcloudignore`:

```
node_modules/
.git/
docs/
docs-site/build/
native/*/node_modules/
native/*/ios/
native/*/android/
```

### My deploy is slow (10+ min) every time

The Docker image is probably huge. Check:

```bash
gcloud container images describe gcr.io/<project>/afriannotate:latest \
  --format='value(image_summary.fully_qualified_digest)'
docker pull <digest>
docker history <digest> | head -20
```

If the image is >500 MB, you're shipping dev dependencies. Make sure
the Dockerfile uses a multi-stage build (build SPA + Python wheels in
a build stage, copy only the artifacts into the final stage).

## Email deliverability

### "I deployed but no email arrives anywhere — not Gmail, not Outlook, not anywhere"

The cloud isn't talking to your SMTP provider at all. Check
in this order:

1. **Are the SMTP env vars set on Cloud Run?** Common miss: setting
   them only in `.env` (used for local dev) but not in the Cloud Run
   service config. `gcloud run services describe afriannotate
   --region=<region> --format='value(spec.template.spec.containers[0].env)'`
2. **Does the provider show the message in its outbound log?** Brevo
   has "Statistics → Sent". SendGrid has "Activity Feed". If it's not
   there, the cloud never tried to send. If it IS there, the problem
   is downstream (the recipient's filter).
3. **Did the provider reject it for a bad From address?** Free tiers
   typically require your sender domain to be verified. Until you
   verify, every send returns `554 Sender Not Verified`.

### Gmail delivers but every corporate address bounces

Common. Corporate mail gateways (Mimecast, Microsoft ATP, university
IT, Cisco IronPort) are way stricter than consumer providers. The
bounce typically says:

```
550-5.7.1 The user or domain that you are sending to has a policy
that prohibited the mail that you sent.
```

Three things to try, in order of escalation:

1. **Mark the user verified manually** so they can sign in at least —
   see [Mark a user verified](/annotate/platform-admin/manual-verify).
2. **Ask the recipient's IT to allowlist your sender.** Most
   corporate IT desks will allowlist a verified, DKIM-signed
   transactional sender on request. Provide your domain + SPF +
   DKIM records (from [Email delivery](/annotate/platform-admin/email)).
3. **Pay for a dedicated IP from your email provider.** Shared IPs
   accumulate reputation noise from other customers. Dedicated IPs
   that you control + warm up are cleaner. ~$30-50/mo at most
   providers.

### DMARC reports show a high rate of failures from "unknown sources"

Your domain is being spoofed. Common when an attacker tries to use
your domain in phishing campaigns. Two things:

1. Tighten DMARC: change `p=none` to `p=quarantine` after a few
   weeks of clean alignment reports.
2. Don't try to add SPF includes for the spoofers — that would
   *authorise* them. The right move is `-all` (hard fail) at the end
   of your SPF + a tightened DMARC.

### "My provider says Verified but mail still bounces"

Most providers' "Verified" status only certifies DKIM + domain
ownership. It does NOT guarantee SPF is in place. Operators
commonly forget the SPF record because the provider's setup wizard
doesn't insist on it. Run:

```bash
dig @1.1.1.1 +short TXT yoursenderdomain.example.org
```

If you don't see a `v=spf1 ...` record, that's it.

## Build pipeline

### Android build script bails with `AFRI_KEYSTORE_PATH not found`

The script expects an absolute path to the `.jks` file. If you
followed the README, it's under
`native/mobile/android/keystore/afri-release.jks` and gitignored.
Make sure the file actually exists:

```bash
ls -la $AFRI_KEYSTORE_PATH
```

If it's missing, regenerate via
`native/mobile/scripts/generate-release-keystore.sh` — but understand
that **you can never push an update to a Play listing pinned to the
old keystore**. Lost keystore = republish under a new package name.

### iOS build succeeds but App Store Connect rejects with 409 CFBundleIdentifier Collision

Modern Xcode (15+) rewrites embedded framework Info.plist bundle IDs
during auto-sign archive — every Capacitor framework ends up with
the App's bundle ID instead of its own `org.cocoapods.*` one. The
build script's post-archive fixup pass restores each framework's
bundle ID + re-codesigns. If you've edited the script and removed
this section, put it back.

### iOS upload says `Redundant Binary Upload`

App Store Connect already has a build with the same `CURRENT_PROJECT_VERSION`
+ `MARKETING_VERSION`. Re-run `./scripts/build-release-ios.sh` —
it auto-bumps the build number on every invocation (seconds since
2023-11-15).

### macOS notarization stuck "In Progress" for hours

Apple's notary service occasionally stalls despite green status on
developer.apple.com/system-status. Three options:

1. Wait (sometimes resolves in 1-6 hours)
2. Submit again — the new submission may process while the old one
   stays stuck
3. Open a developer support ticket if it's been > 24h

The DMG itself is fine; the issue is purely Apple's infrastructure.

## Database + scale

### How many tasks can a single project handle?

~100k tasks / 100k annotations per project is the comfortable upper
bound on the smallest Cloud SQL tier. The dashboard's task list and
filters get slow past that. Split by workspace if you need more
headroom.

### What's the recommended Cloud SQL tier for production?

For a few hundred concurrent annotators: `db-custom-2-7680`
(2 vCPU, 7.5 GiB RAM). For low-traffic teams: `db-f1-micro` (0.6 GiB
RAM) is genuinely fine — the workload is read-heavy with bursty
writes during annotation submission.

### How do I move from the reference cloud to my own?

The full migration:

1. `pg_dump` from the reference cloud Postgres.
2. Copy the GCS bucket contents (`gsutil -m rsync`) to your bucket.
3. Restore the dump into your Postgres.
4. Update the `storage_url` fields in the database to point at your
   bucket (sed across the dump or run a Django data migration).
5. Update `SECRET_KEY` — this invalidates all JWTs, forcing
   everyone to log in again. Necessary because the JWT signing key
   is the secret.
6. Point DNS at your new cloud.
7. Run the new cloud + tell users to re-login.

Downtime: ~30 min during the DNS cutover. Annotation work in
progress is queued (the JWT outbox) but new logins fail until DNS
propagates.

## Self-hosting alternatives

### Can I run this on AWS instead of GCP?

Yes. The mapping:

| GCP | AWS |
|---|---|
| Cloud Run | ECS Fargate or App Runner |
| Cloud SQL | RDS Postgres |
| Cloud Storage | S3 |
| Cloud Build | CodeBuild |
| Cloud Logging | CloudWatch |
| Cloudflare DNS (or Cloud DNS) | Route 53 |
| Brevo (or any SMTP) | SES |

The app code reads env vars for storage / database / email, so
switching providers is just changing env. The build pipeline is
slightly different per cloud — `deployment/aws.md` documents the AWS
flow.

### Can I run this on a single VPS?

Yes. The minimal viable single-VPS deployment:

- 2 vCPU / 4 GiB RAM Hetzner CX22 (~€4.50/mo)
- Docker Compose: Django container + Postgres container +
  Caddy/nginx reverse proxy
- Storage: local disk for uploaded files, or attach a separate
  Hetzner Volume

Tradeoffs: no autoscaling, no managed backups, you're responsible
for the OS patches and the cert renewal. Fine for ≤ 50 active users
or staging environments.

`deployment/vps.md` has the docker-compose.yml + Caddyfile.

## What's next

- **[Email delivery →](/annotate/platform-admin/email)** — SPF / DKIM / DMARC setup
- **[Security model →](/annotate/platform-admin/security)** — auth, transport, storage,
  isolation
- **[Distribution →](/annotate/platform-admin/distribution)** — mobile + desktop build flows
- **[FAQ →](/annotate/faq)** — end-user-facing FAQ
