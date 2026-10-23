// Kibble-pile animation. The whole pile is planned up front as a dense, slightly
// messy grid of slots from the bottom of the screen up to just above the top.
// Every piece is dropped from above and lands in its slot, bottom rows first, so
// the heap visibly RISES until the screen is covered — gap-free every time.
//
// Two stacked canvases (same size, reaching `margin` px ABOVE the screen so the
// lumpy top of the heap is kept for the drain animation):
//   pileCanvas : permanent — every landed piece is painted here once
//   fallCanvas : cleared every frame — only the pieces still in the air

import { SHAPE_COUNT } from "./sprites.js";

const KIBBLE_COLOR = "#e8b57c"; // plugs the tiny gaps between pieces

const GRAVITY = 4200;     // px / s²
const FILL_SECONDS = 1.9; // time the pile takes to rise from bottom to top
const rand = (min, max) => min + Math.random() * (max - min);

export function startFill({ pileCanvas, fallCanvas, sprites, onDone }) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const size = Math.max(46, Math.min(84, Math.min(W, H) * 0.085)); // kibble size scales with the screen
  const margin = Math.round(size * 2.2);
  const CH = H + margin; // canvas height

  for (const [canvas, z] of [[pileCanvas, 0], [fallCanvas, 1]]) {
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(CH * dpr);
    Object.assign(canvas.style, { width: `${W}px`, height: `${CH}px`, top: `${-margin}px`, zIndex: z });
  }
  const pile = pileCanvas.getContext("2d");
  const fall = fallCanvas.getContext("2d");
  pile.setTransform(dpr, 0, 0, dpr, 0, 0);
  fall.setTransform(dpr, 0, 0, dpr, 0, 0);

  // pre-draw each shape once so drawing ~1000 pieces stays smooth
  const px = Math.ceil(size * 1.2 * dpr);
  const baked = sprites.map((img) => {
    const c = document.createElement("canvas");
    c.width = c.height = px;
    c.getContext("2d").drawImage(img, 0, 0, px, px);
    return c;
  });

  // How long a piece takes to fall from just above the canvas to height y.
  const flightTime = (y, v0) => (Math.sqrt(v0 * v0 + 2 * GRAVITY * (y + size)) - v0) / GRAVITY;
  const slowestFlight = flightTime(CH, 150);

  // ---- plan every piece ----------------------------------------------------
  const dx = size * 0.6;  // slot spacing: pieces overlap, so no gaps show
  const dy = size * 0.46;
  const topRowY = margin - size * 1.1; // highest row, well above the screen edge
  const rows = Math.floor((CH - size * 0.25 - topRowY) / dy) + 1;

  const pieces = [];
  for (let k = 0; k < rows; k++) {
    const rowY = CH - size * 0.25 - k * dy;
    const lumpy = rowY < margin - size * 0.45; // rows above the screen: uneven, for a lumpy edge
    for (let x = -dx / 2 + (k % 2) * (dx / 2); x < W + dx; x += dx) {
      if (lumpy && Math.random() < 0.4) continue;
      const v0 = rand(150, 300);
      const y = rowY + rand(-0.1, 0.1) * size + (lumpy ? rand(-0.3, 0.1) * size : 0);
      const land = slowestFlight + (k / (rows - 1)) * FILL_SECONDS + rand(0, 0.3);
      pieces.push({
        x: x + rand(-0.12, 0.12) * size, y, v0,
        s: size * rand(0.9, 1.15), shape: Math.floor(Math.random() * SHAPE_COUNT),
        rot: rand(-0.7, 0.7), spin: rand(-9, 9),
        land, start: land - flightTime(y, v0),
      });
    }
  }
  pieces.sort((a, b) => a.start - b.start);

  // ---- run -----------------------------------------------------------------
  const active = [];
  let next = 0;
  let raf = 0;
  let t0 = 0;

  function drawPiece(ctx, p, x, y, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.drawImage(baked[p.shape], -p.s / 2, -p.s / 2, p.s, p.s);
    ctx.restore();
  }

  function land(p) {
    drawPiece(pile, p, p.x, p.y, p.rot);
    pile.globalCompositeOperation = "destination-over"; // paint BEHIND what's there
    pile.fillStyle = KIBBLE_COLOR;
    pile.beginPath();
    pile.arc(p.x, p.y, p.s * 0.4, 0, Math.PI * 2);
    pile.fill();
    pile.globalCompositeOperation = "source-over";
  }

  function finish() {
    fall.clearRect(0, 0, W, CH);
    pile.globalCompositeOperation = "destination-over"; // seal any last pinhole on screen
    pile.fillStyle = KIBBLE_COLOR;
    pile.fillRect(0, margin - size * 0.2, W, CH); // (leave the lumpy top edge alone)
    pile.globalCompositeOperation = "source-over";
    onDone({ canvas: pileCanvas, width: W, height: H, margin });
  }

  function frame(now) {
    if (!t0) t0 = now;
    const t = (now - t0) / 1000;

    while (next < pieces.length && pieces[next].start <= t) active.push(pieces[next++]);

    fall.clearRect(0, 0, W, CH);
    for (let i = active.length - 1; i >= 0; i--) {
      const p = active[i];
      if (t >= p.land) {
        land(p);
        active.splice(i, 1);
        continue;
      }
      const age = t - p.start;
      const y = -size + p.v0 * age + 0.5 * GRAVITY * age * age;
      drawPiece(fall, p, p.x, Math.min(y, p.y), p.rot + p.spin * (t - p.land));
    }

    if (next >= pieces.length && active.length === 0) return finish();
    raf = requestAnimationFrame(frame);
  }

  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf); // stop function
}
