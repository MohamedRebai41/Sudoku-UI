const calculateCandidateString = (candidates) => {
  let result = ``;
  for (let i = 0; i < 9; i++) {
    if (candidates[i]) {
      result += `${i + 1}`;
    } else {
      result += ` `;
    }
    if (i == 2 || i == 5) {
      result += `\n`;
    } else if (i != 8) result += ` `;
  }
  return result;
};

export default calculateCandidateString;
