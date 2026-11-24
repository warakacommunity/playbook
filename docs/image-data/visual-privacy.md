---
title: Visual privacy
sidebar_position: 9
ready: true
last_update:
  date: 2026-11-24
  author: Seid Muhie Yimam
---

# Visual privacy

A photo of a diseased cassava leaf can still identify a person. The farmer's face may be at the edge of the frame, a child may be standing behind the plant, a motorbike's number plate may be readable, and the file itself may record the exact spot where the phone stood and which phone it was. Images and video capture far more than the thing you meant to photograph, and most of that extra content is personal data.

This page covers privacy for image and video datasets: what in a frame can identify someone, how to keep it out at capture, how to strip metadata, how to redact what remains and where redaction fails, and how to decide what to release. The general rules on consent, lawful basis, access control and licensing are in [Data Governance](../data-governance/index.md) and [Legal, consent, and community IP](../legal-consent/index.md); this page applies them to pixels and files.

## What can identify someone

Faces are the obvious case, but they are not the only one. Plan for every row in this table, not just the first.

| What is in the file | Why it matters | Usual treatment |
|---|---|---|
| Faces | Identify a person directly; processed with face recognition, they become biometric data | Keep out of frame, blur or replace, or obtain consent |
| Bodies, clothing, tattoos, gait | Can identify a person even when the face is hidden | Crop, mask the whole figure, or treat as identifiable |
| Number plates and vehicle markings | Link a vehicle to its owner | Blur or mask |
| Screens, documents, ID cards, letters | Show names, phone numbers, account details, medical or school records | Mask, or drop the image |
| House numbers, shop signs, unique landmarks | Reveal where someone lives or works, especially in a small village | Mask, crop, or coarsen the location |
| Embedded metadata (EXIF, XMP, maker notes, video container tags) | Exact GPS position, time, device model, sometimes the device serial number | Strip at ingest |
| Audio track in a video | Voices, names spoken aloud, background conversations | Remove the track or treat it as speech data |

Under the GDPR, a facial image counts as biometric data only when it goes through specific technical processing that allows or confirms unique identification; ordinary photographs are not automatically in that category ([European Union, 2016](../references.md#gdpr-2016)). Do not read this as permission. A clear face is still personal data, and a dataset of faces is exactly what someone else can later run face recognition on. Check the law in every country where you collect; the [African data-protection regimes](../data-governance/index.md#the-law-that-applies-african-data-protection-regimes) and the [country reference](../legal-consent/index.md#data-protection-laws-in-africa-quick-country-reference) are the starting point.

## Keep it out at capture

The cheapest redaction is the one you never need. Write capture rules into the collector instructions and check them in the pilot:

- **Frame the subject.** Fill the frame with the leaf, the sign, the road surface or the object you are labelling. Shoot close, from an angle that excludes people, and avoid shooting towards houses, vehicles and screens.
- **Ask people to step out.** If a person must hold an object, photograph the hands only.
- **Turn off location tagging** in the camera app where you do not need coordinates. If you need location, record it as a coarse field (district, ward or grid cell) in the capture form rather than relying on the file's GPS.
- **Give collectors a drop rule.** For example: "if a face, a child, a plate or a document is clearly visible and you cannot reframe, take the photo again." State it as a rule, not as advice.

The agri-advisory case study is a worked example of these rules: collectors are told not to photograph people, and an image where a face cannot be blurred is dropped ([Field Image Capture](../agri-advisory/field-image-capture.md), [Anonymisation at ingest](../agri-advisory/quality-consent-release.md#anonymisation-at-ingest)).

### Bystanders and minors

People who walk into the frame have not agreed to anything. Treat every bystander as a person who did not consent: blur or mask them, or drop the image. Market, school, clinic and street scenes are full of bystanders, so if your task needs such scenes, budget for redaction from the start.

Children need stricter handling. Do not collect identifiable images of children unless the task requires them, the ethics review has approved it, and a parent or guardian has given consent under the applicable law. Thresholds and the rules for guardian consent are in [Contributors under the applicable age of consent](../legal-consent/index.md#contributors-under-the-applicable-age-of-consent). For incidental children in the background, the rule is simple: mask them or drop the image, and never keep a child's face in a public release on the basis of a blur check alone.

## Consent for people in images

When people are the subject (a sign-language signer, a gesture demonstrator, a portrait for a skin-condition dataset), you need explicit, informed consent that names the uses. Tell the person in plain terms:

- whether their face will be visible in the released data, or only in a restricted copy;
- that images can be copied and cannot be recalled once public (see [Withdrawal](../legal-consent/index.md#withdrawal));
- whether the data may be used to train face or person recognition, and if not, that the licence forbids it;
- how to withdraw, and what withdrawal removes.

Record visibility as its own consent choice, separate from participation, so a person can contribute to a restricted copy without agreeing to a public face. Carry that choice into the release metadata as described in [From consent record to release metadata](../legal-consent/index.md#from-consent-record-to-release-metadata), and use the [consent form template](../templates/consent-form.md). In communities where a photograph also involves the household or the community, follow [Individual vs community consent](../legal-consent/index.md#individual-vs-community-consent).

## Strip metadata at ingest

Phone photos carry EXIF and often XMP and maker-note blocks: GPS latitude and longitude, capture time, device make and model, and sometimes a serial number. Video containers carry the same kinds of fields; MP4 and QuickTime files can store location and device make and model in their own tags, and some cameras write a timed GPS track ([Harvey, 2026](../references.md#exiftool)). A photo taken at a farmer's home, with exact coordinates, identifies the home.

Do it in this order:

1. **Read what you need.** If you keep location, convert the coordinates to the coarse unit you will release, store that in your own metadata, and discard the raw values. Copy the device class or model too if you will audit coverage by device ([Representativeness audits](./representativeness.md#device-and-capture)).
2. **Apply the orientation.** Rotate the pixels according to the EXIF orientation tag before you strip it, or boxes drawn on the displayed image will point to the wrong place (see [Coordinates and image orientation](./object-detection.md#coordinates-and-image-orientation)).
3. **Strip everything else**, then verify on a sample.

```bash
# pip install pillow; ExifTool from exiftool.org
# 1. Bake orientation into the pixels (in Python, before stripping):
#    from PIL import Image, ImageOps
#    ImageOps.exif_transpose(Image.open("in.jpg")).save("oriented.jpg", quality=95)
# 2. Remove all metadata blocks from images:
exiftool -all= -overwrite_original oriented.jpg
# 3. Videos: keep only video and audio streams and drop container metadata
ffmpeg -i in.mp4 -map 0:v -map "0:a?" -map_metadata -1 -c copy out.mp4
# 4. Verify: this should print no GPS, Make, Model or SerialNumber lines
exiftool -a -G1 -s oriented.jpg out.mp4 | grep -iE "gps|make|model|serial"
```

ExifTool's own documentation warns that deleting all metadata is not guaranteed to remove everything from every file, so the verification step is not optional ([Harvey, 2026](../references.md#exiftool)). Run it on a sample of every batch and on every file type your collectors produce. File names can leak too: rename files to opaque IDs, because a phone's file name often contains the capture date and time.

## Redaction methods and their limits

Once metadata is gone, the remaining risk is in the pixels. The usual pipeline is: detect faces, plates and other targets automatically, redact them, then have a person check a sample, and every image the detector flagged as containing people.

| Method | What it does | Limit |
|---|---|---|
| Gaussian blur | Smooths the region | A trained model can still recognise what weak blur hides; the outline, hair and clothing remain |
| Pixelation (mosaic) | Replaces the region with large blocks | Same weakness as blur at small block sizes |
| Solid mask | Fills the region with a flat colour | Strongest for the masked area; the outline and context remain |
| Synthetic replacement | Generates a new face or body in place of the real one | Keeps the image natural for training; the result can look real, so document it and never present it as genuine |
| Crop or drop | Removes the person from the dataset | Loses data; the safest choice for children and sensitive scenes |

Three findings set the limits of what redaction can promise:

- **Detectors miss things.** Even a system built for this at scale, the one that blurs faces and plates in street-level imagery, reported blurring more than 89% of faces and 94–96% of plates in its evaluation sets, and its authors found that off-the-shelf face detectors alone did not reach the recall they needed ([Frome et al., 2009](../references.md#frome-2009)). Automatic redaction needs a human check, and it should be tuned for recall: a false alarm costs a little blur, a miss exposes a person.
- **Weak obfuscation can be defeated.** Neural networks trained on mosaiced or blurred images recognised faces and objects despite the obfuscation ([McPherson et al., 2016](../references.md#mcpherson-2016)). Use strong blur or solid masks, and mask the whole head rather than a tight box around the eyes.
- **People are recognisable without faces.** With only a handful of tagged images of a person, a recognition system could identify them from body, clothing and context even when their head was obfuscated ([Oh et al., 2016](../references.md#oh-2016)). For high-risk subjects, mask or replace the whole figure; full-body synthetic replacement exists for this purpose ([Hukkelås and Lindseth, 2023](../references.md#hukkelas-2023)).

Screens and documents need their own pass, because face and plate detectors do not look for them. A text detector can flag readable text in the frame for a person to review, and collectors can be asked to tick a box when a screen or document is in shot.

## Redact for training, or only for release?

Redaction need not hurt every task. On ImageNet, where most people appear incidentally, obfuscating faces reduced overall recognition accuracy by no more than 1.0% across the models tested, and features learned from the obfuscated images transferred about as well to other tasks ([Yang et al., 2022](../references.md#yang-2022)). For object, crop, road or scene tasks, redact once at ingest and let annotators and models work only on the redacted copy.

Some tasks need the face. Sign language uses facial expression and mouthing as grammar, and gesture and emotion data lose their signal when faces are blurred (see [Releasing the data](../sign-language-video/sign-language.md#releasing-the-data) and [Gesture](../sign-language-video/gesture.md)). For these, the person is the data: rely on consent rather than redaction, keep unredacted files in a restricted copy with the controls in [Securing data during annotation](../data-governance/index.md#securing-data-during-annotation), and decide release separately. Releasing pose keypoints instead of video lowers the risk but does not remove it, because movement can still identify a person.

## Video

Video adds three problems. A face redacted in one frame may be clear in the next, because detectors miss frames during motion, turning and occlusion; track each redacted region across frames and check the frames between detections, not just keyframes. A long clip can expose much more than any single frame: a route, a routine, the inside of a home. And the audio track records voices and names. Remove the audio when the task does not need it; when it does, treat it as speech data under [Personally identifiable information](../data-governance/index.md#personally-identifiable-information). Large video collections built with consenting participants pair consent with de-identification procedures where relevant ([Grauman et al., 2022](../references.md#grauman-2022)); plan both together.

## Release decisions

Decide the release tier per image or per subset, from the consent records and the redaction checks, not once for the whole dataset.

| Situation | Release |
|---|---|
| No people, metadata stripped, no readable text or plates | Open release |
| Incidental people redacted and checked, metadata stripped | Open release, with the redaction method stated in the dataset card |
| Identifiable subjects who consented to public visibility | Open release under terms that forbid identifying or tracking people |
| Identifiable subjects who consented only to research use | Gated or restricted access, see [Who has access](../data-governance/index.md#who-has-access) |
| Children, health, religious or politically sensitive scenes | Default to not releasing; see [Sensitive and restricted content](../data-governance/index.md#sensitive-and-restricted-content) |
| Redaction failed, or consent cannot be traced | Drop the image |

Document in the [dataset card](../templates/dataset-card.md) what was redacted, by which method, how it was checked and on what sample, what metadata was removed, how location was coarsened, and which subsets are restricted. Withdrawn and retracted image datasets keep circulating through copies and derivatives ([Peng et al., 2021](../references.md#peng-2021)), so the time to decide is before the first release, not after.

## Checklist

- [ ] Capture rules keep people, children, plates, screens and documents out of frame, with a drop rule.
- [ ] Location tagging is off, or coordinates are coarsened and the raw values discarded.
- [ ] Orientation is applied to the pixels before metadata is stripped.
- [ ] All metadata is stripped and the result verified on every batch and file type; files are renamed to opaque IDs.
- [ ] Faces, plates, bystanders and readable text are detected, redacted, and checked by a person.
- [ ] Video redaction is checked across frames, and the audio track is removed or treated as speech data.
- [ ] Visibility is a separate consent choice and travels with each image.
- [ ] Each subset has a release tier, and the dataset card states the redaction and metadata treatment.

## Further reading

- [Frome et al. (2009)](../references.md#frome-2009): automatic face and plate blurring at scale, and why detector recall is the hard part.
- [Oh et al. (2016)](../references.md#oh-2016) and [McPherson et al. (2016)](../references.md#mcpherson-2016): why blurring a face is not the same as anonymising a person.
- [Yang et al. (2022)](../references.md#yang-2022): what face obfuscation costs a large image dataset.
- [Data Governance](../data-governance/index.md) and [Legal, consent, and community IP](../legal-consent/index.md): the rules this page applies.
