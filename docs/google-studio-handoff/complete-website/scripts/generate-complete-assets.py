import json
import math
import random
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"


def font(size, bold=False):
    candidates = [
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
    ]
    for item in candidates:
        if Path(item).exists():
            return ImageFont.truetype(item, size)
    return ImageFont.load_default()


FONT = font(34)
FONT_BOLD = font(44, True)
FONT_SMALL = font(24)
FONT_SMALL_BOLD = font(25, True)


def ensure_dir(path):
    path.mkdir(parents=True, exist_ok=True)


def save_jpg(image, path):
    ensure_dir(path.parent)
    image.convert("RGB").save(path, "JPEG", quality=92, optimize=True, progressive=True)


def background(width=1536, height=1024):
    img = Image.new("RGB", (width, height), "#e5dfd4")
    pix = img.load()
    for y in range(height):
        t = y / max(1, height - 1)
        r = int(235 * (1 - t) + 199 * t)
        g = int(231 * (1 - t) + 192 * t)
        b = int(223 * (1 - t) + 181 * t)
        for x in range(width):
            pix[x, y] = (r, g, b)
    draw = ImageDraw.Draw(img, "RGBA")
    draw.rectangle((0, int(height * 0.62), width, height), fill=(174, 165, 151, 70))
    return img


def stone_texture(width, height, base=(236, 232, 222), vein=(132, 126, 116), seed=1, dark=False):
    random.seed(seed)
    if dark:
        base = (61, 62, 59)
        vein = (118, 118, 110)
    img = Image.new("RGB", (width, height), base)
    px = img.load()
    for y in range(height):
        for x in range(width):
            noise = random.randint(-5, 5)
            px[x, y] = tuple(max(0, min(255, c + noise)) for c in base)
    draw = ImageDraw.Draw(img, "RGBA")
    for _ in range(18 if not dark else 26):
        y = random.randint(-height // 4, height)
        amp = random.randint(18, 65)
        points = []
        for x in range(-80, width + 90, 32):
            yy = y + int(math.sin(x / random.uniform(70, 130) + random.random() * 2) * amp) + random.randint(-8, 8)
            points.append((x, yy))
        alpha = random.randint(32, 78) if not dark else random.randint(36, 88)
        draw.line(points, fill=(*vein, alpha), width=random.randint(2, 5))
    return img.filter(ImageFilter.GaussianBlur(0.35))


def shadow(canvas, mask, offset=(26, 35), blur=30, opacity=115):
    sh = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    sh_mask = Image.new("L", canvas.size, 0)
    sh_mask.paste(mask, offset)
    sh_mask = sh_mask.filter(ImageFilter.GaussianBlur(blur))
    sh.putalpha(sh_mask.point(lambda v: int(v * opacity / 255)))
    canvas.alpha_composite(sh)


def paste_texture_poly(canvas, tex, poly, outline=(255, 255, 255, 90), shadow_on=True):
    mask = Image.new("L", canvas.size, 0)
    md = ImageDraw.Draw(mask)
    md.polygon(poly, fill=255)
    if shadow_on:
        shadow(canvas, mask)
    resized = tex.resize(canvas.size)
    canvas.paste(resized.convert("RGBA"), (0, 0), mask)
    d = ImageDraw.Draw(canvas, "RGBA")
    d.line(poly + [poly[0]], fill=outline, width=3)


def draw_sink(draw, cx, cy, w, h):
    draw.rounded_rectangle((cx - w // 2, cy - h // 2, cx + w // 2, cy + h // 2), radius=20, fill=(40, 42, 42, 150))
    draw.rounded_rectangle((cx - w // 2 + 18, cy - h // 2 + 18, cx + w // 2 - 18, cy + h // 2 - 18), radius=16, fill=(242, 239, 230, 235))
    draw.ellipse((cx - 11, cy - 11, cx + 11, cy + 11), fill=(125, 125, 118, 160))


def label(canvas, sku, title):
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw.rounded_rectangle((48, 48, 430, 122), radius=6, fill=(35, 40, 38, 190))
    draw.text((72, 62), sku, font=FONT_SMALL_BOLD, fill=(255, 255, 255, 245))
    draw.text((72, 91), title[:31], font=font(18), fill=(229, 225, 215, 230))


def vanity_single(path, sku, title, seed, wide=False):
    img = background()
    canvas = img.convert("RGBA")
    tex = stone_texture(1536, 1024, seed=seed)
    poly = [(360, 375), (1190, 330), (1280, 582), (415, 670)]
    paste_texture_poly(canvas, tex, poly)
    d = ImageDraw.Draw(canvas, "RGBA")
    # backsplash
    paste_texture_poly(canvas, tex, [(410, 300), (1180, 265), (1196, 320), (420, 360)], shadow_on=False)
    draw_sink(d, 750 if wide else 785, 502, 190 if wide else 165, 122)
    for x in [720, 785, 850]:
        d.ellipse((x - 9, 424, x + 9, 442), fill=(110, 108, 101, 160))
    label(canvas, sku, title)
    save_jpg(canvas, path)


def vanity_double(path, sku, title, seed):
    img = background()
    canvas = img.convert("RGBA")
    tex = stone_texture(1536, 1024, seed=seed)
    poly = [(245, 382), (1282, 330), (1350, 578), (315, 690)]
    paste_texture_poly(canvas, tex, poly)
    paste_texture_poly(canvas, tex, [(305, 304), (1260, 268), (1276, 322), (318, 358)], shadow_on=False)
    d = ImageDraw.Draw(canvas, "RGBA")
    draw_sink(d, 620, 505, 175, 120)
    draw_sink(d, 980, 480, 175, 120)
    for x in [575, 620, 665, 935, 980, 1025]:
        d.ellipse((x - 7, 424, x + 7, 438), fill=(110, 108, 101, 150))
    label(canvas, sku, title)
    save_jpg(canvas, path)


def countertop(path, sku, title, seed, dark=False, backsplash=False):
    img = background()
    canvas = img.convert("RGBA")
    tex = stone_texture(1536, 1024, seed=seed, dark=dark)
    poly = [(210, 520), (1120, 390), (1340, 515), (455, 760)]
    paste_texture_poly(canvas, tex, poly)
    if backsplash:
        paste_texture_poly(canvas, tex, [(395, 355), (1160, 295), (1210, 380), (425, 455)], shadow_on=False)
    d = ImageDraw.Draw(canvas, "RGBA")
    d.line((430, 665, 1115, 485), fill=(255, 255, 255, 80), width=4)
    d.rounded_rectangle((650, 510, 880, 595), radius=24, fill=(36, 38, 38, 115))
    d.rounded_rectangle((674, 528, 856, 578), radius=18, fill=(233, 230, 220, 205))
    label(canvas, sku, title)
    save_jpg(canvas, path)


def backsplash(path, sku, title, seed):
    img = background()
    canvas = img.convert("RGBA")
    tex = stone_texture(1536, 1024, seed=seed)
    panels = [
        [(260, 320), (530, 282), (540, 702), (260, 760)],
        [(545, 280), (850, 255), (865, 650), (555, 700)],
        [(870, 255), (1220, 285), (1210, 612), (888, 650)],
    ]
    for poly in panels:
        paste_texture_poly(canvas, tex, poly)
    label(canvas, sku, title)
    save_jpg(canvas, path)


def round_table(path, sku, title, seed):
    img = background()
    canvas = img.convert("RGBA")
    tex = stone_texture(1536, 1024, seed=seed)
    d = ImageDraw.Draw(canvas, "RGBA")
    shadow_layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow_layer, "RGBA")
    sd.ellipse((380, 675, 1160, 830), fill=(0, 0, 0, 70))
    canvas.alpha_composite(shadow_layer.filter(ImageFilter.GaussianBlur(26)))
    d.rounded_rectangle((675, 480, 850, 720), radius=16, fill=(214, 210, 202, 255), outline=(255, 255, 255, 100), width=2)
    mask = Image.new("L", canvas.size, 0)
    md = ImageDraw.Draw(mask)
    md.ellipse((360, 285, 1180, 655), fill=255)
    canvas.paste(tex.resize(canvas.size).convert("RGBA"), (0, 0), mask)
    d.ellipse((360, 285, 1180, 655), outline=(255, 255, 255, 105), width=4)
    label(canvas, sku, title)
    save_jpg(canvas, path)


def rectangular_table(path, sku, title, seed):
    img = background()
    canvas = img.convert("RGBA")
    tex = stone_texture(1536, 1024, seed=seed, dark=True)
    poly = [(305, 420), (1175, 350), (1300, 545), (445, 670)]
    paste_texture_poly(canvas, tex, poly)
    d = ImageDraw.Draw(canvas, "RGBA")
    d.polygon([(435, 650), (560, 635), (555, 780), (425, 795)], fill=(45, 46, 44, 255))
    d.polygon([(1050, 540), (1180, 520), (1195, 660), (1065, 680)], fill=(45, 46, 44, 255))
    label(canvas, sku, title)
    save_jpg(canvas, path)


def sample_kit(path, sku, title, seed):
    img = background()
    canvas = img.convert("RGBA")
    d = ImageDraw.Draw(canvas, "RGBA")
    d.rounded_rectangle((410, 285, 1140, 740), radius=28, fill=(38, 42, 41, 245))
    d.rectangle((455, 345, 1095, 700), fill=(232, 228, 218, 255))
    names = [
        ((236, 232, 222), (150, 145, 137)),
        ((222, 220, 214), (112, 112, 107)),
        ((72, 72, 68), (140, 140, 132)),
        ((224, 212, 190), (150, 132, 112)),
        ((54, 86, 67), (230, 230, 220)),
        ((190, 190, 184), (90, 90, 88)),
    ]
    for i, (base, vein) in enumerate(names):
        x = 500 + (i % 3) * 190
        y = 385 + (i // 3) * 170
        tex = stone_texture(150, 115, base=base, vein=vein, seed=seed + i, dark=i == 2)
        canvas.paste(tex.convert("RGBA"), (x, y))
        d.rectangle((x, y, x + 150, y + 115), outline=(255, 255, 255, 165), width=3)
    label(canvas, sku, title)
    save_jpg(canvas, path)


def project_scene(path, title, seed, kind):
    img = background()
    canvas = img.convert("RGBA")
    d = ImageDraw.Draw(canvas, "RGBA")
    if kind == "hotel":
        tex = stone_texture(1536, 1024, seed=seed)
        for x in [220, 590, 960]:
            paste_texture_poly(canvas, tex, [(x, 430), (x + 300, 395), (x + 330, 560), (x + 25, 610)])
            draw_sink(d, x + 170, 505, 95, 72)
    elif kind == "multifamily":
        tex = stone_texture(1536, 1024, seed=seed)
        for row in range(2):
            for col in range(3):
                x = 230 + col * 330
                y = 350 + row * 190
                paste_texture_poly(canvas, tex, [(x, y), (x + 270, y - 20), (x + 292, y + 88), (x + 20, y + 128)], shadow_on=row == 0 and col == 0)
                draw_sink(d, x + 145, y + 54, 80, 55)
    else:
        tex = stone_texture(1536, 1024, seed=seed, dark=True)
        paste_texture_poly(canvas, tex, [(220, 500), (1200, 410), (1340, 535), (355, 720)])
        d.rectangle((340, 720, 1220, 780), fill=(55, 55, 52, 235))
        d.rectangle((460, 325, 1120, 395), fill=(226, 220, 210, 205))
    label(canvas, "STUDY", title)
    save_jpg(canvas, path)


def create_product_images():
    products_dir = ASSETS / "products"
    tasks = {
        "WR-VT24": lambda p: vanity_single(p, "WR-VT24", "25 in single vanity", 11),
        "WR-VT31": lambda p: vanity_single(p, "WR-VT31", "31 in quartz vanity", 12),
        "WR-VT49": lambda p: vanity_single(p, "WR-VT49", "49 in quartz vanity", 13, wide=True),
        "WR-VT61D": lambda p: vanity_double(p, "WR-VT61D", "61 in double vanity", 14),
        "WR-KT-QC": lambda p: countertop(p, "WR-KT-QC", "Calacatta quartz counter", 15, False, True),
        "WR-KT-NS": lambda p: countertop(p, "WR-KT-NS", "Honed natural stone", 16, False, False),
        "WR-CB": lambda p: backsplash(p, "WR-CB", "Backsplash panels", 17),
        "WR-FR-RM": lambda p: round_table(p, "WR-FR-RM", "Round marble table", 18),
        "WR-FR-OT": lambda p: rectangular_table(p, "WR-FR-OT", "Outdoor stone table", 19),
        "WR-HT": lambda p: vanity_double(p, "WR-HT", "Hotel vanity program", 20),
        "WR-SM": lambda p: sample_kit(p, "WR-SM", "Material sample kit", 21),
    }
    for sku, fn in tasks.items():
        fn(products_dir / f"{sku}-render-v3.jpg")


def create_project_images():
    projects_dir = ASSETS / "projects"
    project_scene(projects_dir / "hotel-vanity-program-render.jpg", "Hotel vanity program", 31, "hotel")
    project_scene(projects_dir / "multifamily-bath-program-render.jpg", "Multi-family bath program", 32, "multifamily")
    project_scene(projects_dir / "commercial-reception-counter-render.jpg", "Commercial reception counter", 33, "reception")


def wrap_lines(draw, text, max_width, fnt):
    words = str(text).split()
    lines, line = [], ""
    for word in words:
        trial = f"{line} {word}".strip()
        if draw.textbbox((0, 0), trial, font=fnt)[2] <= max_width:
            line = trial
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def make_pdf(path, title, subtitle, sections):
    ensure_dir(path.parent)
    page = Image.new("RGB", (1240, 1754), "#f4f3f0")
    draw = ImageDraw.Draw(page)
    draw.rectangle((0, 0, 1240, 210), fill="#2f5f58")
    draw.text((80, 58), "WHITEROCK", font=font(28, True), fill="white")
    draw.text((80, 100), title, font=font(42, True), fill="white")
    draw.text((80, 158), subtitle, font=font(22), fill="#e7ded1")
    y = 270
    for heading, body in sections:
        draw.text((80, y), heading, font=font(26, True), fill="#243f3b")
        y += 42
        if isinstance(body, dict):
            for key, value in body.items():
                draw.text((100, y), f"{key}:", font=font(20, True), fill="#222222")
                for line in wrap_lines(draw, value, 780, font(20)):
                    draw.text((320, y), line, font=font(20), fill="#4d4d4d")
                    y += 30
                y += 5
        elif isinstance(body, list):
            for item in body:
                for i, line in enumerate(wrap_lines(draw, item, 960, font(20))):
                    prefix = "- " if i == 0 else "  "
                    draw.text((105, y), f"{prefix}{line}", font=font(20), fill="#4d4d4d")
                    y += 30
                y += 4
        else:
            for line in wrap_lines(draw, body, 980, font(20)):
                draw.text((100, y), line, font=font(20), fill="#4d4d4d")
                y += 30
        y += 26
        if y > 1500:
            break
    draw.line((80, 1620, 1160, 1620), fill="#d8d2c7", width=2)
    note = "Generated starter document for website launch. Replace with final owner-approved document when available."
    for line in wrap_lines(draw, note, 1000, font(18)):
        draw.text((80, 1650), line, font=font(18), fill="#6b6b6b")
    page.save(path, "PDF", resolution=120.0)


def create_documents(products, colors, resources):
    prod_dir = ASSETS / "resources" / "products"
    color_dir = ASSETS / "resources" / "colors"
    res_dir = ASSETS / "resources"
    for product in products:
        sku = product["sku"]
        path = prod_dir / f"{sku}-spec-sheet.pdf"
        sections = [
            ("Product Overview", product.get("description", "")),
            ("Specification Snapshot", product.get("specs", {})),
            ("Quotation Notes", [
                "Final price depends on material, approved drawing, order quantity, packing method, and destination.",
                "Illustrative product render is used until real WHITEROCK-owned product photography is uploaded.",
            ]),
        ]
        make_pdf(path, f"{sku} Spec Sheet", product.get("title", ""), sections)
        product["techSheetPdf"] = path.relative_to(ROOT).as_posix()
    for color in colors:
        slug = color["slug"]
        path = color_dir / f"{slug}-technical-sheet.pdf"
        sections = [
            ("Surface Direction", color.get("description", "")),
            ("Specification Snapshot", {
                "Material": color.get("material", ""),
                "Color family": color.get("colorFamily", ""),
                "Finishes": ", ".join(color.get("finishes", [])),
                "Thicknesses": ", ".join(color.get("thicknesses", [])),
                "Sizes": ", ".join(color.get("sizes", [])),
            }),
            ("Sample Approval", "Digital swatches are for planning only. Approve a physical sample, finish, thickness, and lot before production."),
        ]
        make_pdf(path, f"{color.get('name')} Technical Sheet", color.get("material", ""), sections)
        color["techSheetPdf"] = path.relative_to(ROOT).as_posix()
    resource_specs = {
        "WHITEROCK Product Catalog": ("WHITEROCK Product Catalog", "Starter product-family overview", [
            ("Product Families", [f"{p['sku']} - {p['title']} ({p['category']})" for p in products]),
            ("Buyer Notes", "Use this starter catalog for early discussions. Replace with a designed final catalog after final photography and commercial terms are approved."),
        ]),
        "Stone Care & Maintenance Guide": ("Stone Care & Maintenance Guide", "General stone-care starter guide", [
            ("Daily Care", ["Use pH-neutral cleaner and a soft cloth.", "Wipe standing water and spills promptly.", "Avoid abrasive pads, harsh acids, and bleach unless approved for the material."]),
            ("Material Notes", ["Natural stone may require sealing depending on material and finish.", "Quartz and engineered surfaces should follow the slab supplier's final care instructions."]),
        ]),
        "Warranty Statement": ("Warranty Statement", "Starter warranty template", [
            ("Scope", "Warranty terms must be finalized by WHITEROCK before commercial use. This starter file gives buyers a placeholder document path."),
            ("Exclusions To Review", ["Incorrect installation or fabrication after delivery.", "Natural stone variation, misuse, chemical damage, and unapproved modifications.", "Transit damage not recorded under the approved inspection process."]),
        ]),
        "Certifications & Test Reports": ("Certifications & Test Reports", "Document index placeholder", [
            ("Status", "Upload owner-confirmed certificates, lab reports, or third-party inspection documents here when available."),
            ("Common Requests", ["Material test reports", "Safety data sheets", "Factory or quality-system certificates", "Inspection reports"]),
        ]),
        "California Proposition 65 Notice": ("California Proposition 65 Notice", "Starter notice placeholder", [
            ("Important", "Final Prop 65 wording must be reviewed by qualified counsel or the responsible seller before California distribution."),
            ("Stone Products", "Natural and engineered stone may involve crystalline silica exposure during cutting, grinding, drilling, or fabrication."),
        ]),
        "Crystalline Silica Fabrication Safety": ("Crystalline Silica Fabrication Safety", "Fabricator safety starter guide", [
            ("Core Controls", ["Use wet cutting and local exhaust where required.", "Use appropriate respiratory protection and housekeeping controls.", "Follow applicable OSHA, local, SDS, and buyer safety requirements."]),
            ("Buyer Use", "This document is a starter safety resource and should be replaced with final SDS and compliance documentation when approved."),
        ]),
    }
    for item in resources.get("items", []):
        spec = resource_specs.get(item.get("title"))
        if not spec:
            continue
        safe = item["title"].lower().replace("&", "and").replace("/", "-")
        safe = "-".join("".join(ch for ch in part if ch.isalnum()) for part in safe.split())
        path = res_dir / f"{safe}.pdf"
        make_pdf(path, spec[0], spec[1], spec[2])
        item["file"] = path.relative_to(ROOT).as_posix()
    resources["intro"] = "Starter documents for distributors, fabricators, designers, and project buyers. Replace generated starter PDFs with final owner-approved documents when available."


def update_json():
    products_path = ROOT / "data" / "products.json"
    colors_path = ROOT / "data" / "colors.json"
    resources_path = ROOT / "data" / "resources.json"
    projects_path = ROOT / "data" / "projects.json"
    factory_path = ROOT / "data" / "factory.json"
    lookbook_path = ROOT / "data" / "lookbook.json"
    products_data = json.loads(products_path.read_text(encoding="utf-8"))
    colors_data = json.loads(colors_path.read_text(encoding="utf-8"))
    resources_data = json.loads(resources_path.read_text(encoding="utf-8"))
    projects_data = json.loads(projects_path.read_text(encoding="utf-8"))
    factory_data = json.loads(factory_path.read_text(encoding="utf-8"))
    lookbook_data = json.loads(lookbook_path.read_text(encoding="utf-8"))
    products = products_data.get("products", products_data)
    sku_map = {p["sku"]: p for p in products}
    for sku, product in sku_map.items():
        product["image"] = f"assets/products/{sku}-render-v3.jpg"
        product["imageWebp"] = f"assets/products/{sku}-render-v3.webp"
        product["imageType"] = "render"
        product["isIllustrative"] = True
        product["caption"] = "Illustrative render - not actual product."
    colors = colors_data.get("colors", [])
    create_documents(products, colors, resources_data)
    projects_data["intro"] = "Illustrative planning studies are shown to explain product scope and quotation paths. They are not completed WHITEROCK project claims. Replace with owner-approved case studies and photography when available."
    projects_data["items"] = [
        {
            "title": "Hotel Vanity Program Planning Study",
            "location": "Illustrative study - not a completed project",
            "summary": "A planning example for guestroom vanity tops, backsplashes, and repeat room schedules.",
            "material": "Quartz or engineered marble",
            "scope": "Vanity tops, backsplashes, sink cutouts, labels, export crates",
            "quantity": "Quoted by room schedule",
            "image": "assets/projects/hotel-vanity-program-render.jpg",
            "alt": "illustrative render of hotel vanity top planning study",
            "imageType": "render",
        },
        {
            "title": "Multi-family Bathroom Program Planning Study",
            "location": "Illustrative study - not a completed project",
            "summary": "A planning example for repeated 25, 31, 49, and 61 inch vanity top programs.",
            "material": "Quartz or engineered marble",
            "scope": "Repeat vanity SKUs, sample approval, packing and unit labels",
            "quantity": "Program quote by SKU mix",
            "image": "assets/projects/multifamily-bath-program-render.jpg",
            "alt": "illustrative render of multi-family bathroom stone program",
            "imageType": "render",
        },
        {
            "title": "Commercial Reception Counter Planning Study",
            "location": "Illustrative study - not a completed project",
            "summary": "A planning example for commercial counters, wall panels, and durable dark stone accents.",
            "material": "Granite, quartz, or natural stone",
            "scope": "Countertop, backsplash panels, edge profile, shop drawing review",
            "quantity": "Project quote by drawing",
            "image": "assets/projects/commercial-reception-counter-render.jpg",
            "alt": "illustrative render of commercial stone reception counter planning study",
            "imageType": "render",
        },
    ]
    for item in factory_data.get("equipment", []):
        if item.get("name") == "Heating Machine":
            item["drawing"] = "assets/equipment/heating-machine.svg"
    extra_lookbook = [
        {
            "title": "Vanity top program render",
            "image": "assets/products/WR-VT49-render-v3.jpg",
            "alt": "illustrative render of quartz vanity top program",
            "category": "Product render",
            "imageType": "render",
        },
        {
            "title": "Kitchen countertop program render",
            "image": "assets/products/WR-KT-QC-render-v3.jpg",
            "alt": "illustrative render of Calacatta quartz countertop program",
            "category": "Product render",
            "imageType": "render",
        },
        {
            "title": "Sample kit render",
            "image": "assets/products/WR-SM-render-v3.jpg",
            "alt": "illustrative render of WHITEROCK material sample kit",
            "category": "Sample program",
            "imageType": "render",
        },
    ]
    existing = lookbook_data.get("items", [])
    existing_titles = {item.get("title") for item in existing}
    for item in extra_lookbook:
        if item["title"] not in existing_titles:
            existing.append(item)
    lookbook_data["items"] = existing
    products_path.write_text(json.dumps(products_data, indent=2) + "\n", encoding="utf-8")
    colors_path.write_text(json.dumps(colors_data, indent=2) + "\n", encoding="utf-8")
    resources_path.write_text(json.dumps(resources_data, indent=2) + "\n", encoding="utf-8")
    projects_path.write_text(json.dumps(projects_data, indent=2) + "\n", encoding="utf-8")
    factory_path.write_text(json.dumps(factory_data, indent=2) + "\n", encoding="utf-8")
    lookbook_path.write_text(json.dumps(lookbook_data, indent=2) + "\n", encoding="utf-8")


def create_heating_svg():
    path = ASSETS / "equipment" / "heating-machine.svg"
    path.write_text(
        """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 190" role="img" aria-label="Heating machine line drawing">
  <g fill="none" stroke="#2f5f58" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
    <rect x="42" y="58" width="236" height="82" rx="10"/>
    <path d="M70 140v24M250 140v24M76 86h168"/>
    <path d="M108 58c-20-26 18-30 0-52M160 58c-20-26 18-30 0-52M212 58c-20-26 18-30 0-52"/>
    <path d="M76 114h168"/>
    <circle cx="268" cy="86" r="7"/>
    <circle cx="268" cy="113" r="7"/>
  </g>
</svg>
""",
        encoding="utf-8",
    )


def update_report():
    report = ASSETS / "REPORT.md"
    text = report.read_text(encoding="utf-8") if report.exists() else "# Asset Report\n"
    addition = """

## 2026-07-07 Launch Fill-In

- Generated distinct v3 illustrative product renders for every current SKU.
- Generated three clearly labeled project-planning study renders; these are not completed project claims.
- Generated starter product spec-sheet PDFs for every SKU.
- Generated starter color technical PDFs for every color in the design library.
- Generated starter Resources PDFs for catalog, care, warranty, certification index, Prop 65 notice, and crystalline-silica safety.
- Added a heating-machine line drawing so every equipment slot has either a real supplied photo or a line drawing.
- Updated data files so buttons for spec-sheet downloads and resource downloads are visible.
"""
    if "2026-07-07 Launch Fill-In" not in text:
        report.write_text(text.rstrip() + addition + "\n", encoding="utf-8")


def main():
    create_product_images()
    create_project_images()
    create_heating_svg()
    update_json()
    update_report()
    print("Generated launch-ready images, starter PDFs, data links, and report updates.")


if __name__ == "__main__":
    main()
