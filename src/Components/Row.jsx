import { forwardRef } from "react";
import Case from "./Case";

const Row = forwardRef(function Row(props, ref) {
  return (
    <div className={`row ${props.isEdge ? "edge-row" : ""}`}>
      {props.row.map((value, index) => (
        <Case
          key={index}
          ref={ref.current[props.index * 9 + index]}
          row={props.index}
          col={index}
          value={value}
          handleCaseChange={props.handleCaseChange}
          isEdge={index % 3 == 2}
          handleArrowKey={props.handleArrowKey}
          checkMode={props.checkMode}
        />
      ))}
    </div>
  );
});

export default Row;
