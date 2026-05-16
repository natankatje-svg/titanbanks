"""Recover the 20 consistency-batch jobs by fetching each by id, download, push to Telegram."""
import json, urllib.request, urllib.parse, pathlib, subprocess, uuid, time

CREDS = pathlib.Path(r"C:\Users\natan\Desktop\TitanBanks-2026-05-14\API ideogram\Telegram.txt")
TOKEN, CHAT_ID = CREDS.read_text(encoding="utf-8").strip().split(",", 1)
CHAT_ID = int(CHAT_ID)
INBOX = pathlib.Path(r"C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\inbox\consistency_20")
INBOX.mkdir(parents=True, exist_ok=True)

NAMES = [
    "01_studio_floating_orange_rim_9x16",
    "02_obsidian_plinth_topdown_1x1",
    "03_concrete_bench_dusk_3x4",
    "04_water_droplets_macro_9x16",
    "05_marble_pedestal_lowkey_3x4",
    "06_charging_table_workspace_16x9",
    "07_carbon_fiber_3q_lowangle_9x16",
    "08_velvet_drape_silent_luxury_3x4",
    "09_rooftop_concrete_blue_hour_9x16",
    "10_glass_pane_reflection_1x1",
    "11_oil_pool_surface_macro_3x4",
    "12_steel_grate_industrial_9x16",
    "13_leather_chair_arm_lifestyle_3x4",
    "14_floating_dust_volumetric_9x16",
    "15_brass_tray_warm_amber_1x1",
    "16_mirror_box_infinity_3x4",
    "17_stone_slab_zen_minimal_16x9",
    "18_chrome_surface_reflection_9x16",
    "19_smoke_atmosphere_dramatic_3x4",
    "20_charcoal_fabric_silent_3x4",
]
IDS = [
    "8fb9585c-8a9d-4c99-97dd-dde82ded8dab",
    "6b783cd5-8b55-49c3-b119-5d4a53cd8560",
    "a4da749b-c04b-45a8-bc7a-73307ab29f84",
    "cb5ed81c-3787-4f23-b6f8-a22fd5d59c9d",
    "9bc9949b-08dd-45f3-83ef-caacc450a2c2",
    "215b0de9-08b1-416f-8f95-0fae5d3da80d",
    "e32aa7f0-32ae-47e3-8391-923af6e9884e",
    "87b2268b-3e6e-49db-9cf4-fa535e8388d4",
    "8435a24e-4e62-4bc9-b8ac-4903f3103e65",
    "cc781437-e176-4a7f-8a38-48b9a0b21efa",
    "eac15aad-27d1-4ef5-b55e-02fb10339862",
    "57210dc7-a30c-4b67-8399-094b6c5d962a",
    "a28f60fe-08e8-4a52-8ff5-7a3e5913b40b",
    "fa981389-13c5-4f90-93e6-a07dee605cfe",
    "10d9ee48-cff8-4fbe-8cd2-f31db760121f",
    "87582ce5-d182-4432-8f49-4680245fe21d",
    "2b35e1d7-11ff-4bf6-82db-8607dffa5811",
    "143b1edc-a65d-42cd-9bdb-3c6b6133fe81",
    "59a1d746-0cce-407f-ae29-9c0b2667ff49",
    "12200f17-34a3-492e-b75b-ce3fd189ff5b",
]

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
    try:
        return json.loads(urllib.request.urlopen(req, timeout=120).read())
    except Exception as e:
        return {"ok": False, "error": str(e)[:300]}

def tg_text(text):
    body = urllib.parse.urlencode({"chat_id": CHAT_ID, "text": text}).encode()
    try: urllib.request.urlopen(urllib.request.Request(f"https://api.telegram.org/bot{TOKEN}/sendMessage", data=body)).read()
    except Exception: pass

ok = 0
for idx, (name, jid) in enumerate(zip(NAMES, IDS), 1):
    print(f"[{idx}/20] {name}")
    proc = subprocess.run(["higgsfield.cmd", "generate", "get", jid, "--json"],
                          capture_output=True, text=True, timeout=60, encoding="utf-8")
    if proc.returncode != 0:
        print(f"  fetch fail: {proc.stderr[-200:]}"); continue
    try:
        data = json.loads(proc.stdout)
    except Exception as e:
        print(f"  parse fail: {e}"); continue
    url = data.get("result_url")
    status = data.get("status")
    if not url or status != "completed":
        print(f"  status={status} url={url}"); continue
    out = INBOX / f"titanx_{name}.png"
    try:
        with urllib.request.urlopen(url, timeout=120) as r:
            out.write_bytes(r.read())
    except Exception as e:
        print(f"  download fail: {e}"); continue
    print(f"  downloaded -> {out.name}")
    aspect = name.rsplit("_", 1)[-1].replace("x", ":")
    cap = f"#{idx}/20 {name}\nAspect {aspect} · Geometry locked to approved baseline."
    r = tg_send_photo(out, cap)
    print(f"  pushed: ok={r.get('ok')}")
    if r.get("ok"): ok += 1
    time.sleep(1)

tg_text(f"Consistency-20 set klaar: {ok}/20 gepusht. Locatie: inbox/consistency_20/")
print(f"\n=== {ok}/20 ===")
