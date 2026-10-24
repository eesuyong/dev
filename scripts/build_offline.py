"""Rebuild the standalone Japanese notebook without third-party dependencies."""
import datetime
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "japanese"


def build():
    html = (BASE / "index.html").read_text()
    data = {
        "built": datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=9))).date().isoformat(),
        "songs": {"travel": json.loads((BASE / "travel.json").read_text())},
        "words": json.loads((BASE / "words.json").read_text()),
    }
    for path in sorted((BASE / "songs").glob("*.json")):
        data["songs"][path.stem] = json.loads(path.read_text())
    for name in ["learning.css"]:
        html = html.replace(f'<link rel="stylesheet" href="{name}">', "<style>\n" + (BASE / name).read_text() + "\n</style>")
    for name in ["learning.js"]:
        html = html.replace(f'<script src="{name}"></script>', "<script>\n" + (BASE / name).read_text() + "\n</script>")
    payload = json.dumps(data, ensure_ascii=False, separators=(",", ":")).replace("<", "\\u003c")
    # Place data before any application code; fonts are optional network enhancements.
    html = html.replace("<script>", '<script id="hgn-data" type="application/json">' + payload + "</script>\n<script>", 1)
    target = BASE / "download" / "higedan-note.html"
    target.parent.mkdir(exist_ok=True)
    target.write_text(html)
    print(f"Built {target.relative_to(ROOT)} ({len(data['songs'])} datasets)")


if __name__ == "__main__":
    build()
