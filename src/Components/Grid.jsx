import { useEffect, useRef, useState } from "react";
import checkValid from "../Functions/checkValid";
import Row from "./Row";

const Grid = (props) => {
  const initialGrid = [
    [9, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 7, 0, 0],
    [0, 0, 4, 0, 0, 0, 0, 0, 8],
    [0, 0, 0, 0, 0, 5, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 7, 0, 0, 6, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 9],
  ];

  const caseRefs = useRef([]);
  for (let i = 0; i < 81; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    caseRefs.current[i] = useRef(null);
  }

  const [grid, setGrid] = useState(initialGrid);
  const [lastGrid, setLastGrid] = useState(initialGrid);
  useEffect(
    () => {
      setGrid(initialGrid);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.clear]
  );

  useEffect(
    () => {
      setGrid(lastGrid);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.undo]
  );

  const handleArrowKey = (direction, index) => {
    let nextIndex = index;
    if (direction === "left") {
      nextIndex--;
    } else if (direction === "up") {
      nextIndex -= 9;
    } else if (direction === "right") {
      nextIndex++;
    } else if (direction === "down") {
      nextIndex += 9;
    }
    if (nextIndex >= 0 && nextIndex < 81) {
      caseRefs.current[nextIndex].current.focus();
    }
  };

  function handleCaseChange(row, col, value) {
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[row][col] = +value;
    setLastGrid(grid);
    setGrid(newGrid);
  }

  function checkValidCaseChange(row, col, value) {
    return checkValid(row, col, value, grid);
  }
  return (
    <div className="grid">
      {grid.map((row, index) => (
        <Row
          key={index}
          row={row}
          ref={caseRefs}
          handleCaseChange={handleCaseChange}
          isEdge={index % 3 == 2}
          index={index}
          handleArrowKey={handleArrowKey}
          checkValid={checkValidCaseChange}
        ></Row>
      ))}
    </div>
  );
};

export default Grid;
