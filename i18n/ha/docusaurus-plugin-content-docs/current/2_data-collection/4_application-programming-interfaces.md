---
title: Hanyoyin Sadarwar Manhajoji (APIs)
description: Yadda ake tattara bayanai ta hanyar APIs na hukuma, da kuma dalilin da ya sa gina tsarin bayanan aiki a kan API na wani dandali guda ɗaya ke da haɗari fiye da yadda ake tsammani.
ready: true
last_update:
  date: 2026-09-24
  author: Shamsudddeen Hassan Muhammad
translation_status: machine
source_hash: 0cb52be687bd
translated_at: 2026-09-28
---

# Hanyoyin Sadarwar Manhajoji (APIs) {#application-programming-interfaces-apis}

Koyi yadda tattara bayanai ta hanyar API ya bambanta da kwashe bayanai daga shafukan yanar gizo (scraping), abin da ya fi dacewa da shi, da kuma dalilin da ya sa samun damar amfani da API ke ɗaya daga cikin tushe mafi ƙarancin tabbas da za a iya gina tsarin tattara bayanai a kansa.

## Yadda wannan ya bambanta da kwashe bayanai daga shafukan yanar gizo (scraping) {#how-this-differs-from-scraping}

API (Application Programming Interface) wata hanya ce tsararriya kuma halattacciya da dandali ke bayarwa don samun damar shiga bayanansa, sabanin ciro su daga shafukan yanar gizo da aka nuna. A inda kwashe bayanai (scraping) ke ɗaukar abin da ke bayyane ga jama'a kuma ya gano tsarin daga HTML na shafin, API yana ba ka bayanai da aka riga aka tsara (kamar saƙon tweet, rubutun wikitext na maƙalar Wikipedia, layukan bayanan gwamnati) kai tsaye, yawanci tare da takardun bayani, tantancewa, da ƙayyadaddun iyakokin amfani.

Wannan yana sa APIs su kasance masu inganci don gina tsarin aiki a kansu a ɗan gajeren lokaci: bayanan sun fi tsafta, an rubuta tsarin bayanan (schema), kuma ba ka fama da sauye-sauyen tsarin shafi. Hakan ba ya sa su zama masu inganci a dogon lokaci, saboda dalilan da ya kamata a ɗauka da muhimmanci kafin ka dogara da tsarin tattara bayanan aikin a kan guda ɗaya.

## Wani misali na gaske, mai bayar da gargaɗi {#a-cautionary-very-real-example}

AfriSenti, wani rumbun bayanan ra'ayi (sentiment dataset) da ke bayan aikin haɗin gwiwa na farko mai mai da hankali kan Afirka na SemEval-2023, an gina shi ne a kan saƙonnin tweet sama da 110,000 a cikin harsunan Afirka 14, waɗanda aka tattara ta hanyar damar amfani da API na Twitter kyauta a wancan lokacin don binciken ilimi ([Muhammad et al., 2023](https://arxiv.org/abs/2302.08956)). Wannan tsarin samun damar ba ya nan yanzu. A shekarar 2023, Twitter (yanzu X) ya kawo ƙarshen damar amfani da API kyauta don ilimi kuma ya gabatar da matakan biya, inda damar amfani ga manyan kamfanoni ke kaiwa dubunnan daloli a kowane wata, wanda ya zarce abin da yawancin ayyukan ilimi za su iya biya ([Brown et al., 2024](https://arxiv.org/abs/2410.23432)). Aikin da aka tsara a yau wanda ke ɗaukar cewa zai iya sake yin tsarin tattara bayanan AfriSenti, a kan irin waɗannan sharuɗɗan, ba zai iya ba sam.

Wannan ba labari ba ne game da wani dandali guda ɗaya da ke yin mummunan aiki. Wannan shi ne haɗarin kowane API: wata dama ce da dandalin ke bayarwa, ba haƙƙin da kake da shi ba, kuma ana iya canza masa farashi, taƙaita shi, ko soke shi ba tare da wani dogon gargaɗi ba, saboda dalilan da ba su da alaƙa da kai ko bincikenka. Yi tsari yadda ya kamata.

## Abin da APIs suka fi dacewa da shi {#what-apis-are-well-suited-for}

- **APIs na buɗaɗɗun bayanai da na jama'a**, inda gwamnatoci ko ƙungiyoyin ƙasa da ƙasa ke fitar da tsararrun rumbun bayanai (ƙidayar jama'a, aikin gona, lafiya, bayanan yanayi) a ƙarƙashin wani bayyanannen lasisin buɗewa. Waɗannan sukan fi zama rukunin da ya fi tsayawa da ƙafarsa, tun da dalilin wallafawa (nuna gaskiya, bin ƙa'ida) bai dogara da samun kuɗi daga dandalin ba.
- **APIs na Wikimedia** (Wikipedia, Wiktionary, Wikidata), waɗanda suka ƙunshi adadi mai ban mamaki na harsunan Afirka, har ma da wasu waɗanda ba su da rubutaccen kasancewa sosai a yanar gizo, kuma an gina su musamman don sake amfani da su.
- **APIs na gidajen rediyo da talabijin na ƙasa da ɗakunan karatu**, inda suke, galibi a matsayin tsarin da ya yi daidai da rumbun adana shirye-shirye da aka tattauna a [Majiɓoɓin Bayanai](./data-sources).
- **APIs na kafofin sada zumunta**, tare da buɗaɗɗun idanu: suna da amfani ga bambancin salo da batutuwa waɗanda ke da wuyar samu a wani wuri, amma rukunin da ya fi fuskantar haɗarin farashi da samun dama da aka bayyana a sama.

## Jagorar a aikace {#practical-guidance}

- **Karanta sharuɗɗan amfani (terms of service) kafin ka karanta takardun bayanin API.** Abin da aka ba ka damar yi da bayanan da ka tattara (adana su, sake rarraba su, wallafa su a matsayin wani ɓangare na rumbun bayanai) yana ƙarƙashin sharuɗɗan amfani ne (ToS), ba abin da API ɗin ya ba ka damar nema a fasahance ba.
- **Adana abin da ka tattara nan take**, a cikin ainihin tsarinsa (raw form), maimakon sake kwaso shi daga API daga baya. Idan samun dama ya canza ko ya ɓace, bayanan da ka adana su ne abin da kake da shi; ɗauka cewa ba za ka iya komawa don ƙara ɗauko wasu ba.
- **Yi rikodin ainihin inda aka samo bayanan (endpoint), ma'auni (parameters), sigar API, da kwanan watan kowane ɗauko bayanai.** Wannan shi ne irin tsarin asali (provenance) da ake amfani da shi wajen kwashe bayanai (duba [Asalin Bayanai da Bincikensu](./data-provenance-traceability)), kuma ya fi muhimmanci a nan, saboda yanayin API na iya canzawa a asirce tsakanin kiraye-kiraye ta hanyar da tsayayyen shafin yanar gizo ba zai iya ba.
- **Girmama iyakokin amfani kuma yi amfani da tsarin jinkirtawa (backoff).** Soke damarka ta amfani saboda cin zarafi, ko da ba da gangan ba, na iya kawo ƙarshen ƙoƙarin tattara bayanai gaba ɗaya, sabanin mai kwashe bayanai (scraper) da kawai ake rage masa gudu.
- **Kada ka tsara gaba ɗaya tsarin bayanan aiki a kan API na dandali guda ɗaya.** Ɗauki kowane API a matsayin majiɓiya ɗaya a cikin da yawa, kuma ka kasance da masaniyar abin da aikin zai yi idan wannan majiɓiyar ta ɓace a tsakiyar aikin. Kamar yadda misalin AfriSenti ya nuna, hakan ya taɓa faruwa a baya, ba tare da wani gargaɗi na gaba ba.

## Wani misali da aka yi aiki a kansa: ɗauko bayanai daga API na Wikimedia {#a-worked-example-pulling-from-a-wikimedia-api}

Daga cikin rukunin da ke sama, APIs na Wikimedia su ne suka fi aminci don koyo a kansu: an gina su ne don sake amfani da su, sun ƙunshi harsunan Afirka da yawa, kuma ba za su canza farashi dare ɗaya ba. Misalin da ke ƙasa yana ɗauko guntun maƙaloli daga wani tsarin harshe na Wikipedia, yana adana ainihin martanin (raw response) daidai yadda aka karɓa, kuma yana yin rikodin asali ga kowane maƙala. Canza `lang` zuwa kowane lambar harshe na Wikipedia, kamar `yo` (Yarbanci), `sw` (Swahili), `ha` (Hausa), ko `am` (Amharic).

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

Tsarin ayyukan yana da muhimmanci a nan. Ana rubuta ainihin martanin a kan faifan ajiya (disk) kafin a ciro wani abu daga cikinsa, ta yadda idan tsarin bayanan (schema) ya kasance ya bambanta da abin da ake tsammani, ko kuma samun dama ya canza daga baya, ana adana ainihin abin da aka ɗauko kuma ana iya sake yin fassarar (parsing) ba tare da intanet ba. Kowane rikodi yana ɗauke da lasisinsa (`CC BY-SA 4.0` don rubutun Wikipedia, wanda ke nufin sake amfani da shi a gaba dole ne ya bayyana asali kuma ya raba daidai), ainihin inda aka samo shi (endpoint), da lokacin da aka ɗauko shi. Wannan shi ne tsarin asali daga [Asalin Bayanai da Bincikensu](./data-provenance-traceability) da aka yi amfani da shi a lokacin tattarawa, inda yake da sauƙi, maimakon sake gina shi daga baya, inda galibi ba zai yiwu ba.

## Babban tsarin {#the-bigger-pattern}

Wannan shafin da kuma [Kwashe Bayanai daga Shafukan Yanar Gizo](./web-scraping) duka suna nuni ga darasi ɗaya daga fuskoki daban-daban: hanyoyin da suka dogara da ci gaban kyakkyawar niyyar wani ɓangare na uku (ko dai farashin API na dandali ne ko kuma haƙurin shafi ga masu kwashe bayanai) a dabi'ance ba su da tabbas fiye da hanyoyin da ba su dogara da hakan ba. Bayanan da aka samo daga al'umma, haɗin gwiwar hukumomi, da kamfen ɗin tattara bayanai da aka gina don wata manufa (duba [Majiɓoɓin Bayanai](./data-sources)) suna ɗaukar lokaci mai tsawo kafin a kafa su, amma ba sa ɓacewa saboda wani ya canza shafin farashi.
