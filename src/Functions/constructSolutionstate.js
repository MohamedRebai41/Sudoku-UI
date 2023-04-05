const constructSolutionState = (grid) => {
  const solutionState = JSON.parse(JSON.stringify(grid));
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      solutionState[i][j].value = solutionState[i][j].solution;
    }
  }
  return solutionState;
};

export default constructSolutionState;
