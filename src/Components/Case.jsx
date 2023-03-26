import { useState } from "react";

const Case = (props) => {
  const [value, setValue] = useState("");
  return (
    <input
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
    />
  );
};

export default Case;
