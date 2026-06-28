---
sidebar_position: 3
---

# How to Contribute

You do not need to be an NLP researcher, and you do not need to write a whole chapter. Fixing a typo, sharing what worked on a real project, or translating a page all count. This page walks you through every way to contribute, from a one-line fix to a full chapter, step by step.

## Ways to contribute

- **Fix or improve a page** — correct an error, clarify a sentence, add a missing reference.
- **Write a chapter or section** — fill a gap the playbook does not yet cover.
- **Share a case study** — what you did on a real project, including what went wrong.
- **Add an example** — a real, verifiable dataset or paper that illustrates a point.
- **Translate a page** — into Hausa, Amharic, Swahili, French, Portuguese, or another language.
- **Open a discussion** — ask a question or challenge an approach. Disagreement makes the guide better.

Everything lives in one repository: [github.com/warakacommunity/AfriPlaybook](https://github.com/warakacommunity/AfriPlaybook).

## Pick the path that fits your change

There are three ways to make a change, from the quickest to the most hands-on. Choose by how big your change is, not by how experienced you are.

| If you want to… | Use… | Needs |
|------|------|-------|
| Fix or edit text on a page | **The online editor** (below) | A GitHub account |
| Make a small change to one file | **GitHub's web editor** | A GitHub account |
| Add a chapter or change several files | **Fork and pull request** | Git on your computer |

---

## Path 1 — Edit on the site (easiest)

Best for fixing typos, rewording a sentence, or adding a link. You never leave the browser.

1. Open the page you want to change.
2. Click **Suggest an edit** (or open the [online editor](https://community.waraka.ai/contribute-online) directly).
3. Sign in with GitHub when prompted — this lets us credit your work and open the change under your name.
4. Make your edit in the editor.
5. Add a short note describing what you changed, then submit.

The site opens a pull request for you automatically. A maintainer reviews it and merges. That is the whole process — no git, no setup.

## Path 2 — Edit one file on GitHub

Best for a small change when you would rather work on GitHub directly.

1. Find the file in the repository. Chapters live under [`docs/`](https://github.com/warakacommunity/AfriPlaybook/tree/main/docs).
2. Click the **pencil icon** (Edit this file) at the top right of the file.
3. Make your change. GitHub creates a fork for you if you do not have write access.
4. At the bottom, write a short description and click **Propose changes**.
5. Click **Create pull request**.

## Path 3 — Fork and pull request (for chapters and larger changes)

Best for adding a new chapter or editing several files at once. This needs [git](https://git-scm.com/) and [Node.js 18+](https://nodejs.org/) on your computer. Even if you are new to git, you can follow these steps.

### Step 1 — Open an issue first

Before writing a chapter, [open an issue](https://github.com/warakacommunity/AfriPlaybook/issues/new) describing what you plan to add. This avoids two people writing the same thing and lets maintainers point you in the right direction.

### Step 2 — Fork and clone

Open [the repository](https://github.com/warakacommunity/AfriPlaybook) and click **Fork** (top right). Then clone your fork:

```bash
git clone https://github.com/<your-username>/AfriPlaybook.git
cd AfriPlaybook
```

### Step 3 — Install and run locally

```bash
npm install      # Node 18+ required
npm start        # opens a live preview at http://localhost:3000
```

The preview reloads as you edit, so you can see your change immediately.

### Step 4 — Create a branch

Never work on `main` directly. Create a branch named for your change:

```bash
git checkout -b chapter/your-topic-slug
```

### Step 5 — Add or edit your content

Chapters are Markdown files under `docs/`, grouped into folders by topic. To add a page, create a new `.md` file in the right folder and start it with frontmatter:

```markdown
---
sidebar_position: 3
---

# Your Chapter Title

Your content here.
```

`sidebar_position` controls where the page appears in the sidebar. Pick the number for the slot you want, and bump the pages after it if needed.

### Step 6 — The sidebar updates itself

The sidebar is generated automatically from the folder structure and each page's `sidebar_position`, so there is nothing extra to edit. To rename a folder's label, edit its `_category_.json`.

### Step 7 — Preview your change

Check your page in the running preview (`http://localhost:3000`). Read it on a narrow window too — most contributors read on a phone.

### Step 8 — Run the build

This catches broken links and other errors before you open a pull request:

```bash
npm run build
```

Fix anything it flags. A clean build is the main thing reviewers check for.

### Step 9 — Commit and push

```bash
git add .
git commit -m "Add chapter on <your topic>"
git push origin chapter/your-topic-slug
```

### Step 10 — Open a pull request

1. Go to your fork on GitHub and click **Compare & pull request**.
2. Write a short description of what you added and why. Link the issue from Step 1.
3. Click **Create pull request**.

A maintainer will review it, suggest any changes, and merge it once it is ready.

## Writing guidelines

A few things every contribution should follow:

- **Write plainly.** Short sentences, active voice, one idea per paragraph. Explain jargon the first time you use it.
- **Cite real sources.** Every claim and example must point to a real, verifiable paper, dataset, or project — never an invented or unchecked citation.

For how to structure a page, add sections and subsections, and use the colored callout boxes — in **Markdown or Word** — see [How to Write the Document](./how-to-write). For the full style rules and deeper repository details, see [CONTRIBUTING.md](https://github.com/warakacommunity/AfriPlaybook/blob/main/CONTRIBUTING.md).

## Translating a page

Translations are community-maintained. Use the language switcher in the top-right of the navbar to see which languages exist, and see [CONTRIBUTING.md](https://github.com/warakacommunity/AfriPlaybook/blob/main/CONTRIBUTING.md) for how the translation files are organised.

## Get help

- **Questions or ideas:** [GitHub Discussions](https://github.com/warakacommunity/AfriPlaybook/discussions)
- **Chat with the community:** [Discord](https://discord.gg/ChNPHV2PPS)
- **Found a bug:** [open an issue](https://github.com/warakacommunity/AfriPlaybook/issues/new)

