---
title: Hosting and Preservation
sidebar_position: 2
ready: true
last_update:
  date: 2026-09-28
  author: Shamsuddeen Hassan Muhammad
---

# Hosting and Preservation

A dataset is finished when someone else can download it, five years from now, and get the same bytes you released. Where you put the files decides that. This section covers how to pick a home, why you need two of them, how to package the files, how to restrict access without hiding the data, and what hosting costs the people who will use it.

### Choosing where the data lives

A good home gives you seven things. A stable URL that does not change when your project renames itself. Versioning, so a paper can say which release it used. Access control, for data you cannot release to everyone. A licence shown on the landing page, next to the download button. Download statistics, so you can show funders and your community that the work is used. Machine-readable metadata, so catalogues such as [Lanfrica](../references.md#lanfrica) and search engines can index the dataset without a human retyping it. And longevity: someone has committed to keeping the files online after your grant ends. These are the practical face of the FAIR principles ([Wilkinson et al., 2016](../references.md#wilkinson-2016)).

No single platform does all seven well. The table compares the common choices. Figures come from each platform's own documentation as of September 2026 and will change; check the linked pages before you rely on one.

| Home | Good for | Persistent ID | Size limits | Versioning | Access control | Longevity risk |
|---|---|---|---|---|---|---|
| [Hugging Face Hub](https://huggingface.co/docs/hub/storage-limits) | Working copy people load in code; dataset viewer; discovery | Optional DOI via DataCite; a new DOI per revision, and a repo with a DOI is locked against deletion or renaming | No per-repo limit; single file up to 500 GB (under 200 GB advised); under 100k files per repo; free public storage is best-effort beyond the first few GB | Git commits, branches, tags | Public, private, or gated with access requests | Commercial company; free tier terms can change |
| [Zenodo](https://about.zenodo.org/policies/) | Archival deposit with a citable DOI | DOI for every version plus a concept DOI for all versions | 50 GB and 100 files per record; one-time increase to 200 GB on request | New version = new record and DOI; files editable only for 30 days after publishing | Open, embargoed, restricted (with access requests), or closed; metadata always public | Run by CERN; retention tied to CERN's programme, "the next 20 years at least" |
| [Dataverse](https://guides.dataverse.org/en/latest/user/dataset-management.html) | Institutional or disciplinary deposit with rich metadata | DOI on publication | Set by each installation; shown above the upload widget | Major and minor versions after publication | Restricted files with terms of access, request access, guestbooks | Depends on the hosting institution |
| [GitHub](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases) (LFS or Releases) | Code, guidelines, small text datasets | None (use Zenodo's GitHub integration for a DOI) | LFS: 2 GB per file on Free and Pro, 10 GiB free storage and bandwidth. Releases: under 2 GiB per asset, up to 1,000 assets, no total or bandwidth limit | Git tags and releases | Public or private repos | Commercial; LFS bandwidth quota runs out fast for popular data |
| Institutional repository | Meeting a university or funder mandate | Usually a DOI or Handle | Varies | Varies; often none | Usually open or closed only | Depends on the library's funding and software upgrades |
| Your own server | Full control; large or sensitive data you cannot deposit elsewhere | None unless you register one | Whatever you pay for | Only if you build it | Whatever you build | Highest: dies with the grant, the domain, or the sysadmin |

On Dataverse in Africa: the [IQSS list of installations](https://iqss.github.io/dataverse-installations/) shows one African instance, Botswana Harvard Data (dataverse.bhp.org.bw), which requires a login. [AfricaRice Dataverse](https://dataverse.harvard.edu/dataverse/africarice) is a collection inside Harvard Dataverse, not a separate installation. If your university runs Dataverse, use it. If not, do not wait for one.

:::tip
If you cannot decide, pick Hugging Face for the working copy and Zenodo for the archive. That pair covers all seven needs and costs nothing for a dataset under 50 GB.
:::

### Publish in two places

Hugging Face is where people will find and load the data. Zenodo is where it will still be in twenty years. Use both, and make each point at the other.

The pattern is simple. Push the data and the dataset card to Hugging Face and tag the release. Then deposit the same release on Zenodo as a set of archives with checksums, and publish. Zenodo gives you two DOIs: one for this version and a concept DOI that always resolves to the latest version. Put the concept DOI in the Hugging Face dataset card and in the citation block. Put the Hugging Face URL in the Zenodo record's related identifiers, with the relation `isIdenticalTo` or `isSupplementTo`. When you release version 2, repeat: new tag on Hugging Face, new version on Zenodo, and the concept DOI keeps working.

Hugging Face can mint its own DOI. That is fine for a model, but for a dataset the Zenodo deposit is the safer anchor, because the files sit in a repository whose mission is preservation and whose metadata stays public even if you later restrict the files.

Here is a worked example. Suppose you have a Hausa read-speech corpus: 120 hours of 16 kHz FLAC, about 40 GB, with a transcript for each clip. First package it (see the next section), then push.

```bash title="release.sh"
# 1. Working copy on Hugging Face (needs `pip install -U huggingface_hub` and `hf auth login`)
hf upload your-org/hausa-speech-2026 ./release . --repo-type=dataset \
  --commit-message "v1.0.0: 120h Hausa read speech"
# Tag the release so papers can cite the exact revision
python -c "from huggingface_hub import HfApi; HfApi().create_tag('your-org/hausa-speech-2026', tag='v1.0.0', repo_type='dataset')"
```

```python title="zenodo_deposit.py"
import glob, requests

TOKEN = "..."                    # personal access token with deposit:write
BASE = "https://sandbox.zenodo.org"   # test here first; switch to https://zenodo.org to publish
H = {"Authorization": f"Bearer {TOKEN}"}

r = requests.post(f"{BASE}/api/deposit/depositions", json={}, headers=H)
dep = r.json()
bucket = dep["links"]["bucket"]

for path in glob.glob("release/*"):   # 40 shards of ~1 GB, README, manifest, checksums
    with open(path, "rb") as f:
        requests.put(f"{bucket}/{path.split('/')[-1]}", data=f, headers=H).raise_for_status()

meta = {"metadata": {
    "title": "Hausa Speech 2026: 120 hours of read speech",
    "upload_type": "dataset",
    "description": "See README.md. Working copy: https://huggingface.co/datasets/your-org/hausa-speech-2026",
    "creators": [{"name": "Surname, Given", "affiliation": "Bayero University Kano"}],
    "license": "cc-by-4.0",
    "access_right": "open",
    "version": "1.0.0",
    "related_identifiers": [{
        "identifier": "https://huggingface.co/datasets/your-org/hausa-speech-2026",
        "relation": "isIdenticalTo", "resource_type": "dataset"}],
}}
requests.put(f"{BASE}/api/deposit/depositions/{dep['id']}", json=meta, headers=H).raise_for_status()
requests.post(f"{BASE}/api/deposit/depositions/{dep['id']}/actions/publish", headers=H).raise_for_status()
```

The sandbox issues test DOIs under the `10.5072` prefix; production uses `10.5281`. Run the script against the sandbox until the record looks right, then change `BASE`. Forty gigabytes fits under Zenodo's 50 GB limit, and forty 1 GB shards plus a handful of small files stays under the 100-file cap. A larger corpus needs the one-time quota increase or a split across records. The Zenodo API documentation is at [developers.zenodo.org](https://developers.zenodo.org/).

### Formats and packaging

Use formats that a reader can open in ten years without your code. For text and tables that means Parquet, JSONL, or CSV, in that order of preference for large data.

Parquet is columnar, compressed, typed, and fast to read partially. Hugging Face recommends it, the dataset viewer and the automatic [Croissant](https://huggingface.co/docs/dataset-viewer/croissant) metadata are built on it, and the same data is usually several times smaller than the JSONL it came from. JSONL is line-oriented and human-readable, which makes it the right format for the raw collection and for anything an annotator might inspect with `grep` or a text editor. CSV is fine for small tables, but it has no types, no standard for nested fields, and breaks on commas and newlines inside text. Do not ship a CSV of transcripts with free-text fields.

For audio and images, do not upload a million small files. Both Hugging Face and Zenodo count files, and a folder of 200,000 WAVs is slow to upload, slow to download, and impossible to resume. Pack them into tar shards of about 1 GB in the [WebDataset](https://huggingface.co/docs/hub/datasets-webdataset) layout: each example is a set of files sharing a prefix (`clip_000123.flac`, `clip_000123.json`), and each shard is a plain tar archive that any tool can open. Keep audio lossless (FLAC) in the archive; ship an MP3 or Opus variant separately if you want a small preview set.

Every release needs three small files at the top level:

- `README.md`: the dataset card, following the [documentation](../6_documentation/documentation.md) chapter and [Gebru et al., 2021](../references.md#gebru-2021).
- `manifest.jsonl`: one line per example with its id, shard, duration or size, speaker or source id, split, and licence. This is the index people will actually use.
- `SHA256SUMS`: a checksum for every shipped file. Generate it with `sha256sum release/* > SHA256SUMS`. A reader checks a download with `sha256sum -c SHA256SUMS`. Without it nobody can tell a truncated download from a corrupt one, or prove that the Zenodo copy and the Hugging Face copy are the same bytes.

Keep raw and processed data apart, as the [data storage](../6_documentation/data-storage.md) page lays out. Archive the raw collection once and never overwrite it. Processed releases can be regenerated from raw plus your scripts; the raw collection cannot be regenerated from anything.

### Access control done right

Some data cannot be fully open: speech from people who consented to research use only, medical text, a test set you want to keep clean. Restricting access is legitimate. Hiding the dataset is not. The metadata, the card, and the terms should always be public, so people can find the data and ask.

On Hugging Face, a [gated dataset](https://huggingface.co/docs/hub/datasets-gated) stays visible but requires a request before download. You choose automatic approval (the user agrees to your terms and gets access at once) or manual approval (you review each request). You can add fields to the form, such as affiliation, country, and intended use, and a checkbox that says "I agree to non-commercial research use only". The request text is your click-through data use agreement. Keep it short, state what is allowed and what is not, and name a contact. The Hub records who accepted and when, and you can download that report. You can revoke access at any time.

On Zenodo, set `access_right` to `restricted` and write access conditions. The record, its DOI, and its metadata stay public; the files do not. Users send an access request through the record page and you approve or refuse. Use `embargoed` with a date if the data will open later, for example after a shared task or a paper embargo. Dataverse works the same way: restricted files carry terms of access and an optional request-access button, and a guestbook can ask downloaders who they are and what they intend.

A gate is only as good as the agreement behind it. Write the data use agreement before you open the gate. The [data governance](../data-governance/index.md) chapter covers what it should say.

Hold back a private test set when you run a benchmark or shared task and want scores that models could not have trained on. Publish the train and development splits openly, publish the test inputs if the task allows, and keep the test labels on a server you control or in a closed Zenodo record. Say in the card that the labels exist, how many there are, and how to get a score. Plan for the day you release them; a test set nobody can ever check is a claim, not a benchmark. The [data integrity](../8_model-building/data-integrity.md) page covers contamination in more detail.

### Bandwidth and cost realities

Most of your users will download over a metered mobile connection or a shared university line. Design for them.

Ship a small version. A 40 GB speech corpus should come with a 1 to 2 GB subset (one shard per split, or one shard per speaker group) that someone can download in an evening and use to write and test their code. Say in the card which shard to start with. Keep shards around 1 GB so a failed download loses one shard, not the corpus, and so `hf download` and a browser can resume.

Publish sizes. State the total size and the per-shard size in the card, in gigabytes, before the download links. Nobody should discover the size from a progress bar.

Mirror when you can. A copy on a university server in Lagos or Nairobi will be faster for local users than either Hugging Face or Zenodo, and it costs the university little. Treat it as a mirror, not the home: the Zenodo DOI stays the citation, and the checksums let users verify the mirror.

Offline distribution still matters. For workshops and for partners without reliable connectivity, a copy on a USB drive, verified against `SHA256SUMS`, is a legitimate channel. Include the README and the licence on the drive.

Costs for the maintainer. At the time of writing, Hugging Face public storage for a free account is best-effort beyond the first few gigabytes; a PRO account includes up to 10 TB and offers storage grants for high-impact open work. Zenodo is free up to 50 GB per record. GitHub LFS gives 10 GiB of free bandwidth a month on Free and Pro plans, which a single popular 2 GB file exhausts after five downloads; do not host data there. A personal cloud server costs money every month for as long as the data is online, and someone has to pay it after the project ends.

:::warning[A link is not a home]
A dataset that lives only on a Google Drive link or a lab server is one lost password away from disappearing. Drive links change when the owner leaves the institution, hit quota when a dataset gets popular, and cannot be cited. Lab servers go dark when the grant ends or the domain lapses. [Luccioni et al., 2022](../references.md#luccioni-2022) show that even datasets withdrawn on purpose keep circulating without their documentation; a dataset that vanished by accident has the same problem in reverse, cited everywhere and available nowhere. Deposit a copy with a DOI before you announce the release, not after.
:::
