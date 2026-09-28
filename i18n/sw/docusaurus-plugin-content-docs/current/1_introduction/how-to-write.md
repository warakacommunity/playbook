---
sidebar_position: 4
ready: true
last_update:
  date: 2026-09-24
  author: Shamsudddeen Hassan Muhammad
translation_status: machine
source_hash: e146c16c20e6
translated_at: 2026-09-28
---

# Jinsi ya Kuandika Sura {#how-to-write-a-chapter}

Sehemu ya [Jinsi ya Kuchangia](./how-to-contribute) inashughulikia mahitaji ya kufanya michango, yaani kuhariri kwenye tovuti, kugawanya (forking), na kufungua ombi la kuvuta (pull request). Katika Sehemu hii, tunaangazia uandishi wenyewe, jinsi ya kupangilia ukurasa, kuongeza sehemu na vijisehemu, na kutumia visanduku vya wito vyenye rangi (admonitions) vinavyofanya ukurasa uwe rahisi kusomeka.

Unaweza kuandika kwa **njia mbili**, lakini kuna chaguzi zaidi (tazama sehemu ya [Jinsi ya Kuchangia](./how-to-contribute)):

- **Markdown**: Huu ni muundo asilia wa kitabu hiki cha mwongozo (playbook). Unachochapa ndicho kinachochapishwa, lakini kwa kutumia sintaksia ya markdown. Ikiwa wewe ni mgeni kwa markdown, si jambo gumu, tumetoa misingi hapa chini, lakini pia unaweza kuanza [hapa](https://www.markdownguide.org/getting-started/). Hili ndilo chaguo bora ikiwa unajisikia huru kuhariri faili za maandishi au kutumia kihariri cha mtandaoni.
- **Microsoft Word**: Hiki ni kihariri unachokizoea kwa ajili ya kuandaa rasimu ya sura yako, kisha tuna mtunzaji (maintainer) wa ndani anayeibadilisha kuwa Markdown. Ni bora kwa sura ndefu au wachangiaji ambao hawafanyi kazi na Markdown.

Zote mbili hutoa ukurasa uleule uliochapishwa. Sheria zilizo hapa chini zimeandikwa ili rasimu ya Word na rasimu ya Markdown zitoe matokeo yanayofanana.

:::tip[Kanuni ya dhahabu]
**Usichape kichwa cha sura au nambari ya sura wewe mwenyewe.** Kitabu cha mwongozo kinaongeza kichwa na nambari (`# 1. Introduction`) kiotomatiki kutoka kwenye nafasi ya sura katika mwambaa wa kando (sidebar). Kichwa chako cha kwanza ni *sehemu ya kwanza* ya ukurasa, si kichwa chake. Katika Markdown hiyo ni `##`; katika Word hiyo ni **Heading 1**.
:::

---

## Kuandika katika Markdown {#writing-in-markdown}

### Sehemu na vijisehemu {#sections-and-subsections}

Vichwa vinajenga muundo wa ukurasa na yaliyomo upande wa kulia. Kwa sababu kichwa cha sura kinaongezwa kwa ajili yako, unaanza ngazi moja chini:

```markdown
## A section            ← top-level section (shows in the right-hand menu)

### A subsection        ← nested under the section above

#### A sub-subsection   ← use sparingly; deep nesting is hard to read
```

Sheria zinazofanya kurasa ziwe safi:

- **Kamwe usitumie `#` moja.** Hicho ni kichwa cha sura, na kitabu cha mwongozo kinakimiliki.
- **Usiruke ngazi.** `##` inafuatiwa na `###`, si `####`.
- **Weka vichwa viwe vifupi.** Vinakuwa vipengee vya menyu; sentensi kamili inaharibu mpangilio.
- **Wazo moja kwa kila sehemu.** Ikiwa sehemu inazidi skrini moja au mbili, igawanye.

### Visanduku vya wito (Admonitions): visanduku vya wito vyenye rangi {#admonitions-the-colored-callout-boxes}

Visanduku vya wito (admonitions) ni visanduku vya wito (kama kisanduku cha kijani cha "kanuni ya dhahabu" hapo juu) vinavyovuta jicho la msomaji kwenye jambo muhimu. Funga maandishi ndani ya wigo wa `:::`:

```markdown
:::note
Neutral aside or extra context. Gray.
:::

:::tip
Best practice, or what worked on a real project. Green.
:::

:::info
Something the reader needs to know first: a prerequisite or definition. Blue.
:::

:::warning
A common mistake or gotcha. Yellow.
:::

:::danger
Something irreversible or unsafe: data loss, consent, security. Red.
:::
```

Kipe kisanduku kichwa chako mwenyewe kwa kukiweka ndani ya mabano mraba:

```markdown
:::tip[Contribute]
You don't need to write a whole chapter to help.
:::
```

**Sheria:**

- Acha **mstari mtupu kabla na baada** ya kila wigo wa `:::` na kuzunguka maudhui yaliyo ndani.
- Unaweza kuweka Markdown ya kawaida ndani: **koleza (bold)**, viungo, orodha, msimbo (code).
- Vitumie kwa kiasi: **angalau kimoja kwa kila sehemu**, la sivyo ukurasa utasomeka kama lebo ya onyo.

### Lini utumie kisanduku kipi {#when-to-use-which-box}

| Kisanduku | Kitumie kwa |
|------|-----------|
| `tip` | Mazoezi yaliyopendekezwa, "kilichofanya kazi kwenye mradi halisi" |
| `note` | Muktadha wa kando, maelezo ya hiari |
| `info` | Mahitaji ya awali, fasili, maelezo ya toleo |
| `warning` | Makosa ya kawaida, mambo ya kushangaza (gotchas) |
| `danger` | Upotevu wa data, hatua zisizoweza kutenduliwa, idhini, usalama |

### Mambo mengine yanayofanya ukurasa uwe mzuri zaidi {#other-things-that-make-a-page-nicer}

- **Vitalu vya msimbo (Code blocks)**: kila mara weka lugha (kama vile **python**, **java**) ili iangaziwe, na uongeze kichwa ikiwa inasaidia:

  ````markdown
  ```python title="train.py"
  print("hello")
  ```
  ````

Hili ni muhimu hasa kwa sura zinazozungumzia vipengele vya kiufundi kama vile usafishaji wa data, uonyeshaji wa data (visualization) na kadhalika.
- **Picha**: ziweke kwenye folda ya **`images/`** ya sura na kila mara andika maandishi mbadala (alt text) yanayoelezea kielelezo:

  ```markdown
  ![AfricaNLP papers grew roughly fourteenfold between 2006 and 2024.](../../../../../docs/1_introduction/images/africanlp-growth.svg)
  ```

- **Viungo**: unganisha kwenye kurasa nyingine kwa kutumia njia ya uhusiano (relative path) ili mchakato wa kujenga (build) uweze kuzikagua: `[Kanuni za msingi](./core-principles)`.
- **Maelezo yanayoweza kukunjwa (Collapsible detail)**: ficha maudhui marefu, ya hiari:

  ```markdown
  <details>
    <summary>Full configuration example</summary>

    ...content...

  </details>
  ```

- **Majedwali**: yaweke yawe membamba. Wachangiaji wengi husoma kwenye simu, na majedwali mapana yanaharibu mpangilio.
- **Hakuna deshi ndefu (em-dashes)**: usitumie deshi ndefu. Badala yake tumia nuktapacha, mkato, mabano au sentensi mpya.

---

## Kuandika katika Microsoft Word {#writing-in-microsoft-word}

Unaweza kuandaa rasimu katika **Word** na kumruhusu mtunzaji aibadilishe. Ili kufanya ubadilishaji uwe safi, tumia **mitindo iliyojengewa ndani** ya Word (vitufe vya Heading 1 / Heading 2), si maandishi yaliyokolezwa kwa mikono au fonti kubwa zaidi. Kibadilishaji kinaelewa tu mitindo halisi.

### Vichwa vinashuka ngazi moja chini {#headings-map-one-level-down}

Kwa sababu kitabu cha mwongozo kinaongeza kichwa cha sura kiotomatiki, **Heading 1 ya Word inakuwa sehemu, si kichwa.** Tumia ramani hii:

| Katika Word, tumia… | Inakuwa katika kitabu cha mwongozo | Sawa na Markdown |
|------|------|------|
| *(usiongeze)* | Kichwa cha sura + nambari | `# 1. Title` |
| **Heading 1** | Sehemu ya ngazi ya juu | `##` |
| **Heading 2** | Kijisehemu | `###` |
| **Heading 3** | Kijisehemu cha ndani zaidi | `####` |
| Maandishi ya Kawaida / Mwili | Aya | maandishi matupu |
| Orodha ya Nukta / Nambari | Orodha | `-` / `1.` |

Kwa hivyo: usichape kichwa cha sura juu ya faili yako ya Word. Anza moja kwa moja kwenye sehemu yako ya kwanza ya **Heading 1**.

### Visanduku vya wito (Admonitions) katika Word {#admonitions-in-word}

Word haina kisanduku cha wito kilichojengewa ndani, kwa hivyo tumia utaratibu ulio hapa chini. Njia rahisi na ya kutegemewa zaidi ni **kuchapa wigo wa `:::` kama maandishi matupu**, kila moja kwenye mstari wake, katika aya ya kawaida (Mwili), *bila* kuwekewa mtindo kama kichwa:
```

 :::tip[Contribute]

 You don't need to write a whole chapter to help.

 :::

```

Wakati hati inabadilishwa, mistari hiyo inabaki kama ilivyo na kitabu cha mwongozo kinaiwasilisha kama kisanduku halisi chenye rangi. Weka aya tupu kabla na baada ya wigo, sawa kabisa na katika Markdown.



### Vidokezo vichache zaidi vya Word {#a-few-more-word-tips}

- **Picha**: zibandike ndani ya mstari (inline) pale zinapostahili, na uandike maelezo mafupi ya mstari mmoja chini ya kila picha ili yaweze kuwa maandishi mbadala (alt text).
- **Viungo**: tumia viungo halisi vya Word (Ingiza → Kiungo), si URL zilizobandikwa tupu, ili zibadilishwe kwa usahihi.
- **Usighushi muundo**: epuka uwekaji nambari kwa mikono, visanduku vilivyochorwa kwa mkono, au mistari tupu ya ziada kwa ajili ya nafasi. Ruhusu mitindo ifanye kazi; mpangilio unatumika kwa ajili yako kwenye tovuti.

---

## Hakiki kabla ya kuwasilisha {#preview-before-you-submit}

Kwa muundo wowote unaoandika, kagua jinsi unavyoonekana kabla ya kufungua ombi la kuvuta (pull request). Hakikisho sahihi zaidi ni tovuti yenyewe ya moja kwa moja:

```bash
npm start        # opens a live preview at http://localhost:3000
```

Hakikisho hupakia upya unapohariri, kwa hivyo visanduku vya wito, vichwa, na picha huonekana sawa kabisa na jinsi vitakavyokuwa vikishachapishwa. Soma ukurasa kwenye dirisha jembamba pia, kwa kuwa wasomaji wengi wanatumia simu.

Kwa sheria kamili za mtindo, tazama [CONTRIBUTING.md](https://github.com/warakacommunity/playbook/blob/main/CONTRIBUTING.md).
