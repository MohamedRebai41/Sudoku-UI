import { useState } from "react";

const Case = (props) => {
  const [value, setValue] = useState("");
  return (
    <input
      className={`case ${props.isEdge ? "edge-case" : ""}`}
      type="text"
      disabled={props.value != 0}
      value={props.value != 0 ? props.value : value}
      onChange={(e) => {
        let inputVal = e.target.value;
        if (inputVal.length == 2) inputVal = inputVal[1];
        const validVal = inputVal.replace(/[^1-9]/g, "");
        setValue(validVal);
      }}
      maxLength="2"
    />
  );
};

export default Case;
