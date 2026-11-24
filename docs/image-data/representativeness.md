---
title: Representativeness audits
sidebar_position: 11
ready: true
last_update:
  date: 2026-11-24
  author: Seid Muhie Yimam
---

# Representativeness audits

A representativeness audit asks whether the images in a dataset cover the places, people, conditions and classes the model will meet once it is used. It is a count, not an opinion: you record what each image shows and how it was taken, tabulate it against the population you are building for, and report the gaps. The [classification](./classification.md) page names domain shift as the main way a vision model fails in African settings, and the same risk applies to [object detection](./object-detection.md) and [segmentation](./segmentation.md). This page shows how to find that shift in your own data before a model does.

The need is well documented. Of the Open Images pictures whose country could be recovered, more than 32% were from the United States and 60% from six North American and European countries, while China and India held about 1% and 2%; ImageNet was similarly skewed ([Shankar et al., 2017](../references.md#shankar-2017)). On household items photographed in homes around the world, six object-recognition systems were about 15 percentage points more accurate on items from the United States than on the same kinds of items from Somalia or Burkina Faso, and about 10% less accurate for the poorest households than for the richest ([DeVries et al., 2019](../references.md#devries-2019)). A dataset collected in Africa is not automatically free of the problem: it can still come from one city, one phone, one season or one skin-tone range.

## Start from the target population

Representativeness is always relative to something. Before counting, write down who and what the model is for: the countries, districts or agro-ecological zones; urban, peri-urban or rural settings; the crops, objects or conditions; the people who will appear in or take the photos; and the devices they will use. That description is the yardstick. A crop-disease set for smallholders in northern Nigeria does not need images from Kenya to be representative, but it does need images from the dry and rainy seasons, from cheap phones, and of the varieties farmers actually grow.

Turn the description into a coverage matrix: the dimensions that matter, crossed, with a target count per cell. The [agri-advisory case study](../agri-advisory/field-image-capture.md#planning-coverage) builds one for crop by issue family by growth stage, agreed with the domain experts before capture and tracked weekly. Check the matrix while collectors are still in the field; by delivery, a missing season or district is usually too late to fix.

## Dimensions to audit

Not every dataset needs every dimension. Pick the ones that could plausibly change what the image looks like or who the model fails, and record them per image.

| Dimension | What to record | Best source |
|---|---|---|
| Geography and setting | Country, region or district; urban or rural; indoor or outdoor | Capture form, coarsened GPS |
| People | Skin tone, apparent age band, and other attributes only where the task needs them | Self-report, or trained annotators |
| Lighting and environment | Daylight, shade, low light, flash, artificial light; season; background clutter | Capture form or annotation |
| Device and capture | Device class or model, camera resolution, compression, distance and angle | EXIF before stripping, capture form |
| Classes | Images and instances per class; per class within each other dimension | Labels |
| Contributors | Which collector or source each image came from | Ingest log |

### Geography and setting

Record location at the coarsest unit that still answers your questions, usually district or region, and decide that unit before ingest: once precise coordinates are stripped for privacy you cannot recover them. Web and stock images tend to come from cities, and a collection app that needs a constant connection quietly selects for images taken near towns, so audit urban against rural explicitly. Images from the same household, farm or street also look alike, which matters for splitting as much as for coverage (see [Splits and near-duplicates](./splits-and-duplicates.md)).

### Skin tone

When people appear in the images, skin tone is the attribute most often audited and most often missing. The Fitzpatrick scale, developed in dermatology, has six types; the Gender Shades study used it to show that two widely used face benchmarks were 79.6% and 86.2% lighter-skinned, built a benchmark of parliamentarians from Rwanda, Senegal and South Africa alongside three Nordic countries, and found commercial gender classifiers erred on up to 34.7% of darker-skinned women against at most 0.8% of lighter-skinned men ([Buolamwini and Gebru, 2018](../references.md#buolamwini-2018)). Dermatology image sets show the same skew: most images in two public sets fell in the lighter-skin range when skin tone was estimated from the pixels ([Kinyanjui et al., 2019](../references.md#kinyanjui-2019)), and a classifier trained on a set with far more light than dark skin was most accurate on skin types like those it was trained on ([Groh et al., 2021](../references.md#fitzpatrick17k-2021)).

The Monk Skin Tone (MST) scale is a 10-shade alternative released openly by Google with the sociologist Ellis Monk ([Google, 2022](../references.md#monk-scale-2022)). A study of MST annotation found that annotators can label it reliably and in line with an expert, even in difficult conditions, but that annotators from different regions held different mental models of the shades. Its authors recommend a diverse annotator pool and more annotations per image, and released a set of example images for training annotators ([Schumann et al., 2023](../references.md#schumann-2023)).

Treat skin-tone labelling as an annotation task in its own right: written guidelines with example images, a pilot, several annotators per image and an agreement score, as in [Annotation Design](../3_annotation-design/annotation-task-design.md). Recruit annotators whose own backgrounds span the range you are labelling ([Inclusive and Bias-Aware Annotation](../3_annotation-design/inclusive-bias-aware.md)). Automatic estimates from pixel colour, such as the individual typology angle used in the dermatology studies above, are a cheap first pass, but they move with lighting and white balance, so check a sample against human labels before trusting them.

:::warning[Skin tone is not ethnicity]

Audit skin tone, not race or ethnicity. Skin tone varies widely within any group, so guessing ethnicity, religion or other sensitive characteristics from a photo is unreliable, and it creates sensitive personal data that your project then has to protect. Record such an attribute only where a participant chose to give it themselves under [informed consent](../legal-consent/index.md), and handle it as [sensitive data](../data-governance/index.md#privacy-and-sensitive-data).

:::

### Lighting, season and environment

The same leaf, face or road looks different at noon, at dusk, under a fluorescent tube and in a dusty dry season. Record the lighting condition and season on the capture form, or label them during annotation, and audit them crossed with the labels. Background matters too: a model trained on leaves photographed against plain backgrounds has learned something different from one trained on leaves in a field.

### Device and capture

Phone cameras differ in resolution, colour processing, compression and lens. Record the device class or model while the metadata is still attached, before the [privacy step](./visual-privacy.md) strips it. You rarely can, or should, standardise phones across a cohort of collectors; what you can do is make sure no class is collected on only one kind of device.

### Classes and the long tail

Most real image collections have a few common classes and many rare ones, and the rare ones are often the ones that matter: the unusual disease, the uncommon species, the less frequent road hazard. Report the images and instances per class, and summarise imbalance with two numbers: the imbalance ratio (largest class count divided by smallest) and normalised entropy (1 when the planned classes are equally filled, 0 when one class takes everything). Divide by the logarithm of the number of planned classes, not only those observed, so an empty class still lowers the score, as in [Report readiness as separate measures](../4_data-quality/index.md#report-readiness-as-separate-measures). The LVIS benchmark groups categories as rare (1 to 10 training images), common (11 to 100) and frequent, and reports results for each group separately ([Gupta et al., 2019](../references.md#lvis-2019)). That grouping is a useful way to report a long-tailed dataset too.

Resampling can help a model learn rare classes. LVIS introduced repeat factor sampling, which repeats training images that contain rare categories more often in each epoch ([Gupta et al., 2019](../references.md#lvis-2019)). Resampling only reuses the images you already have, though. It cannot add variety that was never collected, and it does nothing for a test set too small to measure a rare class. The real fix is targeted collection.

## Running the audit

1. **Record attributes at capture.** Add the dimensions you chose to the capture form or the ingest metadata. Recovering them afterwards is slower and less reliable.
2. **Count single dimensions, then crossed cells.** Gaps hide in the crossings: a dataset can be balanced by region and by season and still have no rainy-season images from one region. Gender Shades saw the worst error rate, for darker-skinned women, only by crossing skin type with gender ([Buolamwini and Gebru, 2018](../references.md#buolamwini-2018)).
3. **Compare with the target.** Mark each cell as on target, thin or empty against the coverage matrix, and agree in advance what counts as thin.
4. **Look for confounds.** If one label was mostly photographed on one device, in one district or by one collector, a model can learn the device, district or collector instead of the label. Cross every capture attribute with the label.
5. **Evaluate per group.** Report model results for each audited group, not only overall, in the spirit of [Model Cards](../references.md#mitchell-2019). A per-group score needs enough test images in that group to mean anything, so size the test set by its smallest group.
6. **Repeat while collection is open.** An audit run weekly can still steer collectors; an audit run at release can only describe the gaps.

A short script covers the counting. It assumes one metadata row per image.

```python
import numpy as np
import pandas as pd

df = pd.read_csv("image_metadata.csv")  # columns: label, district, season, device_class, collector

PLANNED = ["healthy", "leaf_blight", "rust", "mosaic"]  # every class in the label set

# Single dimensions, then crossed cells (a planned class with no images stays as a 0 column)
print(df["district"].value_counts())
cells = pd.crosstab([df["district"], df["season"]], df["label"]).reindex(columns=PLANNED, fill_value=0)
THIN = 30  # an example threshold: agree your own before the audit
print("Thin or empty cells:\n", cells[(cells < THIN).any(axis=1)])

# Class imbalance: ratio and normalised entropy
counts = df["label"].value_counts().reindex(PLANNED, fill_value=0)
p = counts / counts.sum()
nz = p[p > 0]                                   # 0 log 0 counts as 0
norm_entropy = -(nz * np.log(nz)).sum() / np.log(len(PLANNED))
ratio = counts.max() / counts.min() if counts.min() > 0 else float("inf")
print(f"imbalance ratio {ratio:.1f}, normalised entropy {norm_entropy:.2f}")
print("empty classes:", list(counts[counts == 0].index))

# Confounds: share of each label by device and by collector
for col in ["device_class", "collector"]:
    print(pd.crosstab(df[col], df["label"], normalize="index").round(2))
```

### When the metadata is missing

Scraped and inherited datasets often arrive without the attributes you need. You can annotate them after the fact, as an extra labelling task with its own guidelines and agreement check, or estimate some automatically and check a sample by hand. Open audit tools exist: REVISE, for example, surfaces object-based, person-based and geography-based patterns in a visual dataset and leaves the judgement of which ones are harmful to you ([Wang et al., 2020](../references.md#revise-2020)). Whatever the method, record in the dataset card how each attribute was obtained, because self-reported, annotator-perceived and model-estimated values are not the same thing.

## Closing the gaps

- **Collect for the empty cells.** Send collectors to the missing district, season or device, or recruit participants with the missing characteristics. This is the only fix that adds real variety.
- **Reuse open data with care.** Open datasets can fill cells the season cannot, but they bring their own skew (often clean, lab-style backgrounds) and their own licences. Tag every image with its source so the audit can separate field data from seed data.
- **Rebalance training, not evaluation.** Resampling or reweighting the training set is fine; never rebalance the test set in a way that hides how the model performs on the real mix.
- **Report what you could not fix.** Some cells stay thin because a disease did not appear that year or a community declined to take part. Say so.

## Reporting in the dataset card

The audit belongs in the dataset card, under composition and collection ([Gebru et al., 2021](../references.md#gebru-2021); see the [dataset card template](../templates/dataset-card.md#2-composition) and [Documentation and Reporting](../6_documentation/documentation.md)). Include:

- the target population the dataset was built for, in a sentence or two;
- each audited dimension, with its categories and how values were obtained (capture form, self-report, annotator judgement or automatic estimate, with agreement where annotated);
- counts per category and for the crossed cells that matter, as a table, with thin and empty cells marked;
- class counts, the imbalance ratio and the rare/common/frequent grouping if the tail is long;
- confounds you found and what you did about them;
- known gaps, and the groups or conditions for which the data should not be trusted;
- per-group evaluation results if you release a baseline model.

Report people's attributes only as aggregate counts, never per image in a public release, and suppress cells small enough to identify someone. Skin tone and location tied to a face are personal data; handle them under [Data Governance](../data-governance/index.md) and [visual privacy](./visual-privacy.md).
