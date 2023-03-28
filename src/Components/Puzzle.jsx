import Grid from "./Grid";
import { FaUndo } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { useState } from "react";
const Puzzle = () => {
  const [clearTrigger, setClearTrigger] = useState(false);
  const [undoTrigger, setUndoTrigger] = useState(false);
  return (
    <div>
      <div className="puzzle-bar">
        <button
          className="undo button"
          onClick={() => {
            setUndoTrigger(!undoTrigger);
          }}
        >
          <FaUndo className="undo-icon" />
        </button>
        <button
          className="clear button"
          onClick={() => {
            setClearTrigger(!clearTrigger);
          }}
        >
          <AiOutlineClear className="clear-icon" />
        </button>
      </div>
      <Grid clear={clearTrigger} undo={undoTrigger} />
    </div>
  );
};

export default Puzzle;
