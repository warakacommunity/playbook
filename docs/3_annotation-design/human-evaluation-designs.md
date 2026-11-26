---
title: Human Evaluation Designs
sidebar_position: 6
ready: true
last_update:
  date: 2026-11-26
  author: Seid Muhie Yimam
---

# Human Evaluation Designs

Many datasets are not labels on raw material but human judgements about outputs that already exist: which of two translations is better, how natural a synthesised voice sounds, which ASR hypothesis matches the audio, whether a chatbot's reply fits the conversation. The same judgements serve two purposes. They evaluate systems, and they become training data in their own right, as preference data for tuning a generation model. For African languages they are often the only trustworthy measure, because the automatic metrics are weakest exactly where these languages live (see [Open-ended generation](../text-generation/generation.md) and [Machine Translation](../machine-translation/index.md#evaluate-translation)).

This page covers the choice of design and the controls that keep judgements honest, whatever the modality. The [Preference Data](../agri-advisory/preference-data.md) page of the agri-advisory case study is the worked example of a pairwise design from start to finish; this page generalises its method and adds what it does not cover.

:::tip[Key points]

- Compare outputs when you need a winner or preference data; score them when you need a level or a release check.
- For pairwise designs, offer an explicit tie, an optional strength and short reason codes.
- Randomise order, hide system identity, use the same inputs, seed gold items, and check each rater for position bias.
- Match the agreement measure to the judgement (nominal, ordinal or rank), and keep every rater's judgement in the release.

:::

## Compare or score?

The first decision is whether raters compare outputs against each other or score each one on its own scale. A score answers "is this good enough?", which you need when there is only one system, when you must check a release against a fixed bar, or when you want to track one system over time. A comparison answers "which is better?", which is what you need to choose between systems or to collect preference data. Absolute scores also drift between raters and sessions: in a sentiment-intensity study, the same annotators gave different ratings to the same item when it reappeared, and the inconsistency grew with the time between the two showings ([Kiritchenko and Mohammad, 2017](../references.md#kiritchenko-2017)).

| Design | What the rater does | Suits |
| --- | --- | --- |
| Pairwise (A/B) | Picks the better of two, with or without a tie and a strength | Comparing two systems; preference data |
| Listwise ranking | Orders several candidates | ASR or MT n-best lists, retrieved passages, search results |
| Best-worst scaling | Picks the best and the worst in a small set | Scores for intensity or degree, such as sentiment strength or relatedness |
| Graded buckets | Sorts items into a few ordered grades | Relevance judgements |
| Absolute rating | Scores one output on an anchored scale | Release checks, single-system tracking, MOS for speech |

A review of human evaluation in natural language generation found that rating practice varies widely between studies, and it reports work in which ranking gave more reliable and consistent judgements than Likert scales. The same review notes that ranking gets expensive as more systems are compared, and it recommends either multi-item 7-point Likert scales or a continuous ranking task ([van der Lee et al., 2019](../references.md#vanderlee-2019)). No design is better in every case. Choose by the question you need answered, the number of systems, and the budget, then pilot it.

## Pairwise comparison

Show the same input with two outputs, labelled A and B, and ask which one is better. On this page, A is always the output shown first (on the left or at the top), and the system behind A is randomised for each item. The worked example in [Preference Data](../agri-advisory/preference-data.md) sets out the practice that carries over to any task. Apply the controls in [Controls for every design](#controls-for-every-design) (random order, hidden sources, the same inputs for every system), and add:

- **An explicit tie.** Offer "about the same" as a choice, so a rater who cannot separate the two does not have to guess. Tell raters to use it sparingly, and to choose the side they lean towards with a weak strength instead.
- **A strength judgement.** An optional "slight / clear / strong" turns a binary choice into an ordinal one and shows how firm each preference is.
- **Short reason codes.** A fixed list of reasons (more accurate, safer, more natural, and so on) plus a free-text note shows whether a choice rested on content or on language. Without it, you cannot tell why one system wins.

Write the decision order into the guideline. The case study's raters check correctness first, then safety, then whether a farmer could act on it, and only then compare the language, stopping at the first check that separates the two. A fixed order like this keeps fluent but wrong outputs from winning.

A pairwise record keeps both outputs as they were shown, their hidden sources, and every rater's judgement. Here `candidate_a` is the output displayed as A, so `choice` refers to the displayed position and the hidden `source` fields record which system was in each slot:

```json
{
  "item_id": "mt-hau-000417",
  "input": "The clinic opens at eight in the morning.",
  "candidate_a": { "text": "Asibitin yana buɗewa da ƙarfe takwas na safe.", "source": "system_2" },
  "candidate_b": { "text": "Asibiti na buɗe ƙarfe takwas.", "source": "system_1" },
  "ratings": [
    {
      "rater_id": "r-hau-07",
      "choice": "A",
      "strength": "clear",
      "reasons": ["more_accurate", "more_natural_language"],
      "note": "B drops 'in the morning'."
    },
    {
      "rater_id": "r-hau-11",
      "choice": "tie",
      "strength": null,
      "reasons": [],
      "note": ""
    }
  ]
}
```

## Ranking several candidates

When there are more than two candidates, for example the five best hypotheses an ASR model gives for one clip, or translations from several systems, ask raters to order them. Pairwise comparison of every combination grows quickly: N candidates make N(N−1)/2 pairs, so five candidates already need ten judgements per item. Ranking collects the same ordering in one pass, at the cost of a heavier decision for the rater.

Decide two things before the pilot and state them in the guideline:

- **Whether ties are allowed.** For ASR hypotheses that differ only in a word the audio cannot settle, a forced order is noise. Either allow tied ranks, or let raters place equivalent candidates in the same group.
- **Whether the rater must rank everything.** For long lists, ranking only the top few, or marking which candidates are acceptable, is often enough and much cheaper.

Check rankings for internal consistency. A single drag-and-drop order cannot contradict itself, but rankings assembled from separate pairwise judgements can: a rater may prefer A to B, B to C, and C to A. Such a cycle is a circular triad, and counting circular triads is the classic measure of how consistent a set of paired comparisons is ([Kendall and Babington Smith, 1940](../references.md#kendall-1940)). Many cycles mean the rater cannot separate the candidates consistently: they may be guessing or have misread the task, or the candidates may be too close to call, in which case allow ties. Re-showing a few items later in the stream gives a second consistency check that works for any design.

To compare two raters' rankings of the same list, use a rank correlation such as Kendall's tau, and report how ties were handled.

## Best-worst scaling

Best-worst scaling shows a small set of items, usually four, and asks only which one has the most of a property and which the least: the most positive and most negative text, or the most and least related sentence pair. Each item appears in several different sets, and its score is the share of times it was chosen as best minus the share of times it was chosen as worst. With four items, the two answers settle five of the six possible pairwise comparisons in the set. At the same total number of annotations, this method gave more reliable sentiment-intensity scores than a rating scale ([Kiritchenko and Mohammad, 2017](../references.md#kiritchenko-2017)). The finding is for that task; it does not show that best-worst scaling beats rating everywhere.

The method has already been used for African languages. The SemRel semantic-relatedness datasets, which include Afrikaans, Algerian and Moroccan Arabic, Amharic, Hausa and Kinyarwanda, were annotated by native speakers with best-worst scaling ([Ousidhoum et al., 2024](../references.md#semrel-2024)). It suits any task where you need a fine-grained score for degree rather than a category. In practice it is harder to use for long outputs, because the rater must read and keep four of them in mind at once; pilot it before committing.

## Graded relevance buckets

For relevance judgements, such as which retrieved passages answer a question, raters sort each candidate into a few ordered grades: relevant, partially relevant, irrelevant. Define each grade with an example in the guideline, as you would the points of a rating scale.

Keep "not yet judged" distinct from "judged irrelevant". Some tools export only the items a rater placed in a grade, so an item the rater never touched disappears from the record and is later read as irrelevant. Make every item land in an explicit grade, or store a separate "unjudged" value, and check an export before the main round.

## Absolute rating

Rating scales are the right tool when you need a level rather than a winner, and they appear throughout this playbook: adequacy and fluency for [translation](../machine-translation/index.md#assure-quality), naturalness MOS for [text-to-speech](../text-to-speech/index.md#evaluation), adequacy, fluency and acoustic quality for [speech-to-speech translation](../speech-to-speech-translation/index.md#evaluation), severity for [hate speech](../11_text-classification/hate-speech-analysis.md), and intensity for [emotion](../11_text-classification/emotion-analysis.md#emotion-intensity). Those pages hold the task-specific scales. Three rules apply to all of them:

- **Anchor every point.** Give each point of the scale a one-line description and an example, and show the anchors on the rating screen, not only in the guideline.
- **Rate separate criteria separately.** Ask for adequacy and fluency as two ratings, not one "overall quality" score ([van der Lee et al., 2019](../references.md#vanderlee-2019)).
- **Allow a free-text note.** Notes are where raters explain a low score, and they show problems the scale did not anticipate ([van der Lee et al., 2019](../references.md#vanderlee-2019)). Offer "cannot judge" as its own option, separate from the middle of the scale.

Where rating proves inconsistent in the pilot, a relative design can help. RankME combines relative comparison of several outputs with a continuous scale, and was found to give more reliable and consistent ratings for language generation than separate Likert ratings ([Novikova et al., 2018](../references.md#novikova-2018)).

## Judging responses in a dialogue

For a chatbot or dialogue system, a reply can be judged only in its context.

1. **Show the conversation first.** Display the conversation before the reply, read-only, before any candidate.
2. **Fix how much history raters see.** Either show the full history for every item or, for long conversations, a fixed window of the last few turns. State which in the guideline and record it in the export, because raters who see three earlier turns and raters who see ten are judging different things.
3. **Present candidates fairly.** Show the candidate replies in random order with their sources hidden, as in any comparison.

The guideline should say what a good reply does here: it answers the last turn, stays consistent with what was said earlier, matches the language and register the user chose (including code-switching), and avoids harm. Ask raters to judge the reply as a response to this conversation, not as a stand-alone text.

## Controls for every design

The same controls protect every design on this page:

- **Randomise order** of candidates within an item and of items within a batch, and record the order shown.
- **Hide identity** of the system or author, and remove tell-tale traces such as a system-specific header, signature line or output template.
- **Use the same inputs** for every system being compared.
- **Check position bias.** Because the system shown as A is random, each rater's share of "A" (first-shown) choices among non-tie ratings should sit near half. A rater far from half is choosing by position. Position bias in individual annotators is a known problem in crowdsourced ranking ([Xu et al., 2016](../references.md#xu-2016)).
- **Seed gold items** with a known answer, such as an output with a deliberate error, and check each rater against them.
- **Keep batches short.** Comparative judgements mean reading two or more outputs per item, which tires raters faster than labelling one.

The script below runs the position-bias check per rater and counts circular triads in one rater's pairwise judgements. The flagging threshold is an example; set your own in the guideline.

```python
from collections import Counter, defaultdict
from itertools import combinations

from scipy.stats import binomtest   # pip install scipy


def position_bias(ratings: list[dict], alpha: float = 0.01) -> None:
    """ratings: dicts with 'rater_id' and 'choice' in {'A', 'B', 'tie'}."""
    by_rater = defaultdict(Counter)
    for r in ratings:
        by_rater[r["rater_id"]][r["choice"]] += 1
    for rater, c in sorted(by_rater.items()):
        decided = c["A"] + c["B"]          # ties say nothing about position
        if decided == 0:
            continue
        p = binomtest(c["A"], decided, 0.5).pvalue
        flag = "  <- check this rater" if p < alpha else ""
        print(f"{rater}: {decided} decided, A chosen {c['A'] / decided:.0%}, p={p:.3f}{flag}")


def circular_triads(prefs: dict) -> list[tuple]:
    """prefs: {(x, y): winner} for one rater over one candidate set,
    with winner equal to x or y (ties left out). Returns the cycles."""
    beats = defaultdict(set)
    items = set()
    for (x, y), winner in prefs.items():
        beats[winner].add(y if winner == x else x)
        items.update((x, y))
    cycles = []
    for a, b, c in combinations(sorted(items), 3):
        if (b in beats[a] and c in beats[b] and a in beats[c]) or \
           (c in beats[a] and b in beats[c] and a in beats[b]):
            cycles.append((a, b, c))
    return cycles


position_bias([
    {"rater_id": "r-hau-07", "choice": "A"},
    {"rater_id": "r-hau-07", "choice": "B"},
    {"rater_id": "r-hau-11", "choice": "tie"},
])
print(circular_triads({("s1", "s2"): "s1", ("s2", "s3"): "s2", ("s1", "s3"): "s3"}))
# [('s1', 's2', 's3')]: s1 beats s2, s2 beats s3, but s3 beats s1
```

## Agreement and reporting

Match the agreement measure to the judgement, rather than treating every human evaluation as ordinal:

- **Pairwise winner/tie choices are nominal.** First map the displayed A/B choice to the hidden candidate identity, because the same system can appear in either position. Then use nominal kappa or Krippendorff's alpha on the resulting winner/tie categories. Comparing raw A/B labels would confuse position changes with disagreement.
- **Ordered strengths, grades and scale points are ordinal.** Use ordinal alpha or weighted kappa so a one-step miss counts less than a four-step miss (see [Data Quality](../4_data-quality/index.md#measure-inter-annotator-agreement) and, for the code, [Ordinal and continuous scales](../11_text-classification/annotation.md#ordinal-and-continuous-scales)).
- **Rankings need rank agreement.** Kendall's tau compares two rankings of the same candidate list, with the handling of ties stated. It is not a general agreement measure for independent pairwise preferences.

Report the chance-corrected figure with a confidence interval, plus raw percentage agreement, which is easy to read ([van der Lee et al., 2019](../references.md#vanderlee-2019)). State the number of usable shared items and how ties were handled.

Disagreement between raters is part of the result. On preference and quality judgements, two careful native speakers can both be right, especially across dialects and regions, so keep every rating rather than only the majority: even where you also adjudicate a final label, release the individual ratings alongside it (see [Workflow and Adjudication](./workflow-adjudication.md#resolve-disagreement-but-read-it-first)).

When you publish, report the design, the number of raters and items, how raters were recruited and which language varieties they speak, whether ties were allowed, how order was randomised, the agreement measure and its value, and the result of the position-bias check. A reader cannot judge a human evaluation without these details.

## What to keep in the export

Whatever the design, the released records should let someone re-run your analysis:

- the input, every candidate, and each candidate's hidden source;
- the order or position in which candidates were shown;
- every rater's judgement, with rater ID, strength, reason codes and note, not only the aggregate;
- an explicit value for "tie", "cannot judge" and "not yet judged", each kept distinct from a real judgement;
- the guideline version and the scale anchors used.

## Further reading

- [Preference Data](../agri-advisory/preference-data.md): a pairwise design in full, with the rater guide and weekly checks.
- [Machine Translation: Assure quality](../machine-translation/index.md#assure-quality): adequacy and fluency checks for translation data.
- [Text-to-Speech: Evaluation](../text-to-speech/index.md#evaluation): listening tests and MOS for synthesised speech.
- [ASR: Evaluation](../asr/index.md#evaluation): error rates for speech recognition, and why a human listen to a sample still matters.

