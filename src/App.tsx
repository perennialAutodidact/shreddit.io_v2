import React from "react";
import { Routes, Route } from "react-router";
import "styles/App.scss";
import StringedInstrument from "./components/StringedInstrument";
import TeoriaProvider from "common/components/TeoriaProvider";
import SettingsPage from "common/components/SettingsPage";

function App() {
  return (
    <div className="App p-lg-5 overflow-hidden position-relative vh-100">
      <TeoriaProvider>
        <Routes>
          <Route path="/" element={<StringedInstrument />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </TeoriaProvider>
    </div>
  );
}

export default App;
