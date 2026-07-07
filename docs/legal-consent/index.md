---
sidebar_position: 1
last_update:
  date: 2026-07-07
---

# Legal, consent, and community IP

*Last reviewed: 2026-07-07.*

:::warning Disclaimer
This chapter is practical guidance for scoping the legal and consent architecture of an African-language NLP project. It is **not legal advice**. Data protection law is jurisdiction-specific, changes often, and carries real consequences when mishandled. For jurisdiction-specific advice, consult a lawyer qualified in the country whose data protection law applies to your project. Where this chapter names a specific law, it does so to point you at the primary source; the primary source is authoritative, this chapter is not.
:::

Every question in this chapter should be answered *before* data collection begins, not after. Trying to retrofit consent, community IP, or a defensible licence onto a corpus that already exists is expensive, sometimes impossible, and always damaging to community trust. This is the operational reason [Step 0 of long-tail language onboarding](../long-tail-language/index.md#step-0-—-before-any-data-collection) is where it is.

## The three questions every project must answer

Before scoping data collection, agree — in writing, with the community whose language and voices are being recorded — on the answers to three questions. Do not assume answers. Do not defer them.

### 1. Who owns what the project produces?

Ownership sits at three layers: the individual contributor (a person whose voice or handwriting is recorded), the community (the collective whose language is the subject), and the project entity (the organisation or research group running the collection). Every project decides, explicitly, which rights sit with which layer, and documents the decision. Vague ownership is not neutral — in the absence of a written agreement, whichever legal system applies fills the gap, and it usually does not fill it in the community's favour.

### 2. Under what licence is the corpus released?

The licence choice is not primarily a technical decision; it is a policy choice about who is permitted to do what with the community's data. See the [licence selection section](#licence-selection) below. Do not adopt a licence out of habit or because it is the default on the platform you use.

### 3. Who decides if a re-use request comes in later?

A commercial actor asks to train a model on the corpus. A foreign university asks to remix it into a larger multilingual release. A government asks for a filtered version. Who has the standing to say yes or no? The answer should be knowable before the request arrives. In practice this means naming the decision-making body (community council, project steering group, named stewards) and its process (majority vote, unanimous consent, consultation timelines) in the release documentation.

## Consent

Consent for NLP data collection is not a checkbox. It is a workflow, and its quality is what makes the project ethically defensible or not.

### Individual vs community consent

Both are needed for most projects. **Individual consent** is the informed agreement of each specific person contributing a recording, a transcription, an annotation, or an image of their handwriting. **Community consent** is the agreement of the collective whose language is the subject of the collection. Neither substitutes for the other. A community that agrees to a project does not authorise you to record any specific individual without their consent; a specific individual who agrees cannot authorise the project on behalf of the community.

Community consent is often the harder of the two to get right, because it requires identifying whose consent matters, in what capacity. Elders? Language custodians? Elected representatives? Diaspora communities? The [Nekoto et al. (2020) participatory approach](https://aclanthology.org/2020.findings-emnlp.195/) provides the standing template Masakhane uses.

### Consent from non-literate speakers

A signature on a form assumes the signer read and understood the form. For consent from non-literate contributors — a substantial share of speakers of many African languages — that assumption fails. The workable pattern:

- **Oral consent, recorded**, in the contributor's own language, with a native speaker asking the questions and confirming understanding.
- **A simplified visual summary** — a one-page pictorial explanation of what the data is, how it will be used, who will hold it, and how consent can be withdrawn.
- **A witness who is not the project team** — a community member, ideally the person who introduced the contributor to the project, present during the consent conversation.
- **Storage of the audio consent recording** alongside the data itself, so the consent record travels with the data and can be verified later.

This is more expensive than a paper form. It is also the pattern that survives scrutiny.

### Purpose limitation and downstream use

Consent to record a person's voice for building an ASR corpus is not consent to include that voice in a voice-cloning dataset. Consent to translate a sentence into English for a translation benchmark is not consent to have that translation used in a commercial LLM's training data. Be specific in the consent conversation about what the data will and will not be used for, and treat downstream re-use as requiring fresh consent whenever it exceeds the original scope.

### Withdrawal

Contributors must be able to withdraw. This is a legal requirement under most African data protection laws (see the [country reference](#data-protection-laws-in-africa-quick-country-reference) below) and an ethical one everywhere else. Design withdrawal in from the start:

- The contributor is given a stable, memorable ID (not their name) that allows them to reach the project later and identify their contribution.
- Withdrawal removes the data from the active corpus and from all future releases. Data that has been publicly released cannot be un-released; the withdrawal record acknowledges this and the project commits to not re-publishing.
- Withdrawal does not require the contributor to justify the request or to speak in the project's working language. A native-speaker channel for withdrawal requests is part of the design, not an afterthought.

## Data protection laws in Africa — quick country reference

African data protection legislation has expanded rapidly. The list below is a starting reference — laws change, enforcement varies, and this is not a substitute for jurisdiction-specific legal advice. For most projects, three questions matter for each country: **does a general data protection law exist**, **does it require a data protection officer or notification**, **and does it restrict cross-border data transfer**.

- **[Nigeria — Nigeria Data Protection Act 2023 (NDPA)](https://ndpc.gov.ng/)** — general data protection framework administered by the Nigeria Data Protection Commission. Requires data protection officer registration for controllers processing above defined thresholds; cross-border transfer requires adequacy or contractual safeguards. Superseded the NDPR 2019 regulation.
- **[Kenya — Data Protection Act 2019](https://www.odpc.go.ke/)** — administered by the Office of the Data Protection Commissioner. Registration of data controllers and processors is required. Cross-border transfer requires appropriate safeguards or adequacy.
- **[South Africa — Protection of Personal Information Act (PoPIA), 2013 (in force 2020)](https://popia.co.za/)** — administered by the Information Regulator. Broad application; strict rules on processing "special personal information" (which includes many kinds of research data). Cross-border transfer restricted to jurisdictions with comparable protection.
- **[Ghana — Data Protection Act 2012](https://dataprotection.org.gh/)** — one of the older African data protection laws. Administered by the Data Protection Commission. Registration of data controllers required.
- **[Rwanda — Law 058/2021 on the Protection of Personal Data and Privacy](https://www.rura.rw/index.php?id=139)** — recent and comparatively strict. Localisation and cross-border transfer requirements are notable.
- **[Uganda — Data Protection and Privacy Act 2019](https://www.pdpo.go.ug/)** — administered by the Personal Data Protection Office.
- **[Egypt — Personal Data Protection Law 2020 (Law No. 151 of 2020)](https://www.pdpc.gov.eg/)** — general framework; enforcement developing.
- **[Morocco — Law 09-08](https://www.cndp.ma/)** — administered by the CNDP; older framework, still in force.
- **[Tunisia — Organic Act No. 63 of 2004](https://www.inpdp.tn/)** — one of the earliest African data protection laws.

At the continental level, the **[African Union Convention on Cyber Security and Personal Data Protection (Malabo Convention, 2014)](https://au.int/en/treaties/african-union-convention-cyber-security-and-personal-data-protection)** entered into force in 2023 and provides a framework member states are progressively aligning with. It does not replace national law; it complements it.

Countries with no comprehensive data protection statute at the time of writing include several in Central Africa and the Sahel; the safe default in those jurisdictions is to follow the strictest applicable framework of any of the countries whose residents are in the corpus, plus the framework of the country where the data is stored.

For voice recordings, transcriptions of private conversations, or any content identifying an individual, treat the material as personal data by default. "The data is anonymised" is not a licence to skip the analysis — anonymisation of voice is difficult and rarely complete.

## Community IP frameworks

### CARE and FAIR

The **[FAIR principles](https://www.go-fair.org/fair-principles/)** — Findable, Accessible, Interoperable, Reusable — have been the operational default for open research data. They are the values built into the Hugging Face Hub, Zenodo, and most academic repositories.

The **[CARE Principles for Indigenous Data Governance](https://www.gida-global.org/care)** — Collective benefit, Authority to control, Responsibility, Ethics — were developed by and for indigenous communities to address the fact that FAIR alone does not protect community interests in data derived from indigenous knowledge, language, or cultural practice. CARE does not replace FAIR; the two are meant to operate in tension, and every project involving community-owned language data has to decide how the tension is resolved.

For African-language corpora, the practical implication is that the community whose language is the subject of the corpus should have authority to control how the corpus is used, benefit collectively from downstream uses, and be treated as a rights-holder rather than a data source. **FAIR + CARE**, rather than FAIR alone, is the workable model.

### Traditional knowledge and cultural expression

Language recordings often include content that is not neutral text — traditional stories, songs, proverbs, ceremonial speech. Some categories may be protected under [WIPO's traditional knowledge framework](https://www.wipo.int/tk/en/) or under national heritage law. Others may be culturally sensitive without being legally restricted — songs performed only in ceremony, stories told only to certain audiences. The consent conversation must include the question: *what content, if any, is not appropriate for open release regardless of individual consent?* This is decided with the community, not by the project team.

## Licence selection

Common choices, and when each is defensible:

- **[CC0 (Public Domain Dedication)](https://creativecommons.org/publicdomain/zero/1.0/)** — no rights reserved. Maximal openness; no protection against commercial re-use, no attribution requirement, no community control. Rarely appropriate for community-derived language data. Use with caution and only after explicit community agreement to maximum openness.
- **[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)** — attribution required, everything else permitted including commercial use. The de-facto open-research default. Defensible when the community has explicitly agreed to unrestricted commercial re-use with attribution.
- **[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)** — attribution required, derivatives must carry the same licence. Protects against enclosure — a downstream model or corpus that includes this data must itself be openly re-shared. Useful when the community wants the corpus to remain in the open commons.
- **[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)** — attribution required, non-commercial use only. This is the licence MasakhaNER 2 and many Masakhane-lineage corpora ship under, and it is the honest default for community-derived African-language data unless the community has explicitly consented to commercial use. The tradeoff is that some downstream research is inhibited by the "non-commercial" clause; the tradeoff is deliberate.
- **[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)** — non-commercial and share-alike combined. The strictest of the standard CC options; use when protection against both commercial enclosure and downstream re-licensing matters.
- **Custom community licences** — some projects draft bespoke terms (e.g., requiring a community-approval workflow for commercial use, requiring downstream benefit-sharing, restricting use in surveillance applications). These are legally viable but are much less well-understood by downstream users and can inhibit legitimate research. Draft with legal counsel and expect to spend effort explaining them.

**Editorial opinion.** For community-derived African-language corpora where extraction is a real concern — which is most of them — CC BY-NC 4.0 or CC BY-NC-SA 4.0 is the honest default. Move to a more permissive licence only if the community has explicitly consented and the consent was informed about the specific commercial-use scenarios the community was agreeing to. Move to a stricter custom licence only if you can afford to explain it to every downstream user.

## Anti-extraction release patterns

Beyond licence choice, three release patterns reduce extraction risk:

- **Named steward.** The release documentation names a specific person or body (the project lead, a community steering committee) as the steward of the corpus, with contact information. Requests to re-use, re-license, or extract for training data go through the steward. An unstewarded corpus attracts more extractive re-use than a stewarded one, because there is nobody to say no.
- **Attribution requirements that survive derivation.** CC BY-SA and CC BY-NC-SA propagate attribution through downstream releases. This makes it easier to detect and challenge downstream re-uses that do not credit the community.
- **Release with a citation and a benefit-sharing note.** The dataset card includes the community affiliation, the recommended citation, and — if the community has agreed on one — a statement of how downstream benefit is expected to flow back. This is not legally enforceable in most jurisdictions but sets social expectations and provides a reference point for later negotiations.

## When to say no

There are requests you should decline:

- **Requests for the corpus without a stated use case.** Legitimate research use has a stated purpose. Vague "we would like a copy for future work" requests should be pushed back on until the use case is stated.
- **Commercial re-use requests that skip the community.** If a commercial actor asks the project team but not the community, the answer defaults to no until the community has been consulted.
- **Requests to include the corpus in a larger release where the licence would be weakened.** Do not agree to have your CC BY-NC 4.0 corpus repackaged under CC BY 4.0 in a downstream release.
- **Requests to strip community attribution.** No matter how technically convenient.
- **Requests from surveillance-adjacent applications** (border enforcement, predictive policing, extractive government-monitoring applications). Even if legally permitted, the community's original consent almost certainly did not contemplate these uses.

Declining is a valid outcome. Not every request must be granted.

## Anti-patterns

1. **Deferring the legal and consent architecture** to after data collection. The costs of retrofitting are much higher than the costs of doing it right the first time.
2. **A single generic consent form** used across languages, countries, and contribution types. Consent for a five-minute interview is different from consent for a hundred hours of speech.
3. **Assuming the corpus is not "personal data" because it is language.** Voice is biometric; handwritten samples identify individuals; even textual annotations can be identifying in context.
4. **Skipping the community-consent conversation** because individual consent was obtained. Individual consent does not authorise community re-use.
5. **Choosing a licence out of habit or platform default.** Hugging Face defaults, university repository defaults, and academic-project defaults do not automatically fit community-derived data.
6. **Publishing without a named steward.** An unstewarded corpus attracts extractive re-use because there is no one to challenge it.
7. **Treating "the data is anonymised" as a licence to skip the analysis.** Anonymisation of speech is difficult and rarely complete; anonymisation of textual annotation is not automatic; identifying features can survive both.

## Further reading

- [Nekoto et al., 2020 — participatory approach](https://aclanthology.org/2020.findings-emnlp.195/) — the reference for how Masakhane structures community involvement, consent, and IP in practice.
- [CARE Principles for Indigenous Data Governance (GIDA)](https://www.gida-global.org/care) — the reference for community authority over community-derived data.
- [FAIR Principles](https://www.go-fair.org/fair-principles/) — the open-research default; read alongside CARE to understand the tension.
- [African Union Malabo Convention (2014, in force 2023)](https://au.int/en/treaties/african-union-convention-cyber-security-and-personal-data-protection) — the continental framework member states are progressively aligning with.
- [WIPO — Traditional Knowledge](https://www.wipo.int/tk/en/) — the international framework for protection of traditional cultural expressions.
- [Data Nutrition Project](https://datanutrition.org/) — a template for structured dataset documentation that includes the legal and ethical dimensions.
- [Datasheets for Datasets (Gebru et al., 2018)](https://arxiv.org/abs/1803.09010) — the widely-adopted dataset documentation standard.
- [Bird, 2020 — decolonising speech and language technology](https://aclanthology.org/2020.coling-main.313/) — the ethical framing that makes explicit whose data is being processed and on whose terms.

---

**Contributor's note.** If you have negotiated a consent workflow, a community-IP agreement, or a licence for a Masakhane-lineage or adjacent project, please contribute a case study under [Case Studies](../case-studies/index.md) describing what you agreed to and what worked or did not work. Legal and consent architecture is best learned from real examples, not from abstract principles.
