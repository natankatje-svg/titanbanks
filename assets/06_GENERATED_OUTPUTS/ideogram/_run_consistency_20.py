"""Generate 20 consistency-locked Titan X campaign images via Nano Banana Pro.

Input ref: slot-18 OEM (same source that produced the approved v6 baseline).
Each output preserves EXACT product geometry; only scene/light/angle/mood vary.
Pushed to Telegram one-by-one as they finish.
"""
import os, sys, json, urllib.request, urllib.parse, pathlib, time, subprocess, re, uuid

CREDS = pathlib.Path(r"C:\Users\natan\Desktop\TitanBanks-2026-05-14\API ideogram\Telegram.txt")
TOKEN, CHAT_ID = CREDS.read_text(encoding="utf-8").strip().split(",", 1)
CHAT_ID = int(CHAT_ID)

REF = pathlib.Path(r"C:\Users\natan\TitanBanks\outputs\stage1-raw\2026-05-14\slot-18_marketplace-front-3q-nbpro.png")
INBOX = pathlib.Path(r"C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\inbox\consistency_20")
INBOX.mkdir(parents=True, exist_ok=True)

GEOM = ("Preserve the EXACT powerbank from the reference: identical proportions, "
        "thickness, edge curvature, two-part body with overhanging port-cap, glossy "
        "front display showing '100%' with green charge icon, TITANBANKS wordmark in "
        "the same position and scale, orange woven carry loop on upper-left with "
        "'POWER BANK' embossed text, identical port layout, button placement, "
        "flashlight position, surface texture and matte materials. Do NOT redesign, "
        "stylize, or alter geometry — product is canonical reference.")

STYLE = ("Premium cinematic product photography, dark luxury aesthetic, high-end "
         "commercial advertising quality, controlled lighting, physically realistic "
         "reflections and shadows, sharp industrial detail, minimal but dramatic "
         "composition, no on-image typography, no headline text, no logos other than "
         "the TITANBANKS wordmark already on the device.")

SCENES = [
    ("01_studio_floating_orange_rim_9x16",   "9:16", "powerbank floats mid-air against deep matte black void, single warm orange (#FF6B00) rim light from camera right, faint reflective floor catching the glow, slight low-angle 3/4 view"),
    ("02_obsidian_plinth_topdown_1x1",       "1:1",  "powerbank lies flat on a polished obsidian plinth, top-down composition, soft cool key light from above, subtle warm orange under-glow from carry loop area"),
    ("03_concrete_bench_dusk_3x4",           "3:4",  "powerbank stands upright on weathered dark concrete bench, blurred urban dusk in background, no people, single warm orange rim light from left, atmospheric haze"),
    ("04_water_droplets_macro_9x16",         "9:16", "powerbank on wet matte black slate covered in fine water droplets, dramatic side-lit moisture catching orange rim light, mirror reflection beneath"),
    ("05_marble_pedestal_lowkey_3x4",        "3:4",  "powerbank on a black marble pedestal with veined surface, museum lowkey lighting, single soft amber spotlight, deep shadows"),
    ("06_charging_table_workspace_16x9",     "16:9", "powerbank on a dark walnut workspace next to a closed laptop and a leather notebook, warm desk lamp glow from upper-right, cinematic depth of field, no people"),
    ("07_carbon_fiber_3q_lowangle_9x16",     "9:16", "powerbank on a brushed carbon-fiber surface, dramatic low-angle 3/4 hero view, blue-orange split light (cool key, warm rim), industrial premium mood"),
    ("08_velvet_drape_silent_luxury_3x4",    "3:4",  "powerbank resting on dark navy velvet drape, soft directional warm light, jewelry-grade silent-luxury composition, shallow depth of field"),
    ("09_rooftop_concrete_blue_hour_9x16",   "9:16", "powerbank standing on a rooftop concrete edge during blue hour, distant blurred city lights bokeh, single warm rim light from camera left, no people"),
    ("10_glass_pane_reflection_1x1",         "1:1",  "powerbank on a black glass pane creating mirror reflection, single overhead warm spotlight, geometric symmetrical composition"),
    ("11_oil_pool_surface_macro_3x4",        "3:4",  "powerbank half-immersed visual on dark reflective oil-like surface (no actual liquid contact), iridescent subtle highlights, dramatic side-lit"),
    ("12_steel_grate_industrial_9x16",       "9:16", "powerbank on a black steel grate floor in an industrial setting, harsh directional warm light through grate creating shadow pattern, premium grit"),
    ("13_leather_chair_arm_lifestyle_3x4",   "3:4",  "powerbank resting on the arm of a dark leather chair, warm tungsten ambient room light, blurred bookshelf in background, no people, evening mood"),
    ("14_floating_dust_volumetric_9x16",     "9:16", "powerbank center frame against deep black, volumetric warm light beam from upper-right with floating dust particles, theatrical cinematic"),
    ("15_brass_tray_warm_amber_1x1",         "1:1",  "powerbank on an antiqued brass tray, warm amber room light, premium hospitality aesthetic, soft shadow, top-3q view"),
    ("16_mirror_box_infinity_3x4",           "3:4",  "powerbank inside a dark mirror box creating infinity reflection, single orange light source, surreal premium composition"),
    ("17_stone_slab_zen_minimal_16x9",       "16:9", "powerbank on a flat dark slate slab in zen minimal composition, single soft top light, lots of negative space, calm premium mood"),
    ("18_chrome_surface_reflection_9x16",    "9:16", "powerbank on polished black chrome surface, dramatic warm orange rim light, mirror-clean reflection, hyper-detailed product hero"),
    ("19_smoke_atmosphere_dramatic_3x4",     "3:4",  "powerbank center frame with subtle warm-lit smoke atmosphere drifting in background, deep black void, single hard rim light from camera right, theatrical"),
    ("20_charcoal_fabric_silent_3x4",        "3:4",  "powerbank on folded charcoal-grey fabric backdrop, soft warm directional key light, silent-luxury still-life mood, shallow DOF"),
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

def tg_send_text(text):
    body = urllib.parse.urlencode({"chat_id": CHAT_ID, "text": text}).encode()
    try:
        urllib.request.urlopen(urllib.request.Request(
            f"https://api.telegram.org/bot{TOKEN}/sendMessage", data=body)).read()
    except Exception:
        pass

def gen(name, aspect, scene_desc, idx, total):
    out = INBOX / f"titanx_{name}.png"
    prompt = f"{GEOM}\n\nSCENE: {scene_desc}.\n\nSTYLE: {STYLE}"
    print(f"\n[{idx}/{total}] {name} ({aspect})")
    t0 = time.time()
    proc = subprocess.run(
        ["higgsfield.cmd", "generate", "create", "nano_banana_2",
         "--prompt", prompt,
         "--image", str(REF),
         "--aspect_ratio", aspect,
         "--wait", "--wait-timeout", "20m", "--json"],
        capture_output=True, text=True, timeout=1500, encoding="utf-8")
    el = time.time() - t0
    if proc.returncode != 0:
        print(f"  FAIL exit={proc.returncode}: {proc.stderr[-300:]}")
        return False
    m = re.search(r'"result_url":\s*"([^"]+)"', proc.stdout)
    if not m:
        print(f"  NO URL: {proc.stdout[-300:]}")
        return False
    with urllib.request.urlopen(m.group(1), timeout=120) as r:
        out.write_bytes(r.read())
    print(f"  OK {el:.0f}s -> {out.name}")
    cap = f"#{idx}/{total} {name} ({aspect})\nGeometry locked to approved baseline.\nVariation: scene/light/angle only."
    r = tg_send_photo(out, cap)
    print(f"  pushed: ok={r.get('ok')}")
    return True

if __name__ == "__main__":
    if not REF.exists():
        print("REF MISSING"); sys.exit(1)
    tg_send_text(f"Start consistency-20 batch. Ref: slot-18 OEM. Model: Nano Banana Pro.")
    ok = 0
    for i, (name, aspect, scene) in enumerate(SCENES, 1):
        if gen(name, aspect, scene, i, len(SCENES)):
            ok += 1
    tg_send_text(f"Consistency-20 batch klaar: {ok}/{len(SCENES)} succeed.")
    print(f"\n=== {ok}/{len(SCENES)} done ===")
