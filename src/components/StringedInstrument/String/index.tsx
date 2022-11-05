import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import { useAppSelector } from "store/hooks";
import { TeoriaContext } from "common/components/TeoriaProvider/context";
import { BreakpointContext } from "common/components/BreakpointProvider/context";
import { useWindowSize } from "usehooks-ts";
import { Note } from "ts/musicTheory";
import { FretData } from "ts/stringedInstrument";
import styles from "./String.module.scss";
import Fret from "components/StringedInstrument/Fret";
import { getFrets } from "common/utils/getFrets";
import { noteToFretData } from "common/utils/noteToFretData";
import { INLAY_FRET_INDICES } from "common/constants/stringedInstruments";
import { BreakpointState } from "ts/breakpoints";

interface StringProps {
  rootNote: Note;
}

const String: React.FC<StringProps> = ({ rootNote }: StringProps) => {
  const { teoria } = useContext(TeoriaContext);
  const { breakpoint } = useContext<BreakpointState>(BreakpointContext);
  const { neckLength, strings } = useAppSelector(
    (appState) => appState.instrument
  );
  const stringRef = useRef<HTMLDivElement>(null);
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const [fretHeight, setFretHeight] = useState<number>(0);
  const instrumentHeightFactor = useMemo(() => 0.75, []);

  const frets: FretData[] = getFrets(rootNote, neckLength, "aug4");
  const fretZero: FretData = noteToFretData(rootNote);

  useEffect(() => {
    if (stringRef.current) {
      const stringWidth = windowWidth / strings.length;
      const stringHeight = windowHeight * instrumentHeightFactor;
      stringRef.current.style.width = `${stringWidth}px`;
      setFretHeight(stringHeight / frets.length);
    }
  }, [
    stringRef,
    strings.length,
    windowWidth,
    windowHeight,
    instrumentHeightFactor,
    frets.length,
  ]);

  return (
    <div className={`d-flex flex-column ${styles.string}`} ref={stringRef}>
      {fretZero.noteName}
      {frets.map((fret, i) => (
        <Fret
          {...fret}
          isInlay={INLAY_FRET_INDICES.includes(i)}
          height={fretHeight}
          key={`${fret.noteName}${fret.octave}`}
        />
      ))}
    </div>
  );
};

export default String;
