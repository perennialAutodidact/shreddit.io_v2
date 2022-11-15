import React, {
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { setInstrumentDimensions } from "store/stringedInstrumentSlice";
import { TeoriaContext } from "common/components/TeoriaProvider/context";
import { BreakpointContext } from "common/components/BreakpointProvider/context";
import { useWindowSize } from "usehooks-ts";
import { Note } from "ts/musicTheory";
import { StringNumber, FretData, FretNumber } from "ts/stringedInstrument";
import Fret from "components/StringedInstrument/Fret";
import { getFretDataArray } from "common/utils/getFretDataArray";
import { INLAY_FRET_INDICES } from "common/constants/stringedInstruments";
import { BreakpointState } from "ts/breakpoints";
import styles from "./String.module.scss";

interface StringProps {
  rootNote: Note;
  stringNumber: StringNumber;
}

const String: React.FC<StringProps> = ({
  rootNote,
  stringNumber,
}: StringProps) => {
  const appDispatch = useAppDispatch();
  const { strings } = useAppSelector((appState) => appState.instrument);
  const { teoria } = useContext(TeoriaContext);
  const { breakpoint, isMobile } =
    useContext<BreakpointState>(BreakpointContext);
  const {
    totalFrets,
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
    () => getFretDataArray(rootNote, totalFrets, "aug"),
    [rootNote, totalFrets]
  );

  useLayoutEffect(() => {
    if (stringRef.current) {
      let stringLabel =
        stringRef.current.querySelector<HTMLDivElement>(".string-label");
      if (stringLabel) {
        stringLabel.style.height = `${fretHeight}px`;
        stringLabel.style.width = `${fretWidth}px`;
      }
    }
  }, [fretHeight, fretWidth]);

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
      >
        {frets[0].noteName.toUpperCase()}
      </div>
      {frets.map((fret, i) => (
        <Fret
          {...fret}
          stringNumber={stringNumber}
          fretNumber={i as FretNumber}
          key={`string-${i}-{fret.noteName}${fret.octave}`}
        />
      ))}
    </div>
  );
};

export default String;
