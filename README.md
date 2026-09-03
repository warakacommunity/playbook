# AfriPlaybook

**The decision framework for anyone starting an African-language NLP project — grounded in the empirical experience of Masakhane's own past projects.** An annotation-first dataset-lifecycle handbook covering data collection, annotation workforce, quality, documentation, evaluation, and community practice, for text, speech, translation, OCR, and adjacent modalities in low-resource African-language contexts.

It is not a model-tuning tutorial (see the [Hugging Face NLP Course](https://huggingface.co/learn/nlp-course) and the [Google Deep Learning Tuning Playbook](https://github.com/google-research/tuning_playbook) for those); it is what those playbooks assume has already been done. It is intended for language experts, annotators, translators, and community leads in addition to ML practitioners — see [**What this playbook is (and isn't)**](https://afriplaybook.waraka.org/introduction/scope-and-strategy) for the full scope statement and evidence base.

**Live site:** <https://afriplaybook.waraka.org/>

This is a living resource maintained by the [Masakhane](https://www.masakhane.io/) community. We welcome contributions from researchers, practitioners, students, language experts, and translators.

---

## Table of contents

- [What's in the playbook](#whats-in-the-playbook)
- [Install and run locally](#install-and-run-locally)
- [Ways to contribute](#ways-to-contribute)
- [How to contribute a chapter](#how-to-contribute-a-chapter)
- [How to translate](#how-to-translate)
- [How to write a blog post](#how-to-write-a-blog-post)
- [FAQ](#faq)
- [Reporting issues](#reporting-issues)
- [How to cite](#how-to-cite)
- [Code of conduct](#code-of-conduct)
- [License](#license)

---

## What's in the playbook

**Foundations** — the shared spine of every project:

1. **Introduction** including [scope and strategy](docs/1_introduction/scope-and-strategy.md) — the "what this playbook is (and isn't)" statement.
2. **[Before You Start](docs/before-you-start/index.md)** — per-task decision framework, resource tables, and honest cost estimates. Ships first for [NER](docs/before-you-start/ner.md); MT, ASR, sentiment, TTS, OCR to follow.
3. **Data Collection, Curation, and Governance** — `docs/2_data-collection/`
4. **Annotation Design and Workforce Management** — `docs/3_annotation-design/`
5. **Data Quality Assurance and Validation** — `docs/4_data-quality/`
6. **Community and Collaboration** — `docs/10_community-collaboration/`

**Modality tracks** — text, speech, vision, multimodal. Each task chapter cross-references its Before-You-Start page.

**Lifecycle & Release**:

7. **Evaluation, Benchmarking, and Data Integrity** — `docs/8_model-building/`
8. **Documentation, Data Release, and Governance** — `docs/6_documentation/`
9. **LLM-Assisted and Synthetic Data Generation** — `docs/7_llm-assisted-task/`
10. **Dataset Lifecycle Management and Release Checklist** — `docs/9_dataset-lifecycle/`

**[Case Studies](docs/case-studies/index.md)** — retrospectives from real Masakhane projects, answering the same seventeen questions each. The evidence base the rest of the playbook draws on.

The site is also available in **6 languages**: English, Hausa, Amharic, Swahili, French, and Portuguese (UI translated; chapter content awaits native-speaker translation).

---

## Install and run locally

The Playbook is a [Docusaurus 3](https://docusaurus.io) site. To install and preview it on your own machine:

### Requirements

- Node.js ≥ 20 ([download](https://nodejs.org))
- Yarn 1.x — install with `npm install -g yarn` if you don't have it (do **not** use npm for this project; the lockfile is yarn-managed)

### Clone, install, and run

```bash
git clone https://github.com/warakacommunity/playbook.git
cd AfriPlaybook
yarn install --frozen-lockfile
yarn start
```

Open <http://localhost:3000/> — the site reloads automatically as you edit files.

### Other useful commands

```bash
yarn start --locale fr       # preview a specific locale (en, ha, am, sw, fr, pt)
yarn build                   # full production build (all locales)
yarn build --locale en       # build a single locale (much faster)
yarn clear                   # clear the .docusaurus cache (run if you hit module-not-found errors)
yarn pdf                     # generate the downloadable PDF
yarn serve                   # serve the production build at http://localhost:3000/
```

### Repo layout (high level)

```text
docs/                        chapter content (markdown), grouped by section folder
blog/                        blog posts and announcements
i18n/<locale>/               translated UI strings + per-locale chapter content
src/pages/                   custom pages (home, /tool, /about, /roadmap, /cite, ...)
src/components/              shared React components
src/css/custom.css           global styles + theme tokens
static/                      static assets served at site root (images, manifest, ...)
docusaurus.config.js         site configuration (navbar, footer, plugins, i18n)
sidebars.js                  documentation sidebar configuration
```

For deeper contributor-side details (every plugin, repo conventions, gotchas), see [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Ways to contribute

There's no one way to help. Pick whichever matches what you do best:

- **Write a chapter or section** — fill a gap in the playbook (see below)
- **Translate** — adapt an existing chapter into Hausa, Amharic, Swahili, French, or Portuguese
- **Review** — open issues or PRs against existing chapters; correct technical errors, clarify language, suggest references
- **Add a case study** — a short post in the blog about a real-world Masakhane project
- **Open a discussion** — got questions or want to debate an approach? Use [GitHub Discussions](https://github.com/warakacommunity/playbook/discussions)
- **Report bugs / suggest features** — see [Reporting issues](#reporting-issues)

---

## How to contribute a chapter

Step-by-step guide for first-time contributors. Even if you're new to git/GitHub, you can follow this.

### Step 1 — Open an issue first (recommended)

Before you write, **open an issue** describing the chapter you want to add. This avoids two people writing the same thing and lets us help you scope it.

1. Go to <https://github.com/warakacommunity/playbook/issues/new>
2. Title: `Chapter proposal: <your topic>`
3. In the body, briefly describe:
   - What topic the chapter covers
   - Which section it fits into (e.g., "Data Quality")
   - 3–5 bullet outline of subsections
   - Languages you'll write in (English required; others welcome)

We'll respond with feedback or a 👍 to start.

### Step 2 — Fork and clone the repo

If you don't have write access to `warakacommunity/playbook`, fork it first:

1. Open <https://github.com/warakacommunity/playbook> and click **Fork** (top right).
2. Clone your fork to your computer:

   ```bash
   git clone https://github.com/<your-github-username>/AfriPlaybook.git
   cd AfriPlaybook
   ```

If you're already a maintainer with write access:

```bash
git clone https://github.com/warakacommunity/playbook.git
cd AfriPlaybook
```

### Step 3 — Set up the project locally

Requirements:

- Node.js ≥ 20 ([download](https://nodejs.org))
- Yarn 1.x — install with `npm install -g yarn` if you don't have it (do **not** use npm for this project)

Install dependencies and start the dev server:

```bash
yarn install --frozen-lockfile
yarn start
```

Open <http://localhost:3000/> — the site reloads automatically as you edit files.

### Step 4 — Create a branch

Don't commit to `main`. Make a branch named after your chapter:

```bash
git checkout -b chapter/your-topic-slug
```

### Step 5 — Add your chapter file

1. Find the section folder under `docs/` that fits your chapter (e.g., `docs/annotation-design/`).
2. Create a new markdown file. Filename should be lowercase with hyphens, e.g., `inter-annotator-agreement.md`.
3. At the top, add **frontmatter** to control the title and ordering in the sidebar:

   ```markdown
   ---
   sidebar_position: 5
   title: Inter-Annotator Agreement
   ---

   # Inter-Annotator Agreement

   Your introduction paragraph...
   ```

4. Write the chapter using regular Markdown. You can also use:
   - **Math**: `$P(y \mid x)$` inline, or `$$ ... $$` for block equations
   - **Code blocks**: triple backticks with language (e.g., ```` ```python ````)
   - **Admonitions**:

     ```markdown
     :::tip
     Native speakers should review the annotation guidelines.
     :::
     ```

     Available types: `note`, `tip`, `info`, `warning`, `danger`, `caution`.
   - **Images**: place files in a sibling `assets/` folder and reference with `![alt](./assets/image.png)`.
   - **Links to other chapters**: `[see Data Quality chapter](../data-quality/inter-annotator-agreement)`.

### Step 6 — Update the sidebar (only if needed)

Most of the time you don't need to touch this. The sidebar is auto-generated from the folder structure.

If your chapter is in a brand-new folder, also add a `_category_.json` in that folder:

```json
{
  "label": "Your Section Name",
  "position": 7,
  "link": {
    "type": "generated-index",
    "description": "Short description of what this section covers."
  }
}
```

### Step 7 — Preview locally

While `yarn start` is running, your changes appear instantly in the browser. Click through to make sure:

- Your chapter shows up in the left sidebar
- Headings render correctly
- Images load
- Links work
- Math/code/admonitions render properly

### Step 8 — Run the build (catch errors early)

Before pushing, run a full build to catch broken links or other issues that don't show in dev mode:

```bash
yarn build
```

If it fails (especially `onBrokenLinks: "throw"`), fix the reported issues and re-run.

### Step 9 — Commit and push

```bash
git add docs/<your-section>/<your-chapter>.md
git commit -m "docs: add chapter on <your topic>"
git push origin chapter/your-topic-slug
```

### Step 10 — Open a Pull Request

1. Go to your fork on GitHub.
2. Click **Compare & pull request** (it appears after pushing a new branch).
3. Set:
   - **Base repository**: `warakacommunity/playbook`, branch `main`
   - **Head**: your fork, branch `chapter/your-topic-slug`
4. Title: `docs: add chapter on <your topic>`
5. Body — answer briefly:
   - What the chapter adds
   - Any open questions you have for reviewers
   - Reference the issue from Step 1 (e.g., `Closes #42`)
6. Click **Create pull request**.

A maintainer will review, suggest edits, and merge once it's ready.

### What happens after merge

Your chapter is live at <https://afriplaybook.waraka.org/...> within ~5 minutes (CI rebuilds and deploys all 6 locales).

---

## How to translate

The site has UI translated into 6 languages. Chapter **content** is currently English placeholder text in each locale folder. To translate a chapter:

1. Set up locally (Steps 2–4 above).
2. Find the matching markdown file under `i18n/<locale>/docusaurus-plugin-content-docs/current/`. For example, to translate `docs/annotation-design/training_guidlines.md` into Hausa, edit:
   `i18n/ha/docusaurus-plugin-content-docs/current/annotation-design/training_guidlines.md`
3. **Edit the file in place** — same filename, translated content. Do not rename or move it.
4. Preview your translation: `yarn start --locale ha` (or your locale).
5. Commit, push, open a PR (Steps 9–10 above), title it `i18n(ha): translate Annotation Training Guidelines` etc.

Locale codes: `ha` (Hausa), `am` (Amharic), `sw` (Swahili), `fr` (French), `pt` (Portuguese).

---

## How to write a blog post

Blog posts go in `blog/` (separate from chapters). Use them for announcements, calls for contribution, project milestones, and case studies.

1. Create `blog/YYYY-MM-DD-your-slug/index.md`.
2. Frontmatter:

   ```yaml
   ---
   slug: your-post-slug
   title: "Your post title"
   authors: [shamsuddeen]
   tags: [announcement]
   image: /img/blog/your-thumbnail.png
   ---

   Intro paragraph (this is what shows on the blog index card).

   <!-- truncate -->

   Rest of the post...
   ```

3. To add yourself as an author, edit `blog/authors.yml` and add an entry with your name, GitHub URL, and image (the simplest is `https://github.com/<your-username>.png`).
4. Drop a thumbnail at `static/img/blog/your-thumbnail.png` (recommended size: 1200×675).
5. Preview, commit, push, PR (same flow as chapters).

---

## FAQ

Quick answers to the questions we hear most. The full version with more detail lives at [**afriplaybook.waraka.org/faq**](https://afriplaybook.waraka.org/faq).

### Is the Playbook free to use?

Yes — entirely. Playbook content is community-maintained and openly licensed; the Masakhane Tool annotation platform is **Apache 2.0**. No closed version, no paid tier, no commercial fork.

### Can I contribute a chapter?

Yes. Open an issue with a brief outline first, then write your chapter and open a PR. See [How to contribute a chapter](#how-to-contribute-a-chapter) above for the step-by-step.

### How do I cite the Playbook?

Every chapter page has a "Cite this page" link. The dedicated [`/cite`](https://afriplaybook.waraka.org/cite) page provides BibTeX, APA, MLA, Chicago, and a machine-readable [`CITATION.cff`](CITATION.cff). See also [How to cite](#how-to-cite) below.

### Is the Masakhane Tool deployable on-prem?

Yes. Apache 2.0 licensed, ships as a Progressive Web App. Self-host on any server, install on a phone for offline-first work, or deploy inside an institutional network. Pilots are running at Bayero University and Bahir Dar University ICT4D.

### Which African languages are supported?

The site UI is translated into 6 languages (English, Hausa, Amharic, Swahili, French, Portuguese) with chapter content gradually following. The Tool supports any African language and script through Unicode, with virtual keyboards and RTL handling where applicable.

### How can I get involved?

5 minutes: star the repo or join Discord. 30 minutes: fix a typo via "Edit this page". A few hours: write a [blog post case study](#how-to-write-a-blog-post). A few weeks: lead a chapter — see the open [Call for Chapter Development Proposals](https://afriplaybook.waraka.org/blog/call-for-chapters-afriplaybook).

### What's the difference between the Playbook and the Masakhane Tool?

They're complementary, not competing. The Playbook is a **guide** you read; the Tool is a **piece of software** you run. Both are open from day one and were designed together.

For more questions and longer answers, see the [full FAQ page](https://afriplaybook.waraka.org/faq).

---

## Reporting issues

- **Bug in a chapter** (typo, broken link, wrong information): open a [new issue](https://github.com/warakacommunity/playbook/issues/new) with the URL of the page and what's wrong.
- **Feature request**: open an issue describing what you'd like and why.
- **Question**: prefer [GitHub Discussions](https://github.com/warakacommunity/playbook/discussions) for open-ended questions.

---

## How to cite

If you use AfriPlaybook in your research, teaching, or work, please cite it.

**BibTeX:**

```bibtex
@misc{afriplaybook2026,
  author       = {{Masakhane Community}},
  title        = {AfriPlaybook: A Practical Guide for Building NLP Systems for African Languages},
  year         = {2026},
  publisher    = {Masakhane},
  url          = {https://afriplaybook.waraka.org/},
  note         = {Open-source community resource}
}
```

**Other formats**: GitHub auto-renders a **"Cite this repository"** button in the right sidebar of this repo (powered by [`CITATION.cff`](CITATION.cff)). Click it for APA, MLA, Chicago, and other formats.

If you cite a specific chapter, include the chapter title and the URL of the chapter page.

---

## Code of conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/). Be respectful, especially across language and cultural boundaries — that's the whole point of the Playbook.

---

## License

The Playbook content is shared under the same terms as the Masakhane community. Code is licensed per the project's `LICENSE` file (if present) or follows Docusaurus' MIT license by default. If you contribute, you agree your contribution is shared on the same terms.

---

## Acknowledgements

Built by the Masakhane NLP community. Powered by [Docusaurus](https://docusaurus.io/). Search by [Algolia DocSearch](https://docsearch.algolia.com/). Comments by [giscus](https://giscus.app/).
