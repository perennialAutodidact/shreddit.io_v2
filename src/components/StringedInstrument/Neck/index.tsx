import React, { useMemo, useContext } from "react";
import { BreakpointContext } from "common/components/BreakpointProvider/context";
import { BreakpointState } from "ts/breakpoints";
import { useWindowSize } from "usehooks-ts";
import styles from "./Neck.module.scss";

interface NeckProps {
  children: React.ReactNode;
}

const Neck: React.FC<NeckProps> = ({ children }: NeckProps) => {
  return (
    <div className={`row ${styles.neck}`} id="instrument-neck">
      <div className="p-0 col-12 col-md-10 offset-md-1 d-flex flex-md-column">
        {children}
      </div>
    </div>
  );
};

export default Neck;
