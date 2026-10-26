"""Builds the single pictures used by the experience page in src/assets/experience/.

design.png and design1.png are transparent 3840 x 2160 sheets with several
stickers on each; tarotail.png is the full-size team photo. Every picture is cut
out (trimmed to its edges), shrunk to about twice the size it is shown at, and
saved on its own, so the page only loads what it needs.
Where each picture sits on the board is in src/data/experience.js.

Run it after changing the art:   python3 scripts/split-experience-art.py
"""
from pathlib import Path
from PIL import Image

ART = Path(__file__).resolve().parent.parent / "src/assets/experience"

# name: (sheet, rough area around it [left, top, right, bottom], final width in px)
STICKERS = {
    "heart": ("design",  (270, 270, 1860, 1680), 480),
    "clip":  ("design1", (270, 150, 1200, 1280), 200),
    "star":  ("design1", (2500, 300, 3450, 1200), 240),
}

sheets = {name: Image.open(ART / f"{name}.png").convert("RGBA") for name in ("design", "design1")}

for name, (sheet, area, width) in STICKERS.items():
    piece = sheets[sheet].crop(area)
    piece = piece.crop(piece.getbbox())  # trim the empty space around it
    piece = piece.resize((width, round(piece.height * width / piece.width)), Image.LANCZOS)
    piece.save(ART / f"{name}.png", optimize=True)
    print(f"{name}.png  {piece.width} x {piece.height}")

photo = Image.open(ART / "tarotail.png").convert("RGB")
photo = photo.resize((800, round(photo.height * 800 / photo.width)), Image.LANCZOS)
photo.save(ART / "team.jpg", quality=85, optimize=True)
print(f"team.jpg  {photo.width} x {photo.height}")
