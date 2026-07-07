---
sidebar_position: 6
title: Non-Latin scripts in real UIs
last_update:
  date: 2026-07-07
  author: Idris Abdulmumin
---

# Non-Latin scripts in real UIs

*Last reviewed: 2026-07-07.*

Most African languages that use a non-Latin script are also languages the mainstream OS-and-app ecosystem has not fully caught up with. Fonts do not ship by default, keyboards are not installed by default, text rendering is inconsistent across devices, and search does not know how to normalise across the writing systems the user actually uses. This page is the practical guide to shipping a UI that respects Ajami, Ge'ez, N'Ko, Tifinagh, and other African-script users — not just the model behind it.

## The scripts to design for

Practical African-language deployment usually intersects one of the following. Each has its own quirks; do not treat them as one problem.

- **Ge'ez (Ethiopic) script** — Amharic, Tigrinya, Tigre, and Ge'ez liturgical. Fully supported in Unicode (blocks U+1200–U+137F and extended); base + vowel-order composed characters give a large glyph inventory. Font coverage is decent on Android but inconsistent on iOS and desktop; input methods are widely available but not always as an OS default.
- **Ajami (Arabic script) for African languages** — Hausa Ajami, Wolof Ajami, Fulfulde Ajami, Kanuri Ajami, Mandinka Ajami. Uses the standard Arabic Unicode block plus extended Arabic (U+0600–U+06FF, U+0750–U+077F). Right-to-left. Font support is generally good (any Arabic-script font renders the base characters), but the specific letter forms and diacritics used in each Ajami tradition vary, and no single font handles every convention well.
- **N'Ko** — used for Manding languages (Bambara, Mandinka, Malinke). Fully supported in Unicode (U+07C0–U+07FF). Right-to-left. Font support is thin — dedicated N'Ko fonts exist but do not ship by default on most OS platforms.
- **Tifinagh (Neo-Tifinagh)** — Berber / Tamazight languages, including Kabyle and Tamasheq. Unicode block U+2D30–U+2D7F. Left-to-right. Font support is limited; distributed by Moroccan and Algerian standardisation bodies.
- **Vai** — Vai language of Liberia and Sierra Leone. Unicode block U+A500–U+A63F. Font support is thin; largely a research and community-preservation script.
- **Osmanya, Kaddare, Borama** — Somali script systems developed at various times, rarely used today; mentioned here for completeness.
- **Latin with special characters** — Yoruba (tone-mark diacritics), Igbo (dots below), Hausa (hooked ɓ, ɗ, ƙ, ƴ), Fon (ɔ, ɛ, ɖ), Ewe (ɖ, ƒ), and many others. Not "non-Latin" strictly, but load-bearing enough that a UI that mangles the diacritics is unusable for exactly the same reasons.

## Unicode support — a starting inventory

For each script, before designing anything, verify:

- **The Unicode blocks used are supported in the OS versions and platforms your users have.** Modern Android (10+) and iOS (14+) support all the scripts named above; older Android Go devices may lack coverage for less-common blocks (N'Ko, Vai, Tifinagh). Fallback to shipping fonts (below) when OS coverage is unreliable.
- **The specific characters your target text uses.** Ajami is not a single character inventory; different traditions use different subsets. A "supports Arabic" claim from a rendering engine does not mean it supports Ajami Fulfulde specifically. Test with samples of the actual text you will process.
- **Combining characters render correctly.** Ge'ez composed forms, Latin-with-diacritic combinations, and Arabic-with-diacritic (harakat) all rely on correct combining-character handling. A rendering pipeline that decomposes and re-composes wrongly produces tofu (empty rectangles) or double-rendered marks.

## Ship the fonts. Do not rely on OS defaults.

The single most common failure mode is assuming the OS ships adequate fonts for the target script. For Latin and mainstream CJK/Arabic, this is a safe assumption. For most African non-Latin scripts, it is not.

Practical rules:

- **Ship the font in the app bundle.** For a mobile app, embed the font as a resource; for a web app, self-host the font file and serve it as a `@font-face` (do not rely on Google Fonts availability from your users' networks).
- **Choose fonts with a permissive licence** — Open Font License (OFL) or similar. Many high-quality African-script fonts are available under OFL:
  - **[Noto Sans / Noto Serif Ethiopic](https://fonts.google.com/noto/specimen/Noto+Sans+Ethiopic)** for Ge'ez script (Google Noto project; OFL). The standard reference.
  - **[Noto Sans Arabic](https://fonts.google.com/noto/specimen/Noto+Sans+Arabic)** for Ajami base coverage; specific Ajami traditions may need additional fonts for extended characters.
  - **[Noto Sans NKo](https://fonts.google.com/noto/specimen/Noto+Sans+NKo)** for N'Ko script.
  - **[Noto Sans Tifinagh](https://fonts.google.com/noto/specimen/Noto+Sans+Tifinagh)** for Berber/Tamazight.
  - **[Noto Sans Vai](https://fonts.google.com/noto/specimen/Noto+Sans+Vai)** for Vai.
  - **[Charis SIL](https://software.sil.org/charis/)**, **[Doulos SIL](https://software.sil.org/doulos/)**, and **[Andika](https://software.sil.org/andika/)** by SIL International — extensive Latin-diacritic coverage for African languages; the reference for Latin-script African-language text with heavy diacritic use.
- **Bundle the specific weights and styles you use.** Regular + bold + italic is usually enough; heavier weights and additional italics add package size without much UX gain on constrained devices.
- **Watch out for font-size assumptions.** Ge'ez script glyphs are visually denser than Latin at the same point size; a 14pt Latin body-text size may render as too small for comfortable reading in Ethiopic. Test with native readers on real devices.

## Input methods — the second common failure

A UI that renders Ajami perfectly but has no way for the user to type it in is not usable. Input-method (IME) availability varies dramatically by platform.

- **Android** — Gboard supports many African languages and scripts natively, including Ajami-adjacent Arabic keyboards and Ethiopic. Coverage of N'Ko, Tifinagh, and Vai keyboards is thinner and typically requires third-party IMEs (GeezIME, Multiling O Keyboard, and similar).
- **iOS** — native keyboard coverage for African scripts is thinner than Android. Amharic and Tigrinya have decent support; Ajami, N'Ko, Tifinagh users typically install third-party keyboard apps.
- **Web** — no OS-level input method available; if your users lack a system keyboard, provide an on-screen software keyboard or a Latin-to-target-script transliteration input. Both are engineering work.
- **KaiOS and feature phones** — input methods are very limited; the practical answer for these users is voice input (see [ASR chapter](../before-you-start/asr.mdx)) or transliterated Latin input.

For a deployment that expects users to type in the target script, **verify with users what keyboards they have installed and how they type**. Do not assume; the reality is usually that a substantial share of your users type in a Latin transliteration and switch mentally, which has downstream implications for search, storage, and matching.

## Rendering pitfalls

Common issues to test for on real devices:

- **Bidirectional (bidi) text.** Ajami is right-to-left. Latin is left-to-right. A single message can contain both, and the UI has to lay them out correctly. Bidirectional support in modern web and mobile frameworks is generally solid, but layout bugs surface especially around punctuation ("(This is Latin) and this هو عربي") and mixed-script UI elements (a button label in Latin sitting in a right-to-left text flow).
- **Contextual shaping for Arabic-script text.** Arabic letters take different forms depending on their position in a word (initial, medial, final, isolated). A rendering engine that gets this wrong produces disconnected letters that read as broken text to users. Rare in modern engines but still happens on older Android WebViews and older desktop browsers.
- **Combining marks and normalisation.** Same character sequence, different Unicode normalisation forms (NFC vs NFD), can render as different-looking text. Normalise all input to NFC on storage; render from NFC.
- **Line breaking and word wrap.** Scripts have different line-break rules. Arabic breaks between words but not letters. Ge'ez breaks between syllables. N'Ko has its own conventions. Frameworks usually handle this correctly if the text is tagged with the correct language, and get it wrong if the text is tagged generically.
- **Text-selection behaviour.** Users double-tap to select a word; the definition of "a word" is language-dependent. Ge'ez script uses spaces less consistently than Latin; Arabic-script languages often need adjustment. If the selection behaviour is unusable, users cannot copy, paste, or edit their own input.
- **Right-to-left UI mirroring.** For a majority-Ajami interface, the entire UI (nav bar direction, icon positions, scroll direction) should mirror. This is a design decision beyond text rendering.

## Search and normalisation

If your app searches over text — knowledge base, message history, contact list — a naive search over African-language content will silently fail for users who type slightly differently from how the content is stored.

- **Normalise on storage.** Unicode NFC, consistent diacritic-preserving or diacritic-stripping strategy (decide up front), consistent script variant if the language uses more than one.
- **Diacritic-insensitive matching as a fallback.** Users writing without diacritics because their keyboard makes it hard should still find diacritic-carrying content. Case-insensitive is standard; add diacritic-insensitive as a fallback branch, not the primary.
- **Cross-script matching for languages written in more than one script.** A user searching for a Hausa term in Latin should optionally match Ajami content, if the deployment holds both. This requires a transliteration map at index time; the transliteration is not a purely mechanical operation and needs script-community input.
- **Do not autocorrect.** Autocorrect systems trained on English will destroy Ajami, Ge'ez, and diacritic-carrying Latin input. Disable it on your input fields. Users who want it will re-enable it themselves.

## Testing methodology

- **Test on the actual devices your users use** — Android Go on a mid-range MediaTek chipset, older iPhone models, mid-2010s desktop browsers. Test with the fonts your users actually have loaded, which for most non-default African scripts means testing with your app-bundled font as the exclusive source.
- **Test with users, in the wild** — not with English-speaking QA. Have native-script users type real content, search real content, edit real content. The bugs your QA process will not find are the ones native users will find in the first ten minutes.
- **Test copy/paste round-trips.** Text typed into your app, copied out, pasted into another app (WhatsApp, SMS, browser), and copied back must survive round-trip without character corruption.
- **Test edge cases** — mixed-script paragraphs, code-switched Latin-Ajami, long-running RTL text with embedded Latin phone numbers or URLs, script-boundary punctuation.

## Anti-patterns to avoid

1. **Assuming OS default fonts are enough** for African non-Latin scripts. Ship your own.
2. **Requiring users to install a third-party keyboard** with no in-app guidance. Detect the missing keyboard and offer instructions, or provide an on-screen input.
3. **Autocorrect enabled on non-Latin input fields.** It will destroy the input.
4. **Testing only in one script variant per language.** Hausa users write in both Latin and Ajami; Amharic users write in Ge'ez but paste in Latin URLs; test the reality.
5. **Ignoring bidirectional layout** in mixed-script paragraphs. Real user text does not stay in one direction.
6. **Diacritic-sensitive search only.** Users cannot type diacritics reliably on all keyboards; a search that requires exact-diacritic-match returns empty results for real user queries.
7. **Skipping native-user testing** because the diff looks small in an emulator. Emulators do not exercise real font-fallback chains, real keyboards, real user typing habits.

## Further reading

- [Google Noto project](https://fonts.google.com/noto) — the reference open-font family covering all Unicode scripts including all African scripts named above.
- [SIL International fonts](https://software.sil.org/fonts/) — the reference for Latin-diacritic African-language rendering (Charis, Doulos, Andika).
- [Unicode CLDR (Common Locale Data Repository)](https://cldr.unicode.org/) — the reference for locale, sorting, and text-processing conventions per language; check for locale coverage before assuming a framework handles your target language correctly.
- [W3C Internationalisation Working Group articles](https://www.w3.org/International/articles/) — the practical guide to bidirectional text, script shaping, and multilingual UI design.
- [Kelela / OCR4All African community efforts](https://github.com/OCR4all) — indirectly relevant: the same script-community expertise required for OCR is required for UI text handling.
- [Noto team's Ethiopic notes](https://notofonts.github.io/) — the Noto project's per-script design considerations, useful reading for anyone diving deeper into Ethiopic or Arabic rendering.

---

**Contributor's note.** If you have shipped an African-language app that handles a non-Latin script well — or that failed to — the highest-value contribution here is a per-script deep dive with the specific font, IME, and rendering issues you encountered. Real deployment retrospectives are more useful than general guidance for a task this specific.
