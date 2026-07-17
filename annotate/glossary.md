---
title: "Glossary"
sidebar_label: "Glossary"
sidebar_position: 99
description: "Definitions of AfriAnnotate-specific terms — annotator vs reviewer, project vs workspace, task vs annotation vs region."
mdx:
  format: md
---

# Glossary

Definitions of AfriAnnotate-specific terms — useful as a link
target from other pages and a quick reference when you're trying to
remember which thing nests inside which.

## A

### Annotation
A single labeling result on a single task. One **task** can have many
annotations from different annotators (or the same annotator at
different times). Contains an array of **result** entries, each
describing one **region** of the labeled data.

### Annotator
The lowest-permission role inside an org. Can label tasks assigned to
them in projects they're members of. Cannot see Data Manager (unless
granted), cannot see other org members, cannot create projects.
Compare: **Reviewer**, **Manager**, **Admin**, **Owner**.

### Annotator agreement
A measure (0–1) of how much two annotators on the same task agreed.
Used in [review-and-quality](/annotate/review-and-quality/agreement) to
surface tasks where annotators disagree (likely worth reviewer
attention) vs tasks where they all agreed (safe to accept). Specific
algorithm depends on the tag type — Cohen's kappa for choice tags,
IoU for bounding boxes, etc.

## B

### Bundle ID
The unique identifier for an iOS / Android / macOS app. Used by
Apple/Google to differentiate apps. Common format:
`com.<your-org>.<app-name>` (e.g. `com.afriannotate.app`). Different
platforms each need their own bundle ID — iOS, macOS, and the
desktop variant should be distinct.

## C

### Capacitor
The native-app wrapper that lets the same React SPA run as iOS / Android
/ macOS / Windows apps. The mobile and (partly) desktop apps use it.
See [Mobile architecture](/annotate/mobile/architecture).

### Cloud storage
External S3 / GCS / Azure Blob buckets that a project can be **connected
to** as either a **source** (the bucket has data; sync it into the
project as tasks) or **target** (annotations are exported back to the
bucket as JSON files).

### Consent template
A reusable consent form (terms an annotator agrees to) configured at
the org level. Once attached to a project, every annotator working on
the project must accept it before labeling. See
[Consent library](/annotate/organization/consent).

### Control tag
An XML tag in a [labeling configuration](/annotate/labeling-config/overview)
that determines *what type of annotation* annotators produce — e.g.
`<Choices>`, `<Labels>`, `<RectangleLabels>`, `<TextArea>`. Pairs
with an **object tag** via `toName=`.

## D

### Data Manager
The tabular view of all tasks in a project. Lets you filter, sort,
bulk-assign, and dive into individual tasks. The default landing
page when you click into a project.

### DKIM
DomainKeys Identified Mail — a cryptographic signature on outgoing
email that recipients verify against a DNS record. One of the three
DNS pieces (alongside SPF + DMARC) you need to set up for email
deliverability. See [Email delivery](/annotate/platform-admin/email).

### DMARC
Domain-based Message Authentication, Reporting & Conformance —
policy for what receivers should do with mail that fails SPF or DKIM.
Lives as a TXT record at `_dmarc.<yourdomain>`. See
[Email delivery](/annotate/platform-admin/email).

## G

### Ground truth
An annotation that's been promoted to "this is the correct answer" for
its task. Used as the reference annotation when calculating
[agreement metrics](/annotate/review-and-quality/agreement) for other
annotators on the same task.

### Guest
The most restricted role inside an org. Can **view** projects
they're explicitly added to but cannot annotate, review, edit,
or manage anything. Useful for stakeholders, external auditors,
ethics reviewers, or new hires shadowing before becoming
Annotators. See [Roles](/annotate/organization/roles).

## I

### Internal tester (TestFlight)
A tester you add to TestFlight by email in App Store Connect. Up to
100 per app. No Apple Beta App Review required — builds become
available within ~5-15 min of upload-processing. See
[iOS TestFlight](/annotate/platform-admin/distribution/testflight).

## J

### JWT
JSON Web Token — the authentication primitive AfriAnnotate uses
for API + mobile auth. Two tokens issued per session: an **access**
token (short-lived, ~5 min) and a **refresh** token (longer-lived,
~24 hr). The access token is sent on every API call; the refresh
token mints new access tokens when the old one expires.

## L

### Labeling config
The XML document attached to a project that defines what annotators
see (object tags), what they can label (control tags), and how it's
laid out (visual tags). The source of truth for the labeling
interface + the export schema. See
[Labeling config](/annotate/labeling-config/overview).

### Labeling interface
The actual UI annotators interact with — rendered from the labeling
config. Live in **Project → Settings → Labeling Interface**.

### Labeling stream
The sequential view of "next task" → label → submit → "next task".
Triggered by clicking **Label All Tasks** on a project. The default
flow for annotators.

### Lead time
The wall-clock seconds an annotator spent on a single annotation,
including breaks while the tab was open. Stored on each annotation
as `lead_time`. Used for productivity reporting.

## M

### Manager
A role inside an org. Can create + edit projects, manage project
members, see all annotations. Cannot manage org membership or
billing (that's Admin / Owner). Compare:
[Roles](/annotate/organization/roles).

## O

### Object tag
An XML tag in a [labeling configuration](/annotate/labeling-config/overview)
that declares *the data type being labeled* — e.g. `<Image>`,
`<Text>`, `<Audio>`, `<HyperText>`. Paired with one or more
**control tags** via the `name=` ↔ `toName=` link.

### Organisation (org)
The top-level multi-tenancy container in AfriAnnotate. Every
user belongs to zero or more orgs. Every project belongs to exactly
one org. Every database row is filtered by org at the query layer —
no path lets a user in org A see rows from org B.

### Outbox
The IndexedDB-backed queue of failed `POST` requests in the mobile
app. When the network drops during annotation submission, the
request lands in the outbox; on the next `online` event the outbox
replays it to the cloud. Experimental — see
[Mobile install](/annotate/mobile/install).

### Owner
The highest-permission role inside an org. Can do everything an
Admin can plus manage billing + transfer ownership + delete the
org. The first user on a fresh platform is auto-promoted to Owner
of the auto-created default org.

## P

### PAT
Personal Access Token — a long-lived JWT you generate yourself in
**Profile → Settings** for API access. Bearer-authentication like
session JWTs but doesn't expire until you revoke it. Treated as
production secrets. See
[API → Authentication](/annotate/api/overview#authentication).

### Platform owner
A user with `is_superuser=True` — has access to Platform-level
settings (branding, rate limits, users across all orgs). Different
from an **Owner** role inside an org. The first user on a fresh
platform is auto-promoted to platform owner.

### Pre-annotation (prediction)
A model-produced annotation pre-loaded on a task. When an annotator
opens the task, the pre-annotation appears as draft regions they can
accept, edit, or discard. Used for active learning + speeding up
labeling. Stored as `predictions[]` on the task. See
[Task format](/annotate/data-import/task-format).

### Project
A container that holds a dataset of tasks, a labeling config, and a
set of members with project-specific roles. Lives inside an
organisation. The unit of work for annotators.

## R

### Region
The selected area of data that's been labeled — a text span, an
image bounding box, an audio segment, etc. Identified by a unique
`id` string per annotation. Multiple **result** entries can share
the same region ID (e.g. a bounding box that's labeled both as
"Coffee" and tagged with a per-region price).

### Result
A single labeled entry inside an annotation's `result[]` array.
Has a region `id`, a `from_name` (which control tag produced it),
a `to_name` (which object tag it applies to), a `type`, and a
`value` whose shape depends on the tag type.

### Reviewer
A role inside an org. Can label tasks AND review other annotators'
work — accept, reject, or fix-and-accept. Can't create projects.
Compare: [Roles](/annotate/organization/roles).

## S

### SPA
Single Page Application — the React app at `web/apps/labelstudio/`
that powers the AfriAnnotate web experience. The mobile + desktop
apps are wrappers around the same SPA. See
[Mobile architecture](/annotate/mobile/architecture).

### SPF
Sender Policy Framework — a DNS TXT record listing which mail
servers are authorised to send mail for your domain. One of the
three DNS pieces (alongside DKIM + DMARC) needed for email
deliverability. See [Email delivery](/annotate/platform-admin/email).

## T

### Task
A single unit of data to be labeled — one row of a CSV, one image,
one audio clip. Lives inside a project. Has a `data` JSON dict whose
keys match the project's labeling config's `$varname` references.
A task can accumulate many annotations from different annotators.
See [Task format](/annotate/data-import/task-format).

### TestFlight
Apple's pre-release distribution channel for iOS (and macOS) apps.
Internal testers (≤ 100) skip Apple review; external testers
(≤ 10k) go through Beta App Review on first build. See
[iOS TestFlight](/annotate/platform-admin/distribution/testflight).

## V

### Verify-email gate
The middleware that requires a user to click their verification email
before they can sign in. Bypassable by a platform owner via
**Platform → Users → Mark as verified**. See
[Mark a user verified](/annotate/platform-admin/manual-verify).

## W

### Webhook
An HTTP POST your platform fires on configurable project events —
task created, annotation submitted, etc. Configured per-project at
**Project → Settings → Webhooks**. Useful for piping annotations into
downstream ML pipelines or BI tools.

### Workspace
A container that groups related projects within an org. Optional —
projects can live at the org root or under a workspace. Use
workspaces for campaigns, languages, business units, or whatever
your team's natural grouping is. See
[Workspaces](/annotate/organization/workspaces).
