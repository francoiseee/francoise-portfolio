import { useRef, useState } from "react";

const TAP_DISTANCE = 5; // px a pointer may wander and still count as a tap, not a drag
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

// Lets an absolutely positioned element be dragged around (mouse, finger or pen).
// Its place is kept in % of its parent, so it survives resizing, and it can never
// leave the `within` element (a ref), such as the cork board.
//   x, y     where it starts
//   within   ref of the element it has to stay inside
//   onGrab   called the moment it is picked up
//   onTap    called when it is pressed and let go without being moved
// Put `ref` and `handlers` on the element and use `pos` for its left / top.
// `fit` pulls it back inside, for when it has grown (see Draggable).
export function useDrag({ x, y, within, onGrab, onTap }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x, y });
  const [dragging, setDragging] = useState(false);
  const grab = useRef(null);

  // The parent's size (to turn pixels into %) and the lowest / highest place
  // the element's top-left corner may be, all in % of the parent.
  const measure = () => {
    const el = ref.current;
    const area = el.parentElement.getBoundingClientRect();
    const box = within.current.getBoundingClientRect();
    const toX = (px) => ((px - area.left) / area.width) * 100;
    const toY = (px) => ((px - area.top) / area.height) * 100;
    return {
      area,
      min: { x: toX(box.left), y: toY(box.top) },
      max: {
        x: toX(box.right) - (el.offsetWidth / area.width) * 100,
        y: toY(box.bottom) - (el.offsetHeight / area.height) * 100,
      },
    };
  };

  const start = (e) => {
    if (e.button !== 0) return;
    grab.current = { ...measure(), from: pos, pointer: { x: e.clientX, y: e.clientY }, moved: false };
    ref.current.setPointerCapture(e.pointerId);
    onGrab?.();
  };

  const move = (e) => {
    const g = grab.current;
    if (!g) return;
    const dx = e.clientX - g.pointer.x;
    const dy = e.clientY - g.pointer.y;
    if (!g.moved && Math.hypot(dx, dy) < TAP_DISTANCE) return;
    g.moved = true;
    setDragging(true);
    setPos({
      x: clamp(g.from.x + (dx / g.area.width) * 100, g.min.x, g.max.x),
      y: clamp(g.from.y + (dy / g.area.height) * 100, g.min.y, g.max.y),
    });
  };

  const end = (e) => {
    const g = grab.current;
    if (!g) return;
    grab.current = null;
    setDragging(false);
    if (!g.moved && e.type === "pointerup") onTap?.();
  };

  const fit = () => {
    const { min, max } = measure();
    setPos((p) => ({ x: clamp(p.x, min.x, max.x), y: clamp(p.y, min.y, max.y) }));
  };

  return {
    ref,
    pos,
    dragging,
    fit,
    handlers: { onPointerDown: start, onPointerMove: move, onPointerUp: end, onPointerCancel: end },
  };
}
