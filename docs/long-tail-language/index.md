---
sidebar_position: 1
---

# Long-tail language onboarding

*Last reviewed: 2026-07-07.*

You have a language with a speaker community and essentially no digital resources. There is no MasakhaNER split for it, no NLLB-200 pair, no Meta MMS adapter, no HF Hub dataset card. The [cross-language transfer](../cross-language-transfer/index.md) chapter told you which resourced language to transfer from as a starting point; this chapter is about what comes next — how to build the first real dataset for a language that has none.

This chapter is written for the reader who is often the source of the language itself: a native speaker, a community leader, a linguist working with a community, or a small research group. It is not written for a big lab. Big labs already have their own playbooks. **What this chapter tries not to do is let anyone start a long-tail language project with unrealistic timelines or an extractive plan.**

## What "long-tail" means here

We use "long-tail" to describe languages sitting in Joshi et al.'s ([2020](https://aclanthology.org/2020.acl-main.560/)) resource classes 0 or 1: no substantial labelled corpus, little unlabelled text, no benchmark, no widely-deployed model. Most African languages are in this position, and the reasoning below applies to any of them. It also applies to well-resourced-elsewhere languages that lack a specific modality or task — a language with plentiful text but no speech corpus is long-tail for ASR.

The framing is *not* about speaker population. Some long-tail languages have tens of millions of speakers. The gap is in resources, not in size.

## Step 0 — before any data collection

Before recording a single sentence, three things must be settled with the community. Every project that skipped this step and tried to catch up later has paid for it downstream.

### Orthography

For many long-tail African languages there is no single agreed way to write the language. Different institutions, different diasporas, or different generations use different conventions. If your project produces data in one convention and the reader community reads another, the data is unusable to them. This has to be resolved before recording begins.

Approaches, in order of preference:

1. **A community-agreed convention already exists.** Adopt it. Even if it is not what you would design, community adoption is worth more than technical elegance.
2. **The community is willing to converge on one convention through consultation.** Convene the consultation. Include speakers from multiple regions, generations, and diaspora communities. Be prepared for this to take three to six months. Document the decision.
3. **The community is genuinely split and consensus is not achievable.** Support both conventions from the start — dual annotation, dual output — rather than picking a winner. This roughly doubles the cost of every step downstream, and it is nearly always the right call anyway.

If your language uses multiple scripts (Latin + Ajami, Latin + Ge'ez, Latin + N'Ko), the script decision is a subset of this same question. See the note on cross-script transfer in the [cross-language transfer chapter](../cross-language-transfer/index.md#per-family-transfer-guidance).

### Use case

"NLP for language X" is not a use case. It is a category. Before scoping data collection, the project needs a specific answer to *why*: education (children's learning materials, adult literacy), communication (messaging, chat, government service delivery), preservation (recording elders, oral tradition archives), commerce (market speech, banking access), health (patient information, community health worker apps), religion, radio broadcasting, migration/refugee assistance.

The use case shapes everything: what genres to record, what vocabulary to prioritise, whose voices to include, what the evaluation set should look like. A generic "we want a corpus" project produces a generic corpus that fits nothing.

### Community IP and consent

Who owns what the project produces? Under whose licence is it released? Who has the right to re-license it if a commercial actor asks? Who decides if a foreign lab wants to use the data to train a commercial model? These questions belong at the start, in writing, agreed with the community whose language is being recorded — not left to be figured out at release time.

The [Nekoto et al. (2020) participatory model](https://aclanthology.org/2020.findings-emnlp.195/) is the reference for how Masakhane handles this; adopt it or something equivalent, but do not skip it. See also the [core principles](../1_introduction/core-principles.md) — consent and community ownership are load-bearing here.

## Step 1 — the team

The team that works well for a long-tail project is not the team that works well for a well-resourced fine-tuning project. Roles that must be present, in priority order:

- **At least two native speakers** with different regional or generational profiles. Two is the minimum for any cross-check on transcription, translation, or annotation quality. If you only have one native speaker involved, the corpus quality has no floor.
- **A community liaison** — a person the speaker community trusts, empowered to raise concerns or halt the project when something is going wrong. This is a distinct role from the native-speaker annotator; they need not overlap.
- **A linguistically-trained consultant** familiar with the language family. For a very under-studied language, this is essential; the risk of mis-analysing morphology or tone is high without it.
- **A technical lead** who can build the tokeniser, run the training, ship the model. This person does not need to be a native speaker, but does need to work as a partner to the native speakers, not as a supervisor.
- **A project coordinator** — someone whose full job is keeping the schedule, managing consent forms, keeping data organised, running weekly check-ins. Long-tail projects fail from coordination collapse more often than from technical problems.

Under-staffing on any of the first three roles is the single most common way long-tail projects run into unrecoverable trouble.

## Step 2 — realistic milestones

The end-to-end arc from "no data" to "releasable resource" is two to three years. Anyone selling you a shorter timeline has either done this before under unusual circumstances or has not done it before at all. Realistic milestones:

### Milestone 0 — Community agreement (3 to 12 months)

Orthography, use case, and IP settled. Team assembled. Consent framework in place. **No data collected yet.** This phase looks unproductive on a Gantt chart and is the phase that prevents every downstream disaster. Do not compress it.

### Milestone 1 — 100 clean sentences (1 to 3 months)

One hundred sentences in your agreed orthography, each with a translation into a lingua franca (English, French, Arabic, Kiswahili — whichever your team works in). Each sentence reviewed by at least two native speakers. This is your pilot corpus — its job is to prove the orthography works, the workflow scales, and the annotation guidelines are clear enough to produce agreement.

You will find bugs in the orthography convention here. That is expected and useful. Fix them before moving on.

### Milestone 2 — 1,000 clean sentences (3 to 6 additional months)

Scale to a thousand sentences. In parallel: build a basic tokeniser and text normaliser that handle your orthography correctly. Publish the tokeniser and the pilot corpus openly, under the licence you agreed on in Step 0. This first public release matters — it signals the project is real, invites collaboration, and locks in the licensing structure before commercial pressure appears.

### Milestone 3 — 5–10k sentences + first transfer experiment (6 to 12 additional months)

Scale to the range where cross-lingual transfer becomes measurable. Fine-tune the closest-related pivot model (see [cross-language transfer](../cross-language-transfer/index.md)) on your corpus. Measure. Publish the result honestly — good, bad, or ambiguous. This publication is the point at which the language enters the reachable set for other researchers.

If you are working on speech, this milestone is 20 to 50 hours of transcribed audio rather than 5-10k sentences. Same order of magnitude of effort; different unit.

### Milestone 4 — Task-specific benchmark (12 to 24 additional months)

Choose the task your use case pointed to (NER, MT, sentiment, ASR, TTS, question answering) and build a task-specific benchmark: 2,000–10,000 annotated examples for a text task, 50 hours of transcribed and verified speech for a speech task, plus an evaluation set that reflects your real use case. Fine-tune, evaluate with native speakers, ship a model card, release under your Step-0 licence.

You now have a language with a public corpus, a public tokeniser, a public benchmark, and at least one public model. The language is no longer long-tail for that task. Downstream deployment is a separate project.

**Total: 24 to 45 months from Step 0 to Milestone 4.** Faster than three years is unusual; slower than four years often means the project has stalled and needs intervention. Grant proposals promising a 12-month "0 to model" arc for a genuinely long-tail language are describing an unrealistic scope — read them accordingly.

## Source selection

Where should the sentences come from? In order of preference:

1. **Community-produced original content.** Interviews, radio, storytelling, community-generated text. Highest quality, highest community buy-in, most representative.
2. **Existing translated texts, once vetted.** Government publications, health materials, textbooks. Domain-restricted (formal, written register) but useful. Vet each source with the community — some may be poorly translated and worse than nothing.
3. **Bible translations and similar religious content.** Available for many long-tail African languages via [JW300](https://aclanthology.org/P19-1310/) and similar. Useful as a bootstrap corpus, dangerous as a *sole* corpus because it locks the model into a single narrow domain. Never build only on this.
4. **Elicited translations from a lingua franca.** Ask native speakers to translate a defined set of sentences. Controllable, expensive, prone to "translationese" — sentences that read like translations, not native language. Use in moderation.
5. **Machine-translated bootstrap.** Very last resort. Machine translation into a low-resource language produces low-quality output that then contaminates every downstream model trained on it. If you must use it, mark it clearly and never mix it with human-produced content without a flag.

Sources to **avoid**, in order of severity:

- **Social media scrapes** for languages this under-served. The quality problems documented by [Kreutzer et al. (2022)](https://aclanthology.org/2022.tacl-1.4/) — mislabelled languages, machine-translated posts, off-topic content, spam — are magnified for long-tail languages. Assume 60-90% of what a naive scrape returns is unusable, and the effort of filtering is often greater than the effort of collecting cleaner data from the start.
- **Web crawls of unclear provenance** (Common Crawl low-resource extracts, CC-100 low-resource pairs, arbitrary OPUS entries for the language). Same reasoning. If you use these, spot-check a random 200-sentence sample with native speakers before training.
- **Agency-purchased translations** from non-community sources. Fast, expensive, and quality varies wildly. Non-community translation also cuts against the community-IP framework in Step 0 — the community did not agree to this data existing.
- **Old missionary linguistic material** as anything other than a linguistic-history reference. Orthography and analysis in colonial-era materials often reflect the analyst's assumptions rather than the community's practice.

## Anti-patterns to avoid

1. **Starting data collection before Step 0.** Every project that "just gets going" and figures out the orthography, use case, and IP later spends more effort undoing that decision than it saved by skipping the step.
2. **A single native speaker as the sole quality authority.** Every corpus needs cross-check; a single-speaker corpus reflects one dialect, one register, and one set of errors. Two speakers is the floor.
3. **Assuming the language has a single form.** Many long-tail African languages are dialect continua. Which variety are you recording? Is that decision documented? Have you told your users?
4. **Optimising for size at the expense of quality.** A thousand clean sentences that native speakers vouch for beats ten thousand semi-clean sentences from a scrape every time, at every downstream step. The playbook takes this position throughout — see [core principles](../1_introduction/core-principles.md).
5. **Publishing without a licence agreed with the community in advance.** Once data is public under a permissive licence, the community can no longer say no to a commercial re-use they never sanctioned. Get the licence right the first time.
6. **Promising deliverables that require faster-than-realistic timelines.** Grant proposals with a 6-month "we will build a NER system for language X" scope, for a genuinely long-tail language, are describing a project that will disappoint the funder and burn the community's goodwill. Say what is realistic. Push back on unrealistic asks.

## Further reading

- [Nekoto et al., 2020 — the participatory approach](https://aclanthology.org/2020.findings-emnlp.195/) — the foundational Masakhane paper on how a community-led long-tail language project actually works.
- [Joshi et al., 2020 — resource classes](https://aclanthology.org/2020.acl-main.560/) — the taxonomy that frames why the first thousand clean sentences matter.
- [Kreutzer et al., 2022 — low-resource corpus quality](https://aclanthology.org/2022.tacl-1.4/) — required reading before touching any web crawl for a long-tail language.
- [Bird, 2020 — decolonising speech and language technology](https://aclanthology.org/2020.coling-main.313/) — the ethical framing for whose language is being processed and on whose terms.
- [MasakhaNER 1 (Adelani et al., 2021)](https://aclanthology.org/2021.tacl-1.66/) — a worked example of the participatory workflow in a specific NER project; useful as a template for scope, effort, and team structure.
- [Common Voice technical description](https://arxiv.org/abs/1912.06670) — the design of a scalable community-recording effort; useful reading for anyone approaching Milestone 3-4 in speech.

---

**Contributor's note.** If you have led a long-tail language project — successful, stalled, or mid-course — the most useful thing you can add here is a per-language section under [Case Studies](../case-studies/index.md) documenting how the milestones above did or did not play out for your language. General guidance is only as good as the specific projects it is drawn from.
