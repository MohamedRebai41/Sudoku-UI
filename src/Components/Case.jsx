import { forwardRef, useState } from "react";

const Case = forwardRef(function Case(props, ref) {
  const [value, setValue] = useState("");
  const handleKeyDown = (event) => {
    // Handle arrow key presses
    if (event.keyCode === 37) {
      // Left arrow key
      props.handleArrowKey("left", props.row * 9 + props.col);
    } else if (event.keyCode === 38) {
      // Up arrow key
      props.handleArrowKey("up", props.row * 9 + props.col);
    } else if (event.keyCode === 39) {
      // Right arrow key
      props.handleArrowKey("right", props.row * 9 + props.col);
    } else if (event.keyCode === 40) {
      // Down arrow key
      props.handleArrowKey("down", props.row * 9 + props.col);
    }
  };

  return (
    <input
      ref={ref}
      className={`case ${props.isEdge ? "edge-case" : ""}`}
      type="text"
      onFocus={(e) => {
        e.target.setSelectionRange(
          e.target.value.length,
          e.target.value.length
        );
      }}
      disabled={props.value != 0}
      value={props.value != 0 ? props.value : value}
      onChange={(e) => {
        let inputVal = e.target.value;
        if (inputVal.length == 2) inputVal = inputVal[1];
        else if (inputVal.length == 0) inputVal = 0;
        if (/[0-9]/.test(inputVal)) {
          if (!props.handleCaseChange(props.row, props.col, +inputVal)) {
            e.target.classList.add("wrong");
          } else {
            e.target.classList.remove("wrong");
          }
          setValue(inputVal == 0 ? "" : inputVal);
        }
      }}
      onKeyDown={handleKeyDown}
    />
  );
});

export default Case;
