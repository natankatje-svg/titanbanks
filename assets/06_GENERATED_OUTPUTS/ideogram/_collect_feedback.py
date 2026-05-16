"""Poll Telegram for feedback. Two ways feedback arrives:

  A) Reply on one of our pushed photos (matched via reply_to_message.message_id → manifest)
  B) Plain message starting with an alias prefix:  "1: ...", "hero: ...", "strap-hand - ..."

Output: one .md file per photo with feedback in:
  06_GENERATED_OUTPUTS/ideogram/_feedback/<filename>.feedback.md

Idempotent: tracks last-seen update_id in _telegram_state.json.
"""
import json, urllib.request, pathlib, time, re, sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from _aliases import resolve, label

CREDS_FILE = pathlib.Path(r"C:\Users\natan\Desktop\TitanBanks-2026-05-14\API ideogram\Telegram.txt")
TOKEN, _CHAT_ID = (CREDS_FILE.read_text(encoding="utf-8").strip().split(",", 1) + [None])[:2]

ROOT     = pathlib.Path(r"C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram")
MANIFEST = ROOT / "_telegram_manifest.json"
STATE    = ROOT / "_telegram_state.json"
FB_DIR   = ROOT / "_feedback"

# Match "alias: rest", "alias - rest", "alias = rest" — alias is one token
PREFIX_RE = re.compile(r"^\s*([a-zA-Z0-9-]+)\s*[:\-=]\s*(.+)$", re.DOTALL)

def get_updates(offset=None):
    params = "?timeout=0" + (f"&offset={offset}" if offset else "")
    return json.loads(urllib.request.urlopen(f"https://api.telegram.org/bot{TOKEN}/getUpdates{params}").read())

def append_feedback(filename, source_text, msg_meta):
    fb_file = FB_DIR / f"{filename}.feedback.md"
    with fb_file.open("a", encoding="utf-8") as f:
        ts = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(msg_meta.get("date", time.time())))
        f.write(f"\n## {ts}\n")
        f.write(f"From Telegram (message_id {msg_meta.get('message_id')}, via {msg_meta.get('via')}):\n\n")
        f.write(f"> {source_text}\n")
    return fb_file

def main():
    FB_DIR.mkdir(exist_ok=True)
    state = json.loads(STATE.read_text()) if STATE.exists() else {"last_update_id": 0}
    manifest = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else []
    by_msg = {e["message_id"]: e for e in manifest}

    offset = state["last_update_id"] + 1 if state["last_update_id"] else None
    upd = get_updates(offset)
    if not upd.get("ok"):
        print(f"telegram error: {upd}"); return []
    items = upd.get("result", [])
    print(f"polled {len(items)} updates (offset={offset})")

    new_feedback = []
    last_id = state["last_update_id"]
    for u in items:
        last_id = max(last_id, u.get("update_id", 0))
        msg = u.get("message")
        if not msg: continue
        text = msg.get("text", "").strip()
        if not text: continue
        msg_meta = {"message_id": msg.get("message_id"), "date": msg.get("date")}

        # Path A: reply on one of our pushed photos
        reply_to = msg.get("reply_to_message")
        if reply_to:
            target_mid = reply_to.get("message_id")
            recipe = by_msg.get(target_mid)
            if recipe:
                msg_meta["via"] = f"reply to {target_mid}"
                fb = append_feedback(recipe["filename"], text, msg_meta)
                new_feedback.append((recipe["filename"], text))
                print(f"REPLY  {recipe.get('concept', recipe['filename'])}: {text[:80]!r}")
                continue

        # Path B: alias prefix
        m = PREFIX_RE.match(text)
        if m:
            alias, body = m.group(1), m.group(2).strip()
            target = resolve(alias)
            if target:
                msg_meta["via"] = f"alias '{alias}'"
                fb = append_feedback(target, body, msg_meta)
                new_feedback.append((target, body))
                print(f"ALIAS  {label(target)}: {body[:80]!r}")
                continue
            else:
                print(f"unknown alias '{alias}' in: {text[:80]!r}")
                continue

        # Otherwise: ignore (chit-chat)
        print(f"skipped (no reply, no alias prefix): {text[:80]!r}")

    state["last_update_id"] = last_id
    STATE.write_text(json.dumps(state, indent=2))

    if not new_feedback:
        print("\n=> no new feedback")
    else:
        print(f"\n=> {len(new_feedback)} new feedback items saved to {FB_DIR}")
        for fn, txt in new_feedback:
            print(f"   • {label(fn)}: {txt[:100]}")
    return new_feedback

if __name__ == "__main__":
    main()
