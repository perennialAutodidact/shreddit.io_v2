import React, { useContext, useMemo, useRef } from "react";
import { BreakpointContext } from "common/components/BreakpointProvider/context";
import { BreakpointState } from "ts/breakpoints";
import { useAppSelector } from "store/hooks";
import { Note } from "ts/musicTheory";
import { StringNumber, FretData, FretNumber } from "ts/stringedInstrument";
import Fret from "components/StringedInstrument/Fret";
import { getFretDataArray } from "common/utils/getFretDataArray";

interface StringProps {
  rootNote: Note;
  stringNumber: StringNumber;
}

const String: React.FC<StringProps> = ({
  rootNote,
  stringNumber,
}: StringProps) => {
  const { fretStart, fretEnd } = useAppSelector(
    (appState) => appState.instrument
  );
  const { scale } = useAppSelector((appState) => appState.musicTheory);
  const { isLandscape } = useContext<BreakpointState>(BreakpointContext);
  const stringRef = useRef<HTMLDivElement>(null);

  const frets = useMemo<FretData[]>(
    () =>
      getFretDataArray(
        rootNote,
        fretStart,
        fretEnd,
        scale.intervals.includes("A4") ? "aug" : "dim"
      ),
    [rootNote, fretStart, fretEnd, scale.intervals]
  );

  return (
    <div
      className={`
        d-flex 
        ${isLandscape ? "flex-row me-3" : "flex-column"}
      `}
      ref={stringRef}
      data-test-id={"String"}
    >
      {frets.map((fret, i) => (
        <Fret
          {...fret}
          stringNumber={stringNumber}
          fretNumber={(fretStart + i) as FretNumber}
          key={`string-${stringNumber}-fret-${i}`}
        />
      ))}
    </div>
  );
};

export default String;
