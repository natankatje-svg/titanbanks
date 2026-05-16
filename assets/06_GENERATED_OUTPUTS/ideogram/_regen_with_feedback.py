"""Regenerate any photo that has feedback in _feedback/<filename>.feedback.md.

For each feedback file:
  1. Look up the recipe from _telegram_manifest.json (matched by filename)
  2. Read the original paste-file prompt
  3. Append the user feedback as a 'REVISION FIXES' block at the top
  4. Run the appropriate runner (Ideogram with refs / Ideogram no-refs / Ideogram text-free / GPT Image 2)
  5. Save with _v<n+1> suffix in inbox/
  6. Push the new version back to Telegram with a caption noting the feedback applied

Usage: python _regen_with_feedback.py [filename1 filename2 ...]
       (no args = process all feedback files with unprocessed entries)
"""
import os, re, json, sys, urllib.request, urllib.error, pathlib, time, mimetypes, uuid, subprocess, concurrent.futures
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from _aliases import resolve, label

CREDS_FILE = pathlib.Path(r"C:\Users\natan\Desktop\TitanBanks-2026-05-14\API ideogram\Telegram.txt")
TG_TOKEN, TG_CHAT_ID = CREDS_FILE.read_text(encoding="utf-8").strip().split(",", 1)
TG_CHAT_ID = int(TG_CHAT_ID)

IDEOGRAM_KEY = pathlib.Path(r"C:\Users\natan\Desktop\TitanBanks-2026-05-14\API ideogram\Api Ideogram.txt").read_text().strip()

ROOT      = pathlib.Path(r"C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram")
PASTE_DIR = pathlib.Path(r"C:\Users\natan\TitanBanks\assets\05_GENERATION_PROMPTS\ideogram\_paste")
INBOX     = ROOT / "inbox"
REF_DIR   = ROOT / "_refs_resized"
FB_DIR    = ROOT / "_feedback"
MANIFEST  = ROOT / "_telegram_manifest.json"

CANONICAL_GEOMETRY = """
PRODUCT GEOMETRY — precise spec, must match OEM reference exactly:

OVERALL FORM
- The Titan X is a TWO-PART matte black brick: a TALLER MAIN BODY plus a SHORTER, WIDER, RAISED PORT-MODULE CAP on top.
- Total proportions of the assembled product (height : width : depth) ≈ 1.85 : 1.0 : 0.55 — distinctly taller than wide, taller than deep, but NOT skinny or smartphone-shaped. Substantial, hand-fillable brick.
- The MAIN BODY is a rounded-rectangular column (corners softly chamfered, not sharp).
- The PORT-MODULE CAP sits on top, slightly wider and slightly deeper than the main body — it OVERHANGS the body on all four sides creating a visible step/lip. Cap occupies roughly the top 22% of total height.

FRONT FACE (the wide, tall face we look at — the marketing face)
- Glossy piano-black RECESSED DISPLAY PANEL occupying the upper third of the front face. The panel is rectangular with rounded corners, set INTO the matte body so it sits flush. Roughly 60% of front-face width, 28% of front-face height.
- Inside the display panel: an LED dot-matrix readout in white, reading "100%" (three characters). To the right of the digits, a small green circular icon with a lightning bolt = the charge indicator.
- Below the display panel, descending the front face: the carry-loop MOUNTING SLOT is a small rectangular recess on the LEFT EDGE roughly mid-height. The loop passes through this slot.
- Near the BOTTOM CENTER of the front face: the "TITANBANKS" wordmark in a clean modern sans-serif (looks similar to Eurostile or a custom stylized T-letterform), white/silver against matte black. Wordmark width is about 35% of front-face width, height about 4% of front-face height — SUBTLE, not dominant.

TOP FACE (the port-module cap, viewed from above)
- A single recessed glossy-black panel inset into the cap, occupying most of the top surface.
- Inside the panel, exact port layout (looking down):
    * 4 USB-A ports in a 2×2 grid: top-left, bottom-left, top-right, bottom-right. Each port shows a purple/blue accent inside the slot (the high-current indicator).
    * 1 USB-C port in the CENTER TOP of the panel, between the two upper USB-A ports.
    * 1 Micro-USB port directly BELOW the USB-C, in the CENTER BOTTOM.
- All ports flush with the recessed panel surface.

SIDE FACES (long, narrow)
- A small recessed POWER BUTTON near the top of the side, just below the port-module cap.
- Below the button, descending: a row of LASER-ENGRAVED CERTIFICATION ICONS (FCC, CE, recycle triangle, crossed-out wheelie bin) in faint light grey.
- Below the icons: a tightly stacked LASER-ENGRAVED SPEC BLOCK in tiny faint light grey text (Model, Capacity, Inputs, Outputs, Made in China). 8-12 lines.
- Near the bottom of the side: a smaller "TITANBANKS" wordmark, also engraved.

REAR FACE (other short end, opposite the port cap — usually not shown)
- A rectangular flashlight aperture (LED) and exactly TWO retractable cables (one with USB-C connector head, one with Lightning connector head).

CARRY LOOP (signature element — must be highly visible and accurate)
- Color: vibrant ORANGE (close to #FF6B00 to #FF7A00) woven nylon webbing.
- WIDE flat strap, approximately the width of two adult fingers (~25mm). NOT a thin string, NOT a cord.
- Printed text on the loop reads exactly "POWER BANK" — two words with a space, in white/cream sans-serif, printed horizontally along the length of the strap (visible when the strap is extended).
- The loop is attached to the FRONT face's LEFT EDGE via the recessed mounting slot, mid-height. It hangs down naturally under gravity, draping with a soft curve. The visible loop length is roughly 1/2 the height of the main body when at rest.

FINISH AND MATERIAL
- Body: deep matte black plastic with subtle satin micro-grain texture (no glossy reflections except on the display panel).
- Display panel: piano-black gloss, slightly inset, mirror-like.
- All panel transitions are crisp shadow lines, not seams.

LOGO RULES
- Spelling EXACTLY "TITANBANKS" — ten letters, ending in S. No apostrophe, no period, no missing letters.
- Typeface: clean modern sans-serif with a stylized T (subtle squared serifs at the top of the T are acceptable). Avoid generic Arial/Helvetica look.
- Color: white or silver-white on matte black. Subtle, not glowing.
- Placement: small wordmark on bottom-center of front face (primary), and second smaller engraved wordmark on the side face near the bottom.
- The brick body is OTHERWISE UNMARKED — no other text, no other labels, no embossing, no large branding. The "POWER BANK" text appears ONLY on the orange carry loop strap.
"""

def extract(path):
    txt = path.read_text(encoding="utf-8")
    parts = re.split(r"━+\n", txt)
    prompt = neg = None
    for i, p in enumerate(parts):
        head = p.strip().splitlines()[0] if p.strip() else ""
        if head.startswith("PROMPT"): prompt = parts[i+1].strip()
        elif head.startswith("NEGATIVE"): neg = parts[i+1].strip()
    return prompt, neg

WRONG = [
    r"Top face shows a small \"TITANBANKS\" wordmark and an LED dot-matrix display window reading \"100%\"[^.]*\.",
    r"Top face shows the small \"TITANBANKS\" wordmark and an LED display reading \"100%\"[^.]*\.",
    r"top face showing a small \"TITANBANKS\" wordmark and an LED dot-matrix display window reading \"100%\"[^.]*\.",
    r"display is on the TOP face of the brick, not the side face\.?",
]
def correct_geom(p):
    for pat in WRONG: p = re.sub(pat, "", p, flags=re.IGNORECASE)
    if "SCENE" in p: p = p.replace("SCENE", CANONICAL_GEOMETRY.strip() + "\n\nSCENE", 1)
    else: p = CANONICAL_GEOMETRY.strip() + "\n\n" + p
    return p

def strip_text_blocks(p):
    p = re.sub(r"TEXT IN IMAGE.*?(?=\n\nEMBOSSED|\n\nSCENE|\n\nPRODUCT GEOMETRY|\n\nCRITICAL)", "", p, flags=re.DOTALL)
    p = re.sub(r"EMBOSSED TEXT ON THE CARRY LOOP.*?(?=\n\nSCENE|\n\nPRODUCT GEOMETRY|\n\nCRITICAL)", "", p, flags=re.DOTALL)
    return "RENDER WITH NO IN-IMAGE TEXT WHATSOEVER. No headline, no subhead, no CTA pill, no embossing on the loop. This is a master plate; typography will be added in post-production.\n\n" + p

def drop_silhouettes(p):
    return re.sub(r"Six (?:extremely faint|clearly visible).*?recognizable brand logos\.", "", p, flags=re.DOTALL)

# === Feedback application ===

def revision_block(feedback_text):
    return f"""REVISION FIXES (apply these corrections from human review of the previous output):
{feedback_text}

Treat each fix as a hard constraint. If a fix conflicts with the original prompt below, the fix wins.

"""

def read_feedback(filename):
    fb_file = FB_DIR / f"{filename}.feedback.md"
    if not fb_file.exists(): return None
    return fb_file.read_text(encoding="utf-8")

def latest_version_suffix(stem_no_ver):
    """Find next _vN by scanning inbox/ for matching files."""
    existing = list(INBOX.glob(f"{stem_no_ver}_v*.png")) + list(INBOX.glob(f"{stem_no_ver}.png"))
    nums = []
    for p in existing:
        m = re.search(r"_v(\d+)", p.stem)
        if m: nums.append(int(m.group(1)))
    return max(nums) + 1 if nums else 2

# === Multipart helper ===
def build_multipart(fields, files):
    boundary = uuid.uuid4().hex
    body = []
    for k, v in fields:
        body.append(f"--{boundary}\r\nContent-Disposition: form-data; name=\"{k}\"\r\n\r\n{v}\r\n".encode())
    for fname, fpath in files:
        ctype = mimetypes.guess_type(str(fpath))[0] or "application/octet-stream"
        body.append(f"--{boundary}\r\nContent-Disposition: form-data; name=\"style_reference_images\"; filename=\"{fname}\"\r\nContent-Type: {ctype}\r\n\r\n".encode())
        body.append(pathlib.Path(fpath).read_bytes())
        body.append(b"\r\n")
    body.append(f"--{boundary}--\r\n".encode())
    return b"".join(body), f"multipart/form-data; boundary={boundary}"

# === Per-runner ===

def run_ideogram(prompt, negative, aspect, refs, out_path):
    fields = [("prompt", prompt), ("aspect_ratio", aspect),
              ("rendering_speed", "QUALITY"), ("magic_prompt", "OFF"),
              ("style_type", "AUTO" if refs else "REALISTIC"), ("num_images", "1")]
    if negative: fields.append(("negative_prompt", negative))
    files = [(p.name, p) for p in refs]
    if files:
        body, ctype = build_multipart(fields, files)
        req = urllib.request.Request("https://api.ideogram.ai/v1/ideogram-v3/generate", data=body,
            headers={"Api-Key": IDEOGRAM_KEY, "Content-Type": ctype}, method="POST")
    else:
        # JSON path — coerce num_images to int (Ideogram strict)
        json_body = {k: v for k, v in fields}
        if "num_images" in json_body:
            json_body["num_images"] = int(json_body["num_images"])
        body = json.dumps(json_body).encode()
        req = urllib.request.Request("https://api.ideogram.ai/v1/ideogram-v3/generate", data=body,
            headers={"Api-Key": IDEOGRAM_KEY, "Content-Type": "application/json"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            data = json.loads(r.read())
    except urllib.error.HTTPError as e:
        return None, f"HTTP {e.code}: {e.read().decode()[:300]}"
    item = data["data"][0]
    with urllib.request.urlopen(item["url"], timeout=120) as r:
        out_path.write_bytes(r.read())
    return item.get("seed"), f"OK seed={item.get('seed')}"

def run_gpt_image_2(prompt, aspect, out_path):
    proc = subprocess.run(
        ["higgsfield.cmd", "generate", "create", "gpt_image_2",
         "--aspect_ratio", aspect, "--quality", "high", "--resolution", "2k",
         "--wait", "--wait-timeout", "20m", "--json"],
        input=prompt, capture_output=True, text=True, timeout=1500, encoding="utf-8")
    if proc.returncode != 0:
        return None, f"FAIL: {proc.stderr[-300:]}"
    m = re.search(r'"result_url":\s*"([^"]+)"', proc.stdout)
    if not m: return None, f"NO URL: {proc.stdout[-300:]}"
    url = m.group(1)
    with urllib.request.urlopen(url, timeout=120) as r:
        out_path.write_bytes(r.read())
    return None, "OK"

# === Push ===
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
    except urllib.error.HTTPError as e:
        return {"ok": False, "error": e.read().decode()[:300]}

# === Process one ===
def process(filename, recipe, feedback_text):
    paste = PASTE_DIR / recipe["paste_file"]
    prompt, negative = extract(paste)
    prompt = correct_geom(prompt)
    if recipe["runner"] == "ideogram_v3_textfree_dark_refs":
        prompt = strip_text_blocks(prompt)
    if recipe["runner"] == "ideogram_v3_dark_refs_no_silhouettes":
        prompt = drop_silhouettes(prompt)
    # Inject feedback
    prompt = revision_block(feedback_text) + prompt

    # Determine output path
    stem = pathlib.Path(filename).stem
    base = re.sub(r"_v\d+.*$", "", stem)
    n = latest_version_suffix(base)
    out_name = f"{base}_v{n}_revised.png"
    out_path = INBOX / out_name

    refs = [REF_DIR / r for r in recipe.get("refs", []) if (REF_DIR / r).exists()]

    runner = recipe["runner"]
    print(f"[{recipe['concept']}] running {runner} -> {out_name}")
    if runner.startswith("ideogram"):
        seed, msg = run_ideogram(prompt, negative, recipe["aspect"], refs, out_path)
    elif runner == "gpt_image_2_higgsfield":
        full = prompt + ("\n\nDO NOT INCLUDE: " + negative if negative else "")
        seed, msg = run_gpt_image_2(full, recipe["aspect"], out_path)
    else:
        msg = f"unknown runner {runner}"
    print(f"  -> {msg}")

    if not out_path.exists():
        return out_path, msg

    cap = f"REVISION of {filename}\n{recipe['concept']}\n\nFeedback applied:\n{feedback_text[:300]}"
    r = tg_send_photo(out_path, cap)
    print(f"  pushed: ok={r.get('ok')}")
    return out_path, msg

def main(argv):
    # Source of truth for recipes: prefer MANIFEST, fall back to RECIPES dict in _send_telegram
    by_file = {}
    if MANIFEST.exists():
        try:
            manifest = json.loads(MANIFEST.read_text())
            by_file = {e["filename"]: e for e in manifest}
        except Exception: pass
    if not by_file:
        print("no manifest — falling back to _send_telegram.RECIPES")
        import importlib.util
        spec = importlib.util.spec_from_file_location("_send_telegram", str(pathlib.Path(__file__).parent / "_send_telegram.py"))
        mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
        for fn, recipe in mod.RECIPES.items():
            by_file[fn] = {"filename": fn, **recipe}

    # Args: alias (number/name) or full filename. Empty = all photos with feedback.
    raw = argv[1:]
    if raw:
        targets = []
        for a in raw:
            canonical = resolve(a)
            if canonical: targets.append(canonical)
            else: print(f"unknown alias/file: {a}")
    else:
        targets = [p.name.replace(".feedback.md","") for p in FB_DIR.glob("*.feedback.md")]
    if not targets:
        print("no feedback files found and no targets given"); return

    for t in targets:
        if not t.endswith(".png"): t += ".png"
        recipe = by_file.get(t)
        if not recipe:
            print(f"no recipe for {t}"); continue
        print(f"\n--- {label(t)} ---")
        fb = read_feedback(t)
        if not fb:
            print(f"no feedback file for {t}"); continue
        # Extract just the bullet/quote portions, not the headers
        quoted = "\n".join(line[2:] for line in fb.splitlines() if line.startswith("> "))
        if not quoted.strip():
            print(f"feedback file empty for {t}"); continue
        process(t, recipe, quoted)

if __name__ == "__main__":
    main(sys.argv)
