import React, { useContext, useEffect, useMemo, useRef } from "react";
import { useAppSelector, useAppDispatch } from "store/hooks";
import {
  setInstrumentDimensions,
  setMarkedNotes,
} from "store/stringedInstrumentSlice";
import { BreakpointState } from "ts/breakpoints";
import { BreakpointContext } from "common/components/BreakpointProvider/context";
import { getEnharmonics } from "common/utils";
import { useWindowSize } from "usehooks-ts";
import { NoteName } from "ts/musicTheory";
import {
  FretData,
  FretNumber,
  StringData,
  StringNumber,
} from "ts/stringedInstrument";
import { getStringNumbers } from "common/utils";
import Neck from "./Neck";
import String from "./String";
import Fret from "./Fret";
import styles from "./StringedInstrument.module.scss";

const StringedInstrument: React.FC = () => {
  const appDispatch = useAppDispatch();
  const { instrumentName, neck } = useAppSelector(
    (appState) => appState.instrument
  );
  const { strings, stringsTotal, fretStart, fretEnd } = neck;
  const { scale, currentKey } = useAppSelector(
    (appState) => appState.musicTheory
  );
  const fretTotal = useMemo(
    () => fretEnd - fretStart - 1,
    [fretEnd, fretStart]
  );
  const instrumentRef = useRef<HTMLDivElement>(null);
  const { isMobile, isPortrait } =
    useContext<BreakpointState>(BreakpointContext);

  const stringNumbers: StringNumber<typeof instrumentName>[] = getStringNumbers(
    strings,
    instrumentName
  );

  const getFretNumbersForString = (
    string: StringData
  ): FretNumber<typeof fretStart, typeof fretEnd>[] =>
    Object.keys(string.frets)
      .slice()
      .reverse()
      .map(
        (fretNumber) =>
          parseInt(fretNumber) as FretNumber<typeof fretStart, typeof fretEnd>
      );

  const getFretData = (
    stringNumber: StringNumber<typeof instrumentName>,
    fretNumber: FretNumber<typeof fretStart, typeof fretEnd>
  ): FretData => strings[stringNumber].frets[fretNumber];

  const windowSize = useWindowSize();
  useEffect(() => {
    if (instrumentRef.current) {
      let { height, width } = windowSize;

      width *= isPortrait ? (isMobile ? 0.9 : 0.9) : 0.8;
      height *= isPortrait ? (isMobile ? 0.75 : 0.6) : isMobile ? 0.6 : 0.45;

      instrumentRef.current.style.width = `${width}px`;
      instrumentRef.current.style.height = `${height}px`;

      let neckHeight = height * (isPortrait ? (isMobile ? 0.9 : 0.8) : 1);
      let neckWidth = width * (isPortrait ? 0.9 : 0.8);

      let stringHeight =
        isPortrait && isMobile ? neckHeight : neckHeight / stringsTotal;
      let stringWidth =
        isPortrait && isMobile ? neckWidth / stringsTotal : neckWidth;

      let fretHeight =
        isPortrait && isMobile ? stringHeight / fretTotal : stringHeight;
      let fretWidth =
        isPortrait && isMobile ? stringWidth : stringWidth / fretTotal;

      appDispatch(
        setInstrumentDimensions({
          neck: {
            height: neckHeight,
            width: neckWidth,
          },
          string: {
            height: stringHeight,
            width: stringWidth,
          },
          fret: {
            height: fretHeight,
            width: fretWidth,
          },
        })
      );
    }
  }, [
    instrumentName,
    isMobile,
    isPortrait,
    windowSize,
    stringsTotal,
    fretTotal,
    appDispatch,
  ]);

  useEffect(() => {
    let _notes: NoteName[] = scale.notes.slice();
    let enharmonics: NoteName[] = getEnharmonics(scale.notes);

    let _markedNotes: NoteName[] = _notes.concat(enharmonics);

    appDispatch(setMarkedNotes(_markedNotes));
  }, [scale, currentKey, appDispatch]);

  return (
    <div
      className={`container-fluid ${styles.stringedInstrument}`}
      id="instrument-container"
      ref={instrumentRef}
    >
      <Neck>
        {stringNumbers.map(
          (stringNumber: StringNumber<typeof instrumentName>) => (
            <String
              rootNote={strings[stringNumber]?.rootNote}
              stringNumber={stringNumber}
            >
              {getFretNumbersForString(strings[stringNumber]).map(
                (fretNumber) => (
                  <Fret
                    stringNumber={stringNumber}
                    fretNumber={
                      fretNumber as FretNumber<typeof fretStart, typeof fretEnd>
                    }
                    {...getFretData(stringNumber, fretNumber)}
                  />
                )
              )}
            </String>
          )
        )}
      </Neck>
    </div>
  );
};

export default StringedInstrument;
