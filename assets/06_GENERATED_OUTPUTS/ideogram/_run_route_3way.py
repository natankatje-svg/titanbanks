"""Run 3 routes in parallel:
- C1: Ideogram + dark cinematic refs (slot-06/09/10), no silhouettes in prompt
- B2: GPT Image 2 via Higgsfield (proven for hands)
- B1: Ideogram text-free (no headline/CTA blocks, leave room for Photoshop overlay)
"""
import os, re, json, urllib.request, urllib.error, concurrent.futures, pathlib, time, mimetypes, uuid, subprocess

KEY = os.environ["IDEOGRAM_API_KEY"]
PASTE_DIR = pathlib.Path(r"C:\Users\natan\TitanBanks\assets\05_GENERATION_PROMPTS\ideogram\_paste")
OUT_DIR   = pathlib.Path(r"C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\inbox")
REF_DIR   = pathlib.Path(r"C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\_refs_resized")
SRC_REF   = pathlib.Path(r"C:\Users\natan\TitanBanks\outputs\stage1-raw\2026-05-14")

# Resize dark-cinematic refs we need (slot-06, slot-09 already done, slot-10 needs resize)
def ensure_resized(name):
    out = REF_DIR / name.replace(".png", ".jpg")
    if out.exists(): return out
    from PIL import Image
    src = SRC_REF / name
    im = Image.open(src).convert("RGB")
    im.thumbnail((1024, 1024))
    im.save(out, quality=88)
    return out

REF_DARK_HERO   = ensure_resized("slot-06_warm-orange-rim-nbpro.png")
REF_LOOP_MACRO  = ensure_resized("slot-09_material-macro-body-nbpro.png")
REF_DISPLAY_MAC = ensure_resized("slot-10_display-macro-nbpro.png")
REF_PORT_DETAIL = ensure_resized("slot-11_port-detail-nbpro.png")

CANONICAL_GEOMETRY = """
PRODUCT GEOMETRY (matches the dark-cinematic reference images attached):
- The Titan X is a chunky rectangular brick — substantially taller than wide, NOT slim, NOT smartphone-shaped.
- FRONT face (the wide tall face we look at): a glossy black recessed display panel near the top containing an LED dot-matrix readout reading "100%" with a small green charge icon. Below the display panel, near the bottom of the front face, the small "TITANBANKS" wordmark (spelled T-I-T-A-N-B-A-N-K-S, ten letters, including the trailing S).
- TOP face (short end facing up): port array — four USB-A ports (purple/blue accent visible in slot), one USB-C input port, one Micro-USB input port.
- The orange woven carry loop is anchored at the LEFT EDGE of the front face, mid-height, drapes downward under gravity. The loop has "POWER BANK" embossed horizontally as two words.
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

WRONG_PATTERNS = [
    r"Top face shows a small \"TITANBANKS\" wordmark and an LED dot-matrix display window reading \"100%\"[^.]*\.",
    r"Top face shows the small \"TITANBANKS\" wordmark and an LED display reading \"100%\"[^.]*\.",
    r"top face showing a small \"TITANBANKS\" wordmark and an LED dot-matrix display window reading \"100%\"[^.]*\.",
    r"display is on the TOP face of the brick, not the side face\.?",
    r"display on the TOP face of the brick \(not the side face\)\.?",
    r"the display is on the TOP face of the brick, not the side face\.?",
]

def correct_geometry(prompt: str) -> str:
    for pat in WRONG_PATTERNS:
        prompt = re.sub(pat, "", prompt, flags=re.IGNORECASE)
    if "SCENE" in prompt:
        prompt = prompt.replace("SCENE", CANONICAL_GEOMETRY.strip() + "\n\nSCENE", 1)
    else:
        prompt = CANONICAL_GEOMETRY.strip() + "\n\n" + prompt
    return prompt

def strip_text_blocks(prompt: str) -> str:
    """For text-free render: remove the TEXT IN IMAGE block and the EMBOSSED rule."""
    # Remove TEXT IN IMAGE section through the next blank line
    prompt = re.sub(r"TEXT IN IMAGE.*?(?=\n\nEMBOSSED|\n\nSCENE|\n\nPRODUCT GEOMETRY|\n\nCRITICAL)", "", prompt, flags=re.DOTALL)
    # Remove EMBOSSED block too — we'll add the loop in Photoshop
    prompt = re.sub(r"EMBOSSED TEXT ON THE CARRY LOOP.*?(?=\n\nSCENE|\n\nPRODUCT GEOMETRY|\n\nCRITICAL)", "", prompt, flags=re.DOTALL)
    # Add explicit no-text instruction
    prompt = "RENDER WITH NO IN-IMAGE TEXT WHATSOEVER. No headline, no subhead, no CTA pill, no wordmark on the brick (it can be implied but should not be legible text), no embossing on the loop. This is a master plate; typography will be added in post-production.\n\n" + prompt
    return prompt

def drop_silhouettes(prompt: str) -> str:
    """Remove the 6-silhouettes paragraph from C1 since Ideogram won't render them."""
    prompt = re.sub(r"Six (?:extremely faint|clearly visible).*?recognizable brand logos\.", "", prompt, flags=re.DOTALL)
    return prompt

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

def ideogram_call(prompt, negative, aspect, refs, out_stem, label):
    fields = [
        ("prompt", prompt),
        ("aspect_ratio", aspect),
        ("rendering_speed", "QUALITY"),
        ("magic_prompt", "OFF"),
        ("style_type", "AUTO"),
        ("num_images", "1"),
    ]
    if negative: fields.append(("negative_prompt", negative))
    files = [(p.name, p) for p in refs]
    body, ctype = build_multipart(fields, files)
    req = urllib.request.Request(
        "https://api.ideogram.ai/v1/ideogram-v3/generate",
        data=body, headers={"Api-Key": KEY, "Content-Type": ctype}, method="POST",
    )
    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            data = json.loads(r.read())
    except urllib.error.HTTPError as e:
        return out_stem, f"{label}: HTTP {e.code}: {e.read().decode()[:300]}"
    elapsed = time.time() - t0
    if not data.get("data"):
        return out_stem, f"{label}: no data: {json.dumps(data)[:300]}"
    item = data["data"][0]
    out_path = OUT_DIR / f"{out_stem}.png"
    with urllib.request.urlopen(item["url"], timeout=120) as r:
        out_path.write_bytes(r.read())
    (OUT_DIR / f"{out_stem}.json").write_text(json.dumps({
        "label": label, "aspect": aspect, "seed": item.get("seed"),
        "elapsed_s": round(elapsed, 1), "url": item["url"], "saved": str(out_path),
        "refs": [str(p) for p in refs],
    }, indent=2))
    return out_stem, f"{label}: OK {elapsed:.1f}s seed={item.get('seed')}"

def higgsfield_call(prompt, aspect, out_stem, label):
    """Run via higgsfield CLI (gpt_image_2). Aspect: 9:16, 4:5 (no), 3:4."""
    t0 = time.time()
    proc = subprocess.run(
        ["higgsfield", "generate", "create", "gpt_image_2",
         "--prompt", prompt,
         "--aspect_ratio", aspect,
         "--quality", "high",
         "--resolution", "2k",
         "--wait", "--wait-timeout", "20m", "--json"],
        capture_output=True, text=True, timeout=1200,
    )
    elapsed = time.time() - t0
    if proc.returncode != 0:
        return out_stem, f"{label}: higgsfield failed: {proc.stderr[:300]}"
    try:
        data = json.loads(proc.stdout)
        j = data[0] if isinstance(data, list) else data
        url = j.get("result_url")
        if not url:
            return out_stem, f"{label}: no url in: {proc.stdout[:300]}"
    except Exception as e:
        return out_stem, f"{label}: parse fail: {e} :: {proc.stdout[:300]}"
    out_path = OUT_DIR / f"{out_stem}.png"
    with urllib.request.urlopen(url, timeout=120) as r:
        out_path.write_bytes(r.read())
    (OUT_DIR / f"{out_stem}.json").write_text(json.dumps({
        "label": label, "model": "gpt_image_2", "aspect": aspect,
        "elapsed_s": round(elapsed, 1), "url": url, "saved": str(out_path),
    }, indent=2))
    return out_stem, f"{label}: OK {elapsed:.1f}s"

# === Build the 3 jobs ===

def job_C1():
    prompt, neg = extract(PASTE_DIR / "angle-03_50000mah-not-the-point_C1_hero.txt")
    prompt = correct_geometry(prompt)
    prompt = drop_silhouettes(prompt)
    refs = [REF_DARK_HERO, REF_DISPLAY_MAC, REF_LOOP_MACRO]  # all dark cinematic
    return ideogram_call(prompt, neg, "9x16", refs, "ideogram_angle-03_C1_hero_v4_dark", "C1 dark refs no silhouettes")

def job_B2():
    prompt, neg = extract(PASTE_DIR / "angle-02_strap_B2_lifestyle-hand.txt")
    prompt = correct_geometry(prompt)
    # Combine prompt + critical negatives for GPT Image 2 (single prompt format)
    full = prompt + "\n\nDO NOT INCLUDE: " + neg
    return higgsfield_call(full, "3:4", "gpt_angle-02_B2_lifestyle_v4", "B2 GPT Image 2 hand")

def job_B1():
    prompt, neg = extract(PASTE_DIR / "angle-02_strap_B1_hero-macro.txt")
    prompt = correct_geometry(prompt)
    prompt = strip_text_blocks(prompt)
    refs = [REF_LOOP_MACRO, REF_DARK_HERO, REF_DISPLAY_MAC]  # dark + loop + display
    return ideogram_call(prompt, neg, "3x4", refs, "ideogram_angle-02_B1_macro_v4_textfree", "B1 text-free dark refs")

if __name__ == "__main__":
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    REF_DIR.mkdir(parents=True, exist_ok=True)
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as ex:
        futs = [ex.submit(job_C1), ex.submit(job_B2), ex.submit(job_B1)]
        for f in concurrent.futures.as_completed(futs):
            stem, msg = f.result()
            print(msg)
