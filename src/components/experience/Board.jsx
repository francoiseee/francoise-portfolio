import { forwardRef } from "react";

// The cork board itself: wooden frame, cork, and two strings crossing behind the notes.
// The ref points at the cork, which is as far as the notes can be dragged.
const Board = forwardRef(function Board(_, corkRef) {
  return (
    <div className="board" aria-hidden="true">
      <div className="board__cork" ref={corkRef}>
        <svg className="board__strings" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="8" y1="10.5" x2="92.5" y2="82.5" />
          <line x1="8" y1="82.8" x2="92.5" y2="9.6" />
        </svg>
        <span className="board__label">Drag + discover</span>
      </div>
    </div>
  );
});

export default Board;
