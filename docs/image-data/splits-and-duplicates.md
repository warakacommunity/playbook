---
title: Splits and near-duplicates
sidebar_position: 10
ready: true
last_update:
  date: 2026-11-24
  author: Seid Muhie Yimam
---

# Splits and near-duplicates

An image test set only measures generalisation if the model has not, in effect, already seen it. In vision this fails in two ways. The same picture can sit on both sides of the split as a resized, recompressed or slightly cropped copy. Or the test images can be new pictures of something the model already knows: the same field, the same camera, the same person, the same afternoon. Both inflate scores, and both are invisible in a random split.

The general rule is in [Data integrity](../8_model-building/data-integrity.md#prevent-train-test-leakage): deduplicate first, then split by group, and check that no group crosses the boundary. Speech applies it with speakers and prompts ([Read speech: keep speakers and prompts apart](../8_model-building/data-integrity.md#read-speech-keep-speakers-and-prompts-apart)). This page is the image and video version: how to find near-duplicate pictures, which grouping key to split on, and why video must be split by video and not by frame.

## How image splits leak

**Copies of the same picture.** Datasets pick up copies when one photo is uploaded twice, shared through a messaging app (which resizes and recompresses it), exported again after editing, or taken several times in burst mode. Even benchmark datasets carry them: a search of CIFAR found near-duplicates in the training set for 3.3% of CIFAR-10 test images and 10% of CIFAR-100 test images ([Barz and Denzler, 2020](../references.md#barz-2020)).

**Shared context.** Two different photos taken at the same site, on the same phone, by the same photographer or in the same session share background, lighting, colour cast and framing. A model can learn those cues instead of the object. Camera-trap detectors work well at the locations they were trained on and generalise poorly to new locations ([Beery et al., 2018](../references.md#beery-2018)). In the PlantVillage leaf-disease images, a classifier given only eight background pixels per image reached 49.0% test accuracy against 2.6% for chance, because the background correlated with the label ([Noyan, 2022](../references.md#noyan-2022)). A random split keeps these cues in both train and test, so the score rewards them.

**Shared subjects.** The same person, animal, plant or house photographed many times is one subject, not many independent samples. If the subject appears in both train and test, the test measures recognition of that subject.

Leakage of this kind is a known, widespread cause of results that do not reproduce, across many fields that use machine learning ([Kapoor and Narayanan, 2022](../references.md#kapoor-2022)). In African field collections the risk is higher than usual. A project often works with a handful of sites, a few enumerators and a few phone models, so every group is large.

## Find near-duplicates

Use three passes, from cheapest to most thorough:

1. **Exact copies.** Hash the file bytes (for example SHA-256). This finds identical files and costs nothing, but misses any copy that was resized or re-saved.
2. **Perceptual hashes.** A perceptual hash summarises what the picture looks like, so a resized or recompressed copy gets the same or a very similar hash. The open-source `imagehash` library offers average, perceptual, difference, wavelet, colour and crop-resistant hashes; subtracting two hashes gives their Hamming distance, the number of bits that differ ([Buchner, n.d.](../references.md#imagehash)). Perceptual hashes catch re-saved, resized and lightly edited copies. They do not reliably catch heavy crops or two shots of the same scene from slightly different angles.
3. **Embeddings.** For "same scene, different shot", compare feature vectors from a pretrained vision model and review the nearest neighbours. This is how the CIFAR duplicates were found: a nearest-neighbour search in a CNN feature space, then a person checking the pairs by hand in order of distance ([Barz and Denzler, 2020](../references.md#barz-2020)). The same idea scales to web-sized collections, where removing such semantic duplicates also cuts training cost ([Abbas et al., 2023](../references.md#abbas-2023)).

Practical points:

- **Pick the threshold from your own data.** No distance threshold is correct for every dataset; the `imagehash` documentation leaves it to the user. Hash a sample, sort pairs by distance, look at them, and set the threshold where true copies stop. Record the threshold and the hash size in the dataset card.
- **Review by hand before deleting.** Two healthy maize leaves on a plain background can look alike to a hash and still be different plants. Thresholds near the boundary produce false matches, which is why the CIFAR search checked every pair.
- **Fix orientation first.** Apply the EXIF orientation before hashing, otherwise a phone photo and its rotated copy hash differently (see [Coordinates and image orientation](./object-detection.md#coordinates-and-image-orientation)).
- **Group duplicates; do not only delete them.** Keep one copy if you want, but if you keep several (for example deliberate repeat shots), put them in one group so they land in the same split.
- **Search within the test set too.** Duplicates inside the test set count the same error twice.

## Choose the grouping key

A grouping key is the thing a model should not be allowed to recognise. Ask what the deployed model will meet that it has never seen, and split on that. Record the candidate keys at capture time; they are hard to recover later. The `collected_by` and `device` columns in the [classification](./classification.md#what-the-data-looks-like) example are grouping keys.

| Grouping key | Use it when | What leaks without it |
|---|---|---|
| Location or site (farm, village, camera trap, clinic) | The model will be used in new places | Background, soil, vegetation, building style |
| Device (phone model, camera, scanner) | Users will have other phones | Colour processing, resolution, compression, lens |
| Photographer or enumerator | New field staff will collect data | Framing habits, distance, angle, time of day |
| Session or date | The model will see new days or seasons | Lighting, weather, crop stage |
| Subject (person, animal, plant, plot) | The model must work on new individuals | The subject's own appearance |
| Source document or page | Scanned documents or forms | Paper, ink, layout, handwriting |

When the claim is "works in new districts", split by district even if the site key is finer. When several keys matter, link them: any two images that share a site or a device go to the same side, as in the speaker-and-prompt graph for read speech. If that leaves one giant group, split on the most important key and report results per value of the others. For satellite and aerial tiles, neighbouring tiles share the same ground, so split by region rather than by tile, as [Splits that respect geography](./large-imagery.md#splits-that-respect-geography) explains.

## Split video by video, not by frame

Frames from the same video are near-duplicates of each other. Splitting frames at random puts frame 100 in train and frame 101 in test, and the test score then says almost nothing. Assign whole videos to one split, and any clips or frames extracted from them follow the video.

The same rule goes one level up. Clips cut from one long recording, or several recordings of the same scene or performers, share background and people. UCF101 makes this explicit: each action class is divided into 25 groups whose clips share features such as background or actors, and the dataset's baseline uses leave-one-group-out cross-validation so that a group is never in train and test at once ([Soomro et al., 2012](../references.md#soomro-2012)). For sign language the grouping key is the signer, as [Releasing the data](../sign-language-video/sign-language.md#releasing-the-data) requires. [Long-video handling](../sign-language-video/long-video.md) covers chunking long recordings, which creates exactly this kind of related clip.

## A leakage-safe split in code

The function below hashes each image, links near-duplicates and images that share a group, and splits whole clusters. It returns the near-duplicate pairs so a person can review them. The pairwise loop is fine for a few thousand images; for larger collections use a nearest-neighbour index instead.

```python
# pip install imagehash pillow scikit-learn
from itertools import combinations
from PIL import Image, ImageOps
import imagehash
from sklearn.model_selection import GroupShuffleSplit

def leakage_safe_split(records, group_key="site_id", max_distance=8,
                       test_size=0.2, seed=0):
    """records: dicts with 'path' and a group key (site, device, session...)."""
    # Apply EXIF orientation first, so a rotated copy hashes like the original.
    hashes = [imagehash.phash(ImageOps.exif_transpose(Image.open(r["path"])))
              for r in records]

    # Union-find: images join their group, and near-duplicates join each other.
    parent = list(range(len(records)))
    def find(i):
        while parent[i] != i:
            parent[i] = parent[parent[i]]
            i = parent[i]
        return i
    first = {}
    for i, r in enumerate(records):
        parent[find(i)] = find(first.setdefault(r[group_key], i))
    pairs = []
    for i, j in combinations(range(len(records)), 2):  # O(n^2): fine for thousands
        if hashes[i] - hashes[j] <= max_distance:      # Hamming distance
            pairs.append((records[i]["path"], records[j]["path"]))
            parent[find(i)] = find(j)

    # Split whole clusters, then prove nothing crossed.
    clusters = [find(i) for i in range(len(records))]
    splitter = GroupShuffleSplit(n_splits=1, test_size=test_size, random_state=seed)
    train_idx, test_idx = next(splitter.split(records, groups=clusters))
    assert not {clusters[i] for i in train_idx} & {clusters[i] for i in test_idx}
    return [records[i] for i in train_idx], [records[i] for i in test_idx], pairs
```

Three things to know when using it. `max_distance=8` is only an example; set it from your own review as described above. `test_size` is a share of clusters, not of images, so with a few large groups the test set can end up much smaller or larger than intended; check the counts and try other seeds. And a near-duplicate that bridges two sites merges both sites into one cluster, which is correct but can surprise you, so read the `pairs` list before trusting the split.

## Record and release the split

- **Release the split, not only the recipe.** Publish a file that lists each image or video with its split and its group IDs (pseudonymous where the key identifies a person), so others evaluate on the same test set.
- **Freeze the test set.** New data goes into new groups. Adding a photo from a test-set site to training later leaks that site.
- **Document it in the dataset card.** Say which key the split uses, how near-duplicates were found (hash type, hash size, threshold, whether pairs were reviewed), how many were removed or grouped, and which keys were not controlled. The [dataset card template](../templates/dataset-card.md) has room for this under preprocessing and composition.
- **Report results per group.** Accuracy per site, device or region shows whether the model works in new conditions or only on average, the same point as the device and lighting confounds in [Image classification](./classification.md#known-limitations-to-watch-for).
- **Keep identifying keys private.** Site, photographer and subject IDs can identify people or places. Release pseudonymous IDs and handle the originals as in [Visual privacy](./visual-privacy.md).

:::warning[A random split is the default, and the default is wrong]

Many split helpers shuffle and split at random unless you give them a group. For images collected in the field, a random split almost always puts the same site, phone or photographer in both train and test. Decide the grouping key before annotation starts, and record it with every image.

:::
