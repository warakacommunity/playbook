---
title: Ukusanyaji Data kutoka Wavuti (Web Scraping)
description: Kile ambacho ukusanyaji data kutoka wavuti unaweza na usichoweza kutoa kwa data za lugha za Kiafrika, mambo ya kisheria na kimaadili ya kuzingatia, na hali ya ufikiaji ilivyo kwa sasa.
ready: true
last_update:
  date: 2026-09-24
  author: Shamsudddeen Hassan Muhammad
translation_status: machine
source_hash: b5530c2d50eb
translated_at: 2026-09-28
---

# Ukusanyaji Data kutoka Wavuti (Web Scraping) {#web-scraping}

Jifunze kile ambacho ukusanyaji data kutoka wavuti (web scraping) unafaa hasa, pale unapopungukiwa kwa lugha za Kiafrika, na mambo ya kisheria, kimaadili, na kiutendaji ya kuzingatia ambayo yanapaswa kuongoza mpango wowote wa ukusanyaji data.

## Ukusanyaji data kutoka wavuti ni nini, na si nini {#what-scraping-is-and-what-it-isnt}

Kukwangua wavuti (web scraping) kunamaanisha kutoa maudhui kutoka kwenye kurasa za wavuti kwa kutumia programu, kinyume na kutumia API rasmi ya jukwaa (sehemu inayofuata), au kuomba usafirishaji wa data kwa wingi (bulk export) kutoka kwa taasisi. Inavutia kwa sababu ni rahisi kuanza na haihitaji ruhusa ya mtu yeyote ili kuanza (ingawa, kama ilivyo hapa chini, hiyo haimaanishi kuwa ruhusa haihitajiki). Hii ndiyo njia ya kawaida zaidi ya kuanza ukusanyaji wa data kwa sababu hiyo hasa.

Pia, yenyewe pekee, ni zana dhaifu zaidi katika sura hii kwa tatizo la msingi la mwongozo huu. Kama [Utangulizi](/sw/introduction) unavyoeleza, wakati [Kreutzer na wenzake (2022)](https://aclanthology.org/2022.tacl-1.4/) walipokagua ukusanyaji mkubwa wa data za lugha nyingi mtandaoni (multilingual web crawls) ambao mifumo mingi ya NLP inajengwa juu yake, waligundua kuwa kwa lugha nyingi zenye rasilimali chache, sehemu kubwa ya maandishi yaliyodhaniwa kuwa katika lugha husika yalikuwa yamewekewa lebo kimakosa, yalitafsiriwa na mashine, au hayakuwa lugha lengwa kabisa. Kukwangua wavuti zaidi hakusuluhishi hilo; kunakusanya tu kelele (noise) zilezile kwa haraka zaidi. Kukwangua wavuti ni mbinu ya kufikia chanzo ambacho tayari kina kiasi kikubwa na ubora. Hakuwezi kutengeneza vyote viwili pale ambapo havipo.

## Hali ya ufikiaji inaendelea kubadilika {#the-access-landscape-keeps-shifting}

Mipango ya ukusanyaji data inayoamini kuwa wavuti wazi (open web) inafanya kazi kama ilivyokuwa miaka mitano iliyopita inapaswa kufikiriwa upya. Sehemu kubwa na inayokua ya tovuti sasa inakataza waziwazi programu za kukusanya data (crawlers) zinazohusiana na AI katika faili zao za `robots.txt`, na majukwaa kadhaa makubwa yamehamia kwenye ufikiaji wa kupimwa au kulipia kwa ajili ya ukusanyaji data kwa wingi badala ya kuiacha wazi. Migogoro ya kisheria kuhusu ukusanyaji data na data za kufunza AI inaendelea na haijatatuliwa katika mamlaka nyingi za kisheria ([Brown na wenzake, 2024](https://arxiv.org/abs/2410.23432)). Hakuna kati ya haya yanayofanya ukusanyaji data usiwezekane, lakini inamaanisha:

- Mpango wa ukusanyaji data ulioandikwa leo huenda usifanye kazi kwa njia ileile baada ya mwaka mmoja. Tenga muda wa kuangalia upya ufikiaji mara kwa mara katika kipindi chote cha mradi, si tu mwanzoni.
- `robots.txt` na masharti ya huduma ya tovuti si tu suala la adabu; ndio msingi ambao mwendeshaji wa tovuti, au mahakama, itatumia kuhukumu ikiwa ukusanyaji wako ulikuwa halali. Yasome na kuyaheshimu.
- Tovuti inayozuia waziwazi ukusanyaji data inatoa ishara kuhusu jinsi inavyotaka maudhui yake yatumike. Chukulia hilo kama sababu ya kutafuta kwingine badala ya kikwazo cha kiufundi cha kukwepa.

## Mfumo wa kuamua ikiwa na jinsi ya kukusanya data kutoka wavuti {#a-framework-for-deciding-whether-and-how-to-scrape}

[Brown na wenzake (2024)](https://arxiv.org/abs/2410.23432) wanaweka mfumo wa sehemu nne wa ukusanyaji data kwa ajili ya utafiti ambao unaendana moja kwa moja na maswali ambayo mchangiaji wa mwongozo huu anapaswa kujiuliza kabla ya kuanza:

- **Kisheria (Legal)**: Je, masharti ya huduma ya tovuti yanazuia ufikiaji wa kiotomatiki? Je, maudhui yana hakimiliki, na je, mpango wako uliokusudiwa wa kusambaza upya utahitaji leseni au utaangukia chini ya ubaguzi (exception)?
- **Kimaadili (Ethical)**: Je, watu waliounda maudhui haya walikuwa na matarajio yoyote ya kuridhisha kuhusu jinsi yatakavyotumika? Kukusanya data kutoka kwenye gazeti la serikali ni tofauti na kukusanya data kutoka kwenye blogu binafsi au jukwaa ambapo watu walikuwa wakiandika kwa ajili ya hadhira ndogo inayojulikana.
- **Kitaasisi (Institutional)**: Je, mchakato wa mapitio ya maadili wa taasisi yako (IRB au sawa na hiyo) unahitaji kuidhinisha, hasa ikiwa maudhui yanaweza kumtambulisha mtu?
- **Kisayansi (Scientific)**: Je, sampuli itakayopatikana itawakilisha kile unachohitaji hasa, au tu kile kilichokuwa rahisi zaidi kukusanya? Ukusanyaji unaopendelea tovuti rasmi za habari utawakilisha kwa kiwango cha chini lugha ya kila siku ya mazungumzo (conversational register) ambayo kazi nyingi za NLP zinahitaji hasa.

## Mwongozo wa kiutendaji {#practical-guidance}

- **Heshimu `robots.txt` na vikomo vya kasi (rate limits).** Ukusanyaji data wa kishari (aggressive crawling) unaweza kusababisha IP yako kuzuiwa, na kwa tovuti ambayo tayari ina wasiwasi na ukusanyaji data wa AI, inathibitisha hasa tabia waliyokuwa wakijaribu kuiweka nje.
- **Pendelea nyaraka rasmi na chaguzi za kusafirisha data kwa wingi badala ya kukusanya data kutoka kwenye kurasa za moja kwa moja (live pages)**, pale zinapopatikana. Ni imara zaidi, zina uwezekano mdogo wa kuharibu mfumo wako katikati ya ukusanyaji, na ni rahisi kutetea baadaye kama mbinu ya ukusanyaji.
- **Andika kila kitu unapoendelea**: muundo halisi wa URL, tarehe ya ukusanyaji, toleo la programu ya kukusanya data (scraper), na uchujaji wowote uliotumika. Hii inakuwa uti wa mgongo wa [Asili na Ufuatiliaji wa Data (Data Provenance and Traceability)](./data-provenance-traceability). Asili ni ngumu sana kuijenga upya baada ya tukio kuliko kuiandika wakati huo.
- **Usikusanye data nyuma ya sehemu za kuingia (logins) au kukwepa hatua za kuzuia roboti (anti-bot measures).** Kukwepa vidhibiti vya ufikiaji kunabeba hatari halisi ya kisheria na ni mstari mwekundu ambao bodi nyingi za mapitio za kitaasisi hazitaidhinisha, bila kujali thamani ya utafiti.
- **Kwa maandishi ya lugha za Kiafrika haswa, thibitisha utambuzi wa lugha (language identification) kwenye chochote unachokusanya.** Vitambuzi vya lugha vilivyo tayari kutumika (off-the-shelf) vyenyewe vimefunzwa zaidi kwenye lugha zenye rasilimali nyingi na mara nyingi huweka lebo kimakosa kwenye maandishi ya lugha za Kiafrika, ambayo ndiyo hasa aina ya kushindwa ambayo Kreutzer na wenzake waliandika kwa kiwango kikubwa. Kagua sampuli (spot-check) na mzungumzaji mzawa kabla ya kuamini kichujio cha kiotomatiki.

## Programu ndogo ya kukusanya data yenye tabia nzuri {#a-minimal-well-behaved-scraper}

Hoja zilizo hapo juu zinatafsiriwa kwenye msimbo (code) moja kwa moja zaidi kuliko inavyoweza kuonekana. Programu ya kukusanya data inayoheshimu `robots.txt`, inayojiwekea kikomo cha kasi, inayorekodi asili, na kuthibitisha lugha ya kile inachokusanya si ndefu sana kuliko ile isiyojali. Mfano hapa chini unatumia tu maktaba (libraries) zinazopatikana kwa wingi (`requests`, `beautifulsoup4`, na kitambuzi cha lugha).

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

Mambo matatu katika hati (script) hii yanafanya kazi iliyoombwa na maelezo. Ukaguzi wa `allowed_by_robots` unakataa kuchukua chochote ambacho tovuti inakataza, na unashindwa kwa usalama (fails closed) ikiwa sera haiwezi kusomwa. Kusimama kwa `RATE_LIMIT_SECONDS` kunazuia ukusanyaji huo kuonekana kama shambulio. Na ukaguzi wa lugha, kwa kutumia [GlotLID](https://github.com/cisnlp/GlotLID) hapa, unaacha chochote ambacho hakina uhakika kuwa ni lugha lengwa, ambacho ndicho kichujio muhimu zaidi kwa ukusanyaji data wa lugha za Kiafrika ikizingatiwa jinsi ukusanyaji wa madhumuni ya jumla (general-purpose crawls) unavyoweka lebo kimakosa mara kwa mara ([Kreutzer na wenzake, 2022](https://aclanthology.org/2022.tacl-1.4/)). Kiwango cha uhakika (confidence threshold) cha `0.7` ni mahali pa kuanzia, si thamani ya ulimwengu wote: kiweke kwa kukagua sampuli na mzungumzaji mzawa, kama ilivyoelezwa hapo juu.

## Wakati ambapo kukusanya data kutoka wavuti ni uamuzi sahihi {#when-scraping-is-the-right-call}

Kukusanya data kutoka wavuti (scraping) kunapata nafasi yake wakati chanzo lengwa ni kikubwa, cha umma, kina sera wazi na inayoruhusu ufikiaji, na, muhimu zaidi, kina kiasi cha maana katika lugha lengwa. Ni zana isiyo sahihi wakati tatizo la kweli ni kwamba lugha hiyo bado haijawakilishwa vizuri mtandaoni. Katika hali hiyo, njia za ukusanyaji za kijamii, kitaasisi, na zilizojengwa kwa madhumuni maalum zilizofunikwa katika [Vyanzo vya Data (Data Sources)](./data-sources) ndipo kazi halisi ilipo.
