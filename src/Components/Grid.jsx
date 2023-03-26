import { useState } from "react";
import checkValid from "../Functions/checkValid";
import Row from "./Row";

const Grid = () => {
  const initialGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 7, 0, 0],
    [0, 0, 4, 0, 0, 0, 0, 0, 8],
    [0, 0, 0, 0, 0, 5, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 7, 0, 0, 6, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 9],
  ];

  const [grid, setGrid] = useState(initialGrid);

  function handleCaseChange(row, col, value) {
    const newGrid = [...grid];
    newGrid[row][col] = value;
    setGrid(newGrid);
    return checkValid(row, col, value, newGrid);
  }
  return (
    <div className="grid">
      {initialGrid.map((row, index) => (
        <Row
          key={index}
          row={row}
          handleCaseChange={handleCaseChange}
          isEdge={index % 3 == 2}
          index={index}
        ></Row>
      ))}
    </div>
  );
};

export default Grid;
