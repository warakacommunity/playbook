---
sidebar_position: 8
title: Tooling and Infrastructure
ready: true
last_update:
  date: 2026-11-24
  author: Idris Abdulmumin
---

# Tooling and Infrastructure

The tools a project uses shape what it can do and how reliably it can do it. For African-language data work, tooling choices are constrained by real conditions, namely tight budgets, intermittent connectivity, and distributed teams, so the right tool is rarely the most powerful one but the one the team can actually run.

## Annotation tools

Choose an annotation tool by usability, scalability, and cost, weighed against the task and the team. Lightweight, self-hosted, or free tools often beat feature-rich paid platforms for a volunteer project, and a tool that works on modest hardware over a poor connection matters more than one with every feature. The annotation chapters cover tool choice for specific tasks in more detail.

### A checklist for choosing a tool

No single tool is best for every project, so judge candidates against your task, your team, and your conditions rather than against a feature list. Start with the general questions that apply to any annotation project:

- **Task and schema.** Does the tool support your task type and label schema (spans, relations, boxes, audio segments, free text) without workarounds?
- **Scale and team.** Can it handle your expected volume and number of annotators, with the review and adjudication workflow you have designed (see [Workflow and Adjudication](../3_annotation-design/workflow-adjudication.md))?
- **Quality control.** Can you mix in gold items, assign the same item to several annotators, and measure agreement from what it stores?
- **Data sensitivity.** Does its hosting and access model fit the privacy requirements of your data?
- **Cost and upkeep.** What does it cost to set up, run, and maintain for the life of the project, including after the funding ends?

Then add the checks that decide whether a tool works for African-language data in the conditions your team actually faces:

- **Scripts.** Does it render and let annotators select text correctly in your target script, including right-to-left text, Ajami, Ge'ez, Tifinagh, and combining diacritics? Check that span offsets stay correct after selection and that what the annotator types is what gets stored (see [Non-Latin scripts in real UIs](../deployment/non-latin-scripts.md)).
- **Language routing.** Can it send items to annotators by language or variety, so that each item reaches someone who speaks and reads that variety, not whoever happens to be free?
- **Offline and mobile.** Does it work on the phones and modest laptops your annotators own, and can it keep working offline and sync safely when the connection returns (see [Offline field operations](../2_data-collection/10_offline-field-operations.md))?
- **Interrupted uploads.** When media is uploaded from the field over a poor connection, does each file transfer on its own and resume after a drop, rather than failing the whole batch or leaving it half imported?
- **Consent and licence.** Can it keep consent and licence records linked to the items they cover, so they travel with the exports (see [Data Governance](../data-governance/index.md))?
- **Per-annotator labels and provenance.** Do exports keep every annotator's labels, with who labelled what and when, rather than only one merged answer? Disagreement is often information worth keeping ([Plank, 2022](../references.md#plank-2022)).
- **Roles and audit trail.** Can you separate annotators, reviewers, and project leads, scope and revoke tokens, review access, and see a record of who changed what? See [Who has access](../data-governance/index.md#who-has-access).
- **Provider access.** If the tool is hosted by someone else, who at the provider can see your data, where is it stored, and under which country's law? Can the data owner grant time-limited, logged support access (see [Make the rules enforceable](../data-governance/index.md#make-the-rules-enforceable))?
- **Self-hosting.** Can you run it on infrastructure your community controls, and how much technical effort does that take to set up and keep updated?
- **Open exports.** Can you export everything, including labels, metadata, and governance records, in open formats you can read without the tool (see [Exporting from your annotation tool](./data-storage.md#exporting-from-your-annotation-tool))?

### Verify before you commit

Treat feature claims as claims until you have seen them work. Check each one in the edition and version you will actually use, since hosted, free, and paid editions of the same tool often differ. Then pilot the tool on a small set of real items from your corpus (for example, 20 to 50), including mixed-script and hardest-case items, with your real annotators on their own devices and connections. Export the pilot data and open it to confirm that everything you need came out. Whatever you choose, keep your own regular exports outside the tool, so that the dataset survives a lapsed subscription, a closed service, or a failed server.

## Pipelines, deployment, and access

Automate the repetitive parts of the pipeline, such as cleaning, formatting, and validation, so they are consistent and reproducible rather than redone by hand each time. One such step is converting audio and video into formats that play smoothly in a browser or on a phone before annotators see them (see [Preparing media for annotation](../2_data-collection/7_data-cleaning-preprocessing.md#preparing-media-for-annotation)). Decide between cloud and local deployment by weighing cost, connectivity, and data sensitivity, since sensitive or restricted data may be safer on local infrastructure under the community's control than on a foreign cloud. Throughout, apply sensible security and access control so that personal and sensitive data is seen only by those who should see it, which is part of the governance obligation, not separate from it. [Securing data during annotation](../data-governance/index.md#securing-data-during-annotation) suggests settings matched to how sensitive the data is.

### Getting data into the tool

Before importing, list every input field the interface expects. Where a task has several inputs, use a JSONL or CSV manifest that names each field. Import a handful of tasks first and open them in the interface to confirm that text, media and metadata display correctly before importing the full batch. Prefer a few checked imports to many small, untracked ones.

Beyond a small pilot, keep media in storage the project controls and have the tool reference it rather than copy it. Treat referenced media as immutable; the storage rules (one folder per project, checksums, a new ID for a corrected file) are in [Formats, metadata, and versioning](./data-storage.md#formats-metadata-and-versioning).

### Handing labels on to other systems

Many annotation tools can notify other systems when a label is submitted or edited, usually by sending a short message (a webhook) to an address you choose. Use this to feed a training queue, post progress to the team's chat channel, or keep a backup or audit copy up to date without waiting for the next export. Three rules keep it safe:

- **Keep the receiving end fast.** Accept the message, store it, and do the real work afterwards in a separate step. A receiver that trains a model or writes to a slow database before replying will time out and miss events.
- **Accept only messages you can trust.** Require a secret token or signature on every message, send it over HTTPS, and reject anything without it. Annotations can contain personal data, so treat the receiver as part of the secure setup described in [Securing data during annotation](../data-governance/index.md#securing-data-during-annotation).
- **Treat notifications as a copy, not the record.** Messages can be lost or arrive twice while a network or the receiver is down. The annotation tool's own data stays the record of truth; notifications are a near-real-time copy. Keep taking periodic full exports and archive them as described in [Keep a copy of record](./data-storage.md#keep-a-copy-of-record), and rebuild any downstream copy from an export when the two disagree.
