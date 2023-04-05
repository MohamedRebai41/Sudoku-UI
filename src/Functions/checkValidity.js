const checkValid = (row, col, newGrid) => {
  if (newGrid[row][col].value == "" || newGrid[row][col].isInitial) return true;
  for (let i = 0; i < 9; i++) {
    if (newGrid[row][i].value == newGrid[row][col].value && i != col)
      return false;
  }
  for (let i = 0; i < 9; i++) {
    if (newGrid[i][col].value == newGrid[row][col].value && i != row)
      return false;
  }
  const rowStart = Math.floor(row / 3) * 3;
  const colStart = Math.floor(col / 3) * 3;
  for (let i = rowStart; i < rowStart + 3; i++) {
    for (let j = colStart; j < colStart + 3; j++) {
      if (
        newGrid[i][j].value == newGrid[row][col].value &&
        i != row &&
        j != col
      )
        return false;
    }
  }
  return true;
};

const checkValidity = (newGrid) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      newGrid[i][j].isValid = checkValid(i, j, newGrid);
    }
  }
};

export default checkValidity;
