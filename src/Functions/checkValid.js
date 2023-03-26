const checkValid = (row, col, value, newGrid) => {
  if (value == 0) return true;
  for (let i = 0; i < 9; i++) {
    if (newGrid[row][i] == value && i != col) return false;
  }
  for (let i = 0; i < 9; i++) {
    if (newGrid[i][col] == value && i != row) return false;
  }
  const rowStart = Math.floor(row / 3) * 3;
  const colStart = Math.floor(col / 3) * 3;
  for (let i = rowStart; i < rowStart + 3; i++) {
    for (let j = colStart; j < colStart + 3; j++) {
      if (newGrid[i][j] == value && i != row && j != col) return false;
    }
  }
  return true;
};

export default checkValid;
