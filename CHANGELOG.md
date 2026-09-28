# Changelog

All notable changes to the AfriPlaybook are recorded here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html). For a playbook, the major version changes when chapters are reorganised or advice is reversed, the minor version when chapters, templates, or languages are added, and the patch version for corrections.

## [Unreleased]

### Added

- Dataset Lifecycle expanded into a full chapter on sustainability, discoverability, and reuse: a landing page, Hosting and Preservation, Identifiers, Versions, and Catalogues, and Maintenance and Stewardship, with five new references.

### Changed

- The old Maintenance page is now Maintenance and Stewardship, and the release checklist names a steward.

## [1.0.0] - 2026-09-28

First stable release of the playbook at <https://afriplaybook.waraka.org>.

### Added

- Foundations chapters: how to read and contribute, core principles, Before You Start, Project Management, Data Governance, Data Collection, Annotation Design, Data Quality, and Community.
- Task chapters for text classification, text generation, machine translation, speech recognition, text to speech, speaker diarization, speech emotion recognition, speech to speech translation, audio understanding, image data, image and text, OCR and document AI, sign language and video, and LLM-assisted data.
- Lifecycle chapters: documentation, evaluation and model building, dataset lifecycle, deployment, cross-language transfer, long-tail languages, legal and consent, and compute-poor training.
- Seven copy-ready templates: dataset search log, project charter, consent form, annotation guidelines, dataset card, model card, and evaluation script.
- Case studies, a glossary, a references list, and a tools index.
- Online editor that opens a pull request from the browser, with GitHub sign-in.
- Full-text search, a PDF of the whole playbook rebuilt on every deploy, and a citation page with CITATION.cff.
- Site interface in English, Hausa, Amharic, Swahili, French, and Portuguese.
- Machine-translated drafts of the Foundations chapters, templates, and glossary in Hausa, Swahili, and Amharic, marked for native review, with the script that produces them.
- Build-time resolution of chapter links per locale, so partly translated languages build.
- Machine-translation notice on chapters awaiting native review.
- All Contributors table and badge in the README.

### Changed

- Navigation regrouped into Contribute, Resources, and Community menus.
- Site moved to the afriplaybook.waraka.org subdomain.

### Removed

- Leftover MasakhaneHub branding from the interface translations.

[Unreleased]: https://github.com/warakacommunity/playbook/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/warakacommunity/playbook/releases/tag/v1.0.0
