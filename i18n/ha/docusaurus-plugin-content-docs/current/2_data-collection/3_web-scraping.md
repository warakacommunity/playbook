---
title: Kwashe Bayanai Daga Yanar Gizo
description: Abin da kwashe bayanai daga yanar gizo zai iya da wanda ba zai iya bayarwa ba ga bayanan harsunan Afirka, la'akari da dokoki da ɗa'a, da kuma yanayin samun dama a yadda yake a yanzu.
ready: true
last_update:
  date: 2026-09-24
  author: Shamsudddeen Hassan Muhammad
translation_status: machine
source_hash: b5530c2d50eb
translated_at: 2026-09-28
---

# Kwashe Bayanai Daga Yanar Gizo {#web-scraping}

Koyi abin da kwashe bayanai daga yanar gizo (web scraping) yake da amfani a kai, inda yake da rauni ga harsunan Afirka, da kuma la'akari da dokoki, ɗa'a, da aiki waɗanda ya kamata su tsara duk wani shirin kwashe bayanai.

## Abin da kwashe bayanai yake, da kuma abin da ba shi ba {#what-scraping-is-and-what-it-isnt}

Kwashe bayanai daga yanar gizo yana nufin ciro abubuwa daga shafukan yanar gizo ta hanyar amfani da manhaja, sabanin amfani da tsarin API na dandalin a hukumance (sashe na gaba), ko neman a fitar da bayanai masu yawa daga wata cibiya. Yana da ban sha'awa saboda yana da arha wajen farawa kuma ba ya buƙatar izinin kowa don farawa (ko da yake, kamar yadda ke ƙasa, hakan ba ya nufin ba a buƙatar izini). Shi ne mafi yawan hanyar shiga wajen tattara bayanai saboda wannan dalili.

Hakanan, a karan kansa, shi ne kayan aiki mafi rauni a cikin wannan babi ga ainihin matsalar wannan littafin jagora. Kamar yadda [Gabatarwa](/introduction) ta bayyana, lokacin da [Kreutzer et al. (2022)](https://aclanthology.org/2022.tacl-1.4/) suka bincika manyan bayanan yanar gizo masu harsuna da yawa waɗanda aka gina yawancin tsarin sarrafa harshe na'ura (NLP pipelines) a kansu, sun gano cewa ga yawancin harsuna masu ƙarancin bayanai, babban kaso na rubutun da ake zaton na harshen ne an yi masa lakabi ba daidai ba, an fassara shi da na'ura, ko kuma ba ainihin harshen da ake buƙata ba ne kwata-kwata. Kwashe ƙarin bayanai daga yanar gizo ba zai gyara hakan ba; kawai zai tattara ƙarin irin wannan surutu (noise) ne cikin sauri. Kwashe bayanai wata hanya ce ta isa ga majiyar da tuni tana da yawa da kuma inganci. Ba zai iya ƙirƙirar ɗayansu ba a inda babu su.

## Yanayin samun dama yana ci gaba da canzawa {#the-access-landscape-keeps-shifting}

Ya kamata a sake yin la'akari da tsare-tsaren kwashe bayanai waɗanda suke ɗauka cewa buɗaɗɗiyar yanar gizo tana aiki kamar yadda ta yi shekaru biyar da suka gabata. Babban kaso mai girma kuma mai haɓaka na shafuka yanzu suna hana masu rarrafe (crawlers) masu alaƙa da AI a fili a cikin fayilolinsu na `robots.txt`, kuma manyan dandamali da yawa sun koma ga samun dama mai awo ko na biya don rarrafe mai yawa maimakon barin shi a buɗe. Rikice-rikicen shari'a game da kwashe bayanai da bayanan horar da AI suna ci gaba da gudana kuma ba a warware su ba a yankuna daban-daban na shari'a ([Brown et al., 2024](https://arxiv.org/abs/2410.23432)). Babu ɗayan wannan da ke sa kwashe bayanai ya zama ba zai yiwu ba, amma yana nufin:

- Shirin kwashe bayanai da aka rubuta a yau ƙila ba zai yi aiki ta hanya ɗaya ba a cikin shekara guda. Ware lokaci don sake duba samun dama lokaci-lokaci a cikin aikin, ba kawai a farkon ba.
- `robots.txt` da sharuɗɗan sabis na shafi ba kawai ƙa'idojin ɗa'a ba ne; su ne tushen da mai gudanar da shafi, ko kotu, za ta yi amfani da su wajen yanke hukunci ko tattara bayananka ya halarta. Karanta kuma ka mutunta su.
- Shafin da ya toshe rarrafe (crawling) a fili yana nuna wani abu game da yadda yake son a yi amfani da abubuwan da ke cikinsa. Ɗauki wannan a matsayin dalilin neman wani wuri maimakon wani cikas na fasaha da za a kewaye.

## Tsari don yanke shawara ko kuma yadda za a kwashe bayanai {#a-framework-for-deciding-whether-and-how-to-scrape}

[Brown et al. (2024)](https://arxiv.org/abs/2410.23432) sun tsara wani tsari mai kashi huɗu don kwashe bayanan bincike wanda ya dace kai tsaye da tambayoyin da mai bayar da gudummawa ga wannan littafin jagora ya kamata ya yi kafin farawa:

- **Shari'a (Legal)**: Shin sharuɗɗan sabis na shafin sun hana samun dama ta atomatik? Shin abubuwan da ke ciki suna da haƙƙin mallaka (copyright), kuma shin shirin da kake da shi na sake rarrabawa zai buƙaci lasisi ko zai faɗi a ƙarƙashin wani keɓancewa?
- **Ɗa'a (Ethical)**: Shin mutanen da suka ƙirƙiri wannan abun suna da wani kyakkyawan tsammani game da yadda za a yi amfani da shi? Kwashe bayanan jaridar gwamnati ya bambanta da kwashe bayanan shafin yanar gizo na mutum (blog) ko dandalin tattaunawa inda mutane suke rubutu don ƙaramin masu karatu da aka sani.
- **Cibiya (Institutional)**: Shin tsarin bitar ɗa'a na cibiyarka (IRB ko makamancinsa) yana buƙatar bayar da amincewa, musamman idan abun zai iya gano wani mutum?
- **Kimiyya (Scientific)**: Shin samfurin da zai fito zai wakilci abin da kake buƙata a zahiri, ko kawai abin da ya fi sauƙin kwashewa? Rarrafe da ya karkata ga shafukan labarai na yau da kullum zai rage wakilcin yanayin magana na yau da kullum wanda yawancin ayyukan NLP suke buƙata a zahiri.

## Jagoranci a aikace {#practical-guidance}

- **Mutunta `robots.txt` da iyakokin gudu (rate limits).** Rarrafe mai tsanani zai iya sa a toshe adireshin IP ɗinka, kuma ga shafin da tuni yake da fargabar kwashe bayanan AI, hakan yana tabbatar da ainihin halin da suke ƙoƙarin kiyayewa.
- **Fificita rumbun adana bayanai a hukumance da zaɓuɓɓukan fitar da bayanai masu yawa fiye da kwashe shafuka masu aiki**, a inda suke. Sun fi tsayawa da ƙafafunsu, ba su da yuwuwar karya tsarinka a tsakiyar tattarawa, kuma sun fi sauƙin karewa daga baya a matsayin hanyar tattarawa.
- **Rubuta komai yayin da kake ci gaba**: ainihin tsarin URL, kwanan watan tattarawa, sigar manhajar kwashe bayanai, da duk wani tacewa da aka yi amfani da shi. Wannan ya zama kashin bayan [Tushen Bayanai da Bincikensu (Data Provenance and Traceability)](./data-provenance-traceability). Tushen bayanai yana da matuƙar wahala a sake gina shi bayan an gama fiye da yin rikodinsa a lokacin.
- **Kada ka kwashe bayanai a bayan shiga (logins) ko kewayen matakan hana mutum-mutumi (anti-bot measures).** Kewayewa matakan sarrafa samun dama yana ɗauke da ainihin haɗarin shari'a kuma tsari ne mai tsauri wanda yawancin kwamitocin bitar cibiyoyi ba za su amince da shi ba, ba tare da la'akari da ƙimar binciken ba.
- **Musamman ga rubutun harsunan Afirka, tabbatar da gano harshe a kan duk abin da ka kwashe.** Manhajojin gano harshe da ake da su an horar da su ne galibi a kan harsuna masu ɗumbin bayanai kuma galibi suna rarraba rubutun harsunan Afirka ba daidai ba, ainihin yanayin gazawar da Kreutzer et al. suka rubuta a babban sikeli. Bincika wani samfuri tare da ɗan asalin mai magana da harshen kafin amincewa da matatar atomatik.

## Ƙaramar manhajar kwashe bayanai, mai kyakkyawan ɗabi'a {#a-minimal-well-behaved-scraper}

Abubuwan da ke sama suna fassara zuwa lamba (code) kai tsaye fiye da yadda suke gani. Manhajar kwashe bayanai da ke mutunta `robots.txt`, tana iyakance gudunta, tana yin rikodin tushe, kuma tana tabbatar da harshen abin da ta tattara ba ta fi wadda ba ta da kulawa tsayi sosai ba. Misalin da ke ƙasa yana amfani da ɗakunan karatu (libraries) da ake samu a ko'ina kawai (`requests`, `beautifulsoup4`, da manhajar gano harshe).

```python
import time
import json
import urllib.robotparser
from datetime import datetime, timezone
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup

USER_AGENT = "AfriPlaybook-collector/1.0 (+contact: you@example.org)"
RATE_LIMIT_SECONDS = 2.0  # one request every two seconds, at most


def allowed_by_robots(url: str) -> bool:
    """Honour robots.txt before fetching. If we can't read it, don't fetch."""
    parts = urlparse(url)
    robots_url = f"{parts.scheme}://{parts.netloc}/robots.txt"
    parser = urllib.robotparser.RobotFileParser()
    try:
        parser.set_url(robots_url)
        parser.read()
    except Exception:
        return False
    return parser.can_fetch(USER_AGENT, url)


def fetch(url: str) -> str | None:
    if not allowed_by_robots(url):
        print(f"Skipped (robots.txt disallows): {url}")
        return None
    response = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=30)
    response.raise_for_status()
    time.sleep(RATE_LIMIT_SECONDS)  # be a good guest
    return response.text


def extract_text(html: str) -> str:
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style", "nav", "footer"]):
        tag.decompose()
    return " ".join(soup.get_text(separator=" ").split())


def collect(urls: list[str], expected_lang: str, out_path: str) -> None:
    """Fetch each URL, keep only text that looks like the target language,
    and record provenance for every record we keep."""
    from glotlid import GlotLID  # pip install glotlid

    identifier = GlotLID()
    with open(out_path, "w", encoding="utf-8") as out:
        for url in urls:
            html = fetch(url)
            if html is None:
                continue
            text = extract_text(html)
            label, score = identifier.predict(text)  # e.g. ("hau_Latn", 0.97)
            if not label.startswith(expected_lang) or score < 0.7:
                print(f"Skipped (language {label}, score {score:.2f}): {url}")
                continue
            record = {
                "text": text,
                "source_url": url,
                "language": label,
                "lang_confidence": round(float(score), 3),
                "collected_at": datetime.now(timezone.utc).isoformat(),
                "collector": USER_AGENT,
            }
            out.write(json.dumps(record, ensure_ascii=False) + "\n")


if __name__ == "__main__":
    collect(
        urls=["https://example.org/hausa-article-1"],
        expected_lang="hau",  # ISO 639-3 prefix for Hausa
        out_path="raw_hausa.jsonl",
    )
```

Abubuwa uku a cikin wannan rubutun lamba (script) suna yin aikin da rubutun ya nema. Binciken `allowed_by_robots` ya ƙi ɗauko duk wani abu da shafin ya hana, kuma yana rufewa idan ba a iya karanta tsarin ba. Hutun `RATE_LIMIT_SECONDS` yana hana rarrafe yin kama da hari. Kuma binciken harshe, ta amfani da [GlotLID](https://github.com/cisnlp/GlotLID) a nan, yana watsar da duk wani abu da ba a da tabbacin cewa shi ne ainihin harshen da ake buƙata, wanda shi ne matata mafi mahimmanci guda ɗaya don kwashe bayanan harsunan Afirka duba da yadda rarrafe na gaba ɗaya yake yawan yi masa lakabi ba daidai ba ([Kreutzer et al., 2022](https://aclanthology.org/2022.tacl-1.4/)). Ƙimar tabbaci na `0.7` wuri ne na farawa, ba ƙimar gama-gari ba: saita shi ta hanyar bincika wani samfuri tare da ɗan asalin mai magana da harshen, kamar yadda aka bayyana a sama.

## Lokacin da kwashe bayanai ya zama zaɓi mai kyau {#when-scraping-is-the-right-call}

Kwashe bayanai yana samun gurbinsa lokacin da majiyar da ake buƙata tana da girma, ta jama'a ce, tana da tsarin samun dama a bayyane kuma mai ba da izini, kuma, mafi mahimmanci, a zahiri tana ƙunshe da yawa mai ma'ana a cikin harshen da ake buƙata. Kayan aiki ne da ba daidai ba lokacin da ainihin matsalar ita ce harshen bai sami kyakkyawan wakilci a yanar gizo ba tukuna. A wannan yanayin, hanyoyin tattarawa na al'umma, cibiyoyi, da waɗanda aka gina don wata manufa waɗanda aka tattauna a [Majiyoyin Bayanai (Data Sources)](./data-sources) su ne inda ainihin aikin yake.
