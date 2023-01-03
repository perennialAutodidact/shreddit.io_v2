import React, { useContext, useRef, useMemo } from "react";
import { useAppSelector } from "store/hooks";
import { BreakpointContext } from "common/components/BreakpointProvider/context";
import { Note } from "ts/musicTheory";
import { StringNumber, FretData, FretNumber } from "ts/stringedInstrument";
import Fret from "components/StringedInstrument/Fret";
import { getFretDataArray } from "common/utils/getFretDataArray";
import { BreakpointState } from "ts/breakpoints";

const teoria = require("teoria");

interface StringProps {
  rootNote: Note;
  stringNumber: StringNumber;
}

const String: React.FC<StringProps> = ({
  rootNote,
  stringNumber,
}: StringProps) => {
  const { totalFrets, startFret, endFret } = useAppSelector(
    (appState) => appState.instrument
  );
  const { scale } = useAppSelector((appState) => appState.musicTheory);
  const stringRef = useRef<HTMLDivElement>(null);

  const frets = useMemo<FretData[]>(
    () =>
      getFretDataArray(
        rootNote,
        startFret,
        endFret,

        scale.intervals.includes("A4") ? "aug" : "dim"
      ),
    [rootNote, totalFrets, scale.intervals]
  );

  return (
    <div
      className={`
        d-flex flex-column flex-lg-row my-2 my-lg-0 me-lg-3
      `}
      ref={stringRef}
      data-test-id={"String"}
    >
      {frets.map((fret, i) => (
        <Fret
          {...fret}
          stringNumber={stringNumber}
          fretNumber={(startFret + i) as FretNumber}
          key={`string-${stringNumber}-fret-${i}`}
        />
      ))}
    </div>
  );
};

export default String;
