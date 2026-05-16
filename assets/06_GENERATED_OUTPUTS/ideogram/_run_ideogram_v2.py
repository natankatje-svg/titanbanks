"""Submit 4 revised Ideogram v3 jobs in parallel, save outputs to inbox/ with _v2 suffix."""
import os, re, json, urllib.request, urllib.error, concurrent.futures, pathlib, time

KEY = os.environ["IDEOGRAM_API_KEY"]
PASTE_DIR = pathlib.Path(r"C:\Users\natan\TitanBanks\assets\05_GENERATION_PROMPTS\ideogram\_paste")
OUT_DIR = pathlib.Path(r"C:\Users\natan\TitanBanks\assets\06_GENERATED_OUTPUTS\ideogram\inbox")
OUT_DIR.mkdir(parents=True, exist_ok=True)

JOBS = [
    ("angle-01_never-at-0_A2_lifestyle-backpack.txt", "9x16", "ideogram_angle-01_A2_lifestyle_v2"),
    ("angle-02_strap_B1_hero-macro.txt",              "3x4",  "ideogram_angle-02_B1_macro_v2"),
    ("angle-02_strap_B2_lifestyle-hand.txt",          "3x4",  "ideogram_angle-02_B2_lifestyle_v2"),
    ("angle-03_50000mah-not-the-point_C1_hero.txt",   "9x16", "ideogram_angle-03_C1_hero_v2"),
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

def submit(filename, aspect, out_stem):
    src = PASTE_DIR / filename
    prompt, neg = extract(src)
    body = {
        "prompt": prompt,
        "aspect_ratio": aspect,
        "rendering_speed": "QUALITY",
        "magic_prompt": "OFF",
        "style_type": "REALISTIC",
        "num_images": 1,
    }
    if neg:
        body["negative_prompt"] = neg
    req = urllib.request.Request(
        "https://api.ideogram.ai/v1/ideogram-v3/generate",
        data=json.dumps(body).encode(),
        headers={"Api-Key": KEY, "Content-Type": "application/json"},
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
    }, indent=2))
    return out_stem, f"OK {elapsed:.1f}s seed={seed}"

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:
    futs = {ex.submit(submit, *j): j[0] for j in JOBS}
    for f in concurrent.futures.as_completed(futs):
        stem, msg = f.result()
        print(f"{stem}: {msg}")
