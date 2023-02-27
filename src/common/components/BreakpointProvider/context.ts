import { createContext } from "react";
import { BreakpointState } from "ts/breakpoints";

const initialState: BreakpointState = {
  breakpoint: "sm",
  isMobile: true,
  isPortrait: true,
  isLandscape: false,
};

export const BreakpointContext = createContext<BreakpointState>(initialState);
