# Contributing to AfriPlaybook

This file covers local setup and how the repository is put together. For the three ways to contribute (edit on the site, edit one file on GitHub, or fork and open a pull request), see [How to contribute](https://afriplaybook.waraka.org/introduction/how-to-contribute) on the site.

## Run the site locally

You need Node.js 22 and [Yarn 1.x](https://classic.yarnpkg.com). Use Yarn, not npm: the lockfile is Yarn's.

```bash
git clone https://github.com/warakacommunity/playbook.git
cd playbook
yarn install --frozen-lockfile
yarn start
```

The site runs at <http://localhost:3000/> and reloads as you edit.

```bash
yarn start --locale ha   # preview a translation (ha, am, sw, fr, pt)
yarn build --locale en   # production build, English only (fast)
yarn build               # production build, all six locales (what CI runs)
yarn pdf                 # build the PDF into build/downloads/afriplaybook.pdf
```

The first `yarn pdf` downloads Chromium (about 150 MB).

## Common tasks

### Write or edit a chapter

Chapters are Markdown files under `docs/<section>/`. Edit the file, preview with `yarn start`, and check `yarn build` passes with no broken links.

A chapter goes live only when its front matter has `ready: true`. Without it the page still builds, but the site shows it as in development. Set `ready: true` when the chapter is finished and reviewed.

New pages must be added to `sidebars.js`, which lists the sidebar by hand. Templates live in `docs/templates/` and are placed in the sidebar under the chapter that uses them (see the `templateDoc` and `templateRef` helpers at the top of `sidebars.js`).

Math works in any chapter: `$inline$` or `$$block$$` LaTeX.

### Translate a page

Translated copies live under `i18n/<locale>/docusaurus-plugin-content-docs/current/`, mirroring `docs/`. Edit the matching file in place (do not rename it) and preview with `yarn start --locale <locale>`. Most translated copies are still English text waiting for a native speaker.

Navbar, footer, and other interface strings live in `i18n/<locale>/code.json` and `i18n/<locale>/docusaurus-theme-classic/`.

### Write a blog post or case study

Save it as `blog/YYYY-MM-DD-your-slug/index.md`:

```yaml
---
slug: your-post-slug
title: "Your post title"
authors: [shamsuddeen]
tags: [announcement]
image: /img/blog/your-cover.png
draft: true
---

Intro paragraph.

<!-- truncate -->

Rest of the post.
```

Keep `draft: true` while you write; drafts show in `yarn start` but not on the live site. Set it to `false` to publish. To add yourself as an author, edit `blog/authors.yml`.

## How the site is built

Pushes to `main` run `.github/workflows/deploy.yml`, which builds all six locales, regenerates the PDF, and publishes to GitHub Pages at <https://afriplaybook.waraka.org/>. It takes about five minutes.

Search is Algolia DocSearch with an AI assistant (Algolia Agent Studio). Credentials come from repository secrets (`ALGOLIA_APP_ID`, `ALGOLIA_API_KEY`, `ALGOLIA_INDEX_NAME`, `ALGOLIA_AGENT_ID`). Without them, as in a local build, the site falls back to offline search.

Comments at the end of each chapter use [giscus](https://giscus.app) backed by GitHub Discussions (`src/components/Comments.jsx`).

## Repository layout

```
docs/                          Chapters, one folder per section; templates in docs/templates/
blog/                          Blog posts, authors.yml, tags.yml
i18n/<locale>/                 Translated copies of docs, blog, and interface strings
src/
  components/                  React components (comments, editor, supporters band, contributors)
  css/custom.css               Site styles, including print rules for the PDF
  theme/                       Customised Docusaurus components (navbar, footer, TOC, doc layout)
static/                        Images, covers, downloads, PWA manifest
scripts/                       Build helpers (last-update dates, PDF check, i18n strings)
docusaurus.config.js           Main configuration
sidebars.js                    Sidebar, written by hand
.github/workflows/deploy.yml   CI: build, PDF, deploy
```

## Gotchas

- All `@docusaurus/*` packages must be on the same version (currently 3.10.2).
- Use Yarn. The repo pins `webpackbar` through Yarn `resolutions`; npm ignores them and installs a version that crashes the build.
- If the dev server shows "Can't resolve @theme/..." after a config change, restart `yarn start`.
