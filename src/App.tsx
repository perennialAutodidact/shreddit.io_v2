import React from "react";
import "./App.scss";
import StringedInstrument from "./components/StringedInstrument";
import Neck from "components/StringedInstrument/Neck";
import TeoriaProvider from "components/TeoriaProvider";

function App() {
  return (
    <div className="App">
      <TeoriaProvider>
        <StringedInstrument />
      </TeoriaProvider>
    </div>
  );
}

export default App;
