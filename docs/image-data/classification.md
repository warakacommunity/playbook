---
title: Image classification
sidebar_position: 2
ready: true
last_update:
  date: 2026-07-07
  author: Idris Abdulmumin
---

# Image classification

*Last reviewed: 2026-07-07.*

Image classification assigns a label, or several, to a whole image: this leaf has this disease, this land parcel is this crop, this scan is normal or not. It is the simplest vision task and often the most immediately useful in African settings, where a phone photograph and a classifier can put expert-level screening in a farmer's or a health worker's hands.

## What the data looks like

A classification dataset is images paired with labels. For African work the images usually need collecting rather than scraping, because the relevant subjects, a specific local crop disease, a regional skin condition, a particular landscape, are under-represented in existing datasets. Single-label classification gives each image one category, while multi-label allows several, which fits messy real-world photos better. The defining challenge is domain shift: a classifier trained on clean foreign images fails on photos taken on cheap phones in African field conditions, with poor lighting, cluttered backgrounds, and unfamiliar varieties. The data therefore has to be collected under the conditions the model will actually face.

The simplest format is a table pairing each image path with its label, which CSV handles well for this purely tabular case:

```text
image_path,label,collected_by,device
images/maize_0001.jpg,healthy,agronomist_02,phone
images/maize_0002.jpg,leaf_blight,agronomist_02,phone
images/maize_0003.jpg,rust,agronomist_05,phone
```

Recording the capture device alongside the label is worth the extra column here: if the model later fails, knowing which photos came from which phone is often what reveals a domain-shift problem rather than a labelling one.

## Annotation and evaluation

Labelling is choosing the category, and it is only as good as the expertise behind it: a crop-disease label needs an agronomist, a medical label a clinician, and local knowledge throughout. Write clear definitions with example images for each class, use several annotators on a shared sample to measure agreement, and watch class balance, since rare diseases or land types are often exactly the ones that matter and the ones with fewest examples. Evaluation uses accuracy, but on imbalanced data report per-class [F1](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.classification_report.html) and, for many-class problems, top-k accuracy, so that strong performance on common classes does not hide failure on rare ones.

The labeling config presents the image and a fixed set of classes, with an explicit unsure option so a doubtful photo is flagged rather than forced into a wrong class:

```xml
<View>
  <Image name="image" value="$image"/>
  <Choices name="label" toName="image" choice="single" required="true">
    <Choice value="Healthy"     hotkey="1"/>
    <Choice value="Leaf blight" hotkey="2"/>
    <Choice value="Rust"        hotkey="3"/>
    <Choice value="Unsure, needs an expert" hotkey="9"/>
  </Choices>
</View>
```

For evaluation, `classification_report` gives the per-class breakdown in one call, which is what surfaces a model coasting on the common class:

```python
from sklearn.metrics import classification_report

y_true = ["healthy", "leaf_blight", "rust", "healthy", "rust"]
y_pred = ["healthy", "leaf_blight", "healthy", "healthy", "rust"]

print(classification_report(y_true, y_pred, digits=3))
# Read the per-class F1: a rare disease scoring low is invisible in overall accuracy.
```

The point of reading the full report rather than a single accuracy figure is that the rare crop disease or skin condition, the one the screening tool exists to catch, is usually the class with the fewest examples and the lowest score, exactly what a headline accuracy hides.

## The 2026 modelling landscape

Image classification in 2026 has largely converged on a small number of workable open backbones. Fine-tuning any of them on 1,000-5,000 target-domain images produces a competitive African-context classifier for most use cases:

- **[ConvNeXt V2](https://arxiv.org/abs/2301.00808)** (Meta, 2023) — the modern successor to ResNet, MIT-licensed, strong on medical and agricultural imagery, workable on modest GPUs. The defensible default for a new classification project.
- **[EVA-02](https://arxiv.org/abs/2303.11331)** (BAAI, 2023) and **[DINOv2 / DINOv3](https://github.com/facebookresearch/dinov2)** (Meta, 2023-2025) — vision-transformer foundation models with strong transfer to downstream classification with modest fine-tuning data. DINOv3 (2025) is particularly strong on transfer to novel domains without labelled data.
- **[EfficientNet V2](https://arxiv.org/abs/2104.00298)** (Google, 2021) and **[MobileNetV4](https://arxiv.org/abs/2404.10518)** (Google, 2024) — the workable edge-deployable backbones for on-device classification (phone-based crop-disease screening, agricultural extension apps). Apache-2.0 licensed. See the [edge devices chapter](../deployment/edge-devices.md) for the on-device deployment discipline.
- **[SigLIP 2 / SigLIP-B](https://arxiv.org/abs/2502.14786)** (Google, 2025) — the CLIP-lineage joint-embedding model with strong zero-shot and few-shot classification behaviour. Useful when the classification task has few labelled examples or a growing vocabulary.
- **General MLLMs.** **[Qwen2.5-VL](https://qwenlm.github.io/blog/qwen2.5-vl/)**, **[Gemini 2.5 Flash](https://ai.google.dev/gemini-api/docs)**, **[GPT-4o](https://openai.com/index/hello-gpt-4o/)** — capable of zero-shot open-vocabulary classification from natural-language descriptions. Useful when the deployment permits a large inference call and the vocabulary is not fixed.

**Editorial opinion.** For a new African-context classification project (agriculture, health, environment), the shortest defensible path is: fine-tune ConvNeXt V2 or DINOv3 on 1,000-5,000 target-domain images collected in target conditions (same phones, same lighting, same seasons), evaluate on a held-out set collected the same way, and report per-class F1 alongside accuracy. For on-device deployment, distil to MobileNetV4 after training. For domains with few labelled examples but growing vocabulary, evaluate SigLIP 2 few-shot before committing to fine-tuning.

## What it will actually cost you

Classification is the cheapest vision modality per-record but expensive when the collection has to happen in target conditions and the labels require expertise. Rough order-of-magnitude:

- **Fine-tuning ConvNeXt V2 or DINOv3 on an existing classification corpus.** One to two person-weeks; five to twenty GPU-hours. Colab Pro is enough for most backbones at the small-image-size, small-corpus scale.
- **Building a new classification corpus** for a specific African context (2,000-10,000 images collected in target conditions). Four to nine months elapsed; three to seven person-months. Field collection is the constraint; the labelling itself is fast when the taxonomy is clear.
- **Collecting for edge-deployable classifiers** (multi-device, multi-lighting, multi-season). Add 30-100% to the collection budget for coverage across the deployment population; a corpus taken in one season, on one phone model, at one time of day produces a classifier that fails on the other combinations.
- **Evaluation-only classification sets** (500-2,000 images). Two to four months; two to four person-months.
- **Expert labelling cost.** Agronomists, clinicians, and other domain experts charge substantially more per hour than annotation-only workers. A crop-disease corpus with agronomist labels costs 3-10x per-record more than a corpus with community-member labels. Budget accordingly.

## Known limitations to watch for

- **Domain shift is the primary failure mode.** A classifier trained on clean lab photos of leaves fails on phone photos of leaves in a field. Collect in target conditions or expect the model to fail in them.
- **Class imbalance hides rare-class failure.** A screening tool exists to catch the rare disease; the rare disease is the class with fewest examples; overall accuracy hides its per-class failure. Read the per-class F1 as the honest number.
- **Expert-labelled ground truth has expert disagreement.** Two agronomists on the same leaf disagree ~10-20% of the time on which disease is present; two clinicians on the same lesion disagree ~15-30%. Report inter-expert agreement alongside model accuracy — a model that reaches inter-expert agreement has reached the ceiling of the label.
- **Device / phone / lighting confounds.** If all photos of the healthy class were taken on Phone A and all photos of the diseased class were taken on Phone B, the model learns to distinguish phones, not diseases. Rebalance across confounds during collection.
- **Seasonality and environment.** Crop diseases look different in early vs. late season; skin conditions look different in different lighting; landscape imagery looks different across dry and rainy seasons. A corpus taken at one moment does not train a year-round classifier.
- **The "unsure" label is load-bearing.** Forcing an annotator to pick a definite class from a doubtful photo teaches the model to be over-confident on doubtful test images. Preserve the unsure label through to training; discard the unsure examples from training if necessary, but do not discard the annotator's expressed uncertainty.
- **Consent and identifiability.** People, faces, and identifiable locations turn a classification corpus into personal data. Health screening corpora require the health-data-governance discipline of the [data governance chapter](../data-governance/index.md); agricultural imagery is usually safer, but photos of workers, homes, and identifiable land parcels still require thought.

## Further reading

- [ConvNeXt V2 (Woo et al., 2023)](https://arxiv.org/abs/2301.00808) — the workable modern open backbone; the defensible default for African-context fine-tuning.
- [DINOv3 (Meta, 2025)](https://github.com/facebookresearch/dinov2) — the strongest current self-supervised foundation model for transfer to novel classification domains.
- [State of CV in Africa (2024)](https://arxiv.org/abs/) — the reference survey of the field on the continent; useful for understanding where classification sits and where the open datasets are.

<details>
<summary>Additional references</summary>

- [EfficientNet V2 (Tan & Le, 2021)](https://arxiv.org/abs/2104.00298) — the edge-deployable backbone; useful for on-device classification.
- [MobileNetV4 (Qin et al., 2024)](https://arxiv.org/abs/2404.10518) — the modern on-device backbone, purpose-built for mobile deployment.
- [SigLIP 2 (Zhai et al., 2025)](https://arxiv.org/abs/2502.14786) — CLIP-lineage joint embedding with strong few-shot behaviour.
- [EVA-02 (Fang et al., 2023)](https://arxiv.org/abs/2303.11331) — vision-transformer foundation model with strong transfer.

</details>
