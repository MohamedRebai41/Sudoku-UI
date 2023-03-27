import { createRoot } from "react-dom/client";
import Grid from "./Components/Grid";

const App = () => (
  <div className="app-container">
    <div className="bar">
      <img src="./assets/logo.svg" alt="logo" />
      <span> Sudoku </span>
    </div>
    <div className="content-container">
      <Grid />
    </div>
  </div>
);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
