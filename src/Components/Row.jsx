import Case from "./Case";

const Row = (props) => {
  return (
    <div className={`row ${props.isEdge ? "edge-row" : ""}`}>
      {props.row.map((value, index) => (
        <Case
          key={index}
          row={props.index}
          col={index}
          value={value}
          handleCaseChange={props.handleCaseChange}
          isEdge={index % 3 == 2}
        ></Case>
      ))}
    </div>
  );
};

export default Row;
