import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import StringedInstrument from "./components/StringedInstrument";

function App() {
  return (
    <div className="App">
      <StringedInstrument
        bodyStyle={"guitar"}
        stringNames={["E", "A", "D", "G", "B", "E"]}
      />
    </div>
  );
}

export default App;
