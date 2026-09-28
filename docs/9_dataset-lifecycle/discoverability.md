---
title: Identifiers, Versions, and Catalogues
sidebar_position: 3
ready: true
last_update:
  date: 2026-09-28
  author: Shamsuddeen Hassan Muhammad
---

# Identifiers, Versions, and Catalogues

A dataset nobody can find, cite, or pin to a version might as well not exist. This page covers the small set of habits that make a released dataset findable and citable for years: a persistent identifier, a versioning rule, metadata that machines can read, listings in the catalogues African-language researchers search, and a way to track who uses it.

## Persistent identifiers

A URL points to a place. A DOI (Digital Object Identifier) points to a thing. When your lab moves its website or a student's Google Drive is deleted, the URL dies and every paper that linked to it points at nothing. A DOI survives because it is a name registered with an agency (for datasets, usually [DataCite](https://datacite.org/)) and resolved through doi.org. You update the record when the data moves, and old citations keep working.

You have three practical ways to mint one:

- **Zenodo.** Run by CERN and open to anyone. You register, upload, fill in the form, and publish, and the record gets a DataCite DOI. The [limit is 50 GB per record](https://about.zenodo.org/policies/), and records are kept for the lifetime of the repository. You can reserve the DOI before publishing, so it can appear in the paper first. This is the right default for a community project without institutional backing.
- **DataCite through your institution.** Universities and national libraries that are [DataCite members](https://datacite.org/create-dois/) register DOIs directly in DataCite Fabrica. Ask your library. The DOI then carries your institution's prefix and sits in its repository.
- **Dataverse.** Many university repositories run Dataverse. A dataset there [gets a DOI when you publish it](https://guides.dataverse.org/en/latest/user/dataset-management.html), and the software enforces major and minor versions.

Zenodo gives you two DOIs. A **version DOI** points at one release. A **concept DOI** [represents all versions](https://support.zenodo.org/help/en-gb/1-upload-deposit/97-what-is-doi-versioning) and resolves to the latest. Put the concept DOI in the README. Ask people who report results to cite the version DOI, because that one still describes the exact files they used after you release a fix.

A DOI record is only as useful as its metadata. Fill in every field the Zenodo form offers: resource type (dataset), a title that names the languages, all creators with ORCID iDs, a description that repeats the key facts from the dataset card, the licence, keywords that include language names and ISO codes, the publisher, and the funder. Search engines and DataCite Commons read this record, not your README.

## Versioning for datasets

Software uses [semantic versioning](https://semver.org/): MAJOR.MINOR.PATCH, where major means incompatible change, minor means added functionality, and patch means a compatible fix. Data needs a translation of those words. Here is the one we use.

- **Major (2.0.0):** anything that changes what a result on the old version means. You changed the label scheme, re-split train and test, dropped a language, or fixed so many labels that scores are no longer comparable.
- **Minor (1.1.0):** you added examples, a language, or an annotation layer, and the old examples and splits are untouched. Old results stand.
- **Patch (1.0.1):** you fixed typos in the card, corrected a handful of wrong labels, or repaired a file encoding. A model trained on 1.0.0 and 1.0.1 should score the same within noise.

Dataverse hard-codes a version of this rule: [adding or removing files forces a major version](https://guides.dataverse.org/en/latest/user/dataset-management.html), and metadata-only edits may be minor.

On Hugging Face every dataset is a git repository, so every commit is already a revision. Make releases visible by tagging them with [`create_tag`](https://huggingface.co/docs/huggingface_hub/en/guides/repository) or the command line:

```bash
hf repos tag create ede-lab/yoruba-news-topics v1.0.0 --repo-type dataset -m "First public release"
```

Anyone can then load exactly that state, because [`load_dataset` accepts a commit SHA or a git tag](https://huggingface.co/docs/datasets/en/package_reference/loading_methods) in its `revision` argument:

```python
from datasets import load_dataset
ds = load_dataset("ede-lab/yoruba-news-topics", revision="v1.0.0")
```

Keep a `CHANGELOG.md` at the repository root with one entry per version: date, version, what changed, how many rows were affected, and whether old results are still comparable. Two lines per release is enough.

The reason for all this is reproducibility. A paper that says "we evaluate on YorùbáNews" cannot be checked a year later if the dataset has quietly changed. A paper that says "v1.0.0, DOI 10.5281/zenodo.NNNNNNN" can.

:::warning
Never overwrite a published version. Fix the error in a new patch release and note it in the changelog. The [maintenance and stewardship](./maintenance.md) page says the same, and it is the mistake we see most often.
:::

## Machine-readable metadata

People find your dataset through filters and search engines, not by reading prose. Three layers of structured metadata do the work.

### The dataset card front matter

The YAML block at the top of a Hugging Face `README.md` drives the [filters on the datasets page](https://huggingface.co/docs/hub/en/datasets-cards). The Hub [lists both two-letter and three-letter codes](https://huggingface.co/languages) for languages that have both (`yo` and `yor`); pick one and use it consistently, and put a BCP 47 tag in `language_details` when variety or script matters. `license` must be an identifier from the [Hub's licence list](https://huggingface.co/docs/hub/en/repositories-licenses), or `other` with `license_name` and `license_link`. `size_categories` uses fixed buckets (`n<1K`, `1K<n<10K`, `10K<n<100K`, and so on). If you link the paper, the Hub extracts the arXiv ID and adds it as a tag.

```yaml title="README.md (fictional dataset)"
---
pretty_name: YorùbáNews Topics
language:
  - yo
language_details: yo-NG
license: cc-by-4.0
task_categories:
  - text-classification
task_ids:
  - topic-classification
annotations_creators:
  - expert-generated
language_creators:
  - found
multilinguality:
  - monolingual
size_categories:
  - 1K<n<10K
source_datasets:
  - original
tags:
  - news
  - african-languages
  - yoruba
configs:
  - config_name: default
    data_files:
      - split: train
        path: data/train.jsonl
      - split: validation
        path: data/validation.jsonl
      - split: test
        path: data/test.jsonl
---
```

### Croissant

[Croissant](https://docs.mlcommons.org/croissant/) is a JSON-LD vocabulary from MLCommons, built on schema.org, that describes a dataset's files, record structure, and ML semantics in one document ([Akhtar et al., 2024](../references.md#akhtar-2024)). You rarely write it yourself. The Hub [generates it automatically](https://huggingface.co/docs/dataset-viewer/en/croissant) for every dataset it can convert to Parquet and serves it at `https://huggingface.co/api/datasets/<owner>/<name>/croissant`. Kaggle and OpenML also emit it. What you control is the source: good front matter and a clean file layout produce good Croissant.

### schema.org for Google Dataset Search

Google Dataset Search indexes pages that carry [schema.org `Dataset` markup](https://developers.google.com/search/docs/appearance/structured-data/dataset) in JSON-LD. Only `name` and `description` are required, but `creator`, `license`, `identifier` (your DOI), `distribution`, `keywords`, `version`, and `citation` make the result useful. Hugging Face and Zenodo are already indexed, so data there gets this for free. If you host your own landing page, add the markup, check it with Google's Rich Results Test, and submit a sitemap in Search Console.

### FAIR in one paragraph

The FAIR principles ([Wilkinson et al., 2016](../references.md#wilkinson-2016)) ask that data be Findable, Accessible, Interoperable, and Reusable. For our datasets this means a DOI and rich metadata (findable), an open repository with a stated licence (accessible), standard formats and language codes (interoperable), and a dataset card that records provenance and limitations (reusable).

## Catalogues and registries

A dataset that lives only in your repository is found only by people who already know your name. List it where African-language researchers look. All of these were checked on 28 September 2026.

- **[Lanfrica](https://lanfrica.com/)** ([Lanfrica](../references.md#lanfrica)) catalogues African datasets, models, papers, and policies in its African AI Atlas. It began as a participatory index of MT research ([Emezue and Dossou, 2020](../references.md#emezue-dossou-2020)). Reach the team through the [contribute page](https://lanfrica.com/en/contribute), its Discord, or `info@lanfrica.com`. A listing puts your dataset next to every other resource for the same language.
- **[Masakhane list of datasets](https://github.com/masakhane-io/masakhane-community/blob/master/list-of-datasets.md)** is a Markdown file in the `masakhane-community` GitHub repository, organised by task. Open a pull request that adds a line. The people who read it are the ones most likely to reuse your data.
- **[Hugging Face collections](https://huggingface.co/docs/hub/en/collections)** group datasets, models, papers, and Spaces on one public page, including repositories you do not own. Create one for your project and ask the maintainers of language or community collections to add you.
- **[Google Dataset Search](https://datasetsearch.research.google.com/)** has no submission form. You are indexed when your landing page carries schema.org markup or your repository is already indexed, as Hugging Face and Zenodo are.
- **[OpenML](https://www.openml.org/)** hosts uniformly formatted, mostly tabular datasets and lets you [upload through the website or the Python API](https://docs.openml.org/concepts/data/). It exports Croissant. Consider it only if your data is a flat table with a target column.
- **Papers with Code** [shut down in July 2025](https://github.com/paperswithcode/paperswithcode-data/issues/116). Its domain redirects to Hugging Face Papers and a static snapshot lives in the [`pwc-archive`](https://huggingface.co/pwc-archive) organisation. Link your paper from the dataset card instead.
- **[ACL Anthology](https://aclanthology.org/)** indexes proceedings, not datasets. If a paper accompanies the dataset, publish it at an Anthology venue and the paper gets a stable page, a BibTeX entry, and in most cases a DOI. Authors do not submit directly; [publication chairs ingest whole proceedings](https://aclanthology.org/info/contrib/). Put the dataset DOI in the abstract so it is indexed with the paper.
- **[Zenodo communities](https://help.zenodo.org/docs/communities/about-communities/)** are curated areas for a project, institution, or conference. Any user can submit a record and the curators accept or decline it. Submit to your institution's community and to any African NLP community you belong to.

## Making the dataset citable

Decide how you want to be cited before release, and make it effortless.

**CITATION.cff.** A [`CITATION.cff`](https://citation-file-format.github.io/) file in the repository root is a small YAML file that GitHub, Zenodo, and Zotero read. GitHub shows a ["Cite this repository"](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-citation-files) button that renders it as APA and BibTeX. Four keys are required (`cff-version`, `message`, `authors`, `title`); set `type: dataset` and add `version`, `date-released`, `doi`, and `license`. If you would rather people cite the paper, put it in `preferred-citation`.

```yaml title="CITATION.cff (fictional dataset)"
cff-version: 1.2.0
message: "If you use this dataset, please cite it using this metadata and state the version."
type: dataset
title: "YorùbáNews Topics: a Yorùbá news topic classification dataset"
version: 1.0.0
date-released: 2026-09-01
doi: 10.5281/zenodo.0000000
license: CC-BY-4.0
url: https://huggingface.co/datasets/ede-lab/yoruba-news-topics
repository-code: https://github.com/ede-lab/yoruba-news-topics
keywords:
  - Yorùbá
  - yor
  - news
  - topic classification
authors:
  - family-names: Adéṣínà
    given-names: Fúnmi
    orcid: https://orcid.org/0000-0000-0000-0001
  - family-names: Okonkwo
    given-names: Chidi
    orcid: https://orcid.org/0000-0000-0000-0002
preferred-citation:
  type: conference-paper
  title: "YorùbáNews Topics: Building a News Classification Benchmark for Yorùbá"
  authors:
    - family-names: Adéṣínà
      given-names: Fúnmi
    - family-names: Okonkwo
      given-names: Chidi
  collection-title: "Proceedings of the 7th Workshop on African Natural Language Processing (AfricaNLP 2026)"
  year: 2026
```

**BibTeX.** Put the same information as a BibTeX entry in the dataset card under a `## Citation` heading, because that is where people copy from. Use `@dataset` for the data itself and include `version` and `doi`:

```bibtex
@dataset{adesina2026yorubanews,
  author    = {Adéṣínà, Fúnmi and Okonkwo, Chidi},
  title     = {Yorùbá{N}ews Topics: a Yorùbá news topic classification dataset},
  year      = {2026},
  version   = {1.0.0},
  publisher = {Zenodo},
  doi       = {10.5281/zenodo.0000000}
}
```

**A data or resource paper.** A short paper earns the dataset a peer-reviewed description and a citable venue. [LREC](https://lrec-conf.org/) is built for resource papers and asks authors to share the resource at submission. The [AfricaNLP workshop](https://aclanthology.org/venues/africanlp/) is in the ACL Anthology and is where the community will read it. Main ACL venues take dataset papers too.

**Ask for the version.** In the citation section, write one sentence: "Please state the version you used (for example v1.0.0) and cite the version DOI." Most people follow the instruction they are given.

## Tracking reuse

You will be asked what the dataset achieved. Have the numbers ready.

- **Hugging Face downloads.** The Hub counts [all files fetched by one IP within five minutes as one download](https://huggingface.co/docs/hub/en/datasets-download-stats), so the figure on the dataset page is a fair proxy for distinct uses. Organisations can get request-level logs through Publisher Analytics.
- **DataCite citations.** Look up your DOI in [DataCite Commons](https://commons.datacite.org/). It shows citations built from related-identifier links in DataCite and Crossref metadata, and views and downloads where the repository reports COUNTER usage. A citation appears only when the citing paper's publisher records your DOI as a reference, which is why you ask people to cite it.
- **Google Scholar alerts.** Search for the dataset paper, click "Cited by", then the envelope icon to get an [email each time a new citing paper is indexed](https://scholar.google.com/intl/en/scholar/help.html). If you have a Scholar profile, "Follow" yourself and tick "New citations to my articles".

Funders want evidence that a grant produced something people use, and a download and citation record is the clearest evidence there is. The community needs it too: the next proposal that argues African-language data is worth funding will be built from these counts. Report them honestly, including when they are small.

:::tip[Ten-minute findability checklist]

- Publish a release on Zenodo and copy the version DOI and concept DOI.
- Put both DOIs in the README, the dataset card, and `CITATION.cff`.
- Fill the front matter: `language`, `license`, `task_categories`, `size_categories`, `pretty_name`, `tags`.
- Tag the Hugging Face repository (`v1.0.0`) and add a `CHANGELOG.md`.
- Add a `## Citation` section with BibTeX and the sentence asking for the version.
- Link the paper in the card so the Hub adds the arXiv tag.
- Create a Hugging Face collection for the project.
- Open a pull request to the Masakhane list and contact Lanfrica.
- Submit the Zenodo record to your institution's community.
- Set a Google Scholar alert on the paper.

:::
