---
title: Maintenance and Stewardship
sidebar_position: 4
ready: true
last_update:
  date: 2026-09-28
  author: Shamsuddeen Hassan Muhammad
---

# Maintenance and Stewardship

Release is a milestone, not the end. A dataset that is corrected, extended, and answered for grows in value. One that is published and left alone decays: links rot, errors stay, and it falls out of step with the field. This page is about who does that work after the grant, how a volunteer community can keep it up, and what to do when something has to be corrected, withdrawn, or retired.

## Who owns the long tail

Most datasets outlive the grant that paid for them and the student who built them. Nobody asks in year one who will answer an email about the corpus in year four. Name a steward before release, in the dataset card and in the [Sustainability Plan](../templates/sustainability-plan.md).

A steward can be a person, a lab, or a community body. A person is responsive but leaves. A lab has continuity but its priorities shift with funding. A community body such as Masakhane or a national language-resource centre has the longest horizon and the strongest claim to speak for the speakers, but it needs a named contact inside it. The Masakhane participatory model spreads authorship and ownership across native speakers rather than concentrating it in a host institution ([Nekoto et al., 2020](../references.md#nekoto-2020)). Apply the same logic to stewardship: decision rights sit with the language community, and day-to-day duties sit with one accountable person who reports to it.

Separate the two in writing. Decision rights cover what may change in the data, who may use restricted parts, when a version is withdrawn, and whether the licence changes. Under CARE, Authority to control places these decisions with the community the data describes, not with whoever holds the repository password ([Carroll et al., 2020](../references.md#carroll-2020)). Operating duties cover triage, releases, and correspondence. When the person leaves, the duties move and the rights stay put.

Plan the handover before it is needed. Keep repositories under an organisation account. Hugging Face lets you transfer a repository from a user to an organisation and redirects the old URL, keeping download counts ([Hugging Face Hub docs, repository settings](https://huggingface.co/docs/hub/repositories-settings)). Give two people admin access to every host, the DOI record, and the mailbox. Write a one-page succession note: who takes over, how they are appointed, and what they inherit.

:::warning
A dataset whose only maintainer login belongs to a graduating student is one password reset away from being orphaned. Move ownership to an organisation before release.
:::

## A maintenance plan for a volunteer community

Volunteer maintenance fails when it promises what paid staff would deliver. Write a plan that matches the hours people have.

**Triage.** Route every report through one public place: a GitHub issue tracker or the Community tab on the Hugging Face repository. Label each report on arrival as a data error, a metadata error, a rights concern (consent, privacy, licence), or a request. Rights concerns jump the queue and go to the steward directly.

**A response promise you can keep.** Promise to acknowledge, and say when you will decide. "We reply within 14 days and say what happens next" is achievable for volunteers. "We fix bugs within 48 hours" is not. Give rights concerns a shorter clock, because a speaker asking about their own voice should not wait a fortnight.

**Cadence.** Batch fixes into scheduled releases, for example twice a year, so users can pin a version and know nothing changes under them. Each release ships with a changelog listing every item added, removed, or altered. Between releases, an errata file lists known problems.

**Who approves.** Maintainers may merge metadata and documentation fixes. Only the steward, or a small approval group that includes a native speaker, may approve changes to the data itself. Removal for consent or safety needs the steward alone; it should never wait on a committee.

**Credit.** Credit is the main currency a volunteer project has. Adopt the all-contributors convention, a specification for recognising contributors "in a way that rewards every contribution, not just code," with types for data, translation, review, and maintenance ([all-contributors](https://github.com/all-contributors/all-contributors)). Keep a `CONTRIBUTORS.md` naming annotators, transcribers, reviewers, and speakers who agreed to be named. On each versioned Zenodo release, list that version's contributors as authors of the record, so their work carries a citable DOI. [Community Ecosystems](../10_community-collaboration/community-ecosystem.md) makes the case for naming contributors; the maintenance plan makes it routine.

## Corrections, withdrawals, and consent revocation

Distinguish errata from a recall. An erratum fixes a mistake that does not change what the dataset is: a misspelt transcript, a wrong duration, a broken file. Fix it in the next scheduled release and note it in the changelog. A recall removes items because keeping them would harm someone: a speaker withdrew consent, a recording captured a third party, or an audit found content that should never have shipped. A recall does not wait for the cadence.

**When a speaker withdraws consent.** Your consent form should already say that withdrawal is possible (see [Informed consent](../data-governance/index.md#informed-consent)). Verify that the request comes from the speaker or their representative, find their items by speaker identifier, and remove them from the working copy the same week. Publish a new version without them, and record in the changelog that items were removed at a contributor's request, without naming the person or giving their reasons.

**Removing across versions and mirrors.** Withdrawal is harder than release because copies multiply. On Hugging Face, a new commit removes items from the current revision, but earlier revisions stay in the repository history, so full removal means rewriting history or making the repository private. On Zenodo, each version is a separate record with its own persistent identifier, and old versions stay available by design so that a citation to a version always resolves to unchanged files ([Zenodo help, managing versions](https://help.zenodo.org/docs/deposit/manage-versions/)). Removing an item from a published version therefore means asking Zenodo to withdraw the record. Zenodo treats withdrawal as exceptional: the record is replaced by a tombstone page that states the reason and keeps the citation, and the DOI continues to resolve to that page ([Zenodo policies](https://about.zenodo.org/policies/)). DataCite, which issues the DOIs, holds that a DOI cannot be deleted and that a tombstone page should confirm the item existed and is no longer available ([DataCite support](https://support.datacite.org/docs/tombstone-pages)). Write to every mirror you know of. You cannot force a copy off a stranger's server, and you should tell the speaker so.

**Communicating a correction.** Post one notice, in the same words, in the dataset card, the changelog, the issue tracker, and the release notes. Say what changed, which versions are affected, and what users should do. For a recall, also email everyone with gated access and open an issue on every derivative you know of. Peng, Mathur and Narayanan traced nearly a thousand papers that used three retracted face datasets and found that derivatives kept circulating after the originals were withdrawn, and that unclear licences and weak management made the harm hard to contain ([Peng et al., 2021](../references.md#peng-2021)). A recall notice that never reaches the derivatives has not done its job.

:::danger
Never quietly overwrite a released version to remove an item. Users with the old files cannot tell what changed, and the person who withdrew has no evidence that you acted. Publish a new version and a notice.
:::

## Deprecation and succession

Retire a dataset when it can no longer be used as documented: the annotation scheme has been superseded, an audit found problems too large to patch, a successor corrects it wholesale, or the governing community asks. Retiring is different from deleting. Anyone must still be able to obtain the exact version a paper used, so the old files stay where they are.

On Zenodo, publish a final version whose description opens with a deprecation statement and a link to the successor. In the related works field, use the DataCite relation types: the old record `IsObsoletedBy` the new one and the new record `Obsoletes` the old, or `IsPreviousVersionOf` and `IsNewVersionOf` when the successor is a continuation rather than a replacement ([DataCite Metadata Schema, relationType](https://datacite-metadata-schema.readthedocs.io/en/4.6/appendices/appendix-1/relationType/)).

Hugging Face documents no dedicated deprecation field in its dataset card metadata ([Hugging Face Hub docs, dataset cards](https://huggingface.co/docs/hub/datasets-cards)). Do it by convention. Put a deprecation notice at the top of the card with a link to the successor, add a `deprecated` tag, and consider gating the old repository so new users must read the notice before downloading ([Hugging Face Hub docs, gated datasets](https://huggingface.co/docs/hub/datasets-gated)). Do not make it private, because that breaks reproducibility for everyone who cited it. The successor's card should say what it fixes and what it drops.

## Licences over time

You cannot easily relicense a released dataset. A Creative Commons licence is irrevocable for anyone who received the data under it, and a dataset built from many people's contributions is licensed to you by each contributor under the terms agreed at collection. Opening the licence beyond what the consent allows breaks those agreements; tightening it does nothing to copies already downloaded. The licence is a governance decision that ages with the data, and it should be revisited with the other rights and duties at each major version ([Jernite et al., 2022](../references.md#jernite-2022)).

What you can do is bounded. You can release new versions under a new licence, if the consent terms permit, while earlier versions keep their original terms. You can dual-release the same version under two licences, for example CC BY-SA for everyone and a community licence with benefit-sharing terms for commercial users outside the region. You can place new contributions under a stricter regime while leaving old ones as they were. You cannot recall a permission already granted.

The playbook discusses the Esethu licence, with its reinvestment loop, and the Nwulite Obodo Open Data License, with its tiered terms by region, under [African and community licences](../data-governance/index.md#african-and-community-licences) ([Esethu Framework, 2025](../references.md#esethu-2025); [NOODL, 2025](../references.md#noodl-2025)). Both are recent, and neither has yet been tested in a dispute with a large reuser. If you adopt one, write down the fallback you would accept if the terms prove unenforceable.

## Paying for the long tail

Be concrete about what costs money. File storage is the smallest line: Zenodo and the Hugging Face Hub carry public datasets for the depositor, while a project's own server or cloud bucket is a recurring bill and a single point of failure. A Zenodo DOI costs nothing.

People are the real cost. A steward who reads issues, verifies withdrawal requests, prepares releases, and answers funders needs hours every month, and a corpus in active use needs more. Corrections that need re-annotation cost what annotation always costs: paid native-speaker time at a fair rate. Legal advice on a consent or licence question costs money or a favour, and reporting back to speakers in person costs travel that grant budgets rarely cover after the project ends.

Funding patterns that have kept open language data alive:

- **Institutional hosting.** A university or a national infrastructure such as SADiLaR carries stewardship in its mandate, so the cost sits in a salary line rather than a grant.
- **Follow-on grants.** Lacuna Fund has funded dataset creation across Africa ([Lacuna Fund](../references.md#lacuna-fund)); a maintenance or extension proposal that cites downloads and derivatives makes a stronger case than a fresh one.
- **In-kind community time.** Masakhane runs largely on volunteer effort coordinated online ([Masakhane](../references.md#masakhane)). This is the cheapest line and the most fragile. It works only when credit is real and the ask is bounded.
- **Service revenue.** A hosted transcription or translation tool built on the data can fund its own upkeep if it has paying users. Keep the dataset licence and the service terms separate so the open data stays open.
- **Licensing revenue reinvested.** The Esethu framework routes commercial licensing revenue back into the dataset and local jobs ([Esethu Framework, 2025](../references.md#esethu-2025)); NaijaVoices pairs collection with reciprocal community support ([Emezue et al., 2025](../references.md#emezue-2025)).

No single pattern is enough. Write the mix into Part 6 of the sustainability plan, and put a number on the steward's hours even if no one is paying for them yet.

## Measuring impact

Funders and communities want different evidence, and both are cheap to collect. Record downloads from the host's counters, and say plainly that a download is not a use. Track citations with a Google Scholar alert on the paper and a DOI search on the Zenodo record. List derived datasets and models: search the Hub for repositories that name yours, and ask users to open an issue when they publish a derivative. Count the languages and varieties served. Collect stories with permission: a teacher who used the corpus in class, a start-up that shipped a keyboard, a speaker who heard their language in a demo. Two quoted stories do more in a funder report than a download graph, and they matter more to the community whose voices are in the data.

## A worked example

The block below is a maintenance policy for a fictional Amharic read-speech corpus. Copy it into a `MAINTENANCE.md` and change the names.

```text title="MAINTENANCE.md"
Maintenance policy for the Kebero Amharic Speech Corpus

Steward
  The corpus is governed by the EthioNLP community. The steward is
  the EthioNLP data lead (currently A. Tesfaye). If the steward steps
  down, EthioNLP appoints a successor within 60 days and updates this
  file. Repositories belong to the ethionlp organisation on Hugging
  Face and the EthioNLP community on Zenodo, never to an individual.
  Two admins hold access to each.

Reporting problems
  Open an issue at github.com/ethionlp/kebero/issues and label it
  data-error, metadata-error, rights, or request. Rights concerns
  (consent, privacy, licence) may also be emailed to the steward.

Response promise
  We acknowledge every issue within 14 days and say what will happen.
  Rights concerns are acknowledged within 3 days. Fixes ship with the
  next release unless the issue is a rights concern, which ships as
  soon as it is verified.

Releases
  New versions are published in March and September. Each release has
  a changelog listing every item added, removed, or changed, and a
  Zenodo version record naming that version's contributors as authors.
  Between releases, ERRATA.md lists known problems.

Approval
  Maintainers may merge documentation and metadata fixes. Changes to
  audio or transcripts need approval from the steward and one Amharic
  native speaker on the review group. Removals for consent or safety
  are approved by the steward alone.

Withdrawal of consent
  A speaker may withdraw at any time by contacting the steward. We
  verify the request, remove their items from the working copy within
  7 days, and publish a new version. The changelog records that items
  were removed at a contributor's request, without naming them. Where
  the speaker asks, we request withdrawal of affected Zenodo versions
  and notify known mirrors and derivatives. We cannot guarantee
  removal from copies we do not control, and we say so.

Deprecation
  If the corpus is retired, the final version carries a notice and a
  link to its successor. Old versions remain available.

Credit
  Contributors are listed in CONTRIBUTORS.md following the
  all-contributors convention, with types for recording,
  transcription, review, and maintenance.

Licence
  Version 1.x is released under CC BY-SA 4.0. Any change of licence
  applies only to new versions and only if the consent terms permit it.
```

## Data comes from people

Stewardship is where the playbook's first principle is tested. The speakers whose voices and words make up a corpus keep rights in it after release: to be credited, to withdraw, to know how the data is used, and to share in what it produces. A steward is the person or body that honours those rights once the grant is spent and the paper is out. Name one, resource one, and write down what they may decide.
