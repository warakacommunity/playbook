---
title: Offline Field Operations
sidebar_position: 10
ready: true
last_update:
  date: 2026-11-26
  author: Seid Muhie Yimam
---
# Offline Field Operations

Learn how to run data collection and annotation when contributors work away from a reliable connection: what to settle before fieldwork, how work moves from a device to the server, and what to test before you scale.

:::tip[Key points]

- Decide whether data may be stored on devices, and check it against consent and the law, before fieldwork.
- Do sign-in, contributor consent and work-packet downloads while connected.
- Never lose work: give each item a device-made ID, keep refused work, and avoid last-writer-wins.
- Protect unsent work from storage clean-up, and show contributors plainly what has synced.
- Test offline in the pilot, and budget for data bundles and regular check-ins.

:::

## Why plan for offline work

Many African-language projects collect and label data where the network comes and goes: in villages, on farms, in clinics, or on prepaid mobile data that contributors pay for themselves. A tool that needs a live connection for every action loses work when the signal drops. It also quietly shapes the dataset, because people near towns can contribute and people further out cannot. [Offline and patchy-connectivity NLP](../deployment/offline.md#the-three-connectivity-classes-to-design-for) describes three connectivity classes (steady, metered, patchy or offline). Decide which one your contributors are in before you choose a tool, and plan this page's steps if the answer is not "steady".

This page is about the operations side: decisions, rules and checks for the project team. The software pattern underneath it (a local outbox, duplicate-safe IDs, opportunistic sync) is covered in [The local-first design pattern](../deployment/offline.md#the-local-first-design-pattern). The [agri-advisory case study](../agri-advisory/field-image-capture.md) shows these practices in one project (see [A worked example](#a-worked-example)).

## Before fieldwork

### Decide whether data may live on devices

Offline work means data sits on a contributor's phone or laptop, sometimes for days. Decide this per project, not per tool. For public text such as news sentences this is usually fine. For recordings of identifiable people, health information, or anything your consent forms limit, check that the consent wording and the data-protection law that applies allow storage on personal devices, and what happens if a phone is lost or shared ([Legal, consent, and community IP](../legal-consent/index.md#consent)). If contributor-owned devices are prohibited but offline storage is allowed, use secured project-owned devices. If offline storage itself is prohibited, the project must be online-only. Where device storage is allowed, apply the controls in [Securing data during annotation](../data-governance/index.md#securing-data-during-annotation).

### Survey the devices you will rely on

Ask every contributor a few short questions at enrolment, and keep the answers with their contributor record. A *work packet*, mentioned below, is the set of items, guidelines and media a contributor downloads for offline work.

| Ask about | Why it matters |
| --- | --- |
| Operating system and version | Your tool may not install or run on older versions. |
| Free storage | Media for a work packet can fill an entry-level phone. |
| Whether the phone is shared | Family members may see the data or clear the app. |
| Who pays for mobile data | If the contributor pays, the project should cover it. |
| Where and when they get a connection | This sets a realistic sync schedule. |

### Do the online steps while connected

Some steps need a connection and should never be left until the contributor is in the field:

- **Sign-in and enrolment.** Create accounts, sign in on the device, and confirm that a later launch works with the network off.
- **Contributor consent.** Complete contributor or account consent during a connected session, and record or scan it. Consent from field participants, such as farmers or speakers, is different: capture their written or oral consent on the device while offline and synchronise it with the data it covers; see [Quality, consent and release](../agri-advisory/quality-consent-release.md) for one way to do this.
- **Work packets.** Download the items, the guidelines, the label set and any media each person will need, and check that they open with the network off. A packet should be small enough to download over the connection the contributor actually has.

## Sync without losing work

Work done offline waits in a queue on the device and is sent when a connection returns. Two rules matter for operations:

- **Every item of work carries an ID made on the device** (see [the local-first pattern](../deployment/offline.md#what-local-first-means-in-practice)), so a phone that retries a send never creates duplicate annotations.
- **Work the server refuses is kept, not dropped.** The server may reject a send because the project was closed, the item was removed, or a field is invalid. The device should hold that work and show it to the contributor or a coordinator, who can retry it, fix it, or discard it on purpose. Losing a day's work to a bad sync is the fastest way to lose a field team.

Large files such as photos and recordings can upload separately from the record that describes them, as long as both carry the same ID and the server joins them whichever arrives first. Record both the time the work was done on the device and the time the server received it; the two can differ by days, and you need both for [provenance](./8_data-provenance-traceability.md#data-lineage).

## Decide how conflicts are handled

A conflict happens when the same item is changed on two devices, or on a device and the server, between syncs. Set the policy before fieldwork, write it into the guidelines, and tell contributors.

A common simple policy is *last writer wins*: whichever copy arrives last replaces the other. That is simple, but it throws away one person's work without telling anyone. Avoid it for annotation. Use one of two safer policies:

- **One item, one person, one device.** While an item is assigned to someone working offline, nobody else may edit it. This prevents most conflicts, and it suits field collection, where each collector owns their own captures.
- **Hold conflicts for a person to resolve.** When both copies changed, keep both and show them side by side to the annotator or a reviewer, who picks one, keeps both, or merges them. Some local-first sync systems work this way: they keep both conflicting values and leave the choice to the application or the user ([Kleppmann et al., 2019](../references.md#kleppmann-2019)).

Whichever you choose, log every resolved conflict with who resolved it and how.

## Work that arrives late

Offline work can arrive after the item already has the number of annotations it needed, because other people submitted first. Decide in advance what happens:

- **Honour work that was validly assigned.** If the item was assigned to the contributor before it filled up, accept the submission. Extra annotations are rarely wasted: they can feed [agreement checks](../3_annotation-design/workflow-adjudication.md#use-multiple-annotators-per-item) or adjudication.
- **Do not reject work for lateness alone.** Reject late work only if it was never assigned, and tell the contributor why.

## Manage device storage

Phones fill up, and when they do, the system or the browser may delete stored data to make room. Browser-based tools are especially exposed:

- Under storage pressure, a browser can delete all of a site's stored data at once, which can include work that has not been sent ([MDN Web Docs, 2026a](../references.md#mdn-storage-quotas)).
- Safari can also delete a site's stored data if the site has not been used for seven days of browser use ([MDN Web Docs, 2026a](../references.md#mdn-storage-quotas)).

Ask contributors to open the tool and sync at least weekly. If your tool is browser-based, check that it asks the browser for persistent storage, which exempts it from eviction under storage pressure ([MDN Web Docs, 2026a](../references.md#mdn-storage-quotas)). Three habits protect unsent work:

- **Cap the media cache.** Keep media the device can download again (images, audio, video) under a size limit, and clear only that media when space runs low. Never clear queued work or drafts to save space.
- **Set a minimum free-storage requirement** in the device survey and check it again before each new work packet.
- **Sync before freeing space.** Ask contributors to sync, and confirm that nothing is waiting, before they delete a downloaded project or clear the app's data.

Smaller media helps too: see [Preparing media for annotation](./7_data-cleaning-preprocessing.md#preparing-media-for-annotation).

## Show sync status plainly

Contributors need to know whether their work is safe. A good status display:

- **tells "no internet" apart from "server unreachable"**, so a contributor with signal does not keep moving around looking for a better one when the problem is on the server side;
- **shows a count of unsynced items**, and the time of the last successful sync;
- **flags refused work** clearly, so it is dealt with rather than forgotten.

Ask coordinators to check unsynced counts during each check-in. A contributor with work that has waited for days needs help, not a reminder.

## Test offline in the pilot

Before you scale, run part of the pilot with the network off, and include these cases:

1. Do a full session in airplane mode, close the app, reopen it the next day, and sync.
2. Cut the connection in the middle of a sync, then reconnect.
3. Edit the same item on two devices while both are offline, and confirm your conflict policy works.
4. Fill the phone's storage close to full and confirm that no queued work is lost.
5. Submit work to an item that filled up while the device was offline, and confirm the late-work rules.

## Budget for connectivity

Include data bundles or airtime for every contributor who works on their own phone, and enough for the initial work-packet downloads, which are the largest. Set a check-in schedule (for example weekly, at a place with a connection) where coordinators sync devices, hand out new packets and answer questions. Internet shutdowns and power cuts happen, so leave slack in the timeline ([Project Management](../project-management/index.md#7-manage-risks)).

## A worked example

The [agri-advisory case study](../agri-advisory/field-image-capture.md) collects field photos where most fields have no signal. Collectors download their project, form and guidance before going out; each capture waits on the phone until a connection returns; and work the server refuses is held for review rather than lost. Consent from the collector and the farmer is given in writing or recorded orally, and a recorded oral consent must be heard by the language lead before the contributor's items count ([Quality, consent and release](../agri-advisory/quality-consent-release.md#consent)). The case study notes why this matters for the data, not only for the collectors: a capture tool that needs a connection selects for images taken near towns.

## Checklist

- [ ] Decided whether data may be stored on contributors' devices, and checked it against consent and the law.
- [ ] Surveyed devices: OS version, free storage, sharing, who pays for data, where people connect.
- [ ] Sign-in, enrolment, consent and work-packet downloads are done while connected.
- [ ] Every item of work gets a device-made ID; refused work is kept for review.
- [ ] A written conflict policy that is not last-writer-wins.
- [ ] Written rules for accepting, reviewing or rejecting late work.
- [ ] A media cache limit, a free-storage minimum, and "sync before you clear".
- [ ] Browser-based tools request persistent storage; contributors sync at least weekly.
- [ ] Sync status that separates no internet from server problems and shows unsynced counts.
- [ ] An offline and interrupted-connection test in the pilot.
- [ ] Data bundles and a check-in schedule in the budget.

