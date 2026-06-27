---
title: Image classification
sidebar_position: 2
---

# Image classification

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
