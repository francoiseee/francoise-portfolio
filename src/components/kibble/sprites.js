// The five kibble shapes, drawn as tiny SVGs (100 x 100) and turned into images
// for the canvas. Everything about how a piece LOOKS lives here.

const OUTLINE = (width) => `stroke="#7a4e32" stroke-width="${width}" stroke-linejoin="round" stroke-linecap="round"`;
const LINE = OUTLINE(4);
const svg = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${inner}</svg>`;

const SHAPES = [
  // round kibble with a little face
  svg(`<circle cx="50" cy="50" r="40" fill="#f2b36b" ${LINE}/>
    <path d="M28 36 Q34 26 46 24" fill="none" stroke="#fff3d6" stroke-width="5" stroke-linecap="round"/>
    <circle cx="38" cy="52" r="3.5" fill="#5b3a29"/><circle cx="62" cy="52" r="3.5" fill="#5b3a29"/>
    <path d="M44 60 Q50 66 56 60" fill="none" stroke="#5b3a29" stroke-width="3.5" stroke-linecap="round"/>
    <ellipse cx="29" cy="60" rx="6" ry="4" fill="#f7a8b8"/><ellipse cx="71" cy="60" rx="6" ry="4" fill="#f7a8b8"/>`),
  // crunchy triangle
  svg(`<polygon points="50,16 86,82 14,82" fill="#dd9d5e" ${OUTLINE(9)}/>
    <polygon points="50,16 86,82 14,82" fill="#dd9d5e"/>
    <path d="M42 40 L34 58" fill="none" stroke="#fff3d6" stroke-width="5" stroke-linecap="round"/>`),
  // fish
  svg(`<path d="M66 50 L94 30 L94 70 Z" fill="#f8cf98" ${LINE}/>
    <ellipse cx="42" cy="50" rx="32" ry="23" fill="#f8cf98" ${LINE}/>
    <path d="M46 36 Q54 50 46 64" fill="none" stroke="#7a4e32" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="26" cy="45" r="3.8" fill="#5b3a29"/>`),
  // bone (shapes drawn twice so no outline shows where they join)
  svg(`<g fill="#f8e4bd" ${LINE}><circle cx="22" cy="38" r="12"/><circle cx="22" cy="62" r="12"/>
    <circle cx="78" cy="38" r="12"/><circle cx="78" cy="62" r="12"/><rect x="22" y="40" width="56" height="20" rx="6"/></g>
    <g fill="#f8e4bd"><circle cx="22" cy="38" r="10"/><circle cx="22" cy="62" r="10"/>
    <circle cx="78" cy="38" r="10"/><circle cx="78" cy="62" r="10"/><rect x="22" y="38" width="56" height="24"/></g>`),
  // heart
  svg(`<path d="M50 84 C18 62 10 42 21 29 C31 19 46 25 50 38 C54 25 69 19 79 29 C90 42 82 62 50 84Z" fill="#f8b0c0" ${LINE}/>
    <path d="M26 38 Q30 32 37 31" fill="none" stroke="#fff3d6" stroke-width="5" stroke-linecap="round"/>`),
];

const toImage = (markup) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("kibble sprite failed to load"));
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(markup);
  });

let cached;
export const loadSprites = () => (cached ??= Promise.all(SHAPES.map(toImage)));
export const SHAPE_COUNT = SHAPES.length;
