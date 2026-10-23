import { placement } from "./placement.js";

// The little sign on the roof that tells visitors to go inside.
// The wrapper sits exactly where the house picture sits (same spot, same size),
// so the sign is placed in % of the house and always stays on it.
export default function HouseLabel({ wide, tall, children }) {
  return (
    <div className="prop house-label" style={placement(wide, tall)}>
      <p className="house-label__sign">{children}</p>
    </div>
  );
}
