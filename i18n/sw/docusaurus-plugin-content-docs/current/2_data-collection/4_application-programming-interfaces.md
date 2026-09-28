---
title: Violesura vya Kupanga Programu (APIs)
description: Jinsi ya kukusanya data kupitia API rasmi, na kwa nini kujenga mpango wa data wa mradi kuzunguka API ya jukwaa lolote moja ni hatari zaidi kuliko inavyoonekana.
ready: true
last_update:
  date: 2026-09-24
  author: Shamsudddeen Hassan Muhammad
translation_status: machine
source_hash: 0cb52be687bd
translated_at: 2026-09-28
---

# Violesura vya Kupanga Programu (APIs) {#application-programming-interfaces-apis}

Jifunze jinsi ukusanyaji unaotegemea API unavyotofautiana na ukwanguaji (scraping), kile unachofaa zaidi, na kwa nini ufikiaji wa API ni mojawapo ya misingi isiyo imara zaidi ambayo mpango wa ukusanyaji wa data unaweza kujengwa juu yake.

## Jinsi hii inavyotofautiana na ukwanguaji {#how-this-differs-from-scraping}

API (Application Programming Interface) ni njia iliyopangwa na kuidhinishwa ambayo jukwaa hutoa kwa ajili ya kufikia data zake, kinyume na kuitoa kutoka kwa kurasa za wavuti zilizotolewa. Ambapo ukwanguaji huchukua kile kinachoonekana hadharani na kudokeza muundo kutoka kwa HTML ya ukurasa, API inakupa data ambayo tayari imepangwa (kipengee cha tweet, maandishi ya wikitext ya makala ya Wikipedia, safu mlango za seti ya data ya serikali) moja kwa moja, kwa kawaida ikiwa na nyaraka, uthibitishaji (authentication), na vikomo vya kasi (rate limits) vilivyo wazi.

Hii inafanya API kuwa za kutegemewa zaidi kujenga mfumo wa utendaji (pipeline) kuzunguka kwa muda mfupi: data ni safi zaidi, muundo (schema) umeandikwa, na hupambani na mabadiliko ya mpangilio wa ukurasa. Haimaanishi kuwa ni za kutegemewa zaidi kwa muda mrefu, kwa sababu zinazostahili kutiliwa maanani kabla ya kuweka mpango wa ukusanyaji wa mradi kwenye API moja.

## Mfano wa tahadhari, na halisi sana {#a-cautionary-very-real-example}

AfriSenti, seti ya data ya hisia nyuma ya jukumu la kwanza la pamoja la SemEval-2023 lenye mtazamo wa Kiafrika, ilijengwa kwenye tweets zaidi ya 110,000 katika lugha 14 za Kiafrika, zilizokusanywa kupitia ufikiaji wa API wa Twitter uliokuwa wa bure wakati huo kwa ajili ya utafiti wa kitaaluma ([Muhammad et al., 2023](https://arxiv.org/abs/2302.08956)). Mtindo huo wa ufikiaji haupo tena. Mnamo 2023, Twitter (sasa X) ilisitisha ufikiaji wa bure wa API kwa wasomi na kuanzisha viwango vya kulipia, huku ufikiaji wa kiwango cha biashara ukigharimu makumi ya maelfu ya dola kwa mwezi, kiasi ambacho ni kikubwa mno kuliko kile ambacho miradi mingi ya kitaaluma inaweza kulipa ([Brown et al., 2024](https://arxiv.org/abs/2410.23432)). Mradi uliopangwa leo ambao ungedhani unaweza kurudia mchakato wa ukusanyaji wa AfriSenti, kwa masharti yale yale, haungeweza kufanya hivyo.

Hii si hadithi kuhusu jukwaa moja lenye tabia mbaya. Ni hatari ya jumla ya API yoyote: ni fursa ambayo jukwaa hutoa, si haki unayoshikilia, na inaweza kupangiwa bei mpya, kuzuiwa, au kufutwa kwa taarifa fupi, kwa sababu ambazo hazihusiani na wewe au utafiti wako. Panga kulingana na hilo.

## Kile ambacho API zinafaa zaidi {#what-apis-are-well-suited-for}

- **API za data wazi na za umma**, ambapo serikali au mashirika ya kimataifa huweka wazi seti za data zilizopangwa (sensa, kilimo, afya, data za hali ya hewa) chini ya leseni wazi iliyobainishwa. Hizi huwa ni kategoria imara zaidi, kwa kuwa motisha ya kuchapisha (uwazi, uzingatiaji) haitegemei uchumaji wa mapato wa jukwaa.
- **API za Wikimedia** (Wikipedia, Wiktionary, Wikidata), ambazo zinajumuisha idadi ya kushangaza ya lugha za Kiafrika, hata baadhi ambazo zina uwepo mdogo sana wa kimaandishi mtandaoni, na zimejengwa mahususi kwa ajili ya kutumiwa tena.
- **API za mashirika ya utangazaji ya kitaifa na maktaba**, pale zinapopatikana, mara nyingi kama mbadala uliopangwa wa kumbukumbu za matangazo zilizojadiliwa katika [Vyanzo vya Data](./data-sources).
- **API za mitandao ya kijamii**, kwa tahadhari: ni muhimu kwa rejista na utofauti wa mada ambao ni vigumu kupata kwingineko, lakini ni kategoria iliyo hatarini zaidi kwa hatari ya upangaji bei na ufikiaji iliyoelezwa hapo juu.

## Mwongozo wa vitendo {#practical-guidance}

- **Soma masharti ya huduma kabla ya kusoma nyaraka za API.** Kile unachoruhusiwa kufanya na data unayokusanya (kuihifadhi, kuisambaza tena, kuichapisha kama sehemu ya seti ya data) kinadhibitiwa na Masharti ya Huduma (ToS), si kwa kile ambacho API inakuruhusu kuomba kiufundi.
- **Hifadhi kile unachokusanya mara moja**, katika umbo lake ghafi, badala ya kukichukua tena kutoka kwenye API baadaye. Ikiwa ufikiaji utabadilika au kutoweka, mkusanyiko wako uliohifadhiwa ndio utakaokuwa nao; chukulia kwamba huenda usiweze kurudi kuchukua zaidi.
- **Rekodi kituo halisi (endpoint), vigezo (parameters), toleo la API, na tarehe ya kila mkusanyiko.** Hii ni nidhamu ile ile ya asili kama ukwanguaji (tazama [Asili ya Data na Ufuatiliaji](./data-provenance-traceability)), na ni muhimu zaidi hapa, kwa sababu tabia ya API inaweza kubadilika kimyakimya kati ya maombi kwa njia ambayo ukurasa tuli wa wavuti hauwezi.
- **Heshimu vikomo vya kasi na utumie mbinu ya kurudi nyuma (backoff).** Kufutiwa ufikiaji wako kwa matumizi mabaya, hata bila kukusudia, kunaweza kukomesha kabisa juhudi za ukusanyaji, tofauti na kikwanguaji ambacho hupunguzwa kasi tu.
- **Usibuni mpango mzima wa data wa mradi kuzunguka API ya jukwaa moja.** Chukulia API yoyote kama chanzo kimoja kati ya vingi, na uwe na wazo la kile mradi utafanya ikiwa chanzo hicho kitatoweka katikati ya mradi. Kama mfano wa AfriSenti unavyoonyesha, imewahi kutokea hapo awali, bila onyo la mapema.

## Mfano uliotatuliwa: kuchukua kutoka kwa API ya Wikimedia {#a-worked-example-pulling-from-a-wikimedia-api}

Kati ya kategoria zilizo hapo juu, API za Wikimedia ndizo salama zaidi kujifunzia: zimejengwa kwa ajili ya kutumiwa tena, zinajumuisha lugha nyingi za Kiafrika, na hazitabadilisha bei mara moja. Mfano hapa chini unachukua dondoo za makala kutoka kwa toleo la lugha la Wikipedia, kuhifadhi majibu ghafi kama yalivyopokelewa, na kurekodi asili kwa kila makala. Badilisha `lang` kwa msimbo wowote wa lugha wa Wikipedia, kama vile `yo` (Kiyoruba), `sw` (Kiswahili), `ha` (Kihausa), au `am` (Kiamhari).

```python
import json
from datetime import datetime, timezone

import requests

USER_AGENT = "AfriPlaybook-collector/1.0 (+contact: you@example.org)"


def pull_extracts(lang: str, titles: list[str]) -> list[dict]:
    """Fetch plain-text extracts for given article titles from one
    Wikipedia language edition, archiving raw responses and provenance."""
    endpoint = f"https://{lang}.wikipedia.org/w/api.php"
    params = {
        "action": "query",
        "format": "json",
        "prop": "extracts",
        "explaintext": "1",          # plain text, not HTML
        "titles": "|".join(titles),
        "formatversion": "2",
    }
    response = requests.get(
        endpoint, params=params, headers={"User-Agent": USER_AGENT}, timeout=30
    )
    response.raise_for_status()
    pulled_at = datetime.now(timezone.utc).isoformat()

    # Archive the raw response first, before any processing.
    with open(f"raw_{lang}_response.json", "w", encoding="utf-8") as raw:
        json.dump(response.json(), raw, ensure_ascii=False, indent=2)

    records = []
    for page in response.json()["query"]["pages"]:
        if "extract" not in page:       # missing or redirected pages
            continue
        records.append({
            "title": page["title"],
            "text": page["extract"],
            "language": lang,
            "source_url": f"https://{lang}.wikipedia.org/wiki/{page['title'].replace(' ', '_')}",
            "license": "CC BY-SA 4.0",  # Wikipedia text license
            "api_endpoint": endpoint,
            "pulled_at": pulled_at,
        })
    return records


if __name__ == "__main__":
    records = pull_extracts(lang="yo", titles=["Nàìjíríà", "Èkó"])
    with open("wikipedia_yo.jsonl", "w", encoding="utf-8") as out:
        for record in records:
            out.write(json.dumps(record, ensure_ascii=False) + "\n")
```

Mlolongo wa shughuli ni muhimu hapa. Majibu ghafi huandikwa kwenye diski kabla ya chochote kutolewa kutoka kwayo, ili ikiwa muundo (schema) utaonekana kuwa tofauti na kile kilichotarajiwa, au ufikiaji ukibadilika baadaye, mkusanyiko wa asili unahifadhiwa na uchanganuzi (parsing) unaweza kufanywa tena nje ya mtandao. Kila rekodi inabeba leseni yake (`CC BY-SA 4.0` kwa maandishi ya Wikipedia, ambayo inamaanisha matumizi ya baadaye lazima yatoe sifa na kushiriki kwa masharti yale yale), kituo halisi (endpoint), na wakati wa mkusanyiko. Hiyo ndiyo nidhamu ya asili kutoka kwenye [Asili ya Data na Ufuatiliaji](./data-provenance-traceability) inayotumika wakati wa ukusanyaji, ambapo ni rahisi, badala ya kujengwa upya baadaye, ambapo mara nyingi haiwezekani.

## Mtindo mkubwa zaidi {#the-bigger-pattern}

Ukurasa huu na [Ukwanguaji wa Wavuti](./web-scraping) yote yanaelekeza kwenye somo lile lile kutoka pande tofauti: mbinu zinazotegemea nia njema inayoendelea ya mtu mwingine (iwe ni upangaji bei wa API wa jukwaa au uvumilivu wa tovuti kwa watambaazi (crawlers)) kwa asili si imara kuliko mbinu ambazo hazitegemei. Data inayotokana na jamii, ushirikiano wa kitaasisi, na kampeni za ukusanyaji zilizojengwa kwa madhumuni maalum (tazama [Vyanzo vya Data](./data-sources)) huchukua muda mrefu kuanzisha, lakini hazitoweki kwa sababu mtu mwingine alibadilisha ukurasa wa bei.
