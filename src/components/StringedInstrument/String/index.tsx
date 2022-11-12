import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { setInstrumentDimensions } from "store/stringedInstrumentSlice";
import { TeoriaContext } from "common/components/TeoriaProvider/context";
import { BreakpointContext } from "common/components/BreakpointProvider/context";
import { useWindowSize } from "usehooks-ts";
import { Note } from "ts/musicTheory";
import { FretData, FretNumber } from "ts/stringedInstrument";
import styles from "components/StringedInstrument/String/String.module.scss";
import Fret from "components/StringedInstrument/Fret";
import { getFretDataArray } from "common/utils/getFretDataArray";
import { INLAY_FRET_INDICES } from "common/constants/stringedInstruments";
import { BreakpointState } from "ts/breakpoints";

interface StringProps {
  rootNote: Note;
}

const String: React.FC<StringProps> = ({ rootNote }: StringProps) => {
  const appDispatch = useAppDispatch();
  const { teoria } = useContext(TeoriaContext);
  const { breakpoint } = useContext<BreakpointState>(BreakpointContext);
  const {
    totalFrets,
    strings,
    dimensions: { neck, string },
  } = useAppSelector((appState) => appState.instrument);
  const stringRef = useRef<HTMLDivElement>(null);
  const { height: windowHeight, width: windowWidth } = useWindowSize();

  useEffect(() => {
    if (stringRef.current) {
      let height =
        breakpoint === "sm" ? neck.height : neck.height / strings.length;
      let width =
        breakpoint === "sm" ? neck.width / strings.length : neck.width;
      appDispatch(
        setInstrumentDimensions({
          string: {
            height,
            width,
          },
        })
      );
    }
  }, [breakpoint, neck, strings, appDispatch]);

  const frets = useMemo<FretData[]>(
    () => getFretDataArray(rootNote, totalFrets, "aug4"),
    [rootNote, totalFrets]
  );

  return (
    <div
      className={`d-flex flex-column align-items-md-center flex-md-row ${styles.string}`}
      ref={stringRef}
      data-testid={"String"}
    >
      <h3 className="m-0">{frets[0].noteName.toUpperCase()}</h3>
      {frets.map((fret, i) => (
        <Fret
          {...fret}
          fretNumber={i as FretNumber}
          isInlay={INLAY_FRET_INDICES.includes(i)}
          key={`string-${i}-{fret.noteName}${fret.octave}`}
        />
      ))}
    </div>
  );
};

export default String;
