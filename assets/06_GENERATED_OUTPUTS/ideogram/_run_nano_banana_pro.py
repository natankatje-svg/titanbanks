"""Generate 5 ad images via Higgsfield Nano Banana Pro using slot-18 OEM photo as input.

Goal: insert the EXACT powerbank from the OEM reference instead of letting the model hallucinate.
"""
import os, sys, json, urllib.request, pathlib, time, subprocess, re, mimetypes, uuid

CREDS_FILE = pathlib.Path(r"C:\Users\natan\Desktop\TitanBanks-2026-05-14\API ideogram\Telegram.txt")
TG_TOKEN, TG_CHAT_ID = CREDS_FILE.read_text(encoding="utf-8").strip().split(",", 1)
TG_CHAT_ID = int(TG_CHAT_ID)

REF_IMG = pathlib.Path(r"C:\Users\natan\TitanBanks\outputs\stage1-raw\2026-05-14\slot-18_marketplace-front-3q-nbpro.png")
INBOX   = pathlib.Path(r"C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\inbox")

JOBS = [
    ("ideogram_angle-01_A1_hero_v6_nbp.png", "9:16",
     "Premium 9:16 vertical product advertisement using the exact powerbank from the reference image — preserve its proportions, port-cap, glossy display panel, TITANBANKS wordmark, orange woven carry loop with POWER BANK printed on it. Place the powerbank upright on a barely-visible reflective plinth in the lower half of the frame, 3/4 off-axis. The display reads '100%' with a green charge icon. Single warm orange rim light (#FF6B00) from camera right. Background deep near-black (#0A0A0A) with soft radial vignette and subtle warm underglow. Centered axis composition. Add in-image typography: top center small white 'TITANBANKS', below smaller light grey 'Titan X · Coming Soon', mid-upper very large white centered 'Never at 0.', below smaller white centered 'While the world looks for an outlet, you keep going.', bottom center white text in matte-black pill with thin orange border 'Join the Waitlist'. Cinematic low-key, silent-luxury aesthetic."),

    ("ideogram_angle-01_A2_lifestyle_v6_nbp.png", "9:16",
     "Premium 9:16 vertical lifestyle advertisement using the exact powerbank from the reference image — preserve its two-part design (main body + overhanging port cap), proportions, glossy display panel, TITANBANKS wordmark, orange woven carry loop with POWER BANK text. Place the powerbank on top of a folded charcoal-grey backpack on a dark concrete bench at dusk in a quiet urban setting. Display reads '100%' with green charge icon. Carry loop hangs over the side. Single warm orange rim light from camera right. Background dark blurred urban dusk. No people. Add in-image typography: top center small white 'TITANBANKS', below smaller light grey 'Titan X · Coming Soon', mid-upper very large white centered 'Never at 0.', below smaller white centered 'Built for long days without an outlet.', bottom center matte-black pill with thin orange border 'Join the Waitlist'. Cinematic, calm, premium."),

    ("ideogram_angle-02_B1_macro_v6_nbp.png", "3:4",
     "Premium 3:4 vertical macro hero shot using the exact powerbank from the reference image — preserve its proportions, port cap, display panel, TITANBANKS wordmark, and the orange woven carry loop with POWER BANK printed on it. The carry loop is the hero subject — large in the foreground, draping naturally, catching strong warm orange rim light (#FF6B00). Loop fibers visible in macro. Powerbank lies on its side, brick body in gentle shadow. Sharp diagonal light streak across the floor plane behind. Background deep matte black gradient (#0A0A0A to #1A1A1A). No visible plinth. Add in-image typography: top center small white 'TITANBANKS', upper-left third very large left-aligned white 'The strap people ask about.', below small white left-aligned 'Titan X · Coming Soon', bottom-right matte-black pill with thin orange border 'Coming Soon'. Cinematic silent-luxury."),

    ("gpt_angle-02_B2_lifestyle_v6_nbp.png", "3:4",
     "Premium 3:4 vertical lifestyle hand-on-strap shot using the exact powerbank from the reference image — preserve its two-part design, proportions, glossy display, TITANBANKS wordmark, and orange woven carry loop with POWER BANK text. A single human hand enters from upper-right and lifts the powerbank by its orange carry loop. Only the hand and forearm visible, no face, no second hand, no rings/watch/jewelry. Display reads '100%' with green icon. Single warm orange rim light from camera right. Deep matte black gradient background. Hand and product right two-thirds, left third clear for typography. Add: top center small white 'TITANBANKS', upper-left third very large left-aligned white 'The strap people ask about.', below small white 'Titan X · Coming Soon', bottom-right matte-black pill with thin orange border 'Coming Soon'. Cinematic, low-key, premium."),

    ("ideogram_angle-03_C1_hero_v6_nbp.png", "9:16",
     "Premium 9:16 vertical spec hero using the exact powerbank from the reference image — preserve its two-part design (main body + overhanging port cap), exact proportions, glossy display panel, TITANBANKS wordmark, orange woven carry loop with POWER BANK text. Powerbank stands upright dead-center on a barely-visible plinth, slight low-angle 3/4 view. Display reads '100%' with green charge icon. Single warm orange rim light from camera right. Background near-black (#0A0A0A) with subtle radial vignette. Centered axis. Add in-image typography: top center small white 'TITANBANKS', below smaller light grey 'Titan X · Coming Soon', mid-upper very large white centered '50,000 mAh.' (with comma and period exactly), below smaller white centered 'But that is not the point.', bottom center matte-black pill with thin orange border 'Discover the build'. Cinematic, silent-luxury, Bang & Olufsen tier."),
]

def tg_send_photo(photo_path, caption):
    boundary = uuid.uuid4().hex
    pp = pathlib.Path(photo_path)
    parts = []
    for k, v in [("chat_id", str(TG_CHAT_ID)), ("caption", caption)]:
        parts.append(f"--{boundary}\r\nContent-Disposition: form-data; name=\"{k}\"\r\n\r\n{v}\r\n".encode())
    parts.append(f"--{boundary}\r\nContent-Disposition: form-data; name=\"photo\"; filename=\"{pp.name}\"\r\nContent-Type: image/png\r\n\r\n".encode())
    parts.append(pp.read_bytes())
    parts.append(b"\r\n")
    parts.append(f"--{boundary}--\r\n".encode())
    body = b"".join(parts)
    req = urllib.request.Request(f"https://api.telegram.org/bot{TG_TOKEN}/sendPhoto",
        data=body, headers={"Content-Type": f"multipart/form-data; boundary={boundary}"})
    try:
        return json.loads(urllib.request.urlopen(req).read())
    except Exception as e:
        return {"ok": False, "error": str(e)[:300]}

def gen_one(out_name, aspect, prompt):
    out_path = INBOX / out_name
    print(f"\n--- {out_name} ({aspect}) ---")
    t0 = time.time()
    proc = subprocess.run(
        ["higgsfield.cmd", "generate", "create", "nano_banana_2",
         "--prompt", prompt,
         "--image", str(REF_IMG),
         "--aspect_ratio", aspect,
         "--wait", "--wait-timeout", "20m", "--json"],
        capture_output=True, text=True, timeout=1500, encoding="utf-8")
    elapsed = time.time() - t0
    if proc.returncode != 0:
        print(f"  FAIL exit={proc.returncode}: {proc.stderr[-400:]}")
        return False
    m = re.search(r'"result_url":\s*"([^"]+)"', proc.stdout)
    if not m:
        print(f"  NO URL: {proc.stdout[-400:]}")
        return False
    url = m.group(1)
    with urllib.request.urlopen(url, timeout=120) as r:
        out_path.write_bytes(r.read())
    print(f"  OK {elapsed:.1f}s -> {out_path.name}")
    cap = f"REFERENCE-BASED via Nano Banana Pro\n{out_name.replace('_v6_nbp','').replace('_',' ')}\nUsing slot-18 OEM as input for accuracy."
    r = tg_send_photo(out_path, cap)
    print(f"  pushed: ok={r.get('ok')}")
    return True

if __name__ == "__main__":
    if not REF_IMG.exists():
        print(f"REF MISSING: {REF_IMG}"); sys.exit(1)
    INBOX.mkdir(parents=True, exist_ok=True)
    ok = 0
    for name, aspect, prompt in JOBS:
        if gen_one(name, aspect, prompt):
            ok += 1
    print(f"\n=== {ok}/{len(JOBS)} done ===")
