import React from "react";
import { TeoriaContext } from "./context";
const teoria = require("teoria");

type TeoriaProviderProps = {
  children: React.ReactNode | React.ReactNode[];
};

const TeoriaProvider = ({ children }: TeoriaProviderProps) => {
  return (
    <TeoriaContext.Provider value={{ teoria }}>
      {children}
    </TeoriaContext.Provider>
  );
};

export default TeoriaProvider;
