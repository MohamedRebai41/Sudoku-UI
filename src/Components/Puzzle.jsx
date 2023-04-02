import Grid from "./Grid";
import { FaUndo } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { useState, React, createContext } from "react";

const solutionGrid = createContext();
const currentGrid = createContext();
export { solutionGrid, currentGrid };

const Puzzle = () => {
  const solution = [
    [7, 3, 1, 8, 5, 9, 6, 4, 2],
    [4, 8, 2, 6, 7, 3, 1, 9, 5],
    [5, 6, 9, 4, 1, 2, 7, 8, 3],
    [2, 4, 5, 9, 3, 1, 8, 6, 7],
    [1, 7, 8, 5, 6, 4, 2, 3, 9],
    [6, 9, 3, 2, 8, 7, 5, 1, 4],
    [8, 1, 4, 3, 2, 5, 9, 7, 6],
    [3, 5, 6, 7, 9, 8, 4, 2, 1],
    [9, 2, 7, 1, 4, 6, 3, 5, 8],
  ];

  const initialGrid = [
    [7, 3, 1, 8, 0, 0, 6, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 6, 0, 0, 0, 2, 7, 0, 0],
    [2, 0, 5, 0, 3, 0, 8, 6, 7],
    [1, 7, 8, 0, 6, 0, 0, 3, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 1, 4, 3, 0, 5, 0, 0, 0],
    [3, 0, 6, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 1, 0, 0, 0, 5, 0],
  ];

  const undoLimit = 10;

  const [grid, setGrid] = useState(initialGrid);
  const [gridHistory, setGridHistory] = useState([]);
  const [undoLimited, setUndoLimited] = useState(gridHistory.length == 0);
  const [checkMode, setCheckMode] = useState(false);

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

  return (
    <div className="puzzle-container" id="puzzle-small">
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
      <currentGrid.Provider value={grid}>
        <solutionGrid.Provider value={solution}>
          <Grid
            grid={grid}
            handleCaseChange={handleCaseChange}
            checkMode={checkMode}
          />
        </solutionGrid.Provider>
      </currentGrid.Provider>
      <div className="bottom-bar">
        <button
          className="solve"
          onClick={() => {
            setGrid(solution);
          }}
        >
          Solve
        </button>
        <button
          className={`check ${checkMode ? "on" : ""}`}
          onClick={() => setCheckMode(!checkMode)}
        >
          Check: {checkMode ? "on" : "off"}
        </button>
      </div>
      <div className="help">
        <span>Press Enter to toggle candidate mode</span>
      </div>
    </div>
  );
};

export default Puzzle;
