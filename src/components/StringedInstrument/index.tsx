import React, {
  useRef,
  useMemo,
  useContext,
  useLayoutEffect,
  useEffect,
} from "react";
import { useAppSelector, useAppDispatch } from "store/hooks";
import {
  setInstrumentDimensions,
  setMarkedNotes,
} from "store/stringedInstrumentSlice";
import { BreakpointState } from "ts/breakpoints";
import { BreakpointContext } from "common/components/BreakpointProvider/context";
import { getEnharmonics } from "common/utils";
import { NoteName } from "ts/musicTheory";
import { StringNumber } from "ts/stringedInstrument";
import Neck from "./Neck";
import String from "./String";
import styles from "./StringedInstrument.module.scss";

const StringedInstrument: React.FC = () => {
  const appDispatch = useAppDispatch();
  const { strings, scale, currentKey, totalFrets } = useAppSelector(
    (appState) => appState.instrument
  );
  const instrumentRef = useRef<HTMLDivElement>(null);
  const { breakpoint } = useContext<BreakpointState>(BreakpointContext);
  const isMobile = useMemo<boolean>(
    () => ["xs", "sm", "md"].includes(breakpoint),
    [breakpoint]
  );

  useEffect(() => {
    if (instrumentRef.current) {
      let { height, width } = instrumentRef.current.getBoundingClientRect();

      let neckHeight = height * 0.92;
      let neckWidth = width * 0.92;

      let stringHeight = isMobile ? neckHeight : neckHeight / strings.length;
      let stringWidth = isMobile ? neckWidth / strings.length : neckWidth;

      // totalFrets + 2 to accomodate for fret 0 and the string label
      let fretHeight = isMobile
        ? stringHeight / (totalFrets + 2)
        : stringHeight;
      let fretWidth = isMobile ? stringWidth : stringWidth / (totalFrets + 2);

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
  }, [isMobile, breakpoint, strings.length, totalFrets, appDispatch]);

  useEffect(() => {
    let _notes: NoteName[] = scale.notes.slice();
    let enharmonics: NoteName[] = getEnharmonics(scale.notes);

    let _markedNotes: NoteName[] = _notes.concat(enharmonics);

    appDispatch(setMarkedNotes(_markedNotes));
  }, [scale, currentKey, appDispatch]);

  return (
    <div
      className={`container ${styles.stringedInstrument}`}
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
