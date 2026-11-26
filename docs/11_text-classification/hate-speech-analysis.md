---
sidebar_position: 11
sidebar_label: "Hate Speech Analysis"
ready: true
last_update:
  date: 2026-11-26
  author: Idris Abdulmumin
---

# Hate Speech Analysis

Hate speech detection identifies text that contains hateful, offensive, abusive or discriminatory language aimed at individuals or groups. The attack is based on attributes such as race, ethnicity, religion, gender, nationality, disability or other identity factors.

The goal is to classify whether a text expresses hate, hostility or incitement to harm, and to separate it from non-hateful content such as criticism, disagreement or neutral statements. Social media platforms use hate speech detection in content moderation to reduce online harassment.

:::tip[Key points]

- Pick a label set from published work (for example hate, offensive or abusive, normal) and define every label with examples.
- Add a label for unreadable or other-language posts, so annotators do not force them into a class.
- Annotate the target group of hateful posts if you need to know who is attacked.
- Rate severity on a fixed scale if you need more than a yes or no.
- Check your sampling and labels for bias against particular dialects or groups.

:::

## Label sets in published datasets

Researchers have used different label sets:

| Dataset | Labels |
|---|---|
| AfriHate ([Muhammad et al., 2025a](../references.md#afrihate-2025)) | Hate, abusive, neutral; posts written in another language are marked indeterminate and then removed |
| Amharic datasets by Ayele and colleagues ([Ayele et al., 2022](../references.md#ayele-2022); [Ayele et al., 2023](../references.md#ayele-2023)) | Hate, offensive, normal, unsure |
| Later Amharic dataset ([Ayele et al., 2024](../references.md#ayele-2024)) | Hate, offensive, normal, indeterminate |
| Davidson et al. ([Davidson et al., 2017](../references.md#davidson-2017)) | Hate speech, offensive language, neither |
| HateXplain ([Mathew et al., 2021](../references.md#mathew-2021)) | Hate, offensive, normal; a post is undecided when all three annotators chose a different class |

:::warning[Bias in labels and sampling]

Label sets and sampling can carry bias. Classifiers trained on five English Twitter datasets flagged tweets in African-American English as abusive more often than tweets in Standard American English ([Davidson et al., 2019](../references.md#davidson-2019)).

:::

## Label definitions

The definitions below follow those used in recent African-language datasets ([Ayele et al., 2024](../references.md#ayele-2024); [Muhammad et al., 2025a](../references.md#afrihate-2025)):

- **Offensive speech:** any form of bad language, including rude, impolite, insulting or belittling utterances intended to offend or harm an individual.
- **Hate speech:** language that expresses hatred towards a group or individual based on their group identity, such as race, ethnicity, religion, gender, disability, political affiliation or other characteristics. It also includes threats of violence linked to group identity.
- **Normal:** any expression that contains no bad language of the kinds above.
- **Indeterminate:** any post that is not readable, or is written entirely in a language other than the language of annotation.

## Targets of hate speech

Hate speech can have one or several targets. Ayele et al. (2024) and Muhammad et al. (2025a) annotate the target of hateful posts with categories such as ethnicity, politics, religion, gender, disability and other ([Ayele et al., 2024](../references.md#ayele-2024); [Muhammad et al., 2025a](../references.md#afrihate-2025)). The list below adapts these and adds a label for posts whose target is unclear:

- **Ethnic:** the hateful post targets an ethnic group identity.
- **Religion:** the hateful post targets a religious group identity.
- **Gender:** the hateful post targets a gender group identity.
- **Disability:** the hateful post targets people with disabilities as a group.
- **Politics:** the hateful post targets people or entities because of their political ideology.
- **Unidentified target:** the target of the hateful post is not clear or not known.
- **Other:** the hateful post targets other groups or identities, such as sexual orientation or race.

## Severity

Some studies also rate how severe a message is. Ayele et al. (2024) rated the offensiveness and hatefulness of each tweet on a 5-point Likert scale, from 1 (least) to 5 (most), and gave normal tweets a score of 0 ([Ayele et al., 2024](../references.md#ayele-2024)).

## Putting it together

A single annotation task can combine the category, severity and target questions above.

**Task specification: hate speech category, severity and target**

| Setting | Value |
|---|---|
| Annotator sees | One post |
| Annotator gives | 1. Category: offensive, hate, normal or indeterminate. 2. Severity: how offensive or hateful the post is. 3. Target: the group or groups attacked |
| Choice | Category: exactly one, required. Severity: one rating from 1 (least) to 5 (most), only for offensive or hateful posts (normal posts score 0). Target: one or more of the target labels above, only for hateful posts |
| Notes | Ask the severity and target questions only when the category calls for them, so annotators of normal posts are not slowed down |

## Further reading

- Vidgen and Derczynski (2020) review 63 abusive-language training datasets and give practical guidance for building new ones ([Vidgen and Derczynski, 2020](../references.md#vidgen-2020)).
- Poletto et al. (2021) systematically review resources and benchmark corpora for hate speech detection ([Poletto et al., 2021](../references.md#poletto-2021)).
- Wiegand et al. (2019) show how keyword-focused sampling biases abusive-language datasets ([Wiegand et al., 2019](../references.md#wiegand-2019)).
- AfriHate covers hate speech and abusive language in 15 African languages ([Muhammad et al., 2025a](../references.md#afrihate-2025)).
