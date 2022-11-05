import { createContext } from "react";
const teoria = require("teoria");

export const initialState = {
  teoria,
};

export const TeoriaContext = createContext(initialState);
