import React, { useContext, useLayoutEffect, useRef } from "react";
import { BreakpointContext } from "common/components/BreakpointProvider/context";
import { BreakpointState } from "ts/breakpoints";
import { useAppSelector } from "store/hooks";
import StringLabels from "../StringLabels";
import styles from "./Neck.module.scss";

interface NeckProps {
  children: React.ReactNode;
}

const Neck: React.FC<NeckProps> = ({ children }: NeckProps) => {
  const { neck } = useAppSelector((appState) => appState.instrument.dimensions);
  const stringContainerRef = useRef<HTMLDivElement>(null);

  const { isMobile, isPortrait } =
    useContext<BreakpointState>(BreakpointContext);

  useLayoutEffect(() => {
    if (stringContainerRef.current) {
      stringContainerRef.current.style.height = `${neck.height * 1.1}px`;
      stringContainerRef.current.style.width = `${neck.width * 1.1}px`;
    }
  }, [neck]);

  return (
    <div
      className={`row justify-content-center ${styles.neck}`}
      id="instrument-neck"
    >
      <div
        className={`
          p-0
          ${isPortrait ? "col-16" : "col-1"}
        `}
      >
        <StringLabels />
      </div>
      <div
        className={`
          col-12 col-lg-10 p-0
          d-flex justify-content-center 
          ${isPortrait ? "flex-row" : "flex-column"}
          ${styles.stringContainer}
        `}
        ref={stringContainerRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Neck;
