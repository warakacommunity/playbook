---
title: Project Management
ready: true
last_update:
  date: 2026-11-26
  author: Shamsuddeen Hassan Muhammad
---

# Project Management

An African-language dataset is usually built by a small, distributed team: researchers, native-speaker annotators, and volunteers working part-time across several countries, time zones, and languages, often on a small grant. The Masakhane machine translation project, for example, was written by more than 45 authors across Africa and beyond, who coordinated almost entirely online ([Nekoto et al., 2020](../references.md#nekoto-2020)).

Projects like these fail for reasons that have little to do with the data itself. In a study of 53 AI practitioners in India, East and West Africa, and the United States, 92% reported at least one "data cascade": a problem introduced early, in how data was scoped, collected, or labelled, that stayed hidden until it caused expensive damage later ([Sambasivan et al., 2021](../references.md#sambasivan-2021)). Many of these problems start with planning decisions. This chapter walks through those decisions in the order you will face them.

:::tip[Key points]

- Fix the goal, language variety, scale and licence in a written project charter before anything else.
- Start ethics approval, consent and data-protection checks early; consent cannot be added later.
- Run a small pilot and make a go/no-go decision before committing the full budget.
- Pay annotators fairly, on time and through a payment route agreed before work starts.
- Give every role a named owner, track a few numbers often, and plan the release and handover from day one.

:::

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
- **Data protection law.** Many African countries now have data protection laws, including South Africa's Protection of Personal Information Act, POPIA ([Republic of South Africa, 2013](../references.md#popia-2013)), Kenya's Data Protection Act, 2019 ([Republic of Kenya, 2019](../references.md#kenya-dpa-2019)), and the Nigeria Data Protection Act, 2023 ([Federal Republic of Nigeria, 2023](../references.md#ndpa-2023)). Check the rules in every country where you collect data or store it, especially if data will cross borders.
- **Consent and licence.** Decide how you will ask for consent and which licence you will release under before collection starts. The licence you want at the end limits what data you can collect at the start.

The [Legal, consent, and community IP](../legal-consent/index.md) and [Data Governance](../data-governance/index.md) chapters cover these in detail. Set up the consent register before the first contribution arrives, not after; [Keeping consent records](../legal-consent/index.md#keeping-consent-records) says what to log for each person.

## 3. Plan the work

**Build the timeline backwards** from your release date, through the stages that must happen in order: guidelines, pilot, revision, main annotation, quality control, documentation, and release.

**Run a pilot first.** Schedule a pilot of 50 to 200 items, and a go/no-go decision with criteria agreed in advance, before you commit the full budget. The annotation rate you measure in the pilot (items per hour) feeds the rest of the timeline. [Pilot the design, then decide whether to scale](../3_annotation-design/training_guidlines.md#pilot-then-iterate-the-design) explains how to run it and what to decide.

**Test the setup before annotators see it, then reuse it.** Try every new task setup yourself, out of the annotators' view, and release it only when it behaves as intended. Once a pilot has settled the interface, guidelines, review rules, overlap and sampling, write them down as a versioned setup for the next language or phase. When you copy a setup into a new project, check that the data, team members, storage access and links to project-specific resources are in place too, because these often do not carry over. Keep finished phases archived rather than deleted.

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

**Pay annotators fairly and on time.** Annotators are skilled contributors. Set a transparent rate based on local professional rates rather than the lowest global crowdsourcing rates, and agree on it before work starts. Mobile money (M-Pesa, MTN MoMo, Airtel Money) is often the most practical way to pay: it reaches people without bank accounts and arrives quickly, and Sub-Saharan Africa has the highest use of mobile money accounts in the world ([World Bank, 2025](../references.md#findex-2025)). Late or unclear payment is the fastest way to lose a good team and to damage trust for the next project.

**Plan for how money actually moves:**

- Grant money often passes through a university or organisation, and payments can take weeks or months to reach annotators. Agree on a payment process with your finance office before work starts.
- Exchange rates change. If the grant is in dollars or euros but you pay in local currency, check the budget against the current rate before each payment round.
- Keep a record of every payment. Funders will ask for it, and it protects you and the annotators.
- Check the tax rules that apply to payments in each country.

**Pay contributors in other countries step by step.** When contributors live in more than one country, settle the route before work starts and follow the same steps in every payment round:

1. **Choose the route.** Decide whether a partner institution in each country pays its own contributors locally, or the lead institution pays across borders. Paying locally avoids international transfer rules but needs a written agreement with the partner and time in its finance process. Paying across borders keeps control in one place but adds fees and checks, and it is not always possible: in a 2024 survey of mobile money providers, just over half reported regulation that allows outbound international transfers, and about two-thirds regulation that allows inbound ones ([Raithatha and Storchi, 2025](../references.md#gsma-sotir-2025)). Some countries also require extra identity checks for international transactions ([Kipkemboi et al., 2019](../references.md#kipkemboi-2019)).
2. **Collect and check payout details.** Ask each contributor for the account or mobile money number, the country, and the name the account is registered under. Check that this name matches the name on their agreement. Mobile money accounts are registered to the holder's identity under know-your-customer (KYC) rules ([Kipkemboi et al., 2019](../references.md#kipkemboi-2019)), so a payment to someone else's account breaks the link between the contributor and your payment record. Store payout details as personal data.
3. **Send a small test transfer** to each new payout account, and ask the contributor to confirm that it arrived before you send the first full payment.
4. **Pay for accepted work on a published schedule.** Tie each payment round to work that has passed review, use the same cut-off date for everyone, and publish the dates in advance. Write the schedule into the [annotator contract](../templates/annotator-contract.md).
5. **Keep proof of every payment.** Record the date, amount, currency, exchange rate, fees and the provider's transaction reference, and link each payment to the work it pays for. Funders will ask for this.
6. **Budget for fees, limits and taxes.** The cost of an international transfer has two parts, the transfer fee and the exchange-rate margin, and it varies by corridor and by type of provider. In the second quarter of 2024, sending the equivalent of \$200 to Sub-Saharan Africa cost 8.37% of the amount on average, and banks were the most expensive type of provider ([World Bank, 2024](../references.md#rpw-2024)). Mobile money accounts often have per-transaction, daily and monthly limits, and lower-tier accounts may be limited to domestic transfers ([Kipkemboi et al., 2019](../references.md#kipkemboi-2019)). Central banks change these limits, and some governments tax mobile money transactions ([Raithatha and Storchi, 2025](../references.md#gsma-sotir-2025)). Check the current fees, limits and taxes for each country before each round, and agree in advance what to do when a payment exceeds a limit.

**If rates must change mid-project**, usually because the local currency has moved, treat it as a change to each contributor's agreement:

- By default, apply the new rate only to work done after the change. Amounts already approved for payment never change.
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

**Test sign-up before the onboarding day.** Try creating an account with the email providers your annotators actually use. University and workplace mail filters often delay or block verification emails, so have a way to verify accounts by hand and a second channel, such as a WhatsApp group, for people whose email does not arrive. Before each annotation round, ask everyone to update to the current version of the tool, and check that they have.

**If anyone can join, open the project in stages.** Start with a closed group and open joining only when the setup is stable.

- Review requests to join before giving access to sensitive tasks.
- Take consent when people join, and confirm it again when they submit work.
- Accept only as many active contributors as your reviewers can support, and say whether the task works on a phone.
- In public, describe only the purpose, languages, contribution terms and consent conditions; never publish task data or the member list.
- Treat leaving the project and withdrawing consent as different things; withdrawal follows the [withdrawal process](../legal-consent/index.md#withdrawal).

See [Inclusive and Bias-Aware Annotation](../3_annotation-design/inclusive-bias-aware.md) and [Community Ecosystems](../10_community-collaboration/community-ecosystem.md).

**Recruit through field facilitators when you collect in communities.** Community collection, especially of speech, can recruit people in groups rather than one by one: a teacher brings a class, a community organiser brings neighbours, a cooperative officer brings members. NaijaVoices recruited its more than 5,000 voice donors through trained community facilitators ([Emezue et al., 2025](../references.md#emezue-2025)). Whatever else facilitators do in your project, define the role and keep its powers narrow:

- **Appoint facilitators; nobody becomes one by declaring it.** A facilitator is neither the language lead, who decides what is correct, nor the project lead.
- **Give them only what they need.** A facilitator follows their own group's progress, and nothing else: no control over the project, no access to other groups, and no power over the guidelines or the data.
- **Record who recruited whom.** Note which facilitator brought each contributor, for example with a sign-up code per facilitator, so that support and any facilitator payments follow the right people. If a facilitator leaves the role, stop crediting new sign-ups to them.
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

**Across several languages or projects**, keep one table with a row per language or project, and look at the weakest rows first.

- Report agreement only where at least two independent labels overlap, and say how many items it is based on. Where it cannot be calculated yet, write "not yet scored", not zero.
- Next to it, show progress against the planned total (items times planned annotators per item), the review backlog and how long the oldest item has waited, the recent completion rate, and the expected finish date against the plan.
- Watch open flags and rejection rates, and add reviewers where the backlog is growing.
- Keep these measures separate rather than combining them into one readiness score; [Report readiness as separate measures](../4_data-quality/index.md#report-readiness-as-separate-measures) lists what to report.

**Per annotator**, watch skip rate, time per item and label distribution. A sudden shift is a prompt to investigate, not proof of drift or misconduct. Count days in one fixed time zone, such as UTC, so daily figures do not shift between reports.

The [agri-advisory Monday report](../agri-advisory/quality-consent-release.md#the-monday-report) is a worked monitoring example. Keep recognition and personal goals separate from this monitoring; see [Motivate without surveillance](../10_community-collaboration/community-ecosystem.md#motivate-without-surveillance).

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
| **Connectivity and power fail** | Annotators miss deadlines in the same region | Choose tools that work offline or on a weak connection, and cover mobile data costs. Governments shut down the internet 30 times in 15 African countries in 2025, with protests the leading trigger ([Access Now, 2026](../references.md#accessnow-2026)), so plan for gaps. See [Offline Field Operations](../2_data-collection/10_offline-field-operations.md) for sync and late-work rules. |
| **Funding or a tool disappears** | Grant end date approaches; tool changes its pricing | Keep your own copies of all raw data and exports, test a complete exit export periodically, and avoid depending on a single service. |
| **Data loss** | A backup has never been restored; storage syncs or exports fail unnoticed | Schedule database and media backups with a retention period, test restores regularly, and check service health, failed syncs and failed exports weekly. |
| **Harm to annotators** | Annotators skip items or leave after sensitive batches | Warn annotators about sensitive content, let them opt out, limit exposure, and review data before release. See [Protect annotators from harmful content](../3_annotation-design/annotation-task-design.md#protect-annotators-from-harmful-content). |
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
