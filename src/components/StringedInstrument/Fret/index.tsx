import React, { useMemo, useRef, useEffect, useContext } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { BreakpointContext } from "common/components/BreakpointProvider/context";
import { BreakpointState } from "ts/breakpoints";
import { Note } from "ts/musicTheory";
import { FretData, FretNumber } from "ts/stringedInstrument";
import NoteMarker from "components/NoteMarker";
import styles from "./Fret.module.scss";
import { setInstrumentDimensions } from "store/stringedInstrumentSlice";

interface FretProps extends FretData {
  isInlay: boolean;
  fretNumber: FretNumber;
}

const Fret = ({ fretNumber, noteName, octave, isInlay }: FretProps) => {
  const appDispatch = useAppDispatch();
  const { breakpoint } = useContext<BreakpointState>(BreakpointContext);
  const {
    scale,
    dimensions: { string, fret },
    totalFrets,
  } = useAppSelector((appState) => appState.instrument);
  const fretRef = useRef<HTMLDivElement>(null);
  const showMarker = scale.notes.includes(noteName as Note);

  useEffect(() => {
    if (fret.height === 0) {
      let height =
        breakpoint === "sm" ? string.height / totalFrets : string.height;
      let width =
        breakpoint === "sm" ? string.width : string.width / totalFrets;
      appDispatch(
        setInstrumentDimensions({
          fret: {
            height,
            width,
          },
        })
      );
    }
  }, [breakpoint, string, fret]);

  useEffect(() => {
    if (fretRef.current) {
      fretRef.current.style.height = `${fret.height}px`;
      // fretRef.current.style.width = `${fret.width}px`;
    }
  }, [fret]);

  return (
    <div
      id={`${noteName}${octave}`}
      data-testid="Fret"
      className={`
        d-flex justify-content-center align-items-center
        position-relative w-100
        ${fretNumber !== 0 ? "bg-fret border borer-fret-border" : ""}
        ${isInlay ? "bg-inlay-fret" : ""}
        ${styles.fret}
      `}
      ref={fretRef}
    >
      {/* {showMarker ? (
        <NoteMarker noteName={noteName} interval={"m3"} size={10} />
      ) : (
        ""
      )} */}
      {/* <span>{noteName}</span> */}
    </div>
  );
};

export default Fret;
