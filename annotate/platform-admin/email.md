---
title: "Email delivery"
sidebar_label: "Email delivery"
description: "Configure transactional email — pick a provider, wire up DNS, troubleshoot bounces."
sidebar_position: 2
mdx:
  format: md
---

# Email delivery

The platform sends transactional email for signup verification,
password reset, welcome messages, email-change confirmations, and
in-app notifications. Email delivery is delegated to whichever
SMTP-compatible provider the **hoster** has configured — the
platform itself doesn't speak SMTP directly to recipients.

The Django settings the platform reads at boot:

```
EMAIL_HOST          — smtp host
EMAIL_PORT          — smtp port (587 / 465 / 2525)
EMAIL_HOST_USER     — smtp username
EMAIL_HOST_PASSWORD — smtp password / API key
EMAIL_USE_TLS       — TLS at connect time
DEFAULT_FROM_EMAIL  — the From address on every message
FROM_EMAIL          — the From line (display name + address)
```

These are typically wired in at deploy time (env vars on Cloud Run,
secrets in Kubernetes, `.env` for local dev, etc.).

:::info Reference deployment
**AfriAnnotate's own cloud at `label.afriannotate.org` uses Brevo**
(formerly Sendinblue) with the From line `AfriAnnotate <no-reply@label.afriannotate.org>`.
Examples below use Brevo as the worked-out case, but the same
pattern applies to SendGrid, AWS SES, Mailgun, Postmark, or any
SMTP-compatible provider.
:::

## Common providers

| Provider | `EMAIL_HOST` | `EMAIL_PORT` | Free tier |
|---|---|---|---|
| Brevo | `smtp-relay.brevo.com` | 587 | 300 emails/day |
| SendGrid | `smtp.sendgrid.net` | 587 | 100 emails/day |
| AWS SES | `email-smtp.<region>.amazonaws.com` | 587 | $0 (pay per email, $0.10/1k) |
| Mailgun | `smtp.mailgun.org` | 587 | 5k/month for 3 months |
| Postmark | `smtp.postmarkapp.com` | 587 | 100/month |

Any of these work. Pick on price + deliverability reputation + the
mail-stream features you need (transactional vs marketing, EU vs US
data residency, dedicated IPs, etc.). The platform's behaviour is
identical regardless of which one you pick.

## What the platform sends

| Trigger | To | Subject (default) |
|---|---|---|
| Signup completes | New user | `Verify your email` |
| First-user signup | Platform owner | `Welcome to <platform name>` |
| Forgot password | User | `Reset your password` |
| Email change initiated | New address | `Verify your new email` |
| Email change initiated | Old address (courtesy) | `Your account email is being changed` |
| Resend verification | User | `Verify your email` (fresh token) |
| Admin-pre-created user | User | `Set up your account` (one-shot link) |

The exact subject lines + body templates are editable per-hoster in
**Platform → Notifications → Email templates**. Variables like
`{{verify_url}}`, `{{display_name}}`, `{{platform_name}}` are
substituted at send time. The `platform_name` comes from
**Platform → Branding** — renaming the platform there propagates
through every template.

All messages send from whatever `FROM_EMAIL` the hoster set.

## DNS authentication

Three records must be live on the **sender domain** the hoster
picked (whatever's in `FROM_EMAIL`) for the chosen provider's
outbound mail to be accepted by recipients:

### SPF — who's allowed to send

```
TYPE: TXT   NAME: @       CONTENT: v=spf1 include:<provider-spf-include> -all
```

`<provider-spf-include>` varies by provider:

| Provider | SPF include |
|---|---|
| Brevo | `spf.brevo.com` |
| SendGrid | `sendgrid.net` |
| AWS SES | `amazonses.com` |
| Mailgun | `mailgun.org` |
| Postmark | `spf.mtasv.net` |

If `FROM_EMAIL` uses a **subdomain** (e.g.
`no-reply@mail.example.com` rather than `no-reply@example.com`),
add the SPF to BOTH apex and subdomain — DNS spec doesn't inherit.
The `-all` at the end is a hard fail; non-provider sources sending
as the domain are rejected outright.

### DKIM — cryptographic signature

Each provider's dashboard gives you specific CNAME (or TXT) records
to publish — typically two selectors. The exact records vary per
provider per account. Copy them verbatim from your provider's
"Sender Domains" / "Domain Authentication" UI.

### DMARC — alignment policy

```
TYPE: TXT   NAME: _dmarc   CONTENT: v=DMARC1; p=none; rua=mailto:<your-rua-address>
```

Start with `p=none` (report-only). Most providers offer a RUA
address you can use (e.g. Brevo's `rua@dmarc.brevo.com`). Once
alignment reports show your real traffic consistently passes,
tighten to `p=quarantine` or `p=reject`.

If `FROM_EMAIL` uses a subdomain, optionally publish a
subdomain-specific DMARC at `_dmarc.<subdomain>`. If omitted, the
apex DMARC applies via the org policy.

## Verifying the records

After publishing:

1. In your provider's dashboard, hit **Verify** on the sender
   domain. The provider polls DNS + confirms each record.
2. From the command line, double-check with `dig`:

```bash
dig @1.1.1.1 +short TXT example.com
dig @1.1.1.1 +short TXT mail.example.com
dig @1.1.1.1 +short CNAME <provider-selector>._domainkey.example.com
```

You should see the SPF record and the DKIM CNAME target. Allow up
to 30 min for DNS to propagate; some resolvers cache for hours.

## Troubleshooting bounces

### "I sent to Gmail and it worked, but my colleague at <university> never got it"

The vast majority of bounces from outside Gmail / Outlook / iCloud
come from corporate mail gateways (Mimecast, Microsoft ATP, Cisco
IronPort) that reject transactional senders on shared IPs
regardless of correct SPF / DKIM / DMARC. The bounce message
typically looks like:

```
550-5.7.1 The user or domain that you are sending to (or from) has
550-5.7.1 a policy that prohibited the mail that you sent.
```

Three things to try, in order:

1. **Mark the user verified manually** so they can sign in even
   though the email didn't reach them. See
   [Mark a user verified](/annotate/platform-admin/manual-verify).
2. **Ask the recipient's IT to allowlist your sender**. Most
   corporate IT desks will allowlist a DKIM-signed transactional
   sender on request. Provide your domain + SPF + DKIM record.
3. **Pay for a dedicated IP** through your provider. Shared IPs
   inevitably accumulate some bad reputation from other customers
   on the same pool; dedicated IPs you own and warm up yourself
   are cleaner with strict filters.

### "The email landed in spam"

Usually one of:
- DMARC is `p=none` (recommended starting point but recipients
  with strict policy filters demote unaligned mail). Tighten to
  `p=quarantine` once alignment is consistently passing.
- Mail content triggers spam heuristics. Watch for too many
  links, all-caps subjects, ALL-IMAGE messages, no plaintext part.
  The default templates avoid these patterns.
- Sender reputation is low for the recipient's filter. Time + good
  delivery patterns fix this.

### "Provider dashboard shows Verified but mail still bounces"

Most providers' "Verified" status only certifies DKIM + ownership.
It does NOT guarantee SPF is in place (operators commonly forget
the SPF record because the provider doesn't insist on it). Run the
`dig` checks above; if SPF is missing, add it.

## Email content + templates

Per-kind templates editable from **Platform → Notifications →
Email templates**:

1. Pick a kind from the list (Welcome, Verification, Password
   reset, etc.).
2. Edit the subject + body. Variables like `{{verify_url}}` and
   `{{display_name}}` are substituted at send time.
3. **Save**. Next message of that kind uses the new template.

Branding inputs (platform name, support email, logo URL) come from
**Platform → Branding** — renaming the platform there propagates
automatically through every template variable.

## Operator rate limits

Some hosters want to throttle outbound mail (to stay under a
provider's free-tier daily cap, for example). Set via
**Platform → Settings → Rate limits**:

- `verification_email_base_secs` / `_cap_secs` — per-(IP, email)
  exponential backoff on the resend-verification endpoint.
- `forgot_password_base_secs` / `_cap_secs` — same for forgot.
- `account_status_base_secs` / `_cap_secs` — for the email-first
  probe endpoint.

Adjustments take effect immediately; no deploy required.

## What's next

- **[Mark a user verified](/annotate/platform-admin/manual-verify)** — escape hatch when
  an individual recipient's filter blocks the verify email.
- **[Security model](/annotate/platform-admin/security)** — where email fits in the
  broader auth + audit story.
