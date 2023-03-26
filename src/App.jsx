import { createRoot } from "react-dom/client";
import Grid from "./Grid";

const App = () => (
  <div>
    <Grid></Grid>
  </div>
);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
