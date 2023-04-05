const cellState = {
  value: null,
  solution: null,
  isInitial: false,
  isValid: true,
  candidateMode: false,
  candidates: Array(9).fill(false),
};

const constructPuzzleState = (initialValues, solution) => {
  const puzzleState = initialValues.map((row, rowIndex) => {
    return row.map((cell, columnIndex) => {
      return {
        ...cellState,
        value: cell == 0 ? "" : cell,
        solution: solution[rowIndex][columnIndex],
        isInitial: cell != 0,
      };
    });
  });
  return puzzleState;
};

export default constructPuzzleState;
