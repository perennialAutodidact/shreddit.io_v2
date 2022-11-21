import React from "react";
import { Routes, Route } from "react-router";
import "styles/App.scss";
import ScaleExplorerPage from "pages/ScaleExplorerPage";
import TeoriaProvider from "common/components/TeoriaProvider";
import SettingsPage from "pages/SettingsPage";

function App() {
  return (
    <div className="App p-lg-5 overflow-hidden position-relative vh-100">
      <TeoriaProvider>
        <Routes>
          <Route path="/" element={<ScaleExplorerPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </TeoriaProvider>
    </div>
  );
}

export default App;
