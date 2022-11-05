import React, { createContext, useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { Breakpoint } from "ts/breakpoints";
import { BREAKPOINT_SIZES } from "common/constants/breakpoints";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

const BreakpointProvider = ({ children }: Props) => {
  const { sm, md, lg, xl, xxl } = BREAKPOINT_SIZES;
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("sm");
  const { height, width } = useWindowSize();

  useEffect(() => {
    let _breakpoint: Breakpoint;
    if (width < sm) {
      _breakpoint = "xs";
    } else if (width < md) {
      _breakpoint = "sm";
    } else if (width < lg) {
      _breakpoint = "md";
    } else if (width < xl) {
      _breakpoint = "lg";
    } else if (width < xxl) {
      _breakpoint = "xl";
    } else {
      _breakpoint = "xxl";
    }
    setBreakpoint(_breakpoint);
  }, [height, width]);

  const BreakpointContext = createContext({ breakpoint });

  return (
    <BreakpointContext.Provider value={{ breakpoint }}>
      {children}
    </BreakpointContext.Provider>
  );
};

export default BreakpointProvider;
