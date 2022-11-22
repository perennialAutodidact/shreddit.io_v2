import React from "react";
import { Routes, Route } from "react-router";
import "styles/App.scss";
import ScaleExplorerPage from "pages/ScaleExplorerPage";
import TeoriaProvider from "common/components/TeoriaProvider";
import UtilityBar from "components/UtilityBar";

function App() {
  return (
    <div className="App p-lg-5 overflow-hidden position-relative vh-100">
      <TeoriaProvider>
        <UtilityBar />
        <Routes>
          <Route path="/" element={<ScaleExplorerPage />} />
        </Routes>
      </TeoriaProvider>
    </div>
  );
}

export default App;
