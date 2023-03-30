import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Students</h1>
        <Outlet />
      </header>
    </div>
  );
}

export default App;
