import Grid from "./Grid";
import { FaUndo } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { useState, React, useEffect } from "react";
import constructPuzzleState from "../Functions/constructPuzzleState";
import constructSolutionState from "../Functions/constructSolutionstate";
import checkValidity from "../Functions/checkValidity";

//This component is the main component of the app. It contains the state of the whole puzzle, passes it down to the other components, and saves the puzzle states in an array to allow the user to undo steps
const undoLimit = 30;

const Puzzle = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [initialState, setInitialState] = useState([]);
  const [solutionState, setSolutionState] = useState([]);
  const [grid, setGrid] = useState([]);
  const [gridHistory, setGridHistory] = useState([]);

  const [undoLimited, setUndoLimited] = useState(gridHistory.length == 0);
  const [checkMode, setCheckMode] = useState(false);

  async function getNewPuzzle() {
    setIsLoaded(false);
    setIsError(false);
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 3000);
    try {
      const result = await fetch("https://sudoku-api.vercel.app/api/dosuku", {
        signal: controller.signal,
      });
      const data = await result.json();
      const newInitialState = constructPuzzleState(
        data.newboard.grids[0].value,
        data.newboard.grids[0].solution
      );
      const newSolutionState = constructSolutionState(newInitialState);
      setInitialState(newInitialState);
      setSolutionState(newSolutionState);
      setGrid(newInitialState);
      setGridHistory([]);
      setUndoLimited(true);
      setIsLoaded(true);
    } catch (err) {
      setIsError(true);
    } finally {
      clearTimeout(timeout);
    }
  }

  useEffect(() => {
    getNewPuzzle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function setNewGridHistory(last) {
    const newGridHistory = gridHistory;
    newGridHistory.push(last);
    if (newGridHistory.length > undoLimit) {
      newGridHistory.shift();
    }
    if (newGridHistory.length == 1) {
      setUndoLimited(false);
    }
    setGridHistory(newGridHistory);
  }

  function toggleCandidateMode(row, col) {
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[row][col].candidateMode = !newGrid[row][col].candidateMode;
    newGrid[row][col].candidates = Array(9).fill(false);
    newGrid[row][col].value = "";
    checkValidity(newGrid);
    setNewGridHistory(grid);
    setGrid(newGrid);
  }
  function handleCandidateChange(row, col, value) {
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[row][col].candidates[+value - 1] =
      !newGrid[row][col].candidates[+value - 1];
    setNewGridHistory(grid);
    setGrid(newGrid);
  }
  function handleCaseChange(row, col, value) {
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[row][col].value = value == 0 ? "" : +value;
    checkValidity(newGrid);
    setNewGridHistory(grid);
    setGrid(newGrid);
  }

  if (isError) {
    return (
      <div className="center">
        <h1>Oops, something went wrong</h1>
        <button className="new-game" onClick={getNewPuzzle}>
          Try again
        </button>
      </div>
    );
  }
  if (!isLoaded) {
    return (
      <div className="center">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
  return (
    <div className="puzzle-container" id="puzzle-small">
      <div className="puzzle-bar">
        <button className="new-game" onClick={getNewPuzzle}>
          New Game
        </button>
        <div>
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
              setNewGridHistory(grid);
              setGrid(initialState);
            }}
          >
            <AiOutlineClear className="clear-icon" />
          </button>
        </div>
      </div>

      <Grid
        grid={grid}
        handleCaseChange={handleCaseChange}
        handleCandidateChange={handleCandidateChange}
        toggleCandidateMode={toggleCandidateMode}
        checkMode={checkMode}
      />

      <div className="bottom-bar">
        <button
          className="solve"
          onClick={() => {
            setNewGridHistory(grid);
            setGrid(solutionState);
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
