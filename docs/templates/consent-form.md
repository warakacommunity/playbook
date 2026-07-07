---
sidebar_position: 4
title: Consent form template
last_update:
  date: 2026-07-07
---

# Consent form template

*Last reviewed: 2026-07-07.*

:::warning Disclaimer
This is a **starting point** for building a project-specific consent architecture, not a lawyer-vetted form ready to use as-is. Data protection and consent requirements are jurisdiction-specific. Every project must adapt this template to the country whose data protection law applies, to the specific data type being collected, and to the community whose consent is being sought — with legal advice qualified in the relevant jurisdiction. See the [legal, consent, and community IP](../legal-consent/index.md) chapter for the framework this template implements.
:::

*The written form + oral protocol + community-consent addendum the playbook considers the workable minimum for African-language NLP data collection with non-literate contributors, voice-recording projects, and community-derived corpora. Fork it, translate it, adapt it, and use it as one input into an ethics-reviewed consent architecture.*

## How to use this template

Consent is a **workflow**, not a form. The workflow has three parts, all of which have to be designed together:

1. **The written form** — for literate contributors, for record-keeping, and for the project's own audit trail. Section A below.
2. **The oral protocol** — for non-literate contributors, for community members who prefer oral consent regardless of literacy, and for situations where the written form is inappropriate. Section B below.
3. **The community consent addendum** — for the collective agreement of the community whose language, voices, or knowledge is the subject of the collection. Section C below.

Every project needs all three parts. Skipping any of them is the failure mode this template exists to prevent.

### Before you fork this template

- **Have a lawyer qualified in the applicable jurisdiction review the adapted version.** African data protection laws vary substantially in what a valid consent looks like (see the [country reference](../legal-consent/index.md#data-protection-laws-in-africa-quick-country-reference)); a form that passes review in Nigeria may not in South Africa.
- **Translate every part into the contributor's own language.** English or French versions are for the project's records, not for the contributor's understanding. Oral consent in a lingua franca while the contributor is more comfortable in a local language is not informed consent.
- **Include a community-nominated reviewer** in the design step, not just the audit step. What is understood as "consent" varies across communities; what constitutes a meaningful IP framework varies across communities; both need community input at design time.
- **Store the completed consent artefacts alongside the data.** The audio consent recording, the signed form, the community-consent minutes — all travel with the corpus so future reviewers can verify.

---

## Section A — Written consent form

*Fork the block below into a new document, translate it into the contributor's own language, replace every `[BRACKETED FIELD]` with a real answer, and use it for literate contributors and for the project's record.*

### [PROJECT NAME] — Informed consent form

**Version:** [X.Y] · **Date:** [YYYY-MM-DD] · **Language(s) of this form:** [LANGUAGES]

#### About this project

[PROJECT NAME] is a project run by [PROJECT ORGANISATION] to [ONE-SENTENCE PLAIN-LANGUAGE PURPOSE — NOT "TO ADVANCE NLP" — SOMETHING LIKE "TO BUILD A TEXT SYSTEM THAT CAN READ [LANGUAGE] SO PEOPLE CAN USE PHONES IN [LANGUAGE]"].

The person leading this work is [PROJECT LEAD NAME], who you can contact at [EMAIL / PHONE / WHATSAPP]. If you have concerns about this project that you do not want to raise with [LEAD NAME], you can contact the project's independent ombudsperson [OMBUDSPERSON NAME] at [CONTACT] — see [Section D](#section-d-—-ombudsperson-role).

#### What we are asking of you

We are asking you to contribute [DESCRIBE THE CONTRIBUTION — e.g., "one hour of recorded speech in [LANGUAGE]", "one hundred short written sentences in [LANGUAGE]", "consent for images of your handwritten notes to be photographed"].

Your contribution will:
- Be [PAID / UNPAID / VOLUNTEER WITH SMALL COMPENSATION]. If paid: [AMOUNT + CURRENCY + PAYMENT SCHEDULE].
- Take approximately [TIME ESTIMATE].
- Be recorded [WHERE, IN WHAT FORMAT — audio / text / image].
- Be [ANONYMISED / NAME-ATTRIBUTED / NAME-OPTIONAL — pick one].

#### What we will do with your contribution

Your contribution will be used to:
1. [SPECIFIC USE ONE — e.g., "train a text-classifier model for Hausa"]
2. [SPECIFIC USE TWO — e.g., "release publicly as an open dataset so other researchers can also work on Hausa"]
3. [SPECIFIC USE THREE — e.g., "be included in academic publications with your contribution credited"]

We will **not**:
- [SPECIFIC AVOID ONE — e.g., "sell your voice recording to companies without asking you first"]
- [SPECIFIC AVOID TWO — e.g., "share your name with anyone outside the project without asking you first"]
- [SPECIFIC AVOID THREE — for voice or biometric data: "use your voice to make it say things you did not actually say"]

If we decide to use your contribution for something not on this list, we will contact you to ask permission first.

#### How your data will be stored

- Stored at: [STORAGE LOCATION — country + institution + system]
- Retained for: [PERIOD — e.g., "5 years, then reviewed for further extension"]
- Access is limited to: [PROJECT TEAM ROLES + external reviewers if any]
- If we release the data publicly: [LICENCE — e.g., CC BY-NC 4.0] — see below.

#### Public release

We plan to release [THE DATA / THE MODEL BUILT FROM IT / BOTH] publicly, under a licence that requires anyone using it to:
- [ATTRIBUTE THE COMMUNITY IN A SPECIFIED WAY]
- [NOT USE IT COMMERCIALLY — IF CC BY-NC — OR ANY OTHER RESTRICTIONS]
- [OTHER TERMS FROM YOUR LICENCE CHOICE]

The full licence terms will be documented at [URL] on the release date.

If the community's decision changes about how the data should be released, [NAMED DECISION BODY / STEWARD] has the authority to update this decision until [DATE OF FIRST PUBLIC RELEASE].

#### Your rights

You have the right to:
- **Withdraw your contribution at any time before the public release**, by contacting [NAMED CONTACT + CHANNEL] and mentioning your contributor code (see below).
- **Ask for a copy of what we have collected from you** at any time.
- **Refuse to contribute any specific piece** even after signing this form. You do not need to give a reason.
- **Ask questions** about the project, your contribution, or your data at any time. The team commits to answering within [TIME — e.g., "seven days"].

After public release, your contribution cannot be withdrawn from copies already in circulation. We will not include your contribution in any future releases.

#### Your contributor code

Your contributor code is: **[GENERATED CODE — e.g., HAU-A0037]**

Keep this code. You will need it to identify yourself if you contact us about your contribution.

#### Consent

By signing below, you confirm that:

- You have read (or had read to you) this form in a language you understand.
- Your questions have been answered.
- You are agreeing voluntarily, without pressure.
- You understand you can withdraw before the public release.
- You are [AGE OF LEGAL CONSENT IN THIS JURISDICTION] or older.

**Contributor name (printed):** __________________________________________

**Signature or thumbprint:** ______________________________________________

**Date:** __________________________________________________________________

**Witness name (project team member):** ___________________________________

**Witness signature:** _____________________________________________________

**Independent witness** (see [Section B](#section-b-—-oral-consent-protocol) — required for oral consent, recommended for written): ___________________

---

## Section B — Oral consent protocol

*The workable pattern for consent from non-literate contributors, contributors who prefer oral consent regardless of literacy, and situations where the written form is inappropriate.*

### Before the recording

- The interviewer must be a native speaker of the contributor's language, or interpretation must be provided by a trusted third party (not the project's own staff).
- The independent witness must be present. The witness is a community member the contributor trusts, not a member of the project's own staff. If the contributor cannot identify a witness, the interview is rescheduled — do not proceed without one.
- The visual consent aid (below) is placed in front of the contributor. It is a one-page pictorial summary of what the data is, how it will be used, who holds it, and how consent can be withdrawn. Prepare this ahead of time; it is not a substitute for the oral conversation but a companion to it.

### The recording

The audio-recorded consent conversation covers the same ground as the written form, in the contributor's own language, structured as a conversation not a monologue. Cover:

1. **Who we are and what we are doing.** Introduce yourself, the project, and the ombudsperson.
2. **What we are asking of you.** In the terms of the contributor's understanding, not the project's terminology.
3. **What we will do with your contribution.** Include the specific will-do list and the specific will-not-do list. Ask the contributor to describe back what they understand — this is where misunderstandings surface.
4. **How long, where, who has access.** Concrete storage location and retention period.
5. **Public release plans.** Explicit about the licence and its practical implications ("this means someone in another country could use it to build a phone system, but they cannot sell it").
6. **Rights.** Withdrawal, copy, refusal, questions.
7. **Contributor code.** Speak the code aloud so it appears in the recording; ask the contributor to repeat it back.
8. **Explicit agreement.** "Do you agree to contribute?" — recorded verbally.

The full audio recording is stored alongside the data. It is the consent artefact; treat it with the same care as the corpus.

### The visual consent aid

A one-page A4 or letter-size sheet, printed, showing:

- A picture of the data being collected (a microphone with sound waves for voice; pages of text for writing; a camera for image data).
- A picture of where it goes (a computer, a data centre — recognisable to your community's visual literacy).
- A picture of who uses it (people using the system built from the data).
- A picture representing the "we will not" list — a hand pushing away commercial money for a non-commercial licence; a locked box for private storage; whatever conveys the constraint.
- A picture and short prompt for withdrawal (a contact card with a phone number).

Design this with the community. Stock icons designed for European or American contexts often do not translate. Test the visual aid with a small number of community members before it goes into production.

---

## Section C — Community consent addendum

*Individual consent does not authorise you to use the community's language for a project the community has not agreed to. This is separate from every individual consent obtained.*

### Who is the "community" here?

For a language spoken across countries and diasporas, "community" is not one body. Identify who:

- **Recognised authorities** — traditional leaders, elders, community councils, religious authorities, elected representatives, depending on the local structure.
- **Speaker organisations** — language preservation groups, cultural organisations, academic institutions specialising in the language.
- **Diaspora representatives** — for languages with substantial diaspora communities whose data will be included or excluded.
- **Vulnerable sub-populations** — if the collection touches specific groups (women in a specific region, refugees, minority-within-the-community populations), their representatives specifically.

Not every project needs consent from every one of these. The project's obligation is to identify which are load-bearing for the collection and to obtain their explicit agreement.

### The community consent conversation

Structured as a formal consultation, minuted, with the minutes agreed and shared with the community for verification.

Cover:

1. **The project scope, purpose, and beneficiary community** — clearly and honestly stated.
2. **What data will be collected and from whom** — types, quantities, sourcing.
3. **The IP framework** — who owns what, what licence the release will be under, what the community's role is in decisions after release. See [licence selection](../legal-consent/index.md#licence-selection).
4. **The commitments the project makes** — what it will deliver, on what timeline, and what happens if commitments are missed.
5. **The named community stewards** — who has the standing to speak for the community on this project after the consultation.
6. **The community's specific concerns** — allowed to be listed, with the project's response to each documented in the minutes.
7. **Explicit agreement** — a written community-consent statement signed by the named representatives.

The minutes and the signed statement are stored alongside the data as the community-consent artefacts.

### Community disagreement

If the community declines to consent, the project does not proceed on that language, in that scope. This is a valid outcome. Do not use "the community was consulted" as cover for a project the community declined.

If the community is genuinely split, work with the community's own conflict-resolution mechanisms before proceeding. Do not use one faction's consent as authorisation.

---

## Section D — Ombudsperson role

The ombudsperson is a person independent of the project team whom contributors can raise concerns to. This role exists to prevent the failure mode where a contributor feels unable to raise a concern with the project's own staff — usually because of a power differential between the researcher and the contributor.

The ombudsperson:

- Is nominated by the community, not by the project team.
- Has direct access to the project's decision-making body, not through the project lead.
- Is compensated for their role at a fair community rate.
- Has clear authority to pause the project if a concern warrants investigation.
- Is named in the consent form and in the visual aid, with a contact channel that does not go through the project team.

The ombudsperson's role is documented in a separate written agreement between them and the project's institutional sponsor, so their tenure is not at the project team's discretion.

---

## Anti-patterns to avoid

1. **Adapting only the written form** and skipping the oral protocol. For most African-language projects, most contributors are more comfortable with oral consent.
2. **Translating the form into the contributor's language with a machine translator** and skipping human review. A poorly translated consent form is not informed consent; it is a formality that will not survive review.
3. **Using the project team as the "witness"** for oral consent. The witness must be independent; the project's own staff are not independent.
4. **Skipping the visual aid** because "the contributor speaks English/French anyway". The visual aid is not for language competence; it is for concept accessibility — some concepts (open licence, data centre, model release) do not have a natural translation in every language.
5. **Storing the consent artefact separately from the data.** They must travel together. Otherwise the corpus becomes usable without the consent record, and the consent record becomes an audit-only artefact rather than an operational one.
6. **Community consent from a single "elder" or "leader" figure** as substitute for a formal consultation. Individual authority is not the same as community consent even in strongly hierarchical contexts.
7. **Using the community-consultation minutes as a marketing document.** The minutes are a record; keep them factual, and address disagreements in the record, not through selective quotation later.

## Further reading

- The [legal, consent, and community IP](../legal-consent/index.md) chapter — the framework this template implements.
- [Nekoto et al., 2020 — participatory approach](https://aclanthology.org/2020.findings-emnlp.195/) — the reference Masakhane consent + community-consultation workflow.
- [CARE Principles for Indigenous Data Governance](https://www.gida-global.org/care) — the community-authority framing that shapes the community-consent addendum.
- [WHO Ethical considerations in health research](https://www.who.int/publications/i/item/9789240085879) — general reference on informed-consent workflows in low-resource contexts; useful for the health-adjacent consent question.
- [The Belmont Report (US)](https://www.hhs.gov/ohrp/regulations-and-policy/belmont-report/read-the-belmont-report/index.html) — historical background on the informed-consent framework much of the field builds on; useful for its explicit discussion of what makes consent voluntary.

---

**Contributor's note.** If you have run a real African-language NLP project with a working consent architecture — or if you have inherited a consent problem from a previous project and had to redesign it — the highest-value contribution is a redlined version of this template annotated with what you actually used, what worked, and what did not. Real consent artefacts from real projects are the ground truth this template is trying to approach.
