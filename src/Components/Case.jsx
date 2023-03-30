import { forwardRef, useEffect, useState } from "react";

const Case = forwardRef(function Case(props, ref) {
  const [value, setValue] = useState(props.value);
  const [isInitial, setIsInitial] = useState(false);
  const [isValid, setIsValid] = useState(true);
  useEffect(() => {
    if (props.value != 0) {
      setValue(props.value);
      setIsInitial(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(props.value);
    setIsValid(props.checkValid(props.row, props.col, props.value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

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
      className={`case ${props.isEdge ? "edge-case" : ""} ${
        !isValid ? "invalid" : ""
      } ${isInitial ? "initial" : ""}`}
      type="text"
      onFocus={(e) => {
        e.target.setSelectionRange(
          e.target.value.length,
          e.target.value.length
        );
      }}
      // disabled={isInitial}
      value={value == 0 ? "" : value}
      onChange={(e) => {
        if (!isInitial) {
          let inputVal = e.target.value;
          if (inputVal.length == 2) inputVal = inputVal[1];
          else if (inputVal.length == 0) inputVal = 0;
          if (/[0-9]/.test(inputVal)) {
            props.handleCaseChange(props.row, props.col, inputVal);
          }
        }
      }}
      onKeyDown={handleKeyDown}
    />
  );
});

export default Case;
