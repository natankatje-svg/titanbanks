"""Push status + N approved photos to Telegram. Saves manifest mapping message_id -> photo metadata
so feedback replies can be matched back to the source recipe later.

Usage:
  python _send_telegram.py              # send the default 5 approved set
  python _send_telegram.py file1 ...    # send specific files (relative to approved/ or absolute)
"""
import os, sys, json, urllib.request, urllib.error, urllib.parse, pathlib, mimetypes, uuid, time
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from _aliases import resolve, label, NUMBER_LABEL

CREDS_FILE = pathlib.Path(r"C:\Users\natan\Desktop\TitanBanks-2026-05-14\API ideogram\Telegram.txt")
TOKEN, CACHED_CHAT_ID = (CREDS_FILE.read_text(encoding="utf-8").strip().split(",", 1) + [None])[:2]

APPROVED = pathlib.Path(r"C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\approved")
INBOX    = pathlib.Path(r"C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\inbox")
MANIFEST = pathlib.Path(r"C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\_telegram_manifest.json")

# Recipe registry — maps each known output filename to the recipe that made it.
# When you add a new generation, append its recipe here so feedback can route back to the right runner.
RECIPES = {
    "ideogram_angle-01_A1_hero_v3.png": {
        "runner": "ideogram_v3_with_refs", "aspect": "9x16",
        "paste_file": "angle-01_never-at-0_A1_hero.txt",
        "refs": ["slot-18_marketplace-front-3q-nbpro.jpg",
                 "slot-19_marketplace-side-3q-nbpro.jpg",
                 "slot-20_marketplace-top-down-ports-nbpro.jpg"],
        "concept": "A1 — Never at 0. (hero)",
    },
    "ideogram_angle-01_A2_lifestyle_v2.png": {
        "runner": "ideogram_no_refs", "aspect": "9x16",
        "paste_file": "angle-01_never-at-0_A2_lifestyle-backpack.txt",
        "refs": [],
        "concept": "A2 — Never at 0. (lifestyle backpack)",
    },
    "ideogram_angle-02_B1_macro_v4_textfree.png": {
        "runner": "ideogram_v3_textfree_dark_refs", "aspect": "3x4",
        "paste_file": "angle-02_strap_B1_hero-macro.txt",
        "refs": ["slot-09_material-macro-body-nbpro.jpg",
                 "slot-06_warm-orange-rim-nbpro.jpg",
                 "slot-10_display-macro-nbpro.jpg"],
        "concept": "B1 — Strap macro (master plate, text-free)",
    },
    "gpt_angle-02_B2_lifestyle_v4.png": {
        "runner": "gpt_image_2_higgsfield", "aspect": "3:4",
        "paste_file": "angle-02_strap_B2_lifestyle-hand.txt",
        "refs": [],
        "concept": "B2 — Strap with hand",
    },
    "ideogram_angle-03_C1_hero_v4_dark.png": {
        "runner": "ideogram_v3_dark_refs_no_silhouettes", "aspect": "9x16",
        "paste_file": "angle-03_50000mah-not-the-point_C1_hero.txt",
        "refs": ["slot-06_warm-orange-rim-nbpro.jpg",
                 "slot-10_display-macro-nbpro.jpg",
                 "slot-09_material-macro-body-nbpro.jpg"],
        "concept": "C1 — 50,000 mAh. But that is not the point.",
    },
}

DEFAULT_SET = list(RECIPES.keys())

STATUS = """TitanBanks Pre-Launch Photos

5 approved assets attached below — elk met een nummer (1-5) en een korte naam.

Feedback geven? 2 manieren:

A) Tap-en-hold op een foto → Reply → typ wat fout is
B) Stuur een nieuw bericht beginnend met het nummer of de naam:
   "1: display moet 100 zijn niet 888"
   "hero: achtergrond te wit"
   "strap-hand: vinger raakt fout aan"

Daarna in Claude:
   "collect"  - haalt alle feedback op
   "regen"    - regenereert ALLES met feedback
   "regen 1"  - regenereert alleen foto 1
   "regen hero strap-hand" - regenereert specifieke foto's

Aliases per foto:
  1 hero       Never at 0. (hero)
  2 lifestyle  Never at 0. (backpack)
  3 strap-macro  The strap people ask about. (master plate)
  4 strap-hand   The strap people ask about. (with hand)
  5 spec       50,000 mAh. But that is not the point."""

def get_chat_id():
    if CACHED_CHAT_ID:
        return int(CACHED_CHAT_ID)
    r = urllib.request.urlopen(f"https://api.telegram.org/bot{TOKEN}/getUpdates").read()
    d = json.loads(r)
    for u in reversed(d.get("result", [])):
        cid = u.get("message", {}).get("chat", {}).get("id")
        if cid: return cid
    return None

def _api(method, params=None, files=None):
    url = f"https://api.telegram.org/bot{TOKEN}/{method}"
    if files:
        boundary = uuid.uuid4().hex
        parts = []
        for k, v in (params or {}).items():
            parts.append(f"--{boundary}\r\nContent-Disposition: form-data; name=\"{k}\"\r\n\r\n{v}\r\n".encode())
        for fname, fpath in files:
            ctype = mimetypes.guess_type(str(fpath))[0] or "image/png"
            parts.append(f"--{boundary}\r\nContent-Disposition: form-data; name=\"photo\"; filename=\"{fname}\"\r\nContent-Type: {ctype}\r\n\r\n".encode())
            parts.append(pathlib.Path(fpath).read_bytes())
            parts.append(b"\r\n")
        parts.append(f"--{boundary}--\r\n".encode())
        body = b"".join(parts)
        req = urllib.request.Request(url, data=body, headers={"Content-Type": f"multipart/form-data; boundary={boundary}"})
    else:
        body = urllib.parse.urlencode(params or {}).encode()
        req = urllib.request.Request(url, data=body)
    try:
        return json.loads(urllib.request.urlopen(req).read())
    except urllib.error.HTTPError as e:
        return {"ok": False, "error": e.read().decode()[:300]}

def send_text(chat_id, text):
    return _api("sendMessage", {"chat_id": chat_id, "text": text})

def send_photo(chat_id, photo_path, caption=""):
    pp = pathlib.Path(photo_path)
    return _api("sendPhoto", {"chat_id": chat_id, "caption": caption}, files=[(pp.name, pp)])

def find_file(name):
    for d in (APPROVED, INBOX):
        p = d / name
        if p.exists(): return p
    p = pathlib.Path(name)
    if p.exists(): return p
    return None

def main(argv):
    chat_id = get_chat_id()
    if not chat_id:
        print("NO_CHAT_ID — DM the bot once and retry"); sys.exit(2)
    # Resolve user-supplied args via aliases (number/name) → canonical filenames
    raw_args = argv[1:]
    if raw_args:
        files = []
        for a in raw_args:
            canonical = resolve(a)
            files.append(canonical if canonical else a)
    else:
        files = DEFAULT_SET
    send_text(chat_id, STATUS)
    manifest_entries = []
    for name in files:
        p = find_file(name)
        if not p:
            print(f"MISSING: {name}"); continue
        recipe = RECIPES.get(p.name, {"concept": p.name, "runner": "unknown", "refs": [], "paste_file": None, "aspect": None})
        info = NUMBER_LABEL.get(p.name)
        if info:
            n, nm, concept = info
            cap = f"#{n} {nm}\n{concept}\n\nReply 'fix...' or send '{n}: fix...' for feedback."
        else:
            cap = f"{recipe['concept']}\n[{p.name}]"
        r = send_photo(chat_id, p, cap)
        msg = r.get("result", {})
        mid = msg.get("message_id")
        print(f"sent {p.name}: ok={r.get('ok')} message_id={mid}")
        if mid:
            manifest_entries.append({
                "message_id": mid,
                "chat_id": chat_id,
                "filename": p.name,
                "absolute_path": str(p.resolve()),
                "sent_at": int(time.time()),
                **recipe,
            })
    # Append to manifest (preserve history)
    history = []
    if MANIFEST.exists():
        try: history = json.loads(MANIFEST.read_text())
        except: history = []
    history.extend(manifest_entries)
    MANIFEST.write_text(json.dumps(history, indent=2))
    print(f"manifest updated: {MANIFEST} ({len(history)} entries total)")

if __name__ == "__main__":
    main(sys.argv)
