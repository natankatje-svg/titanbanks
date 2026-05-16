"""Poll Telegram, classify every new message, return a structured summary for Claude to act on.

Categories:
  FEEDBACK       — reply on a pushed photo OR alias-prefixed message ("1: display fout")
                   → saved to _feedback/<file>.feedback.md, ready for _regen_with_feedback.py
  COMMAND        — starts with "/" (e.g. /regen, /status, /push)
                   → returned to Claude with the command parsed
  NEW_PROMPT     — free text, not a reply, no alias prefix, no slash command
                   → returned to Claude as a generation request to handle intelligently
  CHITCHAT       — empty/short noise — ignored

Idempotent: tracks last_update_id in _telegram_state.json so re-running only sees new stuff.
Output: prints a JSON structure + human-readable summary. Claude reads stdout to decide actions.
"""
import json, urllib.request, urllib.parse, pathlib, time, re, sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from _aliases import resolve, label, NUMBER_LABEL

CREDS_FILE = pathlib.Path(r"C:\Users\natan\Desktop\TitanBanks-2026-05-14\API ideogram\Telegram.txt")
TOKEN, CHAT_ID = (CREDS_FILE.read_text(encoding="utf-8").strip().split(",", 1) + [None])[:2]
CHAT_ID = int(CHAT_ID) if CHAT_ID else None

HELP_TEXT = """TitanBanks Bot — Commands & Workflow

SLASH COMMANDS
/help              Toon deze uitleg
/list              Toon alle foto-aliases (1-5)
/status            Pipeline status (approved/needs_revision/rejected counts)
/push              Push alle 5 approved photos
/push 1 4          Push specifieke photos (alias of nummer)
/regen             Regenereer alle photos die feedback hebben
/regen 1 4         Regenereer specifieke photos

PHOTO ALIASES
  1  hero          Never at 0. (hero)
  2  lifestyle     Never at 0. (backpack lifestyle)
  3  strap-macro   Strap (master plate, text-free)
  4  strap-hand    Strap (with hand)
  5  spec          50,000 mAh. But that is not the point.
  Ook: a1/a2/b1/b2/c1, of de korte naam (hero, hand, spec, etc)

FEEDBACK GEVEN — 2 manieren
A) Tap-en-hold op een foto -> Reply -> typ wat fout is -> stuur
B) Stuur een nieuw bericht beginnend met nummer of naam:
   1: display moet 100 zijn niet 888
   hero: subhead mist het woord 'an'
   strap-hand: vinger raakt brick aan, alleen loop vasthouden
   5 - Mah moet mAh zijn
   Scheiders: : - =

VRIJE PROMPTS
Stuur gewoon Nederlands of Engels. Voorbeelden:
  "Maak een variant van foto 4 met een groene loop"
  "Genereer Titan X liggend in dauwgras bij zonsopgang"
  "Hero shot 9:16 met 'Power. Period.' als headline"
  "Use plan mode and design a TikTok concept"
Ik bouw zelf de prompt + canonical geometrie + brand voice, kies model, genereer, push terug.

AUTO-POLL
Elke 2 minuten haal ik nieuwe Telegram berichten op en handel alles af.
Geen "check" zeggen nodig. Werkt zolang Claude Code sessie open is."""

def tg_send(text, reply_to=None):
    if not CHAT_ID:
        return
    payload = {"chat_id": CHAT_ID, "text": text}
    if reply_to:
        payload["reply_to_message_id"] = reply_to
    body = urllib.parse.urlencode(payload).encode()
    req = urllib.request.Request(f"https://api.telegram.org/bot{TOKEN}/sendMessage", data=body)
    try:
        urllib.request.urlopen(req).read()
    except Exception as e:
        print(f"tg_send error: {e}", file=sys.stderr)

ROOT     = pathlib.Path(r"C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram")
MANIFEST = ROOT / "_telegram_manifest.json"
STATE    = ROOT / "_telegram_state.json"
FB_DIR   = ROOT / "_feedback"

PREFIX_RE = re.compile(r"^\s*([a-zA-Z0-9-]+)\s*[:\-=]\s*(.+)$", re.DOTALL)
COMMAND_RE = re.compile(r"^/(\w+)(?:\s+(.+))?$")

def get_updates(offset=None):
    params = "?timeout=0" + (f"&offset={offset}" if offset else "")
    return json.loads(urllib.request.urlopen(f"https://api.telegram.org/bot{TOKEN}/getUpdates{params}").read())

def append_feedback(filename, source_text, msg_meta):
    FB_DIR.mkdir(exist_ok=True)
    fb_file = FB_DIR / f"{filename}.feedback.md"
    with fb_file.open("a", encoding="utf-8") as f:
        ts = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(msg_meta.get("date", time.time())))
        f.write(f"\n## {ts}\n")
        f.write(f"From Telegram (message_id {msg_meta.get('message_id')}, via {msg_meta.get('via')}):\n\n")
        f.write(f"> {source_text}\n")
    return fb_file

def main():
    state = json.loads(STATE.read_text()) if STATE.exists() else {"last_update_id": 0}
    manifest = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else []
    by_msg = {e["message_id"]: e for e in manifest}

    offset = state["last_update_id"] + 1 if state["last_update_id"] else None
    upd = get_updates(offset)
    if not upd.get("ok"):
        print(json.dumps({"ok": False, "error": str(upd)})); return
    items = upd.get("result", [])

    feedback_items = []
    commands = []
    new_prompts = []
    skipped = 0

    last_id = state["last_update_id"]
    for u in items:
        last_id = max(last_id, u.get("update_id", 0))
        msg = u.get("message")
        if not msg: continue
        text = msg.get("text", "").strip()
        if not text:
            skipped += 1
            continue
        meta = {"message_id": msg.get("message_id"), "date": msg.get("date"),
                "from": msg.get("from", {}).get("first_name", "?")}

        # 1. Slash command
        cm = COMMAND_RE.match(text)
        if cm:
            cmd = cm.group(1).lower()
            args = (cm.group(2) or "").strip()
            # Auto-handle deterministic commands directly (no Claude needed)
            if cmd in ("help", "h", "?"):
                tg_send(HELP_TEXT, reply_to=meta["message_id"])
                print(f"AUTO-REPLIED /help to msg {meta['message_id']}", file=sys.stderr)
                continue
            if cmd == "list":
                lines = ["TitanBanks photo aliases:"]
                for fn, (n, nm, concept) in NUMBER_LABEL.items():
                    lines.append(f"  {n}  {nm:14s}  {concept}")
                lines.append("\nOok: a1/a2/b1/b2/c1, of korte naam (hero, hand, spec, ...)")
                tg_send("\n".join(lines), reply_to=meta["message_id"])
                print(f"AUTO-REPLIED /list to msg {meta['message_id']}", file=sys.stderr)
                continue
            # Other commands need Claude — surface them
            commands.append({"command": cmd, "args": args, "raw": text, **meta})
            continue

        # 2. Reply on a pushed photo → feedback
        reply_to = msg.get("reply_to_message")
        if reply_to:
            target_mid = reply_to.get("message_id")
            recipe = by_msg.get(target_mid)
            if recipe:
                meta["via"] = f"reply to {target_mid}"
                append_feedback(recipe["filename"], text, meta)
                feedback_items.append({"filename": recipe["filename"],
                                       "alias": label(recipe["filename"]),
                                       "feedback": text, **meta})
                continue
            # else: reply but to something we don't know — fall through

        # 3. Alias prefix → feedback
        am = PREFIX_RE.match(text)
        if am:
            alias, body = am.group(1), am.group(2).strip()
            target = resolve(alias)
            if target:
                meta["via"] = f"alias '{alias}'"
                append_feedback(target, body, meta)
                feedback_items.append({"filename": target, "alias": label(target),
                                       "feedback": body, **meta})
                continue

        # 4. Otherwise: free-form new prompt request → for Claude
        new_prompts.append({"text": text, **meta})

    state["last_update_id"] = last_id
    STATE.write_text(json.dumps(state, indent=2))

    summary = {
        "ok": True,
        "polled": len(items),
        "feedback_count": len(feedback_items),
        "command_count": len(commands),
        "new_prompt_count": len(new_prompts),
        "skipped": skipped,
        "feedback": feedback_items,
        "commands": commands,
        "new_prompts": new_prompts,
    }
    print(json.dumps(summary, indent=2, ensure_ascii=False))

    # Human-readable footer for terminal use
    print("\n--- summary ---", file=sys.stderr)
    print(f"polled={len(items)} feedback={len(feedback_items)} commands={len(commands)} new_prompts={len(new_prompts)} skipped={skipped}", file=sys.stderr)
    if feedback_items:
        print("\nFeedback:", file=sys.stderr)
        for fb in feedback_items:
            print(f"  • {fb['alias']}: {fb['feedback'][:100]}", file=sys.stderr)
    if commands:
        print("\nCommands:", file=sys.stderr)
        for c in commands:
            print(f"  • /{c['command']} {c['args']}", file=sys.stderr)
    if new_prompts:
        print("\nNew prompt requests:", file=sys.stderr)
        for n in new_prompts:
            print(f"  • {n['from']}: {n['text'][:120]}", file=sys.stderr)

if __name__ == "__main__":
    main()
