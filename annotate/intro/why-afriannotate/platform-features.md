---
title: "Platform-specific features (the full diff)"
sidebar_label: "Platform-specific features"
sidebar_position: 4
description: "The authoritative feature-by-feature diff of what this platform adds on top of upstream Label Studio — for anyone migrating from LS, evaluating the platform, or considering upstream contributions."
mdx:
  format: md
---

# Platform-specific features (the full diff)

> **Related pages.** [The three-layer stack](/annotate/intro/why-afriannotate/layers) is the
> summarised positioning; this page is the full feature-by-feature
> enumeration. [Honest comparisons § vs vanilla Label Studio](/annotate/intro/why-afriannotate/honest-comparisons#vs-vanilla-label-studio)
> is the same content shaped for the competitive question.

# What this platform adds vs upstream Label Studio

AfriAnnotate is a fork of [Label Studio](https://labelstud.io/).
The labelling editor, the XML tag library, the core API contract,
and most annotator-facing UI inherit from upstream. **But many
features that upstream gates behind their commercial Enterprise
edition (or doesn't ship at all) are built natively in
AfriAnnotate.** This page is the diff — useful for:

- Migrating from upstream Label Studio (what would you gain?)
- Evaluating the fork (what's the actual value-add?)
- Contributing back (these are the candidate features to upstream)

## Core platform additions

These are the **structural features upstream LS open-source ships
as stubs or doesn't ship at all** — built natively in
AfriAnnotate.

### Real RBAC + role permission matrix

Upstream Label Studio defines 30+ permission names but every one
resolves to `is_authenticated` — there's no actual role logic in
the open-source edition.

AfriAnnotate ships a full **six-role permission matrix**:

- **Owner** (OW) — top org role; can do anything
- **Admin** (AD) — manage members + projects, can't transfer
  ownership
- **Manager** (MA) — create + edit projects, manage project members
- **Reviewer** (RE) — review annotations, can label too
- **Annotator** (AN) — label tasks they're assigned to
- **Guest** (GU) — read-only observer for stakeholders /
  auditors / new hires shadowing

Plus **per-project role overrides** (an org-level Admin can be just
an Annotator on a specific project). Plus the `is_staff` /
`is_superuser` platform-level flags layered on top.

Enforcement is at the **queryset layer** in DRF permission classes
— not just URL gating. See [Roles](/annotate/organization/roles) for the
full matrix.

### Multi-organisation

Upstream LS open-source auto-creates **one** organisation on
signup with the create-org endpoint hidden + no UI. Effectively
single-tenant.

AfriAnnotate ships **full multi-org**:

- Users belong to N orgs simultaneously, switch between them via
  the sidebar
- Each org has its own member list, projects, branding, settings,
  consent library
- Cross-org access is impossible — every database row carries an
  `organization` FK and is filtered at the queryset level
- Platform staff can create / delete / freeze orgs from the
  Platform dashboard ([Platform → Orgs](/annotate/platform-admin#orgs))

### Multi-tenancy + row-level isolation

Beyond just having multiple orgs, every database row carries the
org FK and **every query** in DRF is filtered by the requesting
user's active org. There's no path by which a user in org A can
see rows from org B by guessing IDs — the check is at the data
layer, not the URL layer.

Documented in [Security model →
Multi-tenancy](/annotate/platform-admin/security#multi-tenancy).

### Review / QA workflow

Upstream open-source LS has **no reviewer role** and no
approve/reject state on annotations. The data model has hooks but
no flow.

AfriAnnotate ships a full review workflow:

- **Reviewer role** with its own permissions
- **Per-task reviewer assignment** + reviewer-stream queue
- **Accept / Reject / Fix-and-accept** decisions
- **Reject reason** (optional comment required policy)
- **Tie-breaker-only mode** (only surface disagreed tasks)
- **Cross-project review queue** at the org level
- **Annotation locks** post-submit + post-acceptance

See [Review workflow](/annotate/review-and-quality/overview) and
[Review settings](/annotate/projects/review-settings).

### Audit log (append-only)

Upstream open-source LS has no audit log. AfriAnnotate ships:

- **AuditEvent** model that records every staff action + sensitive
  user action (signup, login, role change, project create / delete,
  consent sign / revoke, token create / revoke, etc.)
- **Append-only at the DB layer** — `INSERT` allowed, `UPDATE` and
  `DELETE` blocked by CHECK constraints
- Combined with the [consent module's hash chain](/annotate/organization/consent#tamper-evident-audit-log),
  the audit surface is tamper-evident
- Filterable + exportable from [Platform → Audit log](/annotate/platform-admin#audit-log)

### Transactional email + verification

Upstream open-source LS has an email **stub** — a Django backend
class exists but no templates, no sending, no DNS guidance.

AfriAnnotate ships:

- **Full transactional email** via any SMTP provider (Brevo / SendGrid
  / SES / Mailgun / Postmark — see [Email delivery](/annotate/platform-admin/email))
- **Per-event templates** managed at [Platform → Notifications](/annotate/platform-admin#notifications)
  with `{{verify_url}}` / `{{display_name}}` / `{{platform_name}}`
  substitution
- **Email verification gate** — required before sign-in for all
  non-first users; one-shot tokens with 24h TTL
- **Email change flow** with re-verification on the new address
- **Manual-verify escape hatch** for corporate-filter-blocked users
  ([Mark a user verified](/annotate/platform-admin/manual-verify))

### In-app + email notifications

Upstream open-source LS has no notification system. AfriAnnotate
ships:

- **In-app notification center** (bell icon in the top-right)
- **Per-event toggles** for what surfaces (consent revoked,
  annotation rejected, review queue grew, quota threshold crossed,
  auto-suspend triggered, etc.)
- **Email digest** option for users who'd rather batch
- **Per-user overrides** in **Profile → Notifications** that
  layer on top of the platform defaults

### Branding (no-rebuild rename)

Upstream open-source LS hardcodes "Label Studio" in many places —
rebranding requires recompiling.

AfriAnnotate ships **runtime branding**:

- Platform name + logo + favicon + From email all configured at
  [Platform → Settings → Branding](/annotate/platform-admin#settings) — no
  rebuild required
- Propagates to browser title, login page, email subjects, mobile
  splash, in-app copy
- The docs site itself is rebrand-configurable via a single config
  file (`docs-site/branding.config.js`) — see [Hosting
  runbook](/annotate/hosting)

### Rate-limit tunability

Upstream LS has hardcoded rate limits in middleware. AfriAnnotate
ships **operator-tunable rate limits** stored in `PlatformSettings`:

- Per-endpoint base + cap for the (IP, email) exponential backoff
- Tune up for high-traffic deployments
- Tune down for internal-only platforms
- Changes take effect immediately — no deploy

## Labelling tags (new XML tags)

Five new tags in the XML library, all marked with the platform-name
badge in the [Tag reference](/annotate/labeling-config/tags/):

- **[`<AudioRecord>`](/annotate/labeling-config/tags/audiorecord)** —
  in-browser audio capture for ASR / TTS corpus collection.
  WebM/Opus default, configurable bitrate / sample rate / noise
  cancellation, optional live waveform + server-side QC checks.
- **[`<AudioTextAlign>`](/annotate/labeling-config/tags/audiotextalign)** —
  pair audio with transcript and align words / tokens to time
  positions. Word vs phoneme granularity, token vs span mode,
  optional autoalign via Whisper / MMS. Now supports **ELAN tier
  hierarchy** (`tiers="utterance,word:utterance:subdivision"`) and
  **`.eaf` (ELAN Annotation Format) import**, giving the field-
  linguistic tier model that gap-1 field linguists reach for ELAN
  desktop for — inside a multi-user platform.
- **[`<KBRef>`](/annotate/labeling-config/tags/kbref)** — attach a
  concept from a curated Knowledge Base to a region (Phase 3.1).
  Autocomplete against label / aliases / external_id. The standard
  entity-linking layer above NER; the annotation stores the
  concept's `external_id` + `label` for downstream normalisation.
- **[`<TypedFeature>`](/annotate/labeling-config/tags/typedfeature)** —
  attach a form of dtype'd attributes (string / boolean / integer /
  float / link / concept_kb_ref) to a region, with feature defs
  managed at **Project → Settings → Typed layers** (Phase 3.1). The
  INCEpTION pattern generalised: NER + KB link + per-span structured
  metadata all on one canvas without a proprietary XML schema.
- **[`<MultiModalCanvas>`](/annotate/labeling-config/tags/multimodalcanvas)** —
  binds several time-based object tags (Audio, Video, AudioTextAlign,
  TimeSeries, AudioRecord) into ONE labeling surface with ONE
  playhead and ONE shared-region timeline (Phase 3.3). Regions drawn
  on the shared strip apply across every modality. The "one
  recording, many views" pattern common in speech, gesture, and
  audio-video corpus annotation.

## Semantic + knowledge-base annotation (Phase 3.1)

Named Entity Linking + typed-attribute annotation are first-class,
not add-ons.

- **`KnowledgeBase` model** at the org level — local (managed
  in-platform), remote (external autocomplete endpoint), or
  Wikidata backends. Entries carry `external_id`, `label`,
  `aliases`, `description`; TSV/CSV bulk import; CRUD APIs.
- **`TypedFeatureLayer`** at the project level — named layer with
  kind (`span` / `relation` / `chain` / `document`) and a set of
  typed features. Each feature has a `dtype`: `string`, `boolean`,
  `integer`, `float`, `link`, or `concept_kb_ref`.
- **`<KBRef>`** control tag renders KB autocomplete tied to a region;
  **`<TypedFeature>`** renders the appropriate dtype-per-feature form
  (text / checkbox / number / URL / embedded KB search) on the same
  region.
- **Named Entity Linking (KB-backed) template** ships in the project-
  creation Labeling Interface picker — instantiates `<Labels>`,
  `<Text>`, `<KBRef>`, and `<TypedFeature>` together with the setup
  steps walked through in the template's details panel.

Reach for **INCEpTION** when the formal typed-layer constraint system
(alignable-vs-referring tiers, cascading cross-layer references) is
the point of the project. AfriAnnotate covers the everyday NEL +
typed-attribute pattern *inside* a multi-modal team platform.

## Multi-modal shared canvas (Phase 3.3)

`<MultiModalCanvas>` binds several time-based object tags into ONE
labelling surface. The canvas acts as the "conductor" of a **sync
group** — its `sync=` attribute names the group, and every child tag
with the same `sync=` value participates. Play/pause on any child
drives all; regions drawn on the shared strip apply across every
modality; per-tag regions (Audio waveform selections, Video bounding
boxes) still work orthogonally.

Payoff for the "one recording, many views" pattern common in speech,
gesture, and audio-video corpus annotation — audio + video of a
lecture, a signed conversation with gloss transcript, an interview
with speaker-diarised audio all annotated in one task without
switching context.

## Per-project features

### Audio QC

[**Audio QC**](/annotate/projects/audio-qc) — server-side automated quality
checks for audio recordings. Three tiers: cheap default-on
(duration, peak, clipping, loudness LUFS, SNR, speech ratio,
silence), heavy opt-in (Whisper transcript match, MMS forced
alignment, DNSMOS / NISQA MOS, speaker consistency), and hard-
reject corruption-level. Action on fail (warn / route to review /
re-record / block). In-process or external MLBackend dispatch.

### Licensing decision tree

[**Licensing**](/annotate/projects/licensing) — guided 5–8 question wizard
that maps to nine SPDX outcomes (CC0, CC-BY, CC-BY-SA, CC-BY-ND,
CC-BY-NC, CC-BY-NC-SA, CC-BY-NC-ND, Proprietary, Restricted).
Persists the reasoning trail for dataset-provenance auditing.
Surfaces in project header + export manifest.

### Data security

[**Per-project data security**](/annotate/projects/security-settings) —
four templates (Basic / Compliance-Strict / Operational-Permissive
/ Custom). Toggles for offline allowed / metadata mirror /
multi-device / multi-user-per-device / browser caching / cache
wipe on logout / fresh session for export / annotator-action audit
logging / lock-after-submit / restrict-export-to-managers / max
offline cache age. Distinct from upstream's coarse-grained
permissions.

### Annotation behaviour extras

Beyond upstream's max-annotations-per-task setting:

- [**Tasks-per-annotator limit**](/annotate/projects/annotation-settings#tasks-per-annotator-limit) —
  per-person cap on how much one annotator can claim
- [**Regions min/max per annotation**](/annotate/projects/annotation-settings#regions-min--max-per-annotation) —
  structural constraint (e.g. "≥ 1 aspect" for ABSA, "exactly 1
  span" for QA)
- [**Annotator-facing language**](/annotate/projects/annotation-settings#annotator-facing-language) —
  the labelling stream renders in a project-specific language
  regardless of the annotator's profile preference

## Per-organisation features

### Consent library

[**Consent library**](/annotate/organization/consent) — versioned consent
templates with per-purpose granular consent (GDPR Article 7
compliant), typed signatures, age attestation, country-of-
residence capture, HMAC-SHA256 hash-chain audit log. Eight kinds
of consent (data use, NDA, ethics, voice release, etc.).

### Auto-suspend rules

[**Auto-suspend**](/annotate/organization/auto-suspend) — automatically
pause org members based on 7 rule types (inactivity, low
agreement, high rejection rate, low throughput, high abandonment,
quota exceeded, custom Python metric). Grace-period warnings,
per-rule scope, three unsuspend paths.

### Metrics dashboards

[**Org + project metrics**](/annotate/organization/metrics) — six org
panels (overview, timeseries, contributors, activity, evaluations,
label distribution) + four project panels (overview, timeseries,
annotators, agreement). Full REST API. Pretty heavy compared
to upstream's annotation-counts.

### Member suspension + invite policies

[**Suspend + invite policies**](/annotate/organization/members) —
suspension without removal (preserves audit trail), default-role-
on-invite, email-domain allowlist on invites.

## Per-annotator quality features

[**Annotator evaluation**](/annotate/review-and-quality/annotator-evaluation) —
three related per-person quality gates:

- **Calibration ramp** — new annotators warm up on ground-truth
  tasks before live data
- **Min-score pause** — rolling agreement below threshold = auto-
  pause (project-level)
- **Low-agreement auto-routing** — disputed tasks auto-pushed to
  review or re-annotated

Plus a **custom agreement metric** sandbox (Python) and an
embedding-API config for semantic-similarity scoring.

## Per-platform features

### Quotas

[**Org quotas**](/annotate/platform-admin/quotas) — per-org caps on max
members / max projects / max tasks. Enforcement at mutation points,
80% / 100% threshold notifications, bulk-increase API for billing-
system integration.

### Branding + rate limits + feature flags

[**Platform Settings**](/annotate/platform-admin) — platform name + logo
+ from-email at runtime (no rebuild), per-endpoint rate limits
tunable without deploy, feature-flag toggles for in-flight
features.

### Audit log with append-only DB constraint

[**Platform audit log**](/annotate/platform-admin#audit-log) — append-only
at the DB layer (UPDATE / DELETE blocked by CHECK constraint),
combined with consent module's hash chain for tamper-evident
compliance trail.

### Session timeout policy (per-org)

[**Session policy**](/annotate/platform-admin/session-policy) — per-org
max session age + max time between activity. Different orgs on
the same platform can have different security postures.

## Desktop + mobile distribution

### Mobile

[**Mobile install**](/annotate/mobile/install) — Capacitor-based thin-
client app distributed via Firebase App Distribution (Android)
and TestFlight (iOS). Same SPA, native shell. Architecture
documented at [Mobile architecture](/annotate/mobile/architecture).

### Desktop

[**macOS desktop**](/annotate/platform-admin/distribution/macos-dmg) —
Tauri-based wrapper, distributed as a notarized .dmg outside the
Mac App Store. Less friction than TestFlight macOS for embedded-
runtime apps.

### Offline sync (production-hardened, Phase 4)

[**Offline sync**](/annotate/platform-admin/offline-sync) — desktop app's
SQLite mirror + bidirectional sync (`afri_sync` module). SyncMeta
shadow table for dirty-tracking, CloudProxyMiddleware for transparent
local-vs-cloud routing, conflict resolution.

Phase 4 productionised the mobile / browser side:

- **Write-through IndexedDB cache** for tasks, projects, annotations,
  and drafts. Reads go local-first; writes hit both the local cache
  and the outbox in one atomic step.
- **Resumable offline download** — per-project checkpoint that
  survives cancel or crash. If a 4,000-task project download aborts
  at task 2,873, the next resume picks up exactly there. A **Cancel**
  button on the download UI runs a partial-cache-preserving abort
  path, so cancelling doesn't nuke the tasks already stored.
- **Outbox backoff + idempotency** — every pending mutation gets a
  client-side `unique_id`; when the server hits an existing one it
  short-circuits with `200 OK` instead of duplicating. Exponential
  backoff, `Retry-After` header respected, capped max delay. No
  double-writes on flaky links.
- **Pointer-events touch parity** on Audio waveforms, Video canvases,
  Image / Video / TimeSeries drag runners — annotators on tablet /
  touch-first screens draw regions, drag playheads, and resize
  boxes with the same fidelity as mouse users.
- **Mobile side-panels default collapsed** on narrow viewports so
  the labelling canvas gets the screen real estate it needs.

## Operator + admin tools

[**Management commands**](/annotate/platform-admin/management-commands) —
CLI commands for housekeeping: run-auto-suspend-rules,
backfill-agreement, detect-label-drift, expire-pending-invites,
send-inactivity-reminders, calculate-stats, afri-sync-pull. All
operator-runnable; most wire into Cloud Run jobs or cron.

[**Operator FAQ**](/annotate/platform-admin/operator-faq) — hoster-facing
troubleshooting for cloud-deploy issues, email deliverability,
build-pipeline gotchas, database scale guidance, self-hosting
alternatives (AWS mapping, single-VPS minimal viable).

## Distribution scaffolding

End-to-end build + ship scripts for all four artifacts:

- [Firebase App Distribution (Android)](/annotate/platform-admin/distribution/firebase)
- [Google Play Store (Android)](/annotate/platform-admin/distribution/play-store)
- [Apple TestFlight (iOS)](/annotate/platform-admin/distribution/testflight)
- [Notarized macOS .dmg](/annotate/platform-admin/distribution/macos-dmg)

Plus the [hoster setup runbook](/annotate/hosting) tying them together.

## Docs site itself

The fact that **the docs site rebrands cleanly via a single config
file** ([`docs-site/branding.config.js`](https://github.com/AfriAnnotate/Tool)) is itself
AfriAnnotate-specific. Every page on the site uses
`AfriAnnotate` / `https://label.afriannotate.org` / `https://github.com/AfriAnnotate/Tool` /
`label.afriannotate.org` / `no-reply@label.afriannotate.org` etc. — substituted at build
time by a remark plugin. Fork the repo, edit one file, rebuild —
the docs come out branded for your hoster.

## Things we did NOT change

For context, here's what stayed identical to upstream Label Studio:

- The XML tag library (55 of 57 tags are upstream — only
  `<AudioRecord>` and `<AudioTextAlign>` are ours)
- The labelling editor (LSF) — the embedded React widget that
  renders inside the browser
- The REST API for tasks / annotations / projects (we added new
  endpoints under `/api/afri/`, `/api/consent/`, `/api/audio-qc/`,
  etc., but didn't break upstream paths)
- The XML labelling-config grammar (our tags inherit the same
  parser)
- The basic project / task / annotation data model (we added new
  fields like `audio_qc_*`, `license`, `allow_offline_*`, but
  didn't remove or rename existing ones)

The upstream Label Studio team's work is the foundation; this list
is the diff.

## Reading further

- **Upstream Label Studio**: [labelstud.io](https://labelstud.io)
- **AfriAnnotate repo**: [https://github.com/AfriAnnotate/Tool](https://github.com/AfriAnnotate/Tool)
- **Reference cloud**: [https://label.afriannotate.org](https://label.afriannotate.org)
