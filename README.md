# AfriPlaybook

[![Deploy](https://github.com/warakacommunity/playbook/actions/workflows/deploy.yml/badge.svg)](https://github.com/warakacommunity/playbook/actions/workflows/deploy.yml)
[![Discord](https://img.shields.io/badge/Discord-join-5865F2?logo=discord&logoColor=white)](https://discord.gg/ChNPHV2PPS)
[![Cite](https://img.shields.io/badge/Cite-CITATION.cff-blue)](CITATION.cff)
[![All Contributors](https://img.shields.io/github/all-contributors/warakacommunity/playbook?color=ee8449&style=flat)](#contributors-)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**A practical guide to building high-quality datasets for African languages.**

Read it at **<https://afriplaybook.waraka.org>**.

## What it is

The AfriPlaybook follows a dataset from first idea to public release: deciding what to collect and from whom, designing the annotation task, recruiting and paying the people who do it, checking their work, documenting the result, and publishing it so that others can build on it. It draws its examples from African projects, but most of its advice applies wherever data is scarce.

It is written for anyone who builds, or wants to build, a dataset for an African language: students, researchers, linguists, language activists, community organisers, and engineers. No background in machine learning is assumed and it is not a model-training tutorial.

The playbook is maintained by the [Waraka](https://waraka.org/) community, [Masakhane](https://www.masakhane.io/), and AfricaNLP researchers, with support from the [Masakhane African Languages Hub](https://www.masakhane.io/masakhane-african-languages-hub).

If you find a mistake in a chapter, or have an idea for the playbook, [open an issue](https://github.com/warakacommunity/playbook/issues/new) or start a [discussion](https://github.com/warakacommunity/playbook/discussions). For help, ask in [GitHub Discussions](https://github.com/warakacommunity/playbook/discussions) or on [Discord](https://discord.gg/ChNPHV2PPS).

[⬆ Back to Top](#afriplaybook)

## What's inside

- **Foundations:** [Before You Start](https://afriplaybook.waraka.org/before-you-start) (how to check for existing datasets before you build), [Project Management](https://afriplaybook.waraka.org/project-management), Data Governance, Data Collection, Annotation Design, Data Quality, and Community.
- **Task chapters** for text, speech, vision, and multimodal data.
- **Lifecycle and release:** evaluation, documentation, dataset lifecycle, deployment, cross-language transfer, long-tail languages, legal and consent questions, and training with little compute.
- **[Templates](https://afriplaybook.waraka.org/templates)** you can copy: dataset search log, project charter, consent form, annotation guidelines, dataset card, model card, and evaluation script.
- **[Case studies](https://afriplaybook.waraka.org/case-studies)** written by the people who built real datasets.
- **Appendix:** [glossary](https://afriplaybook.waraka.org/glossary), references, and a tools index.

The whole book is also available as a [PDF](https://afriplaybook.waraka.org/downloads/afriplaybook.pdf), rebuilt on every deploy. The site's interface is available in English, Hausa, Amharic, Swahili, French, and Portuguese; chapters are translated as volunteers complete them.

[⬆ Back to Top](#afriplaybook)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) · [Code of Conduct](CODE_OF_CONDUCT.md) · [How to contribute](https://afriplaybook.waraka.org/introduction/how-to-contribute)

You can help by fixing a sentence, reviewing a chapter, translating a page, adding a case study, or writing up what you learned on your own project.

### Three ways to contribute

1. **Edit on the site (easiest).** Open the online editor from the site's **Contribute** menu, sign in with GitHub, make your change, add a short note, and submit. The site opens a pull request for you. You do not need git or any setup.
2. **Edit one file on GitHub.** Find the file under [`docs/`](docs/), click the pencil icon, make your change, and click **Propose changes**. GitHub forks the repository for you.
3. **Fork and pull request.** For new chapters or changes across several files. Open an issue with a short outline first, then fork, clone, run `yarn install --frozen-lockfile` and `yarn start`, write on a branch, run `yarn build`, and open a pull request.

Full steps for all three are in [How to contribute](https://afriplaybook.waraka.org/introduction/how-to-contribute) on the site. [CONTRIBUTING.md](CONTRIBUTING.md) covers local setup and how the repository is put together.

**Translations** live under `i18n/<locale>/`. Edit the matching file in place and preview with `yarn start --locale ha` (or `am`, `sw`, `fr`, `pt`). **Blog posts** and case studies go in `blog/YYYY-MM-DD-slug/index.md` and start as `draft: true`, which keeps them off the live site until they are ready. Both are described in [CONTRIBUTING.md](CONTRIBUTING.md#common-tasks).

[⬆ Back to Top](#afriplaybook)

## Run it locally

You need [Node.js 22](https://nodejs.org) and Yarn 1.x (`npm install -g yarn`). Use Yarn, not npm: the lockfile is Yarn's.

```bash
git clone https://github.com/warakacommunity/playbook.git
cd playbook
yarn install --frozen-lockfile
yarn start
```

Open <http://localhost:3000>. The site reloads as you edit. `yarn build` runs the full production build, and `yarn build --locale en` builds English only, which is much faster. More commands and the repository layout are in [CONTRIBUTING.md](CONTRIBUTING.md).

[⬆ Back to Top](#afriplaybook)

## How to cite

```bibtex
@misc{afriplaybook2026,
  author       = {{Waraka Community}},
  title        = {AfriPlaybook: A Practical Guide to Building High-Quality Datasets for African Languages},
  year         = {2026},
  publisher    = {Waraka Community},
  url          = {https://afriplaybook.waraka.org/},
  note         = {Open-source community resource}
}
```

GitHub's **Cite this repository** button (from [CITATION.cff](CITATION.cff)) gives APA and other formats, and the site's [cite page](https://afriplaybook.waraka.org/cite) has more. If you cite a chapter, include its title and URL.

[⬆ Back to Top](#afriplaybook)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/shmuhammadd"><img src="https://avatars.githubusercontent.com/u/38854463?v=4?s=100" width="100px;" alt="Shamsuddeen Hassan Muhammad"/><br /><sub><b>Shamsuddeen Hassan Muhammad</b></sub></a><br /><a href="https://github.com/warakacommunity/playbook/commits?author=shmuhammadd" title="Code">💻</a> <a href="#content-shmuhammadd" title="Content">🖋</a> <a href="https://github.com/warakacommunity/playbook/commits?author=shmuhammadd" title="Documentation">📖</a> <a href="#maintenance-shmuhammadd" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/seyyaw"><img src="https://avatars.githubusercontent.com/u/1056051?v=4?s=100" width="100px;" alt="Seid Muhie Yimam"/><br /><sub><b>Seid Muhie Yimam</b></sub></a><br /><a href="https://github.com/warakacommunity/playbook/commits?author=seyyaw" title="Code">💻</a> <a href="#content-seyyaw" title="Content">🖋</a> <a href="https://github.com/warakacommunity/playbook/commits?author=seyyaw" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/abumafrim"><img src="https://avatars.githubusercontent.com/u/25594170?v=4?s=100" width="100px;" alt="Idris Abdulmumin"/><br /><sub><b>Idris Abdulmumin</b></sub></a><br /><a href="https://github.com/warakacommunity/playbook/commits?author=abumafrim" title="Code">💻</a> <a href="#content-abumafrim" title="Content">🖋</a> <a href="https://github.com/warakacommunity/playbook/commits?author=abumafrim" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Tadesse-Destaw"><img src="https://avatars.githubusercontent.com/u/75490713?v=4?s=100" width="100px;" alt="Tadesse Destaw Belay"/><br /><sub><b>Tadesse Destaw Belay</b></sub></a><br /><a href="https://github.com/warakacommunity/playbook/commits?author=Tadesse-Destaw" title="Code">💻</a> <a href="#content-Tadesse-Destaw" title="Content">🖋</a> <a href="https://github.com/warakacommunity/playbook/commits?author=Tadesse-Destaw" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/keduog"><img src="https://avatars.githubusercontent.com/u/104138942?v=4?s=100" width="100px;" alt="keduog"/><br /><sub><b>keduog</b></sub></a><br /><a href="https://github.com/warakacommunity/playbook/commits?author=keduog" title="Code">💻</a> <a href="#content-keduog" title="Content">🖋</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

To add someone, comment on any issue or pull request: `@all-contributors please add @username for doc, review`. Contributors also appear on the site's [Contributors page](https://afriplaybook.waraka.org/contributors).

[⬆ Back to Top](#afriplaybook)

## Acknowledgements

The AfriPlaybook is supported by the [Masakhane African Languages Hub](https://www.masakhane.io/masakhane-african-languages-hub), a pan-African initiative building open, culturally grounded datasets for African languages. We are grateful for its support.

Built in collaboration with Bayero University Kano, Bahir Dar University, [HausaNLP](https://hausanlp.org/), and [EthioNLP](https://ethionlp.github.io/).

[⬆ Back to Top](#afriplaybook)

## Code of conduct and licence

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). Be respectful, especially across language and cultural boundaries.

Everything in this repository is released under the [MIT licence](LICENSE), including the site code, the chapters, the blog posts, and the templates. Partner logos remain the property of their owners. By contributing, you agree that your contribution is released under the same licence.

[⬆ Back to Top](#afriplaybook)
