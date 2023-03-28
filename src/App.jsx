import { createRoot } from "react-dom/client";
import Puzzle from "./Components/Puzzle";

const App = () => {
  return (
    <div className="app-container">
      <div className="bar">
        <img src="./assets/logo.svg" alt="logo" />
        <span> Sudoku </span>
      </div>
      <div className="content-container">
        <Puzzle />
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
