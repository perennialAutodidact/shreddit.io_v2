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
import { StringNumber } from "ts/stringedInstrument";
import Neck from "./Neck";
import String from "./String";
import styles from "./StringedInstrument.module.scss";

const StringedInstrument: React.FC = () => {
  const appDispatch = useAppDispatch();
  const { instrumentType, strings, fretStart, fretEnd } = useAppSelector(
    (appState) => appState.instrument
  );
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
        isPortrait && isMobile ? neckHeight : neckHeight / strings.length;
      let stringWidth =
        isPortrait && isMobile ? neckWidth / strings.length : neckWidth;

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
    instrumentType,
    isMobile,
    isPortrait,
    windowSize,
    strings.length,
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
        {strings
          .slice()
          .reverse()
          .map((rootNote, index) => (
            <String
              rootNote={rootNote}
              stringNumber={index as StringNumber}
              key={rootNote}
            />
          ))}
      </Neck>
    </div>
  );
};

export default StringedInstrument;
