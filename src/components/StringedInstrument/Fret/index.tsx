import { useMemo, useRef, useEffect, useContext } from "react";
import CSS from "csstype";
import { useAppSelector } from "store/hooks";
import { BreakpointContext } from "common/components/BreakpointProvider/context";
import { BreakpointState } from "ts/breakpoints";
import { Interval, NoteName } from "ts/musicTheory";
import { FretData, FretNumber, StringNumber } from "ts/stringedInstrument";
import { INLAY_FRET_INDICES } from "common/constants/stringedInstruments";
import NoteMarker from "components/NoteMarker";
import { fretStyles } from "./styles";

const teoria = require("teoria");

interface FretProps extends FretData {
  stringNumber: StringNumber;
  fretNumber: FretNumber;
  noteName: NoteName;
}

const Fret = ({ stringNumber, fretNumber, noteName }: FretProps) => {
  const { isMobile, isPortrait } =
    useContext<BreakpointState>(BreakpointContext);
  const {
    dimensions: { fret },
    fretStart,
    fretEnd,
    strings,
  } = useAppSelector((appState) => appState.instrument);
  const { currentKey, scale } = useAppSelector(
    (appState) => appState.musicTheory
  );
  const { activePitch } = useAppSelector((appState) => appState.audioClient);

  const fretRef = useRef<HTMLDivElement>(null);

  const enharmonics = useMemo(() => {
    return teoria
      .note(noteName)
      .enharmonics()
      .map((note: any) => note.name() + note.accidental());
  }, [noteName]);

  // determine the fret's interval relative to the current key
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

  // rename the note to an enharmonic in the current scale if necessary
  noteName = useMemo(
    () =>
      !scale.notes.includes(noteName)
        ? enharmonics.filter((enharmonic: any) => {
            return scale.notes.includes(enharmonic);
          })[0]
        : noteName,
    [noteName, enharmonics, scale.notes]
  );

  // show fret marker if fret interval is in the scale's intervals
  const showMarker = useMemo(
    () => fretInterval && scale.intervals.includes(fretInterval),
    [scale.intervals, fretInterval]
  );
  // const showMarker = false;

  const isInlay = useMemo<boolean>(
    () => INLAY_FRET_INDICES.includes(fretNumber),
    [fretNumber]
  );

  const isOpenFret = useMemo<boolean>(() => fretNumber === 0, [fretNumber]);

  const isFirstFretOnString = useMemo<boolean>(
    () => fretStart > 0 && fretNumber === fretStart,
    [fretStart, fretNumber]
  );
  const isFirstStringFret = useMemo<boolean>(
    () => stringNumber === 0 && fretNumber > 0,
    [stringNumber, fretNumber]
  );

  const isLastStringFret = useMemo<boolean>(
    () => stringNumber === strings.length - 1 && fretNumber > 0,
    [stringNumber, strings, fretNumber]
  );

  const isLastFretOnString = useMemo<boolean>(
    () => fretNumber === fretEnd,
    [fretNumber, fretEnd]
  );

  // apply border style
  const fretBorders = useMemo(() => {
    const styles = fretStyles[isPortrait ? "portrait" : "landscape"];

    let _fretBorders: CSS.Properties = styles.fret;

    if (isOpenFret) {
      _fretBorders = styles.fretOpen;
    }
    if (isFirstFretOnString) {
      _fretBorders = { ..._fretBorders, ...styles.fretFirst };
    }
    if (isFirstStringFret) {
      _fretBorders = { ..._fretBorders, ...styles.fretFirstString };
    }
    if (isLastStringFret) {
      _fretBorders = { ..._fretBorders, ...styles.fretLastString };
    }

    return _fretBorders;
  }, [
    isPortrait,
    isFirstFretOnString,
    isFirstStringFret,
    isLastStringFret,
    isOpenFret,
  ]);

  // determine size of fret marker
  const markerScalar = useMemo(
    () =>
      activePitch &&
      activePitch.toString().slice(0, -1).toLowerCase() === noteName
        ? 0.66
        : 0.5,
    [activePitch, noteName]
  );

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
      id={`${stringNumber}_${fretNumber}`}
      data-test-id="Fret"
      style={fretBorders}
      className={`
        d-flex justify-content-center align-items-center
        position-relative bg-opacity-75
        ${fretNumber === fretStart ? "fret-start" : ""}
        ${fretNumber > 0 ? (isInlay ? "bg-inlay-fret" : "bg-fret") : ""}
        ${!isMobile ? "w-100" : ""}
        ${isFirstFretOnString ? "mt-3 mt-lg-0 ms-lg-3" : ""}
        ${isMobile && isPortrait && isLastFretOnString ? "mb-3" : ""}
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
    </div>
  );
};

export default Fret;
