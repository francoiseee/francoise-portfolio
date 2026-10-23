import sparkles from "../../assets/inside/certification/sparkles.png";

// The first page of the book: title, subtitle and a sprinkle of stars.
export default function CoverSheet({ cover, number }) {
  return (
    <>
      <img className="sparkles sparkles--top" src={sparkles} alt="" draggable="false" />
      <img className="sparkles sparkles--bottom" src={sparkles} alt="" draggable="false" />

      <div className="cover">
        <h2 className="cover__title">{cover.title}</h2>
        <p className="cover__subtitle">{cover.subtitle}</p>
        <p className="cover__hint">{cover.hint}</p>
      </div>

      <span className="sheet__number">{number}</span>
    </>
  );
}
