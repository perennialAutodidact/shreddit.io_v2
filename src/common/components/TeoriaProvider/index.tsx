import React from "react";
import { TeoriaContext } from "./context";
const teoria = require("teoria");

type TeoriaProviderProps = {
  children: React.ReactNode;
};

const TeoriaProvider = ({ children }: TeoriaProviderProps) => {
  // for exploring the Teoria API
  global.t = teoria;

  return (
    <TeoriaContext.Provider value={{ teoria }}>
      {children}
    </TeoriaContext.Provider>
  );
};

export default TeoriaProvider;
