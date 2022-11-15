import React from "react";
import "styles/App.scss";
import StringedInstrument from "./components/StringedInstrument";
import TeoriaProvider from "common/components/TeoriaProvider";

function App() {
  return (
    <div className="App p-lg-5">
      <TeoriaProvider>
        <StringedInstrument />
      </TeoriaProvider>
    </div>
  );
}

export default App;
