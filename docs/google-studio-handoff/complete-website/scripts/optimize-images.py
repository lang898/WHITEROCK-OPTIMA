import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
MANIFEST = ROOT / "data" / "image-manifest.json"
manifest = {}

for path in ASSETS.rglob("*"):
    if path.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
        continue
    if path.name == "favicon.png":
        continue

    with Image.open(path) as img:
        img = img.convert("RGB")
        max_width = 1800
        if img.width > max_width:
            ratio = max_width / img.width
            img = img.resize((max_width, int(img.height * ratio)), Image.Resampling.LANCZOS)

        if path.suffix.lower() in {".jpg", ".jpeg"}:
            jpg_path = path
        else:
            jpg_path = path.with_suffix(".jpg")

        img.save(jpg_path, "JPEG", quality=82, optimize=True, progressive=True)

        webp_path = path.with_suffix(".webp")
        img.save(webp_path, "WEBP", quality=78, method=6)

        manifest[jpg_path.relative_to(ROOT).as_posix()] = {"width": img.width, "height": img.height}
        manifest[webp_path.relative_to(ROOT).as_posix()] = {"width": img.width, "height": img.height}

MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

print("Optimized images and generated real WebP files.")
