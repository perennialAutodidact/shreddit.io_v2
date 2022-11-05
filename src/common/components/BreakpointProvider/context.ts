import { createContext } from "react";
import { BreakpointState } from "ts/breakpoints";

const initialState: BreakpointState = {
  breakpoint: "sm",
};

export const BreakpointContext = createContext<BreakpointState>(initialState);
