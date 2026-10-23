import catImg from "../../assets/landing/cat.png";

// The cat that does the talking. It bounces while a line is being typed.
export default function HomeCat({ talking }) {
  return (
    <div className={`home-cat ${talking ? "is-talking" : ""}`}>
      <img src={catImg} alt="Francoise’s cat" draggable="false" />
    </div>
  );
}
