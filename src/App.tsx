import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Deck from "./components/Home";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path={"/"} element={<Deck />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
