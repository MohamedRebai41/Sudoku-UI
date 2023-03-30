import Grid from "./Grid";
import { FaUndo } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { useState } from "react";
import checkValid from "../Functions/checkValid";
const Puzzle = () => {
  const initialGrid = [
    [0, 1, 0, 0, 0, 0, 0, 0, 0],
    [9, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 7, 0, 0],
    [0, 0, 4, 0, 0, 0, 0, 0, 8],
    [0, 0, 0, 0, 0, 5, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 7, 0, 0, 6, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 9],
  ];
  const undoLimit = 10;
  const [grid, setGrid] = useState(initialGrid);
  const [gridHistory, setGridHistory] = useState([]);
  const [undoLimited, setUndoLimited] = useState(false);

  function handleCaseChange(row, col, value) {
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[row][col] = +value;
    const newGridHistory = gridHistory;
    newGridHistory.push(grid);
    if (newGridHistory.length > undoLimit) {
      newGridHistory.shift();
    }
    if (newGridHistory.length == 1) {
      setUndoLimited(false);
    }
    setGridHistory(newGridHistory);
    setGrid(newGrid);
  }

  function checkValidCaseChange(row, col, value) {
    return checkValid(row, col, value, grid);
  }

  return (
    <div>
      <div className="puzzle-bar">
        <button
          className="undo button"
          disabled={undoLimited}
          onClick={() => {
            if (gridHistory.length > 0) {
              setGrid(gridHistory.pop());
            }
            if (gridHistory.length == 0) {
              setUndoLimited(true);
            }
          }}
        >
          <FaUndo className="undo-icon" />
        </button>
        <button
          className="clear button"
          onClick={() => {
            setGrid(initialGrid);
          }}
        >
          <AiOutlineClear className="clear-icon" />
        </button>
      </div>
      <Grid
        grid={grid}
        handleCaseChange={handleCaseChange}
        checkValidCaseChange={checkValidCaseChange}
      />
    </div>
  );
};

export default Puzzle;
