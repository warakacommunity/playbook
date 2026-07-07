---
sidebar_position: 6
title: Project charter template
ready: true
last_update:
  date: 2026-07-07
  author: Idris Abdulmumin
---

# Project charter template

*Last reviewed: 2026-07-07.*

*The Step-0 community agreement covering orthography, use case, IP framework, and team structure that the [long-tail language onboarding](../long-tail-language/index.md) chapter argues must be settled in writing before data collection begins. Fork it, negotiate it with the community, sign it, and store it alongside the corpus release.*

## How to use this template

1. Copy everything below the divider into a new file (`docs/project-charter.md` in your project repo or the community-owned repository).
2. Fill in every `[BRACKETED FIELD]` with a real answer negotiated with the community, not decided by the project team alone.
3. Convene the community consultation described in [Section C of the consent template](./consent-form.md#section-c--community-consent-addendum). The charter is the artefact that comes out of that consultation.
4. Sign it. All named parties — project lead, community stewards, institutional sponsor, ombudsperson — sign a physical or digitally-witnessed copy. Store one copy in each party's possession.
5. Version it. The charter can be amended; amendments require the same signature process.

Motivated by [long-tail language onboarding Step 0](../long-tail-language/index.md#step-0--before-any-data-collection), the [legal, consent, and community IP](../legal-consent/index.md) chapter, and every Case Study in the playbook where a missing charter shows up as the root cause of a downstream dispute.

---

## Project charter — [PROJECT NAME]

**Version:** [X.Y] · **Effective date:** [YYYY-MM-DD] · **Language(s):** [LANGUAGE(S)] · **Community(ies):** [NAMED COMMUNITIES]

## 1. Purpose

- **What this project sets out to build:** [One sentence in plain language, not the funder-facing version.]
- **The problem this is trying to solve for the community:** [The community's articulation of the problem, not the project team's. If these are different, both are named here.]
- **What success looks like at the end:** [Specific enough that a reader can tell if it happened.]
- **What is explicitly out of scope:** [Preventive; naming what will NOT be built stops scope creep later.]

## 2. The parties

- **Project lead:** [NAME + affiliation + contact + role.]
- **Institutional sponsor:** [ORGANISATION legally responsible for the project + point-of-contact.]
- **Community stewards:** [NAMED community representatives with the standing to speak for the community on this project.]
- **Ombudsperson:** [NAME + contact — see the [ombudsperson role](./consent-form.md#section-d--ombudsperson-role) in the consent template.]
- **Technical lead:** [NAME + role.]
- **Community liaison:** [NAME + role, distinct from the annotator role.]
- **Linguistic consultant, if any:** [NAME + role.]
- **Funders:** [Grantors and their conditions; if a funder requires acknowledgement or specific outputs, name them here.]

## 3. Language and orthography

- **The language(s) the corpus covers:** [Specific varieties, dialects, registers included.]
- **Varieties, dialects, registers explicitly excluded:** [What is not in scope.]
- **Script(s) used:** [Which script(s), with the community-negotiated reasoning.]
- **Orthographic convention:** [Which standard is followed; if the community is genuinely split, whether the project ships dual conventions or picks one, and how the choice was made.]
- **Diacritic and tone convention:** [The specific rules that apply. Reference for annotators.]
- **How orthographic decisions can be revisited:** [Which body has standing to revise, and by what process. Orthographic conventions drift; the charter names how the corpus will handle drift.]

## 4. Data — what is collected, from whom, how

- **Types of data collected:** [Speech, text, image, video, annotations, translations. Be specific.]
- **Sources of data:** [Community-produced original content, existing texts, elicited translations. Ranked and justified. See the [long-tail chapter's source-selection ranking](../long-tail-language/index.md#source-selection).]
- **Contributors:** [Who contributes — recording speakers, translators, annotators. Anonymised or named-with-consent.]
- **Consent framework:** [Reference to the [consent form template](./consent-form.md) or the project's specific consent artefact.]
- **Storage:** [Location (country + institution + system), access controls, retention period.]

## 5. Community IP and licence

The centre of the charter. Every question below is answered explicitly.

- **Who owns the raw data?** [Contributor, community, project — with the reasoning.]
- **Who owns the annotated corpus?** [Named party or shared-ownership arrangement.]
- **Who owns the models built from the corpus?** [Same.]
- **Under what licence is the corpus released?** [SPDX identifier + reasoning. See the [licence selection section](../legal-consent/index.md#licence-selection) — CC BY-NC 4.0 is the playbook's honest default; document why if choosing something different.]
- **Under what licence are models released?** [Model release is a separate decision from data release; document it.]
- **What re-use requires community approval?** [E.g., "commercial use", "inclusion in a downstream release under a different licence", "use in a foreign-owned model's training data".]
- **Who has the standing to approve re-use requests?** [Named body or steward.]
- **How is benefit-sharing structured?** [If the corpus generates downstream revenue, how does that flow back to the community? If it doesn't, be honest that it doesn't.]

## 6. Team, timeline, and budget

- **Timeline:** [Milestone dates. See the [long-tail chapter's milestone-0-to-4 arc](../long-tail-language/index.md#step-2--realistic-milestones) for reference; use a version realistic to this project.]
- **Effort estimate:** [Person-months per role.]
- **Budget summary:** [Total budget + high-level breakdown. Detailed cost accounting can live in a separate financial document.]
- **Compensation policy:** [Rate for annotators, translators, community liaison, ombudsperson. Rates are named to prevent the failure mode of paying different contributors differently for the same work.]
- **What happens if the timeline slips:** [Renegotiation process; scope decisions.]
- **What happens if the budget is exhausted:** [Priority order for what gets finished vs. cut.]

## 7. Governance and decision-making

- **Who makes technical decisions:** [Named person or role.]
- **Who makes community-facing decisions:** [Named person or role — usually a community steward, not the project lead.]
- **How disputes are resolved:** [Escalation path; ombudsperson role; final arbiter.]
- **How the charter is amended:** [Amendment process; who has to agree; documentation requirements.]
- **How the project can be paused or halted:** [The ombudsperson's authority; the community's authority; the sponsor's authority. State them.]

## 8. Deliverables and commitments

- **What the project will deliver:** [Corpus, models, documentation, publications, deployment. Be specific.]
- **What the project will NOT deliver:** [Managed expectations. Any deliverable not on the will-list is out of scope; adding one requires a charter amendment.]
- **Publication policy:** [Who is credited; where results are published; what the community's role in publication approval is.]
- **Post-project maintenance:** [Who owns the corpus after the project ends; who fields re-use requests; what the community's ongoing rights are.]

## 9. Ethics and safeguards

- **Ethics review:** [IRB or ethics-review-board name + date + outcome. If no formal ethics review is possible, describe the substitute community-review process.]
- **Data protection compliance:** [Which country's law applies; how compliance is documented. See the [country reference](../legal-consent/index.md#data-protection-laws-in-africa--quick-country-reference).]
- **Vulnerable-population protections:** [If the project touches specific vulnerable populations (children, refugees, minority-within-the-community groups), the additional protections in place.]
- **Cultural-heritage protections:** [If the corpus includes traditional knowledge or culturally-sensitive material, the protections around it. See [WIPO's traditional knowledge framework](https://www.wipo.int/tk/en/).]

## 10. Signature block

By signing below, each named party confirms they have read this charter, agreed to it, and understand their responsibilities under it.

**Project lead:** ______________________________ Date: _____________

**Institutional sponsor:** ______________________________ Date: _____________

**Community steward(s):** ______________________________ Date: _____________

______________________________ Date: _____________

**Ombudsperson:** ______________________________ Date: _____________

**Independent witness:** ______________________________ Date: _____________

## 11. Amendments

| Amendment | Date | Change | Approved by |
| --- | --- | --- | --- |
| 1 | [DATE] | [SHORT DESCRIPTION] | [SIGNATORIES] |

---

**Contributor's note.** If you have negotiated a working charter for an African-language NLP project, the highest-value contribution is a redlined comparison against this template with the terms you actually agreed to. Real charters from real projects reveal what fields the template got wrong and where community-specific additions belong.
