import React, { useMemo, useRef, useEffect, useContext } from "react";
import { useAppSelector } from "store/hooks";
import { BreakpointContext } from "common/components/BreakpointProvider/context";
import { BreakpointState } from "ts/breakpoints";
import { Interval } from "ts/musicTheory";
import { FretData, FretNumber, StringNumber } from "ts/stringedInstrument";
import { INLAY_FRET_INDICES } from "common/constants/stringedInstruments";
import NoteMarker from "components/NoteMarker";
import styles from "./Fret.module.scss";

const teoria = require("teoria");

interface FretProps extends FretData {
  stringNumber: StringNumber;
  fretNumber: FretNumber;
}

const Fret = ({ stringNumber, fretNumber, noteName }: FretProps) => {
  const { isMobile } = useContext<BreakpointState>(BreakpointContext);
  const {
    dimensions: { fret },
  } = useAppSelector((appState) => appState.instrument);
  const { currentKey, scale } = useAppSelector(
    (appState) => appState.audioClient
  );
  const fretRef = useRef<HTMLDivElement>(null);

  const fretInterval = useMemo<Interval | null>(() => {
    let note1 = teoria.note(currentKey);
    let note2;
    let interval = null;

    if (scale.notes.includes(noteName)) {
      note2 = teoria.note(noteName);
    } else {
      note2 = teoria
        .note(noteName)
        .enharmonics()
        .filter((enharmonic: any) =>
          scale.notes.includes(enharmonic.name() + enharmonic.accidental())
        )[0];
    }

    if (note1 && note2) {
      interval = note1.interval(note2).simple().toString();
      if (interval === "P8") {
        interval = "P1";
      }
    }

    return interval;
  }, [currentKey, scale.notes, noteName]);

  const showMarker = useMemo(
    () => fretInterval && scale.intervals.includes(fretInterval),
    [scale.intervals, fretInterval]
  );

  const isInlay = useMemo<boolean>(
    () => INLAY_FRET_INDICES.includes(fretNumber),
    [fretNumber]
  );

  const isFirstStringFret = useMemo<boolean>(
    () => stringNumber === 0 && fretNumber > 0,
    [stringNumber, fretNumber]
  );

  // apply border style
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

  // determine size of fret marker
  const markerScalar = useMemo(() => 0.5, []);
  const markerSize = useMemo(
    () => fret.height * markerScalar,
    [fret.height, markerScalar]
  );

  // set fret DOM element size
  useEffect(() => {
    if (fretRef.current) {
      fretRef.current.style.height = `${fret.height}px`;
      fretRef.current.style.width = `${fret.width}px`;
    }
  }, [fret]);

  return (
    <div
      id={`${stringNumber}${fretNumber}`}
      data-test-id="Fret"
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
          interval={fretInterval}
          size={markerSize}
        />
      ) : (
        ""
      )}
      {/* <span>{fretInterval}</span> */}
    </div>
  );
};

export default Fret;
