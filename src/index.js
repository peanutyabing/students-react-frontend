import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Students from "./Components/Students.js";
import Filter from "./Components/Filter.js";
// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
    <Routes>
      <Route path="/" element={<Students />}>
        <Route path="/filter" element={<Filter />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// reportWebVitals(console.log);
