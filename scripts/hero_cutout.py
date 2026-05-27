"""
Background removal voor hero-product shots.

Draait rembg (isnet-general-use, beste edge fidelity voor matte black powerbank
op dramatische studio-bg) en exporteert transparente PNG cutouts naar
public/images/titanx/cutout/. De hero gebruikt vervolgens een van deze als
z-3 layer waar mesh-gradient + FloatingPaths door de transparante alpha
heen schijnen.
"""

from pathlib import Path
from rembg import remove, new_session
from PIL import Image

ROOT = Path(r"C:\Users\natan\TitanBanks")
OUT = ROOT / "public" / "images" / "titanx" / "cutout"
OUT.mkdir(parents=True, exist_ok=True)

# isnet-general-use → scherpste matting voor product photography met fijne
# details (lanyard touw, schaduw-randjes). u2net is sneller maar mist randen.
session = new_session("isnet-general-use")

SOURCES = [
    ROOT / "public" / "images" / "titanx" / "clean" / "hero-warm-rim.png",
    ROOT / "public" / "images" / "slots" / "slot-02.png",
    ROOT / "public" / "images" / "slots" / "slot-03.png",
    ROOT / "public" / "images" / "slots" / "slot-05.png",
    ROOT / "public" / "images" / "slots" / "slot-09.png",
]

for src in SOURCES:
    if not src.exists():
        print(f"[skip] {src.name} not found")
        continue
    print(f"[proc] {src.name} ({src.stat().st_size // 1024} KB)")
    img = Image.open(src).convert("RGBA")
    cut = remove(img, session=session, alpha_matting=True,
                 alpha_matting_foreground_threshold=240,
                 alpha_matting_background_threshold=20,
                 alpha_matting_erode_size=4)
    out_name = src.stem + "-cutout.png"
    out_path = OUT / out_name
    cut.save(out_path, "PNG", optimize=True)
    print(f"[done] -> {out_path} ({out_path.stat().st_size // 1024} KB)")

print("\nALL DONE. Cutouts staan in:", OUT)
