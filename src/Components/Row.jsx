import { forwardRef } from "react";
import Case from "./Case";

const Row = forwardRef(function Row(props, ref) {
  return (
    <div className={`row ${props.isEdge ? "edge-row" : ""}`}>
      {props.row.map((cellState, index) => (
        <Case
          key={index}
          ref={ref.current[props.index * 9 + index]}
          row={props.index}
          col={index}
          isValid={cellState.isValid}
          value={cellState.value}
          isInitial={cellState.isInitial}
          solution={cellState.solution}
          candidates={cellState.candidates}
          candidateMode={cellState.candidateMode}
          handleCaseChange={props.handleCaseChange}
          handleCandidateChange={props.handleCandidateChange}
          toggleCandidateMode={props.toggleCandidateMode}
          isEdge={index % 3 == 2}
          handleArrowKey={props.handleArrowKey}
          checkMode={props.checkMode}
          refocus={props.refocus}
        />
      ))}
    </div>
  );
});

export default Row;
