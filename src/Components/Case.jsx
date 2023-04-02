/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useContext, useEffect, useState } from "react";
import checkValid from "../Functions/checkValid";
import { currentGrid, solutionGrid } from "./Puzzle";
import calculateCandidateString from "../Functions/calculateCandidateString";

const Case = forwardRef(function Case(props, ref) {
  const [value, setValue] = useState(props.value);
  const [isInitial, setIsInitial] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [checkState, setCheckState] = useState("unchecked");
  const [candidateMode, setCandidateMode] = useState(false);
  const [candidates, setCandidates] = useState(Array(9).fill(false));
  const current = useContext(currentGrid);
  const solution = useContext(solutionGrid);

  useEffect(() => {
    if (current[props.row][props.col] != 0) {
      setValue(current[props.row][props.col]);
      setIsInitial(true);
    }
  }, []);

  useEffect(() => {
    setValue(current[props.row][props.col]);
    setIsValid(checkValid(props.row, props.col, props.value, current));
  }, [current]);

  useEffect(() => {
    if (props.checkMode) {
      if (current[props.row][props.col] != solution[props.row][props.col]) {
        setCheckState("wrong");
      } else if (!isInitial) {
        setCheckState("right");
      }
    } else {
      setCheckState("unchecked");
    }
  }, [props.checkMode, current]);

  useEffect(() => {
    ref.current.focus();
  }, [candidateMode]);

  const handleKeyDown = (event) => {
    // Handle digit key presses
    if (/[1-9]/.test(event.key)) {
      if (!isInitial) {
        if (!candidateMode) {
          props.handleCaseChange(props.row, props.col, event.key);
        } else {
          candidates[+event.key - 1] = !candidates[+event.key - 1];
          setCandidates([...candidates]);
          console.log(calculateCandidateString(candidates));
        }
      }
    }
    //Handle backspace key press
    else if (event.keyCode === 8) {
      if (!isInitial) {
        props.handleCaseChange(props.row, props.col, 0);
      }
    }
    // Handle arrow key presses
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
    //enter key
    else if (event.keyCode === 13) {
      if (!isInitial) {
        setCandidateMode(!candidateMode);
      }
    }
  };

  if (candidateMode) {
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <textarea
        className={`case candidate ${props.isEdge ? "edge-case" : ""}`}
        onKeyDown={handleKeyDown}
        ref={ref}
        value={calculateCandidateString(candidates)}
      ></textarea>
    );
  } else {
    return (
      <input
        readOnly
        ref={ref}
        className={`case ${props.isEdge ? "edge-case" : ""} ${
          !isValid && !isInitial ? "invalid" : ""
        } ${isInitial ? "initial" : ""} ${checkState}`}
        type="text"
        onFocus={(e) => {
          e.target.setSelectionRange(
            e.target.value.length,
            e.target.value.length
          );
        }}
        value={value == 0 ? "" : value}
        onKeyDown={handleKeyDown}
      />
    );
  }
});

export default Case;
