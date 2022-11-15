import React, { useMemo, useRef, useEffect, useContext } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { BreakpointContext } from "common/components/BreakpointProvider/context";
import { BreakpointState } from "ts/breakpoints";
import { Note } from "ts/musicTheory";
import { FretData, FretNumber, StringNumber } from "ts/stringedInstrument";
import { INLAY_FRET_INDICES } from "common/constants/stringedInstruments";
import NoteMarker from "components/NoteMarker";
import styles from "./Fret.module.scss";

interface FretProps extends FretData {
  stringNumber: StringNumber;
  fretNumber: FretNumber;
}

const Fret = ({ stringNumber, fretNumber, noteName, octave }: FretProps) => {
  const appDispatch = useAppDispatch();
  const { breakpoint, isMobile } =
    useContext<BreakpointState>(BreakpointContext);
  const {
    scale,
    dimensions: { string, fret },
    totalFrets,
  } = useAppSelector((appState) => appState.instrument);
  const fretRef = useRef<HTMLDivElement>(null);
  const showMarker = scale.notes.includes(noteName as Note);
  const isInlay = useMemo<boolean>(
    () => INLAY_FRET_INDICES.includes(fretNumber),
    [fretNumber]
  );
  const isFirstStringFret = useMemo<boolean>(
    () => stringNumber === 0 && fretNumber > 0,
    [stringNumber, fretNumber]
  );
  const fretBorders = useMemo<string>(
    () =>
      fretNumber === 0
        ? styles.openFret
        : fretNumber === 1
        ? styles.firstFret
        : fretNumber > 0
        ? styles.fret
        : "",
    [fretNumber]
  );

  useEffect(() => {
    if (fretRef.current) {
      fretRef.current.style.height = `${fret.height}px`;
      fretRef.current.style.width = `${fret.width}px`;
    }
  }, [fret]);

  return (
    <div
      id={`${noteName}${octave}`}
      data-testid="Fret"
      className={`
        d-flex justify-content-center align-items-center
        position-relative bg-opacity-75
        ${!isMobile ? "w-100" : ""}
        ${isFirstStringFret ? styles.firstStringFret : ""}
        ${fretBorders}
        ${fretNumber > 0 ? (isInlay ? "bg-inlay-fret" : "bg-fret") : ""}
      `}
      ref={fretRef}
    >
      {showMarker ? (
        <NoteMarker
          noteName={noteName}
          interval={"m3"}
          size={fret.height / 2}
        />
      ) : (
        ""
      )}
      <span>{noteName}</span>
    </div>
  );
};

export default Fret;
