import React, { useRef, useEffect } from "react";
import { Note } from "ts/musicTheory";
import { FretData } from "ts/stringedInstrument";
import styles from "./Fret.module.scss";

interface FretProps extends FretData {
  isInlay: boolean;
  height: number;
}

const Fret = ({ noteName, octave, isInlay, height }: FretProps) => {
  const fretRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fretRef.current) {
      fretRef.current.style.height = `${height}px`;
    }
  }, [fretRef, height]);

  return (
    <div
      className={`
        border border-fret-border
        ${isInlay ? "bg-inlay-fret" : "bg-fret"}
        ${styles.fret}
      `}
      ref={fretRef}
    >
      {noteName}
    </div>
  );
};

export default Fret;
