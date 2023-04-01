import { useRef } from "react";
import Row from "./Row";

const Grid = (props) => {
  const caseRefs = useRef([]);
  for (let i = 0; i < 81; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    caseRefs.current[i] = useRef(null);
  }

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

  return (
    <div className="grid">
      {props.grid.map((row, index) => (
        <Row
          key={index}
          row={row}
          ref={caseRefs}
          handleCaseChange={props.handleCaseChange}
          isEdge={index % 3 == 2}
          index={index}
          handleArrowKey={handleArrowKey}
          checkMode={props.checkMode}
        ></Row>
      ))}
    </div>
  );
};

export default Grid;
