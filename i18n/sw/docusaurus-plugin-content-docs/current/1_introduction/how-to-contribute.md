---
sidebar_position: 3
ready: true
last_update:
  date: 2026-09-27
  author: Shamsuddeen Hassan Muhammad
translation_status: machine
source_hash: 56e2f9281148
translated_at: 2026-09-28
---

# Jinsi ya Kuchangia {#how-to-contribute}

Huhitaji kuwa mtafiti wa NLP (Natural Language Processing), na huhitaji kuandika sura nzima. Kusahihisha kosa la chapa (typo), kushiriki kile kilichofanya kazi kwenye mradi halisi, au kutafsiri ukurasa, yote yanahesabika. Ukurasa huu unakuongoza katika kila njia ya kuchangia, kuanzia marekebisho ya mstari mmoja hadi sura kamili, hatua kwa hatua.

## Njia za kuchangia {#ways-to-contribute}

- **Kusahihisha au kuboresha ukurasa**: rekebisha kosa, fafanua sentensi, ongeza rejea iliyokosekana.
- **Kuandika sura au sehemu**: jaza pengo ambalo mwongozo bado haujalishughulikia.
- **Kushiriki kifani (case study)**: kile ulichofanya kwenye mradi halisi, ikiwa ni pamoja na kile kilichoenda kombo.
- **Kuongeza mfano**: seti ya data (dataset) halisi, inayoweza kuthibitishwa au chapisho linalofafanua hoja.
- **Kutafsiri ukurasa**: kwa lugha ya Kihausa, Kiamhari, Kiswahili, Kifaransa, Kireno, au lugha nyingine.
- **Kuanzisha mjadala**: uliza swali au pinga mbinu. Kutokubaliana hufanya mwongozo kuwa bora zaidi.

Kila kitu kinapatikana katika hifadhi (repository) moja: [github.com/warakacommunity/playbook](https://github.com/warakacommunity/playbook).

## Chagua njia inayofaa mabadiliko yako {#pick-the-path-that-fits-your-change}

Kuna njia tatu za kufanya mabadiliko, kuanzia ya haraka zaidi hadi inayohitaji ushiriki wa kina. Chagua kulingana na ukubwa wa mabadiliko yako, si kulingana na uzoefu wako.

| Ikiwa unataka… | Tumia… | Inahitaji |
|------|------|-------|
| Kusahihisha au kuhariri maandishi kwenye ukurasa | **Kihariri cha mtandaoni (online editor)** (hapa chini) | Akaunti ya GitHub |
| Kufanya mabadiliko madogo kwenye faili moja | **Kihariri cha wavuti cha GitHub** | Akaunti ya GitHub |
| Kuongeza sura au kubadilisha faili kadhaa | **Kutengeneza nakala na ombi la kuvuta (Fork and pull request)** | Git kwenye kompyuta yako |

---

## Njia ya 1: Hariri kwenye tovuti (rahisi zaidi) {#path-1-edit-on-the-site-easiest}

Inafaa zaidi kwa kusahihisha makosa ya chapa, kuandika upya sentensi, au kuongeza kiungo. Hutoki kwenye kivinjari (browser).

1. Fungua **[kihariri cha mtandaoni](/?contribute=1)**.
2. Ingia kwa kutumia GitHub unapoombwa. Mbofyo mmoja unakuidhinisha kwa usalama kwenye GitHub, kwa hivyo hakuna kinachoandikwa kwenye tovuti hii. Hii inaturuhusu kutambua kazi yako na kufungua mabadiliko chini ya jina lako.
3. Tafuta ukurasa unaotaka kubadilisha na ufanye uhariri wako.
4. Ongeza dokezo fupi linaloelezea kile ulichobadilisha, kisha uwasilishe.

Tovuti inakufungulia ombi la kuvuta (pull request) kiotomatiki. Msimamizi (maintainer) analikagua na kuliunganisha (merge). Huo ndio mchakato mzima: hakuna git, hakuna mipangilio.

:::note

Ikiwa **Contribute** itafungua kichupo kipya kwenye `afriplaybook.waraka.org`, hilo linatarajiwa. Kuingia kwa GitHub kunaendeshwa kwenye tovuti ya uhariri ya mradi. Inafungua sura ileile uliyokuwa ukisoma, kwa hivyo ingia tu na uhariri hapo.

:::

## Njia ya 2: Hariri faili moja kwenye GitHub {#path-2-edit-one-file-on-github}

Inafaa zaidi kwa mabadiliko madogo wakati unapendelea kufanya kazi moja kwa moja kwenye GitHub.

1. Tafuta faili katika hifadhi. Sura zinapatikana chini ya [`docs/`](https://github.com/warakacommunity/playbook/tree/main/docs).
2. Bofya **ikoni ya penseli** (Edit this file) upande wa juu kulia wa faili.
3. Fanya mabadiliko yako. GitHub inakutengenezea nakala (fork) ikiwa huna idhini ya kuandika.
4. Kwa chini, andika maelezo mafupi na ubofye **Propose changes**.
5. Bofya **Create pull request**.

## Njia ya 3: Kutengeneza nakala na ombi la kuvuta (kwa sura na mabadiliko makubwa) {#path-3-fork-and-pull-request-for-chapters-and-larger-changes}

Inafaa zaidi kwa kuongeza sura mpya au kuhariri faili kadhaa kwa wakati mmoja. Hii inahitaji [git](https://git-scm.com/) na [Node.js 18+](https://nodejs.org/) kwenye kompyuta yako. Hata kama wewe ni mgeni kwa git, unaweza kufuata hatua hizi.

### Hatua ya 1: Fungua tatizo (issue) kwanza {#step-1-open-an-issue-first}

Kabla ya kuandika sura, [fungua tatizo](https://github.com/warakacommunity/playbook/issues/new) linaloelezea kile unachopanga kuongeza. Hii inaepusha watu wawili kuandika kitu kimoja na inawaruhusu wasimamizi kukuelekeza katika njia sahihi.

### Hatua ya 2: Kutengeneza nakala (Fork) na kunakili (clone) {#step-2-fork-and-clone}

Fungua [hifadhi](https://github.com/warakacommunity/playbook) na ubofye **Fork** (juu kulia). Kisha nakili (clone) nakala yako:

```bash
git clone https://github.com/<your-username>/playbook.git
cd playbook
```

### Hatua ya 3: Sakinisha na uendeshe kwenye kompyuta yako {#step-3-install-and-run-locally}

Unahitaji Node.js 22 na Yarn 1.x (isakinishwe kwa `npm install -g yarn`). Tumia Yarn, si npm, ili upate matoleo kamili ambayo mradi umejaribiwa nayo.

```bash
yarn install --frozen-lockfile
yarn start       # opens a live preview at http://localhost:3000
```

Onyesho la awali linajipakia upya unapohariri, kwa hivyo unaweza kuona mabadiliko yako mara moja.

### Hatua ya 4: Unda tawi (branch) {#step-4-create-a-branch}

Kamwe usifanye kazi kwenye `main` moja kwa moja. Unda tawi (branch) lililopewa jina la mabadiliko yako:

```bash
git checkout -b chapter/your-topic-slug
```

### Hatua ya 5: Ongeza au hariri maudhui yako {#step-5-add-or-edit-your-content}

Sura ni faili za Markdown chini ya `docs/`, zilizopangwa katika folda kulingana na mada. Ili kuongeza ukurasa, unda faili jipya la `.md` katika folda sahihi na uanze na maelezo ya awali (frontmatter):

```markdown
---
sidebar_position: 3
---

# Your Chapter Title

Your content here.
```

`sidebar_position` inadhibiti mahali ukurasa unapoonekana kwenye utepe wa kando (sidebar). Chagua nambari kwa nafasi unayotaka, na usogeze kurasa zinazofuata ikiwa inahitajika.

### Hatua ya 6: Utepe wa kando unajisasisha wenyewe {#step-6-the-sidebar-updates-itself}

Utepe wa kando unazalishwa kiotomatiki kutoka kwa muundo wa folda na `sidebar_position` ya kila ukurasa, kwa hivyo hakuna kitu cha ziada cha kuhariri. Ili kubadilisha jina la lebo ya folda, hariri `_category_.json` yake.

### Hatua ya 7: Kagua mabadiliko yako {#step-7-preview-your-change}

Kagua ukurasa wako katika onyesho la awali linaloendelea (`http://localhost:3000`). Usome kwenye dirisha jembamba pia; wachangiaji wengi husoma kwenye simu.

### Hatua ya 8: Endesha ujenzi (build) {#step-8-run-the-build}

Hii inabaini viungo vilivyovunjika na makosa mengine kabla ya kufungua ombi la kuvuta:

```bash
yarn build
```

Rekebisha chochote inachoashiria. Ujenzi safi ndio kitu kikuu ambacho wakaguzi (reviewers) huangalia.

### Hatua ya 9: Wasilisha (commit) na usukume (push) {#step-9-commit-and-push}

```bash
git add .
git commit -m "Add chapter on <your topic>"
git push origin chapter/your-topic-slug
```

### Hatua ya 10: Fungua ombi la kuvuta (pull request) {#step-10-open-a-pull-request}

1. Nenda kwenye nakala (fork) yako kwenye GitHub na ubofye **Compare & pull request**.
2. Andika maelezo mafupi ya kile ulichoongeza na kwa nini. Weka kiungo cha tatizo (issue) kutoka Hatua ya 1.
3. Bofya **Create pull request**.

Msimamizi atalikagua, kupendekeza mabadiliko yoyote, na kuliunganisha (merge) mara tu litakapokuwa tayari.

## Miongozo ya uandishi {#writing-guidelines}

Mambo machache ambayo kila mchango unapaswa kufuata:

- **Andika kwa uwazi.** Sentensi fupi, kauli ya kutenda, wazo moja kwa kila aya. Fafanua misamiati ya kitaalam (jargon) mara ya kwanza unapoitumia.
- **Nukuu vyanzo halisi.** Kila madai na mfano lazima vielekeze kwenye chapisho, seti ya data, au mradi halisi na unaoweza kuthibitishwa, kamwe si nukuu iliyobuniwa au isiyokaguliwa.

Kwa jinsi ya kupanga muundo wa ukurasa, kuongeza sehemu na vifungu, na kutumia visanduku vya maelezo vyenye rangi (callout boxes) (katika **Markdown au Word**), tazama [Jinsi ya Kuandika Hati](./how-to-write). Kwa sheria kamili za mtindo na maelezo ya kina ya hifadhi, tazama [CONTRIBUTING.md](https://github.com/warakacommunity/playbook/blob/main/CONTRIBUTING.md).

## Kutafsiri ukurasa {#translating-a-page}

Tafsiri zinasimamiwa na jamii. Tumia kibadilisha lugha kilicho juu kulia mwa upau wa kusogeza (navbar) ili kuona ni lugha zipi zilizopo, na utazame [CONTRIBUTING.md](https://github.com/warakacommunity/playbook/blob/main/CONTRIBUTING.md) kwa jinsi faili za tafsiri zinavyopangwa.

## Pata msaada {#get-help}

- **Maswali au mawazo:** [Mijadala ya GitHub](https://github.com/warakacommunity/playbook/discussions)
- **Piga soga na jamii:** [Discord](https://discord.gg/ChNPHV2PPS)
- **Umepata hitilafu (bug):** [fungua tatizo](https://github.com/warakacommunity/playbook/issues/new)

Tazama kila mtu ambaye amechangia hadi sasa kwenye ukurasa wa [Wachangiaji](/sw/contributors).
