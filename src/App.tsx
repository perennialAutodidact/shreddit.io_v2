import React from "react";
import { Routes, Route } from "react-router";
import "styles/App.scss";
import ScaleExplorerPage from "pages/ScaleExplorerPage";
import TeoriaProvider from "common/components/TeoriaProvider";
import SettingsMenuToggle from "components/UtilityBar/SettingsMenuToggle";
import SettingsMenu from "common/components/SettingsMenu";

function App() {
  return (
    <div className="App p-lg-3 overflow-hidden position-relative min-vh-100">
      <TeoriaProvider>
        <SettingsMenuToggle />
        <SettingsMenu />
        <Routes>
          <Route path="/" element={<ScaleExplorerPage />} />
        </Routes>
      </TeoriaProvider>
    </div>
  );
}

export default App;
