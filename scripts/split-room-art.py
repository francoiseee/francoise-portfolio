"""Builds the single pictures in src/assets/inside/ from the two big layers
(asset1.png and asset2.png).

Each layer is a transparent 3840 x 2160 sheet with several things on it. Every
thing is cut out and resized to the size it has in the room, then saved on its
own, so the room page can give each one its own hover shadow and label.
Where each picture sits in the room is in src/data/inside.js.

Run it after changing the room art:   python3 scripts/split-room-art.py
"""
from pathlib import Path
from PIL import Image

ART = Path(__file__).resolve().parent.parent / "src/assets/inside"

# name: (sheet, where it is on the sheet [left, top, right, bottom], resize factor)
ITEMS = {
    "window": ("asset1", (113, 473, 1502, 1794), 0.995),
    "board":  ("asset1", (1657, 311, 2614, 1097), 1.165),
    "photo":  ("asset1", (2788, 216, 3680, 1191), 0.765),
    "books":  ("asset1", (1798, 1444, 2361, 2050), 0.895),
    "phone":  ("asset1", (2660, 1483, 3073, 2050), 0.675),
    "laptop": ("asset2", (439, 554, 1514, 1510), 0.66),
    "bed":    ("asset2", (2010, 995, 3340, 1767), 0.66),
}

sheets = {name: Image.open(ART / f"{name}.png").convert("RGBA") for name in ("asset1", "asset2")}

for name, (sheet, box, factor) in ITEMS.items():
    piece = sheets[sheet].crop(box)
    piece = piece.resize((round(piece.width * factor), round(piece.height * factor)), Image.LANCZOS)
    piece.save(ART / f"{name}.png", optimize=True)
    print(f"{name}.png  {piece.width} x {piece.height}")
