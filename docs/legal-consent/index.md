---
sidebar_position: 1
ready: true
last_update:
  date: 2026-07-07
  author: Shamsuddeen Hassan Muhammad
---

# Legal, consent, and community IP

*Last reviewed: 2026-07-07.*

:::warning Disclaimer
This chapter is practical guidance for scoping the legal and consent architecture of an African-language NLP project. It is **not legal advice**. Data protection law is jurisdiction-specific, changes often, and carries real consequences when mishandled. For jurisdiction-specific advice, consult a lawyer qualified in the country whose data protection law applies to your project. Where this chapter names a specific law, it does so to point you at the primary source; the primary source is authoritative, this chapter is not.
:::

Every question in this chapter should be answered *before* data collection begins, not after. Trying to retrofit consent, community IP, or a defensible licence onto a corpus that already exists is expensive, sometimes impossible, and always damaging to community trust. This is the operational reason [Step 0 of long-tail language onboarding](../long-tail-language/index.md#step-0-before-any-data-collection) is where it is.

:::tip[Key points]

- Settle ownership, licence and re-use decisions in writing, with the community, before any data is collected.
- Get both individual and community consent, ask separately for each purpose, and keep a versioned, append-only consent record.
- Check the data-protection law of every country your contributors are in; treat voice and handwriting as personal data.
- Release openly under CC BY 4.0 by default. Use CC BY-NC or stricter terms only by deliberate exception, where the community or the consent terms require it, and record why in the dataset card.
- Choose the licence as a policy decision with the community, not out of habit or a platform default.
- Name a steward for the released corpus, and be ready to decline extractive requests.

:::

## The three questions every project must answer

Before scoping data collection, agree (in writing, with the community whose language and voices are being recorded) on the answers to three questions. Do not assume answers. Do not defer them.

### 1. Who owns what the project produces?

Ownership sits at three layers: the individual contributor (a person whose voice or handwriting is recorded), the community (the collective whose language is the subject), and the project entity (the organisation or research group running the collection). Every project decides, explicitly, which rights sit with which layer, and documents the decision. Vague ownership is not neutral. In the absence of a written agreement, whichever legal system applies fills the gap, and it usually does not fill it in the community's favour.

### 2. Under what licence is the corpus released?

The licence choice is not primarily a technical decision; it is a policy choice about who is permitted to do what with the community's data. See the [licence selection section](#licence-selection) below. Do not adopt a licence out of habit or because it is the default on the platform you use.

### 3. Who decides if a re-use request comes in later?

When someone asks to re-use the corpus after release, who has the standing to say yes or no? Name the decision body and its process in the release documentation before a request arrives; see [Governance models](../data-governance/index.md#governance-models) for the options.

## Consent

Consent for NLP data collection is not a checkbox. It is a workflow, and its quality is what makes the project ethically defensible or not.

### Individual vs community consent

Both are needed for most projects. **Individual consent** is the informed agreement of each specific person contributing a recording, a transcription, an annotation, or an image of their handwriting. **Community consent** is the agreement of the collective whose language is the subject of the collection. Neither substitutes for the other. A community that agrees to a project does not authorise you to record any specific individual without their consent; a specific individual who agrees cannot authorise the project on behalf of the community.

Community consent is often the harder of the two to get right, because you must first work out whose consent matters, and in what capacity: elders, language custodians, elected representatives, diaspora communities? The participatory approach Masakhane used for machine translation, which treats native speakers as co-creators of data and models, is a useful model ([Nekoto et al., 2020](../references.md#nekoto-2020)).

### Consent from non-literate speakers

A signature on a form assumes the signer read and understood the form. For consent from non-literate contributors (a substantial share of speakers of many African languages), that assumption fails. The workable pattern:

- **Oral consent, recorded**, in the contributor's own language, with a native speaker asking the questions and confirming understanding.
- **A simplified visual summary**: a one-page pictorial explanation of what the data is, how it will be used, who will hold it, and how consent can be withdrawn.
- **A witness who is not the project team**: a community member, ideally the person who introduced the contributor to the project, present during the consent conversation.
- **Storage of the audio consent recording** alongside the data itself, so the consent record travels with the data and can be verified later.

This is more expensive than a paper form. It is also the pattern that survives scrutiny.

### Purpose limitation and downstream use

Consent to record a person's voice for building an ASR corpus is not consent to include that voice in a voice-cloning dataset. Consent to translate a sentence into English for a translation benchmark is not consent to have that translation used in a commercial LLM's training data. Be specific in the consent conversation about what the data will and will not be used for, and treat downstream re-use as requiring fresh consent whenever it exceeds the original scope.

Specific wording is only half of purpose limitation. The other half is giving contributors a separate choice for each purpose and then honouring each choice when data leaves the project. Do not bundle purposes into one "I agree". Ask separately, as opt-in boxes that start unticked, for at least:

- **Model training**: the contribution may be used to train or fine-tune models.
- **Sharing with partners**: the contribution may be passed to named partner organisations under the project's agreements.
- **Public release**: the contribution may be published openly under the project's licence. Once released, it cannot be recalled (see [Withdrawal](#withdrawal)).
- **Each specific reuse** the project already foresees, such as quoting examples in publications or including a voice in a speech-synthesis dataset.

A contributor who says no to one purpose can still take part in the others. If a purpose is a condition of taking part at all, it is not an opt-in: say so plainly in the description of the contribution, and do not offer a box that cannot be unticked. Store the answer to each purpose per contributor, in the [consent record](#keeping-consent-records), not only on the paper form. How those answers are checked before data leaves the project is covered in [From consent record to release metadata](#from-consent-record-to-release-metadata).

**Optional speaker profiles.** For speech projects, offer a speaker-profile step before the first recording, with nothing preselected. Every field may be left blank or answered "prefer not to say", and declining does not block contribution. Keep the fields coarse: an age band rather than a birthdate, gender, and the language varieties the speaker uses, strongest first. Do not ask reviewers who only correct clips to fill in a profile.

Treat releasing a speaker profile as its own purpose. Ask for separate, versioned consent before attaching age band, gender or language varieties to released utterance rows. GDPR Recital 32 states that silence, pre-ticked boxes or inactivity should not constitute consent ([European Union, 2016](../references.md#gdpr-2016)). Without this consent, leave the profile fields out entirely rather than exporting empty placeholders. Apply a later revocation from the next export. Never attach one speaker's profile to a row that contains several speakers, and report demographics only in aggregate unless the speaker opted into row-level release.

### Contributors under the applicable age of consent

For collections that may include children, such as school-based speech or handwriting, ask for an age attestation or coarse age band during consent. Below the applicable threshold, obtain and record consent from a parent, guardian or other legally competent person against the child's contributor code, following the applicable law and ethics approval. Store the age category separately so affected items can be found, restricted or removed. Do not collect an exact birthdate unless it is necessary.

Thresholds and scope differ. South Africa's POPIA section 1 defines a child as a person under 18 who is not legally competent to act without a competent person's assistance; section 35 includes prior consent of a competent person among its authorisations, alongside narrower grounds such as research that serves a public interest and needs the data ([Republic of South Africa, 2013](../references.md#popia-2013)). GDPR Article 8 concerns consent for information-society services offered directly to a child: it uses 16, while allowing member states to lower the age to no less than 13; it is not a universal rule for every collection involving someone under 18 ([European Union, 2016](../references.md#gdpr-2016)). Check each country's law and the ethics board's requirements, which may be stricter. Record the guardian's consent on the [consent form](../templates/consent-form.md).

### Withdrawal

Contributors must be able to withdraw. This is a legal requirement under most African data protection laws (see the [country reference](#data-protection-laws-in-africa-quick-country-reference) below) and an ethical one everywhere else. Design withdrawal in from the start:

- The contributor is given a stable, memorable ID (not their name) that allows them to reach the project later and identify their contribution.
- Withdrawal removes the data from the active corpus and from all future releases. Data that has been publicly released cannot be un-released; the withdrawal record acknowledges this and the project commits to not re-publishing.
- Withdrawal does not require the contributor to justify the request or to speak in the project's working language. A native-speaker channel for withdrawal requests is part of the design, not an afterthought.

### Keeping consent records

A consent you cannot show is a consent you cannot rely on. Some laws say so directly. Under the EU's General Data Protection Regulation, a controller that relies on consent must be able to demonstrate that the person consented, and withdrawing must be as easy as giving consent ([European Union, 2016](../references.md#gdpr-2016)). Kenya's [Data Protection Act 2019](#data-protection-laws-in-africa-quick-country-reference) likewise places the burden of proving consent on the data controller or processor (section 32(1)). Even where no law requires it, the record is what lets you answer a contributor, an ethics board or a partner years after collection. Keep the consent record as its own register, linked to the data by contributor code.

**What to log.** Each acceptance is one entry with:

| Field | Why it matters |
| --- | --- |
| Contributor code | Links the entry to the data without using a name |
| Consent text version | Shows exactly what the person agreed to |
| Purposes accepted | One answer per opt-in purpose |
| Date and project | When, and for which collection |
| Form | Written, or oral with a link to the consent recording |
| Country of residence (optional) | Helps decide which data protection law applies |

**Versions.** Any change to the consent text, however small, creates a new version with its own number and date. Existing contributors re-consent to the new version before they contribute anything further. Their earlier contributions stay covered by the version they accepted at the time.

**Append only.** Do not edit or delete entries. A withdrawal is a new entry that refers to the original acceptance; the original stays in the register, so the history shows what was agreed, when it ended, and why data was removed. A withdrawal also notifies whoever processes the data, so that the next export applies it (see [From consent record to release metadata](#from-consent-record-to-release-metadata)). Keep the register for as long as the data, or any release built from it, is in use, plus any period your law or ethics approval sets; retention and disposal are themselves logged as entries.

**Receipts.** Give contributors a copy or receipt each time they sign or withdraw: a printed copy, a message to their phone, or a reference read aloud in an oral session. The receipt names the consent text version and the contributor code.

**Audit and tamper evidence.** The register must be exportable in a plain format (for example CSV) for an audit or an ethics review. Make it tamper-evident, so that a later edit would be noticed. Store a checksum with each archived signed form and consent recording. You can also chain the entries so that each one includes a hash of the one before it, and regularly record the latest hash somewhere the register's keepers cannot change, for example in each release's notes, in contributor receipts, or with the ethics board. A later edit then no longer matches the recorded hash ([Crosby and Wallach, 2009](../references.md#crosby-2009)).

**Enforcement.** Keep a per-contributor checklist of what is still outstanding, such as an unsigned form, an outdated version, or an oral recording not yet checked. Do not accept new submissions from a contributor until the checklist is complete. Run the check where submissions are received, not only on the screen the contributor sees, so that an old link, a bulk upload or an offline device that syncs later cannot get around it. A consent gap found at release time is expensive: data without a valid consent has to be left out, however good it is.

The [agri-advisory case study](../agri-advisory/quality-consent-release.md#consent) keeps the same kind of register in a running project, with versioned consent texts and re-consent when the text changes.

### From consent record to release metadata

Purpose limitation becomes real when the export pipeline checks it, not when it is written on a form. Run these steps before every export, whether it is an internal training set, a batch for a partner, or a public release:

1. **Name the export's purpose.** Each export serves one or more of the purposes on the form, for example "training, internal only" or "public release".
2. **Link every item to its contributors.** Each item carries, for every contributor, their code and the consent text version in force for them at the time, such as the speaker of a recording and the person who wrote the prompt. Assign these at ingest; adding them at release time is guesswork.
3. **Join the items to the consent record** by contributor code and version. Judge each contributor's part against the consent text version that contributor had accepted when they contributed to the item.
4. **Keep only items whose contributors all accepted the export's purpose.** An item with a missing, refused or unclear answer is left out, not included by default.
5. **Apply every withdrawal received since the last export**, and log each removal against the withdrawal entry that caused it.
6. **Publish a consent summary with the release.** Report counts per consent form (written or oral) and text version, how many contributors accepted each purpose, the number of items left out and why, and the withdrawals applied. Put it in the [dataset card](../templates/dataset-card.md).

Run the filter as a script that is part of the export, so it runs the same way every time and stops the export if any item cannot be linked to a contributor. A minimal version of steps 3 to 5 looks like this:

```python title="consent_filter.py"
def eligible(items, consent, withdrawn, purpose):
    """Keep items whose contributors all accepted `purpose`."""
    kept, dropped = [], []
    for item in items:
        if not item.get("contributors"):
            raise ValueError(f"item {item['id']} has no contributor codes")
        reasons = []
        # contributors: (code, version) pairs, where version is the consent
        # text version this contributor had accepted when they contributed
        for code, version in item["contributors"]:
            record = consent.get((code, version))
            if code in withdrawn:
                reasons.append(f"{code}: withdrawn")
            elif record is None:
                reasons.append(f"{code}: no consent record")
            elif not record["purposes"].get(purpose, False):
                reasons.append(f"{code}: did not accept {purpose}")
        (dropped if reasons else kept).append((item, reasons))
    return kept, dropped
```

The `dropped` list, with its reasons, is the raw material for the consent summary. The [agri-advisory case study](../agri-advisory/quality-consent-release.md#rolling-exports-and-partner-sampling) applies opt-outs in this way before every batch export, and counts the withdrawals in its datasheet.

:::tip[Template: Consent form]
A starting point for your project's consent process: a written consent form, an oral consent protocol for contributors who do not read, a community consent addendum, and the role of an independent ombudsperson. Adapt it to the data protection law of each country you work in. [Open the consent form template](../templates/consent-form.md).
:::

## Data protection laws in Africa: quick country reference

By 2026, 44 African countries had enacted data-protection legislation, and most had a functioning authority to enforce it ([Tech In Africa, 2026](../references.md#techinafrica-2026)). The table below is a starting reference only: laws change, enforcement varies, and it is not a substitute for advice on a specific jurisdiction. For each country, three questions usually matter:

- Does a general data-protection law exist?
- Does it require a data protection officer, registration or notification?
- Does it restrict moving data across borders?

| Country | Law | Regulator | Points to check |
| --- | --- | --- | --- |
| Nigeria | [Nigeria Data Protection Act 2023](https://ndpc.gov.ng/) (NDPA) ([Federal Republic of Nigeria, 2023](../references.md#ndpa-2023)) | Nigeria Data Protection Commission | Controllers and processors "of major importance" must register; cross-border transfer needs adequacy or other safeguards. Builds on the earlier Nigeria Data Protection Regulation (NDPR) 2019. |
| Kenya | [Data Protection Act 2019](https://www.odpc.go.ke/) ([Republic of Kenya, 2019](../references.md#kenya-dpa-2019)) | Office of the Data Protection Commissioner | Data controllers and processors must register; cross-border transfer needs appropriate safeguards or adequacy. |
| South Africa | [Protection of Personal Information Act 4 of 2013](https://popia.co.za/) (POPIA; most provisions in force from 1 July 2020) ([Republic of South Africa, 2013](../references.md#popia-2013)) | Information Regulator | Broad scope; strict rules on "special personal information" such as health, religious beliefs, race or ethnic origin, and biometric information. Cross-border transfer limited to places with comparable protection. |
| Ghana | [Data Protection Act 2012](https://dataprotection.org.gh/) (Act 843) ([Republic of Ghana, 2012](../references.md#ghana-dpa-2012)) | Data Protection Commission | One of the older African laws; data controllers must register. |
| Rwanda | Law 058/2021 on the Protection of Personal Data and Privacy ([Republic of Rwanda, 2021](../references.md#rwanda-dpl-2021)) | National Cyber Security Authority | Recent and comparatively strict; storage-location and cross-border transfer rules are notable. |
| Uganda | [Data Protection and Privacy Act 2019](https://www.pdpo.go.ug/) | Personal Data Protection Office | |
| Egypt | [Personal Data Protection Law (Law No. 151 of 2020)](https://www.pdpc.gov.eg/) | Personal Data Protection Center | General framework; enforcement still developing. |
| Morocco | [Law 09-08](https://www.cndp.ma/) | CNDP | Older framework, still in force. |
| Tunisia | [Organic Act No. 63 of 2004](https://www.inpdp.tn/) | INPDP | One of the earliest African data-protection laws. |

At the continental level, the **[African Union Convention on Cyber Security and Personal Data Protection](https://au.int/en/treaties/african-union-convention-cyber-security-and-personal-data-protection)** (Malabo Convention, adopted 2014) entered into force in 2023 ([Malabo Convention, 2023](../references.md#malabo-2023)). Member states are progressively aligning with it. It complements national law; it does not replace it.

The practical demands are similar across these laws:

- Collect on a lawful basis, usually informed consent.
- Use the data only for the purpose you stated.
- Honour contributors' rights to access, correct and delete their data.
- Be ready to assess the impact of anything that feeds automated decisions.

Check the law of every country your contributors are in, not only your own. African Next Voices shows why: it gathered roughly 9,000 hours of speech across Kenya, Nigeria and South Africa ([African Next Voices, 2025](../references.md#african-next-voices)), which placed one project under three data-protection regimes at once.

Several countries, including some in Central Africa and the Sahel, had no comprehensive data-protection statute at the time of writing. There, the safe default is to follow the strictest framework of any country whose residents are in the corpus, plus the framework of the country where the data is stored.

:::warning[Treat voice as personal data]
Voice recordings, transcriptions of private conversations, and any content that identifies a person are personal data by default. "The data is anonymised" is not a reason to skip the analysis: anonymising voice is difficult and rarely complete.
:::

## Community IP frameworks

### CARE and FAIR

FAIR (Findable, Accessible, Interoperable, Reusable) makes data usable, and the CARE principles (Collective benefit, Authority to control, Responsibility, Ethics) add the community's authority over and benefit from its data, so community-derived language corpora should follow both ([Wilkinson et al., 2016](../references.md#wilkinson-2016); [Carroll et al., 2020](../references.md#carroll-2020)). For African-language corpora this means the community whose language it is keeps authority over use, shares in the benefit, and is treated as a rights-holder rather than a data source; how each principle maps to project decisions is in [FAIR and CARE, together](../data-governance/index.md#fair-and-care-together).

### Traditional knowledge and cultural expression

Language recordings often include content that is not neutral text: traditional stories, songs, proverbs, ceremonial speech. Some categories may be protected under [WIPO's traditional knowledge framework](https://www.wipo.int/tk/en/) or under national heritage law. Others may be culturally sensitive without being legally restricted: songs performed only in ceremony, stories told only to certain audiences. The consent conversation must include the question: *what content, if any, is not appropriate for open release regardless of individual consent?* This is decided with the community, not by the project team.

## Licence selection

The basics of each licence type, including why software licences such as MIT or Apache-2.0 do not fit data, are in [Licensing and Compliance](../6_documentation/licensing.md#common-licence-types-for-nlp-datasets). Use version 4.0 of the Creative Commons licences: it also covers database rights ([Creative Commons, n.d.-b](../references.md#cc-faq)). License the data separately from any code. Common choices, and when each is defensible ([Creative Commons, n.d.-a](../references.md#cc-licenses)):

- **[CC0 (Public Domain Dedication)](https://creativecommons.org/publicdomain/zero/1.0/)**: no rights reserved ([Creative Commons, n.d.-c](../references.md#cc0)). Maximal openness: no protection against commercial re-use, no attribution requirement, no community control. Rarely appropriate for community-derived language data. Use it with caution, and only after the community has explicitly agreed to maximum openness.
- **[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)**: attribution required; everything else permitted, including commercial use. Widely used for open research data. This is the playbook's default for open release, provided the community and the consent terms allow commercial re-use with attribution.
- **[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)**: attribution required, and adaptations must carry the same or a compatible licence. This protects against enclosure: anyone who shares an adapted corpus must release it under the same or a compatible licence. Useful when the community wants the corpus to stay in the open commons.
- **[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)**: attribution required, non-commercial use only. The licensing text on [MasakhaNER 2's dataset card](https://huggingface.co/datasets/masakhane/masakhaner2) describes CC 4.0 non-commercial terms. Use it by exception: when the community requires it, when consent covered non-commercial use only, or when the material is sacred or sensitive. The trade-off is that the non-commercial clause limits reuse, including some downstream research ([Ball, 2014](../references.md#ball-2014)), so choose it deliberately and record the reason in the dataset card.
- **[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)**: non-commercial and share-alike combined. The strictest of the standard CC options; use it when protection against both commercial enclosure and downstream re-licensing matters.
- **Custom community licences**: some projects draft bespoke terms, for example requiring community approval for commercial use, requiring downstream benefit-sharing, or restricting use in surveillance. These can be legally viable, but downstream users understand them much less well, and they can inhibit legitimate research. Draft them with legal counsel and expect to spend effort explaining them.

:::note[The playbook's default]
CC BY 4.0 is the default for open release. Use CC BY-NC 4.0, CC BY-NC-SA 4.0 or stricter terms by exception, where one of these holds:

- the community requires it, for example because extraction is a real concern;
- the consent you collected covers non-commercial use only;
- the material includes sacred or culturally sensitive content.

Make the exception deliberately, with the community, and record the reason in the dataset card. CC BY only fits if the consent covered the commercial uses it permits. Move to a stricter custom licence only if you can afford to explain it to every downstream user.
:::

## Anti-extraction release patterns

Beyond licence choice, three release patterns reduce extraction risk:

- **Named steward.** The release documentation names a specific person or body (the project lead, a community steering committee) as the steward of the corpus, with contact information. Requests to re-use, re-license, or extract for training data go through the steward. An unstewarded corpus attracts more extractive re-use than a stewarded one, because there is nobody to say no.
- **Attribution requirements that survive derivation.** CC BY-SA and CC BY-NC-SA propagate attribution through downstream releases. This makes it easier to detect and challenge downstream re-uses that do not credit the community.
- **Release with a citation and a benefit-sharing note.** The dataset card includes the community affiliation, the recommended citation, and, if the community has agreed on one, a statement of how downstream benefit is expected to flow back. This is not legally enforceable in most jurisdictions but sets social expectations and provides a reference point for later negotiations.

## When to say no

There are requests you should decline:

- **Requests for the corpus without a stated use case.** Legitimate research use has a stated purpose. Vague "we would like a copy for future work" requests should be pushed back on until the use case is stated.
- **Commercial re-use requests that skip the community.** If a commercial actor asks the project team but not the community, the answer defaults to no until the community has been consulted.
- **Requests to include the corpus in a larger release where the licence would be weakened.** If your corpus carries a non-commercial or share-alike term, do not agree to have it repackaged under a more permissive licence, such as CC BY 4.0, in a downstream release.
- **Requests to strip community attribution.** No matter how technically convenient.
- **Requests from surveillance-adjacent applications** (border enforcement, predictive policing, extractive government-monitoring applications). Even if legally permitted, the community's original consent almost certainly did not contemplate these uses.

Declining is a valid outcome. Not every request must be granted.

## Anti-patterns

1. **Deferring the legal and consent architecture** to after data collection. The costs of retrofitting are much higher than the costs of doing it right the first time.
2. **A single generic consent form** used across languages, countries, and contribution types. Consent for a five-minute interview is different from consent for a hundred hours of speech.
3. **Assuming the corpus is not "personal data" because it is language.** Voice is biometric; handwritten samples identify individuals; even textual annotations can be identifying in context.
4. **Skipping the community-consent conversation** because individual consent was obtained. Individual consent does not authorise community re-use.
5. **Choosing a licence out of habit or platform default.** The licence a hosting platform, university repository or earlier project suggests does not automatically fit community-derived data.
6. **Publishing without a named steward** (see [Anti-extraction release patterns](#anti-extraction-release-patterns)).
7. **Treating "the data is anonymised" as a licence to skip the analysis.** Anonymisation of speech is difficult and rarely complete; anonymisation of textual annotation is not automatic; identifying features can survive both.

## Further reading

- [Nekoto et al., 2020, participatory research for low-resourced machine translation](https://aclanthology.org/2020.findings-emnlp.195/): how Masakhane involved native speakers as co-creators of data and models.
- [CARE Principles for Indigenous Data Governance (GIDA)](https://www.gida-global.org/careprinciples): community authority over community-derived data.
- [FAIR Principles](https://www.go-fair.org/fair-principles/): the open-research default; read alongside CARE.
- [African Union Malabo Convention (2014, in force 2023)](https://au.int/en/treaties/african-union-convention-cyber-security-and-personal-data-protection): the continental framework member states are progressively aligning with.
- [WIPO: Traditional Knowledge](https://www.wipo.int/tk/en/): the international framework for protecting traditional knowledge and cultural expressions.
- [Data Nutrition Project](https://datanutrition.org/): structured dataset labels that cover legal and ethical dimensions.
- [Datasheets for Datasets (Gebru et al., 2021)](https://dl.acm.org/doi/10.1145/3458723): a widely adopted dataset documentation standard.
- [Bird, 2020, decolonising speech and language technology](https://aclanthology.org/2020.coling-main.313/): whose data is being processed, and on whose terms.

---

**Contributor's note.** If you have negotiated a consent workflow, a community-IP agreement, or a licence for a Masakhane-lineage or adjacent project, please contribute a case study under [Case Studies](../case-studies/index.md) describing what you agreed to and what worked or did not work. Legal and consent architecture is best learned from real examples, not from abstract principles.
