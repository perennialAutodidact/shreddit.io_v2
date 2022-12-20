import React, { useLayoutEffect, useRef } from "react";
import { useAppSelector } from "store/hooks";
import styles from "./Neck.module.scss";

interface NeckProps {
  children: React.ReactNode;
}

const Neck: React.FC<NeckProps> = ({ children }: NeckProps) => {
  const { neck } = useAppSelector((appState) => appState.instrument.dimensions);
  const stringContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (stringContainerRef.current) {
      stringContainerRef.current.style.height = `${neck.height * 1.1}px`;
      stringContainerRef.current.style.width = `${neck.width * 1.1}px`;
    }
  }, [neck]);

  return (
    <div className={`row ${styles.neck}`} id="instrument-neck">
      <div
        className={`
          col-12 p-0
          d-flex flex-lg-column justify-content-center 
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
