"""Builds src/assets/inside/livingroom-tile.png from livingroom.png.

The tile is the room picture followed by a mirrored copy of it. Repeated
sideways (see styles/inside.css), it makes the wall and floor carry on to
either side of the room on wide screens, with no visible seam.

Run it after changing the room picture:   python3 scripts/make-room-tile.py
"""
from pathlib import Path
from PIL import Image, ImageOps

ART = Path(__file__).resolve().parent.parent / "src/assets/inside"

room = Image.open(ART / "livingroom.png").convert("RGB")
tile = Image.new("RGB", (room.width * 2, room.height))
tile.paste(room, (0, 0))
tile.paste(ImageOps.mirror(room), (room.width, 0))
tile.save(ART / "livingroom-tile.png", optimize=True)
print("livingroom-tile.png", tile.size)
