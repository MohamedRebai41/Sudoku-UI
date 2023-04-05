/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useEffect, useState } from "react";
import calculateCandidateString from "../Functions/calculateCandidateString";

const Case = forwardRef(function Case(props, ref) {
  const [checkState, setCheckState] = useState("unchecked");
  //this effect is used to detect when the user is in check mode and if the case is wrong or right
  useEffect(() => {
    if (props.value && props.checkMode) {
      if (props.value != props.solution) {
        setCheckState("wrong");
      } else if (!props.isInitial) {
        setCheckState("right");
      }
    } else {
      setCheckState("unchecked");
    }
  }, [props.checkMode, props.value, props.solution, props.isInitial]);

  //this effect is used to refocus the element when the component rerenders (when the user toggles candidate mode)
  useEffect(() => {
    ref.current.focus();
  }, [props.candidateMode]);

  const handleKeyDown = (event) => {
    // Handle digit key presses (in candidate mode, the digit is added to the candidate list, otherwise the value changes)
    if (/[1-9]/.test(event.key)) {
      if (!props.isInitial) {
        if (!props.candidateMode) {
          props.handleCaseChange(
            props.row,
            props.col,
            props.value == event.key ? 0 : event.key
          );
        } else {
          props.handleCandidateChange(props.row, props.col, event.key);
        }
      }
    }
    //Handle backspace key press
    else if (event.keyCode === 8) {
      if (!props.isInitial) {
        props.handleCaseChange(props.row, props.col, 0);
      }
    }
    // Handle arrow key presses (for navigating the grid)
    else if (event.keyCode === 37) {
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
    //enter key toggles candidate mode
    else if (event.keyCode === 13) {
      if (!props.isInitial) {
        props.toggleCandidateMode(props.row, props.col);
      }
    }
  };

  //conditional rendering of the input element. If the user is in candidate mode, a textarea is rendered instead
  if (props.candidateMode) {
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <textarea
        readOnly
        className={`case candidate ${props.isEdge ? "edge-case" : ""}`}
        onKeyDown={handleKeyDown}
        ref={ref}
        value={calculateCandidateString(props.candidates)}
      ></textarea>
    );
  } else {
    return (
      <input
        readOnly
        ref={ref}
        className={`case ${props.isEdge ? "edge-case" : ""} ${
          !props.isValid ? "invalid" : ""
        } ${props.isInitial ? "initial" : ""} ${checkState}`}
        type="text"
        onFocus={(e) => {
          e.target.setSelectionRange(
            e.target.value.length,
            e.target.value.length
          );
        }}
        value={props.value}
        onKeyDown={handleKeyDown}
      />
    );
  }
});

export default Case;
