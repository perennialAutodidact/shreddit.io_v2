import React, { useContext, useLayoutEffect, useRef, useMemo } from "react";
import { useAppSelector } from "store/hooks";
import { BreakpointContext } from "common/components/BreakpointProvider/context";
import { Note } from "ts/musicTheory";
import { StringNumber, FretData, FretNumber } from "ts/stringedInstrument";
import Fret from "components/StringedInstrument/Fret";
import { getFretDataArray } from "common/utils/getFretDataArray";
import { BreakpointState } from "ts/breakpoints";

interface StringProps {
  rootNote: Note;
  stringNumber: StringNumber;
}

const String: React.FC<StringProps> = ({
  rootNote,
  stringNumber,
}: StringProps) => {
  const { strings } = useAppSelector((appState) => appState.instrument);
  const { isMobile } = useContext<BreakpointState>(BreakpointContext);
  const {
    totalFrets,
    scale,
    dimensions: {
      fret: { height: fretHeight, width: fretWidth },
    },
  } = useAppSelector((appState) => appState.instrument);
  const stringRef = useRef<HTMLDivElement>(null);

  const isFirstString = useMemo<boolean>(
    () => stringNumber === 0,
    [stringNumber]
  );
  const isLastString = useMemo<boolean>(
    () => stringNumber === strings.length - 1,
    [stringNumber, strings]
  );

  const frets = useMemo<FretData[]>(
    () =>
      getFretDataArray(
        rootNote,
        totalFrets,
        scale.intervals.includes("A4") ? "aug" : "dim"
      ),
    [rootNote, totalFrets, scale.intervals]
  );

  // console.log({ frets });
  return (
    <div
      className={`
        d-flex flex-column flex-lg-row my-2 my-lg-0 mx-lg-3
      `}
      ref={stringRef}
      data-testid={"String"}
    >
      <div
        className={`
          ${!isMobile ? "w-50" : ""}
          ${isFirstString ? (isMobile ? "rounded-start" : "rounded-top") : ""}
          ${isLastString ? (isMobile ? "rounded-end" : "rounded-bottom") : ""}
          bg-light bg-opacity-75
          text-center fs-4 fw-bolder
          d-flex align-items-center justify-content-center
        `}
        data-testid="StringLabel"
      >
        {frets[0].noteName.toUpperCase()}
      </div>
      {frets.map((fret, i) => (
        <Fret
          {...fret}
          stringNumber={stringNumber}
          fretNumber={i as FretNumber}
          key={`string-${stringNumber}-fret-${i}`}
        />
      ))}
    </div>
  );
};

export default String;
