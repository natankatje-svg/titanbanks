"""Run Ideogram v3 with style_reference_images attached + corrected product geometry.

Geometry correction: the FIRST 5 paste-file prompts described the LED display as being
on the TOP face of the brick. The actual references show the display lives on the FRONT
face (the wide face that also carries the TITANBANKS wordmark). The TOP face holds the
port array. This runner rewrites the prompt to match the references before submitting,
and attaches 2-3 OEM photos as style_reference_images so Ideogram learns the actual look.
"""
import os, re, json, urllib.request, urllib.error, concurrent.futures, pathlib, time, mimetypes, uuid

KEY = os.environ["IDEOGRAM_API_KEY"]
PASTE_DIR = pathlib.Path(r"C:\Users\natan\TitanBanks\assets\05_GENERATION_PROMPTS\ideogram\_paste")
OUT_DIR   = pathlib.Path(r"C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\inbox")
REF_DIR   = pathlib.Path(r"C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\_refs_resized")

# Canonical OEM references (resized to 1024 JPEG for upload efficiency)
REF_GEOMETRY = [REF_DIR / "slot-18_marketplace-front-3q-nbpro.jpg",   # front 3Q hero — display + wordmark + loop attachment
                REF_DIR / "slot-19_marketplace-side-3q-nbpro.jpg",    # side 3Q — proportions + spec block
                REF_DIR / "slot-20_marketplace-top-down-ports-nbpro.jpg"]  # top face — exact port layout
REF_LOOP_MACRO = REF_DIR / "slot-09_material-macro-body-nbpro.jpg"     # extra: matte black + loop fiber close-up

JOBS = [
    # (paste_file,                                       aspect, out_stem,                          extra_refs)
    ("angle-01_never-at-0_A1_hero.txt",                  "9x16", "ideogram_angle-01_A1_hero_v3",    []),
    ("angle-01_never-at-0_A2_lifestyle-backpack.txt",    "9x16", "ideogram_angle-01_A2_lifestyle_v3", []),
    ("angle-02_strap_B1_hero-macro.txt",                 "3x4",  "ideogram_angle-02_B1_macro_v3",   [REF_LOOP_MACRO]),
    ("angle-02_strap_B2_lifestyle-hand.txt",             "3x4",  "ideogram_angle-02_B2_lifestyle_v3", [REF_LOOP_MACRO]),
    ("angle-03_50000mah-not-the-point_C1_hero.txt",      "9x16", "ideogram_angle-03_C1_hero_v3",    []),
]

CANONICAL_GEOMETRY = """
PRODUCT GEOMETRY (matches the reference images attached):
- The Titan X is a chunky rectangular brick — substantially taller than wide, NOT slim, NOT smartphone-shaped.
- FRONT face (the wide tall face we look at): a glossy black recessed display panel near the top containing an LED dot-matrix readout reading "100%" with a small green charge icon. Below the display panel, near the bottom of the front face, the small "TITANBANKS" wordmark (spelled T-I-T-A-N-B-A-N-K-S, ten letters, including the trailing S).
- TOP face (short end facing up): port array — four USB-A ports arranged in a 2x2 grid (purple/blue accent visible inside each slot), one USB-C input port (center top), one Micro-USB input port (center bottom).
- SIDE faces (long, narrow): a small recessed power button near the top, then a faint light-grey laser-engraved spec block below.
- The orange woven carry loop is anchored at the LEFT EDGE of the front face, mid-height, and drapes downward under gravity. The loop has "POWER BANK" embossed horizontally as two words.
"""

# Patterns to strip from the original prompts (they were geometrically wrong)
WRONG_PATTERNS = [
    r"Top face shows a small \"TITANBANKS\" wordmark and an LED dot-matrix display window reading \"100%\"[^.]*\.",
    r"Top face shows the small \"TITANBANKS\" wordmark and an LED display reading \"100%\"[^.]*\.",
    r"top face showing a small \"TITANBANKS\" wordmark and an LED dot-matrix display window reading \"100%\"[^.]*\.",
    r"display is on the TOP face of the brick, not the side face\.?",
    r"display on the TOP face of the brick \(not the side face\)\.?",
    r"the display is on the TOP face of the brick, not the side face\.?",
]

def extract(path):
    txt = path.read_text(encoding="utf-8")
    parts = re.split(r"━+\n", txt)
    prompt = neg = None
    for i, p in enumerate(parts):
        head = p.strip().splitlines()[0] if p.strip() else ""
        if head.startswith("PROMPT"):
            prompt = parts[i+1].strip()
        elif head.startswith("NEGATIVE"):
            neg = parts[i+1].strip()
    return prompt, neg

def correct_geometry(prompt: str) -> str:
    for pat in WRONG_PATTERNS:
        prompt = re.sub(pat, "", prompt, flags=re.IGNORECASE)
    # Inject canonical geometry block before the SCENE description
    if "SCENE" in prompt:
        prompt = prompt.replace("SCENE", CANONICAL_GEOMETRY.strip() + "\n\nSCENE", 1)
    else:
        prompt = CANONICAL_GEOMETRY.strip() + "\n\n" + prompt
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

def submit(filename, aspect, out_stem, extra_refs):
    src = PASTE_DIR / filename
    prompt, neg = extract(src)
    prompt = correct_geometry(prompt)
    refs = REF_GEOMETRY + list(extra_refs)
    # Ideogram caps style refs at 3 per call — keep first 3 most informative
    refs = refs[:3]
    fields = [
        ("prompt", prompt),
        ("aspect_ratio", aspect),
        ("rendering_speed", "QUALITY"),
        ("magic_prompt", "OFF"),
        ("style_type", "AUTO"),  # required when using style_reference_images
        ("num_images", "1"),
    ]
    if neg:
        fields.append(("negative_prompt", neg))
    files = [(p.name, p) for p in refs]
    body, ctype = build_multipart(fields, files)
    req = urllib.request.Request(
        "https://api.ideogram.ai/v1/ideogram-v3/generate",
        data=body,
        headers={"Api-Key": KEY, "Content-Type": ctype},
        method="POST",
    )
    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            data = json.loads(r.read())
    except urllib.error.HTTPError as e:
        return out_stem, f"HTTP {e.code}: {e.read().decode()[:300]}"
    elapsed = time.time() - t0
    if not data.get("data"):
        return out_stem, f"no data: {json.dumps(data)[:300]}"
    item = data["data"][0]
    url = item["url"]
    seed = item.get("seed")
    out_path = OUT_DIR / f"{out_stem}.png"
    with urllib.request.urlopen(url, timeout=120) as r:
        out_path.write_bytes(r.read())
    meta_path = OUT_DIR / f"{out_stem}.json"
    meta_path.write_text(json.dumps({
        "file": filename, "aspect": aspect, "seed": seed,
        "elapsed_s": round(elapsed, 1), "url": url, "saved": str(out_path),
        "style_refs": [str(p) for p in refs], "geometry_corrected": True,
    }, indent=2))
    return out_stem, f"OK {elapsed:.1f}s seed={seed} refs={len(refs)}"

if __name__ == "__main__":
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as ex:
        futs = {ex.submit(submit, *j): j[0] for j in JOBS}
        for f in concurrent.futures.as_completed(futs):
            stem, msg = f.result()
            print(f"{stem}: {msg}")
