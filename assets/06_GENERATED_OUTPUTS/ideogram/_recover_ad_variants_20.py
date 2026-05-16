"""Recover ad-variants-20: fetch each by id, download, push to Telegram."""
import json, urllib.request, urllib.parse, pathlib, subprocess, uuid, time

CREDS = pathlib.Path(r"C:\Users\natan\Desktop\TitanBanks-2026-05-14\API ideogram\Telegram.txt")
TOKEN, CHAT_ID = CREDS.read_text(encoding="utf-8").strip().split(",", 1)
CHAT_ID = int(CHAT_ID)
INBOX = pathlib.Path(r"C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\inbox\ad_variants_20")
JOBS_FILE = INBOX / "_job_ids.txt"

def tg_send_photo(path, caption):
    boundary = uuid.uuid4().hex
    pp = pathlib.Path(path)
    parts = []
    for k, v in [("chat_id", str(CHAT_ID)), ("caption", caption)]:
        parts.append(f"--{boundary}\r\nContent-Disposition: form-data; name=\"{k}\"\r\n\r\n{v}\r\n".encode())
    parts.append(f"--{boundary}\r\nContent-Disposition: form-data; name=\"photo\"; filename=\"{pp.name}\"\r\nContent-Type: image/png\r\n\r\n".encode())
    parts.append(pp.read_bytes())
    parts.append(b"\r\n")
    parts.append(f"--{boundary}--\r\n".encode())
    body = b"".join(parts)
    req = urllib.request.Request(f"https://api.telegram.org/bot{TOKEN}/sendPhoto",
        data=body, headers={"Content-Type": f"multipart/form-data; boundary={boundary}"})
    try: return json.loads(urllib.request.urlopen(req, timeout=120).read())
    except Exception as e: return {"ok": False, "error": str(e)[:300]}

def tg_text(text):
    body = urllib.parse.urlencode({"chat_id": CHAT_ID, "text": text}).encode()
    try: urllib.request.urlopen(urllib.request.Request(f"https://api.telegram.org/bot{TOKEN}/sendMessage", data=body)).read()
    except Exception: pass

pairs = []
for line in JOBS_FILE.read_text().strip().splitlines():
    n, j = line.split("\t")
    pairs.append((n, j))

ok = 0
for idx, (name, jid) in enumerate(pairs, 1):
    print(f"[{idx}/{len(pairs)}] {name}")
    proc = subprocess.run(["higgsfield.cmd", "generate", "get", jid, "--json"],
                          capture_output=True, text=True, timeout=60, encoding="utf-8")
    if proc.returncode != 0:
        print(f"  fetch fail: {proc.stderr[-200:]}"); continue
    try: data = json.loads(proc.stdout)
    except Exception as e: print(f"  parse fail: {e}"); continue
    url = data.get("result_url"); status = data.get("status")
    if not url or status != "completed":
        print(f"  status={status} url={url}"); continue
    out = INBOX / f"{name}.png"
    try:
        with urllib.request.urlopen(url, timeout=120) as r:
            out.write_bytes(r.read())
    except Exception as e: print(f"  download fail: {e}"); continue
    print(f"  -> {out.name}")
    aspect = name.rsplit("_", 1)[-1].replace("x", ":")
    cap = f"#{idx}/{len(pairs)} {name}\nAspect {aspect} · Geometry locked baseline."
    r = tg_send_photo(out, cap)
    print(f"  pushed: ok={r.get('ok')}")
    if r.get("ok"): ok += 1
    time.sleep(0.8)

tg_text(f"Ad-variants-20 set klaar: {ok}/{len(pairs)} gepusht. Locatie: inbox/ad_variants_20/")
print(f"\n=== {ok}/{len(pairs)} ===")
