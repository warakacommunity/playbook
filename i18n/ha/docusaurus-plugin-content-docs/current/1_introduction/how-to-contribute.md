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

# Yadda Za a Bada Gudummuwa {#how-to-contribute}

Ba lallai sai ka kasance mai bincike a fannin sarrafa harshen kwamfuta (NLP researcher) ba, kuma ba lallai sai ka rubuta cikakken babi ba. Gyara kuskuren rubutu, raba abin da ya yi aiki a wani ainihin aiki (project), ko fassara shafi duk suna da amfani. Wannan shafin zai nuna maka kowace hanya ta bada gudummuwa, tun daga gyaran layi ɗaya har zuwa cikakken babi, daki-daki.

## Hanyoyin bada gudummuwa {#ways-to-contribute}

- **Gyara ko inganta shafi**: gyara kuskure, fassara wata jimla dalla-dalla, ƙara wata majiya da ta ɓace.
- **Rubuta babi ko sashe**: cike gurbin da wannan jagorar (playbook) ba ta riga ta ɗauka ba.
- **Raba wani nazari (case study)**: abin da ka yi a wani ainihin aiki, har da abin da bai yi daidai ba.
- **Ƙara misali**: ainihin rumbun bayanai (dataset) ko takardar bincike da za a iya tantancewa wanda ke nuna wani muhimmin batu.
- **Fassara shafi**: zuwa Hausa, Amharic, Swahili, Faransanci, Harshen Portugal, ko wani harshe daban.
- **Buɗe tattaunawa**: yi tambaya ko ƙalubalanci wata hanya. Rashin jituwa yana sa jagorar ta fi kyau.

Komai yana cikin ma'ajiya (repository) ɗaya: [github.com/warakacommunity/playbook](https://github.com/warakacommunity/playbook).

## Zaɓi hanyar da ta dace da gyaranka {#pick-the-path-that-fits-your-change}

Akwai hanyoyi guda uku don yin gyara, tun daga mafi sauri zuwa wanda ya fi buƙatar aiki sosai. Zaɓa dangane da girman gyaranka, ba dangane da yawan ƙwarewarka ba.

| Idan kana son… | Yi amfani da… | Abubuwan buƙata |
|------|------|-------|
| Gyara ko tace rubutu a shafi | **Editan intanet (online editor)** (a ƙasa) | Asusun GitHub |
| Yin ɗan ƙaramin gyara a fayil ɗaya | **Editan yanar gizo na GitHub** | Asusun GitHub |
| Ƙara babi ko gyara fayiloli da yawa | **Kwafa (fork) da buƙatar haɗawa (pull request)** | Git a kwamfutarka |

---

## Hanya ta 1: Gyara a shafin (mafi sauƙi) {#path-1-edit-on-the-site-easiest}

Ya fi dacewa wajen gyara kuskuren rubutu, sake tsara jimla, ko ƙara mahaɗi (link). Ba za ka taɓa barin manhajar bincikenka (browser) ba.

1. Buɗe **[editan intanet](/?contribute=1)**.
2. Shiga da GitHub idan an buƙaci hakan. Dannawa ɗaya zai ba ka izini cikin tsaro a GitHub, don haka babu abin da za a taɓa rubutawa a wannan shafin. Wannan yana ba mu damar jinjina wa aikinka kuma mu buɗe gyaran a ƙarƙashin sunanka.
3. Nemo shafin da kake son gyarawa sannan ka yi gyaranka.
4. Ƙara ɗan gajeren bayani da ke kwatanta abin da ka gyara, sannan ka aika.

Shafin zai buɗe maka buƙatar haɗawa (pull request) kai tsaye. Wani mai kula da shafin (maintainer) zai duba shi sannan ya haɗa shi (merge). Wannan shi ne gaba ɗaya tsarin: babu git, babu wani dogon shiri.

:::note

Idan **Contribute** ya buɗe sabon shafi a `afriplaybook.waraka.org`, hakan ya dace. Shiga da GitHub yana aiki ne a shafin gyaran aikin. Zai buɗe babi guda ɗaya da kake karantawa, don haka kawai ka shiga kuma ka yi gyara a can.

:::

## Hanya ta 2: Gyara fayil ɗaya a GitHub {#path-2-edit-one-file-on-github}

Ya fi dacewa don ɗan ƙaramin gyara idan ka gwammace ka yi aiki a GitHub kai tsaye.

1. Nemo fayil ɗin a cikin ma'ajiyar. Babi-babi suna ƙarƙashin [`docs/`](https://github.com/warakacommunity/playbook/tree/main/docs).
2. Danna **alamar fensir** (Edit this file) a saman fayil ɗin ta ɓangaren dama.
3. Yi gyaranka. GitHub zai ƙirƙiro maka kwafi (fork) idan ba ka da izinin yin rubutu.
4. A ƙasa, rubuta ɗan gajeren bayani sannan ka danna **Propose changes**.
5. Danna **Create pull request**.

## Hanya ta 3: Kwafa (fork) da buƙatar haɗawa (pull request) (don babi-babi da manyan gyare-gyare) {#path-3-fork-and-pull-request-for-chapters-and-larger-changes}

Ya fi dacewa wajen ƙara sabon babi ko gyara fayiloli da yawa a lokaci guda. Wannan yana buƙatar [git](https://git-scm.com/) da [Node.js 18+](https://nodejs.org/) a kwamfutarka. Ko da kai sabon shiga ne a git, za ka iya bin waɗannan matakan.

### Mataki na 1: Buɗe ƙorafi (issue) tukunna {#step-1-open-an-issue-first}

Kafin rubuta babi, [buɗe ƙorafi (issue)](https://github.com/warakacommunity/playbook/issues/new) wanda ke kwatanta abin da kake shirin ƙarawa. Wannan zai hana mutum biyu rubuta abu ɗaya kuma zai ba masu kula da shafin damar nuna maka hanya madaidaiciya.

### Mataki na 2: Kwafa (fork) da saukewa (clone) {#step-2-fork-and-clone}

Buɗe [ma'ajiyar](https://github.com/warakacommunity/playbook) sannan ka danna **Fork** (a sama ta dama). Sannan ka sauke (clone) kwafinka:

```bash
git clone https://github.com/<your-username>/playbook.git
cd playbook
```

### Mataki na 3: Girka kuma ka gudanar a kwamfutarka {#step-3-install-and-run-locally}

Kana buƙatar Node.js 22 da Yarn 1.x (girka shi da `npm install -g yarn`). Yi amfani da Yarn, ba npm ba, don ka sami ainihin nau'ikan (versions) da aka gwada aikin da su.

```bash
yarn install --frozen-lockfile
yarn start       # opens a live preview at http://localhost:3000
```

Shafin duba aikin zai riƙa sabunta kansa yayin da kake gyara, don haka za ka iya ganin gyaranka nan take.

### Mataki na 4: Ƙirƙiri reshe (branch) {#step-4-create-a-branch}

Kada ka taɓa yin aiki a kan `main` kai tsaye. Ƙirƙiri reshe (branch) mai sunan gyaranka:

```bash
git checkout -b chapter/your-topic-slug
```

### Mataki na 5: Ƙara ko gyara abubuwan da ke ciki {#step-5-add-or-edit-your-content}

Babi-babi fayilolin Markdown ne a ƙarƙashin `docs/`, waɗanda aka kasa su zuwa manyan fayiloli (folders) bisa ga jigo. Don ƙara shafi, ƙirƙiri sabon fayil na `.md` a cikin babban fayil ɗin da ya dace sannan ka fara shi da bayanan farko (frontmatter):

```markdown
---
sidebar_position: 3
---

# Your Chapter Title

Your content here.
```

`sidebar_position` yana sarrafa inda shafin zai bayyana a gefen shafin (sidebar). Zaɓi lambar gurbin da kake so, sannan ka matsar da shafukan da ke bayansa idan akwai buƙata.

### Mataki na 6: Gefen shafin (sidebar) yana sabunta kansa {#step-6-the-sidebar-updates-itself}

Gefen shafin yana ƙirƙirar kansa kai tsaye daga tsarin babban fayil ɗin da kuma `sidebar_position` na kowane shafi, don haka babu wani ƙarin abin da za a gyara. Don sake sunan lakabin babban fayil, gyara `_category_.json` ɗinsa.

### Mataki na 7: Duba gyaranka {#step-7-preview-your-change}

Duba shafinka a cikin shafin duba aikin da ke gudana (`http://localhost:3000`). Karanta shi a kan ƙaramin allo ma; yawancin masu bada gudummuwa suna karantawa ne a kan waya.

### Mataki na 8: Gudanar da ginin (build) {#step-8-run-the-build}

Wannan yana gano gurbatattun mahaɗai da sauran kurakurai kafin ka buɗe buƙatar haɗawa (pull request):

```bash
yarn build
```

Gyara duk abin da ya nuna. Gini (build) mai kyau shi ne babban abin da masu dubawa suke nema.

### Mataki na 9: Ajiye (commit) da turawa (push) {#step-9-commit-and-push}

```bash
git add .
git commit -m "Add chapter on <your topic>"
git push origin chapter/your-topic-slug
```

### Mataki na 10: Buɗe buƙatar haɗawa (pull request) {#step-10-open-a-pull-request}

1. Je zuwa kwafinka (fork) a GitHub sannan ka danna **Compare & pull request**.
2. Rubuta ɗan gajeren bayani na abin da ka ƙara da kuma dalili. Saka mahaɗin ƙorafin (issue) daga Mataki na 1.
3. Danna **Create pull request**.

Wani mai kula da shafin zai duba shi, ya ba da shawarar duk wani gyara, sannan ya haɗa shi da zarar ya shirya.

## Ƙa'idojin rubutu {#writing-guidelines}

Wasu ƴan abubuwa da ya kamata kowace gudummuwa ta bi:

- **Rubuta a fili.** Gajerun jimloli, sigar aiki (active voice), ra'ayi ɗaya a kowane sakin layi. Yi bayanin baƙon kalma (jargon) a karon farko da ka yi amfani da ita.
- **Kawo ainihin majiyoyi.** Kowane da'awa da misali dole ne ya nuna ainihin takardar bincike, rumbun bayanai (dataset), ko aiki da za a iya tantancewa, ba a taɓa amfani da ƙirƙirarre ko majiyar da ba a bincika ba.

Don sanin yadda za a tsara shafi, ƙara sassa da ƙananan sassa, da amfani da akwatunan kira masu launi (a cikin **Markdown ko Word**), duba [Yadda Za a Rubuta Takardar](./how-to-write). Don cikakkun ƙa'idojin tsari da zurfafan bayanan ma'ajiya, duba [CONTRIBUTING.md](https://github.com/warakacommunity/playbook/blob/main/CONTRIBUTING.md).

## Fassarar shafi {#translating-a-page}

Al'umma ne ke kula da fassarori. Yi amfani da maɓallin canza harshe a saman dama na sandar kewayawa (navbar) don ganin waɗanne harsuna ne suke akwai, sannan ka duba [CONTRIBUTING.md](https://github.com/warakacommunity/playbook/blob/main/CONTRIBUTING.md) don ganin yadda aka tsara fayilolin fassarar.

## Nemi taimako {#get-help}

- **Tambayoyi ko ra'ayoyi:** [Tattaunawar GitHub (GitHub Discussions)](https://github.com/warakacommunity/playbook/discussions)
- **Tattauna da al'umma:** [Discord](https://discord.gg/ChNPHV2PPS)
- **Ka gano matsala (bug):** [buɗe ƙorafi (issue)](https://github.com/warakacommunity/playbook/issues/new)

Duba duk wanda ya bada gudummuwa ya zuwa yanzu a shafin [Masu Bada Gudummuwa](/contributors).
