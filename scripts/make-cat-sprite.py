"""Builds src/assets/homepage/cat-sprite.png from the two big cat drawings.

The sheet holds three frames side by side, all in cells of the same size with
the feet on the bottom edge:  [standing] [walking 1] [walking 2]
Trimming the empty margins and shrinking the art keeps the file tiny
(about 200 KB instead of 4.7 MB), and gives the page one image to animate.

Run it after changing the cat art:   python3 scripts/make-cat-sprite.py
"""
from pathlib import Path
from PIL import Image

ART = Path(__file__).resolve().parent.parent / "src/assets/homepage"
SCALE = 0.14          # how much the standing cat is shrunk
WALK_BOOST = 1.08     # the walking drawing is a bit smaller, so it gets enlarged to match
WALK_SPLIT = 2347     # x where the walking sheet changes from its first cat to its second


def trimmed(img, box=None):
    img = img.crop(box) if box else img
    return img.crop(img.getchannel("A").point(lambda a: 255 if a > 20 else 0).getbbox())


def shrink(img, factor):
    return img.resize((round(img.width * factor), round(img.height * factor)), Image.LANCZOS)


standing = Image.open(ART / "cat-standstill.png").convert("RGBA")
walking = Image.open(ART / "cat-walking.png").convert("RGBA")

frames = [
    shrink(trimmed(standing), SCALE),
    shrink(trimmed(walking, (0, 0, WALK_SPLIT, walking.height)), SCALE * WALK_BOOST),
    shrink(trimmed(walking, (WALK_SPLIT, 0, walking.width, walking.height)), SCALE * WALK_BOOST),
]

cell_w = max(f.width for f in frames)
cell_h = max(f.height for f in frames)
sheet = Image.new("RGBA", (cell_w * len(frames), cell_h))
for i, frame in enumerate(frames):
    # centered in its cell, feet on the bottom edge
    sheet.paste(frame, (i * cell_w + (cell_w - frame.width) // 2, cell_h - frame.height))

sheet.save(ART / "cat-sprite.png", optimize=True)
print(f"cat-sprite.png: {sheet.width}x{sheet.height}, cell {cell_w}x{cell_h}")
