import React, { useContext, useRef } from "react";
import { BreakpointContext } from "common/components/BreakpointProvider/context";
import { BreakpointState } from "ts/breakpoints";
// import { useAppSelector } from "store/hooks";
import { Note } from "ts/musicTheory";
import { InstrumentName, StringNumber } from "ts/stringedInstrument";
// import Fret from "components/StringedInstrument/Fret";
// import { getFretDataArray } from "common/utils/getFretDataArray";

interface StringProps {
  rootNote: Note;
  stringNumber: StringNumber<InstrumentName>;
  children: React.ReactNode;
}

const String: React.FC<StringProps> = ({
  rootNote,
  stringNumber,
  children,
}: StringProps) => {
  // const {
  //   neck: { fretStart, fretEnd },
  // } = useAppSelector((appState) => appState.instrument);

  // const { scale } = useAppSelector((appState) => appState.musicTheory);
  const { isLandscape } = useContext<BreakpointState>(BreakpointContext);
  const stringRef = useRef<HTMLDivElement>(null);

  // const frets = useMemo<FretData[]>(
  //   () =>
  //     getFretDataArray(
  //       rootNote,
  //       fretStart,
  //       fretEnd,
  //       scale.intervals.includes("A4") ? "aug" : "dim"
  //     ),
  //   [rootNote, fretStart, fretEnd, scale.intervals]
  // );

  return (
    <div
      className={`
        d-flex 
        ${isLandscape ? "flex-row me-3" : "flex-column"}
      `}
      ref={stringRef}
      data-test-id={"String"}
    >
      {children}
    </div>
  );
};

export default String;
