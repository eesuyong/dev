"""Check content relationships, canonical entries and the offline bundle."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "japanese"


def unique_object(pairs):
    result = {}
    for key, value in pairs:
        assert key not in result, f"Duplicate JSON key: {key}"
        result[key] = value
    return result


def read(path):
    return json.loads(path.read_text(), object_pairs_hook=unique_object)


def check():
    words = read(BASE / "words.json")
    assert words["好き"]["base"] == "{好|す}き"
    assert words["楽しい"]["p"] == "い형용사"
    assert words["寂しい"]["p"] == "い형용사"
    assert {s["p"] for s in words["あれ"]["senses"]} == {"감동사", "대명사"}
    songs = {p.stem: read(p) for p in (BASE / "songs").glob("*.json")}
    assert len(songs) == 15
    assert all(song.get("sources") for song in songs.values())
    songs["travel"] = read(BASE / "travel.json")
    rows = 0
    for key, song in songs.items():
        assert song["id"] == key
        ids = set()
        for section in song["sections"]:
            for line in section["lines"]:
                rows += 1
                if line.get("same"):
                    assert line["same"] in ids, (key, line["same"])
                    continue
                if line.get("id"):
                    assert line["id"] not in ids, (key, line["id"])
                    ids.add(line["id"])
                assert line.get("ko") and line.get("lit"), (key, line.get("id"))
                for token in line["tk"]:
                    stripped = re.sub(r"\{[^{}|]+\|[^{}|]+(?:\|\*)?\}", "", token["t"])
                    assert "{" not in stripped and "}" not in stripped, (key, token["t"])
    offline = (BASE / "download/higedan-note.html").read_text()
    embedded = re.search(r'<script id="hgn-data" type="application/json">(.*?)</script>', offline, re.S)
    assert embedded
    data = json.loads(embedded[1])
    assert data["songs"] == songs, "Offline song data is stale"
    assert data["words"] == words, "Offline dictionary is stale"
    assert (BASE / "learning.js").read_text() in offline
    assert (BASE / "learning.css").read_text() in offline
    assert '<script src="learning.js"' not in offline
    assert 'href="learning.css"' not in offline
    print(f"PASS: {len(songs) - 1} songs, {len(words)} dictionary entries, {rows} rows and offline bundle")


if __name__ == "__main__":
    check()
