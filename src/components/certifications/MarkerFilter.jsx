// An invisible SVG filter that roughs up edges, so the skill tags look like they were
// drawn with a real highlighter (streaky, uneven edges). certifications.css refers to it
// as url(#marker-rough). Render it once on the page.
export default function MarkerFilter() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <filter id="marker-rough" x="-20%" y="-50%" width="140%" height="200%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035 0.45" numOctaves="2" seed="7" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
