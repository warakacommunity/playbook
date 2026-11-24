---
title: Project Management
ready: true
last_update:
  date: 2026-11-24
  author: Shamsuddeen Hassan Muhammad
---

# Project Management

An African-language dataset is usually built by a small, distributed team: researchers, native-speaker annotators, and volunteers working part-time across several countries, time zones, and languages, often on a small grant. The Masakhane machine translation project, for example, was written by 49 authors across Africa and beyond, who coordinated almost entirely online ([Nekoto et al., 2020](../references.md#nekoto-2020)).

Projects like these fail for reasons that have little to do with the data itself. In a study of 53 AI practitioners in India, East and West Africa, and the United States, 92% reported at least one "data cascade": a problem introduced early, in how data was scoped, collected, or labelled, that stayed hidden until it caused expensive damage later ([Sambasivan et al., 2021](../references.md#sambasivan-2021)). Many of these problems start with planning decisions. This chapter walks through those decisions in the order you will face them.

## 1. Scope the project

Mistakes made before collection are the most expensive, because every later step inherits them.

**Check what already exists.** Before you plan a new dataset, follow the four steps in [Before You Start](../before-you-start/index.md). You may be able to reuse or extend an existing dataset, which changes the whole plan.

**Write down the goal and how you will know you are finished.** "A 5,000-sentence Yorùbá sentiment dataset, three annotators per item, inter-annotator agreement above 0.6, released under CC BY 4.0 by December" is a goal you can plan against. "Improve Yorùbá NLP" is not. A concrete goal sets the scale, the budget, and the stopping point, and it stops the project from growing until it runs out of money or volunteers.

**Name the language precisely:** the language, script, regional variety, and register. Swahili collected from Tanzanian news is not interchangeable with Kenyan social-media Swahili, and a model trained on one will underperform on the other. One language done well is usually better than three done badly. Multi-language projects are possible, but they are coordination problems first: MasakhaNER 2 reached 20 languages by running each language as its own sub-team under a shared protocol ([Adelani et al., 2022a](../references.md#adelani-2022)).

**Decide scale, modality, and task together**, because they trade off against each other: how much data, in what form (text, speech, or images), and with what labels. Size the project to the team and budget you have. A small, clean, well-documented dataset is worth more than a large, noisy one, and quality problems are worst in large web-crawled collections for low-resource languages ([Kreutzer et al., 2022](../references.md#kreutzer-2022)).

**Record these decisions in a project charter**, and share it with the whole team and with your funder.

:::tip[Template: Project charter]
A fill-in document that records the project's purpose, partners, language, data, licence, team, timeline, budget, governance, and ethics, with a signature block for every partner. [Open the project charter template](../templates/project-charter.md).
:::

## 2. Settle ethics, consent, and the law early

These steps take longer than most teams expect, and they must be finished before you collect any data. Consent cannot be added to data you have already collected.

- **Ethics approval.** If you work at a university, you will usually need approval from a research ethics committee before collecting data from people. Review can take weeks or months, so apply as soon as the scope is fixed.
- **Data protection law.** Many African countries now have data protection laws, including South Africa (POPIA), Kenya (Data Protection Act, 2019), and Nigeria (Nigeria Data Protection Act, 2023). Check the rules in every country where you collect data or store it, especially if data will cross borders.
- **Consent and licence.** Decide how you will ask for consent and which licence you will release under before collection starts. The licence you want at the end limits what data you can collect at the start.

The [Legal, consent, and community IP](../legal-consent/index.md) and [Data Governance](../data-governance/index.md) chapters cover these in detail. Set up the consent register before the first contribution arrives, not after; [Keeping consent records](../legal-consent/index.md#keeping-consent-records) says what to log for each person.

## 3. Plan the work

**Build the timeline backwards** from your release date, through the stages that must happen in order: guidelines, pilot, revision, main annotation, quality control, documentation, and release.

**Run a pilot first.** Annotate 50 to 200 items with your real annotators and your real guidelines before you commit the full budget. A pilot shows you unclear instructions, hard cases, and disagreements while they are still cheap to fix. It also gives you a measured annotation rate (items per hour) to plan the rest of the schedule from.

**Make a go/no-go decision after the pilot.** Agree on the criteria beforehand, for example:

- Is agreement between annotators close to your target?
- Did the guidelines answer most of the annotators' questions?
- At the measured rate, does the full dataset fit the budget and the timeline?

If the answer to any of these is no, revise the guidelines or the scope and pilot again. Do not scale up a design that is not working.

**Test in private, then save the setup.** Dry-run every new configuration in a private test project that annotators cannot see, and open it to them only when it behaves as intended. Once a pilot has settled the interface, guidelines, review rules, overlap and sampling, save the whole set as a versioned template for the next language or phase. A template usually carries settings only: data, members, storage credentials and links to project-specific resources must be added again, so check them in each new project. In most tools a template is a snapshot, so later changes to it do not reach projects already created from it. Group projects by language or phase, and archive finished groups rather than deleting them.

**Respect the order of dependent steps.** Guidelines must be stable before main annotation starts, or you will re-annotate. Ethics approval and consent must be in place before collection.

**Plan around the calendar.** Many annotators are students or have other jobs. Exams, public and religious holidays, fasting periods, elections, and rainy seasons all change who is available and when. Put these dates in the plan and add slack.

## 4. Budget and fund the work

**Estimate annotation cost first**, because it is usually the largest cost for text projects:

> number of items × annotators per item × time per item × hourly rate

Then add time for review and adjudication, and for coordination. For example, 5,000 items with three annotators at one minute per item is 250 annotator-hours before any review. Use the rate you measured in the pilot, not a guess. The [Cost and Resource Planning](../2_data-collection/6_cost-resource-planning.md) page covers estimation in more detail. "Annotators per item" need not be the same for every item: giving several annotators only a random sample and one annotator the rest costs far less than full overlap, as the worked figures in [Overlap a sample, not everything](../3_annotation-design/workflow-adjudication.md#overlap-a-sample-not-everything) show.

**Budget for the costs that are easy to forget:**

- Mobile data and airtime for annotators who work on their own phones.
- Devices, recording equipment, and storage for speech and image projects.
- Payment transaction fees, especially for cross-border payments.
- Coordination time for the project lead and language leads.
- A contingency line for re-annotation and for annotators who leave.

**Pay annotators fairly and on time.** Annotators are skilled contributors. Set a transparent rate based on local professional rates rather than the lowest global crowdsourcing rates, and agree on it before work starts. Mobile money (M-Pesa, MTN MoMo, Airtel Money) is often the most practical way to pay: it reaches people without bank accounts and arrives quickly. Late or unclear payment is the fastest way to lose a good team and to damage trust for the next project.

**Plan for how money actually moves:**

- Grant money often passes through a university or organisation, and payments can take weeks or months to reach annotators. Agree on a payment process with your finance office before work starts.
- Exchange rates change. If the grant is in dollars or euros but you pay in local currency, check the budget against the current rate before each payment round.
- Keep a record of every payment. Funders will ask for it, and it protects you and the annotators.
- Check the tax rules that apply to payments in each country.

**If rates must change mid-project**, usually because the local currency has moved, treat it as a change to each contributor's agreement:

- By default, apply the new rate only to work done after the change. Amounts already included in a payout run never change.
- Tell contributors before the change takes effect, showing the old and new rates side by side.
- Let each contributor choose to accept the new rate or to leave, with their validated balance paid in full. Leaving over a pay change must never count against them later.
- Record who changed which rate and when, and each contributor's decision.

Write these terms into the [annotator contract](../templates/annotator-contract.md) before work starts.

**If you consider a crowdsourcing marketplace**, check before budgeting whether you can screen workers for your language and variety (usually you will have to write and run your own language test) and whether the platform's fees are charged on top of what workers receive; see [Crowdsourcing platforms](../11_text-classification/annotation.md#crowdsourcing-platforms).

**Look for funding that targets dataset creation.** [Lacuna Fund](../references.md#lacuna-fund), founded in 2020 by The Rockefeller Foundation, Google.org, and Canada's IDRC, funds machine learning datasets in low-resource settings, including African languages. Other options include AI4D Africa, university partnerships, and in-kind support such as compute or annotator time. Include your data management and consent plan in the proposal. Funders increasingly expect it.

## 5. Build the team

Most projects have more roles than people, so one person often holds several roles. What matters is that every role has a named owner.

| Role | Responsible for |
| --- | --- |
| **Project lead** | Schedule, budget, communication, and reporting to the funder. |
| **Language lead** (one per language) | Guidelines, hard cases, and quality for that language. The final authority on what is correct. |
| **Technical lead** | Annotation tool, data pipeline, storage, scheduled backups and tested restores. |
| **Ethics and data lead** | Ethics approval, consent records, data protection, and licensing. |
| **Field facilitators** (community collection) | Recruiting, onboarding, and supporting a local cohort of contributors. |
| **Annotators** | Producing labels. |
| **Reviewers** | Applying the rubric and escalating unresolved disagreements to adjudicators. Plan enough independent reviewers per language to keep the review queue moving. |

Keep annotation and review separate, even if people rotate between them. Reviewing your own work hides the errors you most need to catch. A language lead for each language, rather than one central team labelling everything, is what let Masakhane projects work across many languages at once ([Nekoto et al., 2020](../references.md#nekoto-2020)). Give each person only the access their role needs, and review and revoke it as described in [Who has access](../data-governance/index.md#who-has-access).

**Recruit early.** Finding fluent native speakers is often the hardest constraint, especially for smaller languages. Give recruitment its own timeline and owner. Good places to look include university language and linguistics departments, community organisations, and existing research communities such as [Masakhane](https://www.masakhane.io/). Use a staged funnel:

1. **Call.** Combine open calls with invitations through community networks. Ask only for the language, variety, region and device information needed to plan the work.
2. **Screen.** Check language and task readiness with a short, reviewed exercise.
3. **Onboard.** Train everyone on the guidelines before the pilot, and keep a reserve pool for dropouts.

**Test sign-up before the onboarding day.** Try account creation with the email providers your annotators actually use. University and workplace mail filters often hold back or block verification emails, so have a way to verify accounts manually and a second channel, such as a WhatsApp group, to reach people whose email does not arrive. If annotators install a test version of a mobile app, the invitation may go to the email of their app-store account rather than their work address. Before each annotation round, ask everyone to update to the current version of the tool, and check that they have.

For an open project, start private and open joining deliberately. Use reviewed requests for sensitive tasks. Take consent at joining and check it again when work is submitted. Cap active contributors at what your reviewers can support, and say whether the task works on a phone. Publish only a summary of the purpose, languages, contribution terms and consent conditions, never task data or the member list. Distinguish leaving the project from withdrawing consent, which follows the [withdrawal process](../legal-consent/index.md#withdrawal). See [Inclusive and Bias-Aware Annotation](../3_annotation-design/inclusive-bias-aware.md) and [Community Ecosystems](../10_community-collaboration/community-ecosystem.md).

**Recruit through field facilitators when you collect in communities.** Community collection, especially of speech, can recruit people in groups rather than one by one: a teacher brings a class, a community organiser brings neighbours, a cooperative officer brings members. NaijaVoices recruited its more than 5,000 voice donors through trained community facilitators ([Emezue et al., 2025](../references.md#emezue-2025)). Whatever else facilitators do in your project, define the role and keep its powers narrow:

- **Appoint facilitators; nobody becomes one by declaring it.** A facilitator is neither the language lead, who decides what is correct, nor the project lead.
- **Give them only what they need.** A facilitator sees their own cohort's progress, and nothing else: no admin rights, no access to other cohorts, and no power over the guidelines or the data.
- **Record who recruited whom.** Give each facilitator a unique sign-up link, or a QR code printed on their posters, so each contributor is linked to the facilitator who brought them. If a facilitator is removed, stop attributing new sign-ups to them.
- **Never let recruitment replace consent.** A facilitator can explain the project, but each contributor still gives their own [informed consent](../data-governance/index.md#informed-consent), individually.

The [agri-advisory speech layer](../agri-advisory/speech-layer.md#who-does-it-and-how) shows facilitators running regional recording sessions.

**Put agreements in writing.** Each contributor should have a short written agreement that covers pay, working hours, how their data and work will be used, the licence, and how they will be credited.

**Agree on credit at the start.** Decide early who will be an author on papers, who will be acknowledged, and how annotators will be named in the dataset documentation. Clear, fair credit keeps volunteers involved, and it avoids disputes at release.

## 6. Coordinate and track

**Work asynchronously.** Distributed, part-time teams need simple tools that work on a phone and on a weak connection. For most projects, three things are enough:

- one shared task tracker (a spreadsheet works);
- one place for the current version of the guidelines;
- one agreed channel for questions, such as a WhatsApp or Slack group.

Write decisions down, because few people are online at the same time. If contributors collect or label data away from a reliable connection, plan the sync, conflict and late-work rules before fieldwork starts; see [Offline Field Operations](../2_data-collection/10_offline-field-operations.md).

**Review a few numbers every week or two:**

- items completed against the plan;
- agreement between annotators;
- how many annotators are active;
- cost per item so far;
- skipped and repeatedly skipped items, with their reason codes and what happened to them ([Track skips and unfinished items](../3_annotation-design/workflow-adjudication.md#track-skips-and-unfinished-items));
- open item-level questions, especially those waiting for a reviewer ([Close the feedback loop](../4_data-quality/index.md#close-the-feedback-loop)).

For several languages or projects, use one table with a row per language or project and investigate the weakest rows first. Show agreement only where at least two independent labels overlap, with its support count; use "not yet scored", never zero, where it cannot be calculated. Alongside it report coverage, required annotations (items multiplied by planned overlap), open review items and the age of the oldest, rolling completion velocity over a fixed recent window, and the estimated finish date against the plan. Track open flags and rejection rates, and plan reviewer capacity where the backlog is growing. Keep these measures separate rather than combining them into one readiness score; [Report readiness as separate measures](../4_data-quality/index.md#report-readiness-as-separate-measures) lists what to report.

Per annotator, watch skip rate, time per item and label distribution. A sudden shift is a prompt to investigate, not proof of drift or misconduct. Use one fixed reporting time zone, such as UTC, so daily counts do not move between reports. The [agri-advisory Monday report](../agri-advisory/quality-consent-release.md#the-monday-report) is a worked monitoring example. Keep recognition and personal goals separate from this monitoring; see [Motivate without surveillance](../10_community-collaboration/community-ecosystem.md#motivate-without-surveillance).

Falling agreement usually means the guidelines need fixing, not that annotators need correcting. Annotators dropping out usually points to problems with pay, workload, or distressing content. A problem caught in week two costs far less than one found at release ([Sambasivan et al., 2021](../references.md#sambasivan-2021)).

## 7. Manage risks

These risks come up in almost every African-language data project:

| Risk | Early warning sign | What to do |
| --- | --- | --- |
| **Annotators leave** | Fewer items per week; slow replies | Set realistic timelines, pay on time, and recruit a slightly larger pool than you need. |
| **Guidelines drift** | Agreement falls over time | Keep the guidelines versioned, and re-check annotators on shared items regularly. |
| **Payments are delayed** | Finance office has not confirmed the process | Agree on the payment process before work starts, and keep a small float for urgent payments if your organisation allows it. |
| **Currency changes** | Local currency falls against the grant currency | Recheck the budget before each payment round, and keep a contingency line. |
| **Rate change mid-project** | The budget no longer covers the agreed rate, often after a currency fall | Apply the new rate to future work only, give notice with old and new rates side by side, and let contributors leave with their validated balance paid. Record every change and decision. See [If rates must change mid-project](#4-budget-and-fund-the-work). |
| **Connectivity and power fail** | Annotators miss deadlines in the same region | Choose tools that work offline or on a weak connection, and cover mobile data costs. Government internet shutdowns have happened in several countries, so plan for gaps. See [Offline Field Operations](../2_data-collection/10_offline-field-operations.md) for sync and late-work rules. |
| **Funding or a tool disappears** | Grant end date approaches; tool changes its pricing | Keep your own copies of all raw data and exports, test a complete exit export periodically, and avoid depending on a single service. |
| **Data loss** | A backup has never been restored; storage syncs or exports fail unnoticed | Schedule database and media backups with a retention period, test restores regularly, and check service health, failed syncs and failed exports weekly. |
| **Harm to annotators** | Annotators skip items or leave after sensitive batches | Warn annotators about sensitive content, let them opt out, limit exposure, and review data before release. |
| **Data leaks during annotation** | Exports or task links shared in public groups; data left on shared or lost devices | Match the security settings to how sensitive the data is, limit who can export, and clear local copies when work has synced. See [Securing data during annotation](../data-governance/index.md#securing-data-during-annotation). |

## 8. Release and hand over

**Plan the release from the start.** Decide where the dataset will be hosted, under which licence, how versions will be numbered, and who will answer questions and fix errors after the grant ends. The [Documentation](../6_documentation/documentation.md) chapter explains how to write a datasheet for the release.

**Assume someone else will finish the project.** Team members graduate, change jobs, or run out of time. Keep the guidelines, schema, consent records, and processing scripts in a shared repository, not on one person's laptop. This lets the next person pick up the work, and it lets you show where the data came from years later.

**Prepare to close before you have to.** Periodically export more than annotations: the contributor roster with roles and dates, consent records, payment records, review history and the [accountability log](../data-governance/index.md#keep-an-accountability-log). These records may need separate exports, so verify that each is complete and readable outside the tool.

When work ends, choose deliberately between **pause** (not active now, still managed), **archive** (closed to new work but readable, exportable and reversible) and **delete** (irreversible). Prefer a readable archive where retention duties permit, so consent and provenance survive. Delete only after confirming the required exports and archive copy, and after applying erasure, withdrawal and retention obligations. An archive still contains personal data; it does not suspend those obligations. See [Know where every copy lives](../6_documentation/data-storage.md#know-where-every-copy-lives-and-for-how-long).

**Write down what you learned.** When the project ends, record what worked and what did not, using the [retrospective template](../case-studies/retrospective-template.md). It helps the next team plan better than you could.

## Checklist before you start

- [ ] Searched for existing datasets ([Before You Start](../before-you-start/index.md)).
- [ ] Goal, language variety, scale, and success criteria written in a project charter.
- [ ] Ethics approval and data protection requirements identified, with time in the plan.
- [ ] Consent process and release licence decided.
- [ ] Pilot planned, with go/no-go criteria agreed.
- [ ] Budget built from a measured rate, including hidden costs and contingency.
- [ ] Payment process agreed with your finance office.
- [ ] Every role has a named owner.
- [ ] Written agreements and a credit policy for all contributors.
- [ ] Release, hosting, and maintenance plan in place.

:::note[How this connects]
The decisions in this chapter set up [Data Collection](../2_data-collection/1_data-modalities.md), [Annotation Design](../3_annotation-design/annotation-task-design.md), and [Data Quality](../4_data-quality/index.md), which follow.
:::
