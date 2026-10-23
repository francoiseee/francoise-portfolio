import { useEffect, useRef } from "react";
import { playMeow } from "../utils/sounds.js";

const FAR_SCALE = 0.6;   // how small things look at the back of the yard
const CAT_SPEED = 2.4;   // cat body lengths per second
const CAT_CREEP = 0.3;   // the slowest the cat walks while it is still on its way (body lengths per second)
const CAT_EASE = 3;      // slows down as it nears its spot: speed = gap x this (per second)
const CAT_ACCEL = 8;     // how quickly the cat speeds up or slows down (body lengths per second, per second)
const FRICTION = 1.8;    // how fast a thrown ball slows down (per second)
const BOUNCE = 0.7;      // how much speed the ball keeps when it hits an edge
const MAX_THROW = 3;     // fastest throw, in screen widths per second
const DOOR = { x: 0.48, y: 0.88 }; // the door step, as a fraction of the house picture

const SKIN = 0.5;        // px of slack, so standing exactly on an edge doesn't count as inside
const CAT_PAD = 0.3;     // how close (in cat widths) the cat may get to the house and tree
const STEP = 0.35;       // how far the cat travels (in cat widths) between one footstep and the next
const CHASE_START = 0.25; // the chasing cat sets off once the ball is this far (in cat widths)...
const CHASE_STOP = 0.05; // ...and stops when it's this close, so it doesn't twitch as the ball slows

const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

// --- solid things --------------------------------------------------------
// The house and the tree are boxes { left, right, bottom, top } (bottom/top: y goes up).
const isInside = (p, r) =>
  p.x > r.left + SKIN && p.x < r.right - SKIN && p.y > r.bottom + SKIN && p.y < r.top - SKIN;

// nearest spot just outside every box the point is stuck in
function pushOut(p, boxes) {
  let out = p;
  for (const r of boxes) {
    if (!isInside(out, r)) continue;
    const exits = [
      { x: r.left, y: out.y }, { x: r.right, y: out.y },
      { x: out.x, y: r.bottom }, { x: out.x, y: r.top },
    ];
    out = exits.reduce((best, e) => (Math.hypot(e.x - out.x, e.y - out.y) < Math.hypot(best.x - out.x, best.y - out.y) ? e : best));
  }
  return out;
}

// does the straight line from a to b cut through a box?
function crosses(a, b, boxes) {
  const dx = b.x - a.x, dy = b.y - a.y;
  return boxes.some((r) => {
    let enter = 0, leave = 1;
    const sides = [
      [-dx, a.x - (r.left + SKIN)], [dx, r.right - SKIN - a.x],
      [-dy, a.y - (r.bottom + SKIN)], [dy, r.top - SKIN - a.y],
    ];
    for (const [along, room] of sides) {
      if (along === 0) { if (room < 0) return false; continue; }
      const t = room / along;
      if (along < 0) enter = Math.max(enter, t); else leave = Math.min(leave, t);
      if (enter >= leave) return false;
    }
    return true;
  });
}

// The next spot to head for: the goal itself if the way is clear, otherwise the
// first corner on the shortest way around the boxes.
function nextStop(from, goal, boxes, keep) {
  if (!crosses(from, goal, boxes)) return goal;
  const nodes = [from, goal, ...boxes.flatMap((r) => [
    { x: r.left, y: r.bottom }, { x: r.right, y: r.bottom }, { x: r.left, y: r.top }, { x: r.right, y: r.top },
  ].map(keep))];
  const cost = nodes.map(() => Infinity);
  const prev = nodes.map(() => -1);
  const done = nodes.map(() => false);
  cost[0] = 0;
  for (;;) {
    let i = -1;
    nodes.forEach((_, k) => { if (!done[k] && cost[k] < Infinity && (i < 0 || cost[k] < cost[i])) i = k; });
    if (i < 0 || i === 1) break;
    done[i] = true;
    nodes.forEach((n, j) => {
      if (done[j] || crosses(nodes[i], n, boxes)) return;
      const c = cost[i] + Math.hypot(n.x - nodes[i].x, n.y - nodes[i].y);
      if (c < cost[j]) { cost[j] = c; prev[j] = i; }
    });
  }
  if (prev[1] < 0) return goal;
  let k = 1;
  while (prev[k] > 0) k = prev[k];
  return nodes[k];
}

// Everything that moves on the house screen:
//   - drag the ball (or throw it) and the cat runs after it
//   - tap anywhere and the cat walks to that spot; tap the house and it goes to the door
//     (when it gets there, onArrive is called)
// Positions are pixels inside the world, measured from its bottom-left corner,
// so "up" is a bigger y. Nothing is stored in React state: each frame writes
// straight to the elements, so the page never re-renders while things move.
export function useCatGame({ world, yard, house, tree, ball, cat, onArrive }) {
  const arriveRef = useRef(onArrive);
  arriveRef.current = onArrive;

  useEffect(() => {
    const worldEl = world.current;
    const houseEl = house.current;
    const treeEl = tree.current;
    const ballEl = ball.current;
    const catEl = cat.current;

    let layout;                      // sizes and start spots, measured by reset()
    let catPos, ballPos, face;       // where things are right now (face: 1 = right, -1 = left)
    let ballSpeed;                   // { x, y } in px per second while the ball rolls
    let goal, chasing, done;         // what the cat is up to
    let catSpeed = 0;                // how fast the cat is walking right now (px per second)
    let stride = 0;                  // distance walked so far, counts the footsteps
    let chaseSide = 1;               // which side of the ball the cat waits on
    let grab = null;                 // while the ball is held: where the finger holds it
    let ready = false, walking = false, frame = null, last = 0;

    // --- layout -----------------------------------------------------------
    // The cat and ball are placed by CSS; this reads where that put them.
    function measure() {
      for (const el of [ballEl, catEl]) {
        el.style.setProperty("--move-x", 0);
        el.style.setProperty("--move-y", 0);
        el.style.setProperty("--s", 1);
      }
      const w = worldEl.getBoundingClientRect();
      const h = houseEl.getBoundingClientRect();
      const t = treeEl.getBoundingClientRect();
      const c = catEl.getBoundingClientRect();
      const b = ballEl.getBoundingClientRect();
      const spot = (r) => ({ x: r.left + r.width / 2 - w.left, y: w.bottom - r.bottom });
      layout = {
        left: w.left, bottom: w.bottom, width: w.width,
        // the highest a foot / the ball's bottom can go and still be fully on screen
        catCeiling: w.height - c.height * FAR_SCALE,
        ballCeiling: w.height - b.height * FAR_SCALE,
        cat: spot(c), ball: spot(b),
        catWidth: c.width, ballHalf: b.width / 2,
        house: { left: h.left - w.left, right: h.right - w.left, top: w.bottom - h.top },
        door: { x: h.left + h.width * DOOR.x - w.left, y: w.bottom - (h.top + h.height * DOOR.y) },
      };
      // the house is solid from the door step up (the step itself is walkable);
      // the tree is its picture minus the empty edges
      const solid = (pad) => [
        { left: layout.house.left - pad, right: layout.house.right + pad, bottom: layout.door.y, top: layout.house.top + pad },
        { left: t.left - w.left + t.width * 0.12 - pad, right: t.right - w.left - t.width * 0.12 + pad,
          bottom: w.bottom - t.bottom + t.height * 0.05, top: w.bottom - t.top + pad },
      ];
      layout.catSolid = solid(c.width * CAT_PAD);
      layout.ballSolid = solid(b.width / 2);
    }

    // things look smaller the further back (higher up) they are
    const depth = (y) => 1 - (1 - FAR_SCALE) * clamp(y / layout.door.y, 0, 1);

    function reset() {
      measure();
      catPos = { ...layout.cat };
      ballPos = { ...layout.ball };
      ballSpeed = { x: 0, y: 0 };
      catSpeed = 0;
      face = 1; goal = null; chasing = false; done = false; grab = null;
      walking = false;
      stride = 0;
      catEl.classList.remove("is-walking", "is-step-2", "is-happy");
      draw();
    }

    function place(el, pos, start, facing) {
      el.style.setProperty("--move-x", pos.x - start.x);
      el.style.setProperty("--move-y", pos.y - start.y);
      el.style.setProperty("--s", depth(pos.y) / depth(start.y)); // 1 = the size CSS gave it
      el.style.setProperty("--face", facing);
      el.style.zIndex = 10000 - Math.round(pos.y); // lower on screen = closer = in front
    }

    function draw() {
      place(ballEl, ballPos, layout.ball, 1);
      place(catEl, catPos, layout.cat, face);
    }

    // --- the ball ---------------------------------------------------------
    // Where the ball may go: anywhere on the screen.
    const clampBall = (p) => pushOut({
      x: clamp(p.x, layout.ballHalf, layout.width - layout.ballHalf),
      y: clamp(p.y, 0, layout.ballCeiling),
    }, layout.ballSolid);

    const ballIsMoving = () => Math.hypot(ballSpeed.x, ballSpeed.y) > 0;

    // a thrown ball slows down and bounces off the edges of the ground
    function rollBall(dt) {
      ballPos.x += ballSpeed.x * dt;
      ballPos.y += ballSpeed.y * dt;

      const inside = clampBall(ballPos);
      if (inside.x !== ballPos.x) ballSpeed.x *= -BOUNCE;
      if (inside.y !== ballPos.y) ballSpeed.y *= -BOUNCE;  // hit an edge, the house or the tree
      ballPos = inside;

      const slow = Math.exp(-FRICTION * dt);
      ballSpeed.x *= slow;
      ballSpeed.y *= slow;
      if (Math.hypot(ballSpeed.x, ballSpeed.y) < 6) ballSpeed = { x: 0, y: 0 };
    }

    // --- the cat's moves --------------------------------------------------
    function chaseSpot() {
      // stand next to the ball, on the side the cat came from (only switch sides
      // once the ball has really rolled past, so a slow ball can't make it dither)
      const apart = catPos.x - ballPos.x;
      if (Math.sign(apart) === -chaseSide && Math.abs(apart) > layout.catWidth * 0.9) chaseSide = -chaseSide;
      return reachable({ x: ballPos.x + chaseSide * layout.catWidth * 0.55, y: ballPos.y });
    }

    // a spot the cat can actually stand on: on screen and not inside the house or tree
    function reachable(p) {
      const half = layout.catWidth / 2;
      return pushOut({ x: clamp(p.x, half, layout.width - half), y: clamp(p.y, 0, layout.catCeiling) }, layout.catSolid);
    }

    // keeps the way-around corners on screen
    const onScreen = (p) => ({ x: clamp(p.x, layout.catWidth / 2, layout.width - layout.catWidth / 2), y: clamp(p.y, 0, layout.catCeiling) });

    function setWalking(on) {
      if (on === walking) return;
      walking = on;
      catEl.classList.toggle("is-walking", on);
      if (!on) catEl.classList.remove("is-step-2");
    }

    function wake() {
      if (frame !== null) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }

    function tick(now) {
      frame = null;
      // `now` can be a hair older than `last` on the first frame, so never go negative
      const dt = clamp((now - last) / 1000, 0, 0.05);
      last = now;

      if (!grab && ballIsMoving()) rollBall(dt);

      const target = goal ?? (chasing ? chaseSpot() : null);
      let moving = false;
      if (target) {
        // a chasing cat needs a bigger gap to set off than to keep going
        const chase = !goal;
        const gap = Math.hypot(target.x - catPos.x, target.y - catPos.y);
        const least = layout.catWidth * (chase ? (walking ? CHASE_STOP : CHASE_START) : 0.04);
        if (gap > least) {
          const via = nextStop(catPos, target, layout.catSolid, onScreen);
          const dx = via.x - catPos.x;
          const dy = via.y - catPos.y;
          const dist = Math.hypot(dx, dy);
          // speed up gently, ease off as the spot gets close, never quite stop until it's there
          const wanted = clamp(gap * CAT_EASE, CAT_CREEP * layout.catWidth, CAT_SPEED * layout.catWidth);
          const accel = CAT_ACCEL * layout.catWidth * dt;
          catSpeed += clamp(wanted - catSpeed, -accel, accel);
          const step = Math.min(dist, catSpeed * dt);
          const before = catPos;
          catPos = pushOut({ x: catPos.x + (dx / dist) * step, y: catPos.y + (dy / dist) * step }, layout.catSolid);
          stride += Math.hypot(catPos.x - before.x, catPos.y - before.y);
          if (Math.abs(dx) > layout.catWidth * 0.15) face = Math.sign(dx);
          moving = true;
        }
      }

      if (!moving) catSpeed = 0;
      setWalking(moving);
      // left foot, right foot, left foot...: swap the pose every footstep
      if (moving) catEl.classList.toggle("is-step-2", Math.floor(stride / (layout.catWidth * STEP)) % 2 === 1);
      draw();

      if (moving || ballIsMoving()) return wake();  // keep going until everything settles
      if (goal?.atDoor) arrive();                   // reached the door
      goal = null;
      if (!grab) chasing = false;                   // reached the ball; wait for the next throw
    }

    function walkTo(spot) {
      if (done) return;
      chasing = false;
      goal = spot.atDoor ? spot : { ...reachable(spot) };
      wake();
    }

    function arrive() {
      done = true;
      playMeow();
      catEl.classList.add("is-happy");
      arriveRef.current?.();
    }

    // --- input ------------------------------------------------------------
    const pointer = (e) => ({ x: e.clientX - layout.left, y: layout.bottom - e.clientY });

    // a ring that spreads from the tap, so you can see where you pressed
    function showRipple(e) {
      const ring = document.createElement("span");
      ring.className = "ripple";
      const w = worldEl.getBoundingClientRect();
      ring.style.left = `${e.clientX - w.left}px`;
      ring.style.top = `${e.clientY - w.top}px`;
      ring.addEventListener("animationend", () => ring.remove(), { once: true });
      worldEl.append(ring);
    }

    function onBallDown(e) {
      if (!ready || done) return;
      const p = pointer(e);
      grab = { x: ballPos.x - p.x, y: ballPos.y - p.y, last: p, time: e.timeStamp };
      ballSpeed = { x: 0, y: 0 };
      ballEl.setPointerCapture(e.pointerId);
      ballEl.classList.add("is-held", "is-touched");
      goal = null;
      chasing = true;
      chaseSide = Math.sign(catPos.x - ballPos.x) || 1;
      wake();
    }

    function onBallMove(e) {
      if (!grab) return;
      const p = pointer(e);
      ballPos = clampBall({ x: p.x + grab.x, y: p.y + grab.y });

      // how fast the finger is moving, smoothed, so letting go throws the ball
      const dt = (e.timeStamp - grab.time) / 1000;
      if (dt > 0) {
        const mix = (old, now) => old * 0.5 + now * 0.5;
        ballSpeed = {
          x: mix(ballSpeed.x, (p.x - grab.last.x) / dt),
          y: mix(ballSpeed.y, (p.y - grab.last.y) / dt),
        };
      }
      grab.last = p;
      grab.time = e.timeStamp;
      draw();
      wake();
    }

    function onBallUp(e) {
      if (!grab) return;
      const idle = e.timeStamp - grab.time > 80; // held still before letting go: no throw
      const top = MAX_THROW * layout.width;
      const speed = Math.hypot(ballSpeed.x, ballSpeed.y);
      const limit = speed > top ? top / speed : 1;
      ballSpeed = idle ? { x: 0, y: 0 } : { x: ballSpeed.x * limit, y: ballSpeed.y * limit };
      grab = null;
      ballEl.classList.remove("is-held");
      wake();
    }

    function onTap(e) {
      if (!ready || done || e.target === ballEl) return; // dropping the ball is not a tap
      showRipple(e);
      const p = pointer(e);
      const onHouse = p.x > layout.house.left && p.x < layout.house.right && p.y > layout.door.y && p.y < layout.house.top;
      if (onHouse) return walkTo({ ...layout.door, atDoor: true });
      walkTo(p);
    }

    function onKey(e) {
      if (!ready || (e.key !== " " && e.key !== "Enter")) return;
      if (e.repeat) return e.preventDefault();
      e.preventDefault();
      walkTo({ ...layout.door, atDoor: true });
    }

    // (once the cat is at the door the kibble is already covering the screen)
    function onResize() { if (!done) reset(); }

    // The yard slides in when the page opens; wait until it has settled so the
    // measurements are right.
    function start() {
      ready = true;
      reset();
      window.addEventListener("resize", onResize);
    }

    yard.current.addEventListener("animationend", start, { once: true });
    ballEl.addEventListener("pointerdown", onBallDown);
    ballEl.addEventListener("pointermove", onBallMove);
    ballEl.addEventListener("pointerup", onBallUp);
    ballEl.addEventListener("pointercancel", onBallUp);
    worldEl.addEventListener("click", onTap);
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(frame);
      yard.current?.removeEventListener("animationend", start);
      ballEl.removeEventListener("pointerdown", onBallDown);
      ballEl.removeEventListener("pointermove", onBallMove);
      ballEl.removeEventListener("pointerup", onBallUp);
      ballEl.removeEventListener("pointercancel", onBallUp);
      worldEl.removeEventListener("click", onTap);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [world, yard, house, tree, ball, cat]);
}
