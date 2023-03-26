import Case from "./Case";

const Row = (props) => {
  return (
    <div className={`row ${props.isEdge ? "edge-row" : ""}`}>
      {props.row.map((value, index) => (
        <Case key={index} value={value} isEdge={index % 3 == 2}></Case>
      ))}
    </div>
  );
};

export default Row;
