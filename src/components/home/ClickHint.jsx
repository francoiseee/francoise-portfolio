// The little pointing hand that taps the screen, so the visitor knows
// they should click to hear the next thing.
export default function ClickHint() {
  return (
    <div className="click-hint" aria-hidden="true">
      <span className="click-hint__dot" />
      <svg className="click-hint__hand" viewBox="0 0 25 28">
        <path d="M7.5 17.2V4.3a1.9 1.9 0 0 1 3.8 0V11a1.9 1.9 0 0 1 3.8 0 1.9 1.9 0 0 1 3.8 0 1.6 1.6 0 0 1 3.1 0v8.4c0 4.4-2.4 7.6-6.2 7.6h-3.4c-2.4 0-3.9-1.1-5.2-2.9L3.1 18.5c-.9-1.2.5-2.7 1.8-1.8z" />
        <path d="M11.3 11.5v3.6M15.1 11.5v3.6M18.9 11.5v3.6" />
      </svg>
    </div>
  );
}
