"""20 ad variants — 4 per concept (A1/A2/B1/B2/C1).
Geometry locked via slot-18 OEM ref + Nano Banana Pro.
Each variant: different background setting, different tech-font feel, premium decorations.
Pushed to Telegram one-by-one.
"""
import os, sys, json, urllib.request, urllib.parse, pathlib, time, subprocess, re, uuid

CREDS = pathlib.Path(r"C:\Users\natan\Desktop\TitanBanks-2026-05-14\API ideogram\Telegram.txt")
TOKEN, CHAT_ID = CREDS.read_text(encoding="utf-8").strip().split(",", 1)
CHAT_ID = int(CHAT_ID)
REF = pathlib.Path(r"C:\Users\natan\TitanBanks\outputs\stage1-raw\2026-05-14\slot-18_marketplace-front-3q-nbpro.png")
INBOX = pathlib.Path(r"C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\inbox\ad_variants_20")
INBOX.mkdir(parents=True, exist_ok=True)

GEOM = ("Use the EXACT powerbank from the reference: identical proportions, two-part body with "
        "overhanging port-cap, glossy front display showing '100%' with green charge icon, "
        "TITANBANKS wordmark in the same position and scale, orange woven carry loop on upper-left "
        "with 'POWER BANK' embossed text, identical port layout, button placement, flashlight "
        "position, surface texture and matte materials. Do NOT redesign or alter geometry.")

FONT_FUT = ("In-image typography uses a futuristic monospace tech font (think JetBrains Mono / Geist "
            "Mono / NB Architekt), tight letter-spacing, high contrast.")
FONT_BOLD = ("In-image typography uses a bold geometric sans (think Eurostile / Druk / NB Akademie "
             "Bold), wide stance, confident.")
FONT_MIN = ("In-image typography uses a minimal humanist sans (think Inter / Helvetica Neue Thin), "
            "generous tracking, calm and editorial.")
FONT_EDIT = ("In-image typography uses a premium editorial tech sans (think Söhne / GT America / "
             "Suisse Int'l), refined hierarchy, magazine-style.")

DEC_RETICLE = ("Decorations: thin orange (#FF6B00) crosshair reticle marks at corners, hairline spec "
               "callouts (e.g. '50,000 mAh', '4 OUTPUTS'), small uppercase coordinate label.")
DEC_SCAN = ("Decorations: subtle horizontal scan-line texture overlay, thin orange underline beneath "
            "headline, faint tech-grid behind product, tiny build-code label bottom-corner.")
DEC_PLATE = ("Decorations: matte-black spec plate with thin orange border holding micro-copy, "
             "engraved-style divider line, small triangle index marker.")
DEC_DOTS = ("Decorations: subtle dot-grid background pattern, thin orange tick marks framing the "
            "headline, small uppercase label band ('TITAN X · 2026').")

JOBS = [
    # A1 hero — Never at 0.
    ("A1_v1_studio_fut_reticle_9x16", "9:16",
     "Premium 9:16 vertical hero ad. Powerbank floats centered against deep matte black void with "
     "warm orange (#FF6B00) rim light from camera right. " + FONT_FUT + " Top-center small white "
     "'TITANBANKS', under it light grey 'TITAN X · COMING SOON', large white centered headline "
     "'Never at 0.', smaller white sub 'While the world looks for an outlet, you keep going.', "
     "bottom matte-black pill with thin orange border 'Join the Waitlist'. " + DEC_RETICLE),
    ("A1_v2_carbon_bold_scan_9x16", "9:16",
     "Premium 9:16 hero. Powerbank upright on subtle brushed carbon-fiber plinth, blue-orange "
     "split lighting (cool key, warm rim). " + FONT_BOLD + " Top center white 'TITANBANKS', light "
     "grey 'TITAN X · COMING SOON', big bold centered 'Never at 0.', sub 'While the world looks "
     "for an outlet, you keep going.', bottom CTA pill 'Join the Waitlist'. " + DEC_SCAN),
    ("A1_v3_concrete_min_plate_9x16", "9:16",
     "Premium 9:16 hero. Powerbank on raw dark concrete pedestal, soft warm key light, deep "
     "shadows. " + FONT_MIN + " Top center 'TITANBANKS', under it 'TITAN X · COMING SOON', "
     "large minimal 'Never at 0.', sub 'While the world looks for an outlet, you keep going.', "
     "bottom matte pill 'Join the Waitlist'. " + DEC_PLATE),
    ("A1_v4_glass_edit_dots_9x16", "9:16",
     "Premium 9:16 hero. Powerbank on dark mirror-glass pane creating clean reflection, single "
     "warm spotlight. " + FONT_EDIT + " Top center 'TITANBANKS', 'TITAN X · COMING SOON', "
     "large editorial 'Never at 0.', sub 'While the world looks for an outlet, you keep going.', "
     "bottom CTA pill 'Join the Waitlist'. " + DEC_DOTS),

    # A2 lifestyle — Never at 0. backpack
    ("A2_v1_rooftop_fut_reticle_9x16", "9:16",
     "Premium 9:16 lifestyle ad. Powerbank on top of folded charcoal backpack on a dark rooftop "
     "edge during blue hour, distant blurred city lights, no people, warm orange rim from left. "
     + FONT_FUT + " Top 'TITANBANKS', 'TITAN X · COMING SOON', large 'Never at 0.', sub 'Built "
     "for long days without an outlet.', bottom CTA 'Join the Waitlist'. " + DEC_RETICLE),
    ("A2_v2_train_bold_scan_9x16", "9:16",
     "Premium 9:16 lifestyle ad. Powerbank on a dark train-station bench, blurred motion of a "
     "passing train at night, no people, warm rim light. " + FONT_BOLD + " Top 'TITANBANKS', "
     "'TITAN X · COMING SOON', big bold 'Never at 0.', sub 'Built for long days without an "
     "outlet.', bottom CTA 'Join the Waitlist'. " + DEC_SCAN),
    ("A2_v3_cafe_min_plate_9x16", "9:16",
     "Premium 9:16 lifestyle ad. Powerbank on a dark walnut cafe table at dusk, blurred warm "
     "interior bokeh, no people. " + FONT_MIN + " Top 'TITANBANKS', 'TITAN X · COMING SOON', "
     "calm 'Never at 0.', sub 'Built for long days without an outlet.', bottom CTA 'Join the "
     "Waitlist'. " + DEC_PLATE),
    ("A2_v4_workshop_edit_dots_9x16", "9:16",
     "Premium 9:16 lifestyle ad. Powerbank on a dark steel workbench in a tech workshop with "
     "blurred warm tool-light bokeh, no people. " + FONT_EDIT + " Top 'TITANBANKS', 'TITAN X "
     "· COMING SOON', editorial 'Never at 0.', sub 'Built for long days without an outlet.', "
     "bottom CTA 'Join the Waitlist'. " + DEC_DOTS),

    # B1 strap macro — The strap people ask about.
    ("B1_v1_marble_fut_reticle_3x4", "3:4",
     "Premium 3:4 macro hero. Orange carry loop is the foreground subject draping across the "
     "frame in detail; powerbank lies on its side on dark veined marble, deep shadow. "
     + FONT_FUT + " Top center small 'TITANBANKS', upper-left large left-aligned 'The strap "
     "people ask about.', small 'TITAN X · COMING SOON' under it, bottom-right matte pill "
     "'Coming Soon'. " + DEC_RETICLE),
    ("B1_v2_velvet_bold_scan_3x4", "3:4",
     "Premium 3:4 macro. Loop in macro foreground, powerbank on dark navy velvet drape, jewelry-"
     "grade silent-luxury, single warm key. " + FONT_BOLD + " Top 'TITANBANKS', upper-left big "
     "bold 'The strap people ask about.', sub 'TITAN X · COMING SOON', bottom-right pill "
     "'Coming Soon'. " + DEC_SCAN),
    ("B1_v3_steel_min_plate_3x4", "3:4",
     "Premium 3:4 macro. Loop draping over polished black steel surface, powerbank in soft "
     "shadow, harsh directional warm light. " + FONT_MIN + " Top 'TITANBANKS', upper-left "
     "minimal 'The strap people ask about.', sub 'TITAN X · COMING SOON', bottom-right pill "
     "'Coming Soon'. " + DEC_PLATE),
    ("B1_v4_obsidian_edit_dots_3x4", "3:4",
     "Premium 3:4 macro. Loop in fine fiber detail, powerbank on polished obsidian plinth, "
     "single overhead amber spotlight. " + FONT_EDIT + " Top 'TITANBANKS', upper-left editorial "
     "'The strap people ask about.', sub 'TITAN X · COMING SOON', bottom-right pill 'Coming "
     "Soon'. " + DEC_DOTS),

    # B2 hand on strap — The strap people ask about.
    ("B2_v1_void_fut_reticle_3x4", "3:4",
     "Premium 3:4 lifestyle. A single hand and forearm enters from upper-right and lifts the "
     "powerbank by its orange loop; no face, no second hand, no jewelry. Deep matte-black void "
     "background, warm rim light from right. " + FONT_FUT + " Top 'TITANBANKS', upper-left "
     "'The strap people ask about.', sub 'TITAN X · COMING SOON', bottom-right pill 'Coming "
     "Soon'. " + DEC_RETICLE),
    ("B2_v2_concrete_bold_scan_3x4", "3:4",
     "Premium 3:4 lifestyle. Single hand lifts powerbank by orange loop; backdrop of dark "
     "weathered concrete wall, warm directional light. " + FONT_BOLD + " Top 'TITANBANKS', "
     "upper-left bold 'The strap people ask about.', sub 'TITAN X · COMING SOON', bottom-right "
     "pill 'Coming Soon'. " + DEC_SCAN),
    ("B2_v3_glass_min_plate_3x4", "3:4",
     "Premium 3:4 lifestyle. Hand lifts by loop; backdrop of dark blurred glass tower facade at "
     "night with subtle window light bokeh. " + FONT_MIN + " Top 'TITANBANKS', upper-left calm "
     "'The strap people ask about.', sub 'TITAN X · COMING SOON', bottom-right pill 'Coming "
     "Soon'. " + DEC_PLATE),
    ("B2_v4_leather_edit_dots_3x4", "3:4",
     "Premium 3:4 lifestyle. Hand lifts by loop; backdrop of dark leather seat texture, warm "
     "interior tungsten light. " + FONT_EDIT + " Top 'TITANBANKS', upper-left editorial 'The "
     "strap people ask about.', sub 'TITAN X · COMING SOON', bottom-right pill 'Coming Soon'. "
     + DEC_DOTS),

    # C1 spec — 50,000 mAh.
    ("C1_v1_void_fut_reticle_9x16", "9:16",
     "Premium 9:16 spec hero. Powerbank centered upright on barely-visible plinth in deep matte "
     "void, slight low-angle 3/4 view, warm orange rim. " + FONT_FUT + " Top 'TITANBANKS', "
     "'TITAN X · COMING SOON', large centered '50,000 mAh.', sub 'But that is not the point.', "
     "bottom CTA pill 'Discover the build'. " + DEC_RETICLE),
    ("C1_v2_carbon_bold_scan_9x16", "9:16",
     "Premium 9:16 spec hero. Powerbank on dark brushed-carbon surface, blue-orange split light. "
     + FONT_BOLD + " Top 'TITANBANKS', 'TITAN X · COMING SOON', big bold centered '50,000 mAh.', "
     "sub 'But that is not the point.', bottom CTA pill 'Discover the build'. " + DEC_SCAN),
    ("C1_v3_marble_min_plate_9x16", "9:16",
     "Premium 9:16 spec hero. Powerbank on black marble pedestal, museum lowkey lighting, soft "
     "amber spot. " + FONT_MIN + " Top 'TITANBANKS', 'TITAN X · COMING SOON', minimal centered "
     "'50,000 mAh.', sub 'But that is not the point.', bottom CTA pill 'Discover the build'. "
     + DEC_PLATE),
    ("C1_v4_chrome_edit_dots_9x16", "9:16",
     "Premium 9:16 spec hero. Powerbank on polished black chrome with mirror reflection, single "
     "warm rim. " + FONT_EDIT + " Top 'TITANBANKS', 'TITAN X · COMING SOON', editorial centered "
     "'50,000 mAh.', sub 'But that is not the point.', bottom CTA pill 'Discover the build'. "
     + DEC_DOTS),
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
    try: return json.loads(urllib.request.urlopen(req, timeout=120).read())
    except Exception as e: return {"ok": False, "error": str(e)[:300]}

def tg_text(text):
    body = urllib.parse.urlencode({"chat_id": CHAT_ID, "text": text}).encode()
    try: urllib.request.urlopen(urllib.request.Request(f"https://api.telegram.org/bot{TOKEN}/sendMessage", data=body)).read()
    except Exception: pass

JOB_IDS_LOG = INBOX / "_job_ids.txt"

def gen(name, aspect, scene, idx, total):
    out = INBOX / f"{name}.png"
    prompt = f"{GEOM}\n\n{scene}\n\nPremium cinematic product photography, dark luxury aesthetic, controlled lighting, sharp industrial detail."
    print(f"\n[{idx}/{total}] {name} ({aspect})")
    t0 = time.time()
    proc = subprocess.run(
        ["higgsfield.cmd", "generate", "create", "nano_banana_2",
         "--prompt", prompt, "--image", str(REF),
         "--aspect_ratio", aspect, "--wait", "--wait-timeout", "20m", "--json"],
        capture_output=True, text=True, timeout=1500, encoding="utf-8")
    el = time.time() - t0
    stdout = proc.stdout or ""
    # Capture job id either from result_url or the bare uuid
    m = re.search(r'"result_url":\s*"([^"]+)"', stdout)
    jid_m = re.search(r'([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', stdout)
    if jid_m:
        with JOB_IDS_LOG.open("a") as f: f.write(f"{name}\t{jid_m.group(1)}\n")
    if proc.returncode != 0:
        print(f"  FAIL exit={proc.returncode}: {proc.stderr[-300:]}")
        return False
    if not m and jid_m:
        # Fetch by id
        time.sleep(2)
        gp = subprocess.run(["higgsfield.cmd", "generate", "get", jid_m.group(1), "--json"],
                            capture_output=True, text=True, timeout=60, encoding="utf-8")
        try:
            data = json.loads(gp.stdout)
            url = data.get("result_url")
            if url:
                m = re.match(r'(.+)', url)
                class M:
                    def group(self, _): return url
                m = M()
        except Exception: pass
    if not m:
        print(f"  NO URL: {stdout[-200:]}")
        return False
    url = m.group(1)
    try:
        with urllib.request.urlopen(url, timeout=120) as r:
            out.write_bytes(r.read())
    except Exception as e:
        print(f"  download fail: {e}"); return False
    print(f"  OK {el:.0f}s -> {out.name}")
    cap = f"#{idx}/{total} {name} ({aspect})\nGeometry locked. New bg + tech font + decoration variant."
    r = tg_send_photo(out, cap)
    print(f"  pushed: ok={r.get('ok')}")
    return True

if __name__ == "__main__":
    if not REF.exists():
        print("REF MISSING"); sys.exit(1)
    tg_text(f"Start ad-variants-20 batch (4 per A1/A2/B1/B2/C1).")
    ok = 0
    for i, (name, aspect, scene) in enumerate(JOBS, 1):
        if gen(name, aspect, scene, i, len(JOBS)):
            ok += 1
    tg_text(f"Ad-variants-20 batch klaar: {ok}/{len(JOBS)} succeed. Locatie: inbox/ad_variants_20/")
    print(f"\n=== {ok}/{len(JOBS)} done ===")
